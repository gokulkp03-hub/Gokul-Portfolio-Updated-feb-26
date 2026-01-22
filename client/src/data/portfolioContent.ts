export interface PortfolioItem {
    id: string;
    type: "image" | "youtube" | "vimeo" | "cloudinary";
    src?: string; // for images
    url?: string; // for youtube/vimeo
    cloudinaryId?: string; // for cloudinary videos
    title: string;
    description?: string;
    thumbnail?: string;
    aspectRatio?: "horizontal" | "vertical";
}

export const portfolioContent: Record<string, Record<string, PortfolioItem[]>> = {
    "video-production": {
        "weddings": [
            {
                id: "wedding-reel-1",
                type: "cloudinary",
                cloudinaryId: "Wedding_reel_1_quwexf",
                title: "Wedding Reel 1",
                description: "Cinematic wedding highlights capturing the special moments",
                thumbnail: "https://res.cloudinary.com/dgmieaf9g/video/upload/v1/Wedding_reel_1_quwexf.jpg",
                aspectRatio: "horizontal"
            },
            {
                id: "wedding-5",
                type: "cloudinary",
                cloudinaryId: "5_t1jx9h",
                title: "Wedding Film 5",
                description: "Beautiful wedding ceremony and celebration",
                thumbnail: "https://res.cloudinary.com/dgmieaf9g/video/upload/v1/5_t1jx9h.jpg",
                aspectRatio: "horizontal"
            },
            {
                id: "wedding-2",
                type: "cloudinary",
                cloudinaryId: "2_uccbkl",
                title: "Wedding Film 2",
                description: "Romantic wedding story beautifully captured",
                thumbnail: "https://res.cloudinary.com/dgmieaf9g/video/upload/v1/2_uccbkl.jpg",
                aspectRatio: "horizontal"
            },
            {
                id: "wedding-3",
                type: "cloudinary",
                cloudinaryId: "3_ulirqi",
                title: "Wedding Film 3",
                description: "Elegant wedding moments and emotions",
                thumbnail: "https://res.cloudinary.com/dgmieaf9g/video/upload/v1/3_ulirqi.jpg",
                aspectRatio: "horizontal"
            },
            {
                id: "wedding-6",
                type: "cloudinary",
                cloudinaryId: "6_yeqql7",
                title: "Wedding Film 6",
                description: "Timeless wedding memories captured in film",
                thumbnail: "https://res.cloudinary.com/dgmieaf9g/video/upload/v1/6_yeqql7.jpg",
                aspectRatio: "horizontal"
            },
            {
                id: "wedding-4",
                type: "cloudinary",
                cloudinaryId: "4_m0jo3z",
                title: "Wedding Film 4",
                description: "Joyful celebration of love and unity",
                thumbnail: "https://res.cloudinary.com/dgmieaf9g/video/upload/v1/4_m0jo3z.jpg",
                aspectRatio: "horizontal"
            },
            {
                id: "wedding-11",
                type: "cloudinary",
                cloudinaryId: "11_xadimf",
                title: "Wedding Film 11",
                description: "Stunning wedding cinematography",
                thumbnail: "https://res.cloudinary.com/dgmieaf9g/video/upload/v1/11_xadimf.jpg",
                aspectRatio: "horizontal"
            },
            {
                id: "wedding-14",
                type: "cloudinary",
                cloudinaryId: "14_ijw1ew",
                title: "Wedding Film 14",
                description: "Memorable wedding day highlights",
                thumbnail: "https://res.cloudinary.com/dgmieaf9g/video/upload/v1/14_ijw1ew.jpg",
                aspectRatio: "horizontal"
            }
        ],
        "events": [
            {
                id: "event-quant",
                type: "cloudinary",
                cloudinaryId: "Quant_hmvjvq",
                title: "Quant Event Highlight",
                description: "Cinematic coverage of the Quant event in Dubai.",
                thumbnail: "https://res.cloudinary.com/dgmieaf9g/video/upload/v1/Quant_hmvjvq.jpg",
                aspectRatio: "horizontal"
            },
            {
                id: "event-inauguration",
                type: "cloudinary",
                cloudinaryId: "Inauguration_1_ltmw5l",
                title: "Grand Inauguration",
                description: "Official ceremony and ribbon cutting highlights.",
                thumbnail: "https://res.cloudinary.com/dgmieaf9g/video/upload/v1/Inauguration_1_ltmw5l.jpg",
                aspectRatio: "horizontal"
            },
            {
                id: "event-game-street",
                type: "cloudinary",
                cloudinaryId: "Game_Street_Reel_1_zosjmg",
                title: "Game Street Event",
                description: "Dynamic vertical coverage of the Game Street showcase.",
                thumbnail: "https://res.cloudinary.com/dgmieaf9g/video/upload/v1/Game_Street_Reel_1_zosjmg.jpg",
                aspectRatio: "vertical"
            },
            {
                id: "event-retro-5",
                type: "cloudinary",
                cloudinaryId: "Retro_5_wukctg",
                title: "Retro Event 5",
                description: "Professional event coverage with cinematic storytelling.",
                thumbnail: "https://res.cloudinary.com/dgmieaf9g/video/upload/v1/Retro_5_wukctg.jpg",
                aspectRatio: "horizontal"
            },
            {
                id: "event-burj-2",
                type: "cloudinary",
                cloudinaryId: "Burj_2_hcocpv",
                title: "Burj Event 2",
                description: "High-end event videography capturing key moments.",
                thumbnail: "https://res.cloudinary.com/dgmieaf9g/video/upload/v1/Burj_2_hcocpv.jpg",
                aspectRatio: "horizontal"
            }
        ],
        "product": [],
        "personal-branding": [
            {
                id: "boss-1",
                type: "cloudinary",
                cloudinaryId: "Boss_1_znnsfe",
                title: "Personal Branding - Episode 1",
                description: "High-impact vertical brand story.",
                thumbnail: "https://res.cloudinary.com/dgmieaf9g/video/upload/v1/Boss_1_znnsfe.jpg",
                aspectRatio: "vertical"
            },
            {
                id: "boss-2",
                type: "cloudinary",
                cloudinaryId: "Boss_2_final_zjfhqk",
                title: "Personal Branding - Episode 2",
                description: "The journey of building a premium personal brand.",
                thumbnail: "https://res.cloudinary.com/dgmieaf9g/video/upload/v1/Boss_2_final_zjfhqk.jpg",
                aspectRatio: "vertical"
            }
        ],
        "reels": [
            {
                id: "reel-2",
                type: "cloudinary",
                cloudinaryId: "2_n4wvsc",
                title: "Brand Identity Story",
                thumbnail: "https://res.cloudinary.com/dgmieaf9g/video/upload/v1/2_n4wvsc.jpg",
                aspectRatio: "vertical"
            },
            {
                id: "reel-akhil",
                type: "cloudinary",
                cloudinaryId: "Akhil_frnd_n46qlh",
                title: "Professional Showcase",
                thumbnail: "https://res.cloudinary.com/dgmieaf9g/video/upload/v1/Akhil_frnd_n46qlh.jpg",
                aspectRatio: "vertical"
            },
            {
                id: "reel-8",
                type: "cloudinary",
                cloudinaryId: "8_uyanbn",
                title: "Corporate Excellence",
                thumbnail: "https://res.cloudinary.com/dgmieaf9g/video/upload/v1/8_uyanbn.jpg",
                aspectRatio: "vertical"
            },
            {
                id: "reel-anu",
                type: "cloudinary",
                cloudinaryId: "Anu-_2_ziwvlp",
                title: "Creative Branding",
                thumbnail: "https://res.cloudinary.com/dgmieaf9g/video/upload/v1/Anu-_2_ziwvlp.jpg",
                aspectRatio: "vertical"
            },
            {
                id: "reel-15",
                type: "cloudinary",
                cloudinaryId: "15_vn0m4b",
                title: "Visual Brand Story",
                thumbnail: "https://res.cloudinary.com/dgmieaf9g/video/upload/v1/15_vn0m4b.jpg",
                aspectRatio: "vertical"
            },
            {
                id: "reel-1",
                type: "cloudinary",
                cloudinaryId: "1_ymkybg",
                title: "Brand Connection",
                thumbnail: "https://res.cloudinary.com/dgmieaf9g/video/upload/v1/1_ymkybg.jpg",
                aspectRatio: "vertical"
            },
            {
                id: "reel-10",
                type: "cloudinary",
                cloudinaryId: "10_exc2jg",
                title: "Premium Identity",
                thumbnail: "https://res.cloudinary.com/dgmieaf9g/video/upload/v1/10_exc2jg.jpg",
                aspectRatio: "vertical"
            },
            {
                id: "reel-12",
                type: "cloudinary",
                cloudinaryId: "12_zhg9oi",
                title: "Modern Professional",
                thumbnail: "https://res.cloudinary.com/dgmieaf9g/video/upload/v1/12_zhg9oi.jpg",
                aspectRatio: "vertical"
            }
        ]
    },
    "photography": {
        "wedding": [
            {
                id: "wedding-1",
                type: "image",
                src: "/images/photography/wedding/wedding-1.jpg",
                title: "Wedding Story",
                description: "Beautiful moments from a traditional wedding."
            }
        ],
        "product": [],
        "automobile": [],
        "corporate": [],
        "event": [],
        "lifestyle": [],
        "food": [],
        "portraits": [],
        "architecture": []
    },
    "graphic-design": {
        "social-media": [
            {
                id: "design-1",
                type: "image",
                src: "/images/brands/Q4/Ad 9.jpg",
                title: "Social Media Campaign",
                description: "High-converting ad for Q4 brand."
            }
        ],
        "brand-identity": [],
        "posters": [],
        "menu-design": [],
        "digital-ads": [],
        "thumbnails": [],
        "presentation": []
    },
    "motion-graphics": {
        "logo-animations": [],
        "reels-motion": [
            {
                id: "motion-6",
                type: "cloudinary",
                cloudinaryId: "6_ci2fz2",
                title: "Dynamic Motion Reel",
                thumbnail: "https://res.cloudinary.com/dgmieaf9g/video/upload/v1/6_ci2fz2.jpg",
                aspectRatio: "vertical"
            },
            {
                id: "motion-ziya",
                type: "cloudinary",
                cloudinaryId: "Ziya_5_easwfm",
                title: "Creative Transitions",
                thumbnail: "https://res.cloudinary.com/dgmieaf9g/video/upload/v1/Ziya_5_easwfm.jpg",
                aspectRatio: "vertical"
            }
        ],
        "text-animations": [],
        "explainer": [],
        "transitions": []
    },
    "marketing-growth": {
        "paid-ads": [],
        "strategy": [],
        "content-plan": []
    }
};
