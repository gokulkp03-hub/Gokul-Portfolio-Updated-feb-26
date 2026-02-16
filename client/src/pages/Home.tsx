import { motion, useMotionTemplate, useMotionValue } from "framer-motion";
import { ServiceCard } from "@/components/ui/ServiceCard";
import { Link } from "wouter";
import { ArrowRight, Play, Camera, TrendingUp } from "lucide-react";
import { ShowreelPreview } from "@/components/home/ShowreelPreview";
import { FeaturedWork } from "@/components/home/FeaturedWork";
import { ProofStrip } from "@/components/home/ProofStrip";
import { GrowthEngine } from "@/components/home/GrowthEngine";
import { MouseEvent } from "react";

export default function Home() {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  function handleMouseMove({ currentTarget, clientX, clientY }: MouseEvent) {
    const { left, top } = currentTarget.getBoundingClientRect();
    if (left && top) {
      mouseX.set(clientX - left);
      mouseY.set(clientY - top);
    }
  }

  return (
    <div className="min-h-screen bg-background selection:bg-accent selection:text-white overflow-hidden">

      {/* Hero / Router Section */}
      <section
        className="relative pt-32 pb-20 md:pt-48 md:pb-32 px-4 md:px-8 max-w-[1400px] mx-auto group"
        onMouseMove={handleMouseMove}
      >
        {/* Spotlight Effect - Subtle Radial Gradient tracking mouse */}
        <motion.div
          className="pointer-events-none absolute -inset-px rounded-xl opacity-0 transition duration-300 group-hover:opacity-40 z-0"
          style={{
            background: useMotionTemplate`radial-gradient(600px circle at ${mouseX}px ${mouseY}px, var(--color-accent) 0%, transparent 60%)`,
            mixBlendMode: "screen" // subtle blend
          }}
        />

        {/* Header Text */}
        <div className="text-center mb-20 md:mb-32 relative z-10">
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="text-6xl md:text-9xl font-display font-semibold tracking-tighter mb-8 text-balance uppercase"
          >
            Creative that <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-amber-500 italic">performs</span>.
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="text-lg md:text-2xl text-muted-foreground max-w-2xl mx-auto font-light leading-relaxed mb-12"
          >
            I build aesthetics that convert. Specialized in high-end video,
            premium photography, and data-driven marketing growth.
          </motion.p>

          <ShowreelPreview />
        </div>

        {/* Service Router Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 mb-32 relative z-10">
          <ServiceCard
            title="Video"
            description="Cinematic brand films and high-impact reels."
            href="/video"
            color="bg-blue-500"
            index={0}
          />
          <ServiceCard
            title="Photo"
            description="Premium product and lifestyle photography."
            href="/photo"
            color="bg-orange-500"
            index={1}
          />
          <ServiceCard
            title="Marketing"
            description="Performance ads and growth strategy."
            href="/marketing"
            color="bg-emerald-500"
            index={2}
          />
        </div>
      </section>

      {/* Proof Strip */}
      <ProofStrip />

      {/* Featured Highlights */}
      <section className="py-32 container px-4 md:px-8 max-w-[1400px] mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
          <div className="max-w-2xl">
            <h2 className="text-4xl md:text-6xl font-display font-bold mb-6 tracking-tight">Recent Productions</h2>
            <p className="text-muted-foreground text-xl font-light">
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
      </section>

      {/* Growth Engine Section */}
      <GrowthEngine />

      {/* Modern CTA */}
      <section className="py-32 container px-4 md:px-8 max-w-[1400px] mx-auto border-t border-white/5">
        <div className="bg-foreground text-background rounded-[3rem] p-12 md:p-24 text-center relative overflow-hidden">
          {/* Abstract Background Shapes */}
          <div className="absolute top-0 left-0 w-[600px] h-[600px] bg-orange-500/10 blur-[150px] rounded-full pointer-events-none" />
          <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-blue-500/10 blur-[120px] rounded-full pointer-events-none" />

          <div className="relative z-10 max-w-4xl mx-auto">
            <h2 className="text-6xl md:text-9xl font-display font-bold mb-8 tracking-tighter uppercase italic">
              Ready to <br /> scale?
            </h2>
            <p className="text-xl md:text-3xl text-background/80 mb-16 font-light leading-relaxed">
              Let's build a brand that commands attention and drives results.
              Schedule a call or start a project today.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
              <Link href="/contact">
                <a className="btn bg-background text-foreground hover:bg-white/90 px-10 py-5 rounded-full text-xl font-semibold w-full sm:w-auto shadow-xl hover:shadow-2xl transition-all transform hover:-translate-y-1">
                  Connect Now
                </a>
              </Link>
              <Link href="/services">
                <a className="btn border border-background/20 hover:bg-background/10 text-background px-10 py-5 rounded-full text-xl w-full sm:w-auto transition-all">
                  Our Services
                </a>
              </Link>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}
