"use client";

import React, { useEffect, useRef } from "react";
import * as THREE from "three";

export default function OrbitalGlobeScene() {
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
    camera.position.set(0, 0, 4.8);

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

    // Initial globe tilt
    rootGroup.rotation.x = 0.35;
    rootGroup.rotation.y = -0.6;

    // Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.8);
    scene.add(ambientLight);

    const pointLight = new THREE.PointLight(0x02fcef, 2.5, 8);
    pointLight.position.set(2, 3, 3);
    scene.add(pointLight);

    // Globe Radius
    const globeRadius = 1.5;

    // Wireframe Sphere
    const sphereGeo = new THREE.SphereGeometry(globeRadius, 28, 20);
    const sphereMat = new THREE.MeshBasicMaterial({
      color: 0xd6ebfd,
      wireframe: true,
      transparent: true,
      opacity: 0.16,
    });
    const globeMesh = new THREE.Mesh(sphereGeo, sphereMat);
    rootGroup.add(globeMesh);

    // Latitude / Longitude Ring Accents
    const equatorGeo = new THREE.RingGeometry(globeRadius - 0.01, globeRadius + 0.01, 64);
    const ringMat = new THREE.MeshBasicMaterial({
      color: 0xcaecff,
      side: THREE.DoubleSide,
      transparent: true,
      opacity: 0.3,
    });
    const equator = new THREE.Mesh(equatorGeo, ringMat);
    equator.rotation.x = Math.PI / 2;
    rootGroup.add(equator);

    // Coordinates for Ahmedabad, India (approx lat 23.02° N, lon 72.57° E)
    const latRad = (23.02 * Math.PI) / 180;
    const lonRad = (72.57 * Math.PI) / 180;

    const ahmedabadX = globeRadius * Math.cos(latRad) * Math.sin(lonRad);
    const ahmedabadY = globeRadius * Math.sin(latRad);
    const ahmedabadZ = globeRadius * Math.cos(latRad) * Math.cos(lonRad);

    const beaconPos = new THREE.Vector3(ahmedabadX, ahmedabadY, ahmedabadZ);

    // Beacon Pinpoint Mesh
    const beaconGeo = new THREE.SphereGeometry(0.065, 16, 16);
    const beaconMat = new THREE.MeshBasicMaterial({
      color: 0xffffff,
    });
    const beacon = new THREE.Mesh(beaconGeo, beaconMat);
    beacon.position.copy(beaconPos);
    rootGroup.add(beacon);

    // Pulse Ring from Ahmedabad
    const pulseGeo = new THREE.RingGeometry(0.08, 0.12, 32);
    const pulseMat = new THREE.MeshBasicMaterial({
      color: 0x02fcef,
      side: THREE.DoubleSide,
      transparent: true,
      opacity: 0.8,
    });
    const pulseRing = new THREE.Mesh(pulseGeo, pulseMat);
    pulseRing.position.copy(beaconPos.clone().multiplyScalar(1.01));
    pulseRing.lookAt(beaconPos.clone().multiplyScalar(2));
    rootGroup.add(pulseRing);

    // Orbital Connection Arcs
    const createArc = (start: THREE.Vector3, end: THREE.Vector3) => {
      const mid = start.clone().lerp(end, 0.5).normalize().multiplyScalar(globeRadius * 1.35);
      const curve = new THREE.QuadraticBezierCurve3(start, mid, end);
      const points = curve.getPoints(40);
      const geo = new THREE.BufferGeometry().setFromPoints(points);
      const mat = new THREE.LineBasicMaterial({
        color: 0xcaecff,
        transparent: true,
        opacity: 0.45,
      });
      return new THREE.Line(geo, mat);
    };

    // Target hubs around the globe (e.g., London, San Francisco, Tokyo, Singapore)
    const hubCoords = [
      { lat: 51.5, lon: -0.12 },  // London
      { lat: 37.77, lon: -122.4 }, // San Francisco
      { lat: 35.67, lon: 139.65 }, // Tokyo
      { lat: 1.35, lon: 103.82 },  // Singapore
    ];

    const arcLines: THREE.Line[] = [];
    hubCoords.forEach((coord) => {
      const cLat = (coord.lat * Math.PI) / 180;
      const cLon = (coord.lon * Math.PI) / 180;
      const hX = globeRadius * Math.cos(cLat) * Math.sin(cLon);
      const hY = globeRadius * Math.sin(cLat);
      const hZ = globeRadius * Math.cos(cLat) * Math.cos(cLon);
      const targetPos = new THREE.Vector3(hX, hY, hZ);

      // Add target dot
      const dotGeo = new THREE.SphereGeometry(0.035, 8, 8);
      const dotMat = new THREE.MeshBasicMaterial({ color: 0xcaecff });
      const dotMesh = new THREE.Mesh(dotGeo, dotMat);
      dotMesh.position.copy(targetPos);
      rootGroup.add(dotMesh);

      // Arc
      const arc = createArc(beaconPos, targetPos);
      rootGroup.add(arc);
      arcLines.push(arc);
    });

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

      targetTiltY = normX * 0.45;
      targetTiltX = -normY * 0.35;
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

      // Zero-gravity levitation & slow natural orbit rotation
      if (!prefersReducedMotion) {
        rootGroup.position.y = Math.sin(elapsedTime * 1.2) * 0.1;
        rootGroup.rotation.y += 0.003;

        // Signal Pulse expansion from Ahmedabad
        const pulseCycle = (elapsedTime * 1.8) % 1;
        pulseRing.scale.setScalar(1 + pulseCycle * 2.8);
        (pulseMat as THREE.MeshBasicMaterial).opacity = (1 - pulseCycle) * 0.75;
      }

      // Parallax Tilt Lerp
      currentTiltX += (targetTiltX - currentTiltX) * 0.06;
      currentTiltY += (targetTiltY - currentTiltY) * 0.06;
      rootGroup.rotation.x = 0.35 + currentTiltX * 0.3;
      rootGroup.rotation.y += currentTiltY * 0.02;

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

      sphereGeo.dispose();
      sphereMat.dispose();
      equatorGeo.dispose();
      ringMat.dispose();
      beaconGeo.dispose();
      beaconMat.dispose();
      pulseGeo.dispose();
      pulseMat.dispose();
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
      aria-label="Interactive 3D Orbital Signal Globe"
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(202,236,255,0.06),transparent_70%)] pointer-events-none" />
    </div>
  );
}
