import { motion, useMotionTemplate, useMotionValue, useScroll, useTransform } from "framer-motion";
import { useRef, useEffect } from "react";
import { setSEO } from "../utils/seo";
import { ServiceCard } from "@/components/ui/ServiceCard";
import { Link } from "wouter";
import { ArrowRight, Play, Camera, TrendingUp, Quote } from "lucide-react";
import { MorphBlob } from "@/components/ui/MorphBlob";
import { AmbientParticles } from "@/components/ui/AmbientParticles";
import { RevealText } from "@/components/ui/RevealText";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { FeaturedWork } from "@/components/home/FeaturedWork";
import { ProofStrip } from "@/components/home/ProofStrip";
import { proof } from "@/data/proof";
import { LittleRoosterBranding } from "@/components/home/LittleRoosterBranding";
import { GrowthEngine } from "@/components/home/GrowthEngine";
import { MouseEvent } from "react";
import { trpc } from "@/lib/trpc";
import PerformanceProof from "@/components/PerformanceProof";
import { TubesBackground } from "@/components/ui/TubesBackground";
import useEmblaCarousel from "embla-carousel-react";
import { useCallback } from "react";

export default function Home() {
  useEffect(() => {
    setSEO({
      title: "Gokul KP | Best Digital Marketer, Video Editor & Videographer in Dubai, UAE",
      description: "Gokul KP is an affordable freelance videographer, video editor, and B2C digital marketer in Dubai & UAE. Scale your brand with high-converting Meta ads."
    });
  }, []);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true, dragFree: true });
  const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi]);

  const ctaRef = useRef(null);
  const { scrollYProgress: ctaProgress } = useScroll({ target: ctaRef, offset: ["start end", "center center"] });
  const ctaAuraOpacity = useTransform(ctaProgress, [0, 1], [0, 1]);

  const { data: content, isLoading: contentLoading } = trpc.content.get.useQuery();

  function handleMouseMove({ currentTarget, clientX, clientY }: MouseEvent) {
    const { left, top } = currentTarget.getBoundingClientRect();
    if (left && top) {
      mouseX.set(clientX - left);
      mouseY.set(clientY - top);
    }
  }

  return (
    <div className="min-h-screen bg-background selection:bg-accent selection:text-white overflow-hidden relative">
      <motion.div 
        className="fixed inset-0 pointer-events-none bg-orange-500/10 z-0 mix-blend-screen" 
        style={{ opacity: ctaAuraOpacity }} 
      />

      {/* Hero / Router Section */}
      <section
        className="relative pt-40 pb-20 md:pt-56 md:pb-32 px-4 md:px-8 max-w-[1600px] mx-auto group"
        onMouseMove={handleMouseMove}
      >
        {/* New 3D Tubes Background - Hidden on mobile for performance */}
        <div className="hidden md:block absolute inset-0">
          <TubesBackground />
        </div>

        {/* Existing Spotlight Effect - Keep it for extra depth but lower opacity */}
        <motion.div
          className="pointer-events-none absolute -inset-px rounded-xl opacity-0 transition duration-300 group-hover:opacity-40 z-0"
          style={{
            background: useMotionTemplate`radial-gradient(600px circle at ${mouseX}px ${mouseY}px, var(--color-accent) 0%, transparent 60%)`,
            mixBlendMode: "screen" // subtle blend
          }}
        />

        {/* Clean, purposeful background */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_-20%,#f9731615,transparent_70%)]" />

        {/* Header Text */}
        <div className="text-center mb-20 md:mb-32 relative z-10 max-w-[900px] mx-auto px-4">
          <h1 className="text-4xl sm:text-6xl md:text-8xl font-display font-bold tracking-tight mb-8 text-balance uppercase leading-[0.9] flex flex-col items-center justify-center">
            <motion.span
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            >
              I create content that builds
            </motion.span>
            <motion.span
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="text-orange-500 italic block"
            >
              brands and drives results.
            </motion.span>
          </h1>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="flex flex-col items-center gap-10"
          >
            <p className="text-lg md:text-xl text-muted-foreground font-light tracking-tight leading-relaxed max-w-2xl">
              Digital marketing + video + design — built for real business growth, not just visuals.
            </p>
            
            <div className="flex flex-col items-center gap-2">
              <span className="text-[10px] uppercase tracking-[0.4em] text-orange-500/80 font-bold">Identity</span>
              <div className="text-sm font-medium tracking-widest text-foreground uppercase flex flex-wrap justify-center gap-x-4 gap-y-2">
                <span>Digital Marketer</span>
                <span className="text-muted-foreground/30">•</span>
                <span>Videographer</span>
                <span className="text-muted-foreground/30">•</span>
                <span>Editor</span>
                <span className="text-muted-foreground/30">•</span>
                <span>Photographer</span>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <MagneticButton>
                <Link href="/portfolio">
                  <a className="btn-primary rounded-full px-10 py-5 text-base md:text-lg">View Work</a>
                </Link>
              </MagneticButton>
              <MagneticButton>
                <Link href="/contact">
                  <a className="btn-outline rounded-full px-10 py-5 text-base md:text-lg">Start a Project</a>
                </Link>
              </MagneticButton>
            </div>
          </motion.div>
        </div>
      </section>

      {/* 🔮 3. What I Do Section */}
      <section className="section bg-muted/10 border-y border-border/10">
        <div className="container">
          <div className="mb-16 md:mb-24">
            <span className="text-xs font-bold uppercase tracking-[0.4em] text-orange-500 mb-6 block">Capabilities</span>
            <h2 className="text-4xl md:text-5xl font-display font-bold">Strategic <span className="text-orange-500 italic">Expertise</span></h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
            {/* Marketing */}
            <div className="space-y-6 group">
              <div className="w-16 h-16 rounded-2xl bg-orange-500/10 flex items-center justify-center text-orange-500 group-hover:bg-orange-500 group-hover:text-white transition-all duration-500">
                <TrendingUp className="w-8 h-8" />
              </div>
              <h3 className="text-2xl font-display font-bold uppercase tracking-tight">1. Marketing</h3>
              <p className="text-muted-foreground leading-relaxed font-light">
                Meta Ads, Campaign Strategy, Performance Content. I build funnels that turn passive scrollers into customers.
              </p>
            </div>
            {/* Video & Content */}
            <div className="space-y-6 group">
              <div className="w-16 h-16 rounded-2xl bg-blue-500/10 flex items-center justify-center text-blue-500 group-hover:bg-blue-500 group-hover:text-white transition-all duration-500">
                <Play className="w-8 h-8" />
              </div>
              <h3 className="text-2xl font-display font-bold uppercase tracking-tight">2. Video & Content</h3>
              <p className="text-muted-foreground leading-relaxed font-light">
                Shoot + Edit, Reels, Ads, Brand Videos. Cinematic production tailored for digital-first conversion.
              </p>
            </div>
            {/* Design */}
            <div className="space-y-6 group">
              <div className="w-16 h-16 rounded-2xl bg-emerald-500/10 flex items-center justify-center text-emerald-500 group-hover:bg-emerald-500 group-hover:text-white transition-all duration-500">
                <Camera className="w-8 h-8" />
              </div>
              <h3 className="text-2xl font-display font-bold uppercase tracking-tight">3. Design</h3>
              <p className="text-muted-foreground leading-relaxed font-light">
                Social Media Creatives, Branding, Visual Systems. Designing the visual language of high-growth entities.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 🎯 4. Results & Performance Section */}
      <PerformanceProof />

      {/* 🧱 6. Featured Work Section */}
      <section className="section overflow-hidden">
        <div className="container">
          <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
            <div className="max-w-2xl">
              <RevealText text="Featured Work" as="h2" className="text-4xl md:text-6xl font-display font-bold mb-4 md:mb-6 tracking-tight" />
              <p className="text-muted-foreground text-lg md:text-xl font-light">
                A curated selection of high-end visuals across all creative disciplines.
              </p>
            </div>
            <Link href="/portfolio">
              <a className="btn-outline rounded-full px-8 py-4 text-base hidden md:inline-flex">Explore Full Portfolio</a>
            </Link>
          </div>
          <FeaturedWork />
          <div className="mt-12 text-center md:hidden">
            <Link href="/portfolio">
              <a className="btn-outline rounded-full w-full py-4 text-base">Explore Full Portfolio</a>
            </Link>
          </div>
        </div>
      </section>

      {/* Brand Identity Showcase */}
      <LittleRoosterBranding />

      {/* Growth Engine Section */}
      <GrowthEngine />

      <section className="section container border-t border-border/10">
        <div className="flex items-center justify-between mb-16">
          <h2 className="text-4xl md:text-5xl font-display font-bold tracking-tight">Client <span className="text-orange-500 italic">Feedback</span></h2>
          <div className="flex gap-2">
            <button onClick={scrollPrev} className="w-10 h-10 rounded-full border border-border/50 flex items-center justify-center hover:bg-muted/60 transition-colors">
              <ArrowRight className="w-4 h-4 rotate-180" />
            </button>
            <button onClick={scrollNext} className="w-10 h-10 rounded-full border border-border/50 flex items-center justify-center hover:bg-muted/60 transition-colors">
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
        <div className="overflow-hidden cursor-grab active:cursor-grabbing" ref={emblaRef}>
          <div className="flex gap-8">
            {proof.testimonials.map((t) => (
              <div key={t.id} className="flex-[0_0_100%] md:flex-[0_0_40%] lg:flex-[0_0_33.333%] min-w-0">
                <div className="p-8 rounded-3xl bg-muted/20 border border-border/50 relative glass-card hover:border-orange-500/20 transition-colors h-full flex flex-col justify-between">
                  <Quote className="w-10 h-10 text-orange-500/10 absolute top-8 right-8" />
                  <p className="text-lg text-foreground/90 font-normal italic mb-8 relative z-10 leading-relaxed">"{t.text}"</p>
                  <div>
                    <p className="font-bold text-foreground">{t.author}</p>
                    <p className="text-sm text-orange-500">{t.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 💰 8. Final CTA section */}
      <section ref={ctaRef} className="section container border-t border-border/10">
        <div className="bg-foreground text-background rounded-[3rem] p-12 md:p-24 text-center relative overflow-hidden">
          <div className="relative z-10 max-w-4xl mx-auto">
            <h2 className="text-4xl sm:text-6xl md:text-8xl font-display font-bold mb-8 tracking-tighter uppercase italic leading-none">
              Let's build something <br /> that actually grows <br /> your brand.
            </h2>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 md:gap-6 mt-12">
              <MagneticButton>
                <a 
                  href="https://wa.me/971545264632" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="btn bg-orange-500 text-white hover:bg-orange-600 px-10 py-5 rounded-full text-xl font-bold w-full sm:w-auto shadow-xl transition-all transform hover:-translate-y-1"
                >
                  WhatsApp
                </a>
              </MagneticButton>
              <MagneticButton>
                <a 
                  href="mailto:contact@gokulkp.com"
                  className="btn border border-background/20 hover:bg-background/10 text-background px-10 py-5 rounded-full text-xl w-full sm:w-auto transition-all"
                >
                  Email
                </a>
              </MagneticButton>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
