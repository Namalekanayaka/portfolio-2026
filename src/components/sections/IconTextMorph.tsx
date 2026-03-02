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

const bioParagraphs = [
    "Hello! I'm Namal Ekanayake, a passionate software engineer and full stack web developer with hands-on experience building modern web applications using React.js, Node.js, and related technologies. I enjoy creating clean, responsive, and user-friendly interfaces while ensuring strong and reliable backend functionality.",
    "As a freelancer, I have worked on practical projects including portfolio websites, management systems, and interactive web applications, turning ideas into efficient and scalable digital solutions. I am especially interested in Artificial Intelligence and emerging technologies, and I continuously focus on improving my problem-solving abilities and development skills to grow as a well-rounded software engineer."
];

const AboutMorph = () => {
    const [phase, setPhase] = useState<'hidden' | 'icons' | 'text'>('hidden');
    const containerRef = useRef<HTMLDivElement>(null);

    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start end", "end start"]
    });

    const smoothScroll = useSpring(scrollYProgress, {
        stiffness: 150,
        damping: 35,
        restDelta: 0.001
    });

    const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;

    const headerScale = useTransform(smoothScroll, [0.45, 0.6], [1, isMobile ? 0.7 : 0.85]);
    const headerY = useTransform(smoothScroll, [0.45, 0.6], [0, isMobile ? -160 : -220]);

    // Header comes in early, fades out as section leaves
    const headerOpacityValue = useTransform(smoothScroll, [0.35, 0.45, 0.7, 0.85], [0, 1, 1, 0]);

    // Bio fades in as header moves up
    const bioOpacity = useTransform(smoothScroll, [0.55, 0.65, 0.7, 0.85], [0, 1, 1, 0]);
    const bioY = useTransform(smoothScroll, [0.55, 0.65], [40, 0]);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting && phase === 'hidden') {
                    setPhase('icons');
                    const timer = setTimeout(() => {
                        setPhase('text');
                    }, 800);
                    return () => clearTimeout(timer);
                }
            },
            { threshold: 0.3 }
        );

        if (containerRef.current) observer.observe(containerRef.current);
        return () => observer.disconnect();
    }, [phase]);

    return (
        <section
            ref={containerRef}
            id="about"
            className="relative h-[120vh] w-full bg-black overflow-hidden gpu"
        >
            <div className="absolute inset-0 noise opacity-[0.03] pointer-events-none" />

            {/* Sticky Container */}
            <div className="sticky top-0 h-[100vh] w-full flex flex-col items-center justify-center overflow-hidden">

                {/* Background Glow */}
                <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-white/5 to-transparent rounded-full" />
                </div>

                {/* Animated "ABOUT ME" Header */}
                <motion.div
                    style={{ scale: headerScale, y: headerY, opacity: headerOpacityValue }}
                    className="absolute z-20 flex flex-col items-center justify-center w-full"
                >
                    <div className="flex flex-nowrap items-center justify-center gap-1.5 md:gap-4 max-w-[95vw]">
                        {aboutData.map((item, index) => {
                            if (item.isSpace) return <div key={index} className="w-2 md:w-8" />;
                            const IconComp = item.icon || Sparkles;
                            return (
                                <div key={index} className="relative flex items-center justify-center w-9 h-9 md:w-20 md:h-20 lg:w-28 lg:h-28">
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
                                                <IconComp className="w-5 h-5 md:w-10 md:h-10 text-white/30" />
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
                                                <span className="text-[3rem] sm:text-7xl lg:text-[9rem] font-black text-white tracking-tighter uppercase select-none font-display leading-none">
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

                {/* Bio Paragraphs */}
                <motion.div
                    style={{ opacity: bioOpacity, y: bioY }}
                    className="absolute z-30 flex flex-col items-center justify-center top-1/2 mt-[20px] md:mt-[40px] px-6 w-full max-w-4xl mx-auto"
                >
                    <div className="flex flex-col gap-6 md:gap-8 text-center px-4 md:px-8">
                        {bioParagraphs.map((text, idx) => (
                            <p
                                key={idx}
                                className="text-[14px] md:text-[15px] lg:text-[17px] font-medium text-[#c0c0c0] leading-[1.8] tracking-tight text-pretty"
                            >
                                {text}
                            </p>
                        ))}
                    </div>
                </motion.div>
            </div>
        </section>
    );
};

export default AboutMorph;
