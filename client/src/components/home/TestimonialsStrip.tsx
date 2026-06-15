import { motion } from "framer-motion";
import { Quote } from "lucide-react";
import { proof } from "@/data/proof";

export function TestimonialsStrip() {
  return (
    <section className="py-20 md:py-28 overflow-hidden border-y border-white/5 bg-gradient-to-b from-black to-zinc-950 relative">
      {/* Subtle orange glow behind */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,#f97316_0%,transparent_65%)] opacity-[0.04] pointer-events-none" />

      <div className="container relative z-10">
        {/* Tiny eyebrow — no big section heading */}
        <div className="flex items-center justify-center gap-4 mb-14">
          <div className="h-px flex-1 max-w-[80px] bg-white/10" />
          <span className="text-[10px] uppercase tracking-[0.4em] text-orange-500 font-bold">What Clients Say</span>
          <div className="h-px flex-1 max-w-[80px] bg-white/10" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 max-w-6xl mx-auto">
          {proof.testimonials.map((t, i) => (
            <motion.div
              key={t.id}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.12, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
              className="relative p-8 rounded-3xl border border-white/[0.06] bg-white/[0.02] backdrop-blur-sm hover:border-orange-500/20 hover:bg-white/[0.04] transition-all duration-500 flex flex-col gap-6 group"
            >
              {/* Quote mark */}
              <Quote className="w-8 h-8 text-orange-500/30 group-hover:text-orange-500/60 transition-colors duration-300 flex-shrink-0" />

              {/* Quote text */}
              <p className="text-white/75 text-sm md:text-[15px] font-light leading-relaxed flex-1 italic">
                "{t.text}"
              </p>

              {/* Author */}
              <div className="flex items-center gap-3 pt-2 border-t border-white/[0.06]">
                {/* Initials avatar */}
                <div className="w-9 h-9 rounded-full bg-orange-500/10 border border-orange-500/20 flex items-center justify-center flex-shrink-0">
                  <span className="text-[11px] font-bold text-orange-500 uppercase">
                    {t.author.split(" ").map(n => n[0]).join("").slice(0, 2)}
                  </span>
                </div>
                <div>
                  <p className="text-white text-xs font-semibold uppercase tracking-wide">{t.author}</p>
                  <p className="text-white/40 text-[10px] font-medium tracking-wide mt-0.5">{t.role}</p>
                </div>
              </div>

              {/* Star row */}
              <div className="flex gap-1 absolute top-8 right-8">
                {[...Array(5)].map((_, si) => (
                  <span key={si} className="text-orange-500 text-[10px]">★</span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
