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
    
    let baseRef = '';
    if (process.env.GITHUB_EVENT_NAME === 'pull_request' && process.env.GITHUB_BASE_REF) {
      baseRef = `origin/${process.env.GITHUB_BASE_REF}`;
      console.log(`[CI Selective Test] CI Pull Request detected. Comparing against base: ${baseRef}`);
    } else if (process.env.GITHUB_ACTIONS === 'true') {
      baseRef = 'HEAD~1';
      console.log(`[CI Selective Test] CI Push/Workflow detected. Comparing against previous commit: ${baseRef}`);
    } else {
      // Local development
      try {
        execSync('git rev-parse --verify origin/main', { stdio: 'ignore' });
        baseRef = 'origin/main';
      } catch {
        try {
          execSync('git rev-parse --verify main', { stdio: 'ignore' });
          baseRef = 'main';
        } catch {
          baseRef = 'HEAD~1';
        }
      }
      console.log(`[CI Selective Test] Local environment detected. Comparing against: ${baseRef}`);
    }

    // Verify if baseRef exists in history
    try {
      execSync(`git rev-parse --verify ${baseRef}`, { stdio: 'ignore' });
    } catch {
      console.log(`[CI Selective Test] Git ref "${baseRef}" not found. Trying fallback to HEAD~1 or HEAD.`);
      try {
        execSync('git rev-parse --verify HEAD~1', { stdio: 'ignore' });
        baseRef = 'HEAD~1';
      } catch {
        baseRef = 'HEAD';
      }
    }

    console.log(`[CI Selective Test] Running git diff --name-only ${baseRef}...`);
    const output = execSync(`git diff --name-only ${baseRef}`, { encoding: 'utf8' });
    
    // In local environment, also include untracked and modified uncommitted files
    let untrackedOutput = '';
    if (process.env.GITHUB_ACTIONS !== 'true') {
      try {
        untrackedOutput = execSync('git ls-files --others --exclude-standard', { encoding: 'utf8' });
      } catch (e) {
        // Ignore listing errors
      }
    }

    const allFiles = (output + '\n' + untrackedOutput)
      .trim()
      .split('\n')
      .map(f => f.trim())
      .filter(Boolean);
      
    return Array.from(new Set(allFiles));
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

  if (modifiedFiles.length === 0) {
    console.log('[CI Selective Test] No modified files detected. Skipping E2E visual checks.');
    process.exit(0);
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
      // helper component, tests directory, or playwright/percy configuration, we MUST run all tests.
      if (
        file.startsWith('src/components/') ||
        file.startsWith('src/layouts/') ||
        file.startsWith('src/routes/') ||
        file.startsWith('src/styles/') ||
        file.startsWith('tests/') ||
        file.startsWith('scripts/') ||
        file.endsWith('.css') ||
        file.endsWith('playwright.config.js') ||
        file.endsWith('percy.config.yml') ||
        file.endsWith('tailwind.config.js') ||
        file.endsWith('package.json')
      ) {
        console.log(`[CI Selective Test] Shared asset, test, or config changed: "${file}". Forcing full test suite run.`);
        runAll = true;
        break;
      }
    }
  }

  // If no specific page files are mapped and no shared assets forced a full run,
  // we default to running all tests to be safe
  if (tagsToRun.size === 0 && !runAll) {
    console.log('[CI Selective Test] No direct page or config modifications detected. Skipping E2E visual checks.');
    process.exit(0);
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
