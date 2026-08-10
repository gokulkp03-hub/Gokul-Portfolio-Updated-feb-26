import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUpRight, X, CheckCircle2 } from "lucide-react";

export interface ShootProject {
  id: string;
  number: string;
  client: string;
  category: string;
  year: string;
  title: string;
  previewImage: string;
  brief: string;
  approach: string;
  deliverables: string[];
  gallery: string[];
}

export const SHOOT_PROJECTS: ShootProject[] = [
  {
    id: "prepmeal-culinary",
    number: "01",
    client: "PrepMeal UAE",
    category: "Commercial Food & Culinary",
    year: "2025",
    title: "Artisanal Macro Culinary Shoot",
    previewImage: "/assets/images/portfolio-all/Sourdough_Avocado.jpg",
    brief: "Create appetite-inducing, high-resolution direct-response culinary assets for UAE subscription meal launch.",
    approach: "Utilized directional natural key lighting with dark slate surfaces to highlight rich textures, micro-greens, and vibrant organic ingredients.",
    deliverables: ["45 High-Res Food Stills", "Social Ad Creatives", "Menu Packaging Imagery"],
    gallery: [
      "/assets/images/portfolio-all/Sourdough_Avocado.jpg",
      "/assets/images/portfolio-all/Vegan_Buddha_Bowl.jpg",
      "/assets/images/portfolio-all/Chocolate_Milk_Cookies.jpg",
      "/assets/images/portfolio-all/Cheesecake.jpg"
    ]
  },
  {
    id: "aqua-care-product",
    number: "02",
    client: "Aqua Care UAE",
    category: "Industrial & Product Photography",
    year: "2025",
    title: "Commercial Water System Series",
    previewImage: "https://res.cloudinary.com/dgmieaf9g/image/upload/v1740523296/portfolio/aquacare_featured.jpg",
    brief: "Capture high-clarity product photography for commercial purification units installed across Dubai properties.",
    approach: "Precision rim-lighting and crisp neutral backgrounds to emphasize stainless steel build quality and water purity.",
    deliverables: ["Catalogue Product Stills", "E-Commerce Hero Visuals", "Technical Brochure Visuals"],
    gallery: [
      "https://res.cloudinary.com/dgmieaf9g/image/upload/v1740523296/portfolio/aquacare_featured.jpg",
      "/assets/images/portfolio-all/Ad.jpg",
      "/assets/images/portfolio-all/Ad_04.jpg"
    ]
  },
  {
    id: "galaxy-star-perfumes",
    number: "03",
    client: "Galaxy Star Perfumes",
    category: "Luxury Fragrance & Branding",
    year: "2025",
    title: "Oud & Amber Product Stills",
    previewImage: "/assets/images/brands/Galaxy-Star/galaxystar.webp",
    brief: "Produce rich, nocturnal bottle stills for luxury Middle Eastern fragrance line.",
    approach: "Controlled specular highlights with warm amber backlight to accentuate liquid clarity and gilded bottle contours.",
    deliverables: ["Billboard Print Visuals", "Instagram Story Assets", "Product Display Cards"],
    gallery: [
      "/assets/images/brands/Galaxy-Star/galaxystar.webp",
      "/assets/images/portfolio-all/Xmas_-_Galaxy.jpg",
      "/assets/images/portfolio-all/DSC08771.jpg"
    ]
  },
  {
    id: "beyond-cars-stills",
    number: "04",
    client: "Beyond Cars UAE",
    category: "Automotive & Luxury Stills",
    year: "2025",
    title: "High-Performance Vehicle Series",
    previewImage: "/assets/images/brands/Beyond-Cars/beyondcarsin.webp",
    brief: "Highlight sleek aerodynamic bodywork and interior craftsmanship for luxury rental fleet in Dubai.",
    approach: "Low-angle dynamic framing combined with golden-hour desert lighting to accentuate reflections and metallic paint depth.",
    deliverables: ["Editorial Campaign Stills", "Rental App Banners", "Social Media Stills"],
    gallery: [
      "/assets/images/brands/Beyond-Cars/beyondcarsin.webp",
      "/assets/images/portfolio-all/DSC09457.jpg",
      "/assets/images/portfolio-all/DSC09598.jpg"
    ]
  },
  {
    id: "steaburg-hospitality",
    number: "05",
    client: "Steaburg UAE",
    category: "Culinary & Hospitality",
    year: "2025",
    title: "Bespoke Hospitality & Beverage Visuals",
    previewImage: "/assets/images/portfolio-all/Iced_V60.jpg",
    brief: "Capture artisanal coffee brewing and cafe atmosphere for specialty hospitality brand.",
    approach: "Macro texture photography emphasizing steam, ice condensation, and rich espresso crema under soft directional diffuse light.",
    deliverables: ["Menu Photography", "Website Hero Banners", "Point-of-Sale Displays"],
    gallery: [
      "/assets/images/portfolio-all/Iced_V60.jpg",
      "/assets/images/portfolio-all/Sourdough_Labneh_Zaatar.jpg",
      "/assets/images/portfolio-all/ginger_shot.jpg"
    ]
  }
];

