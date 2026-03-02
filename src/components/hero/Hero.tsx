'use client';

import { motion, useScroll, useTransform, useSpring, Variants } from 'framer-motion';
import { useRef } from 'react';
import { ArrowRight } from 'lucide-react';

export default function Hero() {
    const containerRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ['start start', 'end start'],
    });

    const y = useTransform(scrollYProgress, [0, 1], [0, 200]);
    const scale = useTransform(scrollYProgress, [0, 1], [1, 0.95]);
    const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

    const smoothY = useSpring(y, { stiffness: 100, damping: 30 });
    const smoothScale = useSpring(scale, { stiffness: 100, damping: 30 });

    const containerVariants: Variants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1,
                delayChildren: 0.3,
            },
        },
    };

    const itemVariants: Variants = {
        hidden: { opacity: 0, y: 30 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 1,
                ease: [0.22, 1, 0.36, 1],
            },
        },
    };

    return (
        <section
            ref={containerRef}
            className="relative min-h-screen w-full flex flex-col bg-[#f5f5f7] selection:bg-purple-200 overflow-hidden"
        >

            <div className="noise pointer-events-none" />

            <motion.div
                style={{ scale: smoothScale }}
                className="flex-1 container mx-auto px-6 md:px-12 flex flex-col justify-center relative z-10 pt-20"
            >
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-end">
                    {/* Main Headline */}
                    <motion.div
                        variants={containerVariants}
                        initial="hidden"
                        animate="visible"
                        className="lg:col-span-8"
                    >
                        <motion.div variants={itemVariants} className="mb-4">
                            <span className="inline-block px-3 py-1 bg-indigo-50 text-indigo-600 text-[10px] font-bold uppercase tracking-widest rounded-md">
                                Portfolio 2026
                            </span>
                        </motion.div>

                        <motion.h1
                            style={{ y: smoothY }}
                            className="text-[clamp(3.5rem,10vw,9.5rem)] font-bold tracking-tight leading-[0.9] text-black select-none overflow-visible"
                        >
                            <motion.span variants={itemVariants} className="block">Namal</motion.span>
                            <motion.span variants={itemVariants} className="block">
                                <span className="font-serif-italic font-medium pr-4">Ekanayake</span>
                            </motion.span>
                        </motion.h1>
                    </motion.div>

                    {/* Side Content */}
                    <motion.div
                        initial={{ opacity: 0, x: 50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 1, duration: 1.2, ease: "easeOut" }}
                        className="lg:col-span-4 flex flex-col items-start gap-8 pb-10"
                    >
                        <p className="text-lg md:text-xl text-black/70 leading-relaxed font-medium max-w-sm">
                            Namal Ekanayake is building high-performance software that redefines how users interact with the digital world.
                        </p>

                        <button className="group flex items-center gap-3 font-bold text-lg text-black hover:gap-5 transition-all">
                            Learn about my process
                            <ArrowRight className="w-5 h-5 group-hover:text-indigo-600 transition-colors" />
                        </button>
                    </motion.div>
                </div>
            </motion.div>

            {/* Footer hint */}
            <motion.div
                style={{ opacity }}
                className="absolute bottom-10 left-1/2 -translate-x-1/2 hidden md:flex flex-col items-center gap-3"
            >
                <span className="text-[10px] uppercase tracking-[0.3em] font-bold text-black/30">Scroll to Explore</span>
                <div className="w-px h-16 bg-gradient-to-b from-black/20 to-transparent" />
            </motion.div>
        </section>
    );
}
