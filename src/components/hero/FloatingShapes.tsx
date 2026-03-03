'use client';

import { useRef, useMemo, Suspense, useState, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, MeshDistortMaterial, Sphere, MeshWobbleMaterial, TorusKnot, Environment, Preload } from '@react-three/drei';
import * as THREE from 'three';

const OrganicShape = ({ position, color, type, speed = 1, rotationSpeed = 1, distort = 0.4, factor = 0.4 }: any) => {
    const meshRef = useRef<THREE.Mesh>(null);

    useFrame((state) => {
        if (!meshRef.current) return;
        const t = state.clock.getElapsedTime();
        // Add scroll effect on individual shapes too
        const scrollOffset = window.scrollY * 0.001 * speed;

        meshRef.current.rotation.x = (Math.cos(t / 4) / 4 + scrollOffset) * rotationSpeed;
        meshRef.current.rotation.y = (Math.sin(t / 4) / 4 + scrollOffset) * rotationSpeed;
        meshRef.current.position.y = position[1] + Math.sin(t * 0.5 * speed) * 0.3 + (window.scrollY * 0.002 * factor);
    });

    return (
        <group position={[position[0], 0, position[2]]}>
            <group ref={meshRef}>
                {type === 'blob' && (
                    <Sphere args={[1, 32, 32]}>
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
                    <Sphere args={[1, 32, 32]}>
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
                    <TorusKnot args={[0.7, 0.3, 64, 16]}>
                        <meshStandardMaterial
                            color={color}
                            metalness={1}
                            roughness={0}
                            envMapIntensity={2}
                        />
                    </TorusKnot>
                )}
                {type === 'soft' && (
                    <Sphere args={[1, 32, 32]}>
                        <meshStandardMaterial
                            color={color}
                            roughness={0.8}
                            metalness={0.1}
                        />
                    </Sphere>
                )}
            </group>
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

    const groupRef = useRef<THREE.Group>(null);
    const [scrollY, setScrollY] = useState(0);

    // Initialize state
    useEffect(() => {
        const handleScroll = () => {
            setScrollY(window.scrollY);
        };
        window.addEventListener('scroll', handleScroll, { passive: true });
        handleScroll(); // init
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    useFrame(() => {
        if (groupRef.current) {
            // Smoothly rotate the entire group based on scroll position
            const targetRotY = scrollY * 0.001;
            const targetRotX = scrollY * 0.0005;
            groupRef.current.rotation.y = THREE.MathUtils.lerp(groupRef.current.rotation.y, targetRotY, 0.05);
            groupRef.current.rotation.x = THREE.MathUtils.lerp(groupRef.current.rotation.x, targetRotX, 0.05);

            // Move shapes slightly up when scrolling down
            const targetPosY = scrollY * 0.002;
            groupRef.current.position.y = THREE.MathUtils.lerp(groupRef.current.position.y, targetPosY, 0.05);
        }
    });

    return (
        <Suspense fallback={null}>
            <ambientLight intensity={0.5} />
            <pointLight position={[10, 10, 10]} intensity={2} />
            <spotLight position={[-10, 10, 10]} angle={0.15} penumbra={1} intensity={2} />
            <directionalLight position={[0, -5, 5]} intensity={0.5} />

            <group ref={groupRef}>
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
            </group>
            <Environment preset="studio" />
        </Suspense>
    );
};

export default function FloatingShapes() {
    const [opacity, setOpacity] = useState(0.8);

    useEffect(() => {
        const handleScroll = () => {
            const y = window.scrollY;
            const vh = window.innerHeight;

            let newOpacity = 0.8;

            // The Bio text is visible approximately between 1.2vh and 1.8vh.
            // We start fading out the shapes at 0.8vh and make them fully transparent by 1.15vh.
            if (y > vh * 0.8) {
                if (y < vh * 1.15) {
                    const progress = (y - vh * 0.8) / (vh * 0.35);
                    newOpacity = 0.8 * (1 - progress);
                } else if (y >= vh * 1.15 && y <= vh * 1.95) {
                    newOpacity = 0.0; // Fully transparent while bio is on screen
                } else if (y > vh * 1.95 && y < vh * 2.4) {
                    const progress = (y - vh * 1.95) / (vh * 0.45);
                    newOpacity = 0.8 * progress;
                }
            }

            setOpacity(Math.max(0, Math.min(0.8, newOpacity)));
        };

        window.addEventListener('scroll', handleScroll, { passive: true });
        window.addEventListener('resize', handleScroll, { passive: true });
        handleScroll();

        return () => {
            window.removeEventListener('scroll', handleScroll);
            window.removeEventListener('resize', handleScroll);
        };
    }, []);

    return (
        <div
            className="w-full h-full absolute inset-0 z-0 pointer-events-none overflow-hidden"
            style={{ width: '100vw', height: '100dvh', opacity: opacity, transition: 'opacity 0.2s ease-out' }}
        >
            <Canvas
                camera={{ position: [0, 0, 12], fov: 45 }}
                gl={{
                    antialias: true,
                    alpha: true,
                    powerPreference: "high-performance"
                }}
                dpr={[1, 1.5]} // Capped DPR at 1.5 for performance
                performance={{ min: 0.5 }} // Allows performance scaling
            >
                <Shapes />
                <Preload all />
            </Canvas>
        </div >
    );
}
