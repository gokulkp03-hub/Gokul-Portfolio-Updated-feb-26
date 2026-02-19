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
        id: "boss-branding-1",
        title: "The Entrepreneur Mindset",
        category: "Personal Branding",
        thumbnail: "https://res.cloudinary.com/dgmieaf9g/video/upload/v1/Boss_1_znnsfe.jpg",
        videoUrl: "https://res.cloudinary.com/dgmieaf9g/video/upload/v1/Boss_1_znnsfe.mp4",
        description: "A high-impact brand story for a visionary entrepreneur.",
        featured: true
    },
    {
        id: "product-showcase-1",
        title: "Luxury Watch Reveal",
        category: "Product",
        thumbnail: "https://res.cloudinary.com/dgmieaf9g/video/upload/v1/Product_1_gfqhqr.jpg",
        videoUrl: "https://res.cloudinary.com/dgmieaf9g/video/upload/v1/Product_1_gfqhqr.mp4",
        description: "Premium product showcase highlighting craftsmanship and detail.",
        featured: true
    },
    {
        id: "event-quant-dubai",
        title: "Quant Event Dubai",
        category: "Events",
        thumbnail: "https://res.cloudinary.com/dgmieaf9g/video/upload/v1/Quant_hmvjvq.jpg",
        videoUrl: "https://res.cloudinary.com/dgmieaf9g/video/upload/v1/Quant_hmvjvq.mp4",
        description: "Dynamic highlights from the high-energy Quant event in Dubai.",
        featured: true
    },
    {
        id: "reel-brand-identity",
        title: "Brand Identity Story",
        category: "Reels",
        thumbnail: "https://res.cloudinary.com/dgmieaf9g/video/upload/v1/2_n4wvsc.jpg",
        videoUrl: "https://res.cloudinary.com/dgmieaf9g/video/upload/v1/2_n4wvsc.mp4",
        description: "A punchy, vertical brand narrative for modern social audiences.",
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
        id: "event-inauguration",
        title: "Grand Inauguration",
        category: "Events",
        thumbnail: "https://res.cloudinary.com/dgmieaf9g/video/upload/v1/Inauguration_1_ltmw5l.jpg",
        videoUrl: "https://res.cloudinary.com/dgmieaf9g/video/upload/v1/Inauguration_1_ltmw5l.mp4",
        description: "Official ceremony and ribbon cutting highlights for a major launch."
    },
    {
        id: "wedding-highlight-1",
        title: "Cinematic Wedding Memories",
        category: "Weddings",
        thumbnail: "https://res.cloudinary.com/dgmieaf9g/video/upload/v1/Wedding_reel_1_quwexf.jpg",
        videoUrl: "https://res.cloudinary.com/dgmieaf9g/video/upload/v1/Wedding_reel_1_quwexf.mp4",
        description: "Capturing the pure emotion and timeless moments of a beautiful wedding day."
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
    },
    {
        id: "burj-aerial",
        title: "Burj Khalifa Aerial",
        category: "Events",
        thumbnail: "https://res.cloudinary.com/dgmieaf9g/video/upload/v1/Burj_2_hcocpv.jpg",
        videoUrl: "https://res.cloudinary.com/dgmieaf9g/video/upload/v1/Burj_2_hcocpv.mp4",
        description: "Breathtaking aerial views of the iconic Burj Khalifa."
    },
    {
        id: "anu-save-date",
        title: "Anu Save the Date",
        category: "Weddings",
        thumbnail: "https://res.cloudinary.com/dgmieaf9g/video/upload/v1/Anu_Save_the_date_wm3qle.jpg",
        videoUrl: "https://res.cloudinary.com/dgmieaf9g/video/upload/v1/Anu_Save_the_date_wm3qle.mp4",
        description: "A beautiful cinematic save-the-date film."
    },
    {
        id: "wedding-film-7",
        title: "Timeless Celebration",
        category: "Weddings",
        thumbnail: "https://res.cloudinary.com/dgmieaf9g/video/upload/v1/7_t4fw2q.jpg",
        videoUrl: "https://res.cloudinary.com/dgmieaf9g/video/upload/v1/7_t4fw2q.mp4",
        description: "Capturing the essence of a beautiful wedding union."
    },
    {
        id: "wedding-film-12",
        title: "Vibrant Vows",
        category: "Weddings",
        thumbnail: "https://res.cloudinary.com/dgmieaf9g/video/upload/v1/12_zhg9oi.jpg",
        videoUrl: "https://res.cloudinary.com/dgmieaf9g/video/upload/v1/12_zhg9oi.mp4",
        description: "Emotional highlights from a vibrant wedding celebration."
    },
    {
        id: "wedding-film-10",
        title: "Golden Hour Memories",
        category: "Weddings",
        thumbnail: "https://res.cloudinary.com/dgmieaf9g/video/upload/v1/10_exc2jg.jpg",
        videoUrl: "https://res.cloudinary.com/dgmieaf9g/video/upload/v1/10_exc2jg.mp4",
        description: "Cinematic wedding highlights captured during the golden hour."
    },
    {
        id: "wedding-film-15",
        title: "Eternal Bond",
        category: "Weddings",
        thumbnail: "https://res.cloudinary.com/dgmieaf9g/video/upload/v1/15_vn0m4b.jpg",
        videoUrl: "https://res.cloudinary.com/dgmieaf9g/video/upload/v1/15_vn0m4b.mp4",
        description: "A soulful wedding film capturing every precious moment."
    },
    {
        id: "anu-2",
        title: "Anu's Story",
        category: "Personal Branding",
        thumbnail: "https://res.cloudinary.com/dgmieaf9g/video/upload/v1/Anu-_2_ziwvlp.jpg",
        videoUrl: "https://res.cloudinary.com/dgmieaf9g/video/upload/v1/Anu-_2_ziwvlp.mp4",
        description: "Personal branding story highlighting growth and vision."
    },
    {
        id: "video-2025-07",
        title: "Creative Reel 2025",
        category: "Reels",
        thumbnail: "https://res.cloudinary.com/dgmieaf9g/video/upload/v1/VIDEO-2025-07-07-20-47-02_qynv0d.jpg",
        videoUrl: "https://res.cloudinary.com/dgmieaf9g/video/upload/v1/VIDEO-2025-07-07-20-47-02_qynv0d.mp4",
        description: "A dynamic showcase of creative projects from 2025."
    }
];
