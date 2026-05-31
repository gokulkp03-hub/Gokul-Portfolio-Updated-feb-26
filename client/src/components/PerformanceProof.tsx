import { motion } from "framer-motion";
import { TrendingUp, Target, BarChart3, Plus, ArrowUpRight } from "lucide-react";

const RESULTS = [
    {
        id: 1,
        client: "BeyondCars UAE",
        metric: "3.2x ROAS",
        result: "AED 220k Revenue",
        label: "Lead Generation Campaign",
        image: "/assets/images/brands/Beyond-Cars/beyondcarsin.webp"
    },
    {
        id: 2,
        client: "Healthy Meals",
        metric: "4.2x Avg ROAS",
        result: "AED 300K+ Managed",
        label: "Performance Ads",
        image: "/assets/images/case-studies/prepmeal/PrepMeal Website.jpg" 
    },
    {
        id: 3,
        client: "Real Estate Scale",
        metric: "20k+ Conversions",
        result: "AED 180 CPL",
        label: "Conversion Funnel",
        image: "/assets/images/brands/Food-Photography/Cheesecake.jpg"
    }
];

export default function PerformanceProof() {
    return (
        <section className="section bg-black overflow-hidden border-t border-white/5">
            <div className="container">
                <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8">
                    <div className="max-w-2xl">
                        <span className="text-[10px] font-bold uppercase tracking-[0.4em] text-orange-500 mb-6 block">Proof of Work</span>
                        <h2 className="text-4xl md:text-6xl font-display font-bold text-white mb-6 uppercase tracking-tight">Results & <span className="text-orange-500 italic">Performance</span></h2>
                        <p className="text-xl text-white/40 font-light leading-relaxed">
                            I deliver data-backed growth, not just pretty visuals. Real campaign snapshots — strategy, creatives, and validated metrics.
                        </p>
                    </div>
                    <div className="hidden md:block pb-2">
                        <div className="flex items-center gap-2 px-4 py-2 rounded-full border border-white/10 bg-white/5 text-[10px] text-white/40 uppercase tracking-widest">
                            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                            Verified Meta Ads Data
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
                    {RESULTS.map((item, idx) => (
                        <motion.div
                            key={item.id}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: idx * 0.1, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                            className="group relative rounded-3xl overflow-hidden border border-white/5 bg-zinc-900/50 backdrop-blur-3xl hover:border-orange-500/30 transition-all duration-500"
                        >
                            <div className="aspect-[4/5] relative overflow-hidden">
                                <img
                                    src={item.image}
                                    alt={`${item.client} Results`}
                                    className="w-full h-full object-cover opacity-40 group-hover:opacity-60 group-hover:scale-105 transition-all duration-700"
                                    onError={(e) => (e.currentTarget.src = "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2940&auto=format&fit=crop")}
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />

                                <div className="absolute top-6 left-6 right-6 flex justify-between items-start">
                                    <div className="px-3 py-1 rounded-full bg-orange-500/10 border border-orange-500/20 text-[9px] text-orange-500 font-bold uppercase tracking-widest backdrop-blur-md">
                                        {item.label}
                                    </div>
                                    <div className="w-8 h-8 rounded-full bg-white/10 border border-white/10 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                                        <Plus className="w-4 h-4 text-white" />
                                    </div>
                                </div>

                                <div className="absolute bottom-0 left-0 right-0 p-8">
                                    <p className="text-white/40 text-[10px] font-bold uppercase tracking-[0.2em] mb-2">{item.client}</p>
                                    <div className="flex flex-col gap-1">
                                        <h3 className="text-white text-3xl font-display font-bold tabular-nums">{item.metric}</h3>
                                        <p className="text-orange-500/80 text-sm font-medium tracking-tight uppercase">{item.result}</p>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>

                <div className="mt-16 p-8 md:p-12 rounded-[2.5rem] border border-white/5 bg-white/[0.02] flex flex-col md:flex-row items-center justify-between gap-8">
                    <div className="flex items-center gap-6">
                        <div className="w-16 h-16 rounded-2xl bg-orange-500/10 flex items-center justify-center">
                            <BarChart3 className="w-8 h-8 text-orange-500" />
                        </div>
                        <div>
                            <h4 className="text-white text-xl font-display font-bold">Campaign Performance PDF</h4>
                            <p className="text-white/40 text-sm font-light mt-1">Detailed breakdown of strategy, targeting, and ROI metrics.</p>
                        </div>
                    </div>
                    <button className="btn-primary rounded-full px-8 py-4 text-sm group flex items-center gap-2">
                        Download Full Report
                        <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                    </button>
                </div>
            </div>
        </section>
    );
}
