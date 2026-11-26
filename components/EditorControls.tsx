'use client';

import React, { useState } from 'react';
import { ThemeId, CreatorProfile, FontStyle } from '@/types/carousel';
import { THEMES } from '@/lib/themes';
import { PRO_THEME_IDS, PRO_FONT_STYLES } from '@/lib/payment-config';
import {
  Wand2,
  Palette,
  User,
  Sliders,
  Sparkles,
  ChevronDown,
  Upload,
  RefreshCw,
  Type,
  Crown,
} from 'lucide-react';

interface EditorControlsProps {
  topic: string;
  onTopicChange: (topic: string) => void;
  tone: string;
  onToneChange: (tone: string) => void;
  slideCount: number;
  onSlideCountChange: (count: number) => void;
  themeId: ThemeId;
  onThemeChange: (themeId: ThemeId) => void;
  fontStyle: FontStyle;
  onFontStyleChange: (fontStyle: FontStyle) => void;
  creator: CreatorProfile;
  onCreatorChange: (creator: CreatorProfile) => void;
  onGenerate: () => void;
  isGenerating: boolean;
  onReset: () => void;
  isPro: boolean;
  onOpenPro: () => void;
}

export const TEST_EXAMPLES = [
  {
    category: '🚀 Tech & SaaS',
    topic: 'Stop Over-Engineering: 5 Architecture Mistakes Costing Startups $50k',
    tone: 'contrarian',
    slides: 7,
  },
  {
    category: '💼 Freelance & Agency',
    topic: 'How I Landed a $12,000 Client on LinkedIn with 0 Cold Calls (Step-by-Step)',
    tone: 'storytelling',
    slides: 7,
  },
  {
    category: '🧠 High Performance',
    topic: 'The 1% Rule: 7 Micro-Habits That Separate Top 1% Operators from Everyone Else',
    tone: 'educational',
    slides: 7,
  },
  {
    category: '💰 Wealth & Business',
    topic: '5 Invisible Money Traps Keeping High Earners Living Paycheck to Paycheck in 2026',
    tone: 'step-by-step',
    slides: 7,
  },
];

const TONES = [
  { id: 'educational', label: 'Educational', desc: 'Clear, informative & structured' },
  { id: 'contrarian', label: 'Contrarian', desc: 'Bold, provocative & pattern-breaking' },
  { id: 'storytelling', label: 'Storytelling', desc: 'Narrative hook & personal lessons' },
  { id: 'step-by-step', label: 'Step-by-Step', desc: 'Actionable recipe & execution checklist' },
  { id: 'executive', label: 'Executive', desc: 'Concise, high-level business strategy' },
];

