"use client";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { Link } from "wouter";
import { ArrowUpRight, ChevronDown } from "lucide-react";
import { useState, useEffect, useMemo, useRef } from "react";
import { trpc } from "@/lib/trpc";
import { MorphBlob } from "@/components/ui/MorphBlob";
import { RevealText } from "@/components/ui/RevealText";
import { AnimatedCounter } from "@/components/ui/AnimatedCounter";
import { useScroll, useTransform } from "framer-motion";
import { setSEO } from "../utils/seo";
import { marketingCampaigns as staticMarketing } from "@/data/marketing";

// ------- FAQ Item -------
function FAQItem({ question, answer }: { question: string; answer: string }) {
  const [isOpen, setIsOpen] = useState(false);
  const prefersReducedMotion = useReducedMotion();
  
  return (
    <div className="border-b border-border/40 py-4">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center justify-between w-full text-left font-medium text-lg hover:text-emerald-500 transition-colors"
      >
        {question}
        <motion.div animate={prefersReducedMotion ? undefined : { rotate: isOpen ? 180 : 0 }} transition={{ duration: 0.3 }}>
          <ChevronDown className="w-5 h-5" />
        </motion.div>
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={prefersReducedMotion ? { height: "auto", opacity: 1 } : { height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={prefersReducedMotion ? { height: 0, opacity: 0 } : { height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden"
          >
            <p className="pt-2 pb-4 text-muted-foreground leading-relaxed">{answer}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// ------- Case Study Flip Card -------
function CaseStudyCard({ campaign, i }: { campaign: any; i: number }) {
  const [isFlipped, setIsFlipped] = useState(false);

  let parsedResults: any[] = [];
  try {
    parsedResults = typeof campaign.results === "string" ? JSON.parse(campaign.results) : campaign.results || [];
  } catch {}

  let industry = "Growth";
  try {
    const tags = typeof campaign.tags === "string" ? JSON.parse(campaign.tags) : campaign.tags;
    if (Array.isArray(tags) && tags[0]) industry = tags[0];
  } catch {}

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: i * 0.1, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className="relative w-full h-[380px] perspective-1000"
    >
      <motion.div
        animate={{ rotateY: isFlipped ? 180 : 0 }}
        transition={{ duration: 0.6, type: "spring", stiffness: 260, damping: 20 }}
        className="w-full h-full relative cursor-pointer group rounded-2xl shadow-xl transform-style-3d"
        onClick={() => setIsFlipped(!isFlipped)}
      >
        {/* Front Face */}
        <div className="backface-hidden absolute inset-0 glass-card p-6 md:p-8 border border-border/20 group-hover:border-emerald-500/30 transition-colors overflow-hidden rounded-2xl flex flex-col justify-between bg-card">
          <div className="absolute top-0 right-0 w-40 h-40 bg-emerald-500/5 blur-3xl group-hover:bg-emerald-500/10 transition-colors pointer-events-none" />
          <div className="relative z-10 flex flex-col h-full">
            <div className="flex items-center justify-between mb-6">
              <span className="text-[10px] font-bold uppercase tracking-[0.2em] px-3 py-1 bg-emerald-500/10 border border-emerald-500/20 rounded-full text-emerald-500">
                {industry}
              </span>
              <div className="p-2 rounded-full border border-border/50 group-hover:border-emerald-500/50 text-muted-foreground group-hover:text-emerald-500 transition-colors">
                 <ArrowUpRight className="w-4 h-4" />
              </div>
            </div>
            <h3 className="text-3xl font-bold mb-4 group-hover:text-emerald-500 transition-colors uppercase tracking-tighter leading-none">{campaign.title}</h3>
            
            <div className="grid grid-cols-2 gap-4 mt-auto">
                {Array.isArray(parsedResults) && parsedResults.slice(0, 2).map((res: any, j: number) => (
                    <div key={j} className="bg-zinc-900/50 border border-zinc-800 p-4 rounded-xl">
                        <div className="text-[10px] uppercase tracking-widest text-zinc-500 mb-1">{res.label}</div>
                        <div className="text-xl font-bold text-emerald-500">{res.value}</div>
                    </div>
                ))}
            </div>

            <div className="text-zinc-500 text-[10px] font-bold uppercase tracking-widest mt-8 flex items-center justify-between">
              <span>View Full Narrative</span>
              <span className="opacity-0 group-hover:opacity-100 transition-opacity">Click to Reveal →</span>
            </div>
          </div>
        </div>
        
        {/* Back Face */}
        <div className="backface-hidden [transform:rotateY(180deg)] absolute inset-0 glass-card p-6 md:p-8 border border-emerald-500/30 bg-emerald-950/20 overflow-hidden rounded-2xl flex flex-col justify-between">
           <h3 className="text-xl font-bold text-white mb-6 border-b border-emerald-500/20 pb-4">Campaign Metrics</h3>
           <div className="flex-1 space-y-4">
              {Array.isArray(parsedResults) && parsedResults.map((res: any, j: number) => (
                <div key={j} className="flex justify-between items-center border-l-2 border-emerald-500 pl-4 py-1">
                  <span className="text-xs uppercase tracking-wider text-emerald-100/60">{res.label}</span>
                  <span className="text-xl font-bold text-emerald-400">{res.value}</span>
                </div>
              ))}
           </div>
           
           <Link href={`/marketing/${campaign.slug}`}>
               <a className="mt-6 text-center block w-full py-3.5 bg-emerald-500 hover:bg-emerald-400 text-black font-bold rounded-xl transition-colors" onClick={(e) => e.stopPropagation()}>
                  Read Full Study
               </a>
           </Link>
        </div>
      </motion.div>
    </motion.div>
  );
}

// ------- Marketing Hero -------
function MarketingHero() {
  const stats = [
    { val: 500, suffix: "K+", prefix: "AED ", label: "Ad Spend Managed" },
    { val: 2, suffix: "M+", prefix: "AED ", label: "Revenue Generated" },
    { val: 4.2, suffix: "x", prefix: "", label: "Avg ROAS" },
    { val: 150, suffix: "+", prefix: "", label: "Campaigns Run" },
  ];

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-background pt-32 pb-20">
      {/* Ambient background */}
      <MorphBlob color="emerald-500" size={700} opacity={0.05} blur={150} className="left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2" animDuration={14} />

      <div className="relative z-10 w-full max-w-5xl mx-auto px-4 flex flex-col items-center">
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="flex flex-col items-center"
        >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-500/10 text-emerald-400 text-xs font-semibold uppercase tracking-widest mb-8 border border-emerald-500/20 shadow-xl shadow-emerald-500/5">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                Performance Marketing
            </div>

            <h1 className="text-white text-6xl sm:text-7xl md:text-[8rem] font-display font-bold tracking-tighter mb-12 text-center leading-[0.8] uppercase">
                Profit <br />
                <span className="text-emerald-500 italic">Engineering.</span>
            </h1>

            <p className="text-xl md:text-2xl text-zinc-500 max-w-2xl mx-auto mb-16 text-center font-medium tracking-tight">
                I build performance systems that turn ad spend into scalable revenue. No fluff, just ROAS.
            </p>

            {/* Dashboard Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-px bg-zinc-800/50 border border-zinc-800/50 rounded-3xl overflow-hidden w-full max-w-5xl mb-20 shadow-2xl">
                {stats.map((s, i) => (
                <motion.div
                    key={i}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.2 + i * 0.1 }}
                    className="bg-zinc-950 p-10 text-center flex flex-col items-center justify-center group hover:bg-zinc-900 transition-colors"
                >
                    <div className="text-emerald-500 text-4xl md:text-5xl font-bold tabular-nums mb-3 tracking-tighter">
                        {s.prefix}{s.val}{s.suffix}
                    </div>
                    <div className="text-zinc-500 text-[10px] uppercase font-bold tracking-[0.2em]">{s.label}</div>
                </motion.div>
                ))}
            </div>

            <div className="text-[10px] text-zinc-600 uppercase tracking-widest text-center mt-[-30px] mb-12 select-none">
              *All campaign spend, reach, and revenue performance are combined metrics aggregated across all managed client accounts.
            </div>

            {/* CTA */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6, duration: 0.6 }}
                className="flex flex-col sm:flex-row items-center gap-4"
            >
                <Link href="/contact">
                    <a className="px-8 py-4 bg-emerald-500 hover:bg-emerald-400 text-black font-bold rounded-full transition-all hover:shadow-xl hover:shadow-emerald-500/20 hover:-translate-y-1 flex items-center gap-2">
                    Start Your Growth Arc
                    <ArrowUpRight className="w-4 h-4" />
                    </a>
                </Link>
                <Link href="/results">
                    <a className="px-8 py-4 border border-border/50 hover:border-emerald-500/50 text-muted-foreground hover:text-foreground rounded-full transition-all inline-block text-center whitespace-nowrap">
                    View Case Studies
                    </a>
                </Link>
            </motion.div>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-muted-foreground/40"
      >
        <span className="text-xs uppercase tracking-[0.3em]">Scroll</span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
          className="w-px h-8 bg-gradient-to-b from-muted-foreground/30 to-transparent"
        />
      </motion.div>
    </section>
  );
}

// ------- Main Page -------
const processSteps = [
  { title: "Audit & Strategy", desc: "Deep dive into your current data and competitors." },
  { title: "Creative Setup", desc: "Designing high-converting ad creatives." },
  { title: "Launch & Test", desc: "A/B testing audiences and hooks." },
  { title: "Scale & Optimize", desc: "Doubling down on winners, cutting losers." },
];

const faqs = [
  { q: "What is your minimum budget?", a: "I recommend a minimum ad spend of AED 5,000/month to ensure we have enough data for optimization." },
  { q: "Do you guarantee results?", a: "I guarantee a data-driven process. While specific ROAS cannot be legally guaranteed, my track record shows consistent growth." },
  { q: "How long does it take?", a: "Optimization is ongoing, but initial results typically appear within the first 14-30 days." },
  { q: "Do you handle creative?", a: "Yes, I provide creative strategy and can produce ad assets as part of the retainer." },
];

export default function MarketingService() {
  useEffect(() => {
    setSEO({
      title: "Best Digital Marketer in Dubai | Meta Ads & Growth | Gokul KP",
      description: "Scale your B2C business with the best digital marketer in Dubai. Affordable Meta Ads campaigns, lead generation funnels, and GCC WhatsApp automation."
    });
  }, []);

  const { data: dbProjects } = trpc.projects.list.useQuery();

  const processRef = useRef(null);
  const { scrollYProgress: processProgress } = useScroll({ target: processRef, offset: ["start center", "end center"] });

  const campaigns = useMemo(() => {
    if (dbProjects && (dbProjects as any[]).length > 0) {
      const dbCamps = (dbProjects as any[]).filter((p) => p.category.toLowerCase() === "marketing");
      if (dbCamps.length > 0) return dbCamps;
    }
    // Fallback to static marketing data
    return staticMarketing.map((m) => ({
      id: m.id,
      slug: m.slug,
      title: m.title,
      results: JSON.stringify(m.metrics.map((met) => ({ label: met.label, value: met.value }))),
      tags: JSON.stringify(m.tags),
      category: "marketing",
    }));
  }, [dbProjects]);

  return (
    <div className="min-h-screen bg-background overflow-hidden relative">

      {/* ---- Marketing Hero ---- */}
      <MarketingHero />

      {/* ---- Stats Strip ---- */}
      <section className="py-16 border-y border-border/20 bg-muted/10">
        <div className="container max-w-5xl">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {[
              { to: 500, suffix: "K+", prefix: "AED ", label: "Ad Spend Managed" },
              { to: 2, suffix: "M+", prefix: "AED ", label: "Revenue Generated" },
              { to: 42, suffix: "x", prefix: "4.", label: "Avg ROAS" },
              { to: 150, suffix: "+", prefix: "", label: "Campaigns Run" },
            ].map((stat, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.5 }}
              >
                <div className="text-2xl sm:text-3xl md:text-5xl lg:text-6xl font-display font-bold text-foreground mb-2 tabular-nums">
                  <AnimatedCounter to={stat.to} prefix={stat.prefix} suffix={stat.suffix} />
                </div>
                <div className="text-[10px] md:text-xs uppercase tracking-widest text-muted-foreground">{stat.label}</div>
              </motion.div>
            ))}
          </div>
          <div className="text-[10px] text-muted-foreground/40 uppercase tracking-widest text-center mt-12 select-none">
            *Campaign statistics are consolidated lifetime performance figures across all managed customer advertising portfolios.
          </div>
        </div>
      </section>

      {/* ---- Case Studies ---- */}
      <section className="py-24 relative overflow-hidden">
        <MorphBlob color="emerald-500" size={500} opacity={0.04} blur={120} className="-right-20 top-0" animDuration={16} />
        <div className="container max-w-6xl relative z-10">
          <RevealText text="Recent Wins" as="h2" className="text-3xl md:text-5xl font-display font-bold mb-12" />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {campaigns.map((campaign: any, i: number) => (
              <CaseStudyCard key={campaign.id} campaign={campaign} i={i} />
            ))}
            {campaigns.length === 0 && (
              <div className="col-span-full text-center py-20 text-muted-foreground border border-dashed border-border/30 rounded-2xl">
                Case studies are being published. <Link href="/contact"><a className="text-emerald-500 underline">Let's Talk</a></Link>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* ---- Process ---- */}
      <section className="py-24 border-t border-border/20">
        <div className="container max-w-6xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
            <div>
              <RevealText text="How It Works" as="h2" className="text-4xl md:text-5xl font-display font-bold mb-6" />
              <p className="text-lg text-muted-foreground mb-8 max-w-lg font-light">
                Stop burning money on "boost post". My process is scientific, iterative, and focused on one metric:{" "}
                <span className="text-foreground font-semibold">Profit</span>.
              </p>
              <Link href="/contact">
                <a className="inline-flex items-center gap-2 px-6 py-3 rounded-full border border-border/50 hover:border-emerald-500/50 transition-all text-sm font-medium hover:text-emerald-500">
                  Start Your Growth Arc
                  <ArrowUpRight className="w-4 h-4" />
                </a>
              </Link>
            </div>
            <div className="space-y-8 relative" ref={processRef}>
              <motion.div 
                style={{ scaleY: processProgress, originY: 0 }}
                className="absolute left-[20.5px] top-8 bottom-8 w-[2px] bg-emerald-500 shadow-[0_0_15px_rgba(16,185,129,0.5)] z-0" 
              />
              <div className="absolute left-5 top-8 bottom-8 w-px border-l border-dashed border-muted-foreground/20 -z-10" />
              {processSteps.map((step, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.12, duration: 0.5 }}
                  className="flex gap-6 items-start relative z-10"
                >
                  <motion.div
                    className="flex-shrink-0 w-10 h-10 rounded-full bg-card border border-emerald-500/30 text-emerald-500 flex items-center justify-center font-bold text-sm shadow-sm"
                    whileHover={{ scale: 1.1, borderColor: "rgba(16,185,129,0.8)" }}
                  >
                    {i + 1}
                  </motion.div>
                  <div className="pt-2">
                    <h3 className="text-xl font-bold mb-1">{step.title}</h3>
                    <p className="text-muted-foreground font-light">{step.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ---- FAQ ---- */}
      <section className="py-24 bg-muted/10 border-t border-border/20">
        <div className="container max-w-3xl">
          <RevealText text="Frequently Asked Questions" as="h2" className="text-3xl md:text-4xl font-display font-bold mb-12 text-center" />
          <div className="space-y-2">
            {faqs.map((faq, i) => <FAQItem key={i} question={faq.q} answer={faq.a} />)}
          </div>
        </div>
      </section>

      {/* ---- CTA ---- */}
      <section id="contact" className="py-32 container text-center">
        <div className="relative bg-gradient-to-br from-emerald-950 via-emerald-900 to-teal-950 rounded-[3rem] p-8 md:p-20 text-white overflow-hidden shadow-2xl shadow-emerald-900/30">
          <MorphBlob color="emerald-500" size={500} opacity={0.12} blur={100} className="left-0 top-0" animDuration={10} />
          <div className="relative z-10 max-w-2xl mx-auto">
            <RevealText text="Scale your revenue." as="h2" className="text-4xl md:text-7xl font-display font-black mb-8 uppercase italic tracking-tighter" />
            <p className="text-white/80 text-lg md:text-xl mb-12 font-light">Ready to turn your traffic into customers? Get a free performance audit.</p>
            <Link href="/contact">
              <motion.a
                whileHover={{ scale: 1.04, y: -2 }}
                whileTap={{ scale: 0.98 }}
                className="inline-flex items-center gap-3 bg-white text-black font-bold text-lg px-8 py-4 md:px-10 md:py-5 rounded-full shadow-xl cursor-pointer"
              >
                Get a Free Audit
                <ArrowUpRight className="w-5 h-5" />
              </motion.a>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
