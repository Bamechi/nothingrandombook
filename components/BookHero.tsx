"use client";

import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Float, Environment, ContactShadows } from "@react-three/drei";
import { Suspense, useEffect, useMemo, useRef, useState } from "react";
import * as THREE from "three";
import { makeBackCover, makeSpine, makePages } from "@/lib/coverTexture";

/**
 * The hero canvas: a dimensional constellation — fine particles, forming and
 * breaking connection lines, restrained red pulses — around the floating
 * hardcover. Seemingly random points revealing that everything is connected.
 */

interface BookTextures {
  front: THREE.Texture;
  back: THREE.Texture;
  spine: THREE.Texture;
  pages: THREE.Texture;
}

function useBookTextures(): BookTextures | null {
  const [tex, setTex] = useState<BookTextures | null>(null);
  useEffect(() => {
    let alive = true;
    (async () => {
      const loader = new THREE.TextureLoader();
      const [front, back, spine] = await Promise.all([
        loader.loadAsync("/images/book/cover-front-v4.jpg"),
        makeBackCover().then((c) => new THREE.CanvasTexture(c)),
        makeSpine().then((c) => new THREE.CanvasTexture(c)),
      ]);
      if (!alive) return;
      const prep = (t: THREE.Texture) => {
        t.anisotropy = 8;
        t.colorSpace = THREE.SRGBColorSpace;
        return t;
      };
      setTex({
        front: prep(front),
        back: prep(back),
        spine: prep(spine),
        pages: prep(new THREE.CanvasTexture(makePages())),
      });
    })();
    return () => {
      alive = false;
    };
  }, []);
  return tex;
}

/* ---------------- the constellation ---------------- */

interface FieldConfig {
  count: number;
  anchors: number;
  reduced: boolean;
  introClock: React.MutableRefObject<number | null> | null;
}

/** 0→1 ramp with clamping */
function ramp(e: number, from: number, dur: number) {
  return Math.max(0, Math.min(1, (e - from) / dur));
}
function easeOutCubic(x: number) {
  return 1 - Math.pow(1 - x, 3);
}

function seededRandom(seed: number) {
  let s = seed;
  return () => {
    s = (s * 16807) % 2147483647;
    return (s - 1) / 2147483646;
  };
}

