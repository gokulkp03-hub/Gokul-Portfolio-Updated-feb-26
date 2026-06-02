import { ArrowLeft } from "lucide-react";
import { useEffect } from "react";
import { Link } from "wouter";

export default function AquaCareCaseStudy() {
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

      </div>
    </div>
  );
}
