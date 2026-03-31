import { describe, it, expect } from "vitest";
import { portfolioData, getServiceById, getCategoryByServiceAndCategory } from "../client/src/lib/portfolioData";

// Test portfolio data structure and filtering logic
describe("Portfolio Filtering", () => {
  // Sample portfolio data
  const VIDEO_PORTFOLIO = [
    { id: "v1", category: "ads", image: "/portfolio-video-1.jpg", title: "Commercial Ad" },
    { id: "v2", category: "motion", image: "/portfolio-video-2.jpg", title: "Motion Graphics" },
    { id: "v3", category: "inauguration", image: "/portfolio-video-3.jpg", title: "Event Coverage" },
    { id: "v4", category: "reels", image: "/portfolio-video-4.jpg", title: "Instagram Reel" },
    { id: "v5", category: "branding", image: "/portfolio-video-5.jpg", title: "Brand Video" },
    { id: "v6", category: "ads", image: "/portfolio-video-1.jpg", title: "Product Ad" },
  ];

  const GRAPHIC_PORTFOLIO = [
    { id: "g1", category: "social", image: "/portfolio-design-1.jpg", title: "Social Post" },
    { id: "g2", category: "branding", image: "/portfolio-design-2.jpg", title: "Logo Design" },
    { id: "g3", category: "photoshoot", image: "/portfolio-design-3.jpg", title: "Photography" },
    { id: "g4", category: "product", image: "/portfolio-design-4.jpg", title: "Poster Design" },
    { id: "g5", category: "social", image: "/portfolio-design-5.jpg", title: "Brand Guidelines" },
    { id: "g6", category: "branding", image: "/portfolio-design-2.jpg", title: "Brand Identity" },
  ];

  it("should filter video portfolio by category", () => {
    const category = "ads";
    const filtered = VIDEO_PORTFOLIO.filter((item) => item.category === category);
    
    expect(filtered).toHaveLength(2);
    expect(filtered.every((item) => item.category === "ads")).toBe(true);
    expect(filtered[0]?.title).toBe("Commercial Ad");
  });

  it("should filter motion graphics videos", () => {
    const category = "motion";
    const filtered = VIDEO_PORTFOLIO.filter((item) => item.category === category);
    
    expect(filtered).toHaveLength(1);
    expect(filtered[0]?.title).toBe("Motion Graphics");
  });

  it("should filter reels videos", () => {
    const category = "reels";
    const filtered = VIDEO_PORTFOLIO.filter((item) => item.category === category);
    
    expect(filtered).toHaveLength(1);
    expect(filtered[0]?.title).toBe("Instagram Reel");
  });

  it("should filter inauguration videos", () => {
    const category = "inauguration";
    const filtered = VIDEO_PORTFOLIO.filter((item) => item.category === category);
    
    expect(filtered).toHaveLength(1);
    expect(filtered[0]?.title).toBe("Event Coverage");
  });

  it("should filter personal branding videos", () => {
    const category = "branding";
    const filtered = VIDEO_PORTFOLIO.filter((item) => item.category === category);
    
    expect(filtered).toHaveLength(1);
    expect(filtered[0]?.title).toBe("Brand Video");
  });

  it("should return all videos when no category is selected", () => {
    const filtered = VIDEO_PORTFOLIO;
    expect(filtered).toHaveLength(6);
  });

  it("should filter graphic design by category", () => {
    const category = "social";
    const filtered = GRAPHIC_PORTFOLIO.filter((item) => item.category === category);
    
    expect(filtered).toHaveLength(2);
    expect(filtered.every((item) => item.category === "social")).toBe(true);
  });

  it("should filter branding graphics", () => {
    const category = "branding";
    const filtered = GRAPHIC_PORTFOLIO.filter((item) => item.category === category);
    
    expect(filtered).toHaveLength(2);
    expect(filtered[0]?.title).toBe("Logo Design");
  });

  it("should filter photography/photoshoot items", () => {
    const category = "photoshoot";
    const filtered = GRAPHIC_PORTFOLIO.filter((item) => item.category === category);
    
    expect(filtered).toHaveLength(1);
    expect(filtered[0]?.title).toBe("Photography");
  });

  it("should filter product photography", () => {
    const category = "product";
    const filtered = GRAPHIC_PORTFOLIO.filter((item) => item.category === category);
    
    expect(filtered).toHaveLength(1);
    expect(filtered[0]?.title).toBe("Poster Design");
  });

  it("should return all graphics when no category is selected", () => {
    const filtered = GRAPHIC_PORTFOLIO;
    expect(filtered).toHaveLength(6);
  });

  it("should handle empty filter results gracefully", () => {
    const category = "nonexistent";
    const filtered = VIDEO_PORTFOLIO.filter((item) => item.category === category);
    
    expect(filtered).toHaveLength(0);
    expect(Array.isArray(filtered)).toBe(true);
  });

  it("should maintain portfolio item structure", () => {
    const item = VIDEO_PORTFOLIO[0];
    
    expect(item).toHaveProperty("id");
    expect(item).toHaveProperty("category");
    expect(item).toHaveProperty("image");
    expect(item).toHaveProperty("title");
    expect(typeof item.id).toBe("string");
    expect(typeof item.category).toBe("string");
    expect(typeof item.image).toBe("string");
    expect(typeof item.title).toBe("string");
  });

  it("should support multiple categories in video portfolio", () => {
    const categories = new Set(VIDEO_PORTFOLIO.map((item) => item.category));
    
    expect(categories.has("ads")).toBe(true);
    expect(categories.has("motion")).toBe(true);
    expect(categories.has("inauguration")).toBe(true);
    expect(categories.has("reels")).toBe(true);
    expect(categories.has("branding")).toBe(true);
  });

  it("should support multiple categories in graphic portfolio", () => {
    const categories = new Set(GRAPHIC_PORTFOLIO.map((item) => item.category));
    
    expect(categories.has("social")).toBe(true);
    expect(categories.has("branding")).toBe(true);
    expect(categories.has("photoshoot")).toBe(true);
    expect(categories.has("product")).toBe(true);
  });
});


