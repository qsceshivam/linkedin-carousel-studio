'use client';

import React from 'react';
import { Crown, Check, X, Sparkles, Zap, ExternalLink, ShieldCheck } from 'lucide-react';
import { PAYMENT_CONFIG } from '@/lib/payment-config';

interface ProModalProps {
  isOpen: boolean;
  onClose: () => void;
  isPro: boolean;
  onTogglePro: () => void;
}

export const ProModal: React.FC<ProModalProps> = ({
  isOpen,
  onClose,
  isPro,
  onTogglePro,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/80 p-4 backdrop-blur-sm">
      <div className="relative w-full max-w-lg rounded-3xl border border-amber-500/30 bg-slate-900 p-6 sm:p-8 shadow-2xl shadow-amber-500/10">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 text-slate-400 hover:text-slate-200 transition-colors"
        >
          <X className="h-5 w-5" />
        </button>

        {/* Crown Badge */}
        <div className="flex items-center gap-3 mb-4">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-tr from-amber-500 to-yellow-400 text-slate-950 shadow-lg shadow-amber-500/30">
            <Crown className="h-6 w-6 stroke-[2.5]" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-xl font-bold text-white tracking-tight">CarouselStudio Pro</h3>
              <span className="rounded-full bg-amber-500/20 px-2 py-0.5 text-[10px] font-bold text-amber-300 border border-amber-500/30">
                0 Monthly Fees
              </span>
            </div>
            <p className="text-xs text-slate-400">Unlock high-converting, unbranded viral carousels</p>
          </div>
        </div>

        {/* Feature List */}
        <div className="mt-4 space-y-2.5 rounded-2xl border border-slate-800 bg-slate-950/60 p-4 text-xs">
          {[
            'Remove "Made with CarouselStudio" watermark completely',
            'Full 4K Ultra-Sharp PDF Export (300 DPI for LinkedIn)',
            'Upload custom avatar and company branding on all slides',
            'Unlimited generations & instant slide customization',
            'Access all current and upcoming aesthetic themes',
          ].map((feat, i) => (
            <div key={i} className="flex items-center gap-2.5 text-slate-300">
              <div className="flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-emerald-500/20 text-emerald-400">
                <Check className="h-2.5 w-2.5 stroke-[3]" />
              </div>
              <span>{feat}</span>
            </div>
          ))}
        </div>

        {/* Pricing Options (From User Masterplan) */}
        <div className="mt-5 grid grid-cols-2 gap-3">
          {/* Micro Pass */}
          <div className="flex flex-col justify-between rounded-2xl border border-slate-700 bg-slate-950 p-4 text-left hover:border-slate-600 transition-all">
            <div>
              <div className="text-[11px] font-semibold uppercase text-slate-400">24-Hour Pass</div>
              <div className="mt-1 flex items-baseline gap-1">
                <span className="text-2xl font-black text-white">{PAYMENT_CONFIG.microPass.priceUsd}</span>
                <span className="text-xs text-slate-400">/ {PAYMENT_CONFIG.microPass.priceInr}</span>
              </div>
              <p className="mt-1.5 text-[10px] text-slate-400">Single sprint or client presentation</p>
            </div>
            <a
              href={PAYMENT_CONFIG.microPass.checkoutUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-3 flex items-center justify-center gap-1 w-full text-center rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs py-2 transition-all border border-slate-700"
            >
              <span>Get 24h Pass</span>
              <ExternalLink className="h-3 w-3" />
            </a>
          </div>

          {/* Lifetime Deal */}
          <div className="relative flex flex-col justify-between rounded-2xl border-2 border-amber-500/60 bg-gradient-to-b from-amber-500/10 to-slate-950 p-4 text-left shadow-lg shadow-amber-500/10">
            <span className="absolute -top-2.5 right-3 rounded-full bg-amber-500 px-2 py-0.5 text-[9px] font-extrabold uppercase tracking-wider text-slate-950">
              Best Value
            </span>
            <div>
              <div className="text-[11px] font-semibold uppercase text-amber-300">Lifetime Deal</div>
              <div className="mt-1 flex items-baseline gap-1">
                <span className="text-2xl font-black text-white">{PAYMENT_CONFIG.lifetime.priceUsd}</span>
                <span className="text-xs text-slate-400">/ {PAYMENT_CONFIG.lifetime.priceInr}</span>
              </div>
              <p className="mt-1.5 text-[10px] text-slate-400">Pay once, keep forever • 0 subscription</p>
            </div>
            <a
              href={PAYMENT_CONFIG.lifetime.checkoutUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-3 flex items-center justify-center gap-1 w-full text-center rounded-xl bg-gradient-to-r from-amber-500 to-yellow-400 hover:brightness-110 text-slate-950 font-bold text-xs py-2 shadow-md transition-all"
            >
              <span>Get Lifetime Deal</span>
              <ExternalLink className="h-3 w-3" />
            </a>
          </div>
        </div>

        {/* Development Mode Instant Simulator */}
        <div className="mt-6 rounded-2xl border border-dashed border-blue-500/40 bg-blue-500/5 p-3.5 text-center">
          <div className="flex items-center justify-between">
            <div className="text-left">
              <div className="text-xs font-bold text-white flex items-center gap-1.5">
                <Zap className="h-3.5 w-3.5 text-amber-400" />
                <span>Micro-SaaS Sandbox Toggle</span>
              </div>
              <p className="text-[11px] text-slate-400">Test watermark-free export right now</p>
            </div>

            <button
              onClick={onTogglePro}
              className={`rounded-xl px-4 py-2 text-xs font-bold transition-all shadow-md ${
                isPro
                  ? 'bg-emerald-500 text-slate-950 hover:bg-emerald-400'
                  : 'bg-amber-500 text-slate-950 hover:bg-amber-400'
              }`}
            >
              {isPro ? 'Pro Enabled ✓' : 'Enable Pro Mode'}
            </button>
          </div>
        </div>

        {/* Footer Note */}
        <p className="mt-4 text-center text-[11px] text-slate-500">
          Payment integration ready for Stripe, Razorpay or LemonSqueezy webhook.
        </p>
      </div>
    </div>
  );
};
