"use client";

import React, { useRef, useMemo, useState, useEffect } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, RoundedBox, Environment, Lightformer, PerspectiveCamera } from "@react-three/drei";
import * as THREE from "three";

function ResendRubiksAssembly({
  prefersReducedMotion,
  isInView = true,
  isMobile = false,
}: {
  prefersReducedMotion: boolean;
  isInView?: boolean;
  isMobile?: boolean;
}) {
  const outerGroupRef = useRef<THREE.Group>(null);
  const [hoveredCubeId, setHoveredCubeId] = useState<number | null>(null);

  // Generate 3 procedural micro-textures on 256x256 HTML5 canvases (0 external images)
  const { mat0, mat1, mat2, mat0Hover, mat1Hover, mat2Hover, ribbedTex, dottedTex } = useMemo(() => {
    if (typeof document === "undefined") {
      return {
        mat0: new THREE.MeshPhysicalMaterial({ color: "#080808" }),
        mat1: new THREE.MeshPhysicalMaterial({ color: "#0b0b0b" }),
        mat2: new THREE.MeshPhysicalMaterial({ color: "#090909" }),
        mat0Hover: new THREE.MeshPhysicalMaterial({ color: "#141414" }),
        mat1Hover: new THREE.MeshPhysicalMaterial({ color: "#18181b" }),
        mat2Hover: new THREE.MeshPhysicalMaterial({ color: "#161618" }),
        ribbedTex: null,
        dottedTex: null,
      };
    }

    // Material 1 Texture: Linear Ribbed Metallic Face (32 horizontal stripes)
    const ribbedCanvas = document.createElement("canvas");
    ribbedCanvas.width = 256;
    ribbedCanvas.height = 256;
    const ribbedCtx = ribbedCanvas.getContext("2d")!;
    ribbedCtx.fillStyle = "#000000";
    ribbedCtx.fillRect(0, 0, 256, 256);
    ribbedCtx.fillStyle = "#ffffff";
    const stripeH = 256 / 32;
    for (let i = 0; i < 32; i += 2) {
      ribbedCtx.fillRect(0, i * stripeH, 256, stripeH);
    }
    const ribbedTex = new THREE.CanvasTexture(ribbedCanvas);
    ribbedTex.wrapS = THREE.RepeatWrapping;
    ribbedTex.wrapT = THREE.RepeatWrapping;

    // Material 2 Texture: Knurled Micro-Dot Matrix Face (24x24 grid of dots)
    const dottedCanvas = document.createElement("canvas");
    dottedCanvas.width = 256;
    dottedCanvas.height = 256;
    const dottedCtx = dottedCanvas.getContext("2d")!;
    dottedCtx.fillStyle = "#000000";
    dottedCtx.fillRect(0, 0, 256, 256);
    dottedCtx.fillStyle = "#ffffff";
    const step = 256 / 24;
    for (let r = 0; r < 24; r++) {
      for (let c = 0; c < 24; c++) {
        dottedCtx.beginPath();
        dottedCtx.arc((c + 0.5) * step, (r + 0.5) * step, step * 0.28, 0, Math.PI * 2);
        dottedCtx.fill();
      }
    }
    const dottedTex = new THREE.CanvasTexture(dottedCanvas);
    dottedTex.wrapS = THREE.RepeatWrapping;
    dottedTex.wrapT = THREE.RepeatWrapping;

    // Material 0: Polished Obsidian Anodized Metal
    const m0 = new THREE.MeshPhysicalMaterial({
      color: "#080808",
      metalness: 0.92,
      roughness: 0.14,
      clearcoat: 1.0,
      clearcoatRoughness: 0.08,
      reflectivity: 1.0,
    });

    // Material 1: Linear Ribbed Metallic Face
    const m1 = new THREE.MeshPhysicalMaterial({
      color: "#0b0b0b",
      metalness: 0.95,
      roughness: 0.25,
      clearcoat: 0.7,
      bumpMap: ribbedTex,
      bumpScale: 0.035,
      reflectivity: 0.9,
    });

    // Material 2: Knurled Micro-Dot Matrix Face
    const m2 = new THREE.MeshPhysicalMaterial({
      color: "#090909",
      metalness: 0.9,
      roughness: 0.28,
      clearcoat: 0.6,
      bumpMap: dottedTex,
      bumpScale: 0.03,
      reflectivity: 0.85,
    });

    // Interactive Hover Variations (Roughness drops for gleaming specular sheen, subtle silver emissive highlight)
    const m0Hover = new THREE.MeshPhysicalMaterial({
      color: "#141414",
      metalness: 0.96,
      roughness: 0.05,
      clearcoat: 1.0,
      clearcoatRoughness: 0.03,
      reflectivity: 1.0,
      emissive: new THREE.Color("#27272a"),
      emissiveIntensity: 0.35,
    });

    const m1Hover = new THREE.MeshPhysicalMaterial({
      color: "#18181b",
      metalness: 0.98,
      roughness: 0.12,
      clearcoat: 0.9,
      bumpMap: ribbedTex,
      bumpScale: 0.04,
      reflectivity: 1.0,
      emissive: new THREE.Color("#27272a"),
      emissiveIntensity: 0.35,
    });

    const m2Hover = new THREE.MeshPhysicalMaterial({
      color: "#161618",
      metalness: 0.95,
      roughness: 0.14,
      clearcoat: 0.85,
      bumpMap: dottedTex,
      bumpScale: 0.035,
      reflectivity: 1.0,
      emissive: new THREE.Color("#27272a"),
      emissiveIntensity: 0.35,
    });

    return {
      mat0: m0,
      mat1: m1,
      mat2: m2,
      mat0Hover: m0Hover,
      mat1Hover: m1Hover,
      mat2Hover: m2Hover,
      ribbedTex,
      dottedTex,
    };
  }, []);

  // Shared Box Edges Geometry (12 clean edges per subcube, zero GPU buffer allocation anomalies)
  const boxEdgesGeom = useMemo(
    () => new THREE.EdgesGeometry(new THREE.BoxGeometry(0.94, 0.94, 0.94)),
    []
  );

  // Safe cleanup of component-owned WebGL textures, materials, and geometries
  useEffect(() => {
    if (ribbedTex) ribbedTex.needsUpdate = true;
    if (dottedTex) dottedTex.needsUpdate = true;
    return () => {
      ribbedTex?.dispose();
      dottedTex?.dispose();
      mat0?.dispose();
      mat1?.dispose();
      mat2?.dispose();
      mat0Hover?.dispose();
      mat1Hover?.dispose();
      mat2Hover?.dispose();
      boxEdgesGeom?.dispose();
      if (typeof document !== "undefined") {
        document.body.style.cursor = "auto";
      }
    };
  }, [mat0, mat1, mat2, mat0Hover, mat1Hover, mat2Hover, ribbedTex, dottedTex, boxEdgesGeom]);

  // Pointer hover feedback handlers
  const handlePointerOver = (e: any, id: number) => {
    e.stopPropagation();
    setHoveredCubeId(id);
    if (typeof document !== "undefined") {
      document.body.style.cursor = "pointer";
    }
  };

  const handlePointerOut = (e: any, id: number) => {
    e.stopPropagation();
    setHoveredCubeId((prev) => (prev === id ? null : prev));
    if (typeof document !== "undefined") {
      document.body.style.cursor = "auto";
    }
  };

  // Initialize 27 sub-cubes at coordinates x, y, z in [-1, 0, 1]
  const cubes = useMemo(() => {
    const list = [];
    let id = 0;
    for (let x = -1; x <= 1; x++) {
      for (let y = -1; y <= 1; y++) {
        for (let z = -1; z <= 1; z++) {
          list.push({
            id,
            initialPos: new THREE.Vector3(x, y, z),
            gridPos: new THREE.Vector3(x, y, z),
            basePos: new THREE.Vector3(x, y, z),
            baseQuat: new THREE.Quaternion(),
            ref: React.createRef<THREE.Group>(),
          });
          id++;
        }
      }
    }
    return list;
  }, []);

  // Rubik's 90-degree Slice Rotation State Machine
  const sliceState = useRef<{
    isRotating: boolean;
    axis: "x" | "y" | "z";
    layer: number;
    direction: 1 | -1;
    elapsed: number;
    duration: number;
    pauseTimer: number;
    lastAxis: "x" | "y" | "z";
  }>({
    isRotating: false,
    axis: "y",
    layer: 1,
    direction: 1,
    elapsed: 0,
    duration: 0.85, // 0.85s smooth turn for automated rotations
    pauseTimer: 2.0, // Initial delay before first idle turn
    lastAxis: "z",
  });

  // Interactive Click-to-Turn Handler
  const handleCubeClick = (e: any, cube: (typeof cubes)[0]) => {
    e.stopPropagation();
    const s = sliceState.current;
    if (s.isRotating) return; // Prevent multiple clicks from triggering overlapping animations

    // Read current logical grid position
    const currentY = Math.round(cube.gridPos.y);
    const currentX = Math.round(cube.gridPos.x);
    const currentZ = Math.round(cube.gridPos.z);

    // Shift-Click or Secondary Interaction: Rotates the Column / Slice (vertical layer)
    const isSecondary = Boolean(e.shiftKey || e.altKey || e.button === 2);

    if (isSecondary) {
      let chosenAxis: "x" | "z" = "x";
      let chosenLayer = currentX;

      if (e.altKey) {
        chosenAxis = "z";
        chosenLayer = currentZ;
      } else if (Math.abs(currentX) > 0) {
        chosenAxis = "x";
        chosenLayer = currentX;
      } else if (Math.abs(currentZ) > 0) {
        chosenAxis = "z";
        chosenLayer = currentZ;
      }

      s.axis = chosenAxis;
      s.layer = chosenLayer;
      s.direction = 1;
      s.duration = 0.65; // 0.65s cubic easing
      s.isRotating = true;
      s.elapsed = 0;
      s.pauseTimer = 4.0; // Pause auto-rotation after user interaction
    } else {
      // Primary Click (Left Click / Tap): Rotates the Row / Slice corresponding to current y (horizontal layer around Y axis)
      s.axis = "y";
      s.layer = currentY;
      s.direction = 1;
      s.duration = 0.65; // 0.65s cubic easing
      s.isRotating = true;
      s.elapsed = 0;
      s.pauseTimer = 4.0; // Pause auto-rotation after user interaction
    }
  };

  useFrame((state, delta) => {
    // Suspend rendering computations when scrolled out of viewport
    if (!isInView) return;

    // A11Y-03: Respect prefers-reduced-motion preference (keep static isometric pose)
    if (prefersReducedMotion) {
      if (outerGroupRef.current) {
        outerGroupRef.current.position.set(0, 0, 0);
        outerGroupRef.current.rotation.set(0.55, -0.65, 0.22);
      }
      return;
    }

    const t = state.clock.getElapsedTime();
    const cappedDelta = Math.min(delta, 0.05);

    // 1. Outer assembly floating & subtle mouse parallax
    if (outerGroupRef.current) {
      // Signature Resend isometric base: [0.55, -0.65, 0.22]
      const breathe = Math.sin(t * 0.6) * 0.06;
      const breatheRot = Math.cos(t * 0.4) * 0.02;

      const mouseX = state.pointer.x * 0.16;
      const mouseY = state.pointer.y * 0.12;

      outerGroupRef.current.position.y = breathe;
      outerGroupRef.current.rotation.x = 0.55 - mouseY + breatheRot;
      outerGroupRef.current.rotation.y = -0.65 + mouseX;
      outerGroupRef.current.rotation.z = 0.22;
    }

    const s = sliceState.current;

    // Pause between rotations
    if (!s.isRotating) {
      if (s.pauseTimer > 0) {
        s.pauseTimer -= cappedDelta;
      } else {
        // Trigger next slice rotation around a perpendicular axis
        const allowedAxes: ("x" | "y" | "z")[] = (["x", "y", "z"] as const).filter(
          (a) => a !== s.lastAxis
        );
        s.axis = allowedAxes[Math.floor(Math.random() * allowedAxes.length)];
        s.layer = [-1, 0, 1][Math.floor(Math.random() * 3)];
        s.direction = Math.random() > 0.5 ? 1 : -1;
        s.duration = 0.85;
        s.isRotating = true;
        s.elapsed = 0;
      }
      return;
    }

    // 2. Active 90-degree slice interpolation
    s.elapsed += cappedDelta;
    const progress = Math.min(s.elapsed / s.duration, 1.0);

    // Cubic ease-in-out: t < 0.5 ? 4 * t^3 : 1 - (-2t + 2)^3 / 2
    const ease =
      progress < 0.5
        ? 4 * progress * progress * progress
        : 1 - Math.pow(-2 * progress + 2, 3) / 2;

    const angle = (Math.PI / 2) * s.direction * ease;
    const rotAxis =
      s.axis === "x"
        ? new THREE.Vector3(1, 0, 0)
        : s.axis === "y"
        ? new THREE.Vector3(0, 1, 0)
        : new THREE.Vector3(0, 0, 1);
    const qTurn = new THREE.Quaternion().setFromAxisAngle(rotAxis, angle);

    const affected = cubes.filter((c) => Math.abs(c.gridPos[s.axis] - s.layer) < 0.1);

    if (progress < 1.0) {
      // Incremental rotation of the 9 sub-cubes
      for (const c of affected) {
        if (c.ref.current) {
          c.ref.current.position.copy(c.basePos).applyQuaternion(qTurn);
          c.ref.current.quaternion.copy(qTurn).multiply(c.baseQuat);
        }
      }
    } else {
      // 3. Slice turn complete: permanently commit 90-degree transformation
      const qFinal = new THREE.Quaternion().setFromAxisAngle(
        rotAxis,
        (Math.PI / 2) * s.direction
      );

      for (const c of affected) {
        // Finalize 3D position & integer grid coordinate
        c.basePos.applyQuaternion(qFinal);
        c.basePos.x = Math.round(c.basePos.x);
        c.basePos.y = Math.round(c.basePos.y);
        c.basePos.z = Math.round(c.basePos.z);
        c.gridPos.copy(c.basePos);

        // Finalize orientation
        c.baseQuat.premultiply(qFinal);

        if (c.ref.current) {
          c.ref.current.position.copy(c.basePos);
          c.ref.current.quaternion.copy(c.baseQuat);
        }
      }

      s.isRotating = false;
      s.pauseTimer = 3.5; // 3.5s pause before next automated turn
      s.lastAxis = s.axis;
    }
  });

  return (
    <group ref={outerGroupRef} scale={isMobile ? 0.52 : 0.64} rotation={[0.55, -0.65, 0.22]}>
      {cubes.map((cube) => {
        const isHovered = hoveredCubeId === cube.id;
        const baseMat = cube.id % 3 === 0 ? mat0 : cube.id % 3 === 1 ? mat1 : mat2;
        const hoverMat = cube.id % 3 === 0 ? mat0Hover : cube.id % 3 === 1 ? mat1Hover : mat2Hover;
        const activeMat = isHovered ? hoverMat : baseMat;

        return (
          <group
            key={cube.id}
            ref={cube.ref}
            position={[cube.initialPos.x, cube.initialPos.y, cube.initialPos.z]}
          >
            {/* 0.94 cube with 0.07 radius for crisp 0.06 gap & gleaming beveled edges */}
            <RoundedBox
              args={[0.94, 0.94, 0.94]}
              radius={0.07}
              smoothness={2}
              material={activeMat}
              onClick={(e) => handleCubeClick(e, cube)}
              onPointerOver={(e) => handlePointerOver(e, cube.id)}
              onPointerOut={(e) => handlePointerOut(e, cube.id)}
            >
              {/* Native LineSegments with shared 12-edge BoxGeometry (zero WebGL fat-line desync or stray spikes) */}
              <lineSegments geometry={boxEdgesGeom}>
                <lineBasicMaterial
                  color={isHovered ? "#ffffff" : "#71717a"}
                  transparent
                  opacity={isHovered ? 0.95 : 0.45}
                  depthTest={true}
                />
              </lineSegments>
            </RoundedBox>
          </group>
        );
      })}
    </group>
  );
}

