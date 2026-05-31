export interface Metric {
    label: string;
    value: string;
    prefix?: string;
    suffix?: string;
}

export const proof = {
    metrics: [
        { label: "Ad Creatives Produced", value: "80", suffix: "+" },
        { label: "Total Campaign Reach", value: "1.3", suffix: "M+" },
        { label: "WhatsApp Leads Generated", value: "1,400", suffix: "+" },
        { label: "Campaigns Managed", value: "25", suffix: "+" },
    ] as Metric[],
    logos: [
        { name: "Beyond Cars", src: "/assets/images/logos/beyond-cars.png" },
        { name: "Acero Steel", src: "/assets/images/logos/acero.png" },
        { name: "Galaxy Star", src: "/assets/images/logos/galaxy-star.png" },
        { name: "Suncore", src: "/assets/images/logos/suncore.png" },
        { name: "Q4 Clean Home", src: "/assets/images/logos/q4c.png" },
        { name: "Ecom 100", src: "/assets/images/logos/ecom-100.png" },
        { name: "PrepMeal", src: "/assets/images/logos/prepmeal.png" },
        { name: "Healthy Meals", src: "/assets/images/logos/healthy-meals.png" }
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
