import { Video, Camera, Scissors, Palette, Sparkles, Layers } from "lucide-react";

export const portfolioData = {
  services: [
    {
      id: "video-production",
      name: "Video Production (Shoot + Edit)",
      description: "Complete video solutions from filming to high-end post-production",
      icon: <Video className="w-8 h-8 text-orange-500" />,
      categories: [
        { id: "weddings", name: "Weddings", type: "video" },
        { id: "events", name: "Events", type: "video" },
        { id: "product", name: "Product", type: "video" },
        { id: "personal-branding", name: "Personal Branding", type: "video" },
        { id: "reels", name: "Reels", type: "video" },
      ],
    },
    {
      id: "photography",
      name: "Photography",
      description: "Still visuals capturing emotion, detail, and brand identity",
      icon: <Camera className="w-8 h-8 text-orange-500" />,
      categories: [
        { id: "wedding", name: "Wedding", type: "image" },
        { id: "product", name: "Product", type: "image" },
        { id: "automobile", name: "Automobile", type: "image" },
        { id: "corporate", name: "Corporate", type: "image" },
        { id: "event", name: "Event", type: "image" },
        { id: "lifestyle", name: "Lifestyle", type: "image" },
        { id: "food", name: "Food", type: "image" },
        { id: "portraits", name: "Portraits", type: "image" },
        { id: "architecture", name: "Architecture & Interiors", type: "image" },
      ],
    },
    {
      id: "graphic-design",
      name: "Graphic Design",
      description: "Visual communication and brand design",
      icon: <Palette className="w-8 h-8 text-orange-500" />,
      categories: [
        { id: "social-media", name: "Social Media Graphics", type: "image" },
        { id: "brand-identity", name: "Brand Identity", type: "image" },
        { id: "posters", name: "Posters & Flyers", type: "image" },
        { id: "menu-design", name: "Menu Design", type: "image" },
        { id: "digital-ads", name: "Digital Ads", type: "image" },
        { id: "thumbnails", name: "Thumbnails", type: "image" },
        { id: "presentation", name: "Presentation Design", type: "image" },
      ],
    },
    {
      id: "motion-graphics",
      name: "Motion Graphics",
      description: "Animated visuals and dynamic storytelling",
      icon: <Sparkles className="w-8 h-8 text-orange-500" />,
      categories: [
        { id: "logo-animations", name: "Logo Animations", type: "video" },
        { id: "reels-motion", name: "Reels Motion Graphics", type: "video" },
        { id: "text-animations", name: "Text Animations", type: "video" },
        { id: "explainer", name: "Explainer Videos", type: "video" },
        { id: "transitions", name: "Transitions & Overlays", type: "video" },
      ],
    },
    {
      id: "creative-projects",
      name: "Creative Projects",
      description: "Personal and experimental visual work",
      icon: <Layers className="w-8 h-8 text-orange-500" />,
      categories: [
        { id: "short-films", name: "Short Films", type: "video" },
        { id: "visual-stories", name: "Visual Stories", type: "video" },
        { id: "concept-videos", name: "Concept Videos", type: "video" },
        { id: "experimental", name: "Experimental Projects", type: "video" },
      ],
    },
  ],
};

export const getServiceById = (serviceId: string) => {
  return portfolioData.services.find((s) => s.id === serviceId);
};

export const getCategoryByServiceAndCategory = (serviceId: string, categoryId: string) => {
  const service = getServiceById(serviceId);
  return service?.categories.find((c) => c.id === categoryId);
};
