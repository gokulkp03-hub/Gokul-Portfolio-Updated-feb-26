import { useState } from "react";
import { motion } from "framer-motion";
import { Mail, Phone, Instagram, Linkedin, MessageSquare, ArrowRight, MapPin, Loader2, CheckCircle2 } from "lucide-react";
import { toast } from "sonner";
import { trpc } from "@/lib/trpc";

export default function Contact() {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitted, setSubmitted] = useState(false);
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        service: "High-End Video Production",
        details: ""
    });

    const { data: content } = trpc.content.get.useQuery();
    const sections = (content?.sections as any) || {};

    const contactEmail = sections.contactEmail || "gokulkp03@gmail.com";
    const instagramLink = sections.socialInstagram || "https://www.instagram.com/__agotime/";
    const instagramHandle = sections.socialInstagram ? "@" + sections.socialInstagram.split(".com/")[1] : "@__agotime";
    const linkedinLink = sections.socialLinkedIn || "https://www.linkedin.com/in/gokul-kp03"; 

    const contactMethods = [
        {
            icon: <Mail className="w-6 h-6" />,
            label: "Email",
            value: contactEmail,
            href: `mailto:${contactEmail}`,
            color: "text-blue-500"
        },
        {
            icon: <MessageSquare className="w-6 h-6" />,
            label: "WhatsApp",
            value: "+971545264632",
            href: "https://wa.me/971545264632",
            color: "text-emerald-500"
        },
        {
            icon: <Linkedin className="w-6 h-6" />,
            label: "LinkedIn",
            value: "gokul-kp03",
            href: linkedinLink,
            color: "text-blue-600"
        },
        {
            icon: <Instagram className="w-6 h-6" />,
            label: "Instagram",
            value: instagramHandle,
            href: instagramLink,
            color: "text-pink-500"
        }
    ];

    const submitContact = trpc.contact.submit.useMutation();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!formData.name || !formData.email) {
            toast.error("Please fill in your name and email.");
            return;
        }

        setIsSubmitting(true);

        try {
            await submitContact.mutateAsync(formData);
            setSubmitted(true);
            toast.success("Message sent successfully! I'll get back to you soon.");

            // Reset form after success
            setFormData({
                name: "",
                email: "",
                service: "High-End Video Production",
                details: ""
            });

            // Reset success state after 10 seconds to allow new submission if needed
            setTimeout(() => setSubmitted(false), 10000);
        } catch (error) {
            toast.error("Something went wrong. Please try again or email me directly.");
            console.error("Submission error:", error);
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="min-h-screen bg-background pt-32 pb-20">
            <div className="container px-4 md:px-8 max-w-[1400px] mx-auto">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-start">
                    {/* Left: Info */}
                    <div>
                        <h1 className="text-6xl md:text-9xl font-display font-bold tracking-tighter mb-8 uppercase italic flex flex-col items-start overflow-hidden">
                            <motion.span 
                                initial={{ opacity: 0, y: -40, rotate: -2 }}
                                animate={{ opacity: 1, y: 0, rotate: 0 }}
                                transition={{ duration: 0.7, type: "spring", stiffness: 100 }}
                                className="block"
                            >Let's</motion.span>
                            <motion.span 
                                initial={{ opacity: 0, x: 40, rotate: 2 }}
                                animate={{ opacity: 1, x: 0, rotate: 0 }}
                                transition={{ duration: 0.7, type: "spring", stiffness: 100, delay: 0.15 }}
                                className="text-orange-500 block"
                            >Scale.</motion.span>
                        </h1>
                        <p className="text-xl md:text-2xl text-muted-foreground font-light leading-relaxed mb-12 max-w-lg">
                            Tell me what you're building — I'll tell you exactly how to make it grow.
                        </p>

                        <div className="space-y-6 mb-16">
                            {contactMethods.map((method, i) => (
                                <motion.a
                                    key={i}
                                    href={method.href}
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: i * 0.1 }}
                                    className="flex items-center gap-6 p-6 rounded-2xl bg-muted/20 border border-border hover:border-orange-500/30 transition-all group"
                                >
                                    <div className={`${method.color} bg-muted/30 p-4 rounded-xl group-hover:scale-110 transition-transform`}>
                                        {method.icon}
                                    </div>
                                    <div>
                                        <div className="text-xs uppercase tracking-widest text-muted-foreground mb-1">{method.label}</div>
                                        <div className="text-xl font-medium text-foreground">{method.value}</div>
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

                        <div className="relative glass-card p-8 md:p-12 border border-border rounded-[2rem]">
                            {submitted ? (
                                <motion.div
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    className="text-center py-12"
                                >
                                    <div className="w-20 h-20 bg-orange-500/20 text-orange-500 rounded-full flex items-center justify-center mx-auto mb-6">
                                        <CheckCircle2 className="w-10 h-10" />
                                    </div>
                                    <h2 className="text-3xl font-display font-bold mb-4">Message Received!</h2>
                                    <p className="text-muted-foreground font-light mb-8">
                                        Thank you for reaching out. I'll review your project details and get back to you within 24 hours.
                                    </p>
                                    <button
                                        onClick={() => setSubmitted(false)}
                                        className="text-orange-500 font-medium hover:underline flex items-center gap-2 mx-auto"
                                    >
                                        Send another message
                                        <ArrowRight className="w-4 h-4" />
                                    </button>
                                </motion.div>
                            ) : (
                                <>
                                    <h2 className="text-3xl font-display font-bold mb-8">Quick Inquiry</h2>
                                    <form className="space-y-6" onSubmit={handleSubmit}>
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                            <div className="space-y-2">
                                                <label className="text-xs uppercase tracking-widest text-muted-foreground">Name</label>
                                                <div className="relative rounded-xl overflow-hidden bg-muted/20 border border-border">
                                                    <input
                                                        type="text"
                                                        required
                                                        value={formData.name}
                                                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                                        disabled={isSubmitting}
                                                        className="w-full bg-transparent px-5 py-4 outline-none transition-colors disabled:opacity-50 peer z-10 relative"
                                                        placeholder="John Doe"
                                                    />
                                                    <span className="absolute bottom-0 left-0 w-0 h-1 bg-orange-500 transition-all duration-300 peer-focus:w-full z-20" />
                                                </div>
                                            </div>
                                            <div className="space-y-2">
                                                <label className="text-xs uppercase tracking-widest text-muted-foreground">Email</label>
                                                <div className="relative rounded-xl overflow-hidden bg-muted/20 border border-border">
                                                    <input
                                                        type="email"
                                                        required
                                                        value={formData.email}
                                                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                                        disabled={isSubmitting}
                                                        className="w-full bg-transparent px-5 py-4 outline-none transition-colors disabled:opacity-50 peer z-10 relative"
                                                        placeholder="john@company.com"
                                                    />
                                                    <span className="absolute bottom-0 left-0 w-0 h-1 bg-orange-500 transition-all duration-300 peer-focus:w-full z-20" />
                                                </div>
                                            </div>
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-xs uppercase tracking-widest text-muted-foreground">Service Interest</label>
                                            <div className="relative rounded-xl overflow-hidden bg-muted/20 border border-border">
                                                <select
                                                    value={formData.service}
                                                    onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                                                    disabled={isSubmitting}
                                                    className="w-full bg-transparent px-5 py-4 outline-none transition-colors appearance-none disabled:opacity-50 peer z-10 relative"
                                                >
                                                    <option className="bg-black">High-End Video Production</option>
                                                    <option className="bg-black">Performance Marketing Scaling</option>
                                                    <option className="bg-black">Brand Photography</option>
                                                    <option className="bg-black">Full Growth Retainer</option>
                                                </select>
                                                <span className="absolute bottom-0 left-0 w-0 h-1 bg-orange-500 transition-all duration-300 peer-focus:w-full z-20" />
                                            </div>
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-xs uppercase tracking-widest text-muted-foreground">Project Details</label>
                                            <div className="relative rounded-xl overflow-hidden bg-muted/20 border border-border">
                                                <textarea
                                                    rows={4}
                                                    value={formData.details}
                                                    onChange={(e) => setFormData({ ...formData, details: e.target.value })}
                                                    disabled={isSubmitting}
                                                    className="w-full bg-transparent px-5 py-4 outline-none transition-colors disabled:opacity-50 peer z-10 relative resize-none"
                                                    placeholder="Tell me about your goals..."
                                                ></textarea>
                                                <span className="absolute bottom-0 left-0 w-0 h-[3px] bg-orange-500 transition-all duration-300 peer-focus:w-full z-20" />
                                            </div>
                                        </div>

                                        <button
                                            type="submit"
                                            disabled={isSubmitting}
                                            className="w-full bg-orange-500 hover:bg-orange-600 text-white font-bold py-4 rounded-xl shadow-xl shadow-orange-500/20 transition-all transform hover:-translate-y-1 flex items-center justify-center gap-2 disabled:opacity-70 disabled:transform-none"
                                        >
                                            {isSubmitting ? (
                                                <>
                                                    <Loader2 className="w-5 h-5 animate-spin" />
                                                    Sending...
                                                </>
                                            ) : (
                                                <>
                                                    Send Message
                                                    <ArrowRight className="w-5 h-5" />
                                                </>
                                            )}
                                        </button>
                                    </form>
                                </>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
