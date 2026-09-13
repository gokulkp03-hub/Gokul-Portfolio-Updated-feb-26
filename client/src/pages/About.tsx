import { SEO } from "@/components/SEO";
import { motion } from "framer-motion";
import { Link } from "wouter";
import { bio, whatIDo, experiences, behindTheCampaign, tools } from "@/data/about";
import { 
    ArrowUpRight, 
    ArrowRight, 
    MapPin, 
    Sparkles, 
    Check, 
    ExternalLink,
    Clock,
    Briefcase
} from "lucide-react";

export default function About() {
    return (
        <div className="min-h-screen bg-background pt-28 md:pt-36 pb-28 text-foreground">
            <SEO 
                title="About Gokul KP | Performance Marketer & Video Producer" 
                description="Gokul KP is a digital marketer and video producer working across Meta Ads, short-form video, WhatsApp automations, and creative strategy in the UAE and India." 
                url="/about" 
            />

            <div className="container px-4 md:px-8 max-w-[1240px] mx-auto space-y-24 md:space-y-32">

                {/* 1. EDITORIAL HERO & INTRO */}
                <section className="border-b border-border/40 pb-16 md:pb-24">
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
                        
                        {/* Text & Positioning */}
                        <div className="lg:col-span-7 space-y-8">
                            <div className="space-y-4">
                                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-500/10 border border-orange-500/20 text-orange-500 text-[11px] font-semibold tracking-widest uppercase">
                                    <span className="w-1.5 h-1.5 rounded-full bg-orange-500 animate-pulse" />
                                    {bio.eyebrow}
                                </div>
                                <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-display font-bold tracking-tight text-foreground leading-[1.08]">
                                    {bio.headline}
                                </h1>
                            </div>

                            <div className="space-y-6 text-lg sm:text-xl text-muted-foreground font-normal leading-relaxed">
                                <p className="text-foreground/90 font-medium">
                                    {bio.intro}
                                </p>
                                <p className="text-base sm:text-lg">
                                    {bio.statement}
                                </p>
                            </div>

                            {/* Status & Location Pill Row */}
                            <div className="pt-2 flex flex-wrap items-center gap-4 text-xs tracking-wider uppercase text-muted-foreground font-mono">
                                <div className="flex items-center gap-2 bg-muted/30 px-3.5 py-1.5 rounded-full border border-border/50">
                                    <MapPin className="w-3.5 h-3.5 text-orange-500" />
                                    <span>{bio.location}</span>
                                </div>
                                <div className="flex items-center gap-2 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 px-3.5 py-1.5 rounded-full border border-emerald-500/20">
                                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                                    <span>{bio.status}</span>
                                </div>
                            </div>
                        </div>

                        {/* Editorial Portrait & Quick Dossier */}
                        <div className="lg:col-span-5">
                            <div className="relative max-w-sm mx-auto lg:max-w-none">
                                <div className="relative aspect-[4/5] rounded-3xl overflow-hidden border border-border/60 bg-muted/20 shadow-xl">
                                    <img
                                        src="/assets/images/profile/gokul-kp-performance-marketer-dubai.webp"
                                        alt="Gokul KP — Performance Marketer & Video Producer"
                                        className="w-full h-full object-cover grayscale contrast-105 hover:grayscale-0 transition-all duration-700"
                                        onError={(e) => {
                                            e.currentTarget.src = "/assets/images/profile/profile.webp";
                                        }}
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent pointer-events-none" />
                                    <div className="absolute bottom-5 left-5 right-5 text-white">
                                        <p className="text-sm font-semibold tracking-wide">Gokul KP</p>
                                        <p className="text-xs text-white/70 font-mono">Performance Marketing & Creative Direction</p>
                                    </div>
                                </div>
                                <div className="mt-4 flex items-center justify-between text-xs text-muted-foreground font-mono px-1">
                                    <span>Base: Dubai & India</span>
                                    <span>Focus: Meta Ads + Video</span>
                                </div>
                            </div>
                        </div>

                    </div>
                </section>

                {/* 2. THE LOOP: CREATIVE PRODUCTION WITH A PERFORMANCE MINDSET */}
                <section className="space-y-8">
                    <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-border/40 pb-6">
                        <div>
                            <p className="text-xs font-mono uppercase tracking-widest text-orange-500 mb-2">The Complete Loop</p>
                            <h2 className="text-2xl sm:text-3xl font-display font-bold tracking-tight text-foreground">
                                Creative production with a performance mindset.
                            </h2>
                        </div>
                        <p className="text-sm text-muted-foreground max-w-md">
                            Campaigns fail when creative and media buying live in silos. I run the full feedback loop from initial script to ad testing to lead quality.
                        </p>
                    </div>

                    {/* Step-by-Step Loop Ribbon */}
                    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
                        {bio.loop.map((item, idx) => (
                            <div 
                                key={item.step} 
                                className="p-4 rounded-2xl border border-border/50 bg-muted/10 flex flex-col justify-between hover:border-orange-500/30 transition-colors group"
                            >
                                <div className="flex items-center justify-between mb-4">
                                    <span className="text-xs font-mono text-muted-foreground/60">{item.step}</span>
                                    {idx < bio.loop.length - 1 && (
                                        <ArrowRight className="w-3.5 h-3.5 text-muted-foreground/40 group-hover:text-orange-500 transition-colors hidden lg:block" />
                                    )}
                                </div>
                                <div>
                                    <h3 className="font-display font-bold text-base text-foreground mb-0.5">{item.name}</h3>
                                    <p className="text-xs text-muted-foreground">{item.detail}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>

                {/* 3. WHAT I ACTUALLY DO (4 CATEGORIES) */}
                <section className="space-y-8">
                    <div className="border-b border-border/40 pb-6">
                        <p className="text-xs font-mono uppercase tracking-widest text-orange-500 mb-2">Capabilities</p>
                        <h2 className="text-2xl sm:text-3xl font-display font-bold tracking-tight text-foreground">
                            What I actually do.
                        </h2>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {whatIDo.map((cat, idx) => (
                            <div 
                                key={cat.id}
                                className="p-8 rounded-3xl border border-border/50 bg-muted/10 hover:bg-muted/20 hover:border-border transition-all duration-300 flex flex-col justify-between"
                            >
                                <div className="space-y-4 mb-6">
                                    <div className="flex items-center justify-between">
                                        <span className="text-xs font-mono text-orange-500 font-semibold tracking-wider">0{idx + 1}</span>
                                        <span className="text-[10px] uppercase font-mono tracking-widest text-muted-foreground/60">Core Pillar</span>
                                    </div>
                                    <h3 className="text-xl sm:text-2xl font-display font-bold tracking-tight text-foreground">
                                        {cat.title}
                                    </h3>
                                    <p className="text-sm text-muted-foreground leading-relaxed">
                                        {cat.summary}
                                    </p>
                                </div>

                                <div className="pt-4 border-t border-border/30">
                                    <p className="text-[11px] font-mono uppercase tracking-wider text-muted-foreground/60 mb-3">Focus Areas</p>
                                    <div className="flex flex-wrap gap-2">
                                        {cat.skills.map((skill) => (
                                            <span 
                                                key={skill} 
                                                className="text-xs font-medium bg-background px-3 py-1.5 rounded-full border border-border/60 text-foreground/80"
                                            >
                                                {skill}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>

                {/* 4. EXPERIENCE — EDITORIAL TIMELINE */}
                <section className="space-y-10">
                    <div className="border-b border-border/40 pb-6">
                        <p className="text-xs font-mono uppercase tracking-widest text-orange-500 mb-2">Track Record</p>
                        <h2 className="text-2xl sm:text-3xl font-display font-bold tracking-tight text-foreground">
                            Experience & roles.
                        </h2>
                    </div>

                    <div className="space-y-8">
                        {experiences.map((exp) => {
                            // Featured prominent styling for Aqua Care
                            if (exp.isCurrent) {
                                return (
                                    <div 
                                        key={exp.company}
                                        className="p-8 md:p-12 rounded-[2rem] border-2 border-orange-500/30 bg-gradient-to-br from-orange-500/[0.04] via-muted/20 to-transparent relative overflow-hidden space-y-8"
                                    >
                                        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-orange-500/20 pb-6">
                                            <div className="space-y-1.5">
                                                <div className="flex items-center gap-3">
                                                    <span className="text-[10px] font-mono uppercase tracking-widest bg-orange-500 text-white font-bold px-2.5 py-0.5 rounded-full">
                                                        Current Focus
                                                    </span>
                                                    <span className="text-xs font-mono text-muted-foreground">{exp.location}</span>
                                                </div>
                                                <h3 className="text-2xl sm:text-3xl font-display font-bold text-foreground">
                                                    {exp.company}
                                                </h3>
                                                <p className="text-sm sm:text-base text-orange-600 dark:text-orange-400 font-medium">
                                                    {exp.position} • {exp.duration}
                                                </p>
                                            </div>

                                            <div className="flex flex-wrap gap-2">
                                                {exp.tags?.map(tag => (
                                                    <span key={tag} className="text-xs font-mono bg-background/80 px-3 py-1 rounded-full border border-border/60 text-muted-foreground">
                                                        {tag}
                                                    </span>
                                                ))}
                                            </div>
                                        </div>

                                        <p className="text-base sm:text-lg text-foreground/90 font-normal leading-relaxed max-w-4xl">
                                            {exp.summary}
                                        </p>

                                        {/* Metrics Highlight Strip */}
                                        {exp.metrics && exp.metrics.length > 0 && (
                                            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 pt-2">
                                                {exp.metrics.map((m) => (
                                                    <div key={m.label} className="p-4 rounded-2xl bg-background/80 border border-border/60">
                                                        <p className="text-xl sm:text-2xl font-display font-bold text-foreground tabular-nums">{m.value}</p>
                                                        <p className="text-[11px] text-muted-foreground mt-1 leading-snug">{m.label}</p>
                                                    </div>
                                                ))}
                                            </div>
                                        )}

                                        {/* Grounded Bullet Points */}
                                        {exp.details && (
                                            <div className="space-y-3 pt-2">
                                                <p className="text-xs font-mono uppercase tracking-wider text-muted-foreground/60">Operational Scope</p>
                                                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                                    {exp.details.map((detail, dIdx) => (
                                                        <div key={dIdx} className="flex items-start gap-3 text-sm text-muted-foreground">
                                                            <Check className="w-4 h-4 text-orange-500 mt-0.5 shrink-0" />
                                                            <span>{detail}</span>
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                );
                            }

                            // Secondary / Earlier Roles
                            return (
                                <div 
                                    key={exp.company}
                                    className="p-8 md:p-10 rounded-3xl border border-border/50 bg-muted/10 hover:border-border/80 transition-all space-y-6"
                                >
                                    <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
                                        <div>
                                            <div className="flex items-center gap-2 mb-1">
                                                <h3 className="text-xl sm:text-2xl font-display font-bold text-foreground">
                                                    {exp.companyUrl ? (
                                                        <a 
                                                            href={exp.companyUrl} 
                                                            target="_blank" 
                                                            rel="noopener noreferrer" 
                                                            className="hover:text-orange-500 inline-flex items-center gap-1.5 transition-colors"
                                                        >
                                                            {exp.company}
                                                            <ExternalLink className="w-4 h-4 text-muted-foreground" />
                                                        </a>
                                                    ) : (
                                                        exp.company
                                                    )}
                                                </h3>
                                            </div>
                                            <p className="text-sm font-medium text-orange-600 dark:text-orange-400">
                                                {exp.position} • {exp.duration}
                                            </p>
                                        </div>

                                        {exp.location && (
                                            <span className="text-xs font-mono text-muted-foreground bg-muted/30 px-3 py-1 rounded-full border border-border/40">
                                                {exp.location}
                                            </span>
                                        )}
                                    </div>

                                    <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
                                        {exp.summary}
                                    </p>

                                    {/* Metrics strip if present */}
                                    {exp.metrics && exp.metrics.length > 0 && (
                                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
                                            {exp.metrics.map((m) => (
                                                <div key={m.label} className="p-3.5 rounded-xl bg-background border border-border/50">
                                                    <p className="text-lg font-display font-bold text-foreground tabular-nums">{m.value}</p>
                                                    <p className="text-[11px] text-muted-foreground mt-0.5">{m.label}</p>
                                                </div>
                                            ))}
                                        </div>
                                    )}

                                    {exp.details && (
                                        <div className="space-y-2 pt-2">
                                            {exp.details.map((detail, dIdx) => (
                                                <div key={dIdx} className="flex items-start gap-2.5 text-xs sm:text-sm text-muted-foreground">
                                                    <span className="w-1.5 h-1.5 rounded-full bg-muted-foreground/40 mt-1.5 shrink-0" />
                                                    <span>{detail}</span>
                                                </div>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            );
                        })}
                    </div>
                </section>

                {/* 5. WHAT HAPPENS BEHIND THE CAMPAIGN */}
                <section className="space-y-8">
                    <div className="border-b border-border/40 pb-6">
                        <p className="text-xs font-mono uppercase tracking-widest text-orange-500 mb-2">Systems & Infrastructure</p>
                        <h2 className="text-2xl sm:text-3xl font-display font-bold tracking-tight text-foreground">
                            What happens behind the campaign.
                        </h2>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {behindTheCampaign.map((item) => (
                            <div 
                                key={item.number}
                                className="p-8 rounded-3xl border border-border/50 bg-muted/10 flex flex-col justify-between space-y-6 hover:border-orange-500/30 transition-colors"
                            >
                                <div className="space-y-3">
                                    <div className="flex items-center justify-between">
                                        <span className="text-xs font-mono font-bold text-orange-500">{item.number}</span>
                                        {item.tag && (
                                            <span className="text-[10px] font-mono uppercase tracking-wider text-muted-foreground/60 bg-muted/40 px-2.5 py-0.5 rounded-full border border-border/40">
                                                {item.tag}
                                            </span>
                                        )}
                                    </div>
                                    <h3 className="text-xl font-display font-bold text-foreground">
                                        {item.title}
                                    </h3>
                                    <p className="text-xs font-mono text-muted-foreground uppercase tracking-wider">
                                        {item.subtitle}
                                    </p>
                                </div>
                                <p className="text-sm text-muted-foreground leading-relaxed">
                                    {item.description}
                                </p>
                            </div>
                        ))}
                    </div>
                </section>

                {/* 6. TOOLS (MINIMAL TEXT ROW) */}
                <section className="border-t border-b border-border/40 py-10">
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                        <div>
                            <p className="text-xs font-mono uppercase tracking-widest text-muted-foreground/60 mb-1">Primary Tools</p>
                            <p className="text-sm font-medium text-foreground">Day-to-day execution stack</p>
                        </div>
                        <div className="flex flex-wrap items-center gap-y-2 gap-x-3 text-sm text-muted-foreground font-mono">
                            {tools.map((tool, idx) => (
                                <span key={tool} className="inline-flex items-center gap-3">
                                    <span className="hover:text-foreground transition-colors">{tool}</span>
                                    {idx < tools.length - 1 && (
                                        <span className="text-muted-foreground/30">•</span>
                                    )}
                                </span>
                            ))}
                        </div>
                    </div>
                </section>

                {/* 7. HUMAN CTA */}
                <section className="rounded-[2.5rem] border border-border/60 bg-muted/10 p-10 md:p-16 text-center space-y-8">
                    <div className="max-w-2xl mx-auto space-y-4">
                        <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-bold text-foreground tracking-tight">
                            Have a brand that needs better content, better campaigns, or both?
                        </h2>
                        <p className="text-base sm:text-lg text-muted-foreground">
                            Available for selected freelance projects, collaborations and marketing roles.
                        </p>
                    </div>

                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                        <Link href="/contact">
                            <a className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-orange-500 hover:bg-orange-600 text-white font-semibold px-8 py-4 rounded-full transition-all duration-200 shadow-lg shadow-orange-500/20">
                                Let's talk
                                <ArrowRight className="w-4 h-4" />
                            </a>
                        </Link>
                        <Link href="/portfolio">
                            <a className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-muted/30 hover:bg-muted/50 text-foreground font-medium px-8 py-4 rounded-full border border-border/60 transition-colors">
                                View Portfolio
                            </a>
                        </Link>
                    </div>
                </section>

            </div>
        </div>
    );
}

