import React from "react";
import { Link } from "wouter";
import { ArrowRight } from "lucide-react";

export const PhotoClosingCTA: React.FC = () => {
  return (
    <section className="relative py-40 bg-neutral-950 border-t border-neutral-800 text-white overflow-hidden">
      <div className="absolute inset-0 z-0 opacity-25 mix-blend-luminosity pointer-events-none">
        <img
          src="/assets/images/portfolio-all/Sourdough_Avocado.jpg"
          alt="Culinary Still Background"
          className="w-full h-full object-cover filter blur-[2px]"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-neutral-950/80 to-neutral-950/70" />
      </div>

      <div className="relative z-10 container max-w-[1400px] mx-auto px-6 md:px-12 text-center space-y-10">
        <span className="text-xs font-mono tracking-[0.4em] text-amber-400 uppercase inline-block border border-amber-400/30 px-5 py-2 rounded-full backdrop-blur-md bg-neutral-950/40">
          Book Commercial & Editorial Sessions
        </span>

        <h2 className="text-5xl sm:text-7xl md:text-8xl lg:text-[7rem] font-serif text-white tracking-tight leading-[0.95] max-w-5xl mx-auto text-balance">
          Let's shoot something <span className="italic font-light text-amber-200/90 font-serif">worth stopping for.</span>
        </h2>

        <p className="text-neutral-400 text-lg md:text-xl font-light max-w-xl mx-auto leading-relaxed">
          Available for commercial food, luxury product, and direct-response campaign shoots in Dubai, Abu Dhabi, and across the GCC.
        </p>

        <div className="pt-6">
          <Link href="/contact">
            <span className="inline-flex items-center gap-3 px-10 py-5 rounded-full bg-amber-400 hover:bg-amber-300 text-neutral-950 font-bold text-sm uppercase tracking-widest transition-all shadow-xl shadow-amber-400/20 cursor-pointer">
              Initiate Project Inquiry <ArrowRight className="w-4 h-4" />
            </span>
          </Link>
        </div>
      </div>
    </section>
  );
};
