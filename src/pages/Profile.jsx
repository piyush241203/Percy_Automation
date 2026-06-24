import React, { useState, useEffect } from 'react';
import { User, Mail, Shield, Key, Copy, Check, Clock, RefreshCw } from 'lucide-react';
import StableSelectorWrapper from '../components/StableSelectorWrapper';
import userData from '../../tests/fixtures/user.json';

export default function Profile() {
  const user = userData;
  const [copied, setCopied] = useState(false);
  const [token, setToken] = useState('evt_live_89a4j2910lksda908123k');
  
  // Dynamic fields to demonstrate visual noise
  const [currentTime, setCurrentTime] = useState(new Date().toUTCString());
  const [sessionID, setSessionID] = useState('sess_' + Math.floor(Math.random() * 10000000));
  const [counter, setCounter] = useState(0);

  // Periodic triggers for local demonstration (will show visual noise if not ignored)
  useEffect(() => {
    const timer = setInterval(() => {
      setCounter(prev => prev + 1);
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const handleCopy = () => {
    navigator.clipboard.writeText(token);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const rotateToken = () => {
    const randomHex = Array.from({length: 24}, () => Math.floor(Math.random()*16).toString(16)).join('');
    setToken('evt_live_' + randomHex);
  };

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8 w-full space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-white">Developer Settings</h1>
        <p className="text-sm text-slate-400 mt-1">Configure profile credentials, tokens, and active session environments.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* User Card & Settings (Col-span 2) */}
        <div className="glass-panel rounded-2xl p-6 lg:col-span-2 space-y-6">
          <div className="flex flex-col sm:flex-row items-center gap-6 pb-6 border-b border-slate-900">
            <StableSelectorWrapper testId="hero-avatar" className="relative h-20 w-20 shrink-0">
              <img
                src={user.avatar}
                alt={user.name}
                className="h-full w-full rounded-2xl object-cover border-2 border-brand-500/30"
              />
              <span className="absolute bottom-0 right-0 h-4 w-4 rounded-full bg-emerald-500 border-2 border-slate-950" title="Online Status"></span>
            </StableSelectorWrapper>
            
            <div className="text-center sm:text-left space-y-1">
              <h2 className="text-xl font-bold text-white">{user.name}</h2>
              <p className="text-sm text-brand-400 font-semibold">{user.role}</p>
              <p className="text-xs text-slate-500">Member since {user.joinedDate}</p>
            </div>
          </div>

          {/* Form Rows */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <span className="block text-xs font-semibold uppercase tracking-wider text-slate-500 mb-1">Company name</span>
              <p className="text-sm font-medium text-slate-200 bg-slate-900/40 p-3 rounded-lg border border-slate-900">{user.company}</p>
            </div>
            <div>
              <span className="block text-xs font-semibold uppercase tracking-wider text-slate-500 mb-1">Email address</span>
              <p className="text-sm font-medium text-slate-200 bg-slate-900/40 p-3 rounded-lg border border-slate-900">{user.email}</p>
            </div>
          </div>

          {/* API Credentials */}
          <div className="space-y-4 pt-4 border-t border-slate-900">
            <div>
              <h3 className="text-sm font-bold text-slate-200 flex items-center gap-1.5">
                <Key className="h-4 w-4 text-brand-400" /> Webhook API Access Key
              </h3>
              <p className="text-xs text-slate-400 mt-1">Use this secret key.</p>
            </div>

            <div className="flex gap-2">
              <input
                type="text"
                readOnly
                value={token}
                className="block w-full rounded-xl border border-slate-800 bg-slate-950/60 font-mono text-xs text-slate-300 py-3 px-4 focus:outline-none"
              />
              <button
                onClick={handleCopy}
                className="flex items-center justify-center rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-800 px-4 text-slate-300 transition-colors"
                title="Copy token"
              >
                {copied ? <Check className="h-4 w-4 text-emerald-400" /> : <Copy className="h-4 w-4" />}
              </button>
              <button
                onClick={rotateToken}
                className="flex items-center justify-center rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-800 px-4 text-slate-300 transition-colors"
                title="Rotate token"
              >
                <RefreshCw className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Dynamic content card - Flagged for Percy to ignore */}
        <div className="space-y-6">
          {/* EDUCATIONAL DEMONSTRATION OF DYNAMIC IGNORE */}
          <StableSelectorWrapper
            testId="dynamic-session-card"
            ignoreInPercy={true}
            className="glass-panel rounded-2xl p-6 border-dashed border-slate-700/60 relative flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between border-b border-slate-900 pb-3 mb-4">
                <h3 className="text-sm font-bold text-slate-200 flex items-center gap-1">
                  <Clock className="h-4 w-4 text-amber-500" /> Dynamic Live Session
                </h3>
                <span className="text-[10px] font-bold bg-amber-500/10 border border-amber-500/30 text-amber-400 px-2 py-0.5 rounded">
                  Percy Ignored
                </span>
              </div>
              
              <p className="text-xs text-slate-400 leading-relaxed mb-4">
                This widget displays real-time timestamps, random session keys, and running counters. It is flagged with 
                <code className="text-amber-400 font-mono bg-slate-900 px-1 py-0.5 rounded mx-1 text-[10px]">data-percy-ignore</code> 
                so Percy renders it as blank space, preventing false-positive test failures.
              </p>

              <div className="space-y-3 text-xs bg-slate-950/50 p-3 rounded-lg border border-slate-900 font-mono">
                <div>
                  <span className="text-slate-500 block text-[9px] uppercase tracking-wider">Live System Time:</span>
                  <span className="text-slate-300 select-all font-semibold">{currentTime}</span>
                </div>
                <div>
                  <span className="text-slate-500 block text-[9px] uppercase tracking-wider">Session Key (Random):</span>
                  <span className="text-slate-300 font-semibold">{sessionID}</span>
                </div>
                <div>
                  <span className="text-slate-500 block text-[9px] uppercase tracking-wider">Running Tick Counter:</span>
                  <span className="text-brand-400 font-bold">{counter} ticks</span>
                </div>
              </div>
            </div>

            <div className="mt-6 text-[10px] text-slate-500">
              Note: When inspecting Percy snapshots for this page, this dashboard section will remain empty/masked.
            </div>
          </StableSelectorWrapper>
        </div>
      </div>
    </div>
  );
}
