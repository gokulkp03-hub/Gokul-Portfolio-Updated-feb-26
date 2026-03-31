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
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-10">

                    {/* Brand */}
                    <div>
                        <Link href="/" className="text-2xl font-display font-bold tracking-tighter mb-4 inline-block hover:opacity-80 transition-opacity">
                            Gokul KP.
                        </Link>
                        <p className="text-background/60 text-sm max-w-xs">
                            Crafting digital experiences through video, photography, and strategy.
                        </p>
                    </div>

                    {/* Links */}
                    <div className="flex gap-8 md:gap-12">
                        <div className="flex flex-col gap-3">
                            <Link href="/video" className="text-sm font-medium hover:text-orange-400 transition-colors">Video</Link>
                            <Link href="/photo" className="text-sm font-medium hover:text-orange-400 transition-colors">Photo</Link>
                            <Link href="/marketing" className="text-sm font-medium hover:text-orange-400 transition-colors">Marketing</Link>
                        </div>
                        <div className="flex flex-col gap-3">
                            <Link href="/portfolio" className="text-sm font-medium hover:text-orange-400 transition-colors">Case Studies</Link>
                            <Link href="/about" className="text-sm font-medium hover:text-orange-400 transition-colors">About</Link>
                            <a href={`mailto:${contactEmail}`} className="text-sm font-medium hover:text-orange-400 transition-colors">Contact</a>
                        </div>
                    </div>

                    {/* Socials */}
                    <div className="flex gap-4">
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

                <div className="border-t border-background/10 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-background/40 text-center md:text-left">
                    <p>© {year} Gokul KP. All rights reserved.</p>
                    <p>Designed with <span className="text-red-500">♥</span> in {year}.</p>
                </div>
            </div>
        </footer>
    );
}
