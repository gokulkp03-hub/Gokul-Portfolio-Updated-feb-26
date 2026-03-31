import { trpc } from "@/lib/trpc";
import { motion } from "framer-motion";
import { Link } from "wouter";
import { ArrowUpRight, Play } from "lucide-react";
import { cn } from "@/lib/utils";

const categoryAccents: Record<string, string> = {
  video: "text-blue-400 bg-blue-500/10 border-blue-500/20",
  photo: "text-orange-400 bg-orange-500/10 border-orange-500/20",
  marketing: "text-emerald-400 bg-emerald-500/10 border-emerald-500/20",
  ads: "text-purple-400 bg-purple-500/10 border-purple-500/20",
  social: "text-pink-400 bg-pink-500/10 border-pink-500/20",
};

export function FeaturedWork() {
    const { data: dbProjects, isLoading } = trpc.projects.list.useQuery();

    const items = (dbProjects && (dbProjects as any[]).length > 0)
        ? (dbProjects as any[]).filter(p => p.featured).slice(0, 5).map(p => ({
            id: p.id,
            title: p.title,
            image: p.thumbnail,
            category: p.category.toLowerCase(),
            path: `/portfolio/${p.category}/${p.slug}`,
            isVideo: p.category.toLowerCase() === "video",
        }))
        : [];

    if (isLoading) {
        return (
            <div className="grid grid-cols-2 md:grid-cols-12 gap-4 auto-rows-[200px]">
                {[...Array(5)].map((_, i) => (
                    <div key={i} className={cn("bg-muted animate-pulse rounded-2xl",
                        i === 0 ? "col-span-2 md:col-span-7 row-span-2" :
                        i === 1 ? "col-span-1 md:col-span-5" :
                        "col-span-1 md:col-span-4"
                    )} />
                ))}
            </div>
        );
    }

    if (items.length === 0) {
        return (
            <div className="text-center py-20 bg-muted/10 border border-dashed border-border/20 rounded-3xl">
                <p className="text-muted-foreground italic">Featured work will appear here once items are published.</p>
            </div>
        );
    }

    // Layout pattern:
    // [0] Large hero: col-span 7, row-span 2
    // [1] Top right: col-span 5, row-span 1
    // [2] Bottom right: col-span 5, row-span 1
    // [3] Bottom left medium: col-span 4, row-span 1
    // [4] Bottom right small: col-span 8, row-span 1
    const layouts = [
        "col-span-2 md:col-span-7 row-span-2",
        "col-span-1 md:col-span-5 row-span-1",
        "col-span-1 md:col-span-5 row-span-1",
        "col-span-1 md:col-span-4 row-span-1",
        "col-span-2 md:col-span-8 row-span-1",
    ];

    return (
        <div className="grid grid-cols-2 md:grid-cols-12 gap-3 md:gap-4 auto-rows-[180px] md:auto-rows-[200px]">
            {items.slice(0, 5).map((item, i) => {
                const accent = categoryAccents[item.category] || categoryAccents.photo;
                
                // Determine direction based on index
                const dirX = i === 0 ? -40 : i === 1 || i === 2 ? 40 : 0;
                const dirY = i >= 3 ? 40 : 0;

                return (
                    <motion.div
                        key={item.id}
                        initial={{ opacity: 0, scale: 0.96, x: dirX, y: dirY }}
                        whileInView={{ opacity: 1, scale: 1, x: 0, y: 0 }}
                        viewport={{ once: true, margin: "-40px" }}
                        transition={{ delay: i * 0.08, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                        className={layouts[i] || "col-span-1 md:col-span-4"}
                    >
                        <Link href={item.path}>
                            <div className="group relative w-full h-full overflow-hidden rounded-2xl cursor-pointer bg-muted border border-border/20 hover:border-border/60 transition-all duration-500">
                                {/* Image */}
                                <img
                                    src={item.image}
                                    alt={item.title}
                                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                                    loading="lazy"
                                />
                                {/* Overlay */}
                                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors duration-300" />

                                {/* Video play indicator */}
                                {item.isVideo && (
                                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                        <div className="w-14 h-14 rounded-full bg-white/20 backdrop-blur-md border border-white/30 flex items-center justify-center">
                                            <Play className="w-5 h-5 text-white fill-current ml-1" />
                                        </div>
                                    </div>
                                )}

                                {/* Category tag — top left */}
                                <div className="absolute top-3 left-3">
                                    <span className={`text-[9px] font-bold uppercase tracking-[0.2em] px-2.5 py-1 rounded-full border backdrop-blur-md ${accent}`}>
                                        {item.category}
                                    </span>
                                </div>

                                {/* Arrow — top right on hover */}
                                <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 translate-y-1 group-hover:translate-y-0 transition-all duration-300">
                                    <div className="w-8 h-8 rounded-full bg-white text-black flex items-center justify-center shadow-lg">
                                        <ArrowUpRight className="w-4 h-4" />
                                    </div>
                                </div>

                                {/* Title — only shows on first (large) item always, others on hover */}
                                <div className={`absolute bottom-0 left-0 right-0 p-5 bg-gradient-to-t from-black/80 to-transparent transition-all duration-300 ${i === 0 ? 'opacity-100' : 'opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0'}`}>
                                    <h3 className="text-white font-display font-bold text-sm md:text-base leading-tight line-clamp-1">
                                        {item.title}
                                    </h3>
                                </div>
                            </div>
                        </Link>
                    </motion.div>
                );
            })}
        </div>
    );
}
