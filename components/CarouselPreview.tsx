'use client';

import React, { useState, useRef, useEffect } from 'react';
import { Slide, CreatorProfile, CarouselTheme, FontStyle } from '@/types/carousel';
import { SlideView } from './SlideView';
import {
  ChevronLeft,
  ChevronRight,
  Plus,
  Trash2,
  ArrowLeftRight,
  Maximize2,
  Sparkles,
  Edit3,
} from 'lucide-react';

interface CarouselPreviewProps {
  slides: Slide[];
  theme: CarouselTheme;
  creator: CreatorProfile;
  watermark: boolean;
  fontStyle?: FontStyle;
  onUpdateSlide: (index: number, updated: Slide) => void;
  onAddSlide: (afterIndex: number) => void;
  onDeleteSlide: (index: number) => void;
  onReorderSlides: (startIndex: number, endIndex: number) => void;
}

export const CarouselPreview: React.FC<CarouselPreviewProps> = ({
  slides,
  theme,
  creator,
  watermark,
  fontStyle = 'sans',
  onUpdateSlide,
  onAddSlide,
  onDeleteSlide,
  onReorderSlides,
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(0.42);

  // Keep index within bounds
  useEffect(() => {
    if (currentIndex >= slides.length) {
      setCurrentIndex(Math.max(0, slides.length - 1));
    }
  }, [slides.length, currentIndex]);

  // Dynamically compute scale factor based on container width & height
  useEffect(() => {
    const updateScale = () => {
      if (!containerRef.current) return;
      const { clientWidth, clientHeight } = containerRef.current;
      const targetWidth = 1080;
      const targetHeight = 1350;

      // Fit with padding
      const availableWidth = clientWidth - 40;
      const availableHeight = clientHeight - 60;

      const scaleW = availableWidth / targetWidth;
      const scaleH = availableHeight / targetHeight;
      const computedScale = Math.min(scaleW, scaleH, 0.58);
      setScale(Math.max(0.25, computedScale));
    };

    updateScale();
    window.addEventListener('resize', updateScale);
    return () => window.removeEventListener('resize', updateScale);
  }, []);

  const currentSlide = slides[currentIndex];

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev > 0 ? prev - 1 : slides.length - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev < slides.length - 1 ? prev + 1 : 0));
  };

  const handleDuplicate = () => {
    if (!currentSlide) return;
    const duplicated: Slide = {
      ...currentSlide,
      id: `slide-${Date.now()}`,
      title: `${currentSlide.title} (Copy)`,
    };
    const newSlides = [...slides];
    newSlides.splice(currentIndex + 1, 0, duplicated);
    onAddSlide(currentIndex);
    setCurrentIndex(currentIndex + 1);
  };

  return (
    <div className="flex h-full flex-col justify-between rounded-2xl border border-slate-800 bg-slate-900/40 p-4 backdrop-blur-sm">
      {/* Top Slide Management Bar */}
      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-800/80 pb-3">
        <div className="flex items-center gap-2">
          <span className="flex items-center gap-1.5 rounded-lg bg-blue-500/10 px-2.5 py-1 text-xs font-semibold text-blue-400 border border-blue-500/20">
            <Edit3 className="h-3.5 w-3.5" />
            <span>Click text on slide to edit</span>
          </span>
          <span className="text-xs text-slate-400">
            Slide {currentIndex + 1} of {slides.length}
          </span>
        </div>

        {/* Slide Actions */}
        <div className="flex items-center gap-1.5">
          <button
            onClick={() => onAddSlide(currentIndex)}
            className="flex items-center gap-1 rounded-lg border border-slate-700 bg-slate-800 px-2.5 py-1 text-xs font-medium text-slate-200 hover:bg-slate-700 transition-all"
            title="Add blank slide after this"
          >
            <Plus className="h-3.5 w-3.5" />
            <span className="hidden sm:inline">Add Slide</span>
          </button>

          {currentIndex > 0 && (
            <button
              onClick={() => onReorderSlides(currentIndex, currentIndex - 1)}
              className="rounded-lg border border-slate-700 bg-slate-800 p-1.5 text-slate-300 hover:bg-slate-700 transition-all"
              title="Move slide left"
            >
              <ArrowLeftRight className="h-3.5 w-3.5 rotate-180" />
            </button>
          )}

          {slides.length > 2 && (
            <button
              onClick={() => onDeleteSlide(currentIndex)}
              className="rounded-lg border border-rose-500/30 bg-rose-500/10 p-1.5 text-rose-400 hover:bg-rose-500/20 transition-all"
              title="Delete this slide"
            >
              <Trash2 className="h-3.5 w-3.5" />
            </button>
          )}
        </div>
      </div>

      {/* Main Slide Stage */}
      <div
        ref={containerRef}
        className="relative flex flex-1 items-center justify-center overflow-hidden py-4 select-none"
        style={{ minHeight: '520px' }}
      >
        {/* Navigation Arrows */}
        <button
          onClick={handlePrev}
          className="absolute left-2 z-20 flex h-10 w-10 items-center justify-center rounded-full bg-slate-900/80 text-white shadow-xl backdrop-blur-md border border-slate-700 hover:bg-slate-800 hover:scale-105 transition-all"
          title="Previous slide (Left Arrow)"
        >
          <ChevronLeft className="h-5 w-5" />
        </button>

        <button
          onClick={handleNext}
          className="absolute right-2 z-20 flex h-10 w-10 items-center justify-center rounded-full bg-slate-900/80 text-white shadow-xl backdrop-blur-md border border-slate-700 hover:bg-slate-800 hover:scale-105 transition-all"
          title="Next slide (Right Arrow)"
        >
          <ChevronRight className="h-5 w-5" />
        </button>

        {/* Scaled Slide Container (4:5 Ratio) */}
        {currentSlide && (
          <div
            className="relative shadow-2xl rounded-2xl overflow-hidden transition-transform duration-200"
            style={{
              width: `${1080 * scale}px`,
              height: `${1350 * scale}px`,
            }}
          >
            <div
              style={{
                transform: `scale(${scale})`,
                transformOrigin: 'top left',
                width: '1080px',
                height: '1350px',
              }}
            >
              <SlideView
                slide={currentSlide}
                index={currentIndex}
                totalSlides={slides.length}
                theme={theme}
                creator={creator}
                watermark={watermark}
                fontStyle={fontStyle}
                isEditable={true}
                onUpdateSlide={(updated) => onUpdateSlide(currentIndex, updated)}
              />
            </div>
          </div>
        )}
      </div>

      {/* Bottom Thumbnail Strip */}
      <div className="border-t border-slate-800/80 pt-3">
        <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-thin">
          {slides.map((s, idx) => (
            <button
              key={s.id || idx}
              onClick={() => setCurrentIndex(idx)}
              className={`group relative flex-shrink-0 rounded-lg p-1.5 transition-all ${
                currentIndex === idx
                  ? 'bg-blue-600/20 border-2 border-blue-500'
                  : 'bg-slate-800/50 border border-slate-700/60 hover:bg-slate-800'
              }`}
            >
              <div
                className="flex h-16 w-12 flex-col justify-between overflow-hidden rounded p-1 text-[8px] leading-tight"
                style={{ background: theme.bg, color: theme.textColor }}
              >
                <div className="flex justify-between items-center text-[6px]">
                  <span className="font-bold">{idx + 1}</span>
                  <span className="opacity-60">{s.type}</span>
                </div>
                <div className="line-clamp-2 font-bold text-[7px]">{s.title}</div>
                <div
                  className="h-0.5 w-full rounded"
                  style={{ backgroundColor: theme.accentColor }}
                />
              </div>
            </button>
          ))}

          {/* Add Slide Quick Button */}
          <button
            onClick={() => onAddSlide(slides.length - 1)}
            className="flex h-16 w-12 flex-shrink-0 flex-col items-center justify-center rounded-lg border border-dashed border-slate-700 bg-slate-900/40 text-slate-400 hover:border-slate-500 hover:text-slate-200 transition-all"
            title="Add slide"
          >
            <Plus className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
