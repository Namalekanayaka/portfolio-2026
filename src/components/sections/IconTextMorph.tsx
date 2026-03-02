'use client';

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useScroll, useTransform, useSpring } from 'framer-motion';
import { Wifi, Lightbulb, Notebook, Code, Rocket, Cpu, User, Fingerprint, Sparkles } from 'lucide-react';

function CircleIcon({ className }: { className?: string }) {
    return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className={className}>
            <circle cx="12" cy="12" r="10" />
        </svg>
    );
}

const aboutData = [
    { icon: Fingerprint, label: 'A', delay: 0 },
    { icon: Cpu, label: 'B', delay: 0.1 },
    { icon: CircleIcon, label: 'O', delay: 0.2 },
    { icon: Wifi, label: 'U', delay: 0.3 },
    { icon: Rocket, label: 'T', delay: 0.4 },
    { isSpace: true },
    { icon: User, label: 'M', delay: 0.6 },
    { icon: Lightbulb, label: 'E', delay: 0.7 },
];

const bioLines = [
    "I'm a full-stack developer who transforms complex ideas into elegant digital solutions.",
    "Passionate about creating immersive interfaces that feel alive and responsive.",
    "Driven by precision, performance, and the pursuit of visual excellence.",
    "Let's craft the future of the web, one pixel at a time."
];

const BioLine = ({ line, index, progress }: { line: string, index: number, progress: any }) => {
    // Ranges centered around 0.5 (the middle of the viewport journey for 100vh)
    const step = 0.08;
    const start = 0.45 + (index * step);
    const end = start + step;

    const opacity = useTransform(progress, [start, start + 0.02, end - 0.02, end], [0, 1, 1, 0]);
    const scale = useTransform(progress, [start, start + 0.02], [0.95, 1]);

    return (
        <motion.div
            style={{
                opacity,
                scale
            }}
            className="absolute inset-0 flex items-center justify-center text-center px-4 md:px-20 pointer-events-none"
        >
            <p className="text-2xl md:text-7xl font-black text-white leading-tight tracking-tighter max-w-6xl drop-shadow-2xl font-display uppercase">
                {line}
            </p>
        </motion.div>
    );
};

const AboutMorph = () => {
    const [phase, setPhase] = useState<'hidden' | 'icons' | 'text'>('hidden');
    const containerRef = useRef<HTMLDivElement>(null);
    const stickyRef = useRef<HTMLDivElement>(null);

    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start end", "end start"]
    });

    const smoothScroll = useSpring(scrollYProgress, {
        stiffness: 150, // Smoother, more natural speed
        damping: 35,
        restDelta: 0.001
    });

    // Balanced ranges for 100vh viewport journey
    // Adjusting Y-offset for mobile to be less aggressive
    const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;
    const headerScale = useTransform(smoothScroll, [0.35, 0.45], [1, 0.5]);
    const headerY = useTransform(smoothScroll, [0.35, 0.45], [isMobile ? -60 : -150, isMobile ? -140 : -300]);
    const headerOpacityValue = useTransform(smoothScroll, [0.3, 0.35, 0.45, 0.5], [0, 1, 1, 0]);
    const sectionExitOpacity = useTransform(smoothScroll, [0.8, 1.0], [1, 0]);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting && phase === 'hidden') {
                    setPhase('icons');
                    const timer = setTimeout(() => {
                        setPhase('text');
                    }, 800); // Even faster morph to bio
                    return () => clearTimeout(timer);
                }
            },
            { threshold: 0.1 }
        );

        if (containerRef.current) observer.observe(containerRef.current);
        return () => observer.disconnect();
    }, [phase]);

    return (
        <section
            ref={containerRef}
            id="about"
            className="relative h-[100vh] w-full bg-black overflow-hidden gpu"
        >
            <div className="absolute inset-0 noise opacity-[0.03] pointer-events-none" />

            {/* Content Container - No sticky needed for single screen journey */}
            <motion.div
                style={{ opacity: sectionExitOpacity }}
                className="relative h-full w-full flex items-center justify-center"
            >
                {/* Background Glow */}
                <div className="absolute inset-0 overflow-hidden pointer-events-none">
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-white/5 to-transparent rounded-full" />
                </div>

                {/* Animated "ABOUT ME" Header */}
                <motion.div
                    style={{ scale: headerScale, y: headerY, opacity: headerOpacityValue }}
                    className="absolute z-20 flex flex-col items-center"
                >
                    <div className="flex flex-nowrap items-center justify-center gap-1.5 md:gap-8 max-w-[95vw]">
                        {aboutData.map((item, index) => {
                            if (item.isSpace) return <div key={index} className="w-2 md:w-16" />;
                            const IconComp = item.icon || Sparkles;
                            return (
                                <div key={index} className="relative flex items-center justify-center w-8 h-8 md:w-24 md:h-24">
                                    <AnimatePresence mode="wait">
                                        {phase === 'icons' && (
                                            <motion.div
                                                key="icon"
                                                initial={{ scale: 0.8, opacity: 0 }}
                                                animate={{ scale: 1, opacity: 1 }}
                                                exit={{ scale: 1.2, opacity: 0 }}
                                                transition={{ duration: 0.5, delay: item.delay }}
                                                className="absolute"
                                            >
                                                <IconComp className="w-4 h-4 md:w-12 md:h-12 text-white/30" />
                                            </motion.div>
                                        )}
                                        {phase === 'text' && (
                                            <motion.div
                                                key="text"
                                                initial={{ scale: 0.8, opacity: 0 }}
                                                animate={{ scale: 1, opacity: 1 }}
                                                transition={{ duration: 0.6, delay: item.delay }}
                                                className="absolute"
                                            >
                                                <span className="text-3xl md:text-[7rem] font-black text-white tracking-tighter uppercase select-none font-display">
                                                    {item.label}
                                                </span>
                                            </motion.div>
                                        )}
                                    </AnimatePresence>
                                </div>
                            );
                        })}
                    </div>
                </motion.div>

                {/* Bio Scroll Section */}
                <div className="absolute inset-0 flex items-center justify-center z-30">
                    {bioLines.map((line, index) => (
                        <BioLine
                            key={index}
                            line={line}
                            index={index}
                            progress={smoothScroll}
                        />
                    ))}
                </div>
            </motion.div>
        </section>
    );
};

export default AboutMorph;

