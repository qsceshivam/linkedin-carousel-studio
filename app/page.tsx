'use client';

import React, { useState, useEffect } from 'react';
import confetti from 'canvas-confetti';
import { Wand2, Eye } from 'lucide-react';
import { CarouselData, Slide, ThemeId, CreatorProfile } from '@/types/carousel';
import { INITIAL_CAROUSEL } from '@/lib/sample-data';
import { THEMES, DEFAULT_THEME_ID } from '@/lib/themes';
import { Navbar } from '@/components/Navbar';
import { EditorControls } from '@/components/EditorControls';
import { CarouselPreview } from '@/components/CarouselPreview';
import { SettingsModal } from '@/components/SettingsModal';
import { ProModal } from '@/components/ProModal';
import { ExportModal } from '@/components/ExportModal';
import { SlideView } from '@/components/SlideView';
import { exportCarouselToPDF } from '@/lib/pdf-exporter';

export default function Home() {
  const [carousel, setCarousel] = useState<CarouselData>(INITIAL_CAROUSEL);
  const [tone, setTone] = useState<string>('educational');
  const [slideCount, setSlideCount] = useState<number>(7);
  const [apiKey, setApiKey] = useState<string>('');
  const [isPro, setIsPro] = useState<boolean>(false);
  const [mobileTab, setMobileTab] = useState<'editor' | 'preview'>('editor');

  // Loading & Export States
  const [isGenerating, setIsGenerating] = useState<boolean>(false);
  const [isExporting, setIsExporting] = useState<boolean>(false);
  const [exportProgress, setExportProgress] = useState({
    current: 0,
    total: 0,
    message: '',
    isComplete: false,
  });

  // Modals
  const [isSettingsOpen, setIsSettingsOpen] = useState<boolean>(false);
  const [isProOpen, setIsProOpen] = useState<boolean>(false);
  const [isExportOpen, setIsExportOpen] = useState<boolean>(false);

  // Initialize from localStorage & Payment Return
  useEffect(() => {
    const savedKey = localStorage.getItem('gemini_api_key');
    if (savedKey) setApiKey(savedKey);

    const savedPro = localStorage.getItem('carousel_is_pro');
    if (savedPro === 'true') setIsPro(true);

    // Auto-unlock if returning from Razorpay / LemonSqueezy checkout (?payment=success or ?session=pro)
    if (typeof window !== 'undefined') {
      const urlParams = new URLSearchParams(window.location.search);
      if (urlParams.get('payment') === 'success' || urlParams.get('session') === 'pro') {
        setIsPro(true);
        localStorage.setItem('carousel_is_pro', 'true');
        confetti({
          particleCount: 120,
          spread: 90,
          origin: { y: 0.5 },
        });
        window.history.replaceState({}, document.title, window.location.pathname);
      }
    }
  }, []);

  const handleSaveApiKey = (key: string) => {
    setApiKey(key);
    if (key) {
      localStorage.setItem('gemini_api_key', key);
    } else {
      localStorage.removeItem('gemini_api_key');
    }
  };

  const handleTogglePro = () => {
    const nextVal = !isPro;
    setIsPro(nextVal);
    localStorage.setItem('carousel_is_pro', String(nextVal));
    if (nextVal) {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 },
      });
    }
  };

  // Slide Manipulation Handlers
  const handleUpdateSlide = (index: number, updated: Slide) => {
    const nextSlides = [...carousel.slides];
    nextSlides[index] = updated;
    setCarousel((prev) => ({ ...prev, slides: nextSlides }));
  };

  const handleAddSlide = (afterIndex: number) => {
    const newSlide: Slide = {
      id: `slide-${Date.now()}`,
      type: 'step',
      badge: `0${carousel.slides.length + 1} / POINT`,
      title: 'New Key Insight or Action Item',
      subtitle: 'Add clear, concise supporting context here.',
      points: ['First core actionable takeaway', 'Second supporting principle'],
      footerNote: 'Swipe to next slide →',
    };
    const nextSlides = [...carousel.slides];
    nextSlides.splice(afterIndex + 1, 0, newSlide);
    setCarousel((prev) => ({ ...prev, slides: nextSlides }));
  };

  const handleDeleteSlide = (index: number) => {
    if (carousel.slides.length <= 2) return;
    const nextSlides = carousel.slides.filter((_, i) => i !== index);
    setCarousel((prev) => ({ ...prev, slides: nextSlides }));
  };

  const handleReorderSlides = (from: number, to: number) => {
    if (from < 0 || to < 0 || from >= carousel.slides.length || to >= carousel.slides.length) return;
    const nextSlides = [...carousel.slides];
    const [moved] = nextSlides.splice(from, 1);
    nextSlides.splice(to, 0, moved);
    setCarousel((prev) => ({ ...prev, slides: nextSlides }));
  };

  // AI Generation
  const handleGenerate = async () => {
    if (!carousel.topic.trim()) return;
    setIsGenerating(true);

    try {
      const res = await fetch('/api/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          topic: carousel.topic,
          slideCount,
          tone,
          apiKey: apiKey || undefined,
          creator: carousel.creator,
        }),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || 'Failed to generate carousel');
      }

      if (data.slides && data.slides.length > 0) {
        setCarousel((prev) => ({
          ...prev,
          title: prev.topic,
          slides: data.slides,
        }));

        setMobileTab('preview');

        confetti({
          particleCount: 50,
          spread: 60,
          origin: { y: 0.7 },
        });
      }
    } catch (err: any) {
      alert(`Error generating: ${err?.message || 'Something went wrong'}`);
    } finally {
      setIsGenerating(false);
    }
  };

  // High-Resolution 4:5 PDF Export
  const handleExport = async () => {
    const exportNodes = document.querySelectorAll<HTMLElement>('.export-slide-target > div');
    const nodesToExport = exportNodes.length > 0
      ? Array.from(exportNodes)
      : Array.from(document.querySelectorAll<HTMLElement>('.export-slide-target'));

    if (!nodesToExport || nodesToExport.length === 0) {
      alert('Slide elements not found for export');
      return;
    }

    setIsExporting(true);
    setIsExportOpen(true);
    setExportProgress({
      current: 0,
      total: nodesToExport.length,
      message: 'Initializing 4:5 LinkedIn Canvas...',
      isComplete: false,
    });

    try {
      await exportCarouselToPDF(
        nodesToExport,
        carousel.topic || 'linkedin-carousel',
        (cur, tot, msg) => {
          setExportProgress({
            current: cur,
            total: tot,
            message: msg,
            isComplete: cur === tot && msg.includes('ready'),
          });
        }
      );

      confetti({
        particleCount: 100,
        spread: 80,
        origin: { y: 0.5 },
      });
    } catch (err: any) {
      console.error('Export error details:', err);
      alert(`Export failed: ${err?.message || 'Unknown error'}`);
      setIsExportOpen(false);
    } finally {
      setIsExporting(false);
    }
  };

  const activeTheme = THEMES[carousel.themeId] || THEMES[DEFAULT_THEME_ID];

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans selection:bg-blue-600 selection:text-white">
      {/* Top Navbar */}
      <Navbar
        onOpenSettings={() => setIsSettingsOpen(true)}
        onOpenPro={() => setIsProOpen(true)}
        onExport={handleExport}
        isExporting={isExporting}
        isPro={isPro}
        hasCustomKey={Boolean(apiKey)}
      />

      {/* Mobile Tab Switcher (Visible only on mobile screens) */}
      <div className="lg:hidden mx-auto w-full max-w-7xl px-3 pt-3">
        <div className="grid grid-cols-2 gap-1 rounded-xl bg-slate-900 border border-slate-800 p-1 shadow-sm">
          <button
            onClick={() => setMobileTab('editor')}
            className={`flex items-center justify-center gap-1.5 rounded-lg py-2 text-xs font-bold transition-all ${
              mobileTab === 'editor'
                ? 'bg-blue-600 text-white shadow-md'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Wand2 className="h-3.5 w-3.5" />
            <span>Editor Controls</span>
          </button>
          <button
            onClick={() => setMobileTab('preview')}
            className={`flex items-center justify-center gap-1.5 rounded-lg py-2 text-xs font-bold transition-all ${
              mobileTab === 'preview'
                ? 'bg-blue-600 text-white shadow-md'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Eye className="h-3.5 w-3.5" />
            <span>Live Preview ({carousel.slides.length})</span>
          </button>
        </div>
      </div>

      {/* Main Studio Body */}
      <main className="mx-auto flex flex-1 w-full max-w-7xl flex-col lg:flex-row gap-6 p-3 sm:p-6 overflow-hidden">
        {/* Left Side: Editor & Controls Panel */}
        <section
          className={`w-full lg:w-[420px] shrink-0 h-[650px] lg:h-[calc(100vh-6.5rem)] ${
            mobileTab === 'editor' ? 'block' : 'hidden lg:block'
          }`}
        >
          <EditorControls
            topic={carousel.topic}
            onTopicChange={(topic) => setCarousel((prev) => ({ ...prev, topic }))}
            tone={tone}
            onToneChange={setTone}
            slideCount={slideCount}
            onSlideCountChange={setSlideCount}
            themeId={carousel.themeId}
            onThemeChange={(themeId) => setCarousel((prev) => ({ ...prev, themeId }))}
            fontStyle={carousel.fontStyle || 'sans'}
            onFontStyleChange={(fontStyle) => setCarousel((prev) => ({ ...prev, fontStyle }))}
            creator={carousel.creator}
            onCreatorChange={(creator) => setCarousel((prev) => ({ ...prev, creator }))}
            onGenerate={handleGenerate}
            isGenerating={isGenerating}
            onReset={() => setCarousel(INITIAL_CAROUSEL)}
          />
        </section>

        {/* Right Side: Interactive Live 4:5 Slide Preview */}
        <section
          className={`flex-1 h-[650px] lg:h-[calc(100vh-6.5rem)] overflow-hidden ${
            mobileTab === 'preview' ? 'block' : 'hidden lg:block'
          }`}
        >
          <CarouselPreview
            slides={carousel.slides}
            theme={activeTheme}
            creator={carousel.creator}
            watermark={!isPro}
            fontStyle={carousel.fontStyle || 'sans'}
            onUpdateSlide={handleUpdateSlide}
            onAddSlide={handleAddSlide}
            onDeleteSlide={handleDeleteSlide}
            onReorderSlides={handleReorderSlides}
          />
        </section>
      </main>

      {/* Off-Screen Native 1080x1350 Render Stage for Sharp 300 DPI PDF Export */}
      <div
        id="export-container"
        className="pointer-events-none fixed left-0 top-0 -z-50 opacity-0 overflow-hidden"
        style={{ width: '1080px', height: '1350px' }}
        aria-hidden="true"
      >
        {carousel.slides.map((s, idx) => (
          <div key={s.id || idx} className="export-slide-target" style={{ width: '1080px', height: '1350px' }}>
            <SlideView
              slide={s}
              index={idx}
              totalSlides={carousel.slides.length}
              theme={activeTheme}
              creator={carousel.creator}
              watermark={!isPro}
              fontStyle={carousel.fontStyle || 'sans'}
              isEditable={false}
            />
          </div>
        ))}
      </div>

      {/* Modals */}
      <SettingsModal
        isOpen={isSettingsOpen}
        onClose={() => setIsSettingsOpen(false)}
        apiKey={apiKey}
        onSaveKey={handleSaveApiKey}
      />

      <ProModal
        isOpen={isProOpen}
        onClose={() => setIsProOpen(false)}
        isPro={isPro}
        onTogglePro={handleTogglePro}
      />

      <ExportModal
        isOpen={isExportOpen}
        onClose={() => setIsExportOpen(false)}
        current={exportProgress.current}
        total={exportProgress.total}
        statusMessage={exportProgress.message}
        isComplete={exportProgress.isComplete}
      />
    </div>
  );
}
