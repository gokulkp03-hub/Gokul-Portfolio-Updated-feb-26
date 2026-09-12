import { lazy, Suspense, useEffect } from "react";
import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/NotFound";
import { Route, Switch, useLocation } from "wouter";
import ErrorBoundary from "./components/ErrorBoundary";
import { ThemeProvider } from "./contexts/ThemeContext";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import ScrollToTop from "./components/ScrollToTop";
import WhatsAppButton from "./components/WhatsAppButton";
import { ScrollProgress } from "@/components/ui/ScrollProgress";
import { PageTransition } from "@/components/ui/PageTransition";
import { ConsentBanner } from "./components/ui/ConsentBanner";
import AdminProtectedRoute from "./components/auth/AdminProtectedRoute";
import { CustomCursor } from "@/components/ui/CustomCursor";

// Lazy-loaded public routes
const Home = lazy(() => import("./pages/Home"));
const VideoService = lazy(() => import("./pages/VideoService"));
const PhotoService = lazy(() => import("./pages/PhotoService"));
const MarketingService = lazy(() => import("./pages/MarketingService"));
const Services = lazy(() => import("./pages/Services"));
const About = lazy(() => import("./pages/About"));
const PortfolioLayout = lazy(() => import("./pages/portfolio/PortfolioLayout"));
const ProjectDetail = lazy(() => import("./pages/portfolio/ProjectDetail"));
const Results = lazy(() => import("./pages/Results"));
const Contact = lazy(() => import("./pages/Contact"));
const Blogs = lazy(() => import("./pages/Blogs"));
const BlogPost = lazy(() => import("./pages/BlogPost"));
const AquaCareCaseStudy = lazy(() => import("./pages/portfolio/AquaCareCaseStudy"));
const PrepmealCaseStudy = lazy(() => import("./pages/portfolio/PrepmealCaseStudy"));
const Privacy = lazy(() => import("./pages/Privacy"));

// Lazy-loaded admin routes
const AdminDashboard = lazy(() => import("./pages/admin/Dashboard"));
const ProjectManager = lazy(() => import("./pages/admin/ProjectManager"));
const MediaLibrary = lazy(() => import("./pages/admin/MediaLibrary"));
const ContentManager = lazy(() => import("./pages/admin/ContentManager"));
const MarketingManager = lazy(() => import("./pages/admin/MarketingManager"));
const Settings = lazy(() => import("./pages/admin/Settings"));
const ContactManager = lazy(() => import("./pages/admin/ContactManager"));
const BlogManager = lazy(() => import("./pages/admin/BlogManager"));

function Router() {
  const [location] = useLocation();
  const isAdminRoute = location.startsWith("/admin");

  useEffect(() => {
    let observer: IntersectionObserver | null = null;
    const timer = setTimeout(() => {
      observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              entry.target.classList.add("revealed");
              observer?.unobserve(entry.target);
            }
          });
        },
        { threshold: 0.05, rootMargin: "0px 0px -50px 0px" }
      );

      const elements = document.querySelectorAll(
        "section h2, section h3, .grid, .glass-card, .scroll-reveal"
      );
      elements.forEach((el) => {
        if (!el.classList.contains("revealed")) {
          const rect = el.getBoundingClientRect();
          const inViewport = rect.top < window.innerHeight && rect.bottom > 0;
          if (inViewport) {
            el.classList.add("revealed");
          } else {
            el.classList.add("scroll-reveal-init");
            observer?.observe(el);
          }
        }
      });
    }, 200);

    return () => {
      clearTimeout(timer);
      if (observer) {
        observer.disconnect();
      }
    };
  }, [location]);

  return (
    <>
      <ScrollToTop />
      <ScrollProgress />
      {!isAdminRoute && <Navbar />}
      {!isAdminRoute && <WhatsAppButton />}
      <main>
        <PageTransition>
          <Suspense fallback={<div className="min-h-screen bg-background" />}>
            <Switch>
              <Route path="/" component={Home} />
              <Route path="/portfolio/video" component={VideoService} />
              <Route path="/portfolio/photo" component={PhotoService} />
              <Route path="/portfolio/marketing" component={MarketingService} />
              <Route path="/video" component={VideoService} />
              <Route path="/photo" component={PhotoService} />
              <Route path="/marketing" component={MarketingService} />
              <Route path="/services" component={Services} />
              <Route path="/about" component={About} />
              <Route path="/portfolio" component={PortfolioLayout} />
              <Route path="/portfolio/:category/:slug">
                {(params) => <ProjectDetail category={params.category} slug={params.slug} />}
              </Route>
              <Route path="/marketing/aqua-care-uae" component={AquaCareCaseStudy} />
              <Route path="/marketing/prepmeal" component={PrepmealCaseStudy} />
              <Route path="/marketing/prepmeal-launch" component={PrepmealCaseStudy} />
              <Route path="/marketing/:slug">
                {(params) => <ProjectDetail category="marketing" slug={params.slug} />}
              </Route>
              <Route path="/results" component={Results} />
              <Route path="/contact" component={Contact} />
              <Route path="/blogs" component={Blogs} />
              <Route path="/blogs/:slug">
                {(params) => <BlogPost slug={params.slug} />}
              </Route>
              <Route path="/privacy" component={Privacy} />

              {/* Admin Routes */}
              <Route path="/admin">
                <AdminProtectedRoute>
                  <AdminDashboard />
                </AdminProtectedRoute>
              </Route>
              <Route path="/admin/blogs">
                <AdminProtectedRoute>
                  <BlogManager />
                </AdminProtectedRoute>
              </Route>
              <Route path="/admin/projects">
                <AdminProtectedRoute>
                  <ProjectManager />
                </AdminProtectedRoute>
              </Route>
              <Route path="/admin/media">
                <AdminProtectedRoute>
                  <MediaLibrary />
                </AdminProtectedRoute>
              </Route>
              <Route path="/admin/content">
                <AdminProtectedRoute>
                  <ContentManager />
                </AdminProtectedRoute>
              </Route>
              <Route path="/admin/marketing">
                <AdminProtectedRoute>
                  <MarketingManager />
                </AdminProtectedRoute>
              </Route>
              <Route path="/admin/settings">
                <AdminProtectedRoute>
                  <Settings />
                </AdminProtectedRoute>
              </Route>
              <Route path="/admin/contact">
                <AdminProtectedRoute>
                  <ContactManager />
                </AdminProtectedRoute>
              </Route>

              <Route path="/404" component={NotFound} />
              <Route component={NotFound} />
            </Switch>
          </Suspense>
        </PageTransition>
      </main>
      {!isAdminRoute && <Footer />}
    </>
  );
}

function App() {
  useEffect(() => {
    const loader = document.getElementById("page-loader");
    if (loader) {
      loader.style.opacity = "0";
      loader.style.visibility = "hidden";
      const timeout = setTimeout(() => {
        if (loader.parentNode) loader.parentNode.removeChild(loader);
      }, 400);
      return () => clearTimeout(timeout);
    }
  }, []);

  return (
    <ErrorBoundary>
      <ThemeProvider defaultTheme="dark" switchable={true}>
        <TooltipProvider>
          <CustomCursor />
          <Toaster />
          <div className="bg-grain" />
          <Router />
          <ConsentBanner />
        </TooltipProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;
