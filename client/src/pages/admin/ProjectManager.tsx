import AdminLayout from "@/components/layout/AdminLayout";
import { trpc } from "@/lib/trpc";
import { useState } from "react";
import {
    Plus,
    Search,
    Filter,
    Edit3,
    Trash2,
    Eye,
    MoreHorizontal,
    LayoutGrid,
    List as ListIcon,
    Check,
    X,
    ChevronRight,
    Loader2,
    ExternalLink
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { cn } from "@/lib/utils";
import { ProjectForm } from "@/components/admin/ProjectForm";

export default function ProjectManager() {
    const { data: projects, isLoading, refetch } = trpc.projects.list.useQuery();
    const deleteMutation = trpc.projects.delete.useMutation();
    const [search, setSearch] = useState("");
    const [view, setView] = useState<"grid" | "list">("grid");
    const [editingProject, setEditingProject] = useState<any | null>(null);

    const filteredProjects = projects?.filter(p =>
        p.category !== "marketing" && (
            p.title.toLowerCase().includes(search.toLowerCase()) ||
            p.category.toLowerCase().includes(search.toLowerCase())
        )
    );

    const handleDelete = async (id: string) => {
        if (!confirm("Are you sure you want to delete this project?")) return;
        try {
            await deleteMutation.mutateAsync(id);
            toast.success("Project deleted");
            refetch();
        } catch (error) {
            toast.error("Failed to delete project");
        }
    };

    return (
        <AdminLayout>
            {editingProject !== null ? (
                <div className="space-y-6">
                    <div className="flex items-center gap-4">
                        <Button variant="ghost" onClick={() => setEditingProject(null)} className="h-10 w-10 p-0 rounded-xl">
                            <ChevronRight className="w-5 h-5 rotate-180 text-neutral-400" />
                        </Button>
                        <div>
                            <h2 className="text-2xl font-bold tracking-tight">{editingProject.id ? "Edit Project" : "New Project"}</h2>
                            <p className="text-sm text-neutral-500">Fill in the details below to {editingProject.id ? "update the" : "create a new"} showcase piece.</p>
                        </div>
                    </div>
                    <ProjectForm 
                        initialData={editingProject.id ? editingProject : undefined} 
                        onSuccess={() => { setEditingProject(null); refetch(); }} 
                        onCancel={() => setEditingProject(null)} 
                    />
                </div>
            ) : (
                <div className="space-y-8">
                    {/* Actions Bar */}
                    <div className="flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-4 lg:gap-6 bg-neutral-900/50 p-4 rounded-2xl border border-neutral-800 backdrop-blur-md sticky top-16 md:top-24 z-30">
                        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-4 w-full lg:w-auto">
                            <div className="relative flex-1 sm:w-80 group">
                                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-500 group-focus-within:text-orange-500" />
                                <Input
                                    placeholder="Search projects..."
                                    className="pl-12 bg-neutral-950 border-neutral-800 h-11 rounded-xl focus:border-orange-500/50 transition-all"
                                    value={search}
                                    onChange={(e) => setSearch(e.target.value)}
                                />
                            </div>
                            <Button variant="outline" className="border-neutral-800 bg-neutral-950 h-11 rounded-xl px-4 gap-2 text-neutral-400 hover:text-white transition-all">
                                <Filter className="w-4 h-4" />
                                <span className="hidden sm:inline">Filter</span>
                            </Button>
                        </div>
                        <div className="flex items-center justify-between sm:justify-end gap-3 w-full lg:w-auto mt-2 lg:mt-0">
                            <div className="bg-neutral-950 p-1 rounded-xl border border-neutral-800 flex">
                                <button
                                    onClick={() => setView("grid")}
                                    className={cn("p-2 rounded-lg transition-all", view === "grid" ? "bg-neutral-800 text-orange-500" : "text-neutral-500 hover:text-neutral-300")}
                                >
                                    <LayoutGrid className="w-4 h-4" />
                                </button>
                                <button
                                    onClick={() => setView("list")}
                                    className={cn("p-2 rounded-lg transition-all", view === "list" ? "bg-neutral-800 text-orange-500" : "text-neutral-500 hover:text-neutral-300")}
                                >
                                    <ListIcon className="w-4 h-4" />
                                </button>
                            </div>
                            <Button onClick={() => setEditingProject({})} className="bg-orange-500 hover:bg-orange-600 text-white h-11 rounded-xl px-6 gap-2 flex-1 md:flex-none shadow-[0_0_20px_rgba(249,115,22,0.2)]">
                                <Plus className="w-5 h-5" />
                                New Project
                            </Button>
                        </div>
                    </div>

                    {/* Project List */}
                    {isLoading ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {[...Array(6)].map((_, i) => (
                                <div key={i} className="h-80 bg-neutral-900 animate-pulse rounded-3xl border border-neutral-800" />
                            ))}
                        </div>
                    ) : (
                        <>
                            {view === "grid" ? (
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                                    {filteredProjects?.map((project) => (
                                        <div key={project.id} className="group bg-neutral-900 border border-neutral-800 rounded-3xl overflow-hidden hover:border-orange-500/30 transition-all duration-500 flex flex-col h-full">
                                            <div className="aspect-video relative overflow-hidden bg-neutral-950">
                                                <img src={project.thumbnail} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" alt="" />
                                                <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-transparent to-transparent opacity-60" />
                                                <div className="absolute top-4 left-4">
                                                    <span className="px-3 py-1 rounded-full bg-black/50 backdrop-blur-md border border-white/10 text-[10px] font-bold uppercase tracking-widest">
                                                        {project.status}
                                                    </span>
                                                </div>
                                            </div>
                                            <div className="p-6 flex-1 flex flex-col">
                                                <div className="mb-4">
                                                    <p className="text-[10px] text-orange-500 uppercase font-bold tracking-[0.2em] mb-1">{project.category}</p>
                                                    <h4 className="text-xl font-bold tracking-tight line-clamp-1">{project.title}</h4>
                                                </div>
                                                <p className="text-sm text-neutral-500 line-clamp-2 mb-6 flex-1">{project.summary}</p>
                                                <div className="flex items-center justify-between pt-6 border-t border-neutral-800/50">
                                                    <div className="flex items-center gap-4 text-neutral-500">
                                                        <div className="flex items-center gap-1.5">
                                                            <Eye className="w-4 h-4" />
                                                            <span className="text-xs font-bold">{project.views}</span>
                                                        </div>
                                                        <div className="w-1 h-1 rounded-full bg-neutral-700" />
                                                        <span className="text-xs font-bold uppercase tracking-widest">{project.year || "2024"}</span>
                                                    </div>
                                                    <div className="flex items-center gap-2">
                                                        <Button size="icon" variant="ghost" aria-label="Edit project" className="h-9 w-9 bg-neutral-800/50 hover:bg-orange-500 hover:text-white rounded-xl transition-all" onClick={() => setEditingProject(project)}>
                                                            <Edit3 className="w-4 h-4" />
                                                        </Button>
                                                        <Button size="icon" variant="ghost" aria-label="Delete project" className="h-9 w-9 bg-neutral-800/50 hover:bg-red-500 hover:text-white rounded-xl transition-all" onClick={() => handleDelete(project.id)}>
                                                            <Trash2 className="w-4 h-4" />
                                                        </Button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <div className="bg-neutral-900 border border-neutral-800 rounded-3xl overflow-hidden divide-y divide-neutral-800/50">
                                    {filteredProjects?.map((project) => (
                                        <div key={project.id} className="p-4 flex items-center gap-6 hover:bg-neutral-800/30 transition-all group">
                                            <img src={project.thumbnail} className="w-24 h-16 object-cover rounded-xl" alt="" />
                                            <div className="flex-1 min-w-0">
                                                <h4 className="font-bold truncate">{project.title}</h4>
                                                <p className="text-xs text-neutral-500 uppercase tracking-widest font-bold mt-1">{project.category}</p>
                                            </div>
                                            <div className="hidden md:block px-4">
                                                <span className={cn(
                                                    "text-[10px] font-bold uppercase tracking-widest px-2.5 py-1 rounded-full border",
                                                    project.status === "published" ? "text-green-500 bg-green-500/10 border-green-500/20" : "text-neutral-500 bg-neutral-800 border-neutral-700"
                                                )}>
                                                    {project.status}
                                                </span>
                                            </div>
                                            <div className="flex items-center gap-2">
                                                <Button size="icon" variant="ghost" className="h-10 w-10 hover:bg-orange-500 hover:text-white rounded-xl" onClick={() => setEditingProject(project)}>
                                                    <Edit3 className="w-4 h-4" />
                                                </Button>
                                                <Button size="icon" variant="ghost" className="h-10 w-10 hover:bg-red-500 hover:text-white rounded-xl" onClick={() => handleDelete(project.id)}>
                                                    <Trash2 className="w-4 h-4" />
                                                </Button>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}

                            {!filteredProjects?.length && (
                                <div className="py-32 text-center border-2 border-dashed border-neutral-800 rounded-[40px] bg-neutral-900/10">
                                    <div className="inline-flex p-6 rounded-3xl bg-neutral-800 text-neutral-500 mb-6">
                                        <Plus className="w-12 h-12" />
                                    </div>
                                    <h3 className="text-2xl font-bold mb-2">No projects yet</h3>
                                    <p className="text-neutral-500 max-w-sm mx-auto mb-8 font-medium italic">"Every great work of art starts with a single stroke." Time to add your first masterpiece.</p>
                                    <Button onClick={() => setEditingProject({})} className="bg-orange-500 hover:bg-orange-600 text-white rounded-xl px-8 h-12 shadow-[0_0_20px_rgba(249,115,22,0.3)]">
                                        Create New Project
                                    </Button>
                                </div>
                            )}
                        </>
                    )}
                </div>
            )}
        </AdminLayout>
    );
}
