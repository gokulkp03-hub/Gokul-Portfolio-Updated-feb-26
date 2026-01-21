import { useScroll, useTransform, motion, AnimatePresence } from "framer-motion";
import { useEffect, useRef, useState } from "react";

const FRAME_COUNT = 128;
const IMAGES_PATH = "/assets/Homepage Camera animation/";

export default function CreativeScroll() {
    const containerRef = useRef<HTMLDivElement>(null);
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [images, setImages] = useState<HTMLImageElement[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end end"],
    });

    const frameIndex = useTransform(scrollYProgress, [0, 1], [0, FRAME_COUNT - 1]);

    // Precise scroll ranges for overlays based on user request: 0%, 30%, 65%, 90%
    // Overlay 1: 0% - Starts visible, fades out by 15%
    const opacity1 = useTransform(scrollYProgress, [0, 0.15], [1, 0]);
    const y1 = useTransform(scrollYProgress, [0, 0.15], [0, -20]);

    // Overlay 2: 30% - Fades in 20-25%, visible at 30%, fades out 35-40%
    const opacity2 = useTransform(scrollYProgress, [0.2, 0.25, 0.35, 0.4], [0, 1, 1, 0]);
    const y2 = useTransform(scrollYProgress, [0.2, 0.25, 0.35, 0.4], [20, 0, 0, -20]);

    // Overlay 3: 65% - Fades in 55-60%, visible at 65%, fades out 70-75%
    const opacity3 = useTransform(scrollYProgress, [0.55, 0.6, 0.7, 0.75], [0, 1, 1, 0]);
    const y3 = useTransform(scrollYProgress, [0.55, 0.6, 0.7, 0.75], [20, 0, 0, -20]);

    // Overlay 4: 90% - Fades in 80-85%, visible at 90%, stays until end
    const opacity4 = useTransform(scrollYProgress, [0.8, 0.85, 0.95, 1], [0, 1, 1, 0]);
    const y4 = useTransform(scrollYProgress, [0.8, 0.85], [20, 0]);


    useEffect(() => {
        const loadImages = async () => {
            const loadedImages: HTMLImageElement[] = [];
            const promises: Promise<void>[] = [];

            for (let i = 1; i <= FRAME_COUNT; i++) {
                const promise = new Promise<void>((resolve) => {
                    const img = new Image();
                    const fileName = i.toString().padStart(5, "0") + ".jpg";
                    img.src = `${IMAGES_PATH}${fileName}`;
                    img.onload = () => {
                        loadedImages[i - 1] = img;
                        resolve();
                    };
                    img.onerror = () => resolve();
                });
                promises.push(promise);
            }

            try {
                await Promise.all(promises);
                setImages(loadedImages);
                setIsLoading(false);
            } catch (error) {
                console.error("Error loading image sequence:", error);
                setIsLoading(false);
            }
        };

        loadImages();
    }, []);

    useEffect(() => {
        if (isLoading || images.length === 0) return;

        const render = () => {
            const canvas = canvasRef.current;
            if (!canvas) return;

            const ctx = canvas.getContext("2d");
            if (!ctx) return;

            let currentFrame = Math.floor(frameIndex.get());
            if (currentFrame < 0) currentFrame = 0;
            if (currentFrame >= FRAME_COUNT) currentFrame = FRAME_COUNT - 1;

            const img = images[currentFrame];
            if (!img) return;

            const dpr = window.devicePixelRatio || 1;
            const rect = canvas.getBoundingClientRect();

            canvas.width = rect.width * dpr;
            canvas.height = rect.height * dpr;
            ctx.scale(dpr, dpr);

            ctx.clearRect(0, 0, rect.width, rect.height);
            // Consistent background to avoid white flashes
            ctx.fillStyle = "#0B0F14";
            ctx.fillRect(0, 0, rect.width, rect.height);

            const isMobile = window.innerWidth < 768;
            let scale;
            if (isMobile) {
                scale = Math.max(rect.width / img.width, rect.height / img.height);
            } else {
                scale = Math.min(rect.width / img.width, rect.height / img.height);
            }

            const x = (rect.width / 2) - (img.width / 2) * scale;
            const y = (rect.height / 2) - (img.height / 2) * scale;

            ctx.drawImage(img, x, y, img.width * scale, img.height * scale);
        };

        const unsubscribe = frameIndex.on("change", () => requestAnimationFrame(render));
        requestAnimationFrame(render);
        window.addEventListener("resize", render);

        return () => {
            unsubscribe();
            window.removeEventListener("resize", render);
        };
    }, [isLoading, images, frameIndex]);

    return (
        <section ref={containerRef} className="relative h-[400vh] bg-black">
            <div className="sticky top-0 h-screen w-full overflow-hidden bg-black">

                {/* Loader */}
                <AnimatePresence>
                    {isLoading && (
                        <motion.div
                            initial={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="absolute inset-0 z-50 flex items-center justify-center bg-black"
                        >
                            <div className="text-center">
                                <div className="w-8 h-8 border-2 border-orange-500 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
                                <p className="font-sans text-xs tracking-[0.2em] text-white/40 uppercase">
                                    Loading Experience
                                </p>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>

                {/* Canvas */}
                <canvas
                    ref={canvasRef}
                    className="absolute inset-0 w-full h-full block"
                    style={{ objectFit: 'cover' }}
                />

                {/* Overlays Container */}
                <div className="absolute inset-0 pointer-events-none">

                    {/* 0% Start Overlay */}
                    <motion.div
                        style={{ opacity: opacity1, y: y1 }}
                        className="absolute inset-0 flex items-center justify-center md:items-center md:justify-start p-6 pt-24 md:pt-0 md:pl-20"
                    >
                        <div className="bg-black/45 backdrop-blur-xl border border-white/10 p-8 rounded-2xl shadow-2xl max-w-md md:max-w-xl w-full">
                            <h2 className="text-4xl md:text-6xl font-bold text-white mb-3 tracking-tight">
                                Visual Craft.
                            </h2>
                            <p className="text-xl md:text-2xl text-white/80 font-light tracking-wide">
                                Camera. <span className="text-orange-500 font-medium">Optics.</span> Story.
                            </p>
                        </div>
                    </motion.div>

                    {/* 30% Overlay */}
                    <motion.div
                        style={{ opacity: opacity2, y: y2 }}
                        className="absolute inset-0 flex items-center justify-center md:items-center md:justify-start p-6 md:pl-20"
                    >
                        <div className="bg-black/45 backdrop-blur-xl border border-white/10 p-8 rounded-2xl shadow-2xl max-w-md md:max-w-lg w-full">
                            <h2 className="text-3xl md:text-5xl font-bold text-white mb-3 tracking-tight">
                                Precision Tools.
                            </h2>
                            <p className="text-lg md:text-2xl text-white/80 font-light tracking-wide">
                                Designed for <span className="text-orange-500 font-medium">creators.</span>
                            </p>
                        </div>
                    </motion.div>

                    {/* 65% Overlay - Right Aligned */}
                    <motion.div
                        style={{ opacity: opacity3, y: y3 }}
                        className="absolute inset-0 flex items-center justify-center md:items-center md:justify-end p-6 md:pr-20"
                    >
                        <div className="bg-black/45 backdrop-blur-xl border border-white/10 p-8 rounded-2xl shadow-2xl max-w-md md:max-w-lg w-full text-left md:text-right">
                            <h2 className="text-3xl md:text-5xl font-bold text-white mb-3 tracking-tight">
                                Inside the Process.
                            </h2>
                            <p className="text-lg md:text-2xl text-white/80 font-light tracking-wide">
                                From capture <span className="text-white/60">to</span> <span className="text-orange-500 font-medium">edit.</span>
                            </p>
                        </div>
                    </motion.div>

                    {/* 90% Overlay - Bottom/Center */}
                    <motion.div
                        style={{ opacity: opacity4, y: y4 }}
                        className="absolute inset-0 flex items-end justify-center pb-24 md:pb-32 p-6"
                    >
                        <div className="bg-black/45 backdrop-blur-xl border border-white/10 p-8 rounded-2xl shadow-2xl max-w-md md:max-w-xl w-full text-center">
                            <h2 className="text-3xl md:text-5xl font-bold text-white mb-3 tracking-tight">
                                Built to Create.
                            </h2>
                            <p className="text-lg md:text-2xl text-white/80 font-light tracking-wide">
                                Scroll back to <span className="text-orange-500 font-medium">replay.</span>
                            </p>
                        </div>
                    </motion.div>

                </div>
            </div>
        </section>
    );
}
