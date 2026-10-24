import { SEO } from "@/components/SEO";
import { motion, useInView } from "framer-motion";
import { ArrowRight, Check, Zap, Target, Sparkles, BarChart, Camera, Play, Layers } from "lucide-react";
import { Link } from "wouter";
import { trpc } from "@/lib/trpc";
import { RevealText } from "@/components/ui/RevealText";
import { useRef, useState } from "react";
import { cn } from "@/lib/utils";
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@/components/ui/accordion";

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
  // Feature gate: false until owner confirms FAQ answers (see ASSET-MANIFEST.md & Task 15)
  const SHOW_SERVICES_FAQ = false;

  const services = [
    {
      title: "Strategic Video Production",
      badge: "Video Production",
      thumbnail: "/assets/images/brands/Beyond-Cars/beyondcarsin.webp",
      description: "Cinema-grade brand films and high-impact social assets that command attention and drive conversions.",
      icon: <Play className="w-8 h-8 text-orange-500" />,
      features: [
        "Brand Identity Films",
        "High-Velocity Reels & TikToks",
        "Event Highlights & Recaps",
        "Product Commercials",
        "Advanced Post-Production & Color Grading"
      ],
      price: "Scoped per shoot & deliverable — details on request"
    },
    {
      title: "Brand Photography",
      badge: "Visual Assets",
      thumbnail: "/assets/images/optimized/pancakes.webp",
      description: "Sharp, emotive visuals that define your brand's digital presence across product and lifestyle.",
      icon: <Camera className="w-8 h-8 text-orange-500" />,
      features: [
        "Studio & Hero Product Shots",
        "Lifestyle & Editorial Shoots",
        "Architecture & Interior Visuals",
        "Professional Portfolios & Headshots",
        "High-End Visual Retouching"
      ],
      price: "Scoped per session & asset package — details on request"
    },
    {
      title: "Performance Marketing",
      badge: "Paid Acquisition",
      thumbnail: "/assets/images/brands/Aqua-Care/new.jpg",
      description: "Data-driven ad strategies across Meta and TikTok that scale your revenue with precision.",
      icon: <Target className="w-8 h-8 text-orange-500" />,
      features: [
        "Full-Funnel Ad Strategy",
        "Meta & TikTok Campaign Management",
        "Creative Direction for Paid Media",
        "A/B Testing & Rapid Iteration",
        "Bi-Weekly Performance Audits"
      ],
      price: "Scoped per monthly ad spend & management scope — details on request"
    },
    {
      title: "Influencer Campaign Management",
      badge: "Creator Network",
      thumbnail: "https://res.cloudinary.com/dgmieaf9g/video/upload/so_auto,f_jpg,w_800,q_auto/v1/PrepMeal_Influencer_Collab_gina_fitnfab__vj6whx.jpg",
      description: "End-to-end coordination of targeted creator campaigns that build strong social proof and expand reach.",
      icon: <Layers className="w-8 h-8 text-orange-500" />,
      features: [
        "Influencer Selection & Vetting",
        "Contract Handling & Rights",
        "Creative & Visual Styling Direction",
        "Deliverable Review & QC",
        "ROI & Reach Performance Reports"
      ],
      price: "Scoped per creator roster & campaign run — details on request"
    },
    {
      title: "Growth Retainers",
      badge: "Integrated Growth",
      thumbnail: "/assets/images/optimized/aqua-care-dashboard.webp",
      description: "Integrated monthly creative production and paid media management for growing brands.",
      icon: <Zap className="w-8 h-8 text-orange-500" />,
      features: [
        "Bi-Weekly Content Production",
        "Always-On Ad Management",
        "SEO & Local Search Dominance",
        "Monthly Strategy Roadmaps",
        "Priority Support & Strategy Calls"
      ],
      price: "Scoped per monthly commitment — details on request"
    }
  ];

  return (
    <div className="min-h-screen bg-background pt-24 md:pt-32 pb-20">
      <SEO 
        title="Performance Marketing, Video & Creative Services | Gokul KP" 
        description="Explore Gokul KP’s performance marketing, paid-social creative, video production, photography, and growth-retainer services for UAE and GCC brands." 
        url="/services" 
      />
      <div className="container px-4 md:px-8 max-w-[1400px] mx-auto">

        {/* Header — HOW I WORK */}
        <div className="text-center mb-24 max-w-4xl mx-auto flex flex-col items-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-orange-500/20 bg-orange-500/5 text-orange-500 text-xs font-semibold uppercase tracking-widest mb-8 font-mono">
            <span className="w-2 h-2 rounded-full bg-orange-500 animate-pulse" />
            Available for selective freelance projects and contract collaborations
          </div>
          <RevealText
            text="HOW I WORK"
            as="h1"
            className="text-5xl sm:text-7xl md:text-9xl font-display font-bold mb-6 md:mb-8 uppercase tracking-tighter"
          />
          <p className="text-lg md:text-2xl text-muted-foreground font-light leading-relaxed max-w-3xl">
            Five ways I work with brands — from a single shoot to an always-on acquisition engine. Every engagement starts with your numbers, not a template.
          </p>
        </div>

        {/* Services Grid */}
        <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-48"
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
              className="group glass-card p-6 sm:p-8 md:p-10 border border-border/50 rounded-[2.5rem] md:rounded-[3rem] hover:border-orange-500/20 transition-all flex flex-col justify-between"
            >
              <div>
                <div className="mb-6 flex items-start justify-between">
                  <div className="p-4 rounded-2xl bg-muted/40 group-hover:bg-orange-500 group-hover:text-white transition-colors">
                    {service.icon}
                  </div>
                  <div className="text-[10px] font-bold uppercase tracking-[0.25em] text-orange-500 bg-orange-500/10 px-3.5 py-1.5 rounded-full border border-orange-500/20 font-mono">
                    {service.badge}
                  </div>
                </div>

                {/* 4:3 Thumbnail Slot */}
                <div className="mb-6 aspect-[4/3] rounded-2xl overflow-hidden border border-border/40 bg-zinc-950 relative">
                  <img 
                    src={service.thumbnail} 
                    alt={`${service.title} thumbnail`} 
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />
                </div>

                <h2 className="text-2xl sm:text-3xl font-display font-bold mb-4 uppercase text-white tracking-tight">
                  {service.title}
                </h2>
                <p className="text-muted-foreground text-sm font-light mb-8 leading-relaxed">
                  {service.description}
                </p>

                <ul className="space-y-3 mb-10">
                  {service.features.map((feature, fidx) => (
                    <li key={fidx} className="flex items-center gap-3 text-xs sm:text-sm text-foreground/80 font-light border-b border-border/40 pb-3">
                      <Check className="w-3.5 h-3.5 text-orange-500 shrink-0" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="pt-6 border-t border-border/50">
                <div className="text-xs sm:text-sm font-mono text-zinc-400 mb-6 leading-relaxed">
                  {service.price}
                </div>
                <Link href="/contact">
                  <span className="btn bg-white hover:bg-zinc-200 text-black w-full py-4 rounded-full font-bold inline-flex items-center justify-center gap-2 group-hover:scale-[1.02] transition-transform cursor-pointer shadow-md">
                    Commence Inquiry
                    <ArrowRight className="w-4 h-4" />
                  </span>
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
                My process is engineered for predictable scaling. Rapid turnaround — scoped per project.
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
                  <h3 className="text-3xl font-display font-bold text-white mb-6 uppercase tracking-tighter">Performance Verified</h3>
                  <p className="text-muted-foreground font-light mb-10">We test and verify every creative asset for direct performance before scaling budget.</p>
                  <div className="text-2xl sm:text-3xl font-display font-bold text-orange-500 uppercase leading-tight">Every deliverable is tied to a report</div>
                  <div className="text-xs uppercase tracking-[0.4em] text-muted-foreground mt-4 font-mono">Documented outcomes.</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ Accordion Section — Task 15 (Feature-Gated) */}
        {SHOW_SERVICES_FAQ && (
          <section className="mb-32 max-w-3xl mx-auto">
            <div className="text-center mb-12">
              <span className="text-xs font-mono uppercase tracking-[0.25em] text-orange-500 mb-2 block">FAQ</span>
              <h2 className="text-3xl sm:text-4xl font-display font-bold text-foreground uppercase">Frequently Asked Questions</h2>
            </div>
            <Accordion type="single" collapsible className="w-full space-y-4">
              <AccordionItem value="item-1" className="border border-border/40 rounded-2xl px-6 bg-muted/10">
                <AccordionTrigger className="text-base font-semibold hover:no-underline py-5">
                  What's the typical budget range?
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground pb-5 leading-relaxed text-sm">
                  {/* CONFIRM WITH USER: will be updated upon user confirmation */}
                  Engagements are scoped per project and campaign size. Details provided upon inquiry.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-2" className="border border-border/40 rounded-2xl px-6 bg-muted/10">
                <AccordionTrigger className="text-base font-semibold hover:no-underline py-5">
                  How long do engagements run?
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground pb-5 leading-relaxed text-sm">
                  {/* CONFIRM WITH USER: will be updated upon user confirmation */}
                  From dedicated short sprints to monthly ongoing retainers.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-3" className="border border-border/40 rounded-2xl px-6 bg-muted/10">
                <AccordionTrigger className="text-base font-semibold hover:no-underline py-5">
                  Do you work with agencies or only direct brands?
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground pb-5 leading-relaxed text-sm">
                  {/* CONFIRM WITH USER: will be updated upon user confirmation */}
                  Both direct brand partnerships and selective agency white-label/production collaborations.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-4" className="border border-border/40 rounded-2xl px-6 bg-muted/10">
                <AccordionTrigger className="text-base font-semibold hover:no-underline py-5">
                  Which markets do you cover?
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground pb-5 leading-relaxed text-sm">
                  Based in Dubai • Working across the GCC &amp; India.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-5" className="border border-border/40 rounded-2xl px-6 bg-muted/10">
                <AccordionTrigger className="text-base font-semibold hover:no-underline py-5">
                  Do you handle both the creative and the media buying?
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground pb-5 leading-relaxed text-sm">
                  Yes — that's the point. One person accountable for the creative and the performance it drives.
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </section>
        )}

        {/* Global Footer CTA */}
        <section className="text-center">
          <h2 className="text-4xl md:text-6xl font-display font-bold mb-6 md:mb-8 uppercase tracking-tighter italic">Ready to engage?</h2>
          <p className="text-xl text-muted-foreground font-light mb-12 max-w-xl mx-auto">Direct collaboration with one accountable specialist across creative and media buying.</p>
          <Link href="/contact">
            <span className="btn-primary px-16 py-6 rounded-full font-bold text-xl hover:scale-105 transition-transform shadow-2xl inline-block cursor-pointer">
              Get Custom Quote
            </span>
          </Link>
        </section>

      </div>
    </div>
  );
}
