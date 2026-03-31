import { useRoute, Link } from "wouter";
import { motion } from "framer-motion";
import { ArrowLeft, ArrowUpRight, Calendar, User, Wrench, CheckCircle2, Loader2 } from "lucide-react";
import NotFound from "../NotFound";
import { trpc } from "@/lib/trpc";
import { useMemo } from "react";

interface ProjectDetailProps {
    category?: string;
    slug?: string;
}

export default function ProjectDetail({ category: propCategory, slug: propSlug }: ProjectDetailProps) {
    const [, routeParams] = useRoute("/portfolio/:category/:slug");
    const [, marketingRouteParams] = useRoute("/marketing/:slug");

    const slug = propSlug || routeParams?.slug || marketingRouteParams?.slug;
    
    const { data: project, isLoading, error } = trpc.projects.getBySlug.useQuery(slug as string, {
        enabled: !!slug
    });

    const { data: allProjects } = trpc.projects.list.useQuery(undefined, {
        enabled: !!project
    });

    if (isLoading) {
        return (
            <div className="min-h-screen pt-32 pb-20 flex justify-center">
                <Loader2 className="w-8 h-8 animate-spin text-orange-500" />
            </div>
        );
    }

    if (!project || error) return <NotFound />;

    const category = propCategory || routeParams?.category || project.category;
    
    // Parse JSON fields
    const tags = Array.isArray(project.tags) ? project.tags : JSON.parse(project.tags as string || "[]");
    const tools = Array.isArray(project.tools) ? project.tools : JSON.parse(project.tools as string || "[]");
    const results = Array.isArray(project.results) ? project.results : JSON.parse(project.results as string || "[]");
    const gallery = Array.isArray(project.gallery) ? project.gallery : JSON.parse(project.gallery as string || "[]");

    const relatedProjects = (allProjects as any[])?.filter(p => p.id !== project.id && p.category === project.category).slice(0, 3) || [];

    const formatVideoUrl = (url: string) => {
        if (!url) return "";
        if (url.includes("youtube.com/watch?v=")) {
            return url.replace("watch?v=", "embed/").split("&")[0] + "?autoplay=1&muted=1&loop=1";
        }
        if (url.includes("youtu.be/")) {
            return url.replace("youtu.be/", "youtube.com/embed/") + "?autoplay=1&muted=1&loop=1";
        }
        if (url.includes("vimeo.com/")) {
            return url.replace("vimeo.com/", "player.vimeo.com/video/") + "?autoplay=1&muted=1&loop=1";
        }
        return url;
    };

    return (
        <div className="min-h-screen pt-24 pb-20">
            <div className="container">
                {/* Back Link */}
                <button onClick={() => window.history.back()} className="inline-flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-primary transition-colors mb-12 group cursor-pointer">
                    <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
                    Back to Portfolio
                </button>

                {/* Hero Section */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-20">
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="space-y-6"
                    >
                        <div className="space-y-4">
                            <h4 className="text-primary font-display font-semibold tracking-wider uppercase text-sm">
                                {tags[0] || project.category}
                            </h4>
                            <h1 className="text-4xl md:text-6xl font-display font-bold leading-tight">
                                {project.title}
                            </h1>
                            <p className="text-xl text-muted-foreground leading-relaxed">
                                {project.description || project.summary}
                            </p>
                        </div>

                        {/* Info Grid */}
                        <div className="grid grid-cols-2 gap-8 py-8 border-y border-border/40">
                            <div>
                                <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground mb-2 flex items-center gap-2">
                                    <User className="w-3 h-3 text-primary" /> Client
                                </p>
                                <p className="font-medium">{project.client || "Confidential"}</p>
                            </div>
                            <div>
                                <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground mb-2 flex items-center gap-2">
                                    <Wrench className="w-3 h-3 text-primary" /> Role
                                </p>
                                <p className="font-medium">{tools[0] || "Lead Creative"}</p>
                            </div>
                            <div>
                                <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground mb-2 flex items-center gap-2">
                                    <Calendar className="w-3 h-3 text-primary" /> Date
                                </p>
                                <p className="font-medium">{project.year || new Date().getFullYear()}</p>
                            </div>
                        </div>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="relative aspect-video rounded-3xl overflow-hidden bg-muted shadow-2xl border border-border/40"
                    >
                        {project.videoType !== "none" && (project.videoUrl || project.directVideoUrl) ? (
                            project.videoType === "mp4" ? (
                                <video 
                                    src={project.directVideoUrl || project.videoUrl || undefined} 
                                    autoPlay 
                                    muted 
                                    loop 
                                    playsInline
                                    className="absolute inset-0 w-full h-full object-cover" 
                                />
                            ) : (
                                <iframe
                                    src={formatVideoUrl(project.videoUrl as string)}
                                    className="absolute inset-0 w-full h-full object-cover"
                                    allow="autoplay; fullscreen"
                                    title="Project Preview Video"
                                />
                            )
                        ) : (
                            <img
                                src={project.thumbnail}
                                alt={project.title}
                                className="absolute inset-0 w-full h-full object-cover"
                            />
                        )}
                    </motion.div>
                </div>

                {/* Case Study Story Content */}
                {(project.problem || project.solution || results.length > 0) && (
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-16 mb-24">
                        <div className="lg:col-span-2 space-y-16">
                            {/* Challenge Section */}
                            {project.problem && (
                                <section className="space-y-6">
                                    <h2 className="text-3xl font-display font-bold">The Challenge</h2>
                                    <p className="text-lg text-muted-foreground leading-relaxed whitespace-pre-wrap">
                                        {project.problem}
                                    </p>
                                </section>
                            )}

                            {/* Strategy/Solution Section */}
                            {project.solution && (
                                <section className="space-y-6">
                                    <h2 className="text-3xl font-display font-bold">The Solution</h2>
                                    <p className="text-lg text-muted-foreground leading-relaxed whitespace-pre-wrap">
                                        {project.solution}
                                    </p>
                                </section>
                            )}

                            {/* Execution/Results List Section */}
                            {results.length > 0 && (
                                <section className="space-y-6">
                                    <h2 className="text-3xl font-display font-bold">Execution & Impact</h2>
                                    <ul className="space-y-4">
                                        {results.map((step: string, i: number) => (
                                            <li key={i} className="flex items-start gap-4 text-muted-foreground">
                                                <CheckCircle2 className="w-5 h-5 text-primary shrink-0 mt-1" />
                                                <span>{step}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </section>
                            )}
                        </div>

                        {/* Sidebar Metrics & Visuals */}
                        <div className="space-y-8">
                            {/* Visuals Grid */}
                            {gallery.length > 0 && (
                                <div className="grid grid-cols-2 gap-4">
                                    {gallery.slice(0, 4).map((img: string, i: number) => (
                                        <div key={i} className="aspect-square rounded-2xl overflow-hidden bg-muted border border-border/40">
                                            <img src={img} alt="Visual Proof" className="w-full h-full object-cover hover:scale-110 transition-transform duration-500" />
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>
                )}

                {/* Related Projects */}
                {relatedProjects.length > 0 && (
                    <div className="pt-20 border-t border-border/40">
                        <h2 className="text-3xl font-display font-bold mb-12">Related Projects</h2>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                            {relatedProjects.map((p: any, i: number) => (
                                <Link key={p.id} href={`/portfolio/${p.category}/${p.slug}`}>
                                    <motion.div
                                        initial={{ opacity: 0, y: 20 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        viewport={{ once: true }}
                                        transition={{ delay: i * 0.1 }}
                                        className="group cursor-pointer"
                                    >
                                        <div className="aspect-[4/5] rounded-2xl overflow-hidden mb-4 bg-muted border border-border/40 transition-colors group-hover:border-primary/30">
                                            <img
                                                src={p.thumbnail}
                                                alt={p.title}
                                                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                                            />
                                        </div>
                                        <h3 className="text-lg font-display font-bold group-hover:text-primary transition-colors">{p.title}</h3>
                                        <p className="text-sm text-muted-foreground">{p.category}</p>
                                    </motion.div>
                                </Link>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
