import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'CarouselStudio — Text-to-LinkedIn Carousel in 10 Seconds',
  description: 'Minimalist AI micro-SaaS: Turn any prompt or text into a pixel-perfect 4:5 LinkedIn PDF carousel. Zero-cost stack, 100% free Gemini Flash.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="h-full bg-slate-950 text-slate-100 antialiased">
      <body className="min-h-full flex flex-col font-sans bg-slate-950">
        {children}
      </body>
    </html>
  );
}
