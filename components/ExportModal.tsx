'use client';

import React from 'react';
import { Loader2, CheckCircle2, Download, X, Sparkles, Share2 } from 'lucide-react';

interface ExportModalProps {
  isOpen: boolean;
  onClose: () => void;
  current: number;
  total: number;
  statusMessage: string;
  isComplete: boolean;
}

export const ExportModal: React.FC<ExportModalProps> = ({
  isOpen,
  onClose,
  current,
  total,
  statusMessage,
  isComplete,
}) => {
  if (!isOpen) return null;

  const percent = total > 0 ? Math.round((current / total) * 100) : 0;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/80 p-4 backdrop-blur-sm">
      <div className="relative w-full max-w-md rounded-3xl border border-slate-800 bg-slate-900 p-6 text-center shadow-2xl">
        {!isComplete ? (
          <>
            <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-500/10 text-blue-400 border border-blue-500/20">
              <Loader2 className="h-7 w-7 animate-spin" />
            </div>

            <h3 className="text-lg font-bold text-white">Rendering 4:5 Carousel</h3>
            <p className="mt-1 text-xs text-slate-400">{statusMessage}</p>

            {/* Progress Bar */}
            <div className="mt-5 w-full">
              <div className="flex justify-between text-xs font-semibold text-slate-400 mb-1.5">
                <span>Slide {current} of {total}</span>
                <span>{percent}%</span>
              </div>
              <div className="h-2 w-full overflow-hidden rounded-full bg-slate-800">
                <div
                  className="h-full bg-gradient-to-r from-blue-600 to-indigo-500 transition-all duration-300 rounded-full"
                  style={{ width: `${percent}%` }}
                />
              </div>
            </div>

            <p className="mt-4 text-[11px] text-slate-500">
              Rendering at 2x High-DPI for crisp text on mobile screens...
            </p>
          </>
        ) : (
          <>
            <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
              <CheckCircle2 className="h-7 w-7" />
            </div>

            <h3 className="text-lg font-bold text-white">PDF Download Ready!</h3>
            <p className="mt-1 text-xs text-slate-400">
              Your pixel-perfect LinkedIn document is saved to your computer.
            </p>

            {/* LinkedIn Upload Tip Box */}
            <div className="mt-5 rounded-2xl border border-blue-500/30 bg-blue-500/5 p-4 text-left">
              <div className="flex items-center gap-2 text-xs font-bold text-blue-400 mb-1">
                <Share2 className="h-4 w-4" />
                <span>How to Post on LinkedIn:</span>
              </div>
              <ol className="list-decimal list-inside space-y-1 text-[11px] text-slate-300">
                <li>Click <strong>Start a post</strong> on LinkedIn.</li>
                <li>Click the <strong>Document (More / Add document)</strong> icon.</li>
                <li>Upload this PDF and give it a catchy title!</li>
              </ol>
            </div>

            <button
              onClick={onClose}
              className="mt-6 w-full rounded-xl bg-blue-600 py-3 text-xs font-bold text-white hover:bg-blue-500 transition-colors shadow-lg shadow-blue-500/25"
            >
              Done & Close
            </button>
          </>
        )}
      </div>
    </div>
  );
};
