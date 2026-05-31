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
                <div className="fixed bottom-0 left-0 right-0 z-[60] p-4 md:p-8 pointer-events-none flex justify-center md:justify-end">
                    <motion.div 
                        initial={{ y: 100, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        exit={{ y: 100, opacity: 0 }}
                        className="pointer-events-auto flex items-center gap-2 bg-black/80 backdrop-blur-2xl border border-white/10 rounded-full p-2 pr-6 shadow-2xl md:hidden"
                    >
                        <a 
                            href="https://wa.me/971545264632" 
                            target="_blank"
                            rel="noopener noreferrer"
                            className="w-12 h-12 rounded-full bg-green-500 text-white flex items-center justify-center hover:bg-green-600 transition-colors"
                        >
                            <MessageCircle size={24} fill="currentColor" />
                        </a>
                        <div className="flex flex-col">
                            <span className="text-[10px] text-white/40 uppercase tracking-widest font-bold">Quick Contact</span>
                            <span className="text-xs text-white font-medium">WhatsApp Me</span>
                        </div>
                    </motion.div>

                    {/* Desktop Floating Button */}
                    <motion.a
                        href="https://wa.me/971545264632"
                        target="_blank"
                        rel="noopener noreferrer"
                        initial={{ scale: 0, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 0, opacity: 0 }}
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        className="hidden md:flex pointer-events-auto w-16 h-16 bg-green-500 text-white rounded-full shadow-lg hover:bg-green-600 transition-colors items-center justify-center cursor-pointer relative group"
                        aria-label="Chat on WhatsApp"
                    >
                        <MessageCircle size={28} fill="currentColor" />
                        <motion.div
                            animate={{ scale: [1, 1.6], opacity: [0.3, 0] }}
                            transition={{ duration: 2, repeat: Infinity }}
                            className="absolute inset-0 rounded-full bg-green-500"
                        />
                        <span className="absolute right-full mr-4 px-4 py-2 bg-black text-white rounded-xl text-xs font-bold whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity border border-white/10">
                            Chat on WhatsApp
                        </span>
                    </motion.a>
                </div>
            )}
        </AnimatePresence>
    );
}
