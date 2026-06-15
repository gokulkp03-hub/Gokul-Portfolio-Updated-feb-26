import { motion, AnimatePresence } from "framer-motion";
import { Play, Camera, ArrowUpRight, X, ChevronRight } from "lucide-react";
import { useState, useRef } from "react";
import { Link } from "wouter";
import { videoProjects } from "@/data/video";
import { photoProjects } from "@/data/photo";
import { cn } from "@/lib/utils";

type Tab = "video" | "photo";

// Pick featured items only
const FEATURED_VIDEOS = videoProjects.filter((v) => v.featured).slice(0, 6);
const FEATURED_PHOTOS = photoProjects.filter((p) => p.featured).slice(0, 6);

export function WorkPreviewStrip() {
  const [activeTab, setActiveTab] = useState<Tab>("video");
  const [lightbox, setLightbox] = useState<{ type: Tab; src: string; title: string; category: string } | null>(null);
  const videoRefs = useRef<Record<string, HTMLVideoElement | null>>({});

  function handleVideoHover(id: string, entering: boolean) {
    const video = videoRefs.current[id];
    if (!video) return;
    if (entering) {
      video.currentTime = 0;
      video.play().catch(() => {});
    } else {
      video.pause();
      video.currentTime = 0;
    }
  }

  const items = activeTab === "video" ? FEATURED_VIDEOS : FEATURED_PHOTOS;

  return (
    <>
      <section className="section overflow-hidden bg-background">
        <div className="container">

          {/* Section Header */}
          <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
            <div>
              <span className="text-[10px] font-bold uppercase tracking-[0.4em] text-orange-500 mb-4 block">Creative Work</span>
              <h2 className="text-4xl md:text-5xl font-display font-bold tracking-tight">
                What I <span className="text-orange-500 italic">Shoot & Edit</span>
              </h2>
            </div>

            {/* Tab Toggle */}
            <div className="flex items-center gap-1 p-1 rounded-full border border-border/40 bg-muted/20 backdrop-blur-sm self-start md:self-auto">
              {(["video", "photo"] as Tab[]).map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={cn(
                    "flex items-center gap-2 px-5 py-2.5 rounded-full text-xs font-semibold uppercase tracking-widest transition-all duration-300 cursor-pointer",
                    activeTab === tab
                      ? "bg-orange-500 text-white shadow-lg shadow-orange-500/20"
                      : "text-muted-foreground hover:text-foreground"
                  )}
                >
                  {tab === "video" ? <Play className="w-3 h-3" /> : <Camera className="w-3 h-3" />}
                  {tab === "video" ? "Videos" : "Photos"}
                </button>
              ))}
            </div>
          </div>

          {/* Grid */}
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
              className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-4"
            >
              {items.map((item, i) => {
                const isVideo = activeTab === "video";
                const src = isVideo ? (item as typeof FEATURED_VIDEOS[0]).thumbnail : (item as typeof FEATURED_PHOTOS[0]).image;
                const videoSrc = isVideo ? (item as typeof FEATURED_VIDEOS[0]).videoUrl : undefined;
                const category = item.category;

                return (
                  <motion.div
                    key={item.id}
                    initial={{ opacity: 0, scale: 0.97 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: i * 0.06, duration: 0.4 }}
                    className={cn(
                      "group relative overflow-hidden rounded-2xl md:rounded-3xl cursor-pointer bg-zinc-900",
                      // First item is tall on desktop
                      i === 0 ? "col-span-2 md:col-span-1 aspect-[16/9] md:aspect-[4/5]" : "aspect-[4/5]"
                    )}
                    onMouseEnter={() => isVideo && videoSrc && handleVideoHover(item.id, true)}
                    onMouseLeave={() => isVideo && videoSrc && handleVideoHover(item.id, false)}
                    onClick={() =>
                      setLightbox({
                        type: activeTab,
                        src: isVideo ? (videoSrc || src) : src,
                        title: item.title,
                        category: String(category),
                      })
                    }
                  >
                    {/* Thumbnail */}
                    <img
                      src={src}
                      alt={item.title}
                      className="absolute inset-0 w-full h-full object-cover opacity-80 group-hover:opacity-60 group-hover:scale-105 transition-all duration-700"
                      loading="lazy"
                      onError={(e) => {
                        e.currentTarget.src =
                          "https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?q=80&w=2342&auto=format&fit=crop";
                      }}
                    />

                    {/* Hover video preview (silent autoplay) */}
                    {isVideo && videoSrc && (
                      <video
                        ref={(el) => { videoRefs.current[item.id] = el; }}
                        src={videoSrc}
                        muted
                        loop
                        playsInline
                        preload="none"
                        className="absolute inset-0 w-full h-full object-cover opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                      />
                    )}

                    {/* Gradient overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-60 group-hover:opacity-90 transition-opacity duration-300" />

                    {/* Category pill */}
                    <div className="absolute top-3 left-3">
                      <span className="text-[9px] font-bold uppercase tracking-[0.25em] px-2.5 py-1 rounded-full bg-black/40 backdrop-blur-md border border-white/10 text-white/70">
                        {category}
                      </span>
                    </div>

                    {/* Play icon for video */}
                    {isVideo && (
                      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 flex items-center justify-center opacity-60 group-hover:opacity-0 transition-opacity duration-300">
                        <Play className="w-4 h-4 text-white fill-white ml-0.5" />
                      </div>
                    )}

                    {/* Bottom info */}
                    <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                      <p className="text-white text-sm font-display font-bold uppercase tracking-tight leading-tight line-clamp-1">
                        {item.title}
                      </p>
                    </div>

                    {/* Expand icon */}
                    <div className="absolute bottom-4 right-4 w-8 h-8 rounded-full bg-orange-500 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 scale-75 group-hover:scale-100 transition-all duration-300 shadow-lg">
                      <ArrowUpRight className="w-3.5 h-3.5" />
                    </div>
                  </motion.div>
                );
              })}
            </motion.div>
          </AnimatePresence>

          {/* View All CTA */}
          <div className="mt-10 flex justify-center">
            <Link href={activeTab === "video" ? "/portfolio/video" : "/portfolio/photo"}>
              <span className="inline-flex items-center gap-2 btn-outline rounded-full px-8 py-4 text-sm font-semibold cursor-pointer group">
                See All {activeTab === "video" ? "Video Work" : "Photography"}
                <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </span>
            </Link>
          </div>
        </div>
      </section>

      {/* Lightbox */}
      <AnimatePresence>
        {lightbox && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[200] flex items-center justify-center p-4 md:p-12"
          >
            <motion.div
              className="absolute inset-0 bg-black/95 backdrop-blur-2xl"
              onClick={() => setLightbox(null)}
            />
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
              className="relative z-10 w-full max-w-4xl"
            >
              {lightbox.type === "video" ? (
                <div className="aspect-video rounded-2xl md:rounded-3xl overflow-hidden bg-black border border-white/10 shadow-2xl">
                  <video
                    src={lightbox.src}
                    controls
                    autoPlay
                    className="w-full h-full object-contain"
                  />
                </div>
              ) : (
                <div className="rounded-2xl md:rounded-3xl overflow-hidden bg-black border border-white/10 shadow-2xl">
                  <img
                    src={lightbox.src}
                    alt={lightbox.title}
                    className="w-full max-h-[80vh] object-contain"
                  />
                </div>
              )}
              <div className="flex justify-between items-center mt-4 px-1">
                <div>
                  <span className="text-[10px] uppercase tracking-[0.3em] text-orange-500 font-bold">{lightbox.category}</span>
                  <h3 className="text-white font-display font-bold text-lg uppercase tracking-tight mt-0.5">{lightbox.title}</h3>
                </div>
                <button
                  onClick={() => setLightbox(null)}
                  className="w-10 h-10 rounded-full bg-white/10 border border-white/10 text-white flex items-center justify-center hover:bg-white/20 transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
