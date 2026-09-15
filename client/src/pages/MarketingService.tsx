import { SEO } from "@/components/SEO";
import { motion } from "framer-motion";
import { Link } from "wouter";
import { 
  ArrowRight, 
  ArrowUpRight, 
  Check, 
  X, 
  MessageCircle, 
  Target, 
  ExternalLink 
} from "lucide-react";
import { marketingCampaigns } from "@/data/marketing";
import { proof } from "@/data/proof";

const howIWorkSteps = [
  {
    step: "01",
    title: "Understand the offer",
    desc: "Analysis of what the business actually sells, pricing structure, margins, and the specific reasons customers choose it over alternatives."
  },
  {
    step: "02",
    title: "Define the audience",
    desc: "Identify who has the problem right now. In the GCC, this means mapping local versus expat demographics, language preferences, and purchasing habits."
  },
  {
    step: "03",
    title: "Build campaign structure",
    desc: "A clean account architecture with clear separation between broad prospecting, creative testing ad sets, and retargeting."
  },
  {
    step: "04",
    title: "Create and test creative",
    desc: "Script, shoot, and edit multiple creative angles — testing different visual hooks, problem agitation, customer proof, and direct offers."
  },
  {
    step: "05",
    title: "Monitor leading metrics",
    desc: "Track early leading indicators: click-through rates, cost per conversation, form completion rates, and CPMs to spot fatigue or winning patterns early."
  },
  {
    step: "06",
    title: "Iterate on winners",
    desc: "Shift budget into winning creative angles, cut losing ads without hesitation, and produce variations of top-performing videos."
  },
  {
    step: "07",
    title: "Align with the sales desk",
    desc: "The work doesn't stop at the click. Ongoing coordination with sales reps tracks contact rates, common objections, and lead quality."
  }
];

const whatIDontDo = [
  {
    title: "No enterprise TV or mass media buying",
    desc: "Focus is exclusively hands-on digital acquisition — Meta Ads, short-form video creative, and direct lead generation."
  },
  {
    title: "No fake engagement or vanity metrics",
    desc: "Success is measured by qualified messaging conversations, verified phone leads, and sales pipeline — not bought followers or empty impressions."
  },
  {
    title: "No overnight miracle promises",
    desc: "Paid advertising is an iterative testing process. If the underlying offer or economics don't work, ad hacks won't save it. Testing reveals reality fast."
  },
  {
    title: "No disconnected third-party creative",
    desc: "Video assets are scripted, shot, and edited directly. The tight feedback loop between Ads Manager data and the editing timeline is why campaigns iterate faster."
  }
];

