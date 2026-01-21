import { Button } from "@/components/ui/button";
import { ArrowRight, Video, Camera, Edit3, Palette, Zap, ExternalLink } from "lucide-react";
import { useLocation } from "wouter";
import CreativeScroll from "../components/CreativeScroll";

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
    <div className="min-h-screen bg-gradient-to-b from-gray-950 to-black">

      {/* Hero Section - Centered */}
      {/* Scrollytelling Hero Section */}
      <CreativeScroll />

      {/* Featured Work Section */}
      <section className="relative py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="mb-16 animate-slideUp">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">Featured Work</h2>
            <p className="text-xl text-gray-400 max-w-2xl">A selection of my most impactful projects</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {FEATURED_WORK.map((item, index) => (
              <div
                key={item.id}
                className="group relative overflow-hidden rounded-xl bg-gray-900/40 backdrop-blur-md border border-white/5 aspect-square cursor-pointer hover:border-orange-500/50 transition-all duration-300"
                onClick={() => navigate("/portfolio")}
                style={{
                  animation: `slideUp 0.6s ease-out ${index * 0.1}s both`,
                }}
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

                {/* Shimmer Effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent opacity-0 group-hover:opacity-100 group-hover:animate-shimmer" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Brands & Clients Section */}
      <section className="relative py-20 px-4 sm:px-6 lg:px-8 border-t border-gray-800">
        <div className="max-w-6xl mx-auto">
          <div className="mb-16 animate-slideUp">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">Brands I've Worked With</h2>
            <p className="text-xl text-gray-400 max-w-2xl">Trusted by leading brands and companies across various industries</p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
            {[1, 2, 3, 4, 5, 6].map((idx) => (
              <div
                key={idx}
                className="group relative overflow-hidden rounded-lg bg-gray-900/40 backdrop-blur-md border border-white/5 hover:border-orange-500/50 transition-all duration-300 aspect-square flex items-center justify-center p-4"
                style={{
                  animation: `slideUp 0.6s ease-out ${idx * 0.08}s both`,
                }}
              >
                <div className="text-center space-y-2">
                  <div className="w-12 h-12 mx-auto bg-gray-800 rounded-lg group-hover:bg-orange-600/20 transition-colors" />
                  <p className="text-xs text-gray-500 group-hover:text-gray-400 transition-colors">Brand {idx}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="relative py-20 px-4 sm:px-6 lg:px-8 bg-gray-900/50 border-t border-gray-800">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16 animate-slideUp">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">What I Do</h2>
            <p className="text-xl text-gray-400">End-to-end visual solutions for brands and individuals</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
            {SERVICES.map((service, index) => {
              const IconComponent = service.icon;
              return (
                <div
                  key={service.title}
                  className="group relative overflow-hidden rounded-xl bg-gray-900/40 backdrop-blur-md border border-white/5 hover:border-orange-500/50 hover:bg-gray-900/60 transition-all duration-300 p-6 text-center"
                  style={{
                    animation: `slideUp 0.6s ease-out ${index * 0.1}s both`,
                  }}
                >
                  {/* Hover gradient background */}
                  <div className="absolute inset-0 bg-gradient-to-br from-orange-600/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

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

                  {/* Shimmer effect on hover */}
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent opacity-0 group-hover:opacity-100 group-hover:animate-shimmer" />
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* About Preview Section */}
      <section className="relative py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            {/* Left Column - Text */}
            <div className="space-y-6 animate-slideUp">
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
            </div>

            {/* Right Column - Image */}
            <div className="relative animate-slideUp" style={{ animationDelay: "0.1s" }}>
              <div className="group relative rounded-2xl overflow-hidden border border-white/10 bg-gray-900/40 backdrop-blur-md hover:border-orange-500/50 transition-all duration-300 shadow-2xl">
                <div className="aspect-[3/4] w-full relative">
                  <img
                    src="/images/profile/profile.jpg"
                    alt="Gokul KP"
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  {/* Subtle gradient overlay for better text contrast if needed, or just aesthetic depth */}
                  <div className="absolute inset-0 bg-gradient-to-t from-gray-900/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Sub-Brand & Concept Projects Section */}
      <section className="relative py-20 px-4 sm:px-6 lg:px-8 border-t border-gray-800">
        <div className="max-w-6xl mx-auto">
          <div className="mb-16 animate-slideUp">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">Sub-Brand & Concept Projects</h2>
            <p className="text-xl text-gray-400 max-w-2xl">Creative explorations and brand development projects</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[1, 2].map((idx) => (
              <div
                key={idx}
                className="bg-gray-900/40 backdrop-blur-md border border-white/5 rounded-xl p-8 hover:border-orange-500/50 transition-all duration-300"
                style={{
                  animation: `slideUp 0.6s ease-out ${idx * 0.1}s both`,
                }}
              >
                <div className="w-16 h-16 bg-gray-800 rounded-lg mb-6" />
                <h3 className="text-2xl font-bold text-white mb-4">Project {idx}</h3>
                <div className="space-y-3">
                  <div>
                    <p className="text-sm text-gray-500 uppercase tracking-wide">Purpose</p>
                    <p className="text-gray-300 mt-1">Brand identity and creative direction</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 uppercase tracking-wide">Target Audience</p>
                    <p className="text-gray-300 mt-1">Specific market segment</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 uppercase tracking-wide">Creative Direction</p>
                    <p className="text-gray-300 mt-1">Unique visual approach</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="relative py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-orange-600/20 to-orange-500/10 border-t border-orange-500/30">
        <div className="max-w-4xl mx-auto text-center animate-slideUp">
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
        </div>
      </section>

      {/* Case Studies Section */}
      <section className="relative py-20 px-4 sm:px-6 lg:px-8 bg-gray-900/50 border-t border-gray-800">
        <div className="max-w-6xl mx-auto">
          <div className="mb-16 animate-slideUp">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">Case Studies</h2>
            <p className="text-xl text-gray-400 max-w-2xl">Strategic projects showcasing results and impact</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[1, 2].map((idx) => (
              <div
                key={idx}
                className="bg-gray-900/40 backdrop-blur-md border border-white/5 rounded-xl p-8 hover:border-orange-500/50 transition-all duration-300"
                style={{
                  animation: `slideUp 0.6s ease-out ${idx * 0.1}s both`,
                }}
              >
                <h3 className="text-2xl font-bold text-white mb-6">Case Study {idx}</h3>
                <div className="space-y-4">
                  <div>
                    <p className="text-sm text-gray-500 uppercase tracking-wide">Problem Statement</p>
                    <p className="text-gray-300 mt-1">Strategic challenge description</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 uppercase tracking-wide">My Role</p>
                    <p className="text-gray-300 mt-1">Lead Creative Director</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 uppercase tracking-wide">Strategy</p>
                    <p className="text-gray-300 mt-1">Multi-platform content approach</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 uppercase tracking-wide">Execution</p>
                    <p className="text-gray-300 mt-1">Video, design, and social media</p>
                  </div>
                  <div className="pt-4 border-t border-gray-700">
                    <p className="text-sm text-gray-500 uppercase tracking-wide">Results</p>
                    <p className="text-orange-400 font-semibold mt-1">Significant impact achieved</p>
                  </div>
                </div>
                <button className="mt-6 px-4 py-2 bg-orange-600/10 text-orange-400 rounded-lg hover:bg-orange-600/20 transition-colors text-sm font-medium">
                  Download Case Study
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="relative py-20 px-4 sm:px-6 lg:px-8 border-t border-gray-800">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-8">Get in Touch</h2>
          <p className="text-lg text-gray-400 mb-12">
            Have a project in mind? Let's discuss how I can help bring your vision to life.
          </p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <a
              href="https://wa.me/919876543210"
              target="_blank"
              rel="noopener noreferrer"
              className="px-8 py-4 rounded-lg font-semibold bg-gray-900/40 backdrop-blur-md border border-white/10 text-white hover:bg-gray-900/60 hover:border-orange-500/50 hover:text-orange-500 transition-all duration-300 inline-flex items-center justify-center gap-2 group"
            >
              WhatsApp
              <ExternalLink className="w-4 h-4 text-gray-400 group-hover:text-orange-500 transition-colors" />
            </a>
            <a
              href="https://www.instagram.com/__agotime"
              target="_blank"
              rel="noopener noreferrer"
              className="px-8 py-4 rounded-lg font-semibold bg-gray-900/40 backdrop-blur-md border border-white/10 text-white hover:bg-gray-900/60 hover:border-orange-500/50 hover:text-orange-500 transition-all duration-300 inline-flex items-center justify-center gap-2 group"
            >
              Instagram
              <ExternalLink className="w-4 h-4 text-gray-400 group-hover:text-orange-500 transition-colors" />
            </a>
            <a
              href="https://www.linkedin.com/in/gokul-kp03"
              target="_blank"
              rel="noopener noreferrer"
              className="px-8 py-4 rounded-lg font-semibold bg-gray-900/40 backdrop-blur-md border border-white/10 text-white hover:bg-gray-900/60 hover:border-orange-500/50 hover:text-orange-500 transition-all duration-300 inline-flex items-center justify-center gap-2 group"
            >
              LinkedIn
              <ExternalLink className="w-4 h-4 text-gray-400 group-hover:text-orange-500 transition-colors" />
            </a>
          </div>
        </div>
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
            <div>
              <h4 className="text-white font-semibold mb-4">Navigation</h4>
              <ul className="space-y-2 text-sm">
                <li><a href="#" className="text-gray-400 hover:text-orange-400 transition-colors">Home</a></li>
                <li><a href="#" className="text-gray-400 hover:text-orange-400 transition-colors">Portfolio</a></li>
                <li><a href="#" className="text-gray-400 hover:text-orange-400 transition-colors">Services</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-4">Services</h4>
              <ul className="space-y-2 text-sm">
                <li><a href="#" className="text-gray-400 hover:text-orange-400 transition-colors">Videography</a></li>
                <li><a href="#" className="text-gray-400 hover:text-orange-400 transition-colors">Photography</a></li>
                <li><a href="#" className="text-gray-400 hover:text-orange-400 transition-colors">Design</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-4">Connect</h4>
              <ul className="space-y-2 text-sm">
                <li><a href="#" className="text-gray-400 hover:text-orange-400 transition-colors">Instagram</a></li>
                <li><a href="#" className="text-gray-400 hover:text-orange-400 transition-colors">LinkedIn</a></li>
                <li><a href="#" className="text-gray-400 hover:text-orange-400 transition-colors">Email</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 pt-8 text-center">
            <p className="text-gray-500 text-sm">2024 Gokul KP. All rights reserved.</p>
          </div>
        </div>
      </footer>

      <style>{`
        @keyframes slideUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes slideDown {
          from {
            opacity: 0;
            transform: translateY(-20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes shimmer {
          0% {
            transform: translateX(-100%);
          }
          100% {
            transform: translateX(100%);
          }
        }

        .animate-slideUp {
          animation: slideUp 0.6s ease-out;
        }

        .animate-slideDown {
          animation: slideDown 0.6s ease-out;
        }

        .animate-shimmer {
          animation: shimmer 2s infinite;
        }
      `}</style>
    </div>
  );
}