describe("Portfolio Data Structure", () => {
  it("should have all 6 services defined", () => {
    expect(portfolioData.services).toHaveLength(6);
  });

  it("should have correct service names", () => {
    const serviceNames = portfolioData.services.map((s) => s.name);
    expect(serviceNames).toEqual([
      "Videography",
      "Photography",
      "Video Editing",
      "Graphic Design",
      "Motion Graphics",
      "Creative Projects",
    ]);
  });

  it("should have correct service IDs", () => {
    const serviceIds = portfolioData.services.map((s) => s.id);
    expect(serviceIds).toEqual([
      "videography",
      "photography",
      "video-editing",
      "graphic-design",
      "motion-graphics",
      "creative-projects",
    ]);
  });

  it("should have correct number of categories per service", () => {
    const categoryCounts = portfolioData.services.map((s) => ({
      service: s.name,
      count: s.categories.length,
    }));

    expect(categoryCounts).toEqual([
      { service: "Videography", count: 9 },
      { service: "Photography", count: 10 },
      { service: "Video Editing", count: 6 },
      { service: "Graphic Design", count: 7 },
      { service: "Motion Graphics", count: 5 },
      { service: "Creative Projects", count: 4 },
    ]);
  });

  it("should have total of 41 categories across all services", () => {
    const totalCategories = portfolioData.services.reduce((sum, s) => sum + s.categories.length, 0);
    expect(totalCategories).toBe(41);
  });

  it("should have unique category IDs within each service", () => {
    portfolioData.services.forEach((service) => {
      const categoryIds = service.categories.map((c) => c.id);
      const uniqueIds = new Set(categoryIds);
      expect(uniqueIds.size).toBe(categoryIds.length);
    });
  });

  it("should have all categories with type property", () => {
    portfolioData.services.forEach((service) => {
      service.categories.forEach((category) => {
        expect(category.type).toMatch(/^(video|image)$/);
      });
    });
  });
});

