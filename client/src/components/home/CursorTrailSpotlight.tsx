import React, { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

export const CursorTrailSpotlight: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [pageHeight, setPageHeight] = useState<number>(4000);
  const [isDesktop, setIsDesktop] = useState<boolean>(() => {
    if (typeof window === "undefined") return false;
    return window.innerWidth >= 768 && !("ontouchstart" in window);
  });

  const { scrollYProgress } = useScroll();

  // Active Spotlight Y-position in pixels across page scroll height
  const spotlightY = useTransform(scrollYProgress, [0, 1], [300, pageHeight - 400]);

  // Dynamic Page Height Measurement (Desktop only)
  useEffect(() => {
    if (!isDesktop) return;

    const updateDimensions = () => {
      const h = Math.max(
        document.body.scrollHeight,
        document.documentElement.scrollHeight,
        document.body.offsetHeight,
        document.documentElement.offsetHeight
      );
      setPageHeight(h);
      setIsDesktop(window.innerWidth >= 768 && !("ontouchstart" in window));
    };

    updateDimensions();
    window.addEventListener("resize", updateDimensions);
    const timer = setTimeout(updateDimensions, 1000);

    return () => {
      window.removeEventListener("resize", updateDimensions);
      clearTimeout(timer);
    };
  }, [isDesktop]);

  // Canvas2D Spring Cursor Trail Physics
  useEffect(() => {
    if (!isDesktop || !canvasRef.current) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let width = window.innerWidth;
    let height = window.innerHeight;
    let dpr = Math.min(window.devicePixelRatio || 1, 2);

    const resizeCanvas = () => {
      if (!canvas || !ctx) return;
      width = window.innerWidth;
      height = window.innerHeight;
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(1, 0, 0, 1, 0, 0);
      ctx.scale(dpr, dpr);
    };

    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    // Trail Physics Nodes (Spring/Lag Trail)
    const NUM_POINTS = 18;
    const trailPoints = Array.from({ length: NUM_POINTS }, () => ({
      x: width / 2,
      y: height / 2,
      vx: 0,
      vy: 0
    }));

    let mousePos = { x: width / 2, y: height / 2 };
    let targetPos = { x: width / 2, y: height / 2 };
    let isMouseMoving = false;
    let hasMoved = false;
    let snapTimeout: any = null;

    const handleMouseMove = (e: MouseEvent) => {
      if (!hasMoved) {
        hasMoved = true;
        for (let i = 0; i < NUM_POINTS; i++) {
          trailPoints[i].x = e.clientX;
          trailPoints[i].y = e.clientY;
          trailPoints[i].vx = 0;
          trailPoints[i].vy = 0;
        }
      }

      mousePos.x = e.clientX;
      mousePos.y = e.clientY;
      targetPos.x = e.clientX;
      targetPos.y = e.clientY;
      isMouseMoving = true;

      // Magnetic snap test: check if pointer passes near any interactive card
      const cards = document.querySelectorAll(".ambient-glass-card, .magnetic-card");
      cards.forEach((card) => {
        const rect = card.getBoundingClientRect();
        const cardCenterX = rect.left + rect.width / 2;
        const cardCenterY = rect.top + rect.height / 2;
        const dist = Math.hypot(e.clientX - cardCenterX, e.clientY - cardCenterY);

        if (dist < 140) {
          // Magnetically pull spring target towards card center
          targetPos.x = cardCenterX;
          targetPos.y = cardCenterY;

          card.classList.add("ring-1", "ring-[#B83A1A]/40", "scale-[1.02]");
          if (snapTimeout) clearTimeout(snapTimeout);
          snapTimeout = setTimeout(() => {
            card.classList.remove("ring-1", "ring-[#B83A1A]/40", "scale-[1.02]");
          }, 250);
        }
      });
    };

    const handleMouseLeave = () => {
      isMouseMoving = false;
    };

    const handleMouseEnter = (e: MouseEvent) => {
      mousePos.x = e.clientX;
      mousePos.y = e.clientY;
      targetPos.x = e.clientX;
      targetPos.y = e.clientY;
      isMouseMoving = true;
    };

    window.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseleave", handleMouseLeave);
    document.addEventListener("mouseenter", handleMouseEnter);

    let animId: number;

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      if (isMouseMoving) {
        // Lead point follows target with spring inertia
        trailPoints[0].x += (targetPos.x - trailPoints[0].x) * 0.38;
        trailPoints[0].y += (targetPos.y - trailPoints[0].y) * 0.38;

        // Subsequent points spring-follow predecessor
        for (let i = 1; i < NUM_POINTS; i++) {
          const prev = trailPoints[i - 1];
          const pt = trailPoints[i];

          const dx = prev.x - pt.x;
          const dy = prev.y - pt.y;

          pt.vx += dx * 0.09;
          pt.vy += dy * 0.09;
          pt.vx *= 0.70; // Friction Damping
          pt.vy *= 0.70;

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

        // Styling: Terracotta Glowing Spring Ribbon
        ctx.strokeStyle = "rgba(249, 115, 22, 0.55)";
        ctx.lineWidth = 2.5;
        ctx.lineCap = "round";
        ctx.lineJoin = "round";
        ctx.shadowColor = "#B83A1A";
        ctx.shadowBlur = 14;
        ctx.stroke();
      }

      animId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", resizeCanvas);
      window.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseleave", handleMouseLeave);
      document.removeEventListener("mouseenter", handleMouseEnter);
      if (snapTimeout) clearTimeout(snapTimeout);
    };
  }, [isDesktop]);

  if (!isDesktop) return null;

  return (
    <>
      {/* 1. Scroll-Driven Soft Ambient Spotlight Glow */}
      <div
        ref={containerRef}
        className="absolute inset-0 w-full pointer-events-none z-0 overflow-hidden"
        style={{ height: `${pageHeight}px` }}
      >
        <motion.div
          className="absolute left-1/2 -translate-x-1/2 w-[700px] sm:w-[900px] h-[700px] sm:h-[900px] rounded-full pointer-events-none filter blur-[140px] opacity-25 mix-blend-screen"
          style={{
            top: spotlightY,
            background: "radial-gradient(circle, rgba(184,58,26,0.8) 0%, rgba(255,82,38,0.4) 40%, transparent 70%)"
          }}
        />
      </div>

      {/* 2. Fixed Canvas Layer for Desktop Cursor Spring Trail */}
      <canvas
        ref={canvasRef}
        className="fixed inset-0 w-full h-full pointer-events-none z-20 filter blur-[0.5px]"
      />
    </>
  );
};
