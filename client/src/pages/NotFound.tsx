import { SEO } from "@/components/SEO";
import { Link } from "wouter";
import { motion } from "framer-motion";
import { Home, Briefcase, Zap, Mail, ArrowRight } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-background px-4 py-24 relative overflow-hidden text-foreground">
      <SEO 
        title="Page Not Found | Gokul KP" 
        description="The page you are looking for does not exist or has been moved." 
        noindex={true}
      />
      
      {/* Background ambient glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-orange-500/5 blur-[140px] rounded-full pointer-events-none" />

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-2xl relative z-10 text-center"
      >
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-orange-500/10 border border-orange-500/20 text-orange-500 text-xs font-mono uppercase tracking-widest mb-6">
          <span>Error 404</span>
        </div>

        <h1 className="text-7xl sm:text-9xl font-display font-black tracking-tighter text-white uppercase mb-4 leading-none">
          404<span className="text-orange-500">.</span>
        </h1>

        <h2 className="text-2xl sm:text-3xl font-display font-bold text-foreground mb-4 uppercase tracking-tight">
          Page Not Found
        </h2>

        <p className="text-muted-foreground text-base max-w-md mx-auto mb-10 font-light leading-relaxed">
          The page you are looking for may have been moved, renamed, or no longer exists. Explore one of the core areas below:
        </p>

        {/* Navigation Action Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-lg mx-auto mb-12">
          <Link href="/">
            <span className="flex items-center justify-between p-4 rounded-2xl bg-zinc-900/60 border border-white/5 hover:border-orange-500/40 hover:bg-zinc-900 transition-all group cursor-pointer text-left">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-orange-500/10 text-orange-500 flex items-center justify-center group-hover:scale-110 transition-transform">
                  <Home className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-xs uppercase tracking-wider text-muted-foreground font-bold">Return</div>
                  <div className="text-sm font-semibold text-white">Homepage</div>
                </div>
              </div>
              <ArrowRight className="w-4 h-4 text-muted-foreground group-hover:text-orange-400 group-hover:translate-x-1 transition-all" />
            </span>
          </Link>

          <Link href="/portfolio">
            <span className="flex items-center justify-between p-4 rounded-2xl bg-zinc-900/60 border border-white/5 hover:border-orange-500/40 hover:bg-zinc-900 transition-all group cursor-pointer text-left">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-orange-500/10 text-orange-500 flex items-center justify-center group-hover:scale-110 transition-transform">
                  <Briefcase className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-xs uppercase tracking-wider text-muted-foreground font-bold">Explore</div>
                  <div className="text-sm font-semibold text-white">Portfolio Archive</div>
                </div>
              </div>
              <ArrowRight className="w-4 h-4 text-muted-foreground group-hover:text-orange-400 group-hover:translate-x-1 transition-all" />
            </span>
          </Link>

          <Link href="/services">
            <span className="flex items-center justify-between p-4 rounded-2xl bg-zinc-900/60 border border-white/5 hover:border-orange-500/40 hover:bg-zinc-900 transition-all group cursor-pointer text-left">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-orange-500/10 text-orange-500 flex items-center justify-center group-hover:scale-110 transition-transform">
                  <Zap className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-xs uppercase tracking-wider text-muted-foreground font-bold">Capabilities</div>
                  <div className="text-sm font-semibold text-white">Services</div>
                </div>
              </div>
              <ArrowRight className="w-4 h-4 text-muted-foreground group-hover:text-orange-400 group-hover:translate-x-1 transition-all" />
            </span>
          </Link>

          <Link href="/contact">
            <span className="flex items-center justify-between p-4 rounded-2xl bg-zinc-900/60 border border-white/5 hover:border-orange-500/40 hover:bg-zinc-900 transition-all group cursor-pointer text-left">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-orange-500/10 text-orange-500 flex items-center justify-center group-hover:scale-110 transition-transform">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-xs uppercase tracking-wider text-muted-foreground font-bold">Connect</div>
                  <div className="text-sm font-semibold text-white">Contact &amp; Consult</div>
                </div>
              </div>
              <ArrowRight className="w-4 h-4 text-muted-foreground group-hover:text-orange-400 group-hover:translate-x-1 transition-all" />
            </span>
          </Link>
        </div>
      </motion.div>
    </div>
  );
}
