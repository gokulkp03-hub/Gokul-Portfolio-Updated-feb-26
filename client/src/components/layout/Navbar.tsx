import { useState, useEffect } from "react";
import { Link, useLocation } from "wouter";
import { Menu, X, ChevronDown } from "lucide-react";
import { ThemeToggle } from "../ThemeToggle";
import { cn } from "@/lib/utils";

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const [portfolioOpen, setPortfolioOpen] = useState(false);
    const [location] = useLocation();

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 20);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

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
                        const isActive = location === link.href || location.startsWith(link.href + "/");

                        if (link.dropdown) {
                            return (
                                <div
                                    key={link.name}
                                    className="relative"
                                    onMouseEnter={() => setPortfolioOpen(true)}
                                    onMouseLeave={() => setPortfolioOpen(false)}
                                >
                                    <Link href={link.href}>
                                        <a
                                            className={cn(
                                                "text-sm font-medium transition-all duration-300 relative hover:text-foreground/80 flex items-center gap-1",
                                                isActive ? link.activeColor : "text-muted-foreground"
                                            )}
                                        >
                                            {link.name}
                                            <ChevronDown className="w-3 h-3" />
                                            {isActive && (
                                                <span className="absolute -bottom-1 left-0 right-0 h-0.5 bg-current rounded-full animate-scaleIn" />
                                            )}
                                        </a>
                                    </Link>

                                    {/* Dropdown */}
                                    {portfolioOpen && (
                                        <div className="absolute top-full left-0 mt-2 w-48 bg-background/95 backdrop-blur-xl border border-white/10 rounded-2xl shadow-2xl overflow-hidden animate-slideDown">
                                            {link.dropdown.map((item) => (
                                                <Link key={item.name} href={item.href}>
                                                    <a
                                                        className="block px-4 py-3 text-sm text-muted-foreground hover:text-white hover:bg-white/5 transition-colors"
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
                                        <span className="absolute -bottom-1 left-0 right-0 h-0.5 bg-current rounded-full animate-scaleIn" />
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
                        className="text-foreground p-2"
                        aria-label="Toggle menu"
                    >
                        {isOpen ? <X size={24} /> : <Menu size={24} />}
                    </button>
                </div>
            </div>

            {/* Mobile Menu */}
            {isOpen && (
                <div className="md:hidden absolute top-full left-0 right-0 bg-background/95 backdrop-blur-xl border-b border-border/40 p-4 flex flex-col gap-4 animate-slideDown shadow-2xl">
                    {navLinks.map((link) => (
                        <div key={link.name}>
                            <Link href={link.href}>
                                <a
                                    className={cn(
                                        "text-lg font-medium py-2 px-4 rounded-lg transition-colors block",
                                        location === link.href || location.startsWith(link.href + "/")
                                            ? `bg-muted ${link.activeColor}`
                                            : "text-foreground hover:bg-muted/50"
                                    )}
                                    onClick={() => setIsOpen(false)}
                                >
                                    {link.name}
                                </a>
                            </Link>
                            {link.dropdown && (
                                <div className="ml-4 mt-2 space-y-2">
                                    {link.dropdown.map((item) => (
                                        <Link key={item.name} href={item.href}>
                                            <a
                                                className="block text-sm text-muted-foreground hover:text-white py-2 px-4 rounded-lg hover:bg-white/5 transition-colors"
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
                    <Link href="/contact">
                        <a
                            className="btn-primary w-full text-center py-3 mt-2"
                            onClick={() => setIsOpen(false)}
                        >
                            Let's work
                        </a>
                    </Link>
                </div>
            )}
        </nav>
    );
};

export default Navbar;
