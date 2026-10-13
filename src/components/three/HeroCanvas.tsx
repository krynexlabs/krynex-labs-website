'use client';

import { useRef, useEffect, useCallback } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, MeshDistortMaterial, Sphere, Ring, Stars } from '@react-three/drei';
import * as THREE from 'three';

/* ------------------------------------------------------------------ */
/*  Scene components                                                  */
/* ------------------------------------------------------------------ */

/** Central sculptural orb — distorted metallic sphere with inner wireframe glow. */
function CoreStructure() {
  const groupRef = useRef<THREE.Group>(null);
  const innerRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    const t = state.clock.elapsedTime;
    if (groupRef.current) {
      groupRef.current.rotation.y = t * 0.08;
      groupRef.current.rotation.x = Math.sin(t * 0.05) * 0.1;
    }
    if (innerRef.current) {
      innerRef.current.rotation.z = t * 0.15;
    }
  });

  return (
    <group ref={groupRef}>
      <Float speed={1.5} rotationIntensity={0.2} floatIntensity={0.3}>
        <Sphere args={[1.2, 64, 64]}>
          <MeshDistortMaterial
            color="#121824"
            roughness={0.25}
            metalness={0.92}
            distort={0.28}
            speed={1.4}
            envMapIntensity={0.9}
          />
        </Sphere>
      </Float>
      <Sphere ref={innerRef} args={[0.65, 32, 32]}>
        <meshStandardMaterial
          color="#63E5FF"
          emissive="#63E5FF"
          emissiveIntensity={0.6}
          transparent
          opacity={0.18}
          wireframe
        />
      </Sphere>
    </group>
  );
}

/** Floating software-interface panels symbolizing interconnected business products. */
function FloatingSoftwarePanels() {
  const panelGroup = useRef<THREE.Group>(null);

  useFrame((state) => {
    const t = state.clock.elapsedTime;
    if (panelGroup.current) {
      panelGroup.current.rotation.y = t * 0.05;
    }
  });

  return (
    <group ref={panelGroup}>
      {/* Panel 1: Operations Data Plane */}
      <Float speed={1.8} rotationIntensity={0.15} floatIntensity={0.25}>
        <group position={[1.8, 0.7, 0.6]} rotation={[0.2, -0.4, 0.1]}>
          <mesh>
            <boxGeometry args={[1.1, 0.7, 0.03]} />
            <meshStandardMaterial
              color="#171f2d"
              roughness={0.3}
              metalness={0.8}
              transparent
              opacity={0.85}
            />
          </mesh>
          {/* Glowing edge indicator */}
          <lineSegments>
            <edgesGeometry args={[new THREE.BoxGeometry(1.1, 0.7, 0.03)]} />
            <lineBasicMaterial color="#63E5FF" transparent opacity={0.4} />
          </lineSegments>
        </group>
      </Float>

      {/* Panel 2: Analytics & Workflow Plane */}
      <Float speed={1.4} rotationIntensity={0.2} floatIntensity={0.3}>
        <group position={[-1.7, -0.6, 0.8]} rotation={[-0.2, 0.4, -0.1]}>
          <mesh>
            <boxGeometry args={[1.0, 0.65, 0.03]} />
            <meshStandardMaterial
              color="#111722"
              roughness={0.3}
              metalness={0.8}
              transparent
              opacity={0.85}
            />
          </mesh>
          <lineSegments>
            <edgesGeometry args={[new THREE.BoxGeometry(1.0, 0.65, 0.03)]} />
            <lineBasicMaterial color="#8B7CFF" transparent opacity={0.4} />
          </lineSegments>
        </group>
      </Float>

      {/* Panel 3: Central Automation Stream Plane */}
      <Float speed={1.6} rotationIntensity={0.18} floatIntensity={0.28}>
        <group position={[0.2, -1.2, -0.9]} rotation={[0.4, 0.2, 0.2]}>
          <mesh>
            <boxGeometry args={[0.9, 0.55, 0.03]} />
            <meshStandardMaterial
              color="#171f2d"
              roughness={0.3}
              metalness={0.8}
              transparent
              opacity={0.8}
            />
          </mesh>
          <lineSegments>
            <edgesGeometry args={[new THREE.BoxGeometry(0.9, 0.55, 0.03)]} />
            <lineBasicMaterial color="#63E5FF" transparent opacity={0.35} />
          </lineSegments>
        </group>
      </Float>
    </group>
  );
}

