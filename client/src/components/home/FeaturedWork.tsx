import { motion, AnimatePresence } from "framer-motion";
import { ArrowUpRight, Play, X, ExternalLink } from "lucide-react";
import { cn } from "@/lib/utils";
import { useState } from "react";
import { Link } from "wouter";

const FEATURED_ITEMS = [
    {
        id: "aqua-care-featured",
        title: "Aqua Care Meta Ads",
        client: "Aqua Care UAE",
        category: "Performance Ads",
        metric: "4.45x ROAS",
        image: "/assets/images/case-studies/placeholder.jpg",
        path: "/marketing/aqua-care-uae",
        isVideo: false,
        videoUrl: "",
        description: "Built a full-funnel Meta ad system across 6 water treatment product lines. AED 7,131 spend, 4.45× ROAS, AED 31,743 revenue.",
        accentClass: "text-emerald-400 bg-emerald-500/10 border-emerald-500/20"
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
        accentClass: "text-blue-400 bg-blue-500/10 border-blue-500/20"
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
        accentClass: "text-orange-400 bg-orange-500/10 border-orange-500/20"
    }
];

export function FeaturedWork() {
    const [selectedItem, setSelectedItem] = useState<any>(null);

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
                        className="group relative h-[450px] overflow-hidden rounded-[2.5rem] cursor-pointer border border-border/20 hover:border-orange-500/30 transition-all duration-500 bg-zinc-900 shadow-lg"
                        onClick={() => setSelectedItem(item)}
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
                            <p className="text-white/40 text-[10px] font-bold uppercase tracking-[0.2em] mb-1">{item.client}</p>
                            <h3 className="text-white text-2xl font-display font-black leading-tight uppercase tracking-tight">
                                {item.title}
                            </h3>
                            <p className="text-white/60 text-xs mt-3 font-light line-clamp-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                {item.description}
                            </p>
                        </div>

                        <div className="absolute bottom-8 right-8 w-12 h-12 rounded-full bg-orange-500 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all transform translate-y-4 group-hover:translate-y-0 shadow-lg">
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
