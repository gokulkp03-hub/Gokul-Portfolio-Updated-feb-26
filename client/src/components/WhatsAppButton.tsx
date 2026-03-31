import { MessageCircle } from "lucide-react";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function WhatsAppButton() {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const toggleVisibility = () => {
            if (window.scrollY > 300) {
                setIsVisible(true);
            } else {
                setIsVisible(false);
            }
        };

        window.addEventListener("scroll", toggleVisibility);
        return () => window.removeEventListener("scroll", toggleVisibility);
    }, []);

    return (
        <AnimatePresence>
            {isVisible && (
                <motion.a
                    href="https://wa.me/971545264632" // UAE number format
                    target="_blank"
                    rel="noopener noreferrer"
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0, opacity: 0 }}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    className="fixed bottom-6 right-6 z-40 p-4 bg-green-500 text-white rounded-full shadow-lg hover:bg-green-600 transition-colors flex items-center justify-center cursor-pointer mb-[env(safe-area-inset-bottom)]"
                    aria-label="Chat on WhatsApp"
                >
                    <MessageCircle size={28} fill="currentColor" className="text-white relative z-10" />
                    <motion.div
                        animate={{ scale: [1, 1.6, 2.2], opacity: [0.6, 0.2, 0] }}
                        transition={{ duration: 2, repeat: Infinity, ease: "easeOut" }}
                        className="absolute inset-0 rounded-full bg-green-500 -z-10"
                    />
                    <motion.div
                        animate={{ scale: [1, 1.4, 1.8], opacity: [0.6, 0.2, 0] }}
                        transition={{ duration: 2, delay: 0.5, repeat: Infinity, ease: "easeOut" }}
                        className="absolute inset-0 rounded-full bg-green-500 -z-10"
                    />
                    <span className="absolute right-full mr-3 bg-white text-black px-2 py-1 rounded text-xs font-bold whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity shadow-md hidden md:block">
                        Chat with me
                    </span>
                </motion.a>
            )}
        </AnimatePresence>
    );
}
