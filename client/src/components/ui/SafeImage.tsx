import { useState, useEffect, useRef } from "react";
import { Image as ImageIcon } from "lucide-react";
import { cn, getMediaUrl } from "@/lib/utils";

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
    loading: loadingProp = "lazy",
    ...props
}: SafeImageProps) {
    const [error, setError] = useState(false);
    const [loading, setLoading] = useState(true);
    const imgRef = useRef<HTMLImageElement>(null);

    useEffect(() => {
        setError(false);
        setLoading(true);

        // Check if image is already cached/complete
        if (imgRef.current && imgRef.current.complete) {
            if (imgRef.current.naturalWidth === 0) {
                setError(true);
            } else {
                setLoading(false);
            }
        }
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


            {error ? (
                <div className="absolute inset-0 flex flex-col items-center justify-center bg-zinc-900 border border-white/5 text-muted-foreground z-20">
                    <ImageIcon className="w-8 h-8 mb-2 opacity-20" />
                    <span className="text-[10px] uppercase tracking-widest font-bold opacity-30">Media Unavailable</span>
                </div>
            ) : (
                <img
                    ref={imgRef}
                    src={getMediaUrl(src)}
                    alt={alt}
                    loading={loadingProp}
                    decoding="async"
                    className="w-full h-full object-cover"
                    onLoad={handleLoad}
                    onError={handleError}
                    {...props}
                />
            )}
        </div>
    );
}
