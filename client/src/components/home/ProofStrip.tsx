import { motion, useInView, animate } from "framer-motion";
import { proof } from "@/data/proof";
import { useEffect, useRef } from "react";
import { MorphBlob } from "@/components/ui/MorphBlob";
import { AnimatedCounter } from "@/components/ui/AnimatedCounter";

export function ProofStrip() {
    return (
        <section className="py-24 border-y border-border/40 bg-muted/10">
            <div className="container overflow-hidden">

                {/* Infinite Scroll Logos */}
                <div className="marquee-container mb-20">
                    <div className="animate-marquee">
                        {[...proof.logos, ...proof.logos].map((logo, i) => (
                            <div key={i} className="flex-shrink-0 mx-8 md:mx-16 opacity-50 hover:opacity-100 transition-opacity grayscale hover:grayscale-0 duration-300">
                                <img src={logo.src} alt={logo.name} className="h-10 md:h-16 w-auto object-contain" />
                            </div>
                        ))}
                    </div>
                </div>

                <MorphBlob color="emerald-500" size={500} opacity={0.05} blur={100} className="left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2" animDuration={14} />

                {/* Animated Metrics */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12 max-w-6xl mx-auto">
                    {proof.metrics.map((metric, i) => {
                        // Parse value to number for animation
                        const numericValue = parseInt(metric.value.replace(/,/g, ''), 10);
                        return (
                            <div key={i} className="flex flex-col items-center text-center">
                                <motion.div
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    whileInView={{ opacity: 1, scale: 1 }}
                                    transition={{ delay: i * 0.1, duration: 0.5 }}
                                    viewport={{ once: true }}
                                    className="text-4xl md:text-7xl font-display font-bold mb-3 text-foreground tracking-tighter min-w-[120px] text-center tabular-nums"
                                >
                                    <AnimatedCounter to={numericValue} prefix={metric.prefix} suffix={metric.suffix} />
                                </motion.div>
                                <div className="text-xs font-bold uppercase tracking-[0.25em] text-muted-foreground text-center">
                                    {metric.label}
                                </div>
                            </div>
                        );
                    })}
                </div>

            </div>
        </section>
    );
}
