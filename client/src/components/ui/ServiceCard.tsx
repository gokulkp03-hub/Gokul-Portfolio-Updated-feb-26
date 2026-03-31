import { motion, useMotionValue, useSpring, useTransform, useScroll } from "framer-motion";
import { Link } from "wouter";
import { ArrowUpRight, Play, Camera, TrendingUp, ArrowRight } from "lucide-react";
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
    variant?: "video" | "photo" | "marketing";
    stats?: { label: string; value: string }[];
}

// Shared 3D tilt hook
function useTilt() {
    const x = useMotionValue(0);
    const y = useMotionValue(0);
    const mouseX = useSpring(x, { stiffness: 500, damping: 100 });
    const mouseY = useSpring(y, { stiffness: 500, damping: 100 });
    const rotateX = useTransform(mouseY, [-200, 200], [5, -5]);
    const rotateY = useTransform(mouseX, [-200, 200], [-5, 5]);

    function onMouseMove({ currentTarget, clientX, clientY }: React.MouseEvent) {
        const { left, top, width, height } = currentTarget.getBoundingClientRect();
        x.set(clientX - left - width / 2);
        y.set(clientY - top - height / 2);
    }
    function onMouseLeave() { x.set(0); y.set(0); }
    return { rotateX, rotateY, onMouseMove, onMouseLeave };
}

// ---- VIDEO CARD — Wide cinematic format with video preview ----
function VideoCard({ title, description, href, videoSrc, imageSrc, index }: ServiceCardProps) {
    const { rotateX, rotateY, onMouseMove, onMouseLeave } = useTilt();
    const ref = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
    const yParallax = useTransform(scrollYProgress, [0, 1], [20 + (index || 0) * 10, -40 - (index || 0) * 20]);

    return (
        <motion.div
            ref={ref}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ delay: (index || 0) * 0.1, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            style={{ perspective: 1000, y: yParallax }}
            className="md:col-span-2"
        >
            <Link href={href}>
                <motion.div
                    onMouseMove={onMouseMove}
                    onMouseLeave={onMouseLeave}
                    style={{ rotateX, rotateY, transformStyle: "preserve-3d", height: "420px" }}
                    className="group relative overflow-hidden rounded-[2rem] cursor-pointer border border-border/30 hover:border-blue-500/40 transition-all duration-500 bg-zinc-950"
                >
                    {/* Full background video */}
                    {videoSrc ? (
                        <video autoPlay loop muted playsInline className="absolute inset-0 w-full h-full object-cover opacity-50 group-hover:opacity-70 transition-opacity duration-700 scale-105 group-hover:scale-100">
                            <source src={videoSrc} type="video/mp4" />
                        </video>
                    ) : imageSrc && (
                        <img src={imageSrc} alt={title} className="absolute inset-0 w-full h-full object-cover opacity-50 group-hover:opacity-70 transition-opacity duration-700" />
                    )}
                    <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/50 to-transparent" />

                    {/* Content — left aligned, cinematic */}
                    <div className="absolute inset-0 flex flex-col justify-between p-8 md:p-12">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-full bg-blue-500/20 border border-blue-500/40 flex items-center justify-center">
                                <Play className="w-4 h-4 text-blue-400 fill-current ml-0.5" />
                            </div>
                            <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-blue-400">Video Production</span>
                        </div>

                        <div>
                            <h3 className="text-5xl md:text-7xl font-display font-bold text-white mb-4 leading-none tracking-tighter uppercase">
                                {title}
                            </h3>
                            <p className="text-white/60 text-base md:text-lg max-w-sm mb-8 font-light leading-relaxed">
                                {description}
                            </p>
                            <div className="inline-flex items-center gap-3 px-6 py-3 rounded-full bg-blue-500 text-white text-sm font-semibold group-hover:bg-blue-400 transition-colors">
                                Explore Videos
                                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                            </div>
                        </div>
                    </div>

                    {/* Hover glow */}
                    <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-br from-blue-500/10 to-transparent pointer-events-none" />
                </motion.div>
            </Link>
        </motion.div>
    );
}

