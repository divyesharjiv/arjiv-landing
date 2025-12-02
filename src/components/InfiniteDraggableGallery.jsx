import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import CustomEase from "gsap/CustomEase";
import SplitType from "split-type";
import { Pane } from "tweakpane";
import "./InfiniteGallery.css";

gsap.registerPlugin(CustomEase);
CustomEase.create("hop", "0.9, 0, 0.1, 1");

export default function InfiniteDraggableGallery() {
  const containerRef = useRef(null);
  const canvasRef = useRef(null);
  const overlayRef = useRef(null);
  const projectTitleRef = useRef(null);
  const paneRef = useRef(null);
  const stateRef = useRef({});

  useEffect(() => {
    // --- Data ---
    const items = [
      "Brilliant cut",
      "Step cut",
      "Old cut",
      "Rose Potrait cut",
      "Exquiste cut",
      "Fancy color cut",
      "Brioletter cut",
    ];
    const imageUrls = [
      "https://www.arjivexports.com/static/media/brilliant-cut.3728e1f7503018ab025a.jpg",
      "https://www.arjivexports.com/static/media/step-cut.988811fc1a09a2197052.jpg",
      "https://www.arjivexports.com/static/media/old-cut.76ef42373be06b7a6bb2.jpg",
      "https://www.arjivexports.com/static/media/rose-potrait-cut.7f90614e6a8e595b286a.jpg",
      "https://www.arjivexports.com/static/media/exquiste.fca79a14b7fac224ebf7.jpg",
      "https://www.arjivexports.com/static/media/fancy-color.9794c9818edac998ecfb.jpg",
      "https://www.arjivexports.com/static/media/briolette-cut.99e5f49d58889e5d6abd.jpg",
    ];

    // --- Settings ---
    const settings = {
      baseWidth: 350,
      smallHeight: 380,
      largeHeight: 490,
      itemGap: 50,
      hoverScale: 1.05,
      expandedScale: 0.5,
      dragEase: 0.06,
      momentumFactor: 200,
      bufferZone: 0,
      borderRadius: 0,
      vignetteSize: 0,
      vignetteStrength: 0.7,
      overlayOpacity: 0.9,
      overlayEaseDuration: 0.8,
      zoomDuration: 0.8,
    };

    // Mutable state stored in ref so functions can access latest values
    const S = {
      settings,
      itemSizes: [
        { width: settings.baseWidth, height: settings.smallHeight },
        { width: settings.baseWidth, height: settings.largeHeight },
      ],
      itemGap: settings.itemGap,
      columns: 3,
      itemCount: items.length,
      cellWidth: settings.baseWidth + settings.itemGap,
      cellHeight:
        Math.max(settings.smallHeight, settings.largeHeight) + settings.itemGap,
      isDragging: false,
      startX: 0,
      startY: 0,
      targetX: 0,
      targetY: 0,
      currentX: 0,
      currentY: 0,
      dragVelocityX: 0,
      dragVelocityY: 0,
      lastDragTime: 0,
      mouseHasMoved: false,
      visibleItems: new Set(),
      lastUpdateTime: 0,
      lastX: 0,
      lastY: 0,
      isExpanded: false,
      activeItem: null,
      activeItemId: null,
      canDrag: true,
      originalPosition: null,
      expandedItem: null,
      overlayAnimation: null,
      titleSplit: null,
      paneInstance: null,
    };

    stateRef.current = S;

    const container = containerRef.current;
    const canvas = canvasRef.current;
    const overlay = overlayRef.current;
    const projectTitleElement = projectTitleRef.current;

    function updateBorderRadius() {
      document.documentElement.style.setProperty(
        "--border-radius",
        `${settings.borderRadius}px`
      );
    }
    function updateVignetteSize() {
      document.documentElement.style.setProperty(
        "--vignette-size",
        `${settings.vignetteSize}px`
      );
    }
    function updatePageVignette() {
      const strength = settings.vignetteStrength;
      const size = settings.vignetteSize;
      const regularOpacity = strength * 0.7;
      const regularSize = size * 1.5;
      document.documentElement.style.setProperty(
        "--page-vignette-size",
        `${regularSize}px`
      );
      document.documentElement.style.setProperty(
        "--page-vignette-color",
        `rgba(0,0,0,${regularOpacity})`
      );
      const strongOpacity = strength * 0.85;
      const strongSize = size * 0.75;
      document.documentElement.style.setProperty(
        "--page-vignette-strong-size",
        `${strongSize}px`
      );
      document.documentElement.style.setProperty(
        "--page-vignette-strong-color",
        `rgba(0,0,0,${strongOpacity})`
      );
      const extremeOpacity = strength;
      const extremeSize = size * 0.4;
      document.documentElement.style.setProperty(
        "--page-vignette-extreme-size",
        `${extremeSize}px`
      );
      document.documentElement.style.setProperty(
        "--page-vignette-extreme-color",
        `rgba(0,0,0,${extremeOpacity})`
      );
    }
    function updateHoverScale() {
      document.documentElement.style.setProperty(
        "--hover-scale",
        settings.hoverScale
      );
      document.querySelectorAll(".item").forEach((item) => {
        const img = item.querySelector("img");
        if (img) img.style.transition = "transform 0.3s ease";
      });
    }

    // Utility functions for grid
    function getItemSize(row, col) {
      const sizeIndex = Math.abs((row * S.columns + col) % S.itemSizes.length);
      return S.itemSizes[sizeIndex];
    }
    function getItemId(col, row) {
      return `${col},${row}`;
    }
    function getItemPosition(col, row) {
      const xPos = col * S.cellWidth;
      const yPos = row * S.cellHeight;
      return { x: xPos, y: yPos };
    }

    // Visible items logic - create DOM nodes directly (like original)
    function updateVisibleItems() {
      const buffer = settings.bufferZone;
      const viewWidth = window.innerWidth * (1 + buffer);
      const viewHeight = window.innerHeight * (1 + buffer);
      const startCol = Math.floor((-S.currentX - viewWidth / 2) / S.cellWidth);
      const endCol = Math.ceil((-S.currentX + viewWidth * 1.5) / S.cellWidth);
      const startRow = Math.floor(
        (-S.currentY - viewHeight / 2) / S.cellHeight
      );
      const endRow = Math.ceil((-S.currentY + viewHeight * 1.5) / S.cellHeight);
      const currentItems = new Set();

      for (let row = startRow; row <= endRow; row++) {
        for (let col = startCol; col <= endCol; col++) {
          const itemId = getItemId(col, row);
          currentItems.add(itemId);
          if (S.visibleItems.has(itemId)) continue;
          if (S.activeItemId === itemId && S.isExpanded) continue;

          const itemSize = getItemSize(row, col);
          const position = getItemPosition(col, row);

          const item = document.createElement("div");
          item.className = "item";
          item.id = itemId;
          item.style.width = `${itemSize.width}px`;
          item.style.height = `${itemSize.height}px`;
          item.style.left = `${position.x}px`;
          item.style.top = `${position.y}px`;
          item.dataset.col = col;
          item.dataset.row = row;
          item.dataset.width = itemSize.width;
          item.dataset.height = itemSize.height;

          const itemNum = Math.abs((row * S.columns + col) % S.itemCount);

          const imageContainer = document.createElement("div");
          imageContainer.className = "item-image-container";
          const img = document.createElement("img");
          img.src = imageUrls[itemNum % imageUrls.length];
          img.alt = `Image ${itemNum + 1}`;
          imageContainer.appendChild(img);
          item.appendChild(imageContainer);

          const captionElement = document.createElement("div");
          captionElement.className = "item-caption";
          const nameElement = document.createElement("div");
          nameElement.className = "item-name";
          nameElement.textContent = items[itemNum];
          captionElement.appendChild(nameElement);
          const numberElement = document.createElement("div");
          numberElement.className = "item-number";
          numberElement.textContent = `#${(itemNum + 1)
            .toString()
            .padStart(5, "0")}`;
          captionElement.appendChild(numberElement);
          item.appendChild(captionElement);

          item.addEventListener("click", () => {
            if (S.mouseHasMoved || S.isDragging) return;
            handleItemClick(item, itemNum);
          });

          canvas.appendChild(item);
          S.visibleItems.add(itemId);
        }
      }

      // Remove items no longer in view
      S.visibleItems.forEach((itemId) => {
        if (
          !currentItems.has(itemId) ||
          (S.activeItemId === itemId && S.isExpanded)
        ) {
          const item = document.getElementById(itemId);
          if (item && item.parentNode === canvas) canvas.removeChild(item);
          S.visibleItems.delete(itemId);
        }
      });
    }

    // Title functions
    function setAndAnimateTitle(title) {
      if (S.titleSplit) S.titleSplit.revert();
      if (!projectTitleElement) return;
      projectTitleElement.textContent = title;
      S.titleSplit = new SplitType(projectTitleElement, { types: "words" });
      gsap.set(S.titleSplit.words, { y: "100%" });
    }
    function animateTitleIn() {
      if (!S.titleSplit) return;
      gsap.fromTo(
        S.titleSplit.words,
        { y: "100%", opacity: 0 },
        { y: "0%", opacity: 1, duration: 1, stagger: 0.1, ease: "power3.out" }
      );
    }
    function animateTitleOut() {
      if (!S.titleSplit) return;
      gsap.to(S.titleSplit.words, {
        y: "-100%",
        opacity: 0,
        duration: 1,
        stagger: 0.1,
        ease: "power3.out",
      });
    }

    // Overlay animations
    function animateOverlayIn() {
      if (S.overlayAnimation) S.overlayAnimation.kill();
      S.overlayAnimation = gsap.to(overlay, {
        opacity: settings.overlayOpacity,
        duration: settings.overlayEaseDuration,
        ease: "power2.inOut",
        overwrite: true,
      });
    }
    function animateOverlayOut() {
      if (S.overlayAnimation) S.overlayAnimation.kill();
      S.overlayAnimation = gsap.to(overlay, {
        opacity: 0,
        duration: settings.overlayEaseDuration,
        ease: "power2.inOut",
      });
    }

    function handleItemClick(item, itemIndex) {
      if (S.isExpanded) {
        if (S.expandedItem) closeExpandedItem();
      } else {
        expandItem(item, itemIndex);
      }
    }

    function expandItem(item, itemIndex) {
      S.isExpanded = true;
      S.activeItem = item;
      S.activeItemId = item.id;
      S.canDrag = false;
      container.style.cursor = "auto";
      const imgSrc = item.querySelector("img").src;
      const titleIndex = itemIndex % items.length;
      const itemWidth = parseInt(item.dataset.width, 10);
      const itemHeight = parseInt(item.dataset.height, 10);
      setAndAnimateTitle(items[titleIndex]);

      const nameElement = item.querySelector(".item-name");
      const numberElement = item.querySelector(".item-number");
      const nameText = nameElement.textContent;
      const numberText = numberElement.textContent;

      const captionClone = item.querySelector(".item-caption").cloneNode(true);
      captionClone.classList.add("caption-clone");
      const nameClone = captionClone.querySelector(".item-name");
      const numberClone = captionClone.querySelector(".item-number");
      const nameCloneSplit = new SplitType(nameClone, { types: "words" });
      const numberCloneSplit = new SplitType(numberClone, { types: "words" });

      const captionRect = item
        .querySelector(".item-caption")
        .getBoundingClientRect();
      captionClone.style.left = `${captionRect.left}px`;
      captionClone.style.bottom = `${
        window.innerHeight - captionRect.bottom
      }px`;
      captionClone.style.width = `${captionRect.width}px`;
      captionClone.style.zIndex = "10002";
      document.body.appendChild(captionClone);
      item.querySelector(".item-caption").style.opacity = "0";

      gsap.to(nameCloneSplit.words, {
        y: "100%",
        opacity: 0,
        duration: 0.6,
        stagger: 0.03,
        ease: "power3.in",
      });
      gsap.to(numberCloneSplit.words, {
        y: "100%",
        opacity: 0,
        duration: 0.8,
        stagger: 0.02,
        delay: 0.05,
        ease: "power3.inOut",
        onComplete: () => {
          if (captionClone.parentNode) document.body.removeChild(captionClone);
        },
      });

      const rect = item.getBoundingClientRect();
      S.originalPosition = {
        id: item.id,
        rect: rect,
        imgSrc,
        width: itemWidth,
        height: itemHeight,
        nameText,
        numberText,
      };

      overlay.classList.add("active");
      animateOverlayIn();

      S.expandedItem = document.createElement("div");
      S.expandedItem.className = "expanded-item";
      S.expandedItem.style.width = `${itemWidth}px`;
      S.expandedItem.style.height = `${itemHeight}px`;
      S.expandedItem.style.zIndex = "10000";
      S.expandedItem.style.borderRadius = `var(--border-radius, 0px)`;
      const expImg = document.createElement("img");
      expImg.src = imgSrc;
      S.expandedItem.appendChild(expImg);
      S.expandedItem.addEventListener("click", closeExpandedItem);
      document.body.appendChild(S.expandedItem);

      document.querySelectorAll(".item").forEach((el) => {
        if (el !== S.activeItem)
          gsap.to(el, {
            opacity: 0,
            duration: settings.overlayEaseDuration,
            ease: "power2.inOut",
          });
      });

      const viewportWidth = window.innerWidth;
      const targetWidth = viewportWidth * settings.expandedScale;
      const aspectRatio = itemHeight / itemWidth;
      const targetHeight = targetWidth * aspectRatio;

      gsap.delayedCall(0.5, animateTitleIn);
      gsap.fromTo(
        S.expandedItem,
        {
          width: itemWidth,
          height: itemHeight,
          x: rect.left + itemWidth / 2 - window.innerWidth / 2,
          y: rect.top + itemHeight / 2 - window.innerHeight / 2,
        },
        {
          width: targetWidth,
          height: targetHeight,
          x: 0,
          y: 0,
          duration: settings.zoomDuration,
          ease: "hop",
        }
      );
    }

    function closeExpandedItem() {
      if (!S.expandedItem || !S.originalPosition) return;
      animateTitleOut();
      animateOverlayOut();

      document.querySelectorAll(".item").forEach((el) => {
        if (el.id !== S.activeItemId) {
          gsap.to(el, {
            opacity: 1,
            duration: settings.overlayEaseDuration,
            delay: 0.3,
            ease: "power2.inOut",
          });
        }
      });

      const originalItem = document.getElementById(S.activeItemId);
      if (originalItem) {
        const nameElement = originalItem.querySelector(".item-name");
        const numberElement = originalItem.querySelector(".item-number");
        nameElement.textContent = S.originalPosition.nameText;
        numberElement.textContent = S.originalPosition.numberText;
        originalItem.querySelector(".item-caption").style.opacity = "0";
      }

      const originalRect = S.originalPosition.rect;
      const originalWidth = S.originalPosition.width;
      const originalHeight = S.originalPosition.height;

      gsap.to(S.expandedItem, {
        width: originalWidth,
        height: originalHeight,
        x: originalRect.left + originalWidth / 2 - window.innerWidth / 2,
        y: originalRect.top + originalHeight / 2 - window.innerHeight / 2,
        duration: settings.zoomDuration,
        ease: "hop",
        onComplete: () => {
          if (originalItem) {
            const captionElement = originalItem.querySelector(".item-caption");
            const captionClone = document.createElement("div");
            captionClone.className = "caption-clone";
            captionClone.innerHTML = captionElement.innerHTML;
            const captionRect = captionElement.getBoundingClientRect();
            captionClone.style.position = "fixed";
            captionClone.style.left = `${captionRect.left}px`;
            captionClone.style.bottom = `${
              window.innerHeight - captionRect.bottom
            }px`;
            captionClone.style.width = `${captionRect.width}px`;
            captionClone.style.padding = "10px";
            captionClone.style.zIndex = "10002";
            document.body.appendChild(captionClone);
            const nameClone = captionClone.querySelector(".item-name");
            const numberClone = captionClone.querySelector(".item-number");
            nameClone.style.overflow = "hidden";
            numberClone.style.overflow = "hidden";
            const nameCloneSplit = new SplitType(nameClone, { types: "words" });
            const numberCloneSplit = new SplitType(numberClone, {
              types: "words",
            });
            gsap.set(nameCloneSplit.words, { y: "100%", opacity: 0 });
            gsap.set(numberCloneSplit.words, { y: "100%", opacity: 0 });
            gsap.to(nameCloneSplit.words, {
              y: "0%",
              opacity: 1,
              duration: 0.7,
              stagger: 0.03,
              ease: "power3.out",
            });
            gsap.to(numberCloneSplit.words, {
              y: "0%",
              opacity: 1,
              duration: 0.7,
              stagger: 0.02,
              delay: 0.05,
              ease: "power3.out",
              onComplete: () => {
                captionElement.style.opacity = "1";
                if (captionClone.parentNode)
                  document.body.removeChild(captionClone);
              },
            });
          }

          if (S.expandedItem && S.expandedItem.parentNode)
            document.body.removeChild(S.expandedItem);
          if (originalItem) originalItem.style.visibility = "visible";
          S.expandedItem = null;
          S.isExpanded = false;
          S.activeItem = null;
          S.originalPosition = null;
          S.activeItemId = null;
          S.canDrag = true;
          container.style.cursor = "grab";
          S.dragVelocityX = 0;
          S.dragVelocityY = 0;
          overlay.classList.remove("active");
        },
      });
    }

    // Animation loop
    function animate() {
      if (S.canDrag) {
        const ease = settings.dragEase;
        S.currentX += (S.targetX - S.currentX) * ease;
        S.currentY += (S.targetY - S.currentY) * ease;
        canvas.style.transform = `translate(${S.currentX}px, ${S.currentY}px)`;
        const now = Date.now();
        const distMoved = Math.sqrt(
          Math.pow(S.currentX - S.lastX, 2) + Math.pow(S.currentY - S.lastY, 2)
        );
        if (distMoved > 100 || now - S.lastUpdateTime > 120) {
          updateVisibleItems();
          S.lastX = S.currentX;
          S.lastY = S.currentY;
          S.lastUpdateTime = now;
        }
      }
      S.raf = requestAnimationFrame(animate);
    }

    // Input handlers
    function onMouseDown(e) {
      if (!S.canDrag) return;
      S.isDragging = true;
      S.mouseHasMoved = false;
      S.startX = e.clientX;
      S.startY = e.clientY;
      container.style.cursor = "grabbing";
    }
    function onMouseMove(e) {
      if (!S.isDragging || !S.canDrag) return;
      const dx = e.clientX - S.startX;
      const dy = e.clientY - S.startY;
      if (Math.abs(dx) > 5 || Math.abs(dy) > 5) S.mouseHasMoved = true;
      const now = Date.now();
      const dt = Math.max(10, now - S.lastDragTime);
      S.lastDragTime = now;
      S.dragVelocityX = dx / dt;
      S.dragVelocityY = dy / dt;
      S.targetX += dx;
      S.targetY += dy;
      S.startX = e.clientX;
      S.startY = e.clientY;
    }
    function onMouseUp() {
      if (!S.isDragging) return;
      S.isDragging = false;
      if (S.canDrag) {
        container.style.cursor = "grab";
        if (
          Math.abs(S.dragVelocityX) > 0.1 ||
          Math.abs(S.dragVelocityY) > 0.1
        ) {
          const momentumFactor = settings.momentumFactor;
          S.targetX += S.dragVelocityX * momentumFactor;
          S.targetY += S.dragVelocityY * momentumFactor;
        }
      }
    }

    function onTouchStart(e) {
      if (!S.canDrag) return;
      S.isDragging = true;
      S.mouseHasMoved = false;
      S.startX = e.touches[0].clientX;
      S.startY = e.touches[0].clientY;
    }
    function onTouchMove(e) {
      if (!S.isDragging || !S.canDrag) return;
      const dx = e.touches[0].clientX - S.startX;
      const dy = e.touches[0].clientY - S.startY;
      if (Math.abs(dx) > 5 || Math.abs(dy) > 5) S.mouseHasMoved = true;
      S.targetX += dx;
      S.targetY += dy;
      S.startX = e.touches[0].clientX;
      S.startY = e.touches[0].clientY;
    }

    function onResize() {
      if (S.isExpanded && S.expandedItem) {
        const viewportWidth = window.innerWidth;
        const targetWidth = viewportWidth * settings.expandedScale;
        const originalWidth = S.originalPosition.width;
        const originalHeight = S.originalPosition.height;
        const aspectRatio = originalHeight / originalWidth;
        const targetHeight = targetWidth * aspectRatio;
        gsap.to(S.expandedItem, {
          width: targetWidth,
          height: targetHeight,
          duration: 0.3,
          ease: "power2.out",
        });
      } else {
        updateVisibleItems();
      }
    }

    // Wire events
    container.addEventListener("mousedown", onMouseDown);
    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("mouseup", onMouseUp);
    container.addEventListener("touchstart", onTouchStart, { passive: true });
    window.addEventListener("touchmove", onTouchMove, { passive: true });
    window.addEventListener("resize", onResize);
    overlay.addEventListener("click", () => {
      if (S.isExpanded) closeExpandedItem();
    });

    // Initialize styles and start
    function initializeStyles() {
      updateBorderRadius();
      updateVignetteSize();
      updateHoverScale();
      updatePageVignette();
    }
    initializeStyles();

    updateVisibleItems();
    S.raf = requestAnimationFrame(animate);

    // Init Tweakpane after a short delay

    // Cleanup on unmount
    return () => {
      cancelAnimationFrame(S.raf);
      container.removeEventListener("mousedown", onMouseDown);
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mouseup", onMouseUp);
      container.removeEventListener("touchstart", onTouchStart);
      window.removeEventListener("touchmove", onTouchMove);
      window.removeEventListener("resize", onResize);
      overlay.removeEventListener("click", () => {});
      // Remove visible items
      S.visibleItems.forEach((id) => {
        const el = document.getElementById(id);
        if (el && el.parentNode === canvas) canvas.removeChild(el);
      });
      S.visibleItems.clear();
      // Destroy pane
      if (paneRef.current) paneRef.current.dispose();
      // Remove any expanded element
      if (S.expandedItem && S.expandedItem.parentNode)
        S.expandedItem.parentNode.removeChild(S.expandedItem);
      // Revert SplitType if exists
      if (S.titleSplit) S.titleSplit.revert();
    };
  }, []);

  return (
    <div className="gallery-root select-none bg-black !h-screen !overflow-hidden">
      <div className="h-screen cursor-grab" ref={containerRef}>
        <div className="canvas" id="canvas" ref={canvasRef}></div>
        <div className="overlay" id="overlay" ref={overlayRef}></div>
      </div>

      <div class="project-title">
        <p></p>
      </div>

      <div className="page-vignette-container">
        <div className="page-vignette"></div>
        <div className="page-vignette-strong"></div>
        <div className="page-vignette-extreme"></div>
      </div>
    </div>
  );
}
