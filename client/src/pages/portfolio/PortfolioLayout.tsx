import { useState, useEffect, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link, useLocation } from "wouter";
import { Play, Camera, Edit, Share2, TrendingUp, ArrowUpRight, RotateCcw } from "lucide-react";
import { SafeImage } from "@/components/ui/SafeImage";
import { trpc } from "@/lib/trpc";

type FilterCategory = "all" | "video" | "photo" | "marketing" | "case-study";

const categoryIcons: Record<string, any> = {
    video: Play,
    photo: Camera,
    marketing: TrendingUp,
    "case-study": Edit,
    editing: Edit,
    social: Share2,
    ads: TrendingUp
};

export default function PortfolioLayout() {
    const [location, navigate] = useLocation();

    const [activeFilter, setActiveFilter] = useState<FilterCategory>("all");

    const { data: dbProjects, isLoading } = trpc.projects.list.useQuery();

    // Sync state from URL
    useEffect(() => {
        const params = new URLSearchParams(window.location.search);
        const param = params.get("filter") as FilterCategory | null;
        if (param && ["video", "photo", "marketing", "case-study", "all"].includes(param)) {
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

    const filteredProjects = useMemo(() => {
        if (!dbProjects) return [];
        if (activeFilter === "all") return dbProjects;
        return dbProjects.filter(p => p.category.toLowerCase() === activeFilter);
    }, [dbProjects, activeFilter]);

    const filters: { value: FilterCategory; label: string }[] = [
        { value: "all", label: "All Work" },
        { value: "video", label: "Video" },
        { value: "photo", label: "Photography" },
        { value: "marketing", label: "Marketing" },
        { value: "case-study", label: "Case Studies" }
    ];

    return (
        <div className="min-h-screen bg-background pt-32 pb-20">
            <div className="container px-4 md:px-8 max-w-[1400px] mx-auto">

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
                        <p className="text-xl text-muted-foreground font-light leading-relaxed">
                            A complete collection of creative work across video production, photography,
                            social content, and performance advertising.
                        </p>
                    </div>

                    {/* Filter Bar */}
                    <div className="flex flex-wrap gap-2 bg-muted/30 p-1.5 rounded-full border border-border/40 backdrop-blur-sm">
                        {filters.map((filter) => (
                            <button
                                key={filter.value}
                                onClick={() => handleFilterChange(filter.value)}
                                className={`px-5 py-2 rounded-full text-sm font-medium transition-all duration-300 ${activeFilter === filter.value
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
                {!dbProjects || isLoading ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {[...Array(6)].map((_, i) => (
                            <div key={i} className="aspect-[4/5] bg-muted animate-pulse rounded-3xl" />
                        ))}
                    </div>
                ) : (
                    <motion.div
                        layout
                        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
                    >
                        <AnimatePresence mode="popLayout">
                            {filteredProjects.map((project) => {
                                const Icon = categoryIcons[project.category?.toLowerCase()] || Play;

                                return (
                                    <motion.div
                                        key={project.id}
                                        layout
                                        initial={{ opacity: 0, y: 12, scale: 0.98 }}
                                        animate={{ opacity: 1, y: 0, scale: 1 }}
                                        exit={{ opacity: 0, scale: 0.98 }}
                                        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                                        className="group relative"
                                    >
                                        <Link href={`/portfolio/${project.category?.toLowerCase() || 'all'}/${project.slug}`}>
                                            <div className="relative aspect-[4/5] overflow-hidden rounded-3xl bg-muted border border-border/40 transition-colors cursor-pointer group-hover:border-orange-500/30">
                                                <SafeImage
                                                    src={project.thumbnail}
                                                    alt={project.title}
                                                    aspectRatio="portrait"
                                                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                                                />

                                                {/* Overlays */}
                                                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300" />

                                                <div className="absolute top-6 left-6 flex flex-col gap-2">
                                                    <span className="inline-flex items-center gap-2 px-3 py-1 bg-black/60 backdrop-blur-md border border-white/10 text-white rounded-full text-[10px] uppercase font-bold tracking-widest">
                                                        <Icon className="w-3 h-3 text-orange-500" />
                                                        {project.category}
                                                    </span>
                                                </div>

                                                <div className="absolute top-6 right-6 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                                    <div className="w-10 h-10 rounded-full bg-white text-black flex items-center justify-center shadow-2xl transform translate-y-2 group-hover:translate-y-0 transition-transform">
                                                        <ArrowUpRight className="w-5 h-5" />
                                                    </div>
                                                </div>

                                                <div className="absolute bottom-0 left-0 right-0 p-8 transform translate-y-4 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-300">
                                                    <h3 className="text-2xl font-display font-bold text-white mb-2">{project.title}</h3>
                                                    <p className="text-sm text-white/60 font-light line-clamp-2">{project.description}</p>
                                                </div>
                                            </div>
                                        </Link>
                                    </motion.div>
                                );
                            })}
                        </AnimatePresence>
                    </motion.div>
                )}

                {/* Empty State */}
                {dbProjects && filteredProjects.length === 0 && (
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
        </div>
    );
}
