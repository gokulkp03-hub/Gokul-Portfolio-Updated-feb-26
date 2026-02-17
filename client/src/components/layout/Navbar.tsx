import { useState, useEffect, useRef } from "react";
import { Link, useLocation } from "wouter";
import { Menu, X, ChevronDown } from "lucide-react";
import { ThemeToggle } from "../ThemeToggle";
import { cn } from "@/lib/utils";

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const [portfolioOpen, setPortfolioOpen] = useState(false);
    const [location] = useLocation();
    const portfolioRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 20);
        };

        const handleClickOutside = (event: MouseEvent) => {
            if (portfolioRef.current && !portfolioRef.current.contains(event.target as Node)) {
                setPortfolioOpen(false);
            }
        };

        const handleEsc = (event: KeyboardEvent) => {
            if (event.key === "Escape") setPortfolioOpen(false);
        };

        window.addEventListener("scroll", handleScroll);
        document.addEventListener("mousedown", handleClickOutside);
        document.addEventListener("keydown", handleEsc);

        return () => {
            window.removeEventListener("scroll", handleScroll);
            document.removeEventListener("mousedown", handleClickOutside);
            document.removeEventListener("keydown", handleEsc);
        };
    }, []);

    // Close menus on route change
    useEffect(() => {
        setIsOpen(false);
        setPortfolioOpen(false);
    }, [location]);

    const navLinks = [
        { name: "Home", href: "/", activeColor: "text-orange-500" },
        {
            name: "Portfolio",
            href: "/portfolio",
            activeColor: "text-orange-500",
            dropdown: [
                { name: "All Work", href: "/portfolio" },
                { name: "Video", href: "/portfolio?filter=video" },
                { name: "Photography", href: "/portfolio?filter=photo" },
                { name: "Social Content", href: "/portfolio?filter=social" },
                { name: "Ads Creative", href: "/portfolio?filter=ads" }
            ]
        },
        { name: "Services", href: "/services", activeColor: "text-orange-500" },
        { name: "About", href: "/about", activeColor: "text-orange-500" },
        { name: "Results", href: "/results", activeColor: "text-orange-500" },
    ];

    return (
        <>
            <nav
                className={cn(
                    "fixed top-0 left-0 right-0 z-50 transition-all duration-300 border-b",
                    scrolled
                        ? "bg-background/80 backdrop-blur-md border-border/40 py-3"
                        : "bg-transparent border-transparent py-5"
                )}
            >
                <div className="container flex items-center justify-between">
                    {/* Logo */}
                    <Link href="/">
                        <a className="text-xl font-display font-bold tracking-tighter hover:opacity-80 transition-opacity">
                            Gokul KP<span className="text-accent">.</span>
                        </a>
                    </Link>

                    {/* Desktop Nav */}
                    <div className="hidden md:flex items-center gap-8 bg-background/50 backdrop-blur-sm px-6 py-2 rounded-full border border-white/10 shadow-sm">
                        {navLinks.map((link) => {
                            const isActive = location === link.href || (link.href !== "/" && location.startsWith(link.href));

                            if (link.dropdown) {
                                return (
                                    <div
                                        key={link.name}
                                        className="relative"
                                        ref={portfolioRef}
                                    >
                                        <button
                                            onClick={() => setPortfolioOpen(!portfolioOpen)}
                                            className={cn(
                                                "text-sm font-medium transition-all duration-300 relative hover:text-foreground/80 flex items-center gap-1 cursor-pointer",
                                                isActive ? link.activeColor : "text-muted-foreground"
                                            )}
                                        >
                                            {link.name}
                                            <ChevronDown className={cn("w-3 h-3 transition-transform duration-300", portfolioOpen && "rotate-180")} />
                                            {isActive && (
                                                <span className="absolute -bottom-1 left-0 right-0 h-0.5 bg-current rounded-full" />
                                            )}
                                        </button>

                                        {/* Dropdown */}
                                        {portfolioOpen && (
                                            <div className="absolute top-full left-0 mt-4 z-50 min-w-[220px] rounded-2xl border border-black/10 bg-white/90 backdrop-blur-xl shadow-xl dark:border-white/10 dark:bg-zinc-950/70 overflow-hidden animate-in fade-in zoom-in duration-200">
                                                {link.dropdown.map((item) => (
                                                    <Link key={item.name} href={item.href}>
                                                        <a
                                                            className="block px-6 py-3.5 text-sm text-muted-foreground hover:text-foreground hover:bg-black/5 dark:hover:bg-white/5 transition-colors"
                                                            onClick={() => setPortfolioOpen(false)}
                                                        >
                                                            {item.name}
                                                        </a>
                                                    </Link>
                                                ))}
                                            </div>
                                        )}
                                    </div>
                                );
                            }

                            return (
                                <Link key={link.name} href={link.href}>
                                    <a
                                        className={cn(
                                            "text-sm font-medium transition-all duration-300 relative hover:text-foreground/80",
                                            isActive ? link.activeColor : "text-muted-foreground"
                                        )}
                                    >
                                        {link.name}
                                        {isActive && (
                                            <span className="absolute -bottom-1 left-0 right-0 h-0.5 bg-current rounded-full" />
                                        )}
                                    </a>
                                </Link>
                            );
                        })}
                    </div>

                    {/* Right Actions */}
                    <div className="hidden md:flex items-center gap-4">
                        <ThemeToggle />
                        <Link href="/contact">
                            <a className="btn-primary rounded-full px-5 py-2 text-sm">
                                Let's work
                            </a>
                        </Link>
                    </div>

                    {/* Mobile Toggle */}
                    <div className="flex items-center gap-4 md:hidden">
                        <ThemeToggle />
                        <button
                            onClick={() => setIsOpen(!isOpen)}
                            className="text-foreground p-2 relative z-[110]"
                            aria-label="Toggle menu"
                        >
                            {isOpen ? <X size={24} /> : <Menu size={24} />}
                        </button>
                    </div>
                </div>
            </nav>

            {/* Mobile Menu - Full Screen Sheet */}
            {isOpen && (
                <div className="fixed inset-0 z-[100] md:hidden bg-[#0A0A0B] w-full h-full min-h-screen flex flex-col pt-28 pb-10 px-6 overflow-y-auto animate-in slide-in-from-right duration-500">
                    <div className="flex flex-col space-y-8">
                        {navLinks.map((link) => (
                            <div key={link.name} className="space-y-3">
                                <Link href={link.href}>
                                    <a
                                        className={cn(
                                            "text-4xl font-display font-bold transition-colors block leading-tight",
                                            location === link.href ? link.activeColor : "text-white"
                                        )}
                                        onClick={() => setIsOpen(false)}
                                    >
                                        {link.name}
                                    </a>
                                </Link>
                                {link.dropdown && (
                                    <div className="flex flex-col gap-4 pl-4 mt-2 border-l border-white/10">
                                        {link.dropdown.map((item) => (
                                            <Link key={item.name} href={item.href}>
                                                <a
                                                    className="block text-xl text-white/50 hover:text-orange-500 transition-colors py-1"
                                                    onClick={() => setIsOpen(false)}
                                                >
                                                    {item.name}
                                                </a>
                                            </Link>
                                        ))}
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>

                    <div className="mt-auto pt-10">
                        <Link href="/contact">
                            <a
                                className="btn-primary w-full text-center py-4 text-base rounded-full"
                                onClick={() => setIsOpen(false)}
                            >
                                Start a Project
                            </a>
                        </Link>
                    </div>
                </div>
            )}
        </>
    );
};

export default Navbar;
