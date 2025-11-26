import {
  BrowserRouter as MainRouter,
  Routes,
  Route,
  Link,
} from "react-router-dom";

import "./App.css";

import OurArtist from "@/components/OurArtist";
import HeroLanding from "@/components/HeroLanding";
import HeroCursorFollower from "@/components/HeroCursorFollower";
import CircularCarousel from "@/components/CircularCarousel";
import OurDiamondCuts from "@/components/OurDiamondCuts";
import GallerySlider from "@/components/GallerySlider";
import ZoomReveal from "@/components/ZoomReveal";
import Drum3D from "@/components/Drum3D";
import EntranceSlider from "@/components/EntranceSlider";

import NinthGrid from "@/components/NinthGrid";
import RoughToPolish from "@/components/RoughToPolish";
import CosmicSlideshow from "@/components/CosmicSlideshow";
import ScrollAnimateGallery from "@/components/ScrollAnimationGallery";
import WaveTextScroll from "@/components/WaveTextScroll";
import StickySections from "@/components/StickySections";
import InfiniteScrollAccelerator from "@/components/InfiniteScrollAccelerator";
import CSRPage from "@/components/CSR";
import SmoothScrollTailwind from "@/components/SmoothScrollTailwind";
import OurShows from "@/components/OurShows";
import FoldedGallery from "@/components/FoldedGallery";
import Footer from "@/components/Footer";

import { ExploreOurApp, GalleryRow, PerfectionArt, WideImageExplore, ImperfectionGridReveal } from "@/components/ScrollAnimationGallery/main";

// import ScrollVideo from "@/components/ScrollVideo";
// import InfiniteDraggableGallery from "@/components/InfiniteDraggableGallery";

function App() {
  return (
    <MainRouter>
      <nav className="flex gap-5 py-4 bg-white z-[9999] hidden">
        <Link to={"/"}>Home</Link>
        <Link to={"/demo"}>Demo</Link>
        <Link to={"/drum"}>Drum</Link>
        <Link to={"/customization"}>Customization</Link>
      </nav>
      <Routes>
        <Route
          path="/"
          element={
            <>
              {/* <Special /> */}
              {/* <CosmicSlideshow /> */}
              <HeroLanding />
              <RoughToPolish />
              <WaveTextScroll />
              <OurDiamondCuts />
              <EntranceSlider />
              <HeroCursorFollower />
              <OurArtist />
              <GallerySlider />
              <ExploreOurApp />
              {/* <ScrollVideo /> */}
              {/* <CircularCarousel /> */}
            </>
          }
        />
        <Route path="/demo" element={<ScrollAnimateGallery />} />
        <Route path="/drum" element={<Drum3D />} />
        <Route path="/events" element={<SmoothScrollTailwind />} />
        <Route
          path="/test"
          element={
            <>
              {/* <OurShows /> */}
              <FoldedGallery />
            </>
          }
        />
        <Route
          path="/csr"
          element={
            <>
              <CSRPage />
            </>
          }
        />
        <Route
          path="/customization"
          element={
            <>
              <ZoomReveal />
              <StickySections />
              <GalleryRow />
            </>
          }
        />
        <Route path="/events" element={<InfiniteScrollAccelerator />} />
        <Route
          path="/free"
          element={
            <>
              <GalleryRow />
              <PerfectionArt />
              <ExploreOurApp />
              <ImperfectionGridReveal />
              <WideImageExplore />
            </>
          }
        />
        {/* <Route path="/gallery" element={<InfiniteDraggableGallery />} /> */}
      </Routes>
      <Footer />
    </MainRouter>
  );
}

export default App;
