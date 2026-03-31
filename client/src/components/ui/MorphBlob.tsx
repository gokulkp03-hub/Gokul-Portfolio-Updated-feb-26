import { motion, useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";

interface MorphBlobProps {
  color?: string;        // Tailwind colour class e.g. "orange-500"
  size?: number;         // px size, default 600
  opacity?: number;      // 0-1, default 0.08
  blur?: number;         // px blur, default 120
  className?: string;
  animDuration?: number; // seconds, default 12
}

export function MorphBlob({
  color = "orange-500",
  size = 600,
  opacity = 0.08,
  blur = 120,
  className,
  animDuration = 12,
}: MorphBlobProps) {
  const prefersReducedMotion = useReducedMotion();
  
  // Map Tailwind colour names to hex values for SVG
  const colorMap: Record<string, string> = {
    "orange-500": "#f97316",
    "emerald-500": "#10b981",
    "blue-500": "#3b82f6",
    "amber-400": "#fbbf24",
    "purple-500": "#a855f7",
    "pink-500": "#ec4899",
  };
  const hex = colorMap[color] || "#f97316";

  return (
    <motion.div
      className={cn("absolute pointer-events-none select-none", className)}
      style={{ width: size, height: size, opacity, filter: `blur(${blur}px)` }}
      animate={prefersReducedMotion ? undefined : {
        scale: [1, 1.15, 0.95, 1.08, 1],
        rotate: [0, 15, -10, 5, 0],
      }}
      transition={{
        duration: animDuration,
        repeat: Infinity,
        ease: "easeInOut",
      }}
    >
      <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
        <motion.path
          fill={hex}
          animate={prefersReducedMotion ? {
             d: "M48.6,-67.2C62.3,-56.1,72.5,-41.1,76.8,-24.6C81.1,-8.1,79.5,9.9,72.8,25.3C66.1,40.7,54.3,53.5,40.1,62.5C25.9,71.5,9.2,76.7,-7.1,75.5C-23.4,74.3,-39.4,66.7,-52.7,55.4C-66,44.1,-76.5,29.1,-79,12.5C-81.5,-4.1,-76,-22.4,-65.5,-36.3C-55,-50.2,-39.4,-59.7,-23.8,-67.1C-8.2,-74.5,7.4,-79.8,22,-77.4C36.6,-75,51.3,-65,48.6,-67.2Z"
          } : {
            d: [
              "M48.6,-67.2C62.3,-56.1,72.5,-41.1,76.8,-24.6C81.1,-8.1,79.5,9.9,72.8,25.3C66.1,40.7,54.3,53.5,40.1,62.5C25.9,71.5,9.2,76.7,-7.1,75.5C-23.4,74.3,-39.4,66.7,-52.7,55.4C-66,44.1,-76.5,29.1,-79,12.5C-81.5,-4.1,-76,-22.4,-65.5,-36.3C-55,-50.2,-39.4,-59.7,-23.8,-67.1C-8.2,-74.5,7.4,-79.8,22,-77.4C36.6,-75,51.3,-65,48.6,-67.2Z",
              "M42.7,-58.9C55.4,-49.6,65.8,-37.3,71.2,-22.5C76.6,-7.7,77,9.6,71.3,24.6C65.6,39.6,53.8,52.3,39.6,61.8C25.4,71.3,8.8,77.6,-6.7,75.9C-22.2,74.2,-36.6,64.5,-49.4,52.4C-62.2,40.3,-73.5,25.8,-77.2,9.3C-80.9,-7.2,-77,-25.6,-67,-40.1C-57,-54.6,-40.9,-65.2,-24.9,-72.1C-8.9,-79,7.1,-82.2,21.4,-77.8C35.7,-73.4,48.3,-61.5,42.7,-58.9Z",
              "M52.4,-71.2C67.3,-61.5,78.1,-46.3,82.3,-29.3C86.5,-12.3,84.1,6.5,77.3,23.1C70.5,39.7,59.3,54.1,44.8,64.6C30.3,75.1,12.5,81.7,-4.5,80.3C-21.5,78.9,-37.7,69.5,-51.4,57.3C-65.1,45.1,-76.3,30.1,-80.2,13.2C-84.1,-3.7,-80.7,-22.5,-72.2,-38.3C-63.7,-54.1,-50.1,-66.9,-34.9,-75.7C-19.7,-84.5,-2.8,-89.3,12.1,-85.4C27,-81.5,41.8,-68.9,52.4,-71.2Z",
              "M48.6,-67.2C62.3,-56.1,72.5,-41.1,76.8,-24.6C81.1,-8.1,79.5,9.9,72.8,25.3C66.1,40.7,54.3,53.5,40.1,62.5C25.9,71.5,9.2,76.7,-7.1,75.5C-23.4,74.3,-39.4,66.7,-52.7,55.4C-66,44.1,-76.5,29.1,-79,12.5C-81.5,-4.1,-76,-22.4,-65.5,-36.3C-55,-50.2,-39.4,-59.7,-23.8,-67.1C-8.2,-74.5,7.4,-79.8,22,-77.4C36.6,-75,51.3,-65,48.6,-67.2Z",
            ],
          }}
          transition={{
            duration: animDuration,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      </svg>
    </motion.div>
  );
}
