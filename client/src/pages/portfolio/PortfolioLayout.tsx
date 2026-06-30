import { useState, useEffect, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link, useLocation } from "wouter";
import { Play, Camera, Edit, Share2, TrendingUp, ArrowUpRight, RotateCcw, X, ExternalLink, Award } from "lucide-react";
import { SafeImage } from "@/components/ui/SafeImage";
import { trpc } from "@/lib/trpc";
import { projects as staticProjects } from "@/data/projects";
import { marketingCampaigns as staticMarketing } from "@/data/marketing";
import { setSEO } from "../../utils/seo";

type FilterCategory = "all" | "ads" | "video" | "photo" | "social" | "influencer";

const categoryIcons: Record<string, any> = {
    video: Play,
    photo: Camera,
    marketing: TrendingUp,
    "case-study": Edit,
    editing: Edit,
    social: Share2,
    ads: Award,
    influencer: Share2
};

export default function PortfolioLayout() {
    const [location, navigate] = useLocation();
    const [activeFilter, setActiveFilter] = useState<FilterCategory>("all");
    const [selectedItem, setSelectedItem] = useState<any>(null);

    const { data: dbProjects, isLoading } = trpc.projects.list.useQuery();

    useEffect(() => {
        const filterTitle = activeFilter === "all" ? "Creative Portfolio" : activeFilter.toUpperCase();
        setSEO({
            title: `${filterTitle} | Gokul KP`,
            description: `Browse Gokul's creative commercial portfolio including performance ads, cinematic video projects, luxury photography, and B2C campaigns.`
        });
    }, [activeFilter]);

    // Handle Escape key to close lightbox
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === "Escape") {
                setSelectedItem(null);
            }
        };
        window.addEventListener("keydown", handleKeyDown);
        return () => window.removeEventListener("keydown", handleKeyDown);
    }, []);

    // Sync state from URL
    useEffect(() => {
        const params = new URLSearchParams(window.location.search);
        const param = params.get("filter") as FilterCategory | null;
        if (param && ["video", "photo", "ads", "social", "influencer", "all"].includes(param)) {
            setActiveFilter(param);
        } else {
            setActiveFilter("all");
        }
    }, [location]);

    const handleFilterChange = (value: FilterCategory) => {
        setActiveFilter(value);
        if (value === "all") {
            navigate("/portfolio", { replace: true });
        } else {
            navigate(`/portfolio?filter=${value}`, { replace: true });
        }
    };

    // Static projects mapped to Prisma schema compatible structure
    const mergedStaticProjects = useMemo(() => {
        const mappedProjects = staticProjects.map(p => ({
            id: p.id,
            title: p.title,
            slug: p.slug,
            category: p.category,
            description: p.description,
            thumbnail: p.thumbnail,
            featured: p.featured || false,
            videoUrl: p.videoUrl || "",
            client: p.client || "",
            role: p.role || "",
            status: "published",
            images: p.images || []
        }));

        const mappedMarketing = staticMarketing.map(m => ({
            id: m.id,
            title: m.title,
            slug: m.slug,
            category: "marketing",
            description: m.description,
            thumbnail: m.visuals[0] || "",
            featured: m.featured || false,
            videoUrl: "",
            client: m.client || "",
            role: m.role || "",
            status: "published",
            images: m.visuals || []
        }));

        return [...mappedProjects, ...mappedMarketing];
    }, []);

    // Use static fallback as the primary source of truth to ensure clean visuals and no wedding content
    const projectsList = useMemo(() => {
        return mergedStaticProjects;
    }, [mergedStaticProjects]);

    const filteredProjects = useMemo(() => {
        if (activeFilter === "all") return projectsList;
        return projectsList.filter(p => {
            const cat = (p.category || "").toLowerCase();
            const id = p.id;
            
            if (activeFilter === "ads") {
                return cat === "ads" || id === "aqua-care-uae" || id === "beyondcars-leads" || id === "meta-ads-1" || id === "little-rooster-branding";
            }
            if (activeFilter === "video") {
                return cat === "video" || id === "beyond-cars-showcase" || id === "wedding-highlight-1" || id === "boss-branding-1" || id === "product-showcase-1" || id === "steaburg-brand-film" || id === "steaburg-reel-social";
            }
            if (activeFilter === "photo") {
                return cat === "photo" || id === "food-pancakes-1" || id === "food-cheesecake-1" || id === "product-photo-1";
            }
            if (activeFilter === "social") {
                return cat === "social" || id === "prepmeal-growth" || id === "steaburg-seo" || id === "instagram-reels-1";
            }
            if (activeFilter === "influencer") {
                return id === "prepmeal-growth" || cat === "influencer";
            }
            return cat === activeFilter;
        });
    }, [projectsList, activeFilter]);

    const filters: { value: FilterCategory; label: string }[] = [
        { value: "all", label: "All Work" },
        { value: "ads", label: "Ad Creatives" },
        { value: "video", label: "Video Production" },
        { value: "photo", label: "Photography" },
        { value: "social", label: "Social Media" },
        { value: "influencer", label: "Influencer" }
    ];

    return (
        <div className="min-h-screen bg-background pt-32 pb-20">
            {/* Background grain texture */}
            <div className="bg-grain hidden md:dark:block" />

            <div className="container px-4 md:px-8 max-w-[1400px] mx-auto relative z-10">

                {/* Header */}
                <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8">
                    <div className="max-w-2xl">
                        <motion.h1
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="text-6xl md:text-8xl font-display font-bold tracking-tighter mb-6 uppercase"
                        >
                            Portfolio <span className="text-orange-500 italic">Archive</span>
                        </motion.h1>
                        <p className="text-xl text-muted-foreground font-normal leading-relaxed">
                            {filteredProjects.length > 0 
                                ? `${filteredProjects.length} selective campaigns across performance marketing, cinematic video, and commercial media.`
                                : "A complete collection across video production, photography, social content, and performance advertising."
                            }
                        </p>
                    </div>

                    {/* Filter Bar */}
                    <div className="flex flex-wrap gap-2 bg-muted/30 p-1.5 rounded-full border border-border/40 backdrop-blur-sm">
                        {filters.map((filter) => (
                            <button
                                key={filter.value}
                                onClick={() => handleFilterChange(filter.value)}
                                className={`px-5 py-2 rounded-full text-xs font-semibold uppercase tracking-wider transition-all duration-300 ${activeFilter === filter.value
                                    ? "bg-orange-500 text-white shadow-lg shadow-orange-500/20"
                                    : "text-muted-foreground hover:text-foreground hover:bg-muted/60"
                                    }`}
                            >
                                {filter.label}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Projects Grid */}
                {isLoading && projectsList.length === 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {[...Array(6)].map((_, i) => (
                            <div key={i} className="aspect-[4/5] bg-muted animate-pulse rounded-3xl" />
                        ))}
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {filteredProjects.map((project, i) => {
                            const categoryString = (project.category || "").toLowerCase();
                            const Icon = categoryIcons[categoryString] || Play;
                            const aspectClass = "aspect-[4/5]";
                            
                            // Paid ad border flag
                            const isPaidAd = categoryString === "ads" || categoryString === "marketing" || project.id === "meta-ads-1" || project.id === "aqua-care-uae" || project.id === "beyondcars-leads";
                            // Live campaign status indicator
                            const isLiveCampaign = project.id === "aqua-care-uae" || project.id === "beyondcars-leads" || project.id === "meta-ads-1" || project.id === "little-rooster-branding";

                            return (
                                <motion.div
                                    key={project.id}
                                    initial={{ opacity: 0, y: 16 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, scale: 0.97 }}
                                    transition={{ duration: 0.5, delay: (i % 6) * 0.06, ease: [0.16, 1, 0.3, 1] }}
                                    className="group relative"
                                    onClick={() => setSelectedItem(project)}
                                >
                                    <div className={`relative ${aspectClass} overflow-hidden rounded-[2.5rem] bg-muted border border-border/40 transition-all duration-500 cursor-pointer hover:border-orange-500/30 shadow-lg hover:shadow-2xl hover:shadow-orange-500/5`}>
                                        {project.videoUrl ? (
                                            <video
                                                src={project.videoUrl}
                                                preload="metadata"
                                                playsInline
                                                muted
                                                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                                                onMouseEnter={(e) => {
                                                    e.currentTarget.play().catch(() => {});
                                                }}
                                                onMouseLeave={(e) => {
                                                    e.currentTarget.pause();
                                                    e.currentTarget.currentTime = 0;
                                                }}
                                            />
                                        ) : (
                                            <SafeImage
                                                src={project.thumbnail}
                                                alt={project.title}
                                                aspectRatio="portrait"
                                                loading={i < 6 ? "eager" : "lazy"}
                                                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                                            />
                                        )}

                                        {/* Gradient overlay */}
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent" />

                                        {/* Category chip */}
                                        <div className="absolute top-5 left-5">
                                            <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 bg-black/75 backdrop-blur-md border border-white/10 text-white rounded-full text-[9px] uppercase font-bold tracking-widest">
                                                <Icon className="w-3 h-3 text-orange-500" />
                                                {categoryString}
                                            </span>
                                        </div>

                                        {/* Live Campaign Status Badge */}
                                        {isLiveCampaign && (
                                            <div className="absolute top-5 right-5 z-20 flex items-center gap-1.5 px-3 py-1.5 bg-red-600/90 backdrop-blur-md border border-red-500/30 text-white rounded-full text-[9px] uppercase font-bold tracking-widest animate-pulse">
                                                <span className="w-1.5 h-1.5 rounded-full bg-white" />
                                                LIVE CAMPAIGN RESULTS
                                            </div>
                                        )}

                                        {/* Arrow button overlay on hover */}
                                        <div className="absolute bottom-6 right-6 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-2 group-hover:translate-y-0">
                                            <div className="w-12 h-12 rounded-full bg-orange-500 text-white flex items-center justify-center shadow-xl">
                                                {project.videoUrl ? <Play className="w-5 h-5 fill-current" /> : <ArrowUpRight className="w-5 h-5" />}
                                            </div>
                                        </div>

                                        {/* Title panel */}
                                        <div className="absolute bottom-6 left-6 right-20 transition-all duration-300">
                                            <p className="text-white/40 text-[9px] font-bold uppercase tracking-[0.2em] mb-1">{project.client}</p>
                                            <h3 className="text-xl font-display font-bold text-white leading-tight uppercase tracking-tight line-clamp-2">{project.title}</h3>
                                        </div>

                                        {/* Paid ads bottom line indicator */}
                                        {isPaidAd && (
                                            <div className="absolute bottom-0 left-0 right-0 h-1.5 bg-orange-500 z-10" />
                                        )}
                                    </div>
                                </motion.div>
                            );
                        })}
                    </div>
                )}

                {/* Empty State */}
                {projectsList && filteredProjects.length === 0 && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="text-center py-40 bg-muted/10 rounded-[3rem] border border-dashed border-border/30"
                    >
                        <RotateCcw className="w-12 h-12 text-muted-foreground mx-auto mb-6 opacity-20" />
                        <p className="text-xl text-muted-foreground italic mb-8">No projects found in this category.</p>
                        <button
                            onClick={() => handleFilterChange("all")}
                            className="btn-secondary rounded-full"
                        >
                            Reset Filters
                        </button>
                    </motion.div>
                )}

            </div>

            {/* Immersive Lightbox Overlay */}
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
                            {selectedItem.videoUrl ? (
                                selectedItem.videoUrl.includes("embed") || selectedItem.videoUrl.includes("player.cloudinary.com") ? (
                                    <iframe 
                                        src={selectedItem.videoUrl}
                                        className="w-full h-full border-0 rounded-[2rem]"
                                        allow="autoplay; fullscreen; encrypted-media; picture-in-picture"
                                        allowFullScreen
                                    />
                                ) : (
                                    <video 
                                        src={selectedItem.videoUrl}
                                        className="w-full h-full object-contain"
                                        controls
                                        autoPlay
                                    />
                                )
                            ) : (
                                <img 
                                    src={selectedItem.thumbnail} 
                                    className="w-full h-full object-cover" 
                                    alt={selectedItem.title} 
                                    onError={(e) => {
                                        e.currentTarget.src = "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=2426&auto=format&fit=crop";
                                    }} 
                                />
                            )}

                            <div className="absolute top-6 right-6 flex gap-3">
                                <Link href={selectedItem.id === "aqua-care-uae" ? "/marketing/aqua-care-uae" : selectedItem.id === "prepmeal-growth" ? "/marketing/prepmeal" : `/portfolio/${selectedItem.category || 'all'}/${selectedItem.slug}`}>
                                    <span className="w-10 h-10 rounded-full bg-white text-black flex items-center justify-center hover:scale-105 transition-transform cursor-pointer shadow-lg animate-fade-in" onClick={() => setSelectedItem(null)}>
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

                            <div className="absolute bottom-0 left-0 right-0 p-8 bg-gradient-to-t from-black via-black/85 to-transparent">
                                <span className="text-[9px] font-bold uppercase tracking-[0.4em] mb-2 block text-orange-500">
                                    {selectedItem.category} Project • {selectedItem.client}
                                </span>
                                <h2 className="text-2xl md:text-3xl font-display font-black text-white mb-2 uppercase tracking-tighter">
                                    {selectedItem.title}
                                </h2>
                                <p className="text-white/60 text-sm font-light max-w-xl line-clamp-2">{selectedItem.description}</p>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
