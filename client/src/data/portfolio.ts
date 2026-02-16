export interface Project {
    id: string;
    title: string;
    category: "Video" | "Photo" | "Marketing";
    image: string;
    videoSrc?: string; // Optional video loop or full video link
    year: string;
    client?: string;
    tags: string[];
    link?: string;
    featured?: boolean;
}

export const portfolio: Project[] = [
    // --- Video Projects (from portfolioContent.ts) ---
    {
        id: "wedding-reel-1",
        title: "Cinematic Wedding Highlights",
        category: "Video",
        image: "https://res.cloudinary.com/dgmieaf9g/video/upload/v1/Wedding_reel_1_quwexf.jpg",
        videoSrc: "https://res.cloudinary.com/dgmieaf9g/video/upload/v1/Wedding_reel_1_quwexf.mp4",
        year: "2024",
        client: "Private Client",
        tags: ["Wedding", "Cinematography"],
        featured: true,
    },
    {
        id: "quant-event",
        title: "Quant Event Dubai",
        category: "Video",
        image: "https://res.cloudinary.com/dgmieaf9g/video/upload/v1/Quant_hmvjvq.jpg",
        videoSrc: "https://res.cloudinary.com/dgmieaf9g/video/upload/v1/Quant_hmvjvq.mp4",
        year: "2023",
        client: "Quant",
        tags: ["Event", "Corporate"],
    },
    {
        id: "game-street",
        title: "Game Street Showcase",
        category: "Video",
        image: "https://res.cloudinary.com/dgmieaf9g/video/upload/v1/Game_Street_Reel_1_zosjmg.jpg",
        videoSrc: "https://res.cloudinary.com/dgmieaf9g/video/upload/v1/Game_Street_Reel_1_zosjmg.mp4",
        year: "2024",
        client: "Game Street",
        tags: ["Event", "Social Media"],
    },
    {
        id: "personal-brand-boss",
        title: "Personal Branding Series",
        category: "Video",
        image: "https://res.cloudinary.com/dgmieaf9g/video/upload/v1/Boss_1_znnsfe.jpg",
        videoSrc: "https://res.cloudinary.com/dgmieaf9g/video/upload/v1/Boss_1_znnsfe.mp4",
        year: "2024",
        client: "Personal Brand",
        tags: ["Branding", "Storytelling"],
    },
    {
        id: "motion-reel",
        title: "Dynamic Motion Reel",
        category: "Video",
        image: "https://res.cloudinary.com/dgmieaf9g/video/upload/v1/6_ci2fz2.jpg",
        videoSrc: "https://res.cloudinary.com/dgmieaf9g/video/upload/v1/6_ci2fz2.mp4",
        year: "2024",
        client: "Various",
        tags: ["Motion Graphics", "Animation"],
    },

    // --- Photo Projects (from portfolioContent.ts & brands.ts) ---
    {
        id: "wedding-photo-series",
        title: "Timeless Wedding Moments",
        category: "Photo",
        image: "/images/photography/wedding/wedding-1.jpg", // Kept local path, ensure file exists or use specific cloud URL if available
        year: "2023",
        client: "Private Client",
        tags: ["Wedding", "Editorial"],
        featured: true,
    },
    {
        id: "product-photo-perfume",
        title: "Galaxy Star Fragrances",
        category: "Photo",
        image: "/images/brands/Galaxy-Star/Galaxy 3.jpg",
        year: "2023",
        client: "Galaxy Star",
        tags: ["Product", "Commercial"],
    },
    {
        id: "auto-photo-porsche",
        title: "Beyond Cars - Luxury Fleet",
        category: "Photo",
        image: "/images/brands/Beyond-Cars/Porsche 718 Cayman.jpg",
        year: "2024",
        client: "Beyond Cars",
        tags: ["Automotive", "Lifestyle"],
    },

    // --- Marketing Projects (from brands.ts) ---
    {
        id: "campaign-acero",
        title: "Acero Steel Solutions",
        category: "Marketing",
        image: "/images/brands/Acero/Acero 2-1.jpg",
        year: "2023",
        client: "Acero",
        tags: ["B2B Marketing", "Brand Strategy"],
        featured: true,
    },
    {
        id: "campaign-q4",
        title: "Q4 Clean Home Launch",
        category: "Marketing",
        image: "/images/brands/Q4/Ad 9.jpg",
        year: "2024",
        client: "Q4 Clean Home",
        tags: ["Social Media Ads", "Product Launch"],
    },
    {
        id: "campaign-suncore",
        title: "Suncore Energies Rebrand",
        category: "Marketing",
        image: "/images/brands/Suncore/AD 2 - suncore.jpg",
        year: "2023",
        client: "Suncore Energies",
        tags: ["Rebranding", "Solar Energy"],
    },
    {
        id: "campaign-knk",
        title: "KNK Interiors Growth",
        category: "Marketing",
        image: "/images/brands/Knk/Artboard 1 copy 2.jpg",
        year: "2023",
        client: "KNK",
        tags: ["Lead Gen", "Interior Design"],
    },
    {
        id: "campaign-tess",
        title: "TESS Educational Campaign",
        category: "Marketing",
        image: "/images/brands/Tes/Ad.jpg",
        year: "2023",
        client: "TESS",
        tags: ["Education", "Enrollment"],
    },
];