export default function MarketingService() {
  // Focus on the core performance campaigns
  const performanceCampaigns = marketingCampaigns.filter(c => 
    c.id === "aqua-care-uae" || c.id === "prepmeal-growth" || c.id === "aureum-asset-management"
  );

  return (
    <div className="min-h-screen bg-background text-foreground pt-28 md:pt-36 pb-28">
      <SEO 
        title="Gokul KP — Performance Marketing" 
        description="Performance marketing, Meta Ads, creative testing, and WhatsApp lead acquisition across the UAE and Oman managed by Gokul KP." 
        url="/marketing" 
      />

      <div className="container px-4 md:px-8 max-w-[1240px] mx-auto space-y-24 md:space-y-32">

        {/* 1. HERO HEADER */}
        <section className="border-b border-border/40 pb-16 md:pb-24">
          <div className="max-w-4xl space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-600 dark:text-emerald-400 text-[11px] font-semibold tracking-widest uppercase font-mono">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
              PERFORMANCE MARKETING
            </div>

            <h1 className="text-4xl sm:text-6xl md:text-7xl font-display font-bold tracking-tight text-foreground leading-[1.08]">
              PAID CAMPAIGNS BUILT AROUND WHAT ACTUALLY CONVERTS.
            </h1>

            <p className="text-lg sm:text-xl md:text-2xl text-muted-foreground font-normal leading-relaxed max-w-3xl">
              Meta advertising, creative testing, and WhatsApp lead acquisition across the UAE and Oman.
            </p>

            <div className="pt-4 flex flex-wrap items-center gap-4">
              <Link href="/contact">
                <a className="inline-flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold px-8 py-4 rounded-full transition-colors shadow-lg shadow-emerald-600/20">
                  Discuss a Campaign
                  <ArrowRight className="w-4 h-4" />
                </a>
              </Link>
              <a 
                href="#case-studies" 
                className="inline-flex items-center gap-2 bg-muted/40 hover:bg-muted/70 text-foreground font-medium px-8 py-4 rounded-full border border-border/60 transition-colors"
              >
                View Case Studies
              </a>
            </div>
          </div>
        </section>

        {/* 2. HOW THE CAMPAIGNS RUN */}
        <section className="space-y-12">
          <div className="border-b border-border/40 pb-6">
            <p className="text-xs font-mono uppercase tracking-widest text-emerald-600 dark:text-emerald-400 mb-2">Process</p>
            <h2 className="text-2xl sm:text-4xl font-display font-bold text-foreground tracking-tight">
              Operational framework.
            </h2>
            <p className="text-sm sm:text-base text-muted-foreground mt-2 max-w-xl">
              No black boxes or secret algorithms. Just a disciplined, repeatable testing loop.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {howIWorkSteps.map((step, idx) => (
              <div 
                key={step.step}
                className={`p-8 rounded-3xl border border-border/50 bg-muted/10 flex flex-col justify-between space-y-4 hover:border-emerald-500/30 transition-colors ${
                  idx === howIWorkSteps.length - 1 ? "md:col-span-2 lg:col-span-1" : ""
                }`}
              >
                <div className="space-y-3">
                  <span className="text-xs font-mono font-bold text-emerald-600 dark:text-emerald-400">
                    Step {step.step}
                  </span>
                  <h3 className="text-xl font-display font-bold text-foreground">
                    {step.title}
                  </h3>
                </div>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {step.desc}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* 3. CASE STUDIES */}
        <section id="case-studies" className="space-y-12">
          <div className="border-b border-border/40 pb-6">
            <p className="text-xs font-mono uppercase tracking-widest text-emerald-600 dark:text-emerald-400 mb-2">Evidence</p>
            <h2 className="text-2xl sm:text-4xl font-display font-bold text-foreground tracking-tight">
              Case studies & campaigns.
            </h2>
            <p className="text-sm sm:text-base text-muted-foreground mt-2 max-w-xl">
              Detailed breakdowns of campaign strategy, creative testing, and verified outcomes.
            </p>
          </div>

          <div className="space-y-12">
            {performanceCampaigns.map((camp) => (
              <div 
                key={camp.id}
                className="p-8 md:p-12 rounded-[2rem] border border-border/60 bg-muted/10 space-y-8"
              >
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-border/40 pb-6">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-xs font-mono text-emerald-600 dark:text-emerald-400 font-semibold uppercase">{camp.industry}</span>
                      <span className="text-muted-foreground/40">•</span>
                      <span className="text-xs font-mono text-muted-foreground">{camp.role}</span>
                    </div>
                    <h3 className="text-2xl sm:text-3xl font-display font-bold text-foreground">
                      {camp.client}: {camp.title}
                    </h3>
                  </div>
                  <span className="text-xs font-mono text-muted-foreground bg-muted/40 px-3.5 py-1.5 rounded-full border border-border/40 self-start md:self-auto">
                    {camp.duration}
                  </span>
                </div>

                <div className="space-y-4">
                  <p className="text-base sm:text-lg text-foreground/90 leading-relaxed max-w-4xl">
                    {camp.description}
                  </p>
                </div>

                {/* Metrics Grid */}
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
                  {camp.metrics.map((m, mi) => (
                    <div key={mi} className="p-4 rounded-2xl bg-background border border-border/60">
                      <p className="text-2xl font-display font-bold text-foreground tabular-nums">{m.value}</p>
                      <p className="text-xs text-muted-foreground mt-1">{m.label}</p>
                    </div>
                  ))}
                </div>

                {/* Strategy Points */}
                {camp.strategy && camp.strategy.length > 0 && (
                  <div className="pt-2 space-y-3">
                    <p className="text-xs font-mono uppercase tracking-wider text-muted-foreground/60">Strategy & Execution</p>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      {camp.strategy.map((s, si) => (
                        <div key={si} className="flex items-start gap-2.5 text-xs sm:text-sm text-muted-foreground">
                          <Check className="w-4 h-4 text-emerald-500 mt-0.5 shrink-0" />
                          <span>{s}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                <div className="pt-4 flex flex-wrap items-center gap-3">
                  <Link href={`/marketing/${camp.slug}`}>
                    <a className="group relative inline-flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-full bg-emerald-500 hover:bg-emerald-400 text-white font-semibold text-sm shadow-md shadow-emerald-500/20 hover:shadow-lg hover:shadow-emerald-500/35 transition-all duration-300 transform hover:-translate-y-0.5 active:translate-y-0 overflow-hidden">
                      <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/25 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-out" />
                      <span className="relative z-10 tracking-wide">Read Full Case Study</span>
                      <ArrowRight className="w-4 h-4 relative z-10 transition-transform duration-300 group-hover:translate-x-1" />
                    </a>
                  </Link>
                  {camp.reportUrl && (
                    <a 
                      href={camp.reportUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group inline-flex items-center gap-2 px-5 py-3 rounded-full bg-muted/40 hover:bg-muted/80 text-muted-foreground hover:text-foreground text-xs font-mono border border-border/60 hover:border-border transition-all duration-200 transform hover:-translate-y-0.5 shadow-sm"
                    >
                      <span>View Report PDF</span>
                      <ExternalLink className="w-3.5 h-3.5 text-muted-foreground group-hover:text-foreground transition-all duration-300 group-hover:scale-110" />
                    </a>
                  )}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* 4. KEY RESULTS STRIP */}
        <section className="p-10 md:p-14 rounded-[2.5rem] border border-border/60 bg-muted/10 space-y-8">
          <div>
            <p className="text-xs font-mono uppercase tracking-widest text-emerald-600 dark:text-emerald-400 mb-1">Key Verified Numbers</p>
            <h3 className="text-2xl sm:text-3xl font-display font-bold text-foreground">
              What the campaigns produced.
            </h3>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {proof.metrics.map((metric, i) => (
              <div key={i} className="space-y-1">
                <p className="text-3xl sm:text-4xl font-display font-bold text-foreground tabular-nums">
                  {metric.prefix}{metric.value}{metric.suffix}
                </p>
                <p className="text-xs sm:text-sm text-muted-foreground capitalize">{metric.label}</p>
                {metric.context && (
                  <p className="text-[10px] font-mono text-muted-foreground/60">{metric.context}</p>
                )}
              </div>
            ))}
          </div>
        </section>

        {/* 5. BOUNDARIES & SCOPE */}
        <section className="space-y-8">
          <div className="border-b border-border/40 pb-6">
            <p className="text-xs font-mono uppercase tracking-widest text-orange-500 mb-2">Scope & Focus</p>
            <h2 className="text-2xl sm:text-3xl font-display font-bold text-foreground tracking-tight">
              Boundaries & focus.
            </h2>
            <p className="text-sm text-muted-foreground mt-1 max-w-xl">
              Clear expectations build better partnerships. Focused execution beats shallow coverage.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {whatIDontDo.map((item, idx) => (
              <div key={idx} className="p-8 rounded-3xl border border-border/40 bg-muted/5 space-y-3">
                <div className="flex items-center gap-2 text-foreground font-semibold text-base sm:text-lg">
                  <X className="w-5 h-5 text-red-500 shrink-0" />
                  <h4>{item.title}</h4>
                </div>
                <p className="text-sm text-muted-foreground leading-relaxed pl-7">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* 6. CALL TO ACTION */}
        <section className="rounded-[2.5rem] border border-border/60 bg-muted/10 p-10 md:p-16 text-center space-y-6">
          <div className="max-w-2xl mx-auto space-y-3">
            <h2 className="text-3xl sm:text-4xl font-display font-bold text-foreground tracking-tight">
              Have a brand or campaign you want to review?
            </h2>
            <p className="text-base sm:text-lg text-muted-foreground">
              Share your current ad account, website, or creative assets for an honest, direct breakdown of what can be improved.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
            <Link href="/contact">
              <a className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold px-8 py-4 rounded-full transition-colors shadow-lg shadow-emerald-600/20">
                Let's talk
                <ArrowRight className="w-4 h-4" />
              </a>
            </Link>
            <Link href="/portfolio">
              <a className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-muted/30 hover:bg-muted/50 text-foreground font-medium px-8 py-4 rounded-full border border-border/60 transition-colors">
                View All Work
              </a>
            </Link>
          </div>
        </section>

      </div>
    </div>
  );
}
