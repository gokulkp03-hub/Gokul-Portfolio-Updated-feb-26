import { useLocation } from "wouter";
import { portfolioData } from "@/lib/portfolioData";
import { ArrowRight, ArrowLeft } from "lucide-react";

export default function Portfolio() {
  const [, navigate] = useLocation();

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-950 to-black pt-24 pb-16">
      {/* Header */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 mb-16">
        <div className="animate-slideDown">
          <button
            onClick={() => navigate("/")}
            className="flex items-center gap-2 px-4 py-2 rounded-full bg-gray-900/30 backdrop-blur-md border border-white/10 text-gray-400 hover:text-orange-500 hover:border-orange-500/50 transition-all duration-300 mb-8 group/nav w-fit"
          >
            <ArrowLeft className="w-4 h-4 group-hover/nav:-translate-x-1 transition-transform" />
            <span className="text-sm font-medium">Home</span>
          </button>

          <h1 className="text-5xl md:text-6xl font-bold mb-4">
            <span className="text-orange-500">Portfolio</span>
          </h1>
          <p className="text-xl text-gray-400 max-w-2xl">
            Explore my work across Video Production, Photography, Graphic Design, and Performance Marketing.
          </p>
        </div>
      </div>

      {/* Services Grid */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {portfolioData.services.map((service, index) => (
            <button
              key={service.id}
              onClick={() => navigate(`/portfolio/${service.id}`)}
              className="group relative overflow-hidden rounded-xl bg-gray-900/40 backdrop-blur-md border border-white/5 hover:border-orange-500/50 hover:bg-gray-900/60 transition-all duration-300 p-8 text-left h-full"
              style={{
                animation: `slideUp 0.6s ease-out ${index * 0.1}s both`,
              }}
            >
              {/* Hover gradient background */}
              <div className="absolute inset-0 bg-gradient-to-br from-orange-600/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

              {/* Content */}
              <div className="relative z-10 flex flex-col h-full">
                <div className="flex-1">
                  <div className="mb-4 opacity-80 group-hover:opacity-100 transition-opacity">
                    {service.icon}
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-2 group-hover:text-orange-400 transition-colors">
                    {service.name}
                  </h3>
                  <p className="text-gray-400 text-sm mb-4">{service.description}</p>
                </div>

                {/* Category count and arrow */}
                <div className="flex items-center justify-between">
                  <span className="text-xs text-gray-500">
                    {service.categories.length} categories
                  </span>
                  <svg
                    className="w-5 h-5 text-orange-500 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </div>
              </div>

              {/* Shimmer effect on hover */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent opacity-0 group-hover:opacity-100 group-hover:animate-shimmer" />
            </button>
          ))}
        </div>
      </div>

      {/* Quick Links Section */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 mt-20">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Featured Work */}
          <div className="rounded-xl bg-gray-900/40 backdrop-blur-md border border-white/5 hover:border-orange-500/50 transition-all duration-300 p-8 animate-slideUp" style={{ animationDelay: "0.3s" }}>
            <h3 className="text-2xl font-bold text-white mb-4">Featured Work</h3>
            <p className="text-gray-400 mb-6">
              Check out some of my most recent and impactful projects across different disciplines.
            </p>
            <button
              onClick={() => navigate("/portfolio/video-production")}
              className="inline-flex items-center gap-2 px-6 py-3 bg-orange-600 hover:bg-orange-700 text-white rounded-lg transition-colors font-semibold"
            >
              View Video Production <ArrowRight size={18} />
            </button>
          </div>

          {/* About Portfolio */}
          <div className="rounded-xl bg-gray-900/40 backdrop-blur-md border border-white/5 hover:border-orange-500/50 transition-all duration-300 p-8 animate-slideUp" style={{ animationDelay: "0.4s" }}>
            <h3 className="text-2xl font-bold text-white mb-4">About My Work</h3>
            <p className="text-gray-400 mb-6">
              Each project showcases my expertise in creating compelling visual content that drives engagement and delivers results for brands and individuals.
            </p>
            <button
              onClick={() => navigate("/experience")}
              className="inline-flex items-center gap-2 px-6 py-3 bg-gray-800 hover:bg-gray-700 text-white rounded-lg transition-colors font-semibold"
            >
              View Experience <ArrowRight size={18} />
            </button>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 mt-20">
        <div className="rounded-xl bg-gradient-to-r from-orange-600/20 to-orange-500/10 border border-orange-500/30 p-12 text-center animate-slideUp" style={{ animationDelay: "0.5s" }}>
          <h2 className="text-4xl font-bold text-white mb-4">Ready to collaborate?</h2>
          <p className="text-gray-300 mb-8 max-w-2xl mx-auto">
            Let's discuss your project and how I can bring your vision to life with creative content and strategic execution.
          </p>
          <button
            onClick={() => navigate("/#contact")}
            className="inline-flex items-center gap-2 px-8 py-4 bg-orange-600 hover:bg-orange-700 text-white rounded-lg transition-colors font-semibold text-lg"
          >
            Get in Touch <ArrowRight size={20} />
          </button>
        </div>
      </div>

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
