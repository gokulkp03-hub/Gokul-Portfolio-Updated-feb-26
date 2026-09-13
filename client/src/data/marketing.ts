export interface MarketingCampaign {
    id: string;
    slug: string;
    client: string;
    industry: string;
    title: string;
    headline: string;
    description: string;
    objective: string;
    challenge: string;
    strategy: string[];
    execution: string[];
    results: string;
    metrics: {
        label: string;
        value: string;
        trend: "up" | "down";
    }[];
    visuals: string[];
    learnings: string[];
    tags: string[];
    featured?: boolean;
    platform: string;
    role: string;
    duration: string;
    reportUrl?: string;
    logoUrl?: string;
}

export const marketingCampaigns: MarketingCampaign[] = [
    {
        id: "aureum-asset-management",
        slug: "aureum-asset-management",
        client: "Aureum Asset Management",
        industry: "Industrial Logistics & Real Estate",
        platform: "LinkedIn & Meta Ads / B2B Growth",
        title: "B2B Asset Management & Industrial Lead Gen",
        headline: "High-Ticket Lead Acquisition & Paid Media Strategy for Built-to-Suit Logistics Parks",
        description: "Institutional-grade B2B digital acquisition system targeting C-suite executives, supply chain directors, and institutional brokers for industrial warehousing across Dubai and Abu Dhabi.",
        objective: "Generate qualified inbound enquiries for AED 10M–50M+ built-to-suit industrial facilities and speculative asset leases.",
        challenge: "Industrial asset management has long sales cycles (3–9 months), narrow buyer personas (CFOs, Supply Chain Directors), and high ticket sizes (AED 10M–50M+) requiring institutional credibility over consumer-style marketing.",
        strategy: [
            "Authority-First B2B Brand Architecture: Showcase delivered infrastructure (5M+ sq ft, Aramex win) to eliminate friction and build institutional trust.",
            "Precision Multi-Channel Paid Media: Targeted LinkedIn InMail and Thought Leader ads combined with high-intent Meta Lead Gen forms filtering by company size and warehouse requirements.",
            "Two-Track Lead Routing Engine: Instant qualification workflows routing tenant requirements vs. broker deal networks to senior advisory teams."
        ],
        execution: [
            "Developed comprehensive LinkedIn & Meta multi-stage funnel targeting logistics hubs (JAFZA, DIC, KIZAD).",
            "Produced high-converting case study creative formats highlighting landmark deliveries and developer credibility.",
            "Structured an institutional lead scoring matrix to filter high-probability requirements from general inquiries."
        ],
        results: "Targeting 8–12 highly qualified industrial tenant leads per month with AED 10M–50M+ deal potential.",
        metrics: [
            { label: "Delivered Facilities", value: "5M+ sq ft", trend: "up" },
            { label: "Enterprise Clients", value: "100+", trend: "up" },
            { label: "Target Deal Size", value: "AED 10M–50M+", trend: "up" },
            { label: "Target Lead Pipeline", value: "8–12/mo", trend: "up" }
        ],
        visuals: [
            "/assets/images/case-studies/aureum/slide-1.png",
            "/assets/images/case-studies/aureum/slide-4.png",
            "/assets/images/case-studies/aureum/slide-7.png",
            "/assets/images/case-studies/aureum/slide-10.png"
        ],
        learnings: [
            "High-ticket B2B industrial leasing requires credentialing and proof of past deliveries upfront.",
            "A dual routing strategy for direct corporate tenants vs commercial brokers prevents channel conflict and accelerates deal velocity."
        ],
        tags: ["B2B Growth", "Industrial Real Estate", "Paid Media Strategy", "Lead Generation"],
        featured: true,
        role: "Growth & Paid Media Strategist",
        duration: "Strategic Blueprint 2026",
        reportUrl: "/assets/case-studies/aureum/Aureum Strategy.pdf"
    },
    {
        id: "aqua-care-uae",
        slug: "aqua-care-uae",
        client: "Aqua Care UAE",
        industry: "Water Treatment",
        platform: "Meta Ads",
        title: "Multi-Product Meta Ads Engine",
        headline: "Managed and scaled Meta advertising across awareness, engagement, and lead-gen campaigns for AquaCare's UAE product portfolio.",
        description: "Built a structured 3-stage funnel across 25 campaigns, 29 ad sets, and 80 creative variations spanning shower filters, water dispensers, and whole-house softeners.",
        objective: "Direct-response lead generation and low-cost messaging acquisition.",
        challenge: "Differentiating conversion funnels for impulse-buy shower filters vs high-ticket dispensers and villa softeners.",
        strategy: [
            "Awareness: Broad reach campaigns & product education",
            "Engagement: Low-cost messaging acquisition & WhatsApp DMs",
            "Leads: High-intent instant lead forms for product buyers"
        ],
        execution: [],
        results: "2,357 Messaging Conversations, 212 Meta Leads, 1.21M Reach.",
        metrics: [
            { label: "Meta Ad Spend", value: "AED 11.1K", trend: "up" },
            { label: "Impressions", value: "2.23M", trend: "up" },
            { label: "Reach", value: "1.21M", trend: "up" },
            { label: "Conversations", value: "2,357", trend: "up" },
            { label: "Meta Leads", value: "212", trend: "up" },
            { label: "Campaigns", value: "25", trend: "up" }
        ],
        visuals: [
            "/assets/images/brands/Aqua-Care/new.jpg"
        ],
        learnings: [],
        tags: ["Performance Marketing", "Meta Ads"],
        featured: true,
        role: "Performance Marketer",
        duration: "25 Dec 2025 — 6 Sep 2026",
        logoUrl: "/assets/images/logos/Aquacare logo.png"
    },
    {
        id: "prepmeal-growth",
        slug: "prepmeal",
        client: "PrepMeal UAE",
        industry: "F&B / Subscription",
        platform: "Meta Ads (IG & FB)",
        title: "Performance & Lead Generation",
        headline: "Scaling Meta Ads & WhatsApp Lead Funnels",
        description: "Full-funnel Meta Ads strategy for a UAE food & meal-prep startup. Scaled WhatsApp lead generation to 6,100+ conversations.",
        objective: "Drive high-intent WhatsApp & Messenger leads for subscription meal plans.",
        challenge: "High customer acquisition costs in the competitive UAE meal prep market.",
        strategy: [
            "Localized UGC video ad production focused on unboxing and nutrition.",
            "Direct WhatsApp & Messenger conversation campaign architecture.",
            "Offer testing & creative optimization (achieved 10.3% CTR on promo ads)."
        ],
        execution: [
            "Managed AED 159.5K+ in spend across 50 campaigns.",
            "Produced short-form video UGC assets for Meta Reels and Stories.",
            "Optimized cost-per-conversation down to AED 3.72 on top promo campaigns."
        ],
        results: "Generated 6,133 messaging conversations and 4.4M+ impressions across UAE.",
        metrics: [
            { label: "Messaging Leads", value: "6,133", trend: "up" },
            { label: "Ad Spend Managed", value: "AED 159.5K", trend: "up" },
            { label: "Total Impressions", value: "4.44M", trend: "up" }
        ],
        visuals: [
            "/assets/images/brands/Prepmeal.webp",
            "/assets/images/brands/Q4/Ad 9.jpg"
        ],
        learnings: [
            "Consistent short-form content is key for building trust in food services.",
            "Coordinated WhatsApp support significantly improves local conversion rates."
        ],
        tags: ["Social Media Management", "Content Planning", "Coordination"],
        featured: true,
        role: "Social Media Manager",
        duration: "18 Months",
        logoUrl: "/assets/images/logos/prepmeal.png"
    },
    {
        id: "steaburg-seo",
        slug: "steaburg-local-seo",
        client: "Steaburg",
        industry: "Food & Beverage",
        platform: "Google Business Profile / Local SEO",
        title: "Dominating Local Search",
        headline: "Hyper-Local SEO for a Sharjah Burger Landmark",
        description: "Transformed Steaburg's digital presence by optimizing their Google Business Profile and implementing a high-velocity review system.",
        objective: "Reach 100+ verified reviews and dominate 'Local Pack' rankings for high-intent keywords.",
        challenge: "Low digital visibility with only 26 reviews compared to thousands for competitors.",
        strategy: [
            "Full GBP optimization with keyword-rich descriptions.",
            "Physical 'Review Us' QR card system at checkout.",
            "Hyper-local Meta and TikTok ad targeting within 3km."
        ],
        execution: [
            "Launched weekly professional food photography updates.",
            "Submitted business to 10+ high-authority UAE directories.",
            "Implemented proximity-based ad campaigns."
        ],
        results: "Significant jump in Google Local Pack rankings and doubled review velocity within the first month.",
        metrics: [
            { label: "Google Reviews", value: "100+", trend: "up" },
            { label: "Local Ranking", value: "Top 3", trend: "up" },
            { label: "Phone Calls", value: "+40%", trend: "up" }
        ],
        visuals: [
            "/assets/images/case-studies/steaburg/Steaburg.jpeg",
            "/assets/images/case-studies/steaburg/audit.png",
            "/assets/images/case-studies/steaburg/strategy.png",
            "/assets/images/case-studies/steaburg/works.png"
        ],
        learnings: [
            "Local citations are the backbone of UAE business rankings.",
            "Direct incentivization for reviews drives 5x higher conversion than passive requests."
        ],
        tags: ["Local SEO", "GBP Optimization", "Review Systems"],
        role: "SEO Strategist",
        duration: "6 Months",
        reportUrl: "/assets/images/case-studies/steaburg/Steaburg Strategy.pdf"
    },
    {
        id: "sias-group-seo",
        slug: "sias-group-marketing-scale",
        client: "SIAS Group",
        industry: "Business Solutions",
        platform: "Organic Search / SEO",
        title: "SIAS Group Digital Scale",
        headline: "Converting a Static Site into a Lead Engine",
        description: "Recovered a dormant B2B website by fixing technical SEO fundamentals and optimizing indexing for high-value services in the UAE.",
        objective: "Generate organic inbound calls from large enterprises searching for business solutions.",
        challenge: "The client had a 'simple site' that was completely invisible to search engines.",
        strategy: [
            "Comprehensive technical SEO audit and indexing fix.",
            "Google Search Console integration and sitemap optimization.",
            "Keyword targeting for enterprise-level business solutions in UAE."
        ],
        execution: [
            "Resolved critical crawl errors and meta-tag inconsistencies.",
            "Optimized site architecture for faster indexing.",
            "Monitored performance metrics for inbound lead verification."
        ],
        results: "Site transformed from zero visibility to receiving direct calls from reputable companies within 3 months.",
        metrics: [
            { label: "Assets produced", value: "230+", trend: "up" },
            { label: "Campaigns run", value: "15+", trend: "up" },
            { label: "Total Spend", value: "AED 50K+", trend: "up" }
        ],
        visuals: [
            "/assets/images/brands/SIAS-Group/search_console.png",
            "/assets/images/brands/SIAS-Group/traffic_sources.png",
            "/assets/images/brands/SIAS-Group/full_layout.png"
        ],
        learnings: [
            "Foundational technical SEO is often overlooked but provides the highest ROI for B2B.",
            "Indexing status is more critical than content volume for niche services."
        ],
        tags: ["Technical SEO", "B2B Lead Gen", "Indexing Strategy"],
        role: "Digital Asset Manager",
        duration: "3 Months",
        reportUrl: "/assets/images/brands/SIAS-Group/Sias Group Report.pdf"
    },
    {
        id: "galaxy-star-perfumes",
        slug: "galaxy-star-ecommerce",
        client: "Galaxy Star Perfumes",
        industry: "Luxury Retail",
        platform: "Ecommerce / SEO",
        title: "Luxury Fragrance E-com Launch",
        headline: "Scaling a Premium Scent Brand Online",
        description: "Built and launched a premium ecommerce experience for Galaxy Star Perfumes, focusing on fast performance and high-end visuals.",
        objective: "Transition a traditional retail brand into a high-converting digital storefront.",
        challenge: "Translating the sensory experience of perfume into a digital format that drives sales.",
        strategy: [
            "High-contrast product photography with luxury aesthetic.",
            "Streamlined 3-click checkout process.",
            "SEO strategy focusing on 'niche fragrance UAE' keywords."
        ],
        execution: [
            "Custom web development with performance optimization.",
            "Integrated inventory management with the digital store.",
            "Launched targeted search campaigns for luxury audiences."
        ],
        results: "Successfully established a digital presence with month-over-month growth in online sales.",
        metrics: [
            { label: "New Users", value: "5k+", trend: "up" },
            { label: "Avg Session", value: "2.5m", trend: "up" },
            { label: "Conversion Rate", value: "1.8%", trend: "up" }
        ],
        visuals: [
            "/assets/images/brands/Galaxy-Star/Galaxy 3.jpg",
            "/assets/images/brands/Galaxy-Star/Galaxy 1.jpg"
        ],
        learnings: [
            "Website speed is the single most important factor for luxury e-com bounce rates.",
            "Minimalist design increases per-item page value."
        ],
        tags: ["Ecommerce", "UI/UX", "Brand Digitalization"],
        role: "E-com Strategist",
        duration: "8 Months",
        logoUrl: "/assets/images/logos/Galaxy Star Perfumes.png"
    }
];
