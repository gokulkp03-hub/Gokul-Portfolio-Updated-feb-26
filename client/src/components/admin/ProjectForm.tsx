import { useState, useEffect } from "react";
import { trpc } from "@/lib/trpc";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { MediaPicker } from "./MediaPicker";
import { Loader2, Plus, X, Video as VideoIcon } from "lucide-react";
import { toast } from "sonner";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface ProjectFormProps {
    initialData?: any;
    onSuccess: () => void;
    onCancel: () => void;
    defaultCategory?: string;
}

export function ProjectForm({ initialData, onSuccess, onCancel, defaultCategory = "video" }: ProjectFormProps) {
    const isEditing = !!initialData;
    const createMutation = trpc.projects.create.useMutation();
    const updateMutation = trpc.projects.update.useMutation();

    const [formData, setFormData] = useState<{
        title: string;
        slug: string;
        category: string;
        description: string;
        summary: string;
        thumbnail: string;
        videoUrl: string;
        videoType: string;
        directVideoUrl: string;
        client: string;
        year: number;
        status: "draft" | "published" | "scheduled";
        tags: string[];
        gallery: string[];
        tools: string[];
        featured: boolean;
        sortOrder: number;
    }>({
        title: "",
        slug: "",
        category: defaultCategory,
        description: "",
        summary: "",
        thumbnail: "",
        videoUrl: "",
        videoType: "none",
        directVideoUrl: "",
        client: "",
        year: new Date().getFullYear(),
        status: "draft",
        tags: [],
        gallery: [],
        tools: [],
        featured: false,
        sortOrder: 0,
    });

    const parseArrayField = (val: any): string[] => {
        if (!val) return [];
        if (Array.isArray(val)) return val;
        if (typeof val === "string") {
            try {
                const parsed = JSON.parse(val);
                return Array.isArray(parsed) ? parsed : [];
            } catch {
                // Fallback for comma separated tags or strings
                if (val.trim()) {
                    return val.split(",").map(t => t.trim()).filter(Boolean);
                }
                return [];
            }
        }
        return [];
    };

    useEffect(() => {
        if (initialData) {
            setFormData({
                title: initialData.title || "",
                slug: initialData.slug || "",
                category: initialData.category || defaultCategory,
                description: initialData.description || "",
                summary: initialData.summary || "",
                thumbnail: initialData.thumbnail || "",
                videoUrl: initialData.videoUrl || "",
                videoType: initialData.videoType || "none",
                directVideoUrl: initialData.directVideoUrl || "",
                client: initialData.client || "",
                year: initialData.year || new Date().getFullYear(),
                status: ["draft", "published", "scheduled"].includes(initialData.status?.toLowerCase())
                    ? (initialData.status.toLowerCase() as "draft" | "published" | "scheduled")
                    : "draft",
                tags: parseArrayField(initialData.tags),
                gallery: parseArrayField(initialData.gallery),
                tools: parseArrayField(initialData.tools),
                featured: initialData.featured || false,
                sortOrder: initialData.sortOrder || 0,
            });
        }
    }, [initialData, defaultCategory]);

    const handleChange = (field: string, value: any) => {
        let finalValue = value;
        
        // Auto-extract src from iframe if user pastes full embed code
        if (field === "videoUrl" && typeof value === 'string' && value.includes('<iframe') && value.includes('src=')) {
            const match = value.match(/src=["']([^"']+)["']/);
            if (match && match[1]) {
                finalValue = match[1];
                toast.success("Extracted URL from iframe block!");
            }
        }

        setFormData(prev => ({ ...prev, [field]: finalValue }));
        
        // Auto-generate slug from title if editing slug hasn't happened manually
        if (field === "title" && !isEditing) {
            const slug = finalValue.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)+/g, "");
            setFormData(prev => ({ ...prev, slug }));
        }
    };

    const addArrayItem = (field: "tags" | "gallery" | "tools", value: string) => {
        if (!value.trim()) return;
        setFormData(prev => ({ ...prev, [field]: [...prev[field], value.trim()] }));
    };

    const removeArrayItem = (field: "tags" | "gallery" | "tools", index: number) => {
        setFormData(prev => ({
            ...prev,
            [field]: prev[field].filter((_, i) => i !== index)
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        
        // Clean status value and ensure it is lowercase and valid
        const cleanStatus = (formData.status || "draft").toLowerCase().trim();
        const finalStatus = ["draft", "published", "scheduled"].includes(cleanStatus)
            ? (cleanStatus as "draft" | "published" | "scheduled")
            : "draft";

        const submitData = {
            ...formData,
            status: finalStatus,
        };

        try {
            if (isEditing) {
                await updateMutation.mutateAsync({ id: initialData.id, ...submitData });
                toast.success("Project updated!");
            } else {
                await createMutation.mutateAsync(submitData);
                toast.success("Project created!");
            }
            onSuccess();
        } catch (error: any) {
            toast.error(error.message || "Something went wrong saving the project.");
        }
    };

    const isPending = createMutation.isPending || updateMutation.isPending;

    return (
        <form onSubmit={handleSubmit} className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Main Content Info */}
                <div className="lg:col-span-2 space-y-6">
                    <div className="bg-neutral-900 border border-neutral-800 rounded-2xl p-6 space-y-4">
                        <h3 className="text-lg font-bold mb-4">Core Information</h3>
                        
                        <div className="space-y-1.5">
                            <label className="text-xs font-bold uppercase tracking-widest text-neutral-500">Title</label>
                            <Input required value={formData.title} onChange={e => handleChange("title", e.target.value)} className="bg-neutral-950 border-neutral-800" />
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-1.5">
                                <label className="text-xs font-bold uppercase tracking-widest text-neutral-500">Category</label>
                                <Select value={formData.category} onValueChange={v => handleChange("category", v)}>
                                    <SelectTrigger className="bg-neutral-950 border-neutral-800">
                                        <SelectValue />
                                    </SelectTrigger>
                                    <SelectContent className="bg-neutral-900 border-neutral-800 text-white">
                                        <SelectItem value="video">Videography</SelectItem>
                                        <SelectItem value="photo">Photography</SelectItem>
                                        <SelectItem value="marketing">Digital Marketing</SelectItem>
                                        <SelectItem value="social">Social Media</SelectItem>
                                        <SelectItem value="motion">Motion Graphics</SelectItem>
                                        <SelectItem value="design">Graphic Design</SelectItem>
                                        <SelectItem value="case-study">Case Study</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                            <div className="space-y-1.5">
                                <label className="text-xs font-bold uppercase tracking-widest text-neutral-500">Status</label>
                                <Select value={formData.status} onValueChange={v => handleChange("status", v)}>
                                    <SelectTrigger className="bg-neutral-950 border-neutral-800">
                                        <SelectValue />
                                    </SelectTrigger>
                                    <SelectContent className="bg-neutral-900 border-neutral-800 text-white">
                                        <SelectItem value="draft">Draft</SelectItem>
                                        <SelectItem value="published">Published</SelectItem>
                                        <SelectItem value="scheduled">Scheduled</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                        </div>

                        <div className="space-y-1.5 pt-2">
                            <label className="text-xs font-bold uppercase tracking-widest text-neutral-500">Summary / Short Description</label>
                            <Textarea value={formData.summary} onChange={e => handleChange("summary", e.target.value)} className="bg-neutral-950 border-neutral-800 min-h-[80px]" placeholder="Brief context for the thumbnail..." />
                        </div>

                        <div className="space-y-1.5 pt-2">
                            <label className="text-xs font-bold uppercase tracking-widest text-neutral-500">Full Description</label>
                            <Textarea value={formData.description} onChange={e => handleChange("description", e.target.value)} className="bg-neutral-950 border-neutral-800 min-h-[200px]" placeholder="Detailed case study or project explanation..." />
                        </div>
                    </div>

                    <div className="bg-neutral-900 border border-neutral-800 rounded-2xl p-6 space-y-4">
                        <h3 className="text-lg font-bold mb-4">Video Settings</h3>
                        
                        <div className="space-y-1.5">
                            <label className="text-xs font-bold uppercase tracking-widest text-neutral-500">Video Type</label>
                            <Select value={formData.videoType} onValueChange={v => handleChange("videoType", v)}>
                                <SelectTrigger className="bg-neutral-950 border-neutral-800">
                                    <SelectValue />
                                </SelectTrigger>
                                <SelectContent className="bg-neutral-900 border-neutral-800 text-white">
                                    <SelectItem value="none">No Video</SelectItem>
                                    <SelectItem value="youtube">YouTube</SelectItem>
                                    <SelectItem value="vimeo">Vimeo</SelectItem>
                                    <SelectItem value="cloudinary">Cloudinary</SelectItem>
                                    <SelectItem value="mp4">Direct File (MP4/WebM)</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>

                        {formData.videoType !== "none" && formData.videoType !== "mp4" && (
                            <div className="space-y-1.5 pt-2">
                                <label className="text-xs font-bold uppercase tracking-widest text-neutral-500">Embedded Video URL</label>
                                <div className="flex items-center gap-3">
                                    <div className="p-2.5 rounded-xl bg-orange-500/10 text-orange-500 hidden sm:block">
                                        <VideoIcon className="w-5 h-5" />
                                    </div>
                                    <Input value={formData.videoUrl} onChange={e => handleChange("videoUrl", e.target.value)} placeholder="e.g., https://... or paste full <iframe> code" className="bg-neutral-950 border-neutral-800 flex-1" />
                                    <MediaPicker 
                                        onSelect={(url) => handleChange("videoUrl", url)} 
                                        title="Select Embedded Video" 
                                        trigger={
                                            <Button type="button" variant="outline" className="bg-neutral-900 border-neutral-800 text-neutral-400 hover:text-white px-3">
                                                Library
                                            </Button>
                                        } 
                                    />
                                </div>
                                <p className="text-[10px] text-neutral-500 italic mt-2">Paste Vimeo/YouTube/Cloudinary link, paste iframe code, or select from Library.</p>
                            </div>
                        )}

                        {formData.videoType === "mp4" && (
                            <div className="space-y-1.5 pt-2">
                                <label className="text-xs font-bold uppercase tracking-widest text-neutral-500">Direct Video File URL</label>
                                <div className="flex items-center gap-3">
                                    <div className="p-2.5 rounded-xl bg-orange-500/10 text-orange-500 hidden sm:block">
                                        <VideoIcon className="w-5 h-5" />
                                    </div>
                                    <Input value={formData.directVideoUrl} onChange={e => handleChange("directVideoUrl", e.target.value)} placeholder="e.g., /uploads/video.mp4" className="bg-neutral-950 border-neutral-800 flex-1" />
                                    <MediaPicker 
                                        onSelect={(url) => handleChange("directVideoUrl", url)} 
                                        title="Select Video File" 
                                        trigger={
                                            <Button type="button" variant="outline" className="bg-neutral-900 border-neutral-800 text-neutral-400 hover:text-white px-3">
                                                Library
                                            </Button>
                                        } 
                                    />
                                </div>
                                <p className="text-[10px] text-neutral-500 italic mt-2">Provide a valid direct video link (.mp4, .webm). You can also upload to Media Library and select it here.</p>
                            </div>
                        )}
                    </div>
                </div>

                {/* Sidebar Info */}
                <div className="space-y-6">
                    <div className="bg-neutral-900 border border-neutral-800 rounded-2xl p-6 space-y-6">
                        <div className="space-y-3">
                            <label className="text-xs font-bold uppercase tracking-widest text-neutral-500">Thumbnail / Cover</label>
                            <MediaPicker value={formData.thumbnail} onSelect={v => handleChange("thumbnail", v)} title="Select Cover Image" />
                            {!formData.thumbnail && <p className="text-xs text-red-500">Cover image is required.</p>}
                        </div>

                        <div className="space-y-3 pt-4 border-t border-neutral-800">
                            <label className="text-xs font-bold uppercase tracking-widest text-neutral-500">Gallery Images</label>
                            <div className="flex flex-wrap gap-2 mb-2">
                                {formData.gallery.map((url, i) => (
                                    <div key={i} className="relative group w-16 h-16 rounded-lg overflow-hidden border border-neutral-700">
                                        <img src={url} alt="" className="w-full h-full object-cover" />
                                        <button aria-label="Remove from gallery" type="button" onClick={() => removeArrayItem("gallery", i)} className="absolute inset-0 bg-red-500/80 items-center justify-center opacity-0 group-hover:opacity-100 flex transition-opacity">
                                            <X className="w-4 h-4 text-white" />
                                        </button>
                                    </div>
                                ))}
                            </div>
                            <MediaPicker onSelect={v => addArrayItem("gallery", v)} trigger={
                                <Button type="button" variant="outline" className="w-full bg-neutral-950 border-neutral-800 border-dashed text-neutral-400 gap-2">
                                    <Plus className="w-4 h-4" /> Add Image to Gallery
                                </Button>
                            } />
                        </div>
                    </div>

                    <div className="bg-neutral-900 border border-neutral-800 rounded-2xl p-6 space-y-4">
                        <h3 className="text-sm font-bold">Metadata</h3>
                        <div className="space-y-1.5">
                            <label className="text-[10px] font-bold uppercase tracking-widest text-neutral-500">Client / Brand</label>
                            <Input value={formData.client} onChange={e => handleChange("client", e.target.value)} className="bg-neutral-950 border-neutral-800 h-9" />
                        </div>
                        <div className="space-y-1.5 mt-2">
                            <label className="text-[10px] font-bold uppercase tracking-widest text-neutral-500">Year</label>
                            <Input type="number" value={formData.year} onChange={e => handleChange("year", parseInt(e.target.value))} className="bg-neutral-950 border-neutral-800 h-9" />
                        </div>
                        <div className="space-y-1.5 mt-2">
                            <label className="text-[10px] font-bold uppercase tracking-widest text-neutral-500">Sort Order</label>
                            <Input type="number" value={formData.sortOrder} onChange={e => handleChange("sortOrder", parseInt(e.target.value))} className="bg-neutral-950 border-neutral-800 h-9" placeholder="0" />
                            <p className="text-[10px] text-neutral-500">Smaller values appear first (e.g. 1, 2, 3)</p>
                        </div>
                    </div>

                    <div className="bg-neutral-900 border border-neutral-800 rounded-2xl p-6 space-y-4">
                        <div className="space-y-1.5">
                            <label className="text-xs font-bold uppercase tracking-widest text-neutral-500">Tags</label>
                            <div className="flex flex-wrap gap-2 mb-2">
                                {formData.tags.map((t, i) => (
                                    <span key={i} className="px-2 py-1 bg-neutral-800 text-xs rounded-full flex items-center gap-1">
                                        {t}
                                        <button aria-label="Remove tag" type="button" onClick={() => removeArrayItem("tags", i)}>
                                            <X className="w-3 h-3 cursor-pointer hover:text-red-500" />
                                        </button>
                                    </span>
                                ))}
                            </div>
                            <Input placeholder="Type tag and press Enter" className="bg-neutral-950 border-neutral-800 h-9" onKeyDown={(e) => {
                                if (e.key === 'Enter') {
                                    e.preventDefault();
                                    addArrayItem("tags", e.currentTarget.value);
                                    e.currentTarget.value = "";
                                }
                            }} />
                        </div>
                    </div>
                </div>
            </div>

            <div className="flex items-center justify-end gap-4 p-4 bg-neutral-900/50 border border-neutral-800 rounded-2xl backdrop-blur-md sticky bottom-4 z-40">
                <Button type="button" variant="ghost" onClick={onCancel} className="text-neutral-400">Cancel</Button>
                <Button type="submit" disabled={isPending || !formData.thumbnail} className="bg-orange-500 hover:bg-orange-600 text-white gap-2 px-8 shadow-[0_0_20px_rgba(249,115,22,0.3)]">
                    {isPending && <Loader2 className="w-4 h-4 animate-spin" />}
                    {isEditing ? "Update Project" : "Publish Project"}
                </Button>
            </div>
        </form>
    );
}
