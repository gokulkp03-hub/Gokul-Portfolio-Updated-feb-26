import { motion, useMotionTemplate, useMotionValue } from "framer-motion";
import { MouseEvent } from "react";

const brandingImages = {
    logo: "/assets/images/brands/Little-Rooster/Little Rooster Logo.png",
    social: "/assets/images/brands/Little-Rooster/Little Rooster Social Media Post.jpeg",
    tshirt: "/assets/images/brands/Little-Rooster/Tshirt Mockup.jpg",
    cap: "/assets/images/brands/Little-Rooster/Cap Mockup.jpg",
    smallBag: "/assets/images/brands/Little-Rooster/paperbag.jpg",
    largeBag: "/assets/images/brands/Little-Rooster/shopping_bag_mockup.jpg"
};

export function LittleRoosterBranding() {
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    function handleMouseMove({ currentTarget, clientX, clientY }: MouseEvent) {
        const { left, top } = currentTarget.getBoundingClientRect();
        if (left && top) {
            mouseX.set(clientX - left);
            mouseY.set(clientY - top);
        }
    }

    return (
        <section className="py-24 container px-4 md:px-8 max-w-[1400px] mx-auto border-t border-white/5">
            <div className="mb-16">
                <h2 className="text-4xl md:text-5xl font-display font-bold mb-4 tracking-tight">Brand Identity</h2>
                <p className="text-muted-foreground text-lg md:text-xl font-light max-w-2xl">
                    Comprehensive visual branding for <span className="text-orange-500 font-medium whitespace-nowrap">Little Rooster</span>, including logo design, color palettes, apparel, and packaging.
                </p>
            </div>

            {/* Bento Grid Layout - Fully Responsive & Animated */}
            <motion.div
                variants={{
                    hidden: { opacity: 0 },
                    show: {
                        opacity: 1,
                        transition: { staggerChildren: 0.15 }
                    }
                }}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, margin: "-100px" }}
                className="grid grid-cols-1 md:grid-cols-4 gap-4 relative group lg:max-w-6xl mx-auto"
                onMouseMove={handleMouseMove}
            >
                {/* Subtle Interactive Spotlight */}
                <motion.div
                    className="pointer-events-none absolute -inset-10 rounded-[3rem] opacity-0 transition duration-300 group-hover:opacity-100 z-0 hidden md:block"
                    style={{
                        background: useMotionTemplate`radial-gradient(800px circle at ${mouseX}px ${mouseY}px, rgba(234, 88, 12, 0.05) 0%, transparent 80%)`,
                        mixBlendMode: "screen"
                    }}
                />

                {/* Left Column (Logo, Colors, Large Bag) spanning 2 columns */}
                <div className="md:col-span-2 flex flex-col gap-4 h-full relative z-10 w-full">
                    {/* Logo */}
                    <motion.div
                        variants={{
                            hidden: { opacity: 0, y: 30, scale: 0.95 },
                            show: { opacity: 1, y: 0, scale: 1, transition: { type: "spring", stiffness: 100, damping: 15 } }
                        }}
                        className="relative rounded-[2rem] overflow-hidden bg-[#2D4995] aspect-[21/9] md:aspect-auto md:h-56 flex items-center justify-center p-8 group/card transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-black/50"
                    >
                        <img
                            src={brandingImages.logo}
                            alt="Little Rooster Logo"
                            className="w-[70%] h-[70%] object-contain drop-shadow-xl transition-transform duration-700 group-hover/card:scale-110"
                        />
                    </motion.div>

                    {/* Color Palette */}
                    <motion.div
                        variants={{
                            hidden: { opacity: 0, scale: 0.95 },
                            show: { opacity: 1, scale: 1, transition: { type: "spring", stiffness: 100, damping: 15 } }
                        }}
                        className="relative rounded-[1.25rem] overflow-hidden flex flex-row h-16 md:h-20"
                    >
                        <div className="flex-1 bg-[#2D4995] flex flex-col justify-end p-2 md:p-3"><span className="text-[10px] text-white/70 font-mono tracking-wider hidden sm:block">#2D4995</span></div>
                        <div className="flex-1 bg-[#E87A00] flex flex-col justify-end p-2 md:p-3"><span className="text-[10px] text-white/70 font-mono tracking-wider hidden sm:block">#E87A00</span></div>
                        <div className="flex-1 bg-[#FCFAE7] flex flex-col justify-end p-2 md:p-3"><span className="text-[10px] text-black/50 font-mono tracking-wider hidden sm:block">#FCFAE7</span></div>
                        <div className="flex-1 bg-[#0C0F14] flex flex-col justify-end p-2 md:p-3"><span className="text-[10px] text-white/50 font-mono tracking-wider hidden sm:block">#0C0F14</span></div>
                    </motion.div>

                    {/* Large Bag (Flex-1 to fill remaining space natively) */}
                    <motion.div
                        variants={{
                            hidden: { opacity: 0, y: 30, scale: 0.95 },
                            show: { opacity: 1, y: 0, scale: 1, transition: { type: "spring", stiffness: 100, damping: 15 } }
                        }}
                        className="relative rounded-[2rem] overflow-hidden bg-[#F6F6F6] flex-1 min-h-[300px] group/card transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-black/50"
                    >
                        <img
                            src={brandingImages.largeBag}
                            alt="Large Paper Bag"
                            className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover/card:scale-105"
                        />
                    </motion.div>
                </div>

                {/* Middle Column (3 mockups) */}
                <div className="flex flex-col gap-4 relative z-10 w-full h-full">
                    {/* T-Shirt */}
                    <motion.div
                        variants={{
                            hidden: { opacity: 0, y: 30, scale: 0.95 },
                            show: { opacity: 1, y: 0, scale: 1, transition: { type: "spring", stiffness: 100, damping: 15 } }
                        }}
                        className="relative rounded-[2rem] overflow-hidden bg-[#e9e9dd] flex-1 aspect-square md:aspect-auto min-h-[220px] group/card transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-black/50"
                    >
                        <img
                            src={brandingImages.tshirt}
                            alt="T-Shirt Mockup"
                            className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover/card:scale-105"
                        />
                    </motion.div>

                    {/* Cap */}
                    <motion.div
                        variants={{
                            hidden: { opacity: 0, y: 30, scale: 0.95 },
                            show: { opacity: 1, y: 0, scale: 1, transition: { type: "spring", stiffness: 100, damping: 15 } }
                        }}
                        className="relative rounded-[2rem] overflow-hidden bg-[#e9e9e1] flex-1 aspect-square md:aspect-auto min-h-[220px] group/card transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-black/50"
                    >
                        <img
                            src={brandingImages.cap}
                            alt="Cap Mockup"
                            className="absolute inset-0 w-full h-full object-cover rounded-[2rem] transition-transform duration-700 group-hover/card:scale-105"
                        />
                    </motion.div>

                    {/* Small Bag */}
                    <motion.div
                        variants={{
                            hidden: { opacity: 0, y: 30, scale: 0.95 },
                            show: { opacity: 1, y: 0, scale: 1, transition: { type: "spring", stiffness: 100, damping: 15 } }
                        }}
                        className="relative rounded-[2rem] overflow-hidden bg-[#eeeeee] flex-1 aspect-square md:aspect-auto min-h-[220px] group/card transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-black/50"
                    >
                        <img
                            src={brandingImages.smallBag}
                            alt="Small Paper Bag"
                            className="absolute inset-0 w-full h-full object-cover p-2 rounded-[2rem] transition-transform duration-700 group-hover/card:scale-105"
                        />
                    </motion.div>
                </div>

                {/* Right Column (Social Media Poster) */}
                <div className="flex flex-col h-full rounded-[2rem] overflow-hidden bg-[#0C0F14] group/card relative z-10 w-full transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-black/50">
                    <motion.div
                        variants={{
                            hidden: { opacity: 0, y: 30, scale: 0.95 },
                            show: { opacity: 1, y: 0, scale: 1, transition: { type: "spring", stiffness: 100, damping: 15 } }
                        }}
                        className="relative flex-1 min-h-[400px] md:min-h-full h-full"
                    >
                        <img
                            src={brandingImages.social}
                            alt="Social Media Poster"
                            className="absolute inset-0 w-full h-full object-cover object-top transition-transform duration-700 group-hover/card:scale-105"
                        />
                    </motion.div>
                </div>
            </motion.div>
        </section>
    );
}
