import { motion } from "framer-motion";
import { proof } from "@/data/proof";
import { useRef } from "react";
import { MorphBlob } from "@/components/ui/MorphBlob";
import { AnimatedCounter } from "@/components/ui/AnimatedCounter";

export function ProofStrip() {
    const sectionRef = useRef<HTMLDivElement>(null);
    
    // Split logos into two rows
    const row1Logos = proof.logos.slice(0, 4);
    const row2Logos = proof.logos.slice(4, 8);

    return (
        <section ref={sectionRef} className="py-24 border-y border-border/40 bg-muted/10 relative overflow-hidden">
            <div className="container">
                <div className="mb-12 text-center max-w-3xl mx-auto">
                    <span className="text-xs font-bold uppercase tracking-[0.4em] text-orange-500 mb-4 block">Proven Track Record</span>
                    <h2 className="text-3xl md:text-5xl font-display font-bold uppercase tracking-tight mb-4">TRUSTED BY LEADING BRANDS</h2>
                    <p className="text-muted-foreground text-sm md:text-base font-light">
                        Selected brands and campaigns I've helped grow across the GCC.
                    </p>
                </div>

                {/* Brands Grid Panel */}
                <div className="bg-zinc-900/40 rounded-3xl p-8 md:p-12 border border-white/5 shadow-2xl backdrop-blur-sm max-w-5xl mx-auto mb-20 relative z-10">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-x-8 gap-y-12 items-center justify-items-center">
                        {proof.logos.map((logo, i) => (
                            <div key={`brand-${i}`} className="flex items-center justify-center pointer-events-auto">
                                <img 
                                    src={logo.src} 
                                    alt={`${logo.name} logo`} 
                                    className="h-10 md:h-12 w-auto object-contain grayscale opacity-60 hover:opacity-100 hover:grayscale-0 transition-all duration-500" 
                                    onError={(e) => { e.currentTarget.style.display = 'none'; }} 
                                />
                            </div>
                        ))}
                    </div>
                </div>

                <MorphBlob color="orange-500" size={500} opacity={0.03} blur={100} className="left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2" animDuration={14} />

                {/* Animated Metrics */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12 max-w-6xl mx-auto relative z-10 mb-12">
                    {proof.metrics.map((metric, i) => {
                        const numericValue = parseFloat(metric.value);
                        const isDecimals = metric.value.includes('.');
                        return (
                            <div key={i} className="flex flex-col items-center text-center">
                                <motion.div
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    whileInView={{ opacity: 1, scale: 1 }}
                                    transition={{ delay: i * 0.1, duration: 0.5 }}
                                    viewport={{ once: true }}
                                    className="text-4xl md:text-6xl font-display font-black mb-3 text-foreground tracking-tighter min-w-[120px] text-center tabular-nums"
                                >
                                    <AnimatedCounter 
                                        to={numericValue} 
                                        prefix={metric.prefix} 
                                        suffix={metric.suffix} 
                                        decimals={isDecimals ? 2 : 0} 
                                    />
                                </motion.div>
                                <div className="text-xs font-bold uppercase tracking-[0.25em] text-muted-foreground text-center">
                                    {metric.label}
                                </div>
                            </div>
                        );
                    })}
                </div>

                {/* Citation Footnote */}
                <div className="text-center text-[10px] text-muted-foreground/60 italic mt-8 border-t border-border/20 pt-6 max-w-2xl mx-auto relative z-10">
                    * Campaign metrics are tracked and verified via Meta Ads Manager dashboards for active client campaigns in the GCC region (Oct 2025 – Present).
                </div>
            </div>
        </section>
    );
}
