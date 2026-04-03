'use client';

import { useRef, useMemo, Suspense } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { AdaptiveDpr, Stars } from '@react-three/drei';
import * as THREE from 'three';

/* ───────── Star Particle Field ───────── */
function StarField() {
  const count = 3000;
  const positions = useMemo(() => {
    const pos = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 100;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 100;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 100;
    }
    return pos;
  }, []);

  const sizes = useMemo(() => {
    const s = new Float32Array(count);
    for (let i = 0; i < count; i++) {
      s[i] = Math.random() * 0.5 + 0.1;
    }
    return s;
  }, []);

  return (
    <points>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
        />
        <bufferAttribute
          attach="attributes-size"
          args={[sizes, 1]}
        />
      </bufferGeometry>
      <pointsMaterial
        color="#ffffff"
        size={0.08}
        sizeAttenuation
        transparent
        opacity={0.8}
        depthWrite={false}
      />
    </points>
  );
}

/* ───────── Planet Ring ───────── */
function PlanetRing({
  innerRadius,
  outerRadius,
  color,
  opacity,
  rotationX,
}: {
  innerRadius: number;
  outerRadius: number;
  color: string;
  opacity: number;
  rotationX: number;
}) {
  return (
    <mesh rotation={[rotationX, 0, 0.1]}>
      <ringGeometry args={[innerRadius, outerRadius, 128]} />
      <meshBasicMaterial
        color={color}
        transparent
        opacity={opacity}
        side={THREE.DoubleSide}
        depthWrite={false}
      />
    </mesh>
  );
}

/* ───────── Gas Giant Planet ───────── */
function GasGiant() {
  const planetRef = useRef<THREE.Group>(null);
  const { viewport } = useThree();

  // Position the planet on the right margin, partially visible
  const scale = Math.min(viewport.width, viewport.height) * 0.45;
  const xPos = viewport.width * 0.35; // Moved slightly left
  const yPos = viewport.height * 0.1; // Moved slightly up

  useFrame((state) => {
    if (planetRef.current) {
      const scrollY = window.scrollY || 0;
      
      // Slow rotation + scroll-based turning
      planetRef.current.rotation.y = state.clock.elapsedTime * 0.0008 + scrollY * 0.001;
      planetRef.current.rotation.x = scrollY * 0.0002;
      
      // Subtle floating motion + parallax scrolling downward
      planetRef.current.position.y =
        yPos + Math.sin(state.clock.elapsedTime * 0.15) * 0.15 + (scrollY * 0.0015);
    }
  });

  // Create the gradient texture for the planet
  const planetTexture = useMemo(() => {
    const canvas = document.createElement('canvas');
    canvas.width = 512;
    canvas.height = 512;
    const ctx = canvas.getContext('2d')!;

    // Gas giant bands
    const gradient = ctx.createLinearGradient(0, 0, 0, 512);
    gradient.addColorStop(0, '#1a1535');
    gradient.addColorStop(0.15, '#2A1B4D');
    gradient.addColorStop(0.25, '#1B1F3B');
    gradient.addColorStop(0.35, '#2d2255');
    gradient.addColorStop(0.45, '#1a1535');
    gradient.addColorStop(0.5, '#3a2a66');
    gradient.addColorStop(0.6, '#1B1F3B');
    gradient.addColorStop(0.7, '#2A1B4D');
    gradient.addColorStop(0.8, '#1a1535');
    gradient.addColorStop(0.9, '#2d2255');
    gradient.addColorStop(1, '#1B1F3B');
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, 512, 512);

    // Subtle horizontal bands
    for (let i = 0; i < 20; i++) {
      const y = Math.random() * 512;
      const alpha = Math.random() * 0.15;
      ctx.fillStyle = `rgba(204, 255, 0, ${alpha})`;
      ctx.fillRect(0, y, 512, 2 + Math.random() * 4);
    }

    const texture = new THREE.CanvasTexture(canvas);
    texture.wrapS = THREE.RepeatWrapping;
    return texture;
  }, []);

  return (
    <group ref={planetRef} position={[xPos, yPos, -5]} scale={scale}>
      {/* Planet body */}
      <mesh>
        <sphereGeometry args={[1, 64, 64]} />
        <meshStandardMaterial
          map={planetTexture}
          roughness={0.7}
          metalness={0.1}
          emissive="#1a1535"
          emissiveIntensity={0.15}
        />
      </mesh>

      {/* Atmosphere glow */}
      <mesh scale={1.02}>
        <sphereGeometry args={[1, 64, 64]} />
        <meshBasicMaterial
          color="#2A1B4D"
          transparent
          opacity={0.15}
          side={THREE.BackSide}
        />
      </mesh>

      {/* Rings */}
      <PlanetRing
        innerRadius={1.4}
        outerRadius={2.2}
        color="#4a3a7a"
        opacity={0.35}
        rotationX={Math.PI * 0.42}
      />
      <PlanetRing
        innerRadius={1.5}
        outerRadius={1.9}
        color="#CCFF00"
        opacity={0.08}
        rotationX={Math.PI * 0.42}
      />
      <PlanetRing
        innerRadius={2.0}
        outerRadius={2.4}
        color="#3a2a66"
        opacity={0.2}
        rotationX={Math.PI * 0.42}
      />
    </group>
  );
}

