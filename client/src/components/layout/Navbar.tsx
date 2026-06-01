import { useState, useEffect, useRef } from "react";
import { Link, useLocation } from "wouter";
import { Menu, X, ChevronDown, Play, Camera, TrendingUp, LayoutGrid } from "lucide-react";
import { ThemeToggle } from "../ThemeToggle";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";

const dropdownIcons: Record<string, any> = {
  grid: LayoutGrid,
  play: Play,
  camera: Camera,
  trending: TrendingUp,
};

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const [portfolioOpen, setPortfolioOpen] = useState(false);
    const [location] = useLocation();
    const portfolioRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 50);
        };

        const handleClickOutside = (event: MouseEvent) => {
            if (portfolioRef.current && !portfolioRef.current.contains(event.target as Node)) {
                setPortfolioOpen(false);
            }
        };

        const handleEsc = (event: KeyboardEvent) => {
            if (event.key === "Escape") {
                setPortfolioOpen(false);
                setIsOpen(false);
            }
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

    // Lock body scroll when mobile menu is open
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "unset";
        }
        return () => {
            document.body.style.overflow = "unset";
        };
    }, [isOpen]);

    // Close menus on route change
    useEffect(() => {
        setIsOpen(false);
        setPortfolioOpen(false);
    }, [location]);

    const navLinks = [
        { name: "Home", href: "/", activeColor: "text-orange-500" },
        {
            name: "Work",
            href: "/portfolio",
            activeColor: "text-orange-500",
            dropdown: [
                { name: "All Portfolio", href: "/portfolio", icon: "grid" },
                { name: "Video", href: "/video", icon: "play", accent: "text-blue-400" },
                { name: "Photography", href: "/photo", icon: "camera", accent: "text-orange-400" },
                { name: "Marketing", href: "/marketing", icon: "trending", accent: "text-emerald-400" },
            ]
        },
        { name: "About", href: "/about", activeColor: "text-orange-500" },
        { name: "Results", href: "/results", activeColor: "text-orange-500" },
    ];

    return (
        <>
            <nav
                className={cn(
                    "fixed top-0 left-0 right-0 z-[100] transition-all duration-300 border-b",
                    scrolled
                        ? "bg-background/80 backdrop-blur-md border-border/40 py-3"
                        : "bg-transparent border-transparent py-5"
                )}
            >
                <div className="container flex items-center justify-between">
                    {/* Logo */}
                    <Link href="/" className="text-xl font-display font-bold tracking-tighter hover:opacity-80 transition-opacity">
                        Gokul KP<span className="text-accent">.</span>
                    </Link>

                    {/* Desktop Nav */}
                    <div className="hidden md:flex items-center gap-8 bg-background/50 backdrop-blur-sm px-6 py-2 rounded-full border border-border/20 shadow-sm">
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
                                        <AnimatePresence>
                                            {portfolioOpen && (
                                                <motion.div
                                                    initial={{ opacity: 0, y: -8, scale: 0.96 }}
                                                    animate={{ opacity: 1, y: 0, scale: 1 }}
                                                    exit={{ opacity: 0, y: -8, scale: 0.96 }}
                                                    transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
                                                    className="absolute top-full left-0 mt-3 z-50 min-w-[260px] rounded-2xl overflow-hidden"
                                                    style={{
                                                        background: "var(--bg-card)",
                                                        border: "1px solid var(--border-color)",
                                                        boxShadow: "var(--card-shadow)",
                                                    }}
                                                >
                                                    {/* Header Panel */}
                                                    <div className="px-5 py-4 border-b border-border/40 bg-muted/20">
                                                        <p className="text-[10px] uppercase tracking-[0.3em] text-muted-foreground font-bold">My Work</p>
                                                        <div className="flex gap-1.5 mt-2">
                                                            <div className="w-2 h-2 rounded-full bg-blue-400" />
                                                            <div className="w-2 h-2 rounded-full bg-orange-400" />
                                                            <div className="w-2 h-2 rounded-full bg-emerald-400" />
                                                        </div>
                                                    </div>
                                                    {/* Links */}
                                                    {link.dropdown.map((item: any, idx: number) => {
                                                        const Icon = dropdownIcons[item.icon] || LayoutGrid;
                                                        return (
                                                            <div key={item.name}>
                                                                <Link
                                                                    href={item.href}
                                                                    className="flex items-center gap-3 px-5 py-3.5 text-sm hover:bg-muted/60 transition-colors group/item"
                                                                    onClick={() => setPortfolioOpen(false)}
                                                                >
                                                                    <div className={cn("w-8 h-8 rounded-lg flex items-center justify-center bg-muted/50")}>
                                                                        <Icon className={cn("w-3.5 h-3.5", item.accent || "text-muted-foreground")} />
                                                                    </div>
                                                                    <span className={cn("font-medium", item.accent || "text-foreground")}>
                                                                        {item.name}
                                                                    </span>
                                                                </Link>
                                                                {idx === 0 && <div className="h-px bg-border/60 mx-3" />}
                                                            </div>
                                                        );
                                                    })}
                                                </motion.div>
                                            )}
                                        </AnimatePresence>
                                    </div>
                                );
                            }

                            return (
                                <Link
                                    key={link.name}
                                    href={link.href}
                                    className={cn(
                                        "text-sm font-medium transition-all duration-300 relative hover:text-foreground group",
                                        isActive ? link.activeColor : "text-muted-foreground"
                                    )}
                                >
                                    {link.name}
                                    <span className="absolute -bottom-1 left-0 right-0 h-[2px] bg-foreground rounded-full origin-left scale-x-0 transition-transform duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-x-100" />
                                    {isActive && (
                                        <span className="absolute -bottom-1 left-0 right-0 h-[2px] bg-current rounded-full" />
                                    )}
                                </Link>
                            );
                        })}
                    </div>

                    {/* Right Actions */}
                    <div className="hidden md:flex items-center gap-4">
                        <ThemeToggle />
                        <Link href="/contact" className="btn-primary rounded-full px-5 py-2 text-sm">
                            Let's Talk
                        </Link>
                    </div>

                    {/* Mobile Toggle */}
                    <div className="flex items-center gap-4 md:hidden">
                        <ThemeToggle />
                        <button
                            onClick={() => setIsOpen(!isOpen)}
                            className="text-foreground p-2 relative z-[120]"
                            aria-label="Toggle menu"
                        >
                            {isOpen ? <X size={24} /> : <Menu size={24} />}
                        </button>
                    </div>
                </div>
            </nav>

            {/* Mobile Menu - Full Screen Sheet */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                        className="fixed inset-0 z-[110] md:hidden bg-background w-full h-full min-h-screen flex flex-col pt-28 pb-10 px-6 overflow-y-auto"
                    >
                        <motion.div 
                            variants={{
                                hidden: { opacity: 0 },
                                show: {
                                    opacity: 1,
                                    transition: {
                                        staggerChildren: 0.08,
                                        delayChildren: 0.05
                                    }
                                }
                            }}
                            initial="hidden"
                            animate="show"
                            className="flex flex-col space-y-6"
                        >
                            {navLinks.map((link) => (
                                <motion.div 
                                    key={link.name}
                                    variants={{
                                        hidden: { opacity: 0, y: 15 },
                                        show: { opacity: 1, y: 0 }
                                    }}
                                    transition={{ duration: 0.3 }}
                                    className="space-y-2"
                                >
                                    <Link
                                        href={link.href}
                                        className={cn(
                                            "text-4xl font-display font-bold transition-colors block leading-tight",
                                            location === link.href ? link.activeColor : "text-foreground"
                                        )}
                                        onClick={() => setIsOpen(false)}
                                    >
                                        {link.name}
                                    </Link>
                                    {link.dropdown && (
                                        <div className="flex flex-col gap-3 pl-4 mt-1 border-l border-border/20">
                                            {link.dropdown.map((item) => (
                                                <Link
                                                    key={item.name}
                                                    href={item.href}
                                                    className={cn("block text-lg hover:text-orange-500 transition-colors py-1", item.accent || "text-muted-foreground")}
                                                    onClick={() => setIsOpen(false)}
                                                >
                                                    {item.name}
                                                </Link>
                                            ))}
                                        </div>
                                    )}
                                </motion.div>
                            ))}
                            <motion.div
                                variants={{
                                    hidden: { opacity: 0, y: 15 },
                                    show: { opacity: 1, y: 0 }
                                }}
                                transition={{ duration: 0.3 }}
                                className="pt-4"
                            >
                                <Link
                                    href="/contact"
                                    className="btn-primary w-full text-center py-4 text-base rounded-full"
                                    onClick={() => setIsOpen(false)}
                                >
                                    Let's Talk
                                </Link>
                            </motion.div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
};

export default Navbar;
