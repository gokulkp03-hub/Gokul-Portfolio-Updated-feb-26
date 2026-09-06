export interface ExperienceItem {
    company: string;
    companyUrl?: string;
    position: string;
    duration: string;
    description: string;
    responsibilities: string[];
    achievements: string[];
}

export const bio = {
    name: "Gokul KP",
    role: "Premium Video Producer & Growth Strategist",
    description: "I build ads that convert — not just look good.",
    longDescription: "Blending cinematic art with high-conversion performance marketing.\n\nI am a premium performance marketer and video producer scaling brands across the GCC (UAE & Oman) through structured media buying, vertical content production, and advanced marketing automation. I focus on the intersection of data-driven funnel engineering and premium brand aesthetics, generating qualified leads and attributed revenue for both B2B commercial entities and B2C retail brands."
};

export const experiences: ExperienceItem[] = [
    {
        company: "Aqua Care Trading LLC",
        position: "Performance Marketing Lead",
        duration: "October 2025 - Present",
        description: "Directing paid acquisition, cross-border growth, and marketing automations for a leading GCC water treatment brand.",
        responsibilities: [
            "Architected multi-product Meta campaign structures (18 active UAE, 7 Oman campaigns) spanning RO systems, softeners, countertop dispensers, and pumps.",
            "Produced and edited highly localized direct-response video ad variants (30+ UGC assets) for high-performance creative testing.",
            "Built advanced Instagram-to-WhatsApp ManyChat automation loops to capture organic leads from viral educational video campaigns.",
            "Configured custom lead distribution frameworks and optimized sales team CRM pipelines to speed up response times."
        ],
        achievements: [
            "Managed 25 Meta campaigns, generating 2,357 messaging conversations, 212 Meta leads, and 1.21M reach across the UAE.",
            "Achieved cost per lead as low as AED 4.32 on winning Shower Filter Reel creatives and AED 1.03 per messaging conversation on countertop dispensers.",
            "Scaled multi-product Meta advertising with structured testing across 29 ad sets and 80 creative variations."
        ]
    },
    {
        company: "PrepMeal",
        position: "Social Media Manager",
        duration: "Jan 2023 - September 2025",
        description: "Executing the creative and growth strategy for a healthy meal prep brand, handling full-funnel marketing from organic content to paid ads.",
        responsibilities: [
            "Coordinated the full-funnel marketing strategy from identity launch to scaling.",
            "Produced 150+ vertical video assets for TikTok and Instagram reels.",
            "Supported Meta ad accounts with AED 185,000+ spend.",
            "Implemented WhatsApp-based sales coordination increasing conversion by 25%."
        ],
        achievements: [
            "Managed brand to 21,000+ meals delivered.",
            "Contributed to a consistent 3.5x ROAS on lead generation campaigns.",
            "Grew social community with focused organic content.",
            "Successfully coordinated operational expansion across 2 regions."
        ]
    },
    {
        company: "Ecom 100",
        companyUrl: "https://ecom100.in/",
        position: "Head of Content Creation",
        duration: "Feb 2022 - Dec 2023",
        description: "Led the creative team in delivering high-impact visual assets for premium corporate and lifestyle clients in the Middle East.",
        responsibilities: [
            "Directed cinematic brand films for luxury hospitality and automotive sectors.",
            "Managed high-stakes client relationships and strategic production briefs.",
            "Supervised the post-production workflow for all agency video deliverables.",
            "Consulted on visual design systems for digital-first brands."
        ],
        achievements: [
            "Worked with 5+ top-tier brands including Beyond Cars and Acero Steel.",
            "Delivered 120+ successful video projects within deadline and budget.",
            "Pioneered the 'Story-First' content model for local service businesses."
        ]
    },
    {
        company: "Freelance",
        position: "Creative Director & Cinematographer",
        duration: "2020 - 2022",
        description: "Provided high-end videography and photography services for weddings, events, and personal brands.",
        responsibilities: [
            "Executed cinematic wedding coverage for elite clients.",
            "Shot professional product and lifestyle campaigns.",
            "Developed bespoke brand films for solo-entrepreneurs."
        ],
        achievements: [
            "Featured in regional wedding photography publications.",
            "Grew client base by 200% through organic referrals.",
            "Portfolio used as benchmark for local creative agencies."
        ]
    }
];

export const skills = {
    marketing: [
        "Meta Ads Manager",
        "CRM & Automation",
        "ManyChat Flows",
        "Growth Strategy",
        "Competitor Intelligence"
    ],
    creative: [
        "DaVinci Resolve",
        "CapCut",
        "Canva",
        "Adobe After Effects",
        "Short-form Content",
        "Product Photography"
    ]
};
