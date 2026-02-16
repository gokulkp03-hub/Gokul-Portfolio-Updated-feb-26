export interface Metric {
    label: string;
    value: string;
    prefix?: string;
    suffix?: string;
}

export const proof = {
    metrics: [
        { label: "High-Performance Ads", value: "300", suffix: "+" },
        { label: "Ad Spend Managed", value: "4.4", prefix: "AED ", suffix: "M+" },
        { label: "Direct Revenue", value: "18.3", prefix: "AED ", suffix: "M+" },
        { label: "Meals Delivered (PrepMeal)", value: "21", suffix: "k+" },
    ],
    logos: [
        "PrepMeal",
        "Acero Steel",
        "Beyond Cars",
        "Galaxy Star",
        "Suncore",
        "Q4 Clean Home",
        "TESS",
        "KNK Interiors",
        "Aqua Care",
        "Steaburg",
        "SIAS Group"
    ],
    testimonials: [
        {
            id: "t1",
            text: "Gokul transformed our digital presence. His video work is cinematic, and the ad campaigns actually convert.",
            author: "Marketing Director",
            role: "Acero Steel",
        },
        {
            id: "t2",
            text: "We saw a 3x ROI in the first month of working with him. The creative strategy was spot on.",
            author: "Founder",
            role: "Q4 Clean Home",
        },
        {
            id: "t3",
            text: "Professional, creative, and data-driven. The best combination for growth and luxury brand positioning.",
            author: "CEO",
            role: "Beyond Cars",
        },
    ],
};
