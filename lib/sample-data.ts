import { CarouselData, Slide } from '@/types/carousel';

export const INITIAL_CAROUSEL: CarouselData = {
  title: 'How to Build a Micro-SaaS in 48 Hours',
  topic: 'Micro-SaaS Launch Strategy',
  themeId: 'viral-yellow',
  fontStyle: 'sans',
  watermark: true,
  creator: {
    name: 'Alex Rivera',
    handle: '@alexbuilds',
    role: 'Micro-SaaS Founder & Creator',
  },
  slides: [
    {
      id: 'slide-1',
      type: 'hook',
      badge: '🔥 MICRO-SAAS PLAYBOOK',
      title: 'How to Build & Launch a Profitable Micro-SaaS in 48 Hours',
      subtitle: 'No $50/mo subscriptions. Zero server cost. Here is the step-by-step masterplan to launch this weekend.',
      highlightBox: {
        label: 'THE GOAL',
        text: 'From blank canvas to first paying customer in under 48 hours.',
      },
      footerNote: 'Swipe to steal the framework →',
    },
    {
      id: 'slide-2',
      type: 'problem',
      badge: '01 / THE TRAP',
      title: 'Stop Spending 3 Months Building What Nobody Wants',
      subtitle: '92% of first-time SaaS founders fail because they over-engineer before validating.',
      points: [
        'They spend 6 weeks picking a database.',
        'They build complex authentication & dashboards.',
        'They launch to 0 audience and quit after 1 month.',
      ],
      highlightBox: {
        label: 'MINDSET SHIFT',
        text: 'If your MVP takes more than 48 hours to code, your scope is too wide.',
      },
      footerNote: 'Next: The Zero-Cost Stack →',
    },
    {
      id: 'slide-3',
      type: 'step',
      badge: '02 / THE ₹0 TECH STACK',
      title: 'The Modern Zero-Cost Micro-SaaS Stack',
      subtitle: 'Build once, run for free until you reach scale.',
      points: [
        'Frontend + Backend: Next.js + Tailwind CSS on Vercel ($0)',
        'AI Engine: Google Gemini Flash Free Tier (1,500 req/day = $0)',
        'Storage: Supabase PostgreSQL free tier ($0)',
        'Payments: Stripe or LemonSqueezy (Only take ~5% when you get paid)',
      ],
      footerNote: 'Next: The 48-Hour Roadmap →',
    },
    {
      id: 'slide-4',
      type: 'step',
      badge: '03 / THE 48-HOUR SPRINT',
      title: 'Day 1: The Core Solution Prototype',
      subtitle: 'Solve exactly ONE painful problem in 10 seconds or less.',
      points: [
        'Hour 01–04: Scaffolding and minimalist UI layout.',
        'Hour 05–08: Gemini API connection with Structured Output.',
        'Hour 09–12: Real-time visual feedback and instant preview.',
      ],
      highlightBox: {
        label: 'GOLDEN RULE',
        text: 'Your app must deliver its "Aha!" moment in the first 10 seconds of usage.',
      },
      footerNote: 'Next: Day 2 Execution →',
    },
    {
      id: 'slide-5',
      type: 'step',
      badge: '04 / CLIENT-SIDE MAGIC',
      title: 'Day 2: Zero-Server PDF Engine',
      subtitle: 'Do the heavy lifting in the browser, not on your server.',
      points: [
        'Render slides in high-resolution 4:5 aspect ratio (1080x1350).',
        'Use HTML2Canvas with scale=2 for crisp 300 DPI text.',
        'Bundle multi-page PDF with jsPDF directly on the user device.',
        'Result: Server bandwidth and processing cost stays ₹0.',
      ],
      footerNote: 'Next: Monetization & Traffic →',
    },
    {
      id: 'slide-6',
      type: 'step',
      badge: '05 / ZERO-FOLLOWER TRAFFIC',
      title: 'How to Get Your First 1,000 Visitors With 0 Followers',
      subtitle: 'Distribution is not an afterthought; it is built into the product.',
      points: [
        'The Watermark Trojan Horse: Free carousels include a subtle link on the final slide.',
        'Creator Value Gifting: Turn 10 popular creators text posts into carousels and gift it.',
        'Reddit & Hacker News: Share the transparent build story and breakdown.',
      ],
      highlightBox: {
        label: 'VIRAL EFFECT',
        text: 'When a creator with 20k followers posts your carousel, hundreds see your app.',
      },
      footerNote: 'Next: The Next Steps →',
    },
    {
      id: 'slide-7',
      type: 'cta',
      badge: '🚀 TAKE ACTION',
      title: 'Your 48 Hours Start Right Now',
      subtitle: 'Don’t wait for the "perfect" time. Build and launch this weekend.',
      points: [
        'Save this carousel for your weekend sprint.',
        'Bookmark the stack: Next.js + Gemini + Vercel.',
        'Tag a founder friend who needs to see this.',
      ],
      highlightBox: {
        label: 'CREATE YOURS',
        text: 'Made with CarouselStudio • Generate yours in 10 seconds.',
      },
      footerNote: 'Repost ♻️ if you found this valuable!',
    },
  ],
};
