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
        <div className="min-h-screen bg-white text-zinc-950 overflow-hidden relative selection:bg-zinc-900 selection:text-white">
            {/* Editorial Background - Light & Airy */}
            <div className="absolute inset-0 z-0 opacity-[0.05] pointer-events-none mix-blend-multiply" style={{ backgroundImage: 'url("https://www.transparenttextures.com/patterns/natural-paper.png")' }} />
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-zinc-100 rounded-full blur-[120px] pointer-events-none" />

            {/* Hero */}
            <section className="relative pt-48 pb-32 container px-4 text-center z-10">
                <motion.div
                    initial={{ opacity: 0, scale: 0.98 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 1 }}
                    className="mb-24"
                >
                    <span className="inline-block py-1 px-4 rounded-full bg-zinc-100 border border-zinc-200 text-zinc-500 text-[10px] font-bold uppercase tracking-[0.4em] mb-8">
                        Editorial // Product // Lifestyle
                    </span>
                    <h1 className="text-6xl md:text-[10rem] font-serif italic font-light tracking-tighter text-zinc-950 mb-12 text-balance leading-[0.8]">
                        The <span className="font-bold not-italic">Image.</span>
                    </h1>
                    <p className="text-xl text-zinc-500 max-w-xl mx-auto font-medium tracking-tight">
                        A study in light, composition, and the emotional resonance of the captured frame.
                    </p>
                </motion.div>

                {/* Hero Image / Featured Series */}
                <motion.div
                    initial={{ y: 50, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.2, duration: 0.8 }}
                    className="w-full h-[60vh] md:h-[85vh] rounded-3xl overflow-hidden relative bg-zinc-100 shadow-sm border border-zinc-100"
                >
                    <img
                        src="/assets/images/brands/Food-Photography/Cheesecake.jpg"
                        alt="Featured Photography"
                        className="w-full h-full object-cover hover:scale-105 transition-all duration-1000"
                        onError={(e) => { e.currentTarget.src = "/assets/images/portfolio-all/Cheesecake.jpg"; }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-white/40 via-transparent to-transparent" />

                    <div className="absolute bottom-12 left-12 text-left">
                        <span className="text-zinc-600 text-xs font-bold uppercase tracking-[0.3em] block mb-2">Issue 01 // Dubai</span>
                        <h3 className="text-4xl md:text-6xl text-zinc-950 font-serif italic">Urban Solitude</h3>
                    </div>
                </motion.div>
            </section>

            {/* Gallery Grid */}
            <section className="py-32 container">
                <h2 className="text-4xl md:text-6xl font-serif mb-16 italic text-zinc-950">Collections</h2>

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
            <section className="py-32 container relative z-10 border-t border-zinc-100">
                <div className="text-center mb-20">
                    <h2 className="text-5xl md:text-7xl font-serif text-zinc-950 mb-6">Investment</h2>
                    <p className="text-zinc-500 text-xl font-medium tracking-tight">Tailored packages for high-end production.</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                    {packages.map((pkg, i) => (
                        <div key={i} className={cn(
                            "p-10 rounded-2xl border transition-all duration-500",
                            pkg.highlight 
                                ? "bg-zinc-50 border-zinc-200 scale-105 shadow-2xl shadow-zinc-200/50" 
                                : "bg-white border-zinc-100"
                        )}>
                            <h3 className="text-3xl font-serif italic mb-2 text-zinc-950">{pkg.name}</h3>
                            <div className="text-2xl font-bold mb-8 text-zinc-800">{pkg.price}</div>
                            <ul className="space-y-6 mb-12">
                                {pkg.features.map((feat, j) => (
                                    <li key={j} className="flex items-center gap-4 text-sm text-zinc-600">
                                        <div className="w-1.5 h-1.5 rounded-full bg-zinc-900 flex-shrink-0" />
                                        <span className="font-medium tracking-tight">{feat}</span>
                                    </li>
                                ))}
                            </ul>
                            <Link href="/contact">
                                <a className={cn(
                                    "w-full py-4 rounded-full text-center block text-xs font-bold uppercase tracking-widest transition-all",
                                    pkg.highlight ? "bg-zinc-900 text-white hover:bg-black" : "border border-zinc-200 hover:bg-zinc-50 text-zinc-900"
                                )}>
                                    Secure Booking
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
