export interface WeddingImage {
    id: number;
    src: string;
    title?: string;
    location?: string;
    year?: string;
}

export const weddingImages: WeddingImage[] = [
    {
        id: 1,
        src: "/assets/images/photography/wedding/wedding-1.jpg",
        title: "Traditional Ceremony",
        location: "Kerala, India",
        year: "2024"
    },
    {
        id: 2,
        src: "/assets/images/photography/wedding/wedding-2.jpg",
        title: "Bridal Portrait",
        location: "Kochi, India",
        year: "2024"
    },
    {
        id: 3,
        src: "/assets/images/photography/wedding/wedding-3.jpg",
        title: "Couple Portrait",
        location: "Kerala, India",
        year: "2023"
    },
    {
        id: 4,
        src: "/assets/images/photography/wedding/wedding-4.jpg",
        title: "Candid Moment",
        location: "Trivandrum, India",
        year: "2023"
    },
    {
        id: 5,
        src: "/assets/images/photography/wedding/wedding-5.jpg",
        title: "Temple Wedding",
        location: "Kerala, India",
        year: "2024"
    }
];
