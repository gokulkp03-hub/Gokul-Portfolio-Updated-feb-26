import { motion } from "framer-motion";
import { Link } from "wouter";
import { Play, Film, Clock, CheckCircle2, ArrowRight, Check } from "lucide-react";
import { cn } from "@/lib/utils";
import { videoProjects } from "@/data/video";

const services = [
    { title: "Music Videos", desc: "Cinematic visuals that match the beat." },
    { title: "Commercials", desc: "High-impact ads that convert." },
    { title: "Social Content", desc: "Reels & TikToks optimized for retention." },
    { title: "Corporate", desc: "Professional interviews and event coverage." },
];

const packages = [
    {
        name: "Starter",
        price: "From $1.5k",
        desc: "Perfect for social media content and short ads.",
        features: ["1 Day Filming", "2 Social Edits (15s)", "Basic Color Grading", "Licensed Music"],
        highlight: false,
    },
    {
        name: "Growth",
        price: "From $3.5k",
        desc: "High-quality brand storytelling and commercials.",
        features: ["2 Days Filming", "1 Brand Film (60s)", "3 Social Cutdowns", "Advanced Sound Design", "Professional Voiceover"],
        highlight: true,
    },
    {
        name: "Production",
        price: "Custom",
        desc: "Full-scale production for TV and major campaigns.",
        features: ["Full Crew & Equipment", "Scripting & Storyboard", "Casting & Locations", "Cinema-Grade Post Production"],
        highlight: false,
    },
];

