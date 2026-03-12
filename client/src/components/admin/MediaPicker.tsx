import { useState } from "react";
import { trpc } from "@/lib/trpc";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Image as ImageIcon, Loader2, CheckCircle2, Video as VideoIcon, ExternalLink } from "lucide-react";
import { cn } from "@/lib/utils";

interface MediaPickerProps {
    value?: string;
    onSelect: (url: string) => void;
    trigger?: React.ReactNode;
    title?: string;
}

export function MediaPicker({ value, onSelect, trigger, title = "Select Media" }: MediaPickerProps) {
    const [open, setOpen] = useState(false);
    const { data: media, isLoading } = trpc.media.list.useQuery(undefined, {
        enabled: open,
    });

    const handleSelect = (url: string) => {
        onSelect(url);
        setOpen(false);
    };

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                {trigger ? trigger : (
                    <Button type="button" variant="outline" className="border-neutral-800 bg-neutral-900 w-full justify-start h-auto p-4 gap-4">
                        {value ? (
                            <>
                                {value.startsWith('http') || value.startsWith('<iframe') ? (
                                    <div className="w-10 h-10 rounded-md bg-orange-500/10 flex items-center justify-center flex-shrink-0">
                                        <ExternalLink className="w-5 h-5 text-orange-500" />
                                    </div>
                                ) : (
                                    <img src={value} alt="Selected" className="w-10 h-10 object-cover rounded-md flex-shrink-0" />
                                )}
                                <span className="text-sm truncate flex-1 text-left line-clamp-2 leading-tight">
                                    {value.startsWith('http') || value.startsWith('<iframe') ? value : value.split('/').pop()}
                                </span>
                            </>
                        ) : (
                            <>
                                <div className="p-2 rounded-lg bg-neutral-800">
                                    <ImageIcon className="w-5 h-5 text-neutral-400" />
                                </div>
                                <span className="text-neutral-500">Click to select an image</span>
                            </>
                        )}
                    </Button>
                )}
            </DialogTrigger>
            <DialogContent className="max-w-4xl bg-neutral-950 border-neutral-800 text-white">
                <DialogHeader>
                    <DialogTitle>{title}</DialogTitle>
                </DialogHeader>
                <div className="mt-4">
                    {isLoading ? (
                        <div className="flex justify-center p-12">
                            <Loader2 className="w-8 h-8 animate-spin text-orange-500" />
                        </div>
                    ) : (
                        <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-5 gap-4 max-h-[60vh] overflow-y-auto p-2">
                            {media?.filter(m => m.type.startsWith('image') || m.type === 'video/embed').map((item) => (
                                <button
                                    key={item.id}
                                    type="button"
                                    onClick={() => handleSelect(item.url)}
                                    className={cn(
                                        "relative aspect-square rounded-xl overflow-hidden group border-2 transition-all p-0",
                                        value === item.url ? "border-orange-500 shadow-[0_0_15px_rgba(249,115,22,0.3)]" : "border-transparent hover:border-neutral-700 bg-neutral-900"
                                    )}
                                >
                                    {item.type.startsWith('image') ? (
                                        <img src={item.url} alt="" className="w-full h-full object-cover" />
                                    ) : (
                                        <div className="w-full h-full flex flex-col items-center justify-center p-4 text-center">
                                            <div className="w-12 h-12 rounded-full bg-orange-500/10 flex items-center justify-center mb-2">
                                                <ExternalLink className="w-6 h-6 text-orange-500" />
                                            </div>
                                            <span className="text-[10px] text-neutral-500 font-mono truncate w-full break-all line-clamp-2">{item.url}</span>
                                        </div>
                                    )}

                                    {value === item.url && (
                                        <div className="absolute inset-0 bg-orange-500/20 flex items-center justify-center backdrop-blur-[2px]">
                                            <CheckCircle2 className="w-8 h-8 text-orange-500 bg-neutral-950 rounded-full" />
                                        </div>
                                    )}
                                </button>
                            ))}
                            {media?.filter(m => m.type.startsWith('image') || m.type === 'video/embed').length === 0 && (
                                <div className="col-span-full py-12 text-center text-neutral-500 flex flex-col items-center">
                                    <ImageIcon className="w-12 h-12 text-neutral-800 mb-4" />
                                    No images or videos found in your Media Library.
                                </div>
                            )}
                        </div>
                    )}
                </div>
            </DialogContent>
        </Dialog>
    );
}
