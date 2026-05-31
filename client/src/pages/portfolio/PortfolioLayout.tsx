import { useState, useEffect, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link, useLocation } from "wouter";
import { Play, Camera, Edit, Share2, TrendingUp, ArrowUpRight, RotateCcw } from "lucide-react";
import { SafeImage } from "@/components/ui/SafeImage";
import { trpc } from "@/lib/trpc";
import { projects as staticProjects } from "@/data/projects";
import { marketingCampaigns as staticMarketing } from "@/data/marketing";

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
            status: "published",
        }));

        const mappedMarketing = staticMarketing.map(m => ({
            id: m.id,
            title: m.title,
            slug: m.slug,
            category: "marketing",
            description: m.description,
            thumbnail: m.visuals[0] || "",
            featured: m.featured || false,
            status: "published",
        }));

        return [...mappedProjects, ...mappedMarketing];
    }, []);

    // Merge tRPC dbProjects and static fallback
    const projectsList = useMemo(() => {
        if (dbProjects && dbProjects.length > 0) {
            return dbProjects;
        }
        return mergedStaticProjects;
    }, [dbProjects, mergedStaticProjects]);

    const filteredProjects = useMemo(() => {
        if (activeFilter === "all") return projectsList;
        return projectsList.filter(p => {
            const cat = (p.category || "").toLowerCase();
            if (activeFilter === "case-study") {
                return cat === "marketing" || cat === "case-study";
            }
            return cat === activeFilter;
        });
    }, [projectsList, activeFilter]);

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
                        <p className="text-xl text-muted-foreground font-normal leading-relaxed">
                            {filteredProjects.length > 0 
                                ? `${filteredProjects.length} ${activeFilter === "all" ? "creative projects" : activeFilter + " projects"} across video, photography, and performance marketing.`
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
                {isLoading && (!dbProjects || dbProjects.length === 0) ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {[...Array(6)].map((_, i) => (
                            <div key={i} className="aspect-[4/5] bg-muted animate-pulse rounded-3xl" />
                        ))}
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {filteredProjects.map((project, i) => {
                            const categoryString = (project.category || "").toLowerCase();
                            const Icon = categoryIcons[categoryString] || Play;
                            // Mixed aspect ratios for visual rhythm — every 5th card is wide, every 7th is square
                            const aspectClass = i % 7 === 0 ? "aspect-[3/2]" : i % 5 === 0 ? "aspect-square" : "aspect-[4/5]";

                            return (
                                <motion.div
                                    key={project.id}
                                    initial={{ opacity: 0, y: 16 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, scale: 0.97 }}
                                    transition={{ duration: 0.5, delay: (i % 6) * 0.06, ease: [0.16, 1, 0.3, 1] }}
                                    className={`group relative ${i % 7 === 0 || i % 5 === 0 ? "md:col-span-2 lg:col-span-1" : ""}`}
                                >
                                    <Link href={`/portfolio/${categoryString || 'all'}/${project.slug}`}>
                                        <div className={`relative ${aspectClass} overflow-hidden rounded-3xl bg-muted border border-border/40 transition-all duration-500 cursor-pointer group-hover:border-orange-500/30 group-hover:shadow-xl group-hover:shadow-black/20`}>
                                            <SafeImage
                                                src={project.thumbnail}
                                                alt={project.title}
                                                aspectRatio="portrait"
                                                loading={i < 6 ? "eager" : "lazy"}
                                                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                                            />

                                            {/* Gradient overlay */}
                                            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                                            {/* Category chip */}
                                            <div className="absolute top-5 left-5">
                                                <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-black/70 backdrop-blur-md border border-white/10 text-white rounded-full text-[10px] uppercase font-bold tracking-widest">
                                                    <Icon className="w-3 h-3 text-orange-400" />
                                                    {project.category}
                                                </span>
                                            </div>

                                            {/* Arrow */}
                                            <div className="absolute top-5 right-5 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-2 group-hover:translate-y-0">
                                                <div className="w-9 h-9 rounded-full bg-white text-black flex items-center justify-center shadow-xl">
                                                    <ArrowUpRight className="w-4 h-4" />
                                                </div>
                                            </div>

                                            {/* Title slide up */}
                                            <div className="absolute bottom-0 left-0 right-0 p-6 translate-y-3 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-400">
                                                <h3 className="text-xl font-display font-bold text-white leading-tight mb-1">{project.title}</h3>
                                                <p className="text-sm text-white/60 font-light line-clamp-1">{project.description}</p>
                                            </div>
                                        </div>
                                    </Link>
                                </motion.div>
                            );
                        })}
                    </div>
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
