import AdminLayout from "@/components/layout/AdminLayout";
import { trpc } from "@/lib/trpc";
import { useState } from "react";
import {
    Plus,
    Search,
    Edit3,
    Trash2,
    Eye,
    TrendingUp,
    ChevronRight,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { cn } from "@/lib/utils";
import { ProjectForm } from "@/components/admin/ProjectForm";

export default function MarketingManager() {
    const { data: projects, isLoading, refetch } = trpc.projects.list.useQuery();
    const deleteMutation = trpc.projects.delete.useMutation();
    const [search, setSearch] = useState("");
    const [editingAsset, setEditingAsset] = useState<any | null>(null);

    const filteredAssets = projects?.filter(p =>
        p.category === "marketing" && (
            p.title.toLowerCase().includes(search.toLowerCase()) ||
            (p.client && p.client.toLowerCase().includes(search.toLowerCase()))
        )
    );

    const handleDelete = async (id: string) => {
        if (!confirm("Are you sure you want to delete this marketing asset?")) return;
        try {
            await deleteMutation.mutateAsync(id);
            toast.success("Asset deleted");
            refetch();
        } catch (error) {
            toast.error("Failed to delete asset");
        }
    };

    return (
        <AdminLayout>
            {editingAsset !== null ? (
                <div className="space-y-6">
                    <div className="flex items-center gap-4">
                        <Button variant="ghost" onClick={() => setEditingAsset(null)} className="h-10 w-10 p-0 rounded-xl">
                            <ChevronRight className="w-5 h-5 rotate-180 text-neutral-400" />
                        </Button>
                        <div>
                            <h2 className="text-2xl font-bold tracking-tight">{editingAsset.id ? "Edit Asset" : "New Marketing Asset"}</h2>
                            <p className="text-sm text-neutral-500">Fill in the details below to {editingAsset.id ? "update the" : "create a new"} marketing strategy deck, ad creative, or PDF report.</p>
                        </div>
                    </div>
                    {/* Reuse ProjectForm, but default category to marketing */}
                    <ProjectForm 
                        initialData={editingAsset.id ? editingAsset : undefined} 
                        onSuccess={() => { setEditingAsset(null); refetch(); }} 
                        onCancel={() => setEditingAsset(null)}
                        defaultCategory="marketing"
                    />
                </div>
            ) : (
                <div className="space-y-8">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <div className="p-3 bg-neutral-900 border border-neutral-800 rounded-xl">
                                <TrendingUp className="w-6 h-6 text-orange-500" />
                            </div>
                            <div>
                                <h2 className="text-2xl font-bold tracking-tight">Marketing Assets</h2>
                                <p className="text-neutral-500 text-sm">Manage campaigns, PDFs, strategy decks, and ad creatives.</p>
                            </div>
                        </div>
                        <Button onClick={() => setEditingAsset({})} className="bg-orange-500 hover:bg-orange-600 text-white gap-2 h-11 px-6 rounded-xl shadow-[0_0_20px_rgba(249,115,22,0.2)]">
                            <Plus className="w-4 h-4" />
                            New Asset
                        </Button>
                    </div>

                    <div className="relative max-w-md group">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-500 group-focus-within:text-orange-500" />
                        <Input
                            placeholder="Search marketing assets..."
                            className="pl-12 bg-neutral-950 border-neutral-800 h-11 rounded-xl focus:border-orange-500/50 transition-all"
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                        />
                    </div>

                    {isLoading ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {[...Array(3)].map((_, i) => (
                                <div key={i} className="h-64 bg-neutral-900 animate-pulse rounded-3xl border border-neutral-800" />
                            ))}
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {filteredAssets?.map((asset) => (
                                <div key={asset.id} className="group bg-neutral-900 border border-neutral-800 rounded-3xl overflow-hidden hover:border-orange-500/30 transition-all duration-500 flex flex-col h-full">
                                    <div className="aspect-video relative overflow-hidden bg-neutral-950">
                                        <img src={asset.thumbnail} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" alt="" />
                                        <div className="absolute top-4 left-4">
                                            <span className={cn(
                                                "px-3 py-1 rounded-full bg-black/50 backdrop-blur-md border border-white/10 text-[10px] font-bold uppercase tracking-widest",
                                                asset.status === "published" ? "text-green-500" : "text-white"
                                            )}>
                                                {asset.status}
                                            </span>
                                        </div>
                                    </div>
                                    <div className="p-6 flex-1 flex flex-col">
                                        <h4 className="text-xl font-bold tracking-tight line-clamp-1 mb-2">{asset.title}</h4>
                                        <p className="text-sm text-neutral-500 line-clamp-2 mb-6 flex-1">{asset.summary || asset.description}</p>
                                        <div className="flex items-center justify-between pt-6 border-t border-neutral-800/50">
                                            <div className="flex gap-2">
                                                {asset.client && <span className="text-[10px] font-bold uppercase tracking-widest text-neutral-500">{asset.client}</span>}
                                            </div>
                                            <div className="flex items-center gap-2">
                                                <Button size="icon" variant="ghost" onClick={() => setEditingAsset(asset)} className="h-9 w-9 hover:bg-orange-500 hover:text-white rounded-xl">
                                                    <Edit3 className="w-4 h-4" />
                                                </Button>
                                                <Button size="icon" variant="ghost" onClick={() => handleDelete(asset.id)} className="h-9 w-9 hover:bg-red-500 hover:text-white rounded-xl">
                                                    <Trash2 className="w-4 h-4" />
                                                </Button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}

                            {!filteredAssets?.length && (
                                <div className="col-span-full py-20 text-center border-2 border-dashed border-neutral-800 rounded-[40px] bg-neutral-900/10">
                                    <div className="inline-flex p-6 rounded-3xl bg-neutral-800 text-neutral-500 mb-6">
                                        <TrendingUp className="w-8 h-8" />
                                    </div>
                                    <h3 className="text-xl font-bold mb-2">No marketing assets</h3>
                                    <p className="text-neutral-500 max-w-sm mx-auto mb-8 font-medium italic">Upload your PDFs, strategy decks, and campaign visuals here.</p>
                                    <Button onClick={() => setEditingAsset({})} className="bg-orange-500 hover:bg-orange-600 text-white rounded-xl px-8 h-12">
                                        Create New Asset
                                    </Button>
                                </div>
                            )}
                        </div>
                    )}
                </div>
            )}
        </AdminLayout>
    );
}
