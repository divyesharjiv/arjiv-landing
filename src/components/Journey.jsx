import React, { useState, useEffect, useRef } from 'react';

export default function ScrollImageSequence() {
  const [currentFrame, setCurrentFrame] = useState(1);
  const [loadedImages, setLoadedImages] = useState({});
  const containerRef = useRef(null);
  const totalFrames = 927;
  const baseUrl = 'https://raw.githubusercontent.com/Murali2011/finalsequence/main/';

  // Preload images
  useEffect(() => {
    const preloadImage = (num) => {
      const img = new Image();
      const paddedNum = String(num).padStart(5, '0');
      img.src = `${baseUrl}${paddedNum}.webp`;
      img.onload = () => {
        setLoadedImages(prev => ({ ...prev, [num]: img.src }));
      };
    };

    // Preload first 50 images
    for (let i = 1; i <= Math.min(50, totalFrames); i++) {
      preloadImage(i);
    }

    // Preload rest in background
    const preloadRest = () => {
      for (let i = 51; i <= totalFrames; i++) {
        setTimeout(() => preloadImage(i), (i - 50) * 20);
      }
    };
    setTimeout(preloadRest, 1000);
  }, []);

  // Handle scroll
  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current) return;
      
      const scrollTop = window.scrollY;
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
      const scrollFraction = scrollTop / maxScroll;
      const frameIndex = Math.min(
        totalFrames,
        Math.ceil(scrollFraction * totalFrames)
      );
      
      setCurrentFrame(Math.max(1, frameIndex));
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const paddedFrame = String(currentFrame).padStart(5, '0');
  const currentImageUrl = `${baseUrl}${paddedFrame}.webp`;

  return (
    <div ref={containerRef}>
      {/* Fixed image container */}
      <div className="fixed top-0 left-0 w-full h-screen flex items-center justify-center">
        <div className="relative w-full max-w-4xl aspect-video">
          {loadedImages[currentFrame] ? (
            <img
              src={currentImageUrl}
              alt={`Frame ${currentFrame}`}
              className="w-full h-full object-contain transition-opacity duration-100 scale-200"
              style={{ opacity: 1 }}
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-white">
              Loading frame {currentFrame}...
            </div>
          )}
        </div>
      </div>

      {/* Spacer for scroll */}
      <div style={{ height: '2000vh' }} />

      {/* Frame counter */}
      <div className="fixed bottom-8 right-8 bg-white/90 px-4 py-2 rounded-lg shadow-lg">
        <p className="text-sm font-mono">
          Frame: {currentFrame} / {totalFrames}
        </p>
        <div className="w-48 h-2 bg-gray-200 rounded-full mt-2">
          <div
            className="h-full bg-blue-600 rounded-full transition-all duration-100"
            style={{ width: `${(currentFrame / totalFrames) * 100}%` }}
          />
        </div>
      </div>
    </div>
  );
}