import { trpc } from "@/lib/trpc";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUpRight, Play, X, ExternalLink } from "lucide-react";
import { cn } from "@/lib/utils";
import { useState } from "react";
import { Link } from "wouter";

const categoryAccents: Record<string, string> = {
  video: "text-blue-400 bg-blue-500/10 border-blue-500/20",
  photo: "text-orange-400 bg-orange-500/10 border-orange-500/20",
  marketing: "text-emerald-400 bg-emerald-500/10 border-emerald-500/20",
  ads: "text-purple-400 bg-purple-500/10 border-purple-500/20",
  social: "text-pink-400 bg-pink-500/10 border-pink-500/20",
};

export function FeaturedWork() {
    const { data: dbProjects, isLoading } = trpc.projects.list.useQuery();
    const [selectedItem, setSelectedItem] = useState<any>(null);

    const items = (dbProjects && (dbProjects as any[]).length > 0)
        ? (dbProjects as any[]).filter(p => p.featured).slice(0, 6).map(p => ({
            id: p.id,
            title: p.title,
            image: p.thumbnail,
            category: p.category.toLowerCase(),
            path: `/portfolio/${p.category}/${p.slug}`,
            isVideo: p.category.toLowerCase() === "video" || !!p.videoUrl,
            description: p.description,
            videoUrl: p.videoUrl,
            client: p.client
        }))
        : [];

    if (isLoading) {
        return (
            <div className="grid grid-cols-2 md:grid-cols-12 gap-4 auto-rows-[200px]">
                {[...Array(6)].map((_, i) => (
                    <div key={i} className={cn("bg-muted animate-pulse rounded-2xl",
                        i === 0 ? "col-span-2 md:col-span-8 row-span-2" : "col-span-1 md:col-span-4"
                    )} />
                ))}
            </div>
        );
    }

    const layouts = [
        "col-span-2 md:col-span-8 row-span-2", // One large
        "col-span-1 md:col-span-4 row-span-1",
        "col-span-1 md:col-span-4 row-span-1",
        "col-span-1 md:col-span-4 row-span-1",
        "col-span-1 md:col-span-4 row-span-1",
        "col-span-1 md:col-span-4 row-span-1",
    ];

    return (
        <>
            <div className="grid grid-cols-2 md:grid-cols-12 gap-4 auto-rows-[180px] md:auto-rows-[220px]">
                {items.map((item, i) => {
                    const accent = categoryAccents[item.category] || categoryAccents.photo;
                    return (
                        <motion.div
                            key={item.id}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.1 }}
                            className={layouts[i] || "col-span-1 md:col-span-4"}
                            onClick={() => setSelectedItem(item)}
                        >
                            <div className="group relative w-full h-full overflow-hidden rounded-[2rem] cursor-pointer border border-border/20 hover:border-orange-500/30 transition-all duration-500 bg-zinc-900">
                                <img
                                    src={item.image}
                                    alt={item.title}
                                    className="absolute inset-0 w-full h-full object-cover opacity-80 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent opacity-60" />
                                
                                <div className="absolute top-6 left-6">
                                    <span className={cn("text-[8px] font-bold uppercase tracking-[0.3em] px-3 py-1 rounded-full border backdrop-blur-md", accent)}>
                                        {item.category}
                                    </span>
                                </div>

                                <div className="absolute bottom-8 left-8 right-8">
                                    <h3 className={cn("text-white font-display font-bold leading-tight uppercase tracking-tight", i === 0 ? "text-2xl md:text-3xl" : "text-sm md:text-lg")}>
                                        {item.title}
                                    </h3>
                                    {i === 0 && <p className="text-white/60 text-sm mt-2 font-light line-clamp-1">{item.client}</p>}
                                </div>

                                <div className="absolute bottom-8 right-8 w-12 h-12 rounded-full bg-white/10 backdrop-blur-xl border border-white/10 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all transform translate-y-2 group-hover:translate-y-0">
                                    {item.isVideo ? <Play className="w-5 h-5 text-white fill-current" /> : <ArrowUpRight className="w-5 h-5 text-white" />}
                                </div>
                            </div>
                        </motion.div>
                    );
                })}
            </div>

            {/* Lightbox Shell */}
            <AnimatePresence>
                {selectedItem && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-12 pointer-events-auto"
                    >
                        <motion.div 
                            className="absolute inset-0 bg-black/95 backdrop-blur-2xl"
                            onClick={() => setSelectedItem(null)}
                        />
                        
                        <motion.div
                            initial={{ scale: 0.9, opacity: 0, y: 20 }}
                            animate={{ scale: 1, opacity: 1, y: 0 }}
                            exit={{ scale: 0.9, opacity: 0, y: 20 }}
                            className="relative w-full max-w-6xl aspect-video rounded-[3rem] overflow-hidden bg-zinc-950 border border-white/10 shadow-2xl"
                        >
                            {selectedItem.isVideo ? (
                                <iframe 
                                    src={selectedItem.videoUrl?.replace('vimeo.com', 'player.vimeo.com/video')}
                                    className="w-full h-full"
                                    allow="autoplay; fullscreen; picture-in-picture"
                                    allowFullScreen
                                />
                            ) : (
                                <img src={selectedItem.image} className="w-full h-full object-cover" alt={selectedItem.title} />
                            )}

                            <div className="absolute top-8 right-8 flex gap-4">
                                <Link href={selectedItem.path}>
                                    <button className="w-12 h-12 rounded-full bg-white text-black flex items-center justify-center hover:scale-110 transition-transform">
                                        <ExternalLink className="w-5 h-5" />
                                    </button>
                                </Link>
                                <button 
                                    onClick={() => setSelectedItem(null)}
                                    className="w-12 h-12 rounded-full bg-white/10 backdrop-blur-xl border border-white/10 text-white flex items-center justify-center hover:bg-white/20 transition-colors"
                                >
                                    <X className="w-6 h-6" />
                                </button>
                            </div>

                            <div className="absolute bottom-0 left-0 right-0 p-12 bg-gradient-to-t from-black via-black/80 to-transparent">
                                <span className={cn("text-[10px] font-bold uppercase tracking-[0.4em] mb-4 block", categoryAccents[selectedItem.category])}>
                                    {selectedItem.category} Project
                                </span>
                                <h2 className="text-3xl md:text-5xl font-display font-bold text-white mb-4 uppercase tracking-tighter">
                                    {selectedItem.title}
                                </h2>
                                <p className="text-white/60 text-lg font-light max-w-2xl">{selectedItem.description}</p>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}
