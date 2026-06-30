export interface Project {
    id: string;
    slug: string;
    title: string;
    category: "video" | "photo" | "editing" | "social" | "ads" | "influencer";
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
        id: "product-showcase-1",
        slug: "luxury-watch-reveal",
        title: "Luxury Watch Reveal",
        category: "video",
        subcategory: "Product",
        thumbnail: "https://res.cloudinary.com/dgmieaf9g/video/upload/v1/Product_1_gfqhqr.jpg",
        videoUrl: "https://res.cloudinary.com/dgmieaf9g/video/upload/v1/Product_1_gfqhqr.mp4",
        cloudinaryId: "Product_1_gfqhqr",
        description: "Premium product showcase highlighting craftsmanship and detail.",
        client: "Luxury Watch Brand",
        role: "Product Videographer",
        tools: ["DaVinci Resolve", "Macro Lens", "Controlled Lighting"],
        date: "2024",
        featured: true
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
        id: "food-cheesecake-1",
        slug: "artisan-cheesecake",
        title: "Artisan Cheesecake",
        category: "photo",
        subcategory: "Food",
        thumbnail: "/assets/images/brands/Food-Photography/Cheesecake.jpg",
        description: "Delicious dessert detailing and styling perfectly lit to showcase layers.",
        client: "Artisan Bakery",
        role: "Food Photographer",
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
        id: "food-chicken-pesto",
        slug: "chicken-pesto-pasta",
        title: "Chicken Pesto Pasta",
        category: "photo",
        subcategory: "Food",
        thumbnail: "/assets/images/brands/Food-Photography/Chicken Pesto.jpg",
        description: "Savory dishes captured with appetizing detail and vibrant colors.",
        client: "Italian Restaurant",
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
    {
        id: "portrait-session-1",
        slug: "executive-portraits",
        title: "Executive Portraits",
        category: "photo",
        subcategory: "Portraits",
        thumbnail: "/assets/images/brands/Food-Photography/Cheesecake.jpg",
        description: "Professional headshots and portraits for corporate clients.",
        client: "Tech Company",
        role: "Portrait Photographer",
        tools: ["Lightroom", "Photoshop", "Natural Light"],
        date: "2024",
        images: [
            "/assets/images/brands/Food-Photography/Cheesecake.jpg",
            "/assets/images/brands/Food-Photography/Pancakes.jpg"
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
        thumbnail: "/assets/images/brands/SIAS-Group/full_layout.png",
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
    {
        id: "little-rooster-branding",
        slug: "little-rooster-branding",
        title: "Little Rooster Branding",
        category: "ads",
        subcategory: "Brand Identity",
        thumbnail: "/assets/images/brands/Little-Rooster/Little Rooster Social Media Post.jpeg",
        description: "Full visual brand identity system — logo, color palette, apparel, and premium packaging for a specialty chicken eatery.",
        client: "Little Rooster UAE",
        role: "Brand Designer & Strategist",
        date: "2024",
        featured: true,
        images: [
            "/assets/images/brands/Little-Rooster/Little Rooster Logo.png",
            "/assets/images/brands/Little-Rooster/Tshirt Mockup.jpg",
            "/assets/images/brands/Little-Rooster/Cap Mockup.jpg",
            "/assets/images/brands/Little-Rooster/paperbag.jpg",
            "/assets/images/brands/Little-Rooster/shopping_bag_mockup.jpg"
        ]
    },
    // AQUA CARE INFLUENCER COLLABORATIONS
    {
        id: "aqua-care-influencer-1",
        slug: "aqua-care-influencer-collab-1",
        title: "Influencer Collaboration - Filter Showcase",
        category: "influencer",
        subcategory: "Influencer Campaign",
        thumbnail: "/assets/images/brands/Aqua-Care/Vita bloom.jpg",
        description: "A lifestyle influencer showcasing the health benefits of Aqua Care shower filters.",
        client: "Aqua Care UAE",
        role: "Creative & Media Strategy",
        date: "2024",
        videoUrl: "https://res.cloudinary.com/dgmieaf9g/video/upload/v1/Aqua_Care_influencer_marketing_2_bwuudf.mp4",
        featured: false
    },
    {
        id: "aqua-care-influencer-2",
        slug: "aqua-care-influencer-collab-2",
        title: "Influencer Collaboration - Clean Water Campaign",
        category: "influencer",
        subcategory: "Influencer Campaign",
        thumbnail: "/assets/images/brands/Aqua-Care/Filters 2.jpg",
        description: "Collaboration highlighting the importance of filtered water in daily routines.",
        client: "Aqua Care UAE",
        role: "Creative & Media Strategy",
        date: "2024",
        videoUrl: "https://res.cloudinary.com/dgmieaf9g/video/upload/v1/Aqua_care_influencer_marketing_ytgetc.mp4",
        featured: false
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
        id: "aqua-care-ad-dispenser",
        slug: "aqua-care-dispenser-cinematic",
        title: "Aqua Care Dispenser Cinematic Ad",
        category: "ads",
        subcategory: "Ad Creative",
        thumbnail: "/assets/images/brands/Aqua-Care/new.jpg",
        description: "High-end cinematic commercial for Aqua Care's premium hot/cold water dispensers.",
        client: "Aqua Care UAE",
        role: "Director & Editor",
        date: "2024",
        videoUrl: "https://res.cloudinary.com/dgmieaf9g/video/upload/v1/Aqua_Care_Dispenser_Cinematic_kwhxvr.mp4",
        featured: true
    },
    {
        id: "aqua-care-ad-ai-product",
        slug: "aqua-care-ai-product-video",
        title: "Aqua Care AI Product Video",
        category: "ads",
        subcategory: "AI Video",
        thumbnail: "/assets/images/brands/Aqua-Care/Filters 2.jpg",
        description: "A fully AI-generated product showcase video illustrating filtration tech in action.",
        client: "Aqua Care UAE",
        role: "AI Creative Strategist",
        date: "2024",
        videoUrl: "https://res.cloudinary.com/dgmieaf9g/video/upload/v1/Aqua_Care_fully_AI_Product_Video_qc6l39.mp4",
        featured: true
    },
    {
        id: "aqua-care-ad-ramadan-dispenser",
        slug: "aqua-care-ramadan-dispenser-ai",
        title: "Ramadan Dispenser AI Campaign",
        category: "ads",
        subcategory: "AI Video",
        thumbnail: "/assets/images/brands/Aqua-Care/Oman National Day.jpg",
        description: "AI-assisted campaign targeting hot water usage during Ramadan meal prep.",
        client: "Aqua Care UAE",
        role: "AI Creative Strategist",
        date: "2024",
        videoUrl: "https://res.cloudinary.com/dgmieaf9g/video/upload/v1/Aqua_Care_Ramadan_Dispenser_Hot_water_use_AI_Video_yh60pz.mp4",
        featured: true
    },
    {
        id: "aqua-care-ad-softener-ai",
        slug: "aqua-care-softener-system-ai",
        title: "Water Softener System AI Video",
        category: "ads",
        subcategory: "AI Video",
        thumbnail: "/assets/images/brands/Aqua-Care/new.jpg",
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
        thumbnail: "/assets/images/brands/Little-Rooster/Little Rooster Social Media Post.jpeg",
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
        thumbnail: "/assets/images/case-studies/prepmeal/PrepMeal Website.jpg",
        description: "Appetizing promotional video for Healthy Meals subscription food delivery.",
        client: "Healthy Meals",
        role: "Videographer & Editor",
        date: "2024",
        videoUrl: "https://res.cloudinary.com/dgmieaf9g/video/upload/v1/Healthymeals_creative_fpdhft.mp4",
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
