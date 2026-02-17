import { motion } from "framer-motion";
import { proof } from "@/data/proof";
import { marketingCampaigns } from "@/data/marketing";
import { TrendingUp, Users, Target, BarChart3, PieChart, ArrowUpRight } from "lucide-react";

export default function Results() {
    return (
        <div className="min-h-screen bg-background pt-24 md:pt-32 pb-20">
            <div className="container px-4 md:px-8 max-w-[1400px] mx-auto">
                {/* Header */}
                <div className="mb-16 md:mb-20">
                    <h1 className="text-5xl sm:text-7xl md:text-9xl font-display font-bold tracking-tighter mb-6 md:mb-8 uppercase italic">
                        The <span className="text-orange-500">Proof</span>.
                    </h1>
                    <p className="text-lg md:text-3xl text-muted-foreground max-w-3xl font-light leading-relaxed">
                        Concrete evidence of growth. From hyper-local SEO dominance to
                        optimizing professional B2B pipelines.
                    </p>
                </div>

                {/* Metrics Grid */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-32">
                    {proof.metrics.map((metric, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.1 }}
                            className="glass-card p-8 border border-white/5"
                        >
                            <div className="text-3xl md:text-6xl font-display font-bold text-white mb-2">
                                {metric.prefix}{metric.value}{metric.suffix}
                            </div>
                            <div className="text-xs uppercase tracking-[0.2em] text-orange-500 font-bold">
                                {metric.label}
                            </div>
                        </motion.div>
                    ))}
                </div>

                {/* Visual Wall of Wins */}
                <div className="space-y-32">
                    {marketingCampaigns.map((camp, i) => (
                        <div key={camp.id} className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                            <motion.div
                                initial={{ opacity: 0, x: i % 2 === 0 ? -30 : 30 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                className={i % 2 === 0 ? "order-1" : "order-1 lg:order-2"}
                            >
                                <div className="flex items-center gap-3 mb-6">
                                    <span className="px-3 py-1 bg-orange-500/10 border border-orange-500/20 text-orange-500 rounded-full text-[10px] font-bold uppercase tracking-widest">
                                        {camp.client}
                                    </span>
                                    <span className="text-muted-foreground text-sm font-light italic">
                                        {camp.industry}
                                    </span>
                                </div>
                                <h2 className="text-3xl sm:text-4xl md:text-6xl font-display font-bold mb-6 md:mb-8 leading-tight">
                                    {camp.headline}
                                </h2>
                                <p className="text-lg text-muted-foreground mb-12 font-light leading-relaxed">
                                    {camp.description}
                                </p>

                                <div className="grid grid-cols-2 gap-8 mb-12">
                                    {camp.metrics.map((m, mi) => (
                                        <div key={mi} className="border-l-2 border-orange-500/30 pl-6">
                                            <div className="text-3xl font-display font-bold text-white mb-1">
                                                {m.value}
                                            </div>
                                            <div className="text-xs uppercase tracking-wider text-muted-foreground">
                                                {m.label}
                                            </div>
                                        </div>
                                    ))}
                                </div>

                                <Link href={`/marketing/${camp.slug}`}>
                                    <a className="btn bg-white text-black px-8 py-4 rounded-full font-bold group inline-flex items-center gap-2">
                                        View Strategy
                                        <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                                    </a>
                                </Link>
                            </motion.div>

                            <motion.div
                                initial={{ opacity: 0, scale: 0.9 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                viewport={{ once: true }}
                                className={i % 2 === 0 ? "order-2" : "order-2 lg:order-1"}
                            >
                                <div className="relative aspect-[16/10] rounded-3xl overflow-hidden border border-white/10 group">
                                    <img
                                        src={camp.visuals[0]}
                                        alt={camp.client}
                                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                                    <div className="absolute bottom-8 left-8 right-8">
                                        <p className="text-sm text-white/80 font-light italic">
                                            "{camp.results}"
                                        </p>
                                    </div>
                                </div>
                            </motion.div>
                        </div>
                    ))}
                </div>

                {/* Brands Grid */}
                <div className="mt-48 text-center">
                    <h3 className="text-sm uppercase tracking-[0.4em] text-muted-foreground mb-12">Trusted by 20+ Regional Entities</h3>
                    <div className="flex flex-wrap justify-center gap-8 md:gap-16 opacity-40 grayscale hover:grayscale-0 hover:opacity-100 transition-all duration-500">
                        {proof.logos.map((logo, i) => (
                            <span key={i} className="text-2xl font-display font-bold text-white whitespace-nowrap">
                                {logo}
                            </span>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}

import { Link } from "wouter";
