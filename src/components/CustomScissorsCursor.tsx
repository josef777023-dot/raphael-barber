import { useEffect, useRef } from "react";

/**
 * ============================================================================
 * Adjustable knobs — change these to retune the cursor without touching any
 * of the logic below.
 * ============================================================================
 */
// Visible on-screen size of the cursor graphic, in CSS pixels (spec range: 28–32).
const CURSOR_SIZE_PX = 30;

// The SVG's own coordinate space, and the (x, y) inside it where the two
// blades converge when fully CLOSED — that point is the click "hotspot",
// used to offset the graphic so it (not the image's corner) sits exactly on
// the real mouse position. The blades are drawn OPEN at rest (see the SVG
// file) and rotate closed around the pivot on click — see CLOSE_ROTATION_DEG.
const SVG_VIEWBOX_SIZE = 32;
const SVG_TIP_X = 4;
const SVG_TIP_Y = 4;

// How quickly the cursor eases toward the real pointer position each frame.
// 1 = snaps instantly. Lower = a slightly laggier/smoother trail. Forced to 1
// automatically when the user has "prefers-reduced-motion" enabled.
const FOLLOW_EASE = 0.35;

// --- Glow ---------------------------------------------------------------
// Permanent, very subtle idle glow around the tip (always on).
const GLOW_DIAMETER_PX = 14;
const GLOW_IDLE_BLUR_PX = 8;
const GLOW_IDLE_SPREAD_PX = 1;
const GLOW_IDLE_COLOR = "rgba(200, 164, 93, 0.55)";
// Stronger glow while the click animation is playing.
const GLOW_CLICK_BLUR_PX = 18;
const GLOW_CLICK_SPREAD_PX = 4;
const GLOW_CLICK_COLOR = "rgba(226, 194, 122, 0.9)";

// --- Click feedback ("snip") -----------------------------------------------
// Total duration of the click feedback (spec range: 150–250ms).
const CLICK_ANIMATION_MS = 200;
// How far each blade rotates to CLOSE on click (degrees, toward the shared
// centerline). Matches the two blade groups authored in the SVG — increase
// for a wider open/close swing, decrease for a subtler snip.
const CLOSE_ROTATION_DEG = 16;
// Size of the one-shot fading ring pulse, relative to GLOW_DIAMETER_PX.
const PULSE_MAX_SCALE = 3.4;

const CURSOR_ASSET_URL = "/assets/cursors/scissors-cursor.svg";

const HOTSPOT_OFFSET_X = (SVG_TIP_X / SVG_VIEWBOX_SIZE) * CURSOR_SIZE_PX;
const HOTSPOT_OFFSET_Y = (SVG_TIP_Y / SVG_VIEWBOX_SIZE) * CURSOR_SIZE_PX;

