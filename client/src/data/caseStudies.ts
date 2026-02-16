export interface CaseStudy {
    id: string;
    slug: string;
    client: string;
    industry: string;
    headline: string;
    challenge: string;
    solution: string;
    results: {
        metric: string;
        label: string;
        trend: "up" | "down";
    }[];
    testimonial?: {
        quote: string;
        author: string;
        role: string;
    };
    image: string;
    tags: string[];
}

export const caseStudies: CaseStudy[] = [
    {
        id: "cs1",
        slug: "q4-clean-home-launch",
        client: "Q4 Clean Home",
        industry: "E-commerce / Home Care",
        headline: "Launching a Direct-to-Consumer Brand",
        challenge: "New market entry with zero brand awareness and high competition.",
        solution: "Developed a high-energy social media campaign focusing on product efficacy demos.",
        results: [
            { metric: "3.5x", label: "ROAS on Launch", trend: "up" },
            { metric: "15k+", label: "Initial Sales", trend: "up" },
            { metric: "-30%", label: "CPA vs Benchmark", trend: "down" },
        ],
        testimonial: {
            quote: "The launch campaign exceeded all our expectations. The creative was spot on.",
            author: "Marketing Head",
            role: "Q4 Clean Home",
        },
        image: "/images/brands/Q4/Ad 9.jpg", // Real image from Q4 folder
        tags: ["Meta Ads", "Brand Launch", "Video Creative"],
    },
    {
        id: "cs2",
        slug: "acero-steel-b2b",
        client: "Acero Steel",
        industry: "B2B Manufacturing",
        headline: "Generating High-Value B2B Leads",
        challenge: "Traditional sales methods were slow; needed digital lead generation.",
        solution: "Implemented a LinkedIn and Google Ads strategy targeting key decision makers.",
        results: [
            { metric: "45", label: "Qualified Leads/Mo", trend: "up" },
            { metric: "22%", label: "Conversion Rate", trend: "up" },
            { metric: "AED 165", label: "Cost Per Lead", trend: "down" },
        ],
        testimonial: {
            quote: "We are now getting consistent inquiries from major construction firms.",
            author: "Director",
            role: "Acero Steel",
        },
        image: "/images/brands/Acero/Acero 2-1.jpg", // Real image from Acero folder
        tags: ["LinkedIn Ads", "B2B Strategy", "Lead Gen"],
    },
    {
        id: "cs3",
        slug: "beyond-cars-growth",
        client: "Beyond Cars",
        industry: "Automotive SaaS",
        headline: "Scaling User Acquisition for Auto Tech",
        challenge: "Struggling to scale user base beyond initial network.",
        solution: "Created a series of high-production value video ads showcasing the app in action.",
        results: [
            { metric: "200%", label: "User Growth", trend: "up" },
            { metric: "1.2k", label: "App Installs", trend: "up" },
            { metric: "4.8", label: "App Store Rating", trend: "up" },
        ],
        image: "/images/brands/Beyond-Cars/Porsche 718 Cayman.jpg",
        tags: ["App Install", "Video Ads", "Growth"],
    }
];
