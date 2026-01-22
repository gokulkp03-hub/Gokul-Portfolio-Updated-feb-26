import { useParams, useLocation } from "wouter";
import { getBrandById } from "@/data/brands";
import { ArrowLeft, X, ChevronLeft, ChevronRight } from "lucide-react";
import { useEffect, useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function BrandGallery() {
    const params = useParams();
    const [, navigate] = useLocation();
    const brand = getBrandById(params.brand || "");
    const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [params.brand]);

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

    if (!brand) {
        return (
            <div className="min-h-screen bg-black flex items-center justify-center">
                <div className="text-center">
                    <h1 className="text-4xl font-bold text-white mb-4">Brand Not Found</h1>
                    <button
                        onClick={() => navigate("/portfolio/graphic-design/social-media")}
                        className="inline-flex items-center gap-2 px-6 py-3 bg-orange-600 hover:bg-orange-700 text-white rounded-lg transition-colors"
                    >
                        <ArrowLeft size={20} />
                        Back to Brand Grid
                    </button>
                </div>
            </div>
        );
    }

    const handleNext = () => {
        setLightboxIndex((prev) => (prev !== null ? (prev + 1) % brand.items.length : null));
    };

    const handlePrev = () => {
        setLightboxIndex((prev) => (prev !== null ? (prev - 1 + brand.items.length) % brand.items.length : null));
    };

    return (
        <div className="min-h-screen bg-black pt-24 pb-16">
            {/* Breadcrumbs */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-12">
                <div className="flex items-center gap-2 text-sm text-gray-400">
                    <button onClick={() => navigate("/portfolio")} className="hover:text-orange-500">Portfolio</button>
                    <span>/</span>
                    <button onClick={() => navigate("/portfolio/graphic-design/social-media")} className="hover:text-orange-500">Social Media Graphics</button>
                    <span>/</span>
                    <span className="text-white">{brand.name}</span>
                </div>
            </div>

            {/* Header */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16">
                <button
                    onClick={() => navigate("/portfolio/graphic-design/social-media")}
                    className="inline-flex items-center gap-2 mb-6 px-4 py-2 rounded-lg bg-gray-900/50 border border-white/5 text-gray-300 hover:text-white transition-all"
                >
                    <ArrowLeft size={18} /> Back to Brand Grid
                </button>
                <h1 className="text-5xl md:text-6xl font-bold text-white mb-4">{brand.name}</h1>
                {brand.description && <p className="text-xl text-gray-400 max-w-2xl">{brand.description}</p>}
            </div>

            {/* Gallery Grid */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="columns-1 sm:columns-2 lg:columns-3 gap-6 space-y-6">
                    {brand.items.map((item, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.05 }}
                            className="relative overflow-hidden rounded-xl bg-gray-900/40 border border-white/5 cursor-pointer group break-inside-avoid"
                            onClick={() => setLightboxIndex(index)}
                        >
                            <img
                                src={item}
                                alt={`${brand.name} graphic ${index + 1}`}
                                className="w-full h-auto object-cover transition-transform duration-500 group-hover:scale-105"
                                loading="lazy"
                            />
                            <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                        </motion.div>
                    ))}
                </div>
            </div>

            {/* Lightbox Modal */}
            <AnimatePresence>
                {lightboxIndex !== null && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 backdrop-blur-xl"
                        onClick={() => setLightboxIndex(null)}
                    >
                        <button className="absolute top-4 right-4 p-2 text-white/50 hover:text-white z-50" onClick={() => setLightboxIndex(null)} aria-label="Close Lightbox">
                            <X size={32} />
                        </button>

                        <button className="absolute left-4 p-4 text-white/50 hover:text-white hidden md:block" onClick={(e) => { e.stopPropagation(); handlePrev(); }} aria-label="Previous Image">
                            <ChevronLeft size={48} />
                        </button>

                        <button className="absolute right-4 p-4 text-white/50 hover:text-white hidden md:block" onClick={(e) => { e.stopPropagation(); handleNext(); }} aria-label="Next Image">
                            <ChevronRight size={48} />
                        </button>

                        <motion.div
                            initial={{ scale: 0.9, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.9, opacity: 0 }}
                            className="relative max-w-7xl max-h-[90vh] w-full h-full flex items-center justify-center p-4"
                            onClick={(e) => e.stopPropagation()}
                        >
                            <img
                                src={brand.items[lightboxIndex]}
                                alt={`${brand.name} graphic`}
                                className="max-w-full max-h-full object-contain rounded-lg shadow-2xl"
                            />
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
