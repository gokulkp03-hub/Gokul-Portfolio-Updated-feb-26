import { SEO } from "@/components/SEO";
import { motion } from "framer-motion";
import { Link } from "wouter";
import { 
  ArrowRight, 
  ArrowUpRight, 
  Play, 
  Check, 
  MapPin, 
  MessageCircle,
  ExternalLink
} from "lucide-react";
import { useState } from "react";
import { proof } from "@/data/proof";
import ShowreelModal from "@/components/ShowreelModal";

export default function Home() {
  const [showreelOpen, setShowreelOpen] = useState(false);

  return (
    <div className="min-h-screen bg-background text-foreground selection:bg-orange-500 selection:text-white">
      <SEO 
        title="Gokul KP — Digital Marketer & Creative Producer" 
        description="Portfolio of Gokul KP — a digital marketer and creative producer working across paid media, content, video and lead generation in the UAE and Oman." 
        url="/" 
      />

      {/* 1. HERO SECTION */}
      <section className="relative pt-32 sm:pt-40 md:pt-48 pb-20 md:pb-28 border-b border-border/40 overflow-hidden">
        <div className="container px-4 md:px-8 max-w-[1240px] mx-auto">
          
          <div className="max-w-4xl space-y-8">
            {/* Eyebrow */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-orange-500/10 border border-orange-500/20 text-orange-500 text-[11px] font-semibold tracking-widest uppercase font-mono">
              <span className="w-1.5 h-1.5 rounded-full bg-orange-500 animate-pulse" />
              DIGITAL MARKETER + CREATIVE PRODUCER
            </div>

            {/* Headline */}
            <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-display font-bold tracking-tight text-foreground leading-[1.04]">
              I make the content.<br />
              I run the campaigns.<br />
              <span className="text-orange-500">I watch what happens next.</span>
            </h1>

            {/* Supporting Copy */}
            <p className="text-lg sm:text-xl md:text-2xl text-muted-foreground font-normal leading-relaxed max-w-2xl">
              I work across paid media, short-form content and creative production — helping brands turn better creative into better marketing results.
            </p>

            {/* Context / Location */}
            <div className="flex items-center gap-2 text-xs sm:text-sm font-mono text-muted-foreground">
              <MapPin className="w-4 h-4 text-orange-500 shrink-0" />
              <span>Based between India and the GCC, with hands-on experience across UAE and Oman markets.</span>
            </div>

            {/* Actions */}
            <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
              <a 
                href="#work" 
                className="inline-flex items-center justify-center gap-2 bg-orange-500 hover:bg-orange-600 text-white font-semibold px-8 py-4 rounded-full transition-all duration-200 shadow-lg shadow-orange-500/20 text-center"
              >
                View My Work
                <ArrowRight className="w-4 h-4" />
              </a>
              <Link href="/contact">
                <a className="inline-flex items-center justify-center gap-2 bg-muted/40 hover:bg-muted/70 text-foreground font-medium px-8 py-4 rounded-full border border-border/60 transition-colors text-center">
                  Let's Talk
                </a>
              </Link>
            </div>
          </div>

        </div>
      </section>

      {/* 2. SELECTED WORK */}
      <section id="work" className="py-24 md:py-32 border-b border-border/40">
        <div className="container px-4 md:px-8 max-w-[1240px] mx-auto space-y-16">
          
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-border/40 pb-6">
            <div>
              <p className="text-xs font-mono uppercase tracking-widest text-orange-500 mb-2">Projects</p>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-bold text-foreground tracking-tight">
                Selected work.
              </h2>
            </div>
            <p className="text-sm text-muted-foreground max-w-md">
              A selection of projects where I managed paid acquisition, shot and edited the creative, or built the lead generation flow.
            </p>
          </div>

          <div className="space-y-12">
            
            {/* Project 1: Aqua Care */}
            <div className="p-8 md:p-12 rounded-[2rem] border border-border/60 bg-muted/10 hover:border-orange-500/30 transition-all duration-300">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
                <div className="lg:col-span-7 space-y-6">
                  <div className="flex items-center gap-3">
                    <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-orange-500 bg-orange-500/10 px-3 py-1 rounded-full border border-orange-500/20">
                      Paid Media + Creative
                    </span>
                    <span className="text-xs font-mono text-muted-foreground">UAE & Oman</span>
                  </div>

                  <h3 className="text-2xl sm:text-4xl font-display font-bold text-foreground">
                    Aqua Care UAE
                  </h3>

                  <p className="text-base sm:text-lg text-muted-foreground leading-relaxed">
                    Meta campaigns, short-form ad creative, lead generation and WhatsApp automation across UAE and Oman. Tested 80+ creative variations across shower filters, dispensers, and water softeners.
                  </p>

                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 pt-2">
                    <div className="p-4 rounded-2xl bg-background border border-border/60">
                      <p className="text-2xl font-display font-bold text-foreground tabular-nums">2,357</p>
                      <p className="text-xs text-muted-foreground mt-0.5">messaging conversations</p>
                    </div>
                    <div className="p-4 rounded-2xl bg-background border border-border/60">
                      <p className="text-2xl font-display font-bold text-foreground tabular-nums">212</p>
                      <p className="text-xs text-muted-foreground mt-0.5">Meta form leads</p>
                    </div>
                    <div className="p-4 rounded-2xl bg-background border border-border/60 col-span-2 sm:col-span-1">
                      <p className="text-2xl font-display font-bold text-foreground tabular-nums">AED 4.32</p>
                      <p className="text-xs text-muted-foreground mt-0.5">lowest CPL on winning ad</p>
                    </div>
                  </div>

                  <div className="pt-2">
                    <Link href="/marketing/aqua-care-uae">
                      <a className="inline-flex items-center gap-2 text-sm font-semibold text-orange-500 hover:text-orange-600 transition-colors">
                        Read Aqua Care Case Study
                        <ArrowRight className="w-4 h-4" />
                      </a>
                    </Link>
                  </div>
                </div>

                <div className="lg:col-span-5">
                  <div className="relative aspect-[4/3] rounded-2xl overflow-hidden border border-border/60 bg-muted/20">
                    <img 
                      src="/assets/images/brands/Aqua-Care/new.jpg" 
                      alt="Aqua Care Meta Ad creative and product systems"
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        e.currentTarget.src = "/assets/images/brands/Aqua-Care/Aqua-Care-Platinum-Plus-RO-Faucet.jpg";
                      }}
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Project 2: PrepMeal */}
            <div className="p-8 md:p-12 rounded-[2rem] border border-border/60 bg-muted/10 hover:border-border/90 transition-all duration-300">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
                <div className="lg:col-span-7 space-y-6">
                  <div className="flex items-center gap-3">
                    <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-muted-foreground bg-muted/30 px-3 py-1 rounded-full border border-border/40">
                      Social + Paid Media
                    </span>
                    <span className="text-xs font-mono text-muted-foreground">F&B / Subscription</span>
                  </div>

                  <h3 className="text-2xl sm:text-4xl font-display font-bold text-foreground">
                    PrepMeal
                  </h3>

                  <p className="text-base sm:text-lg text-muted-foreground leading-relaxed">
                    Content production and paid acquisition support for a healthy meal-prep brand. Produced over 150 vertical videos while supporting Meta ad campaigns with AED 185,000+ in spend.
                  </p>

                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 pt-2">
                    <div className="p-4 rounded-2xl bg-background border border-border/60">
                      <p className="text-2xl font-display font-bold text-foreground tabular-nums">150+</p>
                      <p className="text-xs text-muted-foreground mt-0.5">vertical videos</p>
                    </div>
                    <div className="p-4 rounded-2xl bg-background border border-border/60">
                      <p className="text-2xl font-display font-bold text-foreground tabular-nums">AED 185K+</p>
                      <p className="text-xs text-muted-foreground mt-0.5">Meta spend supported</p>
                    </div>
                    <div className="p-4 rounded-2xl bg-background border border-border/60 col-span-2 sm:col-span-1">
                      <p className="text-2xl font-display font-bold text-foreground tabular-nums">21,000+</p>
                      <p className="text-xs text-muted-foreground mt-0.5">meals delivered</p>
                    </div>
                  </div>

                  <div className="pt-2">
                    <Link href="/marketing/prepmeal">
                      <a className="inline-flex items-center gap-2 text-sm font-semibold text-foreground hover:text-orange-500 transition-colors">
                        Read PrepMeal Case Study
                        <ArrowRight className="w-4 h-4" />
                      </a>
                    </Link>
                  </div>
                </div>

                <div className="lg:col-span-5">
                  <div className="relative aspect-[4/3] rounded-2xl overflow-hidden border border-border/60 bg-muted/20">
                    <img 
                      src="/assets/images/brands/Prepmeal.webp" 
                      alt="PrepMeal content and meal prep delivery creative"
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Project 3: Commercial Video (Beyond Cars / Ecom 100) */}
            <div className="p-8 md:p-12 rounded-[2rem] border border-border/60 bg-muted/10 hover:border-border/90 transition-all duration-300">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
                <div className="lg:col-span-7 space-y-6">
                  <div className="flex items-center gap-3">
                    <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-muted-foreground bg-muted/30 px-3 py-1 rounded-full border border-border/40">
                      Commercial Video Production
                    </span>
                    <span className="text-xs font-mono text-muted-foreground">Automotive & Corporate</span>
                  </div>

                  <h3 className="text-2xl sm:text-4xl font-display font-bold text-foreground">
                    Commercial Video & Brand Films
                  </h3>

                  <p className="text-base sm:text-lg text-muted-foreground leading-relaxed">
                    Directed and edited commercial shoots for automotive, hospitality, and corporate clients across the UAE and India — including Beyond Cars, Acero Steel, and regional lifestyle brands.
                  </p>

                  <div className="grid grid-cols-2 gap-4 pt-2">
                    <div className="p-4 rounded-2xl bg-background border border-border/60">
                      <p className="text-2xl font-display font-bold text-foreground tabular-nums">120+</p>
                      <p className="text-xs text-muted-foreground mt-0.5">commercial videos delivered</p>
                    </div>
                    <div className="p-4 rounded-2xl bg-background border border-border/60">
                      <p className="text-2xl font-display font-bold text-foreground tabular-nums">5+</p>
                      <p className="text-xs text-muted-foreground mt-0.5">major client brands</p>
                    </div>
                  </div>

                  <div className="pt-2">
                    <Link href="/video">
                      <a className="inline-flex items-center gap-2 text-sm font-semibold text-foreground hover:text-orange-500 transition-colors">
                        Explore Video Portfolio
                        <ArrowRight className="w-4 h-4" />
                      </a>
                    </Link>
                  </div>
                </div>

                <div className="lg:col-span-5">
                  <div className="relative aspect-[4/3] rounded-2xl overflow-hidden border border-border/60 bg-muted/20 group cursor-pointer" onClick={() => setShowreelOpen(true)}>
                    <img 
                      src="https://res.cloudinary.com/dgmieaf9g/video/upload/so_auto,f_jpg,w_800,q_auto/v1/lamourmedia_1761496555_3752003203673245690_4144321886_zcwmht.jpg" 
                      alt="Commercial video reel preview"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                      <div className="w-16 h-16 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center text-white border border-white/30 group-hover:scale-110 transition-transform">
                        <Play className="w-6 h-6 fill-current ml-0.5" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Additional Project: Steaburg */}
            <div className="p-6 md:p-8 rounded-2xl border border-border/40 bg-muted/5 flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div>
                <span className="text-[10px] font-mono uppercase tracking-wider text-muted-foreground/60">Additional Project</span>
                <h4 className="text-lg font-display font-bold text-foreground">Steaburg — Local SEO & Content</h4>
                <p className="text-xs sm:text-sm text-muted-foreground mt-1 max-w-2xl">
                  Optimized Google Business Profile and built a customer review system for a Sharjah burger landmark, growing verified reviews from 26 to 100+ and achieving top-3 local rankings.
                </p>
              </div>
              <Link href="/marketing/steaburg-local-seo">
                <a className="inline-flex items-center gap-1.5 text-xs font-mono uppercase tracking-wider text-orange-500 hover:underline shrink-0">
                  View Project <ArrowUpRight className="w-3.5 h-3.5" />
                </a>
              </Link>
            </div>

          </div>

        </div>
      </section>

      {/* 3. WHAT I ACTUALLY DO (4 CATEGORIES) */}
      <section className="py-24 md:py-32 border-b border-border/40">
        <div className="container px-4 md:px-8 max-w-[1240px] mx-auto space-y-16">
          
          <div className="border-b border-border/40 pb-6">
            <p className="text-xs font-mono uppercase tracking-widest text-orange-500 mb-2">Capabilities</p>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-bold text-foreground tracking-tight">
              What I actually do.
            </h2>
            <p className="text-base text-muted-foreground mt-2 max-w-xl">
              No bloated agency offerings. Just four clear areas where I do hands-on work.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            {/* 01 PAID MEDIA */}
            <div className="p-8 rounded-3xl border border-border/50 bg-muted/10 space-y-6">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono font-bold text-orange-500">01</span>
                <span className="text-[10px] font-mono uppercase tracking-widest text-muted-foreground/60">Execution</span>
              </div>
              <h3 className="text-2xl font-display font-bold text-foreground">PAID MEDIA</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Structured media buying focused on qualified inquiries and revenue, not vanity impressions. I manage the campaign structure, audience targeting, and budget scaling directly.
              </p>
              <div className="flex flex-wrap gap-2 pt-2">
                {["Meta Ads Manager", "Lead Generation", "Creative Testing", "Campaign Structure"].map((item) => (
                  <span key={item} className="text-xs font-medium bg-background px-3 py-1.5 rounded-full border border-border/60 text-foreground/80">
                    {item}
                  </span>
                ))}
              </div>
            </div>

            {/* 02 CONTENT */}
            <div className="p-8 rounded-3xl border border-border/50 bg-muted/10 space-y-6">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono font-bold text-orange-500">02</span>
                <span className="text-[10px] font-mono uppercase tracking-widest text-muted-foreground/60">Creative</span>
              </div>
              <h3 className="text-2xl font-display font-bold text-foreground">CONTENT</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Direct-response and brand video produced specifically for vertical platforms and mobile feeds. I handle filming, editing, and sound design myself to keep iterations fast.
              </p>
              <div className="flex flex-wrap gap-2 pt-2">
                {["Short-form Video", "Creative Production", "Product Photography", "Creative Direction"].map((item) => (
                  <span key={item} className="text-xs font-medium bg-background px-3 py-1.5 rounded-full border border-border/60 text-foreground/80">
                    {item}
                  </span>
                ))}
              </div>
            </div>

            {/* 03 GROWTH */}
            <div className="p-8 rounded-3xl border border-border/50 bg-muted/10 space-y-6">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono font-bold text-orange-500">03</span>
                <span className="text-[10px] font-mono uppercase tracking-widest text-muted-foreground/60">Strategy</span>
              </div>
              <h3 className="text-2xl font-display font-bold text-foreground">GROWTH</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Deconstructing competitor positioning, finding hook angles, and planning content systems that build trust while feeding creative testing into paid ads.
              </p>
              <div className="flex flex-wrap gap-2 pt-2">
                {["Content Strategy", "Competitor Research", "Offer Testing", "Social Media"].map((item) => (
                  <span key={item} className="text-xs font-medium bg-background px-3 py-1.5 rounded-full border border-border/60 text-foreground/80">
                    {item}
                  </span>
                ))}
              </div>
            </div>

            {/* 04 AUTOMATION */}
            <div className="p-8 rounded-3xl border border-border/50 bg-muted/10 space-y-6">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono font-bold text-orange-500">04</span>
                <span className="text-[10px] font-mono uppercase tracking-widest text-muted-foreground/60">Infrastructure</span>
              </div>
              <h3 className="text-2xl font-display font-bold text-foreground">AUTOMATION</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Eliminating lead drop-off by connecting ad clicks and Instagram comments directly to WhatsApp sales representatives in under two minutes.
              </p>
              <div className="flex flex-wrap gap-2 pt-2">
                {["ManyChat", "Instagram → WhatsApp", "Lead Routing", "Basic CRM Workflows"].map((item) => (
                  <span key={item} className="text-xs font-medium bg-background px-3 py-1.5 rounded-full border border-border/60 text-foreground/80">
                    {item}
                  </span>
                ))}
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* 4. A LITTLE ABOUT ME (PERSONAL STORY) */}
      <section className="py-24 md:py-32 border-b border-border/40">
        <div className="container px-4 md:px-8 max-w-[1240px] mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            <div className="lg:col-span-7 space-y-6">
              <p className="text-xs font-mono uppercase tracking-widest text-orange-500">Background</p>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-bold text-foreground tracking-tight">
                A little about me.
              </h2>
              <div className="space-y-4 text-base sm:text-lg text-muted-foreground leading-relaxed">
                <p>
                  I started with a camera.
                </p>
                <p>
                  Over time, my work moved deeper into digital marketing — from content and social media into paid acquisition, creative testing and lead generation.
                </p>
                <p className="text-foreground font-medium">
                  Today I work across both sides. I can shoot the video, edit the creative, launch the campaign, and then look at the numbers to see whether it actually worked.
                </p>
                <p>
                  That combination is what I enjoy most: making creative that looks good, but still has a job to do.
                </p>
              </div>

              <div className="pt-2">
                <Link href="/about">
                  <a className="inline-flex items-center gap-2 text-sm font-semibold text-orange-500 hover:text-orange-600 transition-colors">
                    Read My Career Timeline
                    <ArrowRight className="w-4 h-4" />
                  </a>
                </Link>
              </div>
            </div>

            <div className="lg:col-span-5">
              <div className="relative aspect-[4/5] rounded-3xl overflow-hidden border border-border/60 bg-muted/20 max-w-sm mx-auto shadow-xl">
                <img 
                  src="/assets/images/profile/gokul-kp-performance-marketer-dubai.webp" 
                  alt="Gokul KP — Digital Marketer & Creative Producer"
                  className="w-full h-full object-cover grayscale contrast-105 hover:grayscale-0 transition-all duration-700"
                  onError={(e) => {
                    e.currentTarget.src = "/assets/images/profile/profile.webp";
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent pointer-events-none" />
                <div className="absolute bottom-5 left-5 right-5 text-white">
                  <p className="text-sm font-semibold">Gokul KP</p>
                  <p className="text-xs text-white/70 font-mono">Digital Marketer + Creative Producer</p>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 5. CORE DIFFERENTIATOR: CREATIVE + PERFORMANCE */}
      <section className="py-24 md:py-32 border-b border-border/40 bg-muted/5">
        <div className="container px-4 md:px-8 max-w-[1000px] mx-auto text-center space-y-8">
          <p className="text-xs font-mono uppercase tracking-widest text-orange-500">The Cross-Over</p>
          <h2 className="text-3xl sm:text-5xl md:text-6xl font-display font-bold text-foreground tracking-tight">
            Creative + Performance
          </h2>
          <div className="space-y-4 text-lg sm:text-xl md:text-2xl text-muted-foreground font-normal max-w-2xl mx-auto leading-relaxed">
            <p className="text-foreground font-medium">
              "Most marketers don't make the creative.<br className="hidden sm:inline" />
              Most creatives don't spend their day inside Ads Manager.<br className="hidden sm:inline" />
              I've spent time in both."
            </p>
            <p className="text-base sm:text-lg text-muted-foreground">
              I enjoy the part where a creative idea becomes an actual campaign — and the numbers tell you whether the idea worked.
            </p>
          </div>
        </div>
      </section>

      {/* 6. SELECTED RESULTS */}
      <section className="py-24 md:py-32 border-b border-border/40">
        <div className="container px-4 md:px-8 max-w-[1240px] mx-auto space-y-16">
          
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-border/40 pb-6">
            <div>
              <p className="text-xs font-mono uppercase tracking-widest text-orange-500 mb-2">Credibility</p>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-bold text-foreground tracking-tight">
                Selected results.
              </h2>
            </div>
            <p className="text-sm text-muted-foreground max-w-md">
              Real numbers from campaigns I've managed or supported. Every figure is backed by reports.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
            {proof.metrics.map((metric, i) => (
              <div 
                key={i} 
                className="p-6 sm:p-8 rounded-3xl border border-border/50 bg-muted/10 flex flex-col justify-between"
              >
                <div>
                  <p className="text-3xl sm:text-4xl md:text-5xl font-display font-bold text-foreground tabular-nums tracking-tight">
                    {metric.prefix}{metric.value}{metric.suffix}
                  </p>
                  <p className="text-sm font-medium text-foreground/80 mt-2 capitalize">
                    {metric.label}
                  </p>
                </div>
                {metric.context && (
                  <p className="text-[11px] font-mono text-muted-foreground/60 mt-4 pt-3 border-t border-border/30">
                    {metric.context}
                  </p>
                )}
              </div>
            ))}
          </div>

          <div className="text-center pt-2">
            <Link href="/results">
              <a className="inline-flex items-center gap-2 text-sm font-semibold text-orange-500 hover:underline">
                View Full Results & Campaign Breakdown
                <ArrowRight className="w-4 h-4" />
              </a>
            </Link>
          </div>

        </div>
      </section>

      {/* 7. CREATIVE WORK (VIDEO & VISUALS) */}
      <section className="py-24 md:py-32 border-b border-border/40">
        <div className="container px-4 md:px-8 max-w-[1240px] mx-auto space-y-16">
          
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-border/40 pb-6">
            <div>
              <p className="text-xs font-mono uppercase tracking-widest text-orange-500 mb-2">Showcase</p>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-bold text-foreground tracking-tight">
                Creative work.
              </h2>
            </div>
            <p className="text-sm text-muted-foreground max-w-md">
              Brand films, short-form direct-response video, and commercial photography designed with a job to do.
            </p>
          </div>

          {/* Showreel Hero Card */}
          <div 
            onClick={() => setShowreelOpen(true)}
            className="relative aspect-video sm:aspect-[21/9] rounded-[2.5rem] overflow-hidden border border-border/60 bg-muted/20 group cursor-pointer"
          >
            <img 
              src="https://res.cloudinary.com/dgmieaf9g/video/upload/so_auto,f_jpg,w_1200,q_auto/v1/lamourmedia_1761496555_3752003203673245690_4144321886_zcwmht.jpg" 
              alt="Commercial video showreel"
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-black/40 group-hover:bg-black/30 transition-colors flex items-center justify-center">
              <div className="flex flex-col items-center gap-3">
                <div className="w-20 h-20 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center text-white border border-white/30 group-hover:scale-110 transition-transform shadow-2xl">
                  <Play className="w-8 h-8 fill-current ml-1" />
                </div>
                <span className="text-xs font-mono uppercase tracking-widest text-white/90 font-semibold bg-black/40 px-3 py-1 rounded-full border border-white/20">
                  Play Showreel
                </span>
              </div>
            </div>
          </div>

          {/* Direct Navigation Links */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-4">
            <Link href="/video">
              <a className="p-8 rounded-3xl border border-border/50 bg-muted/10 hover:border-orange-500/30 transition-colors flex items-center justify-between group">
                <div>
                  <h3 className="text-xl font-display font-bold text-foreground group-hover:text-orange-500 transition-colors">
                    Commercial Video Production
                  </h3>
                  <p className="text-sm text-muted-foreground mt-1">Brand films, Reels, and direct-response video</p>
                </div>
                <ArrowRight className="w-5 h-5 text-muted-foreground group-hover:text-orange-500 group-hover:translate-x-1 transition-all" />
              </a>
            </Link>

            <Link href="/photo">
              <a className="p-8 rounded-3xl border border-border/50 bg-muted/10 hover:border-orange-500/30 transition-colors flex items-center justify-between group">
                <div>
                  <h3 className="text-xl font-display font-bold text-foreground group-hover:text-orange-500 transition-colors">
                    Commercial Photography
                  </h3>
                  <p className="text-sm text-muted-foreground mt-1">Product, culinary, and lifestyle visual assets</p>
                </div>
                <ArrowRight className="w-5 h-5 text-muted-foreground group-hover:text-orange-500 group-hover:translate-x-1 transition-all" />
              </a>
            </Link>
          </div>

        </div>
      </section>

      {/* 8. FINAL HUMAN CTA */}
      <section className="py-24 md:py-32">
        <div className="container px-4 md:px-8 max-w-[1000px] mx-auto">
          <div className="rounded-[2.5rem] border border-border/60 bg-muted/10 p-10 md:p-16 text-center space-y-8">
            <div className="max-w-2xl mx-auto space-y-4">
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-bold text-foreground tracking-tight">
                Have a project in mind?
              </h2>
              <p className="text-base sm:text-lg text-muted-foreground">
                Available for selected freelance projects, collaborations and marketing opportunities.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link href="/contact">
                <a className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-orange-500 hover:bg-orange-600 text-white font-semibold px-8 py-4 rounded-full transition-all duration-200 shadow-lg shadow-orange-500/20">
                  Let's talk
                  <ArrowRight className="w-4 h-4" />
                </a>
              </Link>
              <a 
                href="https://wa.me/971545264632?text=Hi%20Gokul%2C%20I%20saw%20your%20portfolio%20and%20I%27d%20love%20to%20discuss%20a%20project." 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-muted/30 hover:bg-muted/50 text-foreground font-medium px-8 py-4 rounded-full border border-border/60 transition-colors"
              >
                <MessageCircle className="w-4 h-4 text-emerald-500" />
                WhatsApp
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Showreel Modal */}
      <ShowreelModal 
        isOpen={showreelOpen} 
        onClose={() => setShowreelOpen(false)} 
        videoId="lamourmedia_1761496555_3752003203673245690_4144321886_zcwmht" 
      />

    </div>
  );
}

