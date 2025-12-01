import React, { useEffect, useRef } from "react";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "@studio-freight/lenis";

import "./webflow.min.css";

gsap.registerPlugin(ScrollTrigger);

const WhatWeDo = () => {
  const containerRef = useRef(null);
  const stickyRef = useRef(null);

  useEffect(() => {
    const lenis = new Lenis({
      easing: (t) => 1 - Math.pow(1 - t, 2),
      smooth: true,
      smoothWheel: true,
      smoothTouch: false,
      touchMultiplier: 1.5,
    });

    const container = containerRef.current;
    const sticky = stickyRef.current;
    if (!container || !sticky) return;

    sticky.style.willChange = "transform";

    const handleScroll = () => {
      const totalX = sticky.scrollWidth - window.innerWidth;

      gsap.to(sticky, {
        x: () => -totalX,
        ease: "none",
        scrollTrigger: {
          trigger: container,
          start: "top top",
          end: () => `+=${totalX}`,
          scrub: 1.5,
          pin: true,
          anticipatePin: 2,
          invalidateOnRefresh: true,
        },
      });
    };

    handleScroll();

    window.addEventListener("resize", ScrollTrigger.refresh);
    return () => {
      window.removeEventListener("resize", ScrollTrigger.refresh);
      ScrollTrigger.getAll().forEach((st) => st.kill());
      gsap.ticker.remove(lenis.raf);
      lenis.destroy();
    };
  }, []);

  return (
    <section className="main-trace text-blue-950" ref={containerRef}>
      <section className="trace-sticky-container">
        <div className="trace-wrapper">
          <section className="child-sticky max-h-screen" ref={stickyRef}>
            <div className="div-block-76">
              <div className="absolute inset-0 bg-black opacity-30"></div>
              <div className="div-block-242 mx-auto">
                <h2 className="text-white text-center text-8xl my-6 p-8">
                  Provenance you <br />
                  can trust
                </h2>
                {/* <p className="text-block-38 !text-4xl">
                  From origin to execution, fully accounted for
                </p> */}
              </div>
            </div>
            <div className="div-block-77 max-w-3xl">
              <div className="div-block-78">
                <div className="text-block-39 text-blue-950 text-xl font-light max-w-lg leading-8">
                  Using advanced 3D scanning and modeling technology, our
                  planners analyze each rough diamond's internal and external
                  characteristics. We determine the optimal cut to maximize the
                  stone's value, considering factors like crystal orientation,
                  inclusions, and potential yield. This technical assessment
                  ensures we achieve the best possible size and quality from
                  each rough diamond.
                </div>
              </div>
              <h2 className="heading-34">
                <span className="word flex items-center justify-evenly max-w-max gap-4">
                  Planning
                </span>
              </h2>
            </div>
            <div className="div-block-795 min-w-xl">
              <video
                src="https://www.arjivexports.com/static/media/Planning2.1777c6504821ad92b5fe.mp4"
                poster="https://www.arjivexports.com/static/media/Delivery.a7712148e2c055d9ddd1.jpg"
                className="block w-full max-w-2xl object-cover"
                autoPlay
                muted
                loop
              />
            </div>
            <div className="div-block-77 max-w-3xl">
              <div className="div-block-78">
                <div className="text-block-39 text-blue-950 text-xl font-light max-w-lg leading-8">
                  Our skilled markers use precision 3D laser technology to map
                  out the cutting points on each rough diamond. We carefully
                  mark the stone according to its natural crystal structure and
                  internal characteristics. This crucial step determines how
                  we'll divide the rough to achieve optimal clarity, weight
                  retention, and final value.
                </div>
              </div>
              <h2 className="heading-34">
                <span className="word flex items-center justify-evenly max-w-max gap-4">
                  Marking
                </span>
              </h2>
            </div>
            <div className="div-block-795 min-w-xl">
              <video
                src="/videos/2.mp4"
                poster="https://www.arjivexports.com/static/media/Delivery.a7712148e2c055d9ddd1.jpg"
                className="block w-full max-w-2xl object-cover"
                autoPlay
                muted
                loop
              />
            </div>
            <div className="div-block-77 max-w-3xl">
              <div className="div-block-78">
                <div className="text-block-39 text-blue-950 text-xl font-light max-w-lg leading-8">
                  We use state-of-the-art laser cutting technology to precisely
                  divide rough diamonds along the marked lines. For specific
                  stones, we employ traditional blade sawing techniques when
                  they better suit the diamond's characteristics. Our sawing
                  process ensures clean, precise separation while minimizing any
                  potential damage to the stone.
                </div>
              </div>
              <h2 className="heading-34">
                <span className="word flex items-center justify-evenly max-w-max gap-4">
                  Sawing
                </span>
              </h2>
            </div>
            <div className="div-block-795 min-w-xl">
              <video
                src="/videos/5.mp4"
                poster="https://www.arjivexports.com/static/media/Delivery.a7712148e2c055d9ddd1.jpg"
                className="block w-full max-w-2xl object-cover"
                autoPlay
                muted
                loop
              />
            </div>
            <div className="div-block-77 max-w-3xl">
              <div className="div-block-78">
                <div className="text-block-39 text-blue-950 text-xl font-light max-w-lg leading-8">
                  During this phase, we shape the diamond using specialized
                  machines that rotate the stone against diamond-coated disks.
                  For round brilliants, our bruting process carefully grinds the
                  stone to achieve perfect roundness. We continuously monitor
                  symmetry and proportions throughout this stage to ensure
                  precise geometric alignment.
                </div>
              </div>
              <h2 className="heading-34">
                <span className="word flex items-center justify-evenly max-w-max gap-4">
                  Blocking &<br /> Bruting
                </span>
              </h2>
            </div>
            <div className="div-block-795 min-w-xl">
              <video
                src="/videos/4.mp4"
                poster="https://www.arjivexports.com/static/media/Delivery.a7712148e2c055d9ddd1.jpg"
                className="block w-full max-w-2xl object-cover"
                autoPlay
                muted
                loop
              />
            </div>
            <div className="div-block-77 max-w-3xl">
              <div className="div-block-78">
                <div className="text-block-39 text-blue-950 text-xl font-light max-w-lg leading-8">
                  In the final stage, our master polishers cut and polish each
                  facet using precision-controlled machines with diamond-coated
                  wheels. We carefully angle each facet to maximize light return
                  and brilliance. Regular quality checks during polishing ensure
                  we maintain exact angles and achieve optimal symmetry for
                  maximum sparkle and fire.
                </div>
              </div>
              <h2 className="heading-34">
                <span className="word flex items-center justify-evenly max-w-max gap-4">
                  Polishing
                </span>
              </h2>
            </div>
            <div className="div-block-795 min-w-xl">
              <video
                src="/videos/3.mp4"
                poster="https://www.arjivexports.com/static/media/Delivery.a7712148e2c055d9ddd1.jpg"
                className="block w-full max-w-2xl object-cover"
                autoPlay
                muted
                loop
              />
            </div>
            <div className="div-block-77 max-w-3xl">
              <div className="div-block-78">
                <div className="text-block-39 text-blue-950 text-xl font-light max-w-lg leading-8">
                  Our comprehensive grading process evaluates diamonds beyond
                  the standard 4Cs (Cut, Color, Clarity, and Carat). We employ
                  advanced optical scanning technology to assess light
                  performance, measuring factors like brilliance, fire, and
                  scintillation. Each stone undergoes microscopic examination by
                  expert gemologists who evaluate additional characteristics
                  such as crystal strain patterns and precise symmetry
                  measurements. Following our internal assessment, diamonds are
                  sent to leading international laboratories for independent
                  certification, ensuring each stone meets both industry
                  standards and our elevated quality criteria.
                </div>
              </div>
              <h2 className="heading-34">
                <span className="word flex items-center justify-evenly max-w-max gap-4">
                  Grading
                </span>
              </h2>
            </div>
            <div className="div-block-795 min-w-xl">
              <video
                src="/videos/6.mp4"
                poster="https://www.arjivexports.com/static/media/Delivery.a7712148e2c055d9ddd1.jpg"
                className="block w-full max-w-2xl object-cover"
                autoPlay
                muted
                loop
              />
            </div>
            <div className="div-block-77 max-w-3xl">
              <div className="div-block-78">
                <div className="text-block-39 text-blue-950 text-xl font-light max-w-lg leading-8">
                  At Arjiv, every diamond is shaped by expertise and supported
                  by certainty. Our advanced traceability system documents each
                  stone’s complete lifecycle—from its rough origin to every
                  stage of craftsmanship—capturing a transparent record of
                  transformation. This fusion of skill and technology ensures
                  unmatched authenticity, reinforcing our commitment to
                  integrity across the entire supply chain.
                  <br />
                </div>
              </div>
              <h2 className="heading-34">
                <span className="word flex items-center justify-evenly max-w-max gap-4">
                  Crafting Truth in Every Facet
                </span>
              </h2>
            </div>
            <button className="div-block-79 max-w-xl">
              <img
                src="https://cdn.prod.website-files.com/67d3d9269e8bfae4dec6d983/6811b8fe6c3d1cb5e9de73ba_PlayCircle.svg"
                loading="lazy"
                alt="Play Circle"
                className="w-20"
              />
            </button>
            <div className="div-block-77 max-w-3xl">
              <div className="div-block-78">
                <div className="text-block-39 text-blue-950 text-xl font-light max-w-lg leading-8">
                  At Arjiv, every diamond is shaped by expertise and supported
                  by certainty. Our advanced traceability system documents each
                  stone’s complete lifecycle—from its rough origin to every
                  stage of craftsmanship—capturing a transparent record of
                  transformation. This fusion of skill and technology ensures
                  unmatched authenticity, reinforcing our commitment to
                  integrity across the entire supply chain.
                  <br />
                </div>
              </div>
              <h2 className="heading-34">
                <span className="word flex items-center justify-evenly max-w-max gap-4">
                  Crafting Truth in Every Facet
                </span>
              </h2>
            </div>
            <div className="div-block-80 !justify-start">
              <h2 className="heading-36 text-white text-center uppercase w-auto text-7xl leading-normal">
                <span className="word">
                  Complete Traceability <br /> From Mine to Masterpiece
                </span>
              </h2>
            </div>
            <div className="div-block-88">
              <div className="div-block-89">
                <h2 className="heading-38 ">
                  <span className="word !font-[lexend] font-extralight">
                    From Verified Origins
                  </span>
                </h2>
              </div>
              <div className="div-block-90">
                <div className="text-block-44">
                  Ethically sourced from trusted origins&nbsp;&nbsp;then
                  tracked, documented, and delivered with transparency
                </div>
                <h2 className="heading-38 underline decoration-4 underline-offset-[16px]">
                  <span className="word !font-[lexend] font-extralight">
                    To Flawless
                  </span>
                </h2>
              </div>
              <div className="div-block-85 items-center">
                <h2 className="heading-38 ">
                  <span className="word !font-[lexend] font-extralight">
                    Craftsmanship
                  </span>
                </h2>
                <div className="ml-6 mt-0">
                  <img
                    src="https://i.pinimg.com/originals/86/b9/9a/86b99a64fe9d43b4d256d26833ae82af.gif"
                    loading="lazy"
                    alt=""
                    className="max-w-48 grayscale1"
                  />
                </div>
              </div>
              <div className="div-block-93">
                <div className="text-wrapper">
                  <div className="text-list">
                    <div className="div-block-241 text-div">
                      <h2 className="heading-38 ">
                        <span className="word !font-[lexend] font-extralight">
                          Excellence in Craft
                        </span>
                      </h2>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="div-block-95 min-h-lvh max-w-lg pl-5 pt-16 pe-8">
              <h2 className="text-4xl leading-normal">Artistry & Craft</h2>
              <img
                src="/img/Trace/2O7A9842.JPG"
                loading="lazy"
                alt="Our Artists"
                className="object-cover object-left rounded-xl"
              />
              <div className="w-full">
                <p className="paragraph-18 max-w-xl text-lg w-full text-left mb-6">
                  For decades, our craft has been shaped by the hands of
                  artisans who carry forward traditions refined over generations
                </p>
                <p className="paragraph-18 max-w-xl text-lg w-full text-left">
                  Their techniques — learned, repeated, perfected — transform
                  rough diamonds into breathtaking masterpieces. This heritage
                  of craftsmanship continues to evolve as we blend timeless
                  hand-skills with modern technology, ensuring every piece
                  carries both legacy and innovation.
                </p>
              </div>
            </div>
          </section>
        </div>
      </section>
    </section>
  );
};

export default WhatWeDo;
