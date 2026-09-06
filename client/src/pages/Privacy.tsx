import { SEO } from "@/components/SEO";
import { motion } from "framer-motion";
import { Shield, Lock, Eye, Server, Cookie, HelpCircle, Mail, MessageSquare } from "lucide-react";
import { Link } from "wouter";

export default function Privacy() {
  return (
    <div className="min-h-screen bg-background pt-32 pb-24 text-foreground selection:bg-orange-500 selection:text-white">
      <SEO
        title="Privacy Policy & Technical Disclosures | Gokul KP"
        description="Technical privacy disclosures, data collection practices, Google Consent Mode architecture, and cookie management for gokulkp.com."
      />

      <div className="container px-4 md:px-8 max-w-4xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-16 border-b border-border/40 pb-10"
        >
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-orange-500/10 border border-orange-500/20 text-orange-500 text-xs font-bold uppercase tracking-widest mb-6">
            <Shield className="w-3.5 h-3.5" />
            <span>Technical Disclosure</span>
          </div>
          <h1 className="text-4xl md:text-6xl font-display font-black tracking-tight mb-6 uppercase">
            Privacy <span className="text-orange-500 italic">Policy</span>
          </h1>
          <p className="text-muted-foreground text-base md:text-lg font-light leading-relaxed">
            This document explains how <strong className="text-foreground font-semibold">gokulkp.com</strong> collects, processes, and protects technical and personal information when you interact with this portfolio website, contact forms, and digital experiences.
          </p>
          <div className="mt-4 text-xs text-muted-foreground/70">
            Last Updated: March 2026 • Effective Date: March 2026
          </div>
        </motion.div>

        {/* Content Sections */}
        <div className="space-y-12 text-sm leading-relaxed text-muted-foreground">
          
          {/* Section 1: Contact Form & Inquiry Data */}
          <section className="bg-card p-6 md:p-8 rounded-2xl border border-border/50">
            <div className="flex items-center gap-3 mb-4 text-foreground font-display font-bold text-xl uppercase tracking-tight">
              <Lock className="w-5 h-5 text-orange-500" />
              <h2>1. Contact Form &amp; Direct Inquiries</h2>
            </div>
            <p className="mb-4">
              When you submit an inquiry through our contact form, we collect the following information:
            </p>
            <ul className="list-disc list-inside space-y-2 pl-2 mb-4 text-foreground/90">
              <li><strong className="text-foreground">Full Name:</strong> To identify and address you in correspondence.</li>
              <li><strong className="text-foreground">Email Address:</strong> To reply to your inquiry, send proposals, or schedule consultations.</li>
              <li><strong className="text-foreground">Service Interest:</strong> (e.g., Performance Marketing, Video Production, Brand Photography, Full Retainer) to assess project alignment.</li>
              <li><strong className="text-foreground">Project Details:</strong> Brief description of your brand, timeline, and growth goals.</li>
            </ul>
            <p>
              <strong className="text-foreground">How data is stored:</strong> Submissions are processed through authenticated serverless APIs, securely stored in a protected database instance, and sent to the site owner for direct review. We do not sell, rent, or trade your inquiry information with third-party data brokers.
            </p>
          </section>

          {/* Section 2: Analytics, GTM, and Google Consent Mode */}
          <section className="bg-card p-6 md:p-8 rounded-2xl border border-border/50">
            <div className="flex items-center gap-3 mb-4 text-foreground font-display font-bold text-xl uppercase tracking-tight">
              <Cookie className="w-5 h-5 text-orange-500" />
              <h2>2. Analytics, Cookies &amp; Tracking Technologies</h2>
            </div>
            <p className="mb-4">
              This website employs modern web analytics to understand traffic sources and optimize user experience:
            </p>
            <ul className="list-disc list-inside space-y-2 pl-2 mb-4 text-foreground/90">
              <li>
                <strong className="text-foreground">Google Analytics 4 (GA4) &amp; Google Tag Manager (GTM):</strong> Used to measure aggregated visitor engagement (page views, session duration, device categories).
              </li>
              <li>
                <strong className="text-foreground">Google Consent Mode v2:</strong> By default, analytics and ad tracking storage tags are set to <code className="px-1.5 py-0.5 rounded bg-muted text-orange-400 font-mono text-xs">denied</code> until you provide consent via our on-site banner. You may accept or decline non-essential cookies at any time.
              </li>
              <li>
                <strong className="text-foreground">Essential Storage:</strong> Local storage is used exclusively to remember your theme preference (Dark/Light mode) and your cookie consent selection.
              </li>
            </ul>
            <p className="text-xs text-muted-foreground/80 italic border-l-2 border-orange-500/40 pl-3 py-1">
              Note: Full tag configuration within the Google Tag Manager container requires direct management in the Google Tag Manager workspace.
            </p>
          </section>

          {/* Section 3: Third-Party Services & Integrations */}
          <section className="bg-card p-6 md:p-8 rounded-2xl border border-border/50">
            <div className="flex items-center gap-3 mb-4 text-foreground font-display font-bold text-xl uppercase tracking-tight">
              <Server className="w-5 h-5 text-orange-500" />
              <h2>3. Third-Party Infrastructure &amp; External Links</h2>
            </div>
            <p className="mb-4">
              To deliver high-performance video, responsive media, and secure global hosting, we utilize third-party infrastructure providers:
            </p>
            <ul className="list-disc list-inside space-y-2 pl-2 mb-4 text-foreground/90">
              <li><strong className="text-foreground">Vercel:</strong> Global edge hosting and serverless execution. IP addresses and HTTP request logs are processed in accordance with Vercel’s global security standards.</li>
              <li><strong className="text-foreground">Cloudinary:</strong> Content delivery network (CDN) for optimized video streaming and image compression.</li>
              <li><strong className="text-foreground">WhatsApp Business Direct Handoff:</strong> When clicking WhatsApp buttons on this site, you are redirected to WhatsApp (Meta Platforms). Any conversation is governed by WhatsApp's privacy policy.</li>
              <li><strong className="text-foreground">Google Fonts &amp; Fontshare:</strong> Typography stylesheets loaded securely to render brand typography.</li>
            </ul>
          </section>

          {/* Section 4: Data Retention & Security */}
          <section className="bg-card p-6 md:p-8 rounded-2xl border border-border/50">
            <div className="flex items-center gap-3 mb-4 text-foreground font-display font-bold text-xl uppercase tracking-tight">
              <Eye className="w-5 h-5 text-orange-500" />
              <h2>4. Data Retention &amp; Security Safeguards</h2>
            </div>
            <p className="mb-4">
              We implement industry-standard technical measures, including HTTPS encryption in transit (TLS/SSL), strict HTTP headers, rate limiting, and restricted database access credentials.
            </p>
            <p className="mb-2">
              <strong className="text-foreground">Retention Period:</strong> Inquiries are retained for the duration of the commercial relationship or active project discovery phase [subject to formal business records retention policies]. Visitors may request deletion of their contact submission at any time.
            </p>
          </section>

          {/* Section 5: User Rights & Privacy Inquiries */}
          <section className="bg-card p-6 md:p-8 rounded-2xl border border-border/50">
            <div className="flex items-center gap-3 mb-4 text-foreground font-display font-bold text-xl uppercase tracking-tight">
              <HelpCircle className="w-5 h-5 text-orange-500" />
              <h2>5. Your Rights &amp; How to Contact Us</h2>
            </div>
            <p className="mb-4">
              You have the right to request access to, correction of, or deletion of personal information provided via this website. For any privacy-related questions or data inquiries, please contact:
            </p>
            <div className="p-4 rounded-xl bg-muted/30 border border-border/40 flex flex-col sm:flex-row gap-4 justify-between items-start sm:items-center">
              <div>
                <div className="font-semibold text-foreground">Gokul KP — Performance Marketer &amp; Video Producer</div>
                <div className="text-xs text-muted-foreground">Dubai, United Arab Emirates</div>
                <div className="text-xs text-orange-400 mt-1">Direct: gokulkp03@gmail.com</div>
              </div>
              <div className="flex gap-2">
                <a
                  href="mailto:gokulkp03@gmail.com?subject=Privacy%20Inquiry"
                  className="px-4 py-2 rounded-lg bg-orange-500 hover:bg-orange-600 text-white font-semibold text-xs transition-colors flex items-center gap-1.5"
                >
                  <Mail className="w-3.5 h-3.5" /> Email Privacy Request
                </a>
              </div>
            </div>
          </section>

          {/* Section 6: Legal Review Notice */}
          <section className="p-6 rounded-2xl bg-muted/10 border border-dashed border-border/50 text-xs text-muted-foreground/80">
            <p>
              <strong className="text-foreground">Notice of Professional Review:</strong> This privacy policy summarizes the technical data architecture and third-party integrations currently deployed on gokulkp.com. It is provided for informational and transparency purposes and should be reviewed periodically by qualified legal counsel to ensure compliance with specific statutory jurisdictions (such as UAE Federal Decree-Law No. 45/2021 regarding Personal Data Protection).
            </p>
          </section>

        </div>

        {/* Back navigation */}
        <div className="mt-16 pt-8 border-t border-border/40 flex justify-between items-center">
          <Link href="/" className="text-sm text-orange-500 hover:underline font-semibold">
            ← Back to Home
          </Link>
          <Link href="/contact" className="text-sm text-muted-foreground hover:text-foreground">
            Contact Gokul →
          </Link>
        </div>
      </div>
    </div>
  );
}
