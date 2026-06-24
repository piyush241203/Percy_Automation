import React from 'react';
import { Link } from 'react-router-dom';
import { Shield, Eye, RefreshCw, Zap, Layers, CheckCircle2, ArrowRight } from 'lucide-react';
import StableSelectorWrapper from '../components/StableSelectorWrapper';

export default function Home() {
  const searchString = window.location.search;

  const features = [
    {
      name: 'Pixel-Perfect Engine',
      description: 'Capture DOM states and render screenshots in cloud browsers with zero OS dependencies.',
      icon: Eye,
    },
    {
      name: 'Continuous Integration',
      description: 'Run visual checks on every pull request and block visual regressions automatically.',
      icon: Shield,
    },
    {
      name: 'Dynamic Freezing',
      description: 'Stabilize your builds by freezing animations, dates, and dynamic visual layouts.',
      icon: RefreshCw,
    },
    {
      name: 'Lightning Performance',
      description: 'Concurrent screenshot rendering processes thousands of assertions in seconds.',
      icon: Zap,
    },
  ];

  return (
    <div className="py-12 md:py-20 lg:py-24">
      {/* Hero Section */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
        <StableSelectorWrapper testId="hero-section" className="space-y-6 max-w-3xl mx-auto">
          <div className="mb-6 bg-brand-500/10 border border-brand-500/30 text-brand-400 p-4 rounded-xl text-xs flex items-center justify-center gap-2 max-w-lg mx-auto">
            <span>✨ Live Visual Testing Demo active!</span>
          </div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-500/10 border border-brand-500/30 text-brand-400 text-xs font-semibold uppercase tracking-wider">
            <Layers className="h-3.5 w-3.5" /> Next-Gen Visual Automation using percy and playwright
          </div>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-none">
            Eliminate Visual Flaws in <span className="gradient-text">Your Web UI/UX</span>
          </h1>
          <p className="text-base sm:text-lg text-slate-400 max-w-2xl mx-auto">
            Integrate Playwright with Percy to deploy code with confidence. Catch color changes, layout breaks, button shifts, and font issues before they reach production.
          </p>
          <div className="flex flex-col sm:flex-row justify-center items-center gap-4 pt-4">
            <Link
              to={`/dashboard${searchString}`}
              className="w-full sm:w-auto inline-flex items-center justify-center rounded-xl bg-brand-600 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-brand-500/25 hover:bg-brand-500 transition-all duration-200"
            >
              Go to Dashboard <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
            <Link
              to={`/login${searchString}`}
              className="w-full sm:w-auto inline-flex items-center justify-center rounded-xl bg-slate-900 border border-slate-800 px-6 py-3 text-sm font-semibold text-slate-300 hover:bg-slate-800 hover:text-white transition-all duration-200"
            >
              Sign In
            </Link>
          </div>
        </StableSelectorWrapper>

        {/* Feature Grid */}
        <div className="mt-20 sm:mt-24 lg:mt-32">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl font-bold tracking-tight text-white">Why Teams Trust Evantech Test Suite</h2>
            <p className="mt-4 text-slate-400 text-sm sm:text-base">
              Say goodbye to writing fragile functional assertions checking CSS width and color codes.
            </p>
          </div>

          <StableSelectorWrapper
            testId="features-grid"
            className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4 max-w-7xl mx-auto"
          >
            {features.map((feature) => (
              <div
                key={feature.name}
                className="glass-panel glass-panel-hover flex flex-col items-start p-6 rounded-2xl text-left"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-brand-500/10 border border-brand-500/20 text-brand-400 mb-5">
                  <feature.icon className="h-6 w-6" />
                </div>
                <h3 className="text-lg font-semibold text-white mb-2">{feature.name}</h3>
                <p className="text-sm text-slate-400 leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </StableSelectorWrapper>
        </div>

        {/* Pricing Cards */}
        <div className="mt-24 sm:mt-32">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl font-bold tracking-tight text-white">Pricing Tailored For Your Team</h2>
            <p className="mt-4 text-slate-400">
              No hidden fees. Free developer testing plans included.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto text-left">
            {/* Plan 1 */}
            <div className="glass-panel relative flex flex-col p-8 rounded-2xl border border-slate-800">
              <h3 className="text-xl font-bold text-white mb-2">Developer Sandbox</h3>
              <p className="text-slate-400 text-sm mb-6">Perfect for building visual automation portfolios.</p>
              <div className="flex items-baseline mb-6">
                <span className="text-4xl font-extrabold text-white">$49</span>
                <span className="text-slate-500 ml-2">/ month</span>
              </div>
              <ul className="space-y-4 mb-8 text-sm text-slate-300">
                <li className="flex items-center gap-2"><CheckCircle2 className="h-4 w-4 text-brand-400" /> 5,000 snapshots / month</li>
                <li className="flex items-center gap-2"><CheckCircle2 className="h-4 w-4 text-brand-400" /> 1 user seat</li>
                <li className="flex items-center gap-2"><CheckCircle2 className="h-4 w-4 text-brand-400" /> Chromium only</li>
                <li className="flex items-center gap-2 text-slate-600"><CheckCircle2 className="h-4 w-4" /> 1-year history</li>
              </ul>
              <Link
                to={`/checkout${searchString}`}
                className="mt-auto block text-center rounded-xl bg-slate-900 border border-slate-800 hover:bg-slate-800 text-white font-semibold py-3 text-sm transition-all"
              >
                Choose Sandbox
              </Link>
            </div>

            {/* Plan 2 */}
            <div className="glass-panel relative flex flex-col p-8 rounded-2xl border-2 border-brand-500 shadow-xl shadow-brand-500/10">
              <div className="absolute top-0 right-6 -translate-y-1/2 bg-brand-500 text-white text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full">
                Most Popular
              </div>
              <h3 className="text-xl font-bold text-white mb-2">Enterprise Visual Suite</h3>
              <p className="text-slate-400 text-sm mb-6">Automate regression tests for cross-browser teams.</p>
              <div className="flex items-baseline mb-6">
                <span className="text-4xl font-extrabold text-white">$299</span>
                <span className="text-slate-500 ml-2">/ month</span>
              </div>
              <ul className="space-y-4 mb-8 text-sm text-slate-300">
                <li className="flex items-center gap-2"><CheckCircle2 className="h-4 w-4 text-brand-400" /> 100,000 snapshots / month</li>
                <li className="flex items-center gap-2"><CheckCircle2 className="h-4 w-4 text-brand-400" /> Unlimited users & teams</li>
                <li className="flex items-center gap-2"><CheckCircle2 className="h-4 w-4 text-brand-400" /> Chromium, Firefox, WebKit</li>
                <li className="flex items-center gap-2"><CheckCircle2 className="h-4 w-4 text-brand-400" /> 1-year history & PR comments</li>
              </ul>
              <Link
                to={`/checkout${searchString}`}
                className="mt-auto block text-center rounded-xl bg-brand-600 hover:bg-brand-500 text-white font-semibold py-3 text-sm shadow-md shadow-brand-500/20 transition-all"
              >
                Choose Enterprise
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