interface WebGLErrorBoundaryProps {
  fallback: React.ReactNode;
  children: React.ReactNode;
}

interface WebGLErrorBoundaryState {
  hasError: boolean;
}

class WebGLErrorBoundary extends React.Component<WebGLErrorBoundaryProps, WebGLErrorBoundaryState> {
  constructor(props: WebGLErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(err: any) {
    console.warn("[KRYNEX 3D] WebGL canvas caught runtime exception, activating fallback:", err);
  }

  render() {
    if (this.state.hasError) {
      return this.props.fallback;
    }
    return this.props.children;
  }
}

import HeroCubeFallback from "./HeroCubeFallback";

export default function Hero3DCube() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [mounted, setMounted] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  const [hasWebGL, setHasWebGL] = useState(true);
  const [isInView, setIsInView] = useState(true);

  useEffect(() => {
    setMounted(true);

    if (typeof window !== "undefined") {
      setIsMobile(window.innerWidth < 768);

      // WebGL capability check with true software rasterizer filter (preserves Mesa hardware drivers)
      try {
        const canvas = document.createElement("canvas");
        const gl =
          (canvas.getContext("webgl") ||
          canvas.getContext("experimental-webgl")) as WebGLRenderingContext | null;
        if (!gl) {
          setHasWebGL(false);
        } else {
          const debugInfo = gl.getExtension("WEBGL_debug_renderer_info");
          if (debugInfo) {
            const renderer = gl.getParameter(debugInfo.UNMASKED_RENDERER_WEBGL) || "";
            if (/swiftshader|llvmpipe|softpipe|swrast|software rasterizer/i.test(renderer)) {
              setHasWebGL(false);
            }
          }
        }
      } catch {
        setHasWebGL(false);
      }

      // User accessibility preference: prefers-reduced-motion
      const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
      setPrefersReducedMotion(mediaQuery.matches);
      const motionListener = (event: MediaQueryListEvent) => {
        setPrefersReducedMotion(event.matches);
      };
      mediaQuery.addEventListener("change", motionListener);

      const resizeListener = () => {
        setIsMobile(window.innerWidth < 768);
      };
      window.addEventListener("resize", resizeListener, { passive: true });

      return () => {
        mediaQuery.removeEventListener("change", motionListener);
        window.removeEventListener("resize", resizeListener);
      };
    }
  }, []);

