import React, { useState, useEffect, useRef } from "react";
import "./HorizontalFoldGallery.css";

const HorizontalFoldGallery = () => {
  const wrapperRef = useRef(null);
  const baseContentRef = useRef(null);
  const panelsRef = useRef([]);
  const viewportsRef = useRef([]);
  const lastClientXRef = useRef(null);
  const isDownRef = useRef(false);
  const animationFrameRef = useRef(null);

  const [isLoading, setIsLoading] = useState(true);

  const stateRef = useRef({
    disposed: false,
    targetScroll: 0,
    scroll: 0,
  });

  const GALLERY_DATA = [
    {
      img: "https://www.arjivexports.com/static/media/gemGenve.3dba40df4411bd168ee3.jpg",
      title: "",
    },
    {
      img: "https://www.arjivexports.com/static/media/jwlgemSingapore.1b49d8787e216d4765bd.jpg",
      title: "",
    },
    {
      img: "https://www.arjivexports.com/static/media/jwlArabia.828cbfacb7c5bea1512f.jpg",
      title: "",
    },
    {
      img: "https://www.arjivexports.com/static/media/vicenzaoro.8a9ee3c68777be3c736e.jpg",
      title: "",
    },
    {
      img: "https://www.arjivexports.com/static/media/hktdc.f59d6888bf94aec6f99c.jpg",
      title: "",
    },
    {
      img: "https://www.arjivexports.com/static/media/iijs.8ad2a1cad41bc0461ef8.jpg",
      title: "",
    },
    {
      img: "https://www.arjivexports.com/static/media/jck.9a9939aee0822612daf4.jpg",
      title: "",
    //   title: "We Exhibit in following shows",
    },
    // {
    //   img: "https://www.arjivexports.com/static/media/hong-kong-trade-development-council-arjiv-exports.7672783b2376894167af.jpg",
    //   title: "",
    // },
  ];

  // Smooth interpolation function
  const lerp = (current, target, speed = 0.1, limit = 0.0001) => {
    let change = (target - current) * speed;
    if (Math.abs(change) < limit) {
      change = target - current;
    }
    return change;
  };

  // Update scroll transform for all viewports
  const updateStyles = (scroll) => {
    viewportsRef.current.forEach((viewport) => {
      if (viewport?.children[0]) {
        viewport.children[0].style.transform = `translateX(${scroll}px)`;
      }
    });
  };

  // Animation loop
  const tick = () => {
    if (stateRef.current.disposed) return;

    const mainPanel = panelsRef.current[panelsRef.current.length - 1];
    if (mainPanel && viewportsRef.current[3]?.children[0]) {
      const contentWidth = viewportsRef.current[3].children[0].scrollWidth;
      const visibleWidth = mainPanel.clientWidth;

      stateRef.current.targetScroll = Math.max(
        Math.min(0, stateRef.current.targetScroll),
        -(contentWidth - visibleWidth - 150)
        // Math.max(-(contentWidth - visibleWidth), -7000)
      );
    }

    stateRef.current.scroll += lerp(
      stateRef.current.scroll,
      stateRef.current.targetScroll,
      0.1,
      0.001
    );

    updateStyles(stateRef.current.scroll);
    animationFrameRef.current = requestAnimationFrame(tick);
  };

  // Preload images
  useEffect(() => {
    const images = GALLERY_DATA.map((item) => item.img);
    let loadedCount = 0;

    const imagePromises = images.map((src) => {
      return new Promise((resolve) => {
        const img = new Image();
        img.onload = () => {
          loadedCount++;
          if (loadedCount === images.length) {
            setIsLoading(false);
          }
          resolve();
        };
        img.onerror = resolve;
        img.src = src;
      });
    });

    Promise.all(imagePromises);
  }, []);

  // Setup event listeners and animation
  useEffect(() => {
    if (isLoading) return;

    tick();

    const onDown = () => {
      isDownRef.current = true;
    };

    const onUp = () => {
      isDownRef.current = false;
    };

    const onMouseOut = (ev) => {
      const from = ev.relatedTarget || ev.toElement;
      if (!from || from.nodeName === "HTML") {
        isDownRef.current = false;
      }
    };

    const onMouseMove = (ev) => {
      if (lastClientXRef.current && isDownRef.current) {
        stateRef.current.targetScroll += ev.clientX - lastClientXRef.current;
      }
      lastClientXRef.current = ev.clientX;
    };

    const onTouchMove = (ev) => {
      const touch = ev.touches[0];
      if (lastClientXRef.current && isDownRef.current) {
        stateRef.current.targetScroll += touch.clientX - lastClientXRef.current;
      }
      lastClientXRef.current = touch.clientX;
    };

    const onWheel = (ev) => {
      stateRef.current.targetScroll += -Math.sign(ev.deltaY) * 150;
    };

    window.addEventListener("mousedown", onDown);
    window.addEventListener("mouseup", onUp);
    window.addEventListener("mouseout", onMouseOut);
    window.addEventListener("touchstart", onDown);
    window.addEventListener("touchend", onUp);
    window.addEventListener("touchcancel", onUp);
    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("touchmove", onTouchMove);
    window.addEventListener("wheel", onWheel);

    return () => {
      stateRef.current.disposed = true;
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
      window.removeEventListener("mousedown", onDown);
      window.removeEventListener("mouseup", onUp);
      window.removeEventListener("mouseout", onMouseOut);
      window.removeEventListener("touchstart", onDown);
      window.removeEventListener("touchend", onUp);
      window.removeEventListener("touchcancel", onUp);
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("touchmove", onTouchMove);
      window.removeEventListener("wheel", onWheel);
    };
  }, [isLoading]);

  // Render gallery content
  const renderGalleryContent = () => (
    <div className="gallery-strip">
      {GALLERY_DATA.map((item, index) => (
        <React.Fragment key={index}>
          <img
            className="gallery-image"
            src={item.img}
            alt={item.title}
            draggable={false}
          />
          <h3 className="gallery-title">{item.title}</h3>
        </React.Fragment>
      ))}
    </div>
  );

  if (isLoading) {
    return (
      <div className="w-full h-screen flex items-center justify-center bg-white">
        <p className="text-xl text-gray-600">Loading...</p>
      </div>
    );
  }

  return (
    <section className="horizontal-fold-gallery-container">
      <div className="horizontal-fold-gallery-wrapper">
        {/* Hidden base content for reference */}
        <div ref={baseContentRef} style={{ display: "none" }}>
          {renderGalleryContent()}
        </div>

        {/* Canvas stage */}
        <div className="canvas-stage" ref={wrapperRef}>
          <div className="perspective-wrapper">
            {/* Fold Panel 3 (Far back) */}
            <div
              className="fold-panel fold-panel-prev fold-panel-prev-3"
              ref={(el) => (panelsRef.current[0] = el)}
            >
              <div className="panel-container">
                <div
                  className="panel-viewport"
                  ref={(el) => (viewportsRef.current[0] = el)}
                >
                  {renderGalleryContent()}
                </div>
              </div>
            </div>

            {/* Fold Panel 2 */}
            <div
              className="fold-panel fold-panel-prev fold-panel-prev-2"
              ref={(el) => (panelsRef.current[1] = el)}
            >
              <div className="panel-container">
                <div
                  className="panel-viewport"
                  ref={(el) => (viewportsRef.current[1] = el)}
                >
                  {renderGalleryContent()}
                </div>
              </div>
            </div>

            {/* Fold Panel 1 */}
            <div
              className="fold-panel fold-panel-prev fold-panel-prev-1"
              ref={(el) => (panelsRef.current[2] = el)}
            >
              <div className="panel-container">
                <div
                  className="panel-viewport"
                  ref={(el) => (viewportsRef.current[2] = el)}
                >
                  {renderGalleryContent()}
                </div>
              </div>
            </div>

            {/* Main Fold Panel (Front) */}
            <div
              className="fold-panel fold-panel-main"
              ref={(el) => (panelsRef.current[3] = el)}
            >
              <div className="panel-container">
                <div
                  className="panel-viewport"
                  ref={(el) => (viewportsRef.current[3] = el)}
                >
                  {renderGalleryContent()}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HorizontalFoldGallery;
