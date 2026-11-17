import { Mail, MessageCircle } from "lucide-react";
import { motion } from "framer-motion";
import { Link, useLocation } from "wouter";

const WHATSAPP_NUMBER = "971545264632";

const PAGE_LABELS: Record<string, string> = {
  "/": "your portfolio",
  "/marketing": "your performance marketing work",
  "/video": "your video production work",
  "/photo": "your photography",
  "/portfolio": "your portfolio archive",
  "/results": "your campaign results",
  "/services": "your services",
  "/about": "your profile",
  "/contact": "your contact page",
  "/marketing/aqua-care-uae": "the AquaCare case study",
  "/marketing/prepmeal": "the PrepMeal case study",
  "/marketing/steaburg-local-seo": "the Steaburg case study",
  "/marketing/aureum-asset-management": "the Aureum case study",
};

/** Pre-filled WhatsApp link that says which page the visitor came from. */
export function whatsappHref(path: string): string {
  const clean = path.split(/[?#]/)[0].replace(/\/+$/, "") || "/";
  const label =
    PAGE_LABELS[clean] ??
    (clean.startsWith("/blogs/") ? "one of your articles" : clean.split("/").length > 2 ? "one of your projects" : "your portfolio");
  const text = `Hi Gokul, I saw ${label} on gokulkp.com and I'd like to discuss a project.`;
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}`;
}

/**
 * Mobile: a slim contact bar fixed to the bottom of the screen. It never sits
 * on top of content because index.css reserves the same height at the bottom
 * of the page (see --mobile-cta-height).
 * Desktop: a single floating WhatsApp button.
 * Clicks are tracked by the global link listener in utils/analytics.
 */
export default function WhatsAppButton() {
  const [location] = useLocation();
  const href = whatsappHref(location);

  return (
    <>
      {/* Mobile contact bar */}
      <div
        className="md:hidden fixed inset-x-0 bottom-0 z-[60] border-t border-white/10 bg-black/90 backdrop-blur-xl"
        style={{
          paddingBottom: "env(safe-area-inset-bottom)",
          marginBottom: "var(--consent-banner-height, 0px)",
          transition: "margin-bottom 0.3s ease",
        }}
      >
        <div className="flex h-[var(--mobile-cta-height)] items-center gap-2 px-3">
          <a
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className="flex h-11 flex-1 items-center justify-center gap-2 rounded-full bg-green-500 text-sm font-semibold text-white active:bg-green-600"
          >
            <MessageCircle className="h-4 w-4" fill="currentColor" aria-hidden="true" />
            WhatsApp
          </a>
          {location !== "/contact" && (
            <Link
              href="/contact"
              className="flex h-11 flex-1 items-center justify-center gap-2 rounded-full border border-white/15 text-sm font-semibold text-white active:bg-white/10"
            >
              <Mail className="h-4 w-4" aria-hidden="true" />
              Send a brief
            </Link>
          )}
        </div>
      </div>

      {/* Desktop floating button */}
      <div
        className="hidden md:block fixed bottom-8 right-8 z-[60]"
        style={{ marginBottom: "var(--consent-banner-height, 0px)", transition: "margin-bottom 0.3s ease" }}
      >
        <motion.a
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          whileHover={{ scale: 1.08 }}
          whileTap={{ scale: 0.92 }}
          className="group relative flex h-14 w-14 items-center justify-center rounded-full bg-green-500 text-white shadow-2xl transition-colors hover:bg-green-600"
          aria-label="Chat on WhatsApp"
        >
          <MessageCircle size={26} fill="currentColor" aria-hidden="true" />
          <span className="pointer-events-none absolute right-full mr-4 whitespace-nowrap rounded-xl border border-white/10 bg-black px-4 py-2 text-xs font-bold text-white opacity-0 shadow-xl transition-opacity group-hover:opacity-100">
            Chat on WhatsApp
          </span>
        </motion.a>
      </div>
    </>
  );
}
