import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "@studio-freight/lenis";
import "./style.scss";

gsap.registerPlugin(ScrollTrigger);

const EVENTS_DATA = [
  {
    image:
      "https://www.arjivexports.com/static/media/jwlArabia.828cbfacb7c5bea1512f.jpg",
    title: "JWL",
    description: "Little trees and bushes grow however makes them happy.",
    position: "left",
  },
  {
    image:
      "https://www.arjivexports.com/static/media/miami.f82f5ddaa8a9c6cac51d.jpg",
    title: "MIAMI",
    description: "Little trees and bushes grow however makes them happy.",
    position: "center",
  },
  {
    image:
      "https://www.arjivexports.com/static/media/gemGenve.3dba40df4411bd168ee3.jpg",
    title: "GG",
    description: "We don't have to be committed. We are just playing here.",
    position: "right",
  },
  {
    image:
      "https://www.arjivexports.com/static/media/jwlgemSingapore.1b49d8787e216d4765bd.jpg",
    title: "JGAHK",
    description: "I thought today we would do a happy little picture.",
    position: "center",
  },
  {
    image:
      "https://www.arjivexports.com/static/media/jwlArabia.828cbfacb7c5bea1512f.jpg",
    title: "JAB",
    description: "Nature is so fantastic, enjoy it. Let it make you happy.",
    position: "left",
  },
  {
    image:
      "https://www.arjivexports.com/static/media/iijs.8ad2a1cad41bc0461ef8.jpg",
    title: "IIJS",
    description: "We need a shadow side and a highlight side.",
    position: "right",
  },
  {
    image:
      "https://www.arjivexports.com/static/media/jck.9a9939aee0822612daf4.jpg",
    title: "JCK",
    description: "We'll put some happy little leaves here and there.",
    position: "center",
  },
  {
    image:
      "https://www.arjivexports.com/static/media/vicenzaoro.8a9ee3c68777be3c736e.jpg",
    title: "VO",
    description: "With something so strong, a little bit can go a long way.",
    position: "left",
  },
  {
    image:
      "https://www.arjivexports.com/static/media/hktdc.f59d6888bf94aec6f99c.jpg",
    title: "HKDTC",
    description: "There are no limits in this world.",
    position: "right",
  },
];

export default function SmoothScrollingEffects() {
  const rootRef = useRef(null);

  useEffect(() => {
    const lenis = new Lenis({ smooth: true, lerp: 0.07 });

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    const ctx = gsap.context(() => {
      const items = gsap.utils.toArray(".eventCard");

      items.forEach((item) => {
        const img = item.querySelector(".eventImage");
        const title = item.querySelector(".eventTitle");
        const desc = item.querySelector(".eventDescription");
        const number = item.querySelector(".eventNumber");

        const randomY = gsap.utils.random(40, 300);

        gsap.fromTo(
          img,
          {
            scale: 1,
            y: 0,
            rotate: 0,
            filter: "brightness(0.7) contrast(0.9)",
          },
          {
            scale: 0.6,
            y: 80,
            filter: "brightness(1) contrast(1)",
            ease: "none",
            scrollTrigger: {
              trigger: item,
              start: "top bottom",
              end: "100%",
              scrub: true,
            },
          }
        );

        gsap.fromTo(
          title,
          { y: randomY, opacity: 0, z: -100 },
          {
            y: -randomY,
            opacity: 1,
            z: 0,
            ease: "none",
            scrollTrigger: {
              trigger: item,
              start: "top 90%",
              end: "bottom top",
              scrub: true,
            },
          }
        );

        gsap.fromTo(
          desc,
          { opacity: 0, y: 40 },
          {
            opacity: 1,
            y: 0,
            ease: "power2.out",
            scrollTrigger: {
              trigger: item,
              start: "top 80%",
              end: "top 60%",
              scrub: true,
            },
          }
        );

        gsap.fromTo(
          number,
          { rotate: -45, opacity: 0 },
          {
            rotate: 0,
            opacity: 0.05,
            ease: "power1.out",
            scrollTrigger: {
              trigger: item,
              start: "top 85%",
              end: "top 60%",
              scrub: true,
            },
          }
        );
      });

      ScrollTrigger.refresh();
    }, rootRef);

    return () => {
      ctx.revert();
      lenis.destroy();
    };
  }, []);

  return (
    <div className="eventsSectionRoot" ref={rootRef}>
      <div className="eventsList">
        {EVENTS_DATA.map((item, index) => (
          <div className="eventCard" data-position={item.position} key={index}>
            <span className="eventNumber">
              {String(index + 1).padStart(2, "0")}
            </span>

            <div className="eventImageWrap">
              <div
                className="eventImage"
                style={{ backgroundImage: `url(${item.image})` }}
              />
            </div>

            <h2 className="eventTitle">{item.title}</h2>
            <p className="eventDescription">{item.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
