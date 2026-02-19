import { X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useEffect } from "react";

interface ShowreelModalProps {
    isOpen: boolean;
    onClose: () => void;
    videoId?: string; // YouTube video ID or URL
}

export default function ShowreelModal({ isOpen, onClose, videoId = "VIDEO_ID" }: ShowreelModalProps) {
    // Lock body scroll when modal is open
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "unset";
        }
        return () => {
            document.body.style.overflow = "unset";
        };
    }, [isOpen]);

    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="fixed inset-0 z-[100] flex items-center justify-center bg-black/95 backdrop-blur-xl p-4"
                    onClick={onClose}
                >
                    <button
                        className="absolute top-6 right-6 p-2 bg-white/10 rounded-full text-white hover:bg-white/20 transition-colors z-10"
                        onClick={onClose}
                        aria-label="Close modal"
                    >
                        <X size={24} />
                    </button>

                    <motion.div
                        initial={{ scale: 0.9, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 0.9, opacity: 0 }}
                        transition={{ type: "spring", damping: 25, stiffness: 300 }}
                        className="w-full max-w-6xl aspect-video rounded-2xl overflow-hidden shadow-2xl border border-white/10 bg-black relative"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <iframe
                            className="w-full h-full"
                            src={videoId.includes('_') || videoId.match(/^[0-9]+$/)
                                ? `https://player.cloudinary.com/embed/?cloud_name=dgmieaf9g&public_id=${videoId}&autoplay=true`
                                : `https://www.youtube.com/embed/${videoId}?autoplay=1&modestbranding=1&rel=0`}
                            title="Showreel"
                            allow="autoplay; encrypted-media; picture-in-picture"
                            allowFullScreen
                        />
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
