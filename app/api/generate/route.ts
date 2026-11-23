import { NextRequest, NextResponse } from 'next/server';
import { Slide, SlideType } from '@/types/carousel';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { topic, slideCount = 7, tone = 'educational', apiKey: userApiKey, creator } = body;

    if (!topic || typeof topic !== 'string' || topic.trim().length === 0) {
      return NextResponse.json({ error: 'Please provide a topic or text' }, { status: 400 });
    }

    const apiKey = userApiKey || process.env.GEMINI_API_KEY;

    if (apiKey) {
      try {
        const slides = await generateWithGemini(topic, slideCount, tone, apiKey);
        return NextResponse.json({ slides, source: 'gemini' });
      } catch (geminiError: any) {
        console.warn('Gemini API call failed, falling back to smart generator:', geminiError?.message);
        // Fallback to smart generator if API fails
        const fallbackSlides = generateSmartFallback(topic, slideCount, tone);
        return NextResponse.json({
          slides: fallbackSlides,
          source: 'smart-fallback',
          warning: `Gemini API: ${geminiError?.message || 'Error'}. Generated with Smart Engine.`,
        });
      }
    } else {
      // Smart offline generator
      const fallbackSlides = generateSmartFallback(topic, slideCount, tone);
      return NextResponse.json({
        slides: fallbackSlides,
        source: 'smart-fallback',
        warning: 'No Gemini API Key provided. Generated with Smart Template Engine. Add your free key in Settings for AI superpowers!',
      });
    }
  } catch (error: any) {
    return NextResponse.json({ error: error.message || 'Internal server error' }, { status: 500 });
  }
}

async function generateWithGemini(
  topic: string,
  slideCount: number,
  tone: string,
  apiKey: string
): Promise<Slide[]> {
  const prompt = `You are a world-class LinkedIn carousel creator and ghostwriter who writes viral, high-converting 4:5 carousels.
Topic / Input: "${topic}"
Target Slide Count: ${slideCount}
Tone: ${tone}

Rules for viral LinkedIn carousels:
1. Slide 1 (Hook): Must have a bold, pattern-interrupting headline (max 10 words), strong subtitle, and badge.
2. Slide 2: The Context/Problem or why traditional advice fails.
3. Middle Slides (3 to ${slideCount - 1}): Actionable steps, insights, or frameworks. Each slide MUST have:
   - A crisp badge (e.g., "01 / FOUNDATION", "STEP 02", "THE INSIGHT")
   - A bold title (5-8 words)
   - 2 to 3 concise, punchy bullet points (max 12 words per bullet)
   - An optional highlightBox with a key takeaway or quote
4. Final Slide (Slide ${slideCount}): Call to Action (CTA) summarizing key lesson, asking to Repost, follow, or comment.

Return ONLY a valid JSON object matching this schema:
{
  "slides": [
    {
      "id": "slide-1",
      "type": "hook",
      "badge": "string",
      "title": "string",
      "subtitle": "string",
      "points": ["string"],
      "highlightBox": {
        "label": "string",
        "text": "string"
      },
      "footerNote": "string"
    }
  ]
}`;

  // Try Gemini models in order of modern availability
  const models = ['gemini-2.5-flash', 'gemini-1.5-flash', 'gemini-2.0-flash'];
  let lastError: any = null;

  for (const model of models) {
    try {
      const response = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            contents: [{ parts: [{ text: prompt }] }],
            generationConfig: {
              responseMimeType: 'application/json',
              temperature: 0.7,
            },
          }),
        }
      );

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.error?.message || `HTTP ${response.status}`);
      }

      const data = await response.json();
      const rawText = data.candidates?.[0]?.content?.parts?.[0]?.text;
      if (!rawText) throw new Error('Empty response from Gemini');

      const parsed = JSON.parse(rawText);
      if (Array.isArray(parsed.slides) && parsed.slides.length > 0) {
        return parsed.slides.map((s: any, idx: number) => ({
          id: s.id || `slide-${idx + 1}`,
          type: (s.type as SlideType) || (idx === 0 ? 'hook' : idx === parsed.slides.length - 1 ? 'cta' : 'step'),
          badge: s.badge || `0${idx + 1} / POINT`,
          title: s.title || 'Key Takeaway',
          subtitle: s.subtitle || '',
          points: Array.isArray(s.points) ? s.points : [],
          highlightBox: s.highlightBox?.text ? s.highlightBox : undefined,
          footerNote: s.footerNote || (idx === parsed.slides.length - 1 ? 'Repost if helpful ♻️' : 'Swipe to continue →'),
        }));
      }
    } catch (err) {
      lastError = err;
      continue;
    }
  }

  throw lastError || new Error('Failed to generate with Gemini');
}

