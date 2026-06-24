import React from 'react';
import { CreditCard, Plus, CheckCircle, Shield, Calendar, RefreshCcw } from 'lucide-react';
import StableSelectorWrapper from '../components/StableSelectorWrapper';
import userData from '../../tests/fixtures/user.json';

export default function Payment() {
  const user = userData;

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8 w-full space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-white">Payment & Billing</h1>
        <p className="text-sm text-slate-400 mt-1">Manage your workspace credit cards and active billing cycles.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Credit Cards (Col-span 2) */}
        <div className="glass-panel rounded-2xl p-6 lg:col-span-2 space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-bold text-white">Saved Payment Methods</h2>
            <button className="inline-flex items-center gap-1 text-xs font-semibold bg-brand-600 hover:bg-brand-500 text-white px-3 py-1.5 rounded-lg transition-all">
              <Plus className="h-3.5 w-3.5" /> Add Card
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Card 1 - Visa (Primary) */}
            <div className="rounded-2xl bg-gradient-to-br from-slate-900 to-indigo-950 p-6 border border-brand-500/20 shadow-lg relative overflow-hidden flex flex-col justify-between h-48">
              <div className="flex justify-between items-start z-10">
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-brand-300">Primary Method</span>
                  <p className="text-sm font-semibold text-slate-300 mt-0.5">{user.company}</p>
                </div>
                <div className="text-xl font-black italic text-white">VISA</div>
              </div>
              <div className="z-10">
                <span className="text-xs text-slate-500 tracking-wider">CARD NUMBER</span>
                <p className="font-mono text-lg font-semibold text-slate-100 tracking-widest mt-1">•••• •••• •••• 4242</p>
              </div>
              <div className="flex justify-between items-center z-10 text-xs">
                <div>
                  <span className="text-[10px] text-slate-500 uppercase">Cardholder</span>
                  <p className="font-medium text-slate-300">{user.name}</p>
                </div>
                <div className="text-right">
                  <span className="text-[10px] text-slate-500 uppercase">Expires</span>
                  <p className="font-medium text-slate-300">12/29</p>
                </div>
              </div>
              {/* Background ambient pattern */}
              <div className="absolute -bottom-8 -left-8 h-24 w-24 bg-brand-500/10 rounded-full blur-2xl"></div>
            </div>

            {/* Card 2 - Mastercard */}
            <div className="rounded-2xl bg-gradient-to-br from-slate-900 to-slate-950 p-6 border border-slate-800 shadow-md relative overflow-hidden flex flex-col justify-between h-48">
              <div className="flex justify-between items-start z-10">
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500">Backup Method</span>
                  <p className="text-sm font-semibold text-slate-400 mt-0.5">{user.company}</p>
                </div>
                <div className="text-xl font-black italic text-red-500">MC</div>
              </div>
              <div className="z-10">
                <span className="text-xs text-slate-500 tracking-wider">CARD NUMBER</span>
                <p className="font-mono text-lg font-semibold text-slate-300 tracking-widest mt-1">•••• •••• •••• 9901</p>
              </div>
              <div className="flex justify-between items-center z-10 text-xs">
                <div>
                  <span className="text-[10px] text-slate-500 uppercase">Cardholder</span>
                  <p className="font-medium text-slate-400">{user.name}</p>
                </div>
                <div className="text-right">
                  <span className="text-[10px] text-slate-500 uppercase">Expires</span>
                  <p className="font-medium text-slate-400">08/28</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Billing Overview (Col-span 1) */}
        <div className="glass-panel rounded-2xl p-6 space-y-6">
          <h2 className="text-lg font-bold text-white border-b border-slate-900 pb-4">Billing Summary</h2>

          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-sm text-slate-400">Active License</span>
              <span className="text-sm font-semibold text-white">{user.plan}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-slate-400">Billing Cycle</span>
              <span className="text-sm text-slate-300 flex items-center gap-1">
                <Calendar className="h-3.5 w-3.5 text-brand-400" /> Monthly
              </span>
            </div>
            <div className="flex justify-between items-center font-bold text-base border-t border-slate-900 pt-4 text-white">
              <span>Next Invoice Amount</span>
              <span>$299.00</span>
            </div>
          </div>

          <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 text-xs text-slate-400 flex items-start gap-2 leading-relaxed">
            <Shield className="h-4 w-4 text-brand-400 shrink-0 mt-0.5" />
            <span>Payments are encrypted using standard SSL/TLS and processed via Stripe Secure Gateway.</span>
          </div>

          <StableSelectorWrapper testId="button-primary-invoice" className="pt-2">
            <button className="w-full flex items-center justify-center gap-2 rounded-xl border border-slate-800 hover:border-slate-700 bg-slate-950 px-4 py-2.5 text-sm font-semibold text-slate-300 hover:text-white transition-all">
              <RefreshCcw className="h-4 w-4" /> Download Latest Invoice
            </button>
          </StableSelectorWrapper>
        </div>
      </div>
    </div>
  );
}
