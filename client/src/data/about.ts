export interface ExperienceItem {
    company: string;
    position: string;
    duration: string;
    description: string;
    responsibilities: string[];
    achievements: string[];
}

export const bio = {
    name: "Gokul KP",
    role: "Creative Strategist",
    description: "Performance-driven creative for brands that want results.",
    longDescription: "3+ years scaling UAE brands through content + ads. Managed AED 185K+ quarterly spend & 20K+ conversions. Focused on the intersection of premium aesthetics and high-performance output."
};

export const experiences: ExperienceItem[] = [
    {
        company: "Aqua Care",
        position: "Performance Marketing Lead",
        duration: "July 2024 - Present",
        description: "Leading the digital transformation and lead generation strategy for a premier water purification brand in the UAE.",
        responsibilities: [
            "Architected a multi-channel lead generation funnel across Meta and Google.",
            "Produced high-converting direct-response video assets for product launches.",
            "Optimized CRM workflows to reduce lead response time by 40%."
        ],
        achievements: [
            "Generated 1,200+ qualified leads in the first 90 days of the new strategy.",
            "Reduced Cost Per Acquisition (CPA) by 35% through creative testing.",
            "Scaled monthly revenue attribution from social channels by 2x."
        ]
    },
    {
        company: "PrepMeal",
        position: "Social Media Manager",
        duration: "Jan 2023 - Present",
        description: "Executing the creative and growth strategy for a healthy meal prep brand, handling full-funnel marketing from organic content to paid ads.",
        responsibilities: [
            "Coordinated the full-funnel marketing strategy from identity launch to scaling.",
            "Produced 150+ vertical video assets for TikTok and Instagram reels.",
            "Supported Meta ad accounts with AED 185,000+ quarterly spend.",
            "Implemented WhatsApp-based sales coordination increasing conversion by 25%."
        ],
        achievements: [
            "Managed brand to 21,000+ meals delivered in the first year.",
            "Contributed to a consistent 3.5x ROAS on lead generation campaigns.",
            "Grew social community with focused organic content.",
            "Successfully coordinated operational expansion across 2 regions."
        ]
    },
    {
        company: "100 Designs",
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
        "Google Ads",
        "TikTok Ads",
        "CRM & Automation",
        "Growth Strategy"
    ],
    creative: [
        "DaVinci Resolve",
        "Adobe After Effects",
        "Premiere Pro",
        "Short-form Content",
        "Product Photography"
    ]
};
