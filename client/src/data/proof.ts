import { M } from "./metrics.js";

export interface Metric {
    label: string;
    value: string;
    prefix?: string;
    suffix?: string;
    context?: string;
}

export const proof = {
    metrics: [
        { label: "Meta spend supported", value: M.totalMetaSpend, context: "Across managed campaigns" },
        { label: "messaging conversations", value: M.aquacare.conversations, context: "UAE & Oman ad accounts" },
        { label: "Meta leads", value: M.aquacare.leads, context: "Native lead forms" },
        { label: "best documented ROAS", value: M.bestRoas, context: "Winning lead campaign" },
    ] as Metric[],
    logos: [
        { name: "Aqua Care", src: "/assets/images/logos/Aquacare logo.webp" },
        { name: "PrepMeal", src: "/assets/images/logos/PrepMeal.webp" },
        { name: "Beyond Cars", src: "/assets/images/logos/beyond-cars.webp" },
        { name: "Acero Steel", src: "/assets/images/logos/Acero.webp" },
        { name: "Ecom 100", src: "/assets/images/logos/ecom-100.webp" },
        { name: "Q4 Clean Home", src: "/assets/images/logos/Q4c.webp" },
        { name: "Healthy Meals", src: "/assets/images/logos/healthy-meals.webp" }
    ],
};

