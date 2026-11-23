'use client';

import React from 'react';
import { Sparkles, Download, Settings, Crown, CheckCircle2 } from 'lucide-react';

interface NavbarProps {
  onOpenSettings: () => void;
  onOpenPro: () => void;
  onExport: () => void;
  isExporting: boolean;
  isPro: boolean;
  hasCustomKey: boolean;
}

export const Navbar: React.FC<NavbarProps> = ({
  onOpenSettings,
  onOpenPro,
  onExport,
  isExporting,
  isPro,
  hasCustomKey,
}) => {
  return (
    <header className="sticky top-0 z-40 w-full border-b border-slate-800 bg-slate-950/80 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6">
        {/* Brand */}
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-tr from-blue-600 via-indigo-600 to-sky-400 text-white shadow-lg shadow-blue-500/20">
            <Sparkles className="h-5 w-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-bold text-lg text-white tracking-tight">CarouselStudio</span>
              <span className="rounded-full bg-emerald-500/10 px-2 py-0.5 text-[10px] font-semibold text-emerald-400 border border-emerald-500/20">
                AI Studio
              </span>
            </div>
            <p className="text-xs text-slate-400 hidden sm:block">
              Pixel-perfect 4:5 LinkedIn Carousels in seconds
            </p>
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Pro Status / Upgrade Button */}
          <button
            onClick={onOpenPro}
            className={`flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-semibold transition-all ${
              isPro
                ? 'bg-amber-500/15 text-amber-300 border border-amber-500/30'
                : 'bg-gradient-to-r from-amber-500 to-yellow-500 text-slate-950 hover:brightness-110 shadow-sm shadow-amber-500/20'
            }`}
          >
            <Crown className="h-3.5 w-3.5" />
            <span>{isPro ? 'Pro Active' : 'Get Pro ($4.99 / ₹99)'}</span>
          </button>

          {/* Gemini API Key */}
          <button
            onClick={onOpenSettings}
            className={`flex items-center gap-1.5 rounded-lg border px-3 py-1.5 text-xs font-medium transition-all ${
              hasCustomKey
                ? 'border-emerald-500/30 bg-emerald-500/10 text-emerald-400'
                : 'border-slate-800 bg-slate-900 text-slate-300 hover:bg-slate-800'
            }`}
            title="Configure Gemini API Key"
          >
            {hasCustomKey ? <CheckCircle2 className="h-3.5 w-3.5 text-emerald-400" /> : <Settings className="h-3.5 w-3.5" />}
            <span className="hidden sm:inline">{hasCustomKey ? 'Gemini Key Added' : 'API Key'}</span>
          </button>

          {/* Export Button */}
          <button
            onClick={onExport}
            disabled={isExporting}
            className="flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2 text-xs sm:text-sm font-semibold text-white shadow-lg shadow-blue-600/30 transition-all hover:bg-blue-500 disabled:opacity-50"
          >
            <Download className="h-4 w-4" />
            <span>{isExporting ? 'Generating PDF...' : 'Download 4:5 PDF'}</span>
          </button>
        </div>
      </div>
    </header>
  );
};
