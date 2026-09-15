import { motion, AnimatePresence } from "framer-motion";
import { Link } from "wouter";
import { Play, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { useState, useEffect } from "react";
import { videoProjects, type VideoProject } from "@/data/video";
import { setSEO } from "../utils/seo";

function getCloudinaryThumb(videoUrl: string): string {
    if (!videoUrl) return "";
    
    // If it's already compressed, leave it
    if (videoUrl.includes("q_auto") || videoUrl.includes("w_800")) {
        return videoUrl;
    }
    
    // If it's a Cloudinary URL
    if (videoUrl.includes("res.cloudinary.com")) {
        // If it's a video file, get a smart auto-frame image
        if (videoUrl.match(/\.(mp4|webm|mov|avi)(\?.*)?$/i)) {
            const pathMatch = videoUrl.match(/upload\/(?:v\d+\/)?(.+?)\.[^.]+$/);
            if (pathMatch && pathMatch[1]) {
                return `https://res.cloudinary.com/dgmieaf9g/video/upload/so_auto,f_jpg,w_800,q_auto/${pathMatch[1]}.jpg`;
            }
        } else {
            // If it's an image thumb provided in the data, just compress it natively
            return videoUrl.replace("/upload/", "/upload/w_800,q_auto/");
        }
    }
    
    return videoUrl;
}

const services = [
    { title: "Music Videos", desc: "Cinematic visuals that match the beat." },
    { title: "Commercials", desc: "High-impact ads that convert." },
    { title: "Social Content", desc: "Reels & TikToks optimized for retention." },
    { title: "Corporate", desc: "Professional interviews and event coverage." },
];

const packages = [
    {
        name: "Starter",
        desc: "Perfect for social media content and short ads.",
        features: ["1 Day Filming", "2 Social Edits (15s)", "Basic Color Grading", "Licensed Music"],
        highlight: false,
    },
    {
        name: "Growth",
        desc: "High-quality brand storytelling and commercials.",
        features: ["2 Days Filming", "1 Brand Film (60s)", "3 Social Cutdowns", "Advanced Sound Design", "Professional Voiceover"],
        highlight: true,
    },
    {
        name: "Production",
        desc: "Full-scale production for TV and major campaigns.",
        features: ["Full Crew & Equipment", "Scripting & Storyboard", "Casting & Locations", "Cinema-Grade Post Production"],
        highlight: false,
    },
];

type Category = "All" | "Weddings" | "Events" | "Product" | "Personal Branding" | "Reels" | "Motion Graphics";

const categories: Category[] = ["All", "Weddings", "Events", "Product", "Personal Branding", "Reels"];


import { SEO } from "@/components/SEO";

export default function VideoService() {
    const [activeCategory, setActiveCategory] = useState<Category>("All");
    const [hoveredId, setHoveredId] = useState<string | null>(null);
    const [selectedVideo, setSelectedVideo] = useState<VideoProject | null>(null);
    const [activeEmbedId, setActiveEmbedId] = useState<string | null>(null);

    // Use static videoProjects — all 31 videos, no DB merge needed (avoids duplicates)
    const allVideos = videoProjects;

    const showreel = allVideos.find(v => v.featured) || allVideos[0];

    const filteredVideos = activeCategory === "All"
        ? allVideos
        : allVideos.filter(v => v.category === activeCategory);

    return (
        <div className="min-h-screen bg-background text-foreground overflow-hidden relative">
            <SEO 
                title="Gokul KP — Video Production & Brand Films"
                description="Brand films, high-retention video creative, product videos, and social ad creative for brands in Dubai and the UAE."
                url="/portfolio/video"
            />
            {/* Cinematic Background - No Blobs */}
            <div className="absolute inset-0 z-0 pointer-events-none bg-black">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(59,130,246,0.03),transparent_50%)]" />
                <div className="absolute inset-0 opacity-[0.02] pointer-events-none mix-blend-overlay" style={{ backgroundImage: 'url("https://www.transparenttextures.com/patterns/stardust.png")' }} />
            </div>

            {/* Hero */}
            <section className="relative min-h-[75vh] py-24 flex items-center justify-center overflow-hidden">
                <div className="absolute inset-0 z-0">
                    <div className="absolute inset-0 bg-black/70 z-10" />
                    <video
                        autoPlay
                        muted
                        loop
                        playsInline
                        className="w-full h-full object-cover opacity-50"
                        poster={getCloudinaryThumb("https://res.cloudinary.com/dgmieaf9g/video/upload/v1/lamourmedia_1761496555_3752003203673245690_4144321886_zcwmht.mp4")}
                    >
                        <source src="https://res.cloudinary.com/dgmieaf9g/video/upload/so_0,q_auto,w_1280/v1/lamourmedia_1761496555_3752003203673245690_4144321886_zcwmht.mp4" type="video/mp4" />
                    </video>
                    <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent z-20" />
                </div>
                <div className="relative z-30 container text-center px-4 max-w-5xl mx-auto">
                    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
                        <span className="inline-block py-1.5 px-4 rounded-full bg-white/5 border border-white/10 text-zinc-400 text-xs font-mono uppercase tracking-[0.25em] mb-6 backdrop-blur-md">
                            Video Production & Brand Films
                        </span>
                        <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-display font-bold tracking-tight mb-6 text-white uppercase leading-[1.05]">
                            Video That Has <span className="text-zinc-500">A Job To Do.</span>
                        </h1>
                        <p className="text-lg md:text-xl text-zinc-300 max-w-2xl mx-auto mb-10 font-light tracking-tight leading-relaxed">
                            Brand storytelling and social content designed to communicate clearly — not just look cinematic. Shot, edited, and formatted for real distribution.
                        </p>
                        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                            <a href="#works" className="btn bg-white text-black hover:bg-zinc-200 px-8 py-4 rounded-full font-semibold flex items-center gap-2 group transition-all">
                                <Play className="w-5 h-5 fill-current group-hover:scale-110 transition-transform" />
                                See All Videos
                            </a>
                            <Link href="/contact">
                                <a className="btn border border-border hover:bg-muted text-foreground px-8 py-4 rounded-full font-medium transition-all">
                                    Let's Talk
                                </a>
                            </Link>
                        </div>
                    </motion.div>
                </div>
            </section>


            {/* Showreel */}
            <section id="showreel" className="py-16 relative z-10">
                <div className="container">
                    <motion.div layoutId="showreel-container" onClick={() => setSelectedVideo(showreel)} className="relative aspect-video rounded-3xl overflow-hidden bg-muted group cursor-pointer border border-border/30">
                        <div className="absolute inset-0 flex items-center justify-center z-20">
                            <motion.div layoutId="showreel-play" className="w-20 h-20 rounded-full bg-background/20 backdrop-blur-xl flex items-center justify-center border border-border group-hover:bg-blue-500 group-hover:border-blue-400 transition-colors duration-500 shadow-2xl shadow-blue-500/20">
                                <Play className="w-8 h-8 text-white fill-current ml-1" />
                            </motion.div>
                        </div>
                        {showreel && showreel.videoUrl && (
                            <video
                                src={showreel.videoUrl}
                                preload="metadata"
                                playsInline
                                muted
                                className="absolute inset-0 w-full h-full object-cover opacity-60 group-hover:opacity-40 transition-opacity duration-500 group-hover:scale-105 transition-transform"
                                onMouseEnter={(e) => {
                                    e.currentTarget.play().catch(() => {});
                                }}
                                onMouseLeave={(e) => {
                                    e.currentTarget.pause();
                                    e.currentTarget.currentTime = 0;
                                }}
                            />
                        )}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent pointer-events-none" />
                        <div className="absolute inset-x-0 bottom-0 p-8">
                            <p className="text-blue-400 text-xs font-bold uppercase tracking-widest mb-2">Featured Showreel</p>
                            <h2 className="text-2xl font-bold text-white">{showreel?.title || "Cinematic Showreel 2025"}</h2>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* Video Modal */}
            <AnimatePresence>
                {selectedVideo && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-8 md:p-16">
                        <motion.div 
                            initial={{ opacity: 0 }} 
                            animate={{ opacity: 1 }} 
                            exit={{ opacity: 0 }} 
                            className="absolute inset-0 bg-black/95 backdrop-blur-sm"
                            onClick={() => setSelectedVideo(null)}
                        />
                        <button 
                            onClick={() => setSelectedVideo(null)} 
                            className="absolute top-6 right-6 z-[60] text-white p-3 bg-white/10 rounded-full hover:bg-white/20 transition-colors"
                            aria-label="Close modal"
                        >
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
                        </button>
                        
                        <motion.div layoutId="showreel-container" className="relative w-full max-w-7xl aspect-video rounded-2xl overflow-hidden bg-black z-50 shadow-2xl">
                            <motion.img 
                                layoutId="showreel-thumb" 
                                src={getCloudinaryThumb(selectedVideo.thumbnail || selectedVideo.videoUrl || "")} 
                                className="absolute inset-0 w-full h-full object-cover opacity-30 blur-xl" 
                            />
                            {/* Hide play button inside modal */}
                            <motion.div layoutId="showreel-play" style={{ opacity: 0 }} />
                            
                            {selectedVideo.cloudinaryEmbedId ? (
                                <iframe
                                    src={`https://player.cloudinary.com/embed/?cloud_name=dgmieaf9g&public_id=${selectedVideo.cloudinaryEmbedId}`}
                                    className="absolute inset-0 w-full h-full border-0"
                                    style={{ height: "100%", width: "100%" }}
                                    allow="autoplay; fullscreen; encrypted-media; picture-in-picture"
                                    allowFullScreen
                                />
                            ) : selectedVideo.videoUrl && (
                                <video 
                                    src={selectedVideo.videoUrl} 
                                    className="absolute inset-0 w-full h-full object-contain"
                                    autoPlay 
                                    controls 
                                    playsInline 
                                />
                            )}
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>

            {/* ALL VIDEOS — filterable grid */}
            <section id="works" className="py-16 relative z-10">
                <div className="container">
                    <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
                        <div>
                            <h2 className="text-3xl md:text-5xl font-display font-bold tracking-tight">
                                All Videos <span className="text-muted-foreground font-light text-2xl md:text-3xl ml-2">({filteredVideos.length})</span>
                            </h2>
                        </div>
                        {/* Category filter pills */}
                        <div className="flex flex-wrap gap-2">
                            {categories.map(cat => (
                                <button
                                    key={cat}
                                    onClick={() => setActiveCategory(cat)}
                                    className={cn(
                                        "px-4 py-1.5 rounded-full text-sm font-medium transition-all duration-300",
                                        activeCategory === cat
                                            ? "bg-blue-500 text-white shadow-lg shadow-blue-500/25"
                                            : "bg-muted/30 text-muted-foreground hover:text-foreground hover:bg-muted/60 border border-border/30"
                                    )}
                                >
                                    {cat}
                                </button>
                            ))}
                        </div>
                    </div>


                    {/* Video grid — 16:9 thumbnails, all videos visible */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                        <AnimatePresence>
                            {filteredVideos.map((video, i) => (
                                <motion.div
                                    key={video.id}
                                    initial={{ opacity: 0, y: 12 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, scale: 0.95 }}
                                    transition={{ duration: 0.4, delay: (i % 6) * 0.05, ease: [0.16, 1, 0.3, 1] }}
                                    onMouseEnter={() => setHoveredId(video.id)}
                                    onMouseLeave={() => setHoveredId(null)}
                                    onClick={() => setSelectedVideo(video)}
                                    className="group relative aspect-video rounded-2xl overflow-hidden bg-zinc-900 cursor-pointer border border-border/30 hover:border-blue-500/40 transition-colors duration-300"
                                >
                                    {/* Video Thumbnail / Preview */}
                                    <img
                                        src={getCloudinaryThumb(video.thumbnail || video.videoUrl || "")}
                                        alt={video.title}
                                        loading="lazy"
                                        className="absolute inset-0 w-full h-full object-cover opacity-80 group-hover:opacity-100 group-hover:scale-105 transition-all duration-500"
                                        onError={(e) => {
                                            e.currentTarget.src = "https://images.unsplash.com/photo-1536240478700-b869070f9279?q=80&w=800&auto=format&fit=crop";
                                        }}
                                    />

                                    {/* Desktop Hover Live Video Preview */}
                                    {hoveredId === video.id && video.videoUrl && (
                                        <video
                                            src={video.videoUrl}
                                            autoPlay
                                            playsInline
                                            muted
                                            loop
                                            className="absolute inset-0 w-full h-full object-cover z-[1]"
                                        />
                                    )}

                                    {/* Dark gradient */}
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent z-[2]" />

                                    {/* Play button — always visible, scales on hover */}
                                    <div className={cn(
                                        "absolute inset-0 flex items-center justify-center transition-opacity duration-300",
                                        hoveredId === video.id ? "opacity-0" : "opacity-100"
                                    )}>
                                        <div className="w-12 h-12 rounded-full bg-white/15 backdrop-blur-md border border-white/30 flex items-center justify-center group-hover:bg-blue-500 group-hover:border-blue-400 group-hover:scale-110 transition-all duration-400 shadow-xl">
                                            <Play className="w-5 h-5 text-white fill-current ml-0.5" />
                                        </div>
                                    </div>

                                    {/* Category badge */}
                                    <div className="absolute top-3 left-3">
                                        <span className="text-[10px] font-bold uppercase tracking-widest px-2.5 py-1 rounded-full bg-black/60 backdrop-blur-md text-blue-300 border border-blue-500/20">
                                            {video.category}
                                        </span>
                                    </div>

                                    {/* Featured badge */}
                                    {video.featured && (
                                        <div className="absolute top-3 right-3">
                                            <span className="text-[10px] font-bold uppercase tracking-widest px-2.5 py-1 rounded-full bg-blue-500/80 backdrop-blur-md text-white">
                                                Featured
                                            </span>
                                        </div>
                                    )}


                                </motion.div>
                            ))}
                        </AnimatePresence>
                    </div>

                    {filteredVideos.length === 0 && (
                        <div className="text-center py-24 text-muted-foreground">
                            <p className="text-lg">No videos in this category yet.</p>
                        </div>
                    )}
                </div>
            </section>
            {/* Cloudinary Player Embed Showcase Section */}
            <section id="interactive-embeds" className="py-24 bg-zinc-950 border-t border-border/20 relative z-10">
                <div className="container">
                    <div className="mb-14">
                        <span className="text-xs font-mono tracking-[0.4em] text-blue-400 uppercase block mb-3">
                            Featured Player Embeds
                        </span>
                        <h2 className="text-3xl md:text-5xl font-display font-bold text-white tracking-tight">
                            Interactive <span className="text-zinc-500 italic">Cloudinary Showcase</span>
                        </h2>
                        <p className="text-zinc-400 text-sm font-light mt-2 max-w-xl">
                            High-definition streaming embeds featuring AI product videos, commercial ads, Ramadan campaigns, and motion graphics.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {[
                            { title: "Aqua Care — Fully AI Product Video", publicId: "Aqua_Care_fully_AI_Product_Video_qc6l39", tag: "AI Commercial" },
                            { title: "Aqua Care — Ramadan Hot Water Dispenser AI", publicId: "Aqua_Care_Ramadan_Dispenser_Hot_water_use_AI_Video_yh60pz", tag: "AI Campaign" },
                            { title: "Little Rooster — Creative Film", publicId: "Little_Rooster_creative_ampr17", tag: "Culinary Creative" },
                            { title: "PrepMeal — Creative Direct-Response Campaign", publicId: "PrepMeal_Creative_gq7ntm", tag: "Ad Creative" },
                            { title: "Retro 5 — Event Memories", publicId: "Retro_5_wukctg", tag: "Event Highlight" },
                            { title: "PrepMeal — Motion Graphics AD Creative 1", publicId: "Prepmeal_AD_Creative_1_Motion_graphics_v8bmz1", tag: "Motion Graphics" },
                            { title: "RJ Aswathy Kannan — Personal Brand Reel", publicId: "rj.aswaathy.kannan_uwhygl", tag: "Personal Brand" },
                            { title: "Anu — Personal Branding Reel 3", publicId: "Anu-_3_xhk16i", tag: "Personal Brand" }
                        ].map((embed, idx) => (
                            <motion.div
                                key={idx}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.5, delay: (idx % 2) * 0.1 }}
                                className="group rounded-2xl overflow-hidden bg-zinc-900 border border-border/40 hover:border-blue-500/40 shadow-2xl transition-all duration-300 flex flex-col"
                            >
                                <div 
                                    className="relative w-full aspect-video bg-black overflow-hidden cursor-pointer"
                                    onClick={() => setActiveEmbedId(embed.publicId)}
                                >
                                    {activeEmbedId === embed.publicId ? (
                                        <iframe
                                            src={`https://player.cloudinary.com/embed/?cloud_name=dgmieaf9g&public_id=${embed.publicId}&autoplay=true`}
                                            width="640"
                                            height="360"
                                            style={{ height: "100%", width: "100%", aspectRatio: "640 / 360" }}
                                            allow="autoplay; fullscreen; encrypted-media; picture-in-picture"
                                            allowFullScreen
                                            frameBorder="0"
                                            className="w-full h-full border-0 block"
                                        />
                                    ) : (
                                        <div className="relative w-full h-full group/facade">
                                            <img
                                                src={`https://res.cloudinary.com/dgmieaf9g/video/upload/so_auto,f_jpg,w_800,q_auto/${embed.publicId}.jpg`}
                                                alt={embed.title}
                                                loading="lazy"
                                                className="w-full h-full object-cover opacity-75 group-hover/facade:opacity-90 group-hover/facade:scale-105 transition-all duration-500"
                                                onError={(e) => {
                                                    e.currentTarget.src = "https://images.unsplash.com/photo-1536240478700-b869070f9279?q=80&w=800&auto=format&fit=crop";
                                                }}
                                            />
                                            <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                                                <div className="w-14 h-14 rounded-full bg-blue-500/80 backdrop-blur-md border border-white/30 flex items-center justify-center group-hover/facade:scale-110 group-hover/facade:bg-blue-500 transition-all duration-300 shadow-2xl">
                                                    <Play className="w-6 h-6 text-white fill-current ml-0.5" />
                                                </div>
                                            </div>
                                        </div>
                                    )}
                                </div>
                                <div className="p-5 bg-zinc-900/90 border-t border-border/30 flex items-center justify-between">
                                    <div>
                                        <span className="text-[10px] font-mono text-blue-400 uppercase tracking-widest block mb-1">
                                            {embed.tag}
                                        </span>
                                        <h3 className="text-base font-bold text-white group-hover:text-blue-300 transition-colors">
                                            {embed.title}
                                        </h3>
                                    </div>
                                    <span className="text-xs font-mono text-zinc-500 bg-white/5 px-3 py-1 rounded-full border border-white/10">
                                        Embed #{String(idx + 1).padStart(2, '0')}
                                    </span>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Production Capabilities */}
            <section className="py-24 border-t border-border/20 relative z-10 bg-zinc-950/60">
                <div className="container max-w-6xl mx-auto px-6">
                    <div className="text-center max-w-2xl mx-auto mb-16">
                        <span className="text-xs font-mono tracking-[0.3em] text-blue-400 uppercase block mb-3">
                            Production Formats
                        </span>
                        <h2 className="text-3xl sm:text-4xl font-display font-bold text-white tracking-tight">
                            Built For Feeds, Screens, and Paid Media
                        </h2>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {[
                            {
                                title: "Brand & Commercial Films",
                                desc: "Focused narrative and positioning for company launches, culinary brands, and corporate presence."
                            },
                            {
                                title: "Direct-Response Ad Creative",
                                desc: "Hook variations, problem-solution cuts, and product demos engineered for paid Meta campaigns."
                            },
                            {
                                title: "Short-Form Social & Reels",
                                desc: "High-retention vertical edits designed for mobile feeds, TikTok, and Instagram engagement."
                            },
                            {
                                title: "Product & AI Showcase",
                                desc: "Clean camera motion, macro product details, and hybrid AI visuals for physical products."
                            }
                        ].map((item, idx) => (
                            <div key={idx} className="p-6 rounded-2xl bg-zinc-900/60 border border-zinc-800/80">
                                <span className="text-xs font-mono text-blue-400 font-bold block mb-3">0{idx + 1}</span>
                                <h3 className="text-base font-bold text-white mb-2">{item.title}</h3>
                                <p className="text-xs text-zinc-400 font-light leading-relaxed">{item.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Closing CTA */}
            <section className="py-24 border-t border-border/20 text-center relative z-10">
                <div className="container max-w-3xl mx-auto px-6">
                    <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-bold tracking-tight mb-6">
                        Have a video or campaign project in mind?
                    </h2>
                    <p className="text-lg text-muted-foreground font-light mb-10 max-w-xl mx-auto">
                        Whether you need a commercial shoot, ad creative for paid social, or ongoing video production, let's talk.
                    </p>
                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                        <Link href="/contact">
                            <a className="w-full sm:w-auto px-8 py-4 rounded-full bg-white text-black font-semibold hover:bg-zinc-200 transition-all cursor-pointer">
                                Let's Talk
                            </a>
                        </Link>
                        <a 
                            href="https://wa.me/971545264632" 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="w-full sm:w-auto px-8 py-4 rounded-full border border-border text-foreground hover:bg-muted font-medium transition-all"
                        >
                            Chat on WhatsApp
                        </a>
                    </div>
                </div>
            </section>
        </div>
    );
}