describe("Portfolio Helper Functions", () => {
  it("getServiceById should return correct service", () => {
    const service = getServiceById("videography");
    expect(service).toBeDefined();
    expect(service?.name).toBe("Videography");
    expect(service?.id).toBe("videography");
  });

  it("getServiceById should return undefined for invalid service", () => {
    const service = getServiceById("invalid-service");
    expect(service).toBeUndefined();
  });

  it("getCategoryByServiceAndCategory should return correct category", () => {
    const category = getCategoryByServiceAndCategory("videography", "ads");
    expect(category).toBeDefined();
    expect(category?.name).toBe("Ads");
    expect(category?.id).toBe("ads");
    expect(category?.type).toBe("video");
  });

  it("getCategoryByServiceAndCategory should return undefined for invalid service", () => {
    const category = getCategoryByServiceAndCategory("invalid-service", "ads");
    expect(category).toBeUndefined();
  });

  it("getCategoryByServiceAndCategory should return undefined for invalid category", () => {
    const category = getCategoryByServiceAndCategory("videography", "invalid-category");
    expect(category).toBeUndefined();
  });

  it("should have all videography categories", () => {
    const videography = getServiceById("videography");
    const categoryNames = videography?.categories.map((c) => c.name);
    expect(categoryNames).toEqual([
      "Ads",
      "Reels",
      "Personal Branding",
      "F&B",
      "Event",
      "Inauguration",
      "Wedding",
      "Real Estate",
      "App Promo",
    ]);
  });

  it("should have all photography categories", () => {
    const photography = getServiceById("photography");
    const categoryNames = photography?.categories.map((c) => c.name);
    expect(categoryNames).toEqual([
      "Wedding",
      "Candid",
      "Product",
      "Automobile",
      "Corporate",
      "Event",
      "Lifestyle",
      "Food",
      "Portraits",
      "Architecture & Interiors",
    ]);
  });

  it("should have all video editing categories", () => {
    const editing = getServiceById("video-editing");
    const categoryNames = editing?.categories.map((c) => c.name);
    expect(categoryNames).toEqual([
      "Instagram Reels Editing",
      "YouTube Editing",
      "Short-form Ads",
      "Long-form Content",
      "Event Highlights",
      "Color Grading",
    ]);
  });

  it("should have all graphic design categories", () => {
    const design = getServiceById("graphic-design");
    const categoryNames = design?.categories.map((c) => c.name);
    expect(categoryNames).toEqual([
      "Social Media Graphics",
      "Brand Identity",
      "Posters & Flyers",
      "Menu Design",
      "Digital Ads",
      "Thumbnails",
      "Presentation Design",
    ]);
  });

  it("should have all motion graphics categories", () => {
    const motion = getServiceById("motion-graphics");
    const categoryNames = motion?.categories.map((c) => c.name);
    expect(categoryNames).toEqual([
      "Logo Animations",
      "Reels Motion Graphics",
      "Text Animations",
      "Explainer Videos",
      "Transitions & Overlays",
    ]);
  });

  it("should have all creative projects categories", () => {
    const creative = getServiceById("creative-projects");
    const categoryNames = creative?.categories.map((c) => c.name);
    expect(categoryNames).toEqual([
      "Short Films",
      "Visual Stories",
      "Concept Videos",
      "Experimental Projects",
    ]);
  });
});

describe("Portfolio Data Integrity", () => {
  it("should have descriptions for all services", () => {
    portfolioData.services.forEach((service) => {
      expect(service.description).toBeTruthy();
      expect(service.description.length).toBeGreaterThan(0);
    });
  });

  it("should have names for all categories", () => {
    portfolioData.services.forEach((service) => {
      service.categories.forEach((category) => {
        expect(category.name).toBeTruthy();
        expect(category.name.length).toBeGreaterThan(0);
      });
    });
  });

  it("should have icons for all services", () => {
    portfolioData.services.forEach((service) => {
      expect(service.icon).toBeDefined();
    });
  });

  it("video categories should have type 'video'", () => {
    const videoServices = ["videography", "video-editing", "motion-graphics", "creative-projects"];
    videoServices.forEach((serviceId) => {
      const service = getServiceById(serviceId);
      service?.categories.forEach((category) => {
        expect(category.type).toBe("video");
      });
    });
  });

  it("image categories should have type 'image'", () => {
    const imageServices = ["photography", "graphic-design"];
    imageServices.forEach((serviceId) => {
      const service = getServiceById(serviceId);
      service?.categories.forEach((category) => {
        expect(category.type).toBe("image");
      });
    });
  });
});
