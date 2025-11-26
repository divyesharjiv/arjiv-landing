import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { Flip } from "gsap/Flip";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "@studio-freight/lenis";
import "./styles.css";

import IMG1 from "/img/custom/27.jpg";
import IMG2 from "/img/custom/10.jpg";
import IMG3 from "/img/custom/3.jpg";
import IMG4 from "/img/custom/29.jpg";
import IMG5 from "/img/custom/2.jpg";
import IMG6 from "/img/custom/31.jpg";
import IMG7 from "/img/custom/6.jpg";

import MOB1 from "/img/App/MOB1.png";
import MOB2 from "/img/App/MOB2.png";
import MOB3 from "/img/App/MOB3.png";
import MOB4 from "/img/App/MOB4.png";
import MOB5 from "/img/App/MOB5.png";
import MOB6 from "/img/App/MOB6.png";

gsap.registerPlugin(Flip, ScrollTrigger);

const ScrollAnimationGallery = () => {
  const lenisRef = useRef(null);
  const galleryRefs = useRef({});

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: t => 1 - Math.pow(1 - t, 3),
      smooth: true,
      smoothTouch: false,
      touchMultiplier: 1.5,
    });

    lenisRef.current = lenis;

    function raf(time) {
      lenis.raf(time);
      ScrollTrigger.update();
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);
    return () => lenis.destroy();
  }, []);

  const triggerFlipOnScroll = (galleryEl, options = {}) => {
    if (!galleryEl) return;

    let settings = {
      flip: {
        absoluteOnLeave: false,
        absolute: false,
        scale: true,
        simple: true,
      },
      scrollTrigger: {
        start: "center center",
        end: "+=300%",
      },
      stagger: 0,
    };

    settings = { ...settings, ...options };
    if (options.flip) settings.flip = { ...settings.flip, ...options.flip };
    if (options.scrollTrigger)
      settings.scrollTrigger = {
        ...settings.scrollTrigger,
        ...options.scrollTrigger,
      };

    const galleryCaption = galleryEl.querySelector(".caption");
    const galleryItems = galleryEl.querySelectorAll(".gallery__item");

    const galleryItemsInner = Array.from(galleryItems)
      .map(item => (item.children.length ? Array.from(item.children) : []))
      .flat();

    galleryEl.classList.add("gallery--switch");
    const flipstate = Flip.getState([galleryItems, galleryCaption], {
      props: "filter, opacity",
    });
    galleryEl.classList.remove("gallery--switch");

    const tl = Flip.to(flipstate, {
      ease: "none",
      absoluteOnLeave: settings.flip.absoluteOnLeave,
      absolute: settings.flip.absolute,
      scale: settings.flip.scale,
      simple: settings.flip.simple,
      scrollTrigger: {
        trigger: galleryEl,
        start: settings.scrollTrigger.start,
        end: settings.scrollTrigger.end,
        pin: galleryEl.parentNode,
        scrub: 1.8,
      },
      stagger: settings.stagger,
    });

    if (galleryItemsInner.length) {
      tl.fromTo(
        galleryItemsInner,
        { scale: 2 },
        {
          scale: 1,
          scrollTrigger: {
            trigger: galleryEl,
            start: settings.scrollTrigger.start,
            end: settings.scrollTrigger.end,
            scrub: 1.8,
          },
        },
        0
      );
    }
  };

  useEffect(() => {
    const galleries = [
      { id: "gallery-1", options: { flip: { absoluteOnLeave: true, scale: false } } },
      {
        id: "gallery-3",
        options: {
          flip: { absolute: true, scale: false },
          scrollTrigger: { start: "center center", end: "+=900%" },
          stagger: 0.07,
        },
      },
      { id: "gallery-4", options: {} },
      { id: "gallery-8", options: { flip: { scale: false } } },
      { id: "gallery-9", options: {} },
    ];

    const timer = setTimeout(() => {
      galleries.forEach(gallery => {
        const el = galleryRefs.current[gallery.id];
        if (el) triggerFlipOnScroll(el, gallery.options);
      });
    }, 100);

    return () => {
      clearTimeout(timer);
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  return (
    <>
      <main className="relative w-full overflow-hidden">
        <div className="gallery-wrap">
          <div
            className="gallery gallery--row"
            id="gallery-1"
            ref={el => (galleryRefs.current["gallery-1"] = el)}
          >
            <div className="gallery__item gallery__item--s" style={{ backgroundImage: `url(${IMG2})` }}></div>
            <div className="gallery__item gallery__item--m" style={{ backgroundImage: `url(${IMG3})` }}></div>
            <div className="gallery__item gallery__item--l" style={{ backgroundImage: `url(${IMG4})` }}></div>
            <div className="gallery__item gallery__item--xl gallery__item--center" style={{ backgroundImage: `url(${IMG1})` }}></div>
            <div className="gallery__item gallery__item--l" style={{ backgroundImage: `url(${IMG5})` }}></div>
            <div className="gallery__item gallery__item--m" style={{ backgroundImage: `url(${IMG6})` }}></div>
            <div className="gallery__item gallery__item--s" style={{ backgroundImage: `url(${IMG7})` }}></div>
            <h2 className="caption">
              Within this meticulously arranged AI-generated ensemble lies a tantalizing facade, captivating our gaze.
            </h2>
          </div>
        </div>

        <div className="gallery-wrap">
          <div
            className="gallery gallery--grid10"
            id="gallery-3"
            ref={el => (galleryRefs.current["gallery-3"] = el)}
          >
            {[...Array(15)].map((_, i) => (
              <div
                key={i}
                className={`gallery__item pos-${i + 1}`}
                style={{ backgroundImage: `url(/img/custom/${i + 1}.jpg)` }}
              ></div>
            ))}
            <h2 className="caption !text-black">The Art of Perfection?</h2>
          </div>
        </div>

        <div className="gallery-wrap gallery-wrap--dense">
          <div
            className="gallery gallery--stack gallery--stack-inverse gallery--stack-dark"
            id="gallery-4"
            ref={el => (galleryRefs.current["gallery-4"] = el)}
          >
            <div className="gallery__item gallery__itemX" style={{ backgroundImage: `url(${MOB1})` }}></div>
            <div className="gallery__item gallery__itemX" style={{ backgroundImage: `url(${MOB2})` }}></div>
            <div className="gallery__item gallery__itemX" style={{ backgroundImage: `url(${MOB3})` }}></div>
            <div className="gallery__item gallery__itemX" style={{ backgroundImage: `url(${MOB4})` }}></div>
            <div className="gallery__item gallery__itemX" style={{ backgroundImage: `url(${MOB5})` }}></div>
            <div className="gallery__item gallery__itemX" style={{ backgroundImage: `url(${MOB6})` }}></div>
            <div className="caption">
              <p>AI-generated art captivates with varied creations, sometimes senseless, yet impressively enigmatic.</p>
            </div>
          </div>
        </div>

        <div className="gallery-wrap">
          <div
            className="gallery gallery--bento"
            id="gallery-8"
            ref={el => (galleryRefs.current["gallery-8"] = el)}
          >
            <div className="gallery__item" style={{ backgroundImage: 'url(https://www.arjivexports.com/static/media/mine-source.9b21a7dbfb73c4d75d9d.jpg)' }}></div>
            <div className="gallery__item" style={{ backgroundImage: 'url(https://www.arjivexports.com/static/media/Employee.65a4bbd9b511cc6247a8.jpg)' }}></div>
            <div className="gallery__item" style={{ backgroundImage: 'url(https://www.arjivexports.com/static/media/building.e1fd47024ce2842d6ab7.jpg)' }}></div>
            <div className="gallery__item" style={{ backgroundImage: 'url(https://www.arjivexports.com/static/media/Craftsmanship.1e062281399ef37d83ea.jpg)' }}></div>
            <div className="gallery__item" style={{ backgroundImage: 'url(https://www.arjivexports.com/static/media/Tailored.6c5fcc7fff7dd8b29c88.jpg)' }}></div>
            <div className="gallery__item" style={{ backgroundImage: 'url(https://www.arjivexports.com/static/media/Modification.0960eb215b57278e88b6.jpg)' }}></div>
            <div className="gallery__item" style={{ backgroundImage: 'url(https://www.arjivexports.com/static/media/grading.e5f8707fdcb7b791c97b.jpg)' }}></div>
            <div className="gallery__item" style={{ backgroundImage: 'url(https://www.arjivexports.com/static/media/Delivery.a7712148e2c055d9ddd1.jpg)' }}></div>
            <div className="caption">Perfect Imperfections</div>
          </div>
        </div>

        <div className="gallery-wrap">
          <div
            className="gallery gallery--one"
            id="gallery-9"
            ref={el => (galleryRefs.current["gallery-9"] = el)}
          >
            <div className="gallery__item" style={{ backgroundImage: 'url(https://www.arjivexports.com/static/media/building.e1fd47024ce2842d6ab7.jpg)' }}></div>
            <div className="caption">Excellence & Proficiency</div>
          </div>
        </div>
      </main>
    </>
  );
};

export default ScrollAnimationGallery;