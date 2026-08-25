import AdminLayout from "@/components/layout/AdminLayout";
import { trpc } from "@/lib/trpc";
import { useState } from "react";
import { Plus, Trash2, Edit3, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { BlogForm } from "@/components/admin/BlogForm";

export default function BlogManager() {
    const { data: blogs, isLoading, refetch } = trpc.blogs.list.useQuery({ includeUnpublished: true });
    const deleteMutation = trpc.blogs.delete.useMutation();
    const [search, setSearch] = useState("");
    const [editingBlog, setEditingBlog] = useState<any | null>(null);

    const filteredBlogs = blogs?.filter(b =>
        b.title.toLowerCase().includes(search.toLowerCase()) ||
        b.slug.toLowerCase().includes(search.toLowerCase())
    );

    const handleDelete = async (id: string) => {
        if (!confirm("Are you sure you want to delete this blog post?")) return;
        try {
            await deleteMutation.mutateAsync(id);
            toast.success("Blog deleted successfully");
            refetch();
        } catch (error) {
            toast.error("Failed to delete blog");
        }
    };

    return (
        <AdminLayout>
            <div className="space-y-8">
                {/* Header */}
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                    <div>
                        <h1 className="text-3xl font-display font-bold text-white tracking-tight">Blog Manager</h1>
                        <p className="text-muted-foreground mt-1">Write, publish, and manage your articles.</p>
                    </div>
                    <Button
                        onClick={() => setEditingBlog({ isNew: true })}
                        className="bg-orange-500 hover:bg-orange-600 text-white rounded-full px-6 flex items-center gap-2"
                    >
                        <Plus className="w-4 h-4" /> New Article
                    </Button>
                </div>

                {/* Filters */}
                <div className="flex items-center gap-4 bg-zinc-900/50 p-2 rounded-2xl border border-white/5 backdrop-blur-xl">
                    <Input
                        placeholder="Search blogs..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="bg-transparent border-0 focus-visible:ring-0 text-white placeholder:text-zinc-600 flex-1 max-w-sm"
                    />
                </div>

                {/* List View */}
                {isLoading ? (
                    <div className="flex justify-center items-center py-20">
                        <Loader2 className="w-8 h-8 text-orange-500 animate-spin" />
                    </div>
                ) : (
                    <div className="grid gap-4">
                        {filteredBlogs?.map(blog => (
                            <div key={blog.id} className="bg-zinc-900/50 border border-white/5 rounded-2xl p-6 flex flex-col md:flex-row items-center justify-between gap-6 hover:border-orange-500/30 transition-colors">
                                <div className="flex-1 space-y-2 w-full">
                                    <div className="flex items-center gap-3">
                                        <h3 className="font-semibold text-lg text-white">{blog.title}</h3>
                                        {!blog.published && (
                                            <span className="px-2 py-0.5 rounded-full bg-zinc-800 text-xs font-medium text-zinc-400 border border-white/10">Draft</span>
                                        )}
                                        {blog.published && (
                                            <span className="px-2 py-0.5 rounded-full bg-green-500/10 text-xs font-medium text-green-400 border border-green-500/20">Published</span>
                                        )}
                                    </div>
                                    <p className="text-sm text-zinc-500 line-clamp-1">{blog.excerpt || "No excerpt provided"}</p>
                                    <p className="text-xs text-zinc-600 font-mono">/{blog.slug}</p>
                                </div>

                                <div className="flex items-center gap-2 w-full md:w-auto shrink-0">
                                    <Button
                                        variant="outline"
                                        size="sm"
                                        onClick={() => setEditingBlog(blog)}
                                        className="rounded-full bg-zinc-800/50 border-white/10 hover:bg-zinc-800 text-white"
                                    >
                                        <Edit3 className="w-4 h-4 mr-2" /> Edit
                                    </Button>
                                    <Button
                                        variant="destructive"
                                        size="sm"
                                        onClick={() => handleDelete(blog.id)}
                                        className="rounded-full"
                                    >
                                        <Trash2 className="w-4 h-4" />
                                    </Button>
                                </div>
                            </div>
                        ))}

                        {filteredBlogs?.length === 0 && (
                            <div className="text-center py-20 bg-zinc-900/30 border border-dashed border-white/10 rounded-3xl">
                                <p className="text-zinc-500 text-lg">No blogs found.</p>
                            </div>
                        )}
                    </div>
                )}
            </div>

            {editingBlog && (
                <BlogForm
                    blog={editingBlog.isNew ? null : editingBlog}
                    onClose={() => setEditingBlog(null)}
                    onSaved={() => {
                        setEditingBlog(null);
                        refetch();
                    }}
                />
            )}
        </AdminLayout>
    );
}
