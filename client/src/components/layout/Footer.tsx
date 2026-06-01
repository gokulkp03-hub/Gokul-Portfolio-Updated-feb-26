import { Link } from "wouter";
import { Instagram, Linkedin, Mail, Twitter, Palette } from "lucide-react";
import { trpc } from "@/lib/trpc";

export default function Footer() {
    const year = new Date().getFullYear();
    const { data: content } = trpc.content.get.useQuery();
    const sections = (content?.sections as any) || {};

    const contactEmail = sections.contactEmail || "gokulkp03@gmail.com";
    const instagramLink = sections.socialInstagram || "https://www.instagram.com/__agotime/";
    const linkedinLink = sections.socialLinkedIn || "https://www.linkedin.com/in/gokul-kp03";
    const twitterLink = sections.socialTwitter || "https://twitter.com";
    const behanceLink = sections.socialBehance || "https://behance.net";

    return (
        <footer className="bg-foreground text-background py-16 border-t border-background/10">
            <div className="container px-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-16 items-start">

                    {/* Column 1: Brand & Services Tags */}
                    <div className="space-y-6">
                        <div>
                            <Link href="/" className="text-3xl font-display font-bold tracking-tighter uppercase mb-4 inline-block hover:opacity-80 transition-opacity">
                                GokulKP.
                            </Link>
                            <p className="text-background/60 text-sm max-w-xs leading-relaxed">
                                Performance Marketing. Video Production. Ad Creatives.
                            </p>
                        </div>
                        <div className="flex flex-wrap gap-2 pt-2">
                            <span className="px-3 py-1 bg-background/10 rounded-full text-[10px] text-background/80 uppercase font-semibold tracking-wider">Video Production</span>
                            <span className="px-3 py-1 bg-background/10 rounded-full text-[10px] text-background/80 uppercase font-semibold tracking-wider">UGC Creative</span>
                            <span className="px-3 py-1 bg-background/10 rounded-full text-[10px] text-background/80 uppercase font-semibold tracking-wider">Paid Acquisition</span>
                            <span className="px-3 py-1 bg-background/10 rounded-full text-[10px] text-background/80 uppercase font-semibold tracking-wider">ManyChat Flows</span>
                        </div>
                    </div>

                    {/* Column 2: Navigation & Services */}
                    <div className="grid grid-cols-2 gap-8 w-full">
                        <div className="space-y-4">
                            <h4 className="text-xs uppercase tracking-widest text-background/40 font-bold">Navigation</h4>
                            <div className="flex flex-col gap-2">
                                <Link href="/" className="text-sm font-medium hover:text-orange-400 transition-colors">Home</Link>
                                <Link href="/portfolio" className="text-sm font-medium hover:text-orange-400 transition-colors">Work</Link>
                                <Link href="/about" className="text-sm font-medium hover:text-orange-400 transition-colors">About</Link>
                                <Link href="/results" className="text-sm font-medium hover:text-orange-400 transition-colors">Results</Link>
                            </div>
                        </div>
                        <div className="space-y-4">
                            <h4 className="text-xs uppercase tracking-widest text-background/40 font-bold">Work With Me</h4>
                            <div className="flex flex-col gap-2">
                                <Link href="/services" className="text-sm font-medium hover:text-orange-400 transition-colors">Services & Pricing</Link>
                                <Link href="/contact" className="text-sm font-medium hover:text-orange-400 transition-colors">Contact</Link>
                                <a href={`mailto:${contactEmail}`} className="text-sm font-medium hover:text-orange-400 transition-colors">Direct Email</a>
                            </div>
                        </div>
                    </div>

                    {/* Column 3: Connect & Socials */}
                    <div className="space-y-6 md:justify-self-end">
                        <div>
                            <h4 className="text-xs uppercase tracking-widest text-background/40 font-bold mb-4">Connect</h4>
                            <div className="flex gap-3">
                                {[
                                    { icon: Instagram, href: instagramLink },
                                    { icon: Linkedin, href: linkedinLink },
                                    { icon: Twitter, href: twitterLink },
                                    { icon: Palette, href: behanceLink },
                                    { icon: Mail, href: `mailto:${contactEmail}` },
                                ].map((social, i) => (
                                    <a
                                        key={i}
                                        href={social.href}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="p-3 bg-background/10 rounded-full hover:bg-background/20 transition-colors"
                                    >
                                        <social.icon className="w-5 h-5" />
                                    </a>
                                ))}
                            </div>
                        </div>
                        <p className="text-xs text-background/60 leading-relaxed">
                            Based in Dubai, UAE.<br />Operating across GCC region.
                        </p>
                    </div>

                </div>

                <div className="border-t border-background/10 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-background/40 text-center md:text-left">
                    <p>© 2026 Gokul KP. All rights reserved.</p>
                    <div className="flex items-center gap-2">
                        <span className="inline-block w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                        <span className="uppercase font-semibold tracking-wider text-[10px]">Dubai, United Arab Emirates</span>
                    </div>
                </div>
            </div>
        </footer>
    );
}
