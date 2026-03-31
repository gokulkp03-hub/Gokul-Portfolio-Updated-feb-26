import AdminLayout from "@/components/layout/AdminLayout";
import { trpc } from "@/lib/trpc";
import {
    Briefcase,
    Image as ImageIcon,
    MessageSquare,
    Eye,
    TrendingUp,
    Clock
} from "lucide-react";

export default function AdminDashboard() {
    const { data: projects } = trpc.projects.adminList.useQuery();
    const { data: media } = trpc.media.list.useQuery();
    const { data: contacts } = trpc.contact.list.useQuery();

    const STATS = [
        { label: "Total Projects", value: projects?.length || 0, icon: Briefcase, color: "text-blue-500" },
        { label: "Media Assets", value: media?.length || 0, icon: ImageIcon, color: "text-orange-500" },
        { label: "Messages", value: contacts?.length || 0, icon: MessageSquare, color: "text-green-500" },
        { label: "Total Views", value: projects?.reduce((acc, p) => acc + (p.views || 0), 0) || 0, icon: Eye, color: "text-purple-500" },
    ];

    return (
        <AdminLayout>
            <div className="space-y-12">
                {/* Intro */}
                <div className="relative group">
                    <div className="absolute -inset-1 bg-gradient-to-r from-orange-500 to-orange-950 rounded-2xl blur opacity-25 group-hover:opacity-40 transition duration-1000"></div>
                    <div className="relative bg-neutral-900/50 border border-neutral-800 p-8 rounded-2xl flex items-center justify-between backdrop-blur-xl">
                        <div>
                            <h2 className="text-3xl font-bold tracking-tight mb-2">Welcome back, Gokul</h2>
                            <p className="text-neutral-400 max-w-lg">Manage your creative portfolio, monitor engagement, and keep your site content fresh and impactful from one central hub.</p>
                        </div>
                        <div className="hidden lg:block">
                            <div className="w-24 h-24 rounded-full bg-orange-500/10 flex items-center justify-center border border-orange-500/20 shadow-[0_0_50px_rgba(249,115,22,0.1)]">
                                <TrendingUp className="w-10 h-10 text-orange-500" />
                            </div>
                        </div>
                    </div>
                </div>

                {/* Stats Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {STATS.map((stat, idx) => (
                        <div key={idx} className="bg-neutral-900 border border-neutral-800 p-6 rounded-2xl hover:border-orange-500/50 transition-all duration-300 group">
                            <div className="flex items-center justify-between mb-4">
                                <div className={`p-3 rounded-xl bg-neutral-800 group-hover:scale-110 transition-transform`}>
                                    <stat.icon className={`w-6 h-6 ${stat.color}`} />
                                </div>
                                <div className="text-[10px] font-bold text-neutral-500 flex items-center gap-1 uppercase tracking-widest">
                                    Live <div className="w-1 h-1 rounded-full bg-green-500 shadow-[0_0_5px_#22c55e]" />
                                </div>
                            </div>
                            <div>
                                <p className="text-4xl font-bold tracking-tight mb-1">{stat.value}</p>
                                <p className="text-sm text-neutral-500 font-medium">{stat.label}</p>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Recent Activity (UI Placeholder) */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    <div className="lg:col-span-2 space-y-6">
                        <div className="flex items-center justify-between">
                            <h3 className="text-xl font-bold tracking-tight flex items-center gap-3">
                                Recent Projects
                                <span className="px-2 py-0.5 rounded-full bg-orange-500/10 text-orange-400 text-[10px] border border-orange-500/20 uppercase tracking-widest">Beta</span>
                            </h3>
                            <button className="text-sm font-medium text-orange-500 hover:text-orange-400 transition-colors">See all</button>
                        </div>
                        <div className="bg-neutral-900 border border-neutral-800 rounded-2xl overflow-hidden divide-y divide-neutral-800/50">
                            {projects?.slice(0, 5).map((project) => (
                                <div key={project.id} className="p-4 flex items-center gap-4 hover:bg-neutral-800/30 transition-colors group cursor-pointer">
                                    <img src={project.thumbnail} alt={project.title} className="w-16 h-12 object-cover rounded-lg group-hover:scale-105 transition-transform" />
                                    <div className="flex-1 min-w-0">
                                        <p className="font-semibold truncate">{project.title}</p>
                                        <p className="text-xs text-neutral-500 uppercase tracking-wider">{project.category}</p>
                                    </div>
                                    <div className="flex items-center gap-2 text-neutral-500">
                                        <Clock className="w-3.5 h-3.5" />
                                        <span className="text-xs font-medium">Updated recently</span>
                                    </div>
                                </div>
                            ))}
                            {!projects?.length && <div className="p-12 text-center text-neutral-500 font-medium italic">No projects found. Time to create something amazing!</div>}
                        </div>
                    </div>

                    <div className="space-y-6">
                        <h3 className="text-xl font-bold tracking-tight">System Status</h3>
                        <div className="bg-neutral-900 border border-neutral-800 rounded-2xl p-6 space-y-6">
                            <div className="space-y-2">
                                <div className="flex justify-between text-xs font-semibold mb-1">
                                    <span className="text-neutral-500 uppercase tracking-widest">Database Health</span>
                                    <span className="text-green-500">100%</span>
                                </div>
                                <div className="h-1.5 w-full bg-neutral-800 rounded-full overflow-hidden">
                                    <div className="h-full w-full bg-green-500" />
                                </div>
                            </div>
                            <div className="space-y-2">
                                <div className="flex justify-between text-xs font-semibold mb-1">
                                    <span className="text-neutral-500 uppercase tracking-widest">Storage API</span>
                                    <span className="text-orange-500">95%</span>
                                </div>
                                <div className="h-1.5 w-full bg-neutral-800 rounded-full overflow-hidden">
                                    <div className="h-full w-[95%] bg-orange-500 shadow-[0_0_10px_rgba(249,115,22,0.3)]" />
                                </div>
                            </div>
                            <div className="p-4 rounded-xl bg-orange-500/5 border border-orange-500/10 mt-8">
                                <p className="text-xs text-orange-200/70 leading-relaxed italic">
                                    "Design is not just what it looks like and feels like. Design is how it works."
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AdminLayout>
    );
}
