'use client';

import { useRef, useMemo, Suspense } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, MeshDistortMaterial, Sphere, MeshWobbleMaterial, TorusKnot, Environment, Preload } from '@react-three/drei';
import * as THREE from 'three';

const OrganicShape = ({ position, color, type, speed = 1, rotationSpeed = 1, distort = 0.4, factor = 0.4 }: any) => {
    const meshRef = useRef<THREE.Mesh>(null);

    useFrame((state) => {
        if (!meshRef.current) return;
        const t = state.clock.getElapsedTime();
        meshRef.current.rotation.x = Math.cos(t / 4) / 4 * rotationSpeed;
        meshRef.current.rotation.y = Math.sin(t / 4) / 4 * rotationSpeed;
        meshRef.current.position.y = position[1] + Math.sin(t * 0.5 * speed) * 0.3;
    });

    return (
        <group position={position}>
            {type === 'blob' && (
                <Sphere ref={meshRef} args={[1, 48, 48]}>
                    <MeshDistortMaterial
                        color={color}
                        speed={speed * 2}
                        distort={distort}
                        radius={1}
                        metalness={0.6}
                        roughness={0.1}
                    />
                </Sphere>
            )}
            {type === 'wobble' && (
                <Sphere ref={meshRef} args={[1, 48, 48]}>
                    <MeshWobbleMaterial
                        color={color}
                        speed={speed}
                        factor={factor}
                        metalness={0.8}
                        roughness={0.2}
                    />
                </Sphere>
            )}
            {type === 'metallic' && (
                <TorusKnot ref={meshRef} args={[0.7, 0.3, 100, 24]}>
                    <meshStandardMaterial
                        color={color}
                        metalness={1}
                        roughness={0}
                        envMapIntensity={2}
                    />
                </TorusKnot>
            )}
            {type === 'soft' && (
                <Sphere ref={meshRef} args={[1, 48, 48]}>
                    <meshStandardMaterial
                        color={color}
                        roughness={0.8}
                        metalness={0.1}
                    />
                </Sphere>
            )}
        </group>
    );
};

const Shapes = () => {
    const shapes = useMemo(() => [
        { position: [-2, 3, 0], color: '#ff7eb3', type: 'blob', speed: 1.2, distort: 0.6 }, // Pink blob
        { position: [4, 2, -1], color: '#c0c0c0', type: 'metallic', speed: 0.8 }, // Silver knot
        { position: [2, -3, 1], color: '#4d4dff', type: 'wobble', speed: 1.5, factor: 0.8 }, // Blue liquid
        { position: [-5, -2, -2], color: '#ff9a9e', type: 'soft', speed: 1 }, // Soft peach
        { position: [6, -1, -3], color: '#ff007f', type: 'blob', speed: 0.7, distort: 0.4 }, // Deep pink blob
        { position: [-1, -4, -4], color: '#ffffff', type: 'metallic', speed: 0.9 }, // Chrome sphere
        { position: [0, 4, -4], color: '#ffcc00', type: 'wobble', speed: 0.6, factor: 0.4 }, // Yellow sphere
    ], []);

    return (
        <Suspense fallback={null}>
            <ambientLight intensity={0.5} />
            <pointLight position={[10, 10, 10]} intensity={2} />
            <spotLight position={[-10, 10, 10]} angle={0.15} penumbra={1} intensity={2} />
            <directionalLight position={[0, -5, 5]} intensity={0.5} />

            {shapes.map((shape, i) => (
                <Float
                    key={i}
                    speed={shape.speed * 2}
                    rotationIntensity={0.8}
                    floatIntensity={0.8}
                >
                    <OrganicShape {...shape} />
                </Float>
            ))}
            <Environment preset="studio" />
        </Suspense>
    );
};

export default function FloatingShapes() {
    return (
        <div className="w-full h-full absolute inset-0 z-0 pointer-events-none opacity-80 overflow-hidden">
            <Canvas
                camera={{ position: [0, 0, 12], fov: 45 }}
                gl={{
                    antialias: true,
                    alpha: true,
                    powerPreference: "high-performance"
                }}
                dpr={[1, 2]} // Balanced DPR for quality vs performance
            >
                <Shapes />
                <Preload all />
            </Canvas>
        </div>
    );
}
