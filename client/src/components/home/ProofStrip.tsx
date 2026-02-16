import { motion, useInView, animate } from "framer-motion";
import { proof } from "@/data/proof";
import { useEffect, useRef } from "react";

function Counter({ from, to, prefix = "", suffix = "" }: { from: number; to: number; prefix?: string; suffix?: string }) {
    const nodeRef = useRef<HTMLSpanElement>(null);
    const inView = useInView(nodeRef, { once: true, margin: "-50px" });

    useEffect(() => {
        const node = nodeRef.current;
        if (!node || !inView) return;

        const controls = animate(from, to, {
            duration: 2.5,
            ease: "easeOut",
            onUpdate(value) {
                // Round to nearest integer for display, or maintain decimals if needed (here simplified)
                const formatted = Math.floor(value).toLocaleString();
                node.textContent = `${prefix}${formatted}${suffix}`;
            },
        });

        return () => controls.stop();
    }, [from, to, inView, prefix, suffix]);

    return <span ref={nodeRef} className="tabular-nums" />;
}

export function ProofStrip() {
    return (
        <section className="py-24 border-y border-border/40 bg-muted/10">
            <div className="container overflow-hidden">

                {/* Infinite Scroll Logos */}
                <div className="flex flex-nowrap md:justify-center gap-12 md:gap-24 items-center animate-scroll md:animate-none opacity-60 hover:opacity-100 transition-opacity mb-20">
                    {proof.logos.map((logo, i) => (
                        <span key={i} className="text-xl md:text-2xl font-display font-medium text-muted-foreground whitespace-nowrap cursor-default">
                            {logo}
                        </span>
                    ))}
                </div>

                {/* Animated Metrics */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12">
                    {proof.metrics.map((metric, i) => {
                        // Parse value to number for animation
                        const numericValue = parseInt(metric.value.replace(/,/g, ''), 10);
                        return (
                            <div key={i} className="text-center">
                                <motion.div
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    whileInView={{ opacity: 1, scale: 1 }}
                                    transition={{ delay: i * 0.1, duration: 0.5 }}
                                    viewport={{ once: true }}
                                    className="text-4xl md:text-6xl font-display font-bold mb-2 text-foreground tracking-tighter"
                                >
                                    <Counter from={0} to={numericValue} prefix={metric.prefix} suffix={metric.suffix} />
                                </motion.div>
                                <div className="text-sm font-medium uppercase tracking-widest text-muted-foreground">
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
