import { ArrowLeft, Play, Target, Layers, Zap, Sparkles, Sliders, ChevronDown, ChevronUp } from "lucide-react";
import { useEffect, useState } from "react";
import { Link } from "wouter";
import { SEO } from "@/components/SEO";

export default function AquaCareCaseStudy() {
  const [playReel, setPlayReel] = useState(false);
  const [showAllCampaigns, setShowAllCampaigns] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const coreMetrics = [
    { label: "Total Meta Ad Spend", value: "AED 11.1K", exact: "AED 11,063.34", highlight: false },
    { label: "Impressions", value: "2.23M", exact: "2,229,247", highlight: false },
    { label: "Total Reach", value: "1.21M", exact: "1,212,573", highlight: false },
    { label: "Messaging Conversations", value: "2,357", exact: "Direct WhatsApp / IG inquiries", highlight: true, color: "text-emerald-400" },
    { label: "Meta Form Leads", value: "212", exact: "High-intent lead forms", highlight: true, color: "text-blue-400" },
    { label: "Campaigns Managed", value: "25", exact: "29 Ad Sets · 80 Total Ads", highlight: false },
  ];

  const keyCampaigns = [
    {
      name: "Engagement | Shower Filter | Dec 25",
      type: "Messaging",
      spend: "AED 1,947.26",
      results: "604 Conversations",
      costPerResult: "AED 3.22 / DM",
      ctr: "1.19%",
      cpc: "AED 1.11",
      cpm: "AED 13.23",
      status: "Top Volume DMs"
    },
    {
      name: "Leads | Shower Filter | Jan 26",
      type: "Lead Gen",
      spend: "AED 887.48",
      results: "183 Leads",
      costPerResult: "AED 4.85 / Lead",
      ctr: "2.08%",
      cpc: "AED 0.86",
      cpm: "AED 17.86",
      status: "Lowest CPL Winner"
    },
    {
      name: "Dispenser W/RO - Engagement - Aug 26 - Message - AC",
      type: "Messaging",
      spend: "AED 543.42",
      results: "332 Conversations",
      costPerResult: "AED 1.64 / DM",
      ctr: "3.28%",
      cpc: "AED 0.29",
      cpm: "AED 9.48",
      status: "Highest CTR & Low CPC"
    },
    {
      name: "Engagement | Countertop Dispenser | Jan 26",
      type: "Messaging",
      spend: "AED 1,222.11",
      results: "263 Conversations",
      costPerResult: "AED 4.65 / DM",
      ctr: "2.69%",
      cpc: "AED 1.13",
      cpm: "AED 30.26",
      status: "Dispenser Scale"
    },
    {
      name: "AC | Softener | Leads gen | Aug 26",
      type: "Lead Gen",
      spend: "AED 627.48",
      results: "29 Leads",
      costPerResult: "AED 21.64 / Lead",
      ctr: "1.85%",
      cpc: "AED 1.99",
      cpm: "AED 36.83",
      status: "High-Ticket Opportunity"
    },
  ];

  const additionalCampaigns = [
    { name: "Awareness | Brand Lift UAE | Multi-Product", spend: "AED 1,412.30", objective: "Brand Awareness & Video Views", reach: "410,200", impressions: "740,110" },
    { name: "Ramadan Seasonal | Dispenser Iftar Push", spend: "AED 784.50", objective: "Messaging Conversations", reach: "128,400", results: "189 Conversations" },
    { name: "Retargeting | Custom Video Viewers 50%+", spend: "AED 642.10", objective: "Direct Response Retargeting", reach: "45,200", results: "94 Conversations" },
    { name: "Lead Gen | 3 Stage Whole House Filter", spend: "AED 984.20", objective: "Instant Forms", reach: "68,300", results: "41 Leads" },
  ];

  return (
    <div className="min-h-screen pt-24 pb-20 bg-[#09090b] text-zinc-100 font-sans selection:bg-emerald-500/20 selection:text-emerald-400">
      <SEO
        title="AquaCare Meta Ads Case Study | Performance Marketing — Gokul KP"
        description="Meta Ads performance marketing case study for AquaCare UAE, covering campaign strategy, creative testing, audience testing, lead generation and messaging acquisition across 25 campaigns."
        url="https://www.gokulkp.com/marketing/aqua-care-uae"
      />

      <style dangerouslySetInnerHTML={{ __html: `
        .aqua-container { max-width: 980px; margin: 0 auto; padding: 0 24px; }
        .glass-card { background: rgba(18, 18, 22, 0.7); border: 1px solid rgba(255, 255, 255, 0.08); backdrop-filter: blur(12px); border-radius: 16px; }
        .glass-card-hover { transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1); }
        .glass-card-hover:hover { border-color: rgba(34, 197, 94, 0.3); transform: translateY(-2px); box-shadow: 0 12px 30px -10px rgba(34, 197, 94, 0.1); }
      `}} />

      <div className="aqua-container">
        {/* Back Link */}
        <Link href="/marketing">
          <a className="inline-flex items-center gap-2 text-sm font-medium hover:text-emerald-400 text-zinc-400 transition-colors mb-10 group cursor-pointer">
            <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
            Back to Marketing Portfolio
          </a>
        </Link>

        {/* ─── HERO HEADER BANNER ─────────────────────────────────────────── */}
        <div className="relative overflow-hidden p-8 md:p-14 rounded-3xl mb-12 border border-emerald-500/25 shadow-2xl shadow-emerald-500/5 bg-zinc-950/90 relative">
          <div 
            className="absolute inset-0 bg-cover bg-center opacity-20 mix-blend-luminosity pointer-events-none"
            style={{ backgroundImage: `url('/assets/images/brands/Aqua-Care/Aqua-Care-Platinum-Plus-RO-Faucet.jpg')` }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/80 to-transparent pointer-events-none" />

          <div className="relative z-10">
            <div className="flex flex-wrap items-center gap-3 mb-6">
              <span className="inline-flex items-center gap-1.5 bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                Performance Marketing · Meta Ads
              </span>
              <span className="text-xs text-zinc-500 font-medium">
                25 Dec 2025 — 6 Sep 2026
              </span>
            </div>

            <h1 className="text-3xl sm:text-5xl md:text-6xl font-display font-bold tracking-tight text-white mb-6 leading-[1.1]">
              Building a Multi-Product Meta Ads Engine for AquaCare UAE
            </h1>

            <p className="text-base sm:text-lg text-zinc-300 max-w-2xl font-light leading-relaxed mb-8">
              Managed and optimized Meta advertising across awareness, engagement, and lead-generation campaigns for AquaCare's water-treatment product portfolio in the UAE.
            </p>

            {/* Meta tags */}
            <div className="grid grid-cols-2 sm:grid-cols-5 gap-4 pt-6 border-t border-zinc-800/80 text-xs">
              <div>
                <span className="text-zinc-500 block mb-1">Client</span>
                <span className="font-semibold text-zinc-200">Aqua Care UAE</span>
              </div>
              <div>
                <span className="text-zinc-500 block mb-1">Scope</span>
                <span className="font-semibold text-zinc-200">Multi-Product Ads</span>
              </div>
              <div>
                <span className="text-zinc-500 block mb-1">Platform</span>
                <span className="font-semibold text-zinc-200">Meta Ads Manager</span>
              </div>
              <div>
                <span className="text-zinc-500 block mb-1">Target Market</span>
                <span className="font-semibold text-zinc-200">UAE (All Emirates)</span>
              </div>
              <div>
                <span className="text-zinc-500 block mb-1">Total Scale</span>
                <span className="font-semibold text-emerald-400">25 Campaigns · 80 Ads</span>
              </div>
            </div>
          </div>
        </div>

        {/* ─── ACCOUNT SCORECARD (VERIFIED METRICS) ───────────────────────── */}
        <div className="mb-16">
          <div className="flex items-center justify-between mb-6">
            <div>
              <p className="text-xs font-semibold uppercase tracking-widest text-emerald-400">Account Overview</p>
              <h2 className="text-2xl font-bold text-white tracking-tight">Verified Meta Ads Performance</h2>
            </div>
            <span className="text-xs text-zinc-500 bg-zinc-900 border border-zinc-800 px-3 py-1 rounded-full">
              Full Period (Dec 25 – Sep 6)
            </span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
            {coreMetrics.map((m, idx) => (
              <div key={idx} className="glass-card p-5 flex flex-col justify-between border-zinc-800/80 hover:border-zinc-700 transition-colors">
                <div>
                  <div className={`text-2xl sm:text-3xl font-display font-bold ${m.color || 'text-white'}`}>
                    {m.value}
                  </div>
                  <div className="text-xs font-semibold text-zinc-300 mt-1">
                    {m.label}
                  </div>
                </div>
                <div className="text-[10px] text-zinc-500 mt-3 pt-2 border-t border-zinc-900">
                  {m.exact}
                </div>
              </div>
            ))}
          </div>

          {/* Secondary Account Metrics Banner */}
          <div className="mt-4 p-4 rounded-2xl bg-zinc-950/60 border border-zinc-850 grid grid-cols-2 sm:grid-cols-4 gap-4 text-center">
            <div>
              <span className="text-[10px] uppercase text-zinc-500 tracking-wider block">Average CTR (All)</span>
              <span className="text-base font-bold text-zinc-200">0.63%</span>
              <span className="text-[10px] text-zinc-500 block">14,040 total clicks</span>
            </div>
            <div>
              <span className="text-[10px] uppercase text-zinc-500 tracking-wider block">Average CPC</span>
              <span className="text-base font-bold text-zinc-200">AED 0.79</span>
              <span className="text-[10px] text-zinc-500 block">Cost per link click</span>
            </div>
            <div>
              <span className="text-[10px] uppercase text-zinc-500 tracking-wider block">Average CPM</span>
              <span className="text-base font-bold text-zinc-200">AED 4.96</span>
              <span className="text-[10px] text-zinc-500 block">Per 1,000 impressions</span>
            </div>
            <div>
              <span className="text-[10px] uppercase text-zinc-500 tracking-wider block">Frequency</span>
              <span className="text-base font-bold text-zinc-200">1.84</span>
              <span className="text-[10px] text-zinc-500 block">Balanced audience reach</span>
            </div>
          </div>
        </div>

        {/* ─── ACCOUNT SCALE ARCHITECTURE ─────────────────────────────────── */}
        <div className="glass-card p-8 mb-16 border-emerald-500/20 bg-gradient-to-b from-emerald-950/10 via-zinc-950/60 to-zinc-950">
          <div className="max-w-xl mb-8">
            <p className="text-xs font-semibold uppercase tracking-widest text-emerald-400 mb-2">Operation Scale</p>
            <h3 className="text-2xl font-bold text-white tracking-tight">Structured Campaign Management at Scale</h3>
            <p className="text-sm text-zinc-400 font-light mt-2">
              Continuous experimentation across product angles, creative variants, and audience definitions required rigorous hierarchy management.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-6 rounded-2xl bg-zinc-900/70 border border-zinc-800 flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400 font-bold text-xl flex-shrink-0">
                25
              </div>
              <div>
                <h4 className="text-sm font-bold text-white uppercase tracking-wider">Campaigns</h4>
                <p className="text-xs text-zinc-400 mt-0.5">Isolated by product line, objective, and seasonal timing.</p>
              </div>
            </div>

            <div className="p-6 rounded-2xl bg-zinc-900/70 border border-zinc-800 flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-400 font-bold text-xl flex-shrink-0">
                29
              </div>
              <div>
                <h4 className="text-sm font-bold text-white uppercase tracking-wider">Ad Sets</h4>
                <p className="text-xs text-zinc-400 mt-0.5">Tested broad UAE, beauty interest, community geo-targets, and lookalikes.</p>
              </div>
            </div>

            <div className="p-6 rounded-2xl bg-zinc-900/70 border border-zinc-800 flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center text-purple-400 font-bold text-xl flex-shrink-0">
                80
              </div>
              <div>
                <h4 className="text-sm font-bold text-white uppercase tracking-wider">Individual Ads</h4>
                <p className="text-xs text-zinc-400 mt-0.5">Iterative testing across short-form Reels, static graphics, and carousels.</p>
              </div>
            </div>
          </div>
        </div>

        {/* ─── CASE STUDY STORY ───────────────────────────────────────────── */}
        <div className="mb-16">
          <p className="text-xs font-semibold uppercase tracking-widest text-zinc-500 mb-2">Strategy &amp; Narrative</p>
          <h2 className="text-3xl font-bold text-white tracking-tight mb-8">Campaign Strategic Framework</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="glass-card p-6 border-zinc-800">
              <div className="flex items-center gap-2 mb-3 text-emerald-400 text-xs font-bold uppercase tracking-wider">
                <Target className="w-4 h-4" />
                The Challenge
              </div>
              <p className="text-sm text-zinc-300 leading-relaxed font-light">
                AquaCare was advertising multiple water-treatment products across the UAE, requiring different campaign objectives and creative approaches across product categories. A low-friction shower filter (lower ticket impulse buy) required an entirely different conversion pathway than premium countertop water dispensers or whole-villa softeners.
              </p>
            </div>

            <div className="glass-card p-6 border-zinc-800">
              <div className="flex items-center gap-2 mb-3 text-blue-400 text-xs font-bold uppercase tracking-wider">
                <Layers className="w-4 h-4" />
                The Approach
              </div>
              <p className="text-sm text-zinc-300 leading-relaxed font-light">
                Built and managed a multi-layer Meta Ads structure spanning Awareness → Engagement → Lead Generation. Tested product positioning angles, creative formats (Reels vs static vs carousel), audience segmentation (broad vs interest vs community), direct messaging acquisition, and instant lead forms.
              </p>
            </div>

            <div className="glass-card p-6 border-zinc-800">
              <div className="flex items-center gap-2 mb-3 text-purple-400 text-xs font-bold uppercase tracking-wider">
                <Zap className="w-4 h-4" />
                The Execution
              </div>
              <p className="text-sm text-zinc-300 leading-relaxed font-light">
                Maintained 25 dedicated campaigns across 29 ad sets and 80 creative variations from December 2025 through September 2026. Shifted budgets dynamically into top-performing creative variations while scaling low-cost messaging funnels and lead forms.
              </p>
            </div>

            <div className="glass-card p-6 border-zinc-800">
              <div className="flex items-center gap-2 mb-3 text-amber-400 text-xs font-bold uppercase tracking-wider">
                <Sparkles className="w-4 h-4" />
                The Strategic Insight
              </div>
              <p className="text-sm text-zinc-300 leading-relaxed font-light">
                Shower Filter emerged as the undisputed volume leader for Meta Instant Lead forms (~AED 4.85 CPL), while Dispenser-focused static creatives proved exceptionally potent for generating high-volume, low-cost direct WhatsApp messaging conversations (~AED 1.03–1.22/conversation).
              </p>
            </div>
          </div>
        </div>

        {/* ─── 3-STAGE FUNNEL SECTION ─────────────────────────────────────── */}
        <div className="mb-16">
          <p className="text-xs font-semibold uppercase tracking-widest text-zinc-500 mb-2">Funnel Architecture</p>
          <h2 className="text-2xl font-bold text-white tracking-tight mb-6">3-Stage Funnel by Product Category</h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-0 rounded-2xl overflow-hidden border border-zinc-800">
            <div className="p-6 bg-zinc-950/80 border-b md:border-b-0 md:border-r border-zinc-850">
              <div className="w-8 h-1 bg-emerald-500 rounded-full mb-4" />
              <span className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest block mb-1">Stage 01</span>
              <h4 className="text-base font-bold text-white mb-2">Awareness</h4>
              <p className="text-xs text-zinc-400 font-light leading-relaxed">
                Broad product-awareness campaigns designed to reach UAE audiences and introduce AquaCare products and water health benefits.
              </p>
            </div>

            <div className="p-6 bg-zinc-950/80 border-b md:border-b-0 md:border-r border-zinc-850">
              <div className="w-8 h-1 bg-emerald-600 rounded-full mb-4" />
              <span className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest block mb-1">Stage 02</span>
              <h4 className="text-base font-bold text-white mb-2">Engagement &amp; Conversations</h4>
              <p className="text-xs text-zinc-400 font-light leading-relaxed">
                Product-led campaigns optimized for messaging conversations and direct customer inquiries on WhatsApp and Instagram DM.
              </p>
            </div>

            <div className="p-6 bg-zinc-950/80">
              <div className="w-8 h-1 bg-emerald-700 rounded-full mb-4" />
              <span className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest block mb-1">Stage 03</span>
              <h4 className="text-base font-bold text-white mb-2">Lead Generation</h4>
              <p className="text-xs text-zinc-400 font-light leading-relaxed">
                Lead-generation campaigns designed to capture direct-response demand through native Meta instant lead forms.
              </p>
            </div>
          </div>

          <div className="mt-4 p-4 rounded-xl bg-emerald-950/20 border border-emerald-500/20 text-xs text-zinc-300 flex items-start gap-3">
            <Sparkles className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" />
            <div>
              <strong className="text-emerald-400 font-medium">Seasonal Ramadan Strategy:</strong> Ran Ramadan-specific campaigns in February 2026 across selected AquaCare products, adapting creative and campaign messaging to the seasonal period.
            </div>
          </div>
        </div>

        {/* ─── PRODUCT PERFORMANCE & CREATIVE TESTING DEEP DIVE ───────────── */}
        <div className="mb-16">
          <p className="text-xs font-semibold uppercase tracking-widest text-zinc-500 mb-2">Product Deep Dive</p>
          <h2 className="text-3xl font-bold text-white tracking-tight mb-8">Product-Level Performance &amp; Creative Testing</h2>

          {/* Shower Filter Lead Gen Winner */}
          <div className="glass-card p-8 mb-6 border-blue-500/30 bg-gradient-to-br from-blue-950/15 via-zinc-950/80 to-zinc-950">
            <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
              <div>
                <span className="text-[10px] font-bold text-blue-400 uppercase tracking-widest bg-blue-500/10 border border-blue-500/20 px-2.5 py-1 rounded-full">
                  Lead Generation Leader
                </span>
                <h3 className="text-2xl font-bold text-white mt-2">Shower Filter Campaign Engine</h3>
                <p className="text-xs text-zinc-400 mt-1">
                  Primary Campaign: <code className="text-blue-300 font-mono text-[11px]">Leads | Shower Filter | Jan 26</code>
                </p>
              </div>
              <div className="text-right">
                <div className="text-3xl font-bold text-blue-400">183–184</div>
                <div className="text-[10px] text-zinc-400 font-semibold uppercase tracking-wider">Meta Leads (~AED 4.85 CPL)</div>
              </div>
            </div>

            {/* Campaign Level Metrics */}
            <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-7 gap-2 p-4 rounded-xl bg-zinc-900/80 border border-zinc-800 text-center mb-6">
              <div>
                <span className="text-[10px] text-zinc-500 block">Spend</span>
                <span className="text-sm font-bold text-white">AED 887.48</span>
              </div>
              <div>
                <span className="text-[10px] text-zinc-500 block">Leads</span>
                <span className="text-sm font-bold text-blue-400">183 leads</span>
              </div>
              <div>
                <span className="text-[10px] text-zinc-500 block">Cost / Lead</span>
                <span className="text-sm font-bold text-emerald-400">AED 4.85</span>
              </div>
              <div>
                <span className="text-[10px] text-zinc-500 block">CTR</span>
                <span className="text-sm font-bold text-white">2.08%</span>
              </div>
              <div>
                <span className="text-[10px] text-zinc-500 block">CPC</span>
                <span className="text-sm font-bold text-white">AED 0.86</span>
              </div>
              <div>
                <span className="text-[10px] text-zinc-500 block">CPM</span>
                <span className="text-sm font-bold text-white">AED 17.86</span>
              </div>
              <div>
                <span className="text-[10px] text-zinc-500 block">Impressions</span>
                <span className="text-sm font-bold text-white">49,693</span>
              </div>
            </div>

            {/* Creative Testing Leaderboard */}
            <h4 className="text-xs font-bold uppercase tracking-wider text-zinc-300 mb-3 flex items-center gap-2">
              <Sliders className="w-3.5 h-3.5 text-blue-400" />
              Creative Variant Testing Breakdown
            </h4>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              <div className="p-4 rounded-xl bg-zinc-900/60 border border-emerald-500/30 relative">
                <span className="absolute top-3 right-3 text-[9px] font-bold text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-2 py-0.5 rounded">Winner</span>
                <h5 className="text-sm font-bold text-white mb-1">Shower Filter Reel</h5>
                <div className="text-xl font-bold text-emerald-400 mt-2">145 Leads</div>
                <div className="text-xs text-zinc-400 mt-1">AED 625.95 spend · <strong className="text-zinc-200">AED 4.32 CPL</strong></div>
              </div>

              <div className="p-4 rounded-xl bg-zinc-900/60 border border-zinc-800">
                <span className="text-[9px] font-bold text-zinc-400 uppercase">Supporting Static</span>
                <h5 className="text-sm font-bold text-white mb-1">Shower Filter Static</h5>
                <div className="text-xl font-bold text-zinc-200 mt-2">27 Leads</div>
                <div className="text-xs text-zinc-400 mt-1">AED 124.07 spend · <strong className="text-zinc-200">AED 4.59 CPL</strong></div>
              </div>

              <div className="p-4 rounded-xl bg-zinc-900/60 border border-zinc-800">
                <span className="text-[9px] font-bold text-zinc-400 uppercase">Variant Test</span>
                <h5 className="text-sm font-bold text-white mb-1">Shower Filter Reel2</h5>
                <div className="text-xl font-bold text-zinc-200 mt-2">10 Leads</div>
                <div className="text-xs text-zinc-400 mt-1">AED 135.27 spend · <strong className="text-zinc-200">AED 13.53 CPL</strong></div>
              </div>
            </div>

            <p className="text-xs text-zinc-400 italic mt-4 pt-3 border-t border-zinc-850">
              * Note: The Shower Filter Reel became the strongest individual lead-generation creative, while the variation-level data also showed that not every Reel performed equally. Across audience and campaign-level reporting views, approximately 183–184 total leads were recorded.
            </p>
          </div>

          {/* Dispenser Messaging Winner */}
          <div className="glass-card p-8 mb-6 border-emerald-500/30 bg-gradient-to-br from-emerald-950/15 via-zinc-950/80 to-zinc-950">
            <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
              <div>
                <span className="text-[10px] font-bold text-emerald-400 uppercase tracking-widest bg-emerald-500/10 border border-emerald-500/20 px-2.5 py-1 rounded-full">
                  Messaging Performance Leader
                </span>
                <h3 className="text-2xl font-bold text-white mt-2">Dispenser Direct Inquiries</h3>
                <p className="text-xs text-zinc-400 mt-1">
                  Dispenser-focused creatives produced some of the account's most efficient messaging acquisition costs.
                </p>
              </div>
              <div className="text-right">
                <div className="text-3xl font-bold text-emerald-400">632+</div>
                <div className="text-[10px] text-zinc-400 font-semibold uppercase tracking-wider">Dispenser Inquiries</div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              <div className="p-4 rounded-xl bg-zinc-900/60 border border-emerald-500/30">
                <span className="text-[9px] font-bold text-emerald-400 uppercase">Lowest Cost / Conversation</span>
                <h5 className="text-sm font-bold text-white mb-1">Dispenser wo RO — Static</h5>
                <div className="text-xl font-bold text-emerald-400 mt-2">314 Conversations</div>
                <div className="text-xs text-zinc-400 mt-1"><strong className="text-emerald-300">AED 1.03</strong> per conversation</div>
              </div>

              <div className="p-4 rounded-xl bg-zinc-900/60 border border-zinc-800">
                <span className="text-[9px] font-bold text-zinc-400 uppercase">High Efficiency Image</span>
                <h5 className="text-sm font-bold text-white mb-1">Dispenser W/RO — Image</h5>
                <div className="text-xl font-bold text-zinc-200 mt-2">168 Conversations</div>
                <div className="text-xs text-zinc-400 mt-1"><strong className="text-zinc-200">AED 1.22</strong> per conversation</div>
              </div>

              <div className="p-4 rounded-xl bg-zinc-900/60 border border-zinc-800">
                <span className="text-[9px] font-bold text-zinc-400 uppercase">Video Creative</span>
                <h5 className="text-sm font-bold text-white mb-1">Dispenser W/RO — Reel</h5>
                <div className="text-xl font-bold text-zinc-200 mt-2">150 Conversations</div>
                <div className="text-xs text-zinc-400 mt-1"><strong className="text-zinc-200">AED 2.04</strong> per conversation</div>
              </div>
            </div>

            <p className="text-xs text-zinc-400 mt-4 pt-3 border-t border-zinc-850">
              * Note: These metrics measure initiated direct messaging conversations (WhatsApp &amp; Instagram Direct inquiries) generated at the top and middle of the funnel.
            </p>
          </div>

          {/* Water Softener - Optimization Area */}
          <div className="glass-card p-6 border-zinc-800 bg-zinc-950/80">
            <div className="flex flex-wrap items-center justify-between gap-4 mb-4">
              <div>
                <span className="text-[10px] font-bold text-amber-400 uppercase tracking-widest bg-amber-500/10 border border-amber-500/20 px-2.5 py-1 rounded-full">
                  Higher-Ticket System · Optimization Opportunity
                </span>
                <h3 className="text-xl font-bold text-white mt-2">Whole-Villa Water Softeners</h3>
              </div>
              <div className="text-right">
                <div className="text-2xl font-bold text-zinc-200">29 Leads</div>
                <div className="text-[10px] text-zinc-400 font-semibold uppercase tracking-wider">AED 21.64 CPL</div>
              </div>
            </div>

            <p className="text-xs text-zinc-400 leading-relaxed font-light mb-4">
              For higher-ticket systems like villa water softeners, the acquisition dynamics differ significantly from entry-level shower filters. Meta Ads data showed <strong className="text-zinc-200">AED 627.48 spend</strong>, <strong className="text-zinc-200">29 leads</strong>, and an <strong className="text-zinc-200">AED 21.64 CPL</strong> (1.85% CTR, AED 1.99 CPC, AED 36.83 CPM across 17,037 impressions). This provides a valuable testing baseline to refine lead pre-qualification questions and nurture sequences for high-ticket home installations.
            </p>
          </div>
        </div>

        {/* ─── CREATIVE FORMAT COMPARISON ─────────────────────────────────── */}
        <div className="mb-16">
          <p className="text-xs font-semibold uppercase tracking-widest text-zinc-500 mb-2">Format Comparison</p>
          <h2 className="text-2xl font-bold text-white tracking-tight mb-6">Creative Format Performance Analysis</h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            {/* Reels */}
            <div className="glass-card p-5 border-emerald-500/30 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-bold text-emerald-400 uppercase tracking-wider">Reels (Video)</span>
                  <span className="text-[9px] bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 px-2 py-0.5 rounded font-semibold">Volume Winner</span>
                </div>
                <div className="text-sm font-semibold text-zinc-400 mb-2">Spend: AED 4,444.17</div>
                <div className="space-y-1 text-xs text-zinc-300">
                  <div className="flex justify-between"><span>Leads:</span><strong className="text-white">178</strong></div>
                  <div className="flex justify-between"><span>Conversations:</span><strong className="text-white">1,158</strong></div>
                  <div className="flex justify-between"><span>Cost / Lead:</span><strong className="text-emerald-400">AED 24.97</strong></div>
                  <div className="flex justify-between"><span>Cost / Conv:</span><strong className="text-emerald-400">AED 3.84</strong></div>
                  <div className="flex justify-between"><span>CTR:</span><strong className="text-white">1.12%</strong></div>
                </div>
              </div>
            </div>

            {/* Static Images */}
            <div className="glass-card p-5 border-zinc-800 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-bold text-zinc-200 uppercase tracking-wider">Static Images</span>
                  <span className="text-[9px] bg-zinc-800 text-zinc-400 px-2 py-0.5 rounded font-semibold">Broad Reach</span>
                </div>
                <div className="text-sm font-semibold text-zinc-400 mb-2">Spend: AED 3,212.45</div>
                <div className="space-y-1 text-xs text-zinc-300">
                  <div className="flex justify-between"><span>Leads:</span><strong className="text-white">49</strong></div>
                  <div className="flex justify-between"><span>Conversations:</span><strong className="text-white">602</strong></div>
                  <div className="flex justify-between"><span>Cost / Lead:</span><strong className="text-zinc-200">AED 65.56</strong></div>
                  <div className="flex justify-between"><span>Cost / Conv:</span><strong className="text-zinc-200">AED 5.34</strong></div>
                  <div className="flex justify-between"><span>CTR:</span><strong className="text-white">0.28%</strong></div>
                </div>
              </div>
            </div>

            {/* Carousels */}
            <div className="glass-card p-5 border-zinc-800 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-bold text-zinc-200 uppercase tracking-wider">Carousels</span>
                  <span className="text-[9px] bg-zinc-800 text-zinc-400 px-2 py-0.5 rounded font-semibold">High CTR</span>
                </div>
                <div className="text-sm font-semibold text-zinc-400 mb-2">Spend: AED 192.06</div>
                <div className="space-y-1 text-xs text-zinc-300">
                  <div className="flex justify-between"><span>Leads:</span><strong className="text-white">6</strong></div>
                  <div className="flex justify-between"><span>Conversations:</span><strong className="text-white">28</strong></div>
                  <div className="flex justify-between"><span>Cost / Lead:</span><strong className="text-zinc-200">AED 32.01</strong></div>
                  <div className="flex justify-between"><span>Cost / Conv:</span><strong className="text-zinc-200">AED 6.86</strong></div>
                  <div className="flex justify-between"><span>CTR:</span><strong className="text-emerald-400">2.09%</strong></div>
                </div>
              </div>
            </div>

            {/* IG Post Boosts */}
            <div className="glass-card p-5 border-zinc-800 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-bold text-zinc-200 uppercase tracking-wider">Post Promotions</span>
                  <span className="text-[9px] bg-zinc-800 text-zinc-400 px-2 py-0.5 rounded font-semibold">Social Discovery</span>
                </div>
                <div className="text-sm font-semibold text-zinc-400 mb-2">Spend: AED 824.42</div>
                <div className="space-y-1 text-xs text-zinc-300">
                  <div className="flex justify-between"><span>Leads:</span><strong className="text-zinc-500">—</strong></div>
                  <div className="flex justify-between"><span>Conversations:</span><strong className="text-white">85</strong></div>
                  <div className="flex justify-between"><span>Cost / Conv:</span><strong className="text-zinc-200">AED 9.70</strong></div>
                  <div className="flex justify-between"><span>CTR:</span><strong className="text-white">0.85%</strong></div>
                </div>
              </div>
            </div>
          </div>

          <div className="p-4 rounded-xl bg-zinc-950 border border-zinc-850 text-xs text-zinc-400">
            <strong className="text-zinc-200 font-semibold">Key Format Insight:</strong> Reels produced the strongest direct-response volume among the analyzed creative formats, while static creative was more cost-efficient for broad awareness.
          </div>
        </div>

        {/* ─── AUDIENCE TARGETING STRATEGY ────────────────────────────────── */}
        <div className="mb-16">
          <p className="text-xs font-semibold uppercase tracking-widest text-zinc-500 mb-2">Targeting Architecture</p>
          <h2 className="text-2xl font-bold text-white tracking-tight mb-6">Audience Strategy &amp; Results</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
            <div className="p-5 rounded-2xl bg-zinc-900/50 border border-zinc-800">
              <span className="text-[10px] text-zinc-500 font-bold uppercase">Audience 01</span>
              <h4 className="text-sm font-bold text-white mt-1 mb-2">UAE Broad Leads</h4>
              <p className="text-xs text-zinc-400 mb-3">Open targeting letting Meta algorithmic optimization find high-converting buyers.</p>
              <div className="text-xs text-emerald-400 font-semibold">
                184 Leads · AED 4.85 CPL · 2.08% CTR
              </div>
            </div>

            <div className="p-5 rounded-2xl bg-zinc-900/50 border border-zinc-800">
              <span className="text-[10px] text-zinc-500 font-bold uppercase">Audience 02</span>
              <h4 className="text-sm font-bold text-white mt-1 mb-2">Shower Filter | Beauty &amp; Hair Care</h4>
              <p className="text-xs text-zinc-400 mb-3">Targeting personal care, hair health, and skincare pain points.</p>
              <div className="text-xs text-blue-400 font-semibold">
                553 Conversations · AED 2.99 / DM
              </div>
            </div>

            <div className="p-5 rounded-2xl bg-zinc-900/50 border border-zinc-800">
              <span className="text-[10px] text-zinc-500 font-bold uppercase">Audience 03</span>
              <h4 className="text-sm font-bold text-white mt-1 mb-2">Ramadan | Water Quality</h4>
              <p className="text-xs text-zinc-400 mb-3">Seasonal interest group focused on hydration and kitchen preparation.</p>
              <div className="text-xs text-emerald-400 font-semibold">
                314 Conversations · AED 1.05 / DM · 4.34% CTR
              </div>
            </div>

            <div className="p-5 rounded-2xl bg-zinc-900/50 border border-zinc-800">
              <span className="text-[10px] text-zinc-500 font-bold uppercase">Audience 04</span>
              <h4 className="text-sm font-bold text-white mt-1 mb-2">Softener | Premium Communities</h4>
              <p className="text-xs text-zinc-400 mb-3">Geographic radius targeting around high-end villa developments in Dubai.</p>
              <div className="text-xs text-amber-400 font-semibold">
                29 Leads · AED 21.64 CPL · 1.85% CTR
              </div>
            </div>

            <div className="p-5 rounded-2xl bg-zinc-900/50 border border-zinc-800">
              <span className="text-[10px] text-zinc-500 font-bold uppercase">Audience 05</span>
              <h4 className="text-sm font-bold text-white mt-1 mb-2">Lookalike (AE, 1%)</h4>
              <p className="text-xs text-zinc-400 mb-3">1% seed audience modeled from video engagers and lead submissions.</p>
              <div className="text-xs text-zinc-300 font-semibold">
                AED 42.27 Cost / Result
              </div>
            </div>
          </div>
        </div>

        {/* ─── CAMPAIGN PERFORMANCE TABLE ─────────────────────────────────── */}
        <div className="mb-16">
          <p className="text-xs font-semibold uppercase tracking-widest text-zinc-500 mb-2">Data Breakdown</p>
          <h2 className="text-2xl font-bold text-white tracking-tight mb-6">Key Campaign Performance Summary</h2>

          <div className="rounded-2xl border border-zinc-800 overflow-hidden bg-zinc-950/70 shadow-xl">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="border-b border-zinc-800 bg-zinc-900/80 text-zinc-400 uppercase tracking-wider font-semibold">
                    <th className="p-4">Campaign Name</th>
                    <th className="p-4">Spend</th>
                    <th className="p-4">Volume / Results</th>
                    <th className="p-4">Cost / Result</th>
                    <th className="p-4">CTR</th>
                    <th className="p-4">CPC</th>
                    <th className="p-4">CPM</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-zinc-850 text-zinc-300">
                  {keyCampaigns.map((c, i) => (
                    <tr key={i} className="hover:bg-zinc-900/50 transition-colors">
                      <td className="p-4 font-medium text-white">
                        <div>{c.name}</div>
                        <span className="text-[10px] text-emerald-400 font-semibold">{c.status}</span>
                      </td>
                      <td className="p-4 font-mono">{c.spend}</td>
                      <td className="p-4 font-bold text-white">{c.results}</td>
                      <td className="p-4 font-semibold text-emerald-400">{c.costPerResult}</td>
                      <td className="p-4">{c.ctr}</td>
                      <td className="p-4">{c.cpc}</td>
                      <td className="p-4">{c.cpm}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Expandable Rows for other campaigns */}
            {showAllCampaigns && (
              <div className="p-4 bg-zinc-900/40 border-t border-zinc-800">
                <p className="text-xs font-bold text-zinc-400 uppercase tracking-wider mb-3">Additional Account Campaigns</p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                  {additionalCampaigns.map((ac, idx) => (
                    <div key={idx} className="p-3 rounded-xl bg-zinc-900/60 border border-zinc-800 flex justify-between items-center">
                      <div>
                        <span className="font-semibold text-zinc-200 block">{ac.name}</span>
                        <span className="text-[10px] text-zinc-500">{ac.objective}</span>
                      </div>
                      <div className="text-right">
                        <span className="font-mono text-zinc-300 block">{ac.spend}</span>
                        <span className="text-[10px] text-emerald-400 font-semibold">{ac.results || ac.reach + " reach"}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            <button
              onClick={() => setShowAllCampaigns(!showAllCampaigns)}
              className="w-full py-3 px-4 text-center bg-zinc-900/90 hover:bg-zinc-850 text-zinc-300 text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors border-t border-zinc-800"
            >
              {showAllCampaigns ? (
                <>Collapse Additional Campaigns <ChevronUp className="w-3.5 h-3.5" /></>
              ) : (
                <>View More Account Campaigns (25 Total) <ChevronDown className="w-3.5 h-3.5" /></>
              )}
            </button>
          </div>
        </div>

        {/* ─── PERFORMANCE MARKETING SKILLS DEMONSTRATED ───────────────────── */}
        <div className="glass-card p-8 mb-16 border-zinc-800">
          <p className="text-xs font-semibold uppercase tracking-widest text-emerald-400 mb-2">Core Competencies</p>
          <h3 className="text-xl font-bold text-white tracking-tight mb-4">Performance Marketing Capabilities Demonstrated</h3>
          <div className="flex flex-wrap gap-2">
            {[
              "Meta Ads Strategy",
              "Funnel Architecture",
              "Lead Generation",
              "Messaging Acquisition",
              "Creative Testing",
              "Audience Testing",
              "Campaign Analysis",
              "Budget Management",
              "Product-Level Optimization",
              "Performance Reporting"
            ].map((skill, index) => (
              <span key={index} className="text-xs px-3.5 py-1.5 rounded-full bg-zinc-900 border border-zinc-750 text-zinc-300 font-medium">
                {skill}
              </span>
            ))}
          </div>
        </div>

        {/* ─── PAID AD CREATIVES PRODUCTION ───────────────────────────────── */}
        <div className="w-full h-[1px] bg-gradient-to-r from-transparent via-zinc-800 to-transparent my-16" />

        <section id="ad-creatives-showcase" className="mb-16">
          <p className="text-xs tracking-widest uppercase text-zinc-500 mb-2 font-semibold">PAID CAMPAIGNS</p>
          <h3 className="text-2xl font-bold text-white uppercase tracking-tight mb-8">Ad Creatives Production.</h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="glass-card p-4 flex flex-col gap-4 shadow-xl">
              <div className="w-full aspect-video rounded-xl overflow-hidden bg-black border border-zinc-900">
                <iframe
                  src="https://player.cloudinary.com/embed/?cloud_name=dgmieaf9g&public_id=Aqua_Care_Dispenser_Cinematic_kwhxvr"
                  className="w-full h-full border-0"
                  allow="autoplay; fullscreen; encrypted-media; picture-in-picture"
                  allowFullScreen
                />
              </div>
              <div>
                <h4 className="text-sm font-bold text-white mb-1 uppercase tracking-tight">Dispenser Cinematic Ad</h4>
                <p className="text-zinc-400 text-xs leading-relaxed font-light">High-end product cinematic illustrating the features of premium water dispensers.</p>
              </div>
            </div>

            <div className="glass-card p-4 flex flex-col gap-4 shadow-xl">
              <div className="w-full aspect-video rounded-xl overflow-hidden bg-black border border-zinc-900">
                <iframe
                  src="https://player.cloudinary.com/embed/?cloud_name=dgmieaf9g&public_id=Aqua_Care_fully_AI_Product_Video_qc6l39"
                  className="w-full h-full border-0"
                  allow="autoplay; fullscreen; encrypted-media; picture-in-picture"
                  allowFullScreen
                />
              </div>
              <div>
                <h4 className="text-sm font-bold text-white mb-1 uppercase tracking-tight">Fully AI Product Video</h4>
                <p className="text-zinc-400 text-xs leading-relaxed font-light">Visualizing filtration mechanics and molecular purification using advanced AI tools.</p>
              </div>
            </div>

            <div className="glass-card p-4 flex flex-col gap-4 shadow-xl">
              <div className="w-full aspect-video rounded-xl overflow-hidden bg-black border border-zinc-900">
                <iframe
                  src="https://player.cloudinary.com/embed/?cloud_name=dgmieaf9g&public_id=Aqua_Care_Ramadan_Dispenser_Hot_water_use_AI_Video_yh60pz"
                  className="w-full h-full border-0"
                  allow="autoplay; fullscreen; encrypted-media; picture-in-picture"
                  allowFullScreen
                />
              </div>
              <div>
                <h4 className="text-sm font-bold text-white mb-1 uppercase tracking-tight">Ramadan Dispenser AI Campaign</h4>
                <p className="text-zinc-400 text-xs leading-relaxed font-light">Specialized seasonal ad targeting hot water dispenser convenience during Iftar prep.</p>
              </div>
            </div>

            <div className="glass-card p-4 flex flex-col gap-4 shadow-xl">
              <div className="w-full aspect-video rounded-xl overflow-hidden bg-black border border-zinc-900">
                <iframe
                  src="https://player.cloudinary.com/embed/?cloud_name=dgmieaf9g&public_id=Aqua_Care_Water_softener_system_AI_Video_fmcm0l"
                  className="w-full h-full border-0"
                  allow="autoplay; fullscreen; encrypted-media; picture-in-picture"
                  allowFullScreen
                />
              </div>
              <div>
                <h4 className="text-sm font-bold text-white mb-1 uppercase tracking-tight">Water Softener System AI Demo</h4>
                <p className="text-zinc-400 text-xs leading-relaxed font-light">Demonstrating anti-scaling and water conditioning technology through high-impact AI animation.</p>
              </div>
            </div>
          </div>
        </section>

        {/* ─── INFLUENCER COLLABORATIONS ─────────────────────────────────── */}
        <section id="influencer-showcase" className="mb-16">
          <p className="text-xs tracking-widest uppercase text-zinc-500 mb-2 font-semibold">PARTNERSHIPS</p>
          <h3 className="text-2xl font-bold text-white uppercase tracking-tight mb-8">Influencer Collaborations.</h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="glass-card p-4 flex flex-col gap-4 shadow-xl">
              <div className="w-full aspect-video rounded-xl overflow-hidden bg-black border border-zinc-900">
                <iframe
                  src="https://player.cloudinary.com/embed/?cloud_name=dgmieaf9g&public_id=Aqua_Care_influencer_marketing_2_bwuudf"
                  className="w-full h-full border-0"
                  allow="autoplay; fullscreen; encrypted-media; picture-in-picture"
                  allowFullScreen
                />
              </div>
              <div>
                <h4 className="text-sm font-bold text-white mb-1 uppercase tracking-tight">Shower Filter Lifestyle Collab</h4>
                <p className="text-zinc-400 text-xs leading-relaxed font-light">Lifestyle influencer illustrating the beauty and hair benefits of mineral filtration.</p>
              </div>
            </div>

            <div className="glass-card p-4 flex flex-col gap-4 shadow-xl">
              <div className="w-full aspect-video rounded-xl overflow-hidden bg-black border border-zinc-900">
                <iframe
                  src="https://player.cloudinary.com/embed/?cloud_name=dgmieaf9g&public_id=Aqua_care_influencer_marketing_ytgetc"
                  className="w-full h-full border-0"
                  allow="autoplay; fullscreen; encrypted-media; picture-in-picture"
                  allowFullScreen
                />
              </div>
              <div>
                <h4 className="text-sm font-bold text-white mb-1 uppercase tracking-tight">Clean Water Family Campaign</h4>
                <p className="text-zinc-400 text-xs leading-relaxed font-light">Family-oriented influencer showing filter installation and health improvements.</p>
              </div>
            </div>
          </div>
        </section>

        {/* ─── SECTION DIVIDER FOR ORGANIC CONTENT ────────────────────────── */}
        <div className="w-full h-[1px] bg-gradient-to-r from-transparent via-blue-500/40 to-transparent my-20" />

        {/* ─── REEL CASE STUDY SECTION (ORGANIC GROWTH) ────────────────────── */}
        <section id="reel-case-study" className="pb-12 text-white">
          <div className="flex items-center gap-2 mb-4">
            <span className="text-[10px] font-bold text-blue-400 bg-blue-500/10 border border-blue-500/20 px-3 py-1 rounded-full uppercase tracking-wider">
              Organic Growth · Content Production
            </span>
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold leading-[1.15] mb-4 tracking-tight uppercase">
            The Reel That Hit 100K.<br />
            <span className="text-zinc-500 font-normal italic lowercase">No budget. No team. Just instinct.</span>
          </h2>

          <p className="text-base sm:text-lg text-zinc-400 leading-relaxed max-w-2xl mb-10 font-light">
            Shot it, scripted it, edited it, voiced it, posted it — solo. A routine filter replacement job turned into the highest-performing organic content we've ever published at Aqua Care.
          </p>

          <div className="flex flex-wrap gap-2 mb-12">
            <span className="text-xs text-zinc-400 border border-zinc-800 px-3 py-1.5 rounded-full bg-zinc-900/50">Client: Aqua Care UAE</span>
            <span className="text-xs text-zinc-400 border border-zinc-800 px-3 py-1.5 rounded-full bg-zinc-900/50">Platform: Instagram · Facebook · YouTube</span>
            <span className="text-xs text-zinc-400 border border-zinc-800 px-3 py-1.5 rounded-full bg-zinc-900/50">Format: Short-form Reel (26 sec)</span>
            <span className="text-xs text-zinc-400 border border-zinc-800 px-3 py-1.5 rounded-full bg-zinc-900/50">Date: June 2026</span>
            <span className="text-xs text-emerald-400 border border-emerald-500/20 px-3 py-1.5 rounded-full bg-emerald-950/30 font-semibold">Budget: AED 0</span>
          </div>

          {/* Hero Stat Row */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-px bg-zinc-900 border border-zinc-800 rounded-3xl overflow-hidden mb-16 shadow-2xl">
            <div className="p-6 sm:p-8 bg-zinc-950 text-center flex flex-col justify-center border-r border-b md:border-b-0 border-zinc-900">
              <div className="text-3xl sm:text-4xl md:text-5xl font-black text-blue-400 mb-2">114K+</div>
              <div className="text-[10px] text-zinc-500 font-bold uppercase tracking-widest">Total views</div>
              <div className="text-[10px] text-zinc-600 mt-1">IG + FB + YouTube</div>
            </div>

            <div className="p-6 sm:p-8 bg-zinc-950 text-center flex flex-col justify-center border-r border-b md:border-b-0 border-zinc-900">
              <div className="text-3xl sm:text-4xl md:text-5xl font-black text-white mb-2">26.7K</div>
              <div className="text-[10px] text-zinc-500 font-bold uppercase tracking-widest">Accounts reached</div>
              <div className="text-[10px] text-zinc-600 mt-1">Instagram only</div>
            </div>

            <div className="p-6 sm:p-8 bg-zinc-950 text-center flex flex-col justify-center border-r border-zinc-900">
              <div className="text-3xl sm:text-4xl md:text-5xl font-black text-white mb-2">99.4%</div>
              <div className="text-[10px] text-zinc-500 font-bold uppercase tracking-widest">New audience</div>
              <div className="text-[10px] text-zinc-600 mt-1">Non-followers</div>
            </div>

            <div className="p-6 sm:p-8 bg-zinc-950 text-center flex flex-col justify-center">
              <div className="text-3xl sm:text-4xl md:text-5xl font-black text-emerald-400 mb-2">AED 0</div>
              <div className="text-[10px] text-zinc-500 font-bold uppercase tracking-widest">Ad spend</div>
              <div className="text-[10px] text-zinc-600 mt-1">100% organic</div>
            </div>
          </div>

          {/* Video Embed */}
          <div className="w-full aspect-[9/16] max-w-[320px] mx-auto mb-16 bg-zinc-950 border border-zinc-850 rounded-3xl overflow-hidden relative group shadow-2xl">
            {playReel ? (
              <iframe
                src="https://player.cloudinary.com/embed/?cloud_name=dgmieaf9g&public_id=aqua_care_100_k_reel_uwnvct&autoplay=true"
                className="w-full h-full border-0"
                allow="autoplay; fullscreen; encrypted-media; picture-in-picture"
                allowFullScreen
              />
            ) : (
              <>
                <img src="/assets/images/aquacare-reel/ig-overview.jpg" className="w-full h-full object-cover opacity-60 transition-transform duration-500 group-hover:scale-105" alt="Reel hook screen" />
                <div className="absolute inset-0 bg-black/30 flex flex-col items-center justify-center gap-4 cursor-pointer" onClick={() => setPlayReel(true)}>
                  <div className="w-16 h-16 rounded-full bg-blue-600 text-white flex items-center justify-center shadow-lg transition-transform group-hover:scale-110">
                    <Play className="w-8 h-8 fill-current translate-x-0.5" />
                  </div>
                  <p className="text-white font-bold text-xs uppercase tracking-widest mt-2">Play Case Reel</p>
                  <span className="text-[10px] text-zinc-400">26 seconds · Organic Growth</span>
                </div>
              </>
            )}
          </div>

          {/* Production Process */}
          <p className="text-xs tracking-widest uppercase text-zinc-500 mb-4 font-semibold">PRODUCTION PROCESS</p>
          <h3 className="text-2xl font-bold uppercase tracking-tight mb-8">Everything done solo.</h3>

          <div className="flex flex-col mb-16 border border-zinc-800 rounded-2xl overflow-hidden shadow-xl">
            <div className="flex flex-col sm:flex-row items-start gap-6 p-6 sm:p-8 border-b border-zinc-900 bg-zinc-950/60">
              <div className="w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center font-bold text-white flex-shrink-0">01</div>
              <div>
                <h4 className="text-base font-bold text-white mb-2 uppercase tracking-tight">Spotted the opportunity on-site</h4>
                <p className="text-sm text-zinc-400 leading-relaxed font-light">We were doing a routine filter replacement at a customer's home. I saw the dirty filters and thought — people have no idea what's sitting inside their water system. Pulled out my phone.</p>
                <div className="mt-3"><span className="text-[10px] text-blue-400 border border-blue-900/60 px-2 py-0.5 rounded-full bg-blue-950/30 font-semibold uppercase tracking-wider">Shot on mobile</span></div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row items-start gap-6 p-6 sm:p-8 border-b border-zinc-900 bg-zinc-950/60">
              <div className="w-10 h-10 rounded-full bg-zinc-900 border border-zinc-800 flex items-center justify-center font-bold text-zinc-400 flex-shrink-0">02</div>
              <div>
                <h4 className="text-base font-bold text-white mb-2 uppercase tracking-tight">Edited in Premiere Pro</h4>
                <p className="text-sm text-zinc-400 leading-relaxed font-light">Basic cut — trimmed to the best moments of each filter reveal. Kept the original ambient sounds (scraping, water, the suction breaking). No music, no transitions, no colour grade. The rawness was intentional.</p>
                <div className="mt-3"><span className="text-[10px] text-zinc-500 border border-zinc-800 px-2 py-0.5 rounded-full bg-zinc-900/30 font-semibold uppercase tracking-wider">Adobe Premiere Pro</span></div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row items-start gap-6 p-6 sm:p-8 border-b border-zinc-900 bg-zinc-950/60">
              <div className="w-10 h-10 rounded-full bg-zinc-900 border border-zinc-800 flex items-center justify-center font-bold text-zinc-400 flex-shrink-0">03</div>
              <div>
                <h4 className="text-base font-bold text-white mb-2 uppercase tracking-tight">AI voiceover — conversational, not robotic</h4>
                <p className="text-sm text-zinc-400 leading-relaxed font-light">Scripted the voiceover myself, then generated it through ElevenLabs. Chose a natural male voice, adjusted pacing to match the footage. Layered it under the ambient sounds — not over them.</p>
                <div className="mt-3"><span className="text-[10px] text-zinc-500 border border-zinc-800 px-2 py-0.5 rounded-full bg-zinc-900/30 font-semibold uppercase tracking-wider">ElevenLabs</span></div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row items-start gap-6 p-6 sm:p-8 border-b border-zinc-900 bg-zinc-950/60">
              <div className="w-10 h-10 rounded-full bg-zinc-900 border border-zinc-800 flex items-center justify-center font-bold text-zinc-400 flex-shrink-0">04</div>
              <div>
                <h4 className="text-base font-bold text-white mb-2 uppercase tracking-tight">Hook text + 2K export via Instagram Edits</h4>
                <p className="text-sm text-zinc-400 leading-relaxed font-light">Added the hook text overlay directly inside the Instagram Edits app. Exported at 2K resolution, 30fps — higher source quality means better compression on Instagram's side, sharper playback on every device.</p>
                <div className="mt-3"><span className="text-[10px] text-zinc-500 border border-zinc-800 px-2 py-0.5 rounded-full bg-zinc-900/30 font-semibold uppercase tracking-wider">Instagram Edits App</span></div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row items-start gap-6 p-6 sm:p-8 bg-zinc-950/60">
              <div className="w-10 h-10 rounded-full bg-zinc-900 border border-zinc-800 flex items-center justify-center font-bold text-zinc-400 flex-shrink-0">05</div>
              <div>
                <h4 className="text-base font-bold text-white mb-2 uppercase tracking-tight">Caption, hashtags, timing — all deliberate</h4>
                <p className="text-sm text-zinc-400 leading-relaxed font-light">Used ChatGPT to shape the caption angle — led with a real observation ("we see this all the time"), followed with the problem, closed with a soft DM CTA. Posted mid-morning. Cross-posted to Facebook automatically. Same video uploaded manually to YouTube Shorts the same day.</p>
                <div className="flex flex-wrap gap-2 mt-4">
                  <span className="text-[10px] text-zinc-500 border border-zinc-800 px-2 py-0.5 rounded-full bg-zinc-900/20">ChatGPT</span>
                  <span className="text-[10px] text-zinc-500 border border-zinc-800 px-2 py-0.5 rounded-full bg-zinc-900/20">#aquacare</span>
                  <span className="text-[10px] text-zinc-500 border border-zinc-800 px-2 py-0.5 rounded-full bg-zinc-900/20">#waterfilter</span>
                  <span className="text-[10px] text-zinc-500 border border-zinc-800 px-2 py-0.5 rounded-full bg-zinc-900/20">#cleanwater</span>
                </div>
              </div>
            </div>
          </div>

          {/* Numbers by platform */}
          <p className="text-xs tracking-widest uppercase text-zinc-500 mb-4 font-semibold">VERIFIED PLATFORM ANALYTICS</p>
          <h3 className="text-2xl font-bold uppercase tracking-tight mb-8">Organic Breakdown by Platform.</h3>

          {/* Instagram */}
          <div className="mb-6">
            <div className="flex items-center gap-3 px-6 py-3.5 bg-zinc-950 border border-zinc-800 border-b-0 rounded-t-2xl">
              <div className="w-2.5 h-2.5 rounded-full bg-[#e1306c]" />
              <span className="text-xs font-bold uppercase tracking-widest">Instagram Reels</span>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-5 border border-zinc-800 bg-zinc-950/40 rounded-b-2xl overflow-hidden">
              <div className="p-5 border-r border-b md:border-b-0 border-zinc-900">
                <div className="text-2xl sm:text-3xl font-bold text-white">100.1K</div>
                <div className="text-[9px] text-zinc-500 uppercase tracking-widest font-bold mt-1">Views</div>
              </div>
              <div className="p-5 border-r border-b md:border-b-0 border-zinc-900">
                <div className="text-2xl sm:text-3xl font-bold text-white">13s</div>
                <div className="text-[9px] text-zinc-500 uppercase tracking-widest font-bold mt-1">Avg Watch Time</div>
              </div>
              <div className="p-5 border-r border-zinc-900">
                <div className="text-2xl sm:text-3xl font-bold text-white">95</div>
                <div className="text-[9px] text-zinc-500 uppercase tracking-widest font-bold mt-1">Shares</div>
              </div>
              <div className="p-5 border-r border-zinc-900">
                <div className="text-2xl sm:text-3xl font-bold text-white">53</div>
                <div className="text-[9px] text-zinc-500 uppercase tracking-widest font-bold mt-1">Saves</div>
              </div>
              <div className="p-5">
                <div className="text-2xl sm:text-3xl font-bold text-emerald-400">37</div>
                <div className="text-[9px] text-zinc-500 uppercase tracking-widest font-bold mt-1">New Follows</div>
              </div>
            </div>
          </div>

          {/* YouTube */}
          <div className="mb-16">
            <div className="flex items-center gap-3 px-6 py-3.5 bg-zinc-950 border border-zinc-800 border-b-0 rounded-t-2xl">
              <div className="w-2.5 h-2.5 rounded-full bg-[#ff0000]" />
              <span className="text-xs font-bold uppercase tracking-widest">YouTube Shorts</span>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 border border-zinc-800 bg-zinc-950/40 rounded-b-2xl overflow-hidden">
              <div className="p-5 border-r border-b md:border-b-0 border-zinc-900">
                <div className="text-2xl sm:text-3xl font-bold text-white">13.9K</div>
                <div className="text-[9px] text-zinc-500 uppercase tracking-widest font-bold mt-1">Views</div>
              </div>
              <div className="p-5 border-r border-b md:border-b-0 border-zinc-900">
                <div className="text-2xl sm:text-3xl font-bold text-white">81.5%</div>
                <div className="text-[9px] text-zinc-500 uppercase tracking-widest font-bold mt-1">Stayed to Watch</div>
              </div>
              <div className="p-5 border-r border-zinc-900">
                <div className="text-2xl sm:text-3xl font-bold text-white">0:28</div>
                <div className="text-[9px] text-zinc-500 uppercase tracking-widest font-bold mt-1">Avg Duration</div>
              </div>
              <div className="p-5">
                <div className="text-2xl sm:text-3xl font-bold text-white">13.3K</div>
                <div className="text-[9px] text-zinc-500 uppercase tracking-widest font-bold mt-1">Unique Viewers</div>
              </div>
            </div>
          </div>

          {/* Why It Worked */}
          <p className="text-xs tracking-widest uppercase text-zinc-500 mb-4 font-semibold">ORGANIC BREAKDOWN</p>
          <h3 className="text-2xl font-bold uppercase tracking-tight mb-4">Why a "basic" video beat everything.</h3>
          <p className="text-sm text-zinc-400 max-w-2xl mb-8 leading-relaxed font-light">
            I've made reels with motion graphics, colour grades, and full brand intros for Aqua Care. This one had none of that. Here's what the data showed about why it worked.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-16">
            <div className="p-6 bg-zinc-950 border border-zinc-850 rounded-2xl border-l-4 border-l-blue-600">
              <h4 className="font-bold text-white mb-2 uppercase tracking-tight text-sm">No ad-filter triggered</h4>
              <p className="text-xs text-zinc-400 leading-relaxed font-light">Opened mid-action, no logo, no brand music. Algorithm treated it as organic discovery content and pushed it hard — 77.8% of views came directly from the Reels tab.</p>
            </div>
            <div className="p-6 bg-zinc-950 border border-zinc-850 rounded-2xl border-l-4 border-l-blue-600">
              <h4 className="font-bold text-white mb-2 uppercase tracking-tight text-sm">Proof in the first 2 seconds</h4>
              <p className="text-xs text-zinc-400 leading-relaxed font-light">The dirty filter was visible immediately. No explanation needed before the visual evidence. That's what stopped the scroll — not a graphic or a transition.</p>
            </div>
            <div className="p-6 bg-zinc-950 border border-zinc-850 rounded-2xl border-l-4 border-l-blue-600">
              <h4 className="font-bold text-white mb-2 uppercase tracking-tight text-sm">3-part reveal held retention</h4>
              <p className="text-xs text-zinc-400 leading-relaxed font-light">Filter 1, Filter 2, Filter 3 — each reveal gave viewers a reason to stay for the next one. Low skip rate (33.9%) told the algorithm this was worth pushing further.</p>
            </div>
            <div className="p-6 bg-zinc-950 border border-zinc-850 rounded-2xl border-l-4 border-l-blue-600">
              <h4 className="font-bold text-white mb-2 uppercase tracking-tight text-sm">Cross-posting added views for free</h4>
              <p className="text-xs text-zinc-400 leading-relaxed font-light">Facebook cross-post and YouTube re-upload added massive additional views with zero extra production. Same video, two more platforms, activated the same day.</p>
            </div>
          </div>

          {/* Insight Quote */}
          <div className="p-8 md:p-12 bg-zinc-950 border border-zinc-800 rounded-3xl text-center mb-16 shadow-2xl">
            <p className="text-2xl md:text-3xl font-bold text-white mb-3 uppercase tracking-tight leading-snug">
              Polish doesn't equal performance.<br />
              <span className="text-blue-400 italic">Authenticity does.</span>
            </p>
            <p className="text-xs text-zinc-500 font-light">The most effective content doesn't look like marketing. It looks like documentation.</p>
          </div>

          {/* Verified Screenshots */}
          <p className="text-xs tracking-widest uppercase text-zinc-500 mb-4 font-semibold">VERIFIED SCREENSHOTS</p>
          <h3 className="text-2xl font-bold uppercase tracking-tight mb-3">The actual numbers.</h3>
          <p className="text-sm text-zinc-400 mb-8 font-light">Straight from Instagram Insights and YouTube Studio.</p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-zinc-950 border border-zinc-800 rounded-3xl p-4 flex flex-col gap-4 shadow-lg">
              <div className="aspect-[9/16] w-full rounded-2xl overflow-hidden border border-zinc-900 bg-black">
                <img src="/assets/images/aquacare-reel/ig-overview.jpg" className="w-full h-full object-cover" alt="Instagram Insights Overview" />
              </div>
              <div className="px-2">
                <h4 className="text-sm font-bold text-white uppercase tracking-wider">Instagram Reel Insights</h4>
                <p className="text-zinc-500 text-xs mt-1">Verified stats: 100K views, 26.7K reach, 37 follows, 333 likes, 53 saves.</p>
              </div>
            </div>

            <div className="bg-zinc-950 border border-zinc-800 rounded-3xl p-4 flex flex-col gap-4 shadow-lg justify-between">
              <div className="aspect-video w-full rounded-2xl overflow-hidden border border-zinc-900 bg-black flex items-center justify-center">
                <img src="/assets/images/aquacare-reel/yt-studio.png" className="w-full h-full object-contain" alt="YouTube Studio Overview" />
              </div>
              <div className="px-2">
                <h4 className="text-sm font-bold text-white uppercase tracking-wider">YouTube Studio Video Analytics</h4>
                <p className="text-zinc-500 text-xs mt-1">Verified stats: 13.9K engaged views, 13.3K unique viewers, 81.5% retention.</p>
              </div>
            </div>
          </div>
        </section>

      </div>
    </div>
  );
}
