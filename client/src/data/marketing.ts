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
        platform: "Meta Ads",
        title: "From zero to AED 31,743 revenue",
        headline: "Built a full-funnel Meta ad system across 6 product lines. 3-month sprint, AED 7,131 spend, 4.45× ROAS.",
        description: "Generate direct sales and qualified leads for 6 water treatment products across UAE market using Meta Ads only.",
        objective: "Direct sales and qualified leads across varying price points.",
        challenge: "Wide price range required entirely different funnel strategies per product.",
        strategy: [
            "Awareness: Reach campaigns, broad targeting",
            "Engagement: Messaging conversations, warm retargeting",
            "Leads: Lead gen forms, qualified intent"
        ],
        execution: [],
        results: "31K Revenue, 4.45x Return on Ad Spend.",
        metrics: [
            { label: "ROAS", value: "4.45x", trend: "up" },
            { label: "Revenue generated", value: "AED 31K", trend: "up" },
            { label: "People reached", value: "874K", trend: "up" },
            { label: "Active campaigns", value: "16", trend: "up" }
        ],
        visuals: [
            "/assets/images/brands/Aqua-Care/new.jpg"
        ],
        learnings: [],
        tags: ["Performance Marketing", "Meta Ads"],
        featured: true,
        role: "Performance Marketer",
        duration: "Dec 2025 – Mar 2026",
        logoUrl: "/assets/images/logos/Aquacare logo.png"
    },
    {
        id: "prepmeal-growth",
        slug: "prepmeal",
        client: "PrepMeal",
        industry: "Health & Wellness",
        platform: "Instagram / Meta Ads",
        title: "Social Growth Strategy",
        headline: "Establishing Digital Presence in UAE",
        description: "Coordinated social media growth and content strategy, helping the brand establish a strong digital foothold.",
        objective: "Build a consistent social presence and coordinate content production during the launch phase.",
        challenge: "New market entry with a need for hyper-local social proof and high-volume content production.",
        strategy: [
            "Vertical video strategy focusing on food quality and prep transparency.",
            "Coordination of brand-aligned social content for daily engagement.",
            "WhatsApp-based customer service coordination for higher retention."
        ],
        execution: [
            "Produced 150+ vertical video assets for TikTok and Instagram reels.",
            "Supported Meta ad accounts with creative strategy and coordination.",
            "Implemented WhatsApp-based sales coordination increasing conversion by 25%."
        ],
        results: "Successfully managed the brand's social growth, establishing it as a credible player in the health niche.",
        metrics: [
            { label: "Meals Delivered", value: "21k+", trend: "up" },
            { label: "Community Growth", value: "3.5x", trend: "up" },
            { label: "Ad Spend Supported", value: "AED 300K+", trend: "up" }
        ],
        visuals: [
            "/assets/images/case-studies/prepmeal/Mockup.png",
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
