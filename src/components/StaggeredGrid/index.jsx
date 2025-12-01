import React, { useEffect, useRef } from "react";
import "./style.css"; // only namespaced .sg- rules (no global leak)

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "@studio-freight/lenis";

gsap.registerPlugin(ScrollTrigger);

const NUM_FULL_ITEMS = 45; // full grid count
const IMAGE_VARIANTS = 13; // how many different images you have in /public/img

export default function StaggeredGrid() {
  const rootRef = useRef(null);
  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    /* ------------------ Lenis Smooth Scroll ------------------ */
    const lenis = new Lenis({ lerp: 0.04, smoothWheel: true, duration: 1.2, smooth: true });
    function raf(t) {
      lenis.raf(t);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    /* ------------------ Full Grid Parallax ------------------ */
    const grid = root.querySelector(".sg-grid--full");
    if (grid) {
      const items = Array.from(grid.querySelectorAll(".sg-grid-item"));

      // detect number of columns
      const computedCols = getComputedStyle(grid).getPropertyValue(
        "grid-template-columns"
      );
      const colCount = computedCols.trim().split(/\s+/).length;

      // group items by column
      const columns = Array.from({ length: colCount }, () => []);
      items.forEach((item, index) => {
        const col = index % colCount;
        columns[col].push(item);
      });

      // center column index
      const center = Math.floor(colCount / 2);

      columns.forEach((colItems, colIndex) => {
        const distance = Math.abs(colIndex - center);

        // columns farther away move more
        const speed = 30 + distance * 550;

        gsap.fromTo(
          colItems,
          { y: speed },
          {
            y: -speed,
            ease: "sine.inOut",
            scrollTrigger: {
              trigger: grid,
              start: "top bottom",
              end: "bottom top",
              scrub: 2,
            },
          }
        );
      });
    }

    /* ------------------ Cleanup ------------------ */
    return () => {
      ScrollTrigger.getAll().forEach((st) => st.kill());
      lenis.destroy();
    };
  }, []);

  return (
    <main ref={rootRef} className="sg-root relative w-full overflow-hidden ">
      {/* <section className="h-screen flex flex-col gap-4 items-center justify-center uppercase">
        <h2 className="text-6xl mb-4">what we do </h2>
        <p className="text-2xl">SCROLL DOWN TO EXPLORE</p>
      </section> */}
      <section className="sg-section px-4 pb-20">
        <div className="sg-grid--full grid grid-cols-2 md:grid-cols-5 gap-3">
          {Array.from({ length: NUM_FULL_ITEMS }).map((_, i) => {
            const imgIdx = (i % IMAGE_VARIANTS) + 1;
            // const url = `/img/custom/${imgIdx}.jpg`;
            const url = `/images/${imgIdx}.jpg`;
            return (
              <div className="sg-grid-item" key={`full-${i}`}>
                <div
                  className="sg-grid-item-img will-change-transform bg-center bg-cover w-full min-h-96"
                  data-bg={url}
                  style={{ backgroundImage: `url(${url})` }}
                  aria-hidden="true"
                />
              </div>
            );
          })}
        </div>
      </section>
    </main>
  );
}
