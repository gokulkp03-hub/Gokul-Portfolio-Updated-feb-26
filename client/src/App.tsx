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
            <Route path="/marketing/:slug">
              {(params) => <ProjectDetail category="marketing" slug={params.slug} />}
            </Route>
            <Route path="/results" component={Results} />
            <Route path="/contact" component={Contact} />

            {/* Admin Routes */}
            <Route path="/admin">
              <AdminProtectedRoute>
                <AdminDashboard />
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
        </PageTransition>
      </main>
      {!isAdminRoute && <Footer />}
    </>
  );
}

import AdminProtectedRoute from "./components/auth/AdminProtectedRoute";
import AdminDashboard from "./pages/admin/Dashboard";
import ProjectManager from "./pages/admin/ProjectManager";
import MediaLibrary from "./pages/admin/MediaLibrary";
import ContentManager from "./pages/admin/ContentManager";
import MarketingManager from "./pages/admin/MarketingManager";
import Settings from "./pages/admin/Settings";
import ContactManager from "./pages/admin/ContactManager";

import { CustomCursor } from "@/components/ui/CustomCursor";

function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider defaultTheme="dark" switchable={true}>
        <TooltipProvider>
          <CustomCursor />
          <Toaster />
          <Router />
        </TooltipProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;