/* ───────── Nebula Background ───────── */
function NebulaPlane() {
  const meshRef = useRef<THREE.Mesh>(null);

  const nebulaTexture = useMemo(() => {
    const canvas = document.createElement('canvas');
    canvas.width = 1024;
    canvas.height = 1024;
    const ctx = canvas.getContext('2d')!;

    // Deep space background
    ctx.fillStyle = '#0B0D17';
    ctx.fillRect(0, 0, 1024, 1024);

    // Nebula clouds
    const addCloud = (x: number, y: number, r: number, color: string, alpha: number) => {
      const grad = ctx.createRadialGradient(x, y, 0, x, y, r);
      grad.addColorStop(0, color.replace(')', `, ${alpha})`).replace('rgb', 'rgba'));
      grad.addColorStop(0.5, color.replace(')', `, ${alpha * 0.3})`).replace('rgb', 'rgba'));
      grad.addColorStop(1, 'rgba(0,0,0,0)');
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, 1024, 1024);
    };

    addCloud(300, 400, 400, 'rgb(42, 27, 77)', 0.4);     // purple nebula
    addCloud(700, 300, 350, 'rgb(27, 31, 59)', 0.3);     // blue nebula
    addCloud(500, 600, 300, 'rgb(42, 27, 77)', 0.2);     // purple accent
    addCloud(200, 200, 250, 'rgb(15, 20, 45)', 0.25);    // deep blue

    return new THREE.CanvasTexture(canvas);
  }, []);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.z = state.clock.elapsedTime * 0.005;
    }
  });

  return (
    <mesh ref={meshRef} position={[0, 0, -50]}>
      <planeGeometry args={[120, 120]} />
      <meshBasicMaterial
        map={nebulaTexture}
        transparent
        opacity={0.8}
        depthWrite={false}
      />
    </mesh>
  );
}

/* ───────── Scene Lighting ───────── */
function SceneLighting() {
  return (
    <>
      <ambientLight intensity={0.15} color="#ffffff" />
      <directionalLight
        position={[-10, 5, 5]}
        intensity={0.6}
        color="#c8b0ff"
      />
      <pointLight
        position={[10, 10, -5]}
        intensity={0.4}
        color="#CCFF00"
        distance={30}
      />
      <pointLight
        position={[-5, -5, 5]}
        intensity={0.2}
        color="#2A1B4D"
        distance={20}
      />
    </>
  );
}

/* ───────── Main Export ───────── */
export default function SpaceScene() {
  return (
    <div className="canvas-container">
      <Canvas
        camera={{ position: [0, 0, 10], fov: 60 }}
        dpr={[1, 1.5]}
        gl={{
          antialias: true,
          alpha: true,
          powerPreference: 'high-performance',
        }}
      >
        <Suspense fallback={null}>
          <AdaptiveDpr pixelated />
          <SceneLighting />
          <NebulaPlane />
          <StarField />
          <Stars
            radius={50}
            depth={80}
            count={2000}
            factor={3}
            saturation={0}
            fade
            speed={0.5}
          />
          <GasGiant />
        </Suspense>
      </Canvas>
    </div>
  );
}
