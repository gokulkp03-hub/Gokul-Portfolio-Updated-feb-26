import { motion } from "framer-motion";
import { Link } from "wouter";
import { ArrowRight, TrendingUp, Users, Target } from "lucide-react";
import { marketingCampaigns } from "@/data/marketing";

export function GrowthEngine() {
    // Select the key case studies for the homepage
    const keyCaseStudies = marketingCampaigns.filter(c =>
        ["prepmeal-launch", "beyondcars-lead-engine", "sias-group-b2b", "steaburg-local-seo"].includes(c.slug)
    );

    return (
        <section className="py-32">
            <div className="container px-4 md:px-8 max-w-[1400px] mx-auto">
                <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
                    <div className="max-w-2xl">
                        <h2 className="text-4xl md:text-6xl font-display font-bold mb-6 tracking-tight italic text-orange-500">Growth Engine</h2>
                        <p className="text-muted-foreground text-xl font-light">
                            Real metrics. Real growth. How I transform traditional brands into digital-first market leaders.
                        </p>
                    </div>
                    <Link href="/marketing">
                        <a className="btn-outline rounded-full px-8 py-4 text-base hidden md:inline-flex">View All Case Studies</a>
                    </Link>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {keyCaseStudies.map((study, i) => (
                        <Link key={study.id} href={`/marketing/${study.slug}`}>
                            <motion.div
                                initial={{ opacity: 0, scale: 0.95 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.1, duration: 0.6 }}
                                className="group relative glass-card p-8 md:p-12 border border-white/5 hover:border-orange-500/30 transition-all cursor-pointer overflow-hidden"
                            >
                                {/* Background Accent */}
                                <div className="absolute top-0 right-0 w-32 h-32 bg-orange-500/5 blur-3xl group-hover:bg-orange-500/10 transition-colors" />

                                <div className="relative z-10">
                                    <div className="flex items-center gap-3 mb-6">
                                        <span className="text-[10px] font-bold uppercase tracking-[0.2em] px-3 py-1 bg-white/5 border border-white/10 rounded-full text-white/50">
                                            {study.industry}
                                        </span>
                                    </div>

                                    <h3 className="text-3xl font-display font-bold mb-4 group-hover:text-orange-500 transition-colors leading-tight">
                                        {study.headline}
                                    </h3>

                                    <p className="text-muted-foreground mb-8 line-clamp-2 font-light">
                                        {study.description}
                                    </p>

                                    <div className="grid grid-cols-3 gap-4 mb-8 pt-8 border-t border-white/5">
                                        {study.metrics.slice(0, 3).map((metric, mi) => (
                                            <div key={mi}>
                                                <div className="text-xl md:text-2xl font-display font-bold text-white mb-1">
                                                    {metric.value}
                                                </div>
                                                <div className="text-[10px] uppercase tracking-wider text-muted-foreground">
                                                    {metric.label}
                                                </div>
                                            </div>
                                        ))}
                                    </div>

                                    <div className="flex items-center gap-2 text-orange-500 font-medium group/btn">
                                        <span>Full Case Study</span>
                                        <ArrowRight className="w-4 h-4 transition-transform group-hover/btn:translate-x-1" />
                                    </div>
                                </div>
                            </motion.div>
                        </Link>
                    ))}
                </div>
            </div>
        </section>
    );
}
