import { motion, AnimatePresence } from "framer-motion";
import { ArrowUpRight, Play, X, ExternalLink } from "lucide-react";
import { cn } from "@/lib/utils";
import { useState } from "react";
import { Link, useLocation } from "wouter";

const FEATURED_ITEMS = [
    {
        id: "aqua-care-featured",
        title: "Aqua Care Meta Ads",
        client: "Aqua Care UAE",
        category: "Performance Ads",
        metric: "4.45x ROAS",
        image: "/assets/images/brands/Aqua-Care/new.jpg",
        path: "/marketing/aqua-care-uae",
        isVideo: false,
        videoUrl: "",
        description: "Built a full-funnel Meta ad system across 6 water treatment product lines. AED 7,131 spend, 4.45× ROAS, AED 31,743 revenue.",
        accentClass: "text-emerald-400 bg-emerald-500/10 border-emerald-500/20",
        hoverBorderClass: "hover:border-emerald-500/40 hover:shadow-emerald-500/10",
        btnBgClass: "bg-emerald-500 text-black",
        logo: "/assets/images/logos/Aquacare logo.png"
    },
    {
        id: "gobeyondcars-featured",
        title: "GoBeyondCars Lead Engine",
        client: "Beyond Cars UAE",
        category: "Video & Paid Ads",
        metric: "2.8x ROAS",
        image: "/assets/images/brands/Beyond-Cars/beyondcarsin.webp",
        path: "/portfolio/video/beyond-cars-video-showcase",
        isVideo: true,
        videoUrl: "https://res.cloudinary.com/dgmieaf9g/video/upload/v1/lamourmedia_1761496555_3752003203673245690_4144321886_zcwmht.mp4",
        description: "High-performance lead generation for luxury car rentals in Dubai. Video-first campaigns driving high-quality inbound conversions.",
        accentClass: "text-blue-400 bg-blue-500/10 border-blue-500/20",
        hoverBorderClass: "hover:border-blue-500/40 hover:shadow-blue-500/10",
        btnBgClass: "bg-blue-500 text-white",
        logo: "/assets/images/logos/beyondcars.png"
    },
    {
        id: "galaxystar-featured",
        title: "GalaxyStar Perfumes",
        client: "Galaxy Star Perfumes",
        category: "E-Commerce",
        metric: "1.8% CVR",
        image: "/assets/images/brands/Galaxy-Star/Galaxy 3.jpg",
        path: "/portfolio",
        isVideo: false,
        videoUrl: "",
        description: "Built a premium storefront e-commerce experience with high-contrast luxury photography and optimized user flows.",
        accentClass: "text-orange-400 bg-orange-500/10 border-orange-500/20",
        hoverBorderClass: "hover:border-orange-500/40 hover:shadow-orange-500/10",
        btnBgClass: "bg-orange-500 text-black",
        logo: "/assets/images/logos/Galaxy Star Perfumes.png"
    },
    {
        id: "prepmeal-featured",
        title: "PrepMeal Social Growth",
        client: "PrepMeal",
        category: "Growth & Content",
        metric: "3.5x Growth",
        image: "/assets/images/case-studies/prepmeal/Mockup.png",
        path: "/marketing/prepmeal",
        isVideo: false,
        videoUrl: "",
        description: "Establishing digital presence in the UAE. Content planning, reels coordination, and WhatsApp lead flow scaling.",
        accentClass: "text-purple-400 bg-purple-500/10 border-purple-500/20",
        hoverBorderClass: "hover:border-purple-500/40 hover:shadow-purple-500/10",
        btnBgClass: "bg-purple-500 text-white",
        logo: "/assets/images/logos/prepmeal.png"
    },
    {
        id: "entrepreneur-mindset-featured",
        title: "The Entrepreneur Mindset",
        client: "Social Media Campaign",
        category: "Personal Branding",
        metric: "100K+ Views",
        image: "https://res.cloudinary.com/dgmieaf9g/video/upload/v1/Boss_1_znnsfe.jpg",
        path: "/portfolio/video/entrepreneur-mindset",
        isVideo: true,
        videoUrl: "https://res.cloudinary.com/dgmieaf9g/video/upload/v1/Boss_1_znnsfe.mp4",
        description: "High-impact narrative brand story for a Dubai-based entrepreneur, building credibility and personal brand authority.",
        accentClass: "text-pink-400 bg-pink-500/10 border-pink-500/20",
        hoverBorderClass: "hover:border-pink-500/40 hover:shadow-pink-500/10",
        btnBgClass: "bg-pink-500 text-white"
    },
    {
        id: "steaburg-brand-film-featured",
        title: "Steaburg Brand Film",
        client: "Steaburg",
        category: "Video Production",
        metric: "Cinematic Product",
        image: "https://res.cloudinary.com/dgmieaf9g/video/upload/v1/Steaburg_sjl6ik.jpg",
        path: "/portfolio/video/steaburg-brand-film",
        isVideo: true,
        videoUrl: "https://res.cloudinary.com/dgmieaf9g/video/upload/v1/Steaburg_sjl6ik.mp4",
        description: "Cinematic brand film for Steaburg showcasing the food, the premium atmosphere, and the brand identity.",
        accentClass: "text-amber-400 bg-amber-500/10 border-amber-500/20",
        hoverBorderClass: "hover:border-amber-500/40 hover:shadow-amber-500/10",
        btnBgClass: "bg-amber-500 text-black"
    }
];

