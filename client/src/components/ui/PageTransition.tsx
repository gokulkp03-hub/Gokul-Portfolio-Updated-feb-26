import { motion, useReducedMotion } from "framer-motion";
import { useLocation } from "wouter";
import { ReactNode } from "react";

export function PageTransition({ children }: { children: ReactNode }) {
  const [location] = useLocation();
  const prefersReducedMotion = useReducedMotion();

  if (prefersReducedMotion) {
    return <div key={location}>{children}</div>;
  }

  return (
    <motion.div
      key={location}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.25, ease: "easeOut" }}
    >
      {children}
    </motion.div>
  );
}
