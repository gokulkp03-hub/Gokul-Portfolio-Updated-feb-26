# Asset Manifest — gokulkp.com

This document tracks all external/owner-supplied image and proof assets for **gokulkp.com**, their specifications, current fallback states, feature gate flags, and acceptance criteria. No fabricated or stand-in images are published to live production.

---

## 1. Asset Registry Table

| Placement | Existing Source / Path | Proposed Output Spec | Fallback Until Supplied | Owner-Supplied Dependency | Live Status / Feature Gate | Acceptance Criteria |
|---|---|---|---|---|---|---|
| **Homepage hero portrait** | `/assets/images/profile/gokul-kp.webp` | 4:5 aspect ratio, min 1080x1350px (WebP + JPG fallback) | None (slot removed from hero banner per user request) | New personal shoot photo | Removed from hero banner per user request. Kept in Section 4 ("Behind the Work") and About profile card | Renders clean without banner portrait; typography & CTAs given full focus |
| **About "on set" row (2 slots)** | None | 16:10 aspect ratio, min 1600x1000px WebP | None — section hidden | 2x photos of Gokul directing/shooting on set | **Feature-gated off** (`SHOW_ON_SET_ROW = false` in `About.tsx`) | Authentic behind-the-scenes photos of Gokul; no unrelated food/car stills |
| **Contact page image** | None | 4:5 aspect ratio, min 1080x1350px WebP | Section hidden | New casual/friendly photo of Gokul | **Feature-gated off** (`SHOW_CONTACT_IMAGE = false` in `Contact.tsx`) | Clean, approachable portrait; no layout shift when enabled |
| **Showreel poster** | Looping background poster (`lamourmedia_..._zcwmht.jpg`) | 1920x1080px (16:9) WebP | Current video/poster behavior | Designed title card / poster | Active with current video poster | Clean frame with title text; does not replace ambient hero video |
| **Results client logos (3)** | `PrepMeal.png`, `Acero.png`, `Q4c.png` | 1080x1080px transparent PNG (monochrome/clean) | Stylized typographic fallback | Confirmation / high-res vector client logos | Active with clean card backdrop + text `onError` fallback | Legible on dark and light themes; zero 404s |
| **PrepMeal dashboard screenshots (2)** | None | 16:9 aspect ratio, min 1920x1080px WebP | Section not rendered | Meta Ads Manager dashboard captures | **Feature-gated off** (`SHOW_CAMPAIGN_PROOF = false` in `PrepmealCaseStudy.tsx`) | Legible metric text (spend, messaging conversations, CPL); opens in lightbox |
| **Steaburg GBP before/after (2)** | None | 4:3 aspect ratio, min 1200x900px WebP | Section not rendered | Google Business Profile search/maps captures | **Feature-gated off** (`SHOW_STEABURG_GBP_PROOF = false` in `ProjectDetail.tsx`) | Documented review count growth (26 to 100+) & local pack ranking |
| **OG share banner** | Generated via `sharp` composite | 1200x630px JPG (< 150KB) | Script-generated version from Task 9 (`/assets/images/og/gokul-kp-og.jpg`) | Final designer version (optional) | Live in `index.html` & metadata | Validates in LinkedIn Post Inspector & WhatsApp preview without cropping text |
| **About split banner** | None | 2400x1200px (2:1) WebP | Manifest entry only | Panoramic production or studio wide shot | Not wired into live site | High-impact wide visual |
| **WhatsApp QR card** | None | 600x600px PNG/SVG | Manifest entry only | Branded direct WhatsApp QR code asset | Not wired into live site | Scannable QR linking to wa.me link |
| **Blog cover template** | None | 1600x900px (16:9) WebP/PSD | Manifest entry only | Reusable editorial cover template | Not wired into live site | Brand-consistent typography & layout |

---

## 2. Feature Gates in Code

The following feature flags control whether pending proof/photo sections appear in the rendered UI:

1. **`client/src/pages/About.tsx`**:
   ```ts
   const SHOW_ON_SET_ROW = false; // Set to true when on-set photos are added
   ```
2. **`client/src/pages/Contact.tsx`**:
   ```ts
   const SHOW_CONTACT_IMAGE = false; // Set to true when casual photo is added
   ```
3. **`client/src/pages/portfolio/PrepmealCaseStudy.tsx`**:
   ```ts
   const SHOW_CAMPAIGN_PROOF = false; // Set to true when Ads Manager captures are added
   ```
4. **`client/src/pages/portfolio/ProjectDetail.tsx`**:
   ```ts
   const SHOW_STEABURG_GBP_PROOF = false; // Set to true when Steaburg GBP captures are added
   ```
5. **`client/src/pages/Services.tsx`**:
   ```ts
   const SHOW_SERVICES_FAQ = false; // Set to true when FAQ answers are confirmed
   ```

---

## 3. How to Enable an Asset When Supplied

1. Place the optimized asset in `client/public/assets/images/...` and `public/assets/images/...`.
2. Update the corresponding `img src` path in the component if different from the default manifest path.
3. Flip the feature gate constant from `false` to `true`.
4. Run `pnpm build` and verify that the section renders responsively across 1440px and 390px viewports.
