import { motion } from "framer-motion";
import { ArrowRight, Check, Zap, Target, Sparkles, BarChart, Camera, Play, Layers } from "lucide-react";
import { Link } from "wouter";

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

  return (
    <div className="min-h-screen bg-background pt-32 pb-20">
      <div className="container px-4 md:px-8 max-w-[1400px] mx-auto">

        {/* Header */}
        <div className="text-center mb-24 max-w-4xl mx-auto">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-6xl md:text-9xl font-display font-bold mb-8 uppercase italic tracking-tighter"
          >
            Digital <span className="text-orange-500">Arsenal</span>
          </motion.h1>
          <p className="text-xl md:text-2xl text-muted-foreground font-light leading-relaxed">
            I don't just provide services; I build growth systems.
            Select the tier that aligns with your current scale.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-48">
          {services.map((service, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="group glass-card p-10 md:p-16 border border-white/5 rounded-[3rem] hover:border-orange-500/20 transition-all flex flex-col"
            >
              <div className="mb-12 flex items-start justify-between">
                <div className="p-5 rounded-3xl bg-white/5 group-hover:bg-orange-500 group-hover:text-white transition-colors">
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
                  <li key={fidx} className="flex items-center gap-4 text-sm text-white/80 font-light border-b border-white/5 pb-4">
                    <Check className="w-4 h-4 text-orange-500" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>

              <div className="pt-8 border-t border-white/5">
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
        </div>

        {/* The Arc Section */}
        <section className="mb-48 relative overflow-hidden rounded-[4rem] bg-orange-500/5 border border-orange-500/10 p-12 md:p-24">
          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
            <div>
              <h2 className="text-5xl md:text-7xl font-display font-bold mb-10 tracking-tighter uppercase line-clamp-2 italic">
                The Growth <br /> <span className="text-orange-500 italic">Arc</span>
              </h2>
              <p className="text-xl text-muted-foreground font-light leading-relaxed mb-12">
                My process is engineered for predictable scaling.
                We move from audit to execution in under 14 days.
              </p>
              <div className="space-y-8">
                {[
                  { step: "01", title: "Visual Audit", desc: "Analyzing your current brand aesthetics vs market leaders." },
                  { step: "02", title: "Strategy Phase", desc: "Mapping the content funnel and ad infrastructure." },
                  { step: "03", title: "Production", desc: "Capturing high-end assets and building the campaign." },
                  { step: "04", title: "Launch & Scale", desc: "Going live and iterating based on real-time data." }
                ].map((item, i) => (
                  <div key={i} className="flex gap-8 group">
                    <div className="text-4xl font-display font-bold text-orange-500/20 group-hover:text-orange-500 transition-colors">{item.step}</div>
                    <div>
                      <h4 className="text-xl font-bold text-white mb-1 uppercase">{item.title}</h4>
                      <p className="text-sm text-muted-foreground font-light">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="relative aspect-square">
              <div className="absolute inset-0 bg-orange-500/10 blur-[150px] rounded-full" />
              <div className="relative z-10 w-full h-full glass-card border border-white/5 rounded-[3rem] flex items-center justify-center p-12 text-center">
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
          <h2 className="text-4xl md:text-6xl font-display font-bold mb-8 uppercase tracking-tighter italic">Ready to engage?</h2>
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