/** Three concentric orbital rings at different tilt angles. */
function OrbitalRings() {
  const ring1 = useRef<THREE.Mesh>(null);
  const ring2 = useRef<THREE.Mesh>(null);
  const ring3 = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    const t = state.clock.elapsedTime;
    if (ring1.current) {
      ring1.current.rotation.x = Math.PI * 0.5 + Math.sin(t * 0.3) * 0.1;
      ring1.current.rotation.z = t * 0.1;
    }
    if (ring2.current) {
      ring2.current.rotation.x = Math.PI * 0.35;
      ring2.current.rotation.y = t * 0.08;
    }
    if (ring3.current) {
      ring3.current.rotation.x = Math.PI * 0.65;
      ring3.current.rotation.z = -t * 0.06;
    }
  });

  return (
    <group>
      <Ring ref={ring1} args={[1.8, 1.82, 128]}>
        <meshStandardMaterial
          color="#63E5FF"
          emissive="#63E5FF"
          emissiveIntensity={0.3}
          transparent
          opacity={0.4}
          side={THREE.DoubleSide}
        />
      </Ring>
      <Ring ref={ring2} args={[2.2, 2.22, 128]}>
        <meshStandardMaterial
          color="#8B7CFF"
          emissive="#8B7CFF"
          emissiveIntensity={0.2}
          transparent
          opacity={0.3}
          side={THREE.DoubleSide}
        />
      </Ring>
      <Ring ref={ring3} args={[2.6, 2.61, 128]}>
        <meshStandardMaterial
          color="#63E5FF"
          emissive="#63E5FF"
          emissiveIntensity={0.15}
          transparent
          opacity={0.2}
          side={THREE.DoubleSide}
        />
      </Ring>
    </group>
  );
}

/** Instanced particle cloud orbiting the core structure. */
function Particles({ count = 160 }: { count?: number }) {
  const meshRef = useRef<THREE.InstancedMesh>(null);
  const dataRef = useRef<{
    positions: Float32Array;
    scales: Float32Array;
    speeds: Float32Array;
  } | null>(null);
  const dummyRef = useRef(new THREE.Object3D());

  useEffect(() => {
    const positions = new Float32Array(count * 3);
    const scales = new Float32Array(count);
    const speeds = new Float32Array(count);

    for (let i = 0; i < count; i++) {
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      const r = 2.5 + Math.random() * 3.2;

      positions[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      positions[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      positions[i * 3 + 2] = r * Math.cos(phi);

      scales[i] = 0.01 + Math.random() * 0.022;
      speeds[i] = 0.2 + Math.random() * 0.5;
    }

    dataRef.current = { positions, scales, speeds };
  }, [count]);

  useFrame((state) => {
    const mesh = meshRef.current;
    const data = dataRef.current;
    if (!mesh || !data) return;

    const dummy = dummyRef.current;
    const t = state.clock.elapsedTime;

    for (let i = 0; i < count; i++) {
      const x = data.positions[i * 3];
      const y = data.positions[i * 3 + 1];
      const z = data.positions[i * 3 + 2];
      const speed = data.speeds[i];

      dummy.position.set(
        x + Math.sin(t * speed + i) * 0.2,
        y + Math.cos(t * speed + i * 0.5) * 0.2,
        z + Math.sin(t * speed * 0.5 + i * 0.3) * 0.2
      );
      dummy.scale.setScalar(data.scales[i]);
      dummy.updateMatrix();
      mesh.setMatrixAt(i, dummy.matrix);
    }
    mesh.instanceMatrix.needsUpdate = true;
  });

  return (
    <instancedMesh ref={meshRef} args={[undefined, undefined, count]}>
      <sphereGeometry args={[1, 8, 8]} />
      <meshStandardMaterial
        color="#63E5FF"
        emissive="#63E5FF"
        emissiveIntensity={0.8}
        transparent
        opacity={0.7}
      />
    </instancedMesh>
  );
}

/** Subtle mouse-follow parallax for the camera. */
function CameraRig() {
  const mouseRef = useRef({ x: 0, y: 0 });

  const onPointerMove = useCallback((e: PointerEvent) => {
    mouseRef.current.x = (e.clientX / window.innerWidth - 0.5) * 2;
    mouseRef.current.y = -(e.clientY / window.innerHeight - 0.5) * 2;
  }, []);

  useEffect(() => {
    window.addEventListener('pointermove', onPointerMove, { passive: true });
    return () => window.removeEventListener('pointermove', onPointerMove);
  }, [onPointerMove]);

  useFrame((state) => {
    const cam = state.camera;
    cam.position.x += (mouseRef.current.x * 0.5 - cam.position.x) * 0.02;
    cam.position.y += (mouseRef.current.y * 0.3 + 0.5 - cam.position.y) * 0.02;
    cam.lookAt(0, 0, 0);
  });

  return null;
}

/* ------------------------------------------------------------------ */
/*  Composed scene + Canvas                                            */
/* ------------------------------------------------------------------ */

function Scene() {
  return (
    <>
      <ambientLight intensity={0.2} />
      <pointLight position={[5, 5, 5]} intensity={1.2} color="#63E5FF" />
      <pointLight position={[-5, -3, 3]} intensity={0.6} color="#8B7CFF" />
      <pointLight position={[0, 5, -5]} intensity={0.4} color="#ffffff" />
      <spotLight position={[0, 10, 0]} angle={0.35} penumbra={1} intensity={0.6} color="#63E5FF" />
      <CoreStructure />
      <FloatingSoftwarePanels />
      <OrbitalRings />
      <Particles count={160} />
      <Stars radius={50} depth={50} count={900} factor={2} saturation={0} fade speed={0.5} />
      <CameraRig />
    </>
  );
}

export default function HeroCanvas() {
  return (
    <Canvas
      camera={{ position: [0, 0.5, 6], fov: 45 }}
      dpr={[1, 1.5]}
      gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
      style={{ background: 'transparent' }}
    >
      <Scene />
    </Canvas>
  );
}
