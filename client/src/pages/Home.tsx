import { motion, useMotionTemplate, useMotionValue, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { useRef, useEffect, useState } from "react";
import { setSEO } from "../utils/seo";
import { ServiceCard } from "@/components/ui/ServiceCard";
import { Link } from "wouter";
import { ArrowRight, Play, Camera, TrendingUp, Quote } from "lucide-react";
import { MorphBlob } from "@/components/ui/MorphBlob";
import { AmbientParticles } from "@/components/ui/AmbientParticles";
import { RevealText } from "@/components/ui/RevealText";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { FeaturedWork } from "@/components/home/FeaturedWork";
import { TestimonialsStrip } from "@/components/home/TestimonialsStrip";
import { ProofStrip } from "@/components/home/ProofStrip";
import { proof } from "@/data/proof";
import { MouseEvent } from "react";
import { trpc } from "@/lib/trpc";
import { TubesBackground } from "@/components/ui/TubesBackground";
import useEmblaCarousel from "embla-carousel-react";
import { useCallback } from "react";

export default function Home() {
  useEffect(() => {
    setSEO({
      title: "Gokul KP — Performance Marketer & Video Producer | Dubai, UAE",
      description: "Performance Marketer and Video Producer in Dubai, UAE. Scaled GCC brands with 7,300+ WhatsApp leads, AED 166K+ managed spend, and up to 4.45x ROAS."
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

  const [showScrollArrow, setShowScrollArrow] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollArrow(window.scrollY < 200);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const wordRevealVariants = {
    hidden: { clipPath: "inset(0 100% 0 0)", opacity: 0, x: -10 },
    show: { clipPath: "inset(0 0% 0 0)", opacity: 1, x: 0 }
  };

  return (
    <div className="min-h-screen bg-background selection:bg-accent selection:text-white overflow-hidden relative">

      <motion.div 
        className="fixed inset-0 pointer-events-none bg-orange-500/10 z-0 mix-blend-screen" 
        style={{ opacity: ctaAuraOpacity }} 
      />

      {/* Hero / Router Section */}
      <section
        className="relative pt-36 pb-20 md:pt-48 md:pb-28 px-4 md:px-8 max-w-[1600px] mx-auto group min-h-[90vh] flex flex-col justify-center"
        onMouseMove={handleMouseMove}
      >
        {/* New 3D Tubes Background - Hidden on mobile for performance */}
        <div className="hidden md:block absolute inset-0">
          <TubesBackground />
        </div>

        {/* Looping Cinematic Background Video */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
          <video
            autoPlay
            muted
            loop
            playsInline
            className="w-full h-full object-cover opacity-15 filter grayscale contrast-125"
          >
            <source src="https://res.cloudinary.com/dgmieaf9g/video/upload/v1/lamourmedia_1761496555_3752003203673245690_4144321886_zcwmht.mp4" type="video/mp4" />
          </video>
          <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-transparent to-[#0a0a0a]/50" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#0a0a0a] via-transparent to-[#0a0a0a]" />
        </div>

        {/* Spot Light Effect */}
        <motion.div
          className="pointer-events-none absolute -inset-px rounded-xl opacity-0 transition duration-300 group-hover:opacity-40 z-0"
          style={{
            background: useMotionTemplate`radial-gradient(600px circle at ${mouseX}px ${mouseY}px, var(--color-accent) 0%, transparent 60%)`,
            mixBlendMode: "screen"
          }}
        />

        {/* Clean, purposeful background */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_-20%,#f9731615,transparent_70%)]" />        {/* Header Text */}
        <div className="text-center relative z-10 max-w-[1000px] mx-auto px-4 mt-2">
          {/* Availability Status Badge */}
          <motion.div 
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full bg-zinc-900/90 border border-zinc-800 text-xs font-semibold text-zinc-300 mb-8 backdrop-blur-xl shadow-xl"
          >
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse shadow-md shadow-emerald-400/50" />
            <span className="tracking-wide">Available for Performance Marketing & Video Projects · Dubai, UAE</span>
          </motion.div>

          <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-display font-black tracking-tight mb-8 text-balance uppercase leading-[0.95] flex flex-col items-center justify-center text-center">
            {/* Line 1 */}
            <span className="block mb-2 overflow-hidden flex justify-center gap-x-3 sm:gap-x-4 flex-wrap">
              {["I", "BUILD", "THE", "CREATIVE."].map((word, idx) => (
                <motion.span
                  key={idx}
                  variants={wordRevealVariants}
                  initial="hidden"
                  animate="show"
                  transition={{ duration: 0.6, delay: idx * 0.08, ease: [0.22, 1, 0.36, 1] }}
                  className="inline-block text-foreground"
                >
                  {word}
                </motion.span>
              ))}
            </span>
            
            {/* Line 2 */}
            <span className="block mb-2 overflow-hidden flex justify-center gap-x-3 sm:gap-x-4 flex-wrap">
              {["RUN", "THE", "CAMPAIGN."].map((word, idx) => (
                <motion.span
                  key={idx}
                  variants={wordRevealVariants}
                  initial="hidden"
                  animate="show"
                  transition={{ duration: 0.6, delay: 0.32 + idx * 0.08, ease: [0.22, 1, 0.36, 1] }}
                  className="inline-block text-foreground"
                >
                  {word}
                </motion.span>
              ))}
            </span>
            
            {/* Line 3 */}
            <span className="block overflow-hidden flex justify-center gap-x-3 sm:gap-x-4 flex-wrap">
              {["PROVE", "THE", "RESULTS."].map((word, idx) => (
                <motion.span
                  key={idx}
                  variants={wordRevealVariants}
                  initial="hidden"
                  animate="show"
                  transition={{ duration: 0.6, delay: 0.56 + idx * 0.08, ease: [0.22, 1, 0.36, 1] }}
                  className="inline-block text-orange-500"
                >
                  {word}
                </motion.span>
              ))}
            </span>
          </h1>

          <div className="flex flex-col items-center gap-8">
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1.2 }}
              className="text-lg md:text-xl text-muted-foreground font-light tracking-tight leading-relaxed max-w-2xl text-center"
            >
              Performance-driven Meta Ads campaigns, commercial video production, and high-converting ad creatives built to scale GCC brands.
            </motion.p>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1.6 }}
              className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-2"
            >
              <MagneticButton>
                <Link href="/contact">
                  <span className="btn-primary rounded-full px-10 py-5 text-base md:text-lg block cursor-pointer bg-orange-500 border-orange-500 hover:bg-orange-600 shadow-xl shadow-orange-500/20">Let's Talk</span>
                </Link>
              </MagneticButton>
              <MagneticButton>
                <Link href="/portfolio">
                  <span className="btn-outline rounded-full px-10 py-5 text-base md:text-lg block cursor-pointer">View Work</span>
                </Link>
              </MagneticButton>
            </motion.div>
          </div>
        </div>

        {/* Scroll Arrow Indicator */}
        <AnimatePresence>
          {showScrollArrow && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
              className="absolute bottom-6 left-1/2 transform -translate-x-1/2 z-20 flex flex-col items-center gap-2 pointer-events-none"
            >
              <span className="text-[9px] uppercase tracking-[0.3em] text-muted-foreground/60">Scroll to Explore</span>
              <motion.div
                animate={{ y: [0, 6, 0] }}
                transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                className="text-xl text-orange-500"
              >
                ↓
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </section>

      {/* 🔮 Strategic Expertise Section - Bento Showcase */}
      <section className="py-24 bg-zinc-950/80 border-y border-border/20 relative">
        <div className="container">
          <div className="mb-16 text-center md:text-left flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
            <div>
              <span className="text-xs font-bold uppercase tracking-[0.4em] text-orange-500 mb-3 block">Capabilities</span>
              <h2 className="text-4xl md:text-6xl font-display font-bold uppercase tracking-tight text-white">Strategic <span className="text-orange-500 italic">Expertise</span></h2>
            </div>
            <p className="text-zinc-400 text-sm font-light max-w-md">End-to-end performance & creative execution designed specifically for GCC market penetration.</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Card 1: Performance Marketing */}
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="p-8 rounded-[2.5rem] bg-gradient-to-b from-zinc-900/90 to-zinc-950 border border-zinc-800/80 hover:border-orange-500/50 transition-all duration-500 hover:shadow-2xl hover:shadow-orange-500/10 relative flex flex-col justify-between group overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-48 h-48 bg-orange-500/10 blur-3xl rounded-full pointer-events-none group-hover:bg-orange-500/20 transition-all" />
              
              <div className="relative z-10 space-y-6">
                <div className="flex items-center justify-between">
                  <div className="w-14 h-14 rounded-2xl bg-orange-500/10 border border-orange-500/20 flex items-center justify-center text-orange-500 group-hover:bg-orange-500 group-hover:text-black transition-all duration-500">
                    <TrendingUp className="w-6 h-6" />
                  </div>
                  <span className="text-[10px] font-bold uppercase tracking-widest px-3 py-1 rounded-full bg-orange-500/10 text-orange-400 border border-orange-500/20">
                    4.45x Avg ROAS
                  </span>
                </div>

                <div>
                  <h3 className="text-2xl font-display font-bold uppercase tracking-tight text-white mb-3">Performance Marketing</h3>
                  <p className="text-zinc-400 text-sm leading-relaxed font-light">
                    Meta Ads, WhatsApp Chat Automations, B2B & B2C Lead Funnels. Data-backed media buying designed to scale revenue with verified ROAS tracking.
                  </p>
                </div>
              </div>

              <div className="relative z-10 mt-10 pt-6 border-t border-zinc-800/80 flex items-center justify-between">
                <Link href="/marketing">
                  <span className="text-xs font-bold uppercase tracking-wider text-orange-500 hover:text-orange-400 flex items-center gap-2 cursor-pointer group-hover:translate-x-1 transition-transform">
                    Explore Paid Strategy <ArrowRight className="w-4 h-4" />
                  </span>
                </Link>
              </div>
            </motion.div>

            {/* Card 2: Commercial Video Production */}
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="p-8 rounded-[2.5rem] bg-gradient-to-b from-zinc-900/90 to-zinc-950 border border-zinc-800/80 hover:border-blue-500/50 transition-all duration-500 hover:shadow-2xl hover:shadow-blue-500/10 relative flex flex-col justify-between group overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-48 h-48 bg-blue-500/10 blur-3xl rounded-full pointer-events-none group-hover:bg-blue-500/20 transition-all" />

              <div className="relative z-10 space-y-6">
                <div className="flex items-center justify-between">
                  <div className="w-14 h-14 rounded-2xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-400 group-hover:bg-blue-500 group-hover:text-white transition-all duration-500">
                    <Play className="w-6 h-6 fill-current ml-0.5" />
                  </div>
                  <span className="text-[10px] font-bold uppercase tracking-widest px-3 py-1 rounded-full bg-blue-500/10 text-blue-400 border border-blue-500/20">
                    100K+ Views Reel
                  </span>
                </div>

                <div>
                  <h3 className="text-2xl font-display font-bold uppercase tracking-tight text-white mb-3">Video Production</h3>
                  <p className="text-zinc-400 text-sm leading-relaxed font-light">
                    Directing, Editing, Commercial Brand Films & UGC Reels. High-retention short-form video assets engineered to stop the scroll and build brand equity.
                  </p>
                </div>
              </div>

              <div className="relative z-10 mt-10 pt-6 border-t border-zinc-800/80 flex items-center justify-between">
                <Link href="/portfolio/video">
                  <span className="text-xs font-bold uppercase tracking-wider text-blue-400 hover:text-blue-300 flex items-center gap-2 cursor-pointer group-hover:translate-x-1 transition-transform">
                    Watch Reel Archives <ArrowRight className="w-4 h-4" />
                  </span>
                </Link>
              </div>
            </motion.div>

            {/* Card 3: Ad Creatives & Brand Systems */}
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="p-8 rounded-[2.5rem] bg-gradient-to-b from-zinc-900/90 to-zinc-950 border border-zinc-800/80 hover:border-purple-500/50 transition-all duration-500 hover:shadow-2xl hover:shadow-purple-500/10 relative flex flex-col justify-between group overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-48 h-48 bg-purple-500/10 blur-3xl rounded-full pointer-events-none group-hover:bg-purple-500/20 transition-all" />

              <div className="relative z-10 space-y-6">
                <div className="flex items-center justify-between">
                  <div className="w-14 h-14 rounded-2xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center text-purple-400 group-hover:bg-purple-500 group-hover:text-white transition-all duration-500">
                    <Camera className="w-6 h-6" />
                  </div>
                  <span className="text-[10px] font-bold uppercase tracking-widest px-3 py-1 rounded-full bg-purple-500/10 text-purple-400 border border-purple-500/20">
                    7,300+ Leads Total
                  </span>
                </div>

                <div>
                  <h3 className="text-2xl font-display font-bold uppercase tracking-tight text-white mb-3">Ad Creatives & Visuals</h3>
                  <p className="text-zinc-400 text-sm leading-relaxed font-light">
                    High-CTR Static Creatives, Culinary Macro Photography, Brand Visual Systems. Crafting memorable brand aesthetics that communicate instant authority.
                  </p>
                </div>
              </div>

              <div className="relative z-10 mt-10 pt-6 border-t border-zinc-800/80 flex items-center justify-between">
                <Link href="/portfolio/photo">
                  <span className="text-xs font-bold uppercase tracking-wider text-purple-400 hover:text-purple-300 flex items-center gap-2 cursor-pointer group-hover:translate-x-1 transition-transform">
                    View Visual Systems <ArrowRight className="w-4 h-4" />
                  </span>
                </Link>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* 📊 Proof Strip section */}
      <ProofStrip />

      {/* 🧱 Featured Work Section */}
      <section className="section overflow-hidden">
        <div className="container">
          <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
            <div className="max-w-2xl text-center md:text-left">
              <RevealText text="Featured Work" as="h2" className="text-4xl md:text-6xl font-display font-bold mb-4 md:mb-6 tracking-tight" />
              <p className="text-muted-foreground text-lg md:text-xl font-light">
                A curated selection of high-end visuals across all creative disciplines.
              </p>
            </div>
            <Link href="/portfolio">
              <span className="btn-outline rounded-full px-8 py-4 text-base hidden md:inline-flex cursor-pointer">Explore Full Portfolio</span>
            </Link>
          </div>
          <FeaturedWork />
          <div className="mt-12 text-center md:hidden">
            <Link href="/portfolio">
              <span className="btn-outline rounded-full w-full py-4 text-base block cursor-pointer">Explore Full Portfolio</span>
            </Link>
          </div>
        </div>
      </section>

      {/* Workflow Process Pipeline */}
      <section className="py-24 bg-zinc-950 border-y border-border/20 overflow-hidden relative">
        <div className="container relative z-10">
          <div className="text-center mb-16">
            <span className="text-xs font-bold uppercase tracking-[0.4em] text-orange-500 mb-3 block">Execution Framework</span>
            <h2 className="text-3xl md:text-5xl font-display font-bold uppercase tracking-tight text-white">THE ACCELERATION PROCESS</h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 relative">
            {[
              { step: "01", title: "CRAWL", tag: "AUDIT & FUNNEL", desc: "Audit existing funnel metrics, study competitor positioning, and trace high-intent opportunities." },
              { step: "02", title: "BUILD", tag: "CREATIVE & ADS", desc: "Produce high-converting direct-response creatives and configure core Meta ad campaign structures." },
              { step: "03", title: "RUN", tag: "LAUNCH & TEST", desc: "Launch live ad sets, isolate top creatives, and optimize target audience demographics." },
              { step: "04", title: "SCALE", tag: "AUTOMATE & GROW", desc: "Integrate WhatsApp Comment-to-DM triggers and scale spend aggressively to double ROAS." }
            ].map((proc, index) => (
              <div key={index} className="p-8 rounded-[2rem] bg-zinc-900/60 border border-zinc-800/80 relative hover:border-orange-500/40 transition-all duration-300 group shadow-lg">
                <div className="flex items-center justify-between mb-6">
                  <span className="text-3xl font-display font-black text-orange-500">{proc.step}</span>
                  <span className="text-[9px] font-bold uppercase tracking-widest px-3 py-1 rounded-full bg-zinc-800/80 text-zinc-400 group-hover:text-white transition-colors">{proc.tag}</span>
                </div>
                <h3 className="text-xl font-display font-bold text-white mb-3 tracking-wide">{proc.title}</h3>
                <p className="text-zinc-400 text-xs font-light leading-relaxed">{proc.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 💰 Final CTA Section */}
      <section ref={ctaRef} className="section container border-t border-border/10">
        <div className="glass-card text-foreground rounded-[3rem] p-12 md:p-24 text-center relative overflow-hidden border border-border/50 hover:border-orange-500/20 transition-colors duration-500">
          {/* Background Accent */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-orange-500/5 blur-[120px] rounded-full pointer-events-none" />

          <div className="relative z-10 max-w-4xl mx-auto">
            <h2 className="text-4xl sm:text-6xl md:text-8xl font-display font-black mb-8 tracking-tighter uppercase italic leading-none dark:text-white text-foreground">
              Let's build something <br /> that actually grows <br /> your brand.
            </h2>
            <p className="text-muted-foreground text-base md:text-lg mb-10 font-light max-w-xl mx-auto">
              Ready to scale your leads and revenue with verified performance marketing and cinematic media? Let's connect.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 md:gap-6 mt-12">
              <MagneticButton>
                <Link href="/contact">
                  <span className="btn bg-orange-500 text-white hover:bg-orange-600 px-10 py-5 rounded-full text-xl font-bold w-full sm:w-auto shadow-xl transition-all block cursor-pointer">
                    Let's Talk
                  </span>
                </Link>
              </MagneticButton>
              <MagneticButton>
                <a 
                  href="https://wa.me/971545264632?text=Hi%20Gokul%2C%20I%20saw%20your%20portfolio%20and%20I%27d%20love%20to%20discuss%20a%20project." 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="btn border border-border/50 hover:bg-white/5 text-foreground px-10 py-5 rounded-full text-xl w-full sm:w-auto transition-all block text-center"
                >
                  WhatsApp
                </a>
              </MagneticButton>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
