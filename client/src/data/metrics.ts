/**
 * Single source of truth for every headline number on the site.
 * Change a figure here and every page, the prerendered HTML and the
 * structured data update with it. index.html can't import this file, so
 * server/metrics.test.ts fails if its copy of the numbers drifts.
 */
export const M = {
  /** Total Meta spend across managed/supported accounts. */
  totalMetaSpend: "AED 166K+",
  totalMetaSpendLong: "AED 166,000+",
  /** AquaCare conversations + PrepMeal conversations (2,357 + 6,133). */
  whatsappConversations: "8,400+",
  /** Best documented ROAS (winning lead campaign) — not an average. */
  bestRoas: "4.45x",

  aquacare: {
    campaigns: "25",
    conversations: "2,357",
    leads: "212",
    reach: "1.21M",
    impressions: "2.23M",
    spend: "AED 11.1K",
    bestCpl: "AED 4.32",
  },

  prepmeal: {
    campaigns: "50",
    conversations: "6,133",
    spend: "AED 150K+",
    spendLong: "AED 150,000+",
    meals: "21,000+",
    videos: "150+",
    impressions: "4.4M+",
    roas: "3.5x",
  },
} as const;
