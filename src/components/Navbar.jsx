import React, { useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { Menu, X, ShieldAlert, Cpu, User, CreditCard, LayoutDashboard, ShoppingCart, KeyRound, UserPlus } from 'lucide-react';
import StableSelectorWrapper from './StableSelectorWrapper';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  
  // Keep track of active query parameters so regression simulations propagate
  const searchString = location.search;

  const navigation = [
    { name: 'Home', href: '/', icon: Cpu },
    { name: 'Dashboard', href: '/dashboard', icon: LayoutDashboard },
    { name: 'Payment', href: '/payment', icon: CreditCard },
    { name: 'Checkout', href: '/checkout', icon: ShoppingCart },
    { name: 'Profile', href: '/profile', icon: User },
    { name: 'Login', href: '/login', icon: KeyRound },
    { name: 'Signup', href: '/signup', icon: UserPlus },
  ];

  return (
    <nav className="glass-panel sticky top-0 z-50 w-full border-b border-slate-800 bg-slate-950/70 backdrop-blur-md">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center">
            <Link to={`/${searchString}`} className="flex items-center gap-2">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-tr from-brand-600 to-indigo-500 shadow-md shadow-brand-500/20">
                <Cpu className="h-5 w-5 text-white" />
              </div>
              <span className="font-sans text-xl font-bold tracking-tight text-white sm:block">
                EVAN<span className="text-brand-500">TECH</span>
              </span>
            </Link>
          </div>

          {/* Desktop Menu */}
          <div className="hidden lg:block">
            <StableSelectorWrapper testId="navbar-menu" className="flex items-center gap-1">
              {navigation.map((item) => (
                <NavLink
                  key={item.name}
                  to={`${item.href}${searchString}`}
                  className={({ isActive }) =>
                    `flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium transition-all duration-200 ${
                      isActive
                        ? 'bg-brand-500/10 text-brand-400 shadow-sm border border-brand-500/20'
                        : 'text-slate-400 hover:bg-slate-900 hover:text-slate-200'
                    }`
                  }
                  end={item.href === '/'}
                >
                  <item.icon className="h-4 w-4" />
                  {item.name}
                </NavLink>
              ))}
            </StableSelectorWrapper>
          </div>

          {/* Regression status alert (visible when testing simulated visual flaws) */}
          {searchString.includes('regression') && (
            <div className="hidden md:flex items-center gap-1 text-xs font-semibold bg-red-950/80 border border-red-500/40 text-red-400 px-3 py-1 rounded-full animate-pulse">
              <ShieldAlert className="h-3.5 w-3.5" />
              REGRESSION MODE ACTIVE
            </div>
          )}

          {/* Mobile menu button */}
          <div className="flex lg:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              type="button"
              className="inline-flex items-center justify-center rounded-lg p-2 text-slate-400 hover:bg-slate-900 hover:text-white focus:outline-none"
              aria-controls="mobile-menu"
              aria-expanded="false"
            >
              <span className="sr-only">Open main menu</span>
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="lg:hidden" id="mobile-menu">
          <div className="space-y-1 px-2 pb-3 pt-2 bg-slate-950 border-b border-slate-800">
            {navigation.map((item) => (
              <NavLink
                key={item.name}
                to={`${item.href}${searchString}`}
                onClick={() => setIsOpen(false)}
                className={({ isActive }) =>
                  `flex items-center gap-3 rounded-lg px-4 py-3 text-base font-medium transition-all ${
                    isActive
                      ? 'bg-brand-500/10 text-brand-400 border-l-4 border-brand-500'
                      : 'text-slate-400 hover:bg-slate-900 hover:text-slate-200'
                  }`
                }
                end={item.href === '/'}
              >
                <item.icon className="h-5 w-5" />
                {item.name}
              </NavLink>
            ))}
            {searchString.includes('regression') && (
              <div className="flex items-center gap-2 text-xs font-semibold bg-red-950/80 border border-red-500/40 text-red-400 mx-4 my-2 p-2 rounded-lg">
                <ShieldAlert className="h-4 w-4" />
                REGRESSION SIMULATION ACTIVE
              </div>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}
