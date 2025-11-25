import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const TelescopeZoom = () => {
  const sectionRef = useRef(null);
  const frontImagesRef = useRef([]);
  const smallImagesRef = useRef([]);
  const [imagesLoaded, setImagesLoaded] = useState(false);

  // Preload images
  useEffect(() => {
    const images = sectionRef.current?.querySelectorAll('img');
    if (!images || images.length === 0) {
      setImagesLoaded(true);
      return;
    }

    let loadedCount = 0;
    const totalImages = images.length;

    const checkAllLoaded = () => {
      loadedCount++;
      if (loadedCount === totalImages) {
        setImagesLoaded(true);
      }
    };

    images.forEach((img) => {
      if (img.complete) {
        checkAllLoaded();
      } else {
        img.addEventListener('load', checkAllLoaded);
        img.addEventListener('error', checkAllLoaded);
      }
    });

    return () => {
      images.forEach((img) => {
        img.removeEventListener('load', checkAllLoaded);
        img.removeEventListener('error', checkAllLoaded);
      });
    };
  }, []);

  // Initialize animation
  useEffect(() => {
    if (!imagesLoaded) return;

    const section = sectionRef.current;
    const frontImages = frontImagesRef.current.filter(Boolean);
    const smallImages = smallImagesRef.current.filter(Boolean);

    if (!section || frontImages.length === 0 || smallImages.length === 0) return;

    gsap.set(smallImages, {
      transformStyle: 'preserve-3d',
      backfaceVisibility: 'hidden',
      force3D: true,
    });

    const timeline = gsap.timeline({
      scrollTrigger: {
        trigger: section,
        start: 'top top',
        end: 'bottom top',
        scrub: true,
        pin: true,
        onUpdate: (self) => {
          const easedProgress = gsap.parseEase('power1.inOut')(self.progress);
          section.style.setProperty('--progress', easedProgress);
        },
      },
    });

    timeline.to(smallImages, {
      z: '100vh',
      duration: 1,
      ease: 'power1.inOut',
      stagger: {
        amount: 0.2,
        from: 'center',
      },
    });

    timeline.to(
      frontImages,
      {
        scale: 1,
        duration: 1,
        ease: 'power1.inOut',
        delay: 0.1,
      },
      0.6
    );

    timeline.to(
      frontImages,
      {
        duration: 1,
        filter: 'blur(0px)',
        ease: 'power1.inOut',
        delay: 0.4,
        stagger: {
          amount: 0.2,
          from: 'end',
        },
      },
      0.6
    );

    return () => {
      timeline.kill();
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, [imagesLoaded]);

  return (
    <div className="telescope-zoom-main">
      <style>{`
        .telescope-zoom-main {
          position: relative;
          width: 100%;
          min-height: 300vh;
          background-color: #fff;
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', sans-serif;
        }

        .telescope-zoom-main * {
          box-sizing: border-box;
        }

        .telescope-zoom-main .tz-section {
          position: relative;
          height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
          overflow: hidden;
          --progress: 0;
        }

        .telescope-zoom-main .tz-section__media {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          z-index: -1;
          transform: scale(var(--progress));
        }

        .telescope-zoom-main .tz-section__media__front,
        .telescope-zoom-main .tz-section__media__back {
          position: absolute;
          left: 0;
          top: 0;
          width: 100%;
          height: 100%;
        }

        .telescope-zoom-main .tz-section__media__front {
          filter: blur(2px);
        }

        .telescope-zoom-main .tz-section__media__front img {
          mask-image: radial-gradient(circle at center, black 30%, transparent 70%);
          mask-position: 50% 50%;
          mask-size: cover;
        }

        .telescope-zoom-main .tz-front-1 {
          transform: scale(1);
        }

        .telescope-zoom-main .tz-front-2 {
          transform: scale(0.85);
        }

        .telescope-zoom-main .tz-front-3 {
          transform: scale(0.6);
        }

        .telescope-zoom-main .tz-front-4 {
          transform: scale(0.45);
        }

        .telescope-zoom-main .tz-front-5 {
          transform: scale(0.3);
        }

        .telescope-zoom-main .tz-front-6 {
          transform: scale(0.15);
        }

        .telescope-zoom-main .tz-section__media img {
          position: absolute;
          width: 100%;
          height: 100%;
          object-fit: cover;
          object-position: center;
        }

        .telescope-zoom-main .tz-section h1 {
          font-size: 3vw;
          font-weight: 600;
          transform: translateY(-15%);
          display: flex;
          gap: 1vw;
          margin: 0;
          z-index: 10;
        }

        .telescope-zoom-main .tz-section h1 span {
          display: inline-block;
        }

        .telescope-zoom-main .tz-section h1 .tz-left {
          transform: translate3d(calc(var(--progress) * (-66vw + 100%) - 0.5vw), 0, 0);
        }

        .telescope-zoom-main .tz-section h1 .tz-right {
          transform: translate3d(calc(var(--progress) * (66vw - 100%)), 0, 0);
        }

        .telescope-zoom-main .tz-section__images {
          position: absolute;
          top: 0;
          left: 0;
          width: 100vw;
          height: 100vh;
          perspective: 100vh;
          pointer-events: none;
        }

        .telescope-zoom-main .tz-section__images img {
          position: absolute;
          width: 10vw;
          height: auto;
        }

        .telescope-zoom-main .tz-section__images img:nth-of-type(1) {
          top: 15vw;
          left: -3vw;
        }

        .telescope-zoom-main .tz-section__images img:nth-of-type(2) {
          top: 5vw;
          left: 20vw;
        }

        .telescope-zoom-main .tz-section__images img:nth-of-type(3) {
          top: 8vw;
          left: 26.5vw;
        }

        .telescope-zoom-main .tz-section__images img:nth-of-type(4) {
          top: 18vw;
          right: 18vw;
        }

        .telescope-zoom-main .tz-section__images img:nth-of-type(5) {
          top: 5vw;
          right: 10vw;
        }

        .telescope-zoom-main .tz-section__images img:nth-of-type(6) {
          bottom: 5vw;
          left: 10vw;
        }

        .telescope-zoom-main .tz-section__images img:nth-of-type(7) {
          bottom: 8vw;
          left: 22.5vw;
        }

        .telescope-zoom-main .tz-section__images img:nth-of-type(8) {
          bottom: 3vw;
          left: 45vw;
        }

        .telescope-zoom-main .tz-section__images img:nth-of-type(9) {
          bottom: 5vw;
          right: 15vw;
        }

        .telescope-zoom-main .tz-section__images img:nth-of-type(10) {
          bottom: 9vw;
          right: 7vw;
        }

        @media (max-width: 768px) {
          .telescope-zoom-main .tz-section h1 {
            font-size: 9vw;
          }

          .telescope-zoom-main .tz-section h1 .tz-left {
            transform: translate3d(calc(var(--progress) * (-100vw + 100%) - 0.5vw), 0, 0);
          }

          .telescope-zoom-main .tz-section h1 .tz-right {
            transform: translate3d(calc(var(--progress) * (100vw - 100%)), 0, 0);
          }

          .telescope-zoom-main .tz-section__images img {
            width: 20vw;
          }

          .telescope-zoom-main .tz-section__images img:nth-of-type(3) {
            top: 30vw;
            left: 30vw;
          }

          .telescope-zoom-main .tz-section__images img:nth-of-type(4) {
            right: 15vw;
            top: 30vw;
          }

          .telescope-zoom-main .tz-section__images img:nth-of-type(5) {
            top: 10vw;
            right: 5vw;
          }

          .telescope-zoom-main .tz-section__images img:nth-of-type(6) {
            left: 5vw;
          }

          .telescope-zoom-main .tz-section__images img:nth-of-type(7) {
            left: 10vw;
            bottom: 27.5vw;
          }

          .telescope-zoom-main .tz-section__images img:nth-of-type(8) {
            bottom: 10vw;
            left: 35vw;
          }

          .telescope-zoom-main .tz-section__images img:nth-of-type(10) {
            right: 3vw;
            bottom: 22vw;
          }
        }

        .telescope-zoom-main .tz-loading {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: #fff;
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 9999;
        }

        .telescope-zoom-main .tz-loader {
          width: 100px;
          height: 2px;
          background: #1a1a1a;
          animation: loaderAnim 1.5s ease-in-out infinite alternate;
        }

        @keyframes loaderAnim {
          0% {
            transform: scaleX(0);
            transform-origin: 0% 50%;
          }
          50% {
            transform: scaleX(1);
            transform-origin: 0% 50%;
          }
          50.1% {
            transform: scaleX(1);
            transform-origin: 100% 50%;
          }
          100% {
            transform: scaleX(0);
            transform-origin: 100% 50%;
          }
        }
      `}</style>

      {!imagesLoaded && (
        <div className="tz-loading">
          <div className="tz-loader"></div>
        </div>
      )}

      <div className="tz-section" ref={sectionRef}>
        <h1>
          <span className="tz-left">Diamond</span>
          <span className="tz-right">custmization</span>
        </h1>

        <div className="tz-section__media">
          <div className="tz-section__media__back">
            <img src="https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=1200&q=80" alt="Earth from space" />
          </div>

          {[1, 2, 3, 4, 5, 6].map((num) => (
            <div
              key={num}
              className={`tz-section__media__front tz-front-${num}`}
              ref={(el) => (frontImagesRef.current[num - 1] = el)}
            >
              <img src="https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=1200&q=80" alt="Earth from space" />
            </div>
          ))}
        </div>

        <div className="tz-section__images">
          {[
            'https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?w=400&q=80',
            'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=400&q=80',
            'https://images.unsplash.com/photo-1472214103451-9374bd1c798e?w=400&q=80',
            'https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=400&q=80',
            'https://images.unsplash.com/photo-1433086966358-54859d0ed716?w=400&q=80',
            'https://images.unsplash.com/photo-1426604966848-d7adac402bff?w=400&q=80',
            'https://images.unsplash.com/photo-1447752875215-b2761acb3c5d?w=400&q=80',
            'https://images.unsplash.com/photo-1475924156734-496f6cac6ec1?w=400&q=80',
            'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=400&q=80',
            'https://images.unsplash.com/photo-1418065460487-3e41a6c84dc5?w=400&q=80',
          ].map((src, idx) => (
            <img
              key={idx}
              src={src}
              alt={`Nature ${idx + 1}`}
              ref={(el) => (smallImagesRef.current[idx] = el)}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default TelescopeZoom;