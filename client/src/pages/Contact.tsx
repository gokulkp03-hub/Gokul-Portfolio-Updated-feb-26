import { motion } from "framer-motion";
import { Mail, Phone, Instagram, Linkedin, MessageSquare, ArrowRight, MapPin } from "lucide-react";

export default function Contact() {
    const contactMethods = [
        {
            icon: <Mail className="w-6 h-6" />,
            label: "Email",
            value: "hello@gokulkp.com",
            href: "mailto:hello@gokulkp.com",
            color: "text-blue-500"
        },
        {
            icon: <MessageSquare className="w-6 h-6" />,
            label: "WhatsApp",
            value: "+971 XXX XXX XXXX",
            href: "https://wa.me/971XXXXXXXXX",
            color: "text-emerald-500"
        },
        {
            icon: <Linkedin className="w-6 h-6" />,
            label: "LinkedIn",
            value: "gokulkp-pro",
            href: "https://linkedin.com/in/gokulkp",
            color: "text-blue-600"
        },
        {
            icon: <Instagram className="w-6 h-6" />,
            label: "Instagram",
            value: "@gokul.kp",
            href: "https://instagram.com/gokul.kp",
            color: "text-pink-500"
        }
    ];

    return (
        <div className="min-h-screen bg-background pt-32 pb-20">
            <div className="container px-4 md:px-8 max-w-[1400px] mx-auto">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-start">
                    {/* Left: Info */}
                    <div>
                        <motion.h1
                            initial={{ opacity: 0, x: -30 }}
                            animate={{ opacity: 1, x: 0 }}
                            className="text-6xl md:text-9xl font-display font-bold tracking-tighter mb-8 uppercase italic"
                        >
                            Let's <br /> <span className="text-orange-500">Scale</span>.
                        </motion.h1>
                        <p className="text-xl md:text-2xl text-muted-foreground font-light leading-relaxed mb-12 max-w-lg">
                            Whether you need a high-end cinematic showreel or a data-driven growth strategy, I'm ready to build it.
                        </p>

                        <div className="space-y-6 mb-16">
                            {contactMethods.map((method, i) => (
                                <motion.a
                                    key={i}
                                    href={method.href}
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: i * 0.1 }}
                                    className="flex items-center gap-6 p-6 rounded-2xl bg-white/5 border border-white/10 hover:border-orange-500/30 transition-all group"
                                >
                                    <div className={`${method.color} bg-white/5 p-4 rounded-xl group-hover:scale-110 transition-transform`}>
                                        {method.icon}
                                    </div>
                                    <div>
                                        <div className="text-xs uppercase tracking-widest text-muted-foreground mb-1">{method.label}</div>
                                        <div className="text-xl font-medium text-white">{method.value}</div>
                                    </div>
                                </motion.a>
                            ))}
                        </div>

                        <div className="flex items-center gap-2 text-muted-foreground font-light">
                            <MapPin className="w-4 h-4 text-orange-500" />
                            <span>Based in UAE • Operating Globally</span>
                        </div>
                    </div>

                    {/* Right: Form / CTA */}
                    <div className="relative">
                        <div className="absolute inset-0 bg-orange-500/5 blur-[120px] rounded-full pointer-events-none" />

                        <div className="relative glass-card p-8 md:p-12 border border-white/10 rounded-[2rem]">
                            <h2 className="text-3xl font-display font-bold mb-8">Quick Inquiry</h2>
                            <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="space-y-2">
                                        <label className="text-xs uppercase tracking-widest text-muted-foreground">Name</label>
                                        <input type="text" className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:border-orange-500/50 outline-none transition-colors" placeholder="John Doe" />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-xs uppercase tracking-widest text-muted-foreground">Email</label>
                                        <input type="email" className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:border-orange-500/50 outline-none transition-colors" placeholder="john@company.com" />
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <label className="text-xs uppercase tracking-widest text-muted-foreground">Service Interest</label>
                                    <select className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:border-orange-500/50 outline-none transition-colors appearance-none">
                                        <option className="bg-black">High-End Video Production</option>
                                        <option className="bg-black">Performance Marketing Scaling</option>
                                        <option className="bg-black">Brand Photography</option>
                                        <option className="bg-black">Full Growth Retainer</option>
                                    </select>
                                </div>
                                <div className="space-y-2">
                                    <label className="text-xs uppercase tracking-widest text-muted-foreground">Project Details</label>
                                    <textarea rows={4} className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:border-orange-500/50 outline-none transition-colors" placeholder="Tell me about your goals..."></textarea>
                                </div>

                                <button className="w-full bg-orange-500 hover:bg-orange-600 text-white font-bold py-4 rounded-xl shadow-xl shadow-orange-500/20 transition-all transform hover:-translate-y-1 flex items-center justify-center gap-2">
                                    Send Message
                                    <ArrowRight className="w-5 h-5" />
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
