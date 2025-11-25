import React, { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "@studio-freight/lenis";

gsap.registerPlugin(ScrollTrigger);

const HorizontalScroll = () => {
  const [imagesLoaded, setImagesLoaded] = useState(false);
  const containerRef = useRef(null);
  const trackRef = useRef(null);
  const sectionsRef = useRef([]);
  const imageRefs = useRef([]);
  const titleRefs = useRef([]);
  const textRefs = useRef([]);
  const subtitleRefs = useRef([]);
  const lineRefs = useRef([]);

  const sections = [
    {
      title: "Tailored",
      subtitle: "to your vision",
      text: "Whether you’re looking for a classic shape or something truly one-of-a-kind, we offer a range of custom diamond shapes, sizes, and designs to match your exact specifications. From elegant cuts to intricate and unique designs, our craftsmen are experts at bringing your vision to life.",
      image:
        "https://www.arjivexports.com/static/media/Tailored.6c5fcc7fff7dd8b29c88.jpg",
      layout: "top-left",
      imagePosition: { top: "10%", left: "5%" },
      textPosition: { bottom: "15%", right: "8%" },
    },
    {
      title: "Modification",
      subtitle: "precision reshaping",
      text: "Whether you’re modifying an existing diamond or creating something from scratch, we provide a wide range of shape modifications to suit your taste. Want to transform a traditional cut into a more modern shape? We can make it happen with precision and care.",
      image:
        "https://www.arjivexports.com/static/media/Modification.0960eb215b57278e88b6.jpg",
      layout: "bottom-right",
      imagePosition: { bottom: "8%", right: "10%" },
      textPosition: { top: "12%", left: "5%" },
    },
    {
      title: "Precision",
      subtitle: "Craftsmanship",
      text: "We use the latest diamond polishing technology, combined with expert craftsmanship, to create a perfect cut that enhances the brilliance and beauty of your diamond. Each diamond is polished to exacting standards to meet your design needs and exceed your expectations.",
      image:
        "https://www.arjivexports.com/static/media/Craftsmanship.1e062281399ef37d83ea.jpg",
      layout: "top-right",
      imagePosition: { top: "15%", right: "8%" },
      textPosition: { bottom: "10%", left: "10%" },
    },
    {
      title: "Delivery",
      subtitle: "perfected & polished",
      text: "After our meticulous polishing and quality assurance process, your custom diamond is ready to be delivered to you, polished to perfection.",
      image:
        "https://www.arjivexports.com/static/media/Delivery.a7712148e2c055d9ddd1.jpg",
      layout: "bottom-right",
      imagePosition: { top: "20%", left: "8%" },
      textPosition: { bottom: "18%", right: "6%" },
    },
  ];

  useEffect(() => {
    let loadedCount = 0;
    const totalImages = sections.length;

    sections.forEach((section) => {
      const img = new Image();
      img.onload = () => {
        loadedCount++;
        if (loadedCount === totalImages) {
          setImagesLoaded(true);
        }
      };
      img.onerror = () => {
        loadedCount++;
        if (loadedCount === totalImages) {
          setImagesLoaded(true);
        }
      };
      img.src = section.image;
    });
  }, []);

  useEffect(() => {
    if (!imagesLoaded || !trackRef.current) return;

    const track = trackRef.current;
    const sections = sectionsRef.current;

    const scrollWidth = track.scrollWidth - window.innerWidth;

    const lenis = new Lenis({
      duration: 1.1,
      smooth: true,
      smoothWheel: true,
      easing: (t) => t * (2 - t),
    });

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    const horizontalScroll = gsap.to(track, {
      x: -scrollWidth,
      ease: "none",
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top top",
        end: () => `+=${scrollWidth}`,
        scrub: 1.6,
        pin: true,
        anticipatePin: 1,
        invalidateOnRefresh: true,
      },
    });

    // ---------------------------------------------------
    // PARALLAX X MOVEMENT (Different Speeds)
    // ---------------------------------------------------
    sections.forEach((section, index) => {
      const title = titleRefs.current[index];
      const subtitle = subtitleRefs.current[index];
      const image = imageRefs.current[index];

      const trigger = {
        trigger: section,
        containerAnimation: horizontalScroll,
        start: "left center",
        end: "right center",
        scrub: 1.5,
      };

      // Title — slow parallax
      if (title) {
        gsap.fromTo(
          title,
          { x: -120 },
          { x: 0, ease: "sine.inOut", scrollTrigger: trigger }
        );
      }

      // Subtitle — medium parallax
      if (subtitle) {
        gsap.fromTo(
          subtitle,
          { x: -80 },
          { x: 0, ease: "none", scrollTrigger: trigger }
        );
      }

      // Image — fast parallax
      if (image) {
        gsap.fromTo(
          image,
          { y: 50 },
          { y: 0, ease: "back.out", scrollTrigger: trigger }
        );
      }
    });

    // Cleanup
    return () => {
      ScrollTrigger.getAll().forEach((t) => t.kill());
      lenis.destroy();
    };
  }, [imagesLoaded]);

  if (!imagesLoaded) {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-white">
        <div className="flex flex-col items-center gap-6">
          <div className="relative">
            <div className="w-24 h-24 border-[3px] border-gray-200 border-t-black rounded-full animate-spin" />
            <div
              className="absolute inset-0 w-24 h-24 border-[3px] border-transparent border-b-gray-400 rounded-full animate-spin"
              style={{
                animationDirection: "reverse",
                animationDuration: "1.5s",
              }}
            />
          </div>
          <p className="text-sm uppercase tracking-[0.3em] text-gray-400 font-light">
            Loading Excellence
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="overflow-hidden">
      <div ref={containerRef} className="relative h-screen overflow-hidden">
        <div ref={trackRef} className="flex h-full">
          {sections.map((section, index) => (
            <div
              key={index}
              ref={(el) => (sectionsRef.current[index] = el)}
              className="relative flex-shrink-0 w-screen h-screen px-8 md:px-16 lg:px-24"
              style={{ perspective: "1500px" }}
            >
              <div
                className="absolute w-[45vw] h-[60vh]"
                style={section.imagePosition}
              >
                <img
                  ref={(el) => (imageRefs.current[index] = el)}
                  src={section.image}
                  alt={section.title}
                  className="w-full h-full object-cover shadow-2xl"
                  style={{
                    transformOrigin: "center center",
                    transformStyle: "preserve-3d",
                  }}
                />
              </div>

              <div className="absolute" style={section.textPosition}>
                <div className="mb-4">
                  <h6
                    ref={(el) => (subtitleRefs.current[index] = el)}
                    className="text-md md:text-xl uppercase tracking-widest text-gray-500"
                  >
                    {section.subtitle}
                  </h6>
                </div>

                <div className="mb-6">
                  <h2
                    ref={(el) => (titleRefs.current[index] = el)}
                    className="text-5xl md:text-7xl lg:text-8xl font-black uppercase leading-none tracking-tighter text-black"
                    style={{
                      perspective: "800px",
                      transformStyle: "preserve-3d",
                    }}
                  >
                    {section.title}
                  </h2>
                </div>

                <div className="mb-6 max-w-lg">
                  <p
                    ref={(el) => (textRefs.current[index] = el)}
                    className="text-sm md:text-base lg:text-lg leading-relaxed"
                  >
                    {section.text}
                  </p>
                </div>

                <div className="flex items-center gap-4">
                  <div
                    ref={(el) => (lineRefs.current[index] = el)}
                    className="w-16 h-[1px] bg-black"
                  />
                  <p className="text-xs uppercase tracking-wider">
                    Premium Craftsmanship
                  </p>
                </div>
              </div>
            </div>
          ))}

          <div className="flex-shrink-0 w-screen h-screen flex items-center justify-center bg-black text-white px-8">
            <div className="text-center max-w-2xl">
              <h2 className="text-6xl md:text-8xl font-black uppercase mb-6 leading-26">
                Arjiv Creation
              </h2>
              <p className="text-xl md:text-2xl font-light mb-12 tracking-wide uppercase">
                We Takes Bulk Orders Too
              </p>
              <button className="bg-white text-black px-12 py-4 !uppercase tracking-wider font-medium">
                Customize Your Diamonds
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HorizontalScroll;
