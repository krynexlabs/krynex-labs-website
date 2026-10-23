"use client";

import React, { useEffect, useRef } from "react";
import * as THREE from "three";

export default function HeroRubikScene() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Check prefers-reduced-motion
    const prefersReducedMotion =
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    // Scene, Camera, Renderer
    const scene = new THREE.Scene();
    const width = container.clientWidth || 500;
    const height = container.clientHeight || 500;

    const camera = new THREE.PerspectiveCamera(38, width / height, 0.1, 100);
    camera.position.set(4.2, 3.2, 5.0);

    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      powerPreference: "high-performance",
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setClearColor(0x000000, 0);
    container.appendChild(renderer.domElement);

    // Root Group
    const rootGroup = new THREE.Group();
    scene.add(rootGroup);

    // Lighting (Resend Monochrome Aesthetic)
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
    scene.add(ambientLight);

    const keyLight = new THREE.DirectionalLight(0xffffff, 2.2);
    keyLight.position.set(5, 8, 5);
    scene.add(keyLight);

    const rimLight = new THREE.DirectionalLight(0xcaecff, 1.5);
    rimLight.position.set(-5, 4, -4);
    scene.add(rimLight);

    const bottomFill = new THREE.DirectionalLight(0x71717a, 0.5);
    bottomFill.position.set(0, -6, 2);
    scene.add(bottomFill);

    // Materials
    const cubeMaterial = new THREE.MeshStandardMaterial({
      color: 0x0a0a0a,
      roughness: 0.25,
      metalness: 0.85,
    });

    const edgeMaterial = new THREE.LineBasicMaterial({
      color: 0xd6ebfd,
      transparent: true,
      opacity: 0.35,
    });

    const hoverEdgeMaterial = new THREE.LineBasicMaterial({
      color: 0xffffff,
      transparent: true,
      opacity: 0.85,
    });

    // Create 3x3x3 Subcubes (27 subcubes)
    const subcubes: {
      mesh: THREE.Mesh;
      basePos: THREE.Vector3;
      edges: THREE.LineSegments;
    }[] = [];

    const cubeSize = 0.68;
    const spacing = 0.76;
    const boxGeometry = new THREE.BoxGeometry(cubeSize, cubeSize, cubeSize);
    const edgesGeometry = new THREE.EdgesGeometry(boxGeometry);

    for (let x = -1; x <= 1; x++) {
      for (let y = -1; y <= 1; y++) {
        for (let z = -1; z <= 1; z++) {
          const mesh = new THREE.Mesh(boxGeometry, cubeMaterial);
          const basePos = new THREE.Vector3(x * spacing, y * spacing, z * spacing);
          mesh.position.copy(basePos);

          const edges = new THREE.LineSegments(edgesGeometry, edgeMaterial);
          mesh.add(edges);

          rootGroup.add(mesh);
          subcubes.push({ mesh, basePos, edges });
        }
      }
    }

    camera.lookAt(0, 0, 0);

    // Mouse Interaction
    let targetRotationX = 0;
    let targetRotationY = 0;
    let currentRotationX = 0;
    let currentRotationY = 0;
    let expansionTarget = 0; // 0 = closed, 1 = expanded
    let currentExpansion = 0;

    const handlePointerMove = (e: MouseEvent | TouchEvent) => {
      const clientX = "touches" in e ? e.touches[0].clientX : e.clientX;
      const clientY = "touches" in e ? e.touches[0].clientY : e.clientY;
      const rect = container.getBoundingClientRect();
      const normX = ((clientX - rect.left) / rect.width) * 2 - 1;
      const normY = -(((clientY - rect.top) / rect.height) * 2 - 1);

      targetRotationY = normX * 0.45;
      targetRotationX = -normY * 0.35;
      expansionTarget = 0.28; // Subtle antigravity expansion
    };

    const handlePointerLeave = () => {
      targetRotationX = 0;
      targetRotationY = 0;
      expansionTarget = 0;
    };

    container.addEventListener("mousemove", handlePointerMove);
    container.addEventListener("mouseleave", handlePointerLeave);
    container.addEventListener("touchstart", handlePointerMove, { passive: true });
    container.addEventListener("touchend", handlePointerLeave);

    // Animation Loop
    let animationFrameId: number;
    let clock = new THREE.Clock();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);

      const elapsedTime = clock.getElapsedTime();

      // Zero-gravity floating physics
      if (!prefersReducedMotion) {
        rootGroup.position.y = Math.sin(elapsedTime * 1.4) * 0.12;
        rootGroup.rotation.y += 0.0035;
        rootGroup.rotation.x = Math.sin(elapsedTime * 0.8) * 0.05;
      }

      // Smooth mouse parallax lerp
      currentRotationX += (targetRotationX - currentRotationX) * 0.06;
      currentRotationY += (targetRotationY - currentRotationY) * 0.06;
      rootGroup.rotation.y += currentRotationY * 0.03;
      rootGroup.rotation.x += currentRotationX * 0.03;

      // Subcube expansion lerp (subtle antigravity separation)
      currentExpansion += (expansionTarget - currentExpansion) * 0.08;
      const spreadFactor = 1 + currentExpansion;

      for (let i = 0; i < subcubes.length; i++) {
        const item = subcubes[i];
        item.mesh.position.set(
          item.basePos.x * spreadFactor,
          item.basePos.y * spreadFactor,
          item.basePos.z * spreadFactor
        );

        if (currentExpansion > 0.05) {
          item.edges.material = hoverEdgeMaterial;
        } else {
          item.edges.material = edgeMaterial;
        }
      }

      renderer.render(scene, camera);
    };

    animate();

    // Resize Observer
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

    // Cleanup
    return () => {
      cancelAnimationFrame(animationFrameId);
      resizeObserver.disconnect();
      container.removeEventListener("mousemove", handlePointerMove);
      container.removeEventListener("mouseleave", handlePointerLeave);
      container.removeEventListener("touchstart", handlePointerMove);
      container.removeEventListener("touchend", handlePointerLeave);

      boxGeometry.dispose();
      edgesGeometry.dispose();
      cubeMaterial.dispose();
      edgeMaterial.dispose();
      hoverEdgeMaterial.dispose();
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
      aria-label="Interactive 3D Antigravity Rubik Matrix"
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(202,236,255,0.06),transparent_70%)] pointer-events-none" />
    </div>
  );
}
