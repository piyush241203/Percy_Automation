import React from 'react';
import { Cpu, Globe, Layers, HelpCircle } from 'lucide-react';
import StableSelectorWrapper from './StableSelectorWrapper';

export default function Footer() {
  return (
    <footer className="mt-auto border-t border-slate-900 bg-slate-950 py-12 text-slate-400">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Logo and About */}
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-tr from-brand-600 to-indigo-500">
                <Cpu className="h-4 w-4 text-white" />
              </div>
              <span className="font-sans text-lg font-bold tracking-tight text-white">
                EVAN<span className="text-brand-500">TECH</span>
              </span>
            </div>
            <p className="text-sm max-w-xs text-slate-500">
              Enterprise visual regression testing and web automation infrastructure. Empowering teams to build pixel-perfect software.
            </p>
          </div>

          {/* Links Column 1 */}
          <div>
            <h3 className="text-sm font-semibold text-slate-200 uppercase tracking-wider mb-4">Product</h3>
            <ul className="space-y-2 text-sm">
              <li><a href="#features" className="hover:text-brand-400 transition-colors">Features</a></li>
              <li><a href="#pricing" className="hover:text-brand-400 transition-colors">Pricing</a></li>
              <li><a href="#security" className="hover:text-brand-400 transition-colors">Security</a></li>
              <li><a href="#integrations" className="hover:text-brand-400 transition-colors">Integrations</a></li>
            </ul>
          </div>

          {/* Links Column 2 */}
          <div>
            <h3 className="text-sm font-semibold text-slate-200 uppercase tracking-wider mb-4">Support</h3>
            <ul className="space-y-2 text-sm">
              <li><a href="#docs" className="hover:text-brand-400 transition-colors">Documentation</a></li>
              <li><a href="#guides" className="hover:text-brand-400 transition-colors">API Status</a></li>
              <li><a href="#changelog" className="hover:text-brand-400 transition-colors">Changelog</a></li>
              <li><a href="#contact" className="hover:text-brand-400 transition-colors">Contact Sales</a></li>
            </ul>
          </div>
        </div>

        <div className="mt-12 border-t border-slate-900 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          {/* Static Date is CRITICAL to avoid visual test drift */}
          <p className="text-xs text-slate-600">
            &copy; 2026 Evantech Solutions. All rights reserved. (Static year for deterministic visual tests).
          </p>

          <StableSelectorWrapper testId="footer-socials" className="flex space-x-6">
            <a href="https://github.com" className="text-slate-600 hover:text-white transition-colors" aria-label="GitHub">
              <Globe className="h-5 w-5" />
            </a>
            <a href="https://twitter.com" className="text-slate-600 hover:text-white transition-colors" aria-label="Twitter">
              <Layers className="h-5 w-5" />
            </a>
            <a href="https://linkedin.com" className="text-slate-600 hover:text-white transition-colors" aria-label="LinkedIn">
              <Cpu className="h-5 w-5" />
            </a>
            <a href="https://support.com" className="text-slate-600 hover:text-white transition-colors" aria-label="Help">
              <HelpCircle className="h-5 w-5" />
            </a>
          </StableSelectorWrapper>
        </div>
      </div>
    </footer>
  );
}

