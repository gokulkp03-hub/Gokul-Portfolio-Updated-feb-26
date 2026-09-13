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
        id: "aqua-care-uae",
        slug: "aqua-care-uae",
        client: "Aqua Care UAE",
        industry: "Water Treatment",
        platform: "Meta Ads & WhatsApp Automation",
        title: "Multi-Product Meta Ads & Lead System",
        headline: "Managing Meta campaigns, creative testing, and WhatsApp enquiries across the UAE and Oman.",
        description: "I manage paid acquisition across 25 active campaigns for Aqua Care's product line — including shower filters, reverse osmosis systems, countertop dispensers, and whole-house softeners. I script, shoot, and edit the creative variants, run the ad sets, and built the WhatsApp flows to connect enquiries directly with the sales team.",
        objective: "Generate direct WhatsApp enquiries and native Meta form leads at a sustainable cost per acquisition.",
        challenge: "Water treatment products range from quick impulse buys (shower filters) to high-ticket household investments (softeners and RO units), requiring distinct creative hooks and campaign structures.",
        strategy: [
            "Produce localized direct-response video ads highlighting everyday UAE water quality issues.",
            "Run low-friction WhatsApp messaging campaigns for instant sales conversations.",
            "Use native Meta lead generation forms with qualifying questions for high-ticket softeners."
        ],
        execution: [
            "Structured 25 campaigns across 29 ad sets and 80 creative variations.",
            "Produced vertical UGC video assets testing hook angles, problem agitation, and unboxing.",
            "Configured Instagram-to-WhatsApp routing to ensure sales response times stayed under 2 minutes."
        ],
        results: "Generated 2,357 messaging conversations and 212 Meta form leads with 1.21M reach across UAE and Oman. Lowest documented CPL on a winning Shower Filter creative: AED 4.32.",
        metrics: [
            { label: "Messaging Conversations", value: "2,357", trend: "up" },
            { label: "Meta Leads", value: "212", trend: "up" },
            { label: "Reach (UAE & Oman)", value: "1.21M", trend: "up" },
            { label: "Lowest CPL (Winning Ad)", value: "AED 4.32", trend: "up" },
            { label: "Cost / Messaging Conv.", value: "AED 1.03", trend: "up" },
            { label: "Active Campaigns", value: "25", trend: "up" }
        ],
        visuals: [
            "/assets/images/brands/Aqua-Care/new.jpg"
        ],
        learnings: [
            "Visual demonstrations of filter discoloration outperformed polished product renders by 3x on click-through rate.",
            "Connecting ad clicks to WhatsApp reps in under 2 minutes increased lead-to-consultation rates noticeably."
        ],
        tags: ["Performance Marketing", "Meta Ads", "WhatsApp Automation", "Creative Testing"],
        featured: true,
        role: "Performance Marketing Lead",
        duration: "Oct 2025 — Present",
        logoUrl: "/assets/images/logos/Aquacare logo.png"
    },
    {
        id: "prepmeal-growth",
        slug: "prepmeal",
        client: "PrepMeal",
        industry: "F&B / Subscription",
        platform: "Meta Ads & Short-form Video",
        title: "Acquisition Campaigns & Social Video",
        headline: "Content production and paid acquisition support for a subscription meal-prep brand.",
        description: "I worked across organic content and paid campaigns for PrepMeal, producing over 150 vertical videos while managing and supporting Meta ad campaigns with AED 185,000+ in spend.",
        objective: "Drive qualified messaging enquiries and subscription orders for weekly healthy meal plans.",
        challenge: "The meal-prep category has high competition and creative fatigue happens quickly, requiring continuous video production and offer iteration.",
        strategy: [
            "High-cadence short-form video production focused on portion sizes, macro counts, and taste.",
            "Direct WhatsApp conversation campaigns to answer diet and delivery questions instantly.",
            "Offer testing around trial weeks and promo discounts."
        ],
        execution: [
            "Scripted, shot, and edited 150+ vertical video assets for Instagram Reels and TikTok.",
            "Supported Meta ad accounts with AED 185,000+ in spend across acquisition campaigns.",
            "Monitored lead quality with the sales team to adjust ad messaging and audience targeting."
        ],
        results: "Supported the delivery of 21,000+ meals, generated 6,133 messaging conversations, and contributed to a 3.5x ROAS on direct-response lead-gen campaigns.",
        metrics: [
            { label: "Meals Delivered", value: "21,000+", trend: "up" },
            { label: "Messaging Conversations", value: "6,133", trend: "up" },
            { label: "Meta Spend Supported", value: "AED 185K+", trend: "up" },
            { label: "Lead-Gen ROAS", value: "3.5x", trend: "up" }
        ],
        visuals: [
            "/assets/images/brands/Prepmeal.webp",
            "/assets/images/brands/Q4/Ad 9.jpg"
        ],
        learnings: [
            "Showing the actual unboxing and kitchen preparation consistently beat generic gym lifestyle shots.",
            "WhatsApp-based order coordination significantly reduced drop-off compared to web forms."
        ],
        tags: ["Paid Media", "Short-form Video", "Content Strategy"],
        featured: true,
        role: "Social Media Manager",
        duration: "Jan 2023 — Sep 2025",
        logoUrl: "/assets/images/logos/prepmeal.png"
    },
    {
        id: "aureum-asset-management",
        slug: "aureum-asset-management",
        client: "Aureum Asset Management",
        industry: "Industrial Logistics & Real Estate",
        platform: "LinkedIn & Meta Ads / B2B Strategy",
        title: "B2B Paid Media & Lead Generation Strategy",
        headline: "Paid media blueprint and lead acquisition strategy for built-to-suit industrial logistics facilities.",
        description: "I developed a targeted B2B paid media strategy focused on senior supply chain directors, industrial logistics operators, and commercial brokers across Dubai and Abu Dhabi.",
        objective: "Build an inbound pipeline of qualified tenant enquiries for AED 10M–50M+ built-to-suit logistics parks.",
        challenge: "Industrial leasing involves long consideration cycles and narrow decision-maker personas where generic ads fail completely.",
        strategy: [
            "Credentialing-first creative strategy highlighting delivered track records and logistics infrastructure.",
            "Two-track routing separating corporate tenant inquiries from broker deal networks.",
            "Targeted LinkedIn and Meta lead gen forms with strict qualification criteria."
        ],
        execution: [
            "Developed a full funnel architecture mapped to regional logistics hubs (JAFZA, DIC, KIZAD).",
            "Structured case-study ad creatives focusing on completed warehouse developments.",
            "Built a lead scoring workflow to prioritize high-probability tenant requirements."
        ],
        results: "Comprehensive strategic blueprint delivered with targeted pipeline modeling of 8–12 qualified tenant enquiries per month.",
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
            "Dual routing for direct tenants vs brokers prevents channel conflict and accelerates deal velocity."
        ],
        tags: ["B2B Paid Media", "Lead Generation", "Industrial Real Estate"],
        featured: true,
        role: "Growth & Paid Media Strategist",
        duration: "Strategic Blueprint 2026",
        reportUrl: "/assets/case-studies/aureum/Aureum Strategy.pdf"
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
