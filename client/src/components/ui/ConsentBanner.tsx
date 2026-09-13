import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "wouter";
import { ShieldCheck, X } from "lucide-react";

export function ConsentBanner() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    try {
      const storedConsent = localStorage.getItem("cookie_consent");
      if (!storedConsent) {
        // Delay showing banner slightly for better UX
        const timer = setTimeout(() => setIsVisible(true), 1200);
        return () => clearTimeout(timer);
      } else if (storedConsent === "granted") {
        updateConsentState("granted");
      } else {
        updateConsentState("denied");
      }
    } catch {
      // localStorage disabled or not available
    }
  }, []);

  const updateConsentState = (state: "granted" | "denied") => {
    if (typeof window !== "undefined" && typeof (window as any).gtag === "function") {
      (window as any).gtag("consent", "update", {
        analytics_storage: state,
        ad_storage: state,
        ad_user_data: state,
        ad_personalization: state,
      });
    }
  };

  const handleAcceptAll = () => {
    try {
      localStorage.setItem("cookie_consent", "granted");
    } catch {}
    updateConsentState("granted");
    setIsVisible(false);
  };

  const handleReject = () => {
    try {
      localStorage.setItem("cookie_consent", "denied");
    } catch {}
    updateConsentState("denied");
    setIsVisible(false);
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: 20, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 20, scale: 0.95 }}
          transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
          className="fixed bottom-20 md:bottom-6 left-4 right-4 md:left-6 md:right-auto md:max-w-sm z-[140] pointer-events-auto"
          role="region"
          aria-label="Cookie and Privacy Consent"
        >
          <div className="bg-zinc-950/90 backdrop-blur-xl border border-white/10 rounded-2xl p-3.5 sm:p-4 shadow-2xl text-foreground text-xs leading-relaxed relative overflow-hidden">
            {/* Subtle glow */}
            <div className="absolute top-0 right-0 w-24 h-24 bg-orange-500/10 blur-xl rounded-full pointer-events-none" />

            <div className="flex items-start gap-2.5 relative z-10">
              <div className="w-6 h-6 rounded-md bg-orange-500/10 border border-orange-500/20 text-orange-500 flex items-center justify-center flex-shrink-0 mt-0.5">
                <ShieldCheck className="w-3.5 h-3.5" />
              </div>
              <div className="flex-1 pr-1">
                <p className="text-zinc-300 text-[11px] leading-snug">
                  We use cookies for analytics and performance.{" "}
                  <Link href="/privacy" className="text-orange-400 hover:underline">
                    Policy
                  </Link>
                </p>
              </div>
              <button
                onClick={handleReject}
                className="text-zinc-500 hover:text-white transition-colors p-0.5 -mt-0.5 -mr-0.5"
                aria-label="Dismiss cookie notice"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            </div>

            <div className="flex items-center gap-2 mt-2.5 pt-2 border-t border-white/5 relative z-10">
              <button
                onClick={handleReject}
                className="flex-1 px-2.5 py-1.5 rounded-lg text-[10px] font-medium text-zinc-400 hover:text-white bg-white/5 hover:bg-white/10 transition-colors text-center cursor-pointer"
              >
                Essential
              </button>
              <button
                onClick={handleAcceptAll}
                className="flex-1 px-2.5 py-1.5 rounded-lg text-[10px] font-bold text-white bg-orange-500 hover:bg-orange-600 shadow-sm shadow-orange-500/20 transition-all text-center cursor-pointer"
              >
                Accept All
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
