import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import SplitType from "split-type";
import { Link } from "react-router-dom";

const Navigation = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navBottomRef = useRef(null);
  const openTimelineRef = useRef(null);
  const closeTimelineRef = useRef(null);
  const splitInstancesRef = useRef({ top: [], bottom: [] });

  useEffect(() => {
    const initAnimations = () => {
      const navBottom = navBottomRef.current;
      const linksImgWrapper = document.querySelectorAll(
        '[data-nav="link-img"]'
      );
      const linksImg = document.querySelectorAll('[data-nav="link-img"] img');
      const navTopLinks = document.querySelectorAll('[data-nav="top-link"]');
      const navBottomLinks = document.querySelectorAll(
        '[data-nav="bottom-link"]'
      );
      const allNavLines = document.querySelectorAll('[data-nav="bottom-line"]');
      const navMenuLines = document.querySelectorAll('[data-nav="menu-line"]');
      const heroTexts = document.querySelectorAll('[data-hero="text"]');

      // Create split animations
      splitInstancesRef.current.bottom = Array.from(
        navBottomLinks,
        (n) => new SplitType(n, { types: "chars,words,lines" })
      );

      splitInstancesRef.current.top = Array.from(
        navTopLinks,
        (n) => new SplitType(n, { types: "chars" })
      );

      // Initial setup
      gsap.set(navBottom, { display: "flex" });
      gsap.set(linksImgWrapper, {
        clipPath: (index) =>
          index % 2 === 1 ? "inset(0% 100% 0% 0%)" : "inset(0% 0% 0% 100%)",
      });

      // Top link hover animations
      navTopLinks.forEach((link, index) => {
        const chars = splitInstancesRef.current.top[index].chars;
        const staggerFrom = index % 2 === 0 ? "start" : "end";

        link.addEventListener("mouseenter", () => {
          gsap.to(chars, {
            y: "-100%",
            stagger: { each: 0.02, from: staggerFrom },
            duration: 0.5,
            ease: "power2.out",
          });
        });

        link.addEventListener("mouseleave", () => {
          gsap.to(chars, {
            y: 0,
            stagger: { each: 0.02, from: staggerFrom },
            duration: 0.5,
            ease: "power2.out",
          });
        });
      });

      // Bottom link hover animations
      navBottomLinks.forEach((link, index) => {
        const chars = splitInstancesRef.current.bottom[index].chars;
        const staggerFrom = index % 2 === 0 ? "start" : "end";

        link.addEventListener("mouseenter", () => {
          const tl = gsap.timeline();
          tl.to(chars, {
            y: "-100%",
            stagger: { each: 0.02, from: staggerFrom },
            duration: 0.6,
            ease: "power2.out",
          })
            .to(
              [linksImgWrapper[2 * index], linksImgWrapper[2 * index + 1]],
              {
                clipPath: "inset(0% 0% 0% 0%)",
                duration: 0.8,
                ease: "expo.out",
              },
              0.1
            )
            .fromTo(
              [linksImg[2 * index], linksImg[2 * index + 1]],
              { scale: 1.4 },
              {
                scale: 1,
                duration: 1.2,
                ease: "expo.out",
              },
              0.1
            );
        });

        link.addEventListener("mouseleave", () => {
          const tl = gsap.timeline();
          tl.to(chars, {
            y: 0,
            stagger: { each: 0.02, from: staggerFrom },
            duration: 0.6,
            ease: "power2.out",
          }).to(
            [linksImgWrapper[2 * index], linksImgWrapper[2 * index + 1]],
            {
              clipPath: (i) =>
                i % 2 === 1 ? "inset(0% 100% 0% 0%)" : "inset(0% 0% 0% 100%)",
              duration: 0.8,
              ease: "expo.out",
            },
            0.1
          );
        });
      });

      // Open animation timeline
      openTimelineRef.current = gsap
        .timeline({ paused: true })
        .fromTo(
          navBottom,
          { clipPath: "inset(0 0 100% 0)" },
          {
            clipPath: "inset(0 0 0% 0)",
            duration: 1.4,
            ease: "expo.inOut",
          }
        )
        .from(
          allNavLines,
          {
            scaleX: 0,
            transformOrigin: (index) => (index % 2 === 1 ? "right" : "left"),
            duration: 1.2,
            ease: "expo.inOut",
            stagger: 0.1,
          },
          0.3
        )
        .fromTo(
          splitInstancesRef.current.bottom.map((x) => x.lines[0]),
          { y: "120%", opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 1.3,
            ease: "expo.out",
            stagger: 0.08,
          },
          0.4
        )
        .to(
          navTopLinks,
          {
            color: "#1e1d1a",
            duration: 0.3,
          },
          0.6
        )
        .to(
          navMenuLines,
          {
            backgroundColor: "#1e1d1a",
            duration: 0.2,
          },
          0.6
        )
        .to(
          navMenuLines[0],
          {
            rotation: 45,
            y: 5,
            duration: 0.4,
            ease: "back.out(1.7)",
          },
          0.6
        )
        .to(
          navMenuLines[1],
          {
            rotation: -45,
            y: -5,
            duration: 0.4,
            ease: "back.out(1.7)",
          },
          0.6
        )
        .to(
          heroTexts,
          {
            opacity: 0,
            y: 20,
            duration: 0.8,
            ease: "power2.inOut",
          },
          0
        );

      // Close animation timeline
      closeTimelineRef.current = gsap
        .timeline({ paused: true })
        .to(
          splitInstancesRef.current.bottom.map((x) => x.lines[0]),
          {
            y: "-120%",
            opacity: 0,
            duration: 0.8,
            ease: "expo.in",
            stagger: 0.05,
          },
          0
        )
        .to(
          allNavLines,
          {
            scaleX: 0,
            transformOrigin: (index) => (index % 2 === 1 ? "left" : "right"),
            duration: 1,
            ease: "expo.inOut",
            stagger: 0.08,
          },
          0.2
        )
        .to(
          navBottom,
          {
            clipPath: "inset(0 0 100% 0)",
            duration: 1.2,
            ease: "expo.inOut",
          },
          0.3
        )
        .to(
          navTopLinks,
          {
            color: "white",
            duration: 0.3,
          },
          0.4
        )
        .to(
          navMenuLines,
          {
            backgroundColor: "white",
            duration: 0.2,
          },
          0.4
        )
        .to(
          [navMenuLines[0], navMenuLines[1]],
          {
            rotation: 0,
            y: 0,
            duration: 0.4,
            ease: "back.out(1.7)",
          },
          0.4
        )
        .to(
          heroTexts,
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: "power2.out",
          },
          0.5
        );
    };

    const timer = setTimeout(initAnimations, 100);
    return () => clearTimeout(timer);
  }, []);

  const handleMenuClick = () => {
    const navBottomLinks = document.querySelectorAll(
      '[data-nav="bottom-link"]'
    );

    if (isMenuOpen) {
      navBottomLinks.forEach((link) => link.classList.remove("fade-in"));
      closeTimelineRef.current?.restart();
    } else {
      openTimelineRef.current?.restart();
      setTimeout(() => {
        navBottomLinks.forEach((link) => link.classList.add("fade-in"));
      }, 400);
    }
    setIsMenuOpen(!isMenuOpen);
  };

  const menuItems = [
    {
      number: "01",
      text: "HOME",
      images: [
        "photo-1542831371-29b0f74f9713",
        "photo-1498050108023-c5249f4df085",
      ],
    },
    {
      number: "02",
      text: "Our-history",
      images: [
        "photo-1517694712202-14dd9538aa97",
        "photo-1515879218367-8466d910aaa4",
      ],
    },
    {
      number: "03",
      text: "what-we-do",
      images: [
        "photo-1461749280684-dccba630e2f6",
        "photo-1488590528505-98d2b5aba04b",
      ],
    },
    {
      number: "04",
      text: "events",
      images: [
        "photo-1522071820081-009f0129c71c",
        "photo-1531482615713-2afd69097998",
      ],
    },
    {
      number: "05",
      text: "news-updates",
      images: [
        "photo-1553877522-43269d4ea984",
        "photo-1519389950473-47ba0277781c",
      ],
    },
    // { number: '06', text: 'HOME', images: ['photo-1542831371-29b0f74f9713', 'photo-1498050108023-c5249f4df085'] },
    // { number: '07', text: 'Our-history', images: ['photo-1517694712202-14dd9538aa97', 'photo-1515879218367-8466d910aaa4'] },
    // { number: '08', text: 'what-we-do', images: ['photo-1461749280684-dccba630e2f6', 'photo-1488590528505-98d2b5aba04b'] },
    // { number: '09', text: 'events', images: ['photo-1522071820081-009f0129c71c', 'photo-1531482615713-2afd69097998'] },
    // { number: '010', text: 'news-updates', images: ['photo-1553877522-43269d4ea984', 'photo-1519389950473-47ba0277781c'] }
  ];

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inconsolata:wght@400;700&display=swap');
        
        .nav-link {
          text-shadow: 0px 1em 0px #004d5d;
          overflow: hidden;
          display: inline-block;
        }

        .nav-link-large {
          position: relative;
          overflow: hidden;
        }

        .nav-link-large::before {
          content: attr(nav-number);
          font-size: 0.15em;
          position: absolute;
          top: 0.7em;
          text-shadow: none;
          opacity: 0;
          transition: opacity 0.4s ease-out;
          font-weight: 300;
        }

        .nav-link-large:nth-of-type(1)::before,
        .nav-link-large:nth-of-type(3)::before,
        .nav-link-large:nth-of-type(5)::before {
          left: -1.5em;
        }

        .nav-link-large:nth-of-type(2)::before,
        .nav-link-large:nth-of-type(4)::before {
          right: -1.5em;
        }

        .nav-link-large.fade-in::before {
          opacity: 1;
        }

        @media (max-width: 768px) {
          .nav-image-wrapper {
            display: none !important;
          }
          
          .nav-link-large {
            font-size: 8vw !important;
          }
        }
      `}</style>

      <nav className="fixed inset-0 pointer-events-none z-[100]">
        {/* Top Navigation */}
        <div className="relative z-[110] flex flex-col justify-center items-center p-4 pb-5 pointer-events-auto bg-gradient-to-b from-black/40 to-transparent backdrop-blur-sm">
          <div className="relative flex justify-between items-center w-full max-w-[1600px]">
            <a
              href="#"
              className="nav-link text-white font-['Inconsolata'] text-xl no-underline tracking-wider hover:text-[#004d5d] transition-colors"
              data-nav="top-link"
            >
              Arjiv&nbsp;Exports
            </a>

            <button
              onClick={handleMenuClick}
              className="absolute left-1/2 top-0 -translate-x-1/2 translate-y-1/4 flex flex-col justify-between items-stretch w-7 h-[0.85rem] cursor-pointer z-[120]"
              data-nav="menu-button"
              aria-label="Toggle menu"
            >
              <div className="absolute top-0 w-full h-[3px] bg-white rounded-full transition-all origin-center" />
              <div className="absolute bottom-0 w-full h-[3px] bg-white rounded-full transition-all origin-center" />
            </button>

            <Link
              to="#"
              className="nav-link text-white font-['Inconsolata'] text-xl no-underline tracking-wider hover:text-[#004d5d] transition-colors"
            >
              CONTACT
            </Link>
          </div>
        </div>

        {/* Bottom Navigation Menu */}
        <div
          ref={navBottomRef}
          className="hidden absolute inset-0 z-[105] flex-col justify-between items-stretch w-full h-screen pt-20 pb-8 pointer-events-auto overflow-hidden bg-white/70 backdrop-blur-md"
        >
          <div className="flex-1 flex flex-col justify-between mx-auto w-full">
            {menuItems.map((item, index) => (
              <React.Fragment key={item.number}>
                <div className="flex justify-center items-center w-full relative gap-[6vw] py-1">
                  <div
                    className="nav-image-wrapper relative flex-none w-[clamp(60px,50vh,180px)] aspect-[4/3] overflow-hidden shadow-2xl"
                    data-nav="link-img"
                  >
                    <img
                      src={`https://images.unsplash.com/${item.images[0]}?w=600&h=450&fit=crop&q=80`}
                      alt={item.text}
                      className="w-full h-full object-cover"
                      loading="lazy"
                    />
                  </div>

                  <div className="relative overflow-hidden py-2">
                    <a
                      nav-number={item.number}
                      href="#"
                      className="uppercase nav-link nav-link-large font-bold text-[clamp(2rem,3vw,150px)] leading-[0.9] no-underline flex-none relative overflow-hidden hover:text-[#004d5d] transition-colors"
                    >
                      {item.text}
                    </a>
                  </div>

                  <div
                    className="nav-image-wrapper relative flex-none w-[clamp(60px,50vh,180px)] aspect-[4/3] overflow-hidden shadow-2xl"
                    data-nav="link-img"
                  >
                    <img
                      src={`https://images.unsplash.com/${item.images[1]}?w=600&h=450&fit=crop&q=80`}
                      alt={item.text}
                      className="w-full h-full object-cover"
                      loading="lazy"
                    />
                  </div>
                </div>

                {index < menuItems.length - 1 && (
                  <div
                    className="w-full h-[2px] bg-gray-300 my-2"
                    data-nav="bottom-line"
                  />
                )}
              </React.Fragment>
            ))}
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navigation;
