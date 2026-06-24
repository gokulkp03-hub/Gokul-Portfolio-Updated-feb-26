import { ArrowLeft } from "lucide-react";
import { useEffect } from "react";
import { Link } from "wouter";
import { motion } from "framer-motion";
import { MorphBlob } from "@/components/ui/MorphBlob";

export default function PrepmealCaseStudy() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen pt-24 pb-20 bg-background text-foreground font-sans relative overflow-hidden">
        <MorphBlob color="emerald-500" size={500} opacity={0.06} blur={120} className="-right-20 top-0" animDuration={16} />
      
      <div className="container max-w-4xl relative z-10">
        <Link href="/marketing">
            <a className="inline-flex items-center gap-2 text-sm font-medium hover:text-emerald-500 text-muted-foreground transition-colors mb-12 group cursor-pointer block">
                <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
                Back to Marketing Portfolio
            </a>
        </Link>

        {/* Big Result Banner */}
        <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-emerald-500 text-black p-8 md:p-16 rounded-[2rem] mb-20 text-center flex flex-col items-center justify-center border border-emerald-400/50 shadow-2xl shadow-emerald-500/20"
        >
            <span className="text-xs font-bold uppercase tracking-[0.4em] mb-4 opacity-70 italic">Verified Performance</span>
            <h2 className="text-5xl md:text-[8rem] font-display font-bold tracking-tighter leading-none mb-6">3.8x ROAS</h2>
            <p className="text-xl md:text-2xl font-bold uppercase tracking-tight max-w-xl">
                Scaled a meal-prep startup to 21,000+ meals delivered in 12 months.
            </p>
        </motion.div>

        <h1 className="text-4xl md:text-6xl font-display font-bold leading-[1.1] mb-6 tracking-tight">
            Prepmeal: The Growth Engine.
        </h1>
        <p className="text-xl text-muted-foreground max-w-2xl mb-16 font-medium leading-relaxed">
            I built the acquisition system that turned a ghost kitchen into a local powerhouse. 
            Strategy, Creatives, and Media Buying — all synced for profit.
        </p>

        {/* Meta */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-16 border-y border-border/40 py-8">
          <div><div className="text-sm font-medium text-foreground">Client</div><div className="text-sm text-muted-foreground mt-1">Prepmeal</div></div>
          <div><div className="text-sm font-medium text-foreground">Industry</div><div className="text-sm text-muted-foreground mt-1">F&B / Subscription</div></div>
          <div><div className="text-sm font-medium text-foreground">Platform</div><div className="text-sm text-muted-foreground mt-1">Meta Ads & Google Ads</div></div>
          <div><div className="text-sm font-medium text-foreground">Role</div><div className="text-sm text-muted-foreground mt-1">Creative & Performance Strategy</div></div>
        </div>

        {/* Hero Image */}
        <div className="w-full aspect-[21/9] bg-muted/30 border border-border/40 rounded-2xl mb-16 overflow-hidden relative group rounded-3xl">
            <img src="/assets/images/case-studies/prepmeal/PrepMeal Website.jpg" alt="Prepmeal Presentation" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" onError={(e) => { e.currentTarget.style.display='none'; }}/>
            <div className="absolute inset-0 bg-black/20" />
        </div>

        {/* Results Grid */}
        <div className="mb-8">
            <h2 className="text-xs font-bold uppercase tracking-widest text-muted-foreground mb-8">Overview</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="glass-card p-6 bg-card">
                    <div className="text-3xl font-bold text-emerald-500 mb-2">35%</div>
                    <div className="text-xs text-muted-foreground uppercase tracking-wider">Decrease in CPA</div>
                </div>
                <div className="glass-card p-6 bg-card">
                    <div className="text-3xl font-bold text-foreground mb-2">3.8x</div>
                    <div className="text-xs text-muted-foreground uppercase tracking-wider">Average ROAS</div>
                </div>
                <div className="glass-card p-6 bg-card">
                    <div className="text-3xl font-bold text-foreground mb-2">10k+</div>
                    <div className="text-xs text-muted-foreground uppercase tracking-wider">Conversions</div>
                </div>
                <div className="glass-card p-6 bg-card">
                    <div className="text-3xl font-bold text-foreground mb-2">AED 50k</div>
                    <div className="text-xs text-muted-foreground uppercase tracking-wider">Quarterly Spend</div>
                </div>
            </div>
        </div>

        <div className="space-y-24 mt-24">
            {/* The Challenge */}
            <section className="grid grid-cols-1 md:grid-cols-12 gap-8">
                <div className="md:col-span-4">
                    <h2 className="text-2xl font-display font-bold text-foreground">The Challenge</h2>
                </div>
                <div className="md:col-span-8 prose prose-invert">
                    <p className="text-lg text-muted-foreground font-light leading-relaxed">
                        The UAE meal prep market is highly saturated with established players holding massive market share. Prepmeal needed to launch as a premium, health-focused alternative but lacked initial brand awareness and faced high customer acquisition costs (CAC) typical of subscription models.
                    </p>
                    <p className="text-lg text-muted-foreground font-light leading-relaxed mt-4">
                        We were tasked with not only building their visual identity and creative positioning from scratch but also creating a cost-effective acquisition funnel that would generate immediate revenue without burning through budget.
                    </p>
                </div>
            </section>

            {/* The Strategy */}
            <section className="grid grid-cols-1 md:grid-cols-12 gap-8">
                <div className="md:col-span-4">
                    <h2 className="text-2xl font-display font-bold text-foreground">The Strategy</h2>
                </div>
                <div className="md:col-span-8">
                    <div className="space-y-8">
                        <div className="p-8 rounded-2xl bg-muted/20 border border-border/40">
                            <h3 className="text-lg font-bold text-emerald-500 mb-3">1. Foundational Creatives</h3>
                            <p className="text-muted-foreground font-light">Instead of relying on standard stock imagery, we directed a localized photoshoot emphasizing freshness, macro-nutrients, and lifestyle convenience tailored to busy Dubai professionals.</p>
                        </div>
                        <div className="p-8 rounded-2xl bg-muted/20 border border-border/40">
                            <h3 className="text-lg font-bold text-emerald-500 mb-3">2. Two-Tier Funnel Approach</h3>
                            <p className="text-muted-foreground font-light">We deployed broad awareness campaigns (video views) to build retargeting audiences at low cost, followed by aggressive conversion campaigns (lead generation & direct sales) aimed at users who engaged.</p>
                        </div>
                        <div className="p-8 rounded-2xl bg-muted/20 border border-border/40">
                            <h3 className="text-lg font-bold text-emerald-500 mb-3">3. Offer Engineering</h3>
                            <p className="text-muted-foreground font-light">Tested multiple entry-offers against each other—"First Week 50% Off" vs "Free Consultation"—and scaled the winner rapidly using dynamic creative optimization.</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* The Execution */}
            <section className="grid grid-cols-1 md:grid-cols-12 gap-8">
                <div className="md:col-span-4">
                    <h2 className="text-2xl font-display font-bold text-foreground">The Execution</h2>
                </div>
                <div className="md:col-span-8 prose prose-invert">
                    <ul className="space-y-4 text-muted-foreground font-light text-lg">
                        <li className="flex items-start gap-3">
                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 mt-2.5 flex-shrink-0"></span>
                            <span>Produced 20+ short-form UGC-style video ads focusing on unboxing and taste tests.</span>
                        </li>
                        <li className="flex items-start gap-3">
                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 mt-2.5 flex-shrink-0"></span>
                            <span>Configured Meta Pixel and Conversions API for precise tracking despite iOS14 limitations.</span>
                        </li>
                        <li className="flex items-start gap-3">
                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 mt-2.5 flex-shrink-0"></span>
                            <span>A/B tested 4 different landing pages, optimizing for mobile checkout speed.</span>
                        </li>
                        <li className="flex items-start gap-3">
                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 mt-2.5 flex-shrink-0"></span>
                            <span>Implemented a WhatsApp automation flow to recover abandoned carts, capturing an extra 12% in revenue.</span>
                        </li>
                    </ul>
                </div>
            </section>

            {/* The Results */}
            <section className="grid grid-cols-1 md:grid-cols-12 gap-12 border-t border-border/40 pt-20">
                <div className="md:col-span-4">
                    <h2 className="text-3xl font-display font-bold text-foreground uppercase italic tracking-tighter">The Payoff</h2>
                </div>
                <div className="md:col-span-8">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 mb-12">
                        <div className="p-8 rounded-3xl bg-emerald-950/30 border border-emerald-500/20">
                            <div className="text-5xl font-bold text-emerald-500 mb-2">35%</div>
                            <div className="text-xs text-zinc-500 font-bold uppercase tracking-widest">CPA Drop in 90 Days</div>
                        </div>
                        <div className="p-8 rounded-3xl bg-emerald-950/30 border border-emerald-500/20">
                            <div className="text-5xl font-bold text-emerald-500 mb-2">21K+</div>
                            <div className="text-xs text-zinc-500 font-bold uppercase tracking-widest">Total Deliveries</div>
                        </div>
                    </div>
                    <p className="text-xl text-muted-foreground font-medium leading-relaxed italic">
                        "The combination of high-impact video ads and precise Meta retargeting allowed us to scale without losing efficiency. We didn't just grow awareness; we built a revenue machine."
                    </p>
                </div>
            </section>

            {/* Influencer Collaborations */}
            <section className="grid grid-cols-1 md:grid-cols-12 gap-8 border-t border-border/40 pt-20">
                <div className="md:col-span-4">
                    <h2 className="text-2xl font-display font-bold text-foreground uppercase tracking-tight">Influencer Collaborations</h2>
                    <p className="text-sm text-muted-foreground mt-3 leading-relaxed font-light">
                        We collaborated with local fitness and lifestyle content creators to build organic social proof and drive subscription signups in the UAE.
                    </p>
                </div>
                <div className="md:col-span-8">
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        <div className="bg-muted/10 border border-border/40 hover:border-emerald-500/20 transition-all rounded-3xl overflow-hidden p-4 flex flex-col gap-4 shadow-lg">
                            <div className="w-full aspect-[9/16] rounded-2xl overflow-hidden bg-black border border-border/30">
                                <iframe
                                    src="https://player.cloudinary.com/embed/?cloud_name=dgmieaf9g&public_id=PrepMeal_Influencer_Collab_gina_fitnfab__vj6whx"
                                    className="w-full h-full border-0"
                                    allow="autoplay; fullscreen; encrypted-media; picture-in-picture"
                                    allowFullScreen
                                />
                            </div>
                            <div className="px-1">
                                <h4 className="text-sm font-bold text-foreground mb-1 uppercase tracking-tight">Gina Fit & Fab</h4>
                                <p className="text-muted-foreground text-xs leading-relaxed font-light">Macro-friendly meal prep walkthrough and taste test.</p>
                            </div>
                        </div>

                        <div className="bg-muted/10 border border-border/40 hover:border-emerald-500/20 transition-all rounded-3xl overflow-hidden p-4 flex flex-col gap-4 shadow-lg">
                            <div className="w-full aspect-[9/16] rounded-2xl overflow-hidden bg-black border border-border/30">
                                <iframe
                                    src="https://player.cloudinary.com/embed/?cloud_name=dgmieaf9g&public_id=Prepmeal_Influencer_Collab_1_aa1lkx"
                                    className="w-full h-full border-0"
                                    allow="autoplay; fullscreen; encrypted-media; picture-in-picture"
                                    allowFullScreen
                                />
                            </div>
                            <div className="px-1">
                                <h4 className="text-sm font-bold text-foreground mb-1 uppercase tracking-tight">Daily Routine</h4>
                                <p className="text-muted-foreground text-xs leading-relaxed font-light">Day-in-the-life sharing nutrition routine and meal scheduling.</p>
                            </div>
                        </div>

                        <div className="bg-muted/10 border border-border/40 hover:border-emerald-500/20 transition-all rounded-3xl overflow-hidden p-4 flex flex-col gap-4 shadow-lg">
                            <div className="w-full aspect-[9/16] rounded-2xl overflow-hidden bg-black border border-border/30">
                                <iframe
                                    src="https://player.cloudinary.com/embed/?cloud_name=dgmieaf9g&public_id=PrepMeal_Influencer_Collab_u3txhn"
                                    className="w-full h-full border-0"
                                    allow="autoplay; fullscreen; encrypted-media; picture-in-picture"
                                    allowFullScreen
                                />
                            </div>
                            <div className="px-1">
                                <h4 className="text-sm font-bold text-foreground mb-1 uppercase tracking-tight">UGC Taste Test</h4>
                                <p className="text-muted-foreground text-xs leading-relaxed font-light">Unboxing and food quality review highlighting freshness.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
      </div>
    </div>
  );
}
