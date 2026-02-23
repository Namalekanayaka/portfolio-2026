'use client';

import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowUpRight, Github } from 'lucide-react';

const projects = [
    {
        title: "Quantum Nexus",
        category: "AI Architecture",
        description: "Architecting the future of distributed neural networks with zero-latency communication protocols.",
        color: "from-blue-600 to-indigo-700",
        image: "https://images.unsplash.com/photo-1639322537228-f710d846310a?q=80\u0026w=1000",
    },
    {
        title: "EcoPulse OS",
        category: "Systems Engineering",
        description: "A lightweight, hyper-efficient operating system designed for planetary-scale environmental monitoring.",
        color: "from-emerald-500 to-teal-700",
        image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80\u0026w=1000",
    },
    {
        title: "Astra Core",
        category: "Blockchain Infrastructure",
        description: "Next-generation consensus engine optimized for high-throughput institutional financial workflows.",
        color: "from-purple-600 to-pink-700",
        image: "https://images.unsplash.com/photo-1639762681485-074b7f938ba0?q=80\u0026w=1000",
    }
];

const ProjectCard = ({ project, index, scrollYProgress }: any) => {
    // Logic to scale down previous cards as you scroll
    const scale = useTransform(scrollYProgress, [index * 0.25, 1], [1, 0.9]);

    return (
        <div className="sticky top-0 h-screen w-full flex items-center justify-center">
            <motion.div
                style={{ scale }}
                className={`relative w-full h-[95vh] rounded-[40px] overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.5)] border border-white/5 flex flex-col bg-[#111113] group`}
            >
                {/* Project Image/Background */}
                <div className="absolute inset-0">
                    <div className={`absolute inset-0 bg-gradient-to-t from-[#0a0a0b] via-[#0a0a0b]/40 to-transparent z-10`} />
                    <motion.img
                        src={project.image}
                        alt={project.title}
                        className="w-full h-full object-cover opacity-50 group-hover:opacity-70 transition-opacity duration-700"
                    />
                </div>

                {/* Content Container */}
                <div className="relative z-20 flex-1 flex flex-col justify-end p-8 md:p-20">
                    <div className="max-w-4xl">
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.2 }}
                            className="flex items-center gap-4 mb-6"
                        >
                            <span className="w-12 h-px bg-white/20" />
                            <span className="text-sm font-bold uppercase tracking-[0.4em] text-white/60">
                                {project.category}
                            </span>
                        </motion.div>

                        <h3 className="text-5xl md:text-[8rem] font-black text-white mb-8 leading-[0.8] tracking-tighter uppercase">
                            {project.title.split(' ')[0]}<br />
                            <span className="text-outline-white text-transparent">{project.title.split(' ')[1]}</span>
                        </h3>

                        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
                            <p className="text-xl md:text-2xl text-white/50 font-medium max-w-xl leading-snug tracking-tight">
                                {project.description}
                            </p>

                            <div className="flex items-center gap-4">
                                <button className="flex items-center gap-3 bg-white text-black px-10 py-5 rounded-full font-black text-sm uppercase tracking-widest hover:scale-105 transition-transform active:scale-95">
                                    Case Study <ArrowUpRight className="w-5 h-5" />
                                </button>
                                <button className="bg-white/5 backdrop-blur-xl p-5 rounded-full hover:bg-white/10 transition-colors border border-white/10 group/git">
                                    <Github className="w-6 h-6 text-white group-hover:rotate-12 transition-transform" />
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Number Overlay */}
                <div className="absolute top-10 right-10 z-0 select-none pointer-events-none">
                    <span className="text-[20rem] font-black text-white/[0.02] leading-none">0{index + 1}</span>
                </div>
            </motion.div>

            <style jsx>{`
        .text-outline-white {
          -webkit-text-stroke: 1px rgba(255, 255, 255, 0.3);
        }
      `}</style>
        </div>
    );
};

const StickyProjects = () => {
    const containerRef = useRef(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end end"]
    });

    return (
        <section id="projects" ref={containerRef} className="relative w-full">
            {/* Introduction Wrapper */}
            <div className="h-screen flex flex-col items-center justify-center text-center p-6">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    className="space-y-4"
                >
                    <h2 className="text-[10vw] font-black text-white/5 uppercase leading-none tracking-tighter">Selected</h2>
                    <h2 className="text-[10vw] font-black text-white uppercase leading-none tracking-tighter mt-[-4vw]">Archive</h2>
                    <p className="text-white/40 font-bold uppercase tracking-[0.3em] text-sm mt-8">Engineering Excellence // 2024-2026</p>
                </motion.div>
            </div>

            {/* Stacking Cards Container */}
            <div className="relative px-6">
                {projects.map((project, index) => (
                    <ProjectCard
                        key={index}
                        project={project}
                        index={index}
                        scrollYProgress={scrollYProgress}
                    />
                ))}
            </div>

            {/* Outro Spacer */}
            <div className="h-[20vh]" />
        </section>
    );
};

export default StickyProjects;