function ConstellationField({ count, anchors, reduced, introClock }: FieldConfig) {
  const group = useRef<THREE.Group>(null);
  const redRef = useRef<THREE.Points>(null);
  const lineGroups = useRef<(THREE.LineSegments | null)[]>([]);
  const { pointer, viewport } = useThree();

  const { positions, redPositions, lineGroupsGeo } = useMemo(() => {
    const rand = seededRandom(442144);
    const pos = new Float32Array(count * 3);
    // three loose clusters plus an even field
    const clusters = [
      [-3.4, 1.6, -2.5],
      [3.1, -0.8, -1.5],
      [0.4, 2.6, -4],
    ];
    for (let i = 0; i < count; i++) {
      const c = i % 4;
      if (c < clusters.length && rand() > 0.45) {
        const [cx, cy, cz] = clusters[c];
        pos[i * 3] = cx + (rand() - 0.5) * 3.4;
        pos[i * 3 + 1] = cy + (rand() - 0.5) * 2.4;
        pos[i * 3 + 2] = cz + (rand() - 0.5) * 2.8;
      } else {
        pos[i * 3] = (rand() - 0.5) * 13;
        pos[i * 3 + 1] = (rand() - 0.5) * 9;
        pos[i * 3 + 2] = -1.5 - rand() * 6.5;
      }
    }
    // restrained red pulses
    const redCount = Math.max(14, Math.floor(count * 0.02));
    const red = new Float32Array(redCount * 3);
    for (let i = 0; i < redCount; i++) {
      const j = Math.floor(rand() * count);
      red[i * 3] = pos[j * 3];
      red[i * 3 + 1] = pos[j * 3 + 1];
      red[i * 3 + 2] = pos[j * 3 + 2] + 0.01;
    }
    // constellation lines among anchor points, split into 3 phase groups
    const anchorIdx: number[] = [];
    for (let i = 0; i < anchors; i++) anchorIdx.push(Math.floor(rand() * count));
    const segsByGroup: number[][] = [[], [], []];
    let total = 0;
    for (let a = 0; a < anchorIdx.length && total < 260; a++) {
      for (let b = a + 1; b < anchorIdx.length && total < 260; b++) {
        const i = anchorIdx[a] * 3;
        const j = anchorIdx[b] * 3;
        const dx = pos[i] - pos[j];
        const dy = pos[i + 1] - pos[j + 1];
        const dz = pos[i + 2] - pos[j + 2];
        const d2 = dx * dx + dy * dy + dz * dz;
        if (d2 < 4.6) {
          const g = total % 3;
          segsByGroup[g].push(pos[i], pos[i + 1], pos[i + 2], pos[j], pos[j + 1], pos[j + 2]);
          total++;
        }
      }
    }
    const geos = segsByGroup.map((flat) => {
      const g = new THREE.BufferGeometry();
      g.setAttribute("position", new THREE.Float32BufferAttribute(flat, 3));
      return g;
    });
    return { positions: pos, redPositions: red, lineGroupsGeo: geos };
  }, [count, anchors]);

  const whiteRef = useRef<THREE.Points>(null);

  useFrame((state) => {
    if (reduced) return;
    const t = state.clock.elapsedTime;
    // the formation intro: random points → connections → pulses → the book
    let e = Infinity;
    if (introClock) {
      if (introClock.current === null) introClock.current = t;
      e = t - introClock.current;
    }
    const pointsIn = ramp(e, 0, 1.3);
    const linesIn = ramp(e, 1.0, 1.5);
    const redIn = ramp(e, 1.7, 1.0);
    // scroll progress across the hero drives forming/breaking connections
    const scroll = typeof window === "undefined" ? 0 : Math.min(1, window.scrollY / (window.innerHeight * 0.9));
    if (group.current) {
      group.current.rotation.y = Math.sin(t * 0.05) * 0.12 + pointer.x * 0.06 + scroll * 0.35;
      group.current.rotation.x = Math.cos(t * 0.04) * 0.06 - pointer.y * 0.04 + scroll * 0.12;
      // during the intro the field drifts toward the viewer — the world assembling
      group.current.position.z = scroll * 1.6 + (1 - easeOutCubic(ramp(e, 0, 3.0))) * -2.2;
    }
    if (whiteRef.current) {
      (whiteRef.current.material as THREE.PointsMaterial).opacity = 0.78 * pointsIn;
    }
    lineGroups.current.forEach((lg, i) => {
      if (!lg) return;
      const mat = lg.material as THREE.LineBasicMaterial;
      // each family of connections forms, breaks, and reconnects on its own phase
      const phase = Math.sin(t * (0.22 + i * 0.09) + i * 2.1 + scroll * 6);
      mat.opacity = Math.max(0, 0.05 + 0.16 * phase + scroll * 0.05) * linesIn;
    });
    if (redRef.current) {
      const mat = redRef.current.material as THREE.PointsMaterial;
      mat.opacity = (0.45 + 0.4 * Math.sin(t * 0.9)) * redIn;
    }
  });

  void viewport;
  return (
    <group ref={group}>
      <points ref={whiteRef}>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[positions, 3]} />
        </bufferGeometry>
        <pointsMaterial
          color="#dcd9d2"
          size={0.022}
          sizeAttenuation
          transparent
          opacity={0.78}
          depthWrite={false}
        />
      </points>
      <points ref={redRef}>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[redPositions, 3]} />
        </bufferGeometry>
        <pointsMaterial
          color="#ff4b55"
          size={0.05}
          sizeAttenuation
          transparent
          opacity={0.7}
          depthWrite={false}
        />
      </points>
      {lineGroupsGeo.map((geo, i) => (
        <lineSegments
          key={i}
          geometry={geo}
          ref={(el) => {
            lineGroups.current[i] = el;
          }}
        >
          <lineBasicMaterial
            color={i === 2 ? "#a83238" : "#8e8b84"}
            transparent
            opacity={0.12}
            blending={THREE.AdditiveBlending}
            depthWrite={false}
          />
        </lineSegments>
      ))}
    </group>
  );
}

