import React from "react";
import { motion } from "framer-motion";

export const PhotoPointOfView: React.FC = () => {
  const points = [
    {
      number: "01",
      title: "Light & Atmosphere",
      description: "Chiaroscuro, precise specular highlights, and directional diffusion. Lighting is used not just to illuminate, but to define volume, appetite, and luxury resonance."
    },
    {
      number: "02",
      title: "Compositional Rigor",
      description: "Negative space, architectural framing, and strict focal paths. Every element inside the frame is deliberately placed to draw the eye instantly."
    },
    {
      number: "03",
      title: "Commercial Impact",
      description: "Stills designed with intent — built for high-converting Meta ad campaigns, editorial features, and commercial packaging that stops the scroll."
    }
  ];

  return (
    <section className="py-32 bg-neutral-950 border-t border-neutral-800/80 text-white relative">
      <div className="container max-w-[1400px] mx-auto px-6 md:px-12">
        <div className="mb-20">
          <span className="text-xs font-mono tracking-[0.4em] text-amber-400 uppercase block mb-4">
            Point of View
          </span>
          <h2 className="text-4xl md:text-6xl font-serif text-white tracking-tight">
            The Philosophy Behind <span className="italic text-amber-200/90 font-light">The Frame</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-16">
          {points.map((point, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: index * 0.2, ease: [0.22, 1, 0.36, 1] }}
              className="space-y-6 border-t border-neutral-800/80 pt-8"
            >
              <span className="font-mono text-3xl font-light text-amber-400/90 block">
                {point.number}
              </span>
              <h3 className="text-2xl font-serif font-normal text-white">
                {point.title}
              </h3>
              <p className="text-neutral-400 text-sm font-light leading-relaxed">
                {point.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
