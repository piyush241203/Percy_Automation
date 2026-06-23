import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Mail, Lock, LogIn, ArrowRight } from 'lucide-react';
import StableSelectorWrapper from '../components/StableSelectorWrapper';

export default function Login() {
  const [email, setEmail] = useState('sarah.connor@evantech.com');
  const [password, setPassword] = useState('password123');
  const navigate = useNavigate();
  const searchString = window.location.search;

  const handleSubmit = (e) => {
    e.preventDefault();
    // Simulate login and navigate to dashboard
    navigate(`/dashboard${searchString}`);
  };

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-bold tracking-tight text-white">Welcome Back! Sign In</h2>
        <p className="mt-2 text-sm text-slate-400">
          Or{' '}
          <Link to={`/signup${searchString}`} className="font-semibold text-brand-400 hover:text-brand-300">
            create a new account
          </Link>
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Email Field */}
        <div>
          <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-2">Email address</label>
          <div className="relative">
            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3 text-slate-500">
              <Mail className="h-4 w-4" />
            </div>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="block w-full rounded-none border border-slate-800 bg-slate-950/50 py-3 pl-10 pr-4 text-sm text-white placeholder-slate-600 focus:border-brand-500 focus:bg-slate-950 focus:outline-none focus:ring-1 focus:ring-brand-500 transition-all"
              placeholder="name@company.com"
            />
          </div>
        </div>

        {/* Password Field */}
        <div>
          <div className="flex items-center justify-between mb-2">
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400">Password</label>
            <a href="#forgot" className="text-xs text-brand-400 hover:underline">Forgot password?</a>
          </div>
          <div className="relative">
            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3 text-slate-500">
              <Lock className="h-4 w-4" />
            </div>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="block w-full rounded-none border border-slate-800 bg-slate-950/50 py-3 pl-10 pr-4 text-sm text-white placeholder-slate-600 focus:border-brand-500 focus:bg-slate-950 focus:outline-none focus:ring-1 focus:ring-brand-500 transition-all"
              placeholder="••••••••"
            />
          </div>
        </div>

        {/* Remember Me */}
        <div className="flex items-center">
          <input
            id="remember-me"
            name="remember-me"
            type="checkbox"
            defaultChecked
            className="h-4 w-4 rounded border-slate-800 bg-slate-950/50 text-brand-500 focus:ring-brand-500/30 accent-brand-500"
          />
          <label htmlFor="remember-me" className="ml-2 block text-xs text-slate-400 select-none">
            Remember my workspace session
          </label>
        </div>

        {/* Submit */}
        <StableSelectorWrapper testId="button-primary-login" className="pt-2">
          <button
            type="submit"
            className="flex w-full items-center justify-center gap-2 rounded-xl bg-brand-600 px-4 py-3 text-sm font-semibold text-white shadow-lg shadow-brand-500/20 hover:bg-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-500/50 transition-all"
          >
            <LogIn className="h-4 w-4" /> Sign In
          </button>
        </StableSelectorWrapper>
      </form>
    </div>
  );
}
