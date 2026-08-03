import { motion } from "framer-motion";
import { proof } from "@/data/proof";
import { useRef } from "react";
import { MorphBlob } from "@/components/ui/MorphBlob";
import { AnimatedCounter } from "@/components/ui/AnimatedCounter";

export function ProofStrip() {
    const sectionRef = useRef<HTMLDivElement>(null);

    return (
        <section ref={sectionRef} className="py-24 border-y border-border/20 bg-zinc-950 relative overflow-hidden">
            <div className="container relative z-10">
                <div className="mb-14 text-center">
                    <span className="text-xs font-bold uppercase tracking-[0.4em] text-orange-500 mb-3 block">Proven Track Record</span>
                    <h2 className="text-3xl md:text-5xl font-display font-bold uppercase tracking-tight text-white">TRUSTED BY LEADING BRANDS</h2>
                </div>

                {/* High-Contrast Logo Marquee */}
                <div className="marquee-container mb-20 overflow-hidden py-4">
                    <div className="animate-marquee flex items-center gap-6">
                        {[...proof.logos, ...proof.logos, ...proof.logos].map((logo, i) => (
                            <div 
                                key={`logo-${i}`} 
                                className="flex-shrink-0 bg-zinc-900/80 border border-zinc-800/80 hover:border-orange-500/40 px-6 py-3.5 rounded-2xl flex items-center justify-center gap-3 transition-all duration-300 group shadow-md"
                            >
                                <img 
                                    src={logo.src} 
                                    alt={logo.name} 
                                    className="h-7 w-auto max-w-[110px] object-contain filter brightness-110 contrast-125 transition-transform group-hover:scale-105" 
                                    onError={(e) => { e.currentTarget.style.display = 'none'; }} 
                                />
                                <span className="text-xs font-semibold text-zinc-300 tracking-tight group-hover:text-white transition-colors">{logo.name}</span>
                            </div>
                        ))}
                    </div>
                </div>

                <MorphBlob color="orange-500" size={600} opacity={0.04} blur={120} className="left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2" animDuration={14} />

                {/* Command Center Stats Dashboard Card */}
                <div className="max-w-5xl mx-auto rounded-[2.5rem] bg-gradient-to-b from-zinc-900/90 to-zinc-950/90 border border-zinc-800/80 p-8 md:p-12 shadow-2xl relative overflow-hidden backdrop-blur-xl">
                    <div className="absolute top-0 right-0 w-96 h-96 bg-orange-500/10 blur-[100px] rounded-full pointer-events-none" />
                    
                    <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-10 pb-6 border-b border-zinc-800/60">
                        <div className="flex items-center gap-3">
                            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse shadow-lg shadow-emerald-500/50" />
                            <span className="text-xs font-bold uppercase tracking-[0.2em] text-zinc-300">Verified GCC Growth Benchmarks</span>
                        </div>
                        <span className="text-[11px] font-medium text-zinc-500 tracking-wider">Meta Ads & Paid Acquisition</span>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-6 relative z-10">
                        {proof.metrics.map((metric, i) => {
                            const numericValue = parseFloat(metric.value);
                            const isDecimals = metric.value.includes('.');
                            return (
                                <div key={i} className="flex flex-col items-center md:items-start text-center md:text-left p-4 rounded-2xl bg-zinc-900/40 border border-zinc-800/40 hover:border-orange-500/30 transition-colors">
                                    <motion.div
                                        initial={{ opacity: 0, scale: 0.9 }}
                                        whileInView={{ opacity: 1, scale: 1 }}
                                        transition={{ delay: i * 0.1, duration: 0.5 }}
                                        viewport={{ once: true }}
                                        className="text-3xl sm:text-4xl md:text-5xl font-display font-black mb-2 text-white tracking-tighter tabular-nums"
                                    >
                                        <AnimatedCounter 
                                            to={numericValue} 
                                            prefix={metric.prefix} 
                                            suffix={metric.suffix} 
                                            decimals={isDecimals ? 2 : 0} 
                                        />
                                    </motion.div>
                                    <div className="text-[11px] font-bold uppercase tracking-[0.2em] text-orange-400/90">
                                        {metric.label}
                                    </div>
                                </div>
                            );
                        })}
                    </div>

                    <div className="text-center md:text-left text-[11px] text-zinc-500 italic mt-8 pt-6 border-t border-zinc-800/60">
                        * Aggregated performance data verified across Meta Ads Manager accounts (UAE & Oman).
                    </div>
                </div>
            </div>
        </section>
    );
}
