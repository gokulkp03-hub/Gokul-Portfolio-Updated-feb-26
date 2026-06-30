import { motion, useInView, useScroll, useTransform } from "framer-motion";
import { Link } from "wouter";
import { bio, experiences, skills } from "@/data/about";
import { Coffee, Code, Heart, Trophy, Target, Sparkles, MapPin, ArrowUpRight } from "lucide-react";
import { trpc } from "@/lib/trpc";
import { useRef, useEffect } from "react";
import { setSEO } from "../utils/seo";

function SkillBar({ name, index }: { name: string; index: number }) {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-50px" });

    return (
        <div ref={ref} className="flex items-center justify-between border-b border-border/50 pb-2">
            <span className="text-muted-foreground font-light">{name}</span>
            <div className="w-12 h-1 bg-orange-500/20 rounded-full overflow-hidden flex items-center">
                <motion.div
                    initial={{ width: 0 }}
                    animate={isInView ? { width: "100%" } : { width: 0 }}
                    transition={{ duration: 0.8, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
                    className="h-full bg-orange-500"
                />
            </div>
        </div>
    );
}

export default function About() {
    useEffect(() => {
        setSEO({
            title: "About Gokul KP | Performance Marketer & Creative Director",
            description: "Learn more about Gokul KP's 3+ years scaling B2C brands across GCC (UAE & Oman) with paid ads, UGC creatives, and conversion copywriting."
        });
    }, []);

    const { data: content } = trpc.content.get.useQuery();

    const aboutTextRaw = content?.aboutText || bio.longDescription;
    const chunks = aboutTextRaw.split('\n\n');
    const displayHeading = chunks[0] || "Blending cinematic art with high-conversion strategy.";
    const displayParas = chunks.slice(1).length > 0 ? chunks.slice(1) : chunks;
    return (
        <div className="min-h-screen bg-background pt-40 md:pt-56 pb-32">
            <div className="container">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 md:gap-24 items-start">

                    {/* Clean Side Info */}
                    <div className="lg:col-span-4 lg:sticky lg:top-32 space-y-8">
                        <div className="relative aspect-[4/5] rounded-[2rem] overflow-hidden border border-border/50 bg-muted/20">
                            <motion.img
                                src="/assets/images/profile/gokul-kp-performance-marketer-dubai.webp"
                                alt="Gokul KP - Best Performance Marketer & Video Producer in Dubai, UAE"
                                title="Gokul KP | Performance Marketer & Creative Director Dubai"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ duration: 1 }}
                                className="w-full h-full object-cover"
                                onError={(e) => {
                                    e.currentTarget.src = "/assets/images/profile/profile.webp";
                                }}
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                            <div className="absolute bottom-6 left-6">
                                <h1 className="text-2xl font-display font-bold text-white mb-1">Gokul KP</h1>
                                <p className="text-orange-500 font-bold uppercase tracking-widest text-[10px]">Director // Strategist // Creator</p>
                            </div>
                            
                            {/* Hidden Image Assets for Google Image Search SEO Indexing */}
                            <div className="sr-only" aria-hidden="true" style={{ display: "none" }}>
                                <img src="/assets/images/profile/gokul-kp-video-editor-uae.webp" alt="Gokul KP - Video Editor and Creative Director in Dubai, UAE" />
                                <img src="/assets/images/profile/gokul-kp-videographer-dubai.webp" alt="Gokul KP - Premium Video Producer and Photographer in Dubai, UAE" />
                                <img src="/assets/images/profile/gokul-kp-ad-creative-specialist.webp" alt="Gokul KP - Ad Creative and Performance Marketing Specialist UAE" />
                            </div>
                        </div>

                        <div className="space-y-4">
                            <div className="flex items-center gap-3 text-muted-foreground">
                                <MapPin className="w-4 h-4 text-orange-500" />
                                <span className="text-sm font-normal">Based in United Arab Emirates</span>
                            </div>
                            <div className="flex items-center gap-3 text-muted-foreground">
                                <Sparkles className="w-4 h-4 text-orange-500" />
                                <span className="text-sm font-normal">Operating Globally</span>
                            </div>
                        </div>

                        <div className="p-10 rounded-3xl bg-muted/20 border border-border/50 space-y-10">
                            <div>
                                <h3 className="text-xs uppercase tracking-[0.3em] text-orange-500/80 mb-6">Marketing Tech</h3>
                                <div className="flex flex-wrap gap-2">
                                    {skills.marketing.map(tool => (
                                        <span key={tool} className="px-4 py-2 bg-muted/30 border border-border/50 rounded-full text-[11px] text-foreground/90 whitespace-nowrap">
                                            {tool}
                                        </span>
                                    ))}
                                </div>
                            </div>
                            <div>
                                <h3 className="text-xs uppercase tracking-[0.3em] text-orange-500/80 mb-6">Creative Stack</h3>
                                <div className="flex flex-wrap gap-2">
                                    {skills.creative.map(tool => (
                                        <span key={tool} className="px-4 py-2 bg-muted/30 border border-border/50 rounded-full text-[11px] text-foreground/90 whitespace-nowrap">
                                            {tool}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Main Content */}
                    <div className="lg:col-span-8 space-y-24">

                        <section className="space-y-12">
                            <div>
                                <h2 className="text-sm uppercase tracking-[0.4em] text-orange-500 mb-8">Professional Philosophy</h2>
                                <p className="text-3xl sm:text-4xl md:text-6xl font-display font-bold text-foreground mb-12 md:mb-16 leading-[1.1] tracking-tighter">
                                    {displayHeading}
                                </p>
                            </div>
                            <div className="prose prose-invert max-w-none text-muted-foreground text-xl font-normal leading-relaxed">
                                {displayParas.map((p, i) => (
                                    <p key={i} className="mb-10">{p}</p>
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
                                        initial={{ opacity: 0, x: -40 }}
                                        whileInView={{ opacity: 1, x: 0 }}
                                        viewport={{ once: true, margin: "-50px" }}
                                        transition={{ delay: i * 0.08, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                                        className="relative pl-8 border-l border-border/50"
                                    >
                                        <div className="absolute top-0 left-[-5px] w-[9px] h-[9px] bg-orange-500 rounded-full shadow-[0_0_15px_rgba(249,115,22,0.5)] z-10">
                                            <motion.div
                                                animate={{ scale: [1, 2.5], opacity: [0.6, 0] }}
                                                transition={{ duration: 2, repeat: Infinity, ease: "easeOut" }}
                                                className="absolute inset-0 rounded-full bg-orange-500/50"
                                            />
                                        </div>
                                        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4">
                                            <div>
                                                <h3 className="text-2xl font-display font-bold text-foreground uppercase">{exp.position}</h3>
                                                {exp.companyUrl ? (
                                                    <a 
                                                        href={exp.companyUrl} 
                                                        target="_blank" 
                                                        rel="noopener noreferrer" 
                                                        className="text-orange-500 font-medium hover:underline inline-flex items-center gap-1 cursor-pointer"
                                                    >
                                                        {exp.company}
                                                    </a>
                                                ) : (
                                                    <p className="text-orange-500 font-medium">{exp.company}</p>
                                                )}
                                            </div>
                                            <span className="text-xs uppercase tracking-widest text-muted-foreground bg-muted/30 px-4 py-2 rounded-full border border-border/50">
                                                {exp.duration}
                                            </span>
                                        </div>
                                        <p className="text-muted-foreground font-normal mb-6">{exp.description}</p>

                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                            <div>
                                                <h4 className="text-[10px] uppercase font-bold tracking-widest text-muted-foreground/60 mb-3">Key Responsibilities</h4>
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
                                                <h4 className="text-[10px] uppercase font-bold tracking-widest text-muted-foreground/60 mb-3">Primary Impact</h4>
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

                        {/* Beyond The Ads Timeline */}
                        <section>
                            <h2 className="text-sm uppercase tracking-[0.4em] text-orange-500 mb-12">Beyond The Ads</h2>
                            <div className="space-y-12">
                                <motion.div
                                    initial={{ opacity: 0, x: -40 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    viewport={{ once: true, margin: "-50px" }}
                                    transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                                    className="relative pl-8 border-l border-border/50"
                                >
                                    <div className="absolute top-0 left-[-5px] w-[9px] h-[9px] bg-orange-500 rounded-full shadow-[0_0_15px_rgba(249,115,22,0.5)] z-10">
                                        <motion.div
                                            animate={{ scale: [1, 2.5], opacity: [0.6, 0] }}
                                            transition={{ duration: 2, repeat: Infinity, ease: "easeOut" }}
                                            className="absolute inset-0 rounded-full bg-orange-500/50"
                                        />
                                    </div>
                                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4">
                                        <div>
                                            <h3 className="text-2xl font-display font-bold text-foreground uppercase">GCC Competitor Database</h3>
                                            <p className="text-orange-500 font-medium">Market Intelligence & Ad Scraping</p>
                                        </div>
                                        <span className="text-xs uppercase tracking-widest text-emerald-500 bg-emerald-500/10 px-4 py-2 rounded-full border border-emerald-500/20 font-bold">
                                            45+ Competitors Tracked
                                        </span>
                                    </div>
                                    <p className="text-muted-foreground font-normal mb-6 leading-relaxed">
                                        Maintaining a real-time competitor intelligence sheet tracking every major player in the UAE & Oman water filtration, meal prep, and high-ticket service spaces. Allows us to spot new creative trends and pricing offers within 24 hours of launch.
                                    </p>
                                </motion.div>

                                <motion.div
                                    initial={{ opacity: 0, x: -40 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    viewport={{ once: true, margin: "-50px" }}
                                    transition={{ duration: 0.6, delay: 0.08, ease: [0.16, 1, 0.3, 1] }}
                                    className="relative pl-8 border-l border-border/50"
                                >
                                    <div className="absolute top-0 left-[-5px] w-[9px] h-[9px] bg-orange-500 rounded-full shadow-[0_0_15px_rgba(249,115,22,0.5)] z-10">
                                        <motion.div
                                            animate={{ scale: [1, 2.5], opacity: [0.6, 0] }}
                                            transition={{ duration: 2, repeat: Infinity, ease: "easeOut" }}
                                            className="absolute inset-0 rounded-full bg-orange-500/50"
                                        />
                                    </div>
                                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4">
                                        <div>
                                            <h3 className="text-2xl font-display font-bold text-foreground uppercase">WhatsApp Lead Automations</h3>
                                            <p className="text-orange-500 font-medium">ManyChat & Lead Distribution</p>
                                        </div>
                                        <span className="text-xs uppercase tracking-widest text-emerald-500 bg-emerald-500/10 px-4 py-2 rounded-full border border-emerald-500/20 font-bold">
                                            25% CPL Decrease
                                        </span>
                                    </div>
                                    <p className="text-muted-foreground font-normal mb-6 leading-relaxed">
                                        Architecting conversational chat paths using ManyChat and custom API triggers that immediately hand off leads from Instagram comments to WhatsApp representatives. Shortens response times from hours to under 2 minutes, ensuring higher customer retention.
                                    </p>
                                </motion.div>

                                <motion.div
                                    initial={{ opacity: 0, x: -40 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    viewport={{ once: true, margin: "-50px" }}
                                    transition={{ duration: 0.6, delay: 0.16, ease: [0.16, 1, 0.3, 1] }}
                                    className="relative pl-8 border-l border-border/50"
                                >
                                    <div className="absolute top-0 left-[-5px] w-[9px] h-[9px] bg-orange-500 rounded-full shadow-[0_0_15px_rgba(249,115,22,0.5)] z-10">
                                        <motion.div
                                            animate={{ scale: [1, 2.5], opacity: [0.6, 0] }}
                                            transition={{ duration: 2, repeat: Infinity, ease: "easeOut" }}
                                            className="absolute inset-0 rounded-full bg-orange-500/50"
                                        />
                                    </div>
                                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4">
                                        <div>
                                            <h3 className="text-2xl font-display font-bold text-foreground uppercase">High-Conversion Social Calendars</h3>
                                            <p className="text-orange-500 font-medium">Cohesive Content Matrix</p>
                                        </div>
                                        <span className="text-xs uppercase tracking-widest text-emerald-500 bg-emerald-500/10 px-4 py-2 rounded-full border border-emerald-500/20 font-bold">
                                            30+ Content Hooks/Mo
                                        </span>
                                    </div>
                                    <p className="text-muted-foreground font-normal mb-6 leading-relaxed">
                                        Designing high-touch organic calendars that blend professional aesthetic branding with direct-response hooks. Ensuring social grids look like premium lifestyle magazines while simultaneously driving traffic to high-converting product funnels.
                                    </p>
                                </motion.div>
                            </div>
                        </section>

                        {/* Skills / Stacks */}
                        <section className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            <div className="p-10 rounded-[2.5rem] bg-muted/10 border border-border/50 hover:border-orange-500/20 transition-all group">
                                <Target className="w-10 h-10 text-orange-500 mb-8 group-hover:scale-110 transition-transform" />
                                <h3 className="text-2xl font-display font-bold mb-6 uppercase tracking-tighter text-foreground">Performance Marketing</h3>
                                <div className="space-y-4">
                                    {skills.marketing.map((s, i) => (
                                        <SkillBar key={s} name={s} index={i} />
                                    ))}
                                </div>
                            </div>
                            <div className="p-10 rounded-[2.5rem] bg-orange-500/5 border border-orange-500/10 hover:border-orange-500/30 transition-all group">
                                <Sparkles className="w-10 h-10 text-orange-500 mb-8 group-hover:scale-110 transition-transform" />
                                <h3 className="text-2xl font-display font-bold mb-6 uppercase tracking-tighter text-foreground">Creative Production</h3>
                                <div className="space-y-4">
                                    {skills.creative.map((s, i) => (
                                        <SkillBar key={s} name={s} index={i} />
                                    ))}
                                </div>
                            </div>
                        </section>

                        {/* Personal CTA */}
                        <section className="glass-card text-foreground rounded-[3rem] p-12 md:p-20 text-center relative overflow-hidden border border-border/50 hover:border-orange-500/20 transition-colors duration-500">
                            {/* Background Accent */}
                            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-orange-500/5 blur-[100px] rounded-full pointer-events-none" />

                            <div className="relative z-10 max-w-2xl mx-auto">
                                <h2 className="text-4xl md:text-6xl font-display font-bold mb-6 md:mb-8 uppercase tracking-tighter italic dark:text-white text-foreground">Interested in working together?</h2>
                                <p className="text-xl text-muted-foreground font-light mb-12">Let's discuss how we can scale your brand's presence today.</p>
                                <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
                                    <Link href="/services">
                                        <a className="btn bg-orange-500 text-white px-12 py-5 rounded-full font-bold inline-flex items-center gap-2 hover:scale-105 transition-transform shadow-2xl">
                                            Work With Me
                                            <ArrowUpRight className="w-5 h-5" />
                                        </a>
                                    </Link>
                                    <Link href="/contact">
                                        <a className="text-muted-foreground hover:text-white font-medium inline-flex items-center gap-1 transition-colors">
                                            Agency Recruiters: Let's Connect
                                            <ArrowUpRight className="w-4 h-4" />
                                        </a>
                                    </Link>
                                </div>
                            </div>
                        </section>
                    </div>
                </div>
            </div>
        </div>
    );
}
