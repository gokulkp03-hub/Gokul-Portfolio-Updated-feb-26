import { useState, useRef } from "react";
import { MoveHorizontal } from "lucide-react";
import { cn } from "@/lib/utils";

interface BeforeAfterProps {
    beforeImage: string;
    afterImage: string;
    className?: string;
    labelBefore?: string;
    labelAfter?: string;
}

export function BeforeAfter({
    beforeImage,
    afterImage,
    className,
    labelBefore = "Original",
    labelAfter = "Retouched"
}: BeforeAfterProps) {
    const [sliderPosition, setSliderPosition] = useState(50);
    const containerRef = useRef<HTMLDivElement>(null);

    const handleMove = (event: React.MouseEvent<HTMLDivElement> | React.TouchEvent<HTMLDivElement>) => {
        if (!containerRef.current) return;
        const { left, width } = containerRef.current.getBoundingClientRect();
        const clientX = 'touches' in event ? event.touches[0].clientX : (event as React.MouseEvent).clientX;
        const position = ((clientX - left) / width) * 100;
        setSliderPosition(Math.min(100, Math.max(0, position)));
    };

    return (
        <div
            ref={containerRef}
            className={cn("relative w-full aspect-[4/5] md:aspect-video rounded-3xl overflow-hidden select-none cursor-ew-resize group touch-none", className)}
            onMouseMove={handleMove}
            onTouchMove={handleMove}
        >
            {/* Base Image (After/Retouched) */}
            <img
                src={afterImage}
                alt="After"
                className="absolute inset-0 w-full h-full object-cover pointer-events-none select-none"
                draggable={false}
            />

            <div className="absolute top-4 right-4 bg-black/50 backdrop-blur-md px-3 py-1 rounded-full text-white text-[10px] font-bold uppercase tracking-widest pointer-events-none z-20">
                {labelAfter}
            </div>

            {/* Overlay Image (Before/Original) - Clipped */}
            <div
                className="absolute inset-0 z-10 pointer-events-none select-none"
                style={{ clipPath: `inset(0 ${100 - sliderPosition}% 0 0)` }}
            >
                <img
                    src={beforeImage}
                    alt="Before"
                    className="absolute inset-0 w-full h-full object-cover"
                    draggable={false}
                />
                <div className="absolute top-4 left-4 bg-black/50 backdrop-blur-md px-3 py-1 rounded-full text-white text-[10px] font-bold uppercase tracking-widest pointer-events-none">
                    {labelBefore}
                </div>
            </div>

            {/* Slider Handle */}
            <div
                className="absolute inset-y-0 z-30 pointer-events-none w-1 bg-white/50 backdrop-blur-sm"
                style={{ left: `${sliderPosition}%` }}
            >
                <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-10 h-10 bg-white rounded-full shadow-[0_0_20px_rgba(0,0,0,0.3)] flex items-center justify-center text-black/80 transition-transform bg-opacity-90 backdrop-blur-sm">
                    <MoveHorizontal className="w-5 h-5" />
                </div>
            </div>

        </div>
    );
}
