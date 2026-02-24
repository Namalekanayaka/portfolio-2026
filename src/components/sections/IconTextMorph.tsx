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
    // Ultra-tight ranges for 130vh section
    const start = 0.2 + (index * 0.2);
    const end = start + 0.22;

    const opacity = useTransform(progress, [start, start + 0.05, end - 0.05, end], [0, 1, 1, 0]);
    const yTranslate = useTransform(progress, [start, end], [30, -30]);
    const scale = useTransform(progress, [start, start + 0.05], [0.9, 1]);

    return (
        <motion.div
            key={index}
            style={{
                opacity,
                y: yTranslate,
                scale
            }}
            className="absolute inset-0 flex items-center justify-center text-center px-6 pointer-events-none"
        >
            <p className="text-2xl md:text-5xl font-bold text-white leading-tight tracking-tighter max-w-4xl italic drop-shadow-2xl">
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
        offset: ["start start", "end end"]
    });

    const smoothScroll = useSpring(scrollYProgress, {
        stiffness: 300, // Ultra snappy
        damping: 60,
        restDelta: 0.001
    });

    // Extremely compact ranges for 130vh
    const headerScale = useTransform(smoothScroll, [0.0, 0.2], [1, 0.45]);
    const headerY = useTransform(smoothScroll, [0.0, 0.2], [0, -200]);
    const headerOpacityValue = useTransform(smoothScroll, [0.0, 0.05, 0.9, 1.0], [0, 1, 1, 0]);
    const sectionExitOpacity = useTransform(smoothScroll, [0.97, 1.0], [1, 0]);

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
            className="relative h-[130vh] w-full bg-black flex flex-col items-center overflow-visible gpu"
        >
            <div className="absolute inset-0 noise opacity-[0.03] pointer-events-none" />

            {/* Sticky Wrapper */}
            <motion.div
                style={{ opacity: sectionExitOpacity }}
                className="sticky top-0 h-screen w-full flex flex-col items-center justify-center overflow-hidden"
            >
                <div className="absolute inset-0 overflow-hidden pointer-events-none">
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-white/5 rounded-full blur-[100px]" />
                </div>

                <div className="relative w-full h-full flex items-center justify-center">
                    {/* Animated "ABOUT ME" Header - Absolutely centered */}
                    <motion.div
                        style={{ scale: headerScale, y: headerY, opacity: headerOpacityValue }}
                        className="absolute flex flex-col items-center z-20"
                    >
                        <div className="flex flex-wrap items-center justify-center gap-4 md:gap-8 max-w-[90vw]">
                            {aboutData.map((item, index) => {
                                if (item.isSpace) return <div key={index} className="w-8 md:w-16" />;
                                const IconComp = item.icon || Sparkles;
                                return (
                                    <div key={index} className="relative flex items-center justify-center w-16 h-16 md:w-24 md:h-24">
                                        <AnimatePresence mode="wait">
                                            {phase === 'icons' && (
                                                <motion.div
                                                    key="icon"
                                                    initial={{ scale: 0.8, opacity: 0 }}
                                                    animate={{ scale: 1, opacity: 1 }}
                                                    exit={{ scale: 1.2, opacity: 0, filter: 'blur(10px)' }}
                                                    transition={{ duration: 0.5, delay: item.delay }}
                                                    className="absolute"
                                                >
                                                    <IconComp className="w-8 h-8 md:w-12 md:h-12 text-white/30" />
                                                </motion.div>
                                            )}
                                            {phase === 'text' && (
                                                <motion.div
                                                    key="text"
                                                    initial={{ scale: 0.8, opacity: 0, filter: 'blur(15px)' }}
                                                    animate={{ scale: 1, opacity: 1, filter: 'blur(0px)' }}
                                                    transition={{ duration: 0.6, delay: item.delay }}
                                                    className="absolute"
                                                >
                                                    <span className="text-5xl md:text-[7rem] font-black text-white tracking-tighter uppercase select-none">
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

                    {/* Bio Scroll Section - Also absolutely centered */}
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
                </div>
            </motion.div>
        </section>
    );
};

export default AboutMorph;

