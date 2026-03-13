import AdminLayout from "@/components/layout/AdminLayout";
import { trpc } from "@/lib/trpc";
import { useState, useEffect } from "react";
import {
    Save,
    RotateCcw,
    Type,
    User,
    Share2,
    Briefcase,
    TrendingUp,
    Loader2,
    Info,
    Mail
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function ContentManager() {
    const { data: content, isLoading, refetch } = trpc.content.get.useQuery();
    const updateMutation = trpc.content.update.useMutation();

    const [formData, setFormData] = useState<any>({});
    const [isSaving, setIsSaving] = useState(false);

    useEffect(() => {
        if (content) {
            setFormData({
                heroTitle: content.heroTitle || "",
                heroSubtitle: content.heroSubtitle || "",
                aboutText: content.aboutText || "",
                sections: content.sections || {},
            });
        }
    }, [content]);

    const handleChange = (field: string, value: string) => {
        setFormData((prev: any) => ({ ...prev, [field]: value }));
    };

    const handleSectionChange = (sectionKey: string, value: string) => {
        setFormData((prev: any) => ({
            ...prev,
            sections: {
                ...(prev.sections || {}),
                [sectionKey]: value
            }
        }));
    };

    const handleSave = async () => {
        setIsSaving(true);
        try {
            await updateMutation.mutateAsync(formData);
            toast.success("Site content updated successfully");
            refetch();
        } catch (error) {
            toast.error("Failed to update content");
        } finally {
            setIsSaving(false);
        }
    };

    if (isLoading) {
        return (
            <AdminLayout>
                <div className="flex items-center justify-center p-20">
                    <Loader2 className="w-8 h-8 animate-spin text-orange-500" />
                </div>
            </AdminLayout>
        );
    }

    const sections = formData.sections || {};

    return (
        <AdminLayout>
            <div className="max-w-5xl space-y-12">
                <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                    <div>
                        <h2 className="text-2xl font-bold tracking-tight mb-1">Content Manager</h2>
                        <p className="text-neutral-500 text-sm italic">"Control your narrative. Update site text instantly without editing code."</p>
                    </div>
                    <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
                        <Button variant="outline" className="border-neutral-800 bg-neutral-900 rounded-xl" onClick={() => refetch()}>
                            <RotateCcw className="w-4 h-4 mr-2" />
                            Discard Changes
                        </Button>
                        <Button className="bg-orange-500 hover:bg-orange-600 text-white rounded-xl px-8 h-11 shadow-[0_0_20px_rgba(249,115,22,0.2)] whitespace-nowrap" onClick={handleSave} disabled={isSaving}>
                            {isSaving ? <Loader2 className="w-4 h-4 animate-spin mr-2" /> : <Save className="w-4 h-4 mr-2" />}
                            Publish Content
                        </Button>
                    </div>
                </div>

                <Tabs defaultValue="hero" className="space-y-8">
                    <TabsList className="bg-neutral-900 p-1 rounded-2xl border border-neutral-800 h-auto flex flex-wrap gap-1">
                        <TabsTrigger value="hero" className="rounded-xl data-[state=active]:bg-neutral-800 data-[state=active]:text-orange-500 px-6 gap-2 h-12">
                            <Type className="w-4 h-4" /> Homepage
                        </TabsTrigger>
                        <TabsTrigger value="about" className="rounded-xl data-[state=active]:bg-neutral-800 data-[state=active]:text-orange-500 px-6 gap-2 h-12">
                            <User className="w-4 h-4" /> About
                        </TabsTrigger>
                        <TabsTrigger value="services" className="rounded-xl data-[state=active]:bg-neutral-800 data-[state=active]:text-orange-500 px-6 gap-2 h-12">
                            <Briefcase className="w-4 h-4" /> Services & Portfolio
                        </TabsTrigger>
                        <TabsTrigger value="marketing" className="rounded-xl data-[state=active]:bg-neutral-800 data-[state=active]:text-orange-500 px-6 gap-2 h-12">
                            <TrendingUp className="w-4 h-4" /> Marketing / Case Studies / Results
                        </TabsTrigger>
                        <TabsTrigger value="contact" className="rounded-xl data-[state=active]:bg-neutral-800 data-[state=active]:text-orange-500 px-6 gap-2 h-12">
                            <Mail className="w-4 h-4" /> Contact & Social
                        </TabsTrigger>
                    </TabsList>

                    {/* HERO TAB */}
                    <TabsContent value="hero" className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
                        <div className="grid gap-8 p-8 bg-neutral-900/50 border border-neutral-800 rounded-3xl backdrop-blur-md">
                            <div className="space-y-3">
                                <label className="text-xs font-bold uppercase tracking-widest text-neutral-500 flex items-center gap-2">
                                    Main Homepage Headline
                                </label>
                                <Input
                                    value={formData.heroTitle}
                                    onChange={(e) => handleChange("heroTitle", e.target.value)}
                                    className="bg-neutral-950 border-neutral-800 h-14 rounded-2xl focus:border-orange-500/50 text-lg font-bold"
                                    placeholder="e.g., Creative Visual Storyteller"
                                />
                            </div>
                            <div className="space-y-3">
                                <label className="text-xs font-bold uppercase tracking-widest text-neutral-500">Homepage Subtitle / Introduction Text</label>
                                <Textarea
                                    value={formData.heroSubtitle}
                                    onChange={(e) => handleChange("heroSubtitle", e.target.value)}
                                    className="bg-neutral-950 border-neutral-800 min-h-[100px] rounded-2xl focus:border-orange-500/50 leading-relaxed"
                                    placeholder="Describe your expertise in 1-2 powerful sentences..."
                                />
                            </div>
                            <div className="space-y-3 pt-4 border-t border-neutral-800">
                                <label className="text-xs font-bold uppercase tracking-widest text-neutral-500">Featured Work Section Title</label>
                                <Input
                                    value={sections.featuredWorkTitle || ""}
                                    onChange={(e) => handleSectionChange("featuredWorkTitle", e.target.value)}
                                    className="bg-neutral-950 border-neutral-800 h-12 rounded-xl focus:border-orange-500/50"
                                    placeholder="e.g., Featured Editorials"
                                />
                            </div>
                        </div>
                    </TabsContent>

                    {/* ABOUT TAB */}
                    <TabsContent value="about" className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
                        <div className="p-8 bg-neutral-900/50 border border-neutral-800 rounded-3xl backdrop-blur-md">
                            <div className="space-y-3">
                                <label className="text-xs font-bold uppercase tracking-widest text-neutral-500">About Description (rendered on About page)</label>
                                <Textarea
                                    value={formData.aboutText}
                                    onChange={(e) => handleChange("aboutText", e.target.value)}
                                    className="bg-neutral-950 border-neutral-800 min-h-[300px] rounded-2xl focus:border-orange-500/50 leading-relaxed"
                                    placeholder="Tell your story... highlight your journey, your passion, and what makes your work unique."
                                />
                            </div>
                        </div>
                    </TabsContent>

                    {/* SERVICES TAB */}
                    <TabsContent value="services" className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
                        <div className="grid gap-8 p-8 bg-neutral-900/50 border border-neutral-800 rounded-3xl backdrop-blur-md">
                            <div className="space-y-3">
                                <label className="text-xs font-bold uppercase tracking-widest text-neutral-500">Services Page Intro Text</label>
                                <Textarea
                                    value={sections.servicesText || ""}
                                    onChange={(e) => handleSectionChange("servicesText", e.target.value)}
                                    className="bg-neutral-950 border-neutral-800 min-h-[100px] rounded-2xl focus:border-orange-500/50 leading-relaxed"
                                    placeholder="General text rendered at the top of the Services page..."
                                />
                            </div>
                            <div className="space-y-3 pt-4 border-t border-neutral-800">
                                <label className="text-xs font-bold uppercase tracking-widest text-neutral-500">Portfolio Main Description</label>
                                <Textarea
                                    value={sections.portfolioText || ""}
                                    onChange={(e) => handleSectionChange("portfolioText", e.target.value)}
                                    className="bg-neutral-950 border-neutral-800 min-h-[100px] rounded-2xl focus:border-orange-500/50 leading-relaxed"
                                    placeholder="Text displayed on the main Portfolio page..."
                                />
                            </div>
                        </div>
                    </TabsContent>

                    {/* MARKETING TAB */}
                    <TabsContent value="marketing" className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
                        <div className="grid gap-8 p-8 bg-neutral-900/50 border border-neutral-800 rounded-3xl backdrop-blur-md">
                            <div className="space-y-3">
                                <label className="text-xs font-bold uppercase tracking-widest text-neutral-500">Marketing Strategy Summary (Main Page)</label>
                                <Textarea
                                    value={sections.marketingText || ""}
                                    onChange={(e) => handleSectionChange("marketingText", e.target.value)}
                                    className="bg-neutral-950 border-neutral-800 min-h-[100px] rounded-2xl focus:border-orange-500/50 leading-relaxed"
                                    placeholder="Content to appear on the Marketing root page..."
                                />
                            </div>
                            <div className="space-y-3 pt-4 border-t border-neutral-800">
                                <label className="text-xs font-bold uppercase tracking-widest text-neutral-500">Case Studies Subtitle Text</label>
                                <Textarea
                                    value={sections.caseStudiesText || ""}
                                    onChange={(e) => handleSectionChange("caseStudiesText", e.target.value)}
                                    className="bg-neutral-950 border-neutral-800 min-h-[100px] rounded-2xl focus:border-orange-500/50 leading-relaxed"
                                    placeholder="Content to appear on the Case Studies page..."
                                />
                            </div>
                            <div className="space-y-3 pt-4 border-t border-neutral-800">
                                <label className="text-xs font-bold uppercase tracking-widest text-neutral-500">Results Subtitle Text</label>
                                <Textarea
                                    value={sections.resultsText || ""}
                                    onChange={(e) => handleSectionChange("resultsText", e.target.value)}
                                    className="bg-neutral-950 border-neutral-800 min-h-[100px] rounded-2xl focus:border-orange-500/50 leading-relaxed"
                                    placeholder="Content to appear on the Results page..."
                                />
                            </div>
                        </div>
                    </TabsContent>

                    {/* CONTACT TAB */}
                    <TabsContent value="contact" className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
                        <div className="grid gap-6 p-8 bg-neutral-900/50 border border-neutral-800 rounded-3xl backdrop-blur-md">
                            <div className="space-y-3">
                                <label className="text-xs font-bold uppercase tracking-widest text-neutral-500">Contact Email</label>
                                <Input
                                    type="email"
                                    value={sections.contactEmail || ""}
                                    onChange={(e) => handleSectionChange("contactEmail", e.target.value)}
                                    className="bg-neutral-950 border-neutral-800 h-12 rounded-xl focus:border-orange-500/50"
                                    placeholder="hello@example.com"
                                />
                            </div>
                            <div className="space-y-3">
                                <label className="text-xs font-bold uppercase tracking-widest text-neutral-500">Instagram Handle / Link</label>
                                <Input
                                    value={sections.socialInstagram || ""}
                                    onChange={(e) => handleSectionChange("socialInstagram", e.target.value)}
                                    className="bg-neutral-950 border-neutral-800 h-12 rounded-xl focus:border-orange-500/50"
                                    placeholder="https://instagram.com/..."
                                />
                            </div>
                            <div className="space-y-3">
                                <label className="text-xs font-bold uppercase tracking-widest text-neutral-500">Behance Link</label>
                                <Input
                                    value={sections.socialBehance || ""}
                                    onChange={(e) => handleSectionChange("socialBehance", e.target.value)}
                                    className="bg-neutral-950 border-neutral-800 h-12 rounded-xl focus:border-orange-500/50"
                                    placeholder="https://behance.net/..."
                                />
                            </div>
                            <div className="space-y-3">
                                <label className="text-xs font-bold uppercase tracking-widest text-neutral-500">LinkedIn Link</label>
                                <Input
                                    value={sections.socialLinkedIn || ""}
                                    onChange={(e) => handleSectionChange("socialLinkedIn", e.target.value)}
                                    className="bg-neutral-950 border-neutral-800 h-12 rounded-xl focus:border-orange-500/50"
                                    placeholder="https://linkedin.com/..."
                                />
                            </div>
                            <div className="space-y-3">
                                <label className="text-xs font-bold uppercase tracking-widest text-neutral-500">Twitter (X) Link</label>
                                <Input
                                    value={sections.socialTwitter || ""}
                                    onChange={(e) => handleSectionChange("socialTwitter", e.target.value)}
                                    className="bg-neutral-950 border-neutral-800 h-12 rounded-xl focus:border-orange-500/50"
                                    placeholder="https://twitter.com/..."
                                />
                            </div>
                        </div>
                    </TabsContent>
                </Tabs>
            </div>
        </AdminLayout>
    );
}
