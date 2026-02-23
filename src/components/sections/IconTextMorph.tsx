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
                    const timer = setTimeout(() => {
                        setPhase('text');
                    }, 1800);
                    return () => clearTimeout(timer);
                }
            },
            { threshold: 0.2 }
        );

        if (containerRef.current) observer.observe(containerRef.current);
        return () => observer.disconnect();
    }, [phase]);

    return (
        <section
            ref={containerRef}
            id="about"
            className="relative min-h-[100vh] w-full bg-black flex flex-col items-center justify-center overflow-hidden py-32 gpu"
        >
            <div className="absolute inset-0 noise opacity-[0.03] pointer-events-none" />

            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-white/5 rounded-full blur-[100px]" />
            </div>

            <div className="container mx-auto px-6 relative z-10">
                <div className="flex flex-col items-center gap-16">

                    <div className="flex flex-wrap items-center justify-center gap-4 md:gap-8">
                        {aboutData.map((item, index) => {
                            if (item.isSpace) return <div key={index} className="w-10 md:w-20" />;

                            const IconComp = item.icon || Sparkles;

                            return (
                                <div key={index} className="relative flex items-center justify-center w-20 h-20 md:w-32 md:h-32">
                                    <AnimatePresence mode="wait">
                                        {phase === 'icons' && (
                                            <motion.div
                                                key="icon"
                                                initial={{ scale: 0.8, opacity: 0 }}
                                                animate={{ scale: 1, opacity: 1 }}
                                                exit={{ scale: 1.2, opacity: 0, filter: 'blur(10px)' }}
                                                transition={{ duration: 0.6, delay: item.delay }}
                                                className="absolute"
                                            >
                                                <IconComp className="w-10 h-10 md:w-16 md:h-16 text-white/30" />
                                            </motion.div>
                                        )}

                                        {phase === 'text' && (
                                            <motion.div
                                                key="text"
                                                initial={{ scale: 0.8, opacity: 0, filter: 'blur(15px)' }}
                                                animate={{ scale: 1, opacity: 1, filter: 'blur(0px)' }}
                                                transition={{ duration: 0.8, delay: item.delay }}
                                                className="absolute"
                                            >
                                                <span className="text-7xl md:text-[9rem] font-black text-white tracking-tighter uppercase select-none">
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
                        initial={{ opacity: 0 }}
                        animate={phase === 'text' ? { opacity: 1 } : { opacity: 0 }}
                        className="text-center"
                    >
                        <p className="text-white/40 text-lg md:text-xl font-medium tracking-tight">
                            Building digital products with <span className="text-white">precision</span>.
                        </p>
                    </motion.div>

                </div>
            </div>
        </section>
    );
};

export default AboutMorph;
