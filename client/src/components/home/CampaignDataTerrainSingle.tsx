import React, { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { motion, AnimatePresence } from "framer-motion";
import { Activity, MousePointerClick, Info } from "lucide-react";

// Aqua Care 90-Day Campaign ROAS Data Points (X: Timeline, Y: ROAS Multiplier)
const aquaCareRoasData = [
  { week: "Wk 1", roas: 1.2, spend: "AED 1,200", rev: "AED 1,440", note: "Catalog setup & baseline audience testing" },
  { week: "Wk 2", roas: 2.1, spend: "AED 2,500", rev: "AED 5,250", note: "Video creative test — Hard water solution" },
  { week: "Wk 3", roas: 4.45, spend: "AED 4,100", rev: "AED 18,245", note: "Meta retargeting funnel optimization" },
  { week: "Wk 4", roas: 8.5, spend: "AED 3,200", rev: "AED 27,200", note: "UGC video reels scaling in Sharjah & Dubai" },
  { week: "Wk 5", roas: 18.0, spend: "AED 1,800", rev: "AED 32,400", note: "Pre-storm rainwater filter campaign push" },
  { week: "Wk 6 (PEAK)", roas: 208.0, spend: "AED 54", rev: "AED 11,250", note: "🔥 FLOOD PUMP SPIKE: AED 54 spend → AED 11,250 direct revenue", isPeak: true },
  { week: "Wk 7", roas: 34.0, spend: "AED 2,400", rev: "AED 81,600", note: "Post-flood emergency response demand scale" },
  { week: "Wk 8", roas: 12.4, spend: "AED 3,100", rev: "AED 38,440", note: "Villa water system inventory replenishment" },
  { week: "Wk 9", roas: 7.8, spend: "AED 2,800", rev: "AED 21,840", note: "Evergreen catalog retargeting baseline" },
  { week: "Wk 10", roas: 4.8, spend: "AED 3,500", rev: "AED 16,800", note: "Steady-state performance benchmark" }
];

export const CampaignDataTerrainSingle: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [hoveredPoint, setHoveredPoint] = useState<typeof aquaCareRoasData[0] | null>(null);
  const [tooltipPos, setTooltipPos] = useState<{ x: number; y: number } | null>(null);
  const [webglSupported, setWebglSupported] = useState(true);

  useEffect(() => {
    if (!canvasRef.current || !containerRef.current) return;

    try {
      const testCanvas = document.createElement("canvas");
      const gl = testCanvas.getContext("webgl") || testCanvas.getContext("experimental-webgl");
      if (!gl) {
        setWebglSupported(false);
        return;
      }
    } catch {
      setWebglSupported(false);
      return;
    }

    const container = containerRef.current;
    const canvas = canvasRef.current;

    // 1. Three.js Scene Setup
    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x0a0a0c, 0.07);

    const aspect = container.clientWidth / container.clientHeight;
    const camera = new THREE.PerspectiveCamera(45, aspect, 0.1, 100);
    camera.position.set(0, 5.5, 8.5);
    camera.lookAt(0, 0.6, 0);

    const renderer = new THREE.WebGLRenderer({
      canvas,
      antialias: true,
      alpha: true,
      powerPreference: "high-performance"
    });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(container.clientWidth, container.clientHeight);

    // 2. Subdivided PlaneGeometry driven by Aqua Care ROAS Data
    const COLS = aquaCareRoasData.length; // 10 data points along X
    const ROWS = 5; // 5 rows along Z for depth terrain
    const WIDTH = 9.5;
    const DEPTH = 3.5;

    const geometry = new THREE.PlaneGeometry(WIDTH, DEPTH, COLS - 1, ROWS - 1);
    geometry.rotateX(-Math.PI / 2);

    const posAttr = geometry.attributes.position;
    const totalVertices = posAttr.count;
    const vertexDataMap: (typeof aquaCareRoasData[0] | null)[] = new Array(totalVertices);

    // Find Max ROAS to normalize heights
    const maxRoas = 208.0;

    for (let r = 0; r < ROWS; r++) {
      for (let c = 0; c < COLS; c++) {
        const vertIdx = r * COLS + c;
        const dp = aquaCareRoasData[c];
        vertexDataMap[vertIdx] = dp;

        // Non-linear scaling (square root) so 208x peak is dramatic without flattening baseline
        const normalized = Math.pow(dp.roas / maxRoas, 0.45);
        // Row dampening towards edges for smooth 3D ribbon look
        const rowFactor = 1.0 - Math.abs(r - 2) * 0.22;
        const yHeight = normalized * 3.5 * rowFactor + 0.05;

        posAttr.setY(vertIdx, yHeight);
      }
    }
    posAttr.needsUpdate = true;
    geometry.computeVertexNormals();

    // 3. Terracotta Emissive Wireframe Material (#B83A1A)
    const wireframeMat = new THREE.MeshBasicMaterial({
      color: new THREE.Color(0xB83A1A),
      wireframe: true,
      transparent: true,
      opacity: 0.85
    });

    const baseFillMat = new THREE.MeshBasicMaterial({
      color: new THREE.Color(0x0a0a0c),
      transparent: true,
      opacity: 0.8,
      side: THREE.DoubleSide
    });

    const terrainGroup = new THREE.Group();
    const wireframeMesh = new THREE.Mesh(geometry, wireframeMat);
    const baseMesh = new THREE.Mesh(geometry, baseFillMat);
    terrainGroup.add(baseMesh);
    terrainGroup.add(wireframeMesh);
    scene.add(terrainGroup);

    // 4. Data Node Spheres & Glowing Peak Highlight
    const pointGeo = new THREE.SphereGeometry(0.08, 12, 12);
    const normalPointMat = new THREE.MeshBasicMaterial({ color: 0xffffff });
    const peakPointMat = new THREE.MeshBasicMaterial({ color: 0xFF5226 }); // Extra bright for 208x peak

    const pointMeshes: THREE.Mesh[] = [];
    for (let i = 0; i < totalVertices; i++) {
      const dp = vertexDataMap[i];
      const isPeak = dp?.isPeak;
      const pMesh = new THREE.Mesh(pointGeo, isPeak ? peakPointMat : normalPointMat);
      pMesh.userData = { vertIdx: i };

      const x = posAttr.getX(i);
      const y = posAttr.getY(i);
      const z = posAttr.getZ(i);
      pMesh.position.set(x, y, z);

      terrainGroup.add(pMesh);
      pointMeshes.push(pMesh);
    }

    // Floor Reference Grid
    const gridHelper = new THREE.GridHelper(12, 12, 0x333340, 0x1a1a24);
    gridHelper.position.y = -0.02;
    scene.add(gridHelper);

    // 5. Raycaster Setup for Hover Inspection
    const raycaster = new THREE.Raycaster();
    const mouse = new THREE.Vector2(-999, -999);

    const handlePointerMove = (e: PointerEvent) => {
      const rect = container.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      mouse.x = (x / rect.width) * 2 - 1;
      mouse.y = -(y / rect.height) * 2 + 1;
    };

    const handlePointerLeave = () => {
      mouse.x = -999;
      mouse.y = -999;
      setHoveredPoint(null);
      setTooltipPos(null);
    };

    container.addEventListener("pointermove", handlePointerMove);
    container.addEventListener("pointerleave", handlePointerLeave);

    // 6. Animation Loop: Idle Orbit + Scroll Dolly
    let animId: number;
    let clock = new THREE.Clock();

    const animate = () => {
      animId = requestAnimationFrame(animate);
      const elapsedTime = clock.getElapsedTime();

      // Slow Continuous Idle Orbit
      terrainGroup.rotation.y = Math.sin(elapsedTime * 0.2) * 0.07;

      // Scroll Dolly: Camera position scrubbed to container visibility
      const rect = container.getBoundingClientRect();
      const viewportH = window.innerHeight;
      const scrollProgress = Math.min(Math.max((viewportH - rect.top) / (viewportH + rect.height), 0), 1);

      const targetCamY = 3.8 + scrollProgress * 2.8;
      const targetCamZ = 9.2 - scrollProgress * 2.0;

      camera.position.y = THREE.MathUtils.lerp(camera.position.y, targetCamY, 0.05);
      camera.position.z = THREE.MathUtils.lerp(camera.position.z, targetCamZ, 0.05);
      camera.lookAt(0, 0.6, 0);

      // Hover Raycasting
      if (mouse.x !== -999) {
        raycaster.setFromCamera(mouse, camera);
        const intersects = raycaster.intersectObjects(pointMeshes);

        if (intersects.length > 0) {
          const hit = intersects[0].object as THREE.Mesh;
          const idx = hit.userData.vertIdx;
          const dp = vertexDataMap[idx];

          if (dp) {
            setHoveredPoint(dp);

            const worldPos = new THREE.Vector3();
            hit.getWorldPosition(worldPos);
            worldPos.project(camera);

            const screenX = (worldPos.x * 0.5 + 0.5) * container.clientWidth;
            const screenY = (-(worldPos.y * 0.5) + 0.5) * container.clientHeight;
            setTooltipPos({ x: screenX, y: screenY });
          }
        }
      }

      renderer.render(scene, camera);
    };

    animate();

    const handleResize = () => {
      if (!container || !renderer) return;
      camera.aspect = container.clientWidth / container.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(container.clientWidth, container.clientHeight);
    };
    window.addEventListener("resize", handleResize);

    return () => {
      cancelAnimationFrame(animId);
      container.removeEventListener("pointermove", handlePointerMove);
      container.removeEventListener("pointerleave", handlePointerLeave);
      window.removeEventListener("resize", handleResize);
      renderer.dispose();
    };
  }, []);

  return (
    <section className="py-24 bg-transparent border-y border-white/10 relative overflow-hidden">
      <div className="container max-w-7xl mx-auto px-4 md:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#B83A1A]/10 border border-[#B83A1A]/30 text-[#B83A1A] text-xs font-mono uppercase tracking-widest mb-3">
              <Activity className="w-3.5 h-3.5" />
              <span>Real Campaign Data Geometry</span>
            </div>
            <h2 className="text-3xl md:text-5xl font-display font-bold uppercase tracking-tight text-white">
              The Numbers Behind The Work
            </h2>
            <p className="text-muted-foreground text-sm md:text-base font-light mt-2 max-w-xl">
              Every peak here is a real campaign — hover over the nodes to see Aqua Care's verified ROAS performance over time.
            </p>
          </div>
          
          <div className="text-xs font-mono text-neutral-400 uppercase tracking-widest hidden md:flex items-center gap-2 bg-white/[0.04] px-4 py-2 rounded-full border border-white/10">
            <MousePointerClick className="w-3.5 h-3.5 text-[#B83A1A]" />
            <span>Hover Nodes for Live ROAS Stats</span>
          </div>
        </div>

        {/* 3D Scene Container */}
        <div
          ref={containerRef}
          className="relative w-full h-[420px] sm:h-[500px] rounded-3xl border border-white/10 bg-[#0A0A0C]/90 overflow-hidden shadow-2xl group cursor-crosshair"
        >
          {!webglSupported ? (
            <div className="w-full h-full flex flex-col items-center justify-center p-8 text-center bg-neutral-950 text-white space-y-3">
              <Info className="w-8 h-8 text-[#B83A1A]" />
              <h3 className="text-lg font-bold">Aqua Care Campaign ROAS Fallback</h3>
              <p className="text-xs text-neutral-400 max-w-md">
                Peak performance reached <strong>208x ROAS</strong> (AED 54 spend $\rightarrow$ AED 11,250 revenue) with a <strong>4.45x average ROAS</strong> across the 90-day campaign.
              </p>
            </div>
          ) : (
            <canvas ref={canvasRef} className="w-full h-full block" />
          )}

          {/* Screen Axis Labels */}
          <div className="absolute bottom-5 left-5 pointer-events-none text-[10px] font-mono tracking-widest text-neutral-400 uppercase bg-black/60 px-3 py-1 rounded-full border border-white/10 backdrop-blur-md">
            <span>← Aqua Care 90-Day Timeline →</span>
          </div>

          <div className="absolute top-5 left-5 pointer-events-none text-[10px] font-mono tracking-widest text-[#B83A1A] uppercase flex items-center gap-2 bg-black/60 px-3 py-1 rounded-full border border-[#B83A1A]/30 backdrop-blur-md">
            <span className="w-2 h-2 rounded-full bg-[#B83A1A] animate-pulse" />
            <span>Y-Axis: Tracked ROAS Multiplier</span>
          </div>

          {/* Hover Glass Tooltip */}
          <AnimatePresence>
            {hoveredPoint && tooltipPos && (
              <motion.div
                initial={{ opacity: 0, scale: 0.9, y: 10 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9, y: 10 }}
                transition={{ duration: 0.15 }}
                style={{
                  left: `${Math.min(Math.max(tooltipPos.x, 140), containerRef.current ? containerRef.current.clientWidth - 150 : tooltipPos.x)}px`,
                  top: `${Math.max(tooltipPos.y - 110, 15)}px`
                }}
                className="absolute -translate-x-1/2 pointer-events-none z-30 w-64 p-3.5 rounded-2xl bg-[#12121A]/95 border border-white/20 backdrop-blur-xl shadow-2xl text-white space-y-1.5"
              >
                <div className="flex items-center justify-between border-b border-white/10 pb-1">
                  <span className="text-[10px] font-mono text-neutral-400 uppercase">Aqua Care Campaign</span>
                  <span className="text-[10px] font-mono text-[#B83A1A] font-bold">{hoveredPoint.week}</span>
                </div>

                <div className="text-base font-bold font-display flex items-center gap-2 text-white">
                  <span>{hoveredPoint.roas}x ROAS</span>
                  {hoveredPoint.isPeak && (
                    <span className="px-1.5 py-0.5 rounded text-[8px] font-mono bg-[#B83A1A] text-white uppercase font-bold">
                      208x Peak Spike
                    </span>
                  )}
                </div>

                <p className="text-[11px] text-neutral-300 font-light leading-snug">
                  {hoveredPoint.note}
                </p>
                <div className="text-[10px] font-mono text-neutral-400 pt-0.5">
                  Spend: {hoveredPoint.spend} | Rev: {hoveredPoint.rev}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
};
