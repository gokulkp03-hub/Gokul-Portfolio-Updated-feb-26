import { motion, useMotionValue, useTransform } from "framer-motion";
import { Link } from "wouter";
import { ArrowRight, TrendingUp, Users, Target } from "lucide-react";
import { marketingCampaigns } from "@/data/marketing";
import { MorphBlob } from "@/components/ui/MorphBlob";
import { RevealText } from "@/components/ui/RevealText";
import React from "react";

function TiltCard({ children, className }: { children: React.ReactNode; className?: string }) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useTransform(y, [-100, 100], [4, -4]);
  const rotateY = useTransform(x, [-100, 100], [-4, 4]);

  function onMouseMove(e: React.MouseEvent<HTMLDivElement>) {
    const rect = e.currentTarget.getBoundingClientRect();
    x.set(e.clientX - rect.left - rect.width / 2);
    y.set(e.clientY - rect.top - rect.height / 2);
  }

  return (
    <motion.div
      onMouseMove={onMouseMove}
      onMouseLeave={() => { x.set(0); y.set(0); }}
      style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export function GrowthEngine() {
    // Select the key case studies for the homepage
    const keyCaseStudies = marketingCampaigns.filter(c =>
        ["prepmeal-launch", "beyondcars-lead-engine", "sias-group-marketing-scale", "steaburg-local-seo"].includes(c.slug)
    );

    return (
        <section className="py-32 relative overflow-hidden">
            <MorphBlob color="orange-500" size={600} opacity={0.04} blur={130} className="-right-20 top-1/2 -translate-y-1/2" />
            <div className="container relative z-10 px-4 md:px-8 max-w-[1400px] mx-auto">
                <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
                    <div className="max-w-2xl">
                        <h2 className="text-4xl md:text-6xl font-display font-bold mb-6 tracking-tight">Growth <span className="text-orange-500 italic">Engine</span></h2>
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
                        <TiltCard key={study.id}>
                            <Link href={`/marketing/${study.slug}`}>
                                <motion.div
                                    initial={{ opacity: 0, scale: 0.95 }}
                                    whileInView={{ opacity: 1, scale: 1 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: i * 0.1, duration: 0.6 }}
                                    className="group relative glass-card p-8 md:p-12 border border-border/50 hover:border-orange-500/30 transition-all cursor-pointer overflow-hidden"
                                >
                                {/* Background Case Study Image */}
                                {study.visuals && study.visuals[0] && (
                                    <div className="absolute inset-0 z-0 overflow-hidden">
                                        <img
                                            src={study.visuals[0]}
                                            alt={`${study.client} Preview`}
                                            className="w-full h-full object-cover opacity-15 group-hover:opacity-30 group-hover:scale-105 transition-all duration-700"
                                            loading="lazy"
                                            onError={(e) => {
                                                e.currentTarget.src = "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=2426&auto=format&fit=crop";
                                            }}
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/90 to-black/40" />
                                    </div>
                                )}

                                {/* Background Accent */}
                                <div className="absolute top-0 right-0 w-32 h-32 bg-orange-500/5 blur-3xl group-hover:bg-orange-500/10 transition-colors z-0" />

                                <div className="relative z-10">
                                    <div className="flex items-center gap-3 mb-6">
                                        <span className="text-[10px] font-bold uppercase tracking-[0.2em] px-3 py-1 bg-muted/30 border border-border/50 rounded-full text-muted-foreground">
                                            {study.industry}
                                        </span>
                                    </div>

                                    <h3 className="text-3xl font-display font-bold mb-4 group-hover:text-orange-500 transition-colors leading-tight">
                                        {study.headline}
                                    </h3>

                                    <p className="text-muted-foreground mb-8 line-clamp-2 font-light">
                                        {study.description}
                                    </p>

                                    <div className="grid grid-cols-3 gap-4 mb-8 pt-8 border-t border-border/50">
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
                        </TiltCard>
                    ))}
                </div>
            </div>
        </section>
    );
}
