import { motion, useInView } from "framer-motion";
import { ArrowRight, Check, Zap, Target, Sparkles, BarChart, Camera, Play, Layers } from "lucide-react";
import { Link } from "wouter";
import { trpc } from "@/lib/trpc";
import { RevealText } from "@/components/ui/RevealText";
import { useRef } from "react";
import { cn } from "@/lib/utils";

function GrowthStep({ item, isLast }: { item: any, isLast: boolean }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { margin: "-20% 0px -40% 0px" });

  return (
    <div ref={ref} className="flex gap-8 group relative pb-8">
      {!isLast && (
        <div className="absolute left-[18px] top-10 bottom-0 w-px bg-border/20 z-0">
          <motion.div 
             initial={{ height: 0 }}
             animate={{ height: isInView ? "100%" : 0 }}
             transition={{ duration: 0.6, ease: "easeInOut" }}
             className="w-full bg-orange-500 shadow-[0_0_10px_rgba(249,115,22,0.8)]"
          />
        </div>
      )}
      <div className={cn(
        "text-4xl font-display font-bold transition-all duration-500 relative z-10 bg-background/50 backdrop-blur-sm", 
        isInView ? "text-orange-500 drop-shadow-[0_0_15px_rgba(249,115,22,0.6)]" : "text-orange-500/20"
      )}>
        {item.step}
      </div>
      <div className="pt-2">
        <h4 className={cn(
          "text-xl font-bold mb-1 uppercase transition-colors duration-500", 
          isInView ? "text-white" : "text-white/40"
        )}>{item.title}</h4>
        <p className="text-sm text-muted-foreground font-light">{item.desc}</p>
      </div>
    </div>
  );
}

