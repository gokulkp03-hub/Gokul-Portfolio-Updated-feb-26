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
    ],
    logos: [
        { name: "Beyond Cars", src: "/assets/images/logos/beyondcars.png" },
        { name: "Acero Steel", src: "/assets/images/logos/Acero.png" },
        { name: "Galaxy Star", src: "/assets/images/logos/Galaxy Star Perfumes.png" },
        { name: "Suncore", src: "/assets/images/logos/Suncore.png" },
        { name: "Q4 Clean Home", src: "/assets/images/logos/Q4c.png" },
        { name: "Ecom 100", src: "/assets/images/logos/Ecom 100.png" },
        { name: "PrepMeal", src: "/assets/images/logos/PrepMeal.png" },
        { name: "Healthy Meals", src: "/assets/images/logos/Healthy_Meals.png" }
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
