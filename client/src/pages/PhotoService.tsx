import { motion } from "framer-motion";
import { Link } from "wouter";
import { Camera, Layers, Zap, ArrowRight, Expand, Image, ArrowUpRight, Sparkles } from "lucide-react";
import { BeforeAfter } from "@/components/ui/BeforeAfter";
import { photoProjects } from "@/data/photo";

const services = [
    { icon: Camera, title: "Editorial Shoots", desc: "Stylized imagery for magazines and brands." },
    { icon: Image, title: "Product Photography", desc: "Clean, high-end visuals for e-commerce." },
    { icon: Layers, title: "High-End Retouching", desc: "Flawless skin and color grading." },
];

export default function PhotoService() {
    return (
        <div className="min-h-screen bg-background overflow-hidden relative">

            {/* Background Ambience */}
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-orange-500/10 rounded-full blur-[120px] pointer-events-none" />

            {/* Hero */}
            <section className="relative pt-32 pb-20 container px-4 text-center z-10">
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 1 }}
                    className="mb-16"
                >
                    <span className="inline-block py-1 px-3 rounded-full bg-orange-500/10 border border-orange-500/20 text-orange-400 text-sm font-medium mb-6 backdrop-blur-md">
                        Professional Photography
                    </span>
                    <h1 className="text-5xl md:text-9xl font-display font-bold tracking-tighter text-foreground mb-6 text-balance">
                        Captured <span className="text-orange-500 italic font-serif">moments</span>.
                    </h1>
                    <p className="text-xl text-muted-foreground max-w-2xl mx-auto font-light">
                        Photography that elevates perception.
                        Focusing on light, composition, and emotion.
                    </p>
                </motion.div>

                {/* Hero Image / Featured Series */}
                <motion.div
                    initial={{ y: 50, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.2, duration: 0.8 }}
                    className="w-full h-[50vh] md:h-[70vh] rounded-[2rem] overflow-hidden relative bg-muted shadow-2xl"
                >
                    <img
                        src="https://images.unsplash.com/photo-1542038784424-48ed221f70d1?q=80&w=2500&auto=format&fit=crop"
                        alt="Featured Photography"
                        className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-transparent to-transparent opacity-60" />

                    <div className="absolute bottom-8 left-8 text-left">
                        <span className="text-white/80 text-sm uppercase tracking-widest block mb-2">Featured Series</span>
                        <h3 className="text-3xl md:text-5xl text-white font-serif italic">Urban Solitude</h3>
                    </div>
                </motion.div>
            </section>

            {/* Gallery Grid */}
            <section className="py-24 container">
                <h2 className="text-3xl md:text-5xl font-display font-bold mb-12">Collections</h2>

                <div className="columns-1 md:columns-2 lg:columns-3 gap-8 space-y-8">
                    {photoProjects.map((item, i) => (
                        <motion.div
                            key={item.id}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.1 }}
                            className="break-inside-avoid rounded-2xl overflow-hidden bg-muted relative group cursor-pointer border border-border/50"
                        >
                            <img
                                src={item.image}
                                alt={item.title}
                                className="w-full h-auto transition-transform duration-700 group-hover:scale-105"
                            />
                            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300" />

                            <div className="absolute bottom-0 left-0 p-6 w-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-gradient-to-t from-black/80 to-transparent">
                                <h4 className="text-white font-bold text-lg">{item.title}</h4>
                                <p className="text-white/70 text-sm">{item.category}</p>
                            </div>

                            <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300 transform translate-y-2 group-hover:translate-y-0">
                                <div className="p-2 bg-white/20 backdrop-blur-md rounded-full text-white border border-white/30">
                                    <ArrowUpRight className="w-5 h-5" />
                                </div>
                            </div>
                        </motion.div>
                    ))}

                    {/* Added a placeholder for masonry layout demonstration */}
                    <div className="break-inside-avoid p-8 rounded-2xl bg-muted/30 border border-dashed border-border flex flex-col items-center justify-center text-center aspect-[3/4]">
                        <p className="text-muted-foreground mb-4">More collections available on request.</p>
                        <Link href="/portfolio">
                            <a className="btn-outline rounded-full text-sm">View Full Archive</a>
                        </Link>
                    </div>
                </div>
            </section>

            {/* Retouching Section */}
            <section className="py-24 bg-muted/10 border-y border-border/50">
                <div className="container max-w-5xl">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl md:text-5xl font-display font-bold mb-4">Post-Production Mastery</h2>
                        <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
                            Every image undergoes rigorous color grading and retouching.
                            I ensure the final output is flawless while maintaining natural texture.
                        </p>
                    </div>

                    <div className="shadow-2xl shadow-orange-500/10 rounded-3xl overflow-hidden border border-border/50">
                        <BeforeAfter
                            beforeImage="https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=2000&auto=format&fit=crop" // Raw/Flat
                            afterImage="https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?q=80&w=2000&auto=format&fit=crop" // Graded/Retouched (Simulated with similar but different style or same image with filter if I had one, using different images for concept)
                            // Better to use same image with different processing, but for demo using two high quality portraits
                            // Let's use a better pair if possible or just accepted they are different for demo
                            labelBefore="Raw Capture"
                            labelAfter="Final Grade"
                        />
                    </div>

                    <div className="flex justify-center mt-8 gap-8 text-sm text-muted-foreground">
                        <div className="flex items-center gap-2">
                            <Sparkles className="w-4 h-4 text-orange-500" />
                            <span>Color Correction</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <Sparkles className="w-4 h-4 text-orange-500" />
                            <span>Skin Retouching</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <Sparkles className="w-4 h-4 text-orange-500" />
                            <span>Atmosphere</span>
                        </div>
                    </div>
                </div>
            </section>

            {/* Services */}
            <section className="py-24 container">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {services.map((service, i) => (
                        <div key={i} className="p-8 rounded-3xl bg-card border border-border/50 hover:border-orange-500/30 transition-all text-center group hover:shadow-lg hover:-translate-y-1 duration-300">
                            <div className="w-16 h-16 mx-auto bg-muted rounded-2xl flex items-center justify-center mb-6 shadow-sm group-hover:scale-110 transition-transform text-orange-500 group-hover:bg-orange-500/10">
                                <service.icon className="w-8 h-8" />
                            </div>
                            <h3 className="text-xl font-bold mb-3">{service.title}</h3>
                            <p className="text-muted-foreground leading-relaxed">{service.desc}</p>
                        </div>
                    ))}
                </div>
            </section>

            {/* CTA */}
            <section className="py-32 container text-center">
                <h2 className="text-4xl md:text-6xl font-display font-medium tracking-tight mb-8">
                    Let's shoot something <span className="text-orange-500">beautiful</span>.
                </h2>
                <Link href="mailto:hello@gokulkp.com">
                    <a className="btn bg-orange-500 hover:bg-orange-600 text-white px-10 py-5 rounded-full text-lg shadow-lg shadow-orange-500/20 transition-all hover:bg-orange-400">
                        Book a Session
                    </a>
                </Link>
            </section>
        </div>
    );
}
