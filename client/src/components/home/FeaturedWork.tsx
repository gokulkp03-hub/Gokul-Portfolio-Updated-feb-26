import { motion } from "framer-motion";
import { Link } from "wouter";
import { ArrowUpRight } from "lucide-react";
import { videoProjects } from "@/data/video";
import { photoProjects } from "@/data/photo";
import { marketingCampaigns } from "@/data/marketing";

export function FeaturedWork() {
    // Select featured items from each category
    const featuredVideos = videoProjects.filter(v => v.featured).slice(0, 2);
    const featuredPhotos = photoProjects.filter(p => p.featured).slice(0, 2);
    const featuredMarketing = marketingCampaigns.filter(m => m.featured).slice(0, 2);

    const featuredItems = [
        ...featuredVideos.map(v => ({
            id: v.id,
            title: v.title,
            image: v.thumbnail,
            category: "Video",
            path: "/video",
            tags: [v.category]
        })),
        ...featuredPhotos.map(p => ({
            id: p.id,
            title: p.title,
            image: p.image,
            category: "Photo",
            path: "/photo",
            tags: [p.category]
        })),
        ...featuredMarketing.map(m => ({
            id: m.id,
            title: m.title,
            image: m.visuals[0],
            category: "Marketing",
            path: "/marketing",
            tags: [m.industry]
        }))
    ].sort(() => Math.random() - 0.5).slice(0, 6); // Mix and show 6

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredItems.map((item, i) => (
                <Link key={item.id} href={item.path}>
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: "-50px" }}
                        transition={{ delay: i * 0.1, duration: 0.5 }}
                        className="group cursor-pointer"
                    >
                        <div className="relative aspect-[4/5] overflow-hidden rounded-2xl mb-6 bg-muted border border-border/40 transition-colors group-hover:border-primary/30">
                            <img
                                src={item.image}
                                alt={item.title}
                                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                                loading="lazy"
                            />
                            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300" />

                            {/* Floating Category Tag */}
                            <div className="absolute top-4 left-4">
                                <span className="text-[10px] font-bold uppercase tracking-widest px-2 py-1 rounded bg-black/60 backdrop-blur-md text-white border border-white/10">
                                    {item.category}
                                </span>
                            </div>

                            {/* Hover Reveal Button */}
                            <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300 transform translate-y-2 group-hover:translate-y-0">
                                <div className="w-8 h-8 rounded-full bg-white text-black flex items-center justify-center shadow-lg">
                                    <ArrowUpRight className="w-4 h-4" />
                                </div>
                            </div>
                        </div>

                        <h3 className="text-xl font-display font-medium mb-1 group-hover:text-primary transition-colors">{item.title}</h3>
                        <p className="text-sm text-muted-foreground line-clamp-1 opacity-60 group-hover:opacity-100 transition-opacity">
                            {item.tags[0]} • View Project
                        </p>
                    </motion.div>
                </Link>
            ))}
        </div>
    );
}
