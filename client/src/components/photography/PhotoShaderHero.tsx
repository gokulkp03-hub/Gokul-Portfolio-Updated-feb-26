import React, { useState, useEffect, lazy, Suspense } from "react";

interface PhotoShaderHeroProps {
  imageSrc: string;
  fallbackSrc?: string;
  headlineLine1?: string;
  headlineLine2?: string;
  sublabel?: string;
}

const PhotoShaderCanvas = lazy(() => import("./PhotoShaderCanvas"));

export const PhotoShaderHero: React.FC<PhotoShaderHeroProps> = ({
  imageSrc,
  fallbackSrc,
  headlineLine1 = "Food & Product",
  headlineLine2 = "Photography",
  sublabel = "Dubai — Commercial & Editorial Photography"
}) => {
  const [useWebGL, setUseWebGL] = useState<boolean>(false);

  useEffect(() => {
    if (typeof window !== "undefined" && window.innerWidth >= 768 && !("ontouchstart" in window)) {
      try {
        const testCanvas = document.createElement("canvas");
        const gl = testCanvas.getContext("webgl") || testCanvas.getContext("experimental-webgl");
        if (gl) {
          setUseWebGL(true);
        }
      } catch (e) {
        setUseWebGL(false);
      }
    }
  }, []);

  return (
    <div className="relative w-full h-screen overflow-hidden bg-neutral-950 flex items-center justify-center">
      {useWebGL ? (
        <Suspense
          fallback={
            <img
              src={fallbackSrc || imageSrc}
              alt="Hero Food & Product Photography"
              className="absolute inset-0 w-full h-full object-cover z-0 opacity-80"
            />
          }
        >
          <PhotoShaderCanvas imageSrc={imageSrc} />
        </Suspense>
      ) : (
        <img
          src={fallbackSrc || imageSrc}
          alt="Hero Food & Product Photography"
          className="absolute inset-0 w-full h-full object-cover z-0 opacity-80"
        />
      )}

      {/* Dark Subtle Vignette Overlay for Readability */}
      <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-neutral-950/40 to-neutral-950/30 z-10 pointer-events-none" />

      {/* Editorial Headline & Top Bar Metadata */}
      <div className="relative z-20 container max-w-[1400px] mx-auto px-6 md:px-12 flex flex-col justify-between h-full pt-32 pb-20 pointer-events-none">
        
        {/* Top Label */}
        <div className="flex items-center justify-between">
          <span className="text-[11px] font-mono uppercase tracking-[0.4em] text-neutral-300/90 border border-neutral-700/60 px-4 py-1.5 rounded-full backdrop-blur-md bg-neutral-950/40">
            {sublabel}
          </span>
          <span className="hidden md:block text-[11px] font-mono tracking-[0.3em] text-neutral-400">
            [ 25.2048° N, 55.2708° E ]
          </span>
        </div>

        {/* Center Editorial Typography */}
        <div className="max-w-4xl space-y-6">
          <h1 className="text-5xl sm:text-7xl md:text-8xl lg:text-[7.5rem] font-serif font-normal tracking-tight text-white leading-[0.92] text-balance">
            {headlineLine1}{" "}
            <span className="italic font-light text-amber-200/90 font-serif">
              {headlineLine2}
            </span>
          </h1>

          <p className="text-lg sm:text-xl font-light text-neutral-300/90 max-w-xl leading-relaxed tracking-wide">
            High-contrast culinary stills, commercial product imagery, and architectural food stories engineered for GCC brand authority.
          </p>
        </div>

        {/* Bottom Scroll Cue */}
        <div className="flex items-center justify-between border-t border-neutral-800/80 pt-6">
          <span className="text-xs font-mono tracking-widest text-neutral-400 uppercase">
            Scroll to explore collection
          </span>
          <span className="text-xs font-mono tracking-widest text-amber-400 uppercase">
            01 / 05 Index
          </span>
        </div>

      </div>
    </div>
  );
};
