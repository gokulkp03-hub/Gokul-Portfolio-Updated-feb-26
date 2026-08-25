import { SEO } from "@/components/SEO";
import { trpc } from "@/lib/trpc";
import { Link } from "wouter";
import { ArrowRight, Loader2, Calendar } from "lucide-react";
import { format } from "date-fns";

export default function Blogs() {
  const { data: blogs, isLoading } = trpc.blogs.list.useQuery();

  return (
    <>
      <SEO 
        title="Marketing & Growth Blogs" 
        description="Insights, case studies, and thoughts on performance marketing and video production in Dubai." 
        url="/blogs"
      />
      <div className="pt-32 pb-24 px-6 min-h-screen bg-background">
        <div className="max-w-4xl mx-auto space-y-12">
          <header className="space-y-4">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-white uppercase font-display">
              Growth <span className="text-orange-500 italic">Insights.</span>
            </h1>
            <p className="text-xl text-neutral-400 max-w-2xl">
              Thoughts and strategies on performance marketing, video production, and scaling brands in the GCC.
            </p>
          </header>
          
          {isLoading ? (
            <div className="py-20 flex justify-center">
              <Loader2 className="w-8 h-8 animate-spin text-orange-500" />
            </div>
          ) : blogs && blogs.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {blogs.map(blog => (
                <Link key={blog.id} href={`/blogs/${blog.slug}`}>
                  <a className="group block bg-zinc-900/40 border border-white/5 rounded-[2rem] overflow-hidden hover:border-orange-500/30 transition-all duration-300 hover:-translate-y-1">
                    {blog.thumbnail && (
                      <div className="aspect-[16/10] overflow-hidden">
                        <img 
                          src={blog.thumbnail} 
                          alt={blog.title} 
                          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                        />
                      </div>
                    )}
                    <div className="p-8">
                      <div className="flex items-center gap-2 text-xs text-orange-500/80 font-mono mb-4 uppercase tracking-wider">
                        <Calendar className="w-3.5 h-3.5" />
                        {blog.publishDate ? format(new Date(blog.publishDate), "MMM dd, yyyy") : format(new Date(blog.createdAt), "MMM dd, yyyy")}
                      </div>
                      <h2 className="text-2xl font-bold text-white mb-3 line-clamp-2 leading-tight group-hover:text-orange-400 transition-colors">
                        {blog.title}
                      </h2>
                      <p className="text-zinc-400 line-clamp-3 mb-6 text-sm">
                        {blog.excerpt}
                      </p>
                      
                      <div className="flex items-center text-sm font-bold text-white group-hover:text-orange-400 transition-colors uppercase tracking-widest">
                        Read Article
                        <ArrowRight className="w-4 h-4 ml-2 transition-transform group-hover:translate-x-1" />
                      </div>
                    </div>
                  </a>
                </Link>
              ))}
            </div>
          ) : (
            <div className="py-20 text-center border border-white/5 rounded-[2rem] bg-zinc-900/20">
              <p className="text-lg text-neutral-400">Articles coming soon. Stay tuned!</p>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
