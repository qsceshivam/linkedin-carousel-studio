/**
 * Payment Gateway Configuration for CarouselStudio
 * Paste your Razorpay / LemonSqueezy / Stripe Payment Link here.
 */
export const PAYMENT_CONFIG = {
  // 24-Hour Micro Pass ($4.99 / ₹99)
  microPass: {
    name: '24-Hour Pass',
    priceUsd: '$4.99',
    priceInr: '₹99',
    // Paste your Razorpay Payment Link or LemonSqueezy Checkout URL here:
    checkoutUrl: process.env.NEXT_PUBLIC_PAYMENT_URL_PASS || 'https://buy.stripe.com/test_pass',
  },

  // Lifetime Deal ($19 / ₹499)
  lifetime: {
    name: 'Lifetime Deal',
    priceUsd: '$19',
    priceInr: '₹499',
    // Paste your Razorpay Payment Link or LemonSqueezy Checkout URL here:
    checkoutUrl: process.env.NEXT_PUBLIC_PAYMENT_URL_LIFETIME || 'https://buy.stripe.com/test_lifetime',
  },
};
