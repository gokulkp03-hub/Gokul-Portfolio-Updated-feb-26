import { motion, AnimatePresence } from "framer-motion";
import { Link } from "wouter";
import { Play, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { useState } from "react";
import { videoProjects } from "@/data/video";

// Generates a reliable Cloudinary thumbnail from a video URL or public ID
// Uses so_0 (screenshot at 0s), f_jpg, w_800, q_auto transformations
function getCloudinaryThumb(videoUrl: string): string {
    if (!videoUrl) return "";
    // If it's already a jpg/jpeg/webp/png, return as-is
    if (/\.(jpg|jpeg|webp|png)(\?|$)/i.test(videoUrl)) return videoUrl;
    // If it's a Cloudinary video URL, convert to image URL with transformations
    if (videoUrl.includes("res.cloudinary.com")) {
        return videoUrl
            .replace("/video/upload/", "/video/upload/so_0,f_jpg,w_800,q_auto/")
            .replace(/\.(mp4|webm|mov|avi)(\?.*)?$/i, ".jpg");
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
        price: "From AED 5,000",
        desc: "Perfect for social media content and short ads.",
        features: ["1 Day Filming", "2 Social Edits (15s)", "Basic Color Grading", "Licensed Music"],
        highlight: false,
    },
    {
        name: "Growth",
        price: "From AED 12,000",
        desc: "High-quality brand storytelling and commercials.",
        features: ["2 Days Filming", "1 Brand Film (60s)", "3 Social Cutdowns", "Advanced Sound Design", "Professional Voiceover"],
        highlight: true,
    },
    {
        name: "Production",
        price: "Custom",
        desc: "Full-scale production for TV and major campaigns.",
        features: ["Full Crew & Equipment", "Scripting & Storyboard", "Casting & Locations", "Cinema-Grade Post Production"],
        highlight: false,
    },
];

type Category = "All" | "Weddings" | "Events" | "Product" | "Personal Branding" | "Reels" | "Motion Graphics";

const categories: Category[] = ["All", "Weddings", "Events", "Product", "Personal Branding", "Reels"];


export default function VideoService() {
    const [activeCategory, setActiveCategory] = useState<Category>("All");
    const [hoveredId, setHoveredId] = useState<string | null>(null);
    const [showModal, setShowModal] = useState(false);

    // Use static videoProjects — all 31 videos, no DB merge needed (avoids duplicates)
    const allVideos = videoProjects;

    const showreel = allVideos.find(v => v.featured) || allVideos[0];

    const filteredVideos = activeCategory === "All"
        ? allVideos
        : allVideos.filter(v => v.category === activeCategory);

    return (
        <div className="min-h-screen bg-background text-foreground overflow-hidden relative">
            {/* Background blobs */}
            <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
                <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-blue-500/20 rounded-full blur-[120px] animate-pulse-slow" />
                <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-cyan-500/20 rounded-full blur-[120px] animate-pulse-slow" style={{ animationDelay: '2s' }} />
            </div>

            {/* Hero */}
            <section className="relative h-[80vh] flex items-center justify-center overflow-hidden">
                <div className="absolute inset-0 z-0">
                    <div className="absolute inset-0 bg-black/60 z-10" />
                    <img
                        src="https://images.unsplash.com/photo-1536240478700-b869070f9279?q=80&w=2000&auto=format&fit=crop"
                        className="w-full h-full object-cover opacity-50"
                        alt="Video Production"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent z-20" />
                </div>
                <div className="relative z-30 container text-center px-4">
                    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
                        <span className="inline-block py-1 px-3 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-sm font-medium mb-6 backdrop-blur-md">
                            Video Production & Editing
                        </span>
                        <h1 className="text-5xl md:text-8xl font-display font-bold tracking-tighter mb-6 text-white text-balance">
                            Visuals that <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400">captivate</span>.
                        </h1>
                        <p className="text-xl text-zinc-300 max-w-2xl mx-auto mb-10 font-light leading-relaxed">
                            From cinematic wedding films to high-energy brand reels — stories that keep eyes on the screen.
                        </p>
                        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                            <a href="#works" className="btn bg-white text-black hover:bg-zinc-200 px-8 py-4 rounded-full font-semibold flex items-center gap-2 group transition-all">
                                <Play className="w-5 h-5 fill-current group-hover:scale-110 transition-transform" />
                                See All Work
                            </a>
                            <Link href="/contact">
                                <a className="btn border border-border hover:bg-muted text-foreground px-8 py-4 rounded-full font-medium transition-all">
                                    Start a Project
                                </a>
                            </Link>
                        </div>
                    </motion.div>
                </div>
            </section>


            {/* Showreel */}
            <section id="showreel" className="py-16 relative z-10">
                <div className="container">
                    <motion.div layoutId="showreel-container" onClick={() => setShowModal(true)} className="relative aspect-video rounded-3xl overflow-hidden bg-muted group cursor-pointer border border-border/30">
                        <div className="absolute inset-0 flex items-center justify-center z-20">
                            <motion.div layoutId="showreel-play" className="w-20 h-20 rounded-full bg-background/20 backdrop-blur-xl flex items-center justify-center border border-border group-hover:bg-blue-500 group-hover:border-blue-400 transition-colors duration-500 shadow-2xl shadow-blue-500/20">
                                <Play className="w-8 h-8 text-white fill-current ml-1" />
                            </motion.div>
                        </div>
                        {showreel && (
                            <motion.img
                                layoutId="showreel-thumb"
                                src={getCloudinaryThumb(showreel.thumbnail || showreel.videoUrl || "")}
                                alt="Showreel"
                                className="w-full h-full object-cover opacity-60 group-hover:opacity-40 transition-opacity duration-500 group-hover:scale-105 transition-transform"
                                onError={(e) => { e.currentTarget.style.display = "none"; }}
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

            {/* Showreel Modal */}
            <AnimatePresence>
                {showModal && showreel && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-8 md:p-16">
                        <motion.div 
                            initial={{ opacity: 0 }} 
                            animate={{ opacity: 1 }} 
                            exit={{ opacity: 0 }} 
                            className="absolute inset-0 bg-black/95 backdrop-blur-sm"
                            onClick={() => setShowModal(false)}
                        />
                        <button 
                            onClick={() => setShowModal(false)} 
                            className="absolute top-6 right-6 z-[60] text-white p-3 bg-white/10 rounded-full hover:bg-white/20 transition-colors"
                            aria-label="Close modal"
                        >
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
                        </button>
                        
                        <motion.div layoutId="showreel-container" className="relative w-full max-w-7xl aspect-video rounded-2xl overflow-hidden bg-black z-50 shadow-2xl">
                            <motion.img 
                                layoutId="showreel-thumb" 
                                src={getCloudinaryThumb(showreel.thumbnail || showreel.videoUrl || "")} 
                                className="absolute inset-0 w-full h-full object-cover opacity-30 blur-xl" 
                            />
                            {/* Hide play button inside modal */}
                            <motion.div layoutId="showreel-play" style={{ opacity: 0 }} />
                            
                            {showreel.videoUrl && (
                                <video 
                                    src={showreel.videoUrl} 
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
                    <motion.div layout className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                        <AnimatePresence mode="popLayout">
                            {filteredVideos.map((video, i) => (
                                <motion.div
                                    key={video.id}
                                    layout
                                    initial={{ opacity: 0, y: 12 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, scale: 0.95 }}
                                    transition={{ duration: 0.4, delay: i * 0.04, ease: [0.16, 1, 0.3, 1] }}
                                    onMouseEnter={() => setHoveredId(video.id)}
                                    onMouseLeave={() => setHoveredId(null)}
                                    className="group relative aspect-video rounded-2xl overflow-hidden bg-zinc-900 cursor-pointer border border-border/30 hover:border-blue-500/40 transition-colors duration-300"
                                >
                                    {/* Thumbnail */}
                                    <img
                                        src={getCloudinaryThumb(video.thumbnail || video.videoUrl || "")}
                                        alt={video.title}
                                        className={cn(
                                            "absolute inset-0 w-full h-full object-cover transition-all duration-700",
                                            hoveredId === video.id ? "opacity-0 scale-105" : "opacity-80 group-hover:opacity-100 group-hover:scale-105"
                                        )}
                                        loading="lazy"
                                        onError={(e) => {
                                            // Fallback: try videoUrl as thumbnail source
                                            const t = e.currentTarget;
                                            if (video.videoUrl && t.src !== getCloudinaryThumb(video.videoUrl)) {
                                                t.src = getCloudinaryThumb(video.videoUrl);
                                            } else {
                                                // Final fallback: solid dark bg (hide broken img)
                                                t.style.display = "none";
                                            }
                                        }}
                                    />

                                    {/* Video Preview */}
                                    <AnimatePresence>
                                        {hoveredId === video.id && video.videoUrl && (
                                            <motion.video
                                                initial={{ opacity: 0 }}
                                                animate={{ opacity: 1 }}
                                                exit={{ opacity: 0 }}
                                                transition={{ duration: 0.5 }}
                                                src={video.videoUrl}
                                                className="absolute inset-0 w-full h-full object-cover"
                                                autoPlay
                                                muted
                                                loop
                                                playsInline
                                            />
                                        )}
                                    </AnimatePresence>

                                    {/* Dark gradient */}
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent" />

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

                                    {/* Title — bottom */}
                                    <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-1 group-hover:translate-y-0 transition-transform duration-300">
                                        <h3 className="text-white font-display font-bold text-base leading-tight line-clamp-1">
                                            {video.title}
                                        </h3>
                                        <p className="text-white/50 text-xs mt-0.5 line-clamp-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                            {video.description}
                                        </p>
                                    </div>
                                </motion.div>
                            ))}
                        </AnimatePresence>
                    </motion.div>

                    {filteredVideos.length === 0 && (
                        <div className="text-center py-24 text-muted-foreground">
                            <p className="text-lg">No videos in this category yet.</p>
                        </div>
                    )}
                </div>
            </section>
        </div>
    );
}
