import { SEO } from "@/components/SEO";
import { useEffect } from "react";
import { PhotoShaderHero } from "@/components/photography/PhotoShaderHero";
import { PhotoPointOfView } from "@/components/photography/PhotoPointOfView";
import { PhotoShootIndex } from "@/components/photography/PhotoShootIndex";
import { PhotoClosingCTA } from "@/components/photography/PhotoClosingCTA";
import { motion } from "framer-motion";
import { Link } from "wouter";
import { CheckCircle2 } from "lucide-react";
import { cn } from "@/lib/utils";

const photographyStills = [
    "/assets/images/portfolio-all/Sourdough_Avocado.jpg",
    "/assets/images/portfolio-all/Vegan_Buddha_Bowl.jpg",
    "/assets/images/portfolio-all/Cheesecake.jpg",
    "/assets/images/portfolio-all/Chocolate_Milk_Cookies.jpg",
    "/assets/images/portfolio-all/Iced_V60.jpg",
    "/assets/images/portfolio-all/Sourdough_Labneh_Zaatar.jpg",
    "/assets/images/portfolio-all/ginger_shot.jpg",
    "/assets/images/portfolio-all/Vita_bloom.jpg",
    "/assets/images/portfolio-all/DSC01510_(1).jpg",
    "/assets/images/portfolio-all/DSC01680.jpg",
    "/assets/images/portfolio-all/DSC01738.jpg",
    "/assets/images/portfolio-all/DSC01768.jpg",
    "/assets/images/portfolio-all/DSC03166.jpg",
    "/assets/images/portfolio-all/DSC03971.jpg",
    "/assets/images/portfolio-all/DSC04050.jpg",
    "/assets/images/portfolio-all/DSC08771.jpg",
    "/assets/images/portfolio-all/DSC08907.jpg",
    "/assets/images/portfolio-all/DSC08980.jpg",
    "/assets/images/portfolio-all/DSC09457.jpg",
    "/assets/images/portfolio-all/DSC09598.jpg",
    "/assets/images/portfolio-all/DSC09621.jpg"
];

const graphicAdDesigns = [
    { src: "/assets/images/portfolio-all/steaburg-design.webp", title: "Steaburg Culinary Brand Key Visual", tag: "Social Promo Design" },
    { src: "/assets/images/portfolio-all/AD_1_DEC.jpg", title: "Holiday Meta Ad Creative", tag: "Direct-Response Ad" },
    { src: "/assets/images/portfolio-all/AD_2_DEC.jpg", title: "Festive Campaign Offer Graphic", tag: "Social Promo Design" },
    { src: "/assets/images/portfolio-all/Ad.jpg", title: "Aqua Care Product Feature Graphic", tag: "E-Commerce Poster" },
    { src: "/assets/images/portfolio-all/Ad_04.jpg", title: "Aqua Care RO Filter Campaign", tag: "High-ROAS Meta Banner" },
    { src: "/assets/images/portfolio-all/Ad_08-1.jpg", title: "Water System Performance Ad", tag: "Conversion Graphic" },
    { src: "/assets/images/portfolio-all/Ad_1_Residential_construction_services.jpg", title: "Residential Construction Lead Ad", tag: "B2B Meta Ad Design" },
    { src: "/assets/images/portfolio-all/Artboard_1_1761316769324.jpg", title: "Brand Identity & Artboard Layout", tag: "Visual Identity" },
    { src: "/assets/images/portfolio-all/Childrens_Day.jpg", title: "Seasonal Campaign Creative", tag: "Social Poster Design" },
    { src: "/assets/images/portfolio-all/Copy_of_Macros_Club.jpg", title: "Macros Club Fitness Graphic", tag: "Subscription Ad" },
    { src: "/assets/images/portfolio-all/Cover_1.jpg", title: "Brand Cover & Banner Asset", tag: "Editorial Header Design" },
    { src: "/assets/images/portfolio-all/Xmas_-_Galaxy.jpg", title: "Galaxy Star Perfumes Luxury Graphic", tag: "Campaign Key Visual" },
    { src: "/assets/images/portfolio-all/acero_warrior.jpg", title: "Acero Warrior Poster", tag: "Brand Graphic" },
    { src: "/assets/images/portfolio-all/xmas_2_tess.jpg", title: "Seasonal Retail Offer Banner", tag: "Promo Creative" },
    { src: "/assets/images/portfolio-all/jagp10.jpg", title: "Brand Identity Design Asset 01", tag: "Graphical Poster" },
    { src: "/assets/images/portfolio-all/jagp5.jpg", title: "Brand Identity Design Asset 02", tag: "Graphical Poster" },
    { src: "/assets/images/portfolio-all/IMG_7409.jpg", title: "Social Feed Poster Graphic", tag: "Direct-Response Ad" }
];

