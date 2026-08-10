import React, { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { TrendingUp, Award, Zap, CheckCircle2 } from "lucide-react";

export const CursorTrailSpotlight: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [pageHeight, setPageHeight] = useState<number>(4000);
  const [isDesktop, setIsDesktop] = useState<boolean>(true);

  const { scrollYProgress } = useScroll();

  // Active Spotlight Y-position in pixels across page scroll height
  const spotlightY = useTransform(scrollYProgress, [0, 1], [300, pageHeight - 400]);

  // Dynamic Page Height Measurement
  useEffect(() => {
    const updateDimensions = () => {
      const h = Math.max(
        document.body.scrollHeight,
        document.documentElement.scrollHeight,
        document.body.offsetHeight,
        document.documentElement.offsetHeight
      );
      setPageHeight(h);
      setIsDesktop(window.innerWidth >= 768 && !('ontouchstart' in window));
    };

    updateDimensions();
    window.addEventListener("resize", updateDimensions);
    const timer = setTimeout(updateDimensions, 1000);

    return () => {
      window.removeEventListener("resize", updateDimensions);
      clearTimeout(timer);
    };
  }, []);

  // 1. Canvas2D Spring Cursor Trail Physics
  useEffect(() => {
    if (!isDesktop || !canvasRef.current) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener("resize", handleResize);

    // Trail Physics Nodes (Spring/Lag Trail)
    const NUM_POINTS = 16;
    const trailPoints = Array.from({ length: NUM_POINTS }, () => ({
      x: width / 2,
      y: height / 2,
      vx: 0,
      vy: 0
    }));

    let mousePos = { x: width / 2, y: height / 2 };
    let isMouseMoving = false;

    const handleMouseMove = (e: MouseEvent) => {
      mousePos.x = e.clientX;
      mousePos.y = e.clientY;
      isMouseMoving = true;
    };
    window.addEventListener("mousemove", handleMouseMove);

    let animId: number;

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      if (isMouseMoving) {
        // Lead point follows mouse directly
        trailPoints[0].x += (mousePos.x - trailPoints[0].x) * 0.35;
        trailPoints[0].y += (mousePos.y - trailPoints[0].y) * 0.35;

        // Subsequent points spring-follow predecessor
        for (let i = 1; i < NUM_POINTS; i++) {
          const prev = trailPoints[i - 1];
          const pt = trailPoints[i];

          const dx = prev.x - pt.x;
          const dy = prev.y - pt.y;

          pt.vx += dx * 0.08;
          pt.vy += dy * 0.08;
          pt.vx *= 0.72; // Damping
          pt.vy *= 0.72;

          pt.x += pt.vx;
          pt.y += pt.vy;
        }

        // Draw Smooth Ribbon Path
        ctx.beginPath();
        ctx.moveTo(trailPoints[0].x, trailPoints[0].y);

        for (let i = 1; i < NUM_POINTS - 1; i++) {
          const xc = (trailPoints[i].x + trailPoints[i + 1].x) / 2;
          const yc = (trailPoints[i].y + trailPoints[i + 1].y) / 2;
          ctx.quadraticCurveTo(trailPoints[i].x, trailPoints[i].y, xc, yc);
        }

        // Styling: Glowing Terracotta Ribbon
        ctx.strokeStyle = "rgba(184, 58, 26, 0.4)";
        ctx.lineWidth = 3;
        ctx.lineCap = "round";
        ctx.lineJoin = "round";
        ctx.shadowColor = "#B83A1A";
        ctx.shadowBlur = 12;
        ctx.stroke();
      }

      animId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, [isDesktop]);

  // Ambient Glass Cards data driven by Spotlight Progress (positioned outside ProofStrip to avoid redundancy)
  const backgroundCards = [
    {
      topProgress: 0.15, // Capabilities section
      icon: TrendingUp,
      stat: "Direct-Response Meta Ads",
      label: "GCC Campaign Strategy",
      className: "top-[15%] right-[6%] sm:right-[12%]"
    },
    {
      topProgress: 0.58, // Featured Work section
      icon: Award,
      stat: "4.45x Average ROAS",
      label: "Tracked Return",
      className: "top-[58%] right-[6%] sm:right-[12%]"
    },
    {
      topProgress: 0.82, // Acceleration Process / CTA
      icon: CheckCircle2,
      stat: "208x Peak Spike",
      label: "Flood-Pump Campaign",
      className: "top-[82%] left-[6%] sm:left-[12%]"
    }
  ];

  return (
    <div
      ref={containerRef}
      className="absolute inset-0 w-full pointer-events-none z-[1] overflow-hidden"
      style={{ height: `${pageHeight}px` }}
    >
      {/* 1. Scroll-Driven Soft Ambient Spotlight Glow */}
      <motion.div
        className="absolute left-1/2 -translate-x-1/2 w-[700px] sm:w-[900px] h-[700px] sm:h-[900px] rounded-full pointer-events-none filter blur-[140px] opacity-25 mix-blend-screen"
        style={{
          top: spotlightY,
          background: "radial-gradient(circle, rgba(184,58,26,0.8) 0%, rgba(255,82,38,0.4) 40%, transparent 70%)"
        }}
      />

      {/* 2. Fixed Canvas Layer for Desktop Cursor Spring Trail */}
      {isDesktop && (
        <canvas
          ref={canvasRef}
          className="fixed inset-0 w-full h-full pointer-events-none z-[2] filter blur-[0.5px]"
        />
      )}

      {/* 3. Ambient Glass Cards Positioned across Page (Spotlight Illuminated) */}
      {backgroundCards.map((card, idx) => {
        // Fade in / Scale up when Scroll Spotlight reaches Card position
        const cardOpacity = useTransform(
          scrollYProgress,
          [card.topProgress - 0.12, card.topProgress, card.topProgress + 0.12],
          [0.1, 0.85, 0.1]
        );
        const cardScale = useTransform(
          scrollYProgress,
          [card.topProgress - 0.12, card.topProgress, card.topProgress + 0.12],
          [0.92, 1.04, 0.92]
        );

        const IconComponent = card.icon;

        return (
          <motion.div
            key={idx}
            style={{ opacity: cardOpacity, scale: cardScale }}
            className={`absolute z-0 hidden md:flex items-center gap-3.5 p-4 rounded-2xl bg-white/[0.03] border border-white/10 backdrop-blur-md shadow-2xl text-white pointer-events-none ${card.className}`}
          >
            <div className="w-9 h-9 rounded-xl bg-[#B83A1A]/15 border border-[#B83A1A]/30 flex items-center justify-center text-[#B83A1A]">
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
