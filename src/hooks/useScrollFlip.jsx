import { useEffect } from "react";
import { gsap } from "gsap";
import { Flip } from "gsap/Flip";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(Flip, ScrollTrigger);

export default function useScrollFlip(ref, options = {}) {
  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const items = el.querySelectorAll(".gallery__item");
    const caption = el.querySelector(".caption");

    // Collect state
    el.classList.add("gallery--switch");
    const state = Flip.getState([items, caption], { props: "filter, opacity" });
    el.classList.remove("gallery--switch");

    Flip.to(state, {
      ease: "none",
      scale: options.scale ?? true,
      absolute: options.absolute ?? false,
      absoluteOnLeave: options.absoluteOnLeave ?? false,
      simple: true,
      scrollTrigger: {
        trigger: el,
        start: options.start || "center center",
        end: options.end || "+=300%",
        pin: options.pin ?? true,
        scrub: options.scrub || 1.5
      }
    });

    return () => {
      ScrollTrigger.getAll().forEach(t => t.kill());
    };
  }, []);
}
