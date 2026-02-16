import { motion } from "framer-motion";
import { Play } from "lucide-react";
import { Link } from "wouter";
import { videoProjects } from "@/data/video";

export function ShowreelPreview() {
    const showreel = videoProjects.find(v => v.id.includes("wedding-highlight")) || videoProjects[0];

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="mt-12 flex justify-center"
        >
            <Link href="/video#showreel">
                <div className="group relative flex items-center gap-4 cursor-pointer p-2 pr-6 rounded-full bg-muted/30 border border-border/40 hover:bg-muted/50 transition-colors backdrop-blur-sm">

                    <div className="relative w-16 h-10 rounded-full overflow-hidden bg-black flex items-center justify-center">
                        <motion.img
                            src={showreel.thumbnail}
                            alt="Showreel Thumbnail"
                            className="absolute inset-0 w-full h-full object-cover opacity-60 group-hover:opacity-80 group-hover:scale-110 transition-all duration-500"
                        />
                        <div className="relative z-10 bg-white/20 backdrop-blur-md rounded-full p-1.5 group-hover:bg-white/30 transition-colors">
                            <Play className="w-3 h-3 text-white fill-current translate-x-0.5" />
                        </div>
                    </div>

                    <div className="text-left">
                        <span className="block text-xs font-bold uppercase tracking-wider text-muted-foreground group-hover:text-foreground transition-colors">
                            {showreel.title}
                        </span>
                        <span className="block text-[10px] text-muted-foreground/60">
                            Watch the highlights
                        </span>
                    </div>

                </div>
            </Link>
        </motion.div>
    );
}
