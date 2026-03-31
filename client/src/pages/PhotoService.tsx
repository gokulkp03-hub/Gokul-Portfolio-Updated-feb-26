import { motion } from "framer-motion";
import { Link } from "wouter";
import { Camera, Layers, Zap, ArrowRight, Expand, Image, ArrowUpRight, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";
import { BeforeAfter } from "@/components/ui/BeforeAfter";
import { trpc } from "@/lib/trpc";
import { useMemo } from "react";

const services = [
    { icon: Camera, title: "Editorial Shoots", desc: "Stylized imagery for magazines and brands." },
    { icon: Image, title: "Product Photography", desc: "Clean, high-end visuals for e-commerce." },
    { icon: Layers, title: "High-End Retouching", desc: "Flawless skin and color grading." },
];

const packages = [
    {
        name: "Portrait Session",
        price: "AED 1,800",
        features: ["2 Hour Session", "10 High-End Retouched Images", "Online Gallery", "Personal Usage Rights"],
        highlight: false
    },
    {
        name: "Brand Content Day",
        price: "AED 4,500",
        features: ["Full Day Shoot", "50+ Edited Assets", "Product & Lifestyle", "Commercial Usage Rights"],
        highlight: true
    },
    {
        name: "Custom Project",
        price: "Custom",
        features: ["Tailored Production", "Studio Rental Included", "Professional Styling", "Global Usage Rights"],
        highlight: false
    }
];

const localArchiveImages = [
    "/assets/images/portfolio-all/1735068551568.jpg",
    "/assets/images/portfolio-all/1744907237529.jpg",
    "/assets/images/portfolio-all/1744907237550.jpg",
    "/assets/images/portfolio-all/1744907237584.jpg",
    "/assets/images/portfolio-all/1744907237603.jpg",
    "/assets/images/portfolio-all/2-1_1767958070276.jpg",
    "/assets/images/portfolio-all/3-1_1767958070681.jpg",
    "/assets/images/portfolio-all/5.jpg",
    "/assets/images/portfolio-all/AD_1_DEC.jpg",
    "/assets/images/portfolio-all/AD_2_DEC.jpg",
    "/assets/images/portfolio-all/Ad.jpg",
    "/assets/images/portfolio-all/Ad_04.jpg",
    "/assets/images/portfolio-all/Ad_08-1.jpg",
    "/assets/images/portfolio-all/Ad_1_Residential_construction_services.jpg",
    "/assets/images/portfolio-all/Artboard_1_1761316769324.jpg",
    "/assets/images/portfolio-all/Cheesecake.jpg",
    "/assets/images/portfolio-all/Childrens_Day.jpg",
    "/assets/images/portfolio-all/Chocolate_Milk_Cookies.jpg",
    "/assets/images/portfolio-all/Copy_of_Macros_Club.jpg",
    "/assets/images/portfolio-all/Cover_1.jpg",
    "/assets/images/portfolio-all/DSC01510_(1).jpg",
    "/assets/images/portfolio-all/DSC01680.jpg",
    "/assets/images/portfolio-all/DSC01738.jpg",
    "/assets/images/portfolio-all/DSC01768.jpg",
    "/assets/images/portfolio-all/DSC03166.jpg",
    "/assets/images/portfolio-all/DSC03971.jpg",
    "/assets/images/portfolio-all/DSC04050.jpg",
    "/assets/images/portfolio-all/DSC08771.jpg",
    "/assets/images/portfolio-all/DSC08907.jpg",
    "/assets/images/portfolio-all/DSC08980.jpg",
    "/assets/images/portfolio-all/DSC09457.jpg",
    "/assets/images/portfolio-all/DSC09598.jpg",
    "/assets/images/portfolio-all/DSC09621.jpg",
    "/assets/images/portfolio-all/IMG_7409.jpg",
    "/assets/images/portfolio-all/Iced_V60.jpg",
    "/assets/images/portfolio-all/Sourdough_Avocado.jpg",
    "/assets/images/portfolio-all/Sourdough_Labneh_Zaatar.jpg",
    "/assets/images/portfolio-all/Vegan_Buddha_Bowl.jpg",
    "/assets/images/portfolio-all/Vita_bloom.jpg",
    "/assets/images/portfolio-all/Xmas_-_Galaxy.jpg",
    "/assets/images/portfolio-all/acero_warrior.jpg",
    "/assets/images/portfolio-all/ginger_shot.jpg",
    "/assets/images/portfolio-all/jagp10.jpg",
    "/assets/images/portfolio-all/jagp5.jpg",
    "/assets/images/portfolio-all/xmas_2_tess.jpg"
];

export default function PhotoService() {
    const { data: dbProjects } = trpc.projects.list.useQuery();
    
    const photos = useMemo(() => {
        if (!dbProjects) return [];
        return dbProjects.filter((p: any) => 
            (p.category.toLowerCase() === "photo" || p.category.toLowerCase() === "photography") &&
            !p.thumbnail.includes("/assets/images/photo/") // Filter out missing local placeholders
        ).slice(0, 9);
    }, [dbProjects]);
    
    return (
        <div className="min-h-screen bg-background overflow-hidden relative">
            {/* Background Texture & Ambience */}
            <div className="absolute inset-0 z-0 opacity-[0.03] pointer-events-none mix-blend-overlay" style={{ backgroundImage: 'url("https://www.transparenttextures.com/patterns/natural-paper.png")' }} />
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-orange-500/5 rounded-full blur-[120px] pointer-events-none" />

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
                    {photos.map((item: any, i: number) => (
                        <Link key={item.id} href={`/portfolio/${item.category}/${item.slug}`}>
                            <motion.a
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.1 }}
                                className="break-inside-avoid shadow-sm overflow-hidden bg-muted relative group cursor-pointer border border-border/50 block rounded-2xl"
                            >
                                <img
                                    src={item.thumbnail}
                                    alt={item.title}
                                    className="w-full h-auto transition-transform duration-700 group-hover:scale-105"
                                />
                                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300" />
                                <div className="absolute bottom-0 left-0 p-6 w-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-gradient-to-t from-black/80 to-transparent">
                                    <h4 className="text-white font-bold text-lg leading-tight mb-1">{item.title}</h4>
                                    <p className="text-white/70 text-sm capitalize">{item.category}</p>
                                </div>
                                <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300 transform translate-y-2 group-hover:translate-y-0">
                                    <div className="p-2 bg-white/20 backdrop-blur-md rounded-full text-white border border-white/30">
                                        <ArrowUpRight className="w-5 h-5" />
                                    </div>
                                </div>
                            </motion.a>
                        </Link>
                    ))}

                    {/* Added a placeholder for masonry layout demonstration */}
                    {photos.length === 0 && (
                        <div className="break-inside-avoid p-8 rounded-2xl bg-muted/30 border border-dashed border-border flex flex-col items-center justify-center text-center aspect-[3/4]">
                            <p className="text-muted-foreground mb-4">More collections available on request.</p>
                            <Link href="/portfolio">
                                <a className="btn-outline rounded-full text-sm">View Full Archive</a>
                            </Link>
                        </div>
                    )}
                </div>
            </section>

            {/* Archive & Social Content Section */}
            <section className="pb-24 container">
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
                    <div>
                        <h2 className="text-3xl md:text-5xl font-display font-bold tracking-tight">Archive & Posters</h2>
                        <p className="text-muted-foreground mt-4 text-lg">A broader selection of photography, social media posters, and creative experiments.</p>
                    </div>
                </div>

                <div className="columns-2 sm:columns-3 lg:columns-4 gap-4 space-y-4">
                    {localArchiveImages.map((src, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: (i % 8) * 0.1 }}
                            className="break-inside-avoid relative group rounded-xl overflow-hidden bg-muted border border-border/50"
                        >
                            <img
                                src={src}
                                alt={`Archive piece ${i + 1}`}
                                className="w-full h-auto transform transition-transform duration-700 group-hover:scale-105"
                                loading="lazy"
                            />
                            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                                <Expand className="w-8 h-8 text-white/70" />
                            </div>
                        </motion.div>
                    ))}
                </div>
            </section>


             {/* Pricing Section */}
            <section className="py-24 container relative z-10 border-t border-border/20">
                <div className="text-center mb-16">
                    <h2 className="text-4xl md:text-5xl font-display font-bold mb-4">Investment</h2>
                    <p className="text-muted-foreground text-lg">Transparent pricing for premium photography services.</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {packages.map((pkg, i) => (
                        <div key={i} className={cn(
                            "p-8 rounded-3xl border transition-all duration-300",
                            pkg.highlight 
                                ? "bg-muted/30 border-orange-500/50 scale-105 shadow-xl shadow-orange-500/10" 
                                : "bg-background border-border/50"
                        )}>
                            <h3 className="text-2xl font-bold mb-2">{pkg.name}</h3>
                            <div className="text-3xl font-display font-bold mb-6 text-orange-500">{pkg.price}</div>
                            <ul className="space-y-4 mb-8">
                                {pkg.features.map((feat, j) => (
                                    <li key={j} className="flex items-center gap-3 text-sm">
                                        <Sparkles className="w-4 h-4 text-orange-500 flex-shrink-0" />
                                        <span>{feat}</span>
                                    </li>
                                ))}
                            </ul>
                            <Link href="/contact">
                                <a className={cn(
                                    "w-full py-3 rounded-full text-center block text-sm font-semibold transition-all",
                                    pkg.highlight ? "bg-orange-500 text-white" : "border border-border hover:bg-muted"
                                )}>
                                    Book Now
                                </a>
                            </Link>
                        </div>
                    ))}
                </div>
            </section>

            {/* Services */}
            <section className="py-24 container relative z-10 border-t border-border/20">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                    {services.map((service, i) => (
                        <div key={i} className="skeuo-card p-8 text-center group transition-all duration-500 hover:-translate-y-2">
                            <div className="w-20 h-20 mx-auto bg-muted/50 rounded-[2.5rem] flex items-center justify-center mb-8 shadow-[inset_0_2px_4px_rgba(0,0,0,0.1),0_10px_20px_rgba(0,0,0,0.05)] group-hover:scale-110 transition-transform text-orange-500">
                                <service.icon className="w-10 h-10" />
                            </div>
                            <h3 className="text-2xl font-display font-medium mb-4">{service.title}</h3>
                            <p className="text-muted-foreground leading-relaxed font-light">{service.desc}</p>
                        </div>
                    ))}
                </div>
            </section>

            {/* CTA */}
            <section className="py-32 container text-center">
                <h2 className="text-4xl md:text-6xl font-display font-medium tracking-tight mb-8">
                    Let's shoot something <span className="text-orange-500">beautiful</span>.
                </h2>
                <Link href="/contact">
                    <a className="skeuo-button bg-orange-500 text-white px-12 py-5 rounded-full text-lg shadow-lg shadow-orange-500/20 active:bg-orange-600">
                        Book a Session
                    </a>
                </Link>
            </section>
        </div>
    );
}
