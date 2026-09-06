import { SEO } from "@/components/SEO";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Mail, Phone, Instagram, Linkedin, MessageSquare, ArrowRight, MapPin, Loader2, CheckCircle2 } from "lucide-react";
import { toast } from "sonner";
import { trpc } from "@/lib/trpc";
import { trackEvent } from "@/utils/analytics";
import { Link } from "wouter";

export default function Contact() {
    
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitted, setSubmitted] = useState(false);
    const [submitError, setSubmitError] = useState<string | null>(null);
    const [hasTrackedFormStart, setHasTrackedFormStart] = useState(false);
    const [formMountTime, setFormMountTime] = useState<number>(Date.now());
    const [fieldErrors, setFieldErrors] = useState<{ name?: string; email?: string }>({});
    
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        service: "High-End Video Production",
        details: "",
        websiteHoneypot: ""
    });

    useEffect(() => {
        setFormMountTime(Date.now());
    }, []);

    const handleFormInteraction = () => {
        if (!hasTrackedFormStart) {
            trackEvent('form_start');
            setHasTrackedFormStart(true);
        }
    };

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
            color: "text-blue-500",
            onClick: () => trackEvent('email_click')
        },
        {
            icon: <MessageSquare className="w-6 h-6" />,
            label: "WhatsApp",
            value: "+971545264632",
            href: "https://wa.me/971545264632",
            color: "text-emerald-500",
            onClick: () => trackEvent('whatsapp_click')
        },
        {
            icon: <Linkedin className="w-6 h-6" />,
            label: "LinkedIn",
            value: "gokul-kp03",
            href: linkedinLink,
            color: "text-blue-600",
            onClick: () => trackEvent('linkedin_click')
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

    const validateForm = () => {
        const errors: { name?: string; email?: string } = {};
        const trimmedName = formData.name.trim();
        const trimmedEmail = formData.email.trim();

        if (!trimmedName || trimmedName.length < 2) {
            errors.name = "Please enter your name (min 2 characters).";
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!trimmedEmail || !emailRegex.test(trimmedEmail)) {
            errors.email = "Please enter a valid email address.";
        }

        setFieldErrors(errors);
        return Object.keys(errors).length === 0;
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setSubmitError(null);

        if (!validateForm()) {
            toast.error("Please complete the required fields correctly.");
            return;
        }

        setIsSubmitting(true);

        try {
            await submitContact.mutateAsync({
                name: formData.name.trim(),
                email: formData.email.trim(),
                service: formData.service,
                details: formData.details.trim(),
                websiteHoneypot: formData.websiteHoneypot,
                clientTimestamp: formMountTime,
            });

            trackEvent('form_submit_success', { service: formData.service });
            setSubmitted(true);
            toast.success("Inquiry sent successfully! I will get back to you shortly.");

            // Reset form
            setFormData({
                name: "",
                email: "",
                service: "High-End Video Production",
                details: "",
                websiteHoneypot: ""
            });
            setFieldErrors({});
        } catch (error: any) {
            const errorMsg = error?.message || "Something went wrong sending your message. Please try again or reach out directly.";
            setSubmitError(errorMsg);
            toast.error(errorMsg);
            console.error("Submission error:", error);
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="min-h-screen bg-background pt-32 pb-20">
            <SEO 
                title="Book a Project & Consult | Gokul KP" 
                description="Get in touch with Gokul KP for premium commercial video production, B2C advertising campaigns, and direct-response content photography." 
            />
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
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    onClick={method.onClick}
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
                                    role="status"
                                    aria-live="polite"
                                >
                                    <div className="w-20 h-20 bg-orange-500/20 text-orange-500 rounded-full flex items-center justify-center mx-auto mb-6">
                                        <CheckCircle2 className="w-10 h-10" />
                                    </div>
                                    <h2 className="text-3xl font-display font-bold mb-4">Message Received!</h2>
                                    <p className="text-muted-foreground font-light mb-8">
                                        Thank you for reaching out. I'll review your project details and get back to you within 24 hours.
                                    </p>
                                    <button
                                        onClick={() => {
                                            setSubmitted(false);
                                            setFormMountTime(Date.now());
                                        }}
                                        className="text-orange-500 font-medium hover:underline flex items-center gap-2 mx-auto cursor-pointer"
                                    >
                                        Send another message
                                        <ArrowRight className="w-4 h-4" />
                                    </button>
                                </motion.div>
                            ) : (
                                <>
                                    <h2 className="text-3xl font-display font-bold mb-8">Quick Inquiry</h2>
                                    
                                    {submitError && (
                                        <div className="mb-6 p-4 rounded-xl bg-red-500/10 border border-red-500/30 text-red-400 text-xs flex flex-col gap-2" role="alert">
                                            <span>{submitError}</span>
                                            <div className="flex gap-3 mt-1">
                                                <a href={`mailto:${contactEmail}`} className="underline font-semibold hover:text-red-300">
                                                    Email directly
                                                </a>
                                                <span>•</span>
                                                <a href="https://wa.me/971545264632" target="_blank" rel="noopener noreferrer" className="underline font-semibold hover:text-red-300">
                                                    Chat on WhatsApp
                                                </a>
                                            </div>
                                        </div>
                                    )}

                                    <form className="space-y-6" onSubmit={handleSubmit} noValidate>
                                        {/* Honeypot field for bot protection (visually hidden) */}
                                        <div className="sr-only" aria-hidden="true" style={{ display: "none" }}>
                                            <label htmlFor="contact-website">Leave this field empty</label>
                                            <input
                                                type="text"
                                                id="contact-website"
                                                name="websiteHoneypot"
                                                tabIndex={-1}
                                                autoComplete="off"
                                                value={formData.websiteHoneypot}
                                                onChange={(e) => setFormData({ ...formData, websiteHoneypot: e.target.value })}
                                            />
                                        </div>

                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                            {/* Name input */}
                                            <div className="space-y-2">
                                                <label htmlFor="contact-name" className="text-xs uppercase tracking-widest text-muted-foreground flex justify-between">
                                                    <span>Name <span className="text-orange-500">*</span></span>
                                                    {fieldErrors.name && <span className="text-red-400 text-[10px] lowercase">{fieldErrors.name}</span>}
                                                </label>
                                                <div className={`relative rounded-xl overflow-hidden bg-muted/20 border ${fieldErrors.name ? 'border-red-500/60' : 'border-border'}`}>
                                                    <input
                                                        type="text"
                                                        id="contact-name"
                                                        name="name"
                                                        autoComplete="name"
                                                        required
                                                        aria-required="true"
                                                        aria-invalid={!!fieldErrors.name}
                                                        value={formData.name}
                                                        onChange={(e) => {
                                                            handleFormInteraction();
                                                            setFormData({ ...formData, name: e.target.value });
                                                            if (fieldErrors.name) setFieldErrors({ ...fieldErrors, name: undefined });
                                                        }}
                                                        onFocus={handleFormInteraction}
                                                        disabled={isSubmitting}
                                                        className="w-full bg-transparent px-5 py-4 outline-none transition-colors disabled:opacity-50 peer z-10 relative"
                                                        placeholder="John Doe"
                                                    />
                                                    <span className="absolute bottom-0 left-0 w-0 h-1 bg-orange-500 transition-all duration-300 peer-focus:w-full z-20" />
                                                </div>
                                            </div>

                                            {/* Email input */}
                                            <div className="space-y-2">
                                                <label htmlFor="contact-email" className="text-xs uppercase tracking-widest text-muted-foreground flex justify-between">
                                                    <span>Email <span className="text-orange-500">*</span></span>
                                                    {fieldErrors.email && <span className="text-red-400 text-[10px] lowercase">{fieldErrors.email}</span>}
                                                </label>
                                                <div className={`relative rounded-xl overflow-hidden bg-muted/20 border ${fieldErrors.email ? 'border-red-500/60' : 'border-border'}`}>
                                                    <input
                                                        type="email"
                                                        id="contact-email"
                                                        name="email"
                                                        autoComplete="email"
                                                        required
                                                        aria-required="true"
                                                        aria-invalid={!!fieldErrors.email}
                                                        value={formData.email}
                                                        onChange={(e) => {
                                                            setFormData({ ...formData, email: e.target.value });
                                                            if (fieldErrors.email) setFieldErrors({ ...fieldErrors, email: undefined });
                                                        }}
                                                        disabled={isSubmitting}
                                                        className="w-full bg-transparent px-5 py-4 outline-none transition-colors disabled:opacity-50 peer z-10 relative"
                                                        placeholder="john@company.com"
                                                    />
                                                    <span className="absolute bottom-0 left-0 w-0 h-1 bg-orange-500 transition-all duration-300 peer-focus:w-full z-20" />
                                                </div>
                                            </div>
                                        </div>

                                        {/* Service selector */}
                                        <div className="space-y-2">
                                            <label htmlFor="contact-service" className="text-xs uppercase tracking-widest text-muted-foreground">
                                                Service Interest
                                            </label>
                                            <div className="relative rounded-xl overflow-hidden bg-muted/20 border border-border">
                                                <select
                                                    id="contact-service"
                                                    name="service"
                                                    value={formData.service}
                                                    onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                                                    disabled={isSubmitting}
                                                    className="w-full bg-transparent px-5 py-4 outline-none transition-colors appearance-none disabled:opacity-50 peer z-10 relative cursor-pointer"
                                                >
                                                    <option className="bg-zinc-950 text-white" value="High-End Video Production">High-End Video Production</option>
                                                    <option className="bg-zinc-950 text-white" value="Performance Marketing Scaling">Performance Marketing Scaling (Meta Ads)</option>
                                                    <option className="bg-zinc-950 text-white" value="Brand & Commercial Photography">Brand &amp; Commercial Photography</option>
                                                    <option className="bg-zinc-950 text-white" value="Full Growth Retainer">Full Growth Retainer (Creative + Media)</option>
                                                </select>
                                                <span className="absolute bottom-0 left-0 w-0 h-1 bg-orange-500 transition-all duration-300 peer-focus:w-full z-20" />
                                            </div>
                                        </div>

                                        {/* Details textarea */}
                                        <div className="space-y-2">
                                            <label htmlFor="contact-details" className="text-xs uppercase tracking-widest text-muted-foreground">
                                                Project Details &amp; Goals
                                            </label>
                                            <div className="relative rounded-xl overflow-hidden bg-muted/20 border border-border">
                                                <textarea
                                                    id="contact-details"
                                                    name="details"
                                                    rows={4}
                                                    value={formData.details}
                                                    onChange={(e) => setFormData({ ...formData, details: e.target.value })}
                                                    disabled={isSubmitting}
                                                    className="w-full bg-transparent px-5 py-4 outline-none transition-colors disabled:opacity-50 peer z-10 relative resize-none"
                                                    placeholder="Tell me about your goals, current metrics, timeline..."
                                                ></textarea>
                                                <span className="absolute bottom-0 left-0 w-0 h-[3px] bg-orange-500 transition-all duration-300 peer-focus:w-full z-20" />
                                            </div>
                                        </div>

                                        <button
                                            type="submit"
                                            disabled={isSubmitting}
                                            className="w-full bg-orange-500 hover:bg-orange-600 text-white font-bold py-4 rounded-xl shadow-xl shadow-orange-500/20 transition-all transform hover:-translate-y-0.5 flex items-center justify-center gap-2 disabled:opacity-70 disabled:transform-none cursor-pointer"
                                        >
                                            {isSubmitting ? (
                                                <>
                                                    <Loader2 className="w-5 h-5 animate-spin" />
                                                    Sending Inquiry...
                                                </>
                                            ) : (
                                                <>
                                                    Send Message
                                                    <ArrowRight className="w-5 h-5" />
                                                </>
                                            )}
                                        </button>
                                        
                                        <div className="flex flex-col sm:flex-row items-center justify-between text-[11px] text-muted-foreground/70 mt-4 gap-2">
                                            <span>Direct response within 24 hours.</span>
                                            <Link href="/privacy" className="underline hover:text-orange-400">
                                                Privacy &amp; Data Handling
                                            </Link>
                                        </div>
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
