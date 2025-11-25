import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const ScrollZoomReveal = () => {
  const containerRef = useRef(null);
  const imagesRef = useRef([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      let zoomDistance;
      
      // Responsive zoom distances
      if (window.innerWidth > 1024) {
        zoomDistance = 'translate3D(0px, 0px, 100vh)';
      } else if (window.innerWidth > 767) {
        zoomDistance = 'translate3D(0px, 0px, 150vh)';
      } else {
        zoomDistance = 'translate3D(0px, 0px, 150vh)';
      }

      // Blur and opacity reveal
      gsap.to('.zoom-img', {
        scrollTrigger: {
          trigger: containerRef.current,
          start: '0% 0%',
          end: '+=200%',
          scrub: true,
        },
        opacity: 1,
        filter: 'blur(0px)',
        stagger: 0.5,
      });

      // Zoom transform animation
      gsap.to('.zoom-img', {
        scrollTrigger: {
          trigger: containerRef.current,
          start: '0% 0%',
          end: '+=300%',
          scrub: true,
          pin: true,
        },
        transform: zoomDistance,
        duration: 2,
        zIndex: 30,
        stagger: 0.5,
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  const images = [
    {
      url: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1200&q=80',
      alt: 'Mountain landscape',
    },
    {
      url: 'https://images.unsplash.com/photo-1519681393784-d120267933ba?w=1200&q=80',
      alt: 'Mountain peaks',
    },
    {
      url: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1200&q=80',
      alt: 'Nature vista',
    },
  ];

  return (
    <div className="bg-black">
      {/* Intro section */}
      <div className="h-screen flex items-center justify-center">
        <h1 className="text-white text-6xl font-bold">Scroll Down</h1>
      </div>

      {/* Zoom reveal container */}
      <div
        ref={containerRef}
        className="relative h-screen overflow-hidden"
        style={{
          transformStyle: 'preserve-3d',
          perspective: '100vh',
        }}
      >
        {/* Background layer */}
        <div
          className="absolute inset-0 bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 zoom-bg"
          style={{
            transform: 'translate3D(0vh, 0vh, -305vh)',
            scale: '4.5',
          }}
        />

        {/* Image layers */}
        {images.map((image, index) => (
          <div
            key={index}
            ref={(el) => (imagesRef.current[index] = el)}
            className="zoom-img absolute inset-0 flex items-center justify-center"
            style={{
              transform: 'translate3D(0vh, 0vh, -300vh)',
              opacity: 0,
              filter: 'blur(20px)',
              zIndex: 1,
            }}
          >
            <img
              src={image.url}
              alt={image.alt}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-black bg-opacity-20" />
            <h2 className="absolute text-white text-5xl font-bold z-10">
              Image {index + 1}
            </h2>
          </div>
        ))}
      </div>

      {/* Content after animation */}
      <div className="min-h-screen bg-white flex items-center justify-center p-8">
        <div className="max-w-4xl">
          <h2 className="text-5xl font-bold mb-6 text-gray-900">
            Welcome to the Content
          </h2>
          <p className="text-xl text-gray-600 leading-relaxed">
            The images have zoomed out and revealed themselves through the scroll animation.
            This effect creates an immersive and engaging user experience that draws attention
            to your visual content.
          </p>
        </div>
      </div>

      {/* Additional content for scrolling */}
      <div className="min-h-screen bg-gray-100 flex items-center justify-center p-8">
        <div className="max-w-4xl">
          <h2 className="text-4xl font-bold mb-6 text-gray-900">
            Smooth Scrolling Experience
          </h2>
          <p className="text-lg text-gray-600 leading-relaxed">
            The animation is tied to your scroll position, creating a smooth and natural
            feeling interaction. Keep scrolling to see more content below.
          </p>
        </div>
      </div>
    </div>
  );
};

export default ScrollZoomReveal;