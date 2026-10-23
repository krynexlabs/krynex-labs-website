"use client";

import React, { useEffect, useRef } from "react";
import * as THREE from "three";

export default function IsometricDataWaveScene() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const prefersReducedMotion =
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const isMobile = window.innerWidth < 768;

    const scene = new THREE.Scene();
    const width = container.clientWidth || 500;
    const height = container.clientHeight || 500;

    const camera = new THREE.PerspectiveCamera(36, width / height, 0.1, 100);
    // Isometric angle
    camera.position.set(5.5, 6.0, 5.5);
    camera.lookAt(0, 0, 0);

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

    // Subtle isometric grid rotation
    rootGroup.rotation.y = Math.PI / 4;

    // Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
    scene.add(ambientLight);

    const keyLight = new THREE.DirectionalLight(0xffffff, 2.5);
    keyLight.position.set(6, 10, 4);
    scene.add(keyLight);

    const rimLight = new THREE.DirectionalLight(0xcaecff, 1.2);
    rimLight.position.set(-6, 3, -6);
    scene.add(rimLight);

    // Grid Dimensions (reduce on mobile)
    const gridSize = isMobile ? 6 : 8;
    const spacing = 0.44;
    const pillarWidth = 0.34;
    const pillarHeight = 1.0;

    const pillarGeometry = new THREE.BoxGeometry(pillarWidth, pillarHeight, pillarWidth);
    const edgesGeometry = new THREE.EdgesGeometry(pillarGeometry);

    const pillarMaterial = new THREE.MeshStandardMaterial({
      color: 0x09090b,
      roughness: 0.3,
      metalness: 0.8,
    });

    const edgeMaterial = new THREE.LineBasicMaterial({
      color: 0xd6ebfd,
      transparent: true,
      opacity: 0.3,
    });

    const pillars: {
      mesh: THREE.Mesh;
      baseX: number;
      baseZ: number;
      distFromCenter: number;
    }[] = [];

    const half = (gridSize - 1) / 2;

    for (let i = 0; i < gridSize; i++) {
      for (let j = 0; j < gridSize; j++) {
        const x = (i - half) * spacing;
        const z = (j - half) * spacing;
        const distFromCenter = Math.sqrt(x * x + z * z);

        const mesh = new THREE.Mesh(pillarGeometry, pillarMaterial);
        mesh.position.set(x, 0, z);

        const edges = new THREE.LineSegments(edgesGeometry, edgeMaterial);
        mesh.add(edges);

        rootGroup.add(mesh);
        pillars.push({ mesh, baseX: x, baseZ: z, distFromCenter });
      }
    }

    // Mouse Interaction
    let targetTiltX = 0;
    let targetTiltY = 0;
    let currentTiltX = 0;
    let currentTiltY = 0;
    let mouseRippleX = 0;
    let mouseRippleZ = 0;

    const handlePointerMove = (e: MouseEvent | TouchEvent) => {
      const clientX = "touches" in e ? e.touches[0].clientX : e.clientX;
      const clientY = "touches" in e ? e.touches[0].clientY : e.clientY;
      const rect = container.getBoundingClientRect();
      const normX = ((clientX - rect.left) / rect.width) * 2 - 1;
      const normY = -(((clientY - rect.top) / rect.height) * 2 - 1);

      targetTiltY = normX * 0.3;
      targetTiltX = -normY * 0.25;
      mouseRippleX = normX * 1.5;
      mouseRippleZ = normY * 1.5;
    };

    const handlePointerLeave = () => {
      targetTiltX = 0;
      targetTiltY = 0;
      mouseRippleX = 0;
      mouseRippleZ = 0;
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

      // Mouse lerp
      currentTiltX += (targetTiltX - currentTiltX) * 0.05;
      currentTiltY += (targetTiltY - currentTiltY) * 0.05;

      rootGroup.rotation.y = Math.PI / 4 + currentTiltY * 0.3;
      rootGroup.rotation.x = currentTiltX * 0.2;

      // Antigravity Sine Wave
      if (!prefersReducedMotion) {
        for (let k = 0; k < pillars.length; k++) {
          const p = pillars[k];
          // Interactive ripple based on distance and mouse influence
          const distToMouse = Math.sqrt(
            Math.pow(p.baseX - mouseRippleX * 0.5, 2) +
            Math.pow(p.baseZ - mouseRippleZ * 0.5, 2)
          );
          const wave =
            Math.sin(elapsedTime * 2.2 - p.distFromCenter * 1.4) * 0.32 +
            Math.cos(elapsedTime * 1.5 + distToMouse * 0.8) * 0.12;

          p.mesh.position.y = wave;
        }
      }

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

      pillarGeometry.dispose();
      edgesGeometry.dispose();
      pillarMaterial.dispose();
      edgeMaterial.dispose();
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
      aria-label="Interactive 3D Floating Isometric Data Wave"
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(202,236,255,0.06),transparent_70%)] pointer-events-none" />
    </div>
  );
}