function prefersReducedMotion() {
  return typeof window !== "undefined" && !!window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

/**
 * Renders a small gold scissors graphic that follows the real mouse cursor,
 * drawn open at rest and snipping closed on click — like a barber's cut.
 *
 * Purely additive and purely visual: it never touches layout, hover states, or
 * the styling of any other element on the page. It only ever hides the native
 * OS cursor (required for a custom cursor to make sense) and restores it the
 * moment this component is inactive, unmounted, or anything here fails.
 */
export function CustomScissorsCursor() {
  const rootRef = useRef<HTMLDivElement | null>(null);
  const glowRef = useRef<HTMLDivElement | null>(null);
  const pulseRef = useRef<HTMLDivElement | null>(null);
  const svgHostRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const root = rootRef.current;
    const glow = glowRef.current;
    const pulse = pulseRef.current;
    const svgHost = svgHostRef.current;
    // No matchMedia support (very old browser) → leave the native cursor alone.
    if (!root || !glow || !pulse || !svgHost || typeof window.matchMedia !== "function") return;

    let reducedMotion = prefersReducedMotion();
    let stopActive: (() => void) | null = null;
    let cancelled = false;
    // Set by activate() to its own visibility check; cleared on teardown. Lets
    // the SVG fetch below reveal the cursor the moment it's ready, without a
    // recurring timer.
    let notifyReady: (() => void) | null = null;

    const motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const onMotionChange = () => {
      reducedMotion = motionQuery.matches;
    };
    motionQuery.addEventListener?.("change", onMotionChange);

    // Fetch the scissors artwork once and inject it inline (rather than an
    // <img>) so the two blade groups inside it (#blade-a / #blade-b) can be
    // rotated independently via CSS for the open/close "snip" animation.
    let svgReady = false;
    fetch(CURSOR_ASSET_URL)
      .then((res) => (res.ok ? res.text() : Promise.reject(new Error("cursor asset not ok"))))
      .then((svgText) => {
        if (cancelled) return;
        svgHost.innerHTML = svgText;
        const hasBothBlades = svgHost.querySelector("#blade-a") && svgHost.querySelector("#blade-b");
        if (!hasBothBlades) throw new Error("cursor asset missing blade groups");
        svgReady = true;
        notifyReady?.();
      })
      .catch(() => {
        // Asset missing/malformed → leave the native cursor in place entirely.
        stopActive?.();
      });

    /**
     * Wires up all mouse listeners + the render loop. Returns a matching
     * teardown function. Only ever called while a fine-pointer mouse is
     * detected — see the pointerQuery watcher below, which calls this on
     * mount and again any time the device's input capability changes (e.g.
     * a hybrid laptop/tablet switching between touch and a plugged-in mouse).
     */
    const activate = () => {
      let rafId = 0;
      let clickTimeoutId = 0;
      let targetX = 0;
      let targetY = 0;
      let currentX = 0;
      let currentY = 0;
      let hasPosition = false;

      // A dedicated class + a `* { cursor: none !important }` rule (below) is
      // used instead of setting `document.documentElement.style.cursor`
      // directly: many elements (links, buttons) carry their own explicit
      // "cursor: pointer" from the browser's UA stylesheet or from Tailwind's
      // preflight, which otherwise wins over anything merely inherited from <html>.
      document.documentElement.classList.add("rb-cursor-active");

      const showIfReady = () => {
        if (hasPosition && svgReady) root.style.opacity = "1";
      };
      notifyReady = showIfReady;

      const render = () => {
        const ease = reducedMotion ? 1 : FOLLOW_EASE;
        currentX += (targetX - currentX) * ease;
        currentY += (targetY - currentY) * ease;
        root.style.transform = `translate3d(${currentX - HOTSPOT_OFFSET_X}px, ${currentY - HOTSPOT_OFFSET_Y}px, 0)`;
        rafId = requestAnimationFrame(render);
      };
      rafId = requestAnimationFrame(render);

      const onPointerMove = (event: PointerEvent) => {
        targetX = event.clientX;
        targetY = event.clientY;
        if (!hasPosition) {
          // Snap on the very first reading (don't ease in from a stale corner),
          // and only reveal the cursor once we actually know where the mouse is
          // AND the scissors artwork has finished loading.
          currentX = targetX;
          currentY = targetY;
          hasPosition = true;
          showIfReady();
        }
      };

      const onWindowLeave = () => {
        root.style.opacity = "0";
      };
      const onWindowEnter = () => showIfReady();

      const onPointerDown = () => {
        if (reducedMotion) return; // Reduced motion: static open cursor only, no click effects.
        window.clearTimeout(clickTimeoutId);

        glow.style.boxShadow = `0 0 ${GLOW_CLICK_BLUR_PX}px ${GLOW_CLICK_SPREAD_PX}px ${GLOW_CLICK_COLOR}`;
        root.classList.add("rb-scissors-closing"); // snips the blades shut

        // Restart the pulse animation on every click by toggling the class off/on.
        pulse.classList.remove("rb-scissors-pulse-play");
        void pulse.offsetWidth; // force reflow so the animation restarts from scratch
        pulse.classList.add("rb-scissors-pulse-play");

        clickTimeoutId = window.setTimeout(() => {
          glow.style.boxShadow = `0 0 ${GLOW_IDLE_BLUR_PX}px ${GLOW_IDLE_SPREAD_PX}px ${GLOW_IDLE_COLOR}`;
          root.classList.remove("rb-scissors-closing"); // springs back open
        }, CLICK_ANIMATION_MS);
      };

      window.addEventListener("pointermove", onPointerMove, { passive: true });
      document.documentElement.addEventListener("mouseleave", onWindowLeave);
      document.documentElement.addEventListener("mouseenter", onWindowEnter);
      window.addEventListener("pointerdown", onPointerDown, { passive: true });

      return () => {
        cancelAnimationFrame(rafId);
        window.clearTimeout(clickTimeoutId);
        window.removeEventListener("pointermove", onPointerMove);
        document.documentElement.removeEventListener("mouseleave", onWindowLeave);
        document.documentElement.removeEventListener("mouseenter", onWindowEnter);
        window.removeEventListener("pointerdown", onPointerDown);
        document.documentElement.classList.remove("rb-cursor-active");
        root.classList.remove("rb-scissors-closing");
        root.style.opacity = "0";
        stopActive = null;
        notifyReady = null;
      };
    };

    const pointerQuery = window.matchMedia("(hover: hover) and (pointer: fine)");
    const syncActivation = () => {
      if (pointerQuery.matches && !stopActive) {
        stopActive = activate();
      } else if (!pointerQuery.matches && stopActive) {
        stopActive();
      }
    };
    syncActivation();
    pointerQuery.addEventListener?.("change", syncActivation);

    return () => {
      cancelled = true;
      pointerQuery.removeEventListener?.("change", syncActivation);
      motionQuery.removeEventListener?.("change", onMotionChange);
      stopActive?.();
    };
  }, []);

  return (
    <>
      <style>{`
        /*
          Hides the native OS cursor everywhere while this component is active
          (added/removed via the "rb-cursor-active" class on <html>). Using
          "!important" on a universal selector is required here because many
          elements (links, buttons) declare their own "cursor: pointer" directly
          — a value simply inherited on <html> would lose to that every time.
          This is the only global rule this component adds; it never touches
          any other property, so no layout, color, or hover styling is affected.
        */
        html.rb-cursor-active,
        html.rb-cursor-active * {
          cursor: none !important;
        }
        .rb-scissors-cursor-root {
          position: fixed;
          top: 0;
          left: 0;
          width: ${CURSOR_SIZE_PX}px;
          height: ${CURSOR_SIZE_PX}px;
          pointer-events: none;
          z-index: 999999;
          opacity: 0;
          will-change: transform;
        }
        .rb-scissors-cursor-svg-host {
          display: block;
          width: 100%;
          height: 100%;
        }
        .rb-scissors-cursor-svg-host svg {
          display: block;
          width: 100%;
          height: 100%;
          overflow: visible;
        }
        /* The two blades rotate around the shared pivot (15,15 in the 32x32
           viewBox) to snip shut on click, then spring back open. */
        .rb-scissors-cursor-svg-host :is(#blade-a, #blade-b) {
          transform-box: view-box;
          transform-origin: 15px 15px;
          transition: transform ${CLICK_ANIMATION_MS}ms ease-out;
        }
        .rb-scissors-closing .rb-scissors-cursor-svg-host #blade-a {
          transform: rotate(${CLOSE_ROTATION_DEG}deg);
        }
        .rb-scissors-closing .rb-scissors-cursor-svg-host #blade-b {
          transform: rotate(${-CLOSE_ROTATION_DEG}deg);
        }
        .rb-scissors-cursor-glow {
          position: absolute;
          left: ${HOTSPOT_OFFSET_X}px;
          top: ${HOTSPOT_OFFSET_Y}px;
          width: ${GLOW_DIAMETER_PX}px;
          height: ${GLOW_DIAMETER_PX}px;
          transform: translate(-50%, -50%);
          border-radius: 999px;
          pointer-events: none;
          box-shadow: 0 0 ${GLOW_IDLE_BLUR_PX}px ${GLOW_IDLE_SPREAD_PX}px ${GLOW_IDLE_COLOR};
          transition: box-shadow ${CLICK_ANIMATION_MS}ms ease-out;
        }
        .rb-scissors-pulse {
          position: absolute;
          left: ${HOTSPOT_OFFSET_X}px;
          top: ${HOTSPOT_OFFSET_Y}px;
          width: ${GLOW_DIAMETER_PX}px;
          height: ${GLOW_DIAMETER_PX}px;
          margin-left: -${GLOW_DIAMETER_PX / 2}px;
          margin-top: -${GLOW_DIAMETER_PX / 2}px;
          border-radius: 999px;
          border: 1.5px solid rgba(226, 194, 122, 0.9);
          opacity: 0;
          pointer-events: none;
        }
        .rb-scissors-pulse-play {
          animation: rb-scissors-pulse-anim ${CLICK_ANIMATION_MS}ms ease-out;
        }
        @keyframes rb-scissors-pulse-anim {
          0% {
            opacity: 0.9;
            transform: scale(1);
          }
          100% {
            opacity: 0;
            transform: scale(${PULSE_MAX_SCALE});
          }
        }
        @media (prefers-reduced-motion: reduce) {
          .rb-scissors-cursor-svg-host :is(#blade-a, #blade-b) {
            transition: none;
          }
          .rb-scissors-cursor-glow {
            transition: none;
          }
        }
      `}</style>
      <div ref={rootRef} className="rb-scissors-cursor-root" aria-hidden="true">
        <div ref={glowRef} className="rb-scissors-cursor-glow" />
        <div ref={pulseRef} className="rb-scissors-pulse" />
        <div ref={svgHostRef} className="rb-scissors-cursor-svg-host" />
      </div>
    </>
  );
}
