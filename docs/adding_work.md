# How to Add New Portfolio Items

This guide explains how to add new work to the portfolio, ensuring it follows the premium story format and displays correctly across the site.

## 1. Adding a Premium Case Study (Ads / Marketing / Strategy)

Comprehensive case studies with Challenge/Strategy/Execution/Results should be added to `client/src/data/caseStudies.ts`.

### Step-by-Step:
1.  **Prepare Assets**: Place images/videos in `/public/assets/images/brands/[YourBrandName]/`.
2.  **Edit `caseStudies.ts`**: Add a new object to the `caseStudies` array:

```typescript
{
    id: "unique-id",
    slug: "clean-URL-slug",
    client: "Client Name",
    industry: "Industry Category",
    headline: "The Big Win Headline",
    description: "Short summary for cards.",
    challenge: "What problem were we solving?",
    strategy: [
        "Strategic step 1",
        "Strategic step 2"
    ],
    execution: [
        "How we built it 1",
        "How we built it 2"
    ],
    results: "Comprehensive summary of the outcome.",
    metrics: [
        { label: "Revenue Growh", value: "3x", trend: "up" },
        { label: "CPA", value: "AED 45", trend: "down" }
    ],
    image: "/assets/images/brands/path/to/main.jpg",
    visuals: [
        "/assets/images/brands/path/to/extra1.jpg",
        "/assets/images/brands/path/to/extra2.jpg"
    ],
    tags: ["Tech", "Ads", "Growth"],
    featured: true // Set to true to show on Homepage
}
```

## 2. Adding a Production Project (Video / Photo)

Regular visual projects should be added to `client/src/data/video.ts` or `client/src/data/photo.ts`.

### For Video:
Add to `videoProjects` in `video.ts`:
```typescript
{
    id: "video-id",
    title: "Project Title",
    category: "Product" | "Personal Branding" | "Reels" | "Motion Graphics",
    thumbnail: "link-to-cover-image",
    videoUrl: "link-to-mp4",
    description: "Brief project description",
    featured: true
}
```

### For Photo:
Add to `photoProjects` in `photo.ts`:
```typescript
{
    id: "photo-id",
    title: "Project Title",
    category: "Product" | "Hospitality" | "Real Estate" | "Portrait",
    image: "link-to-main-image",
    description: "Brief project description",
    featured: true
}
```

## 3. Best Practices
- **Currency**: Always use `AED` (e.g., `AED 5,000`).
- **Assets**: Use the `/assets/` prefix for all paths.
- **Home Page**: The `FeaturedWork` component on the Home page automatically prioritizes Non-Wedding projects to maintain a corporate/premium feel. If adding a wedding, it will only appear in the full Portfolio view unless explicitly curated.
- **Storytelling**: For marketing items, the `ProjectDetail.tsx` page will automatically render the Challenge -> Strategy -> Execution -> Results layout.
