import { motion } from "framer-motion";
import { proof } from "@/data/proof";
import { TrendingUp, Users, Target, BarChart3, PieChart, ArrowUpRight } from "lucide-react";
import { Link } from "wouter";
import { trpc } from "@/lib/trpc";
import { useMemo, useEffect } from "react";
import { marketingCampaigns as staticMarketing } from "@/data/marketing";
import { setSEO } from "../utils/seo";

export default function Results() {
    useEffect(() => {
        setSEO({
            title: "Proven Results & Marketing Case Studies | Gokul KP",
            description: "Browse verified growth metrics, ROI case studies, and ad spend scaling performance across GCC client campaigns managed by Gokul KP."
        });
    }, []);

    const { data: dbProjects } = trpc.projects.list.useQuery();
    
    const campaigns = useMemo(() => {
        if (dbProjects && dbProjects.length > 0) {
            const dbCamps = dbProjects.filter((p: any) => p.category.toLowerCase() === "marketing");
            if (dbCamps.length > 0) return dbCamps;
        }

        // Fallback to static marketing campaigns
        return staticMarketing.map(m => ({
            id: m.id,
            title: m.title,
            slug: m.slug,
            client: m.client,
            description: m.description,
            thumbnail: m.visuals[0] || "",
            gallery: m.visuals,
            category: "marketing",
            results: m.metrics.map(met => ({ label: met.label, value: met.value })),
            tags: m.tags,
        }));
    }, [dbProjects]);

    return (
        <div className="min-h-screen bg-background pt-24 md:pt-32 pb-20">
            <div className="container px-4 md:px-8 max-w-[1400px] mx-auto">
                {/* Header */}
                <div className="mb-16 md:mb-20">
                    <h1 className="text-5xl sm:text-7xl md:text-9xl font-display font-bold tracking-tighter mb-6 md:mb-8 uppercase italic">
                        The <span className="text-orange-500">Proof</span>.
                    </h1>
                    <p className="text-lg md:text-3xl text-muted-foreground max-w-3xl font-light leading-relaxed">
                        Numbers from real campaigns. Every figure here is backed by a report I can share.
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
                            transition={{ delay: i * 0.1, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                            className="p-8 rounded-3xl border border-border/50 bg-muted/10 hover:bg-muted/20 hover:border-orange-500/20 transition-all duration-300"
                        >
                            <div className="text-3xl md:text-6xl font-display font-bold text-foreground mb-3 tabular-nums">
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
                    {campaigns.map((camp: any, i: number) => {
                        let parsedResults: any[] = [];
                        try {
                            parsedResults = typeof camp.results === 'string' ? JSON.parse(camp.results) : camp.results;
                        } catch (e) {}
                        
                        let industry = "E-Commerce";
                        try {
                            const parsedTags = typeof camp.tags === 'string' ? JSON.parse(camp.tags) : camp.tags;
                            if (Array.isArray(parsedTags) && parsedTags[1]) {
                                industry = parsedTags[1];
                            } else if (Array.isArray(parsedTags) && parsedTags[0]) {
                                industry = parsedTags[0];
                            }
                        } catch (e) {}

                        let visuals = [];
                        try {
                            visuals = typeof camp.gallery === 'string' ? JSON.parse(camp.gallery) : camp.gallery;
                        } catch (e) {}
                        const mainImage = Array.isArray(visuals) && visuals.length > 0 ? visuals[0] : camp.thumbnail;

                        return (
                            <div key={camp.id} className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                                <motion.div
                                    initial={{ opacity: 0, x: i % 2 === 0 ? -30 : 30 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    viewport={{ once: true }}
                                    className={i % 2 === 0 ? "order-1" : "order-1 lg:order-2"}
                                >
                                    <div className="flex items-center gap-3 mb-6">
                                        <span className="px-3 py-1 bg-orange-500/10 border border-orange-500/20 text-orange-500 rounded-full text-[10px] font-bold uppercase tracking-widest flex items-center gap-1">
                                            <Target className="w-3 h-3" />
                                            {camp.client || camp.title}
                                        </span>
                                        <span className="text-muted-foreground text-sm font-light italic">
                                            {industry}
                                        </span>
                                    </div>
                                    <h2 className="text-3xl sm:text-4xl md:text-6xl font-display font-bold mb-6 md:mb-8 leading-tight">
                                        {camp.title}
                                    </h2>
                                    <p className="text-lg text-muted-foreground mb-12 font-light leading-relaxed line-clamp-4">
                                        {camp.description}
                                    </p>

                                    {Array.isArray(parsedResults) && parsedResults.length > 0 && (
                                        <div className="grid grid-cols-2 gap-8 mb-12">
                                            {parsedResults.slice(0, 4).map((m: any, mi: number) => (
                                                <div key={mi} className="border-l-2 border-orange-500/30 pl-6">
                                                    <div className="text-3xl font-display font-bold text-foreground mb-1">
                                                        {m.value}
                                                    </div>
                                                    <div className="text-xs uppercase tracking-wider text-muted-foreground">
                                                        {m.label}
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    )}

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
                                    <div className="relative aspect-[16/10] rounded-3xl overflow-hidden border border-border group">
                                        {mainImage ? (
                                            <img
                                                src={mainImage}
                                                alt={camp.client || camp.title}
                                                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                                            />
                                        ) : (
                                            <div className="w-full h-full bg-muted/20" />
                                        )}
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                                    </div>
                                </motion.div>
                            </div>
                        );
                    })}
                </div>

                {/* Brands Grid */}
                <div className="mt-48 text-center">
                    <h3 className="text-sm uppercase tracking-[0.4em] text-muted-foreground mb-12">Trusted by 20+ Regional Entities</h3>
                    <div className="flex flex-wrap justify-center items-center gap-10 md:gap-16">
                        {proof.logos.map((logo, i) => (
                            <img 
                                key={i} 
                                src={logo.src} 
                                alt={logo.name} 
                                className="h-8 md:h-12 w-auto object-contain opacity-50 hover:opacity-100 grayscale hover:grayscale-0 transition-all duration-300"
                                title={logo.name}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}


