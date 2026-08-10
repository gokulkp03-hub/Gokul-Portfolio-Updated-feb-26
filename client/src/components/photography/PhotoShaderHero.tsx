import React, { useEffect, useRef, useState } from "react";
import * as THREE from "three";

interface PhotoShaderHeroProps {
  imageSrc: string;
  fallbackSrc?: string;
  headlineLine1?: string;
  headlineLine2?: string;
  sublabel?: string;
}

const vertexShader = `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

const fragmentShader = `
  uniform sampler2D uTexture;
  uniform vec2 uMouse;
  uniform float uTime;
  uniform float uProgress;
  uniform float uScrollVelocity;
  varying vec2 vUv;

  float rand(vec2 co) {
    return fract(sin(dot(co, vec2(12.9898, 78.233))) * 43758.5453);
  }

  void main() {
    vec2 uv = vUv;

    // 1. Mouse Displacement (Subtle glass ripple effect)
    vec2 mouseDist = uv - uMouse;
    float dist = length(mouseDist);
    float wave = sin(dist * 25.0 - uTime * 3.0) * 0.015;
    float factor = smoothstep(0.35, 0.0, dist);
    uv += (mouseDist / (dist + 0.001)) * wave * factor;

    // 2. Scroll Velocity Chromatic Aberration (RGB shift)
    float shift = clamp(uScrollVelocity * 0.0008, 0.0, 0.025);
    
    vec4 rCol = texture2D(uTexture, uv + vec2(shift, 0.0));
    vec4 gCol = texture2D(uTexture, uv);
    vec4 bCol = texture2D(uTexture, uv - vec2(shift, 0.0));

    vec3 finalColor = vec3(rCol.r, gCol.g, bCol.b);

    // 3. Noise-to-clarity reveal on load
    float noise = rand(uv + vec2(uTime * 0.01));
    float reveal = smoothstep(uProgress - 0.2, uProgress + 0.1, noise);
    finalColor = mix(finalColor, finalColor * (0.4 + 0.6 * (1.0 - reveal)), 1.0 - uProgress);

    gl_FragColor = vec4(finalColor, 1.0);
  }