// ---- PHOTO CARD — Tall portrait format, editorial feel ----
function PhotoCard({ title, description, href, imageSrc, index }: ServiceCardProps) {
    const { rotateX, rotateY, onMouseMove, onMouseLeave } = useTilt();
    const ref = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
    const yParallax = useTransform(scrollYProgress, [0, 1], [20 + (index || 0) * 10, -40 - (index || 0) * 20]);

    return (
        <motion.div
            ref={ref}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ delay: (index || 0) * 0.1, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            style={{ perspective: 1000, y: yParallax }}
        >
            <Link href={href}>
                <motion.div
                    onMouseMove={onMouseMove}
                    onMouseLeave={onMouseLeave}
                    style={{ rotateX, rotateY, transformStyle: "preserve-3d", height: "420px" }}
                    className="group relative overflow-hidden rounded-[2rem] cursor-pointer border border-border/30 hover:border-orange-500/40 transition-all duration-500 bg-zinc-900"
                >
                    {imageSrc && (
                        <img src={imageSrc} alt={title} className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110 opacity-70 group-hover:opacity-90" />
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent" />

                    {/* Top label */}
                    <div className="absolute top-6 left-6 flex items-center gap-2">
                        <Camera className="w-4 h-4 text-orange-400" />
                        <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-orange-400">Photography</span>
                    </div>

                    {/* Bottom content reveals on hover */}
                    <div className="absolute bottom-0 left-0 right-0 p-8 translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                        <h3 className="text-3xl md:text-4xl font-display font-bold text-white mb-3 tracking-tight">
                            {title}
                        </h3>
                        <p className="text-white/60 text-sm mb-6 opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-100 font-light">
                            {description}
                        </p>
                        <div className="flex items-center gap-2 text-orange-400 text-sm font-semibold">
                            <span>View Gallery</span>
                            <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                        </div>
                    </div>

                    {/* Hover glow overlay */}
                    <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-t from-orange-500/20 to-transparent pointer-events-none" />
                </motion.div>
            </Link>
        </motion.div>
    );
}

// ---- MARKETING CARD — Data/dashboard style with stat pills ----
function MarketingCard({ title, description, href, imageSrc, index }: ServiceCardProps) {
    const { rotateX, rotateY, onMouseMove, onMouseLeave } = useTilt();
    const ref = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
    const yParallax = useTransform(scrollYProgress, [0, 1], [20 + (index || 0) * 10, -40 - (index || 0) * 20]);

    const stats = [
        { label: "Avg ROAS", value: "4.2x" },
        { label: "Ad Spend", value: "AED 300K+" },
        { label: "Conversions", value: "20K+" },
    ];
    return (
        <motion.div
            ref={ref}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ delay: (index || 0) * 0.1, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            style={{ perspective: 1000, y: yParallax }}
        >
            <Link href={href}>
                <motion.div
                    onMouseMove={onMouseMove}
                    onMouseLeave={onMouseLeave}
                    style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
                    className="group relative overflow-hidden rounded-[2rem] cursor-pointer border border-border/30 hover:border-emerald-500/40 transition-all duration-500 bg-zinc-950 min-h-[300px] md:min-h-[320px]"
                >
                    {/* Background image very dark */}
                    {imageSrc && (
                        <img src={imageSrc} alt={title} className="absolute inset-0 w-full h-full object-cover opacity-20 group-hover:opacity-30 transition-opacity duration-700" />
                    )}
                    <div className="absolute inset-0 bg-gradient-to-br from-emerald-950/80 to-zinc-950" />

                    {/* Content inside a grid for horizontal layout */}
                    <div className="absolute inset-0 flex flex-col md:grid md:grid-cols-2 gap-4 p-7 md:p-10 items-center">
                        {/* Left: heading + description + CTA */}
                        <div className="flex flex-col h-full justify-between">
                            <div className="flex items-center justify-between md:hidden mb-4">
                                <div className="flex items-center gap-2">
                                    <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                                    <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-emerald-400">Performance Marketing</span>
                                </div>
                                <div className="p-2 rounded-full border border-emerald-500/20 text-emerald-400">
                                    <TrendingUp className="w-4 h-4" />
                                </div>
                            </div>
                            
                            <div className="hidden md:flex items-center gap-2 mb-4">
                                <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                                <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-emerald-400">Performance Marketing</span>
                            </div>

                            <div>
                                <h3 className="text-3xl md:text-5xl font-display font-bold text-white mb-3 tracking-tight">
                                    {title}
                                </h3>
                                <p className="text-white/50 text-sm md:text-base mb-6 font-light max-w-sm">{description}</p>
                                <div className="inline-flex items-center gap-2 text-emerald-400 text-sm font-semibold border border-emerald-500/30 px-5 py-2.5 rounded-full group-hover:bg-emerald-500 group-hover:text-black group-hover:border-emerald-500 transition-all duration-300">
                                    View Strategy
                                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                                </div>
                            </div>
                        </div>

                        {/* Right: stat pills — the unique element */}
                        <div className="space-y-3 flex flex-col justify-center h-full">
                            <div className="hidden md:flex justify-end w-full mb-4">
                                <div className="p-2 rounded-full border border-emerald-500/20 text-emerald-400">
                                    <TrendingUp className="w-4 h-4" />
                                </div>
                            </div>
                            
                            {stats.map((stat, i) => (
                                <motion.div
                                    key={i}
                                    initial={{ x: 20, opacity: 0 }}
                                    whileInView={{ x: 0, opacity: 1 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: 0.3 + i * 0.1 }}
                                    className="flex items-center justify-between bg-white/5 border border-white/10 rounded-xl px-4 py-3 group-hover:border-emerald-500/20 transition-colors"
                                >
                                    <span className="text-[10px] md:text-xs uppercase tracking-widest text-muted-foreground">{stat.label}</span>
                                    <span className="text-base md:text-lg font-display font-bold text-emerald-400">{stat.value}</span>
                                </motion.div>
                            ))}
                        </div>
                    </div>

                    <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-br from-emerald-500/5 to-transparent pointer-events-none" />
                </motion.div>
            </Link>
        </motion.div>
    );
}

// ---- Main exported component — routes to correct variant ----
export function ServiceCard(props: ServiceCardProps) {
    if (props.variant === "video") return <VideoCard {...props} />;
    if (props.variant === "photo") return <PhotoCard {...props} />;
    if (props.variant === "marketing") return <MarketingCard {...props} />;
    // Fallback to original behaviour
    const { rotateX, rotateY, onMouseMove, onMouseLeave } = useTilt();
    return (
        <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ delay: (props.index || 0) * 0.1, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            style={{ perspective: 1000 }}
        >
            <Link href={props.href}>
                <motion.div
                    onMouseMove={onMouseMove}
                    onMouseLeave={onMouseLeave}
                    style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
                    className="group relative flex flex-col justify-end h-[420px] p-8 rounded-[2rem] overflow-hidden bg-card border border-border/30 cursor-pointer"
                >
                    <div className="absolute inset-0">
                        {props.imageSrc && <img src={props.imageSrc} alt={props.title} className="w-full h-full object-cover opacity-60 group-hover:scale-105 transition-transform duration-700" />}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent" />
                    </div>
                    <div className="relative z-10">
                        <h3 className="text-4xl font-display font-bold text-white mb-3">{props.title}</h3>
                        <p className="text-white/70">{props.description}</p>
                    </div>
                </motion.div>
            </Link>
        </motion.div>
    );
}
