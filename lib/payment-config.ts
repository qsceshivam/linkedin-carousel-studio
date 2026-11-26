/**
 * Payment Gateway & Plan Configuration for CarouselStudio
 */
export const FREE_DAILY_EXPORT_LIMIT = 3;

export const PRO_THEME_IDS = [
  'gradient-glow',
  'cyber-emerald',
  'sunset-amber',
  'monochrome-luxury',
  'nordic-slate',
] as const;

export const PRO_FONT_STYLES = ['serif', 'mono'] as const;

export const PAYMENT_CONFIG = {
  // 24-Hour Micro Pass ($4.99 / ₹99)
  microPass: {
    name: '24-Hour Pass',
    priceUsd: '$4.99',
    priceInr: '₹99',
    durationHours: 24,
    checkoutUrl: 'https://rzp.io/rzp/vuzswN5',
  },

  // 1-Year Pro Pass ($19 / ₹499)
  annual: {
    name: '1-Year Pro Pass',
    priceUsd: '$19',
    priceInr: '₹499',
    durationHours: 24 * 365,
    checkoutUrl: 'https://rzp.io/rzp/GK2ePwt',
  },
};

/**
 * Validates a Razorpay Payment ID (starts with pay_) or an official unlock code.
 */
export function validateUnlockCode(input: string): { valid: boolean; durationHours: number } {
  const code = input.trim();
  if (!code) return { valid: false, durationHours: 0 };

  // Official Razorpay Payment ID format (e.g., pay_P8x7abc123XYZ)
  if (/^pay_[A-Za-z0-9]{10,20}$/.test(code)) {
    return { valid: true, durationHours: 24 * 365 };
  }

  // Master / Partner unlock codes
  const upper = code.toUpperCase();
  if (upper === 'CSPRO2026' || upper === 'CAROUSELPRO') {
    return { valid: true, durationHours: 24 * 365 };
  }
  if (upper === 'CSDAY99') {
    return { valid: true, durationHours: 24 };
  }

  return { valid: false, durationHours: 0 };
}
