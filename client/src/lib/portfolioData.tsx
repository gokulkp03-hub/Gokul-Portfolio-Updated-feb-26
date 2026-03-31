import React from "react";
import { Video, Camera, Scissors, Palette, Sparkles, Layers } from "lucide-react";

export const portfolioData = {
  services: [
    {
      id: "videography",
      name: "Videography",
      description: "Professional video captures including weddings, events, and brand films",
      icon: <Video className="w-8 h-8 text-orange-500" />,
      categories: [
        { id: "ads", name: "Ads", type: "video" },
        { id: "reels", name: "Reels", type: "video" },
        { id: "personal-branding", name: "Personal Branding", type: "video" },
        { id: "fb", name: "F&B", type: "video" },
        { id: "event", name: "Event", type: "video" },
        { id: "inauguration", name: "Inauguration", type: "video" },
        { id: "wedding", name: "Wedding", type: "video" },
        { id: "real-estate", name: "Real Estate", type: "video" },
        { id: "app-promo", name: "App Promo", type: "video" },
      ],
    },
    {
      id: "photography",
      name: "Photography",
      description: "Still visuals capturing emotion, detail, and brand identity",
      icon: <Camera className="w-8 h-8 text-orange-500" />,
      categories: [
        { id: "wedding", name: "Wedding", type: "image" },
        { id: "candid", name: "Candid", type: "image" },
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
      id: "video-editing",
      name: "Video Editing",
      description: "High-end post-production, storytelling, and color grading",
      icon: <Scissors className="w-8 h-8 text-orange-500" />,
      categories: [
        { id: "instagram-reels", name: "Instagram Reels Editing", type: "video" },
        { id: "youtube", name: "YouTube Editing", type: "video" },
        { id: "short-form-ads", name: "Short-form Ads", type: "video" },
        { id: "long-form", name: "Long-form Content", type: "video" },
        { id: "event-highlights", name: "Event Highlights", type: "video" },
        { id: "color-grading", name: "Color Grading", type: "video" },
      ],
    },
    {
      id: "graphic-design",
      name: "Graphic Design",
      description: "Visual communication, brand identity, and marketing materials",
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
      description: "Animated visuals, logo animations, and dynamic storytelling",
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
      description: "Personal and experimental visual stories and concept work",
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
