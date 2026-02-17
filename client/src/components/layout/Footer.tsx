import { Link } from "wouter";
import { Instagram, Linkedin, Mail, Twitter } from "lucide-react";

export default function Footer() {
    const year = new Date().getFullYear();

    return (
        <footer className="bg-foreground text-background py-16 border-t border-background/10">
            <div className="container px-4">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-10">

                    {/* Brand */}
                    <div>
                        <Link href="/">
                            <a className="text-2xl font-display font-bold tracking-tighter mb-4 inline-block hover:opacity-80 transition-opacity">
                                Gokul KP.
                            </a>
                        </Link>
                        <p className="text-background/60 text-sm max-w-xs">
                            Crafting digital experiences through video, photography, and strategy.
                        </p>
                    </div>

                    {/* Links */}
                    <div className="flex gap-8 md:gap-12">
                        <div className="flex flex-col gap-3">
                            <Link href="/video"><a className="text-sm font-medium hover:text-orange-400 transition-colors">Video</a></Link>
                            <Link href="/photo"><a className="text-sm font-medium hover:text-orange-400 transition-colors">Photo</a></Link>
                            <Link href="/marketing"><a className="text-sm font-medium hover:text-orange-400 transition-colors">Marketing</a></Link>
                        </div>
                        <div className="flex flex-col gap-3">
                            <Link href="/portfolio"><a className="text-sm font-medium hover:text-orange-400 transition-colors">Case Studies</a></Link>
                            <Link href="/about"><a className="text-sm font-medium hover:text-orange-400 transition-colors">About</a></Link>
                            <Link href="mailto:hello@gokulkp.com"><a className="text-sm font-medium hover:text-orange-400 transition-colors">Contact</a></Link>
                        </div>
                    </div>

                    {/* Socials */}
                    <div className="flex gap-4">
                        {[
                            { icon: Instagram, href: "https://instagram.com" },
                            { icon: Linkedin, href: "https://linkedin.com" },
                            { icon: Twitter, href: "https://twitter.com" },
                            { icon: Mail, href: "mailto:hello@gokulkp.com" },
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
                    <p>Designed with <span className="text-red-500">♥</span> in 2024.</p>
                </div>
            </div>
        </footer>
    );
}
