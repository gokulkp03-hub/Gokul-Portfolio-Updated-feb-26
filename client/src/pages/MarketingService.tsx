import { motion, AnimatePresence } from "framer-motion";
import { Link } from "wouter";
import { BarChart, PieChart, TrendingUp, Users, Target, ArrowUpRight, ChevronDown, ChevronUp } from "lucide-react";
import { cn } from "@/lib/utils";
import { marketingCampaigns } from "@/data/marketing";
import { useState } from "react";

const process = [
    { title: "Audit & Strategy", desc: "Deep dive into your current data and competitors." },
    { title: "Creative Setup", desc: "Designing high-converting ad creatives." },
    { title: "Launch & Test", desc: "A/B testing audiences and hooks." },
    { title: "Scale & Optimize", desc: "Doubling down on winners, cutting losers." },
];

const faqs = [
    { q: "What is your minimum budget?", a: "I recommend a minimum ad spend of $1,500/month to ensure we have enough data for optimization." },
    { q: "Do you guarantee results?", a: "I guarantee a data-driven process. While specific ROAS cannot be legally guaranteed, my track record shows consistent growth." },
    { q: "How long does it take?", a: "Optimization is ongoing, but initial results typically appear within the first 14-30 days." },
    { q: "Do you handle creative?", a: "Yes, I provide creative strategy and can produce ad assets as part of the retainer." },
];

