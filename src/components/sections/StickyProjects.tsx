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
        image: "https://images.unsplash.com/photo-1639322537228-f710d846310a?q=80\u0026w=800",
    },
    {
        title: "EcoPulse OS",
        category: "Systems Engineering",
        description: "A lightweight, hyper-efficient operating system designed for planetary-scale environmental monitoring.",
        color: "from-emerald-500 to-teal-700",
        image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80\u0026w=800",
    },
    {
        title: "Astra Core",
        category: "Blockchain Infrastructure",
        description: "Next-generation consensus engine optimized for high-throughput institutional financial workflows.",
        color: "from-purple-600 to-pink-700",
        image: "https://images.unsplash.com/photo-1639762681485-074b7f938ba0?q=80\u0026w=800",
    }
];

const ProjectCard = ({ project, index, scrollYProgress }: any) => {
    const scale = useTransform(scrollYProgress, [index * 0.25, 1], [1, 0.9]);

    return (
        <div className="sticky top-0 h-screen w-full flex items-center justify-center">
            <motion.div
                style={{ scale }}
                className={`relative w-full h-[90vh] rounded-[40px] overflow-hidden shadow-2xl border border-white/5 flex flex-col bg-[#111113] group gpu`}
            >
                <div className="absolute inset-0">
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0b] via-transparent to-transparent z-10" />
                    <img
                        src={project.image}
                        alt={project.title}
                        loading="lazy"
                        className="w-full h-full object-cover opacity-40 group-hover:opacity-60 transition-opacity duration-500"
                    />
                </div>

                <div className="relative z-20 flex-1 flex flex-col justify-end p-8 md:p-16">
                    <div className="max-w-4xl">
                        <div className="flex items-center gap-4 mb-4">
                            <span className="w-8 h-px bg-white/20" />
                            <span className="text-xs font-bold uppercase tracking-[0.4em] text-white/50">
                                {project.category}
                            </span>
                        </div>

                        <h3 className="text-5xl md:text-8xl font-black text-white mb-6 leading-none tracking-tighter uppercase">
                            {project.title.split(' ')[0]}<br />
                            <span className="text-outline-white text-transparent">{project.title.split(' ')[1]}</span>
                        </h3>

                        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                            <p className="text-lg md:text-xl text-white/40 font-medium max-w-lg leading-snug tracking-tight">
                                {project.description}
                            </p>

                            <div className="flex items-center gap-4">
                                <button className="flex items-center gap-3 bg-white text-black px-8 py-4 rounded-full font-black text-xs uppercase tracking-widest hover:bg-neutral-200 transition-colors">
                                    Case Study <ArrowUpRight className="w-4 h-4" />
                                </button>
                                <button className="bg-white/5 backdrop-blur-md p-4 rounded-full hover:bg-white/10 transition-colors border border-white/10">
                                    <Github className="w-5 h-5 text-white" />
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </motion.div>

            <style jsx>{`
        .text-outline-white {
          -webkit-text-stroke: 1px rgba(255, 255, 255, 0.2);
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
        <section id="projects" ref={containerRef} className="relative w-full px-4 md:px-0">
            <div className="h-[50vh] flex flex-col items-center justify-center text-center">
                <h2 className="text-[12vw] font-black text-white/10 uppercase leading-none tracking-tighter select-none">Work</h2>
            </div>

            <div className="relative">
                {projects.map((project, index) => (
                    <ProjectCard
                        key={index}
                        project={project}
                        index={index}
                        scrollYProgress={scrollYProgress}
                    />
                ))}
            </div>
            <div className="h-[10vh]" />
        </section>
    );
};

export default StickyProjects;
