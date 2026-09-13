export interface Metric {
    label: string;
    value: string;
    prefix?: string;
    suffix?: string;
    context?: string;
}

export const proof = {
    metrics: [
        { label: "Meta spend supported", value: "166K+", prefix: "AED ", context: "Across managed campaigns" },
        { label: "messaging conversations", value: "2,357", context: "UAE & Oman ad accounts" },
        { label: "Meta leads", value: "212", context: "Native lead forms" },
        { label: "best documented ROAS", value: "4.45", suffix: "x", context: "Winning lead campaign" },
    ] as Metric[],
    logos: [
        { name: "Aqua Care", src: "/assets/images/logos/Aquacare logo.png" },
        { name: "PrepMeal", src: "/assets/images/logos/prepmeal.png" },
        { name: "Beyond Cars", src: "/assets/images/logos/beyond-cars.png" },
        { name: "Acero Steel", src: "/assets/images/logos/acero.png" },
        { name: "Ecom 100", src: "/assets/images/logos/ecom-100.png" },
        { name: "Q4 Clean Home", src: "/assets/images/logos/q4c.png" },
        { name: "Healthy Meals", src: "/assets/images/logos/healthy-meals.png" }
    ],
    testimonials: [
        {
            id: "t1",
            text: "Gokul handled both the video production and our ad campaigns. Having someone who can shoot the creative and manage the ad account directly made our campaigns significantly faster to iterate.",
            author: "Marketing Operations",
            role: "Acero Steel Middle East",
        },
        {
            id: "t2",
            text: "The WhatsApp flow he built reduced our response times to under two minutes. Our sales reps were speaking to interested enquiries while they were still looking at the ad.",
            author: "Anoop K.",
            role: "Founder, Q4 Clean Home",
        },
        {
            id: "t3",
            text: "Gokul understands both the visual standards we need and how Meta Ads actually perform. His content works because it communicates the product clearly.",
            author: "Adil Kidwai",
            role: "Managing Director, Beyond Cars",
        },
    ],
};

