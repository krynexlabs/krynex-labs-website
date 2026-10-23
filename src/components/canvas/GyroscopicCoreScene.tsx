"use client";

import React, { useEffect, useRef } from "react";
import * as THREE from "three";

export default function GyroscopicCoreScene() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const prefersReducedMotion =
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const scene = new THREE.Scene();
    const width = container.clientWidth || 500;
    const height = container.clientHeight || 500;

    const camera = new THREE.PerspectiveCamera(38, width / height, 0.1, 100);
    camera.position.set(0, 0, 5.0);

    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      powerPreference: "high-performance",
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setClearColor(0x000000, 0);
    container.appendChild(renderer.domElement);

    const rootGroup = new THREE.Group();
    scene.add(rootGroup);

    // Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.7);
    scene.add(ambientLight);

    const pointLight = new THREE.PointLight(0xcaecff, 3.0, 10);
    pointLight.position.set(0, 0, 0);
    scene.add(pointLight);

    const keyLight = new THREE.DirectionalLight(0xffffff, 2.0);
    keyLight.position.set(4, 5, 4);
    scene.add(keyLight);

    // Ring 1 (Outer Ring)
    const ring1Geo = new THREE.TorusGeometry(1.65, 0.024, 16, 100);
    const ring1Mat = new THREE.MeshStandardMaterial({
      color: 0xd6ebfd,
      metalness: 0.95,
      roughness: 0.15,
    });
    const ring1 = new THREE.Mesh(ring1Geo, ring1Mat);
    rootGroup.add(ring1);

    // Ring 2 (Middle Ring)
    const ring2Geo = new THREE.TorusGeometry(1.3, 0.022, 16, 90);
    const ring2Mat = new THREE.MeshStandardMaterial({
      color: 0xa1a1aa,
      metalness: 0.9,
      roughness: 0.2,
    });
    const ring2 = new THREE.Mesh(ring2Geo, ring2Mat);
    rootGroup.add(ring2);

    // Ring 3 (Inner Ring)
    const ring3Geo = new THREE.TorusGeometry(0.95, 0.02, 16, 80);
    const ring3Mat = new THREE.MeshStandardMaterial({
      color: 0x02fcef,
      metalness: 0.85,
      roughness: 0.25,
      emissive: 0x02fcef,
      emissiveIntensity: 0.2,
    });
    const ring3 = new THREE.Mesh(ring3Geo, ring3Mat);
    rootGroup.add(ring3);

    // Center Levitating Crystalline Core
    const coreGeo = new THREE.OctahedronGeometry(0.42, 0);
    const coreMat = new THREE.MeshStandardMaterial({
      color: 0xffffff,
      roughness: 0.1,
      metalness: 0.9,
      wireframe: false,
    });
    const core = new THREE.Mesh(coreGeo, coreMat);
    rootGroup.add(core);

    const coreEdgesGeo = new THREE.EdgesGeometry(coreGeo);
    const coreEdgesMat = new THREE.LineBasicMaterial({
      color: 0xcaecff,
      linewidth: 1.5,
    });
    const coreEdges = new THREE.LineSegments(coreEdgesGeo, coreEdgesMat);
    core.add(coreEdges);

    // Mouse Interaction
    let targetTiltX = 0;
    let targetTiltY = 0;
    let currentTiltX = 0;
    let currentTiltY = 0;

    const handlePointerMove = (e: MouseEvent | TouchEvent) => {
      const clientX = "touches" in e ? e.touches[0].clientX : e.clientX;
      const clientY = "touches" in e ? e.touches[0].clientY : e.clientY;
      const rect = container.getBoundingClientRect();
      const normX = ((clientX - rect.left) / rect.width) * 2 - 1;
      const normY = -(((clientY - rect.top) / rect.height) * 2 - 1);

      targetTiltY = normX * 0.5;
      targetTiltX = -normY * 0.4;
    };

    const handlePointerLeave = () => {
      targetTiltX = 0;
      targetTiltY = 0;
    };

    container.addEventListener("mousemove", handlePointerMove);
    container.addEventListener("mouseleave", handlePointerLeave);
    container.addEventListener("touchstart", handlePointerMove, { passive: true });
    container.addEventListener("touchend", handlePointerLeave);

    // Animation Loop
    let animationFrameId: number;
    const clock = new THREE.Clock();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);

      const elapsedTime = clock.getElapsedTime();

      // Zero-gravity levitation
      if (!prefersReducedMotion) {
        rootGroup.position.y = Math.sin(elapsedTime * 1.3) * 0.12;

        // Gyroscopic Multi-Axis Rotations
        ring1.rotation.x = elapsedTime * 0.55;
        ring1.rotation.y = elapsedTime * 0.35;

        ring2.rotation.y = -elapsedTime * 0.65;
        ring2.rotation.z = elapsedTime * 0.45;

        ring3.rotation.z = elapsedTime * 0.75;
        ring3.rotation.x = -elapsedTime * 0.5;

        // Crystalline Core Floating Rotation
        core.rotation.y = elapsedTime * 0.8;
        core.rotation.x = Math.sin(elapsedTime * 1.5) * 0.4;
        core.scale.setScalar(1 + Math.sin(elapsedTime * 3) * 0.05);
      }

      // Parallax Tilt Lerp
      currentTiltX += (targetTiltX - currentTiltX) * 0.06;
      currentTiltY += (targetTiltY - currentTiltY) * 0.06;
      rootGroup.rotation.y = currentTiltY * 0.6;
      rootGroup.rotation.x = currentTiltX * 0.5;

      renderer.render(scene, camera);
    };

    animate();

    const resizeObserver = new ResizeObserver(() => {
      if (!container) return;
      const newW = container.clientWidth;
      const newH = container.clientHeight;
      if (newW > 0 && newH > 0) {
        camera.aspect = newW / newH;
        camera.updateProjectionMatrix();
        renderer.setSize(newW, newH);
      }
    });
    resizeObserver.observe(container);

    return () => {
      cancelAnimationFrame(animationFrameId);
      resizeObserver.disconnect();
      container.removeEventListener("mousemove", handlePointerMove);
      container.removeEventListener("mouseleave", handlePointerLeave);
      container.removeEventListener("touchstart", handlePointerMove);
      container.removeEventListener("touchend", handlePointerLeave);

      ring1Geo.dispose();
      ring1Mat.dispose();
      ring2Geo.dispose();
      ring2Mat.dispose();
      ring3Geo.dispose();
      ring3Mat.dispose();
      coreGeo.dispose();
      coreMat.dispose();
      coreEdgesGeo.dispose();
      coreEdgesMat.dispose();
      renderer.dispose();

      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="relative w-full h-[380px] sm:h-[450px] lg:h-[500px] cursor-grab active:cursor-grabbing flex items-center justify-center select-none"
      aria-label="Interactive 3D Gyroscopic Core Precision Rings"
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(202,236,255,0.06),transparent_70%)] pointer-events-none" />
    </div>
  );
}
