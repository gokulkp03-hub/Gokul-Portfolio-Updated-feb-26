import { useState } from "react";
import { trpc } from "@/lib/trpc";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { X, Save, Loader2, Image as ImageIcon } from "lucide-react";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";

interface BlogFormProps {
    blog: any | null;
    onClose: () => void;
    onSaved: () => void;
}

export function BlogForm({ blog, onClose, onSaved }: BlogFormProps) {
    const createMutation = trpc.blogs.create.useMutation();
    const updateMutation = trpc.blogs.update.useMutation();

    const [formData, setFormData] = useState({
        title: blog?.title || "",
        slug: blog?.slug || "",
        content: blog?.content || "",
        excerpt: blog?.excerpt || "",
        thumbnail: blog?.thumbnail || "",
        published: blog?.published ?? false,
        metaTitle: blog?.metaTitle || "",
        metaDescription: blog?.metaDescription || "",
    });

    const isSubmitting = createMutation.isPending || updateMutation.isPending;

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            if (blog?.id) {
                await updateMutation.mutateAsync({ id: blog.id, ...formData });
                toast.success("Blog updated successfully");
            } else {
                await createMutation.mutateAsync(formData);
                toast.success("Blog created successfully");
            }
            onSaved();
        } catch (error: any) {
            toast.error(error.message || "Failed to save blog");
        }
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm overflow-y-auto">
            <div className="bg-zinc-950 border border-white/10 rounded-[2rem] w-full max-w-4xl shadow-2xl overflow-hidden my-auto">
                <div className="flex items-center justify-between p-6 border-b border-white/10 bg-zinc-900/50">
                    <h2 className="text-xl font-bold text-white">{blog ? "Edit Blog" : "New Blog"}</h2>
                    <Button variant="ghost" size="icon" onClick={onClose} className="rounded-full text-zinc-400 hover:text-white hover:bg-white/10">
                        <X className="w-5 h-5" />
                    </Button>
                </div>

                <form onSubmit={handleSubmit} className="p-6 md:p-8 space-y-8 max-h-[80vh] overflow-y-auto">
                    
                    {/* Basic Info */}
                    <div className="space-y-6">
                        <h3 className="text-sm font-bold uppercase tracking-wider text-orange-500">Basic Information</h3>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <Label className="text-zinc-400">Title <span className="text-red-500">*</span></Label>
                                <Input 
                                    required 
                                    value={formData.title} 
                                    onChange={e => setFormData({ ...formData, title: e.target.value })}
                                    className="bg-zinc-900 border-white/10 text-white focus-visible:ring-orange-500"
                                />
                            </div>
                            <div className="space-y-2">
                                <Label className="text-zinc-400">Slug (URL) <span className="text-red-500">*</span></Label>
                                <Input 
                                    required 
                                    value={formData.slug} 
                                    onChange={e => setFormData({ ...formData, slug: e.target.value })}
                                    placeholder="my-awesome-post"
                                    className="bg-zinc-900 border-white/10 text-white font-mono focus-visible:ring-orange-500"
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <Label className="text-zinc-400">Excerpt</Label>
                            <Input 
                                value={formData.excerpt} 
                                onChange={e => setFormData({ ...formData, excerpt: e.target.value })}
                                placeholder="A short description of the post..."
                                className="bg-zinc-900 border-white/10 text-white focus-visible:ring-orange-500"
                            />
                        </div>

                        <div className="space-y-2">
                            <Label className="text-zinc-400">Thumbnail URL</Label>
                            <div className="flex gap-4">
                                <Input 
                                    value={formData.thumbnail} 
                                    onChange={e => setFormData({ ...formData, thumbnail: e.target.value })}
                                    placeholder="https://..."
                                    className="bg-zinc-900 border-white/10 text-white focus-visible:ring-orange-500 flex-1"
                                />
                                {formData.thumbnail && (
                                    <img src={formData.thumbnail} className="h-10 w-10 rounded object-cover border border-white/10" alt="Thumb" />
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Content */}
                    <div className="space-y-4">
                        <div className="flex items-center justify-between">
                            <h3 className="text-sm font-bold uppercase tracking-wider text-orange-500">Content</h3>
                            <span className="text-xs text-zinc-500 font-mono">Markdown Supported</span>
                        </div>
                        <textarea
                            value={formData.content}
                            onChange={e => setFormData({ ...formData, content: e.target.value })}
                            placeholder="Write your post content here using Markdown..."
                            className="w-full h-96 bg-zinc-900 border border-white/10 rounded-xl p-4 text-white font-mono text-sm focus:outline-none focus:ring-2 focus:ring-orange-500 resize-y"
                        />
                    </div>

                    {/* SEO Metadata */}
                    <div className="space-y-6">
                        <h3 className="text-sm font-bold uppercase tracking-wider text-orange-500">SEO Metadata</h3>
                        
                        <div className="grid grid-cols-1 gap-6">
                            <div className="space-y-2">
                                <Label className="text-zinc-400">SEO Title (Overrides default title)</Label>
                                <Input 
                                    value={formData.metaTitle} 
                                    onChange={e => setFormData({ ...formData, metaTitle: e.target.value })}
                                    className="bg-zinc-900 border-white/10 text-white focus-visible:ring-orange-500"
                                />
                            </div>
                            <div className="space-y-2">
                                <Label className="text-zinc-400">SEO Description</Label>
                                <Input 
                                    value={formData.metaDescription} 
                                    onChange={e => setFormData({ ...formData, metaDescription: e.target.value })}
                                    className="bg-zinc-900 border-white/10 text-white focus-visible:ring-orange-500"
                                />
                            </div>
                        </div>
                    </div>

                    {/* Publish Actions */}
                    <div className="flex items-center justify-between pt-6 border-t border-white/10">
                        <div className="flex items-center space-x-2 bg-zinc-900/50 p-3 rounded-xl border border-white/5">
                            <Switch 
                                id="published" 
                                checked={formData.published} 
                                onCheckedChange={c => setFormData({ ...formData, published: c })}
                            />
                            <Label htmlFor="published" className="text-white cursor-pointer font-medium">Publish Post</Label>
                        </div>
                        
                        <div className="flex gap-3">
                            <Button type="button" variant="ghost" onClick={onClose} className="rounded-full text-zinc-400">
                                Cancel
                            </Button>
                            <Button type="submit" disabled={isSubmitting} className="rounded-full bg-orange-500 hover:bg-orange-600 text-white min-w-[120px]">
                                {isSubmitting ? <Loader2 className="w-4 h-4 animate-spin" /> : (
                                    <>
                                        <Save className="w-4 h-4 mr-2" /> Save Blog
                                    </>
                                )}
                            </Button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
}
