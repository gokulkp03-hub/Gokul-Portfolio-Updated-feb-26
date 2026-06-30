import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/NotFound";
import { Route, Switch, useLocation } from "wouter";
import ErrorBoundary from "./components/ErrorBoundary";
import { ThemeProvider } from "./contexts/ThemeContext";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Home from "./pages/Home";
import VideoService from "./pages/VideoService";
import PhotoService from "./pages/PhotoService";
import MarketingService from "./pages/MarketingService";
import ScrollToTop from "./components/ScrollToTop";
import WhatsAppButton from "./components/WhatsAppButton";
import { ScrollProgress } from "@/components/ui/ScrollProgress";
import { PageTransition } from "@/components/ui/PageTransition";

import Services from "./pages/Services";
import About from "./pages/About";
import PortfolioLayout from "./pages/portfolio/PortfolioLayout";
import ProjectDetail from "./pages/portfolio/ProjectDetail";
import Results from "./pages/Results";
import Contact from "./pages/Contact";
import AquaCareCaseStudy from "./pages/portfolio/AquaCareCaseStudy";
import PrepmealCaseStudy from "./pages/portfolio/PrepmealCaseStudy";

function Router() {
  const [location] = useLocation();
  const isAdminRoute = location.startsWith("/admin");

  useEffect(() => {
    const timer = setTimeout(() => {
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              entry.target.classList.add("revealed");
              observer.unobserve(entry.target);
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
            observer.observe(el);
          }
        }
      });

      return () => observer.disconnect();
    }, 200);

    return () => clearTimeout(timer);
  }, [location]);

  return (
    <>
      <ScrollToTop />
      <ScrollProgress />
      {!isAdminRoute && <Navbar />}
      {!isAdminRoute && <WhatsAppButton />}
      <main>
        <PageTransition>
          <Switch>
            <Route path="/" component={Home} />
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

            {/* Admin Routes */}
            <Route path="/admin">
              <AdminProtectedRoute>
                <Suspense fallback={<div className="min-h-screen bg-background" />}>
                  <AdminDashboard />
                </Suspense>
              </AdminProtectedRoute>
            </Route>
            <Route path="/admin/projects">
              <AdminProtectedRoute>
                <Suspense fallback={<div className="min-h-screen bg-background" />}>
                  <ProjectManager />
                </Suspense>
              </AdminProtectedRoute>
            </Route>
            <Route path="/admin/media">
              <AdminProtectedRoute>
                <Suspense fallback={<div className="min-h-screen bg-background" />}>
                  <MediaLibrary />
                </Suspense>
              </AdminProtectedRoute>
            </Route>
            <Route path="/admin/content">
              <AdminProtectedRoute>
                <Suspense fallback={<div className="min-h-screen bg-background" />}>
                  <ContentManager />
                </Suspense>
              </AdminProtectedRoute>
            </Route>
            <Route path="/admin/marketing">
              <AdminProtectedRoute>
                <Suspense fallback={<div className="min-h-screen bg-background" />}>
                  <MarketingManager />
                </Suspense>
              </AdminProtectedRoute>
            </Route>
            <Route path="/admin/settings">
              <AdminProtectedRoute>
                <Suspense fallback={<div className="min-h-screen bg-background" />}>
                  <Settings />
                </Suspense>
              </AdminProtectedRoute>
            </Route>
            <Route path="/admin/contact">
              <AdminProtectedRoute>
                <Suspense fallback={<div className="min-h-screen bg-background" />}>
                  <ContactManager />
                </Suspense>
              </AdminProtectedRoute>
            </Route>

            <Route path="/404" component={NotFound} />
            <Route component={NotFound} />
          </Switch>
        </PageTransition>
      </main>
      {!isAdminRoute && <Footer />}
    </>
  );
}

import AdminProtectedRoute from "./components/auth/AdminProtectedRoute";
import { lazy, Suspense } from "react";

const AdminDashboard = lazy(() => import("./pages/admin/Dashboard"));
const ProjectManager = lazy(() => import("./pages/admin/ProjectManager"));
const MediaLibrary = lazy(() => import("./pages/admin/MediaLibrary"));
const ContentManager = lazy(() => import("./pages/admin/ContentManager"));
const MarketingManager = lazy(() => import("./pages/admin/MarketingManager"));
const Settings = lazy(() => import("./pages/admin/Settings"));
const ContactManager = lazy(() => import("./pages/admin/ContactManager"));

import { CustomCursor } from "@/components/ui/CustomCursor";

import { useEffect } from "react";

function App() {
  useEffect(() => {
    const loader = document.getElementById("page-loader");
    if (loader) {
      loader.style.opacity = "0";
      loader.style.visibility = "hidden";
      const timeout = setTimeout(() => {
        loader.remove();
      }, 500);
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
        </TooltipProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;
