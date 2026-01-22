import { useParams, useLocation } from "wouter";
import { getServiceById, getCategoryByServiceAndCategory } from "@/lib/portfolioData";
import { ArrowLeft, X, ChevronLeft, ChevronRight, Play } from "lucide-react";
import { useEffect, useState, useCallback } from "react";
import { brands } from "@/data/brands";
import { portfolioContent, PortfolioItem } from "@/data/portfolioContent";

export default function CategoryPage() {
  const params = useParams();
  const [, navigate] = useLocation();
  const service = getServiceById(params.service || "");
  const category = getCategoryByServiceAndCategory(params.service || "", params.category || "");

  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const [activeVideo, setActiveVideo] = useState<PortfolioItem | null>(null);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [params.service, params.category]);

  // Map internal service ID to portfolioContent keys if they differ
  const sectionKeyMap: Record<string, string> = {
    "video-production": "video-production",
    "photography": "photography",
    "graphic-design": "graphic-design",
    "marketing-growth": "marketing-growth"
  };

  const sectionKey = sectionKeyMap[params.service || ""] || params.service || "";
  const categoryItems = (portfolioContent as any)[sectionKey]?.[params.category || ""] || [];

  // Handle keyboard navigation for lightbox
  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    if (lightboxIndex !== null) {
      if (e.key === "Escape") setLightboxIndex(null);
      if (e.key === "ArrowLeft") handlePrev();
      if (e.key === "ArrowRight") handleNext();
    }
    if (activeVideo !== null && e.key === "Escape") {
      setActiveVideo(null);
    }
  }, [lightboxIndex, activeVideo]);

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [handleKeyDown]);

  if (!service || !category) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-gray-950 to-black flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-white mb-4">Category Not Found</h1>
          <button
            onClick={() => navigate("/portfolio")}
            className="inline-flex items-center gap-2 px-6 py-3 bg-orange-600 hover:bg-orange-700 text-white rounded-lg transition-colors"
          >
            <ArrowLeft size={20} />
            Back to Portfolio
          </button>
        </div>
      </div>
    );
  }

  const isSocialMedia = params.category === "social-media";
  const contentImages = categoryItems.filter(item => item.type === "image");

  const handleNext = () => {
    setLightboxIndex((prev) =>
      prev !== null ? (prev + 1) % contentImages.length : null
    );
  };

  const handlePrev = () => {
    setLightboxIndex((prev) =>
      prev !== null ? (prev - 1 + contentImages.length) % contentImages.length : null
    );
  };

  const getVideoEmbedUrl = (item: PortfolioItem) => {
    if (item.type === "youtube") {
      // Handle both standard and shorts URLs
      const videoId = item.url?.includes("v=")
        ? item.url.split("v=")[1].split("&")[0]
        : item.url?.split("/").pop();
      return `https://www.youtube.com/embed/${videoId}?autoplay=1`;
    }
    if (item.type === "vimeo") {
      const videoId = item.url?.split("/").pop();
      return `https://player.vimeo.com/video/${videoId}?autoplay=1`;
    }
    if (item.type === "cloudinary") {
      return `https://player.cloudinary.com/embed/?cloud_name=dgmieaf9g&public_id=${item.cloudinaryId}&autoplay=true`;
    }
    return "";
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-950 to-black pt-24 pb-16">
      {/* Breadcrumb Navigation */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 mb-12">
        <div className="flex items-center gap-2 text-sm text-gray-400 flex-wrap">
          <button
            onClick={() => navigate("/")}
            className="hover:text-orange-500 transition-colors"
          >
            Home
          </button>
          <span>/</span>
          <button
            onClick={() => navigate("/portfolio")}
            className="hover:text-orange-500 transition-colors"
          >
            Portfolio
          </button>
          <span>/</span>
          <button
            onClick={() => navigate(`/portfolio/${service.id}`)}
            className="hover:text-orange-500 transition-colors"
          >
            {service.name}
          </button>
          <span>/</span>
          <span className="text-white">{category.name}</span>
        </div>
      </div>

      {/* Header */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 mb-16">
        <button
          onClick={() => navigate(`/portfolio/${service.id}`)}
          className="inline-flex items-center gap-2 mb-6 px-4 py-2 rounded-lg bg-gray-900/50 hover:bg-gray-800 text-gray-300 hover:text-white transition-all border border-gray-800 hover:border-gray-700"
        >
          <ArrowLeft size={18} />
          Back to {service.name}
        </button>

        <div className="animate-slideDown">
          <h1 className="text-5xl md:text-6xl font-bold mb-4">
            <span className="text-white">{category.name}</span>
          </h1>
          <p className="text-xl text-gray-400">
            {isSocialMedia
              ? "Select a brand to view their social media graphics and ad creatives"
              : categoryItems.some(i => i.type !== "image")
                ? "Explore our video production work"
                : "Capturing moments that last a lifetime"}
          </p>
        </div>
      </div>

      {/* Content Grid */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {isSocialMedia ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {brands.map((brand, index) => (
              <div
                key={brand.id}
                className="group relative overflow-hidden rounded-xl bg-gray-900/40 backdrop-blur-md border border-white/5 cursor-pointer flex flex-col items-center justify-center aspect-square p-6 hover:border-orange-500/50 transition-all duration-300 hover:scale-105"
                onClick={() => navigate(`/portfolio/graphic-design/social-media/${brand.id}`)}
                style={{
                  animation: `slideUp 0.6s ease-out ${index * 0.1}s both`,
                }}
              >
                <h3 className="text-2xl font-bold text-white group-hover:text-orange-500 transition-colors text-center mb-2">
                  {brand.name}
                </h3>
                <p className="text-gray-400 text-sm text-center">
                  {brand.items.length} Items
                </p>
                <div className="absolute inset-0 bg-orange-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent opacity-0 group-hover:opacity-100 group-hover:animate-shimmer" />
              </div>
            ))}
          </div>
        ) : categoryItems.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {categoryItems.map((item, index) => (
              <div
                key={item.id}
                className={`group relative overflow-hidden rounded-xl bg-gray-900/40 backdrop-blur-md border border-white/5 cursor-pointer flex flex-col transition-all duration-300 hover:border-orange-500/30 ${item.aspectRatio === "vertical" ? "max-w-[320px] mx-auto w-full" : ""
                  }`}
                style={{
                  animation: `slideUp 0.6s ease-out ${index * 0.1}s both`,
                }}
                onClick={() => {
                  if (item.type === "image") {
                    const imgIndex = contentImages.findIndex(i => i.id === item.id);
                    setLightboxIndex(imgIndex);
                  } else {
                    setActiveVideo(item);
                  }
                }}
              >
                <div className={`${item.type === "image"
                    ? "aspect-[3/4]"
                    : item.aspectRatio === "vertical"
                      ? "aspect-[9/16]"
                      : "aspect-video"
                  } overflow-hidden relative`}>
                  <img
                    src={item.type === "image" ? item.src : item.thumbnail}
                    alt={item.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    loading="lazy"
                  />

                  {item.type !== "image" && (
                    <div className="absolute inset-0 flex items-center justify-center bg-black/40 group-hover:bg-black/20 transition-colors">
                      <div className="w-16 h-16 rounded-full bg-orange-500/90 flex items-center justify-center text-white scale-90 group-hover:scale-100 transition-transform shadow-xl">
                        <Play size={32} className="ml-1" />
                      </div>
                    </div>
                  )}

                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6">
                    <h3 className="text-white font-bold text-lg transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300 line-clamp-1">
                      {item.title}
                    </h3>
                    {item.description && (
                      <p className="text-gray-300 text-sm line-clamp-2 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300 delay-75">
                        {item.description}
                      </p>
                    )}
                  </div>
                </div>
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent opacity-0 group-hover:opacity-100 group-hover:animate-shimmer" />
              </div>
            ))}
          </div>
        ) : (
          <div className="mt-16 p-8 rounded-xl bg-gray-900/50 border border-gray-800 text-center">
            <p className="text-gray-400 mb-2">Portfolio items coming soon</p>
            <p className="text-gray-500 text-sm">
              We're currently updating this category with fresh content. Check back soon!
            </p>
          </div>
        )}
      </div>

      {/* Video Modal */}
      {activeVideo && (
        <div
          className="fixed inset-0 z-[60] flex items-center justify-center bg-black/95 backdrop-blur-xl animate-fadeIn p-4"
          onClick={() => setActiveVideo(null)}
        >
          <button
            className="absolute top-4 right-4 p-2 text-gray-400 hover:text-white hover:bg-white/10 rounded-full transition-all z-[70]"
            onClick={() => setActiveVideo(null)}
          >
            <X size={32} />
          </button>

          <div className={`relative w-full shadow-2xl border border-white/10 rounded-2xl overflow-hidden bg-black ${activeVideo.aspectRatio === "vertical" ? "max-w-[400px] aspect-[9/16]" : "max-w-5xl aspect-video"
            }`} onClick={e => e.stopPropagation()}>
            <iframe
              src={getVideoEmbedUrl(activeVideo)}
              className="w-full h-full"
              allow="autoplay; fullscreen; encrypted-media; picture-in-picture"
              allowFullScreen
              frameBorder="0"
              title={activeVideo.title}
            ></iframe>
          </div>
        </div>
      )}

      {/* Lightbox Modal */}
      {lightboxIndex !== null && contentImages.length > 0 && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 backdrop-blur-xl animate-fadeIn"
          onClick={() => setLightboxIndex(null)}
        >
          <button
            className="absolute top-4 right-4 p-2 text-gray-400 hover:text-white hover:bg-white/10 rounded-full transition-all z-50"
            onClick={() => setLightboxIndex(null)}
          >
            <X size={32} />
          </button>

          <button
            className="absolute left-4 p-4 text-gray-400 hover:text-white hover:bg-white/10 rounded-full transition-all md:block hidden"
            onClick={(e) => { e.stopPropagation(); handlePrev(); }}
          >
            <ChevronLeft size={40} />
          </button>

          <button
            className="absolute right-4 p-4 text-gray-400 hover:text-white hover:bg-white/10 rounded-full transition-all md:block hidden"
            onClick={(e) => { e.stopPropagation(); handleNext(); }}
          >
            <ChevronRight size={40} />
          </button>

          <div
            className="relative max-w-7xl max-h-[90vh] w-full h-full flex items-center justify-center p-4"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={contentImages[lightboxIndex].src}
              alt={contentImages[lightboxIndex].title}
              className="max-w-full max-h-full object-contain rounded-lg shadow-2xl"
            />

            <div className="absolute bottom-4 left-0 right-0 text-center pointer-events-none">
              <h3 className="text-white text-xl font-bold bg-black/50 inline-block px-4 py-2 rounded-lg backdrop-blur-md">
                {contentImages[lightboxIndex].title}
              </h3>
            </div>
          </div>
        </div>
      )}

      <style>{`
        @keyframes slideUp {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes slideDown {
          from { opacity: 0; transform: translateY(-20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes shimmer {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        .animate-slideUp { animation: slideUp 0.6s ease-out; }
        .animate-slideDown { animation: slideDown 0.6s ease-out; }
        .animate-shimmer { animation: shimmer 2s infinite; }
        .animate-fadeIn { animation: fadeIn 0.3s ease-out; }
      `}</style>
    </div>
  );
}