function FAQItem({ question, answer }: { question: string, answer: string }) {
    const [isOpen, setIsOpen] = useState(false);
    return (
        <div className="border-b border-border/40 py-4">
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="flex items-center justify-between w-full text-left font-medium text-lg hover:text-emerald-500 transition-colors"
            >
                {question}
                {isOpen ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
            </button>
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        className="overflow-hidden"
                    >
                        <p className="pt-2 pb-4 text-muted-foreground leading-relaxed">{answer}</p>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}

export default function MarketingService() {
    return (
        <div className="min-h-screen bg-background overflow-hidden relative">

            {/* Abstract Background */}
            <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-emerald-500/5 rounded-full blur-[150px] pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-blue-500/5 rounded-full blur-[150px] pointer-events-none" />

            {/* Hero */}
            <section className="pt-32 pb-20 container text-center z-10 relative">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                >
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-500/10 text-emerald-500 text-sm font-medium mb-8 border border-emerald-500/20 backdrop-blur-md">
                        <TrendingUp className="w-4 h-4" /> Performance Marketing
                    </div>

                    <h1 className="text-5xl md:text-8xl font-display font-semibold tracking-tighter mb-8 text-balance">
                        Growth based on <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-500 to-teal-400">data, not guesses</span>.
                    </h1>

                    <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-12 font-light">
                        Meta Ads, Google Ads, and Funnel Optimization.
                        I turn ad spend into predictable revenue.
                    </p>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto">
                        {[
                            { label: "Ad Spend Managed", val: "$500k+" },
                            { label: "Revenue Generated", val: "$2M+" },
                            { label: "Avg ROAS", val: "4.2x" },
                            { label: "Campaigns", val: "150+" },
                        ].map((stat, i) => (
                            <motion.div
                                key={i}
                                initial={{ scale: 0.9, opacity: 0 }}
                                animate={{ scale: 1, opacity: 1 }}
                                transition={{ delay: 0.4 + (i * 0.1) }}
                                className="p-6 rounded-2xl bg-card border border-border/50 shadow-sm hover:border-emerald-500/30 transition-colors"
                            >
                                <div className="text-3xl font-bold mb-1 text-foreground">{stat.val}</div>
                                <div className="text-xs uppercase tracking-wider text-muted-foreground">{stat.label}</div>
                            </motion.div>
                        ))}
                    </div>
                </motion.div>
            </section>

            {/* Case Studies */}
            <section className="py-24 bg-muted/20 border-y border-border/40">
                <div className="container max-w-6xl">
                    <h2 className="text-3xl md:text-5xl font-display font-bold mb-12">Recent Wins</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {marketingCampaigns.map((campaign, i) => (
                            <motion.div
                                key={campaign.id}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.1 }}
                                className="p-8 rounded-3xl bg-card border border-border hover:border-emerald-500/30 transition-all hover:shadow-xl group"
                            >
                                <div className="flex justify-between items-start mb-6">
                                    <div className="px-4 py-2 bg-emerald-500/10 text-emerald-500 rounded-full text-sm font-bold flex items-center gap-2">
                                        <Target className="w-4 h-4" />
                                        {campaign.industry}
                                    </div>
                                    <span className="text-emerald-500 font-bold bg-emerald-500/10 px-3 py-1 rounded-full text-sm flex items-center gap-1">
                                        <TrendingUp className="w-3 h-3" />
                                        {campaign.metrics[0].value} {campaign.metrics[0].label}
                                    </span>
                                </div>

                                <h3 className="text-2xl font-bold mb-2 group-hover:text-emerald-500 transition-colors">{campaign.title}</h3>
                                <p className="text-muted-foreground mb-6 line-clamp-2">{campaign.description}</p>

                                <div className="grid grid-cols-3 gap-4 border-t border-border/40 pt-6">
                                    {campaign.metrics.map((res, j) => (
                                        <div key={j}>
                                            <div className="text-xl font-bold text-foreground">{res.value}</div>
                                            <div className="text-[10px] uppercase tracking-wider text-muted-foreground">{res.label}</div>
                                        </div>
                                    ))}
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Process */}
            <section className="py-24 container max-w-6xl">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
                    <div>
                        <h2 className="text-4xl md:text-5xl font-display font-bold mb-6">How It Works</h2>
                        <p className="text-lg text-muted-foreground mb-8 max-w-lg">
                            Stop burning money on "boost post". My process is scientific, iterative, and focused on one metric: <span className="text-foreground font-semibold">Profit</span>.
                        </p>
                        <Link href="#contact">
                            <a className="btn-outline rounded-full group px-6 py-3">
                                Start Your Growth Arc
                                <ArrowUpRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                            </a>
                        </Link>
                    </div>

                    <div className="space-y-8 relative">
                        <div className="absolute left-5 top-8 bottom-8 w-px bg-border/50 border-l border-dashed border-muted-foreground/30"></div>
                        {process.map((step, i) => (
                            <div key={i} className="flex gap-6 items-start relative z-10">
                                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-card border border-emerald-500/30 text-emerald-500 flex items-center justify-center font-bold shadow-sm">
                                    {i + 1}
                                </div>
                                <div className="pt-2">
                                    <h3 className="text-xl font-bold mb-2">{step.title}</h3>
                                    <p className="text-muted-foreground">{step.desc}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* FAQ */}
            <section className="py-24 bg-card border-t border-border/40">
                <div className="container max-w-3xl">
                    <h2 className="text-3xl md:text-4xl font-display font-bold mb-12 text-center">Frequently Asked Questions</h2>
                    <div className="space-y-2">
                        {faqs.map((faq, i) => (
                            <FAQItem key={i} question={faq.q} answer={faq.a} />
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA */}
            <section id="contact" className="py-32 container text-center">
                <div className="bg-gradient-to-br from-emerald-900 to-emerald-950 rounded-[3rem] p-12 md:p-20 text-white relative overflow-hidden shadow-2xl shadow-emerald-900/20">
                    <div className="relative z-10">
                        <h2 className="text-4xl md:text-6xl font-display font-bold mb-6">Scale your revenue.</h2>
                        <p className="text-emerald-100 text-xl mb-10 max-w-xl mx-auto font-light">
                            Ready to turn your traffic into customers?
                        </p>
                        <Link href="mailto:hello@gokulkp.com">
                            <a className="btn bg-white text-emerald-900 hover:bg-emerald-50 px-10 py-5 rounded-full font-bold shadow-lg transition-all hover:scale-105">
                                Get a Free Audit
                            </a>
                        </Link>
                    </div>
                    {/* Background Pattern noise */}
                    <div className="absolute inset-0 opacity-10 mix-blend-overlay pointer-events-none" style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")` }}></div>
                </div>
            </section>

        </div>
    );
}
