import { useEffect, useRef } from 'react';
import gsap from 'gsap';

const FollowCursor = () => {
  const cursorRef = useRef(null);

  useEffect(() => {
    const cursor = cursorRef.current;

    // Initial gem-like entrance
    gsap.set(cursor, { scale: 0, opacity: 0, rotate: 45 });
    gsap.to(cursor, {
      scale: 1,
      opacity: 1,
      duration: 0.6,
      ease: 'power3.out',
      rotate: 0,
    });

    // Smooth trailing motion
    const xTo = gsap.quickTo(cursor, 'x', { duration: 0.4, ease: 'power3.out' });
    const yTo = gsap.quickTo(cursor, 'y', { duration: 0.4, ease: 'power3.out' });

    const moveCursor = (e) => {
      xTo(e.clientX);
      yTo(e.clientY);
    };

    window.addEventListener('mousemove', moveCursor);
    return () => window.removeEventListener('mousemove', moveCursor);
  }, []);

  return (
    <div
      ref={cursorRef}
      className="fixed top-0 left-0 w-6 h-6 bg-gradient-to-br from-white to-sky-200 border border-white rounded-[30%] shadow-[0_0_8px_rgba(255,255,255,0.6)] pointer-events-none z-[9999] mix-blend-difference"
    />
  );
};

export default FollowCursor;
