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
    role: "Creative Strategist & Founder",
    description: "Transforming brand narratives into strategic digital growth. Specialized in performance marketing, cinematic content creation, and automated funnel systems.",
    longDescription: "With over 3 years of hands-on experience in building brand identities from the ground up, I focus on the intersection of high-end aesthetics and data-driven performance. My journey started with a passion for visual storytelling through cinematography, which eventually evolved into building scalable marketing systems for premium brands in the UAE and beyond. I believe that every frame should have a purpose, and every ad should have a ROI."
};

export const experiences: ExperienceItem[] = [
    {
        company: "PrepMeal",
        position: "Founder & Creative Strategist",
        duration: "Jan 2023 - Present",
        description: "Leading the creative and growth strategy for a healthy meal prep brand, handling full-funnel marketing from organic content to paid ads.",
        responsibilities: [
            "Architected the full-funnel marketing strategy from identity launch to scaling.",
            "Produced 300+ vertical video assets for TikTok and Instagram reels.",
            "Managed Meta ad accounts with AED 185,000+ quarterly spend.",
            "Implemented WhatsApp-based sales automation increasing conversion by 25%."
        ],
        achievements: [
            "Scaled brand to 21,000+ meals delivered in the first year.",
            "Achieved a consistent 3.5x ROAS on lead generation campaigns.",
            "Built an organic social community of 50k+ followers.",
            "Successfully expanded operations to 2 major metro cities."
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
        "Performance Marketing (Meta & Google Ads)",
        "Social Media Growth Strategy",
        "Funnel Building & CRM Automation",
        "Local SEO & GBP Optimization",
        "Brand Identity Development"
    ],
    creative: [
        "Cinematography & Cinematic Lighting",
        "Mastery of Premiere Pro & Davinci Resolve",
        "Motion Design & Visual Effects",
        "Automotive & Product Photography",
        "Creative Direction & Storyboarding"
    ]
};