export default function Services() {
  const services = [
    {
      title: "Strategic Video Production",
      description: "Cinema-grade brand films and high-impact social assets that command attention and drive conversions.",
      icon: <Play className="w-8 h-8 text-orange-500" />,
      features: [
        "Brand Identity Films",
        "High-Velocity Reels & TikToks",
        "Event Highlights & Recaps",
        "Product Commercials",
        "Advanced Post-Production & Color Grading"
      ],
      price: "From $1,500"
    },
    {
      title: "Premium Brand Photography",
      description: "Sharp, emotive visuals that define your brand's digital presence across product and lifestyle.",
      icon: <Camera className="w-8 h-8 text-orange-500" />,
      features: [
        "Studio & Hero Product Shots",
        "Lifestyle & Editorial Shoots",
        "Architecture & Interior Visuals",
        "Professional Portfolios & Headshots",
        "High-End Visual Retouching"
      ],
      price: "From $800"
    },
    {
      title: "Performance Marketing",
      description: "Data-driven ad strategies across Meta and TikTok that scale your revenue with precision.",
      icon: <Target className="w-8 h-8 text-orange-500" />,
      features: [
        "Full-Funnel Ad Strategy",
        "Meta & TikTok Campaign Management",
        "Creative Direction for Paid Media",
        "A/B Testing & Rapid Iteration",
        "Bi-Weekly Performance Audits"
      ],
      price: "Custom % or Retainer"
    },
    {
      title: "Growth Retainers",
      description: "A comprehensive hybrid of creative and marketing. The ultimate 'done-for-you' growth engine.",
      icon: <Zap className="w-8 h-8 text-orange-500" />,
      features: [
        "Bi-Weekly Content Production",
        "Always-On Ad Management",
        "SEO & Local Search Dominance",
        "Monthly Strategy Roadmaps",
        "Priority Support & Strategy Calls"
      ],
      price: "Monthly Retainer"
    }
  ];

  const { data: content } = trpc.content.get.useQuery();
  const sections = (content?.sections as any) || {};
  const introText = sections.servicesText || "Strategic marketing and creative production designed to scale your brand.";

  return (
    <div className="min-h-screen bg-background pt-24 md:pt-32 pb-20">
      <div className="container px-4 md:px-8 max-w-[1400px] mx-auto">

        {/* Header */}
        <div className="text-center mb-24 max-w-4xl mx-auto">
          <RevealText
            text="Digital Arsenal"
            as="h1"
            className="text-5xl sm:text-7xl md:text-9xl font-display font-bold mb-6 md:mb-8 uppercase italic tracking-tighter"
          />
          <p className="text-lg md:text-2xl text-muted-foreground font-light leading-relaxed whitespace-pre-wrap">
            {introText}
          </p>
        </div>

        {/* Services Grid */}
        <motion.div
            className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-48"
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-60px" }}
            variants={{
              hidden: { opacity: 0 },
              show: {
                opacity: 1,
                transition: { staggerChildren: 0.15 }
              }
            }}
        >
          {services.map((service, i) => (
            <motion.div
              key={i}
              variants={{
                hidden: { opacity: 0, y: 40 },
                show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } }
              }}
              className="group glass-card p-8 md:p-16 border border-border/50 rounded-[2.5rem] md:rounded-[3rem] hover:border-orange-500/20 transition-all flex flex-col"
            >
              <div className="mb-12 flex items-start justify-between">
                <div className="p-5 rounded-3xl bg-muted/40 group-hover:bg-orange-500 group-hover:text-white transition-colors">
                  {service.icon}
                </div>
                <div className="text-xs font-bold uppercase tracking-[0.3em] text-orange-500 bg-orange-500/10 px-4 py-2 rounded-full">
                  Premium
                </div>
              </div>

              <h2 className="text-3xl font-display font-bold mb-6 uppercase text-white tracking-tighter">
                {service.title}
              </h2>
              <p className="text-muted-foreground text-lg font-light mb-12 leading-relaxed">
                {service.description}
              </p>

              <ul className="space-y-4 mb-16 flex-grow">
                {service.features.map((feature, fidx) => (
                  <li key={fidx} className="flex items-center gap-4 text-sm text-foreground/80 font-light border-b border-border/50 pb-4">
                    <Check className="w-4 h-4 text-orange-500" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>

              <div className="pt-8 border-t border-border/50">
                <div className="text-3xl font-display font-bold text-white mb-8">
                  {service.price}
                </div>
                <Link href="/contact">
                  <a className="btn bg-white text-black w-full py-5 rounded-full font-bold inline-flex items-center justify-center gap-2 group-hover:scale-105 transition-transform">
                    Commence Inquiry
                    <ArrowRight className="w-4 h-4" />
                  </a>
                </Link>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* The Arc Section */}
        <section className="mb-48 relative overflow-hidden rounded-[4rem] bg-orange-500/5 border border-orange-500/10 p-12 md:p-24">
          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
            <div>
              <h2 className="text-4xl sm:text-5xl md:text-7xl font-display font-bold mb-8 md:mb-10 tracking-tighter uppercase italic">
                The Growth <br /> <span className="text-orange-500 italic">Arc</span>
              </h2>
              <p className="text-lg md:text-xl text-muted-foreground font-light leading-relaxed mb-10 md:mb-12">
                My process is engineered for predictable scaling.
                We move from audit to execution in under 14 days.
              </p>
              <div className="space-y-2 relative">
                {[
                  { step: "01", title: "Visual Audit", desc: "Analyzing your current brand aesthetics vs market leaders." },
                  { step: "02", title: "Strategy Phase", desc: "Mapping the content funnel and ad infrastructure." },
                  { step: "03", title: "Production", desc: "Capturing high-end assets and building the campaign." },
                  { step: "04", title: "Launch & Scale", desc: "Going live and iterating based on real-time data." }
                ].map((item, i, arr) => (
                  <GrowthStep key={i} item={item} isLast={i === arr.length - 1} />
                ))}
              </div>
            </div>
            <div className="relative aspect-square">
              <div className="absolute inset-0 bg-orange-500/10 blur-[150px] rounded-full" />
              <div className="relative z-10 w-full h-full glass-card border border-border/50 rounded-[3rem] flex items-center justify-center p-12 text-center">
                <div>
                  <BarChart className="w-24 h-24 text-orange-500 mx-auto mb-10 animate-pulse" />
                  <h3 className="text-3xl font-display font-bold text-white mb-6 uppercase tracking-tighter">100% Data Backed</h3>
                  <p className="text-muted-foreground font-light mb-10">We don't guess. We verify. Every creative asset is tested for performance before full deployment.</p>
                  <div className="text-6xl font-display font-bold text-orange-500">+127%</div>
                  <div className="text-xs uppercase tracking-[0.4em] text-muted-foreground mt-2">Avg. Revenue Lift</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Global Footer CTA */}
        <section className="text-center">
          <h2 className="text-4xl md:text-6xl font-display font-bold mb-6 md:mb-8 uppercase tracking-tighter italic">Ready to engage?</h2>
          <p className="text-xl text-muted-foreground font-light mb-12 max-w-xl mx-auto">Skip the generic agencies. Get a specialist growth engine working for you.</p>
          <Link href="/contact">
            <a className="btn-primary px-16 py-6 rounded-full font-bold text-xl hover:scale-105 transition-transform shadow-2xl">
              Get Custom Quote
            </a>
          </Link>
        </section>

      </div>
    </div>
  );
}