`;

export const PhotoShaderHero: React.FC<PhotoShaderHeroProps> = ({
  imageSrc,
  fallbackSrc,
  headlineLine1 = "Food & Product",
  headlineLine2 = "Photography",
  sublabel = "Dubai — Commercial & Editorial Photography"
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
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
    } catch (e) {
      setWebglSupported(false);
      return;
    }

    const container = containerRef.current;
    const canvas = canvasRef.current;

    const scene = new THREE.Scene();
    const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0.1, 10);
    camera.position.z = 1;

    const renderer = new THREE.WebGLRenderer({
      canvas,
      antialias: true,
      alpha: true,
      powerPreference: "high-performance"
    });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(container.clientWidth, container.clientHeight);

    const textureLoader = new THREE.TextureLoader();
    let material: THREE.ShaderMaterial;

    textureLoader.load(imageSrc, (texture) => {
      texture.minFilter = THREE.LinearFilter;
      texture.magFilter = THREE.LinearFilter;

      const geometry = new THREE.PlaneGeometry(2, 2);
      material = new THREE.ShaderMaterial({
        vertexShader,
        fragmentShader,
        uniforms: {
          uTexture: { value: texture },
          uMouse: { value: new THREE.Vector2(0.5, 0.5) },
          uTime: { value: 0 },
          uProgress: { value: 0 },
          uScrollVelocity: { value: 0 }
        }
      });

      const mesh = new THREE.Mesh(geometry, material);
      scene.add(mesh);
    });

    let targetMouse = { x: 0.5, y: 0.5 };
    let currentMouse = { x: 0.5, y: 0.5 };
    let targetScrollVelocity = 0;
    let currentScrollVelocity = 0;
    let lastScrollY = window.scrollY;
    let progress = 0;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      targetMouse.x = (e.clientX - rect.left) / rect.width;
      targetMouse.y = 1.0 - (e.clientY - rect.top) / rect.height;
    };

    const handleScroll = () => {
      const currentScroll = window.scrollY;
      const velocity = Math.abs(currentScroll - lastScrollY);
      targetScrollVelocity = velocity;
      lastScrollY = currentScroll;
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("scroll", handleScroll);

    const handleResize = () => {
      if (!container || !renderer) return;
      renderer.setSize(container.clientWidth, container.clientHeight);
    };
    window.addEventListener("resize", handleResize);

    let animationFrameId: number;
    const startTime = Date.now();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);

      const elapsedTime = (Date.now() - startTime) / 1000;

      currentMouse.x += (targetMouse.x - currentMouse.x) * 0.08;
      currentMouse.y += (targetMouse.y - currentMouse.y) * 0.08;

      currentScrollVelocity += (targetScrollVelocity - currentScrollVelocity) * 0.1;
      targetScrollVelocity *= 0.92;

      if (progress < 1.0) {
        progress += 0.015;
      }

      if (material && material.uniforms) {
        material.uniforms.uTime.value = elapsedTime;
        material.uniforms.uMouse.value.set(currentMouse.x, currentMouse.y);
        material.uniforms.uScrollVelocity.value = currentScrollVelocity;
        material.uniforms.uProgress.value = Math.min(progress, 1.0);
      }

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleResize);
      renderer.dispose();
    };
  }, [imageSrc]);

  return (
    <div ref={containerRef} className="relative w-full h-screen overflow-hidden bg-neutral-950 flex items-center justify-center">
      {webglSupported ? (
        <canvas ref={canvasRef} className="absolute inset-0 w-full h-full object-cover z-0" />
      ) : (
        <img
          src={fallbackSrc || imageSrc}
          alt="Hero Food & Product Photography"
          className="absolute inset-0 w-full h-full object-cover z-0 opacity-80"
        />
      )}

      {/* Dark Subtle Vignette Overlay for Readability */}
      <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-neutral-950/40 to-neutral-950/30 z-10 pointer-events-none" />

      {/* Editorial Headline & Top Bar Metadata */}
      <div className="relative z-20 container max-w-[1400px] mx-auto px-6 md:px-12 flex flex-col justify-between h-full pt-32 pb-20 pointer-events-none">
        
        {/* Top Label */}
        <div className="flex items-center justify-between">
          <span className="text-[11px] font-mono uppercase tracking-[0.4em] text-neutral-300/90 border border-neutral-700/60 px-4 py-1.5 rounded-full backdrop-blur-md bg-neutral-950/40">
            {sublabel}
          </span>
          <span className="hidden md:block text-[11px] font-mono tracking-[0.3em] text-neutral-400">
            [ 25.2048° N, 55.2708° E ]
          </span>
        </div>

        {/* Center Editorial Typography */}
        <div className="max-w-4xl space-y-6">
          <h1 className="text-5xl sm:text-7xl md:text-8xl lg:text-[7.5rem] font-serif font-normal tracking-tight text-white leading-[0.92] text-balance">
            {headlineLine1}{" "}
            <span className="italic font-light text-amber-200/90 font-serif">
              {headlineLine2}
            </span>
          </h1>

          <p className="text-lg sm:text-xl font-light text-neutral-300/90 max-w-xl leading-relaxed tracking-wide">
            High-contrast culinary stills, commercial product imagery, and architectural food stories engineered for GCC brand authority.
          </p>
        </div>

        {/* Bottom Scroll Cue */}
        <div className="flex items-center justify-between border-t border-neutral-800/80 pt-6">
          <span className="text-xs font-mono tracking-widest text-neutral-400 uppercase">
            Scroll to explore collection
          </span>
          <span className="text-xs font-mono tracking-widest text-amber-400 uppercase">
            01 / 05 Index
          </span>
        </div>

      </div>
    </div>
  );
};
