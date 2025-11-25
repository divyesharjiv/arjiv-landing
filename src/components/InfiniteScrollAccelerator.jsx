import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "@studio-freight/lenis";

// ----------------------------------------------------------------------
//  FULL PINNED SCROLL SECTION + MULTI-IMAGE ANIMATION (MATCHES WEBFLOW)
// ----------------------------------------------------------------------
//  ✔ Text stays sticky on left
//  ✔ On scroll → section index changes (01, 02, 03...)
//  ✔ Each section has MULTIPLE image pairs animating
//  ✔ Smooth Lenis
//  ✔ GSAP scrub animations
// ----------------------------------------------------------------------

export default function CsrPinnedSection() {
  const containerRef = useRef(null);
  const imageWrapperRef = useRef(null);
  const textWrapperRef = useRef(null);

  const sections = [
    {
      number: "01",
      title: "Education",
      tag: "#CommittedToEdification",
      desc:
        "Access to quality education is key to building an inclusive world. Over 5,000 students empowered.",
      images: [
        // MULTIPLE IMAGE PAIRS LIKE WEBFLOW
        [
          "https://images.unsplash.com/photo-1603575448362-5a5b63280a77?auto=format&fit=crop&w=1200&q=80",
          "https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&w=1200&q=80",
        ],
        [
          "https://images.unsplash.com/photo-1596496054435-05c7a5f2f5c6?auto=format&fit=crop&w=1200&q=80",
          "https://images.unsplash.com/photo-1571260899304-425eee4c7efc?auto=format&fit=crop&w=1200&q=80",
        ],
      ],
    },
    {
      number: "02",
      title: "Women Empowerment",
      tag: "#CommittedToEmpowerment",
      desc:
        "Support ecosystem for tribal girls providing housing, education and life support.",
      images: [
        [
          "https://images.unsplash.com/photo-1524253482453-3fed8d2fe12b?auto=format&fit=crop&w=1200&q=80",
          "https://images.unsplash.com/photo-1581578017422-5519b02c1f0d?auto=format&fit=crop&w=1200&q=80",
        ],
        [
          "https://images.unsplash.com/photo-1542736667-069246bdbc76?auto=format&fit=crop&w=1200&q=80",
          "https://images.unsplash.com/photo-1589571894960-20bbe2828d0a?auto=format&fit=crop&w=1200&q=80",
        ],
      ],
    },
    {
      number: "03",
      title: "Healthcare",
      tag: "#CommittedToHealthierSociety",
      desc:
        "Free and subsidized healthcare across Gujarat including clinics and superspecialty hospitals.",
      images: [
        [
          "https://images.unsplash.com/photo-1580281657527-47d5a6eafb4a?auto=format&fit=crop&w=1200&q=80",
          "https://images.unsplash.com/photo-1550831107-1553da8c8464?auto=format&fit=crop&w=1200&q=80",
        ],
        [
          "https://images.unsplash.com/photo-1584036561566-baf8f5f1b144?auto=format&fit=crop&w=1200&q=80",
          "https://images.unsplash.com/photo-1584982751601-97dcc096659c?auto=format&fit=crop&w=1200&q=80",
        ],
      ],
    },
  ];

  // --------------------------------------------------------
  //  EFFECT → GSAP + LENIS + PIN + SECTION SWITCHING
  // --------------------------------------------------------
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const lenis = new Lenis({ smooth: true, lerp: 0.07 });
    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    const sectionsDOM = containerRef.current.querySelectorAll(".csr-block");
    const textTitle = textWrapperRef.current.querySelector(".csr-title");
    const textTag = textWrapperRef.current.querySelector(".csr-tag");
    const textNum = textWrapperRef.current.querySelector(".csr-number");
    const textDesc = textWrapperRef.current.querySelector(".csr-desc");

    // MAIN TIMELINE (whole scrolling area)
    const master = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top top",
        end: `+=${sections.length * 150}%`,
        pin: true,
        scrub: true,
      },
    });

    sections.forEach((sec, i) => {
      const imgs = imageWrapperRef.current.querySelectorAll(
        `.img-group-${i}`
      );

      // Fade previous title
      master.to(
        [textNum, textTitle, textTag, textDesc],
        {
          autoAlpha: 0,
          y: -20,
          duration: 0.3,
        },
        ">"
      );

      // Replace text
      master.add(() => {
        textNum.textContent = sec.number;
        textTitle.textContent = sec.title;
        textTag.textContent = sec.tag;
        textDesc.textContent = sec.desc;
      });

      // Fade new text
      master.fromTo(
        [textNum, textTitle, textTag, textDesc],
        {
          autoAlpha: 0,
          y: 20,
        },
        {
          autoAlpha: 1,
          y: 0,
          duration: 0.4,
          ease: "power2.out",
        }
      );

      // IMAGE ANIMATION SEQUENCE
      imgs.forEach((group) => {
        const children = group.querySelectorAll("img");

        master.fromTo(
          children,
          { autoAlpha: 0, y: 60, filter: "blur(8px)" },
          {
            autoAlpha: 1,
            y: 0,
            filter: "blur(0px)",
            duration: 0.8,
            stagger: 0.15,
            ease: "power3.out",
          }
        );

        master.to(children, {
          autoAlpha: 0,
          y: -40,
          filter: "blur(8px)",
          duration: 0.6,
          stagger: 0.15,
          ease: "power2.in",
        });
      });
    });
  }, []);

  // ----------------------------------------------------------------------
  //  JSX RETURN (Sticky left text + right animated images)
  // ----------------------------------------------------------------------
  return (
    <div ref={containerRef} className="w-full h-[100vh] bg-white flex overflow-hidden">
      {/* LEFT TEXT PANEL (sticky) */}
      <div
        ref={textWrapperRef}
        className="w-[40%] h-full flex flex-col justify-center pl-20 gap-4"
      >
        <div className="csr-number text-6xl font-bold text-gray-300">01</div>
        <div className="csr-title text-5xl font-semibold">Education</div>
        <div className="csr-tag text-indigo-600 font-medium tracking-wide">
          #CommittedToEdification
        </div>
        <div className="csr-desc text-lg text-gray-600 max-w-md">
          Access to quality education is key to building an inclusive world.
        </div>
      </div>

      {/* RIGHT IMAGE PANEL */}
      <div
        ref={imageWrapperRef}
        className="w-[60%] h-full relative flex items-center justify-center"
      >
        {sections.map((sec, i) => (
          <div
            key={i}
            className={`absolute top-0 left-0 w-full h-full grid grid-cols-2 gap-6 p-10 img-group-${i}`}
            style={{ opacity: i === 0 ? 1 : 0 }}
          >
            {sec.images.map((pair, idx) => (
              <div
                key={idx}
                className="flex flex-col gap-6 justify-center items-center"
              >
                {pair.map((src, imgIndex) => (
                  <img
                    key={imgIndex}
                    src={src}
                    className="w-full h-56 object-cover rounded-2xl shadow-xl"
                  />
                ))}
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}