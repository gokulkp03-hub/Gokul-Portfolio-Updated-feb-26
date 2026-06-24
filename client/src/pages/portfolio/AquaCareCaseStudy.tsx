import { ArrowLeft, Play } from "lucide-react";
import { useEffect, useState } from "react";
import { Link } from "wouter";

export default function AquaCareCaseStudy() {
  const [playReel, setPlayReel] = useState(false);
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen pt-24 pb-20 bg-[#0d0d0d] text-white font-sans">
      <style dangerouslySetInnerHTML={{ __html: `
        .aqua-page { max-width: 860px; margin: 0 auto; padding: 0 24px; }
        .aqua-tag { display: inline-flex; align-items: center; gap: 6px; background: rgba(34,197,120,0.12); color: #22c578; border: 0.5px solid rgba(34,197,120,0.3); border-radius: 99px; font-size: 11px; font-weight: 500; padding: 4px 12px; margin-bottom: 20px; }
        .aqua-tag-dot { width: 6px; height: 6px; border-radius: 50%; background: #22c578; }
        .aqua-hero-title { font-size: 36px; font-weight: 700; line-height: 1.15; margin-bottom: 10px; }
        .aqua-hero-sub { font-size: 15px; color: #888; line-height: 1.6; max-width: 520px; margin-bottom: 28px; }
        .aqua-meta-row { display: flex; gap: 24px; flex-wrap: wrap; margin-bottom: 36px; }
        .aqua-meta-item { font-size: 12px; color: #555; }
        .aqua-meta-item span { color: #aaa; font-size: 13px; display: block; margin-top: 2px; }
        .aqua-divider { border: none; border-top: 0.5px solid #1e1e1e; margin: 32px 0; }
        .aqua-section-label { font-size: 11px; font-weight: 600; letter-spacing: .1em; color: #444; text-transform: uppercase; margin-bottom: 16px; }
        .aqua-img-placeholder { background: #161616; border: 0.5px solid #222; border-radius: 12px; display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 8px; color: #333; font-size: 12px; text-align: center; padding: 16px; }
        .aqua-img-icon { width: 28px; height: 28px; border: 1.5px dashed #2a2a2a; border-radius: 6px; display: flex; align-items: center; justify-content: center; }
        .aqua-hero-img { height: 240px; margin-bottom: 32px; }
        .aqua-stats-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 10px; margin-bottom: 32px; }
        @media (max-width: 640px) { .aqua-stats-grid { grid-template-columns: repeat(2, 1fr); } }
        .aqua-stat { background: #111; border: 0.5px solid #1e1e1e; border-radius: 10px; padding: 16px; }
        .aqua-stat-val { font-size: 26px; font-weight: 700; color: #fff; line-height: 1; }
        .aqua-stat-val.green { color: #22c578; }
        .aqua-stat-label { font-size: 11px; color: #555; margin-top: 5px; }
        .aqua-two-col { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; margin-bottom: 32px; }
        @media (max-width: 640px) { .aqua-two-col { grid-template-columns: 1fr; } }
        .aqua-three-col { display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 12px; margin-bottom: 32px; }
        @media (max-width: 640px) { .aqua-three-col { grid-template-columns: 1fr; } }
        .aqua-context-card { background: #111; border: 0.5px solid #1e1e1e; border-radius: 10px; padding: 18px; }
        .aqua-context-card h4 { font-size: 13px; font-weight: 600; color: #fff; margin-bottom: 6px; }
        .aqua-context-card p { font-size: 12px; color: #666; line-height: 1.6; }
        .aqua-funnel-row { display: flex; flex-direction: column; gap: 0; margin-bottom: 32px; }
        @media (min-width: 640px) { .aqua-funnel-row { flex-direction: row; } }
        .aqua-funnel-step { flex: 1; background: #111; border: 0.5px solid #1e1e1e; padding: 14px 16px; position: relative; }
        @media (min-width: 640px) {
          .aqua-funnel-step:first-child { border-radius: 10px 0 0 10px; }
          .aqua-funnel-step:last-child { border-radius: 0 10px 10px 0; }
          .aqua-funnel-step + .aqua-funnel-step { border-left: none; }
        }
        @media (max-width: 639px) {
            .aqua-funnel-step { border-radius: 10px; margin-bottom: 8px; }
            .aqua-funnel-step + .aqua-funnel-step { border-top: none; }
        }
        .aqua-funnel-num { font-size: 10px; color: #444; font-weight: 600; letter-spacing: .05em; margin-bottom: 4px; }
        .aqua-funnel-name { font-size: 13px; font-weight: 600; color: #fff; margin-bottom: 3px; }
        .aqua-funnel-desc { font-size: 11px; color: #555; }
        .aqua-funnel-accent { width: 24px; height: 2px; border-radius: 1px; background: #22c578; margin-bottom: 8px; }
        .aqua-results-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 12px; margin-bottom: 32px; }
        @media (max-width: 640px) { .aqua-results-grid { grid-template-columns: 1fr; } }
        .aqua-result-card { background: #111; border: 0.5px solid #1e1e1e; border-radius: 10px; padding: 16px 18px; display: flex; justify-content: space-between; align-items: center; }
        .aqua-result-left h4 { font-size: 13px; font-weight: 600; color: #fff; margin-bottom: 3px; }
        .aqua-result-left p { font-size: 11px; color: #555; }
        .aqua-result-right { text-align: right; }
        .aqua-result-val { font-size: 20px; font-weight: 700; color: #22c578; }
        .aqua-result-sub { font-size: 10px; color: #444; }
        .aqua-note-box { background: rgba(34,197,120,0.05); border: 0.5px solid rgba(34,197,120,0.15); border-radius: 10px; padding: 14px 18px; margin-bottom: 32px; font-size: 12px; color: #666; line-height: 1.7; }
        .aqua-note-box strong { color: #22c578; font-weight: 500; }
        .aqua-annotation { display: flex; gap: 10px; align-items: flex-start; margin-bottom: 10px; }
        .aqua-ann-num { width: 20px; height: 20px; border-radius: 50%; background: #1a1a1a; border: 0.5px solid #2a2a2a; font-size: 10px; color: #555; display: flex; align-items: center; justify-content: center; flex-shrink: 0; margin-top: 1px; }
        .aqua-ann-text { font-size: 12px; color: #555; line-height: 1.5; }
        .aqua-ann-text strong { color: #aaa; font-weight: 500; }
      `}} />

      <div className="aqua-page">
        <Link href="/marketing">
            <a className="inline-flex items-center gap-2 text-sm font-medium hover:text-emerald-500 text-gray-400 transition-colors mb-12 group cursor-pointer block">
                <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
                Back to Marketing Portfolio
            </a>
        </Link>

        {/* Big Result Banner */}
        <div className="bg-blue-600 text-white p-8 md:p-16 rounded-[2rem] mb-20 text-center flex flex-col items-center justify-center border border-blue-400/50 shadow-2xl shadow-blue-500/20">
            <span className="text-xs font-bold uppercase tracking-[0.4em] mb-4 opacity-70 italic">Verified Performance</span>
            <h2 className="text-5xl md:text-[8rem] font-display font-bold tracking-tighter leading-none mb-6">4.45x ROAS</h2>
            <p className="text-xl md:text-2xl font-bold uppercase tracking-tight max-w-xl">
                Generated AED 31,743 in revenue from AED 7,131 spend in 90 days.
            </p>
        </div>

        <div className="aqua-hero-title">Aqua Care UAE: <br/>The B2B &amp; B2C Growth Arc.</div>
        <div className="aqua-hero-sub text-xl font-medium text-zinc-500">I architected a multi-tiered Meta campaign system targeting both B2C residential homeowners and B2B commercial building procurement.</div>

        <div className="aqua-meta-row">
          <div className="aqua-meta-item">Client<span>Aqua Care UAE</span></div>
          <div className="aqua-meta-item">Industry<span>Water Treatment (B2B &amp; B2C)</span></div>
          <div className="aqua-meta-item">Platform<span>Meta Ads</span></div>
          <div className="aqua-meta-item">Duration<span>Dec 2025 – Mar 2026</span></div>
          <div className="aqua-meta-item">Market<span>UAE & Oman</span></div>
        </div>

        <div className="aqua-hero-img aqua-img-placeholder">
          <div className="aqua-img-icon">
            <svg width="14" height="14" fill="none" stroke="#333" strokeWidth="1.5"><rect x="1" y="1" width="12" height="12" rx="2"/><path d="M1 9l3-3 2 2 3-4 4 5"/></svg>
          </div>
          <div style={{color: "#2a2a2a", fontSize: "13px", fontWeight: "500"}}>Hero image</div>
          <div>Product photo or campaign creative · full bleed, dark background</div>
        </div>

        <hr className="aqua-divider" />

        <div className="aqua-section-label">Overview</div>
        <div className="aqua-stats-grid">
          <div className="aqua-stat"><div className="aqua-stat-val green">4.45×</div><div className="aqua-stat-label">Return on ad spend</div></div>
          <div className="aqua-stat"><div className="aqua-stat-val">AED 31K</div><div className="aqua-stat-label">Revenue generated</div></div>
          <div className="aqua-stat"><div className="aqua-stat-val">874K</div><div className="aqua-stat-label">People reached</div></div>
          <div className="aqua-stat"><div className="aqua-stat-val">16</div><div className="aqua-stat-label">Active campaigns</div></div>
        </div>

        <hr className="aqua-divider" />

        <div className="aqua-section-label">Context & challenge</div>
        <div className="aqua-two-col">
          <div className="aqua-context-card">
            <h4>The brief</h4>
            <p>Generate direct sales and qualified leads for water treatment systems across the UAE — spanning residential B2C products (shower filters, water dispensers) and premium B2B commercial filtration contracts (offices, villas, and building-scale water softeners).</p>
          </div>
          <div className="aqua-context-card">
            <h4>The challenge</h4>
            <p>Capturing both residential B2C buyers and commercial B2B procurement managers. Since low-ticket filters and high-ticket softeners have entirely different sales cycle timelines, we had to isolate audiences and build customized conversion funnels.</p>
          </div>
        </div>

        <hr className="aqua-divider" />

        <div className="aqua-section-label">Strategy — 3-stage funnel per product</div>
        <div className="aqua-funnel-row">
          <div className="aqua-funnel-step">
            <div className="aqua-funnel-accent"></div>
            <div className="aqua-funnel-num">01</div>
            <div className="aqua-funnel-name">Awareness</div>
            <div className="aqua-funnel-desc">Reach campaigns · broad targeting · product education</div>
          </div>
          <div className="aqua-funnel-step">
            <div className="aqua-funnel-accent" style={{background: "#1a6e42"}}></div>
            <div className="aqua-funnel-num">02</div>
            <div className="aqua-funnel-name">Engagement</div>
            <div className="aqua-funnel-desc">Messaging conversations · warm retargeting · WhatsApp DMs</div>
          </div>
          <div className="aqua-funnel-step">
            <div className="aqua-funnel-accent" style={{background: "#0f3d25"}}></div>
            <div className="aqua-funnel-num">03</div>
            <div className="aqua-funnel-name">Leads</div>
            <div className="aqua-funnel-desc">Lead gen forms · qualified intent · direct sales close</div>
          </div>
        </div>

        <div className="aqua-note-box">
          <strong>Ramadan strategy:</strong> Ran separate Ramadan-specific campaigns in Feb 2026 for Dispenser, 3 Stage Jumbo, and Softener — adjusted creative and timing to match seasonal behaviour in UAE.
        </div>

        <hr className="aqua-divider" />

        <div className="aqua-section-label">Images to include — campaign screenshots</div>
        <div className="aqua-three-col">
          <div className="aqua-img-placeholder" style={{height: "130px"}}>
            <div className="aqua-img-icon">
              <svg width="14" height="14" fill="none" stroke="#333" strokeWidth="1.5"><rect x="1" y="1" width="12" height="12" rx="2"/><path d="M1 9l3-3 2 2 3-4 4 5"/></svg>
            </div>
            <div style={{color: "#2a2a2a", fontSize: "11px"}}>Meta Ads Manager<br/>campaign structure screenshot</div>
          </div>
          <div className="aqua-img-placeholder" style={{height: "130px"}}>
            <div className="aqua-img-icon">
              <svg width="14" height="14" fill="none" stroke="#333" strokeWidth="1.5"><rect x="1" y="1" width="12" height="12" rx="2"/><path d="M1 9l3-3 2 2 3-4 4 5"/></svg>
            </div>
            <div style={{color: "#2a2a2a", fontSize: "11px"}}>Ad creatives<br/>(best performing visuals)</div>
          </div>
          <div className="aqua-img-placeholder" style={{height: "130px"}}>
            <div className="aqua-img-icon">
              <svg width="14" height="14" fill="none" stroke="#333" strokeWidth="1.5"><rect x="1" y="1" width="12" height="12" rx="2"/><path d="M1 9l3-3 2 2 3-4 4 5"/></svg>
            </div>
            <div style={{color: "#2a2a2a", fontSize: "11px"}}>Results dashboard<br/>spend + ROAS overview</div>
          </div>
        </div>

        <hr className="aqua-divider" />

        <div className="aqua-section-label">The Hard Numbers</div>
        <div className="aqua-results-grid">
          <div className="aqua-result-card bg-zinc-900 border-zinc-800 p-10">
            <div className="aqua-result-left">
                <h4 className="text-2xl font-bold mb-1 uppercase tracking-tighter">Shower Filter</h4>
                <p className="text-zinc-500 font-bold uppercase tracking-widest text-[10px]">Highest Volume Performer</p>
            </div>
            <div className="aqua-result-right text-right">
                <div className="text-4xl font-black text-blue-500">5.12x</div>
                <div className="text-[10px] font-bold text-zinc-600 uppercase tracking-widest">ROAS</div>
            </div>
          </div>
          <div className="aqua-result-card bg-zinc-900 border-zinc-800 p-10">
            <div className="aqua-result-left">
                <h4 className="text-2xl font-bold mb-1 uppercase tracking-tighter">3 Stage Jumbo</h4>
                <p className="text-zinc-500 font-bold uppercase tracking-widest text-[10px]">High Efficiency Scaling</p>
            </div>
            <div className="aqua-result-right text-right">
                <div className="text-4xl font-black text-blue-500">8.19x</div>
                <div className="text-[10px] font-bold text-zinc-600 uppercase tracking-widest">ROAS</div>
            </div>
          </div>
        </div>

        <hr className="aqua-divider" />

        <div className="aqua-section-label">What images to capture / screenshot right now</div>

        <div className="aqua-annotation">
          <div className="aqua-ann-num">1</div>
          <div className="aqua-ann-text"><strong>Meta Ads Manager — Campaigns tab</strong> · screenshot showing all 16 campaigns, their names, status and spend. Blurs the client name if needed.</div>
        </div>
        <div className="aqua-annotation">
          <div className="aqua-ann-num">2</div>
          <div className="aqua-ann-text"><strong>Results overview row</strong> · the top summary row from your ads manager showing total reach, impressions, amount spent. Crop tightly.</div>
        </div>
        <div className="aqua-annotation">
          <div className="aqua-ann-num">3</div>
          <div className="aqua-ann-text"><strong>Best-performing ad creatives</strong> · screenshot the actual ad images/videos for Shower Filter and 3 Stage Jumbo — highest ROAS products. Shows the creative work too.</div>
        </div>
        <div className="aqua-annotation">
          <div className="aqua-ann-num">4</div>
          <div className="aqua-ann-text"><strong>Funnel structure</strong> · screenshot one product's campaign set (e.g. Shower Filter) showing Awareness + Engagement + Leads ad sets nested — proves strategic thinking.</div>
        </div>
        <div className="aqua-annotation">
          <div className="aqua-ann-num">5</div>
          <div className="aqua-ann-text"><strong>Product photos</strong> · one clean photo of the water products against a dark background for the hero image. Ask the client or shoot it yourself.</div>
        </div>

        {/* ─── SECTION DIVIDER ─────────────────────────────────────────── */}
        <div className="w-full h-[1px] bg-gradient-to-r from-transparent via-zinc-800 to-transparent my-20" />

        {/* ─── REEL CASE STUDY SECTION ─────────────────────────────────── */}
        <section id="reel-case-study" className="max-w-[960px] mx-auto px-0 pb-24 text-white">

          {/* Section Label */}
          <p className="text-[11px] tracking-[2.5px] uppercase text-zinc-500 mb-5 font-semibold">
            CONTENT PRODUCTION · ORGANIC GROWTH
          </p>

          {/* Headline */}
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold leading-[1.1] mb-4 tracking-tight uppercase">
            The Reel That Hit 100K.<br />
            <span className="text-zinc-500 font-normal italic lowercase">No budget. No team. Just instinct.</span>
          </h2>

          <p className="text-lg text-zinc-400 leading-relaxed max-w-2xl mb-12 font-light">
            Shot it, scripted it, edited it, voiced it, posted it — solo. A routine filter replacement job turned into the highest-performing content we've ever published at Aqua Care.
          </p>

          {/* Meta tags row */}
          <div className="flex flex-wrap gap-2 mb-14">
            <span className="text-xs text-zinc-400 border border-zinc-800/80 px-3 py-1.5 rounded-full bg-zinc-950/40">Client: Aqua Care UAE</span>
            <span className="text-xs text-zinc-400 border border-zinc-800/80 px-3 py-1.5 rounded-full bg-zinc-950/40">Platform: Instagram · Facebook · YouTube</span>
            <span className="text-xs text-zinc-400 border border-zinc-800/80 px-3 py-1.5 rounded-full bg-zinc-950/40">Format: Short-form Reel (26 sec)</span>
            <span className="text-xs text-zinc-400 border border-zinc-800/80 px-3 py-1.5 rounded-full bg-zinc-950/40">Date: June 2026</span>
            <span className="text-xs text-zinc-400 border border-zinc-800/80 px-3 py-1.5 rounded-full bg-zinc-950/40">Budget: AED 0</span>
          </div>

          {/* ── HERO STAT ROW ─────────────────────────────────────────── */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-px bg-zinc-905 border border-zinc-900 rounded-3xl overflow-hidden mb-20 shadow-2xl">
            <div className="p-8 bg-zinc-950/90 text-center flex flex-col justify-center border-r border-b md:border-b-0 border-zinc-900">
              <div className="text-4xl md:text-5xl font-black text-blue-500 mb-2">114K+</div>
              <div className="text-[10px] text-zinc-500 font-bold uppercase tracking-widest">Total views</div>
              <div className="text-[10px] text-zinc-600 mt-1">IG + FB + YouTube</div>
            </div>

            <div className="p-8 bg-zinc-950/90 text-center flex flex-col justify-center border-r border-b md:border-b-0 border-zinc-900">
              <div className="text-4xl md:text-5xl font-black text-white mb-2">26.7K</div>
              <div className="text-[10px] text-zinc-500 font-bold uppercase tracking-widest">Accounts reached</div>
              <div className="text-[10px] text-zinc-600 mt-1">Instagram only</div>
            </div>

            <div className="p-8 bg-zinc-950/90 text-center flex flex-col justify-center border-r border-zinc-900">
              <div className="text-4xl md:text-5xl font-black text-white mb-2">99.4%</div>
              <div className="text-[10px] text-zinc-500 font-bold uppercase tracking-widest">New audience</div>
              <div className="text-[10px] text-zinc-600 mt-1">Non-followers</div>
            </div>

            <div className="p-8 bg-zinc-950/90 text-center flex flex-col justify-center">
              <div className="text-4xl md:text-5xl font-black text-emerald-500 mb-2">AED 0</div>
              <div className="text-[10px] text-zinc-500 font-bold uppercase tracking-widest">Ad spend</div>
              <div className="text-[10px] text-zinc-600 mt-1">100% organic</div>
            </div>
          </div>

          {/* ── VIDEO EMBED PLACEHOLDER ──────────────────────────────── */}
          <div className="w-full aspect-[9/16] max-w-[320px] mx-auto mb-20 bg-zinc-950 border border-zinc-900 rounded-3xl overflow-hidden relative group shadow-2xl">
            {playReel ? (
              <iframe
                src="https://player.cloudinary.com/embed/?cloud_name=dgmieaf9g&public_id=Aqua_Care_influencer_marketing_2_bwuudf&autoplay=true"
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

          {/* ── WHAT I DID ───────────────────────────────────────────── */}
          <p className="text-[11px] tracking-[2.5px] uppercase text-zinc-500 mb-6 font-semibold">PRODUCTION PROCESS</p>
          <h3 className="text-3xl font-bold uppercase tracking-tight mb-10">Everything done solo.</h3>

          <div className="flex flex-col mb-20 border border-zinc-800/80 rounded-2xl overflow-hidden shadow-xl">
            {/* Step 1 */}
            <div className="flex flex-col sm:flex-row items-start gap-6 p-8 border-b border-zinc-900 bg-zinc-950/40">
              <div className="w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center font-bold text-white flex-shrink-0">01</div>
              <div>
                <h4 className="text-base font-bold text-white mb-2 uppercase tracking-tight">Spotted the opportunity on-site</h4>
                <p className="text-sm text-zinc-400 leading-relaxed font-light">We were doing a routine filter replacement at a customer's home. I saw the dirty filters and thought — people have no idea what's sitting inside their water system. Pulled out my phone.</p>
                <div className="mt-3"><span className="text-[10px] text-blue-400 border border-blue-900/60 px-2 py-0.5 rounded-full bg-blue-950/30 font-semibold uppercase tracking-wider">Shot on mobile</span></div>
              </div>
            </div>

            {/* Step 2 */}
            <div className="flex flex-col sm:flex-row items-start gap-6 p-8 border-b border-zinc-900 bg-zinc-950/40">
              <div className="w-10 h-10 rounded-full bg-zinc-900 border border-zinc-800 flex items-center justify-center font-bold text-zinc-400 flex-shrink-0">02</div>
              <div>
                <h4 className="text-base font-bold text-white mb-2 uppercase tracking-tight">Edited in Premiere Pro</h4>
                <p className="text-sm text-zinc-400 leading-relaxed font-light">Basic cut — trimmed to the best moments of each filter reveal. Kept the original ambient sounds (scraping, water, the suction breaking). No music, no transitions, no colour grade. The rawness was intentional.</p>
                <div className="mt-3"><span className="text-[10px] text-zinc-500 border border-zinc-800 px-2 py-0.5 rounded-full bg-zinc-900/30 font-semibold uppercase tracking-wider">Adobe Premiere Pro</span></div>
              </div>
            </div>

            {/* Step 3 */}
            <div className="flex flex-col sm:flex-row items-start gap-6 p-8 border-b border-zinc-900 bg-zinc-950/40">
              <div className="w-10 h-10 rounded-full bg-zinc-900 border border-zinc-800 flex items-center justify-center font-bold text-zinc-400 flex-shrink-0">03</div>
              <div>
                <h4 className="text-base font-bold text-white mb-2 uppercase tracking-tight">AI voiceover — conversational, not robotic</h4>
                <p className="text-sm text-zinc-400 leading-relaxed font-light">Scripted the voiceover myself, then generated it through ElevenLabs. Chose a natural male voice, adjusted pacing to match the footage. Layered it under the ambient sounds — not over them.</p>
                <div className="mt-3"><span className="text-[10px] text-zinc-500 border border-zinc-800 px-2 py-0.5 rounded-full bg-zinc-900/30 font-semibold uppercase tracking-wider">ElevenLabs</span></div>
              </div>
            </div>

            {/* Step 4 */}
            <div className="flex flex-col sm:flex-row items-start gap-6 p-8 border-b border-zinc-900 bg-zinc-950/40">
              <div className="w-10 h-10 rounded-full bg-zinc-900 border border-zinc-800 flex items-center justify-center font-bold text-zinc-400 flex-shrink-0">04</div>
              <div>
                <h4 className="text-base font-bold text-white mb-2 uppercase tracking-tight">Hook text + 2K export via Instagram Edits</h4>
                <p className="text-sm text-zinc-400 leading-relaxed font-light">Added the hook text overlay directly inside the Instagram Edits app. Exported at 2K resolution, 30fps — higher source quality means better compression on Instagram's side, sharper playback on every device.</p>
                <div className="mt-3"><span className="text-[10px] text-zinc-500 border border-zinc-800 px-2 py-0.5 rounded-full bg-zinc-900/30 font-semibold uppercase tracking-wider">Instagram Edits App</span></div>
              </div>
            </div>

            {/* Step 5 */}
            <div className="flex flex-col sm:flex-row items-start gap-6 p-8 bg-zinc-950/40">
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

          {/* ── NUMBERS BY PLATFORM ───────────────────────────────────── */}
          <p className="text-[11px] tracking-[2.5px] uppercase text-zinc-500 mb-6 font-semibold">VERIFIED PERFORMANCE</p>
          <h3 className="text-3xl font-bold uppercase tracking-tight mb-10">Numbers by platform.</h3>

          {/* Instagram */}
          <div className="mb-8">
            <div className="flex items-center gap-3 px-6 py-4 bg-zinc-950 border border-zinc-800 border-b-0 rounded-t-2xl">
              <div className="w-2.5 h-2.5 rounded-full bg-[#e1306c]" />
              <span className="text-xs font-bold uppercase tracking-widest">Instagram Reels</span>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-5 border border-zinc-800 bg-zinc-950/40 rounded-b-2xl overflow-hidden">
              <div className="p-6 border-r border-b md:border-b-0 border-zinc-900/80">
                <div className="text-3xl font-bold text-white">100.1K</div>
                <div className="text-[9px] text-zinc-500 uppercase tracking-widest font-bold mt-1">Views</div>
              </div>
              <div className="p-6 border-r border-b md:border-b-0 border-zinc-900/80">
                <div className="text-3xl font-bold text-white">13s</div>
                <div className="text-[9px] text-zinc-500 uppercase tracking-widest font-bold mt-1">Avg Watch Time</div>
              </div>
              <div className="p-6 border-r border-zinc-900/80">
                <div className="text-3xl font-bold text-white">95</div>
                <div className="text-[9px] text-zinc-500 uppercase tracking-widest font-bold mt-1">Shares</div>
              </div>
              <div className="p-6 border-r border-zinc-900/80">
                <div className="text-3xl font-bold text-white">53</div>
                <div className="text-[9px] text-zinc-500 uppercase tracking-widest font-bold mt-1">Saves</div>
              </div>
              <div className="p-6">
                <div className="text-3xl font-bold text-emerald-500">37</div>
                <div className="text-[9px] text-zinc-500 uppercase tracking-widest font-bold mt-1">New Follows</div>
              </div>
            </div>
          </div>

          {/* YouTube */}
          <div className="mb-20">
            <div className="flex items-center gap-3 px-6 py-4 bg-zinc-950 border border-zinc-800 border-b-0 rounded-t-2xl">
              <div className="w-2.5 h-2.5 rounded-full bg-[#ff0000]" />
              <span className="text-xs font-bold uppercase tracking-widest">YouTube Shorts</span>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 border border-zinc-800 bg-zinc-950/40 rounded-b-2xl overflow-hidden">
              <div className="p-6 border-r border-b md:border-b-0 border-zinc-900/80">
                <div className="text-3xl font-bold text-white">13.9K</div>
                <div className="text-[9px] text-zinc-500 uppercase tracking-widest font-bold mt-1">Views</div>
              </div>
              <div className="p-6 border-r border-b md:border-b-0 border-zinc-900/80">
                <div className="text-3xl font-bold text-white">81.5%</div>
                <div className="text-[9px] text-zinc-500 uppercase tracking-widest font-bold mt-1">Stayed to Watch</div>
              </div>
              <div className="p-6 border-r border-zinc-900/80">
                <div className="text-3xl font-bold text-white">0:28</div>
                <div className="text-[9px] text-zinc-500 uppercase tracking-widest font-bold mt-1">Avg Duration</div>
              </div>
              <div className="p-6">
                <div className="text-3xl font-bold text-white">13.3K</div>
                <div className="text-[9px] text-zinc-500 uppercase tracking-widest font-bold mt-1">Unique Viewers</div>
              </div>
            </div>
          </div>

          {/* ── WHY IT WORKED ─────────────────────────────────────────── */}
          <p className="text-[11px] tracking-[2.5px] uppercase text-zinc-500 mb-6 font-semibold">BREAKDOWN</p>
          <h3 className="text-3xl font-bold uppercase tracking-tight mb-4">Why a "basic" video beat everything.</h3>
          <p className="text-sm text-zinc-400 max-w-2xl mb-10 leading-relaxed font-light">I've made reels with motion graphics, colour grades, and full brand intros for Aqua Care. This one had none of that. Here's what the data showed about why it worked.</p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-20">
            <div className="p-8 bg-zinc-950/80 border border-zinc-800/80 rounded-2xl border-l-4 border-l-blue-600 shadow-lg">
              <h4 className="font-bold text-white mb-2 uppercase tracking-tight text-sm">No ad-filter triggered</h4>
              <p className="text-xs text-zinc-400 leading-relaxed font-light">Opened mid-action, no logo, no brand music. Algorithm treated it as organic discovery content and pushed it hard — 77.8% of views came directly from the Reels tab.</p>
            </div>
            <div className="p-8 bg-zinc-950/80 border border-zinc-800/80 rounded-2xl border-l-4 border-l-blue-600 shadow-lg">
              <h4 className="font-bold text-white mb-2 uppercase tracking-tight text-sm">Proof in the first 2 seconds</h4>
              <p className="text-xs text-zinc-400 leading-relaxed font-light">The dirty filter was visible immediately. No explanation needed before the visual evidence. That's what stopped the scroll — not a graphic or a transition.</p>
            </div>
            <div className="p-8 bg-zinc-950/80 border border-zinc-800/80 rounded-2xl border-l-4 border-l-blue-600 shadow-lg">
              <h4 className="font-bold text-white mb-2 uppercase tracking-tight text-sm">3-part reveal held retention</h4>
              <p className="text-xs text-zinc-400 leading-relaxed font-light">Filter 1, Filter 2, Filter 3 — each reveal gave viewers a reason to stay for the next one. Low skip rate (33.9%) told the algorithm this was worth pushing further.</p>
            </div>
            <div className="p-8 bg-zinc-950/80 border border-zinc-800/80 rounded-2xl border-l-4 border-l-blue-600 shadow-lg">
              <h4 className="font-bold text-white mb-2 uppercase tracking-tight text-sm">Cross-posting added views for free</h4>
              <p className="text-xs text-zinc-400 leading-relaxed font-light">Facebook cross-post and YouTube re-upload added massive additional views with zero extra production. Same video, two more platforms, activated the same day.</p>
            </div>
          </div>

          {/* ── INSIGHT QUOTE ─────────────────────────────────────────── */}
          <div className="p-10 md:p-14 bg-zinc-950 border border-zinc-800/80 rounded-[2rem] text-center mb-20 shadow-2xl relative">
            <div className="text-5xl text-zinc-850 font-serif leading-none mb-4">“</div>
            <p className="text-2xl md:text-3xl font-bold text-white mb-4 uppercase tracking-tighter leading-snug">
              Polish doesn't equal performance.<br />
              <span className="text-blue-500 italic">Authenticity does.</span>
            </p>
            <p className="text-xs text-zinc-500 font-light">The most effective content doesn't look like marketing. It looks like documentation.</p>
          </div>

          {/* ── SCREENSHOT PROOF STRIP ────────────────────────────────── */}
          <p className="text-[11px] tracking-[2.5px] uppercase text-zinc-500 mb-6 font-semibold">VERIFIED SCREENSHOTS</p>
          <h3 className="text-3xl font-bold uppercase tracking-tight mb-3">The actual numbers.</h3>
          <p className="text-sm text-zinc-400 mb-10 font-light">Straight from Instagram Insights and YouTube Studio.</p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-20">
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

        {/* ─── AD CREATIVES & INFLUENCER VIDEOS ─────────────────────────── */}
        <div className="w-full h-[1px] bg-gradient-to-r from-transparent via-zinc-800 to-transparent my-20" />

        <section id="ad-creatives-showcase" className="pb-24">
          <p className="text-[11px] tracking-[2.5px] uppercase text-zinc-500 mb-6 font-semibold">PAID CAMPAIGNS</p>
          <h3 className="text-3xl font-bold uppercase tracking-tight mb-10">Ad Creatives Production.</h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-zinc-950/80 border border-zinc-800 hover:border-emerald-500/20 transition-all rounded-3xl overflow-hidden p-4 flex flex-col gap-4 shadow-xl">
              <div className="w-full aspect-video rounded-2xl overflow-hidden bg-black border border-zinc-900">
                <iframe
                  src="https://player.cloudinary.com/embed/?cloud_name=dgmieaf9g&public_id=Aqua_Care_Dispenser_Cinematic_kwhxvr"
                  className="w-full h-full border-0"
                  allow="autoplay; fullscreen; encrypted-media; picture-in-picture"
                  allowFullScreen
                />
              </div>
              <div>
                <h4 className="text-sm font-bold text-white mb-1 uppercase tracking-tight">Dispenser Cinematic Ad</h4>
                <p className="text-zinc-500 text-xs leading-relaxed">High-end product cinematic illustrating the features of premium water dispensers.</p>
              </div>
            </div>

            <div className="bg-zinc-950/80 border border-zinc-800 hover:border-emerald-500/20 transition-all rounded-3xl overflow-hidden p-4 flex flex-col gap-4 shadow-xl">
              <div className="w-full aspect-video rounded-2xl overflow-hidden bg-black border border-zinc-900">
                <iframe
                  src="https://player.cloudinary.com/embed/?cloud_name=dgmieaf9g&public_id=Aqua_Care_fully_AI_Product_Video_qc6l39"
                  className="w-full h-full border-0"
                  allow="autoplay; fullscreen; encrypted-media; picture-in-picture"
                  allowFullScreen
                />
              </div>
              <div>
                <h4 className="text-sm font-bold text-white mb-1 uppercase tracking-tight">Fully AI Product Video</h4>
                <p className="text-zinc-500 text-xs leading-relaxed">Visualizing filtration mechanics and molecular purification using advanced AI tools.</p>
              </div>
            </div>

            <div className="bg-zinc-950/80 border border-zinc-800 hover:border-emerald-500/20 transition-all rounded-3xl overflow-hidden p-4 flex flex-col gap-4 shadow-xl">
              <div className="w-full aspect-video rounded-2xl overflow-hidden bg-black border border-zinc-900">
                <iframe
                  src="https://player.cloudinary.com/embed/?cloud_name=dgmieaf9g&public_id=Aqua_Care_Ramadan_Dispenser_Hot_water_use_AI_Video_yh60pz"
                  className="w-full h-full border-0"
                  allow="autoplay; fullscreen; encrypted-media; picture-in-picture"
                  allowFullScreen
                />
              </div>
              <div>
                <h4 className="text-sm font-bold text-white mb-1 uppercase tracking-tight">Ramadan Dispenser AI Campaign</h4>
                <p className="text-zinc-500 text-xs leading-relaxed">Specialized seasonal ad targeting hot water dispenser convenience during Iftar prep.</p>
              </div>
            </div>

            <div className="bg-zinc-950/80 border border-zinc-800 hover:border-emerald-500/20 transition-all rounded-3xl overflow-hidden p-4 flex flex-col gap-4 shadow-xl">
              <div className="w-full aspect-video rounded-2xl overflow-hidden bg-black border border-zinc-900">
                <iframe
                  src="https://player.cloudinary.com/embed/?cloud_name=dgmieaf9g&public_id=Aqua_Care_Water_softener_system_AI_Video_fmcm0l"
                  className="w-full h-full border-0"
                  allow="autoplay; fullscreen; encrypted-media; picture-in-picture"
                  allowFullScreen
                />
              </div>
              <div>
                <h4 className="text-sm font-bold text-white mb-1 uppercase tracking-tight">Water Softener System AI Demo</h4>
                <p className="text-zinc-500 text-xs leading-relaxed">Demonstrating anti-scaling and water conditioning technology through high-impact AI animation.</p>
              </div>
            </div>
          </div>
        </section>

        <div className="w-full h-[1px] bg-gradient-to-r from-transparent via-zinc-800 to-transparent my-10" />

        <section id="influencer-showcase" className="pb-24">
          <p className="text-[11px] tracking-[2.5px] uppercase text-zinc-500 mb-6 font-semibold">PARTNERSHIPS</p>
          <h3 className="text-3xl font-bold uppercase tracking-tight mb-10">Influencer Collaborations.</h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-zinc-950/80 border border-zinc-800 hover:border-emerald-500/20 transition-all rounded-3xl overflow-hidden p-4 flex flex-col gap-4 shadow-xl">
              <div className="w-full aspect-video rounded-2xl overflow-hidden bg-black border border-zinc-900">
                <iframe
                  src="https://player.cloudinary.com/embed/?cloud_name=dgmieaf9g&public_id=Aqua_Care_influencer_marketing_2_bwuudf"
                  className="w-full h-full border-0"
                  allow="autoplay; fullscreen; encrypted-media; picture-in-picture"
                  allowFullScreen
                />
              </div>
              <div>
                <h4 className="text-sm font-bold text-white mb-1 uppercase tracking-tight">Shower Filter Lifestyle Collab</h4>
                <p className="text-zinc-500 text-xs leading-relaxed">Lifestyle influencer illustrating the beauty and hair benefits of mineral filtration.</p>
              </div>
            </div>

            <div className="bg-zinc-950/80 border border-zinc-800 hover:border-emerald-500/20 transition-all rounded-3xl overflow-hidden p-4 flex flex-col gap-4 shadow-xl">
              <div className="w-full aspect-video rounded-2xl overflow-hidden bg-black border border-zinc-900">
                <iframe
                  src="https://player.cloudinary.com/embed/?cloud_name=dgmieaf9g&public_id=Aqua_care_influencer_marketing_ytgetc"
                  className="w-full h-full border-0"
                  allow="autoplay; fullscreen; encrypted-media; picture-in-picture"
                  allowFullScreen
                />
              </div>
              <div>
                <h4 className="text-sm font-bold text-white mb-1 uppercase tracking-tight">Clean Water Family Campaign</h4>
                <p className="text-zinc-500 text-xs leading-relaxed">Family-oriented influencer showing filter installation and health improvements.</p>
              </div>
            </div>
          </div>
        </section>

      </div>
    </div>
  );
}
