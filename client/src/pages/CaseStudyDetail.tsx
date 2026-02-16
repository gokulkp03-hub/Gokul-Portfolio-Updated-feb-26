import { motion } from "framer-motion";
import { useLocation, useParams } from "wouter";
import { marketingCampaigns } from "@/data/marketing";
import { ArrowLeft, TrendingUp, Target, CheckCircle2, Lightbulb } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useEffect } from "react";
import { setSEO } from "@/utils/seo";

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
            staggerChildren: 0.1
        }
    }
};

export default function CaseStudyDetail() {
    const params = useParams();
    const [, navigate] = useLocation();
    const slug = params.slug;

    const caseStudy = marketingCampaigns.find(cs => cs.slug === slug);

    if (!caseStudy) {
        return (
            <div className="min-h-screen bg-black flex items-center justify-center">
                <div className="text-center">
                    <h1 className="text-4xl font-bold text-white mb-4">Case Study Not Found</h1>
                    <Button onClick={() => navigate("/case-studies")}>
                        Back to Case Studies
                    </Button>
                </div>
            </div>
        );
    }

    useEffect(() => {
        if (caseStudy) {
            setSEO({
                title: `${caseStudy.client} - Case Study | Gokul KP`,
                description: caseStudy.objective,
                image: caseStudy.visuals[0] || "/assets/images/og-image.jpg",
                url: `https://gokulkp.com/case-studies/${slug}`
            });
        }
    }, [caseStudy, slug]);

    return (
        <div className="min-h-screen bg-black pt-20">
            {/* Back Button */}
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <button
                    onClick={() => navigate("/case-studies")}
                    className="flex items-center gap-2 text-gray-400 hover:text-orange-400 transition-colors"
                >
                    <ArrowLeft className="w-5 h-5" />
                    <span>Back to Case Studies</span>
                </button>
            </div>

            {/* Hero Section */}
            <section className="relative py-12 px-4 sm:px-6 lg:px-8">
                <div className="max-w-6xl mx-auto">
                    <motion.div
                        initial="hidden"
                        animate="visible"
                        variants={fadeInUp}
                    >
                        {/* Platform Badge */}
                        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-orange-600/20 border border-orange-500/30 mb-6">
                            <TrendingUp className="w-5 h-5 text-orange-500" />
                            <span className="text-sm font-medium text-orange-400">{caseStudy.platform}</span>
                        </div>

                        <h1 className="text-5xl md:text-6xl font-bold text-white mb-4">
                            {caseStudy.client}
                        </h1>
                        <p className="text-2xl text-gray-400 mb-8">{caseStudy.objective}</p>

                        {/* Meta Info */}
                        <div className="flex flex-wrap gap-6 text-gray-400">
                            <div>
                                <span className="text-gray-500 text-sm">Industry</span>
                                <p className="text-white font-medium">{caseStudy.industry}</p>
                            </div>
                            <div>
                                <span className="text-gray-500 text-sm">Role</span>
                                <p className="text-white font-medium">{caseStudy.role}</p>
                            </div>
                            <div>
                                <span className="text-gray-500 text-sm">Duration</span>
                                <p className="text-white font-medium">{caseStudy.duration}</p>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* Performance Metrics */}
            <section className="relative py-12 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-orange-600/5 to-transparent">
                <div className="max-w-6xl mx-auto">
                    <motion.div
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        variants={staggerContainer}
                        className="grid grid-cols-2 md:grid-cols-5 gap-6"
                    >
                        {caseStudy.metrics.map((metric, idx) => (
                            <motion.div
                                key={idx}
                                variants={fadeInUp}
                                className="text-center p-6 rounded-xl bg-white/5 backdrop-blur-xl border border-white/10"
                            >
                                <div className="text-3xl md:text-4xl font-bold text-orange-500 mb-2">
                                    {metric.value}
                                </div>
                                <div className="text-sm text-gray-400">{metric.label}</div>
                            </motion.div>
                        ))}
                    </motion.div>
                </div>
            </section>

            {/* Challenge */}
            <section className="relative py-12 px-4 sm:px-6 lg:px-8">
                <div className="max-w-4xl mx-auto">
                    <motion.div
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        variants={fadeInUp}
                    >
                        <div className="flex items-center gap-3 mb-6">
                            <Target className="w-6 h-6 text-orange-500" />
                            <h2 className="text-3xl font-bold text-white">The Challenge</h2>
                        </div>
                        <p className="text-lg text-gray-300 leading-relaxed">
                            {caseStudy.challenge}
                        </p>
                    </motion.div>
                </div>
            </section>

            {/* Strategy */}
            <section className="relative py-12 px-4 sm:px-6 lg:px-8 bg-white/[0.02]">
                <div className="max-w-4xl mx-auto">
                    <motion.div
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        variants={fadeInUp}
                    >
                        <h2 className="text-3xl font-bold text-white mb-8">Strategy</h2>
                        <motion.div
                            variants={staggerContainer}
                            className="space-y-4"
                        >
                            {caseStudy.strategy.map((item, idx) => (
                                <motion.div
                                    key={idx}
                                    variants={fadeInUp}
                                    className="flex gap-4 p-4 rounded-lg bg-white/5 backdrop-blur-sm border border-white/10"
                                >
                                    <CheckCircle2 className="w-6 h-6 text-orange-500 flex-shrink-0 mt-1" />
                                    <p className="text-gray-300">{item}</p>
                                </motion.div>
                            ))}
                        </motion.div>
                    </motion.div>
                </div>
            </section>

            {/* Execution */}
            <section className="relative py-12 px-4 sm:px-6 lg:px-8">
                <div className="max-w-4xl mx-auto">
                    <motion.div
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        variants={fadeInUp}
                    >
                        <h2 className="text-3xl font-bold text-white mb-8">Execution</h2>
                        <motion.div
                            variants={staggerContainer}
                            className="space-y-4"
                        >
                            {caseStudy.execution.map((item, idx) => (
                                <motion.div
                                    key={idx}
                                    variants={fadeInUp}
                                    className="flex gap-4 p-4 rounded-lg bg-white/5 backdrop-blur-sm border border-white/10"
                                >
                                    <div className="w-8 h-8 rounded-full bg-orange-600/20 flex items-center justify-center flex-shrink-0">
                                        <span className="text-orange-500 font-bold text-sm">{idx + 1}</span>
                                    </div>
                                    <p className="text-gray-300">{item}</p>
                                </motion.div>
                            ))}
                        </motion.div>
                    </motion.div>
                </div>
            </section>

            {/* Visual Proof */}
            {caseStudy.visuals.length > 0 && (
                <section className="relative py-12 px-4 sm:px-6 lg:px-8 bg-white/[0.02]">
                    <div className="max-w-6xl mx-auto">
                        <motion.div
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true }}
                            variants={fadeInUp}
                        >
                            <h2 className="text-3xl font-bold text-white mb-8">Visual Proof</h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                {caseStudy.visuals.map((visual, idx) => (
                                    <motion.div
                                        key={idx}
                                        variants={fadeInUp}
                                        className="relative aspect-video rounded-xl overflow-hidden bg-gray-900/40 border border-white/10"
                                    >
                                        <img
                                            src={visual}
                                            alt={`${caseStudy.client} visual ${idx + 1}`}
                                            className="w-full h-full object-cover"
                                            loading="lazy"
                                            onError={(e) => {
                                                e.currentTarget.style.display = 'none';
                                                e.currentTarget.parentElement!.innerHTML = `
                          <div class="w-full h-full flex items-center justify-center text-gray-500">
                            <div class="text-center">
                              <svg class="w-16 h-16 mx-auto mb-4 opacity-50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                              </svg>
                              <p class="text-sm">Visual ${idx + 1}</p>
                            </div>
                          </div>
                        `;
                                            }}
                                        />
                                    </motion.div>
                                ))}
                            </div>
                        </motion.div>
                    </div>
                </section>
            )}

            {/* Results */}
            <section className="relative py-12 px-4 sm:px-6 lg:px-8">
                <div className="max-w-4xl mx-auto">
                    <motion.div
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        variants={fadeInUp}
                    >
                        <h2 className="text-3xl font-bold text-white mb-6">Results</h2>
                        <div className="p-8 rounded-2xl bg-gradient-to-br from-orange-600/20 to-orange-500/10 border border-orange-500/30">
                            <p className="text-lg text-gray-200 leading-relaxed">
                                {caseStudy.results}
                            </p>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* Learnings */}
            <section className="relative py-12 px-4 sm:px-6 lg:px-8 bg-white/[0.02]">
                <div className="max-w-4xl mx-auto">
                    <motion.div
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        variants={fadeInUp}
                    >
                        <div className="flex items-center gap-3 mb-8">
                            <Lightbulb className="w-6 h-6 text-orange-500" />
                            <h2 className="text-3xl font-bold text-white">Key Learnings</h2>
                        </div>
                        <motion.div
                            variants={staggerContainer}
                            className="space-y-4"
                        >
                            {caseStudy.learnings.map((learning, idx) => (
                                <motion.div
                                    key={idx}
                                    variants={fadeInUp}
                                    className="p-6 rounded-xl bg-white/5 backdrop-blur-sm border border-white/10"
                                >
                                    <p className="text-gray-300">{learning}</p>
                                </motion.div>
                            ))}
                        </motion.div>
                    </motion.div>
                </div>
            </section>

            {/* CTA */}
            <section className="relative py-20 px-4 sm:px-6 lg:px-8 border-t border-gray-800">
                <motion.div
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    variants={fadeInUp}
                    className="max-w-4xl mx-auto text-center"
                >
                    <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
                        Want similar results?
                    </h2>
                    <p className="text-xl text-gray-400 mb-8">
                        Let's discuss how we can grow your brand
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
