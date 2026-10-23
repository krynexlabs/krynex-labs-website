"use client";

import React, { useEffect, useRef } from "react";
import * as THREE from "three";

export default function NeuralConstellationScene() {
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

    const camera = new THREE.PerspectiveCamera(40, width / height, 0.1, 100);
    camera.position.set(0, 0, 4.6);

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

    // Node Count (reduced by 50% on mobile)
    const nodeCount = isMobile ? 24 : 48;
    const radius = 1.6;
    const nodes: THREE.Vector3[] = [];

    // Distribute nodes using Fibonacci sphere algorithm
    const goldenRatio = (1 + Math.sqrt(5)) / 2;
    for (let i = 0; i < nodeCount; i++) {
      const theta = (2 * Math.PI * i) / goldenRatio;
      const phi = Math.acos(1 - (2 * (i + 0.5)) / nodeCount);
      const x = radius * Math.sin(phi) * Math.cos(theta);
      const y = radius * Math.sin(phi) * Math.sin(theta);
      const z = radius * Math.cos(phi);
      nodes.push(new THREE.Vector3(x, y, z));
    }

    // Node Sphere Geometry & Material
    const nodeGeometry = new THREE.SphereGeometry(0.045, 12, 12);
    const nodeMaterial = new THREE.MeshBasicMaterial({
      color: 0xcaecff,
    });

    const coreMaterial = new THREE.MeshBasicMaterial({
      color: 0x02fcef,
    });

    // Add node meshes
    const nodeMeshes: THREE.Mesh[] = [];
    nodes.forEach((pos, idx) => {
      const mesh = new THREE.Mesh(
        nodeGeometry,
        idx % 5 === 0 ? coreMaterial : nodeMaterial
      );
      mesh.position.copy(pos);
      rootGroup.add(mesh);
      nodeMeshes.push(mesh);
    });

    // Build Connecting Synapse Lines
    const maxDistance = isMobile ? 1.4 : 1.25;
    const linePositions: number[] = [];
    const lineIndices: number[] = [];

    for (let i = 0; i < nodeCount; i++) {
      for (let j = i + 1; j < nodeCount; j++) {
        const dist = nodes[i].distanceTo(nodes[j]);
        if (dist < maxDistance) {
          linePositions.push(nodes[i].x, nodes[i].y, nodes[i].z);
          linePositions.push(nodes[j].x, nodes[j].y, nodes[j].z);
        }
      }
    }

    const linesGeometry = new THREE.BufferGeometry();
    linesGeometry.setAttribute(
      "position",
      new THREE.Float32BufferAttribute(linePositions, 3)
    );

    const linesMaterial = new THREE.LineBasicMaterial({
      color: 0xd6ebfd,
      transparent: true,
      opacity: 0.22,
    });

    const lineSegments = new THREE.LineSegments(linesGeometry, linesMaterial);
    rootGroup.add(lineSegments);

    // Inner Glowing Core Sphere
    const innerGeo = new THREE.IcosahedronGeometry(0.5, 1);
    const innerMat = new THREE.MeshBasicMaterial({
      color: 0xffffff,
      wireframe: true,
      transparent: true,
      opacity: 0.18,
    });
    const innerCore = new THREE.Mesh(innerGeo, innerMat);
    rootGroup.add(innerCore);

    // Mouse Interaction
    let targetRotationX = 0;
    let targetRotationY = 0;
    let currentRotationX = 0;
    let currentRotationY = 0;

    const handlePointerMove = (e: MouseEvent | TouchEvent) => {
      const clientX = "touches" in e ? e.touches[0].clientX : e.clientX;
      const clientY = "touches" in e ? e.touches[0].clientY : e.clientY;
      const rect = container.getBoundingClientRect();
      const normX = ((clientX - rect.left) / rect.width) * 2 - 1;
      const normY = -(((clientY - rect.top) / rect.height) * 2 - 1);

      targetRotationY = normX * 0.55;
      targetRotationX = -normY * 0.4;
    };

    const handlePointerLeave = () => {
      targetRotationX = 0;
      targetRotationY = 0;
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

      if (!prefersReducedMotion) {
        // Zero-gravity levitation
        rootGroup.position.y = Math.sin(elapsedTime * 1.2) * 0.1;
        rootGroup.rotation.y += 0.003;
        rootGroup.rotation.x = Math.sin(elapsedTime * 0.6) * 0.06;

        innerCore.rotation.y -= 0.006;
        innerCore.rotation.x += 0.004;

        // Subtle pulsing opacity for synapse lines
        linesMaterial.opacity = 0.18 + Math.sin(elapsedTime * 2.5) * 0.08;
      }

      // Parallax lerp
      currentRotationX += (targetRotationX - currentRotationX) * 0.06;
      currentRotationY += (targetRotationY - currentRotationY) * 0.06;
      rootGroup.rotation.y += currentRotationY * 0.04;
      rootGroup.rotation.x += currentRotationX * 0.04;

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

      nodeGeometry.dispose();
      nodeMaterial.dispose();
      coreMaterial.dispose();
      linesGeometry.dispose();
      linesMaterial.dispose();
      innerGeo.dispose();
      innerMat.dispose();
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
      aria-label="Interactive 3D Neural Constellation"
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(2,252,239,0.06),transparent_70%)] pointer-events-none" />
    </div>
  );
}
