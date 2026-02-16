import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";
import { cn } from "@/lib/utils";

export function CustomCursor() {
    const [isVisible, setIsVisible] = useState(false);
    const [isHovering, setIsHovering] = useState(false);
    const [hoverText, setHoverText] = useState<string | null>(null);

    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    // Smooth springs for the cursor follower
    const springConfig = { damping: 25, stiffness: 300 };
    const cursorX = useSpring(mouseX, springConfig);
    const cursorY = useSpring(mouseY, springConfig);

    useEffect(() => {
        // Only enable on desktop
        const isTouchDevice = "ontouchstart" in window || navigator.maxTouchPoints > 0;
        if (isTouchDevice) return;

        const moveMouse = (e: MouseEvent) => {
            mouseX.set(e.clientX);
            mouseY.set(e.clientY);
            if (!isVisible) setIsVisible(true);
        };

        const handleMouseOver = (e: MouseEvent) => {
            const target = e.target as HTMLElement;

            // Check for interactive elements
            const isLink = target.closest("a, button, .cursor-pointer");
            const isInput = target.closest("input, textarea");

            if (isLink) {
                setIsHovering(true);
                // Check for data-cursor-text attribute
                const text = target.getAttribute("data-cursor-text") || target.closest("[data-cursor-text]")?.getAttribute("data-cursor-text");
                if (text) setHoverText(text);
            } else if (isInput) {
                setIsHovering(false); // Maybe different state for text
            } else {
                setIsHovering(false);
                setHoverText(null);
            }
        };

        window.addEventListener("mousemove", moveMouse);
        window.addEventListener("mouseover", handleMouseOver);

        return () => {
            window.removeEventListener("mousemove", moveMouse);
            window.removeEventListener("mouseover", handleMouseOver);
        };
    }, [mouseX, mouseY, isVisible]);

    if (!isVisible) return null;

    return (
        <>
            <motion.div
                className={cn(
                    "fixed top-0 left-0 w-4 h-4 rounded-full bg-primary pointer-events-none z-[9999] mix-blend-difference",
                    isHovering ? "scale-[0.5]" : "scale-100"
                )}
                style={{
                    x: cursorX,
                    y: cursorY,
                    translateX: "-50%",
                    translateY: "-50%",
                }}
            />
            <motion.div
                className={cn(
                    "fixed top-0 left-0 rounded-full border border-primary/50 pointer-events-none z-[9998] transition-all duration-300 ease-out",
                    isHovering ? "w-16 h-16 bg-primary/10 border-transparent" : "w-8 h-8",
                    hoverText ? "w-24 h-24 bg-primary text-primary-foreground flex items-center justify-center" : ""
                )}
                style={{
                    x: cursorX,
                    y: cursorY,
                    translateX: "-50%",
                    translateY: "-50%",
                }}
            >
                {hoverText && (
                    <span className="text-[10px] font-bold uppercase tracking-widest text-primary-foreground">
                        {hoverText}
                    </span>
                )}
            </motion.div>
        </>
    );
}
