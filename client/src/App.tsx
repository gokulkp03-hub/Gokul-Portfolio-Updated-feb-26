import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/NotFound";
import { Route, Switch } from "wouter";
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

import Services from "./pages/Services";
import About from "./pages/About";
import PortfolioLayout from "./pages/portfolio/PortfolioLayout";
import ProjectDetail from "./pages/portfolio/ProjectDetail";
import Results from "./pages/Results";
import Contact from "./pages/Contact";

function Router() {
  return (
    <>
      <ScrollToTop />
      <Navbar />
      <WhatsAppButton />
      <main>
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
          <Route path="/marketing/:slug">
            {(params) => <ProjectDetail category="marketing" slug={params.slug} />}
          </Route>
          <Route path="/results" component={Results} />
          <Route path="/contact" component={Contact} />

          <Route path="/404" component={NotFound} />
          <Route component={NotFound} />
        </Switch>
      </main>
      <Footer />
    </>
  );
}

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