const packages = [
    {
        name: "Culinary & Editorial Session",
        features: ["Half-Day Studio / On-Location Shoot", "20 High-End Retouched Stills", "Lighting & Styling Direction", "Commercial Digital Usage Rights"],
        highlight: false
    },
    {
        name: "Commercial Brand Content Day",
        features: ["Full-Day Comprehensive Production", "50+ Retouched Product & Food Assets", "Direct-Response Meta Ad Formats", "Global Commercial Usage Rights"],
        highlight: true
    },
    {
        name: "Custom Campaign Retainer",
        features: ["Multi-Day Commercial Shoot", "Studio Rental & Art Direction", "Dedicated Food Stylist", "Full Retouching & Asset Distribution"],
        highlight: false
    }
];

export default function PhotoService() {
    
    return (
        <div className="min-h-screen bg-neutral-950 text-white selection:bg-amber-400 selection:text-black">
            <SEO title="Gokul KP — Commercial Food & Product Photography | Dubai" description="Cinematic commercial food photography, luxury product stills, and high-converting campaign visuals in Dubai, UAE." />
            
            {/* 1. WebGL Three.js Hero Shader */}
            <PhotoShaderHero
                imageSrc="/assets/images/photography/photo-hero-camera.jpg"
                fallbackSrc="/assets/images/photography/photo-hero-camera.jpg"
                headlineLine1="Food & Product"
                headlineLine2="Photography"
                sublabel="Dubai — Commercial & Editorial Photography"
            />

            {/* 2. Point of View Strip */}
            <PhotoPointOfView />

            {/* 3. Numbered Shoot Index with Hover Preview & Expandable Modal */}
            <PhotoShootIndex />

            {/* 4. Full Photography Stills Archive Grid */}
            <section className="py-28 bg-neutral-950 border-t border-neutral-800 text-white">
                <div className="container max-w-[1400px] mx-auto px-6 md:px-12">
                    <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16 border-b border-neutral-800 pb-8">
                        <div>
                            <span className="text-xs font-mono tracking-[0.4em] text-amber-400 uppercase block mb-3">
                                Editorial Archive
                            </span>
                            <h2 className="text-4xl md:text-6xl font-serif text-white tracking-tight">
                                Stills & <span className="italic text-neutral-400">Culinary Details</span>
                            </h2>
                        </div>
                        <p className="text-neutral-400 text-sm font-light max-w-md leading-relaxed">
                            A broader view into commercial food textures, beverage lighting, macro angles, and product composition.
                        </p>
                    </div>

                    <div className="columns-2 sm:columns-3 lg:columns-4 gap-6 space-y-6">
                        {photographyStills.map((src, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.6, delay: (i % 6) * 0.08 }}
                                className="break-inside-avoid relative group rounded-2xl overflow-hidden bg-neutral-900 border border-neutral-800/80 shadow-lg"
                            >
                                <img
                                    src={src}
                                    alt={`Photography archive frame ${i + 1}`}
                                    className="w-full h-auto transform transition-transform duration-700 group-hover:scale-105"
                                    loading="lazy"
                                />
                                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                                    <span className="text-[11px] font-mono text-white/90 uppercase tracking-widest">
                                        Frame {String(i + 1).padStart(2, '0')}
                                    </span>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* 5. Separate Dedicated Section: Graphic Ad Creatives & Campaign Posters */}
            <section className="py-28 bg-neutral-900/60 border-t border-neutral-800 text-white">
                <div className="container max-w-[1400px] mx-auto px-6 md:px-12">
                    <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16 border-b border-neutral-800 pb-8">
                        <div>
                            <span className="text-xs font-mono tracking-[0.4em] text-orange-500 uppercase block mb-3">
                                Direct-Response Assets
                            </span>
                            <h2 className="text-4xl md:text-6xl font-serif text-white tracking-tight">
                                Graphic Ad Creatives & <span className="italic text-neutral-400">Social Posters</span>
                            </h2>
                        </div>
                        <p className="text-neutral-400 text-sm font-light max-w-md leading-relaxed">
                            High-converting paid Meta ad posters, campaign promotional graphics, and brand marketing artwork engineered to drive clicks and client leads across GCC.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                        {graphicAdDesigns.map((item, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, y: 25 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.5, delay: (i % 4) * 0.08 }}
                                className="group relative rounded-2xl overflow-hidden bg-neutral-950 border border-neutral-800 hover:border-orange-500/40 shadow-xl transition-all duration-300 flex flex-col justify-between"
                            >
                                <div className="aspect-[4/5] overflow-hidden bg-neutral-900 relative">
                                    <img
                                        src={item.src}
                                        alt={item.title}
                                        className="w-full h-full object-cover transform transition-transform duration-700 group-hover:scale-105"
                                        loading="lazy"
                                    />
                                    <div className="absolute top-3 left-3 bg-black/70 backdrop-blur-md px-3 py-1 rounded-full border border-white/10 text-[10px] font-mono text-orange-400 uppercase tracking-wider">
                                        {item.tag}
                                    </div>
                                </div>
                                <div className="p-4 bg-neutral-950/90 border-t border-neutral-800/80 space-y-1">
                                    <h3 className="text-sm font-serif font-bold text-white group-hover:text-orange-400 transition-colors">
                                        {item.title}
                                    </h3>
                                    <span className="text-[10px] font-mono text-neutral-500 block uppercase tracking-wider">
                                        GCC Campaign Asset #{String(i + 1).padStart(2, '0')}
                                    </span>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* 5. Editorial Investment / Pricing Packages */}
            <section className="py-32 bg-neutral-950 border-t border-neutral-800 text-white relative">
                <div className="container max-w-[1400px] mx-auto px-6 md:px-12">
                    <div className="text-center max-w-2xl mx-auto mb-20 space-y-4">
                        <span className="text-xs font-mono tracking-[0.4em] text-amber-400 uppercase block">
                            Commercial Investment
                        </span>
                        <h2 className="text-5xl md:text-7xl font-serif text-white tracking-tight">
                            Production <span className="italic text-neutral-400">Tiers</span>
                        </h2>
                        <p className="text-neutral-400 text-base font-light">
                            Structured photography packages engineered for commercial campaigns and brand launches.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {packages.map((pkg, i) => (
                            <div
                                key={i}
                                className={cn(
                                    "p-10 rounded-3xl border transition-all duration-500 flex flex-col justify-between space-y-8",
                                    pkg.highlight 
                                        ? "bg-neutral-900 border-amber-400/60 shadow-2xl shadow-amber-500/10" 
                                        : "bg-neutral-950 border-neutral-800"
                                )}
                            >
                                <div className="space-y-6">
                                    <div className="flex justify-between items-start">
                                        <h3 className="text-2xl font-serif text-white">{pkg.name}</h3>
                                        {pkg.highlight && (
                                            <span className="text-[10px] uppercase font-mono px-3 py-1 bg-amber-400 text-neutral-950 font-bold rounded-full">
                                                Most Popular
                                            </span>
                                        )}
                                    </div>

                                    <ul className="space-y-4 border-t border-neutral-800 pt-6">
                                        {pkg.features.map((feat, j) => (
                                            <li key={j} className="flex items-center gap-3 text-xs text-neutral-300 font-mono">
                                                <CheckCircle2 className="w-4 h-4 text-amber-400 flex-shrink-0" />
                                                <span>{feat}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>

                                <div className="pt-6">
                                    <Link href="/contact">
                                        <span className={cn(
                                            "w-full py-4 rounded-full text-center block text-xs font-bold uppercase tracking-widest transition-all cursor-pointer",
                                            pkg.highlight 
                                                ? "bg-amber-400 text-neutral-950 hover:bg-amber-300" 
                                                : "border border-neutral-700 text-white hover:bg-neutral-900"
                                        )}>
                                            Book Production
                                        </span>
                                    </Link>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* 6. Closing CTA Bookend */}
            <PhotoClosingCTA />

        </div>
    );
}
