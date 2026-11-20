import { motion } from "framer-motion";
import { ArrowUpRight, Check } from "lucide-react";
import { Img } from "@/components/ui/Img";
import { websites } from "@/data/websites";

/** Large browser + phone mockups of websites built and shipped. */
export function WebsitesShowcase() {
  if (websites.length === 0) return null;

  return (
    <section className="py-16 md:py-28 border-b border-border/40 overflow-hidden">
      <div className="container px-4 md:px-8 max-w-[1240px] mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10 md:mb-14">
          <div>
            <span className="text-xs font-mono uppercase tracking-wider text-orange-500">Web</span>
            <h2 className="mt-2 text-3xl sm:text-4xl md:text-5xl font-display font-bold text-foreground tracking-tight uppercase">
              Websites I've built.
            </h2>
          </div>
          <p className="text-sm text-muted-foreground max-w-sm">
            Fast, mobile-first sites with WhatsApp and enquiry paths built in, so ad traffic has somewhere to convert.
          </p>
        </div>

        <div className="space-y-16 md:space-y-24">
          {websites.map(site => {
            const domain = site.url.replace(/^https?:\/\/(www\.)?/, "").replace(/\/$/, "");
            const live = site.status !== "soon";
            return (
              <article key={site.url} className="grid gap-10 lg:grid-cols-[minmax(0,1.5fr)_minmax(0,1fr)] lg:items-center">
                {/* Mockups */}
                <motion.div
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-80px" }}
                  transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                  className="relative pb-10 md:pb-14"
                >
                  <a
                    href={live ? site.url : undefined}
                    target={live ? "_blank" : undefined}
                    rel={live ? "noopener noreferrer" : undefined}
                    className="block"
                    aria-label={live ? `Open ${domain}` : undefined}
                  >
                    <div className="overflow-hidden rounded-xl border border-border/60 bg-zinc-900 shadow-2xl">
                      <div className="flex items-center gap-2 border-b border-white/10 px-4 py-2.5">
                        <span className="h-2.5 w-2.5 rounded-full bg-red-400/70" />
                        <span className="h-2.5 w-2.5 rounded-full bg-yellow-400/70" />
                        <span className="h-2.5 w-2.5 rounded-full bg-green-400/70" />
                        <span className="ml-3 flex-1 truncate rounded-md bg-white/5 px-3 py-1 text-xs text-white/60">{domain}</span>
                      </div>
                      <Img
                        src={site.desktopShot}
                        alt={`${site.name} website on desktop`}
                        loading="lazy"
                        decoding="async"
                        sizes="(min-width: 1024px) 720px, 100vw"
                        className="block w-full h-auto"
                      />
                    </div>
                  </a>
                  {site.mobileShot && (
                    <div className="absolute -bottom-2 right-3 w-[26%] max-w-[170px] overflow-hidden rounded-[1.4rem] border-[5px] border-zinc-800 bg-zinc-900 shadow-2xl md:right-6">
                      <Img
                        src={site.mobileShot}
                        alt={`${site.name} website on mobile`}
                        loading="lazy"
                        decoding="async"
                        sizes="170px"
                        className="block w-full h-auto"
                      />
                    </div>
                  )}
                </motion.div>

                {/* Details */}
                <div>
                  <p className="text-xs font-mono uppercase tracking-wider text-muted-foreground">
                    {site.industry} · {site.location}
                    {!live && (
                      <span className="ml-3 rounded-full border border-orange-500/40 bg-orange-500/10 px-2.5 py-0.5 text-orange-500">
                        Launching soon
                      </span>
                    )}
                  </p>
                  <h3 className="mt-3 text-2xl md:text-3xl font-display font-bold text-foreground">{site.name}</h3>
                  <p className="mt-4 text-base text-muted-foreground leading-relaxed">{site.summary}</p>
                  <ul className="mt-6 space-y-2.5">
                    {site.highlights.map(h => (
                      <li key={h} className="flex items-center gap-2.5 text-sm text-foreground/90">
                        <Check className="h-4 w-4 shrink-0 text-orange-500" aria-hidden="true" /> {h}
                      </li>
                    ))}
                  </ul>
                  {live && <a
                    href={site.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-8 inline-flex items-center gap-2 rounded-full border border-border/60 px-6 py-3 text-sm font-semibold text-foreground hover:border-orange-500/60 hover:text-orange-500 transition-colors"
                  >
                    Visit {domain} <ArrowUpRight className="h-4 w-4" />
                  </a>}
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
