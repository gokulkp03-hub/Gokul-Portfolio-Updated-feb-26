import React, { useEffect, useState, lazy, Suspense } from "react";
import { Filter, Users, MessageCircle, DollarSign, Activity } from "lucide-react";

export const funnelNodes = [
  { id: "reach", label: "Reach", value: "7.3M Impressions", desc: "Broad targeting and algorithmic scaling.", icon: Filter },
  { id: "attention", label: "Attention", value: "320K+ Views", desc: "High-retention video hooks.", icon: Users },
  { id: "leads", label: "Leads", value: "7,300+ Enquiries", desc: "Qualified WhatsApp & form leads.", icon: MessageCircle },
  { id: "revenue", label: "Revenue", value: "AED 31K+ Spike", desc: "Direct response campaign revenue.", icon: DollarSign },
  { id: "efficiency", label: "Efficiency", value: "4.45x Avg ROAS", desc: "Tracked return on ad spend.", icon: Activity }
];

// Lazy-load Three.js 3D canvas ONLY when on desktop
const CampaignDataTerrain3D = lazy(() => import("./CampaignDataTerrain3D"));

export const CampaignDataTerrainSingle: React.FC = () => {
  const [isDesktop, setIsDesktop] = useState<boolean>(() => {
    if (typeof window === "undefined") return false;
    return window.innerWidth >= 768 && !("ontouchstart" in window);
  });

  useEffect(() => {
    const checkDesktop = () => {
      setIsDesktop(window.innerWidth >= 768 && !("ontouchstart" in window));
    };
    window.addEventListener("resize", checkDesktop);
    return () => window.removeEventListener("resize", checkDesktop);
  }, []);

  if (!isDesktop) {
    return (
      <div className="relative w-full bg-zinc-950 rounded-3xl border border-border/20 p-6 sm:p-8 overflow-hidden">
        <div className="mb-6">
          <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-orange-500 mb-2 block">Methodology</span>
          <h3 className="text-2xl font-display font-bold text-white mb-2 tracking-tight">Campaign Journey</h3>
          <p className="text-xs text-neutral-400 font-light leading-relaxed">
            An interactive full-funnel performance marketing methodology engineered for GCC brand growth.
          </p>
        </div>
        <div className="grid grid-cols-1 gap-3">
          {funnelNodes.map((node, i) => {
            const Icon = node.icon;
            return (
              <div
                key={node.id}
                className="flex items-start gap-4 p-4 rounded-2xl bg-zinc-900/60 border border-white/5"
              >
                <div className="p-2.5 rounded-xl bg-orange-500/10 text-orange-500 flex-shrink-0 mt-0.5">
                  <Icon className="w-5 h-5" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-2 mb-0.5">
                    <span className="text-[10px] font-bold uppercase tracking-widest text-orange-500">{node.label}</span>
                    <span className="text-[10px] font-mono text-zinc-500">0{i + 1}</span>
                  </div>
                  <div className="text-base font-display font-bold text-white leading-snug">{node.value}</div>
                  <div className="text-xs text-neutral-400 font-light mt-0.5 leading-relaxed">{node.desc}</div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  }

  return (
    <Suspense
      fallback={
        <div className="relative w-full h-[600px] bg-zinc-950 rounded-[2.5rem] border border-border/20 flex items-center justify-center">
          <span className="text-xs font-mono text-zinc-600 uppercase tracking-widest">Loading 3D Journey...</span>
        </div>
      }
    >
      <CampaignDataTerrain3D />
    </Suspense>
  );
};
