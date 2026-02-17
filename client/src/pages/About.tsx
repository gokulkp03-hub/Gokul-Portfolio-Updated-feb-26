import { motion } from "framer-motion";
import { bio, experiences, skills } from "@/data/about";
import { Coffee, Code, Heart, Trophy, Target, Sparkles, MapPin, ArrowUpRight } from "lucide-react";

export default function About() {
    return (
        <div className="min-h-screen bg-background pt-24 md:pt-32 pb-20">
            <div className="container px-4 md:px-8 max-w-[1400px] mx-auto">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">

                    {/* Sticky Side Info */}
                    <div className="lg:col-span-4 lg:sticky lg:top-32 space-y-8">
                        <div className="relative aspect-[4/5] rounded-[2.5rem] overflow-hidden border border-white/10 group">
                            <img
                                src="/assets/images/profile/profile.webp"
                                alt="Gokul KP"
                                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                                onError={(e) => {
                                    e.currentTarget.src = "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=1974&auto=format&fit=crop";
                                }}
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                            <div className="absolute bottom-8 left-8">
                                <h1 className="text-3xl font-display font-bold text-white mb-2">Gokul KP</h1>
                                <p className="text-orange-500 font-medium uppercase tracking-widest text-xs">Director // Strategist // Creator</p>
                            </div>
                        </div>

                        <div className="space-y-4">
                            <div className="flex items-center gap-3 text-muted-foreground">
                                <MapPin className="w-4 h-4 text-orange-500" />
                                <span className="text-sm font-light">Based in United Arab Emirates</span>
                            </div>
                            <div className="flex items-center gap-3 text-muted-foreground">
                                <Sparkles className="w-4 h-4 text-orange-500" />
                                <span className="text-sm font-light">Operating Globally</span>
                            </div>
                        </div>

                        <div className="p-8 rounded-3xl bg-white/5 border border-white/10">
                            <h3 className="text-xs uppercase tracking-[0.3em] text-muted-foreground mb-6">Tool Stack</h3>
                            <div className="flex flex-wrap gap-2">
                                {["DaVinci Resolve", "After Effects", "Final Cut Pro", "Lightroom", "Meta Ads Manager", "Google Ads", "TikTok Ads"].map(tool => (
                                    <span key={tool} className="px-3 py-1 bg-white/5 border border-white/10 rounded-full text-[10px] text-white/80 whitespace-nowrap">
                                        {tool}
                                    </span>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Main Content */}
                    <div className="lg:col-span-8 space-y-24">

                        {/* Bio Section */}
                        <section>
                            <h2 className="text-sm uppercase tracking-[0.4em] text-orange-500 mb-8">Professional Philosophy</h2>
                            <p className="text-2xl sm:text-3xl md:text-5xl font-display font-bold text-white mb-8 md:mb-12 leading-tight">
                                {bio.description}
                            </p>
                            <div className="prose prose-invert max-w-none text-muted-foreground text-lg font-light leading-relaxed">
                                {bio.longDescription.split('\n\n').map((p, i) => (
                                    <p key={i} className="mb-6">{p}</p>
                                ))}
                            </div>
                        </section>

                        {/* Experience Timeline */}
                        <section>
                            <h2 className="text-sm uppercase tracking-[0.4em] text-orange-500 mb-12">The Journey</h2>
                            <div className="space-y-12">
                                {experiences.map((exp, i) => (
                                    <motion.div
                                        key={i}
                                        initial={{ opacity: 0, x: 20 }}
                                        whileInView={{ opacity: 1, x: 0 }}
                                        viewport={{ once: true }}
                                        className="relative pl-8 border-l border-white/10"
                                    >
                                        <div className="absolute top-0 left-[-5px] w-[9px] h-[9px] bg-orange-500 rounded-full shadow-[0_0_15px_rgba(249,115,22,0.5)]" />
                                        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4">
                                            <div>
                                                <h3 className="text-2xl font-display font-bold text-white uppercase">{exp.position}</h3>
                                                <p className="text-orange-500 font-medium">{exp.company}</p>
                                            </div>
                                            <span className="text-xs uppercase tracking-widest text-muted-foreground bg-white/5 px-4 py-2 rounded-full border border-white/5">
                                                {exp.duration}
                                            </span>
                                        </div>
                                        <p className="text-muted-foreground font-light mb-6">{exp.description}</p>

                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                            <div>
                                                <h4 className="text-[10px] uppercase font-bold tracking-widest text-white/40 mb-3">Key Responsibilities</h4>
                                                <ul className="space-y-2">
                                                    {exp.responsibilities.slice(0, 3).map((r, ri) => (
                                                        <li key={ri} className="text-sm text-muted-foreground flex items-center gap-2">
                                                            <div className="w-1.5 h-1.5 rounded-full bg-orange-500/30" />
                                                            {r}
                                                        </li>
                                                    ))}
                                                </ul>
                                            </div>
                                            <div>
                                                <h4 className="text-[10px] uppercase font-bold tracking-widest text-white/40 mb-3">Primary Impact</h4>
                                                <ul className="space-y-2">
                                                    {exp.achievements.slice(0, 3).map((a, ai) => (
                                                        <li key={ai} className="text-sm text-muted-foreground flex items-center gap-2">
                                                            <div className="w-1.5 h-1.5 rounded-full bg-emerald-500/30" />
                                                            {a}
                                                        </li>
                                                    ))}
                                                </ul>
                                            </div>
                                        </div>
                                    </motion.div>
                                ))}
                            </div>
                        </section>

                        {/* Skills / Stacks */}
                        <section className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            <div className="p-10 rounded-[2.5rem] bg-white/5 border border-white/10 hover:border-orange-500/20 transition-all group">
                                <Target className="w-10 h-10 text-orange-500 mb-8 group-hover:scale-110 transition-transform" />
                                <h3 className="text-2xl font-display font-bold mb-6 uppercase tracking-tighter text-white">Performance Marketing</h3>
                                <div className="space-y-4">
                                    {skills.marketing.map(s => (
                                        <div key={s} className="flex items-center justify-between border-b border-white/5 pb-2">
                                            <span className="text-muted-foreground font-light">{s}</span>
                                            <div className="w-12 h-1 bg-orange-500/20 rounded-full overflow-hidden">
                                                <div className="w-full h-full bg-orange-500" />
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                            <div className="p-10 rounded-[2.5rem] bg-orange-500/5 border border-orange-500/10 hover:border-orange-500/30 transition-all group">
                                <Sparkles className="w-10 h-10 text-orange-500 mb-8 group-hover:scale-110 transition-transform" />
                                <h3 className="text-2xl font-display font-bold mb-6 uppercase tracking-tighter text-white">Creative Production</h3>
                                <div className="space-y-4">
                                    {skills.creative.map(s => (
                                        <div key={s} className="flex items-center justify-between border-b border-white/5 pb-2">
                                            <span className="text-muted-foreground font-light">{s}</span>
                                            <div className="w-12 h-1 bg-orange-500/20 rounded-full overflow-hidden">
                                                <div className="w-full h-full bg-orange-500" />
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </section>

                        {/* Personal CTA */}
                        <section className="bg-foreground text-background rounded-[3rem] p-12 md:p-20 text-center relative overflow-hidden">
                            <div className="relative z-10 max-w-2xl mx-auto">
                                <h2 className="text-4xl md:text-6xl font-display font-bold mb-6 md:mb-8 uppercase tracking-tighter italic">Ready to build the <br /> next chapter?</h2>
                                <p className="text-xl text-background/80 font-light mb-12">Let's discuss how we can scale your brand's presence today.</p>
                                <Link href="/contact">
                                    <a className="btn bg-background text-foreground px-12 py-5 rounded-full font-bold inline-flex items-center gap-2 hover:scale-105 transition-transform shadow-2xl">
                                        Commence Project
                                        <ArrowUpRight className="w-5 h-5" />
                                    </a>
                                </Link>
                            </div>
                        </section>
                    </div>
                </div>
            </div>
        </div>
    );
}

import { Link } from "wouter";
