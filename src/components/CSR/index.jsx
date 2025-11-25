import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "./csr.css";
import Lenis from "@studio-freight/lenis";

gsap.registerPlugin(ScrollTrigger);

const SEC_IMG = [
  {
    1: [
      "https://www.arjivexports.com/static/media/green-energy.c95f187010b49be4cf92.jpg",
      "https://plus.unsplash.com/premium_photo-1679917152396-4b18accacb9d?q=80&w=627&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      "https://images.unsplash.com/photo-1723133371535-1412bc2e412e?q=80&w=627&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    ],
  },
  {
    2: [
      "https://www.arjivexports.com/static/media/blood-camp.36c3e8c9f901e1eb9a70.jpg",
      "https://plus.unsplash.com/premium_photo-1731680211828-2c4c30c8647a?q=80&w=1171&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      "https://images.unsplash.com/photo-1615461065929-4f8ffed6ca40?q=80&w=1329&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    ],
  },
  {
    3: [
      "https://www.arjivexports.com/static/media/tree-planting.ae84bca55fb6e6f2d4a6.webp",
      "https://images.unsplash.com/photo-1622383563227-04401ab4e5ea?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      "https://plus.unsplash.com/premium_photo-1681965550198-c1c039421905?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    ],
  },
  {
    4: [
      "https://images.unsplash.com/photo-1607494628003-613b464734e7?q=80&w=1015&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      "https://www.arjivexports.com/static/media/sports.07e7c8b169351c1d5d07.jpg",
      "https://images.unsplash.com/photo-1624193757636-b829dfa06a1b?q=80&w=1248&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    ],
  },
  {
    5: [
      "https://images.unsplash.com/photo-1461237439866-5a557710c921?q=80&w=1173&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      "https://images.unsplash.com/photo-1762696782497-2b39df0f4523?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      "https://www.arjivexports.com/static/media/expeditions.c91941625e0fcc0a7ea1.jpg",
    ],
  },
  {},
];

const sections = [
  {
    id: "01",
    title: "Powering a Sustainable Future",
    hashtag: "#RenewableEnergy",
    lines: [
      "Our state-of-the-art solar system installation demonstrates our commitment to renewable energy and reducing our carbon footprint in diamond manufacturing.",
    ],
  },
  {
    id: "02",
    title: "Life Flows Through Us",
    hashtag: "#BloodDonation",
    lines: [
      "Regular blood donation camps organized by our company bring employees together to contribute to community healthcare and save lives.",
    ],
  },
  {
    id: "03",
    title: "Growing Together, Naturally",
    hashtag: "#TreePlantation",
    lines: [
      "We participate in tree planting initiatives help combat climate change while creating green spaces for future generations. Every sapling represents our promise to environmental stewardship.",
    ],
  },
  {
    id: "04",
    title: "Championship Spirit",
    hashtag: "#TeamSpirit",
    lines: [
      "Annual cricket tournaments foster team spirit and healthy competition among our employees, promoting wellness and camaraderie beyond the workplace.",
    ],
  },
  {
    id: "05",
    title: "Reaching New Heights",
    hashtag: "#TeamBuilding",
    lines: [
      "Company-organized Mountain trekking expeditions build leadership, teamwork, and resilience while connecting our team with nature.",
    ],
  },
];

const CSR = () => {
  const containerRef = useRef(null);

  useEffect(() => {
    const lenis = new Lenis({
      lerp: 0.06, // super smooth (lower = smoother)
      smooth: true,
      wheelMultiplier: 1.2,
      touchMultiplier: 1.2,
    });

    function raf(time) {
      lenis.raf(time);
      ScrollTrigger.update();
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    ScrollTrigger.scrollerProxy(document.body, {
      scrollTop(value) {
        return arguments.length
          ? lenis.scrollTo(value, { immediate: true })
          : lenis.scroll;
      },
      getBoundingClientRect() {
        return {
          top: 0,
          left: 0,
          width: window.innerWidth,
          height: window.innerHeight,
        };
      },
    });
    const ctx = gsap.context(() => {
      gsap.from(".csr-hero h1", {
        opacity: 0,
        y: 35,
        skewX: -10,
        duration: 1.8,
        stagger: 0.5,
        ease: "power3.out",
      });

      gsap.from(".csr-hero p", {
        opacity: 0,
        filter: "blur(25px)",
        yPercent: -40,
        duration: 1.4,
        delay: 1,
        ease: "power2.out",
      });

      gsap.from(".csr-hero img", {
        opacity: 0.25,
        filter: "blur(60px)",
        yPercent: 10,
        scale: 0.9,
        duration: 2.5,
        delay: 1.2,
        ease: "power3.out",
      });

      gsap.utils.toArray(".csr-section").forEach((sec) => {
        const content = sec.querySelector(".sticky");

        gsap.fromTo(
          content,
          { opacity: 0, scale: 0.98, filter: "blur(6px)" },
          {
            opacity: 1,
            scale: 1,
            filter: "blur(0px)",
            duration: 1.6,
            ease: "power2.out",
            scrollTrigger: {
              trigger: sec,
              start: "top 75%",
              toggleActions: "play reverse play reverse",
            },
          }
        );

        gsap.to(content, {
          opacity: 0,
          scale: 0.8,
          filter: "blur(12px)",
          duration: 1.6,
          ease: "power2.inOut",
          scrollTrigger: {
            trigger: sec,
            start: "bottom 30%",
          },
        });
      });

      const detailsCSR = document.querySelectorAll(".csr-details");

      detailsCSR.forEach((line) => {
        const letters = line.textContent.split("");
        line.innerHTML = letters
          .map((l) => `<span class="char">${l}</span>`)
          .join("");

        gsap.from(line.querySelectorAll(".char"), {
          opacity: 0,
          y: 5,
          duration: 0.1,
          stagger: 0.01,
          ease: "sine.out",
          scrollTrigger: {
            trigger: line,
            start: "top 80%",
          },
        });
      });

      gsap.utils.toArray(".csr-section").forEach((sec) => {
        const images = sec.querySelectorAll(".csr-img");

        images.forEach((img) => {
          // UNIQUE LAYERS
          const speedY = gsap.utils.random(-80, 150);
          const speedX = gsap.utils.random(0, 0);
          const startOffset = gsap.utils.random(150, 220);
          const scaleFrom = gsap.utils.random(0.2, 1.3);
          const easeType = gsap.utils.random(["power2.out", "expo.out"]);
          const duration = gsap.utils.random(0.9, 2);
          const delay = gsap.utils.random(0, 0.7);

          gsap.fromTo(
            img,
            {
              y: startOffset,
              x: gsap.utils.random(0, 20),
              scale: scaleFrom,
            },
            {
              y: -speedY,
              x: speedX,
              scale: 1,
              ease: easeType,
              duration,
              delay,
              scrollTrigger: {
                trigger: sec,
                start: "top 50%",
                end: "bottom 0%",
                scrub: 2.5,
              },
            }
          );
        });
      });
    }, containerRef);

    // bg change
    const CSR_BG = document.querySelector(".csr-fixed-layer");
    CSR_BG.style.backgroundColor = "#F5F5F5";
    gsap
      .timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "bottom bottom",
          scrub: 2,
        },
      })
      .to(CSR_BG, { backgroundColor: "#fff6e9", duration: 1 })
      .to(CSR_BG, { backgroundColor: "#FFECEF", duration: 1 })
      .to(CSR_BG, { backgroundColor: "#F0FFFA", duration: 1 })
      .to(CSR_BG, { backgroundColor: "#fffde8", duration: 1 })
      .to(CSR_BG, { backgroundColor: "#e4edff", duration: 1 });

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

      <div className="csr-content-section sticky top-0 bg-cover bg-top">
        <div class="csr-fixed-layer"></div>
        <div className="main-text-change-section relative z-10 overflow-hidden">
          {sections.map((item, index) => {
            const imageGroup = Object.values(SEC_IMG[index] || {})[0] || [];

            return (
              <div
                // className="csr-section relative py-10 px-5 mb-24 overflow-visible h-screen"
                className="csr-section relative h-[150vh] overflow-visible"
                key={item.id}
              >
                <div className="csr-content sticky top-0 h-lvh flex flex-col items-center justify-center px-5 z-20 mx-auto max-w-2xl text-gray-700">
                  <div className="my-5 text-6xl font-medium">✴</div>

                  <h2 className="csr-title text-4xl text-center uppercase !font-[serif]">
                    {item.title}
                  </h2>

                  <span className="csr-hashtag mt-2 text-base italic underline lowercase">
                    {item.hashtag}
                  </span>

                  {item.lines.map((text, i) => (
                    <p
                      key={i}
                      className="csr-details max-w-xl mt-10 text-lg leading-8 text-center"
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
                      className="csr-img shadow-xl absolute top-30 left-10 w-[320px] h-[270px] object-cover"
                    />
                  )}

                  {/* IMAGE 2 */}
                  {imageGroup[1] && (
                    <img
                      src={imageGroup[1]}
                      alt=""
                      className="csr-img shadow-xl absolute top-1/2 left-40 w-[460px] h-[350px] -translate-y-1/2 object-cover"
                    />
                  )}

                  {/* IMAGE 3 */}
                  {imageGroup[2] && (
                    <img
                      src={imageGroup[2]}
                      alt=""
                      className="csr-img shadow-xl absolute top-[120px] right-10 w-[460px] h-[350px] object-cover"
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
