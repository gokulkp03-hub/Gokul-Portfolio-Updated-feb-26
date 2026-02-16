export interface Project {
    id: string;
    slug: string;
    title: string;
    category: "video" | "photo" | "editing" | "social" | "ads";
    subcategory?: string;
    thumbnail: string;
    description: string;
    client?: string;
    role?: string;
    tools?: string[];
    date?: string;
    featured?: boolean;

    // Media
    images?: string[];
    videoUrl?: string;

    // Detail page content
    challenge?: string;
    solution?: string;
    outcome?: string;
    process?: string[];
    metrics?: {
        label: string;
        value: string;
    }[];

    // Related projects
    relatedProjects?: string[]; // Array of project IDs
}

export const projects: Project[] = [
    // VIDEO PROJECTS
    {
        id: "wedding-highlight-1",
        slug: "cinematic-wedding-memories",
        title: "Cinematic Wedding Memories",
        category: "video",
        subcategory: "Weddings",
        thumbnail: "https://res.cloudinary.com/dgmieaf9g/video/upload/v1/Wedding_reel_1_quwexf.jpg",
        videoUrl: "https://res.cloudinary.com/dgmieaf9g/video/upload/v1/Wedding_reel_1_quwexf.mp4",
        description: "Capturing the pure emotion and timeless moments of a beautiful wedding day.",
        client: "Private Client",
        role: "Cinematographer & Editor",
        tools: ["DaVinci Resolve", "Final Cut Pro", "Sony A7S III"],
        date: "2024",
        featured: true,
        challenge: "Capture authentic emotions in a fast-paced wedding environment while maintaining cinematic quality.",
        solution: "Used a multi-camera setup with gimbal stabilization and natural lighting to create intimate, documentary-style footage.",
        outcome: "Delivered a 5-minute highlight reel that perfectly captured the couple's story, receiving over 50k views on social media.",
        process: [
            "Pre-wedding consultation to understand couple's vision",
            "Scouted venue for optimal lighting and angles",
            "Captured 8 hours of footage with 3 cameras",
            "Color graded to match couple's aesthetic preferences",
            "Delivered final edit within 2 weeks"
        ],
        metrics: [
            { label: "Views", value: "50K+" },
            { label: "Engagement Rate", value: "12%" },
            { label: "Client Rating", value: "5/5" }
        ]
    },
    {
        id: "boss-branding-1",
        slug: "entrepreneur-mindset",
        title: "The Entrepreneur Mindset",
        category: "video",
        subcategory: "Personal Branding",
        thumbnail: "https://res.cloudinary.com/dgmieaf9g/video/upload/v1/Boss_1_znnsfe.jpg",
        videoUrl: "https://res.cloudinary.com/dgmieaf9g/video/upload/v1/Boss_1_znnsfe.mp4",
        description: "A high-impact brand story for a visionary entrepreneur.",
        client: "Tech Startup Founder",
        role: "Director & Editor",
        tools: ["DaVinci Resolve", "After Effects", "Sony FX3"],
        date: "2024",
        featured: true,
        challenge: "Create a compelling personal brand video that establishes authority and authenticity.",
        solution: "Developed a narrative-driven approach combining interview segments with b-roll of the entrepreneur's daily routine.",
        outcome: "Video generated 100K+ impressions and led to 3 speaking opportunities for the client.",
        process: [
            "Strategy session to define key messages",
            "Scripted interview questions",
            "Full-day shoot at multiple locations",
            "Motion graphics for key statistics",
            "Optimized for LinkedIn and Instagram"
        ],
        metrics: [
            { label: "Impressions", value: "100K+" },
            { label: "Speaking Opps", value: "3" },
            { label: "Profile Growth", value: "+2.5K" }
        ]
    },
    {
        id: "product-showcase-1",
        slug: "luxury-watch-reveal",
        title: "Luxury Watch Reveal",
        category: "video",
        subcategory: "Product",
        thumbnail: "https://res.cloudinary.com/dgmieaf9g/video/upload/v1/Product_1_gfqhqr.jpg",
        videoUrl: "https://res.cloudinary.com/dgmieaf9g/video/upload/v1/Product_1_gfqhqr.mp4",
        description: "Premium product showcase highlighting craftsmanship and detail.",
        client: "Luxury Watch Brand",
        role: "Product Videographer",
        tools: ["DaVinci Resolve", "Macro Lens", "Controlled Lighting"],
        date: "2024",
        featured: true
    },

    // PHOTO PROJECTS
    {
        id: "product-photo-1",
        slug: "premium-product-photography",
        title: "Premium Product Photography",
        category: "photo",
        subcategory: "Product",
        thumbnail: "/assets/images/photo/product-1.jpg",
        description: "High-end product photography for e-commerce and marketing.",
        client: "E-commerce Brand",
        role: "Product Photographer",
        tools: ["Lightroom", "Photoshop", "Studio Lighting"],
        date: "2024",
        featured: true,
        images: [
            "/assets/images/photo/product-1.jpg",
            "/assets/images/photo/product-2.jpg",
            "/assets/images/photo/product-3.jpg"
        ],
        challenge: "Create consistent, high-quality product images that drive conversions.",
        solution: "Developed a standardized lighting setup and post-processing workflow for brand consistency.",
        outcome: "Increased product page conversion rate by 23% and reduced return rate by 15%.",
        metrics: [
            { label: "Conversion Increase", value: "+23%" },
            { label: "Return Rate Drop", value: "-15%" },
            { label: "Products Shot", value: "150+" }
        ]
    },
    {
        id: "portrait-session-1",
        slug: "executive-portraits",
        title: "Executive Portraits",
        category: "photo",
        subcategory: "Portraits",
        thumbnail: "/assets/images/photo/portrait-1.jpg",
        description: "Professional headshots and portraits for corporate clients.",
        client: "Tech Company",
        role: "Portrait Photographer",
        tools: ["Lightroom", "Photoshop", "Natural Light"],
        date: "2024",
        images: [
            "/assets/images/photo/portrait-1.jpg",
            "/assets/images/photo/portrait-2.jpg"
        ]
    },

    // SOCIAL CONTENT
    {
        id: "instagram-reels-1",
        slug: "viral-reels-campaign",
        title: "Viral Reels Campaign",
        category: "social",
        subcategory: "Instagram Reels",
        thumbnail: "/assets/images/social/reel-1.jpg",
        description: "High-performing Instagram Reels that drove massive engagement.",
        client: "Fashion Brand",
        role: "Content Creator & Editor",
        tools: ["CapCut", "After Effects", "iPhone 15 Pro"],
        date: "2024",
        featured: true,
        challenge: "Create scroll-stopping content that drives brand awareness and follower growth.",
        solution: "Developed a content formula combining trending audio, quick cuts, and strong hooks.",
        outcome: "Generated 2.5M views across 10 reels, growing follower count by 15K in 30 days.",
        metrics: [
            { label: "Total Views", value: "2.5M" },
            { label: "Follower Growth", value: "+15K" },
            { label: "Avg. Engagement", value: "8.5%" }
        ]
    },

    // ADS CREATIVE
    {
        id: "meta-ads-1",
        slug: "high-converting-meta-ads",
        title: "High-Converting Meta Ads",
        category: "ads",
        subcategory: "Meta Ads",
        thumbnail: "/assets/images/ads/meta-1.jpg",
        description: "Performance-driven ad creatives that scaled revenue.",
        client: "E-commerce Store",
        role: "Creative Strategist",
        tools: ["Figma", "Photoshop", "Meta Ads Manager"],
        date: "2024",
        featured: true,
        challenge: "Create ad creatives that stand out in a saturated market and drive purchases.",
        solution: "Developed a testing framework with 15+ creative variations, focusing on benefit-driven messaging.",
        outcome: "Achieved 4.2x ROAS and scaled ad spend from AED 18K to AED 185K/month.",
        metrics: [
            { label: "ROAS", value: "4.2x" },
            { label: "Ad Spend Scaled", value: "AED 18K → AED 185K" },
            { label: "CTR", value: "3.8%" }
        ]
    }
];

// Helper functions
export const getProjectBySlug = (slug: string): Project | undefined => {
    return projects.find(p => p.slug === slug);
};

export const getProjectsByCategory = (category: Project["category"]): Project[] => {
    return projects.filter(p => p.category === category);
};

export const getFeaturedProjects = (): Project[] => {
    return projects.filter(p => p.featured);
};

export const getRelatedProjects = (projectId: string, limit: number = 3): Project[] => {
    const project = projects.find(p => p.id === projectId);
    if (!project) return [];

    // Get projects from same category, excluding current project
    return projects
        .filter(p => p.category === project.category && p.id !== projectId)
        .slice(0, limit);
};