/* ---------------- the book ---------------- */

function Book({ textures, reduced }: { textures: BookTextures; reduced: boolean }) {
  const group = useRef<THREE.Group>(null);
  const W = 2.05;
  const H = 2.87;
  const D = 0.42;

  const pageMat = useMemo(
    () => new THREE.MeshStandardMaterial({ map: textures.pages, roughness: 0.85, metalness: 0 }),
    [textures]
  );
  const paperMat = useMemo(
    () => new THREE.MeshStandardMaterial({ color: "#f7f5f0", roughness: 0.62, metalness: 0.02 }),
    []
  );
  const frontMat = useMemo(
    () => new THREE.MeshStandardMaterial({ map: textures.front, roughness: 0.52, metalness: 0.04 }),
    [textures]
  );
  const backMat = useMemo(
    () => new THREE.MeshStandardMaterial({ map: textures.back, roughness: 0.52, metalness: 0.04 }),
    [textures]
  );
  const spineMat = useMemo(
    () => new THREE.MeshStandardMaterial({ map: textures.spine, roughness: 0.55, metalness: 0.04 }),
    [textures]
  );

  const { pointer, viewport } = useThree();
  const fit = Math.min(1, viewport.width / 4.6, viewport.height / 7.2);

  useFrame((state) => {
    if (!group.current || reduced) return;
    const t = state.clock.elapsedTime;
    const targetY = pointer.x * 0.35 + Math.sin(t * 0.32) * 0.16 - 0.42;
    const targetX = -pointer.y * 0.18 + Math.sin(t * 0.21) * 0.05 + 0.08;
    group.current.rotation.y += (targetY - group.current.rotation.y) * 0.045;
    group.current.rotation.x += (targetX - group.current.rotation.x) * 0.045;
    group.current.rotation.z = Math.sin(t * 0.17) * 0.03;
  });

  const coverT = 0.045;
  return (
    <group ref={group} scale={fit} rotation={reduced ? [0.06, -0.4, 0] : undefined}>
      <mesh position={[0.03, 0, 0]}>
        <boxGeometry args={[W - 0.1, H - 0.09, D - coverT * 2]} />
        <meshStandardMaterial attach="material-0" map={textures.pages} roughness={0.85} />
        <primitive object={pageMat} attach="material-1" />
        <primitive object={pageMat} attach="material-2" />
        <primitive object={pageMat} attach="material-3" />
        <primitive object={pageMat} attach="material-4" />
        <primitive object={pageMat} attach="material-5" />
      </mesh>
      <mesh position={[0.025, 0, D / 2 - coverT / 2]}>
        <boxGeometry args={[W, H, coverT]} />
        <primitive object={paperMat} attach="material-0" />
        <primitive object={paperMat} attach="material-1" />
        <primitive object={paperMat} attach="material-2" />
        <primitive object={paperMat} attach="material-3" />
        <primitive object={frontMat} attach="material-4" />
        <primitive object={paperMat} attach="material-5" />
      </mesh>
      <mesh position={[0.025, 0, -D / 2 + coverT / 2]}>
        <boxGeometry args={[W, H, coverT]} />
        <primitive object={paperMat} attach="material-0" />
        <primitive object={paperMat} attach="material-1" />
        <primitive object={paperMat} attach="material-2" />
        <primitive object={paperMat} attach="material-3" />
        <primitive object={paperMat} attach="material-4" />
        <primitive object={backMat} attach="material-5" />
      </mesh>
      <mesh position={[-W / 2 + 0.025, 0, 0]}>
        <boxGeometry args={[coverT, H, D]} />
        <primitive object={paperMat} attach="material-0" />
        <primitive object={spineMat} attach="material-1" />
        <primitive object={paperMat} attach="material-2" />
        <primitive object={paperMat} attach="material-3" />
        <primitive object={paperMat} attach="material-4" />
        <primitive object={paperMat} attach="material-5" />
      </mesh>
    </group>
  );
}

