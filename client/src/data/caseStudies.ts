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
}

export const caseStudies: CaseStudy[] = [
    {
        id: "prepmeal-growth",
        slug: "prepmeal-launch",
        client: "PrepMeal",
        industry: "Direct-to-Consumer / Health",
        headline: "Scaling a Meal-Prep Disruptor",
        description: "Built and scaled a healthy meal prep brand through aggressive content marketing and automated funnel systems.",
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
        image: "/assets/images/experience/prepmeal.jpg",
        visuals: [
            "/assets/images/experience/prepmeal.jpg",
            "/assets/images/brands/Q4/Ad 9.jpg"
        ],
        tags: ["Content Strategy", "Brand Growth", "Retention Systems"],
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
        description: "Transformed Steaburg's digital presence by optimizing their Google Business Profile and implementing a high-velocity review system.",
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
        image: "/assets/images/case-studies/steaburg/strategy.png",
        visuals: [
            "/assets/images/case-studies/steaburg/audit.png",
            "/assets/images/case-studies/steaburg/strategy.png",
            "/assets/images/case-studies/steaburg/works.png",
            "/assets/images/case-studies/steaburg/comparison.png",
            "/assets/images/case-studies/steaburg/mistakes.png"
        ],
        tags: ["Local SEO", "GBP Optimization", "Review Systems"],
        featured: true
    },
    {
        id: "sias-group-seo",
        slug: "sias-group-b2b",
        client: "SIAS Group",
        industry: "Business Solutions",
        headline: "Architecting B2B Search Dominance",
        description: "Recovered a dormant B2B website by fixing technical SEO fundamentals and optimizing indexing for high-value services in the UAE.",
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
        image: "/assets/images/case-studies/sisa/full_layout.png",
        visuals: [
            "/assets/images/case-studies/sisa/search_console.png",
            "/assets/images/case-studies/sisa/traffic_sources.png",
            "/assets/images/case-studies/sisa/full_layout.png"
        ],
        tags: ["Technical SEO", "B2B Lead Gen", "Indexing Strategy"],
        featured: true
    }
];
