import { ArrowLeft, Play, Target, Layers, Sparkles, ChevronDown, ChevronUp, MessageCircle, Users, Eye, CheckCircle2, TrendingUp } from "lucide-react";
import { useEffect, useState } from "react";
import { Link } from "wouter";
import { SEO } from "@/components/SEO";

export default function AquaCareCaseStudy() {
  const [playReel, setPlayReel] = useState(false);
  const [showTechnicalData, setShowTechnicalData] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen pt-24 pb-20 bg-[#09090b] text-zinc-100 font-sans selection:bg-emerald-500/20 selection:text-emerald-400">
      <SEO
        title="AquaCare Meta Ads Case Study | Performance Marketing — Gokul KP"
        description="Meta Ads performance marketing case study for AquaCare UAE, covering campaign strategy, creative testing, lead generation, and messaging acquisition across 25 campaigns."
        url="https://www.gokulkp.com/marketing/aqua-care-uae"
      />

      <style dangerouslySetInnerHTML={{ __html: `
        .aqua-container { max-width: 920px; margin: 0 auto; padding: 0 24px; }
        .glass-card { background: rgba(18, 18, 22, 0.75); border: 1px solid rgba(255, 255, 255, 0.08); backdrop-filter: blur(12px); border-radius: 20px; }
      `}} />

      <div className="aqua-container">
        {/* Back Navigation */}
        <Link href="/marketing">
          <a className="inline-flex items-center gap-2 text-sm font-medium hover:text-emerald-400 text-zinc-400 transition-colors mb-10 group cursor-pointer">
            <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
            Back to Marketing Portfolio
          </a>
        </Link>

        {/* ─── HERO HEADER ────────────────────────────────────────────────── */}
        <div className="relative overflow-hidden p-8 md:p-14 rounded-3xl mb-12 border border-emerald-500/25 shadow-2xl shadow-emerald-500/5 bg-zinc-950 relative">
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
              <span className="text-xs text-zinc-400 font-medium">
                25 Dec 2025 — 6 Sep 2026
              </span>
            </div>

            <h1 className="text-3xl sm:text-5xl md:text-6xl font-display font-bold tracking-tight text-white mb-6 leading-[1.1]">
              Building a Multi-Product Meta Ads Engine for AquaCare UAE
            </h1>

            <p className="text-base sm:text-lg text-zinc-300 max-w-2xl font-light leading-relaxed mb-8">
              Managed and scaled Meta advertising across awareness, direct WhatsApp messaging, and lead-generation campaigns for AquaCare's water-treatment portfolio across the UAE.
            </p>

            {/* 3 Core Highlights */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-6 border-t border-zinc-800/80">
              <div className="p-4 rounded-2xl bg-zinc-900/60 border border-zinc-800">
                <div className="text-3xl font-display font-bold text-emerald-400">2,357</div>
                <div className="text-xs font-semibold text-white mt-1">Messaging Inquiries</div>
                <div className="text-[11px] text-zinc-400 mt-0.5">WhatsApp &amp; Instagram DMs</div>
              </div>

              <div className="p-4 rounded-2xl bg-zinc-900/60 border border-zinc-800">
                <div className="text-3xl font-display font-bold text-blue-400">212</div>
                <div className="text-xs font-semibold text-white mt-1">Meta Form Leads</div>
                <div className="text-[11px] text-zinc-400 mt-0.5">As low as AED 4.32 / lead</div>
              </div>

              <div className="p-4 rounded-2xl bg-zinc-900/60 border border-zinc-800">
                <div className="text-3xl font-display font-bold text-zinc-100">1.21M</div>
                <div className="text-xs font-semibold text-white mt-1">Audience Reached</div>
                <div className="text-[11px] text-zinc-400 mt-0.5">2.23M impressions · AED 11.1K spend</div>
              </div>
            </div>
          </div>
        </div>

        {/* ─── THE 3 KEY TAKEAWAYS (CLEAR & SIMPLE) ───────────────────────── */}
        <div className="mb-16">
          <p className="text-xs font-semibold uppercase tracking-widest text-emerald-400 mb-2">Executive Summary</p>
          <h2 className="text-2xl font-bold text-white tracking-tight mb-6">What Made This Campaign Work</h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="glass-card p-6 border-emerald-500/20 flex flex-col justify-between">
              <div>
                <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400 font-bold mb-4">
                  01
                </div>
                <h3 className="text-base font-bold text-white mb-2">Shower Filter Led Direct Leads</h3>
                <p className="text-xs text-zinc-300 leading-relaxed font-light">
                  A high-volume entry product that captured <strong className="text-white">183+ Meta leads</strong> at just <strong className="text-emerald-400 font-semibold">AED 4.85 per lead</strong>, with the top Reel delivering leads at AED 4.32.
                </p>
              </div>
            </div>

            <div className="glass-card p-6 border-blue-500/20 flex flex-col justify-between">
              <div>
                <div className="w-10 h-10 rounded-xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-400 font-bold mb-4">
                  02
                </div>
                <h3 className="text-base font-bold text-white mb-2">Dispensers Drove WhatsApp DMs</h3>
                <p className="text-xs text-zinc-300 leading-relaxed font-light">
                  Countertop water dispensers generated <strong className="text-white">630+ direct messaging conversations</strong>, with winning static creatives costing just <strong className="text-blue-400 font-semibold">AED 1.03 per chat</strong>.
                </p>
              </div>
            </div>

            <div className="glass-card p-6 border-purple-500/20 flex flex-col justify-between">
              <div>
                <div className="w-10 h-10 rounded-xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center text-purple-400 font-bold mb-4">
                  03
                </div>
                <h3 className="text-base font-bold text-white mb-2">Reels Won Direct Response</h3>
                <p className="text-xs text-zinc-300 leading-relaxed font-light">
                  Short-form video Reels produced over <strong className="text-white">75% of total lead volume</strong>, while clean static graphics were deployed for broad awareness and fast seasonal promotions.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* ─── 3-STAGE FUNNEL VISUAL ──────────────────────────────────────── */}
        <div className="glass-card p-8 mb-16 border-zinc-800">
          <p className="text-xs font-semibold uppercase tracking-widest text-zinc-400 mb-2">Funnel Architecture</p>
          <h2 className="text-2xl font-bold text-white tracking-tight mb-6">How Audiences Moved from Awareness to Inquiry</h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-5 rounded-xl bg-zinc-900/60 border border-zinc-800">
              <span className="text-[10px] font-bold text-emerald-400 uppercase tracking-wider block mb-1">Stage 1 — Awareness</span>
              <h4 className="text-sm font-bold text-white mb-2">Broad Education</h4>
              <p className="text-xs text-zinc-400 font-light leading-relaxed">
                Broad targeting across the UAE introducing water quality awareness, filtration benefits, and AquaCare products.
              </p>
            </div>

            <div className="p-5 rounded-xl bg-zinc-900/60 border border-zinc-800">
              <span className="text-[10px] font-bold text-emerald-400 uppercase tracking-wider block mb-1">Stage 2 — Engagement</span>
              <h4 className="text-sm font-bold text-white mb-2">WhatsApp Conversations</h4>
              <p className="text-xs text-zinc-400 font-light leading-relaxed">
                Click-to-WhatsApp and Instagram DM ads answering customer product questions and pricing inquiries in real time.
              </p>
            </div>

            <div className="p-5 rounded-xl bg-zinc-900/60 border border-zinc-800">
              <span className="text-[10px] font-bold text-emerald-400 uppercase tracking-wider block mb-1">Stage 3 — Lead Capture</span>
              <h4 className="text-sm font-bold text-white mb-2">Instant Lead Forms</h4>
              <p className="text-xs text-zinc-400 font-light leading-relaxed">
                Native Meta lead forms capturing customer name, phone, and delivery location directly inside Facebook and Instagram.
              </p>
            </div>
          </div>

          <div className="mt-4 p-3.5 rounded-xl bg-emerald-950/20 border border-emerald-500/20 text-xs text-zinc-300 flex items-center gap-2.5">
            <Sparkles className="w-4 h-4 text-emerald-400 flex-shrink-0" />
            <span><strong>Ramadan Seasonal Push:</strong> Ran tailored campaigns in Feb 2026 adapting dispenser and filter messaging for family prep during Iftar.</span>
          </div>
        </div>

        {/* ─── PRODUCT HIGHLIGHTS (2 CORE WINNERS) ────────────────────────── */}
        <div className="mb-16">
          <p className="text-xs font-semibold uppercase tracking-widest text-emerald-400 mb-2">Top Performers</p>
          <h2 className="text-2xl font-bold text-white tracking-tight mb-6">Product Performance Spotlight</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Shower Filter */}
            <div className="glass-card p-6 border-blue-500/30 bg-gradient-to-br from-blue-950/15 to-zinc-950">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <span className="text-[10px] font-bold text-blue-400 uppercase tracking-wider bg-blue-500/10 px-2.5 py-1 rounded-full border border-blue-500/20">
                    Lead Generation Winner
                  </span>
                  <h3 className="text-xl font-bold text-white mt-2">Shower Filter</h3>
                </div>
                <div className="text-right">
                  <div className="text-2xl font-bold text-blue-400">183 Leads</div>
                  <div className="text-[11px] text-zinc-400">AED 4.85 avg CPL</div>
                </div>
              </div>

              <p className="text-xs text-zinc-300 leading-relaxed font-light mb-4">
                Positioned around hair and skincare benefits in UAE tap water. The winning <strong className="text-white">Shower Filter Reel</strong> alone generated <strong className="text-blue-300">145 leads at AED 4.32 CPL</strong>.
              </p>

              <div className="p-3.5 rounded-xl bg-zinc-900/80 border border-zinc-800 text-xs flex justify-between text-zinc-300">
                <span>Impressions: <strong>49.7K</strong></span>
                <span>CTR: <strong>2.08%</strong></span>
                <span>Clicks: <strong>1,033</strong></span>
              </div>
            </div>

            {/* Countertop Dispenser */}
            <div className="glass-card p-6 border-emerald-500/30 bg-gradient-to-br from-emerald-950/15 to-zinc-950">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <span className="text-[10px] font-bold text-emerald-400 uppercase tracking-wider bg-emerald-500/10 px-2.5 py-1 rounded-full border border-emerald-500/20">
                    Messaging Winner
                  </span>
                  <h3 className="text-xl font-bold text-white mt-2">Countertop Dispensers</h3>
                </div>
                <div className="text-right">
                  <div className="text-2xl font-bold text-emerald-400">630+ DMs</div>
                  <div className="text-[11px] text-zinc-400">from AED 1.03 / DM</div>
                </div>
              </div>

              <p className="text-xs text-zinc-300 leading-relaxed font-light mb-4">
                Targeted homeowners and offices seeking instant hot/cold purified water. Clean static images generated high-intent customer inquiries at extremely low cost.
              </p>

              <div className="p-3.5 rounded-xl bg-zinc-900/80 border border-zinc-800 text-xs flex justify-between text-zinc-300">
                <span>Static: <strong>314 DMs (AED 1.03)</strong></span>
                <span>Image 2: <strong>168 DMs (AED 1.22)</strong></span>
              </div>
            </div>
          </div>
        </div>

        {/* ─── OPTIONAL DETAILED DATA ACCORDION ───────────────────────────── */}
        <div className="mb-16">
          <button
            onClick={() => setShowTechnicalData(!showTechnicalData)}
            className="w-full p-4 rounded-2xl bg-zinc-900 hover:bg-zinc-850 border border-zinc-800 text-zinc-200 text-xs font-semibold flex items-center justify-between transition-colors cursor-pointer"
          >
            <span className="flex items-center gap-2">
              <Layers className="w-4 h-4 text-emerald-400" />
              {showTechnicalData ? "Hide Technical Ads Manager Breakdown" : "View Technical Ads Manager Data (25 Campaigns, CPC, CPM, CTR)"}
            </span>
            {showTechnicalData ? <ChevronUp className="w-4 h-4 text-zinc-400" /> : <ChevronDown className="w-4 h-4 text-zinc-400" />}
          </button>

          {showTechnicalData && (
            <div className="mt-4 p-6 glass-card border-zinc-800 space-y-6">
              {/* Account Efficiency Row */}
              <div>
                <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-3">Account-Level Efficiency Averages</h4>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-center text-xs">
                  <div className="p-3 rounded-xl bg-zinc-900 border border-zinc-800">
                    <span className="text-[10px] text-zinc-500 block">Total Spend</span>
                    <strong className="text-white text-sm">AED 11,063.34</strong>
                  </div>
                  <div className="p-3 rounded-xl bg-zinc-900 border border-zinc-800">
                    <span className="text-[10px] text-zinc-500 block">Average CTR</span>
                    <strong className="text-white text-sm">0.63% (14,040 clicks)</strong>
                  </div>
                  <div className="p-3 rounded-xl bg-zinc-900 border border-zinc-800">
                    <span className="text-[10px] text-zinc-500 block">Average CPC</span>
                    <strong className="text-white text-sm">AED 0.79</strong>
                  </div>
                  <div className="p-3 rounded-xl bg-zinc-900 border border-zinc-800">
                    <span className="text-[10px] text-zinc-500 block">Average CPM</span>
                    <strong className="text-white text-sm">AED 4.96</strong>
                  </div>
                </div>
              </div>

              {/* Key Campaigns Table */}
              <div>
                <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-3">Core Campaigns Log</h4>
                <div className="overflow-x-auto rounded-xl border border-zinc-800">
                  <table className="w-full text-left text-xs">
                    <thead>
                      <tr className="border-b border-zinc-800 bg-zinc-900 text-zinc-400 uppercase text-[10px]">
                        <th className="p-3">Campaign</th>
                        <th className="p-3">Spend</th>
                        <th className="p-3">Results</th>
                        <th className="p-3">Cost/Result</th>
                        <th className="p-3">CTR</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-zinc-850 text-zinc-300">
                      <tr>
                        <td className="p-3 font-medium text-white">Engagement | Shower Filter | Dec 25</td>
                        <td className="p-3 font-mono">AED 1,947.26</td>
                        <td className="p-3">604 DMs</td>
                        <td className="p-3 text-emerald-400">AED 3.22 / DM</td>
                        <td className="p-3">1.19%</td>
                      </tr>
                      <tr>
                        <td className="p-3 font-medium text-white">Leads | Shower Filter | Jan 26</td>
                        <td className="p-3 font-mono">AED 887.48</td>
                        <td className="p-3">183 Leads</td>
                        <td className="p-3 text-emerald-400">AED 4.85 / Lead</td>
                        <td className="p-3">2.08%</td>
                      </tr>
                      <tr>
                        <td className="p-3 font-medium text-white">Dispenser W/RO - Engagement - Aug 26</td>
                        <td className="p-3 font-mono">AED 543.42</td>
                        <td className="p-3">332 DMs</td>
                        <td className="p-3 text-emerald-400">AED 1.64 / DM</td>
                        <td className="p-3">3.28%</td>
                      </tr>
                      <tr>
                        <td className="p-3 font-medium text-white">Engagement | Countertop Dispenser | Jan 26</td>
                        <td className="p-3 font-mono">AED 1,222.11</td>
                        <td className="p-3">263 DMs</td>
                        <td className="p-3 text-emerald-400">AED 4.65 / DM</td>
                        <td className="p-3">2.69%</td>
                      </tr>
                      <tr>
                        <td className="p-3 font-medium text-white">AC | Softener | Leads gen | Aug 26</td>
                        <td className="p-3 font-mono">AED 627.48</td>
                        <td className="p-3">29 Leads</td>
                        <td className="p-3 text-amber-400">AED 21.64 / Lead</td>
                        <td className="p-3">1.85%</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}
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

          {/* Platform Numbers */}
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
