import { useInView, animate, useReducedMotion } from "framer-motion";
import { useEffect, useRef } from "react";

export function AnimatedCounter({
  from = 0,
  to,
  prefix = "",
  suffix = "",
  duration = 2,
  decimals = 0,
  className,
}: {
  from?: number;
  to: number;
  prefix?: string;
  suffix?: string;
  duration?: number;
  decimals?: number;
  className?: string;
}) {
  const nodeRef = useRef<HTMLSpanElement>(null);
  const inView = useInView(nodeRef, { once: true, margin: "-60px" });
  const prefersReducedMotion = useReducedMotion();
  const formattedFinal = decimals > 0 ? to.toFixed(decimals) : Math.floor(to).toLocaleString();

  useEffect(() => {
    if (!nodeRef.current) return;
    if (prefersReducedMotion) {
      nodeRef.current.textContent = `${prefix}${formattedFinal}${suffix}`;
      return;
    }
    
    if (!inView) return;
    
    const controls = animate(from, to, {
      duration,
      ease: "easeOut",
      onUpdate(value) {
        if (nodeRef.current) {
          const displayValue = decimals > 0 
            ? value.toFixed(decimals)
            : Math.floor(value).toLocaleString();
          nodeRef.current.textContent = `${prefix}${displayValue}${suffix}`;
        }
      },
    });
    return () => controls.stop();
  }, [inView, from, to, prefix, suffix, duration, prefersReducedMotion, decimals, formattedFinal]);

  return (
    <span ref={nodeRef} className={className}>
      {prefix}{formattedFinal}{suffix}
    </span>
  );
}
