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
}

export const marketingCampaigns: MarketingCampaign[] = [
    {
        id: "prepmeal-growth",
        slug: "prepmeal-launch",
        client: "PrepMeal",
        industry: "Health & Wellness",
        platform: "Instagram / Meta Ads",
        title: "Scaling a Meal-Prep Disruptor",
        headline: "Launching a Direct-to-Consumer Brand",
        description: "Built and scaled a healthy meal prep brand through aggressive content marketing and automated funnel systems.",
        objective: "Establish market presence and achieve 3x growth in primary city within 6 months.",
        challenge: "New market entry with zero brand awareness and high competition from established catering services.",
        strategy: [
            "Vertical video strategy focusing on 'behind the kitchen' transparency.",
            "Micro-influencer partnership campaign for hyper-local social proof.",
            "Automated WhatsApp ordering funnel for frictionless conversion."
        ],
        execution: [
            "Created 200+ pieces of short-form video content.",
            "Managed AED 185,000+ in Meta Ad spend with daily optimization.",
            "Launched weekly referral programs for community growth."
        ],
        results: "Achieved consistent month-over-month growth and high customer retention. The brand became a household name in the health niche.",
        metrics: [
            { label: "Meals Delivered", value: "21k+", trend: "up" },
            { label: "Revenue Growth", value: "3x", trend: "up" },
            { label: "Customer Retention", value: "40%+", trend: "up" }
        ],
        visuals: [
            "/images/experience/prepmeal.jpg",
            "/images/brands/Q4/Ad 9.jpg"
        ],
        learnings: [
            "Authentic behind-the-scenes content converts 2x better than polished ads.",
            "Automated funnel reduces CAC by 30% compared to manual sales."
        ],
        tags: ["Content Strategy", "Brand Growth", "Retention Systems"],
        featured: true,
        role: "Head of Marketing & Content",
        duration: "18 Months"
    },
    {
        id: "beyondcars-leads",
        slug: "beyondcars-lead-engine",
        client: "BeyondCars",
        industry: "Automotive Rental",
        platform: "Meta Ads / Google Search",
        title: "High-Performance Lead Engine",
        headline: "Scaling Lead Generation for Luxury Fleet",
        description: "Scalable lead generation for a luxury car rental service through high-performance Meta Ads and creative optimization.",
        objective: "Lower Cost Per Lead (CPL) by 40% while doubling monthly lead volume.",
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
        visuals: [
            "/images/brands/Beyond-Cars/Porsche Cayenne Coupe GTS.jpg",
            "/images/brands/Beyond-Cars/Porsche 718 Cayman.jpg"
        ],
        learnings: [
            "Lifestyle-oriented video content drives 3x more engagement than static car photos.",
            "Quick follow-up automation is critical for B2C luxury services."
        ],
        tags: ["Lead Gen", "Meta Ads", "Creative Optimization"],
        featured: true,
        role: "Marketing Strategist",
        duration: "Ongoing"
    },
    {
        id: "acero-b2b",
        slug: "acero-steel-b2b",
        client: "Acero Steel",
        industry: "Manufacturing",
        platform: "LinkedIn / SEO",
        title: "B2B Brand Authority",
        headline: "Generating High-Value Manufacturing Leads",
        description: "Establishing Acero as a leader in metal fabrication through strategic LinkedIn presence and targeted ads.",
        objective: "Position Acero as the premium choose for high-end hospitality and construction projects.",
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
        visuals: [
            "/images/brands/Acero/Ad 01.png",
            "/images/brands/Acero/Acero 2-1.jpg"
        ],
        learnings: [
            "Trust is built through detailed project proofs rather than typical sales talk.",
            "LinkedIn is significantly more effective for structural fabrication than Meta."
        ],
        tags: ["B2B Marketing", "LinkedIn Ads", "Lead Generation"],
        role: "Digital Consultant",
        duration: "12 Months"
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
            "/images/case-studies/steaburg/audit.png",
            "/images/case-studies/steaburg/strategy.png",
            "/images/case-studies/steaburg/works.png"
        ],
        learnings: [
            "Local citations are the backbone of UAE business rankings.",
            "Direct incentivization for reviews drives 5x higher conversion than passive requests."
        ],
        tags: ["Local SEO", "GBP Optimization", "Review Systems"],
        role: "SEO Strategist",
        duration: "6 Months"
    },
    {
        id: "sias-group-seo",
        slug: "sias-group-b2b",
        client: "SIAS Group",
        industry: "Business Solutions",
        platform: "Organic Search / SEO",
        title: "Architecting B2B Search Dominance",
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
            { label: "Organic Reach", value: "High", trend: "up" },
            { label: "Event Count", value: "2.5k+", trend: "up" },
            { label: "Inbound Leads", value: "Weekly", trend: "up" }
        ],
        visuals: [
            "/images/case-studies/sisa/search_console.png",
            "/images/case-studies/sisa/traffic_sources.png",
            "/images/case-studies/sisa/full_layout.png"
        ],
        learnings: [
            "Foundational technical SEO is often overlooked but provides the highest ROI for B2B.",
            "Indexing status is more critical than content volume for niche services."
        ],
        tags: ["Technical SEO", "B2B Lead Gen", "Indexing Strategy"],
        role: "Digital Asset Manager",
        duration: "3 Months"
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
            "/images/brands/Galaxy-Star/Galaxy 3.jpg",
            "/images/brands/Galaxy-Star/Galaxy 1.jpg"
        ],
        learnings: [
            "Website speed is the single most important factor for luxury e-com bounce rates.",
            "Minimalist design increases per-item page value."
        ],
        tags: ["Ecommerce", "UI/UX", "Brand Digitalization"],
        role: "E-com Strategist",
        duration: "8 Months"
    }
];
