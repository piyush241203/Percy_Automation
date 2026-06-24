import React from 'react';
import { ArrowUpRight, ArrowDownRight, CreditCard, Layout, Zap, Award, Layers, Bell } from 'lucide-react';
import StableSelectorWrapper from '../components/StableSelectorWrapper';
import userData from '../../tests/fixtures/user.json';
import transactionData from '../../tests/fixtures/order.json';

export default function Dashboard() {
  const user = userData;
  const transactions = transactionData;

  const stats = [
    {
      name: 'Available Capital',
      value: `$${user.balance.toLocaleString('en-US', { minimumFractionDigits: 2 })}`,
      change: '+12.5%',
      changeType: 'increase',
      icon: CreditCard,
    },
    {
      name: 'Snapshots Consumed',
      value: '14,205',
      change: '14.2% of cap',
      changeType: 'neutral',
      icon: Layers,
    },
    {
      name: 'Builds Triggered',
      value: '428',
      change: '+32 this week',
      changeType: 'increase',
      icon: Zap,
    },
    {
      name: 'Visual Pass Rate',
      value: '99.2%',
      change: '+0.4%',
      changeType: 'increase',
      icon: Award,
    },
  ];

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8 w-full space-y-8">
      {/* Welcome banner */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          {/* Static greetings are critical to prevent visual test failures */}
          <h1 className="text-3xl font-bold tracking-tight text-white">
            Evantech Workspace: {user.company}
          </h1>
          <p className="text-sm text-slate-400 mt-1">
            Logged in as {user.name} ({user.role}) &bull; Current plan: {user.plan}
          </p>
        </div>
        
        {/* Dynamic looking but stable notification badge */}
        <div className="flex items-center gap-2 self-start md:self-auto bg-slate-900 border border-slate-800 rounded-xl px-4 py-2 text-xs font-semibold text-slate-300">
          <Bell className="h-4 w-4 text-brand-400" />
          <span>Active Session Notifications: 2</span>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <div
            key={stat.name}
            className={`rounded-2xl p-6 relative overflow-hidden ${
              stat.name === 'Available Capital'
                ? 'bg-gradient-to-br from-emerald-950 to-indigo-950 border border-emerald-500/30 shadow-lg shadow-emerald-500/10'
                : 'glass-panel'
            }`}
          >
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold uppercase tracking-wider text-slate-500">{stat.name}</span>
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-slate-800 border border-slate-700 text-brand-400">
                <stat.icon className="h-5 w-5" />
              </div>
            </div>
            <div className="mt-4 flex items-baseline gap-2">
              <span className="text-2xl font-bold text-white">{stat.value}</span>
              <span
                className={`inline-flex items-center gap-0.5 text-xs font-medium ${
                  stat.changeType === 'increase'
                    ? 'text-emerald-400'
                    : stat.changeType === 'decrease'
                    ? 'text-rose-400'
                    : 'text-slate-400'
                }`}
              >
                {stat.changeType === 'increase' && <ArrowUpRight className="h-3 w-3" />}
                {stat.changeType === 'decrease' && <ArrowDownRight className="h-3 w-3" />}
                {stat.change}
              </span>
            </div>
            {/* Ambient subtle card glow */}
            <div className="absolute -bottom-4 -right-4 h-16 w-16 bg-brand-500/5 blur-2xl rounded-full"></div>
          </div>
        ))}
      </div>

      {/* Layout Grid containing Transaction Log and Charts */}
      <StableSelectorWrapper testId="dashboard-grid" className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Transaction History Card (Col-span 2) */}
        <div className="glass-panel rounded-2xl p-6 lg:col-span-2 space-y-6">
          <div className="flex items-center justify-between border-b border-slate-900 pb-4">
            <h2 className="text-lg font-bold text-white">Recent Transactions</h2>
            <button className="text-xs font-semibold text-brand-400 hover:text-brand-300">View all logs</button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-slate-900 text-slate-500 text-xs font-semibold uppercase tracking-wider">
                  <th className="pb-3 pr-2">Reference ID</th>
                  <th className="pb-3 px-2">Service</th>
                  <th className="pb-3 px-2">Date</th>
                  <th className="pb-3 px-2 text-right">Amount</th>
                  <th className="pb-3 pl-2 text-right">Status</th>
                </tr>
              </thead>
              <tbody className="text-sm divide-y divide-slate-900">
                {transactions.map((txn) => (
                  <tr key={txn.id} className="hover:bg-slate-900/30 transition-colors">
                    <td className="py-3.5 pr-2 font-mono font-medium text-slate-300">{txn.id}</td>
                    <td className="py-3.5 px-2 text-slate-300">{txn.productName}</td>
                    {/* Render static string format directly to prevent local timezone offsets in visual comparisons */}
                    <td className="py-3.5 px-2 text-slate-400">{txn.date.split('T')[0]}</td>
                    <td className="py-3.5 px-2 text-right font-medium text-white">
                      ${txn.amount.toFixed(2)}
                    </td>
                    <td className="py-3.5 pl-2 text-right">
                      <span
                        className={`inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium ${
                          txn.status === 'Completed'
                            ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                            : 'bg-amber-500/10 text-amber-400 border border-amber-500/20'
                        }`}
                      >
                        {txn.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Visual Regression Simulator Info Panel (Col-span 1) */}
        <div className="glass-panel rounded-2xl p-6 flex flex-col justify-between space-y-6">
          <div>
            <h2 className="text-lg font-bold text-white mb-4">Regression Simulator</h2>
            <p className="text-sm text-slate-400 leading-relaxed mb-4">
              Use these query parameters to dynamically introduce UI changes and verify that Percy's comparison engine catches them:
            </p>
            <div className="space-y-2 text-xs font-mono">
              <div className="bg-slate-900/50 p-2.5 rounded-lg border border-slate-800 flex justify-between items-center">
                <span className="text-brand-400">?regression=layout_break</span>
                <span className="text-slate-500">Breaks Grid Layout</span>
              </div>
              <div className="bg-slate-900/50 p-2.5 rounded-lg border border-slate-800 flex justify-between items-center">
                <span className="text-brand-400">?regression=color_change</span>
                <span className="text-slate-500">Shifts Button Hues</span>
              </div>
              <div className="bg-slate-900/50 p-2.5 rounded-lg border border-slate-800 flex justify-between items-center">
                <span className="text-brand-400">?regression=font_change</span>
                <span className="text-slate-500">Alters App Typography</span>
              </div>
              <div className="bg-slate-900/50 p-2.5 rounded-lg border border-slate-800 flex justify-between items-center">
                <span className="text-brand-400">?regression=button_shift</span>
                <span className="text-slate-500">Displaces Core Actions</span>
              </div>
            </div>
          </div>

          <div className="bg-slate-900/80 p-4 rounded-xl border border-slate-800 text-xs text-slate-500">
            <span className="font-semibold text-slate-300 block mb-1">Visual Regression Tip</span>
            Stable automation selectors (`data-testid`) are configured on layout panels to allow stable locating.
          </div>
        </div>
      </StableSelectorWrapper>
    </div>
  );
}