export function FeaturedWork() {
    const [selectedItem, setSelectedItem] = useState<any>(null);
    const [, navigate] = useLocation();

    return (
        <>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
                {FEATURED_ITEMS.map((item, i) => (
                    <motion.div
                        key={item.id}
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: i * 0.1, duration: 0.6 }}
                        className={cn("group relative h-[450px] overflow-hidden rounded-[2.5rem] cursor-pointer border border-border/20 transition-all duration-500 bg-zinc-900 shadow-lg", item.hoverBorderClass || "hover:border-orange-500/30")}
                        onClick={() => {
                            if (!item.isVideo && item.path) {
                                navigate(item.path);
                            } else {
                                setSelectedItem(item);
                            }
                        }}
                    >
                        <img
                            src={item.image}
                            alt={item.title}
                            className="absolute inset-0 w-full h-full object-cover opacity-70 group-hover:opacity-90 group-hover:scale-105 transition-all duration-700"
                            onError={(e) => {
                                e.currentTarget.src = "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=2426&auto=format&fit=crop";
                            }}
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />
                        
                        <div className="absolute top-6 left-6 flex justify-between w-[calc(100%-3rem)] items-center">
                            <span className={cn("text-[9px] font-bold uppercase tracking-[0.3em] px-3.5 py-1.5 rounded-full border backdrop-blur-md", item.accentClass)}>
                                {item.category}
                            </span>
                            <span className="text-white/60 text-xs font-semibold uppercase tracking-widest bg-black/40 px-3 py-1 rounded-full backdrop-blur-md border border-white/5">
                                {item.metric}
                            </span>
                        </div>

                        <div className="absolute bottom-8 left-8 right-8 transition-all duration-500 group-hover:translate-y-[-10px]">
                            {item.logo ? (
                                <img 
                                    src={item.logo} 
                                    alt={item.client} 
                                    className="h-6 max-w-[120px] object-contain opacity-60 group-hover:opacity-90 transition-opacity mb-2"
                                    onError={(e) => {
                                        e.currentTarget.style.display = 'none';
                                    }}
                                />
                            ) : (
                                <p className="text-white/40 text-[10px] font-bold uppercase tracking-[0.2em] mb-1">{item.client}</p>
                            )}
                            <h3 className="text-white text-2xl font-display font-black leading-tight uppercase tracking-tight">
                                {item.title}
                            </h3>
                            <p className="text-white/60 text-xs mt-3 font-light line-clamp-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                {item.description}
                            </p>
                        </div>

                        <div className={cn("absolute bottom-8 right-8 w-12 h-12 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all transform translate-y-4 group-hover:translate-y-0 shadow-lg", item.btnBgClass || "bg-orange-500 text-white")}>
                            {item.isVideo ? <Play className="w-5 h-5 fill-current" /> : <ArrowUpRight className="w-5 h-5" />}
                        </div>
                    </motion.div>
                ))}
            </div>

            {/* Lightbox Shell */}
            <AnimatePresence>
                {selectedItem && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-[200] flex items-center justify-center p-4 md:p-12 pointer-events-auto"
                    >
                        <motion.div 
                            className="absolute inset-0 bg-black/95 backdrop-blur-2xl"
                            onClick={() => setSelectedItem(null)}
                        />
                        
                        <motion.div
                            initial={{ scale: 0.96, opacity: 0, y: 20 }}
                            animate={{ scale: 1, opacity: 1, y: 0 }}
                            exit={{ scale: 0.96, opacity: 0, y: 20 }}
                            className="relative w-full max-w-4xl aspect-video rounded-[2.5rem] overflow-hidden bg-zinc-950 border border-white/10 shadow-2xl z-10"
                        >
                            {selectedItem.isVideo ? (
                                <video 
                                    src={selectedItem.videoUrl}
                                    className="w-full h-full object-contain"
                                    controls
                                    autoPlay
                                />
                            ) : (
                                <img src={selectedItem.image} className="w-full h-full object-cover" alt={selectedItem.title} onError={(e) => {
                                    e.currentTarget.src = "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=2426&auto=format&fit=crop";
                                }} />
                            )}

                            <div className="absolute top-6 right-6 flex gap-3">
                                <Link href={selectedItem.path}>
                                    <span className="w-10 h-10 rounded-full bg-white text-black flex items-center justify-center hover:scale-105 transition-transform cursor-pointer shadow-lg" onClick={() => setSelectedItem(null)}>
                                        <ExternalLink className="w-4 h-4" />
                                    </span>
                                </Link>
                                <button 
                                    onClick={() => setSelectedItem(null)}
                                    className="w-10 h-10 rounded-full bg-white/10 backdrop-blur-xl border border-white/10 text-white flex items-center justify-center hover:bg-white/20 transition-colors shadow-lg"
                                >
                                    <X className="w-5 h-5" />
                                </button>
                            </div>

                            <div className="absolute bottom-0 left-0 right-0 p-8 bg-gradient-to-t from-black via-black/80 to-transparent">
                                <span className={cn("text-[9px] font-bold uppercase tracking-[0.4em] mb-2 block", selectedItem.accentClass)}>
                                    {selectedItem.category} Project • {selectedItem.metric}
                                </span>
                                <h2 className="text-2xl md:text-3xl font-display font-black text-white mb-2 uppercase tracking-tighter">
                                    {selectedItem.title}
                                </h2>
                                <p className="text-white/60 text-sm font-light max-w-xl">{selectedItem.description}</p>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}
