import { motion, useMotionTemplate, useMotionValue } from "framer-motion";
import { MouseEvent } from "react";

const brandingImages = {
    logo: "/assets/images/brands/Little-Rooster/Little Rooster Logo.png",
    social: "/assets/images/brands/Little-Rooster/Little Rooster Social Media Post.jpeg",
    tshirt: "/assets/images/brands/Little-Rooster/Tshirt Mockup.jpg",
    cap: "/assets/images/brands/Little-Rooster/Cap Mockup.jpg",
    smallBag: "/assets/images/brands/Little-Rooster/paperbag.jpg",
    largeBag: "/assets/images/brands/Little-Rooster/shopping_bag_mockup.jpg",
    bagNoBg: "/assets/images/brands/Little-Rooster/paperbag-nobg.png",
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
        <section className="py-24 container px-4 md:px-8 max-w-[1400px] mx-auto border-t border-border/10">
            <div className="mb-16">
                <p className="text-xs uppercase tracking-[0.4em] text-orange-500 mb-4">Brand Identity Project</p>
                <h2 className="text-4xl md:text-5xl font-display font-bold mb-4 tracking-tight">Little Rooster</h2>
                <p className="text-muted-foreground text-lg md:text-xl font-light max-w-2xl">
                    Full visual identity system — logo, colour palette, apparel, and packaging.
                </p>
            </div>

            {/* Outer wrapper — position:relative lets the floating bag overflow the grid */}
            <div className="relative lg:max-w-6xl mx-auto">

                {/* ====================================================
                    FLOATING POP-OUT BAG — no-background PNG
                    Sits at bottom-right, breaking out of the bento grid
                ==================================================== */}
                <motion.div
                    initial={{ opacity: 0, y: 60, rotate: -18 }}
                    whileInView={{ opacity: 1, y: 0, rotate: -12 }}
                    viewport={{ once: true, margin: "-80px" }}
                    transition={{ duration: 1, delay: 0.65, ease: [0.16, 1, 0.3, 1] }}
                    whileHover={{ y: -14, rotate: -7, scale: 1.05, transition: { duration: 0.4, ease: [0.16, 1, 0.3, 1] } }}
                    className="absolute hidden md:block z-30 pointer-events-none"
                    style={{
                        bottom: "-100px",
                        right: "-40px",
                        width: "340px",
                        filter: "drop-shadow(0 40px 60px rgba(0,0,0,0.7)) drop-shadow(0 12px 24px rgba(0,0,0,0.5))",
                    }}
                >
                    <img
                        src={brandingImages.bagNoBg}
                        alt="Little Rooster Paper Bag"
                        className="w-full h-auto object-contain select-none"
                        draggable={false}
                    />
                </motion.div>

                {/* Bento Grid */}
                <motion.div
                    variants={{
                        hidden: { opacity: 0 },
                        show: { opacity: 1, transition: { staggerChildren: 0.1 } },
                    }}
                    initial="hidden"
                    whileInView="show"
                    viewport={{ once: true, margin: "-100px" }}
                    className="grid grid-cols-1 md:grid-cols-4 gap-4 relative group"
                    onMouseMove={handleMouseMove}
                >
                    {/* Subtle mouse-follow spotlight */}
                    <motion.div
                        className="pointer-events-none absolute -inset-10 rounded-[3rem] opacity-0 transition duration-300 group-hover:opacity-100 z-0 hidden md:block"
                        style={{
                            background: useMotionTemplate`radial-gradient(800px circle at ${mouseX}px ${mouseY}px, rgba(234,88,12,0.05) 0%, transparent 80%)`,
                            mixBlendMode: "screen",
                        }}
                    />

                    {/* ---- LEFT — Logo + Palette + Large Bag (2 cols) ---- */}
                    <div className="md:col-span-2 flex flex-col gap-4 relative z-10 w-full" style={{ height: "740px" }}>
                        <motion.div
                            variants={{ hidden: { opacity: 0, y: 16, scale: 0.97 }, show: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } } }}
                            className="relative rounded-[2rem] overflow-hidden bg-[#2D4995] h-52 flex-shrink-0 flex items-center justify-center p-8 group/card transition-all duration-500 hover:-translate-y-1 hover:shadow-2xl hover:shadow-[#2D4995]/40"
                        >
                            <img src={brandingImages.logo} alt="Little Rooster Logo" className="w-[70%] h-[70%] object-contain drop-shadow-xl transition-transform duration-700 group-hover/card:scale-110" />
                        </motion.div>

                        <motion.div
                            variants={{ hidden: { opacity: 0, scale: 0.97 }, show: { opacity: 1, scale: 1, transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] } } }}
                            className="relative rounded-[1.25rem] overflow-hidden flex flex-row h-16 md:h-20 flex-shrink-0"
                        >
                            <div className="flex-1 bg-[#2D4995] flex flex-col justify-end p-2 md:p-3"><span className="text-[10px] text-white/70 font-mono tracking-wider hidden sm:block">#2D4995</span></div>
                            <div className="flex-1 bg-[#E87A00] flex flex-col justify-end p-2 md:p-3"><span className="text-[10px] text-white/70 font-mono tracking-wider hidden sm:block">#E87A00</span></div>
                            <div className="flex-1 bg-[#FCFAE7] flex flex-col justify-end p-2 md:p-3"><span className="text-[10px] text-black/50 font-mono tracking-wider hidden sm:block">#FCFAE7</span></div>
                            <div className="flex-1 bg-[#0C0F14] flex flex-col justify-end p-2 md:p-3"><span className="text-[10px] text-white/50 font-mono tracking-wider hidden sm:block">#0C0F14</span></div>
                        </motion.div>

                        <motion.div
                            variants={{ hidden: { opacity: 0, y: 16, scale: 0.97 }, show: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } } }}
                            className="relative rounded-[2rem] overflow-hidden bg-[#F6F6F6] group/card transition-all duration-500 hover:-translate-y-1 hover:shadow-xl hover:shadow-black/40"
                            style={{ flex: 1, minHeight: 0 }}
                        >
                            <img src={brandingImages.largeBag} alt="Shopping Bag Mockup" className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover/card:scale-105" />
                        </motion.div>
                    </div>

                    {/* ---- MIDDLE — T-Shirt + Cap (2 equal halves, no duplicate bag) ---- */}
                    <div className="flex flex-col gap-4 relative z-10 w-full" style={{ height: "740px" }}>
                        <motion.div
                            variants={{ hidden: { opacity: 0, y: 16, scale: 0.97 }, show: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } } }}
                            className="relative rounded-[2rem] overflow-hidden bg-[#dce4f5] group/card transition-all duration-500 hover:-translate-y-1 hover:shadow-xl hover:shadow-black/40"
                            style={{ flex: 1, minHeight: 0 }}
                        >
                            <img src={brandingImages.tshirt} alt="T-Shirt Mockup" className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover/card:scale-105" />
                        </motion.div>

                        <motion.div
                            variants={{ hidden: { opacity: 0, y: 16, scale: 0.97 }, show: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } } }}
                            className="relative rounded-[2rem] overflow-hidden bg-[#f0ede6] group/card transition-all duration-500 hover:-translate-y-1 hover:shadow-xl hover:shadow-black/40"
                            style={{ flex: 1, minHeight: 0 }}
                        >
                            <img src={brandingImages.cap} alt="Cap Mockup" className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover/card:scale-105" />
                        </motion.div>
                    </div>

                    {/* ---- RIGHT — Social Media Poster ---- */}
                    <div
                        className="flex flex-col rounded-[2rem] overflow-hidden bg-[#0C0F14] group/card relative z-10 w-full transition-all duration-500 hover:-translate-y-1 hover:shadow-xl hover:shadow-black/50 min-h-[400px] md:min-h-0"
                        style={{ height: "740px" }}
                    >
                        <motion.div
                            variants={{ hidden: { opacity: 0, y: 16, scale: 0.97 }, show: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] } } }}
                            className="relative flex-1 h-full"
                        >
                            <img src={brandingImages.social} alt="Social Media Poster" className="absolute inset-0 w-full h-full object-cover object-top transition-transform duration-700 group-hover/card:scale-105" />
                        </motion.div>
                    </div>

                </motion.div>
            </div>

            {/* Bottom clearance for the floating bag */}
            <div className="h-28 md:h-36" />
        </section>
    );
}
