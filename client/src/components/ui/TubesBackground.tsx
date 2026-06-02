import React, { useEffect, useRef } from "react";

export function TubesBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    // Track mouse coordinates
    let mouseX = width / 2;
    let mouseY = height / 2;
    let targetMouseX = width / 2;
    let targetMouseY = height / 2;

    const handleMouseMove = (e: MouseEvent) => {
      targetMouseX = e.clientX;
      targetMouseY = e.clientY;
    };

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("resize", handleResize);

    // Orbs/Lines parameters for a premium ambient flow
    const orbs = [
      { x: width * 0.2, y: height * 0.3, radius: 240, vx: 0.2, vy: 0.15, color: "rgba(249, 115, 22, 0.04)" },
      { x: width * 0.8, y: height * 0.7, radius: 300, vx: -0.15, vy: 0.1, color: "rgba(234, 88, 12, 0.03)" },
      { x: width * 0.5, y: height * 0.5, radius: 260, vx: 0.1, vy: -0.12, color: "rgba(124, 45, 18, 0.05)" },
    ];

    const draw = () => {
      ctx.clearRect(0, 0, width, height);

      // Smooth mouse tracking interpolation
      mouseX += (targetMouseX - mouseX) * 0.03;
      mouseY += (targetMouseY - mouseY) * 0.03;

      // Draw custom premium ambient glows
      orbs.forEach((orb) => {
        // Move orbs slowly
        orb.x += orb.vx;
        orb.y += orb.vy;

        // Bounce on edges
        if (orb.x < -orb.radius || orb.x > width + orb.radius) orb.vx *= -1;
        if (orb.y < -orb.radius || orb.y > height + orb.radius) orb.vy *= -1;

        // Apply dynamic mouse distortion
        const dx = mouseX - orb.x;
        const dy = mouseY - orb.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        
        let renderX = orb.x;
        let renderY = orb.y;
        
        if (dist > 0) {
          const force = Math.max(0, 400 - dist) / 400;
          renderX = orb.x + (dx / dist) * force * 50;
          renderY = orb.y + (dy / dist) * force * 50;
        }

        const gradient = ctx.createRadialGradient(
          renderX,
          renderY,
          0,
          renderX,
          renderY,
          orb.radius
        );
        gradient.addColorStop(0, orb.color);
        gradient.addColorStop(1, "rgba(10, 10, 10, 0)");

        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(renderX, renderY, orb.radius, 0, Math.PI * 2);
        ctx.fill();
      });

      // Draw elegant background grid lines
      const gridSize = 100;
      const gridOpacity = 0.015; // Very subtle
      ctx.strokeStyle = `rgba(249, 115, 22, ${gridOpacity})`;
      ctx.lineWidth = 0.5;

      // Draw vertical lines
      for (let x = 0; x < width; x += gridSize) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, height);
        ctx.stroke();
      }

      // Draw horizontal lines
      for (let y = 0; y < height; y += gridSize) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(width, y);
        ctx.stroke();
      }

      // Draw glowing intersection nodes reacting to mouse proximity
      for (let x = 0; x < width; x += gridSize) {
        for (let y = 0; y < height; y += gridSize) {
          const dx = mouseX - x;
          const dy = mouseY - y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 250) {
            const nodeOpacity = (1 - dist / 250) * 0.15;
            ctx.fillStyle = `rgba(249, 115, 22, ${nodeOpacity})`;
            ctx.beginPath();
            ctx.arc(x, y, 2, 0, Math.PI * 2);
            ctx.fill();

            // Tiny outer glow rings for active nodes
            if (dist < 100) {
              ctx.strokeStyle = `rgba(249, 115, 22, ${nodeOpacity * 0.4})`;
              ctx.beginPath();
              ctx.arc(x, y, 6, 0, Math.PI * 2);
              ctx.stroke();
            }
          }
        }
      }

      // Draw elegant cinematic accent vector lines
      ctx.strokeStyle = "rgba(249, 115, 22, 0.02)";
      ctx.lineWidth = 1;
      
      ctx.beginPath();
      // Line 1: Soft curve across the screen reacting to mouse
      ctx.moveTo(0, height * 0.4 + (mouseY - height / 2) * 0.05);
      ctx.bezierCurveTo(
        width * 0.3,
        height * 0.2 + (mouseY - height / 2) * 0.1,
        width * 0.7,
        height * 0.6 + (mouseX - width / 2) * 0.1,
        width,
        height * 0.3 + (mouseY - height / 2) * 0.05
      );
      ctx.stroke();

      ctx.beginPath();
      ctx.strokeStyle = "rgba(234, 88, 12, 0.015)";
      ctx.moveTo(0, height * 0.7);
      ctx.bezierCurveTo(
        width * 0.4,
        height * 0.8 + (mouseX - width / 2) * 0.05,
        width * 0.6,
        height * 0.5 + (mouseY - height / 2) * 0.05,
        width,
        height * 0.6
      );
      ctx.stroke();

      animationFrameId = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none z-0 bg-transparent"
    />
  );
}
