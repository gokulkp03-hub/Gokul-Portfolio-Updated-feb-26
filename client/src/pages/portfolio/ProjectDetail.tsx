import { useRoute, Link, useLocation } from "wouter";
import { motion } from "framer-motion";
import { ArrowLeft, ArrowUpRight, Calendar, User, Wrench, CheckCircle2, Loader2 } from "lucide-react";
import NotFound from "../NotFound";
import { trpc } from "@/lib/trpc";
import { useMemo, useEffect } from "react";
import { projects as staticProjects } from "@/data/projects";
import { marketingCampaigns as staticMarketing } from "@/data/marketing";
import { SEO } from "@/components/SEO";
interface ProjectDetailProps {
    category?: string;
    slug?: string;
}

export default function ProjectDetail({ category: propCategory, slug: propSlug }: ProjectDetailProps) {
    const [, setLocation] = useLocation();
    const [, routeParams] = useRoute("/portfolio/:category/:slug");
    const [, marketingRouteParams] = useRoute("/marketing/:slug");

    const slug = propSlug || routeParams?.slug || marketingRouteParams?.slug;
    
    const { data: dbProject, isLoading, error } = trpc.projects.getBySlug.useQuery(slug as string, {
        enabled: !!slug
    });

    const { data: allProjects } = trpc.projects.list.useQuery(undefined, {
        enabled: !!dbProject
    });

    // Find static project as fallback
    const staticProject = useMemo(() => {
        if (!slug) return null;

        // Search in projects
        const foundProj = staticProjects.find(p => p.slug === slug);
        if (foundProj) {
            return {
                id: foundProj.id,
                title: foundProj.title,
                slug: foundProj.slug,
                category: foundProj.category,
                description: foundProj.description,
                thumbnail: foundProj.thumbnail,
                client: foundProj.client || "Confidential",
                year: foundProj.date ? parseInt(foundProj.date) : new Date().getFullYear(),
                featured: foundProj.featured || false,
                videoUrl: foundProj.videoUrl,
                videoType: foundProj.videoUrl ? "mp4" : "none",
                directVideoUrl: foundProj.videoUrl,
                summary: foundProj.description,
                problem: foundProj.challenge,
                solution: foundProj.solution,
                results: foundProj.outcome ? [foundProj.outcome] : [],
                tools: foundProj.tools || [],
                tags: foundProj.tools || [],
                gallery: foundProj.images || [],
                status: "published",
            };
        }

        // Search in marketingCampaigns
        const foundMarketing = staticMarketing.find(m => m.slug === slug);
        if (foundMarketing) {
            return {
                id: foundMarketing.id,
                title: foundMarketing.title,
                slug: foundMarketing.slug,
                category: "marketing",
                description: foundMarketing.description,
                thumbnail: foundMarketing.visuals[0] || "",
                client: foundMarketing.client,
                year: new Date().getFullYear(),
                featured: foundMarketing.featured || false,
                videoUrl: undefined,
                videoType: "none",
                directVideoUrl: undefined,
                summary: foundMarketing.headline,
                problem: foundMarketing.challenge,
                solution: foundMarketing.strategy.join("\n"),
                results: [foundMarketing.results],
                tools: foundMarketing.tags,
                tags: foundMarketing.tags,
                gallery: foundMarketing.visuals,
                status: "published",
            };
        }

        return null;
    }, [slug]);

    const project = dbProject || staticProject;
    const category = propCategory || routeParams?.category || project?.category || "";

    useEffect(() => {
        const lowerCategory = (category || propCategory || "").toLowerCase();
        if (lowerCategory === "marketing") {
            if (slug === "aqua-care-uae") {
                setLocation("/marketing/aqua-care-uae");
            } else if (slug === "prepmeal" || slug === "prepmeal-launch") {
                setLocation("/marketing/prepmeal");
            }
        }
    }, [slug, category, propCategory, setLocation]);

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

    const projectsList = allProjects && allProjects.length > 0 ? allProjects : mergedStaticProjects;

    // Only show loading if query is loading AND we don't have the static copy either
    if (isLoading && !staticProject) {
        return (
            <div className="min-h-screen pt-32 pb-20 flex justify-center">
                <Loader2 className="w-8 h-8 animate-spin text-orange-500" />
            </div>
        );
    }

    if (!project) return <NotFound />;

    
    // Parse JSON fields
    const tags = Array.isArray(project.tags) ? project.tags : JSON.parse((project.tags as any) || "[]");
    const tools = Array.isArray(project.tools) ? project.tools : JSON.parse((project.tools as any) || "[]");
    const results = Array.isArray(project.results) ? project.results : JSON.parse((project.results as any) || "[]");
    const gallery = Array.isArray(project.gallery) ? project.gallery : JSON.parse((project.gallery as any) || "[]");

    const relatedProjects = (projectsList as any[])?.filter(p => p.id !== project.id && p.category === project.category).slice(0, 3) || [];

    const reportUrl = useMemo(() => {
        const s = slug?.toLowerCase();
        if (s === "sias-group-marketing-scale" || s === "sias-group-b2b") {
            return "/assets/images/brands/SIAS-Group/Sias Group Report.pdf";
        }
        if (s === "steaburg-local-seo" || s === "steaburg-seo") {
            return "/assets/images/case-studies/steaburg/Steaburg Strategy.pdf";
        }
        return null;
    }, [slug]);

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
            <SEO 
                title={`${project.title} | Gokul KP`}
                description={project.description || `Read detailed project study for ${project.title} by Gokul KP.`}
            />
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
                {(project.problem || project.solution || results.length > 0 || reportUrl) && (
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

                            {/* PDF Report Embed Section */}
                            {reportUrl && (
                                <section className="space-y-6">
                                    <h2 className="text-3xl font-display font-bold">Strategy PDF Report</h2>
                                    <div className="aspect-video w-full rounded-3xl overflow-hidden border border-border/40 shadow-2xl relative bg-zinc-950">
                                        <iframe
                                            src={`${reportUrl}#toolbar=0&navpanes=0`}
                                            className="w-full h-full border-0"
                                            title={`${project.title} PDF Report`}
                                        />
                                    </div>
                                    <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-6 rounded-2xl bg-muted/20 border border-border/40">
                                        <div className="text-sm text-muted-foreground">
                                            Having trouble viewing? You can read or download the report directly in full screen.
                                        </div>
                                        <a
                                            href={reportUrl}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="btn-primary rounded-full px-6 py-3 text-sm font-semibold tracking-wide hover:shadow-lg transition-all"
                                        >
                                            Open PDF in New Tab
                                        </a>
                                    </div>
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
                            {/* Visuals Grid - Hidden if PDF is available to keep layout tidy */}
                            {gallery.length > 0 && !reportUrl && (
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
