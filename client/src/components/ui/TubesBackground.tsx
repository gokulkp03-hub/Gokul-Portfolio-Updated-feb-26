import React, { useRef, useMemo, useState, useEffect } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";
import { Float, MeshDistortMaterial, MeshWobbleMaterial } from "@react-three/drei";

// Sub-component to render individual tubes
function Tube({
  curve,
  color,
  delay,
}: {
  curve: THREE.Curve<THREE.Vector3>;
  color: string;
  delay: number;
}) {
  const meshRef = useRef<THREE.Mesh>(null);
  const [hovered, setHovered] = useState(false);

  useFrame((state) => {
    if (!meshRef.current) return;
    const time = state.clock.getElapsedTime() + delay;

    // Subtle breathing animation
    meshRef.current.position.y = Math.sin(time * 0.5) * 0.1;

    // Rotation based on time
    meshRef.current.rotation.z = time * 0.05;
  });

  return (
    <mesh
      ref={meshRef}
      onPointerOver={() => setHovered(true)}
      onPointerOut={() => setHovered(false)}
    >
      <tubeGeometry args={[curve, 64, 0.012, 8, false]} />
      <meshStandardMaterial
        color={color}
        emissive={color}
        emissiveIntensity={hovered ? 2 : 0.8}
        transparent
        opacity={0.4}
      />
    </mesh>
  );
}

// Background scene manager
function Scene() {
  const { viewport, mouse } = useThree();
  const groupRef = useRef<THREE.Group>(null);

  // Generate random curves for the tubes
  const tubes = useMemo(() => {
    const tubeCount = 8; // Reduced count for performance and subtlety
    return Array.from({ length: tubeCount }, (_, i) => {
      const points = [];
      const segments = 4; // Simpler curves
      const xRange = viewport.width * 2;
      const yRange = viewport.height * 2;

      for (let j = 0; j < segments; j++) {
        points.push(
          new THREE.Vector3(
            (Math.random() - 0.5) * xRange,
            (Math.random() - 0.5) * yRange,
            (Math.random() - 0.5) * 10 - 5
          )
        );
      }

      const curve = new THREE.CatmullRomCurve3(points);

      // Muted Brand Palette: Deep Orange, Amber, Bronze, Charcoal
      const colors = ["#F97316", "#EA580C", "#9A3412", "#431407", "#7C2D12"];
      const color = colors[Math.floor(Math.random() * colors.length)];

      return { curve, color, delay: Math.random() * 20 };
    });
  }, [viewport]);

  useFrame((state) => {
    if (!groupRef.current) return;

    // Direct cursor follow with extreme smoothing for "cinematic" feel
    const targetX = mouse.x * (viewport.width / 6);
    const targetY = mouse.y * (viewport.height / 6);

    groupRef.current.position.x += (targetX - groupRef.current.position.x) * 0.01;
    groupRef.current.position.y += (targetY - groupRef.current.position.y) * 0.01;

    // Very slow rotation
    groupRef.current.rotation.y += 0.0005;
    groupRef.current.rotation.x += 0.0002;
  });

  return (
    <group ref={groupRef}>
      {tubes.map((tube, i) => (
        <Tube key={i} {...tube} />
      ))}
    </group>
  );
}

export function TubesBackground() {
  return (
    <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden opacity-50">
      <Canvas
        camera={{ position: [0, 0, 15], fov: 45 }}
        gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
        dpr={[1, 1.5]} 
      >
        <Scene />
      </Canvas>
      {/* Vignette to soften edges and focus content */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-transparent to-background pointer-events-none" />
    </div>
  );
}
