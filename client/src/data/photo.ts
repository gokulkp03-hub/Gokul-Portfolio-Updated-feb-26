export interface PhotoProject {
    id: string;
    title: string;
    image: string;
    category: "Wedding" | "Product" | "Automobile" | "Corporate" | "Lifestyle" | "Food" | "Portraits" | "Architecture";
    description: string;
    featured?: boolean;
}

export const photoProjects: PhotoProject[] = [
    {
        id: "wedding-photo-1",
        title: "Timeless Wedding Story",
        image: "/images/photography/wedding/wedding-1.jpg",
        category: "Wedding",
        description: "Capturing the elegance and emotion of a traditional wedding celebration.",
        featured: true
    },
    {
        id: "auto-porsche-1",
        title: "Porsche 718 Cayman",
        image: "/images/brands/Beyond-Cars/Porsche 718 Cayman.jpg",
        category: "Automobile",
        description: "Sleek automotive photography focusing on design and performance.",
        featured: true
    },
    {
        id: "perfume-galaxy-1",
        title: "Galaxy Star Fragrance",
        image: "/images/brands/Galaxy-Star/Galaxy 3.jpg",
        category: "Product",
        description: "High-end product photography for luxury fragrance brands."
    },
    {
        id: "auto-rover-1",
        title: "Range Rover Prestige",
        image: "/images/brands/Beyond-Cars/range rover-1.jpg",
        category: "Automobile",
        description: "Lifestyle automotive shots showcasing premium vehicles."
    },
    {
        id: "food-vita-bloom",
        title: "Vita Bloom Nutritional",
        image: "/images/brands/Aqua-Care/Vita bloom.jpg",
        category: "Food",
        description: "Commercial food and beverage photography."
    },
    {
        id: "interior-knk-1",
        title: "Modern Residential Design",
        image: "/images/brands/Knk/Artboard 1 copy 2.jpg",
        category: "Architecture",
        description: "Architectural photography showcasing contemporary interior design."
    },
    {
        id: "auto-porsche-cayenne",
        title: "Porsche Cayenne Coupe GTS",
        image: "/images/brands/Beyond-Cars/Porsche Cayenne Coupe GTS.jpg",
        category: "Automobile",
        description: "Power and luxury combined in this high-performance SUV."
    },
    {
        id: "product-acero-ad",
        title: "Acero Steel Solutions",
        image: "/images/brands/Acero/Ad 01.png",
        category: "Corporate",
        description: "Industrial photography highlighting structural excellence."
    },
    {
        id: "lifestyle-q4-clean",
        title: "Q4 Premium Cleaning",
        image: "/images/brands/Q4/Ad 9.jpg",
        category: "Lifestyle",
        description: "Commercial lifestyle photography for professional services."
    },
    {
        id: "product-galaxy-1",
        title: "Aura Fragrance",
        image: "/images/brands/Galaxy-Star/Galaxy 1.jpg",
        category: "Product",
        description: "Minimalist product photography for luxury retail."
    },
    {
        id: "auto-range-rover-2",
        title: "Range Rover Sport",
        image: "/images/brands/Beyond-Cars/range rover-1.jpg",
        category: "Automobile",
        description: "Adventure meets luxury in the Range Rover Sport."
    },
    {
        id: "food-dietary-mix",
        title: "Healthy Staples",
        image: "/images/brands/Aqua-Care/Vita bloom.jpg",
        category: "Food",
        description: "Conceptual food photography for nutritional brands."
    },
    {
        id: "lifestyle-beyond-cars-1",
        title: "Urban Luxury Drive",
        image: "/images/brands/Beyond-Cars/1.jpg",
        category: "Lifestyle",
        description: "Dynamic urban lifestyle content with high-end vehicles."
    },
    {
        id: "architecture-knk-vibrant",
        title: "Vibrant living Spaces",
        image: "/images/brands/Knk/Artboard 1.png",
        category: "Architecture",
        description: "Capturing the energy and flow of modern residential layouts."
    }
];
