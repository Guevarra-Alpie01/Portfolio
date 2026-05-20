import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { Suspense, useEffect, useMemo, useRef, useState } from "react";

import { readPortfolioNeonPalette } from "../../lib/readThemeColors.js";

function makePaletteThree() {
  const { ember, emberSoft, ink } = readPortfolioNeonPalette();

  /** @returns {THREE.Vector3Tuple} */
  const tri = ([r, g, b]) => [r / 255, g / 255, b / 255];

  return {
    ember: tri(ember),
    emberSoft: tri(emberSoft),
    inkTri: ink,
    fogColorRgb: tri(ink),
  };
}

/** @typedef {{ paused: boolean; tier: string }} FormationProps */

function GeometricFormation({ paused, tier }) {
  /** @type {React.RefObject<THREE.Group | null>} */
  const groupRef = useRef(null);

  const palette = useMemo(() => makePaletteThree(), []);

  const shapes = useMemo(() => {
    const count = tier === "medium" ? 5 : 8;
    const ring = tier === "medium" ? 3.35 : 3.95;
    /** @type {Array<{ index: string; position: THREE.Vector3Tuple; geo: "icosahedron" | "octahedron" | "torus"; rot: THREE.Vector3Tuple }>} */
    const items = [];

    for (let i = 0; i < count; i += 1) {
      const t = count > 1 ? i / Math.max(count - 1, 1) : 0;
      const yaw = i * Math.PI * 0.9 + (count % 2 !== 0 ? 1.1 : 0);
      const pitch = (Math.sin(t * Math.PI * 1.85) + 1) * Math.PI * 0.52;
      items.push({
        index: `shape-${i}`,
        position: [
          Math.sin(yaw) * ring * Math.sin(pitch),
          Math.cos(pitch) * ring * 0.65,
          Math.cos(yaw) * ring * Math.sin(pitch),
        ],
        geo: ["icosahedron", "octahedron", "torus"][i % 3],
        rot: [i * 0.55 + 0.2, i * 0.71 - 0.35, yaw * 0.28],
      });
    }

    return items;
  }, [tier]);

  useFrame((_, delta) => {
    const grp = groupRef.current;
    if (!grp || paused) {
      return;
    }

    grp.rotation.y += delta * 0.07;
    grp.rotation.x += delta * 0.024;
    grp.rotation.z += delta * 0.011;

    const desiredZ = tier === "medium" ? -0.4 : -0.6;
    grp.position.z += (desiredZ - grp.position.z) * Math.min(1, delta * 3.2);
  });

  const shardDetail = tier === "medium" ? 0 : 1;
  const shardScale = tier === "medium" ? 0.94 : 1.05;

  return (
    <group ref={groupRef} position={[0.15, tier === "medium" ? 0 : -0.25, tier === "medium" ? -0.2 : -0.35]}>
      {shapes.map((shape) => {
        const geoNode =
          shape.geo === "torus" ? (
            <torusGeometry args={[1.08, tier === "medium" ? 0.24 : 0.22, shardDetail !== 0 ? 44 : 32, shardDetail !== 0 ? 22 : 16]} />
          ) : shape.geo === "octahedron" ? (
            <octahedronGeometry args={[1.25, shardDetail]} />
          ) : (
            <icosahedronGeometry args={[1.42, shardDetail]} />
          );

        const emissiveAccent = tier === "medium" ? 0.12 : 0.18;

        return (
          <mesh key={shape.index} position={shape.position} rotation={shape.rot} scale={shardScale}>
            {geoNode}
            {/* eslint-disable-next-line react/no-unknown-property */}
            <meshPhysicalMaterial
              color={new THREE.Color(...palette.fogColorRgb)}
              emissive={new THREE.Color(...palette.ember)}
              emissiveIntensity={emissiveAccent}
              roughness={tier === "medium" ? 0.32 : 0.22}
              metalness={tier === "medium" ? 0.88 : 0.94}
              clearcoat={0.85}
              clearcoatRoughness={0.42}
              iridescence={tier === "medium" ? 0 : 0.12}
              iridescenceIOR={tier === "medium" ? 1 : 1.06}
              sheen={0.22}
              sheenRoughness={0.55}
              sheenColor={new THREE.Color(...palette.emberSoft)}
            />
          </mesh>
        );
      })}
    </group>
  );
}

