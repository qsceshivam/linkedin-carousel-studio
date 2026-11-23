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
    checkoutUrl: 'https://rzp.io/rzp/vuzswN5',
  },

  // Lifetime Deal ($19 / ₹499)
  lifetime: {
    name: 'Lifetime Deal',
    priceUsd: '$19',
    priceInr: '₹499',
    checkoutUrl: 'https://rzp.io/rzp/GK2ePwt',
  },
};
