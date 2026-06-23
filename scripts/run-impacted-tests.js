import { execSync, spawnSync } from 'child_process';
import path from 'path';

// Mapping page components to their corresponding test tag
const PAGE_TAG_MAP = {
  'src/pages/Home.jsx': '@home',
  'src/pages/Login.jsx': '@login',
  'src/pages/Signup.jsx': '@signup',
  'src/pages/Dashboard.jsx': '@dashboard',
  'src/pages/Payment.jsx': '@payment',
  'src/pages/Checkout.jsx': '@checkout',
  'src/pages/Profile.jsx': '@profile'
};

function getModifiedFiles() {
  try {
    console.log('[CI Selective Test] Detecting modified files using Git...');
    
    // In GitHub Actions PR events, we compare against the base branch (origin/main)
    // Locally we can compare against origin/main or fall back to last commit (HEAD~1)
    let baseRef = 'origin/main';
    try {
      execSync('git rev-parse --verify origin/main', { stdio: 'ignore' });
    } catch {
      console.log('[CI Selective Test] origin/main not found. Falling back to compare with previous commit (HEAD~1)...');
      baseRef = 'HEAD~1';
    }

    const output = execSync(`git diff --name-only ${baseRef}`, { encoding: 'utf8' });
    return output.trim().split('\n').filter(Boolean);
  } catch (error) {
    console.warn('[CI Selective Test] Error running git diff. Defaulting to all tests.', error.message);
    return null; // Signals fallback to all tests
  }
}

function runTests() {
  const modifiedFiles = getModifiedFiles();
  
  if (!modifiedFiles) {
    console.log('[CI Selective Test] Running ALL tests (fallback mode).');
    executePlaywright('');
    return;
  }

  console.log(`[CI Selective Test] Modified files detected (${modifiedFiles.length}):`);
  modifiedFiles.forEach(file => console.log(`  - ${file}`));

  let runAll = false;
  const tagsToRun = new Set();

  for (const file of modifiedFiles) {
    // If a changed file is a page, queue its specific tag
    if (PAGE_TAG_MAP[file]) {
      tagsToRun.add(PAGE_TAG_MAP[file]);
    } else {
      // If any modified file is a shared stylesheet, navbar component, route config,
      // helper component, or playwright/percy configuration, we MUST run all tests.
      if (
        file.startsWith('src/components/') ||
        file.startsWith('src/layouts/') ||
        file.startsWith('src/routes/') ||
        file.startsWith('src/styles/') ||
        file.endsWith('.css') ||
        file.endsWith('playwright.config.js') ||
        file.endsWith('percy.config.yml') ||
        file.endsWith('tailwind.config.js') ||
        file.endsWith('package.json')
      ) {
        console.log(`[CI Selective Test] Shared asset or config changed: "${file}". Forcing full test suite run.`);
        runAll = true;
        break;
      }
    }
  }

  // If no specific page files are mapped and no shared assets forced a full run,
  // we default to running all tests to be safe (e.g. if the diff includes files in tests/)
  if (tagsToRun.size === 0 && !runAll) {
    console.log('[CI Selective Test] No direct page modifications detected. Running all tests.');
    executePlaywright('');
    return;
  }

  if (runAll) {
    executePlaywright('');
  } else {
    const grepPattern = Array.from(tagsToRun).join('|');
    console.log(`[CI Selective Test] Selective match! Running tests matching tags: "${grepPattern}"`);
    executePlaywright(grepPattern);
  }
}

function executePlaywright(grepPattern) {
  // Command options
  const args = ['playwright', 'test'];
  if (grepPattern) {
    args.push('--grep', grepPattern);
  }
  
  // Set workers to 1 to run tests sequentially and avoid timeouts on slower runners
  args.push('--workers=1');

  console.log(`[CI Selective Test] Spawning command: npx ${args.join(' ')}`);
  
  const result = spawnSync('npx', args, {
    stdio: 'inherit',
    shell: true
  });

  process.exit(result.status ?? 0);
}

runTests();
