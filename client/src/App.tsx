import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/NotFound";
import { Route, Switch } from "wouter";
import ErrorBoundary from "./components/ErrorBoundary";
import { ThemeProvider } from "./contexts/ThemeContext";
import Navbar from "@/components/Navbar";
import Home from "./pages/Home";
import Services from "./pages/Services";
import Experience from "./pages/Experience";
import Portfolio from "./pages/Portfolio";
import ServicePage from "./pages/ServicePage";
import CategoryPage from "./pages/CategoryPage";
import Photography from "./pages/Photography";
import Videography from "./pages/Videography";
import EditingDesign from "./pages/EditingDesign";
import BrandsAgencies from "./pages/BrandsAgencies";
import CaseStudies from "./pages/CaseStudies";
import CaseStudyDetail from "./pages/CaseStudyDetail";
import BrandGallery from "./pages/BrandGallery";
import ScrollToTop from "./components/ScrollToTop";

function Router() {
  return (
    <>
      <ScrollToTop />
      <Navbar />
      <Switch>
        <Route path={"/"} component={Home} />
        <Route path={"/services"} component={Services} />
        <Route path={"/experience"} component={Experience} />
        <Route path={"/portfolio"} component={Portfolio} />
        <Route path={"/portfolio/:service"} component={ServicePage} />
        <Route path={"/portfolio/:service/:category"} component={CategoryPage} />
        <Route path={"/portfolio/graphic-design/social-media/:brand"} component={BrandGallery} />
        <Route path={"/case-studies"} component={CaseStudies} />
        <Route path="/case-studies/:slug" component={CaseStudyDetail} />
        <Route path={"/404"} component={NotFound} />
        {/* Final fallback route */}
        <Route component={NotFound} />
      </Switch>
    </>
  );
}

// NOTE: About Theme
// - First choose a default theme according to your design style (dark or light bg), than change color palette in index.css
//   to keep consistent foreground/background color across components
// - If you want to make theme switchable, pass `switchable` ThemeProvider and use `useTheme` hook

function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider
        defaultTheme="dark"
      // switchable
      >
        <TooltipProvider>
          <Toaster />
          <Router />
        </TooltipProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;
