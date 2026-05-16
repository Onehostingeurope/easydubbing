export const PRICING_PLANS = {
  SUBSCRIPTION: {
    name: "SoniTranslate Pro",
    price: 9, // Euro
    videos_included: 5,
    currency: "EUR",
  },
  EXTRA_VIDEO: {
    name: "Extra Video Credit",
    price: 2, // Euro
    currency: "EUR",
  }
};

/**
 * Logic: 
 * - Monthly subscription gives 5 credits.
 * - If credits <= 0, user must pay 2€ per video.
 * - We track 'available_credits' in the database.
 */
