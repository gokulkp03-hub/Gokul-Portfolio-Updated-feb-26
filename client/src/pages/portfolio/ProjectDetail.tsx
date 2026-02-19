import { useRoute, Link } from "wouter";
import { motion } from "framer-motion";
import { getProjectBySlug, getRelatedProjects, projects } from "@/data/projects";
import { caseStudies } from "@/data/caseStudies";
import { ArrowLeft, ArrowUpRight, Calendar, User, Wrench, CheckCircle2 } from "lucide-react";
import NotFound from "../NotFound";

interface ProjectDetailProps {
    category?: string;
    slug?: string;
}

export default function ProjectDetail({ category: propCategory, slug: propSlug }: ProjectDetailProps) {
    const [, routeParams] = useRoute("/portfolio/:category/:slug");

    const slug = propSlug || routeParams?.slug;
    const category = propCategory || routeParams?.category;

    if (!slug) return <NotFound />;

    // Support both projects and unified case studies
    const project = projects.find(p => p.slug === slug) || (() => {
        const campaign = caseStudies.find(c => c.slug === slug);
        if (campaign) {
            return {
                id: campaign.id,
                slug: campaign.slug,
                title: campaign.client,
                category: "marketing",
                subcategory: campaign.industry,
                thumbnail: campaign.image,
                description: campaign.headline,
                client: campaign.client,
                role: "Marketing Strategist",
                date: "2024",
                challenge: campaign.challenge,
                strategy: campaign.strategy,
                execution: campaign.execution,
                outcome: campaign.results,
                metrics: campaign.metrics,
                images: campaign.visuals,
                process: campaign.execution,
                isCaseStudy: true
            } as any;
        }
        return undefined;
    })();

    if (!project) return <NotFound />;

    const relatedProjects = getRelatedProjects(project.id);

    return (
        <div className="min-h-screen pt-24 pb-20">
            <div className="container">
                {/* Back Link */}
                <Link href={category === "marketing" || project.category === "marketing" ? "/results" : "/portfolio"}>
                    <a className="inline-flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-primary transition-colors mb-12 group cursor-pointer">
                        <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
                        Back to {category === "marketing" || project.category === "marketing" ? "Results" : "Portfolio"}
                    </a>
                </Link>

                {/* Hero Section */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-20">
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="space-y-6"
                    >
                        <div className="space-y-4">
                            <h4 className="text-primary font-display font-semibold tracking-wider uppercase text-sm">
                                {project.subcategory || project.category}
                            </h4>
                            <h1 className="text-4xl md:text-6xl font-display font-bold leading-tight">
                                {project.title}
                            </h1>
                            <p className="text-xl text-muted-foreground leading-relaxed">
                                {project.description}
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
                                <p className="font-medium">{project.role || "Lead Creative"}</p>
                            </div>
                            <div>
                                <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground mb-2 flex items-center gap-2">
                                    <Calendar className="w-3 h-3 text-primary" /> Date
                                </p>
                                <p className="font-medium">{project.date || "2024"}</p>
                            </div>
                        </div>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="relative aspect-video rounded-3xl overflow-hidden bg-muted shadow-2xl border border-border/40"
                    >
                        {project.videoUrl ? (
                            <iframe
                                src={project.cloudinaryId
                                    ? `https://player.cloudinary.com/embed/?cloud_name=dgmieaf9g&public_id=${project.cloudinaryId}&autoplay=true&muted=true&loop=true`
                                    : project.videoUrl.replace(".mp4", "") + "?autoplay=1&muted=1&loop=1"}
                                className="absolute inset-0 w-full h-full object-cover"
                                allow="autoplay; fullscreen"
                                title="Project Preview Video"
                            />
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
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-16 mb-24">
                    <div className="lg:col-span-2 space-y-16">
                        {/* Challenge Section */}
                        <section className="space-y-6">
                            <h2 className="text-3xl font-display font-bold">The Challenge</h2>
                            <p className="text-lg text-muted-foreground leading-relaxed">
                                {project.challenge}
                            </p>
                        </section>

                        {/* Strategy Section (for campaigns) */}
                        {project.strategy && (
                            <section className="space-y-6">
                                <h2 className="text-3xl font-display font-bold">The Strategy</h2>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    {(project.strategy as string[]).map((step, i) => (
                                        <div key={i} className="p-6 rounded-2xl bg-muted/30 border border-border/40 flex gap-4">
                                            <div className="w-6 h-6 rounded-full bg-primary/10 text-primary flex items-center justify-center text-xs font-bold shrink-0">
                                                {i + 1}
                                            </div>
                                            <p className="text-sm font-medium leading-relaxed">{step}</p>
                                        </div>
                                    ))}
                                </div>
                            </section>
                        )}

                        {/* Execution Section */}
                        {project.process && (
                            <section className="space-y-6">
                                <h2 className="text-3xl font-display font-bold">Execution</h2>
                                <ul className="space-y-4">
                                    {(project.process as string[]).map((step, i) => (
                                        <li key={i} className="flex items-start gap-4 text-muted-foreground">
                                            <CheckCircle2 className="w-5 h-5 text-primary shrink-0 mt-1" />
                                            <span>{step}</span>
                                        </li>
                                    ))}
                                </ul>
                            </section>
                        )}

                        {/* Results Summary */}
                        <section className="space-y-6">
                            <h2 className="text-3xl font-display font-bold text-primary">The Results</h2>
                            <p className="text-xl font-medium leading-relaxed">
                                {project.outcome}
                            </p>
                        </section>
                    </div>

                    {/* Sidebar Metrics & Visuals */}
                    <div className="space-y-8">
                        {project.metrics && project.metrics.length > 0 && (
                            <div className="p-8 rounded-3xl bg-primary text-primary-foreground shadow-xl">
                                <h3 className="text-xl font-display font-bold mb-6">Key Performance</h3>
                                <div className="space-y-6">
                                    {project.metrics.map((metric: any, i: number) => (
                                        <div key={i} className="space-y-1">
                                            <p className="text-3xl font-bold tracking-tight">
                                                {metric.value}
                                            </p>
                                            <p className="text-xs font-bold uppercase tracking-widest opacity-80">
                                                {metric.label}
                                            </p>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Visuals Grid */}
                        <div className="grid grid-cols-2 gap-4">
                            {project.images?.slice(0, 4).map((img: string, i: number) => (
                                <div key={i} className="aspect-square rounded-2xl overflow-hidden bg-muted border border-border/40">
                                    <img src={img} alt="Visual Proof" className="w-full h-full object-cover hover:scale-110 transition-transform duration-500" />
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Related Projects */}
                {relatedProjects.length > 0 && (
                    <div className="pt-20 border-t border-border/40">
                        <h2 className="text-3xl font-display font-bold mb-12">Related Projects</h2>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                            {relatedProjects.map((p, i) => (
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
                                        <p className="text-sm text-muted-foreground">{p.subcategory || p.category}</p>
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
