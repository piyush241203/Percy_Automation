import React from 'react';
import { Outlet, Link } from 'react-router-dom';
import { Cpu } from 'lucide-react';
import StableSelectorWrapper from '../components/StableSelectorWrapper';

export default function AuthLayout() {
  const searchString = window.location.search;

  return (
    <StableSelectorWrapper testId="auth-body" className="min-flex flex min-h-screen flex-col items-center justify-center bg-slate-950 px-4 py-12 sm:px-6 lg:px-8 ambient-gradient">
      <div className="w-full max-w-md space-y-8">
        <div className="flex flex-col items-center">
          <Link to={`/${searchString}`} className="flex flex-col items-center gap-2">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-tr from-brand-600 to-indigo-500 shadow-lg shadow-brand-500/20">
              <Cpu className="h-6 w-6 text-white" />
            </div>
            <span className="font-sans text-2xl font-bold tracking-tight text-white mt-2">
              EVAN<span className="text-brand-500">TECH</span>
            </span>
          </Link>
        </div>
        
        <div className="glass-panel rounded-2xl p-8 shadow-xl">
          <Outlet />
        </div>
      </div>
    </StableSelectorWrapper>
  );
}
