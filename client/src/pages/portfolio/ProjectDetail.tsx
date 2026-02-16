import { useRoute, Link } from "wouter";
import { motion } from "framer-motion";
import { getProjectBySlug, getRelatedProjects } from "@/data/projects";
import { ArrowLeft, ArrowUpRight, Calendar, User, Wrench, CheckCircle2 } from "lucide-react";
import NotFound from "../NotFound";

export default function ProjectDetail() {
    const [, params] = useRoute("/portfolio/:category/:slug");

    if (!params) return <NotFound />;

    const project = getProjectBySlug(params.slug);

    if (!project) return <NotFound />;

    const relatedProjects = getRelatedProjects(project.id);

    return (
        <div className="min-h-screen bg-background pt-32 pb-20">
            <div className="container px-4 md:px-8 max-w-[1200px] mx-auto">

                {/* Back Button */}
                <Link href="/portfolio">
                    <a className="inline-flex items-center gap-2 text-muted-foreground hover:text-white transition-colors mb-8">
                        <ArrowLeft className="w-4 h-4" />
                        <span className="text-sm font-medium">Back to Portfolio</span>
                    </a>
                </Link>

                {/* Hero Section */}
                <div className="mb-16">
                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-5xl md:text-7xl font-display font-bold tracking-tighter mb-6 uppercase"
                    >
                        {project.title}
                    </motion.h1>
                    <p className="text-xl text-muted-foreground font-light leading-relaxed max-w-3xl">
                        {project.description}
                    </p>
                </div>

                {/* Hero Visual */}
                <div className="relative aspect-video rounded-3xl overflow-hidden mb-16 border border-white/10">
                    {project.videoUrl ? (
                        <video
                            src={project.videoUrl}
                            controls
                            className="w-full h-full object-cover"
                            poster={project.thumbnail}
                        />
                    ) : (
                        <img
                            src={project.thumbnail}
                            alt={project.title}
                            className="w-full h-full object-cover"
                        />
                    )}
                </div>

                {/* Project Info Grid */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-16 p-8 rounded-3xl bg-white/5 border border-white/10">
                    {project.client && (
                        <div>
                            <div className="flex items-center gap-2 text-orange-500 mb-2">
                                <User className="w-4 h-4" />
                                <span className="text-xs uppercase font-bold tracking-widest">Client</span>
                            </div>
                            <p className="text-white font-medium">{project.client}</p>
                        </div>
                    )}
                    {project.role && (
                        <div>
                            <div className="flex items-center gap-2 text-orange-500 mb-2">
                                <CheckCircle2 className="w-4 h-4" />
                                <span className="text-xs uppercase font-bold tracking-widest">Role</span>
                            </div>
                            <p className="text-white font-medium">{project.role}</p>
                        </div>
                    )}
                    {project.date && (
                        <div>
                            <div className="flex items-center gap-2 text-orange-500 mb-2">
                                <Calendar className="w-4 h-4" />
                                <span className="text-xs uppercase font-bold tracking-widest">Date</span>
                            </div>
                            <p className="text-white font-medium">{project.date}</p>
                        </div>
                    )}
                    {project.tools && project.tools.length > 0 && (
                        <div>
                            <div className="flex items-center gap-2 text-orange-500 mb-2">
                                <Wrench className="w-4 h-4" />
                                <span className="text-xs uppercase font-bold tracking-widest">Tools</span>
                            </div>
                            <p className="text-white font-medium">{project.tools.join(", ")}</p>
                        </div>
                    )}
                </div>

                {/* Challenge, Solution, Outcome */}
                {(project.challenge || project.solution || project.outcome) && (
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
                        {project.challenge && (
                            <div className="p-8 rounded-3xl bg-white/5 border border-white/10">
                                <h3 className="text-xs uppercase font-bold tracking-widest text-orange-500 mb-4">Challenge</h3>
                                <p className="text-muted-foreground font-light leading-relaxed">{project.challenge}</p>
                            </div>
                        )}
                        {project.solution && (
                            <div className="p-8 rounded-3xl bg-white/5 border border-white/10">
                                <h3 className="text-xs uppercase font-bold tracking-widest text-orange-500 mb-4">Solution</h3>
                                <p className="text-muted-foreground font-light leading-relaxed">{project.solution}</p>
                            </div>
                        )}
                        {project.outcome && (
                            <div className="p-8 rounded-3xl bg-white/5 border border-white/10">
                                <h3 className="text-xs uppercase font-bold tracking-widest text-orange-500 mb-4">Outcome</h3>
                                <p className="text-muted-foreground font-light leading-relaxed">{project.outcome}</p>
                            </div>
                        )}
                    </div>
                )}

                {/* Process */}
                {project.process && project.process.length > 0 && (
                    <div className="mb-16">
                        <h2 className="text-3xl font-display font-bold mb-8 uppercase tracking-tighter">Process</h2>
                        <div className="space-y-4">
                            {project.process.map((step, index) => (
                                <div key={index} className="flex gap-4 items-start p-6 rounded-2xl bg-white/5 border border-white/10">
                                    <div className="w-8 h-8 rounded-full bg-orange-500 text-white flex items-center justify-center font-bold text-sm flex-shrink-0">
                                        {index + 1}
                                    </div>
                                    <p className="text-muted-foreground font-light pt-1">{step}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {/* Metrics */}
                {project.metrics && project.metrics.length > 0 && (
                    <div className="mb-16">
                        <h2 className="text-3xl font-display font-bold mb-8 uppercase tracking-tighter">Key Metrics</h2>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            {project.metrics.map((metric, index) => (
                                <div key={index} className="p-8 rounded-3xl bg-orange-500/10 border border-orange-500/20 text-center">
                                    <div className="text-4xl font-display font-bold text-orange-500 mb-2">{metric.value}</div>
                                    <div className="text-sm text-muted-foreground uppercase tracking-widest">{metric.label}</div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {/* Additional Images */}
                {project.images && project.images.length > 0 && (
                    <div className="mb-16">
                        <h2 className="text-3xl font-display font-bold mb-8 uppercase tracking-tighter">Gallery</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {project.images.map((image, index) => (
                                <div key={index} className="aspect-video rounded-2xl overflow-hidden border border-white/10">
                                    <img src={image} alt={`${project.title} - ${index + 1}`} className="w-full h-full object-cover" />
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {/* Related Projects */}
                {relatedProjects.length > 0 && (
                    <div>
                        <h2 className="text-3xl font-display font-bold mb-8 uppercase tracking-tighter">Related Projects</h2>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            {relatedProjects.map((related) => (
                                <Link key={related.id} href={`/portfolio/${related.category}/${related.slug}`}>
                                    <a className="group block">
                                        <div className="relative aspect-[4/5] rounded-2xl overflow-hidden mb-4 border border-white/10 group-hover:border-orange-500/30 transition-colors">
                                            <img
                                                src={related.thumbnail}
                                                alt={related.title}
                                                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                            />
                                            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors" />
                                            <div className="absolute top-4 right-4 w-8 h-8 rounded-full bg-white text-black flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                                                <ArrowUpRight className="w-4 h-4" />
                                            </div>
                                        </div>
                                        <h3 className="text-lg font-display font-bold mb-1">{related.title}</h3>
                                        <p className="text-sm text-muted-foreground">{related.subcategory}</p>
                                    </a>
                                </Link>
                            ))}
                        </div>
                    </div>
                )}

                {/* CTA */}
                <div className="mt-20 text-center p-16 rounded-3xl bg-foreground text-background">
                    <h2 className="text-4xl font-display font-bold mb-6 uppercase tracking-tighter">Ready to start your project?</h2>
                    <p className="text-xl text-background/80 font-light mb-8 max-w-2xl mx-auto">
                        Let's discuss how we can create something exceptional together.
                    </p>
                    <Link href="/contact">
                        <a className="inline-flex items-center gap-2 px-12 py-5 bg-background text-foreground rounded-full font-bold hover:scale-105 transition-transform shadow-2xl">
                            Get in Touch
                            <ArrowUpRight className="w-5 h-5" />
                        </a>
                    </Link>
                </div>

            </div>
        </div>
    );
}
