export type SlideType = 'hook' | 'problem' | 'step' | 'framework' | 'quote' | 'stat' | 'cta';

export interface Slide {
  id: string;
  type: SlideType;
  badge?: string;          // e.g. "01 / STRATEGY" or "KEY TAKEAWAY"
  title: string;           // Main punchy headline
  subtitle?: string;        // Context or supporting text
  points?: string[];       // 2-4 clean bullet takeaways
  highlightBox?: {         // High-impact highlighted quote or stat callout
    label?: string;
    text: string;
  };
  footerNote?: string;     // Swipe prompt or slide-specific tip
}

export type ThemeId =
  | 'dark-minimal'
  | 'viral-yellow'
  | 'gradient-glow'
  | 'executive-clean'
  | 'cyber-emerald'
  | 'sunset-amber'
  | 'monochrome-luxury'
  | 'nordic-slate';

export type FontStyle = 'sans' | 'serif' | 'mono';

export interface CarouselTheme {
  id: ThemeId;
  name: string;
  category: 'Dark' | 'Light' | 'Vibrant';
  bg: string;              // CSS background
  cardBg: string;          // Card / Highlight background
  textColor: string;       // Primary text
  subtitleColor: string;   // Secondary text
  accentColor: string;     // Primary highlight / badges
  accentBg: string;        // Accent badge background
  borderColor: string;     // Slide borders
  dotColor: string;        // Swipe dot or subtle accents
}

export interface CreatorProfile {
  name: string;
  handle: string;
  role: string;
  avatarUrl?: string;
}

export interface CarouselData {
  title: string;
  topic: string;
  themeId: ThemeId;
  fontStyle?: FontStyle;
  slides: Slide[];
  creator: CreatorProfile;
  watermark: boolean;
}

export interface GenerateRequest {
  topic: string;
  slideCount?: number;
  tone?: 'educational' | 'contrarian' | 'storytelling' | 'step-by-step' | 'executive';
  apiKey?: string;
  creator?: Partial<CreatorProfile>;
}
