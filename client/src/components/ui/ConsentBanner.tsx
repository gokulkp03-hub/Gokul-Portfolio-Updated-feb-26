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
          initial={{ opacity: 0, y: 30, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 30, scale: 0.95 }}
          transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
          className="fixed bottom-4 left-4 right-4 md:left-auto md:right-6 md:max-w-md z-[150]"
          role="region"
          aria-label="Cookie and Privacy Consent"
        >
          <div className="bg-zinc-950/95 backdrop-blur-xl border border-white/10 rounded-2xl p-5 shadow-2xl text-foreground text-xs leading-relaxed relative overflow-hidden">
            {/* Subtle background glow */}
            <div className="absolute top-0 left-0 w-32 h-32 bg-orange-500/10 blur-2xl rounded-full pointer-events-none" />

            <div className="flex items-start gap-3 mb-3 relative z-10">
              <div className="w-8 h-8 rounded-lg bg-orange-500/10 border border-orange-500/20 text-orange-500 flex items-center justify-center flex-shrink-0">
                <ShieldCheck className="w-4 h-4" />
              </div>
              <div className="flex-1">
                <h3 className="font-display font-bold text-sm text-white tracking-wide uppercase">Privacy &amp; Analytics</h3>
                <p className="text-muted-foreground mt-1">
                  We use cookies and privacy-first analytics to measure site performance and deliver conversion-focused creative. Review our{" "}
                  <Link href="/privacy" className="text-orange-400 underline hover:text-orange-300">
                    Privacy Policy
                  </Link>{" "}
                  for full technical details.
                </p>
              </div>
              <button
                onClick={handleReject}
                className="text-muted-foreground hover:text-white transition-colors p-1"
                aria-label="Dismiss cookie notice"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="flex items-center gap-2 pt-2 border-t border-white/5 relative z-10">
              <button
                onClick={handleReject}
                className="flex-1 px-3 py-2 rounded-xl text-[11px] font-medium text-muted-foreground hover:text-white bg-white/5 hover:bg-white/10 border border-white/5 transition-colors text-center cursor-pointer"
              >
                Essential Only
              </button>
              <button
                onClick={handleAcceptAll}
                className="flex-1 px-3 py-2 rounded-xl text-[11px] font-bold text-white bg-orange-500 hover:bg-orange-600 shadow-md shadow-orange-500/20 transition-all text-center cursor-pointer"
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
