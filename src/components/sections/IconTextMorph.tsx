'use client';

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useInView } from 'framer-motion';
import { Wifi, Lightbulb, Notebook, Code, Rocket, Cpu, User, Fingerprint, Sparkles } from 'lucide-react';

const aboutData = [
    { icon: Fingerprint, label: 'A', delay: 0 },
    { icon: Cpu, label: 'B', delay: 0.05 },
    { icon: CircleIcon, label: 'O', delay: 0.1 },
    { icon: Wifi, label: 'U', delay: 0.15 },
    { icon: Rocket, label: 'T', delay: 0.2 },
    { isSpace: true },
    { icon: User, label: 'M', delay: 0.3 },
    { icon: Lightbulb, label: 'E', delay: 0.35 },
];

function CircleIcon({ className }: { className?: string }) {
    return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className={className}>
            <circle cx="12" cy="12" r="10" />
        </svg>
    );
}

const AboutMorph = () => {
    const [isText, setIsText] = useState(false);
    const containerRef = useRef(null);
    const isInView = useInView(containerRef, { amount: 0.4, margin: '0px 0px -100px 0px' });
    const [hasTriggered, setHasTriggered] = useState(false);

    useEffect(() => {
        if (isInView && !hasTriggered) {
            setHasTriggered(true);
            const timer = setTimeout(() => {
                setIsText(true);
            }, 1000);
            return () => clearTimeout(timer);
        }
    }, [isInView, hasTriggered]);

    return (
        <section
            ref={containerRef}
            id="about"
            className="relative min-h-[100vh] w-full bg-black flex flex-col items-center justify-center overflow-hidden py-32"
        >
            <div className="absolute inset-0 noise opacity-[0.04] pointer-events-none" />

            {/* Dynamic Background Glow */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <motion.div
                    animate={{
                        scale: [1, 1.2, 1],
                        opacity: [0.08, 0.12, 0.08]
                    }}
                    transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
                    className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[1000px] bg-white/10 rounded-full blur-[160px]"
                />
            </div>

            <div className="container mx-auto px-6 relative z-10">
                <div className="flex flex-col items-center gap-20">

                    <div className="flex flex-wrap items-center justify-center gap-x-2 md:gap-x-4 gap-y-8">
                        {aboutData.map((item, index) => {
                            if (item.isSpace) {
                                return <div key={index} className="w-8 md:w-16 h-20 md:h-32" />;
                            }

                            const IconComp = item.icon || Sparkles;

                            return (
                                <div key={index} className="relative flex items-center justify-center w-16 h-20 md:w-28 md:h-32">
                                    <AnimatePresence mode="wait">
                                        {!isText ? (
                                            <motion.div
                                                key="icon"
                                                initial={{ scale: 0.5, opacity: 0, y: 30, filter: 'blur(10px)' }}
                                                animate={{ scale: 1, opacity: 1, y: 0, filter: 'blur(0px)' }}
                                                exit={{ scale: 1.4, opacity: 0, filter: 'blur(20px)', y: -40 }}
                                                transition={{
                                                    duration: 0.8,
                                                    delay: item.delay,
                                                    ease: [0.22, 1, 0.36, 1]
                                                }}
                                                className="absolute"
                                            >
                                                <IconComp className="w-8 h-8 md:w-14 md:h-14 text-white/40 stroke-[1.2]" />
                                            </motion.div>
                                        ) : (
                                            <motion.div
                                                key="text"
                                                initial={{ scale: 0.4, opacity: 0, y: 60, filter: 'blur(30px)' }}
                                                animate={{ scale: 1, opacity: 1, y: 0, filter: 'blur(0px)' }}
                                                transition={{
                                                    duration: 1.4,
                                                    delay: (item.delay || 0) * 1.5,
                                                    ease: [0.16, 1, 0.3, 1]
                                                }}
                                                className="absolute"
                                            >
                                                <span className="text-6xl md:text-[8rem] lg:text-[10rem] font-black text-white tracking-[-0.05em] leading-none select-none uppercase">
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
                        initial={{ opacity: 0, y: 30 }}
                        animate={isText ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                        transition={{ delay: 1, duration: 1.5, ease: "easeOut" }}
                        className="text-center max-w-3xl"
                    >
                        <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full border border-white/10 bg-white/5 mb-8">
                            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                            <span className="text-[10px] uppercase tracking-[0.4em] font-bold text-white/50">Human-Centric Engineering</span>
                        </div>

                        <p className="text-white/60 text-xl md:text-3xl font-medium leading-tight tracking-tight px-4">
                            I am a <span className="text-white underline decoration-white/20 underline-offset-8">Software Engineer</span> fascinated by the intersection of
                            <span className="font-serif-italic text-white px-3">art</span> and
                            <span className="text-white">logic</span>.
                        </p>
                    </motion.div>

                </div>
            </div>

            {/* Decorative side text */}
            <div className="absolute right-10 top-1/2 -rotate-90 origin-right pointer-events-none hidden lg:block">
                <span className="text-[10px] uppercase tracking-[1em] text-white/10 font-bold whitespace-nowrap">Identity Reveal // 2026</span>
            </div>
        </section>
    );
};

export default AboutMorph;
