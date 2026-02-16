export interface VideoProject {
    id: string;
    title: string;
    category: "Weddings" | "Events" | "Product" | "Personal Branding" | "Reels" | "Motion Graphics";
    thumbnail: string;
    videoUrl?: string; // Cloudinary or Vimeo/YouTube link
    description: string;
    featured?: boolean;
}

export const videoProjects: VideoProject[] = [
    {
        id: "wedding-highlight-1",
        title: "Cinematic Wedding Memories",
        category: "Weddings",
        thumbnail: "https://res.cloudinary.com/dgmieaf9g/video/upload/v1/Wedding_reel_1_quwexf.jpg",
        videoUrl: "https://res.cloudinary.com/dgmieaf9g/video/upload/v1/Wedding_reel_1_quwexf.mp4",
        description: "Capturing the pure emotion and timeless moments of a beautiful wedding day.",
        featured: true
    },
    {
        id: "boss-branding-1",
        title: "The Entrepreneur Mindset",
        category: "Personal Branding",
        thumbnail: "https://res.cloudinary.com/dgmieaf9g/video/upload/v1/Boss_1_znnsfe.jpg",
        videoUrl: "https://res.cloudinary.com/dgmieaf9g/video/upload/v1/Boss_1_znnsfe.mp4",
        description: "A high-impact brand story for a visionary entrepreneur.",
        featured: true
    },
    {
        id: "boss-branding-2",
        title: "Legacy Building",
        category: "Personal Branding",
        thumbnail: "https://res.cloudinary.com/dgmieaf9g/video/upload/v1/Boss_2_final_zjfhqk.jpg",
        videoUrl: "https://res.cloudinary.com/dgmieaf9g/video/upload/v1/Boss_2_final_zjfhqk.mp4",
        description: "Deep dive into the journey of building a premium brand."
    },
    {
        id: "event-quant-dubai",
        title: "Quant Event Dubai",
        category: "Events",
        thumbnail: "https://res.cloudinary.com/dgmieaf9g/video/upload/v1/Quant_hmvjvq.jpg",
        videoUrl: "https://res.cloudinary.com/dgmieaf9g/video/upload/v1/Quant_hmvjvq.mp4",
        description: "Dynamic highlights from the high-energy Quant event in Dubai."
    },
    {
        id: "event-inauguration",
        title: "Grand Inauguration",
        category: "Events",
        thumbnail: "https://res.cloudinary.com/dgmieaf9g/video/upload/v1/Inauguration_1_ltmw5l.jpg",
        videoUrl: "https://res.cloudinary.com/dgmieaf9g/video/upload/v1/Inauguration_1_ltmw5l.mp4",
        description: "Official ceremony and ribbon cutting highlights for a major launch."
    },
    {
        id: "game-street-reel",
        title: "Game Street Showcase",
        category: "Events",
        thumbnail: "https://res.cloudinary.com/dgmieaf9g/video/upload/v1/Game_Street_Reel_1_zosjmg.jpg",
        videoUrl: "https://res.cloudinary.com/dgmieaf9g/video/upload/v1/Game_Street_Reel_1_zosjmg.mp4",
        description: "Fast-paced event recap capturing the electric atmosphere."
    },
    {
        id: "wedding-cinematic-5",
        title: "Eternal Love Story",
        category: "Weddings",
        thumbnail: "https://res.cloudinary.com/dgmieaf9g/video/upload/v1/5_t1jx9h.jpg",
        videoUrl: "https://res.cloudinary.com/dgmieaf9g/video/upload/v1/5_t1jx9h.mp4",
        description: "A celebration of love, culture, and togetherness."
    },
    {
        id: "motion-dynamic-reel",
        title: "Dynamic Motion Reel",
        category: "Motion Graphics",
        thumbnail: "https://res.cloudinary.com/dgmieaf9g/video/upload/v1/6_ci2fz2.jpg",
        videoUrl: "https://res.cloudinary.com/dgmieaf9g/video/upload/v1/6_ci2fz2.mp4",
        description: "Pushing boundaries with motion design and visual effects."
    },
    {
        id: "reel-brand-identity",
        title: "Brand Identity Story",
        category: "Reels",
        thumbnail: "https://res.cloudinary.com/dgmieaf9g/video/upload/v1/2_n4wvsc.jpg",
        videoUrl: "https://res.cloudinary.com/dgmieaf9g/video/upload/v1/2_n4wvsc.mp4",
        description: "A punchy, vertical brand narrative for modern social audiences."
    },
    {
        id: "reel-professional-showcase",
        title: "Professional Showcase",
        category: "Reels",
        thumbnail: "https://res.cloudinary.com/dgmieaf9g/video/upload/v1/Akhil_frnd_n46qlh.jpg",
        videoUrl: "https://res.cloudinary.com/dgmieaf9g/video/upload/v1/Akhil_frnd_n46qlh.mp4",
        description: "Fast-paced professional portfolio highlight."
    },
    {
        id: "corporate-excellence",
        title: "Corporate Excellence",
        category: "Reels",
        thumbnail: "https://res.cloudinary.com/dgmieaf9g/video/upload/v1/8_uyanbn.jpg",
        videoUrl: "https://res.cloudinary.com/dgmieaf9g/video/upload/v1/8_uyanbn.mp4",
        description: "Capturing the essence of corporate growth and professionalism."
    },
    {
        id: "event-retro-5",
        title: "Retro Event Memories",
        category: "Events",
        thumbnail: "https://res.cloudinary.com/dgmieaf9g/video/upload/v1/Retro_5_wukctg.jpg",
        videoUrl: "https://res.cloudinary.com/dgmieaf9g/video/upload/v1/Retro_5_wukctg.mp4",
        description: "Nostalgic event highlights with a cinematic retro feel."
    },
    {
        id: "wedding-film-2",
        title: "Timeless Union",
        category: "Weddings",
        thumbnail: "https://res.cloudinary.com/dgmieaf9g/video/upload/v1/2_uccbkl.jpg",
        videoUrl: "https://res.cloudinary.com/dgmieaf9g/video/upload/v1/2_uccbkl.mp4",
        description: "A beautiful cinematic journey of two souls coming together."
    },
    {
        id: "wedding-film-6",
        title: "Elegant Moments",
        category: "Weddings",
        thumbnail: "https://res.cloudinary.com/dgmieaf9g/video/upload/v1/6_yeqql7.jpg",
        videoUrl: "https://res.cloudinary.com/dgmieaf9g/video/upload/v1/6_yeqql7.mp4",
        description: "Sophisticated wedding highlights with emotional depth."
    }
];