  // Viewport IntersectionObserver to pause rendering when out of sight (attached when container div mounts)
  useEffect(() => {
    if (!mounted || !containerRef.current || !("IntersectionObserver" in window)) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsInView(entry.isIntersecting);
      },
      { threshold: 0.05 }
    );
    observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, [mounted]);

  // Graceful fallback only if WebGL is truly unavailable
  if (!hasWebGL) {
    return <HeroCubeFallback />;
  }

  return (
    <WebGLErrorBoundary fallback={<HeroCubeFallback />}>
      <div
        ref={containerRef}
        className="relative w-full h-full select-none flex items-center justify-center"
      >
        <Canvas
          dpr={isMobile ? [1, 1.25] : [1, 1.5]}
          gl={{ powerPreference: "high-performance", antialias: true, alpha: true }}
          className="cursor-grab active:cursor-grabbing w-full h-full"
        >
          {/* Exact camera setup requested: position [0, 0, 6.2], fov 38 */}
          <PerspectiveCamera makeDefault position={[0, 0, 6.2]} fov={38} />

          <ambientLight intensity={0.4} />
          <directionalLight position={[6, 8, 5]} intensity={3.0} color="#ffffff" />
          <directionalLight position={[-6, -4, -6]} intensity={4.5} color="#ffffff" />

          {/* High-Contrast Monochrome Studio Lighting with 4 Softbox Lightformers (100% offline) */}
          <Environment resolution={256}>
            {/* Top-Left Key Softbox */}
            <Lightformer
              form="rect"
              intensity={6}
              position={[-5, 6, 4]}
              scale={[8, 8, 1]}
              target={[0, 0, 0]}
              color="#ffffff"
            />
            {/* Top-Right Rim Softbox */}
            <Lightformer
              form="rect"
              intensity={4}
              position={[6, 5, -3]}
              scale={[6, 6, 1]}
              target={[0, 0, 0]}
              color="#e4e4e7"
            />
            {/* Front Specular Strip */}
            <Lightformer
              form="rect"
              intensity={2.5}
              position={[0, 2, 6]}
              scale={[10, 2, 1]}
              target={[0, 0, 0]}
              color="#ffffff"
            />
            {/* Bottom Fill */}
            <Lightformer
              form="ring"
              intensity={1}
              position={[0, -6, 0]}
              scale={5}
              color="#71717a"
            />
          </Environment>

          <ResendRubiksAssembly
            prefersReducedMotion={prefersReducedMotion}
            isInView={isInView}
            isMobile={isMobile}
          />

          <OrbitControls
            enableZoom={false}
            enablePan={false}
            rotateSpeed={0.6}
            minPolarAngle={Math.PI / 4}
            maxPolarAngle={Math.PI - Math.PI / 4}
          />
        </Canvas>

        {/* Interactive Rubik's mechanics instruction badge */}
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 pointer-events-none z-10 hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-full bg-black/60 border border-white/[0.08] backdrop-blur-md">
          <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
          <span className="text-[10px] font-mono tracking-widest text-zinc-400 uppercase">
            {"Click row to turn // Shift+Click column"}
          </span>
        </div>
      </div>
    </WebGLErrorBoundary>
  );
}

