import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { Link } from "wouter";
import { ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { useRef } from "react";

interface ServiceCardProps {
    title: string;
    description: string;
    href: string;
    color: string;
    videoSrc?: string;
    imageSrc?: string;
    className?: string;
    index?: number;
}

export function ServiceCard({
    title,
    description,
    href,
    color,
    videoSrc,
    imageSrc,
    className,
    index = 0,
}: ServiceCardProps) {
    const ref = useRef<HTMLDivElement>(null);

    const x = useMotionValue(0);
    const y = useMotionValue(0);

    const mouseX = useSpring(x, { stiffness: 500, damping: 100 });
    const mouseY = useSpring(y, { stiffness: 500, damping: 100 });

    function onMouseMove({ currentTarget, clientX, clientY }: React.MouseEvent) {
        const { left, top, width, height } = currentTarget.getBoundingClientRect();
        x.set(clientX - left - width / 2);
        y.set(clientY - top - height / 2);
    }

    function onMouseLeave() {
        x.set(0);
        y.set(0);
    }

    const rotateX = useTransform(mouseY, [-200, 200], [5, -5]);
    const rotateY = useTransform(mouseX, [-200, 200], [-5, 5]);

    return (
        <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            style={{ perspective: 1000 }}
            className={cn("w-full h-full", className)}
        >
            <Link href={href}>
                <motion.div
                    ref={ref}
                    onMouseMove={onMouseMove}
                    onMouseLeave={onMouseLeave}
                    style={{
                        rotateX,
                        rotateY,
                        transformStyle: "preserve-3d",
                    }}
                    className="group relative flex flex-col justify-end h-[450px] md:h-[550px] p-8 rounded-[2rem] overflow-hidden bg-card border border-border/50 hover:border-transparent transition-colors cursor-pointer"
                >
                    {/* Background Layer */}
                    <div className="absolute inset-0 z-0 select-none pointer-events-none">
                        {videoSrc ? (
                            <div className="absolute inset-0">
                                <div className="absolute inset-0 bg-black/40 z-10" />
                                <video
                                    autoPlay
                                    loop
                                    muted
                                    playsInline
                                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 opacity-60 group-hover:opacity-80"
                                >
                                    <source src={videoSrc} type="video/mp4" />
                                </video>
                            </div>
                        ) : imageSrc ? (
                            <div className="absolute inset-0">
                                <div className="absolute inset-0 bg-black/40 z-10" />
                                <img
                                    src={imageSrc}
                                    alt={title}
                                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 opacity-60 group-hover:opacity-80"
                                />
                            </div>
                        ) : (
                            <div className={cn("absolute inset-0 bg-gradient-to-br opacity-10 group-hover:opacity-20 transition-opacity", color)} />
                        )}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent z-10" />
                    </div>

                    {/* Glow Effect */}
                    <div
                        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-0 pointer-events-none mix-blend-overlay"
                        style={{
                            background: `radial-gradient(600px circle at var(--mouse-x) var(--mouse-y), ${color}, transparent 40%)`
                        }}
                    />

                    {/* Content Layer */}
                    <div className="relative z-20 transform transition-transform duration-300 group-hover:translate-z-10 group-hover:-translate-y-2">
                        <div className="flex items-center justify-between mb-4">
                            <span className="text-[10px] font-bold uppercase tracking-[0.2em] px-3 py-1.5 rounded-full border border-white/20 backdrop-blur-md text-white/90">
                                Service
                            </span>
                            <div className="p-3 rounded-full backdrop-blur-md border border-white/20 text-white transition-all duration-300 group-hover:scale-110 group-hover:bg-white/20">
                                <ArrowUpRight className="w-5 h-5" />
                            </div>
                        </div>

                        <h3 className="text-4xl md:text-5xl font-display font-medium text-white mb-3 leading-tight tracking-tight">
                            {title}
                        </h3>
                        <p className="text-white/70 text-base md:text-lg line-clamp-2 leading-relaxed group-hover:text-white/90 transition-colors">
                            {description}
                        </p>
                    </div>
                </motion.div>
            </Link>
        </motion.div>
    );
}