export const PhotoShootIndex: React.FC = () => {
  const [hoveredProject, setHoveredProject] = useState<ShootProject | null>(null);
  const [cursorPos, setCursorPos] = useState({ x: 0, y: 0 });
  const [activeCaseStudy, setActiveCaseStudy] = useState<ShootProject | null>(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setCursorPos({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <section className="py-28 bg-neutral-950 text-white relative">
      <div className="container max-w-[1400px] mx-auto px-6 md:px-12">
        
        {/* Section Title */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-neutral-800 pb-8 mb-16">
          <div>
            <span className="text-xs font-mono tracking-[0.4em] text-amber-400 uppercase block mb-3">
              Selected Works
            </span>
            <h2 className="text-4xl md:text-6xl font-serif text-white tracking-tight">
              Numbered <span className="italic text-neutral-400">Shoot Index</span>
            </h2>
          </div>
          <p className="text-neutral-400 text-sm font-light max-w-sm leading-relaxed">
            Hover to preview project visuals. Click any row to view full project specifications and gallery stills.
          </p>
        </div>

        {/* Floating Cursor Preview Image (Desktop Only) */}
        <AnimatePresence>
          {hoveredProject && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ type: "spring", stiffness: 250, damping: 25 }}
              style={{
                top: cursorPos.y - 140,
                left: cursorPos.x + 20,
              }}
              className="fixed z-50 pointer-events-none hidden md:block w-72 h-48 rounded-xl overflow-hidden shadow-2xl border border-white/20"
            >
              <img
                src={hoveredProject.previewImage}
                alt={hoveredProject.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex items-end p-3">
                <span className="text-[11px] font-mono text-white/90 uppercase tracking-wider">
                  {hoveredProject.title}
                </span>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Index Rows */}
        <div className="divide-y divide-neutral-800/80">
          {SHOOT_PROJECTS.map((project) => (
            <div
              key={project.id}
              onMouseEnter={() => setHoveredProject(project)}
              onMouseLeave={() => setHoveredProject(null)}
              onClick={() => setActiveCaseStudy(project)}
              className="group py-8 md:py-10 flex flex-col md:flex-row md:items-center justify-between gap-6 cursor-pointer transition-colors hover:bg-neutral-900/60 px-4 md:px-6 rounded-xl"
            >
              <div className="flex items-center gap-8">
                <span className="font-mono text-2xl md:text-3xl text-neutral-600 group-hover:text-amber-400 transition-colors">
                  {project.number}
                </span>
                <div>
                  <h3 className="text-2xl md:text-4xl font-serif text-white group-hover:text-amber-200 transition-colors">
                    {project.client}
                  </h3>
                  <span className="text-xs font-mono text-neutral-400 md:hidden mt-1 block">
                    {project.category}
                  </span>
                </div>
              </div>

              <div className="hidden md:block text-sm font-mono text-neutral-400 group-hover:text-white transition-colors">
                {project.category}
              </div>

              <div className="flex items-center justify-between md:justify-end gap-6">
                <span className="font-mono text-sm text-neutral-500">{project.year}</span>
                <div className="w-10 h-10 rounded-full border border-neutral-800 flex items-center justify-center group-hover:border-amber-400 group-hover:bg-amber-400 group-hover:text-black transition-all">
                  <ArrowUpRight className="w-5 h-5" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Full Case Study Block Modal */}
      <AnimatePresence>
        {activeCaseStudy && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/90 backdrop-blur-xl flex items-center justify-center p-4 md:p-10 overflow-y-auto"
          >
            <motion.div
              initial={{ scale: 0.95, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 20 }}
              className="bg-neutral-900 border border-neutral-800 rounded-3xl max-w-5xl w-full p-8 md:p-12 relative space-y-10 my-auto"
            >
              <button
                onClick={() => setActiveCaseStudy(null)}
                className="absolute top-6 right-6 p-3 rounded-full bg-neutral-800 text-neutral-300 hover:text-white hover:bg-neutral-700 transition-all"
              >
                <X className="w-6 h-6" />
              </button>

              <div className="space-y-4 border-b border-neutral-800 pb-8">
                <span className="text-xs font-mono text-amber-400 uppercase tracking-widest">
                  Case Study — {activeCaseStudy.number}
                </span>
                <h3 className="text-3xl md:text-5xl font-serif text-white">{activeCaseStudy.client}</h3>
                <p className="text-neutral-400 font-light">{activeCaseStudy.title}</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-sm">
                <div className="space-y-3 bg-neutral-950/60 p-6 rounded-2xl border border-neutral-800">
                  <h4 className="font-mono text-xs text-neutral-400 uppercase tracking-wider">The Creative Brief</h4>
                  <p className="text-neutral-300 leading-relaxed font-light">{activeCaseStudy.brief}</p>
                </div>

                <div className="space-y-3 bg-neutral-950/60 p-6 rounded-2xl border border-neutral-800">
                  <h4 className="font-mono text-xs text-neutral-400 uppercase tracking-wider">Lighting & Composition Approach</h4>
                  <p className="text-neutral-300 leading-relaxed font-light">{activeCaseStudy.approach}</p>
                </div>
              </div>

              <div className="space-y-4">
                <h4 className="font-mono text-xs text-neutral-400 uppercase tracking-wider">Key Deliverables</h4>
                <div className="flex flex-wrap gap-3">
                  {activeCaseStudy.deliverables.map((item, idx) => (
                    <span key={idx} className="px-4 py-2 bg-neutral-800 text-neutral-200 text-xs font-mono rounded-xl border border-neutral-700/60 flex items-center gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-amber-400" />
                      {item}
                    </span>
                  ))}
                </div>
              </div>

              <div className="space-y-6 pt-4">
                <h4 className="font-mono text-xs text-neutral-400 uppercase tracking-wider">Sequential Shoot Deliverables</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {activeCaseStudy.gallery.map((imgUrl, idx) => (
                    <div key={idx} className="rounded-2xl overflow-hidden border border-neutral-800 aspect-[4/3] bg-neutral-950">
                      <img src={imgUrl} alt={`Shoot frame ${idx + 1}`} className="w-full h-full object-cover" />
                    </div>
                  ))}
                </div>
              </div>

            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};
