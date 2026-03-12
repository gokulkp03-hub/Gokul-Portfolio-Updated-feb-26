import { motion } from "framer-motion";
import { useLocation } from "wouter";
import { ArrowRight, TrendingUp } from "lucide-react";
import { trpc } from "@/lib/trpc";
import { useMemo } from "react";

const fadeInUp = {
    hidden: { opacity: 0, y: 30 },
    visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.6 }
    }
};

const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.15
        }
    }
};

export default function CaseStudies() {
    const [, navigate] = useLocation();

    const { data: dbProjects } = trpc.projects.list.useQuery();
    const { data: content } = trpc.content.get.useQuery();
    const sections = (content?.sections as any) || {};
    const caseStudiesText = sections.caseStudiesText || "Real marketing campaigns. Real results. Real growth.";
    
    const campaigns = useMemo(() => {
        if (!dbProjects) return [];
        return dbProjects.filter((p: any) => p.category.toLowerCase() === "marketing");
    }, [dbProjects]);

    return (
        <div className="min-h-screen bg-black pt-20">
            {/* Hero Section */}
            <section className="relative py-20 px-4 sm:px-6 lg:px-8">
                <div className="max-w-6xl mx-auto">
                    <motion.div
                        initial="hidden"
                        animate="visible"
                        variants={fadeInUp}
                        className="text-center mb-16"
                    >
                        <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
                            Campaign Case Studies
                        </h1>
                        <p className="text-xl md:text-2xl text-gray-400 max-w-3xl mx-auto whitespace-pre-wrap">
                            {caseStudiesText}
                        </p>
                    </motion.div>

                    {/* Case Studies Grid */}
                    <motion.div
                        initial="hidden"
                        animate="visible"
                        variants={staggerContainer}
                        className="grid grid-cols-1 md:grid-cols-2 gap-8"
                    >
                        {campaigns.map((study: any) => {
                            let parsedResults: any[] = [];
                            try {
                                parsedResults = typeof study.results === 'string' ? JSON.parse(study.results) : study.results;
                            } catch (e) {}

                            let platform = "Meta Ads";
                            let industry = "E-Commerce";
                            try {
                                const parsedTags = typeof study.tags === 'string' ? JSON.parse(study.tags) : study.tags;
                                if (Array.isArray(parsedTags)) {
                                    if (parsedTags[0]) platform = parsedTags[0];
                                    if (parsedTags[1]) industry = parsedTags[1];
                                }
                            } catch (e) {}

                            return (
                                <motion.div
                                    key={study.slug}
                                    variants={fadeInUp}
                                    onClick={() => navigate(`/marketing/${study.slug}`)}
                                    className="group relative overflow-hidden rounded-2xl bg-white/5 backdrop-blur-xl border border-white/10 hover:border-orange-500/50 transition-all duration-300 cursor-pointer hover:scale-[1.02]"
                                >
                                    {/* Card Content */}
                                    <div className="p-8">
                                        {/* Platform Badge */}
                                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-600/20 border border-orange-500/30 mb-4">
                                            <TrendingUp className="w-4 h-4 text-orange-500" />
                                            <span className="text-sm font-medium text-orange-400">{platform}</span>
                                        </div>

                                        {/* Client & Industry */}
                                        <h3 className="text-2xl font-bold text-white mb-2 group-hover:text-orange-400 transition-colors">
                                            {study.client || study.title}
                                        </h3>
                                        <p className="text-gray-400 text-sm mb-4">{industry}</p>

                                        {/* Objective */}
                                        <p className="text-gray-300 mb-6 line-clamp-2">
                                            {study.description}
                                        </p>

                                        {/* Key Metrics Preview */}
                                        {Array.isArray(parsedResults) && parsedResults.length > 0 && (
                                            <div className="grid grid-cols-3 gap-4 mb-6">
                                                {parsedResults.slice(0, 3).map((metric: any, idx) => (
                                                    <div key={idx} className="text-center">
                                                        <div className="text-xl font-bold text-orange-500">{metric.value}</div>
                                                        <div className="text-xs text-gray-500">{metric.label}</div>
                                                    </div>
                                                ))}
                                            </div>
                                        )}

                                        {/* View Case Study Link */}
                                        <div className="flex items-center gap-2 text-orange-400 font-medium group-hover:gap-4 transition-all">
                                            <span>View Case Study</span>
                                            <ArrowRight className="w-5 h-5" />
                                        </div>
                                    </div>

                                    {/* Hover Glow Effect */}
                                    <div className="absolute inset-0 bg-gradient-to-br from-orange-600/0 via-orange-500/0 to-orange-600/0 group-hover:from-orange-600/10 group-hover:via-orange-500/5 group-hover:to-orange-600/10 transition-all duration-300 pointer-events-none" />
                                </motion.div>
                            );
                        })}
                    </motion.div>

                    {/* Empty State */}
                    {campaigns.length === 0 && (
                        <motion.div
                            initial="hidden"
                            animate="visible"
                            variants={fadeInUp}
                            className="text-center py-20"
                        >
                            <p className="text-gray-400 text-lg">More case studies coming soon...</p>
                        </motion.div>
                    )}
                </div>
            </section>

            {/* CTA Section */}
            <section className="relative py-20 px-4 sm:px-6 lg:px-8 border-t border-gray-800">
                <motion.div
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    variants={fadeInUp}
                    className="max-w-4xl mx-auto text-center"
                >
                    <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
                        Ready to grow your brand?
                    </h2>
                    <p className="text-xl text-gray-400 mb-8">
                        Let's build a campaign that delivers results
                    </p>
                    <button
                        onClick={() => navigate("/#contact")}
                        className="px-8 py-4 rounded-lg font-semibold bg-orange-600 text-white hover:bg-orange-700 transition-all duration-300 hover:scale-105"
                    >
                        Get in Touch
                    </button>
                </motion.div>
            </section>
        </div>
    );
}
