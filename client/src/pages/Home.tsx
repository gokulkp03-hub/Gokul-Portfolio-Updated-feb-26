import { Button } from "@/components/ui/button";
import { ArrowRight, Video, Camera, Edit3, Palette, Zap, ExternalLink } from "lucide-react";
import { useLocation } from "wouter";
import CreativeScroll from "../components/CreativeScroll";
import { motion } from "framer-motion";

const FEATURED_WORK = [
  { id: 1, title: "Personal Branding", category: "Videography", image: "/portfolio-1.jpg" },
  { id: 2, title: "Event Coverage", category: "Videography", image: "/portfolio-2.jpg" },
  { id: 3, title: "Motion Graphics", category: "Motion Graphics", image: "/portfolio-3.jpg" },
  { id: 4, title: "Product Photography", category: "Photography", image: "/portfolio-4.jpg" },
  { id: 5, title: "Social Media Design", category: "Graphic Design", image: "/portfolio-5.jpg" },
  { id: 6, title: "Video Editing", category: "Video Editing", image: "/portfolio-6.jpg" },
];

const SERVICES = [
  { title: "Videography", description: "Brand films, ads, reels, events", icon: Video },
  { title: "Photography", description: "Commercial, lifestyle, products", icon: Camera },
  { title: "Video Editing", description: "Short & long form content", icon: Edit3 },
  { title: "Graphic Design", description: "Social media & brand visuals", icon: Palette },
  { title: "Motion Graphics", description: "Animated content & explainer videos", icon: Zap },
];

// Animation variants for scroll reveals
const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" }
  }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

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

      {/* Hero Section - Scrollytelling */}
      <CreativeScroll />

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
                onClick={() => navigate("/portfolio")}
              >
                {/* Placeholder Image */}
                <div className="w-full h-full bg-transparent flex items-center justify-center">
                  <div className="text-center">
                    <div className="w-16 h-16 mx-auto mb-4 bg-orange-600/20 rounded-full flex items-center justify-center">
                      <svg
                        className="w-8 h-8 text-orange-500"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={1.5}
                          d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                        />
                      </svg>
                    </div>
                    <p className="text-white font-semibold">{item.title}</p>
                    <p className="text-gray-400 text-sm mt-2">{item.category}</p>
                  </div>
                </div>

                {/* Hover Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
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
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">What I Do</h2>
            <p className="text-xl text-gray-400">End-to-end visual solutions for brands and individuals</p>
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
                I'm a creative professional focused on storytelling through visuals, helping brands communicate clearly and emotionally across platforms.
              </p>
              <p className="text-lg text-gray-400">
                With 3+ years of experience in digital marketing and content creation, I specialize in creating high-impact content that drives engagement, conversions, and brand awareness.
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
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-gray-900/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Sub-Brand & Concept Projects Section */}
      <section className="relative py-20 px-4 sm:px-6 lg:px-8 border-t border-gray-800">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
            className="mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">Sub-Brand & Concept Projects</h2>
            <p className="text-xl text-gray-400 max-w-2xl">Creative explorations and brand development projects</p>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="grid grid-cols-1 md:grid-cols-2 gap-8"
          >
            {[1, 2].map((idx) => (
              <motion.div
                key={idx}
                variants={fadeInUp}
                className="bg-gray-900/40 backdrop-blur-md border border-white/5 rounded-xl p-8 hover:border-orange-500/50 transition-all duration-300"
              >
                <div className="w-16 h-16 bg-gray-800 rounded-lg mb-6" />
                <h3 className="text-2xl font-bold text-white mb-4">Project {idx}</h3>
                <div className="space-y-3">
                  <div>
                    <p className="text-sm text-gray-500 uppercase tracking-wide">Purpose</p>
                    <p className="text-gray-300 mt-1">Brand identity and creative direction</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
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
            {[1, 2].map((idx) => (
              <motion.div
                key={idx}
                variants={fadeInUp}
                className="bg-gray-900/40 backdrop-blur-md border border-white/5 rounded-xl p-8 hover:border-orange-500/50 transition-all duration-300"
              >
                <h3 className="text-2xl font-bold text-white mb-6">Case Study {idx}</h3>
                <div className="space-y-4">
                  <div>
                    <p className="text-sm text-gray-500 uppercase tracking-wide">Problem Statement</p>
                    <p className="text-gray-300 mt-1">Strategic challenge description</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 uppercase tracking-wide">Results</p>
                    <p className="text-orange-400 font-semibold mt-1">Significant impact achieved</p>
                  </div>
                </div>
                <button className="mt-6 px-4 py-2 bg-orange-600/10 text-orange-400 rounded-lg hover:bg-orange-600/20 transition-colors text-sm font-medium">
                  Download Case Study
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
              <p className="text-gray-400 text-sm">Visual Storyteller & Digital Creator</p>
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
