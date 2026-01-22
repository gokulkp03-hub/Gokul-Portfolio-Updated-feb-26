import { Button } from "@/components/ui/button";
import { ArrowRight, Video, Camera, Edit3, Palette, Zap, ExternalLink, TrendingUp, Target, BarChart3, Layers } from "lucide-react";
import { useLocation } from "wouter";
import { motion } from "framer-motion";
import { caseStudies } from "@/data/caseStudies";

const FEATURED_WORK = [
  {
    id: 1,
    title: "Personal Branding",
    category: "Video Production",
    image: "", // Empty for now
    link: "/portfolio/video-production/reels",
    glimpse: "Cinematic brand stories and professional personas"
  },
  {
    id: 2,
    title: "Event Coverage",
    category: "Video Production",
    image: "", // Empty for now
    link: "/portfolio/video-production/events",
    glimpse: "Capturing the energy and key moments of your events"
  },
  {
    id: 3,
    title: "Motion Graphics",
    category: "Motion Graphics",
    image: "", // Empty for now
    link: "/portfolio/motion-graphics",
    glimpse: "Dynamic animations and visual elements that pop"
  },
  {
    id: 4,
    title: "Product Photography",
    category: "Photography",
    image: "", // Empty for now
    link: "/portfolio/photography/product",
    glimpse: "Stunning product visuals for e-commerce and social"
  },
  {
    id: 5,
    title: "Social Media Design",
    category: "Graphic Design",
    image: "/images/brands/Q4/Ad 9.jpg",
    link: "/portfolio/graphic-design/social-media",
    glimpse: "High-performance ad creatives and social graphics"
  },
  {
    id: 6,
    title: "Wedding Photography",
    category: "Photography",
    image: "/images/photography/wedding/wedding-1.jpg",
    link: "/portfolio/photography/wedding",
    glimpse: "Capturing timeless moments and emotions"
  },
];

const SERVICES = [
  { title: "Meta Ads & Campaign Strategy", description: "Ad creatives, targeting, retargeting, scaling", icon: Target },
  { title: "Performance Marketing", description: "Funnel design, optimization, conversion strategy", icon: TrendingUp },
  { title: "Social Media Advertising", description: "Campaign frameworks, content systems, growth", icon: BarChart3 },
  { title: "Creative Production", description: "Video production, photography, brand visuals", icon: Video },
  { title: "Content Strategy", description: "Brand positioning, analytics, social media growth", icon: Palette },
];

// Animation variants for scroll reveals
const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" }
  }
} as const;

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
} as const;

