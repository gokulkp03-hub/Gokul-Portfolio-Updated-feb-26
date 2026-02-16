// Brand data configuration
// This file contains the registry of all brand portfolios

export interface Brand {
    id: string;
    name: string;
    folder: string;
    description?: string;
    items: string[];
    logo?: string;
}

export const brands: Brand[] = [
    {
        id: "acero",
        name: "Acero",
        folder: "Acero",
        description: "Metal fabrication and steel solutions",
        logo: "/assets/images/brands/brand-2.png",
        items: [
            "/assets/images/brands/Acero/Acero 2-1.jpg",
            "/assets/images/brands/Acero/acero xmas.jpg",
            "/assets/images/brands/Acero/Ad 01-1.png",
            "/assets/images/brands/Acero/Ad 01.png",
            "/assets/images/brands/Acero/acero 2.jpg",
            "/assets/images/brands/Acero/Acero 1-1.jpg",
            "/assets/images/brands/Acero/Ad 02.png",
            "/assets/images/brands/Acero/Ad 07.png",
            "/assets/images/brands/Acero/Ad 06.png",
            "/assets/images/brands/Acero/Ad 04.png",
            "/assets/images/brands/Acero/Ad 10 Stranger Things.jpg",
            "/assets/images/brands/Acero/Ad 08.jpg",
            "/assets/images/brands/Acero/Ad 08-1.jpg",
            "/assets/images/brands/Acero/Ad 010.jpg",
            "/assets/images/brands/Acero/Ad-1.jpg",
            "/assets/images/brands/Acero/acero xmas 2.jpg",
            "/assets/images/brands/Acero/acero warrior.jpg"
        ]
    },
    {
        id: "aqua-care",
        name: "Aqua Care",
        folder: "Aqua-Care",
        description: "Water filtration and purification systems",
        items: [
            "/assets/images/brands/Aqua-Care/Oman National Day.jpg",
            "/assets/images/brands/Aqua-Care/Filters 2.jpg",
            "/assets/images/brands/Aqua-Care/new.jpg",
            "/assets/images/brands/Aqua-Care/Vita bloom.jpg"
        ]
    },
    {
        id: "beyond-cars",
        name: "Beyond Cars",
        folder: "Beyond-Cars",
        description: "Automotive SaaS platform",
        logo: "/assets/images/brands/brand-5.png",
        items: [
            "/assets/images/brands/Beyond-Cars/Porsche 718 Cayman.jpg",
            "/assets/images/brands/Beyond-Cars/range rover-1.jpg",
            "/assets/images/brands/Beyond-Cars/Porsche Cayenne Coupe GTS-1.jpg",
            "/assets/images/brands/Beyond-Cars/Porsche Cayenne Coupe GTS.jpg",
            "/assets/images/brands/Beyond-Cars/IMG_7409.JPG",
            "/assets/images/brands/Beyond-Cars/jagp3.jpg",
            "/assets/images/brands/Beyond-Cars/jagp2.jpg",
            "/assets/images/brands/Beyond-Cars/jagp5.jpg",
            "/assets/images/brands/Beyond-Cars/jagp4.jpg",
            "/assets/images/brands/Beyond-Cars/jagp6.jpg",
            "/assets/images/brands/Beyond-Cars/range rover.jpg",
            "/assets/images/brands/Beyond-Cars/mustang.jpg",
            "/assets/images/brands/Beyond-Cars/jagp7.jpg",
            "/assets/images/brands/Beyond-Cars/mustang-1.jpg",
            "/assets/images/brands/Beyond-Cars/Cover 1.jpg",
            "/assets/images/brands/Beyond-Cars/benz GLC220d-1.jpg",
            "/assets/images/brands/Beyond-Cars/jagp9.jpg",
            "/assets/images/brands/Beyond-Cars/JAGUARs1-01.jpg",
            "/assets/images/brands/Beyond-Cars/Mercedes Benz E 250 D.jpg",
            "/assets/images/brands/Beyond-Cars/jagp8.jpg",
            "/assets/images/brands/Beyond-Cars/JAGs1.jpg",
            "/assets/images/brands/Beyond-Cars/mini.jpg",
            "/assets/images/brands/Beyond-Cars/Mini Cooper.jpg",
            "/assets/images/brands/Beyond-Cars/bmw.jpg",
            "/assets/images/brands/Beyond-Cars/range.jpg",
            "/assets/images/brands/Beyond-Cars/Mercedes Benz.jpg",
            "/assets/images/brands/Beyond-Cars/porsehe  gts.jpg",
            "/assets/images/brands/Beyond-Cars/benz GLC220d.jpg",
            "/assets/images/brands/Beyond-Cars/jagp10.jpg"
        ]
    },
    {
        id: "galaxy-star",
        name: "Galaxy Star",
        folder: "Galaxy-Star",
        description: "Perfumes and fragrances",
        logo: "/assets/images/brands/brand-3.png",
        items: [
            "/assets/images/brands/Galaxy-Star/AD 2 DEC.jpg",
            "/assets/images/brands/Galaxy-Star/Galaxy 3.jpg",
            "/assets/images/brands/Galaxy-Star/Galaxy 1.jpg",
            "/assets/images/brands/Galaxy-Star/OCT 4.jpg",
            "/assets/images/brands/Galaxy-Star/AD 3 DEC.jpg",
            "/assets/images/brands/Galaxy-Star/Ad 4 - Galaxy.jpg",
            "/assets/images/brands/Galaxy-Star/National Day 2.jpg",
            "/assets/images/brands/Galaxy-Star/AD 1 DEC.jpg",
            "/assets/images/brands/Galaxy-Star/Xmas - Galaxy.jpg",
            "/assets/images/brands/Galaxy-Star/Jan 2 - Galaxy.jpg",
            "/assets/images/brands/Galaxy-Star/Jan 1.jpg",
            "/assets/images/brands/Galaxy-Star/New Year - Galaxy.jpg",
            "/assets/images/brands/Galaxy-Star/AD 2 O.jpg"
        ]
    },
    {
        id: "knk",
        name: "KNK",
        folder: "Knk",
        description: "Interior design and fabrication",
        items: [
            "/assets/images/brands/Knk/Artboard 1 copy 2.jpg",
            "/assets/images/brands/Knk/3-1_1767958070681.jpg",
            "/assets/images/brands/Knk/4-1.jpg",
            "/assets/images/brands/Knk/2-1_1767958070276.jpg",
            "/assets/images/brands/Knk/Childrens Day.jpg",
            "/assets/images/brands/Knk/Artboard 1_1761316769324.jpg",
            "/assets/images/brands/Knk/5.jpg",
            "/assets/images/brands/Knk/Artboard 1 copy.jpg",
            "/assets/images/brands/Knk/Ad 1 Residential construction services.jpg"
        ]
    },
    {
        id: "q4",
        name: "Q4 Clean Home",
        folder: "Q4",
        description: "Cleaning products and solutions",
        items: [
            "/assets/images/brands/Q4/Ad Resell 2.jpg",
            "/assets/images/brands/Q4/Ad 99 - Cartoon.jpg",
            "/assets/images/brands/Q4/Ad Resell.jpg",
            "/assets/images/brands/Q4/Ad 9 - Bathroom Cleaner.jpg",
            "/assets/images/brands/Q4/AD - 7 Kit-1.jpg",
            "/assets/images/brands/Q4/Ad Washing.jpg",
            "/assets/images/brands/Q4/Ad 6-2.jpg",
            "/assets/images/brands/Q4/Ad 12 - Shimmer-1.jpg",
            "/assets/images/brands/Q4/Artboard 1_1762342702688.jpg",
            "/assets/images/brands/Q4/Ad 9.jpg",
            "/assets/images/brands/Q4/Ad Resell-1.jpg",
            "/assets/images/brands/Q4/Cleanverse - Xmas.jpg",
            "/assets/images/brands/Q4/Ad 8.jpg",
            "/assets/images/brands/Q4/Ad Resellers.jpg",
            "/assets/images/brands/Q4/Ad 12 - Shimmer.jpg",
            "/assets/images/brands/Q4/Ad 3-1.jpg",
            "/assets/images/brands/Q4/Ad 7-1.jpg",
            "/assets/images/brands/Q4/Ad 5-1.jpg",
            "/assets/images/brands/Q4/Ad Jan.jpg",
            "/assets/images/brands/Q4/Ad 10.jpg",
            "/assets/images/brands/Q4/Childrens Day Q4.jpg",
            "/assets/images/brands/Q4/Artboard 1 copy-1.jpg",
            "/assets/images/brands/Q4/Ad 7-2.jpg",
            "/assets/images/brands/Q4/Ad Jan 2.jpg",
            "/assets/images/brands/Q4/Ad 9-1.jpg",
            "/assets/images/brands/Q4/Ad Election.jpg",
            "/assets/images/brands/Q4/1 q4.jpg",
            "/assets/images/brands/Q4/Ad Bathroom Cleaner 2.jpg",
            "/assets/images/brands/Q4/Ad 776.jpg",
            "/assets/images/brands/Q4/AD Q4 1.jpg",
            "/assets/images/brands/Q4/Ad 5.jpg",
            "/assets/images/brands/Q4/Ad 4.jpg",
            "/assets/images/brands/Q4/1-1_1767958070952.jpg",
            "/assets/images/brands/Q4/Artboard 1 copy 2-1.jpg",
            "/assets/images/brands/Q4/Ad 8-1.jpg",
            "/assets/images/brands/Q4/Ad 7.jpg",
            "/assets/images/brands/Q4/Ad 3.jpg",
            "/assets/images/brands/Q4/Toilet Cleaner.jpg",
            "/assets/images/brands/Q4/Ad 10 - xmas floor clean.jpg",
            "/assets/images/brands/Q4/Ad Election-1.jpg",
            "/assets/images/brands/Q4/Ad 10-1.jpg",
            "/assets/images/brands/Q4/Ad 11 - HandWash.jpg"
        ]
    },
    {
        id: "suncore",
        name: "Suncore Energies",
        folder: "Suncore",
        description: "Solar energy solutions",
        logo: "/assets/images/brands/brand-8.png",
        items: [
            "/assets/images/brands/Suncore/AD 2 - suncore.jpg",
            "/assets/images/brands/Suncore/Artboard 1-2.jpg",
            "/assets/images/brands/Suncore/AD 4 - For Ad.jpg",
            "/assets/images/brands/Suncore/Ad 18-1.png",
            "/assets/images/brands/Suncore/AD 4 - For Ad-2.jpg",
            "/assets/images/brands/Suncore/Artboard 1 copy-5.jpg",
            "/assets/images/brands/Suncore/AD 4 - For Ad-3.jpg",
            "/assets/images/brands/Suncore/AD 4 - For Ad-1.jpg",
            "/assets/images/brands/Suncore/Ad 16.png",
            "/assets/images/brands/Suncore/Ad 17.png",
            "/assets/images/brands/Suncore/3523456.jpg",
            "/assets/images/brands/Suncore/Artboard 1 copy-2.jpg",
            "/assets/images/brands/Suncore/Artboard 1_1763526487894.jpg",
            "/assets/images/brands/Suncore/Ad 20.png",
            "/assets/images/brands/Suncore/Ad 21.png",
            "/assets/images/brands/Suncore/Ad 22.png",
            "/assets/images/brands/Suncore/Ad 19.png",
            "/assets/images/brands/Suncore/Ad 18.png",
            "/assets/images/brands/Suncore/Ad 16-1.png",
            "/assets/images/brands/Suncore/Ad 2.png",
            "/assets/images/brands/Suncore/AD 3 - suncore.jpg",
            "/assets/images/brands/Suncore/Ad 1.png",
            "/assets/images/brands/Suncore/AD 1.jpg"
        ]
    },
    {
        id: "tes",
        name: "TESS",
        folder: "Tes",
        description: "Educational institution",
        items: [
            "/assets/images/brands/Tes/Ad.jpg",
            "/assets/images/brands/Tes/Artboard 1-4.jpg",
            "/assets/images/brands/Tes/Ad Story Tess.jpg",
            "/assets/images/brands/Tes/xmas 2 tess.jpg",
            "/assets/images/brands/Tes/ad 6.jpg",
            "/assets/images/brands/Tes/d.jpg",
            "/assets/images/brands/Tes/Dec 1.jpg"
        ]
    }
];

export function getBrandById(id: string): Brand | undefined {
    return brands.find(brand => brand.id === id);
}

export function getBrandByFolder(folder: string): Brand | undefined {
    return brands.find(brand => brand.folder === folder);
}
