import { useEffect, useRef, useState } from "react";

const INTERACTIVE_SELECTOR = [
  "a",
  "button",
  "[role='button']",
  "[data-cursor='interactive']",
  "[data-cursor='card']",
].join(", ");

const TEXT_INPUT_SELECTOR = [
  "input",
  "textarea",
  "select",
  "[contenteditable='true']",
].join(", ");

const MAGNETIC_SELECTOR = [
  "img",
  "[data-cursor='magnetic']",
].join(", ");

function clamp(value, min, max) {
  return Math.min(Math.max(value, min), max);
}

function lerp(start, end, amount) {
  return start + (end - start) * amount;
}

export default function CustomCursor() {
  const [isEnabled, setIsEnabled] = useState(false);
  const [cursorState, setCursorState] = useState({
    visible: false,
    interactive: false,
    magnetic: false,
    pressed: false,
    textInput: false,
  });

  const dotRef = useRef(null);
  const ringRef = useRef(null);
  const animationFrameRef = useRef(0);
  const magneticElementRef = useRef(null);
  const magneticRectRef = useRef(null);
  const stateRef = useRef(cursorState);
  const pointerRef = useRef({
    mouseX: 0,
    mouseY: 0,
    targetX: 0,
    targetY: 0,
    ringX: 0,
    ringY: 0,
    hasMoved: false,
  });

  useEffect(() => {
    stateRef.current = cursorState;
  }, [cursorState]);

  useEffect(() => {
    if (typeof window === "undefined") {
      return undefined;
    }

    const pointerQuery = window.matchMedia("(hover: hover) and (pointer: fine)");
    const reducedMotionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");

    const syncAvailability = () => {
      setIsEnabled(pointerQuery.matches && !reducedMotionQuery.matches);
    };

    syncAvailability();
    pointerQuery.addEventListener("change", syncAvailability);
    reducedMotionQuery.addEventListener("change", syncAvailability);

    return () => {
      pointerQuery.removeEventListener("change", syncAvailability);
      reducedMotionQuery.removeEventListener("change", syncAvailability);
    };
  }, []);

  useEffect(() => {
    if (!isEnabled) {
      document.documentElement.classList.remove("has-custom-cursor");
      return undefined;
    }

    document.documentElement.classList.add("has-custom-cursor");

    const commitState = (nextState) => {
      const current = stateRef.current;
      const hasChanged = Object.keys(nextState).some((key) => current[key] !== nextState[key]);

      if (!hasChanged) {
        return;
      }

      stateRef.current = nextState;
      setCursorState(nextState);
    };

    const renderDot = (x, y) => {
      if (!dotRef.current) {
        return;
      }

      dotRef.current.style.transform = `translate3d(${x}px, ${y}px, 0) translate(-50%, -50%)`;
    };

    const renderRing = (x, y) => {
      if (!ringRef.current) {
        return;
      }

      ringRef.current.style.transform = `translate3d(${x}px, ${y}px, 0) translate(-50%, -50%)`;
    };

    const updateMagneticRect = () => {
      magneticRectRef.current = magneticElementRef.current?.getBoundingClientRect() || null;
    };

    const applyHoverState = (target) => {
      const textInput = Boolean(target?.closest(TEXT_INPUT_SELECTOR));
      const interactive = !textInput && Boolean(target?.closest(INTERACTIVE_SELECTOR));
      const magneticElement = textInput ? null : target?.closest(MAGNETIC_SELECTOR) || null;

      if (magneticElementRef.current !== magneticElement) {
        magneticElementRef.current = magneticElement;
        updateMagneticRect();
      }

      commitState({
        ...stateRef.current,
        interactive,
        magnetic: Boolean(magneticElement),
        textInput,
      });
    };

    const syncPointerPosition = (clientX, clientY) => {
      const pointer = pointerRef.current;
      let targetX = clientX;
      let targetY = clientY;

      if (magneticRectRef.current) {
        const rect = magneticRectRef.current;
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        const offsetX = clamp((centerX - clientX) * 0.14, -18, 18);
        const offsetY = clamp((centerY - clientY) * 0.14, -18, 18);

        targetX += offsetX;
        targetY += offsetY;
      }

      pointer.mouseX = clientX;
      pointer.mouseY = clientY;
      pointer.targetX = targetX;
      pointer.targetY = targetY;

      if (!pointer.hasMoved) {
        pointer.hasMoved = true;
        pointer.ringX = targetX;
        pointer.ringY = targetY;
        renderRing(targetX, targetY);
      }

      renderDot(targetX, targetY);
    };

    const animate = () => {
      const pointer = pointerRef.current;
      pointer.ringX = lerp(pointer.ringX, pointer.targetX, 0.18);
      pointer.ringY = lerp(pointer.ringY, pointer.targetY, 0.18);
      renderRing(pointer.ringX, pointer.ringY);
      animationFrameRef.current = window.requestAnimationFrame(animate);
    };

    const showCursor = () => {
      if (stateRef.current.visible) {
        return;
      }

      commitState({
        ...stateRef.current,
        visible: true,
      });
    };

    const hideCursor = () => {
      commitState({
        ...stateRef.current,
        visible: false,
        pressed: false,
      });
    };

    const handlePointerMove = (event) => {
      showCursor();
      applyHoverState(event.target);
      syncPointerPosition(event.clientX, event.clientY);
    };

    const handlePointerDown = () => {
      commitState({
        ...stateRef.current,
        pressed: true,
      });
    };

    const handlePointerUp = () => {
      commitState({
        ...stateRef.current,
        pressed: false,
      });
    };

    const handlePointerOut = (event) => {
      if (event.relatedTarget) {
        return;
      }

      hideCursor();
    };

    const handleWindowBlur = () => {
      hideCursor();
    };

    const handleVisibilityChange = () => {
      if (document.visibilityState === "hidden") {
        hideCursor();
      }
    };

    window.addEventListener("pointermove", handlePointerMove, { passive: true });
    window.addEventListener("pointerdown", handlePointerDown, { passive: true });
    window.addEventListener("pointerup", handlePointerUp, { passive: true });
    window.addEventListener("mouseout", handlePointerOut);
    window.addEventListener("blur", handleWindowBlur);
    window.addEventListener("scroll", updateMagneticRect, { passive: true, capture: true });
    window.addEventListener("resize", updateMagneticRect, { passive: true });
    document.addEventListener("visibilitychange", handleVisibilityChange);
    animationFrameRef.current = window.requestAnimationFrame(animate);

    return () => {
      document.documentElement.classList.remove("has-custom-cursor");
      window.cancelAnimationFrame(animationFrameRef.current);
      window.removeEventListener("pointermove", handlePointerMove);
      window.removeEventListener("pointerdown", handlePointerDown);
      window.removeEventListener("pointerup", handlePointerUp);
      window.removeEventListener("mouseout", handlePointerOut);
      window.removeEventListener("blur", handleWindowBlur);
      window.removeEventListener("scroll", updateMagneticRect, true);
      window.removeEventListener("resize", updateMagneticRect);
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, [isEnabled]);

  if (!isEnabled) {
    return null;
  }

  const cursorClassName = [
    "custom-cursor",
    cursorState.visible ? "is-visible" : "",
    cursorState.interactive ? "is-interactive" : "",
    cursorState.magnetic ? "is-magnetic" : "",
    cursorState.pressed ? "is-pressed" : "",
    cursorState.textInput ? "is-text-input" : "",
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <div className={cursorClassName} aria-hidden="true">
      <span ref={ringRef} className="custom-cursor__ring" />
      <span ref={dotRef} className="custom-cursor__dot" />
    </div>
  );
}
