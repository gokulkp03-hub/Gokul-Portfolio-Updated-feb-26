import { useScroll, useTransform, motion, AnimatePresence } from "framer-motion";
import { useEffect, useRef, useState } from "react";

const FRAME_COUNT = 128; // Total number of frames
const IMAGES_PATH = "/assets/Homepage Camera animation/"; // Exact path from exploration

export default function CreativeScroll() {
    const containerRef = useRef<HTMLDivElement>(null);
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [images, setImages] = useState<HTMLImageElement[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    // Track scroll progress of the container
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end end"],
    });

    // Map scroll progress (0 to 1) to frame index (0 to 127)
    const frameIndex = useTransform(scrollYProgress, [0, 1], [0, FRAME_COUNT - 1]);

    // Preload images on mount
    useEffect(() => {
        const loadImages = async () => {
            const loadedImages: HTMLImageElement[] = [];
            const promises: Promise<void>[] = [];

            for (let i = 1; i <= FRAME_COUNT; i++) {
                const promise = new Promise<void>((resolve, reject) => {
                    const img = new Image();
                    // Pad with zeros (e.g., 00001.jpg)
                    const fileName = i.toString().padStart(5, "0") + ".jpg";
                    img.src = `${IMAGES_PATH}${fileName}`;
                    img.onload = () => {
                        loadedImages[i - 1] = img;
                        resolve();
                    };
                    img.onerror = (e) => {
                        console.error(`Failed to load image: ${fileName}`, e);
                        // Even if it fails, resolve to avoid blocking everything (though it will glitch)
                        resolve();
                    };
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

    // Render to canvas based on scroll position
    useEffect(() => {
        if (isLoading || images.length === 0) return;

        // Use a render loop driven by frameIndex changes
        const render = () => {
            const canvas = canvasRef.current;
            if (!canvas) return;

            const ctx = canvas.getContext("2d");
            if (!ctx) return;

            // Get current frame index (floored)
            let currentFrame = Math.floor(frameIndex.get());

            // Clamp values
            if (currentFrame < 0) currentFrame = 0;
            if (currentFrame >= FRAME_COUNT) currentFrame = FRAME_COUNT - 1;

            const img = images[currentFrame];
            if (!img) return;

            // Make canvas resize-safe and handle HighDPI
            const dpr = window.devicePixelRatio || 1;
            const rect = canvas.getBoundingClientRect();

            // Set internal resolution to match display size * DPR
            canvas.width = rect.width * dpr;
            canvas.height = rect.height * dpr;

            // Scale context to ensure correct drawing operations
            ctx.scale(dpr, dpr);

            // Clear mechanism (though we draw over full canvas usually)
            ctx.clearRect(0, 0, rect.width, rect.height);
            ctx.fillStyle = "#ECECEC"; // Editorial Fog
            ctx.fillRect(0, 0, rect.width, rect.height);

            // "object-fit: contain" logic
            const scale = Math.min(rect.width / img.width, rect.height / img.height);
            const x = (rect.width / 2) - (img.width / 2) * scale;
            const y = (rect.height / 2) - (img.height / 2) * scale;

            ctx.drawImage(img, x, y, img.width * scale, img.height * scale);
        };

        // Subscribe to scroll changes to trigger render
        const unsubscribe = frameIndex.on("change", () => {
            requestAnimationFrame(render);
        });

        // Initial render
        requestAnimationFrame(render);

        // Handle resize
        window.addEventListener("resize", render);

        return () => {
            unsubscribe();
            window.removeEventListener("resize", render);
        };
    }, [isLoading, images, frameIndex]);

    // Text Overlays Logic
    // We can use transform values to map specific scroll ranges to opacity
    const OpacityText1 = useTransform(scrollYProgress, [0, 0.1, 0.2, 0.25], [0, 1, 1, 0]);
    const YText1 = useTransform(scrollYProgress, [0, 0.1], [10, 0]);

    const OpacityText2 = useTransform(scrollYProgress, [0.25, 0.3, 0.45, 0.5], [0, 1, 1, 0]);
    const YText2 = useTransform(scrollYProgress, [0.25, 0.3], [10, 0]);

    const OpacityText3 = useTransform(scrollYProgress, [0.6, 0.65, 0.8, 0.85], [0, 1, 1, 0]);
    const YText3 = useTransform(scrollYProgress, [0.6, 0.65], [10, 0]);

    const OpacityText4 = useTransform(scrollYProgress, [0.85, 0.9, 0.98, 1], [0, 1, 1, 0]);
    const YText4 = useTransform(scrollYProgress, [0.85, 0.9], [10, 0]);

    return (
        <div ref={containerRef} className="relative h-[400vh] bg-[#ECECEC]">
            <div className="sticky top-0 h-screen w-full overflow-hidden">

                {/* Loader */}
                <AnimatePresence>
                    {isLoading && (
                        <motion.div
                            initial={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="absolute inset-0 z-50 flex items-center justify-center bg-[#ECECEC]"
                        >
                            <p className="font-sans text-sm tracking-widest text-black/40 uppercase">
                                Loading visual sequence...
                            </p>
                        </motion.div>
                    )}
                </AnimatePresence>

                {/* Canvas */}
                <canvas
                    ref={canvasRef}
                    className="absolute inset-0 w-full h-full block object-contain"
                />

                {/* Text Overlays - Pointer events none to allow scrolling through */}
                <div className="absolute inset-0 pointer-events-none flex flex-col justify-center">
                    <div className="container mx-auto px-6 h-full relative">

                        {/* 0% - Center */}
                        <motion.div
                            style={{ opacity: OpacityText1, y: YText1 }}
                            className="absolute inset-0 flex items-center justify-center text-center"
                        >
                            <div>
                                <h2 className="text-4xl md:text-5xl font-bold text-black/90 mb-2 tracking-tight">
                                    Visual Craft.
                                </h2>
                                <p className="text-xl md:text-2xl text-black/60 font-light tracking-wide">
                                    Story. Motion. Direction.
                                </p>
                            </div>
                        </motion.div>

                        {/* 30% - Left */}
                        <motion.div
                            style={{ opacity: OpacityText2, y: YText2 }}
                            className="absolute inset-0 flex items-center justify-start text-left"
                        >
                            <div className="max-w-lg">
                                <h2 className="text-4xl md:text-5xl font-bold text-black/90 mb-2 tracking-tight">
                                    Creative Thinking.
                                </h2>
                                <p className="text-xl md:text-2xl text-black/60 font-light tracking-wide">
                                    Designed with intent.
                                </p>
                            </div>
                        </motion.div>

                        {/* 65% - Right */}
                        <motion.div
                            style={{ opacity: OpacityText3, y: YText3 }}
                            className="absolute inset-0 flex items-center justify-end text-right"
                        >
                            <div className="max-w-lg">
                                <h2 className="text-4xl md:text-5xl font-bold text-black/90 mb-2 tracking-tight">
                                    Inside the Process.
                                </h2>
                                <p className="text-xl md:text-2xl text-black/60 font-light tracking-wide">
                                    From idea to execution.
                                </p>
                            </div>
                        </motion.div>

                        {/* 90% - Center/Bottom */}
                        <motion.div
                            style={{ opacity: OpacityText4, y: YText4 }}
                            className="absolute inset-0 flex items-end pb-32 justify-center text-center"
                        >
                            <div>
                                <h2 className="text-4xl md:text-5xl font-bold text-black/90 mb-2 tracking-tight">
                                    Built to Create.
                                </h2>
                                <p className="text-xl md:text-2xl text-black/60 font-light tracking-wide">
                                    Scroll back to replay.
                                </p>
                            </div>
                        </motion.div>

                    </div>
                </div>

            </div>
        </div>
    );
}
