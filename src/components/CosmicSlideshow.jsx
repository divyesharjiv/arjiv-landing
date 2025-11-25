import React, { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";

const IMAGES = [
  // "https://cdn.cosmos.so/3dd498a9-169d-4b69-8e2e-df042123c124?format=jpeg",
  // "https://images.unsplash.com/photo-1761927517637-170e04822be5?q=80&w=1175&auto=format&fit=crop",
  // "https://images.unsplash.com/photo-1553490711-d565fc6a4956?q=80&w=1274&auto=format&fit=crop",
  // "https://images.unsplash.com/photo-1635645476401-dd7a213c852e?q=80&w=1228&auto=format&fit=crop",
  // "https://images.unsplash.com/photo-1743588769881-46b111818506?q=80&w=1171&auto=format&fit=crop",
  // "https://images.unsplash.com/photo-1559011193-471926ada9ff?q=80&w=2105&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1549461520-fb80f766c147?q=80&w=1332&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  "https://images.unsplash.com/photo-1635009981431-6134280a4639?q=80&w=1332&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  "https://images.unsplash.com/photo-1545128309-686a71a99f76?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  "https://images.unsplash.com/photo-1745030174513-6b08bc58ca1a?q=80&w=1332&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  "https://images.unsplash.com/photo-1540666709056-d5ff076ec512?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  "https://images.unsplash.com/photo-1758932253371-dc800425ff37?q=80&w=1074&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
];

const TITLES = [
  "Cosmic Harmony",
  "Astral Journey",
  "Ethereal Vision",
  "Quantum Field",
  "Celestial Path",
  "Cosmic Whisper",
];

export default function CosmicSlideshow() {
  const [current, setCurrent] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  const slidesRef = useRef([]);
  const imgRefs = useRef([]);
  const titleRef = useRef(null);    

  const wrapIndex = (i) => (i + IMAGES.length) % IMAGES.length;

  // Animate title fade-in when slide changes
  useEffect(() => {
    if (!titleRef.current) return;

    gsap.fromTo(
      titleRef.current,
      { y: 20, autoAlpha: 0 },
      { y: 0, autoAlpha: 0.9, duration: 0.45, ease: "power3.out" }
    );
  }, [current]);

  // GSAP slide transition
  const animateTransition = (fromIndex, toIndex) => {
    if (fromIndex === toIndex) return;

    setIsAnimating(true);

    const fromSlide = slidesRef.current[fromIndex];
    const toSlide = slidesRef.current[toIndex];
    const fromImg = imgRefs.current[fromIndex];
    const toImg = imgRefs.current[toIndex];

    gsap.set(toSlide, { zIndex: 99, autoAlpha: 1 });

    const tl = gsap.timeline({
      onComplete: () => {
        gsap.set(toSlide, { zIndex: 1 });
        gsap.set(fromSlide, { autoAlpha: 0 });
        setIsAnimating(false);
      }
    });

    tl.addLabel("start", 0)
      .fromTo(
        toSlide,
        { autoAlpha: 1, scale: 0.1, yPercent: 100 },
        { duration: 0.7, ease: "expo", scale: 0.4, yPercent: 0 })
      .fromTo(
        toImg,
        { filter: "contrast(100%) saturate(100%)", scaleY: 4, transformOrigin: "100% 50%" },
        { duration: 0.7, ease: "expo", scaleY: 1 },
        "start"
      )
      .fromTo(
        fromImg,
        { filter: "contrast(100%) saturate(100%)" },
        { duration: 0.7, ease: "expo", filter: "contrast(120%) saturate(140%)" },
        "start"
      )
      .addLabel("middle", "start+=0.2")
      .to(toSlide, { duration: 1, ease: "power4.inOut", scale: 1 }, "middle")
      .to(fromSlide, { duration: 1, ease: "power4.inOut", scale: 0.5, autoAlpha: 1 }, "middle");
  };

  const navigate = (dir) => {
    if (isAnimating) return;
    const next = wrapIndex(current + dir);
    animateTransition(current, next, dir);
    setCurrent(next);
  };

  const goto = (index) => {
    if (isAnimating || index === current) return;
    const dir = index > current ? 1 : -1;
    animateTransition(current, index, dir);
    setCurrent(index);
  };

  return (
    <div className="w-full h-screen bg-black text-white overflow-hidden relative font-sans">

      {/* Slides */}
      <div className="w-full h-screen grid place-items-center">
        {IMAGES.map((src, i) => (
          <div
            key={i}
            ref={(el) => (slidesRef.current[i] = el)}
            className={`absolute inset-0 grid place-items-center transition-opacity duration-300 ${
              i === current ? "opacity-100" : "opacity-0"
            }`}
            style={{ zIndex: i === current ? 1 : 0 }}
          >
            <div
              ref={(el) => (imgRefs.current[i] = el)}
              className="w-full h-full bg-cover bg-left-center will-change-transform"
              style={{ backgroundImage: `url(${src})` }}
            />
          </div>
        ))}
      </div>

      {/* Bottom UI */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[720px] max-w-full z-50 pb-8 flex flex-col items-center">

        <h1 className="text-center text-2xl tracking-wide mb-9 font-bold uppercase">Arjiv exports</h1>

        {/* Arrow Buttons */}
        <div className="flex items-center justify-between w-full text-xs mb-6">
          <div
            className={`cursor-pointer opacity-70 hover:opacity-100 text-4xl ${
              isAnimating ? "opacity-30 pointer-events-none" : ""
            }`}
            onClick={() => navigate(-1)}
          >
            ⟪
          </div>

          <div
            className={`cursor-pointer opacity-70 hover:opacity-100 text-4xl ${
              isAnimating ? "opacity-30 pointer-events-none" : ""
            }`}
            onClick={() => navigate(1)}
          >
            ⟫
          </div>
        </div>

        {/* Slide Title */}
        <div className="relative h-[30px] w-full overflow-hidden mb-4">
          <h2 ref={titleRef} className="absolute inset-0 text-center text-2xl opacity-80">
            {TITLES[current]}
          </h2>
        </div>

        {/* Thumbnails */}
        <div className="w-full bg-black/50 overflow-hidden">
          <div className="flex">
            {IMAGES.map((src, i) => (
              <button
                key={i}
                onClick={() => goto(i)}
                className={`w-[120px] h-[80px] bg-cover bg-left-center transition-opacity duration-200 ${
                  i === current ? "opacity-100" : "opacity-50 hover:opacity-80"
                }`}
                style={{ backgroundImage: `url(${src})` }}
              />
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}
