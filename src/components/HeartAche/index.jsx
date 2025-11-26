import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { Flip } from "gsap/Flip";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "./ScrollEffects.scss";
// import X1 from "./1.png"
import X1 from "./rough-diamond.png"
// import X1 from "./2.png"
// import X1 from "./3.webp"
// import X1 from "./4.png"
gsap.registerPlugin(Flip, ScrollTrigger);

const ScrollItem = ({ data, index }) => {
  const wrapRef = useRef(null);
  const titleWrapRef = useRef(null);
  const titleUpRef = useRef(null);
  const layoutRef = useRef(null);
  const maskRef = useRef(null);
  const imageRef = useRef(null);
  const textRef = useRef(null);

  //   useEffect(() => {
  //     const wrap = wrapRef.current;
  //     const layout = layoutRef.current;
  //     const titleUp = titleUpRef.current;
  //     const text = textRef.current;
  //     const mask = maskRef.current;
  //     const image = imageRef.current;

  //     // Guard clause
  //     if (!wrap || !layout || !titleUp || !text || !mask || !image) return;

  //     layout.prepend(titleUp);
  //     layout.appendChild(text);

  //     // Identify mask type and target attribute
  //     const isCircle = mask.tagName.toLowerCase() === "circle";
  //     const fromValue = isCircle
  //       ? { r: mask.getAttribute("r") }
  //       : { d: mask.getAttribute("d") };
  //     const toValue = isCircle
  //       ? { r: mask.dataset.valueFinal }
  //       : { d: mask.dataset.valueFinal };

  //     ScrollTrigger.getAll().forEach((t) => {
  //       if (t.trigger === wrap) t.kill();
  //     });

  //     // Create individual timeline per section
  //     const tl = gsap.timeline({
  //       defaults: { ease: "power2.inOut" },
  //       scrollTrigger: {
  //         trigger: wrap,
  //         start: "top top",
  //         end: "+=150%",
  //         scrub: 2.5,
  //         pin: true,
  //         // anticipatePin: 1,
  //       },
  //     });

  //     tl.fromTo(
  //       mask,
  //       { attr: fromValue, transformOrigin: "center center" },
  //       {
  //         attr: toValue,
  //         transformOrigin: "center center",
  //         duration: 2,
  //       },
  //       0.5
  //     );

  //     tl.fromTo(
  //       image,
  //       { scale: 1, filter: "brightness(0%)" },
  //       {
  //         filter: "brightness(100%)",
  //         duration: 0.5,
  //       },
  //       0.1
  //     );

  //     tl.from(text, {
  //       x: -200,
  //       y: 100,
  //       rotation: -45,
  //       scale: 0.5,
  //       opacity: 0,
  //       duration: 1.5,
  //       ease: "elastic.out(1, 0.5)",
  //     });

  //     // Cleanup
  //     return () => {
  //       tl.scrollTrigger?.kill();
  //       tl.kill();
  //     };
  //   }, []);

  useEffect(() => {
    const wrap = wrapRef.current;
    const layout = layoutRef.current;
    const titleUp = titleUpRef.current;
    const text = textRef.current;
    const mask = maskRef.current;
    const image = imageRef.current;

    if (!wrap || !layout || !titleUp || !text || !mask || !image) return;

    layout.prepend(titleUp);
    layout.appendChild(text);

    const isCircle = mask.tagName.toLowerCase() === "circle";
    const fromValue = isCircle
      ? { r: mask.getAttribute("r") }
      : { d: mask.getAttribute("d") };
    const toValue = isCircle
      ? { r: mask.dataset.valueFinal }
      : { d: mask.dataset.valueFinal };

    ScrollTrigger.getAll().forEach((t) => {
      if (t.trigger === wrap) t.kill();
    });

    const tl = gsap.timeline({
      defaults: { ease: "power2.inOut" },
      scrollTrigger: {
        trigger: wrap,
        start: "top top",
        end: "+=150%",
        scrub: 2.5,
        pin: true,
      },
    });

    tl.fromTo(
      mask,
      { attr: fromValue, transformOrigin: "center center" },
      { attr: toValue, transformOrigin: "center center", duration: 2 },
      0.5
    );

    tl.fromTo(
      image,
      { scale: 1, filter: "brightness(0%)" },
      { filter: "brightness(100%)", duration: 0.5 },
      0.1
    );

    // ✅ Use fromTo for ScrollTrigger stability
    // Split the text into words
    const words = text.innerText.split(" ");

    text.innerHTML = words
      .map((word) => `<span class="word font-medium">${word}</span>`)
      .join(" ");
    const wordSpans = text.querySelectorAll(".word");

    tl.fromTo(
      titleUp,
      {
        y: 300,
      },
      {
        fontSize: '2.5rem',
        y: 30,
        duration: 1.5,
        ease: "power1.inOut",
        alpha: 1,
      });

    tl.fromTo(
      wordSpans,
      {
        opacity: 0.15,
      },
      {
        opacity: 1,
        duration: 0.5,
        ease: "expo.inOut",
        stagger: 0.1,
      }
    );

    ScrollTrigger.refresh();

    return () => {
      tl.scrollTrigger?.kill();
      tl.kill();
    };
  }, []);

  return (
    <div className="scroll-item" ref={wrapRef}>
      <div className="scroll-item__placeholder">
        <div className="scroll-item__titles" ref={titleWrapRef}>
          <h2
            className="scroll-item__title scroll-item__title--up"
            ref={titleUpRef}
          >
            {data.titleUp}
          </h2>
        </div>
      </div>

      <div
        className={`scroll-item__layout scroll-item__layout--${index + 1}`}
        ref={layoutRef}
      >
        <div className="scroll-item__svg-wrap">
          <svg
            className="scroll-item__svg animate-rough"
            width={data.svgWidth}
            height={data.svgHeight}
            viewBox={`0 0 ${data.svgWidth} ${data.svgHeight}`}
            xmlns="http://www.w3.org/2000/svg"
          >
            <defs>
              <filter id={`filter${index + 1}`}>
                <feTurbulence
                  type="fractalNoise"
                  baseFrequency={data.filter.baseFrequency}
                  numOctaves={data.filter.numOctaves}
                  result="noise"
                />
                <feDisplacementMap
                  in="SourceGraphic"
                  in2="noise"
                  scale={data.filter.scale}
                  xChannelSelector="R"
                  yChannelSelector="G"
                  result="displacement"
                />
                {data.filter.morph && (
                  <feMorphology
                    operator="dilate"
                    radius="2"
                    result="morph"
                    in="displacement"
                  />
                )}
                {data.filter.blur && (
                  <feGaussianBlur in="displacement" stdDeviation="10" />
                )}
              </filter>
              <mask id={`mask${index + 1}`}>
                {data.maskType === "circle" ? (
                  <circle
                    cx="50%"
                    cy="50%"
                    r="0"
                    data-value-final={data.maskFinal}
                    fill="white"
                    className="scroll-item__mask"
                    ref={maskRef}
                    style={{ filter: `url(#filter${index + 1})` }}
                  />
                ) : (
                  <path
                    d={data.maskInitial}
                    data-value-final={data.maskFinal}
                    fill="white"
                    className="scroll-item__mask"
                    ref={maskRef}
                    style={{ filter: `url(#filter${index + 1})` }}
                  />
                )}
              </mask>
            </defs>
            <image
              className="!invert"
              href={data.image}
              width={data.svgWidth}
              height={data.svgHeight}
              mask={`url(#mask${index + 1})`}
              ref={imageRef}
            />
          </svg>
        </div>

        <p className="scroll-item__text scroll-item__description !capitalize">
          {data.description}
        </p>
        <p className="scroll-item__text border-gray-500 border-r-2 pe-5" ref={textRef}>
          {data.text}
        </p>
      </div>
    </div>
  );
};

export default function HeartAche() {
  const scrollData = [
    {
      titleUp: "Rough To Polish ",
      titleDown: "",
      svgWidth: 1200,
      svgHeight: 1344,
      image: X1,
      text: "From rough to polish, we transform every stone with precision, care, and a commitment to timeless brilliance.",
      description: "From nature’s raw form to a polished expression of light, each stone tells a story of craft, care, and uncompromising beauty.",
      filter: { baseFrequency: "0.03", numOctaves: 3, scale: 150 },
      maskType: "circle",
      maskFinal: "520",
    },
  ];

  return (
    <section className="scroll-effects">
      <div className="scroll-effects__content">
        {scrollData.map((data, index) => (
          <ScrollItem key={index} data={data} index={index} />
        ))}
      </div>
    </section>
  );
}
