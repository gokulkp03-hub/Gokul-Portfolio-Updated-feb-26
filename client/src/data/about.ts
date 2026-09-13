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
    role: "Performance Marketer & Video Producer",
    eyebrow: "MARKETING + CREATIVE",
    headline: "I work where creative meets performance.",
    location: "UAE & India",
    status: "Available for select roles & projects",
    intro: "I'm a digital marketer and video producer based between the GCC and India. My work sits between paid media and content — I plan campaigns, shoot and edit the creative, run the ads, and look at what actually turns into a lead. That's what I enjoy most: making creative that looks good, but still has a job to do.",
    statement: "Most of my career has sat on one side of the table — creative or marketing. I've worked across both. I can be behind the camera in the morning, inside Meta Ads Manager in the afternoon, and looking at lead quality with the sales team by evening. That cross-over is where I do my best work.",
    loop: [
        { step: "01", name: "Idea", detail: "Hook & angle" },
        { step: "02", name: "Content", detail: "Shoot & edit" },
        { step: "03", name: "Distribution", detail: "Meta Ads & social" },
        { step: "04", name: "Ad Testing", detail: "Iterate creative" },
        { step: "05", name: "Leads", detail: "WhatsApp & CRM" },
        { step: "06", name: "Optimization", detail: "Sales feedback" },
    ]
};

export const whatIDo: ServiceCategory[] = [
    {
        id: "paid-media",
        title: "PAID MEDIA",
        summary: "Structured media buying focused on qualified inquiries and revenue, not vanity impressions.",
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
        summary: "Deconstructing competitor positioning, identifying hook angles, and planning content systems.",
        skills: ["Content Strategy", "Competitor Research", "Offer Testing", "Social Media"]
    },
    {
        id: "automation",
        title: "AUTOMATION",
        summary: "Eliminating lead drop-off by connecting ad responses to sales reps in under two minutes.",
        skills: ["ManyChat", "Instagram → WhatsApp", "Lead Routing", "Basic CRM Workflows"]
    }
];

export const experiences: ExperienceItem[] = [
    {
        company: "Aqua Care Trading LLC",
        position: "Performance Marketing Lead",
        duration: "Oct 2025 — Present",
        location: "UAE & Oman",
        isCurrent: true,
        summary: "Working across paid acquisition, content and lead generation for a water treatment business operating across the UAE and Oman.",
        details: [
            "Meta advertising across RO systems, softeners, countertop dispensers and booster pumps.",
            "In-house video production, creative testing, and organic Instagram growth.",
            "Automated WhatsApp lead flows that shortened customer response time to under 2 minutes.",
            "Cross-border campaign expansion managing both UAE and Oman ad accounts."
        ],
        metrics: [
            { label: "Reach (UAE & Oman)", value: "1.21M" },
            { label: "Messaging Conversations", value: "2,357" },
            { label: "Meta Form Leads", value: "212" },
            { label: "Lowest CPL (Winning Creative)", value: "AED 4.32" },
            { label: "Cost / WhatsApp Conv.", value: "AED 1.03" }
        ],
        tags: ["Meta Ads", "UGC Video", "WhatsApp Automation", "GCC Markets"]
    },
    {
        company: "PrepMeal",
        position: "Social Media Manager",
        duration: "Jan 2023 — Sep 2025",
        location: "India",
        isCurrent: false,
        summary: "Worked across content, social media and paid campaigns for a healthy meal-prep business, producing short-form content while supporting the brand's acquisition campaigns.",
        details: [
            "Produced 150+ vertical video assets for Instagram Reels and TikTok.",
            "Supported Meta ad accounts with AED 185,000+ in managed ad spend.",
            "Helped scale customer acquisition to 21,000+ meals delivered.",
            "Maintained a consistent 3.5x ROAS on direct-response lead generation campaigns."
        ],
        metrics: [
            { label: "Meals Delivered", value: "21,000+" },
            { label: "Vertical Videos", value: "150+" },
            { label: "Meta Spend Supported", value: "AED 185K+" },
            { label: "Lead-Gen ROAS", value: "3.5x" }
        ],
        tags: ["Short-form Video", "D2C Food", "Paid Acquisition", "Community"]
    },
    {
        company: "Ecom 100",
        companyUrl: "https://ecom100.in/",
        position: "Head of Content Creation",
        duration: "Feb 2022 — Dec 2023",
        location: "India & Middle East",
        isCurrent: false,
        summary: "I led video production for corporate, automotive and lifestyle clients, from the initial brief through shooting and final delivery.",
        details: [
            "Supervised video deliverables for 5+ major brands including Beyond Cars and Acero Steel.",
            "Delivered 120+ commercial video projects on time and within production budget.",
            "Built repeatable pre-production and post-production workflows for client brand films."
        ],
        metrics: [
            { label: "Commercial Videos", value: "120+" },
            { label: "Key Client Brands", value: "5+" }
        ],
        tags: ["Commercial Production", "Cinematography", "Team Leadership", "Brand Films"]
    },
    {
        company: "Freelance",
        position: "Creative Director & Cinematographer",
        duration: "2020 — 2022",
        location: "India & Remote",
        isCurrent: false,
        summary: "Where I developed my visual foundations — shooting weddings, events, product photography, personal brands, and bespoke brand films directly with founders.",
        details: [
            "Directed and edited cinematic films for private clients and emerging regional brands.",
            "Shot commercial product and catalog photography for lifestyle and retail products.",
            "Built intuition behind camera movement, pacing, lighting, and human emotion on screen."
        ],
        tags: ["Cinematography", "Product Photography", "Brand Identity", "Storytelling"]
    }
];

export const behindTheCampaign: BehindCampaignProject[] = [
    {
        number: "01",
        title: "Competitor Research",
        subtitle: "Market Intelligence & Ad Scraping",
        description: "Tracking competitors across the UAE and Oman to understand new offers, creatives, pricing and positioning. Allows us to spot new creative angles and pricing shifts within 24 hours of launch.",
        tag: "Active Database"
    },
    {
        number: "02",
        title: "Lead Automation",
        subtitle: "Instagram-to-WhatsApp Flow",
        description: "Building Instagram-to-WhatsApp flows that reduce the gap between an enquiry and the sales team. Connects comments and ad clicks to WhatsApp reps in under 2 minutes, protecting lead quality.",
        tag: "ManyChat + Webhooks"
    },
    {
        number: "03",
        title: "Content Systems",
        subtitle: "Repeatable Creative Matrix",
        description: "Building repeatable content systems around educational topics, product problems, hooks and offers. Ensures organic feeds build trust and brand equity while feeding testing data to paid ads.",
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

