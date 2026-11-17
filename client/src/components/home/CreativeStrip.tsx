import { Link } from "wouter";
import { ArrowRight } from "lucide-react";
import { Img } from "@/components/ui/Img";
import { creativeStrip } from "@/data/websites";

/**
 * Two rows of real creative scrolling in opposite directions. A visual break
 * after the hero so the page doesn't open with wall-to-wall text.
 * Pauses on hover; with reduced motion it becomes a static, swipeable row.
 */
export function CreativeStrip() {
  return (
    <section className="py-12 md:py-16 border-b border-border/40 overflow-hidden" aria-label="Recent creative work">
      <div className="container px-4 md:px-8 max-w-[1240px] mx-auto mb-6 md:mb-8 flex items-end justify-between gap-4">
        <p className="text-xs font-mono uppercase tracking-wider text-orange-500">Recent creative<span className="hidden sm:inline"> · ads, product & food</span></p>
        <Link href="/portfolio">
          <span className="inline-flex cursor-pointer items-center gap-1.5 whitespace-nowrap text-sm font-semibold text-foreground/80 hover:text-orange-500">
            View all <ArrowRight className="h-4 w-4" />
          </span>
        </Link>
      </div>

      <div className="space-y-3 md:space-y-4">
        {creativeStrip.map((row, r) => (
          <div key={r} className="creative-strip group relative">
            {/* The row is rendered twice so the loop is seamless; the copy is hidden from assistive tech. */}
            <div className={`creative-strip-track ${r % 2 ? "creative-strip-reverse" : ""}`}>
              {[0, 1].map(copy =>
                row.map((item, i) => (
                  <figure
                    key={`${copy}-${i}`}
                    aria-hidden={copy === 1 ? true : undefined}
                    className="relative mr-3 h-44 w-36 shrink-0 md:mr-4 overflow-hidden rounded-2xl border border-border/40 bg-muted/20 md:h-64 md:w-52"
                  >
                    <Img
                      src={item.src}
                      alt={copy === 1 ? "" : item.alt}
                      loading="lazy"
                      decoding="async"
                      sizes="(min-width: 768px) 208px, 144px"
                      className="h-full w-full object-cover transition-transform duration-500 hover:scale-105"
                    />
                  </figure>
                ))
              )}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
