import React, { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { TrendingUp, Award, Zap, BarChart3, CheckCircle2, Sparkles } from "lucide-react";

export const ScrollCurvePath: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const pathRef = useRef<SVGPathElement>(null);
  const [pathLength, setPathLength] = useState<number>(0);
  const [pageHeight, setPageHeight] = useState<number>(4000);

  // 1. Scroll-driven progress
  const { scrollYProgress } = useScroll();

  // Measure page height and dynamic SVG path length
  useEffect(() => {
    const updateDimensions = () => {
      const h = Math.max(
        document.body.scrollHeight,
        document.documentElement.scrollHeight,
        document.body.offsetHeight,
        document.documentElement.offsetHeight
      );
      setPageHeight(h);

      if (pathRef.current) {
        const length = pathRef.current.getTotalLength();
        setPathLength(length);
      }
    };

    updateDimensions();
    window.addEventListener("resize", updateDimensions);
    const timer = setTimeout(updateDimensions, 1000); // Recalculate after images load

    return () => {
      window.removeEventListener("resize", updateDimensions);
      clearTimeout(timer);
    };
  }, []);

  // 2. Dashoffset calculation (0% scroll = fully hidden offset, 100% scroll = 0 offset)
  const strokeDashoffset = useTransform(scrollYProgress, [0, 1], [pathLength, 0]);

  // Ambient Cards along the path (position in % of page scroll height)
  const backgroundCards = [
    {
      topProgress: 0.18, // Capabilities section
      align: "right",
      icon: TrendingUp,
      stat: "4.45x Avg ROAS",
      label: "GCC Tracked Return",
      className: "top-[18%] right-[8%] sm:right-[14%]"
    },
    {
      topProgress: 0.38, // Proof Strip
      align: "left",
      icon: Zap,
      stat: "7,300+ Leads",
      label: "Direct WhatsApp Funnel",
      className: "top-[38%] left-[6%] sm:left-[12%]"
    },
    {
      topProgress: 0.58, // Featured Work
      align: "right",
      icon: Award,
      stat: "AED 166K+",
      label: "Managed Ad Budget",
      className: "top-[58%] right-[6%] sm:right-[12%]"
    },
    {
      topProgress: 0.78, // Acceleration Process
      align: "left",
      icon: CheckCircle2,
      stat: "208x Peak Spike",
      label: "Flood-Pump Campaign",
      className: "top-[78%] left-[8%] sm:left-[14%]"
    }
  ];

  return (
    <div
      ref={containerRef}
      className="absolute inset-0 w-full pointer-events-none z-[1] overflow-hidden"
      style={{ height: `${pageHeight}px` }}
    >
      {/* Background SVG Curve */}
      <svg
        className="w-full h-full absolute inset-0 text-[#F97316] opacity-30 filter drop-shadow-[0_0_12px_rgba(249,115,22,0.3)]"
        preserveAspectRatio="none"
        viewBox={`0 0 1400 ${pageHeight}`}
      >
        <defs>
          <linearGradient id="curveGradient" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#F97316" stopOpacity="0.4" />
            <stop offset="50%" stopColor="#EA580C" stopOpacity="0.8" />
            <stop offset="100%" stopColor="#C2410C" stopOpacity="0.2" />
          </linearGradient>
        </defs>

        {/* Dynamic Multi-Curve Weaving Path */}
        <motion.path
          ref={pathRef}
          d={`
            M 700 150
            C 1100 600, 200 1200, 700 1800
            C 1200 2400, 300 3000, 700 3600
            C 1000 4200, 500 4800, 700 ${pageHeight - 200}
          `}
          fill="none"
          stroke="url(#curveGradient)"
          strokeWidth="2.5"
          strokeDasharray={pathLength}
          style={{ strokeDashoffset }}
          strokeLinecap="round"
        />
      </svg>

      {/* Ambient Glassmorphic Cards sitting along path */}
      {backgroundCards.map((card, idx) => {
        // Individual scroll-trigger opacity/parallax effect for each card
        const cardY = useTransform(
          scrollYProgress,
          [card.topProgress - 0.1, card.topProgress, card.topProgress + 0.1],
          [30, 0, -30]
        );
        const cardOpacity = useTransform(
          scrollYProgress,
          [card.topProgress - 0.15, card.topProgress, card.topProgress + 0.15],
          [0, 0.75, 0]
        );

        const IconComponent = card.icon;

        return (
          <motion.div
            key={idx}
            style={{ y: cardY, opacity: cardOpacity }}
            className={`absolute z-0 hidden md:flex items-center gap-3.5 p-4 rounded-2xl bg-white/[0.03] border border-white/10 backdrop-blur-md shadow-2xl text-white pointer-events-none filter blur-[0.3px] ${card.className}`}
          >
            <div className="w-9 h-9 rounded-xl bg-orange-500/10 border border-orange-500/20 flex items-center justify-center text-orange-500">
              <IconComponent className="w-4 h-4" />
            </div>
            <div>
              <div className="text-sm font-bold font-display text-white tracking-wide">{card.stat}</div>
              <div className="text-[10px] font-mono text-neutral-400 uppercase tracking-wider">{card.label}</div>
            </div>
          </motion.div>
        );
      })}
    </div>
  );
};
