import React, { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

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

// 1. Canvas2D Spring Cursor Trail Physics with Magnetic Snap to Cards
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
    let snapTimeout: any = null;

    const handleMouseMove = (e: MouseEvent) => {
      mousePos.x = e.clientX;
      mousePos.y = e.clientY;
      targetPos.x = e.clientX;
      targetPos.y = e.clientY;
      isMouseMoving = true;

      // Magnetic snap test: check if pointer passes near any background card
      const cards = document.querySelectorAll(".ambient-glass-card");
      cards.forEach((card) => {
        const rect = card.getBoundingClientRect();
        const cardCenterX = rect.left + rect.width / 2;
        const cardCenterY = rect.top + rect.height / 2;
        const dist = Math.hypot(e.clientX - cardCenterX, e.clientY - cardCenterY);

        if (dist < 140) {
          // Magnetically pull spring target towards card center for 220ms
          targetPos.x = cardCenterX;
          targetPos.y = cardCenterY;

          card.classList.add("ring-1", "ring-[#B83A1A]/40", "scale-[1.03]");
          if (snapTimeout) clearTimeout(snapTimeout);
          snapTimeout = setTimeout(() => {
            card.classList.remove("ring-1", "ring-[#B83A1A]/40", "scale-[1.03]");
          }, 250);
        }
      });
    };

    window.addEventListener("mousemove", handleMouseMove);

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
        ctx.strokeStyle = "rgba(184, 58, 26, 0.45)";
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
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("mousemove", handleMouseMove);
      if (snapTimeout) clearTimeout(snapTimeout);
    };
  }, [isDesktop]);

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
    </div>
  );
};
