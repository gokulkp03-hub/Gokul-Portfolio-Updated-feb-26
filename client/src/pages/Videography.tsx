import { useState } from "react";
import { ChevronRight, Play, Film, Users, Building2, ShoppingBag, Calendar, Smartphone, Lightbulb, Camera, Scissors, Send } from "lucide-react";
import { motion } from "framer-motion";

const VIDEOGRAPHY_CATEGORIES = [
  {
    id: "wedding",
    name: "Wedding Films",
    description: "Cinematic wedding films that capture love and celebration",
    count: 12,
  },
  {
    id: "promo",
    name: "Brand Promo Videos",
    description: "Compelling brand stories that drive engagement",
    count: 18,
  },
  {
    id: "corporate",
    name: "Corporate Videos",
    description: "Professional corporate and business videos",
    count: 15,
  },
  {
    id: "product",
    name: "Product Videos",
    description: "Product showcases that convert viewers to customers",
    count: 22,
  },
  {
    id: "event",
    name: "Event Coverage",
    description: "Dynamic event videography and highlights",
    count: 28,
  },
  {
    id: "social",
    name: "Social Media Videos",
    description: "Engaging short-form videos for social platforms",
    count: 45,
  },
];

const SERVICES = [
  {
    icon: Users,
    title: "Weddings",
    description: "Cinematic wedding films that tell your love story"
  },
  {
    icon: Building2,
    title: "Corporate",
    description: "Professional corporate videos and brand stories"
  },
  {
    icon: ShoppingBag,
    title: "Ads",
    description: "High-converting video ads for digital platforms"
  },
  {
    icon: Smartphone,
    title: "Social Reels",
    description: "Engaging short-form content for social media"
  }
];

const PROCESS_STEPS = [
  {
    icon: Lightbulb,
    title: "Concept",
    description: "We collaborate to define your vision and creative direction"
  },
  {
    icon: Camera,
    title: "Shoot",
    description: "Professional filming with cinema-grade equipment"
  },
  {
    icon: Scissors,
    title: "Edit",
    description: "Meticulous editing, color grading, and sound design"
  },
  {
    icon: Send,
    title: "Delivery",
    description: "Final delivery optimized for your platform"
  }
];

const EQUIPMENT = [
  "Sony A7III",
  "DJI Ronin Gimbal",
  "Aputure Lighting",
  "DaVinci Resolve",
  "Final Cut Pro",
  "After Effects"
];

export default function Videography() {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Navigation */}
      <nav className="sticky top-0 z-50 bg-black/95 backdrop-blur border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          <a href="/" className="text-2xl font-bold">
            <span className="text-orange-500">Gokul</span> KP
          </a>
          <a href="/portfolio" className="text-gray-400 hover:text-white transition flex items-center gap-2">
            <ChevronRight className="w-4 h-4" />
            Back to Portfolio
          </a>
        </div>
      </nav>

      {/* Showreel Hero */}
      <section className="relative py-32 px-4 sm:px-6 lg:px-8 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-orange-600/10 to-transparent" />
        <div className="max-w-7xl mx-auto relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-12"
          >
            <h1 className="text-6xl sm:text-8xl font-bold mb-6">
              <span className="text-orange-500">Videography</span> Portfolio
            </h1>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto mb-12">
              Cinematic storytelling that captivates and converts. From weddings to brand films.
            </p>
            <div className="inline-flex items-center gap-3 px-6 py-3 bg-white/5 border border-white/10 rounded-full hover:border-orange-500/50 transition cursor-pointer group">
              <Play className="w-5 h-5 text-orange-500 fill-current" />
              <span className="text-sm font-medium group-hover:text-orange-500 transition">Watch Showreel</span>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Services Block */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white/[0.02]">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-bold mb-12 text-center">Video Services</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {SERVICES.map((service, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="p-8 rounded-2xl bg-white/5 border border-white/10 hover:border-orange-500/50 transition group"
              >
                <service.icon className="w-12 h-12 text-orange-500 mb-4 group-hover:scale-110 transition-transform" />
                <h3 className="text-xl font-bold mb-2">{service.title}</h3>
                <p className="text-gray-400 text-sm">{service.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Categories Grid */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-bold mb-12">Featured Films</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {VIDEOGRAPHY_CATEGORIES.map((category) => (
              <div
                key={category.id}
                onClick={() => setSelectedCategory(selectedCategory === category.id ? null : category.id)}
                className="group cursor-pointer"
              >
                {/* Placeholder Video */}
                <div className="relative h-64 bg-gradient-to-br from-gray-800 to-gray-900 rounded-lg overflow-hidden mb-4 border border-white/10 hover:border-orange-500/50 transition">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <Play className="w-16 h-16 text-gray-600 group-hover:text-orange-500 transition fill-current" />
                  </div>
                  <div className="absolute inset-0 bg-black/50 group-hover:bg-black/30 transition" />
                </div>

                {/* Category Info */}
                <h3 className="text-xl font-bold mb-2 group-hover:text-orange-500 transition">{category.name}</h3>
                <p className="text-gray-400 text-sm mb-3">{category.description}</p>
                <div className="flex items-center justify-between">
                  <span className="text-orange-500 font-semibold">{category.count} videos</span>
                  <ChevronRight className="w-5 h-5 text-gray-600 group-hover:text-orange-500 transition" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white/[0.02]">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-bold mb-12 text-center">Our Process</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {PROCESS_STEPS.map((step, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="text-center"
              >
                <div className="w-16 h-16 rounded-full bg-orange-600/20 border border-orange-500/30 flex items-center justify-center mx-auto mb-4">
                  <step.icon className="w-8 h-8 text-orange-500" />
                </div>
                <h3 className="text-xl font-bold mb-2">{step.title}</h3>
                <p className="text-gray-400 text-sm">{step.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Equipment Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-bold mb-12 text-center">Equipment & Tools</h2>
          <div className="flex flex-wrap justify-center gap-4">
            {EQUIPMENT.map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
                className="px-6 py-3 bg-white/5 border border-white/10 rounded-full text-sm font-medium hover:border-orange-500/50 transition"
              >
                {item}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Selected Category Gallery */}
      {selectedCategory && (
        <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gray-900/50">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-3xl font-bold mb-12">
              {VIDEOGRAPHY_CATEGORIES.find((c) => c.id === selectedCategory)?.name}
            </h2>

            {/* Video Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {Array.from({ length: 6 }).map((_, i) => (
                <div key={i} className="group cursor-pointer">
                  <div className="relative aspect-video bg-gradient-to-br from-gray-800 to-gray-900 rounded-lg overflow-hidden border border-white/10 hover:border-orange-500/50 transition">
                    <div className="absolute inset-0 flex items-center justify-center">
                      <Play className="w-12 h-12 text-gray-600 group-hover:text-orange-500 transition fill-current" />
                    </div>
                    <div className="absolute inset-0 bg-black/50 group-hover:bg-black/30 transition" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* CTA Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 border-t border-white/10">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-6">Need a Professional Video?</h2>
          <a
            href="/contact"
            className="inline-block px-8 py-3 bg-orange-500 hover:bg-orange-600 text-white font-semibold rounded-lg transition"
          >
            Let's Create Together
          </a>
        </div>
      </section>
    </div>
  );
}
