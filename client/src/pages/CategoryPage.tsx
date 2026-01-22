import { useParams, useLocation } from "wouter";
import { getServiceById, getCategoryByServiceAndCategory } from "@/lib/portfolioData";
import { ArrowLeft, X, ChevronLeft, ChevronRight } from "lucide-react";
import { useEffect, useState, useCallback } from "react";
import { weddingImages } from "@/data/photography/wedding";
import { brands } from "@/data/brands";

export default function CategoryPage() {
  const params = useParams();
  const [, navigate] = useLocation();
  const service = getServiceById(params.service || "");
  const category = getCategoryByServiceAndCategory(params.service || "", params.category || "");

  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [params.service, params.category]);

  // Handle keyboard navigation for lightbox
  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    if (lightboxIndex === null) return;
    if (e.key === "Escape") setLightboxIndex(null);
    if (e.key === "ArrowLeft") handlePrev();
    if (e.key === "ArrowRight") handleNext();
  }, [lightboxIndex]);

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

  // Determine content based on category
  const isWedding = params.category === "wedding";
  const isSocialMedia = params.category === "social-media";
  const contentImages = isWedding ? weddingImages : []; // Add other categories here later

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
              : category.type === "video"
                ? "Explore our video production work"
                : "Capturing moments that last a lifetime"}
          </p>
        </div>
      </div>

      {/* Content Grid */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {isSocialMedia ? (
          // Brand Grid
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
                {/* Brand Name */}
                <h3 className="text-2xl font-bold text-white group-hover:text-orange-500 transition-colors text-center mb-2">
                  {brand.name}
                </h3>
                <p className="text-gray-400 text-sm text-center">
                  {brand.items.length} Items
                </p>

                {/* Glow effect */}
                <div className="absolute inset-0 bg-orange-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />

                {/* Shimmer effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent opacity-0 group-hover:opacity-100 group-hover:animate-shimmer" />
              </div>
            ))}
          </div>
        ) : category.type === "image" && contentImages.length > 0 ? (
          // Image Grid
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {contentImages.map((image, index) => (
              <div
                key={image.id}
                className="group relative overflow-hidden rounded-xl bg-gray-900/40 backdrop-blur-md border border-white/5 cursor-pointer aspect-[3/4]"
                onClick={() => setLightboxIndex(index)}
                style={{
                  animation: `slideUp 0.6s ease-out ${index * 0.1}s both`,
                }}
              >
                <img
                  src={image.src}
                  alt={image.title || "Gallery Image"}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  loading="lazy"
                />

                {/* Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6">
                  <h3 className="text-white font-bold text-lg transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                    {image.title}
                  </h3>
                  {image.location && (
                    <p className="text-orange-400 text-sm transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300 delay-75">
                      {image.location}
                    </p>
                  )}
                </div>

                {/* Shimmer effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent opacity-0 group-hover:opacity-100 group-hover:animate-shimmer" />
              </div>
            ))}
          </div>
        ) : category.type === "video" ? (
          // Video Grid Placeholder (To be implemented dynamically if needed)
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Existing video code or placeholder */}
            <div className="col-span-full text-center py-20 bg-gray-900/30 rounded-xl border border-white/5">
              <p className="text-gray-400">Video gallery coming soon.</p>
            </div>
          </div>
        ) : (
          // Empty State
          <div className="mt-16 p-8 rounded-xl bg-gray-900/50 border border-gray-800 text-center">
            <p className="text-gray-400 mb-2">Portfolio items coming soon</p>
            <p className="text-gray-500 text-sm">
              We're currently updating this category with fresh content. Check back soon!
            </p>
          </div>
        )}
      </div>

      {/* Lightbox Modal */}
      {lightboxIndex !== null && contentImages.length > 0 && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 backdrop-blur-xl animate-fadeIn"
          onClick={() => setLightboxIndex(null)}
        >
          {/* Close Button */}
          <button
            className="absolute top-4 right-4 p-2 text-gray-400 hover:text-white hover:bg-white/10 rounded-full transition-all z-50"
            onClick={() => setLightboxIndex(null)}
            aria-label="Close lightbox"
          >
            <X size={32} />
          </button>

          {/* Navigation Buttons */}
          <button
            className="absolute left-4 p-4 text-gray-400 hover:text-white hover:bg-white/10 rounded-full transition-all md:block hidden"
            onClick={(e) => { e.stopPropagation(); handlePrev(); }}
            aria-label="Previous image"
          >
            <ChevronLeft size={40} />
          </button>

          <button
            className="absolute right-4 p-4 text-gray-400 hover:text-white hover:bg-white/10 rounded-full transition-all md:block hidden"
            onClick={(e) => { e.stopPropagation(); handleNext(); }}
            aria-label="Next image"
          >
            <ChevronRight size={40} />
          </button>

          {/* Main Image */}
          <div
            className="relative max-w-7xl max-h-[90vh] w-full h-full flex items-center justify-center p-4"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={contentImages[lightboxIndex].src}
              alt={contentImages[lightboxIndex].title}
              className="max-w-full max-h-full object-contain rounded-lg shadow-2xl"
            />

            {/* Caption */}
            <div className="absolute bottom-4 left-0 right-0 text-center pointer-events-none">
              <h3 className="text-white text-xl font-bold bg-black/50 inline-block px-4 py-2 rounded-lg backdrop-blur-md">
                {contentImages[lightboxIndex].title}
              </h3>
              {contentImages[lightboxIndex].location && (
                <p className="text-gray-300 text-sm mt-1 bg-black/50 inline-block px-3 py-1 rounded-lg backdrop-blur-md ml-2">
                  {contentImages[lightboxIndex].location}
                </p>
              )}
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
