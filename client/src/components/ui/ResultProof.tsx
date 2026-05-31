import { motion } from "framer-motion";
import { TrendingUp, Target, BarChart3, ArrowUpRight, ShieldCheck } from "lucide-react";
import { cn } from "@/lib/utils";

interface ResultStatProps {
    label: string;
    value: string;
    description?: string;
    icon: any;
    delay?: number;
}

function ResultStat({ label, value, description, icon: Icon, delay = 0 }: ResultStatProps) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="p-6 rounded-2xl bg-white/5 border border-white/10 hover:border-orange-500/30 transition-colors group"
        >
            <div className="flex items-center justify-between mb-4">
                <div className="w-10 h-10 rounded-lg bg-orange-500/10 flex items-center justify-center text-orange-500 group-hover:scale-110 transition-transform">
                    <Icon className="w-5 h-5" />
                </div>
                <div className="text-[10px] uppercase tracking-widest text-emerald-500 font-bold bg-emerald-500/10 px-2 py-0.5 rounded">Verified</div>
            </div>
            <div className="text-3xl font-display font-bold text-foreground mb-1 tabular-nums">{value}</div>
            <div className="text-xs uppercase tracking-widest text-muted-foreground font-medium mb-2">{label}</div>
            {description && <p className="text-[11px] text-muted-foreground/60 leading-relaxed font-light">{description}</p>}
        </motion.div>
    );
}

export function ResultProof() {
    const mainStats = [
        { label: "Quarterly Ad Spend", value: "AED 300K+", icon: BarChart3, description: "Directly managed cross-channel budgets across Meta and Google ecosystems." },
        { label: "Validated Conversions", value: "20,000+", icon: Target, description: "High-intent leads and sales attribution through optimized conversion funnels." },
        { label: "Average Campaign ROAS", value: "4.2x", icon: TrendingUp, description: "Consistently delivering high-return performance for regional E-commerce brands." },
        { label: "Content Assets Produced", value: "150+", icon: ShieldCheck, description: "Bespoke ad creatives, from cinematic video to editorial photography." },
    ];

    return (
        <section className="py-24 relative overflow-hidden">
            {/* Background elements */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-orange-500/5 blur-[150px] rounded-full pointer-events-none" />
            
            <div className="container px-4 md:px-8 max-w-[1400px] mx-auto relative z-10">
                <div className="flex flex-col md:flex-row items-end justify-between mb-16 gap-8">
                    <div className="max-w-2xl">
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            className="text-xs uppercase tracking-[0.4em] text-orange-500 font-bold mb-4 flex items-center gap-2"
                        >
                            <span className="w-2 h-2 rounded-full bg-orange-500 animate-pulse" />
                            Live Metrics & Direct Proof
                        </motion.div>
                        <h2 className="text-4xl md:text-6xl lg:text-7xl font-display font-bold tracking-tighter leading-tight uppercase">
                            Results that <span className="text-orange-500 italic">resonate</span>.
                        </h2>
                    </div>
                    <p className="text-muted-foreground text-lg md:text-xl font-light max-w-sm border-l border-border/50 pl-6 mb-2">
                        I bridge the gap between creative storytelling and data-backed growth.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
                    {mainStats.map((stat, i) => (
                        <ResultStat key={i} {...stat} delay={i * 0.1} />
                    ))}
                </div>

                {/* Dashboard-style Showcase */}
                <motion.div 
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.4, duration: 1 }}
                    className="mt-12 rounded-[2.5rem] bg-zinc-950 border border-white/5 overflow-hidden group shadow-2xl"
                >
                    <div className="p-8 md:p-12 border-b border-white/5 flex flex-col md:flex-row md:items-center justify-between gap-6">
                        <div>
                            <h3 className="text-2xl font-display font-bold text-white mb-2 uppercase">Meta Ads Performance Dashboard</h3>
                            <p className="text-white/40 text-sm font-light">Real-time scaling data and ad creative performance metrics.</p>
                        </div>
                        <div className="flex -space-x-2">
                            {[1,2,3,4].map(i => (
                                <div key={i} className="w-8 h-8 rounded-full border-2 border-zinc-950 bg-stone-800 flex items-center justify-center text-[10px] text-zinc-400 font-mono">
                                    0{i}
                                </div>
                            ))}
                        </div>
                    </div>
                    
                    <div className="grid grid-cols-1 lg:grid-cols-12">
                        {/* Placeholder for the screenshot/visualization */}
                        <div className="lg:col-span-8 p-4 md:p-8">
                            <div className="aspect-video rounded-3xl bg-zinc-900 border border-white/5 relative overflow-hidden group/img">
                                <div className="absolute inset-0 bg-gradient-to-br from-orange-500/10 via-transparent to-transparent opacity-0 group-hover/img:opacity-100 transition-opacity duration-700" />
                                <div className="absolute inset-0 flex items-center justify-center">
                                    <div className="text-center group-hover/img:scale-105 transition-transform duration-500">
                                        <div className="w-16 h-16 rounded-full bg-white/5 border border-white/10 flex items-center justify-center mx-auto mb-4 backdrop-blur-md">
                                            <ArrowUpRight className="w-6 h-6 text-white/40" />
                                        </div>
                                        <p className="text-white/30 text-xs uppercase tracking-widest font-bold">Encrypted Meta Reports</p>
                                    </div>
                                </div>
                                <div className="absolute bottom-6 left-6 right-6 flex items-center justify-between">
                                    <div className="px-4 py-2 rounded-full bg-black/40 backdrop-blur-xl border border-white/5 text-[10px] text-orange-500 font-bold uppercase tracking-widest">
                                        Campaign: Scale_Q4_UAE
                                    </div>
                                    <div className="text-[10px] text-white/20 font-mono">HASH: 0x24a...fb12</div>
                                </div>
                            </div>
                        </div>

                        {/* Breakdown Sidebar */}
                        <div className="lg:col-span-4 p-8 md:p-12 bg-white/[0.02] border-l border-white/5 space-y-10">
                            {[
                                { label: "Creative Testing", value: "85%", desc: "Conversion lift through high-end video hooks." },
                                { label: "Scale Velocity", value: "+120%", desc: "Monthly spend increase while maintaining CPA targets." },
                                { label: "Brand Recall", value: "Top Tier", desc: "Premium visual identity consistent across all touchpoints." }
                            ].map((item, i) => (
                                <div key={i} className="space-y-2">
                                    <div className="flex items-center justify-between gap-4">
                                        <span className="text-xs uppercase tracking-widest text-white/40 font-bold">{item.label}</span>
                                        <span className="text-xl font-display font-bold text-orange-500">{item.value}</span>
                                    </div>
                                    <div className="h-1 w-full bg-white/5 rounded-full overflow-hidden">
                                        <motion.div 
                                            initial={{ width: 0 }}
                                            whileInView={{ width: item.value }}
                                            transition={{ duration: 1, delay: 0.6 + i * 0.1 }}
                                            className="h-full bg-orange-500/50"
                                        />
                                    </div>
                                    <p className="text-[10px] text-white/30 font-light">{item.desc}</p>
                                </div>
                            ))}
                            
                            <motion.button
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                                className="w-full py-4 rounded-xl bg-orange-600 text-white font-bold text-sm uppercase tracking-widest shadow-lg shadow-orange-600/20 hover:bg-orange-500 transition-colors flex items-center justify-center gap-2"
                            >
                                <span className="w-2 h-2 bg-white rounded-full animate-ping" />
                                View Full Results Portfolio (PDF)
                            </motion.button>
                        </div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
