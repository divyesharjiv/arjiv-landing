import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "./csr.css";
import Lenis from "@studio-freight/lenis";

gsap.registerPlugin(ScrollTrigger);

const SEC_IMG = [
  {
    1: [
      "https://plus.unsplash.com/premium_photo-1728900116066-353260c053c1?q=80&w=1228&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      "https://plus.unsplash.com/premium_photo-1728940153866-35e9ef596e0f?q=80&w=1112&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      "https://plus.unsplash.com/premium_photo-1728786029941-e932df7039ca?q=80&w=1309&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    ],
  },
  {
    2: [
      "https://images.unsplash.com/photo-1639772823849-6efbd173043c?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      "https://images.unsplash.com/photo-1615461066841-6116e61058f4?q=80&w=1283&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      "https://images.unsplash.com/photo-1615461066159-fea0960485d5?q=80&w=1316&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    ],
  },
  {
    3: [
      "https://images.unsplash.com/photo-1520412099551-62b6bafeb5bb?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      "https://images.unsplash.com/photo-1611588696789-9b58977ebab1?q=80&w=764&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      "https://images.unsplash.com/photo-1694424920129-d016083abf43?q=80&w=765&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    ],
  },
  {
    4: [
      "https://plus.unsplash.com/premium_photo-1661964254951-e8032df3faa4?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      "https://plus.unsplash.com/premium_photo-1661964303316-a8118ace3daf?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      "https://plus.unsplash.com/premium_photo-1744528608325-f1a31dcf0248?q=80&w=735&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    ],
  },
  {},
];

const sections = [
  {
    id: "01",
    title: "Powering a Sustainable Future",
    hashtag: "#CommittedToSaveEnergy",
    lines: [
      "Our state-of-the-art solar system installation demonstrates our commitment to renewable energy and reducing our carbon footprint in diamond manufacturing.",
    ],
  },
  {
    id: "02",
    title: "Life Flows Through Us",
    hashtag: "#LearningForAll",
    lines: [
      "Regular blood donation camps organized by our company bring employees together to contribute to community healthcare and save lives.",
    ],
  },
  {
    id: "03",
    title: "Growing Together, Naturally",
    hashtag: "#WellnessForAll",
    lines: [
      "We participate in tree planting initiatives help combat climate change while creating green spaces for future generations. Every sapling represents our promise to environmental stewardship.",
    ],
  },
  {
    id: "04",
    title: "Reaching New Heights",
    hashtag: "#SkillsAndWork",
    lines: [
      "Company-organized Mountain trekking expeditions build leadership, teamwork, and resilience while connecting our team with nature.",
    ],
  },
];

const CSR = () => {
  const containerRef = useRef(null);

//   useEffect(() => {
//     const ctx = gsap.context(() => {
//       gsap.from(".csr-hero h1", {
//         opacity: 0,
//         y: 60,
//         skewX: -20,
//         duration: 1.4,
//         stagger: 0.4,
//         ease: "power4.inOut",
//       });

//       gsap.from(".csr-hero p", {
//         filter: "blur(50px)",
//         yPercent: -100,
//         duration: 0.5,
//         delay: 1,
//         ease: "power1",
//       });

//       gsap.from(".csr-hero img", {
//         filter: "blur(100px)",
//         opacity: 0.2,
//         yPercent: 10,
//         scale: 0.75,
//         duration: 2,
//         delay: 1.3,
//         ease: "expo",
//       });

//       gsap.utils.toArray(".csr-section").forEach((sec, i) => {
//         const title = sec.querySelector(".csr-title");
//         const hashtag = sec.querySelector(".csr-hashtag");

//         gsap.fromTo(
//           title,
//           { clipPath: "circle(0% at 50% 50%)", opacity: 0 },
//           {
//             clipPath: "circle(150% at 50% 50%)",
//             opacity: 1,
//             duration: 2,
//             ease: "power4.inOut",
//             scrollTrigger: { trigger: sec, start: "top 75%" },
//           }
//         );

//         gsap.fromTo(
//           hashtag,
//           {
//             opacity: 0.1,
//             y: 30,
//           },
//           {
//             opacity: 1,
//             y: 0,
//             duration: 0.5,
//             ease: "sine",
//             stagger: 0.1,
//             scrollTrigger: { trigger: sec, start: "top 75%" },
//             delay: 1,
//           }
//         );

//         const multiLines = document.querySelectorAll(".csr-line");
//         multiLines.forEach((line) => {
//           const letters = line.textContent.split("");
//           line.innerHTML = letters
//             .map((l) => `<span class="char">${l}</span>`)
//             .join("");

//           gsap.from(line.querySelectorAll(".char"), {
//             opacity: 0.15,
//             duration: 0.5,
//             stagger: 0.02,
//             ease: "sine",
//             scrollTrigger: { trigger: line, start: "top 75%" },
//           });
//         });
//       });
      

//       gsap.utils.toArray(".csr-section").forEach((sec) => {
//   const images = sec.querySelectorAll(".csr-img");

//   images.forEach((img) => {
//     // RANDOM SPEED & MOVEMENT
//     const moveSpeed = gsap.utils.random(150, 450);   // fast upward movement
//     const moveX = gsap.utils.random(-30, 30);        // slight left/right drift
//     const duration = gsap.utils.random(1, 2.5);      // unique speed timing
//     const delay = gsap.utils.random(0, 0.3);         // slight delay randomness
//     const easeType = gsap.utils.random([
//       "power1.out",
//       "power2.out",
//       "power3.out",
//       "expo.out",
//     ]);

//     // ENTER ANIMATION
//     gsap.fromTo(
//       img,
//       {
//         opacity: 0,
//         y: gsap.utils.random(60, 120), // start lower
//         x: gsap.utils.random(-20, 20),
//         scale: 0.9,
//       },
//       {
//         opacity: 1,
//         y: -moveSpeed, // move up FAST
//         x: moveX,
//         scale: 1,
//         ease: easeType,
//         duration,
//         delay,
//         scrollTrigger: {
//           trigger: sec,
//           start: "top 85%",
//           end: "bottom 20%",
//           scrub: true,
//         },
//       }
//     );

//     // EXIT WHEN SCROLL DOWN (hide)
//     gsap.to(img, {
//       opacity: 0,
//       y: -moveSpeed - 120,
//       ease: "power1.inOut",
//       scrollTrigger: {
//         trigger: sec,
//         start: "bottom 35%",
//         end: "bottom 10%",
//         scrub: true,
//       },
//     });

//     // HIDE AGAIN WHEN REACH TOP (reverse scroll)
//     gsap.to(img, {
//       opacity: 0,
//       y: gsap.utils.random(40, 120), // reset near start
//       ease: "power1.out",
//       scrollTrigger: {
//         trigger: sec,
//         start: "top 100%", // when scrolling back up
//         end: "top 80%",
//         scrub: true,
//       },
//     });
//   });
// });




//     }, containerRef);

//     return () => ctx.revert();
//   }, []);

  useEffect(() => {
    // LENIS SETUP ---------------------------
    const lenis = new Lenis({
      duration: 1.4,
      easing: (t) => 1 - Math.pow(1 - t, 3),
      smooth: true,
      touchMultiplier: 1.5,
    });

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    lenis.on("scroll", ScrollTrigger.update);

    // GSAP CONTEXT --------------------------
    const ctx = gsap.context(() => {

      // HERO --------------------------------
      gsap.from(".csr-hero h1", {
        opacity: 0,
        y: 60,
        skewX: -20,
        duration: 1.4,
        stagger: 0.4,
        ease: "power4.inOut",
      });

      gsap.from(".csr-hero p", {
        filter: "blur(50px)",
        yPercent: -100,
        duration: 0.5,
        delay: 1,
        ease: "power1",
      });

      gsap.from(".csr-hero img", {
        filter: "blur(100px)",
        opacity: 0.2,
        yPercent: 10,
        scale: 0.75,
        duration: 2,
        delay: 1.3,
        ease: "expo",
      });

      // SECTION TITLES --------------------------------
      gsap.utils.toArray(".csr-section").forEach((sec) => {
        const title = sec.querySelector(".csr-title");
        const hashtag = sec.querySelector(".csr-hashtag");

        gsap.fromTo(
          title,
          { clipPath: "circle(0% at 50% 50%)", opacity: 0 },
          {
            clipPath: "circle(150% at 50% 50%)",
            opacity: 1,
            duration: 1.8,
            ease: "power4.inOut",
            scrollTrigger: {
              trigger: sec,
              start: "top 75%",
              scrub: 2.5,
            },
          }
        );

        gsap.fromTo(
          hashtag,
          { opacity: 0.1, y: 30 },
          {
            opacity: 1,
            y: 0,
            duration: 0.5,
            ease: "sine",
            scrollTrigger: {
              trigger: sec,
              start: "top 75%",
              scrub: 2.5,
            },
          }
        );
      });

      // LETTER ANIMATION --------------------------------
      document.querySelectorAll(".csr-line").forEach((line) => {
        const letters = line.textContent.split("");
        line.innerHTML = letters.map((l) => `<span class="char">${l}</span>`).join("");

        gsap.from(line.querySelectorAll(".char"), {
          opacity: 0.15,
          duration: 0.5,
          stagger: 0.02,
          ease: "sine",
          scrollTrigger: {
            trigger: line,
            start: "top 75%",
            scrub: 2.5,
          },
        });
      });

      // IMAGE RANDOM MOTION --------------------------------
      gsap.utils.toArray(".csr-section").forEach((sec) => {
  const images = sec.querySelectorAll(".csr-img");

  images.forEach((img) => {
    // SUPER UNIQUE SPEED LAYERS
    const speedY = gsap.utils.random(150, 600);       // upward movement
    const speedX = gsap.utils.random(-50, 50);        // sideways drift
    const startOffset = gsap.utils.random(40, 180);   // initial placement
    const scaleFrom = gsap.utils.random(0.85, 0.95);  // subtle zoom
    const easeType = gsap.utils.random(["power2.out", "expo.out"]);
    const duration = gsap.utils.random(1.4, 3);
    const delay = gsap.utils.random(0, 0.3);

    // ENTER (scroll down)
    gsap.fromTo(
      img,
      {
        opacity: 0,
        y: startOffset,
        x: gsap.utils.random(-20, 20),
        scale: scaleFrom,
      },
      {
        opacity: 1,
        y: -speedY,
        x: speedX,
        scale: 1,
        ease: easeType,
        duration,
        delay,
        scrollTrigger: {
          trigger: sec,
          start: "top 85%",
          end: "bottom 40%",
          scrub: 2.5,
        },
      }
    );

    // EXIT (scroll down bottom)
    gsap.fromTo(
      img,
      { opacity: 1 },
      {
        opacity: 0,
        ease: "power1.inOut",
        scrollTrigger: {
          trigger: sec,
          start: "bottom 35%",
          end: "bottom 10%",
          scrub: 2.5,
        },
      }
    );

    // FIX: SMOOTH REVERSE ENTER (scroll up) — prevents hidden bug
    gsap.fromTo(
      img,
      {
        opacity: 0,
        y: startOffset,
      },
      {
        opacity: 1,
        y: -speedY * 0.4,   // slower on reverse direction
        ease: "power2.out",
        scrollTrigger: {
          trigger: sec,
          start: "top 95%",
          end: "top 60%",
          scrub: 2.5,
        },
      }
    );
  });
});

    }, containerRef);

    return () => ctx.revert();
  }, []);


  return (
    <main className="CSR" ref={containerRef}>
      <div className="csr-hero">
        <div className="flex flex-col px-5">
          <div>
            <h1 className="uppercase text-8xl leading-32 my-4">
              Corporate Social
            </h1>
            <h1 className="uppercase text-8xl leading-32 my-4 text-end">
              Responsibilities
            </h1>
          </div>

          <p className="max-w-md leading-7 tracking-wide italic text-base">
            We’re committed to creating meaningful, lasting impact. Through
            sustainable practices, community support initiatives, and
            responsible business operations, we work to protect the environment,
            uplift people, and contribute to a better future.
          </p>

          <img
            src="https://images.unsplash.com/photo-1729431407052-3a941313eb70?q=80&w=1332&auto=format&fit=crop"
            loading="lazy"
            alt=""
            className="mt-14 rounded-xl max-h-[550px] object-cover object-top"
          />
        </div>
      </div>

      <div className="sticky-content-section sticky top-0 min-h-svh bg-cover bg-top">
        <div className="main-text-change-section relative">
          {sections.map((item, index) => {
            const imageGroup = Object.values(SEC_IMG[index] || {})[0] || [];

            return (
              <div
                // className="csr-section relative py-10 px-5 mb-24 overflow-visible h-screen"
                className="csr-section relative h-[180vh] overflow-visible"
                key={item.id}
              >
                {/* TEXT CONTENT */}
                {/* <div className="relative z-20 flex flex-col items-center justify-center">
                  <div className="my-5 text-base font-medium">{item.id}</div>

                  <h2 className="csr-title text-4xl text-center uppercase">
                    {item.title}
                  </h2>

                  <span className="csr-hashtag mt-2 text-base italic underline lowercase">
                    {item.hashtag}
                  </span>

                  {item.lines.map((text, i) => (
                    <p
                      key={i}
                      className="csr-line max-w-xl mt-10 text-lg leading-8 text-gray-700 text-center"
                    >
                      {text}
                    </p>
                  ))}
                </div> */}
                <div className="csr-content sticky top-0 h-screen flex flex-col items-center justify-center px-5 relative z-20">
    <div className="my-5 text-base font-medium">{item.id}</div>

    <h2 className="csr-title text-4xl text-center uppercase">
      {item.title}
    </h2>

    <span className="csr-hashtag mt-2 text-base italic underline lowercase">
      {item.hashtag}
    </span>

    {item.lines.map((text, i) => (
      <p
        key={i}
        className="csr-line max-w-xl mt-10 text-lg leading-8 text-gray-700 text-center"
      >
        {text}
      </p>
    ))}
  </div>

                <div className="absolute inset-0 pointer-events-none">
                  {/* IMAGE 1 */}
                  {imageGroup[0] && (
                    <img
                      src={imageGroup[0]}
                      alt=""
                      className="csr-img absolute top-10 left-10 w-[320px] h-[270px] object-cover"
                    />
                  )}

                  {/* IMAGE 2 */}
                  {imageGroup[1] && (
                    <img
                      src={imageGroup[1]}
                      alt=""
                      className="csr-img absolute top-3/4 left-40 w-[460px] h-[350px] -translate-y-1/2 object-cover"
                    />
                  )}

                  {/* IMAGE 3 */}
                  {imageGroup[2] && (
                    <img
                      src={imageGroup[2]}
                      alt=""
                      className="csr-img absolute top-[120px] right-10 w-[460px] h-[350px] object-cover"
                    />
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </main>
  );
};

export default CSR;
