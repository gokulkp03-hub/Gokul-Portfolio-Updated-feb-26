import { ArrowLeft, Eye, X } from "lucide-react";
import { useEffect, useState } from "react";
import { Link } from "wouter";
import { motion } from "framer-motion";
import { MorphBlob } from "@/components/ui/MorphBlob";

export default function PrepmealCaseStudy() {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

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
            className="bg-emerald-500 text-black p-8 md:p-14 rounded-[2rem] mb-20 text-center flex flex-col items-center justify-center border border-emerald-400/50 shadow-2xl shadow-emerald-500/20"
        >
            <span className="text-xs font-bold uppercase tracking-[0.4em] mb-4 opacity-80 italic">Verified Performance (Meta Ads Lifetime)</span>
            <h2 className="text-5xl md:text-[6.5rem] font-display font-bold tracking-tighter leading-none mb-6">6,133 Inquiries</h2>
            <p className="text-xl md:text-2xl font-bold uppercase tracking-tight max-w-2xl">
                Generated 6,133 messaging conversations from 4.4M+ impressions & AED 159.5K spend.
            </p>
        </motion.div>

        <h1 className="text-4xl md:text-6xl font-display font-bold leading-[1.1] mb-6 tracking-tight">
            Prepmeal: Performance Marketing & Scale.
        </h1>
        <p className="text-xl text-muted-foreground max-w-2xl mb-16 font-medium leading-relaxed">
            Full-funnel Meta Ads strategy for a UAE meal-prep startup. Managed AED 159.5K+ in spend across 50 campaigns to scale WhatsApp customer conversations and subscription growth.
        </p>

        {/* Meta */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-16 border-y border-border/40 py-8">
          <div><div className="text-sm font-medium text-foreground">Client</div><div className="text-sm text-muted-foreground mt-1">Prepmeal UAE</div></div>
          <div><div className="text-sm font-medium text-foreground">Industry</div><div className="text-sm text-muted-foreground mt-1">F&B / Subscription</div></div>
          <div><div className="text-sm font-medium text-foreground">Platform</div><div className="text-sm text-muted-foreground mt-1">Meta Ads (IG & FB)</div></div>
          <div><div className="text-sm font-medium text-foreground">Role</div><div className="text-sm text-muted-foreground mt-1">Performance & Creative Strategy</div></div>
        </div>

        {/* Hero Image */}
        <div className="w-full aspect-[21/9] bg-muted/30 border border-border/40 rounded-2xl mb-16 overflow-hidden relative group rounded-3xl">
            <img src="/assets/images/case-studies/prepmeal/PrepMeal Website.jpg" alt="Prepmeal Presentation" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" onError={(e) => { e.currentTarget.style.display='none'; }}/>
            <div className="absolute inset-0 bg-black/20" />
        </div>

        {/* Results Grid */}
        <div className="mb-16">
            <h2 className="text-xs font-bold uppercase tracking-widest text-muted-foreground mb-8">Lifetime Meta Ads Performance (Jul 2023 – Aug 2026)</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="glass-card p-6 bg-card">
                    <div className="text-3xl font-bold text-emerald-500 mb-2">6,133</div>
                    <div className="text-xs text-muted-foreground uppercase tracking-wider">Conversations Started</div>
                </div>
                <div className="glass-card p-6 bg-card">
                    <div className="text-3xl font-bold text-foreground mb-2">AED 159.5K</div>
                    <div className="text-xs text-muted-foreground uppercase tracking-wider">Total Ad Spend</div>
                </div>
                <div className="glass-card p-6 bg-card">
                    <div className="text-3xl font-bold text-foreground mb-2">4.44M</div>
                    <div className="text-xs text-muted-foreground uppercase tracking-wider">Total Impressions</div>
                </div>
                <div className="glass-card p-6 bg-card">
                    <div className="text-3xl font-bold text-emerald-500 mb-2">AED 3.72</div>
                    <div className="text-xs text-muted-foreground uppercase tracking-wider">Lowest CPL (Promo)</div>
                </div>
            </div>
        </div>

        {/* Campaign Breakdown Table & Key Insights */}
        <section className="mb-20 p-8 md:p-10 rounded-3xl bg-muted/20 border border-border/50">
            <h2 className="text-2xl font-display font-bold text-foreground mb-3">Meta Ads Campaign Performance Breakdown</h2>
            <p className="text-sm text-muted-foreground mb-8 font-light">Analysis of top-performing Meta campaigns driving high-intent messaging leads and subscriptions across the GCC.</p>
            
            <div className="space-y-4">
                <div className="p-5 rounded-2xl bg-emerald-950/20 border border-emerald-500/30 flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div>
                        <div className="flex items-center gap-2">
                            <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-emerald-500 text-black uppercase">Top Efficiency Spike</span>
                            <h3 className="font-bold text-foreground">July Promo – Messages</h3>
                        </div>
                        <p className="text-xs text-muted-foreground mt-1">AED 3,395 spend · 10.3% CTR (9x account avg)</p>
                    </div>
                    <div className="text-right flex md:flex-col justify-between items-center md:items-end">
                        <span className="text-2xl font-bold text-emerald-400">913 Leads</span>
                        <span className="text-xs font-semibold text-muted-foreground">AED 3.72 / Conv</span>
                    </div>
                </div>

                <div className="p-5 rounded-2xl bg-card border border-border/40 flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div>
                        <div className="flex items-center gap-2">
                            <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-muted text-muted-foreground uppercase">Volume Leader</span>
                            <h3 className="font-bold text-foreground">Whatsapp Messenger Camp (Retro)</h3>
                        </div>
                        <p className="text-xs text-muted-foreground mt-1">AED 11,351 spend · High-converting chat flow</p>
                    </div>
                    <div className="text-right flex md:flex-col justify-between items-center md:items-end">
                        <span className="text-2xl font-bold text-foreground">1,243 Leads</span>
                        <span className="text-xs font-semibold text-muted-foreground">AED 9.13 / Conv</span>
                    </div>
                </div>

                <div className="p-5 rounded-2xl bg-card border border-border/40 flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div>
                        <h3 className="font-bold text-foreground">Whatsapp Messenger Camp (Retro) Video</h3>
                        <p className="text-xs text-muted-foreground mt-1">AED 12,523 spend · Short-form video UGC</p>
                    </div>
                    <div className="text-right flex md:flex-col justify-between items-center md:items-end">
                        <span className="text-2xl font-bold text-foreground">655 Leads</span>
                        <span className="text-xs font-semibold text-muted-foreground">AED 19.12 / Conv</span>
                    </div>
                </div>

                <div className="p-5 rounded-2xl bg-card border border-border/40 flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div>
                        <h3 className="font-bold text-foreground">April PrepMeal Campaign</h3>
                        <p className="text-xs text-muted-foreground mt-1">AED 24,413 spend · Broad demographic retargeting</p>
                    </div>
                    <div className="text-right flex md:flex-col justify-between items-center md:items-end">
                        <span className="text-2xl font-bold text-foreground">675 Leads</span>
                        <span className="text-xs font-semibold text-muted-foreground">AED 36.17 / Conv</span>
                    </div>
                </div>
            </div>
        </section>

        <div className="space-y-24 mt-24">
            {/* The Challenge */}
            <section className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
                <div className="md:col-span-4">
                    <h2 className="text-2xl font-display font-bold text-foreground">The Challenge</h2>
                    <p className="text-xs text-muted-foreground mt-1">Market Saturation & High CAC</p>
                </div>
                <div className="md:col-span-8">
                    <div className="space-y-4">
                        <p className="text-base sm:text-lg text-muted-foreground font-light leading-relaxed">
                            The UAE meal prep market is highly saturated with established players holding substantial market share. Prepmeal needed to launch as a fresh, health-focused alternative without an initial customer base, while keeping customer acquisition costs viable for a subscription model.
                        </p>
                        <p className="text-base sm:text-lg text-muted-foreground font-light leading-relaxed">
                            The objective was building a cost-effective performance marketing engine on Meta Ads to drive high-intent WhatsApp inquiries at scale, while continuously optimizing cost-per-conversation.
                        </p>
                    </div>

                    <div 
                        onClick={() => setSelectedImage('/assets/images/case-studies/prepmeal/Chicken Pesto.jpg')}
                        className="mt-6 aspect-[21/9] rounded-2xl overflow-hidden border border-border/40 bg-muted/20 group cursor-pointer relative shadow-lg"
                    >
                        <img 
                            src="/assets/images/case-studies/prepmeal/Chicken Pesto.jpg" 
                            alt="Prepmeal Fresh Culinary Production" 
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                        <div className="absolute bottom-3 left-4 right-4 flex items-center justify-between text-white text-xs">
                            <span className="font-semibold">In-House Culinary Asset Production · Chicken Pesto Bowl</span>
                            <span className="bg-black/60 backdrop-blur-md px-2.5 py-1 rounded-full text-[10px] font-mono flex items-center gap-1">
                                <Eye className="w-3 h-3 text-emerald-400" /> View
                            </span>
                        </div>
                    </div>
                </div>
            </section>

            {/* The Strategy */}
            <section className="grid grid-cols-1 md:grid-cols-12 gap-8">
                <div className="md:col-span-4">
                    <h2 className="text-2xl font-display font-bold text-foreground">The Strategy</h2>
                    <p className="text-xs text-muted-foreground mt-1">Full-Funnel Meta Advertising</p>
                </div>
                <div className="md:col-span-8">
                    <div className="space-y-6">
                        <div 
                            onClick={() => setSelectedImage('/assets/images/case-studies/prepmeal/Sourdough Labneh Zaatar.jpg')}
                            className="p-6 rounded-2xl bg-muted/20 border border-border/40 hover:border-emerald-500/30 transition-all group cursor-pointer"
                        >
                            <div className="grid grid-cols-1 sm:grid-cols-12 gap-5 items-center">
                                <div className="sm:col-span-5 aspect-[4/3] rounded-xl overflow-hidden bg-black border border-border/40">
                                    <img src="/assets/images/case-studies/prepmeal/Sourdough Labneh Zaatar.jpg" alt="Creative Production" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                                </div>
                                <div className="sm:col-span-7">
                                    <h3 className="text-lg font-bold text-emerald-500 mb-2">1. Creative Production</h3>
                                    <p className="text-sm text-muted-foreground font-light leading-relaxed">
                                        Instead of standard stock imagery, localized short-form video and crisp food photography shoots were produced to emphasize freshness, macro-nutrients, and convenience for Dubai professionals.
                                    </p>
                                </div>
                            </div>
                        </div>

                        <div 
                            onClick={() => setSelectedImage('/assets/images/case-studies/prepmeal/Pancakes.jpg')}
                            className="p-6 rounded-2xl bg-muted/20 border border-border/40 hover:border-emerald-500/30 transition-all group cursor-pointer"
                        >
                            <div className="grid grid-cols-1 sm:grid-cols-12 gap-5 items-center">
                                <div className="sm:col-span-5 aspect-[4/3] rounded-xl overflow-hidden bg-black border border-border/40">
                                    <img src="/assets/images/case-studies/prepmeal/Pancakes.jpg" alt="Direct WhatsApp Funnel" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                                </div>
                                <div className="sm:col-span-7">
                                    <h3 className="text-lg font-bold text-emerald-500 mb-2">2. Direct WhatsApp Funnel</h3>
                                    <p className="text-sm text-muted-foreground font-light leading-relaxed">
                                        WhatsApp direct chat campaigns lowered friction for potential subscribers and enabled immediate meal plan consultations with the sales desk, avoiding lengthy website checkout funnels.
                                    </p>
                                </div>
                            </div>
                        </div>

                        <div 
                            onClick={() => setSelectedImage('/assets/images/case-studies/prepmeal/Chicken Butter Burrito.jpg')}
                            className="p-6 rounded-2xl bg-muted/20 border border-border/40 hover:border-emerald-500/30 transition-all group cursor-pointer"
                        >
                            <div className="grid grid-cols-1 sm:grid-cols-12 gap-5 items-center">
                                <div className="sm:col-span-5 aspect-[4/3] rounded-xl overflow-hidden bg-black border border-border/40">
                                    <img src="/assets/images/case-studies/prepmeal/Chicken Butter Burrito.jpg" alt="Offer Testing" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                                </div>
                                <div className="sm:col-span-7">
                                    <h3 className="text-lg font-bold text-emerald-500 mb-2">3. Offer Testing</h3>
                                    <p className="text-sm text-muted-foreground font-light leading-relaxed">
                                        Testing promotional hooks and discount angles identified high-converting offers. The stand-out July Promo campaign delivered a 10.3% CTR and reduced messaging costs to AED 3.72 per conversation.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Visual Culinary Creative Showcase */}
            <section className="space-y-6">
                <div>
                    <span className="text-xs font-mono uppercase tracking-widest text-emerald-500">Visual Asset Library</span>
                    <h2 className="text-2xl sm:text-3xl font-display font-bold text-foreground mt-1">
                        High-Converting Culinary Creatives
                    </h2>
                    <p className="text-sm text-muted-foreground font-light mt-1">
                        A curated snapshot of high-retention food styling and advertising assets shot for Meta Ads.
                    </p>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    <div 
                        onClick={() => setSelectedImage('/assets/images/case-studies/prepmeal/Chicken Pesto.jpg')}
                        className="group relative aspect-square rounded-2xl overflow-hidden border border-border/40 bg-muted/30 cursor-pointer shadow-md"
                    >
                        <img src="/assets/images/case-studies/prepmeal/Chicken Pesto.jpg" alt="Chicken Pesto" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-3">
                            <span className="text-xs font-semibold text-white">Chicken Pesto Bowl</span>
                        </div>
                    </div>

                    <div 
                        onClick={() => setSelectedImage('/assets/images/case-studies/prepmeal/Pancakes.jpg')}
                        className="group relative aspect-square rounded-2xl overflow-hidden border border-border/40 bg-muted/30 cursor-pointer shadow-md"
                    >
                        <img src="/assets/images/case-studies/prepmeal/Pancakes.jpg" alt="Protein Pancakes" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-3">
                            <span className="text-xs font-semibold text-white">Fluffy Protein Pancakes</span>
                        </div>
                    </div>

                    <div 
                        onClick={() => setSelectedImage('/assets/images/case-studies/prepmeal/Chicken Butter Burrito.jpg')}
                        className="group relative aspect-square rounded-2xl overflow-hidden border border-border/40 bg-muted/30 cursor-pointer shadow-md"
                    >
                        <img src="/assets/images/case-studies/prepmeal/Chicken Butter Burrito.jpg" alt="Chicken Butter Burrito" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-3">
                            <span className="text-xs font-semibold text-white">Chicken Butter Burrito</span>
                        </div>
                    </div>

                    <div 
                        onClick={() => setSelectedImage('/assets/images/case-studies/prepmeal/Sourdough Labneh Zaatar.jpg')}
                        className="group relative aspect-square rounded-2xl overflow-hidden border border-border/40 bg-muted/30 cursor-pointer shadow-md"
                    >
                        <img src="/assets/images/case-studies/prepmeal/Sourdough Labneh Zaatar.jpg" alt="Sourdough Labneh Zaatar" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-3">
                            <span className="text-xs font-semibold text-white">Sourdough Labneh & Zaatar</span>
                        </div>
                    </div>

                    <div 
                        onClick={() => setSelectedImage('/assets/images/case-studies/prepmeal/Acai Smoothie.jpg')}
                        className="group relative aspect-square rounded-2xl overflow-hidden border border-border/40 bg-muted/30 cursor-pointer shadow-md"
                    >
                        <img src="/assets/images/case-studies/prepmeal/Acai Smoothie.jpg" alt="Acai Smoothie" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-3">
                            <span className="text-xs font-semibold text-white">Superfood Acai Smoothie</span>
                        </div>
                    </div>

                    <div 
                        onClick={() => setSelectedImage('/assets/images/case-studies/prepmeal/Macros Club.jpg')}
                        className="group relative aspect-square rounded-2xl overflow-hidden border border-border/40 bg-muted/30 cursor-pointer shadow-md"
                    >
                        <img src="/assets/images/case-studies/prepmeal/Macros Club.jpg" alt="Macros Club Lifestyle" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-3">
                            <span className="text-xs font-semibold text-white">Macros Club Social Creative</span>
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
                            <span>Managed AED 159.5K+ in spend across 50 campaigns on Meta Ads (Instagram & Facebook).</span>
                        </li>
                        <li className="flex items-start gap-3">
                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 mt-2.5 flex-shrink-0"></span>
                            <span>Produced 20+ short-form video ads focusing on unboxing, meal taste tests, and nutritional breakdowns.</span>
                        </li>
                        <li className="flex items-start gap-3">
                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 mt-2.5 flex-shrink-0"></span>
                            <span>Scaled WhatsApp messaging campaigns, delivering 6,133 total direct customer conversations.</span>
                        </li>
                        <li className="flex items-start gap-3">
                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 mt-2.5 flex-shrink-0"></span>
                            <span>Audited creative and placement data weekly to cut underperforming assets and push budget into winning hooks.</span>
                        </li>
                    </ul>
                </div>
            </section>

            {/* The Results */}
            <section className="grid grid-cols-1 md:grid-cols-12 gap-12 border-t border-border/40 pt-20">
                <div className="md:col-span-4">
                    <h2 className="text-3xl font-display font-bold text-foreground uppercase tracking-tight">The Results</h2>
                </div>
                <div className="md:col-span-8">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 mb-12">
                        <div className="p-8 rounded-3xl bg-emerald-950/30 border border-emerald-500/20">
                            <div className="text-5xl font-bold text-emerald-500 mb-2">6,133</div>
                            <div className="text-xs text-zinc-400 font-bold uppercase tracking-widest">Total Messaging Conversations</div>
                        </div>
                        <div className="p-8 rounded-3xl bg-emerald-950/30 border border-emerald-500/20">
                            <div className="text-5xl font-bold text-emerald-500 mb-2">AED 3.72</div>
                            <div className="text-xs text-zinc-400 font-bold uppercase tracking-widest">Lowest Cost Per Conversation</div>
                        </div>
                    </div>
                    <p className="text-lg text-muted-foreground font-light leading-relaxed">
                        By pairing custom short-form video with direct WhatsApp messaging, potential subscribers had a direct line to the sales team instead of having to navigate a high-friction form or complex cart. Over 6,100 conversations were started across the UAE.
                    </p>
                </div>
            </section>

            {/* Influencer Collaborations */}
            <section className="grid grid-cols-1 md:grid-cols-12 gap-8 border-t border-border/40 pt-20">
                <div className="md:col-span-4">
                    <h2 className="text-2xl font-display font-bold text-foreground uppercase tracking-tight">Influencer Collaborations</h2>
                    <p className="text-sm text-muted-foreground mt-3 leading-relaxed font-light">
                        Collaborations with local fitness and lifestyle creators generated organic social proof and aided subscription signups across Dubai.
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

            {/* Food & Creative Content Gallery */}
            <section className="grid grid-cols-1 md:grid-cols-12 gap-8 border-t border-border/40 pt-20">
                <div className="md:col-span-4">
                    <h2 className="text-2xl font-display font-bold text-foreground uppercase tracking-tight">Culinary & Brand Visuals</h2>
                    <p className="text-sm text-muted-foreground mt-3 leading-relaxed font-light">
                        High-converting food photography and lifestyle content produced for Meta ad creative testing and social media acquisition.
                    </p>
                </div>
                <div className="md:col-span-8">
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                        <div 
                            onClick={() => setSelectedImage('/assets/images/case-studies/prepmeal/Chicken Pesto.jpg')}
                            className="group overflow-hidden rounded-2xl border border-border/40 bg-muted/20 aspect-square relative cursor-pointer"
                        >
                            <img src="/assets/images/case-studies/prepmeal/Chicken Pesto.jpg" alt="Chicken Pesto Meal Prep" className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity p-4 flex items-end">
                                <span className="text-xs font-semibold text-white">Chicken Pesto Macro Meal</span>
                            </div>
                        </div>

                        <div 
                            onClick={() => setSelectedImage('/assets/images/case-studies/prepmeal/Sourdough Labneh Zaatar.jpg')}
                            className="group overflow-hidden rounded-2xl border border-border/40 bg-muted/20 aspect-square relative cursor-pointer"
                        >
                            <img src="/assets/images/case-studies/prepmeal/Sourdough Labneh Zaatar.jpg" alt="Healthy Breakfast Prep" className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity p-4 flex items-end">
                                <span className="text-xs font-semibold text-white">Sourdough & Labneh Prep</span>
                            </div>
                        </div>

                        <div 
                            onClick={() => setSelectedImage('/assets/images/case-studies/prepmeal/Acai Smoothie.jpg')}
                            className="group overflow-hidden rounded-2xl border border-border/40 bg-muted/20 aspect-square relative cursor-pointer"
                        >
                            <img src="/assets/images/case-studies/prepmeal/Acai Smoothie.jpg" alt="Fresh Acai Bowl" className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity p-4 flex items-end">
                                <span className="text-xs font-semibold text-white">Fresh Organic Acai</span>
                            </div>
                        </div>

                        <div 
                            onClick={() => setSelectedImage('/assets/images/case-studies/prepmeal/Chicken Butter Burrito.jpg')}
                            className="group overflow-hidden rounded-2xl border border-border/40 bg-muted/20 aspect-square relative cursor-pointer"
                        >
                            <img src="/assets/images/case-studies/prepmeal/Chicken Butter Burrito.jpg" alt="High Protein Burrito" className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity p-4 flex items-end">
                                <span className="text-xs font-semibold text-white">High-Protein Burrito</span>
                            </div>
                        </div>

                        <div 
                            onClick={() => setSelectedImage('/assets/images/case-studies/prepmeal/Pancakes.jpg')}
                            className="group overflow-hidden rounded-2xl border border-border/40 bg-muted/20 aspect-square relative cursor-pointer"
                        >
                            <img src="/assets/images/case-studies/prepmeal/Pancakes.jpg" alt="Protein Pancakes" className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity p-4 flex items-end">
                                <span className="text-xs font-semibold text-white">Fitness Protein Pancakes</span>
                            </div>
                        </div>

                        <div 
                            onClick={() => setSelectedImage('/assets/images/case-studies/prepmeal/Macros Club.jpg')}
                            className="group overflow-hidden rounded-2xl border border-border/40 bg-muted/20 aspect-square relative cursor-pointer"
                        >
                            <img src="/assets/images/case-studies/prepmeal/Macros Club.jpg" alt="Prepmeal Plan Menu" className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" onError={(e) => { e.currentTarget.style.display='none'; }} />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity p-4 flex items-end">
                                <span className="text-xs font-semibold text-white">Macro Meal Card</span>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>

        {/* Image Lightbox Modal */}
        {selectedImage && (
          <div 
            className="fixed inset-0 z-[200] bg-black/90 backdrop-blur-md flex items-center justify-center p-4 cursor-pointer animate-in fade-in duration-200"
            onClick={() => setSelectedImage(null)}
          >
            <div className="relative max-w-5xl max-h-[90vh] rounded-2xl overflow-hidden border border-border/40 shadow-2xl bg-zinc-950 p-2" onClick={(e) => e.stopPropagation()}>
              <button 
                onClick={() => setSelectedImage(null)}
                className="absolute top-4 right-4 z-10 w-10 h-10 rounded-full bg-black/80 hover:bg-zinc-900 text-white flex items-center justify-center border border-white/20 transition-colors cursor-pointer shadow-lg"
              >
                <X className="w-5 h-5" />
              </button>
              <img src={selectedImage} alt="Expanded preview" className="w-full h-full max-h-[82vh] object-contain rounded-xl" />
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
