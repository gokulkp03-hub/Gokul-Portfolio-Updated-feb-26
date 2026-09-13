export interface Project {
    id: string;
    slug: string;
    title: string;
    category: "video" | "photo" | "editing" | "social" | "ads" | "influencer" | "web";
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
    cloudinaryId?: string;

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
        id: "beyond-cars-showcase",
        slug: "beyond-cars-video-showcase",
        title: "Beyond Cars Showcase",
        category: "video",
        subcategory: "Automotive",
        thumbnail: "/assets/images/brands/Beyond-Cars/beyondcarsin.webp",
        videoUrl: "https://res.cloudinary.com/dgmieaf9g/video/upload/v1/lamourmedia_1761496555_3752003203673245690_4144321886_zcwmht.mp4",
        cloudinaryId: "lamourmedia_1761496555_3752003203673245690_4144321886_zcwmht",
        description: "High-energy automotive video production highlighting luxury and performance.",
        client: "Beyond Cars",
        role: "Director & Cinematographer",
        date: "2024",
        featured: true
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
        client: "Social Media Campaign",
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
        id: "burj-aerial",
        slug: "burj-khalifa-aerial",
        title: "Burj Khalifa Aerial",
        category: "video",
        subcategory: "Events",
        thumbnail: "https://res.cloudinary.com/dgmieaf9g/video/upload/v1/Burj_2_hcocpv.jpg",
        videoUrl: "https://res.cloudinary.com/dgmieaf9g/video/upload/v1/Burj_2_hcocpv.mp4",
        cloudinaryId: "Burj_2_hcocpv",
        description: "Breathtaking aerial views of the iconic Burj Khalifa.",
        client: "Tourism Campaign",
        role: "Drone Pilot & Cinematographer",
        date: "2024"
    },
    {
        id: "video-2025-07",
        slug: "creative-reel-2025",
        title: "Creative Reel 2025",
        category: "video",
        subcategory: "Reels",
        thumbnail: "https://res.cloudinary.com/dgmieaf9g/video/upload/v1/VIDEO-2025-07-07-20-47-02_qynv0d.jpg",
        videoUrl: "https://res.cloudinary.com/dgmieaf9g/video/upload/v1/VIDEO-2025-07-07-20-47-02_qynv0d.mp4",
        cloudinaryId: "VIDEO-2025-07-07-20-47-02_qynv0d",
        description: "A dynamic showcase of creative projects from 2025.",
        client: "Portfolio",
        role: "Creator",
        date: "2025"
    },
    {
        id: "steaburg-reel-social",
        slug: "steaburg-social-reel",
        title: "Steaburg — Social Reel",
        category: "video",
        subcategory: "Reels",
        thumbnail: "https://res.cloudinary.com/dgmieaf9g/video/upload/v1/steaburgsharjah_1749307530_3649778156913339989_51220232024_u3srac.jpg",
        videoUrl: "https://res.cloudinary.com/dgmieaf9g/video/upload/v1/steaburgsharjah_1749307530_3649778156913339989_51220232024_u3srac.mp4",
        cloudinaryId: "steaburgsharjah_1749307530_3649778156913339989_51220232024_u3srac",
        description: "High-energy social reel for Steaburg — Sharjah's favourite burger spot.",
        client: "Steaburg",
        role: "Videographer & Editor",
        date: "2025",
        featured: true
    },
    {
        id: "steaburg-brand-film",
        slug: "steaburg-brand-film",
        title: "Steaburg — Brand Film",
        category: "video",
        subcategory: "Product",
        thumbnail: "https://res.cloudinary.com/dgmieaf9g/video/upload/v1/Steaburg_sjl6ik.jpg",
        videoUrl: "https://res.cloudinary.com/dgmieaf9g/video/upload/v1/Steaburg_sjl6ik.mp4",
        cloudinaryId: "Steaburg_sjl6ik",
        description: "Cinematic brand film for Steaburg showcasing the food, atmosphere, and brand story.",
        client: "Steaburg",
        role: "Director & Cinematographer",
        date: "2025",
        featured: true
    },

    // PHOTO PROJECTS
    {
        id: "food-pancakes-1",
        slug: "maple-drip-pancakes",
        title: "Maple Drip Pancakes",
        category: "photo",
        subcategory: "Food",
        thumbnail: "/assets/images/brands/Food-Photography/Pancakes.jpg",
        description: "Mouth-watering breakfast lifestyle photography focusing on texture and syrup drip.",
        client: "Breakfast Cafe",
        role: "Food Photographer",
        tools: ["Lightroom", "Macro Lens", "Natural Light"],
        date: "2024",
        featured: true
    },
    {
        id: "food-iced-v60",
        slug: "iced-v60-pour-over",
        title: "Iced V60 Pour Over",
        category: "photo",
        subcategory: "Food",
        thumbnail: "/assets/images/brands/Food-Photography/Iced V60.jpg",
        description: "Specialty coffee photography highlighting texture, condensation, and lighting.",
        client: "Specialty Coffee Shop",
        role: "Food Photographer",
        date: "2024"
    },
    {
        id: "product-photo-1",
        slug: "premium-product-photography",
        title: "Premium Product Photography",
        category: "photo",
        subcategory: "Product",
        thumbnail: "/assets/images/brands/Galaxy-Star/Galaxy 1.jpg",
        description: "High-end product photography for e-commerce and marketing.",
        client: "E-commerce Brand",
        role: "Product Photographer",
        tools: ["Lightroom", "Photoshop", "Studio Lighting"],
        date: "2024",
        featured: true,
        images: [
            "/assets/images/brands/Galaxy-Star/Galaxy 1.jpg",
            "/assets/images/brands/Galaxy-Star/Galaxy 2.jpg",
            "/assets/images/brands/Galaxy-Star/Galaxy 3.jpg"
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

    // SOCIAL CONTENT
    {
        id: "instagram-reels-1",
        slug: "viral-reels-campaign",
        title: "Viral Reels Campaign",
        category: "social",
        subcategory: "Instagram Reels",
        thumbnail: "https://res.cloudinary.com/dgmieaf9g/video/upload/v1/steaburgsharjah_1749307530_3649778156913339989_51220232024_u3srac.jpg",
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
        thumbnail: "/assets/images/brands/Ecom100.webp",
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
    },
    // PREPMEAL INFLUENCER COLLABORATIONS
    {
        id: "prepmeal-influencer-1",
        slug: "prepmeal-influencer-collab-1",
        title: "Influencer Collab - Gina Fit & Fab",
        category: "influencer",
        subcategory: "Influencer Campaign",
        thumbnail: "/assets/images/case-studies/prepmeal/Mockup.png",
        description: "Fitness influencer Gina showcasing PrepMeal's nutrition and convenience.",
        client: "PrepMeal",
        role: "Creative Strategy",
        date: "2024",
        videoUrl: "https://res.cloudinary.com/dgmieaf9g/video/upload/v1/PrepMeal_Influencer_Collab_gina_fitnfab__vj6whx.mp4",
        featured: false
    },
    {
        id: "prepmeal-influencer-2",
        slug: "prepmeal-influencer-collab-2",
        title: "Influencer Collab - Daily Meal Plan",
        category: "influencer",
        subcategory: "Influencer Campaign",
        thumbnail: "/assets/images/case-studies/prepmeal/PrepMeal Website.jpg",
        description: "Review and day-in-the-life sharing daily nutrition with PrepMeal.",
        client: "PrepMeal",
        role: "Creative Strategy",
        date: "2024",
        videoUrl: "https://res.cloudinary.com/dgmieaf9g/video/upload/v1/Prepmeal_Influencer_Collab_1_aa1lkx.mp4",
        featured: false
    },
    {
        id: "prepmeal-influencer-3",
        slug: "prepmeal-influencer-collab-3",
        title: "Influencer Collab - Subscription Unboxing",
        category: "influencer",
        subcategory: "Influencer Campaign",
        thumbnail: "/assets/images/case-studies/prepmeal/Mockup.png",
        description: "Unboxing and review of PrepMeal subscription food plans.",
        client: "PrepMeal",
        role: "Creative Strategy",
        date: "2024",
        videoUrl: "https://res.cloudinary.com/dgmieaf9g/video/upload/v1/PrepMeal_Influencer_Collab_u3txhn.mp4",
        featured: false
    },
    // AQUA CARE AD CREATIVES
    {
        id: "aqua-care-ad-softener-ai",
        slug: "aqua-care-softener-system-ai",
        title: "Water Softener System AI Video",
        category: "ads",
        subcategory: "AI Video",
        thumbnail: "https://res.cloudinary.com/dgmieaf9g/video/upload/so_5/Aqua_Care_Water_softener_system_AI_Video_fmcm0l.jpg",
        description: "AI product demonstration illustrating the benefits of scale prevention and soft water.",
        client: "Aqua Care UAE",
        role: "AI Creative Strategist",
        date: "2024",
        videoUrl: "https://res.cloudinary.com/dgmieaf9g/video/upload/v1/Aqua_Care_Water_softener_system_AI_Video_fmcm0l.mp4",
        featured: true
    },
    // ADDITIONAL VIDEO PRODUCTIONS
    {
        id: "little-rooster-creative-video",
        slug: "little-rooster-creative-video",
        title: "Little Rooster Brand Video",
        category: "video",
        subcategory: "Commercial",
        thumbnail: "https://res.cloudinary.com/dgmieaf9g/video/upload/so_15/Little_Rooster_creative_ampr17.jpg",
        description: "Cinematic brand advertisement for specialty chicken eatery Little Rooster.",
        client: "Little Rooster UAE",
        role: "Videographer & Editor",
        date: "2024",
        videoUrl: "https://res.cloudinary.com/dgmieaf9g/video/upload/v1/Little_Rooster_creative_ampr17.mp4",
        featured: true
    },
    {
        id: "healthymeals-creative-video",
        slug: "healthymeals-creative-video",
        title: "Healthy Meals Promo Video",
        category: "video",
        subcategory: "Commercial",
        thumbnail: "https://res.cloudinary.com/dgmieaf9g/video/upload/so_2/Healthymeals_creative_fpdhft.jpg",
        description: "Appetizing promotional video for Healthy Meals subscription food delivery.",
        client: "Healthy Meals",
        role: "Videographer & Editor",
        date: "2024",
        videoUrl: "https://res.cloudinary.com/dgmieaf9g/video/upload/v1/Healthymeals_creative_fpdhft.mp4",
        featured: true
    },
    {
        id: "ca-joyce-website",
        slug: "ca-joyce-website",
        title: "CA Joyce - Financial Portfolio",
        category: "web",
        subcategory: "Web Development",
        thumbnail: "/assets/images/brands/cajoyce-hero.webp",
        description: "Designed and developed a professional portfolio and consulting website for a Chartered Accountant. Live at: www.cajoyce.com",
        client: "CA Joyce",
        role: "Web Developer",
        tools: ["React", "Tailwind CSS", "Web Design"],
        date: "2024",
        featured: true
    },
    {
        id: "ecom100-website",
        slug: "ecom100-website",
        title: "Ecom100",
        category: "web",
        subcategory: "Web Development",
        thumbnail: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?q=80&w=2070&auto=format&fit=crop", // Placeholder
        description: "Built a high-converting e-commerce hub and digital platform for Ecom100. Live at: www.ecom100.in",
        client: "Ecom100",
        role: "Web Developer",
        tools: ["Next.js", "Tailwind CSS", "UI/UX Design"],
        date: "2024",
        featured: true
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
