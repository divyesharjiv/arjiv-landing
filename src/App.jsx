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
import Journey from "@/components/Journey";
import Header from "@/components/Header";
import StaggeredGrid from "@/components/StaggeredGrid";
import Policies from "@/Pages/Policies";
import WhatWeDo from "@/Pages/WhatWeDo";
import ContactUs from "@/Pages/ContactUs";

// import ScrollVideo from "@/components/ScrollVideo";
// import InfiniteDraggableGallery from "@/components/InfiniteDraggableGallery";

document.addEventListener('mousedown', function(e) {
  if (e.button === 1) { // 1 = middle mouse button
    e.preventDefault();
    return false;
  }
});


function App() {
  return (
    <MainRouter>
      <Header />
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
          <Route path="/journey" element={<Journey />} />
          <Route path="/policies" element={<Policies />} />
          <Route path="/contact-us" element={<ContactUs />} />
          <Route path="/what-we-do" element={
            <>
              <WhatWeDo />
              <StaggeredGrid />
            </>
            }
          />
      </Routes>
      <Footer />
    </MainRouter>
  );
}

export default App;
