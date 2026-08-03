export interface Metric {
    label: string;
    value: string;
    prefix?: string;
    suffix?: string;
}

export const proof = {
    metrics: [
        { label: "Average Campaign ROAS", value: "4.45", suffix: "x" },
        { label: "WhatsApp & Messaging Leads", value: "7300", suffix: "+" },
        { label: "Total Campaign Reach", value: "2.3", suffix: "M+" },
        { label: "Total Managed Ad Spend", value: "166000", prefix: "AED ", suffix: "+" },
    ] as Metric[],
    logos: [
        { name: "Aqua Care UAE", src: "/assets/images/logos/Aquacare logo.png" },
        { name: "Beyond Cars", src: "/assets/images/logos/beyondcars.png" },
        { name: "PrepMeal UAE", src: "/assets/images/logos/prepmeal.png" },
        { name: "Galaxy Star Perfumes", src: "/assets/images/logos/galaxy-star.png" },
        { name: "Acero Steel", src: "/assets/images/logos/acero.png" },
        { name: "Suncore", src: "/assets/images/logos/suncore.png" },
        { name: "Q4 Clean Home", src: "/assets/images/logos/q4c.png" },
        { name: "Ecom 100", src: "/assets/images/logos/ecom-100.png" }
    ],
    testimonials: [
        {
            id: "t1",
            text: "Gokul completely transformed our paid acquisition. His direct-response video work is cinematic, and the Meta ad campaigns actually convert at a high volume.",
            author: "Marketing Operations Lead",
            role: "Acero Steel Middle East",
        },
        {
            id: "t2",
            text: "We saw a remarkable increase in our lead quality and volume in the first month of working with him. His creative testing strategy is precise and highly scientific.",
            author: "Anoop K.",
            role: "Founder, Q4 Clean Home",
        },
        {
            id: "t3",
            text: "Gokul is professional, creative, and data-driven. The best combination for performance growth and premium brand positioning in the UAE market.",
            author: "Adil Kidwai",
            role: "Managing Director, Beyond Cars",
        },
    ],
};
