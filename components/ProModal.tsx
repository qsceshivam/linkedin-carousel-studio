'use client';

import React, { useState } from 'react';
import { Crown, Check, X, ExternalLink, KeyRound, AlertCircle } from 'lucide-react';
import { PAYMENT_CONFIG, validateUnlockCode, FREE_DAILY_EXPORT_LIMIT } from '@/lib/payment-config';

interface ProModalProps {
  isOpen: boolean;
  onClose: () => void;
  isPro: boolean;
  onUnlockPro: (durationHours: number) => void;
  limitReached?: boolean;
}

export const ProModal: React.FC<ProModalProps> = ({
  isOpen,
  onClose,
  isPro,
  onUnlockPro,
  limitReached = false,
}) => {
  const [unlockInput, setUnlockInput] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  if (!isOpen) return null;

  const handleVerifyCode = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');
    const result = validateUnlockCode(unlockInput);
    if (result.valid) {
      onUnlockPro(result.durationHours);
      setUnlockInput('');
      onClose();
    } else {
      setErrorMsg('Invalid Payment ID or code. Paste your Razorpay Payment ID (e.g. pay_...) from your receipt.');
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/80 p-4 backdrop-blur-sm overflow-y-auto">
      <div className="relative w-full max-w-lg rounded-3xl border border-amber-500/30 bg-slate-900 p-6 sm:p-8 shadow-2xl shadow-amber-500/10 my-auto">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 text-slate-400 hover:text-slate-200 transition-colors"
          aria-label="Close modal"
        >
          <X className="h-5 w-5" />
        </button>

        {/* Limit Reached Banner */}
        {limitReached && !isPro && (
          <div className="mb-4 flex items-start gap-2.5 rounded-xl border border-rose-500/30 bg-rose-500/10 p-3 text-xs text-rose-300">
            <AlertCircle className="h-4 w-4 shrink-0 text-rose-400 mt-0.5" />
            <div>
              <span className="font-bold block">Daily Free Limit Reached ({FREE_DAILY_EXPORT_LIMIT}/{FREE_DAILY_EXPORT_LIMIT} PDFs)</span>
              <span>Upgrade to Pro for unlimited high-DPI PDF exports & zero watermark!</span>
            </div>
          </div>
        )}

        {/* Crown Badge */}
        <div className="flex items-center gap-3 mb-4">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-tr from-amber-500 to-yellow-400 text-slate-950 shadow-lg shadow-amber-500/30 shrink-0">
            <Crown className="h-6 w-6 stroke-[2.5]" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-xl font-bold text-white tracking-tight">CarouselStudio Pro</h3>
              <span className="rounded-full bg-amber-500/20 px-2 py-0.5 text-[10px] font-bold text-amber-300 border border-amber-500/30">
                No Auto-Renewal
              </span>
            </div>
            <p className="text-xs text-slate-400">Stand out on LinkedIn with unbranded, studio-grade carousels</p>
          </div>
        </div>

        {/* Feature List */}
        <div className="mt-4 space-y-2.5 rounded-2xl border border-slate-800 bg-slate-950/60 p-4 text-xs">
          {[
            'Remove "Made with CarouselStudio" watermark completely',
            `Unlimited 4:5 High-DPI PDF Exports (Free tier: ${FREE_DAILY_EXPORT_LIMIT}/day)`,
            'Unlock all 8 Premium Themes (Indigo, Emerald, Swiss, Sunset, Nordic)',
            'Unlock Editorial Serif & Tech Mono typography styles',
            'Custom Creator Avatar & Branding on every slide',
          ].map((feat, i) => (
            <div key={i} className="flex items-center gap-2.5 text-slate-300">
              <div className="flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-emerald-500/20 text-emerald-400">
                <Check className="h-2.5 w-2.5 stroke-[3]" />
              </div>
              <span>{feat}</span>
            </div>
          ))}
        </div>

        {/* Pricing Options */}
        <div className="mt-5 grid grid-cols-2 gap-3">
          {/* 24-Hour Micro Pass */}
          <div className="flex flex-col justify-between rounded-2xl border border-slate-700 bg-slate-950 p-4 text-left hover:border-slate-600 transition-all">
            <div>
              <div className="text-[11px] font-semibold uppercase text-slate-400">24-Hour Pass</div>
              <div className="mt-1 flex items-baseline gap-1">
                <span className="text-2xl font-black text-white">{PAYMENT_CONFIG.microPass.priceInr}</span>
                <span className="text-xs text-slate-400">/ {PAYMENT_CONFIG.microPass.priceUsd}</span>
              </div>
              <p className="mt-1.5 text-[10px] text-slate-400">24 hours unlimited Pro access</p>
            </div>
            <a
              href={PAYMENT_CONFIG.microPass.checkoutUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-3 flex items-center justify-center gap-1 w-full text-center rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs py-2.5 transition-all border border-slate-700"
            >
              <span>Get 24h Pass</span>
              <ExternalLink className="h-3 w-3" />
            </a>
          </div>

          {/* 1-Year Pro Pass */}
          <div className="relative flex flex-col justify-between rounded-2xl border-2 border-amber-500/60 bg-gradient-to-b from-amber-500/10 to-slate-950 p-4 text-left shadow-lg shadow-amber-500/10">
            <span className="absolute -top-2.5 right-3 rounded-full bg-amber-500 px-2 py-0.5 text-[9px] font-extrabold uppercase tracking-wider text-slate-950">
              Best Value
            </span>
            <div>
              <div className="text-[11px] font-semibold uppercase text-amber-300">1-Year Pro Pass</div>
              <div className="mt-1 flex items-baseline gap-1">
                <span className="text-2xl font-black text-white">{PAYMENT_CONFIG.annual.priceInr}</span>
                <span className="text-xs text-slate-400">/ {PAYMENT_CONFIG.annual.priceUsd}</span>
              </div>
              <p className="mt-1.5 text-[10px] text-slate-400">Full 365 days • Pay once a year</p>
            </div>
            <a
              href={PAYMENT_CONFIG.annual.checkoutUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-3 flex items-center justify-center gap-1 w-full text-center rounded-xl bg-gradient-to-r from-amber-500 to-yellow-400 hover:brightness-110 text-slate-950 font-bold text-xs py-2.5 shadow-md transition-all"
            >
              <span>Get 1-Year Pass</span>
              <ExternalLink className="h-3 w-3" />
            </a>
          </div>
        </div>

        {/* Payment Verification / Unlock Code */}
        {!isPro ? (
          <form onSubmit={handleVerifyCode} className="mt-5 rounded-2xl border border-slate-800 bg-slate-950/60 p-3.5">
            <div className="flex items-center gap-1.5 text-xs font-semibold text-slate-300 mb-2">
              <KeyRound className="h-3.5 w-3.5 text-amber-400" />
              <span>Already paid? Activate Pro with your Razorpay Payment ID:</span>
            </div>
            <div className="flex gap-2">
              <input
                type="text"
                value={unlockInput}
                onChange={(e) => setUnlockInput(e.target.value)}
                placeholder="e.g. pay_Q3x8abc123..."
                className="flex-1 rounded-xl border border-slate-700 bg-slate-900 px-3 py-2 text-xs text-white placeholder-slate-500 focus:border-amber-500 focus:outline-none"
              />
              <button
                type="submit"
                className="rounded-xl bg-amber-500 px-4 py-2 text-xs font-bold text-slate-950 hover:bg-amber-400 transition-colors shrink-0"
              >
                Activate
              </button>
            </div>
            {errorMsg && <p className="mt-1.5 text-[11px] text-rose-400">{errorMsg}</p>}
          </form>
        ) : (
          <div className="mt-5 rounded-2xl border border-emerald-500/30 bg-emerald-500/10 p-3 text-center text-xs font-semibold text-emerald-300">
            ✓ Pro Mode is currently active in your browser!
          </div>
        )}

        {/* Footer Note */}
        <p className="mt-4 text-center text-[11px] text-slate-500">
          Instant UPI (Google Pay, PhonePe, Paytm) & Cards accepted via Razorpay.
        </p>
      </div>
    </div>
  );
};