function generateSmartFallback(topic: string, count: number, tone: string): Slide[] {
  const cleanTopic = topic.slice(0, 100);
  const slides: Slide[] = [];

  // Slide 1: Hook
  slides.push({
    id: 'slide-1',
    type: 'hook',
    badge: '💡 MASTERCLASS',
    title: `The Ultimate Blueprint: ${cleanTopic}`,
    subtitle: `Everything you need to know about ${cleanTopic} broken down into ${count} actionable slides.`,
    highlightBox: {
      label: 'WHY THIS MATTERS',
      text: 'Most people spend months trying to figure this out. Here is the distilled summary in 2 minutes.',
    },
    footerNote: 'Swipe to dive in →',
  });

  // Slide 2: The Problem
  slides.push({
    id: 'slide-2',
    type: 'problem',
    badge: '01 / THE COMMON MISTAKE',
    title: 'Why 90% of Approaches Fail',
    subtitle: 'Before knowing what works, understand what trips most people up.',
    points: [
      'Focusing on vanity metrics rather than fundamental value.',
      'Overcomplicating the initial process with unnecessary tools.',
      'Inconsistency and giving up right before the inflection point.',
    ],
    highlightBox: {
      label: 'KEY LESSON',
      text: 'Simplicity and relentless execution always beat complex strategies.',
    },
    footerNote: 'Next: The Core Framework →',
  });

  // Middle slides
  const middleCount = Math.max(1, count - 3);
  const steps = [
    {
      badge: '02 / FOUNDATION',
      title: 'Establish Your Unfair Advantage',
      subtitle: `Setting up the baseline for ${cleanTopic}.`,
      points: [
        'Audit your current assets, knowledge, and audience.',
        'Define a single clear objective with measurable milestones.',
        'Remove any low-leverage friction from your daily workflow.',
      ],
      tip: 'Clarity of purpose creates speed of execution.',
    },
    {
      badge: '03 / LEVERAGE',
      title: 'Automate & Systematize the Repetitive',
      subtitle: 'Build repeatable systems that compound over time.',
      points: [
        'Document standard operating procedures once and reuse.',
        'Leverage modern AI tools to accelerate content and research.',
        'Protect your highest energy hours for high-impact creation.',
      ],
      tip: 'Systems scale, willpower does not.',
    },
    {
      badge: '04 / MOMENTUM',
      title: 'The Feedback Loop & Iteration',
      subtitle: 'How the top 1% separate themselves from the crowd.',
      points: [
        'Ship early and gather raw feedback from real users.',
        'Double down on the 20% of actions generating 80% of outcomes.',
        'Continuously refine your messaging and presentation.',
      ],
      tip: 'Fast feedback cycles are the ultimate growth cheat code.',
    },
    {
      badge: '05 / SCALE',
      title: 'Compounding Your Output',
      subtitle: 'Transitioning from survival to compounding authority.',
      points: [
        'Repurpose your best insights across multiple formats.',
        'Build direct relationships with other top operators in your niche.',
        'Never stop learning from new patterns and market shifts.',
      ],
      tip: 'Consistency for 6 months beats talent every single time.',
    },
  ];

  for (let i = 0; i < middleCount; i++) {
    const step = steps[i % steps.length];
    slides.push({
      id: `slide-${i + 3}`,
      type: 'step',
      badge: step.badge,
      title: step.title,
      subtitle: step.subtitle,
      points: step.points,
      highlightBox: {
        label: 'PRO TIP',
        text: step.tip,
      },
      footerNote: 'Swipe to next slide →',
    });
  }

  // Final Slide: CTA
  slides.push({
    id: `slide-${slides.length + 1}`,
    type: 'cta',
    badge: '🚀 SUMMARY & ACTION',
    title: 'Recap & Your Next Immediate Step',
    subtitle: 'Knowledge without execution is just entertainment.',
    points: [
      `1. Review your current approach to ${cleanTopic}.`,
      '2. Pick ONE action item from this carousel to implement today.',
      '3. Stay consistent for the next 30 days.',
    ],
    highlightBox: {
      label: 'SHARE THE VALUE',
      text: 'Found this helpful? Repost ♻️ to share with your network.',
    },
    footerNote: 'Follow for more practical frameworks & breakdowns!',
  });

  return slides;
}
