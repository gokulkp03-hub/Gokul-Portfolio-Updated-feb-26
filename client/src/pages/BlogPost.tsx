import { SEO } from "@/components/SEO";
import { trpc } from "@/lib/trpc";
import { useLocation } from "wouter";
import { ArrowLeft, Loader2, Calendar } from "lucide-react";
import { format } from "date-fns";
import ReactMarkdown from "react-markdown";

export default function BlogPost({ slug }: { slug: string }) {
  const [_, navigate] = useLocation();
  const { data: blog, isLoading, error } = trpc.blogs.getBySlug.useQuery(slug);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-orange-500" />
      </div>
    );
  }

  if (error || !blog) {
    return (
      <div className="min-h-screen bg-background flex flex-col items-center justify-center space-y-4">
        <h1 className="text-2xl font-bold text-white">Post not found</h1>
        <button onClick={() => navigate("/blogs")} className="text-orange-500 hover:underline">
          Back to Blogs
        </button>
      </div>
    );
  }

  return (
    <>
      <SEO 
        title={blog.metaTitle || `${blog.title} | Gokul KP`}
        description={blog.metaDescription || blog.excerpt || `Read ${blog.title} on Gokul KP's Growth Insights.`}
        url={`/blogs/${blog.slug}`}
        image={blog.thumbnail || undefined}
      />
      <article className="pt-32 pb-24 px-6 min-h-screen bg-background">
        <div className="max-w-3xl mx-auto space-y-12">
          
          {/* Back Button */}
          <button 
            onClick={() => navigate("/blogs")} 
            className="inline-flex items-center gap-2 text-sm font-medium text-zinc-400 hover:text-orange-500 transition-colors group"
          >
            <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
            Back to Insights
          </button>

          {/* Header */}
          <header className="space-y-6">
            <div className="flex items-center gap-2 text-sm text-orange-500 font-mono uppercase tracking-wider">
              <Calendar className="w-4 h-4" />
              {blog.publishDate ? format(new Date(blog.publishDate), "MMMM dd, yyyy") : format(new Date(blog.createdAt), "MMMM dd, yyyy")}
            </div>
            
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-white uppercase font-display leading-tight">
              {blog.title}
            </h1>
            
            {blog.excerpt && (
              <p className="text-xl text-neutral-400 max-w-2xl leading-relaxed">
                {blog.excerpt}
              </p>
            )}
          </header>

          {/* Thumbnail */}
          {blog.thumbnail && (
            <div className="aspect-[21/9] w-full rounded-[2rem] overflow-hidden border border-white/5 bg-zinc-900 shadow-2xl">
              <img 
                src={blog.thumbnail} 
                alt={blog.title} 
                className="w-full h-full object-cover"
              />
            </div>
          )}

          {/* Markdown Content */}
          <div className="prose prose-invert prose-orange max-w-none 
                          prose-headings:font-display prose-headings:uppercase prose-headings:tracking-tight 
                          prose-h2:text-3xl prose-h2:mt-12 prose-h2:mb-6
                          prose-h3:text-xl prose-h3:mt-8 prose-h3:mb-4
                          prose-p:text-zinc-300 prose-p:leading-loose prose-p:text-lg
                          prose-a:text-orange-500 prose-a:no-underline hover:prose-a:underline
                          prose-img:rounded-[1.5rem] prose-img:border prose-img:border-white/5
                          prose-strong:text-white prose-strong:font-bold
                          prose-li:text-zinc-300 prose-li:text-lg prose-ul:space-y-2
                          prose-blockquote:border-l-orange-500 prose-blockquote:bg-orange-500/5 prose-blockquote:py-1 prose-blockquote:px-6 prose-blockquote:rounded-r-xl prose-blockquote:not-italic
                          py-8 border-t border-white/5">
            <ReactMarkdown>
              {blog.content || ""}
            </ReactMarkdown>
          </div>
        </div>
      </article>
    </>
  );
}
