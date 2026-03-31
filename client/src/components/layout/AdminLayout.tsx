import { ReactNode } from "react";
import { Link, useLocation } from "wouter";
import {
    LayoutDashboard,
    Briefcase,
    Image as ImageIcon,
    Settings,
    LogOut,
    ExternalLink,
    ChevronRight,
    TrendingUp,
    FileText,
    MessageSquare,
    Menu,
    X
} from "lucide-react";
import { trpc } from "@/lib/trpc";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useState } from "react";

const NAV_ITEMS = [
    { href: "/admin", label: "Dashboard", icon: LayoutDashboard },
    { href: "/admin/projects", label: "Projects", icon: Briefcase },
    { href: "/admin/media", label: "Media Library", icon: ImageIcon },
    { href: "/admin/marketing", label: "Marketing Assets", icon: TrendingUp },
    { href: "/admin/content", label: "Pages / Content", icon: FileText },
    { href: "/admin/contact", label: "Messages", icon: MessageSquare },
    { href: "/admin/settings", label: "Settings", icon: Settings },
];

export default function AdminLayout({ children }: { children: ReactNode }) {
    const [location] = useLocation();
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const logoutMutation = trpc.auth.logout.useMutation();

    const handleLogout = async () => {
        await logoutMutation.mutateAsync();
        window.location.href = "/";
    };

    const closeMobileMenu = () => setIsMobileMenuOpen(false);

    const SidebarContent = () => (
        <>
            <div className="p-6 md:p-8 flex items-center justify-between">
                <div>
                    <Link href="/">
                        <a className="text-xl md:text-2xl font-bold bg-gradient-to-r from-orange-500 to-orange-300 bg-clip-text text-transparent hover:opacity-80 transition-opacity flex items-center gap-2">
                            <div className="w-8 h-8 rounded-lg bg-orange-500 flex items-center justify-center text-white text-sm">G</div>
                            PORTFOLIO
                        </a>
                    </Link>
                    <div className="mt-2 text-[10px] md:text-xs text-neutral-500 uppercase tracking-widest font-semibold flex items-center gap-2">
                        Admin Panel <div className="w-1.5 h-1.5 rounded-full bg-orange-500 animate-pulse" />
                    </div>
                </div>
                <Button 
                    variant="ghost" 
                    size="icon" 
                    className="md:hidden text-neutral-400 hover:text-white"
                    onClick={closeMobileMenu}
                >
                    <X className="w-6 h-6" />
                </Button>
            </div>

            <nav className="flex-1 px-4 py-4 md:py-8 space-y-1.5 md:space-y-2 overflow-y-auto">
                {NAV_ITEMS.map((item) => {
                    const isActive = location === item.href;
                    const Icon = item.icon;
                    return (
                        <Link key={item.href} href={item.href}>
                            <a onClick={closeMobileMenu} className={cn(
                                "flex items-center gap-4 px-4 py-3 rounded-xl transition-all duration-300 group relative overflow-hidden",
                                isActive
                                    ? "bg-orange-500/10 text-orange-400 border border-orange-500/20"
                                    : "text-neutral-400 hover:text-white hover:bg-neutral-800/50"
                            )}>
                                <Icon className={cn("w-5 h-5 transition-transform duration-300 group-hover:scale-110", isActive && "text-orange-500")} />
                                <span className="font-medium tracking-tight text-sm md:text-base">{item.label}</span>
                                {isActive && (
                                    <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-6 bg-orange-500 rounded-r-full shadow-[0_0_10px_rgba(249,115,22,0.5)]" />
                                )}
                                <ChevronRight className={cn(
                                    "w-4 h-4 ml-auto opacity-0 -translate-x-2 transition-all duration-300",
                                    isActive ? "opacity-100 translate-x-0" : "group-hover:opacity-100 group-hover:translate-x-0"
                                )} />
                            </a>
                        </Link>
                    );
                })}
            </nav>

            <div className="p-4 md:p-6 border-t border-neutral-800 space-y-3 md:space-y-4 bg-neutral-950">
                <Link href="/">
                    <a target="_blank" className="flex items-center gap-2 text-sm text-neutral-400 hover:text-orange-400 transition-colors group px-4">
                        <ExternalLink className="w-4 h-4 group-hover:rotate-45 transition-transform" />
                        View Website
                    </a>
                </Link>
                <Button
                    variant="ghost"
                    className="w-full justify-start gap-4 text-neutral-400 hover:text-red-400 hover:bg-red-400/10 rounded-xl transition-all py-5 md:py-6"
                    onClick={handleLogout}
                >
                    <LogOut className="w-5 h-5" />
                    <span className="font-medium">Sign Out</span>
                </Button>
            </div>
        </>
    );

    return (
        <div className="dark flex min-h-screen bg-neutral-950 text-white font-sans selection:bg-orange-500/30 overflow-x-hidden">
            {/* Desktop Sidebar */}
            <aside className="hidden md:flex w-72 border-r border-neutral-800 flex-col fixed inset-y-0 left-0 z-50 bg-neutral-950/80 backdrop-blur-xl">
                <SidebarContent />
            </aside>

            {/* Mobile Sidebar Overlay */}
            {isMobileMenuOpen && (
                <div 
                    className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 md:hidden"
                    onClick={closeMobileMenu}
                />
            )}

            {/* Mobile Sidebar Drawer */}
            <aside className={cn(
                "fixed inset-y-0 left-0 z-50 w-3/4 max-w-[300px] bg-neutral-950 border-r border-neutral-800 flex flex-col transform transition-transform duration-300 ease-in-out md:hidden",
                isMobileMenuOpen ? "translate-x-0" : "-translate-x-full"
            )}>
                <SidebarContent />
            </aside>

            {/* Main Content */}
            <main className="flex-1 md:ml-72 min-h-screen flex flex-col max-w-[100vw]">
                {/* Header */}
                <header className="h-16 md:h-20 border-b border-neutral-800 bg-neutral-950/80 backdrop-blur-md flex items-center justify-between px-4 md:px-12 sticky top-0 z-30">
                    <div className="flex items-center gap-3">
                        <Button 
                            variant="ghost" 
                            size="icon" 
                            className="md:hidden text-neutral-400 hover:text-white"
                            onClick={() => setIsMobileMenuOpen(true)}
                        >
                            <Menu className="w-6 h-6" />
                        </Button>
                        <h1 className="font-bold text-lg md:text-xl tracking-tight text-neutral-100 uppercase truncate max-w-[150px] sm:max-w-none">
                            {NAV_ITEMS.find(item => item.href === location)?.label || "Dashboard"}
                        </h1>
                    </div>

                    <div className="flex items-center gap-4 md:gap-6">
                        <div className="h-8 md:h-10 w-[1px] bg-neutral-800" />
                        <div className="flex items-center gap-3">
                            <div className="w-8 h-8 md:w-10 md:h-10 rounded-full bg-gradient-to-br from-orange-500 to-orange-700 p-[1px] flex-shrink-0">
                                <div className="w-full h-full rounded-full bg-neutral-900 flex items-center justify-center font-bold text-xs md:text-sm">
                                    GK
                                </div>
                            </div>
                            <div className="hidden sm:block">
                                <p className="text-sm font-semibold tracking-tight">Gokul K P</p>
                                <p className="text-[10px] text-neutral-500 uppercase tracking-widest font-bold">Administrator</p>
                            </div>
                        </div>
                    </div>
                </header>

                <div className="p-4 md:p-8 lg:p-12 animate-in fade-in slide-in-from-bottom-4 duration-700 flex-1 overflow-x-hidden">
                    {children}
                </div>
            </main>
        </div>
    );
}
