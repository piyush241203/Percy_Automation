import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ShoppingCart, ShieldCheck, Tag, CreditCard, Lock } from 'lucide-react';
import StableSelectorWrapper from '../components/StableSelectorWrapper';
import userData from '../../tests/fixtures/user.json';
import productData from '../../tests/fixtures/product.json';

export default function Checkout() {
  const user = userData;
  const product = productData[0]; // Enterprise Visual Suite
  const navigate = useNavigate();
  const searchString = window.location.search;

  const [cardName, setCardName] = useState(user.name);
  const [cardNumber, setCardNumber] = useState('4242 4242 4242 4242');
  const [expiry, setExpiry] = useState('12/29');
  const [cvv, setCvv] = useState('123');

  const handleCheckout = (e) => {
    e.preventDefault();
    // Simulate successful checkout and redirect to payment
    navigate(`/payment${searchString}`);
  };

  const tax = product.price * 0.08; // 8% sales tax
  const total = product.price + tax;

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8 w-full space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-white flex items-center gap-2">
          <ShoppingCart className="h-7 w-7 text-brand-500" /> Secure Checkout
        </h1>
        <p className="text-sm text-slate-400 mt-1">Review your plan license details and configure billing credentials.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Billing Form (Col-span 2) */}
        <div className="glass-panel rounded-2xl p-6 lg:col-span-2 space-y-6">
          <h2 className="text-lg font-bold text-white border-b border-slate-900 pb-4">Credit Card Information</h2>

          <form onSubmit={handleCheckout} className="space-y-4">
            {/* Cardholder Name */}
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-2">Name on card</label>
              <input
                type="text"
                required
                value={cardName}
                onChange={(e) => setCardName(e.target.value)}
                className="block w-full rounded-xl border border-slate-800 bg-slate-950/50 py-3 px-4 text-sm text-white focus:border-brand-500 focus:outline-none focus:ring-1 focus:ring-brand-500 transition-all"
              />
            </div>

            {/* Card Number */}
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-2">Card number</label>
              <div className="relative">
                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3 text-slate-500">
                  <CreditCard className="h-4 w-4" />
                </div>
                <input
                  type="text"
                  required
                  value={cardNumber}
                  onChange={(e) => setCardNumber(e.target.value)}
                  className="block w-full rounded-xl border border-slate-800 bg-slate-950/50 py-3 pl-10 pr-4 text-sm text-white focus:border-brand-500 focus:outline-none focus:ring-1 focus:ring-brand-500 transition-all"
                  placeholder="0000 0000 0000 0000"
                />
              </div>
            </div>

            {/* Expiry and CVV */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-2">Expiration date</label>
                <input
                  type="text"
                  required
                  value={expiry}
                  onChange={(e) => setExpiry(e.target.value)}
                  className="block w-full rounded-xl border border-slate-800 bg-slate-950/50 py-3 px-4 text-sm text-white focus:border-brand-500 focus:outline-none focus:ring-1 focus:ring-brand-500 transition-all"
                  placeholder="MM/YY"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-2">Security code (CVV)</label>
                <input
                  type="password"
                  required
                  maxLength={4}
                  value={cvv}
                  onChange={(e) => setCvv(e.target.value)}
                  className="block w-full rounded-xl border border-slate-800 bg-slate-950/50 py-3 px-4 text-sm text-white focus:border-brand-500 focus:outline-none focus:ring-1 focus:ring-brand-500 transition-all"
                  placeholder="•••"
                />
              </div>
            </div>

            {/* Submit checkout wrapped in our StableSelectorWrapper */}
            <div className="pt-4">
              <StableSelectorWrapper testId="checkout-submit-button">
                <button
                  type="submit"
                  className="w-full flex items-center justify-center gap-2 rounded-xl bg-brand-600 px-6 py-3.5 text-sm font-semibold text-white shadow-lg shadow-brand-500/25 hover:bg-brand-500 transition-all"
                >
                  <Lock className="h-4 w-4" /> Authorize & Pay ${total.toFixed(2)}
                </button>
              </StableSelectorWrapper>
            </div>
          </form>
        </div>

        {/* Order Summary (Col-span 1) */}
        <div className="glass-panel rounded-2xl p-6 flex flex-col justify-between space-y-6">
          <div className="space-y-6">
            <h2 className="text-lg font-bold text-white border-b border-slate-900 pb-4">Order Summary</h2>

            <div className="space-y-3">
              <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Purchased Product</span>
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-sm font-semibold text-slate-200">{product.name}</h3>
                  <p className="text-xs text-slate-400 mt-0.5">Renewed monthly</p>
                </div>
                <span className="text-sm font-semibold text-white">${product.price.toFixed(2)}</span>
              </div>
            </div>

            {/* Cost Breakdown */}
            <div className="border-t border-slate-900 pt-4 space-y-2 text-xs">
              <div className="flex justify-between text-slate-400">
                <span>Subtotal</span>
                <span>${product.price.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-slate-400">
                <span>Estimated VAT / Tax (8%)</span>
                <span>${tax.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-base font-bold text-white border-t border-slate-900 pt-3">
                <span>Total Charge</span>
                <span>${total.toFixed(2)}</span>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            {/* Promo Code Input */}
            <div className="flex gap-2">
              <input
                type="text"
                placeholder="PROMOCODE"
                disabled
                className="block w-full rounded-lg border border-slate-900 bg-slate-950/20 py-2 px-3 text-xs text-slate-500 cursor-not-allowed placeholder-slate-700"
              />
              <button disabled className="rounded-lg bg-slate-900 border border-slate-800 text-slate-500 text-xs px-4 py-2 cursor-not-allowed">
                Apply
              </button>
            </div>

            <div className="flex items-center gap-2 text-[10px] text-slate-500">
              <ShieldCheck className="h-4 w-4 text-emerald-500" />
              <span>100% money back guarantee for first 14 days.</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
