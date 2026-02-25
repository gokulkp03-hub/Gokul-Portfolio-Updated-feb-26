import { useState, useEffect } from "react";
import { Image as ImageIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface SafeImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
    fallbackSrc?: string;
    aspectRatio?: "square" | "video" | "portrait" | "wide";
}

const aspectRatios = {
    square: "aspect-square",
    video: "aspect-video",
    portrait: "aspect-[4/5]",
    wide: "aspect-[21/9]",
};

export function SafeImage({
    src,
    alt,
    className,
    fallbackSrc,
    aspectRatio,
    ...props
}: SafeImageProps) {
    const [error, setError] = useState(false);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        setError(false);
        setLoading(true);
    }, [src]);

    const handleLoad = () => {
        setLoading(false);
    };

    const handleError = () => {
        setError(true);
        setLoading(false);
    };

    return (
        <div
            className={cn(
                "relative overflow-hidden bg-muted transition-colors",
                aspectRatio && aspectRatios[aspectRatio],
                className
            )}
        >
            {loading && (
                <div className="absolute inset-0 animate-pulse bg-white/5 flex items-center justify-center">
                    <div className="w-8 h-8 rounded-full border-2 border-orange-500/20 border-t-orange-500 animate-spin" />
                </div>
            )}

            {error ? (
                <div className="absolute inset-0 flex flex-col items-center justify-center bg-zinc-900 border border-white/5 text-muted-foreground">
                    <ImageIcon className="w-8 h-8 mb-2 opacity-20" />
                    <span className="text-[10px] uppercase tracking-widest font-bold opacity-30">Media Unavailable</span>
                </div>
            ) : (
                <img
                    src={src}
                    alt={alt}
                    loading="lazy"
                    decoding="async"
                    className={cn(
                        "w-full h-full object-cover transition-opacity duration-500",
                        loading ? "opacity-0" : "opacity-100"
                    )}
                    onLoad={handleLoad}
                    onError={handleError}
                    {...props}
                />
            )}
        </div>
    );
}
