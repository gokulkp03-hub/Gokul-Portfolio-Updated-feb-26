import { Link } from "wouter";
import { Instagram, Linkedin, Mail, Twitter, Palette } from "lucide-react";
import { trpc } from "@/lib/trpc";
import { trackEvent } from "@/utils/analytics";

export default function Footer() {
    const year = new Date().getFullYear();
    const { data: content } = trpc.content.get.useQuery();
    const sections = (content?.sections as any) || {};

    const contactEmail = sections.contactEmail || "gokulkp03@gmail.com";
    const instagramLink = sections.socialInstagram || "https://www.instagram.com/__agotime/";
    const linkedinLink = sections.socialLinkedIn || "https://www.linkedin.com/in/gokul-kp03";
    const behanceLink = sections.socialBehance || "https://www.behance.net/gallery/223042577/Gokul-Portfolio";

    return (
        <footer className="bg-card text-foreground py-16 border-t border-border/40">
            <div className="container px-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-16 items-start">

                    {/* Column 1: Brand & Services Tags */}
                    <div className="space-y-6">
                        <div>
                            <Link href="/" className="text-3xl font-display font-bold tracking-tighter uppercase mb-4 inline-block hover:opacity-80 transition-opacity">
                                GokulKP.
                            </Link>
                            <p className="text-muted-foreground text-sm max-w-xs leading-relaxed">
                                Performance Marketing. Video Production. Ad Creatives.
                            </p>
                        </div>
                        <div className="flex flex-wrap gap-2 pt-2">
                            <span className="px-3 py-1 bg-muted rounded-full text-[10px] text-muted-foreground uppercase font-semibold tracking-wider">Video Production</span>
                            <span className="px-3 py-1 bg-muted rounded-full text-[10px] text-muted-foreground uppercase font-semibold tracking-wider">UGC Creative</span>
                            <span className="px-3 py-1 bg-muted rounded-full text-[10px] text-muted-foreground uppercase font-semibold tracking-wider">Paid Acquisition</span>
                            <span className="px-3 py-1 bg-muted rounded-full text-[10px] text-muted-foreground uppercase font-semibold tracking-wider">ManyChat Flows</span>
                        </div>
                    </div>

                    {/* Column 2: Navigation & Services */}
                    <div className="grid grid-cols-2 gap-8 w-full">
                        <div className="space-y-4">
                            <h4 className="text-xs uppercase tracking-widest text-muted-foreground/60 font-bold">Navigation</h4>
                            <div className="flex flex-col gap-2">
                                <Link href="/" className="text-sm font-medium hover:text-orange-400 transition-colors">Home</Link>
                                <Link href="/portfolio" className="text-sm font-medium hover:text-orange-400 transition-colors">Work</Link>
                                <Link href="/about" className="text-sm font-medium hover:text-orange-400 transition-colors">About</Link>
                                <Link href="/results" className="text-sm font-medium hover:text-orange-400 transition-colors">Results</Link>
                                <Link href="/privacy" className="text-sm font-medium hover:text-orange-400 transition-colors">Privacy Policy</Link>
                            </div>
                        </div>
                        <div className="space-y-4">
                            <h4 className="text-xs uppercase tracking-widest text-muted-foreground/60 font-bold">Work With Me</h4>
                            <div className="flex flex-col gap-2">
                                <Link href="/services" className="text-sm font-medium hover:text-orange-400 transition-colors">Services</Link>
                                <Link href="/contact" className="text-sm font-medium hover:text-orange-400 transition-colors">Contact</Link>
                                <a href={`mailto:${contactEmail}`} className="text-sm font-medium hover:text-orange-400 transition-colors" onClick={() => trackEvent('email_click')}>Direct Email</a>
                            </div>
                        </div>
                    </div>

                    {/* Column 3: Connect & Socials */}
                    <div className="space-y-6 md:justify-self-end">
                        <div>
                            <h4 className="text-xs uppercase tracking-widest text-muted-foreground/60 font-bold mb-4">Connect</h4>
                            <div className="flex gap-3">
                                {[
                                    { icon: Instagram, href: instagramLink },
                                    { icon: Linkedin, href: linkedinLink, type: 'linkedin' },
                                    { icon: Palette, href: behanceLink },
                                    { icon: Mail, href: `mailto:${contactEmail}`, type: 'email' },
                                ].map((social, i) => (
                                    <a
                                        key={i}
                                        href={social.href}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        onClick={() => {
                                            if (social.type === 'linkedin') trackEvent('linkedin_click');
                                            if (social.type === 'email') trackEvent('email_click');
                                        }}
                                        className="w-10 h-10 rounded-full border border-border flex items-center justify-center text-muted-foreground hover:bg-orange-500 hover:text-white hover:border-orange-500 transition-all hover:scale-110"
                                    >
                                        <social.icon className="w-5 h-5" />
                                    </a>
                                ))}
                            </div>
                        </div>
                        <p className="text-xs text-muted-foreground leading-relaxed">
                            Based in Dubai, UAE.<br />Operating across GCC region.
                        </p>
                    </div>

                </div>

                {/* Availability signal */}
                <div className="border-t border-border/40 mt-12 pt-6">
                    <div className="flex flex-col md:flex-row items-center justify-between gap-4 p-5 rounded-2xl bg-muted/30 border border-border/40">
                        <div className="flex items-center gap-3">
                            <span className="inline-block w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse flex-shrink-0" />
                            <span className="text-sm text-foreground/80 font-medium">Available for new projects — GCC &amp; remote</span>
                        </div>
                        <a
                            href="https://wa.me/971545264632?text=Hi%20Gokul%2C%20I%20saw%20your%20portfolio%20and%20I%27d%20love%20to%20discuss%20a%20project."
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-xs font-bold uppercase tracking-widest text-orange-400 hover:text-orange-300 transition-colors flex items-center gap-1.5"
                        >
                            Start a conversation →
                        </a>
                    </div>
                </div>

                <div className="border-t border-border/40 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-muted-foreground/50 text-center md:text-left">
                    <div className="flex items-center gap-4">
                        <p>© 2026 Gokul KP. All rights reserved.</p>
                        <span className="text-border">•</span>
                        <Link href="/privacy" className="hover:text-foreground transition-colors underline">Privacy Policy</Link>
                    </div>
                    <div className="flex items-center gap-2">
                        <span className="inline-block w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                        <span className="uppercase font-semibold tracking-wider text-[10px]">Dubai, United Arab Emirates</span>
                    </div>
                </div>
            </div>
        </footer>
    );
}
