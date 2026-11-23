# 🚀 CarouselStudio — AI Text-to-LinkedIn Carousel Studio

> Turn any idea, prompt, or raw text into a pixel-perfect **4:5 vertical LinkedIn PDF carousel** in under 10 seconds. Powered by Google Gemini AI with zero server running cost.

![Next.js](https://img.shields.io/badge/Next.js-16-black?style=for-the-badge&logo=next.js)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-v4-38B2AC?style=for-the-badge&logo=tailwind-css)
![Google Gemini](https://img.shields.io/badge/Google_Gemini-Flash_API-4285F4?style=for-the-badge&logo=google)
![License](https://img.shields.io/badge/License-MIT-blue?style=for-the-badge)

---

## ✨ Features

- **⚡ Instant AI Generation**: Structured JSON generation powered by Google Gemini Flash API (`1,500 free req/day = ~45,000 carousels/mo`).
- **📱 True 4:5 Aspect Ratio (1080 × 1350)**: Optimized for maximum screen dwell time on the LinkedIn mobile feed.
- **🎨 8 Curated High-Converting Themes**:
  - `Viral Bold`: High-contrast black & yellow (Justin Welsh creator style).
  - `Dark Minimal`: Clean slate & neon cyan.
  - `Executive Clean`: Porcelain white & royal navy monochrome.
  - `Indigo Aura`: Deep modern violet mesh glow.
  - `Cyber Emerald`: Matrix dark tech & fintech green.
  - `Sunset Flame`: Obsidian & warm amber gold.
  - `Swiss Monochrome`: Jet black & pure ivory luxury.
  - `Nordic Slate`: Minimalist Apple frosted slate.
- **✏️ WYSIWYG In-Place Editing**: Click any title, bullet point, or badge directly on the canvas to edit live.
- **🔤 3 Typography Styles**: Modern Sans (Inter), Editorial (Playfair/Serif), and Tech Monospace.
- **👤 Creator Branding**: Dynamic Avatar photo, name, handle, and role applied across all slide headers.
- **🖨️ Zero-Server 300 DPI PDF Exporter**: Client-side rendering via `html-to-image` at 2x resolution (`2160 × 2700`) bundled with `jsPDF`. Zero server load.
- **💼 Micro-SaaS Ready**: Built-in Day-Pass ($4.99 / ₹99) and Lifetime Deal ($19 / ₹499) checkout links with Trojan Horse watermark viral loops.

---

## 🛠️ Zero-Cost Tech Stack

| Layer | Technology | Monthly Cost |
| :--- | :--- | :--- |
| **Frontend & Backend** | Next.js (TypeScript) + Tailwind CSS | **₹0 / $0** |
| **Hosting & Edge CDN** | Vercel (Unlimited SSL & Edge routing) | **₹0 / $0** |
| **AI Reasoning Engine** | Google Gemini Flash Free Tier | **₹0 / $0** |
| **PDF Generation** | `html-to-image` + `jsPDF` (Client-side) | **₹0 / $0** |

---

## 🚀 Getting Started Locally

### 1. Clone the repository
```bash
git clone https://github.com/qsceshivam/linkedin-carousel-studio.git
cd linkedin-carousel-studio
```

### 2. Install dependencies
```bash
npm install --legacy-peer-deps
```

### 3. Setup environment variables (Optional)
Create `.env.local` or provide your free Gemini API key in the app Settings UI:
```bash
GEMINI_API_KEY=your_free_google_ai_studio_key
```

### 4. Start development server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 🌐 Deploy to Vercel (1-Click)

1. Push your repository to GitHub.
2. Go to [vercel.com/new](https://vercel.com/new).
3. Import `qsceshivam/linkedin-carousel-studio`.
4. (Optional) Add `GEMINI_API_KEY` under Environment Variables.
5. Click **Deploy**! Your site is live in ~60 seconds with free SSL.

---

## 📄 License
MIT License. Built by [Shivam Kumar](https://github.com/qsceshivam).
