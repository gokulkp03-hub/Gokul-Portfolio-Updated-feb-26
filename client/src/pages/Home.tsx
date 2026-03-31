import { motion, useMotionTemplate, useMotionValue, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
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

import { TubesBackground } from "@/components/ui/TubesBackground";
import useEmblaCarousel from "embla-carousel-react";

export default function Home() {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const [emblaRef] = useEmblaCarousel({ loop: true, dragFree: true });

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
        className="relative pt-32 pb-20 md:pt-48 md:pb-32 px-4 md:px-8 max-w-[1400px] mx-auto group"
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

        <MorphBlob color="orange-500" size={700} opacity={0.06} blur={140} className="-top-40 -right-40" />
        <MorphBlob color="blue-500" size={500} opacity={0.05} blur={120} className="bottom-0 -left-20" animDuration={16} />
        <AmbientParticles count={15} color="#f97316" />

        {/* Header Text */}
        <div className="text-center mb-20 md:mb-32 relative z-10">
          <motion.div
            initial={{ opacity: 0, filter: "blur(8px)" }}
            animate={{ opacity: 1, filter: "blur(0px)" }}
            transition={{ duration: 1, delay: 0.5 }}
            className="text-sm uppercase tracking-[0.3em] text-orange-500 font-bold mb-16 flex items-center justify-center gap-3"
          >
            <motion.span
              animate={{ opacity: [1, 0.4, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="w-2 h-2 rounded-full bg-emerald-400 inline-block"
            />
            Managed AED 185K+ quarterly spend & 20K+ conversions
          </motion.div>

          <h1 className="text-6xl sm:text-7xl md:text-9xl font-display font-bold tracking-tighter mb-12 text-balance uppercase max-w-4xl mx-auto leading-[0.9] flex flex-wrap justify-center overflow-hidden">
            <span className="inline-block whitespace-nowrap">
              {Array.from("Creative").map((char, i) => (
                <motion.span
                  key={`hw1-${i}`}
                  initial={{ y: 50, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.6, delay: i * 0.04, ease: [0.16, 1, 0.3, 1] }}
                  className="inline-block"
                >
                  {char}
                </motion.span>
              ))}
            </span>
            <span className="inline-block whitespace-nowrap px-2 md:px-4">
              <motion.span
                  initial={{ y: 50, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.6, delay: "Creative".length * 0.04, ease: [0.16, 1, 0.3, 1] }}
                  className="inline-block"
              >
                &
              </motion.span>
            </span>
            <br className="md:hidden basis-full h-0" />
            <span className="inline-block whitespace-nowrap">
              {Array.from("Performance").map((char, i) => (
                <motion.span
                  key={`hw2-${i}`}
                  initial={{ y: 50, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.6, delay: ("Creative ".length + i) * 0.04, ease: [0.16, 1, 0.3, 1] }}
                  className="inline-block"
                >
                  {char}
                </motion.span>
              ))}
            </span>
          </h1>

          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
            className="text-base md:text-lg text-muted-foreground/80 max-w-xl mx-auto font-light tracking-wide mb-0"
          >
            High-impact visuals for brands that scale.
          </motion.p>
        </div>

        {/* Service Router Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 mb-4 md:mb-6 relative z-10">
          <ServiceCard
            variant="video"
            title="Video"
            description="Cinematic brand films and high-impact reels."
            href="/video"
            color="bg-blue-500"
            videoSrc="https://res.cloudinary.com/dgmieaf9g/video/upload/v1/lamourmedia_1761496555_3752003203673245690_4144321886_zcwmht.mp4"
            imageSrc="/assets/images/brands/Beyond-Cars/beyondcarsin.webp"
            index={0}
          />
          <ServiceCard
            variant="photo"
            title="Photo"
            description="Premium product and lifestyle photography."
            href="/photo"
            color="bg-orange-500"
            imageSrc="/assets/images/brands/Food-Photography/Cheesecake.jpg"
            index={1}
          />
        </div>
        <div className="relative z-10 mb-32">
          <ServiceCard
            variant="marketing"
            title="Marketing"
            description="Performance ads and growth strategy."
            href="/marketing"
            color="bg-emerald-500"
            imageSrc="/assets/images/case-studies/prepmeal/PrepMeal Website.jpg"
            index={2}
          />
        </div>
      </section>

      {/* Proof Strip */}
      <ProofStrip />



      {/* Brand Identity Showcase */}
      <LittleRoosterBranding />

      {/* Growth Engine Section */}
      <GrowthEngine />

      {/* Testimonials */}
      <section className="py-24 container px-4 md:px-8 max-w-[1400px] mx-auto border-t border-border/10">
        <h2 className="text-4xl md:text-5xl font-display font-bold mb-16 text-center tracking-tight">Client <span className="text-orange-500 italic">Feedback</span></h2>
        <div className="overflow-hidden cursor-grab active:cursor-grabbing" ref={emblaRef}>
          <div className="flex gap-8">
            {proof.testimonials.map((t) => (
              <div key={t.id} className="flex-[0_0_100%] md:flex-[0_0_40%] lg:flex-[0_0_33.333%] min-w-0">
                <motion.div 
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                  className="p-8 rounded-3xl bg-muted/20 border border-border/50 relative glass-card hover:border-orange-500/20 transition-colors h-full flex flex-col justify-between"
                >
                  <Quote className="w-10 h-10 text-orange-500/10 absolute top-8 right-8" />
                  <p className="text-lg text-foreground/80 font-light italic mb-8 relative z-10 leading-relaxed">"{t.text}"</p>
                  <div>
                    <p className="font-bold text-foreground">{t.author}</p>
                    <p className="text-sm text-orange-500">{t.role}</p>
                  </div>
                </motion.div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Modern CTA */}
      <section ref={ctaRef} className="py-32 container px-4 md:px-8 max-w-[1400px] mx-auto border-t border-border/10">
        <div className="bg-foreground text-background rounded-[3rem] p-12 md:p-24 text-center relative overflow-hidden">
          {/* Abstract Background Shapes */}
          <div className="absolute top-0 left-0 w-[600px] h-[600px] bg-orange-500/10 blur-[150px] rounded-full pointer-events-none" />
          <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-blue-500/10 blur-[120px] rounded-full pointer-events-none" />

          <div className="relative z-10 max-w-4xl mx-auto">
            <h2 className="text-5xl sm:text-7xl md:text-9xl font-display font-bold mb-8 tracking-tighter uppercase italic">
              Ready to <br /> scale?
            </h2>
            <p className="text-lg md:text-3xl text-background/80 mb-12 md:mb-16 font-light leading-relaxed">
              Let's build a brand that commands attention and drives results.
              Schedule a call or start a project today.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 md:gap-6">
              <MagneticButton>
                <Link href="/contact">
                  <a className="btn bg-background text-foreground hover:bg-white/90 px-10 py-5 rounded-full text-xl font-semibold w-full sm:w-auto shadow-xl hover:shadow-2xl transition-all transform hover:-translate-y-1 block md:inline-block">
                    Connect Now
                  </a>
                </Link>
              </MagneticButton>
              <MagneticButton>
                <Link href="/services">
                  <a className="btn border border-background/20 hover:bg-background/10 text-background px-10 py-5 rounded-full text-xl w-full sm:w-auto transition-all block md:inline-block">
                    Our Services
                  </a>
                </Link>
              </MagneticButton>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}
