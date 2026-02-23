'use client';

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
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

const AboutMorph = () => {
    const [phase, setPhase] = useState<'hidden' | 'icons' | 'text'>('hidden');
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting && phase === 'hidden') {
                    setPhase('icons');
                    // Step 2: Morph to text after showing icons
                    setTimeout(() => {
                        setPhase('text');
                    }, 2000); // 2 second window for icons to be seen
                }
            },
            { threshold: 0.3 }
        );

        if (containerRef.current) {
            observer.observe(containerRef.current);
        }

        return () => observer.disconnect();
    }, [phase]);

    return (
        <section
            ref={containerRef}
            id="about"
            className="relative min-h-[100vh] w-full bg-black flex flex-col items-center justify-center overflow-hidden py-32"
        >
            <div className="absolute inset-0 noise opacity-[0.05] pointer-events-none" />

            {/* Dynamic Background Glow */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <motion.div
                    animate={{
                        scale: [1, 1.1, 1],
                        opacity: [0.1, 0.15, 0.1]
                    }}
                    transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
                    className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[1000px] bg-white/5 rounded-full blur-[120px]"
                />
            </div>

            <div className="container mx-auto px-6 relative z-10">
                <div className="flex flex-col items-center gap-20">

                    <div className="flex flex-wrap items-center justify-center gap-x-4 md:gap-x-8 gap-y-12">
                        {aboutData.map((item, index) => {
                            if (item.isSpace) {
                                return <div key={index} className="w-12 md:w-24 h-20 md:h-32" />;
                            }

                            const IconComp = item.icon || Sparkles;

                            return (
                                <div key={index} className="relative flex items-center justify-center w-20 h-20 md:w-32 md:h-32">
                                    <AnimatePresence mode="wait">
                                        {phase === 'icons' && (
                                            <motion.div
                                                key="icon"
                                                initial={{ scale: 0, opacity: 0, y: 40 }}
                                                animate={{ scale: 1, opacity: 1, y: 0 }}
                                                exit={{ scale: 1.5, opacity: 0, filter: 'blur(15px)', y: -40 }}
                                                transition={{
                                                    duration: 0.8,
                                                    delay: item.delay,
                                                    ease: [0.22, 1, 0.36, 1]
                                                }}
                                                className="absolute"
                                            >
                                                <IconComp className="w-10 h-10 md:w-16 md:h-16 text-white/40 stroke-[1.5]" />
                                            </motion.div>
                                        )}

                                        {phase === 'text' && (
                                            <motion.div
                                                key="text"
                                                initial={{ scale: 0.5, opacity: 0, y: 60, filter: 'blur(30px)' }}
                                                animate={{ scale: 1, opacity: 1, y: 0, filter: 'blur(0px)' }}
                                                transition={{
                                                    duration: 1.2,
                                                    delay: (item.delay || 0),
                                                    ease: [0.16, 1, 0.3, 1]
                                                }}
                                                className="absolute"
                                            >
                                                <span className="text-7xl md:text-[10rem] font-black text-white tracking-tighter leading-none uppercase select-none">
                                                    {item.label}
                                                </span>
                                            </motion.div>
                                        )}
                                    </AnimatePresence>
                                </div>
                            );
                        })}
                    </div>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={phase === 'text' ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                        transition={{ delay: 1, duration: 1 }}
                        className="text-center max-w-2xl px-4"
                    >
                        <p className="text-white/60 text-lg md:text-2xl font-medium leading-relaxed">
                            Crafting digital experiences with <span className="text-white">precision</span> and <span className="text-white italic">passion</span>.
                        </p>
                    </motion.div>

                </div>
            </div>
        </section>
    );
};

export default AboutMorph;
