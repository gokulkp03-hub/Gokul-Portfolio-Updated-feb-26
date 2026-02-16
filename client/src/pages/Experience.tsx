import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ArrowRight, Calendar, TrendingUp, Camera } from "lucide-react";
import { useLocation } from "wouter";
import { experiences, bio, skills } from "@/data/about";

export default function Experience() {
  const [, navigate] = useLocation();

  const scrollToSection = (sectionId: string) => {
    if (sectionId === "contact") navigate("/#contact");
  };

  return (
    <div className="min-h-screen bg-background text-foreground">

      {/* Hero Section */}
      <section className="relative min-h-[60vh] pt-20 flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-orange-500/10 via-transparent to-transparent pointer-events-none" />
        <div className="container relative z-10 text-center py-20">
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-5xl md:text-7xl font-bold leading-tight mb-6"
          >
            <span className="text-orange-500">Experience</span>
          </motion.h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            {bio.description}
          </p>
        </div>
      </section>

      {/* Work Experience */}
      <section className="section-padding">
        <div className="container max-w-3xl">
          <h2 className="text-4xl font-bold mb-12 text-orange-500">Professional Journey</h2>
          <div className="space-y-8">
            {experiences.map((exp, idx) => (
              <Card key={idx} className="glass p-8 hover:border-orange-500/50 transition-all duration-300 bg-card/50 backdrop-blur-md border border-border/40">
                <div className="flex items-start justify-between mb-4 gap-4">
                  <div>
                    <h3 className="text-2xl font-bold text-orange-500 mb-2">
                      {exp.company}
                    </h3>
                    <p className="text-lg font-semibold mb-2">{exp.position}</p>
                    <div className="flex items-center gap-2 text-muted-foreground text-sm">
                      <Calendar className="w-4 h-4" />
                      <span>{exp.duration}</span>
                    </div>
                  </div>
                </div>
                <p className="text-muted-foreground mb-6 leading-relaxed">{exp.description}</p>

                <div className="mb-6">
                  <h4 className="font-semibold mb-3 text-orange-500">Key Responsibilities</h4>
                  <ul className="space-y-2">
                    {exp.responsibilities.map((resp, ridx) => (
                      <li key={ridx} className="flex items-start gap-3 text-sm">
                        <span className="text-orange-500 mt-1">•</span>
                        <span>{resp}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="border-t border-border pt-6">
                  <h4 className="font-semibold mb-3 text-orange-500">Achievements</h4>
                  <ul className="space-y-2">
                    {exp.achievements.map((ach, aidx) => (
                      <li key={aidx} className="flex items-start gap-3 text-sm">
                        <span className="text-orange-500 mt-1">✓</span>
                        <span>{ach}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Core Competencies */}
      <section className="section-padding border-t border-border bg-muted/30">
        <div className="container max-w-3xl">
          <h2 className="text-4xl font-bold mb-12 text-orange-500">Core Competencies</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div>
              <h3 className="font-bold text-xl text-foreground mb-6 flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-orange-500" />
                Performance Marketing
              </h3>
              <ul className="space-y-3 text-muted-foreground">
                {skills.marketing.map((s, i) => (
                  <li key={i} className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-orange-500/50" />
                    {s}
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="font-bold text-xl text-foreground mb-6 flex items-center gap-2">
                <Camera className="w-5 h-5 text-orange-500" />
                Creative Production
              </h3>
              <ul className="space-y-3 text-muted-foreground">
                {skills.creative.map((s, i) => (
                  <li key={i} className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-orange-500/50" />
                    {s}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-card border-t border-border">
        <div className="container text-center space-y-6">
          <h2 className="text-4xl md:text-5xl font-bold">Ready to scale?</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto font-light">
            Let's discuss how we can build your brand's growth arc together.
          </p>
          <Button
            onClick={() => scrollToSection("contact")}
            className="px-10 py-6 rounded-full font-bold text-lg bg-orange-500 text-white hover:bg-orange-600 transition-all shadow-lg shadow-orange-500/20 hover:scale-105"
          >
            Get in Touch <ArrowRight className="w-5 h-5 ml-2" />
          </Button>
        </div>
      </section>

    </div>
  );
}