export default function Home() {
  const [, navigate] = useLocation();

  const scrollToSection = (sectionId: string) => {
    if (sectionId === "services") navigate("/services");
    else if (sectionId === "experience") navigate("/experience");
    else if (sectionId === "portfolio") navigate("/portfolio");
    else if (sectionId === "contact") {
      const element = document.getElementById("contact");
      element?.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="min-h-screen bg-black">

      {/* Hero Section - Business First */}
      <section className="relative min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8 bg-black overflow-hidden">
        {/* Subtle background gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-orange-600/5 via-black to-black" />

        <div className="relative z-10 max-w-6xl mx-auto w-full">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">

            {/* Left Column - Content */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="space-y-8"
            >
              {/* Value-First Headline */}
              <div className="space-y-4">
                <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white tracking-tight leading-tight">
                  Scaling Brands with Performance + Creative
                </h1>

                {/* Primary Identity */}
                <h2 className="text-xl md:text-2xl font-semibold text-orange-500">
                  Gokul KP — Digital Marketer & Performance Strategist
                </h2>

                {/* Secondary Identity (Creative) */}
                <p className="text-base md:text-lg text-gray-400">
                  Creative Director • Videographer • Photographer • Editor
                </p>
              </div>

              {/* Improved Description */}
              <p className="text-lg md:text-xl text-gray-300 leading-relaxed max-w-2xl">
                I design, launch, and scale performance-driven marketing systems — combining Meta ads, funnels, content, and creative production to drive real business growth.
              </p>

              {/* Value Bullets - Marketing + Creative Mix */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {[
                  "Meta Ads & Campaign Strategy",
                  "Performance Marketing",
                  "Funnel Building",
                  "Content Systems",
                  "Brand Growth Strategy",
                  "Creative Direction",
                  "Videography / Video Editing",
                  "Photography / Photo Editing"
                ].map((item, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.4, delay: 0.2 + idx * 0.05 }}
                    className="flex items-center gap-3 text-gray-400"
                  >
                    <div className="w-1.5 h-1.5 rounded-full bg-orange-500" />
                    <span className="text-sm md:text-base">{item}</span>
                  </motion.div>
                ))}
              </div>

              {/* CTA Buttons */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="flex flex-col sm:flex-row gap-4 pt-4"
              >
                <Button
                  onClick={() => navigate("/portfolio")}
                  className="px-8 py-6 rounded-lg font-semibold bg-orange-600 text-white hover:bg-orange-700 text-lg transition-all duration-300 hover:scale-105"
                >
                  View Work <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
                <Button
                  onClick={() => scrollToSection("contact")}
                  className="px-8 py-6 rounded-lg font-semibold bg-white/5 backdrop-blur-md border border-white/10 text-white hover:bg-white/10 hover:border-orange-500/50 text-lg transition-all duration-300"
                >
                  Contact Me
                </Button>
              </motion.div>
            </motion.div>

            {/* Right Column - Visual Element */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="hidden lg:block relative"
            >
              <div className="relative">
                {/* Glass card with subtle glow */}
                <div className="relative rounded-2xl bg-white/5 backdrop-blur-xl border border-white/10 p-8 shadow-2xl">
                  <div className="space-y-6">
                    {/* Stats/Metrics Display */}
                    <div className="grid grid-cols-2 gap-4">
                      <div className="bg-black/40 rounded-xl p-6 border border-orange-500/20">
                        <div className="text-3xl font-bold text-orange-500 mb-2">3+</div>
                        <div className="text-sm text-gray-400">Years Experience</div>
                      </div>
                      <div className="bg-black/40 rounded-xl p-6 border border-orange-500/20">
                        <div className="text-3xl font-bold text-orange-500 mb-2">50+</div>
                        <div className="text-sm text-gray-400">Campaigns</div>
                      </div>
                    </div>

                    {/* Mini Performance Dashboard Widget */}
                    <div className="bg-gradient-to-br from-orange-600/20 to-orange-500/5 rounded-xl p-6 border border-orange-500/20">
                      <div className="space-y-4">
                        <div className="flex items-center justify-between">
                          <span className="text-xs text-gray-400 uppercase tracking-wider">Performance</span>
                          <TrendingUp className="w-4 h-4 text-orange-500" />
                        </div>

                        {/* Mini Metrics */}
                        <div className="grid grid-cols-3 gap-3">
                          <div className="text-center">
                            <div className="text-lg font-bold text-orange-400">4.2x</div>
                            <div className="text-xs text-gray-500">ROAS</div>
                          </div>
                          <div className="text-center">
                            <div className="text-lg font-bold text-orange-400">287</div>
                            <div className="text-xs text-gray-500">Leads</div>
                          </div>
                          <div className="text-center">
                            <div className="text-lg font-bold text-orange-400">156%</div>
                            <div className="text-xs text-gray-500">CVR</div>
                          </div>
                        </div>

                        {/* Subtle Graph Lines */}
                        <div className="flex items-end gap-1 h-12">
                          {[40, 55, 45, 70, 60, 85, 75, 90].map((height, idx) => (
                            <div
                              key={idx}
                              className="flex-1 bg-orange-500/30 rounded-t"
                              style={{ height: `${height}%` }}
                            />
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Glow effect */}
                <div className="absolute -inset-4 bg-orange-500/10 rounded-3xl blur-3xl -z-10" />
              </div>
            </motion.div>

          </div>
        </div>
      </section>

      {/* Featured Work Section */}
      <section className="relative py-20 px-4 sm:px-6 lg:px-8 bg-black">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeInUp}
            className="mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">Featured Work</h2>
            <p className="text-xl text-gray-400 max-w-2xl">A selection of my most impactful projects</p>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainer}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {FEATURED_WORK.map((item) => (
              <motion.div
                key={item.id}
                variants={fadeInUp}
                className="group relative overflow-hidden rounded-xl bg-gray-900/40 backdrop-blur-md border border-white/5 aspect-square cursor-pointer hover:border-orange-500/50 transition-all duration-300"
                onClick={() => navigate(item.link)}
              >
                {/* Visual Glimpse Image */}
                <div className="absolute inset-0">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover opacity-60 group-hover:opacity-40 transition-opacity duration-500 group-hover:scale-110"
                    loading="lazy"
                  />
                </div>

                {/* Content Overlay */}
                <div className="relative z-10 w-full h-full flex flex-col justify-end p-6 bg-gradient-to-t from-black/90 via-black/20 to-transparent">
                  <div className="transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                    <p className="text-orange-500 text-xs font-bold uppercase tracking-widest mb-2">
                      {item.category}
                    </p>
                    <h3 className="text-2xl font-bold text-white mb-2">
                      {item.title}
                    </h3>
                    <p className="text-gray-300 text-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-100">
                      {item.glimpse}
                    </p>
                  </div>
                </div>

                {/* Shimmer effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Brands & Clients Section */}
      <section className="relative py-20 px-4 sm:px-6 lg:px-8 border-t border-gray-800 bg-black">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
            className="mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">Brands I've Worked With</h2>
            <p className="text-xl text-gray-400 max-w-2xl">Trusted by leading brands and companies across various industries</p>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            variants={staggerContainer}
            className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8"
          >
            {[
              { name: "Healthy Meals", img: "/images/brands/brand-1.png" },
              { name: "Acero", img: "/images/brands/brand-2.png" },
              { name: "Galaxy Star Perfumes", img: "/images/brands/brand-3.png" },
              { name: "Ecomioo", img: "/images/brands/brand-4.png" },
              { name: "BeyondCars", img: "/images/brands/brand-5.png" },
              { name: "PrepMeal", img: "/images/brands/brand-6.png" },
              { name: "O4C", img: "/images/brands/brand-7.png" },
              { name: "Suncore Energies", img: "/images/brands/brand-8.png" },
            ].map((brand, idx) => (
              <motion.div
                key={idx}
                variants={fadeInUp}
                className="group relative overflow-hidden rounded-xl aspect-[3/2] flex flex-col items-center justify-center transition-all duration-300 transform hover:-translate-y-1"
              >
                {/* Brand Stage - White pill for visibility */}
                <div className="absolute inset-0 bg-white/90 backdrop-blur-sm group-hover:bg-white transition-colors duration-300 shadow-[0_0_20px_rgba(255,255,255,0.1)]" />

                {/* Logo Container */}
                <div className="relative w-full h-full p-6 flex items-center justify-center z-10">
                  <img
                    src={brand.img}
                    alt={brand.name}
                    className="w-full h-full object-contain filter brightness-100 contrast-125"
                    loading="lazy"
                  />
                </div>

                {/* Optional: Brand Name overlay on hover if needed, or keep clean */}
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Services Section */}
      <section className="relative py-20 px-4 sm:px-6 lg:px-8 bg-gray-900/20 border-t border-gray-800">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">Services</h2>
            <p className="text-xl text-gray-400">Full-stack digital marketing and creative production</p>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6"
          >
            {SERVICES.map((service) => {
              const IconComponent = service.icon;
              return (
                <motion.div
                  key={service.title}
                  variants={fadeInUp}
                  className="group relative overflow-hidden rounded-xl bg-gray-900/40 backdrop-blur-md border border-white/5 hover:border-orange-500/50 hover:bg-gray-900/60 transition-all duration-300 p-6 text-center"
                >
                  {/* Content */}
                  <div className="relative z-10 space-y-4">
                    <div className="flex justify-center">
                      <div className="w-12 h-12 rounded-lg bg-orange-600/20 flex items-center justify-center group-hover:bg-orange-600/30 transition-colors">
                        <IconComponent className="w-6 h-6 text-orange-500" />
                      </div>
                    </div>
                    <h3 className="text-lg font-bold text-white group-hover:text-orange-400 transition-colors">
                      {service.title}
                    </h3>
                    <p className="text-sm text-gray-400">{service.description}</p>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </section>

      {/* About Preview Section */}
      <section className="relative py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            {/* Left Column - Text */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInUp}
              className="space-y-6"
            >
              <h2 className="text-4xl md:text-5xl font-bold text-white">About Me</h2>
              <p className="text-lg text-gray-400">
                I'm a digital marketer and performance strategist who builds campaigns that drive measurable results. My approach combines data-driven strategy with creative execution to help brands grow across digital platforms.
              </p>
              <p className="text-lg text-gray-400">
                With 3+ years of experience in digital marketing, performance advertising, and content creation, I specialize in Meta Ads, campaign strategy, funnel optimization, and brand growth systems that deliver ROI.
              </p>
              <Button
                onClick={() => navigate("/experience")}
                className="px-6 py-3 rounded-lg font-semibold bg-orange-600 text-white hover:bg-orange-700 text-base"
              >
                Read More <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </motion.div>

            {/* Right Column - Image */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInUp}
              className="relative"
            >
              <div className="group relative rounded-2xl overflow-hidden border border-white/10 bg-gray-900/40 backdrop-blur-md hover:border-orange-500/50 transition-all duration-300 shadow-2xl">
                <div className="aspect-[3/4] w-full relative">
                  <img
                    src="/images/profile/profile.jpg"
                    alt="Gokul KP"
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-gray-900/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>



      {/* Final CTA Section */}
      <section className="relative py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-orange-600/20 to-orange-500/10 border-t border-orange-500/30">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeInUp}
          className="max-w-4xl mx-auto text-center"
        >
          <h2 className="text-5xl md:text-6xl font-bold text-white mb-6">
            Let's create something impactful
          </h2>
          <p className="text-xl text-gray-300 mb-10">
            Available for freelance, collaborations, and brand projects
          </p>
          <Button
            onClick={() => scrollToSection("contact")}
            className="px-10 py-4 rounded-lg font-semibold bg-orange-600 text-white hover:bg-orange-700 text-lg"
          >
            Get in Touch <ArrowRight className="w-5 h-5 ml-2" />
          </Button>
        </motion.div>
      </section>

      {/* Case Studies Section */}
      <section className="relative py-20 px-4 sm:px-6 lg:px-8 bg-gray-900/20 border-t border-gray-800">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
            className="mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">Case Studies</h2>
            <p className="text-xl text-gray-400 max-w-2xl">Strategic projects showcasing results and impact</p>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="grid grid-cols-1 md:grid-cols-2 gap-8"
          >
            {caseStudies.slice(0, 2).map((study) => (
              <motion.div
                key={study.slug}
                variants={fadeInUp}
                onClick={() => navigate(`/case-studies/${study.slug}`)}
                className="bg-gray-900/40 backdrop-blur-md border border-white/5 rounded-xl p-8 hover:border-orange-500/50 transition-all duration-300 cursor-pointer"
              >
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-600/20 border border-orange-500/30 mb-6">
                  <TrendingUp className="w-4 h-4 text-orange-500" />
                  <span className="text-xs font-medium text-orange-400">{study.platform}</span>
                </div>
                <h3 className="text-2xl font-bold text-white mb-4">{study.client}</h3>
                <div className="space-y-4">
                  <div>
                    <p className="text-sm text-gray-500 uppercase tracking-wide">Objective</p>
                    <p className="text-gray-300 mt-1 line-clamp-2">{study.objective}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 uppercase tracking-wide">Key Results</p>
                    <div className="flex gap-4 mt-2">
                      {study.metrics.slice(0, 2).map((metric, mIdx) => (
                        <div key={mIdx}>
                          <p className="text-orange-400 font-bold">{metric.value}</p>
                          <p className="text-[10px] text-gray-500 uppercase">{metric.label}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
                <button className="mt-8 px-5 py-2.5 bg-orange-600/10 text-orange-400 border border-orange-500/20 rounded-lg hover:bg-orange-600/20 transition-all text-sm font-medium flex items-center gap-2 group">
                  View Full Case Study <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </button>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="relative py-20 px-4 sm:px-6 lg:px-8 border-t border-gray-800 bg-black">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeInUp}
          className="max-w-4xl mx-auto text-center"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-8">Get in Touch</h2>
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <a href="https://wa.me/919876543210" className="px-8 py-4 rounded-lg font-semibold bg-gray-900/40 backdrop-blur-md border border-white/10 text-white hover:bg-gray-900/60 hover:border-orange-500/50 hover:text-orange-500 transition-all duration-300 inline-flex items-center justify-center gap-2 group">
              WhatsApp <ExternalLink className="w-4 h-4 text-gray-400 group-hover:text-orange-500 transition-colors" />
            </a>
            <a href="https://www.instagram.com/__agotime" className="px-8 py-4 rounded-lg font-semibold bg-gray-900/40 backdrop-blur-md border border-white/10 text-white hover:bg-gray-900/60 hover:border-orange-500/50 hover:text-orange-500 transition-all duration-300 inline-flex items-center justify-center gap-2 group">
              Instagram <ExternalLink className="w-4 h-4 text-gray-400 group-hover:text-orange-500 transition-colors" />
            </a>
            <a href="https://www.linkedin.com/in/gokul-kp03" className="px-8 py-4 rounded-lg font-semibold bg-gray-900/40 backdrop-blur-md border border-white/10 text-white hover:bg-gray-900/60 hover:border-orange-500/50 hover:text-orange-500 transition-all duration-300 inline-flex items-center justify-center gap-2 group">
              LinkedIn <ExternalLink className="w-4 h-4 text-gray-400 group-hover:text-orange-500 transition-colors" />
            </a>
          </div>
        </motion.div>
      </section>

      {/* Professional Footer */}
      <footer className="relative py-16 px-4 sm:px-6 lg:px-8 bg-gray-900 border-t border-gray-800">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
            <div>
              <div className="text-2xl font-bold mb-4">
                <span className="text-orange-500">Gokul</span>
                <span className="text-white"> KP</span>
              </div>
              <p className="text-gray-400 text-sm">Digital Marketer & Performance Strategist</p>
            </div>
            {/* Footer links simplification for brevity in this refactor, keeping structure */}
            <div>
              <h4 className="text-white font-semibold mb-4">Navigation</h4>
              <ul className="space-y-2 text-sm">
                <li><a href="#" className="text-gray-400 hover:text-orange-400 transition-colors">Home</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 pt-8 text-center">
            <p className="text-gray-500 text-sm">2024 Gokul KP. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
