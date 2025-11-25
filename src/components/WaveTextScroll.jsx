import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const CurvedScrollText = ({ text, index }) => {
  const textRef = useRef(null);
  const pathId = `wgl-path-${index}`;

  //   const separator = " ✺ ✽ ✾ ✱ ✴ ✦ ❉ ❃ ";
  const separator = " \u00A0\u00A0✴\u00A0\u00A0 ";
  const repeatedText = Array(10).fill(text).join(separator);

  useEffect(() => {
    const textElement = textRef.current;
    if (!textElement) return;

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: textElement,
        start: "top bottom",
        end: "+=500%",
        scrub: 2,
      },
    });

    tl.fromTo(
      textElement,
      { attr: { startOffset: "0%" } },
      { attr: { startOffset: "-100%" } }
    );

    return () => {
      tl.kill();
    };
  }, []);

  return (
    <div className="w-full flex items-center justify-center align-middle">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 1920 300"
        className="w-full h-full !overflow-visible"
      >
        <defs>
          <path
            d="M-724.4,150c47.9,17.5,93.6,25.9,139.6,25.9c105.3,0,186.5-43.2,272.5-88.9
              c86.4-45.9,175.7-93.4,290.1-93.4s203.8,47.5,290.1,93.4c86,45.7,167.2,88.9,272.5,88.9c105.3,0,186.5-43.2,272.5-88.9
              c86.4-45.9,175.7-93.4,290.1-93.4c114.4,0,203.7,47.5,290.1,93.4c86,45.7,167.2,88.9,272.5,88.9c105.3,0,186.5-43.2,272.5-88.9
              c86.4-45.9,175.7-93.4,290.1-93.4c114.4,0,203.8,47.5,290.1,93.4c86,45.7,167.2,88.9,272.5,88.9c46,0,91.6-8.5,139.6-25.9"
            id={pathId}
          />
        </defs>
        <defs>
          <linearGradient id="textGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="100%" stopColor="#414143" />
          </linearGradient>
        </defs>

        <text
          className="uppercase text-4xl font-medium tracking-normal "
          fill="url(#textGradient)"
        >
          <textPath ref={textRef} href={`#${pathId}`} startOffset="0%">
            {repeatedText}
          </textPath>
        </text>
      </svg>
    </div>
  );
};

export default function App() {
  const WORDS = [
    {
      text: "RJC Certified Diamond manufacturer",
    },
  ];

  return (
    <div>
      <div>
        {WORDS.map((x, index) => (
          <div key={index} className="flex items-center gap-3.5 font-zen">
            <CurvedScrollText text={x.text} index={index} />
          </div>
        ))}
      </div>
    </div>
  );
}
