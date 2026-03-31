import { useInView, animate, useReducedMotion } from "framer-motion";
import { useEffect, useRef } from "react";

export function AnimatedCounter({
  from = 0,
  to,
  prefix = "",
  suffix = "",
  duration = 2,
  className,
}: {
  from?: number;
  to: number;
  prefix?: string;
  suffix?: string;
  duration?: number;
  className?: string;
}) {
  const nodeRef = useRef<HTMLSpanElement>(null);
  const inView = useInView(nodeRef, { once: true, margin: "-60px" });
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    if (!nodeRef.current) return;
    if (prefersReducedMotion) {
      nodeRef.current.textContent = `${prefix}${to.toLocaleString()}${suffix}`;
      return;
    }
    
    if (!inView) return;
    
    const controls = animate(from, to, {
      duration,
      ease: "easeOut",
      onUpdate(value) {
        if (nodeRef.current) {
          nodeRef.current.textContent = `${prefix}${Math.floor(value).toLocaleString()}${suffix}`;
        }
      },
    });
    return () => controls.stop();
  }, [inView, from, to, prefix, suffix, duration, prefersReducedMotion]);

  return (
    <span ref={nodeRef} className={className}>
      {prefix}{prefersReducedMotion ? to.toLocaleString() : "0"}{suffix}
    </span>
  );
}