export default function VideoService() {
    return (
        <div className="min-h-screen bg-background text-foreground overflow-hidden">

            {/* Hero Section */}
            <section className="relative h-[80vh] flex items-center justify-center overflow-hidden">
                {/* Abstract Video Background */}
                <div className="absolute inset-0 z-0">
                    <div className="absolute inset-0 bg-black/60 z-10" />
                    <img
                        src="https://images.unsplash.com/photo-1536240478700-b869070f9279?q=80&w=2000&auto=format&fit=crop"
                        className="w-full h-full object-cover opacity-50"
                        alt="Video Background"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent z-20" />
                </div>

                <div className="relative z-30 container text-center px-4">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                    >
                        <span className="inline-block py-1 px-3 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-sm font-medium mb-6 backdrop-blur-md">
                            Video Production & Editing
                        </span>
                        <h1 className="text-5xl md:text-8xl font-display font-bold tracking-tighter mb-6 text-white text-balance">
                            Visuals that <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400">captivate</span>.
                        </h1>
                        <p className="text-xl text-zinc-300 max-w-2xl mx-auto mb-10 font-light leading-relaxed">
                            From high-energy music videos to polished corporate films.
                            I craft stories that keep eyes on the screen.
                        </p>
                        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                            <button className="btn bg-white text-black hover:bg-zinc-200 px-8 py-4 rounded-full font-semibold flex items-center gap-2 group transition-all">
                                <Play className="w-5 h-5 fill-current group-hover:scale-110 transition-transform" />
                                Watch Showreel
                            </button>
                            <Link href="#contact">
                                <a className="btn border border-white/20 hover:bg-white/10 text-white px-8 py-4 rounded-full font-medium transition-all">
                                    Start a Project
                                </a>
                            </Link>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* Showreel Section (Anchor) */}
            <section id="showreel" className="py-24 bg-black/50 border-y border-white/5">
                <div className="container">
                    <div className="relative aspect-video rounded-3xl overflow-hidden bg-muted group cursor-pointer border border-white/10">
                        <div className="absolute inset-0 flex items-center justify-center z-20 transition-transform duration-300 group-hover:scale-110">
                            <div className="w-20 h-20 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center border border-white/30 group-hover:bg-blue-500 group-hover:border-blue-400 transition-colors">
                                <Play className="w-8 h-8 text-white fill-current ml-1" />
                            </div>
                        </div>
                        <img
                            src={videoProjects[0].thumbnail}
                            alt="Showreel Cover"
                            className="w-full h-full object-cover opacity-60 group-hover:opacity-40 transition-opacity duration-500"
                        />
                        <div className="absolute inset-x-0 bottom-0 p-8 bg-gradient-to-t from-black/80 to-transparent">
                            <h2 className="text-2xl font-bold text-white">{videoProjects[0].title}</h2>
                            <p className="text-white/60">Cinematic Collection 2024</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Selected Works Grid */}
            <section className="py-24 container">
                <h2 className="text-3xl md:text-5xl font-display font-bold mb-12 flex items-center gap-4">
                    Latest Projects <span className="h-px flex-1 bg-border/50 hidden md:block"></span>
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {videoProjects.map((project, i) => (
                        <Link key={project.id} href="/portfolio">
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.1 }}
                                className="group relative aspect-video rounded-2xl overflow-hidden bg-muted cursor-pointer border border-border/50"
                            >
                                <img
                                    src={project.thumbnail}
                                    alt={project.title}
                                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                                />
                                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors" />
                                <div className="absolute bottom-0 left-0 p-6 md:p-8 w-full bg-gradient-to-t from-black/90 via-black/50 to-transparent translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                                    <span className="text-blue-400 text-xs font-bold uppercase tracking-wider mb-2 block">{project.category}</span>
                                    <h3 className="text-2xl font-bold text-white flex items-center justify-between">
                                        {project.title}
                                        <ArrowRight className="w-5 h-5 -rotate-45 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0" />
                                    </h3>
                                </div>
                            </motion.div>
                        </Link>
                    ))}
                </div>
            </section>

            {/* Services List */}
            <section className="py-24 bg-card border-y border-border/40">
                <div className="container max-w-[1200px]">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                        <div>
                            <h2 className="text-4xl md:text-5xl font-display font-bold mb-6">Capabilities</h2>
                            <p className="text-muted-foreground text-lg mb-8 leading-relaxed max-w-lg">
                                Full-service production capabilities tailored to modern platforms.
                                Whether you need a 15-second ad or a 5-minute documentary, I handle the entire pipeline.
                            </p>
                            <ul className="space-y-4">
                                {["Concept & Scripting", "4K Filming & Lighting", "Advanced Editing & Color Grading", "Sound Design & Mixing"].map((item, i) => (
                                    <li key={i} className="flex items-center gap-3 text-lg">
                                        <CheckCircle2 className="w-6 h-6 text-blue-500 flex-shrink-0" />
                                        {item}
                                    </li>
                                ))}
                            </ul>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            {services.map((service, i) => (
                                <div key={i} className="p-6 rounded-2xl bg-muted/30 border border-border/50 hover:border-blue-500/30 transition-colors">
                                    <h3 className="text-xl font-bold mb-2">{service.title}</h3>
                                    <p className="text-sm text-muted-foreground">{service.desc}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* Packages */}
            <section className="py-24 container max-w-[1200px]">
                <div className="text-center mb-16">
                    <h2 className="text-4xl md:text-5xl font-display font-bold mb-4">Investment</h2>
                    <p className="text-muted-foreground text-lg">Transparent pricing for standard packages.</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-start">
                    {packages.map((pkg, i) => (
                        <div
                            key={i}
                            className={cn(
                                "p-8 rounded-3xl border transition-all duration-300 relative",
                                pkg.highlight
                                    ? "bg-card border-blue-500/50 shadow-2xl shadow-blue-500/10 scale-105 z-10"
                                    : "bg-muted/10 border-border/50 hover:border-border"
                            )}
                        >
                            {pkg.highlight && (
                                <span className="absolute -top-4 left-1/2 -translate-x-1/2 bg-blue-500 text-white text-xs font-bold uppercase tracking-widest px-3 py-1 rounded-full">
                                    Most Popular
                                </span>
                            )}
                            <h3 className="text-2xl font-bold mb-2">{pkg.name}</h3>
                            <div className="text-3xl font-display font-bold mb-4">{pkg.price}</div>
                            <p className="text-muted-foreground text-sm mb-8 h-10">{pkg.desc}</p>

                            <ul className="space-y-4 mb-8">
                                {pkg.features.map((feat, j) => (
                                    <li key={j} className="flex items-start gap-3 text-sm">
                                        <Check className="w-4 h-4 text-blue-500 mt-0.5 flex-shrink-0" />
                                        {feat}
                                    </li>
                                ))}
                            </ul>

                            <Link href="#contact">
                                <a className={cn(
                                    "w-full btn rounded-full py-3 text-sm font-semibold flex items-center justify-center",
                                    pkg.highlight ? "bg-blue-500 hover:bg-blue-600 text-white" : "btn-outline"
                                )}>
                                    Choose {pkg.name}
                                </a>
                            </Link>
                        </div>
                    ))}
                </div>
            </section>

            {/* CTA */}
            <section id="contact" className="py-32 container text-center">
                <h2 className="text-4xl md:text-6xl font-display font-bold mb-6 text-balance">
                    Have a vision in mind?
                </h2>
                <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-10">
                    Let's discuss your project and create something extraordinary.
                </p>
                <Link href="mailto:hello@gokulkp.com">
                    <a className="btn bg-blue-600 hover:bg-blue-700 text-white px-10 py-4 rounded-full text-lg font-semibold shadow-lg shadow-blue-500/25 transition-all hover:-translate-y-1">
                        Get in Touch
                    </a>
                </Link>
            </section>

        </div>
    );
}
