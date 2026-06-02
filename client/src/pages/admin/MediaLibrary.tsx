import AdminLayout from "@/components/layout/AdminLayout";
import { trpc } from "@/lib/trpc";
import { useState, useRef } from "react";
import {
    Upload,
    Search,
    MoreVertical,
    Trash2,
    ExternalLink,
    Loader2,
    File as FileIcon,
    Image as ImageIcon,
    Video as VideoIcon,
    CheckCircle2,
    XCircle,
    Plus,
    CheckSquare,
    Copy
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { cn, getMediaUrl } from "@/lib/utils";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";

export default function MediaLibrary() {
    const { data: media, isLoading, refetch } = trpc.media.list.useQuery();
    const uploadMutation = trpc.media.upload.useMutation();
    const addExternalMutation = trpc.media.addExternal.useMutation();
    const deleteMutation = trpc.media.delete.useMutation();

    const [search, setSearch] = useState("");
    const [isUploading, setIsUploading] = useState(false);
    const [embedModalOpen, setEmbedModalOpen] = useState(false);
    const [embedUrl, setEmbedUrl] = useState("");
    const [embedTitle, setEmbedTitle] = useState("");
    const fileInputRef = useRef<HTMLInputElement>(null);

    const filteredMedia = media?.filter(m =>
        m.url.toLowerCase().includes(search.toLowerCase()) ||
        m.type.toLowerCase().includes(search.toLowerCase())
    );

    const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        setIsUploading(true);
        const reader = new FileReader();

        reader.onload = async () => {
            try {
                const base64Data = (reader.result as string).split(",")[1];
                await uploadMutation.mutateAsync({
                    fileName: file.name,
                    fileType: file.type,
                    base64Data,
                });
                toast.success("File uploaded successfully");
                refetch();
            } catch (error) {
                console.error("Upload error:", error);
                toast.error("Failed to upload file");
            } finally {
                setIsUploading(false);
                if (fileInputRef.current) fileInputRef.current.value = "";
            }
        };

        reader.onerror = () => {
            toast.error("Failed to read file");
            setIsUploading(false);
        };

        reader.readAsDataURL(file);
    };

    const handleAddEmbed = async () => {
        if (!embedUrl) {
            toast.error("Please provide a video link or iframe");
            return;
        }

        let parsedUrl = embedUrl;
        if (embedUrl.includes('<iframe') && embedUrl.includes('src=')) {
            const match = embedUrl.match(/src=["']([^"']+)["']/);
            if (match && match[1]) {
                parsedUrl = match[1];
            }
        }

        try {
            setIsUploading(true);
            await addExternalMutation.mutateAsync({
                url: parsedUrl,
                type: 'video/embed',
                title: embedTitle || 'Embedded Video'
            });
            toast.success("Embedded video saved");
            setEmbedModalOpen(false);
            setEmbedUrl("");
            setEmbedTitle("");
            refetch();
        } catch (error) {
            toast.error("Failed to save embedded video");
        } finally {
            setIsUploading(false);
        }
    };

    const handleDelete = async (id: string) => {
        if (!confirm("Are you sure you want to delete this asset?")) return;
        try {
            await deleteMutation.mutateAsync(id);
            toast.success("Asset deleted");
            refetch();
        } catch (error) {
            toast.error("Failed to delete asset");
        }
    };

    const copyUrl = (url: string) => {
        const resolved = getMediaUrl(url);
        const absoluteUrl = resolved.startsWith("http")
            ? resolved
            : `${window.location.origin}${resolved.startsWith("/") ? "" : "/"}${resolved}`;
        navigator.clipboard.writeText(absoluteUrl);
        toast.success("URL copied to clipboard");
    };

    return (
        <AdminLayout>
            <div className="space-y-8">
                {/* Header Actions */}
                <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4 md:gap-6">
                    <div className="relative flex-1 group">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-500 group-focus-within:text-orange-500 transition-colors" />
                        <Input
                            placeholder="Search assets..."
                            aria-label="Search assets"
                            className="pl-12 bg-neutral-900 border-neutral-800 rounded-xl focus:border-orange-500/50 transition-all h-12 w-full"
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                        />
                    </div>
                    <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 md:gap-4">
                        <input
                            type="file"
                            className="hidden"
                            ref={fileInputRef}
                            onChange={handleFileUpload}
                        />
                        <Dialog open={embedModalOpen} onOpenChange={setEmbedModalOpen}>
                            <DialogTrigger asChild>
                                <Button
                                    variant="outline"
                                    className="border-neutral-800 bg-neutral-900 hover:bg-neutral-800 text-white gap-2 px-6 h-12 rounded-xl transition-all"
                                >
                                    <VideoIcon className="w-5 h-5 text-orange-500" />
                                    <span className="hidden sm:inline">Add Embedded Video</span>
                                    <span className="inline sm:hidden">Add Link</span>
                                </Button>
                            </DialogTrigger>
                            <DialogContent className="bg-neutral-950 border-neutral-800 text-white w-[95vw] max-w-lg p-6 sm:p-8">
                                <DialogHeader>
                                    <DialogTitle>Add Embedded Video</DialogTitle>
                                </DialogHeader>
                                <div className="space-y-4 pt-4">
                                    <div className="space-y-2">
                                        <label className="text-xs uppercase tracking-widest text-neutral-500 font-bold">Video Title (Optional)</label>
                                        <Input
                                            value={embedTitle}
                                            onChange={(e) => setEmbedTitle(e.target.value)}
                                            placeholder="e.g., Summer Campaign Ad"
                                            className="bg-neutral-900 border-neutral-800"
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-xs uppercase tracking-widest text-neutral-500 font-bold">Video Link or Iframe</label>
                                        <Input
                                            value={embedUrl}
                                            onChange={(e) => setEmbedUrl(e.target.value)}
                                            placeholder="Paste YouTube/Vimeo link or full <iframe> code"
                                            className="bg-neutral-900 border-neutral-800"
                                        />
                                    </div>
                                    <Button
                                        onClick={handleAddEmbed}
                                        disabled={isUploading || !embedUrl}
                                        className="w-full bg-orange-500 hover:bg-orange-600 text-white mt-4"
                                    >
                                        {isUploading ? <Loader2 className="w-4 h-4 animate-spin mr-2" /> : null}
                                        Save Video
                                    </Button>
                                </div>
                            </DialogContent>
                        </Dialog>

                        <Button
                            onClick={() => fileInputRef.current?.click()}
                            disabled={isUploading}
                            className="bg-orange-500 hover:bg-orange-600 text-white gap-2 px-4 sm:px-6 h-12 rounded-xl transition-all shadow-[0_0_20px_rgba(249,115,22,0.2)] flex-1 sm:flex-none whitespace-nowrap"
                        >
                            {isUploading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Plus className="w-5 h-5" />}
                            <span className="hidden sm:inline">{isUploading ? "Uploading..." : "Upload New Asset"}</span>
                            <span className="inline sm:hidden">{isUploading ? "..." : "Upload"}</span>
                        </Button>

                        <Button
                            variant="outline"
                            className="border-neutral-800 bg-neutral-900 hover:bg-neutral-800 text-white gap-2 px-4 sm:px-6 h-12 rounded-xl transition-all hidden md:flex"
                            onClick={() => toast.info("Bulk actions coming soon")}
                        >
                            <CheckSquare className="w-5 h-5" />
                            <span>Bulk Select</span>
                        </Button>
                    </div>
                </div>

                {/* Media Grid */}
                {isLoading ? (
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-3 sm:gap-6">
                        {[...Array(12)].map((_, i) => (
                            <div key={i} className="aspect-square bg-neutral-900 animate-pulse rounded-2xl border border-neutral-800" />
                        ))}
                    </div>
                ) : (
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-3 sm:gap-6">
                        {filteredMedia?.map((item) => (
                            <div key={item.id} className="group relative bg-neutral-900 border border-neutral-800 rounded-2xl overflow-hidden hover:border-orange-500/50 transition-all duration-300">
                                <div className="aspect-square relative flex items-center justify-center bg-neutral-950">
                                    {item.type.startsWith("image") ? (
                                        <img src={getMediaUrl(item.url)} alt="" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                                    ) : item.type === "video/embed" ? (
                                        <div className="flex flex-col items-center gap-2 p-4 text-center">
                                            <div className="w-12 h-12 rounded-full bg-orange-500/10 flex items-center justify-center">
                                                <ExternalLink className="w-6 h-6 text-orange-500" />
                                            </div>
                                            <span className="text-[10px] text-neutral-500 uppercase font-bold tracking-widest break-all line-clamp-2">{item.url}</span>
                                        </div>
                                    ) : item.type.startsWith("video") ? (
                                        <div className="flex flex-col items-center gap-2">
                                            <div className="w-12 h-12 rounded-full bg-orange-500/10 flex items-center justify-center">
                                                <VideoIcon className="w-6 h-6 text-orange-500" />
                                            </div>
                                            <span className="text-[10px] text-neutral-500 uppercase font-bold tracking-widest">Video</span>
                                        </div>
                                    ) : (item.type === "application/pdf" || item.url.toLowerCase().endsWith(".pdf")) ? (
                                        <div className="flex flex-col items-center gap-2">
                                            <div className="w-12 h-12 rounded-full bg-red-500/10 flex items-center justify-center">
                                                <FileIcon className="w-6 h-6 text-red-500" />
                                            </div>
                                            <span className="text-[10px] text-red-500 uppercase font-bold tracking-widest">PDF Document</span>
                                        </div>
                                    ) : (
                                        <div className="flex flex-col items-center gap-2">
                                            <div className="w-12 h-12 rounded-full bg-neutral-800 flex items-center justify-center">
                                                <FileIcon className="w-6 h-6 text-neutral-400" />
                                            </div>
                                            <span className="text-[10px] text-neutral-500 uppercase font-bold tracking-widest">Document</span>
                                        </div>
                                    )}

                                    {/* Overlay Actions */}
                                    <div className="absolute inset-0 bg-neutral-950/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2 backdrop-blur-[2px]">
                                        <Button size="icon" variant="secondary" className="bg-white/10 hover:bg-white text-white hover:text-black rounded-lg w-9 h-9" onClick={() => window.open(getMediaUrl(item.url), "_blank")} title="Open File">
                                            <ExternalLink className="w-4 h-4" />
                                        </Button>
                                        <Button size="icon" variant="secondary" className="bg-white/10 hover:bg-white text-white hover:text-black rounded-lg w-9 h-9" onClick={() => copyUrl(item.url)} title="Copy Link">
                                            <Copy className="w-4 h-4" />
                                        </Button>
                                        <Button size="icon" variant="destructive" className="bg-red-500/20 hover:bg-red-500 text-red-500 hover:text-white rounded-lg w-9 h-9 border border-red-500/30" onClick={() => handleDelete(item.id)} title="Delete Asset">
                                            <Trash2 className="w-4 h-4" />
                                        </Button>
                                    </div>
                                </div>
                                <div className="p-3 border-t border-neutral-800 bg-neutral-900/50 min-h-[48px] flex items-center">
                                    <p className="text-[10px] text-neutral-400 font-mono break-all line-clamp-2 w-full" title={(item as any).name || item.url.split('/').pop()}>
                                        {(item as any).name || item.url.split('/').pop()}
                                    </p>
                                </div>
                            </div>
                        ))}

                        {!filteredMedia?.length && !isLoading && (
                            <div className="col-span-full py-20 text-center border-2 border-dashed border-neutral-800 rounded-3xl bg-neutral-900/20">
                                <div className="inline-flex p-4 rounded-full bg-neutral-800 mb-4 text-neutral-500">
                                    <Search className="w-8 h-8" />
                                </div>
                                <h3 className="text-xl font-bold mb-1">No assets found</h3>
                                <p className="text-neutral-500 max-w-xs mx-auto text-sm">Upload your first image or video to start building your media library.</p>
                            </div>
                        )}
                    </div>
                )}
            </div>
        </AdminLayout>
    );
}
