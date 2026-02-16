import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { videoProjects } from "@/data/video";
import { photoProjects } from "@/data/photo";
import { marketingCampaigns } from "@/data/marketing";
import { ArrowUpRight, Filter, Play, Camera, TrendingUp } from "lucide-react";
import { Link } from "wouter";
import { cn } from "@/lib/utils";

type ProjectType = "All" | "Video" | "Photo" | "Strategy";

export default function Portfolio() {
  const [activeFilter, setActiveFilter] = useState<ProjectType>("All");

  // Unified project list
  const allProjects = [
    ...videoProjects.map(v => ({
      id: v.id,
      title: v.title,
      category: "Video",
      type: "Video",
      image: v.thumbnail,
      path: "/video",
      tags: [v.category]
    })),
    ...photoProjects.map(p => ({
      id: p.id,
      title: p.title,
      category: "Photo",
      type: "Photo",
      image: p.image,
      path: "/photo",
      tags: [p.category]
    })),
    ...marketingCampaigns.map(m => ({
      id: m.id,
      title: m.title,
      category: "Strategy",
      type: "Strategy",
      image: m.visuals[0],
      path: "/marketing",
      tags: [m.industry]
    }))
  ].sort(() => Math.random() - 0.5);

  const filteredProjects = activeFilter === "All"
    ? allProjects
    : allProjects.filter(p => p.type === activeFilter);

  const filters: ProjectType[] = ["All", "Video", "Photo", "Strategy"];

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
              Master <span className="text-orange-500 italic">Gallery</span>
            </motion.h1>
            <p className="text-xl text-muted-foreground font-light leading-relaxed">
              A complete archive of professional work across cinematic video,
              premium photography, and growth-focused marketing.
            </p>
          </div>

          {/* Filter Bar */}
          <div className="flex flex-wrap gap-2 bg-white/5 p-1 rounded-full border border-white/10 backdrop-blur-md">
            {filters.map((f) => (
              <button
                key={f}
                onClick={() => setActiveFilter(f)}
                className={cn(
                  "px-6 py-2 rounded-full text-sm font-medium transition-all",
                  activeFilter === f
                    ? "bg-orange-500 text-white shadow-lg"
                    : "text-muted-foreground hover:text-white"
                )}
              >
                {f}
              </button>
            ))}
          </div>
        </div>

        {/* Projects Grid */}
        <motion.div
          layout
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project, i) => (
              <motion.div
                key={`${project.id}-${project.type}`}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.4 }}
                className="group relative"
              >
                <Link href={project.path}>
                  <div className="relative aspect-[4/5] overflow-hidden rounded-3xl bg-muted border border-border/40 transition-colors cursor-pointer group-hover:border-orange-500/30">
                    <img
                      src={project.image}
                      alt={project.title}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                      loading="lazy"
                    />

                    {/* Overlays */}
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300" />

                    <div className="absolute top-6 left-6 flex flex-col gap-2">
                      <span className="inline-flex items-center gap-2 px-3 py-1 bg-black/60 backdrop-blur-md border border-white/10 text-white rounded-full text-[10px] uppercase font-bold tracking-widest">
                        {project.type === "Video" && <Play className="w-3 h-3 text-orange-500" />}
                        {project.type === "Photo" && <Camera className="w-3 h-3 text-orange-500" />}
                        {project.type === "Strategy" && <TrendingUp className="w-3 h-3 text-orange-500" />}
                        {project.type}
                      </span>
                      <span className="text-[10px] text-white/60 font-medium px-3 uppercase tracking-tighter">
                        {project.tags[0]}
                      </span>
                    </div>

                    <div className="absolute top-6 right-6 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <div className="w-10 h-10 rounded-full bg-white text-black flex items-center justify-center shadow-2xl transform translate-y-2 group-hover:translate-y-0 transition-transform">
                        <ArrowUpRight className="w-5 h-5" />
                      </div>
                    </div>

                    <div className="absolute bottom-0 left-0 right-0 p-8 transform translate-y-4 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-300">
                      <h3 className="text-2xl font-display font-bold text-white mb-2">{project.title}</h3>
                      <p className="text-sm text-white/60 font-light">Explore Case Study</p>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Empty State */}
        {filteredProjects.length === 0 && (
          <div className="text-center py-40">
            <p className="text-xl text-muted-foreground italic">No projects found in this category.</p>
          </div>
        )}

      </div>
    </div>
  );
}