/** @typedef {{ paused: boolean; tier: string }} BackgroundSceneProps */

function BackgroundScene({ paused, tier }) {
  const palette = useMemo(() => makePaletteThree(), []);

  const fogTone = useMemo(() => new THREE.Color(...palette.fogColorRgb), [palette]);

  const keyLightTone = useMemo(
    () =>
      new THREE.Color(
        THREE.MathUtils.clamp(palette.fogColorRgb[0] * 2.05, 0, 1),
        THREE.MathUtils.clamp(palette.fogColorRgb[1] * 2.12, 0, 1),
        THREE.MathUtils.clamp(palette.fogColorRgb[2] * 2.15, 0, 1),
      ),
    [palette],
  );

  return (
    <>
      {/* eslint-disable-next-line react/no-unknown-property */}
      <color attach="background" args={[fogTone]} />
      {/* eslint-disable-next-line react/no-unknown-property */}
      <ambientLight intensity={tier === "medium" ? 0.06 : 0.085} />
      {/* eslint-disable-next-line react/no-unknown-property */}
      <directionalLight position={[14, 22, -18]} intensity={tier === "medium" ? 0.45 : 0.68} color={keyLightTone} />
      {/* eslint-disable-next-line react/no-unknown-property */}
      <pointLight
        position={[-22, -10, -12]}
        intensity={tier === "medium" ? 0.32 : 0.52}
        color={new THREE.Color(...palette.ember)}
        distance={148}
        decay={2}
      />
      {/* eslint-disable-next-line react/no-unknown-property */}
      <pointLight
        position={[18, 8, -8]}
        intensity={tier === "medium" ? 0.26 : 0.36}
        color={new THREE.Color(...palette.emberSoft)}
        distance={132}
        decay={2}
      />

      <GeometricFormation paused={paused} tier={tier} />
    </>
  );
}

/**
 * Slow orbiting shards with fog depth fading + peripheral blur veil (budget vs shader DOF).
 * @param {{ active: boolean; tier: string }} props
 */
export default function PortfolioBackground3D({ active, tier }) {
  const [paused, setPaused] = useState(
    typeof document !== "undefined" ? document.hidden : false,
  );

  useEffect(() => {
    function sync() {
      setPaused(document.hidden);
    }

    document.addEventListener("visibilitychange", sync);
    return () => document.removeEventListener("visibilitychange", sync);
  }, []);

  const dprMax = typeof window !== "undefined" ? Math.min(window.devicePixelRatio || 1, 2) : 1;
  /** @type {[number, number]} */
  const dprRange = tier === "medium" ? [1, 1] : [1, dprMax];

  if (!active) {
    return null;
  }

  return (
    <div className="portfolio-three-host" aria-hidden>
      <Canvas
        className="portfolio-three-canvas"
        resize={{ scroll: false, debounce: { scroll: 50, resize: 140 } }}
        dpr={dprRange}
        camera={{
          position: [0.35, -0.05, tier === "medium" ? 10.15 : 10.35],
          near: 0.45,
          far: tier === "medium" ? 36 : 44,
          fov: 44,
        }}
        gl={{
          alpha: true,
          antialias: tier !== "medium",
          stencil: false,
          depth: true,
          powerPreference: "high-performance",
          preserveDrawingBuffer: false,
        }}
        onCreated={({ gl, scene }) => {
          const bgHex = scene.background instanceof THREE.Color ? scene.background.getHex() : 0x0f0f11;
          scene.fog = new THREE.FogExp2(bgHex, tier === "medium" ? 0.048 : 0.041);
          gl.setClearAlpha(0);
        }}
      >
        <Suspense fallback={null}>
          <BackgroundScene paused={paused} tier={tier} />
        </Suspense>
      </Canvas>

      <div className="portfolio-three-dof-veil" />
    </div>
  );
}
