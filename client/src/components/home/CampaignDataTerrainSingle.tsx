import React, { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { motion, AnimatePresence } from "framer-motion";
import { Filter, Users, MessageCircle, DollarSign, Activity } from "lucide-react";

const funnelNodes = [
  { id: "reach", label: "Reach", value: "7.3M Impressions", desc: "Broad targeting and algorithmic scaling.", icon: Filter, pos: new THREE.Vector3(-4, 2, -2) },
  { id: "attention", label: "Attention", value: "320K+ Views", desc: "High-retention video hooks.", icon: Users, pos: new THREE.Vector3(-2, 1, 0) },
  { id: "leads", label: "Leads", value: "7,300+ Enquiries", desc: "Qualified WhatsApp & form leads.", icon: MessageCircle, pos: new THREE.Vector3(0, 0, 1) },
  { id: "revenue", label: "Revenue", value: "AED 31K+ Spike", desc: "Direct response campaign revenue.", icon: DollarSign, pos: new THREE.Vector3(2, -1, 0) },
  { id: "efficiency", label: "Efficiency", value: "4.45x Avg ROAS", desc: "Tracked return on ad spend.", icon: Activity, pos: new THREE.Vector3(4, -2, -2) }
];

export const CampaignDataTerrainSingle: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [hoveredNode, setHoveredNode] = useState<typeof funnelNodes[0] | null>(null);
  const [tooltipPos, setTooltipPos] = useState<{ x: number; y: number } | null>(null);

  useEffect(() => {
    if (!canvasRef.current || !containerRef.current) return;
    const canvas = canvasRef.current;
    
    // Check reduced motion
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true });
    // Cap pixel ratio for performance
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
    
    const updateSize = () => {
      const width = containerRef.current?.clientWidth || window.innerWidth;
      const height = containerRef.current?.clientHeight || window.innerHeight;
      renderer.setSize(width, height);
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
    };

    const scene = new THREE.Scene();
    
    const camera = new THREE.PerspectiveCamera(45, 1, 0.1, 100);
    camera.position.set(0, 0, 10);
    
    // Add nodes (spheres)
    const nodeGeometry = new THREE.SphereGeometry(0.3, 32, 32);
    const nodeMaterial = new THREE.MeshBasicMaterial({ color: 0x3f3f46 }); // Zinc 700
    const activeMaterial = new THREE.MeshBasicMaterial({ color: 0xf97316 }); // Orange 500

    const meshes: THREE.Mesh[] = [];
    funnelNodes.forEach((node) => {
      const mesh = new THREE.Mesh(nodeGeometry, nodeMaterial.clone());
      mesh.position.copy(node.pos);
      mesh.userData = node;
      scene.add(mesh);
      meshes.push(mesh);
    });

    // Add path (line)
    const curve = new THREE.CatmullRomCurve3(funnelNodes.map(n => n.pos));
    const pathPoints = curve.getPoints(50);
    const pathGeometry = new THREE.BufferGeometry().setFromPoints(pathPoints);
    const pathMaterial = new THREE.LineBasicMaterial({ color: 0x52525b, linewidth: 2, transparent: true, opacity: 0.5 });
    const pathLine = new THREE.Line(pathGeometry, pathMaterial);
    scene.add(pathLine);

    // Glowing marker
    const markerGeometry = new THREE.SphereGeometry(0.15, 16, 16);
    const markerMaterial = new THREE.MeshBasicMaterial({ color: 0xffffff });
    const marker = new THREE.Mesh(markerGeometry, markerMaterial);
    scene.add(marker);

    // Add glowing light to marker
    const pointLight = new THREE.PointLight(0xf97316, 2, 5);
    marker.add(pointLight);

    updateSize();
    window.addEventListener('resize', updateSize);

    const raycaster = new THREE.Raycaster();
    const mouse = new THREE.Vector2();
    let isHovering = false;

    const onPointerMove = (event: PointerEvent) => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      
      // Calculate mouse position in normalized device coordinates
      mouse.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
      mouse.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;
      
      raycaster.setFromCamera(mouse, camera);
      const intersects = raycaster.intersectObjects(meshes);
      
      if (intersects.length > 0) {
        document.body.style.cursor = 'pointer';
        isHovering = true;
        const object = intersects[0].object as THREE.Mesh;
        const nodeData = object.userData as typeof funnelNodes[0];
        setHoveredNode(nodeData);
        setTooltipPos({ x: event.clientX - rect.left, y: event.clientY - rect.top });
        
        // Highlight logic
        meshes.forEach(m => (m.material as THREE.MeshBasicMaterial).color.setHex(0x3f3f46));
        (object.material as THREE.MeshBasicMaterial).color.setHex(0xf97316);
      } else {
        if (isHovering) {
          document.body.style.cursor = 'default';
          isHovering = false;
          setHoveredNode(null);
          meshes.forEach(m => (m.material as THREE.MeshBasicMaterial).color.setHex(0x3f3f46));
        }
      }
    };
    
    containerRef.current.addEventListener('pointermove', onPointerMove);

    // Animation loop
    let animId: number;
    let t = 0;
    
    const animate = () => {
      animId = requestAnimationFrame(animate);
      
      if (!prefersReducedMotion) {
        // Slow continuous traversal for marker
        t += 0.002;
        if (t > 1) t = 0;
        
        const pt = curve.getPoint(t);
        marker.position.copy(pt);

        // Slowly orbit camera slightly
        camera.position.x = Math.sin(t * Math.PI * 2) * 1.5;
        camera.position.y = Math.cos(t * Math.PI * 2) * 0.5;
        camera.lookAt(0, 0, 0);
      } else {
        // Reduced motion: park marker at center, no camera sway
        marker.position.copy(curve.getPoint(0.5));
        camera.lookAt(0, 0, 0);
      }
      
      renderer.render(scene, camera);
    };
    
    animate();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', updateSize);
      containerRef.current?.removeEventListener('pointermove', onPointerMove);
      renderer.dispose();
      meshes.forEach(m => {
        m.geometry.dispose();
        (m.material as THREE.Material).dispose();
      });
      pathGeometry.dispose();
      pathMaterial.dispose();
      markerGeometry.dispose();
      markerMaterial.dispose();
    };
  }, []);

  return (
    <div className="relative w-full h-[600px] bg-zinc-950 rounded-[2.5rem] border border-border/20 overflow-hidden" ref={containerRef}>
      
      <div className="absolute top-8 left-8 z-10 pointer-events-none max-w-sm">
        <h3 className="text-2xl font-display font-bold text-white mb-2 tracking-tight">Campaign Journey</h3>
        <p className="text-sm text-neutral-400 font-light">
          An interactive path representing the full-funnel performance marketing methodology.
        </p>
      </div>

      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full touch-none" />

      <AnimatePresence>
        {hoveredNode && tooltipPos && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 10 }}
            transition={{ duration: 0.15 }}
            style={{
              position: 'absolute',
              left: tooltipPos.x,
              top: tooltipPos.y,
              transform: 'translate(-50%, -120%)'
            }}
            className="z-20 pointer-events-none bg-zinc-900/90 backdrop-blur-md border border-white/10 rounded-2xl p-4 shadow-2xl min-w-[200px]"
          >
            <div className="flex items-center gap-2 mb-2">
              <div className="p-1.5 rounded-lg bg-orange-500/20 text-orange-500">
                {React.createElement(hoveredNode.icon, { className: "w-4 h-4" })}
              </div>
              <span className="text-[10px] font-bold uppercase tracking-widest text-orange-500">{hoveredNode.label}</span>
            </div>
            <div className="text-lg font-display font-bold text-white mb-1 leading-tight">{hoveredNode.value}</div>
            <div className="text-xs text-neutral-400 font-light leading-snug">{hoveredNode.desc}</div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