/** Positions the book in the upper airspace so DOM copy below never overlaps it. */
function BookRig({
  textures,
  reduced,
  introClock,
}: {
  textures: BookTextures;
  reduced: boolean;
  introClock: React.MutableRefObject<number | null> | null;
}) {
  const { viewport } = useThree();
  const rig = useRef<THREE.Group>(null);
  // sit lower in the airspace so the hardcover never overlaps the top nav
  const y = viewport.height * 0.12;
  useFrame((state) => {
    if (!rig.current) return;
    if (!introClock) {
      rig.current.scale.setScalar(1);
      return;
    }
    const e = introClock.current === null ? 0 : state.clock.elapsedTime - introClock.current;
    // the pathways complete — the book materializes at their center
    const s = easeOutCubic(ramp(e, 2.0, 1.2));
    rig.current.scale.setScalar(Math.max(0.0001, s));
  });
  return (
    <group ref={rig} position={[0, y, 0.6]}>
      <Float
        speed={reduced ? 0 : 1.35}
        rotationIntensity={reduced ? 0 : 0.14}
        floatIntensity={reduced ? 0 : 0.85}
        floatingRange={[-0.12, 0.14]}
      >
        <Book textures={textures} reduced={reduced} />
      </Float>
      <ContactShadows position={[0, -2.0, 0]} opacity={0.35} scale={8} blur={2.8} far={3} color="#000000" />
    </group>
  );
}

function SceneContent({ reduced, mobile, intro }: { reduced: boolean; mobile: boolean; intro: boolean }) {
  const textures = useBookTextures();
  const introClock = useRef<number | null>(null);
  const clockRef = intro && !reduced ? introClock : null;
  return (
    <>
      <ambientLight intensity={0.25} />
      <directionalLight position={[4, 5, 6]} intensity={2.1} color="#fff4e2" />
      <directionalLight position={[-6, -2, 4]} intensity={0.55} color="#d0202a" />
      <directionalLight position={[0, 4, -6]} intensity={1.1} color="#e8f0ff" />
      <ConstellationField
        count={mobile ? 750 : 1600}
        anchors={mobile ? 110 : 160}
        reduced={reduced}
        introClock={clockRef}
      />
      {textures && <BookRig textures={textures} reduced={reduced} introClock={clockRef} />}
      <Environment preset="city" />
      <fog attach="fog" args={["#050505", 7, 15]} />
    </>
  );
}

export default function BookHero({ className = "", intro = false }: { className?: string; intro?: boolean }) {
  const [dpr, setDpr] = useState<[number, number]>([1, 1.8]);
  const [mobile, setMobile] = useState(false);
  const [reduced, setReduced] = useState(false);
  useEffect(() => {
    const m = window.matchMedia("(max-width: 768px)").matches;
    setMobile(m);
    if (m) setDpr([1, 1.5]);
    setReduced(window.matchMedia("(prefers-reduced-motion: reduce)").matches);
  }, []);
  return (
    <div className={className} aria-hidden="true">
      <Canvas
        dpr={dpr}
        camera={{ position: [0, 0, 5.4], fov: 38 }}
        gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
        frameloop={reduced ? "demand" : "always"}
      >
        <Suspense fallback={null}>
          <SceneContent reduced={reduced} mobile={mobile} intro={intro} />
        </Suspense>
      </Canvas>
    </div>
  );
}
