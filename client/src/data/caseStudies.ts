export interface CaseStudy {
    id: string;
    slug: string;
    client: string;
    industry: string;
    headline: string;
    description: string;
    challenge: string;
    strategy: string[];
    execution: string[];
    results: string;
    metrics: {
        value: string;
        label: string;
        trend: "up" | "down";
    }[];
    testimonial?: {
        quote: string;
        author: string;
        role: string;
    };
    image: string;
    visuals: string[];
    tags: string[];
    featured?: boolean;
    reportUrl?: string;
}

export const caseStudies: CaseStudy[] = [
    {
        id: "prepmeal-growth",
        slug: "prepmeal-launch",
        client: "PrepMeal",
        industry: "Direct-to-Consumer / Health",
        headline: "Scaling Social Presence for PrepMeal",
        description: "Coordinated social media growth and content strategy, helping the brand establish a strong digital presence in the UAE.",
        challenge: "New market entry with a need for hyper-local social proof and high-volume content production.",
        strategy: [
            "Short-form video strategy focusing on food quality and prep transparency.",
            "Coordination of brand-aligned social content for daily engagement.",
            "WhatsApp-based customer service coordination for higher retention."
        ],
        execution: [
            "Produced 150+ vertical video assets for TikTok and Instagram.",
            "Supported Meta Ad campaigns with creative strategy and content.",
            "Coordinated with production team for consistent visual output."
        ],
        results: "Successfully managed the brand's social growth during its first year, establishing it as a credible player in the health niche.",
        metrics: [
            { label: "Meals Delivered", value: "21k+", trend: "up" },
            { label: "Community Growth", value: "3.5x", trend: "up" },
            { label: "Ad Spend Supported", value: "AED 300K+", trend: "up" }
        ],
        image: "/assets/images/case-studies/prepmeal/Mockup.png",
        visuals: [
            "/assets/images/case-studies/prepmeal/Mockup.png",
            "/assets/images/brands/Q4/Ad 9.jpg"
        ],
        tags: ["Social Media Management", "Content Planning", "Coordination"],
        featured: true
    },
    {
        id: "beyondcars-leads",
        slug: "beyondcars-lead-engine",
        client: "BeyondCars",
        industry: "Automotive Rental",
        headline: "Scaling Lead Generation for Luxury Fleet",
        description: "Scalable lead generation for a luxury car rental service through high-performance Meta Ads and creative optimization.",
        challenge: "Extremely high competition in the Dubai luxury rental market with rising CPCs.",
        strategy: [
            "Video-first ad sets showcasing the 'lifestyle' of supercar rental.",
            "Dynamic retargeting based on fleet page visits.",
            "Lead form optimization to improve lead quality over quantity."
        ],
        execution: [
            "Produced cinematic video ads for the Porsche and Lamborghini fleet.",
            "A/B tested 20+ different ad hooks and headlines.",
            "Integrated CRM automation for instant lead follow-up."
        ],
        results: "Drastically lowered CPA while increasing lead quality. The company hit target utilization rates for the entire fleet for 3 consecutive months.",
        metrics: [
            { label: "Quality Leads", value: "150+", trend: "up" },
            { label: "ROAS Increase", value: "2.8x", trend: "up" },
            { label: "CPA Reduction", value: "45%", trend: "down" }
        ],
        image: "/assets/images/brands/Beyond-Cars/Porsche Cayenne Coupe GTS.jpg",
        visuals: [
            "/assets/images/brands/Beyond-Cars/Porsche Cayenne Coupe GTS.jpg",
            "/assets/images/brands/Beyond-Cars/Porsche 718 Cayman.jpg"
        ],
        tags: ["Lead Gen", "Meta Ads", "Creative Optimization"],
        featured: true
    },
    {
        id: "acero-b2b",
        slug: "acero-steel-b2b",
        client: "Acero Steel",
        industry: "Manufacturing",
        headline: "Generating High-Value Manufacturing Leads",
        description: "Establishing Acero as a leader in metal fabrication through strategic LinkedIn presence and targeted ads.",
        challenge: "B2B sales cycle for structural steel is long and traditionally offline.",
        strategy: [
            "B2B content strategy focusing on engineering expertise and completed projects.",
            "Targeted LinkedIn ads for project managers and architects.",
            "SEO optimization for industrial fabrication keywords."
        ],
        execution: [
            "Published whitepapers and case studies on engineering marvels.",
            "Ran targeted ad campaigns for 5 major construction expos.",
            "Revamped website to focus on B2B lead capture."
        ],
        results: "Successfully reached key decision makers in the construction and fabrication industry. Generated 45 high-value project inquiries within the first quarter.",
        metrics: [
            { label: "Qualified Leads", value: "45", trend: "up" },
            { label: "Brand Reach", value: "100k+", trend: "up" },
            { label: "Conversion Rate", value: "22%", trend: "up" }
        ],
        image: "/assets/images/brands/Acero/Acero 2-1.jpg",
        visuals: [
            "/assets/images/brands/Acero/Ad 01.png",
            "/assets/images/brands/Acero/Acero 2-1.jpg"
        ],
        tags: ["B2B Marketing", "LinkedIn Ads", "Lead Generation"],
        featured: true
    },
    {
        id: "steaburg-seo",
        slug: "steaburg-local-seo",
        client: "Steaburg",
        industry: "Food & Beverage",
        headline: "Dominating Local Search",
        description: "Improved Steaburg's local visibility by optimizing their Google Business Profile and implementing a review collection system.",
        challenge: "Low digital search visibility in a highly competitive local food market.",
        strategy: [
            "Google Business Profile (GBP) optimization and keyword refinement.",
            "Physical review prompt system to increase social proof.",
            "Local social content to drive neighborhood awareness."
        ],
        execution: [
            "Optimized business description and service categories for search.",
            "Coordinated professional food photography for profile updates.",
            "Implemented proximity-based social ad strategy."
        ],
        results: "Increased local search visibility and halved the gap with top category competitors within 3 months.",
        metrics: [
            { label: "Google Reviews", value: "100+", trend: "up" },
            { label: "Local Visibility", value: "+40%", trend: "up" },
            { label: "Search Actions", value: "Consistently Up", trend: "up" }
        ],
        image: "/assets/images/case-studies/steaburg/strategy.png",
        visuals: [
            "/assets/images/case-studies/steaburg/audit.png",
            "/assets/images/case-studies/steaburg/strategy.png",
            "/assets/images/case-studies/steaburg/works.png"
        ],
        tags: ["Local SEO", "GBP Optimization", "Marketing Support"],
        featured: true,
        reportUrl: "/assets/images/case-studies/steaburg/Steaburg Strategy.pdf"
    },
    {
        id: "sias-group-seo",
        slug: "sias-group-b2b",
        client: "SIAS Group",
        industry: "Business Solutions",
        headline: "Optimizing B2B Search Presence",
        description: "Recovered a dormant B2B website by fixing technical SEO fundamentals and improving indexing for core services in the UAE.",
        challenge: "Corporate website was not correctly indexed, leading to zero search visibility.",
        strategy: [
            "Technical SEO audit and Google Search Console indexing fix.",
            "Sitemap optimization and service page keyword refinement.",
            "Focusing on high-intent B2B search terms in the UAE."
        ],
        execution: [
            "Resolved critical crawl and indexing errors.",
            "Optimized meta-data for service category pages.",
            "Monitored Search Console for keyword performance."
        ],
        results: "Site visibility restored in search results, contributing to professional inbound inquiries.",
        metrics: [
            { label: "Organic Indexing", value: "Restored", trend: "up" },
            { label: "B2B Impressions", value: "2.5k+", trend: "up" },
            { label: "Lead Quality", value: "High", trend: "up" }
        ],
        image: "/assets/images/case-studies/sisa/full_layout.png",
        visuals: [
            "/assets/images/case-studies/sisa/search_console.png",
            "/assets/images/case-studies/sisa/traffic_sources.png"
        ],
        tags: ["Technical SEO", "B2B Marketing", "Crawl Optimization"],
        featured: true,
        reportUrl: "/assets/images/case-studies/sisa/Sias Group Report.pdf"
    }
];
