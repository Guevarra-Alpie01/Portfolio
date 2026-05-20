import { useEffect, useMemo, useState, useSyncExternalStore } from "react";

function subscribeReducedMotion(listener) {
  const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
  mq.addEventListener("change", listener);
  return () => mq.removeEventListener("change", listener);
}

function getReducedMotion() {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

function safeConnectionSaveData() {
  try {
    return Boolean(navigator.connection?.saveData);
  } catch {
    return false;
  }
}

/**
 * Capability signal for immersive WebGL / scroll-driven motion layers.
 */
export default function useImmersive3DEligible() {
  const prefersReducedMotion = useSyncExternalStore(subscribeReducedMotion, getReducedMotion, () => false);
  const [saveDataHint, setSaveDataHint] = useState(() =>
    typeof window === "undefined" ? false : safeConnectionSaveData(),
  );

  useEffect(() => {
    function readSaveData() {
      setSaveDataHint(safeConnectionSaveData());
    }

    const conn = navigator.connection;
    conn?.addEventListener?.("change", readSaveData);
    return () => conn?.removeEventListener?.("change", readSaveData);
  }, []);

  return useMemo(() => {
    const cores = typeof navigator.hardwareConcurrency === "number" ? navigator.hardwareConcurrency : 8;
    const gigabytes = typeof navigator.deviceMemory === "number" ? navigator.deviceMemory : null;

    /** @type {"high" | "medium" | "off"} */
    let tier = "high";

    if (prefersReducedMotion || saveDataHint) {
      tier = "off";
    } else if (cores <= 2 || gigabytes === 2 || gigabytes === 1 || gigabytes === 0.5) {
      tier = "off";
    } else if (cores <= 4 || gigabytes === 4 || gigabytes === 3) {
      tier = "medium";
    }

    return {
      prefersReducedMotion,
      tier,
      /** WebGL canvases allowed */
      allowWebGl: tier !== "off",
      /** Fewer meshes / lighter materials */
      isReducedQuality: tier === "medium",
    };
  }, [prefersReducedMotion, saveDataHint]);
}
