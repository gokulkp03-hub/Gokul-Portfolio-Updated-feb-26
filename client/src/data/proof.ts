export interface Metric {
    label: string;
    value: string;
    prefix?: string;
    suffix?: string;
}

export const proof = {
    metrics: [
        { label: "Ad creatives produced", value: "80", suffix: "+" },
        { label: "Ad spend supported", value: "300", prefix: "AED ", suffix: "K+" },
        { label: "Brands Handled", value: "5", suffix: "+" },
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
            author: "Director",
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
