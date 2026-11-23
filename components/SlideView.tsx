'use client';

import React from 'react';
import { Slide, CreatorProfile, CarouselTheme, FontStyle } from '@/types/carousel';
import { ArrowRight, Sparkles, Check, Bookmark, Share2, Quote } from 'lucide-react';

interface SlideViewProps {
  slide: Slide;
  index: number;
  totalSlides: number;
  theme: CarouselTheme;
  creator: CreatorProfile;
  watermark: boolean;
  fontStyle?: FontStyle;
  isEditable?: boolean;
  onUpdateSlide?: (updated: Slide) => void;
}

export const SlideView: React.FC<SlideViewProps> = ({
  slide,
  index,
  totalSlides,
  theme,
  creator,
  watermark,
  fontStyle = 'sans',
  isEditable = false,
  onUpdateSlide,
}) => {
  const isHook = slide.type === 'hook';
  const isCTA = slide.type === 'cta';
  const isQuote = slide.type === 'quote';

  const fontClass =
    fontStyle === 'serif'
      ? 'font-serif'
      : fontStyle === 'mono'
      ? 'font-mono'
      : 'font-sans';

  const handleFieldChange = (field: keyof Slide, value: any) => {
    if (!isEditable || !onUpdateSlide) return;
    onUpdateSlide({
      ...slide,
      [field]: value,
    });
  };

  const handlePointChange = (pIdx: number, newText: string) => {
    if (!isEditable || !onUpdateSlide) return;
    const nextPoints = [...(slide.points || [])];
    nextPoints[pIdx] = newText;
    onUpdateSlide({
      ...slide,
      points: nextPoints,
    });
  };

  return (
    <div
      data-slide-index={index}
      className={`relative flex flex-col justify-between overflow-hidden select-text text-left ${fontClass}`}
      style={{
        width: '1080px',
        height: '1350px',
        background: theme.bg,
        color: theme.textColor,
        padding: '80px',
        boxSizing: 'border-box',
      }}
    >
      {/* Subtle Background Glow Accent */}
      <div
        className="pointer-events-none absolute -top-40 -right-40 h-[520px] w-[520px] rounded-full blur-[140px] opacity-25"
        style={{ backgroundColor: theme.accentColor }}
      />
      <div
        className="pointer-events-none absolute -bottom-40 -left-40 h-[450px] w-[450px] rounded-full blur-[120px] opacity-20"
        style={{ backgroundColor: theme.dotColor }}
      />

      {/* TOP HEADER: Creator Profile, Slide Counter & Progress Track */}
      <div className="relative z-10 border-b pb-6" style={{ borderColor: theme.borderColor }}>
        <div className="flex items-center justify-between">
          {/* Creator Profile */}
          <div className="flex items-center gap-4">
            <div
              className="flex h-16 w-16 items-center justify-center rounded-2xl font-black text-2xl shadow-lg overflow-hidden shrink-0"
              style={{
                background: creator.avatarUrl ? 'transparent' : theme.accentBg,
                color: theme.accentColor,
                border: `2px solid ${theme.accentColor}`,
              }}
            >
              {creator.avatarUrl ? (
                <img src={creator.avatarUrl} alt={creator.name} className="h-full w-full object-cover" />
              ) : (
                creator.name.slice(0, 2).toUpperCase() || 'CR'
              )}
            </div>
            <div>
              <div className="font-extrabold text-2xl tracking-tight leading-tight" style={{ color: theme.textColor }}>
                {creator.name}
              </div>
              <div className="text-lg font-medium opacity-85" style={{ color: theme.subtitleColor }}>
                {creator.handle} • {creator.role}
              </div>
            </div>
          </div>

          {/* Slide Counter */}
          <div
            className="flex items-center gap-2 rounded-full px-5 py-2 font-mono text-xl font-bold tracking-wider shadow-sm"
            style={{
              background: theme.accentBg,
              color: theme.accentColor,
              border: `1.5px solid ${theme.borderColor}`,
            }}
          >
            <span>{String(index + 1).padStart(2, '0')}</span>
            <span style={{ color: theme.subtitleColor }}>/</span>
            <span>{String(totalSlides).padStart(2, '0')}</span>
          </div>
        </div>

        {/* Visual Swipe Progress Indicator Bar */}
        <div className="mt-4 flex gap-1.5 h-1.5 w-full rounded-full overflow-hidden bg-black/20">
          {Array.from({ length: totalSlides }).map((_, i) => (
            <div
              key={i}
              className="flex-1 rounded-full transition-all duration-300"
              style={{
                backgroundColor: i <= index ? theme.accentColor : 'rgba(148, 163, 184, 0.2)',
              }}
            />
          ))}
        </div>
      </div>

      {/* CENTER CONTENT */}
      <div className="relative z-10 my-auto flex flex-col justify-center space-y-8">
        {/* Badge / Step Tag */}
        {slide.badge && (
          <div className="inline-flex self-start">
            <span
              className="rounded-xl px-5 py-2 text-lg font-black tracking-widest uppercase shadow-sm"
              style={{
                background: theme.accentBg,
                color: theme.accentColor,
                border: `1.5px solid ${theme.borderColor}`,
              }}
              contentEditable={isEditable}
              suppressContentEditableWarning
              onBlur={(e) => handleFieldChange('badge', e.currentTarget.textContent || '')}
            >
              {slide.badge}
            </span>
          </div>
        )}

        {/* Title */}
        <h1
          className={`font-black tracking-tight leading-[1.12] ${
            isHook
              ? 'text-[72px]'
              : isCTA
              ? 'text-[64px]'
              : isQuote
              ? 'text-[58px] italic'
              : 'text-[56px]'
          }`}
          style={{ color: theme.textColor }}
          contentEditable={isEditable}
          suppressContentEditableWarning
          onBlur={(e) => handleFieldChange('title', e.currentTarget.textContent || '')}
        >
          {slide.title}
        </h1>

        {/* Subtitle */}
        {slide.subtitle && (
          <p
            className="text-[32px] leading-relaxed font-normal"
            style={{ color: theme.subtitleColor }}
            contentEditable={isEditable}
            suppressContentEditableWarning
            onBlur={(e) => handleFieldChange('subtitle', e.currentTarget.textContent || '')}
          >
            {slide.subtitle}
          </p>
        )}

        {/* Points / Bullets */}
        {slide.points && slide.points.length > 0 && (
          <div className="mt-4 space-y-5">
            {slide.points.map((pt, pIdx) => (
              <div
                key={pIdx}
                className="flex items-start gap-5 rounded-2xl p-6 transition-all shadow-md"
                style={{
                  background: theme.cardBg,
                  border: `1.5px solid ${theme.borderColor}`,
                }}
              >
                <div
                  className="mt-1 flex h-10 w-10 shrink-0 items-center justify-center rounded-xl font-black text-lg shadow-sm"
                  style={{
                    background: theme.accentBg,
                    color: theme.accentColor,
                  }}
                >
                  <Check className="h-6 w-6 stroke-[3]" />
                </div>
                <div
                  className="text-[28px] font-medium leading-snug"
                  style={{ color: theme.textColor }}
                  contentEditable={isEditable}
                  suppressContentEditableWarning
                  onBlur={(e) => handlePointChange(pIdx, e.currentTarget.textContent || '')}
                >
                  {pt}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Highlight Callout Box */}
        {slide.highlightBox && (
          <div
            className="mt-4 rounded-3xl p-8 shadow-2xl backdrop-blur-sm relative overflow-hidden"
            style={{
              background: theme.cardBg,
              border: `2px solid ${theme.accentColor}`,
            }}
          >
            {slide.highlightBox.label && (
              <div
                className="mb-3 text-lg font-black tracking-widest uppercase flex items-center gap-2"
                style={{ color: theme.accentColor }}
              >
                <Sparkles className="h-5 w-5" />
                <span>{slide.highlightBox.label}</span>
              </div>
            )}
            <p className="text-[30px] font-semibold italic leading-snug" style={{ color: theme.textColor }}>
              &ldquo;{slide.highlightBox.text}&rdquo;
            </p>
          </div>
        )}
      </div>

      {/* FOOTER: Swipe Indicator & Watermark */}
      <div
        className="relative z-10 flex items-center justify-between border-t pt-6 text-xl font-semibold"
        style={{ borderColor: theme.borderColor }}
      >
        {/* Footer Note or Swipe Prompt */}
        <div className="flex items-center gap-3 font-bold" style={{ color: theme.accentColor }}>
          <span
            contentEditable={isEditable}
            suppressContentEditableWarning
            onBlur={(e) => handleFieldChange('footerNote', e.currentTarget.textContent || '')}
          >
            {slide.footerNote || (index === totalSlides - 1 ? 'Save & Repost ♻️' : 'Swipe next →')}
          </span>
          <ArrowRight className="h-6 w-6 stroke-[2.5]" />
        </div>

        {/* Trojan Horse Watermark (Free Tier) or Clean Pro */}
        <div>
          {watermark ? (
            <div
              className="flex items-center gap-2 rounded-xl px-4 py-2 text-lg font-bold transition-all shadow-sm"
              style={{
                background: theme.accentBg,
                color: theme.subtitleColor,
                border: `1.5px solid ${theme.borderColor}`,
              }}
            >
              <span className="opacity-90">⚡ Made with</span>
              <span className="underline decoration-dotted font-extrabold" style={{ color: theme.accentColor }}>
                CarouselStudio.com
              </span>
            </div>
          ) : (
            <div className="flex items-center gap-5 text-lg font-semibold" style={{ color: theme.subtitleColor }}>
              <span className="flex items-center gap-1.5 hover:opacity-100">
                <Bookmark className="h-5 w-5" /> Save
              </span>
              <span className="flex items-center gap-1.5 hover:opacity-100">
                <Share2 className="h-5 w-5" /> Repost
              </span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
