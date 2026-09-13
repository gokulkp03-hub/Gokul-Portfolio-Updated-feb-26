export interface ExperienceMetric {
    label: string;
    value: string;
}

export interface ExperienceItem {
    company: string;
    companyUrl?: string;
    position: string;
    duration: string;
    location?: string;
    isCurrent?: boolean;
    summary: string;
    details?: string[];
    metrics?: ExperienceMetric[];
    tags?: string[];
}

export interface ServiceCategory {
    id: string;
    title: string;
    summary: string;
    skills: string[];
}

export interface BehindCampaignProject {
    number: string;
    title: string;
    subtitle: string;
    description: string;
    tag?: string;
}

export const bio = {
    name: "Gokul KP",
    role: "Digital Marketer & Creative Producer",
    eyebrow: "ABOUT",
    headline: "Creative meets performance.",
    location: "UAE & India",
    status: "Available for select roles & projects",
    intro: "Digital marketer and creative producer working across the GCC and India. The work sits between paid media and creative production — planning campaigns, shooting and editing ad creative, managing ad accounts, and tracking what actually converts into sales conversations.",
    statement: "Most careers sit on one side of the table — either creative or marketing. Having worked across both makes it possible to take an idea from camera to Ads Manager, and follow it all the way to the sales conversation.",
    loop: [
        { step: "01", name: "Angle", detail: "Hook & offer" },
        { step: "02", name: "Content", detail: "Shoot & edit" },
        { step: "03", name: "Paid Ads", detail: "Meta campaigns" },
        { step: "04", name: "Testing", detail: "Creative iterations" },
        { step: "05", name: "Routing", detail: "WhatsApp & CRM" },
        { step: "06", name: "Feedback", detail: "Sales alignment" },
    ]
};

export const whatIDo: ServiceCategory[] = [
    {
        id: "paid-media",
        title: "PAID MEDIA",
        summary: "Structured media buying focused on qualified inquiries and sales, not vanity impressions.",
        skills: ["Meta Ads Manager", "Creative Testing", "Lead Generation", "Campaign Structure"]
    },
    {
        id: "content",
        title: "CONTENT",
        summary: "Direct-response and brand video produced specifically for vertical platforms and mobile feeds.",
        skills: ["Short-form Video", "Cinematography", "Product Photography", "Creative Direction"]
    },
    {
        id: "growth",
        title: "GROWTH",
        summary: "Competitor analysis, hook exploration, and content planning that provides testing data for paid campaigns.",
        skills: ["Content Strategy", "Competitor Research", "Offer Testing", "Social Media"]
    },
    {
        id: "automation",
        title: "AUTOMATION",
        summary: "Connecting ad clicks and social inquiries directly to sales representatives on WhatsApp in under two minutes.",
        skills: ["ManyChat", "Instagram → WhatsApp", "Lead Routing", "CRM Workflows"]
    }
];

export const experiences: ExperienceItem[] = [
    {
        company: "Aqua Care Trading LLC",
        position: "Performance Marketing Lead",
        duration: "Oct 2025 — Present",
        location: "UAE & Oman",
        isCurrent: true,
        summary: "Paid acquisition, creative testing, and lead generation across UAE and Oman for a water treatment business.",
        details: [
            "Meta campaigns across RO systems, softeners, countertop dispensers, and booster pumps.",
            "Short-form ad creative and product video for paid and organic feeds.",
            "Instagram-to-WhatsApp lead flows that shortened customer response time to under 2 minutes.",
            "Cross-border campaign management covering both UAE and Oman accounts."
        ],
        metrics: [
            { label: "Messaging Conversations", value: "2,357" },
            { label: "Meta Form Leads", value: "212" },
            { label: "Lowest CPL (Winning Ad)", value: "AED 4.32" }
        ],
        tags: ["Meta Ads", "Ad Creative", "WhatsApp Routing", "GCC Markets"]
    },
    {
        company: "PrepMeal",
        position: "Social Media & Acquisition",
        duration: "Jan 2023 — Sep 2025",
        location: "India",
        isCurrent: false,
        summary: "Content production, social media, and paid acquisition support for a meal-prep subscription brand.",
        details: [
            "150+ vertical video assets produced for Instagram Reels and TikTok.",
            "Meta ad campaigns supported with AED 185,000+ in spend.",
            "Customer acquisition scaled to 21,000+ meals delivered."
        ],
        metrics: [
            { label: "Meals Delivered", value: "21,000+" },
            { label: "Vertical Videos", value: "150+" },
            { label: "Meta Spend Supported", value: "AED 185K+" }
        ],
        tags: ["Short-form Video", "Subscription F&B", "Paid Acquisition"]
    },
    {
        company: "Ecom 100",
        companyUrl: "https://ecom100.in/",
        position: "Head of Content Creation",
        duration: "Feb 2022 — Dec 2023",
        location: "India & Middle East",
        isCurrent: false,
        summary: "Commercial video production for corporate, automotive, and lifestyle clients from brief to final delivery.",
        details: [
            "Video deliverables for 5+ regional brands including Beyond Cars and Acero Steel.",
            "120+ commercial video projects delivered on schedule.",
            "Standardized shooting and editing workflows for client brand films."
        ],
        metrics: [
            { label: "Commercial Videos", value: "120+" },
            { label: "Client Brands", value: "5+" }
        ],
        tags: ["Commercial Production", "Cinematography", "Brand Films"]
    },
    {
        company: "Independent Production",
        position: "Cinematographer & Creative Producer",
        duration: "2020 — 2022",
        location: "India & Remote",
        isCurrent: false,
        summary: "Cinematography, commercial photography, and video production for emerging brands and founders.",
        details: [
            "Brand films and creative projects for regional businesses.",
            "Product and catalog photography for lifestyle and consumer goods.",
            "Foundation in lighting, camera movement, and visual pacing."
        ],
        tags: ["Cinematography", "Product Photography", "Brand Identity"]
    }
];

export const behindTheCampaign: BehindCampaignProject[] = [
    {
        number: "01",
        title: "Competitor Research",
        subtitle: "Market Intelligence & Ad Analysis",
        description: "Tracking competitor ad libraries across the UAE and Oman to study offers, messaging hooks, and pricing shifts. Provides actionable creative intelligence before launching new campaigns.",
        tag: "Active Database"
    },
    {
        number: "02",
        title: "Lead Automation",
        subtitle: "Instagram-to-WhatsApp Routing",
        description: "Routing Instagram comments, ad clicks, and form submissions directly to sales representatives on WhatsApp in under two minutes to maintain lead momentum.",
        tag: "ManyChat + Webhooks"
    },
    {
        number: "03",
        title: "Content Systems",
        subtitle: "Repeatable Creative Matrix",
        description: "Structuring content around product features, objections, and practical demonstrations to build brand credibility while generating creative variations for paid testing.",
        tag: "System Design"
    }
];

export const tools = [
    "Meta Ads Manager",
    "DaVinci Resolve",
    "Adobe After Effects",
    "Premiere Pro",
    "CapCut",
    "Canva",
    "ManyChat"
];

// Backwards compatibility for any leftover references
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