export const EditorControls: React.FC<EditorControlsProps> = ({
  topic,
  onTopicChange,
  tone,
  onToneChange,
  slideCount,
  onSlideCountChange,
  themeId,
  onThemeChange,
  fontStyle,
  onFontStyleChange,
  creator,
  onCreatorChange,
  onGenerate,
  isGenerating,
  onReset,
  isPro,
  onOpenPro,
}) => {
  const [activeTab, setActiveTab] = useState<'prompt' | 'theme' | 'creator'>('prompt');

  const handleAvatarUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        onCreatorChange({
          ...creator,
          avatarUrl: reader.result as string,
        });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleApplyExample = (ex: (typeof TEST_EXAMPLES)[0]) => {
    onTopicChange(ex.topic);
    onToneChange(ex.tone);
    onSlideCountChange(ex.slides);
  };

  return (
    <div className="flex h-full flex-col rounded-2xl border border-slate-800 bg-slate-900/60 p-4 backdrop-blur-md">
      {/* Navigation Tabs */}
      <div className="grid grid-cols-3 gap-1 rounded-xl bg-slate-950/70 p-1 border border-slate-800">
        <button
          onClick={() => setActiveTab('prompt')}
          className={`flex items-center justify-center gap-2 rounded-lg py-2 text-xs font-semibold transition-all ${
            activeTab === 'prompt'
              ? 'bg-blue-600 text-white shadow-md shadow-blue-600/30'
              : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          <Wand2 className="h-3.5 w-3.5" />
          <span>Content</span>
        </button>

        <button
          onClick={() => setActiveTab('theme')}
          className={`flex items-center justify-center gap-2 rounded-lg py-2 text-xs font-semibold transition-all ${
            activeTab === 'theme'
              ? 'bg-blue-600 text-white shadow-md shadow-blue-600/30'
              : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          <Palette className="h-3.5 w-3.5" />
          <span>Styles</span>
        </button>

        <button
          onClick={() => setActiveTab('creator')}
          className={`flex items-center justify-center gap-2 rounded-lg py-2 text-xs font-semibold transition-all ${
            activeTab === 'creator'
              ? 'bg-blue-600 text-white shadow-md shadow-blue-600/30'
              : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          <User className="h-3.5 w-3.5" />
          <span>Branding</span>
        </button>
      </div>

      {/* Tab Contents */}
      <div className="flex-1 overflow-y-auto py-4 space-y-5 scrollbar-thin">
        {/* TAB 1: PROMPT & GENERATION */}
        {activeTab === 'prompt' && (
          <div className="space-y-4">
            {/* Topic Input */}
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-1.5">
                Topic or Raw Draft
              </label>
              <textarea
                value={topic}
                onChange={(e) => onTopicChange(e.target.value)}
                rows={3}
                placeholder="Enter a topic, headline, or paste a rough note..."
                className="w-full rounded-xl border border-slate-700 bg-slate-950/80 p-3 text-sm text-slate-100 placeholder-slate-500 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 focus:outline-none transition-all"
              />
            </div>

            {/* Quick Test Examples (Global Quality Showcase) */}
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <span className="text-[11px] font-bold text-slate-300 uppercase tracking-wider flex items-center gap-1">
                  <Sparkles className="h-3 w-3 text-amber-400" />
                  <span>1-Click Test Prompts</span>
                </span>
                <span className="text-[10px] text-slate-500">Click to load</span>
              </div>
              <div className="flex flex-col gap-1.5">
                {TEST_EXAMPLES.map((ex, i) => (
                  <button
                    key={i}
                    onClick={() => handleApplyExample(ex)}
                    className="text-left rounded-xl border border-slate-800/80 bg-slate-950/50 p-2.5 text-xs text-slate-300 hover:border-blue-500/50 hover:bg-slate-800/60 hover:text-white transition-all group"
                  >
                    <div className="flex items-center justify-between text-[10px] text-slate-400 mb-0.5">
                      <span className="font-semibold text-blue-400">{ex.category}</span>
                      <span className="opacity-70 group-hover:opacity-100">Load prompt →</span>
                    </div>
                    <div className="font-medium text-slate-200 truncate">{ex.topic}</div>
                  </button>
                ))}
              </div>
            </div>

            {/* Slide Count */}
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-1.5">
                Slide Count
              </label>
              <div className="grid grid-cols-3 gap-2">
                {[5, 7, 10].map((num) => (
                  <button
                    key={num}
                    onClick={() => onSlideCountChange(num)}
                    className={`rounded-xl border py-2 text-center text-xs font-bold transition-all ${
                      slideCount === num
                        ? 'border-blue-500 bg-blue-500/15 text-blue-400'
                        : 'border-slate-800 bg-slate-950 text-slate-400 hover:bg-slate-800'
                    }`}
                  >
                    {num} Slides {num === 7 && '🔥'}
                  </button>
                ))}
              </div>
            </div>

            {/* Tone Selector */}
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-1.5">
                Carousel Tone
              </label>
              <div className="grid grid-cols-2 gap-2">
                {TONES.map((t) => (
                  <button
                    key={t.id}
                    onClick={() => onToneChange(t.id)}
                    className={`rounded-xl border p-2 text-left transition-all ${
                      tone === t.id
                        ? 'border-blue-500 bg-blue-500/15 text-blue-300'
                        : 'border-slate-800 bg-slate-950 text-slate-400 hover:bg-slate-800'
                    }`}
                  >
                    <div className="text-xs font-bold">{t.label}</div>
                    <div className="text-[10px] text-slate-500 truncate">{t.desc}</div>
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: THEMES & STYLING */}
        {activeTab === 'theme' && (
          <div className="space-y-4">
            {/* Font Typography Selector */}
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-1.5 flex items-center gap-1.5">
                <Type className="h-3.5 w-3.5 text-blue-400" />
                <span>Typography Style</span>
              </label>
              <div className="grid grid-cols-3 gap-2">
                {[
                  { id: 'sans', label: 'Modern Sans', preview: 'Inter / Crisp' },
                  { id: 'serif', label: 'Editorial', preview: 'Playfair / Luxury' },
                  { id: 'mono', label: 'Tech Mono', preview: 'Code / Systems' },
                ].map((f) => {
                  const isLocked = !isPro && (PRO_FONT_STYLES as readonly string[]).includes(f.id);
                  return (
                    <button
                      key={f.id}
                      onClick={() => {
                        if (isLocked) {
                          onOpenPro();
                        } else {
                          onFontStyleChange(f.id as FontStyle);
                        }
                      }}
                      className={`relative rounded-xl border p-2 text-center transition-all ${
                        fontStyle === f.id
                          ? 'border-blue-500 bg-blue-500/15 text-blue-300'
                          : 'border-slate-800 bg-slate-950 text-slate-400 hover:bg-slate-800'
                      }`}
                    >
                      {isLocked && (
                        <span className="absolute -top-1.5 right-1 rounded-full bg-amber-500 px-1.5 py-0.2 text-[8px] font-black text-slate-950">
                          PRO
                        </span>
                      )}
                      <div className="text-xs font-bold">{f.label}</div>
                      <div className="text-[9px] text-slate-500">{f.preview}</div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Themes list */}
            <div>
              <span className="text-xs font-semibold uppercase tracking-wider text-slate-300 block mb-2">
                8 Curated High-Converting Themes
              </span>
              <div className="space-y-2">
                {Object.values(THEMES).map((th) => {
                  const isLocked = !isPro && (PRO_THEME_IDS as readonly string[]).includes(th.id);
                  return (
                    <button
                      key={th.id}
                      onClick={() => {
                        if (isLocked) {
                          onOpenPro();
                        } else {
                          onThemeChange(th.id);
                        }
                      }}
                      className={`w-full flex items-center justify-between rounded-xl border p-2.5 transition-all ${
                        themeId === th.id
                          ? 'border-blue-500 bg-slate-800/80 shadow-md ring-1 ring-blue-500'
                          : 'border-slate-800 bg-slate-950/60 hover:bg-slate-800/40'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        {/* Theme Preview Dot/Swatch */}
                        <div
                          className="h-9 w-9 rounded-xl border flex items-center justify-center shadow-inner shrink-0"
                          style={{
                            background: th.bg,
                            borderColor: th.borderColor,
                          }}
                        >
                          <div
                            className="h-3 w-3 rounded-full"
                            style={{ backgroundColor: th.accentColor }}
                          />
                        </div>
                        <div className="text-left">
                          <div className="text-xs font-bold text-slate-200">{th.name}</div>
                          <div className="text-[10px] text-slate-400">{th.category} Style</div>
                        </div>
                      </div>
                      {isLocked ? (
                        <span className="flex items-center gap-1 rounded-full bg-amber-500/15 border border-amber-500/30 px-2 py-0.5 text-[10px] font-bold text-amber-300">
                          <Crown className="h-2.5 w-2.5" /> PRO
                        </span>
                      ) : themeId === th.id ? (
                        <span className="rounded-full bg-blue-500/20 px-2 py-0.5 text-[10px] font-bold text-blue-400">
                          Active
                        </span>
                      ) : null}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        )}

        {/* TAB 3: CREATOR BRANDING */}
        {activeTab === 'creator' && (
          <div className="space-y-4">
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-300 block">
              Your Creator Identity
            </span>

            {/* Avatar Upload */}
            <div className="flex items-center gap-4 rounded-xl border border-slate-800 bg-slate-950/60 p-3">
              <div className="relative h-14 w-14 shrink-0 overflow-hidden rounded-xl bg-slate-800 border border-slate-700 flex items-center justify-center">
                {creator.avatarUrl ? (
                  <img src={creator.avatarUrl} alt="Avatar" className="h-full w-full object-cover" />
                ) : (
                  <span className="font-bold text-lg text-slate-400">
                    {creator.name.slice(0, 2).toUpperCase() || 'CR'}
                  </span>
                )}
              </div>
              <div className="flex-1">
                <label className="inline-flex cursor-pointer items-center gap-1.5 rounded-lg border border-slate-700 bg-slate-800 px-3 py-1.5 text-xs font-medium text-slate-200 hover:bg-slate-700 transition-all">
                  <Upload className="h-3 w-3" />
                  <span>Upload Photo</span>
                  <input type="file" accept="image/*" onChange={handleAvatarUpload} className="hidden" />
                </label>
                <p className="mt-1 text-[10px] text-slate-500">Appears on every slide header</p>
              </div>
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1">Full Name</label>
              <input
                type="text"
                value={creator.name}
                onChange={(e) => onCreatorChange({ ...creator, name: e.target.value })}
                className="w-full rounded-xl border border-slate-700 bg-slate-950 p-2.5 text-xs text-slate-100 focus:border-blue-500 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1">LinkedIn Handle / Profile</label>
              <input
                type="text"
                value={creator.handle}
                onChange={(e) => onCreatorChange({ ...creator, handle: e.target.value })}
                className="w-full rounded-xl border border-slate-700 bg-slate-950 p-2.5 text-xs text-slate-100 focus:border-blue-500 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1">Role / One-line Bio</label>
              <input
                type="text"
                value={creator.role}
                onChange={(e) => onCreatorChange({ ...creator, role: e.target.value })}
                className="w-full rounded-xl border border-slate-700 bg-slate-950 p-2.5 text-xs text-slate-100 focus:border-blue-500 focus:outline-none"
              />
            </div>
          </div>
        )}
      </div>

      {/* Bottom Sticky Action Bar */}
      <div className="border-t border-slate-800 pt-3 flex items-center gap-2">
        <button
          onClick={onGenerate}
          disabled={isGenerating || !topic.trim()}
          className="flex-1 flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-blue-600 via-indigo-600 to-blue-500 py-3 text-xs font-bold text-white shadow-lg shadow-blue-500/25 transition-all hover:brightness-110 disabled:opacity-50"
        >
          <Sparkles className="h-4 w-4" />
          <span>{isGenerating ? 'Generating Slides with Gemini...' : 'Generate Carousel ✨'}</span>
        </button>

        <button
          onClick={onReset}
          className="rounded-xl border border-slate-800 bg-slate-950 p-3 text-slate-400 hover:text-slate-200 hover:bg-slate-800 transition-all"
          title="Reset to sample carousel"
        >
          <RefreshCw className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
};
