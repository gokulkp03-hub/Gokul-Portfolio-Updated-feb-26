import { useState } from "react";
import { Menu, X, Home as HomeIcon, Sun, Moon } from "lucide-react";
import { useLocation } from "wouter";
import { useTheme } from "@/contexts/ThemeContext";

const NAV_ITEMS: { id: string; label: string; path: string; icon?: typeof HomeIcon }[] = [
    { id: "portfolio", label: "Portfolio", path: "/portfolio" },
    { id: "case-studies", label: "Case Studies", path: "/case-studies" },
    { id: "services", label: "Services", path: "/services" },
    { id: "experience", label: "Experience", path: "/experience" },
    { id: "contact", label: "Contact", path: "/#contact" },
];

export default function Navbar() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [location, navigate] = useLocation();
    const { theme, toggleTheme } = useTheme();

    const handleNavigation = (item: typeof NAV_ITEMS[0]) => {
        if (item.id === "contact") {
            // If we are on home page, scroll to contact
            if (location === "/") {
                const element = document.getElementById("contact");
                element?.scrollIntoView({ behavior: "smooth" });
            } else {
                // Otherwise navigate to home with hash (client-side routing might not handle hash auto-scroll perfectly without extra logic, but let's try basic nav first)
                // For simplicity, just navigate to home, user can scroll down.
                // Or navigation to "/" then finding element.
                navigate("/");
                setTimeout(() => {
                    const element = document.getElementById("contact");
                    element?.scrollIntoView({ behavior: "smooth" });
                }, 100);
            }
        } else {
            navigate(item.path);
        }
        setIsMenuOpen(false);
    };

    return (
        <nav className="sticky top-0 z-40 border-b border-border/40 bg-background/60 backdrop-blur-lg supports-[backdrop-filter]:bg-background/60 transition-colors duration-300">
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-16">
                <div
                    className="text-2xl font-bold cursor-pointer"
                    onClick={() => {
                        navigate("/");
                        window.scrollTo({ top: 0, behavior: "smooth" });
                    }}
                >
                    <span className="text-orange-500">Gokul</span>
                    <span className="text-white"> KP</span>
                </div>

                <div className="hidden md:flex items-center gap-8">
                    {NAV_ITEMS.map((item) => {
                        const IconComponent = item.icon;
                        // Active state check could be added here
                        const isActive = location === item.path;

                        return (
                            <button
                                key={item.id}
                                onClick={() => handleNavigation(item)}
                                className={`text-sm font-medium transition-colors flex items-center gap-2 ${isActive ? "text-orange-500" : "text-gray-400 hover:text-orange-500"
                                    }`}
                            >
                                {IconComponent && <IconComponent size={16} />}
                                {item.label}
                            </button>
                        );
                    })}
                    <a
                        href="/Gokul_KP_CV.pdf"
                        download
                        className="px-4 py-2 rounded-lg font-semibold bg-orange-600 text-white hover:bg-orange-700 transition-colors"
                    >
                        Download CV
                    </a>

                    <button
                        onClick={toggleTheme}
                        className="p-2 rounded-lg text-gray-400 hover:text-orange-500 hover:bg-white/5 transition-all"
                        aria-label="Toggle theme"
                    >
                        {theme === "dark" ? <Sun size={20} /> : <Moon size={20} />}
                    </button>
                </div>

                <button
                    className="md:hidden p-2 hover:bg-orange-500/10 rounded-lg transition-colors"
                    onClick={() => setIsMenuOpen(!isMenuOpen)}
                >
                    {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                </button>
            </div>

            {isMenuOpen && (
                <div className="md:hidden border-t border-border/40 bg-background/90 backdrop-blur-lg">
                    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex flex-col gap-2">
                        {NAV_ITEMS.map((item) => (
                            <button
                                key={item.id}
                                onClick={() => handleNavigation(item)}
                                className="py-3 px-4 text-left text-sm font-medium text-gray-400 hover:text-orange-500 transition-colors hover:bg-orange-500/5 rounded-lg"
                            >
                                {item.label}
                            </button>
                        ))}
                        <a
                            href="/Gokul_KP_CV.pdf"
                            download
                            className="py-3 px-4 text-left text-sm font-medium text-orange-500 hover:bg-orange-500/10 rounded-lg border border-orange-500/20"
                        >
                            Download CV
                        </a>

                        <button
                            onClick={() => {
                                toggleTheme?.();
                                setIsMenuOpen(false);
                            }}
                            className="py-3 px-4 text-left text-sm font-medium text-gray-400 hover:text-orange-500 transition-colors hover:bg-orange-500/5 rounded-lg flex items-center gap-2"
                        >
                            {theme === "dark" ? <Sun size={16} /> : <Moon size={16} />}
                            {theme === "dark" ? "Light Mode" : "Dark Mode"}
                        </button>
                    </div>
                </div>
            )}
        </nav>
    );
}
