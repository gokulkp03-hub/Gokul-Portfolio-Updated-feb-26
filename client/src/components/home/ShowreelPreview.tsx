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
                <div className="group relative flex flex-col md:flex-row items-center gap-6 cursor-pointer p-4 md:pr-10 rounded-[2.5rem] bg-muted/10 border border-border/20 hover:bg-muted/20 transition-all duration-500 hover:scale-[1.02] backdrop-blur-md shadow-2xl shadow-orange-500/5">

                    <div className="relative w-full md:w-56 h-32 rounded-[2rem] overflow-hidden bg-zinc-900 flex items-center justify-center border border-border/10 group-hover:border-orange-500/30 transition-colors">
                        <motion.img
                            src={showreel.thumbnail}
                            alt="Showreel Thumbnail"
                            className="absolute inset-0 w-full h-full object-cover opacity-60 group-hover:opacity-100 group-hover:scale-110 transition-all duration-700"
                        />
                        <div className="relative z-10 bg-white/10 backdrop-blur-md rounded-full p-4 group-hover:bg-orange-500 group-hover:scale-110 transition-all duration-500">
                            <Play className="w-6 h-6 text-white fill-current translate-x-0.5" />
                        </div>
                    </div>

                    <div className="text-center md:text-left">
                        <span className="block text-sm font-display font-medium uppercase tracking-[0.2em] text-muted-foreground group-hover:text-orange-500 transition-colors mb-1">
                            {showreel.title}
                        </span>
                        <span className="block text-xl md:text-2xl font-display font-bold text-foreground">
                            Watch Showreel
                        </span>
                    </div>

                </div>
            </Link>
        </motion.div>
    );
}
