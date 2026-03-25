'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

type ProjectImage = {
    src: string;
    aspect: string;
    topBorderColor?: string;
};

type Project = {
    tags: string[];
    titleBold: string;
    titleLight: string;
    text1: string;
    text2: string;
    images: ProjectImage[];
};

const projects: Project[] = [
    {
        tags: ["React (Vite)", "Tailwind", "Leaflet", "Socket.io", "Firebase"],
        titleBold: "AquaAlert:",
        titleLight: " Water Management Smart System",
        text1: "Developed a smart water management platform designed to connect citizens with water authorities through real-time reporting and intelligent analysis. The system improves response time, enhances transparency, and supports sustainable city management through data-driven decision-making.",
        text2: "Features a Mobile-First Citizen Portal for real-time issue mapping with geolocation, an Authority Dashboard with live issue tracking, and AI-Powered Analysis using Google Gemini AI for automated severity assessment and anomaly detection.",
        images: [
            { src: "/aquaalert/1.png", aspect: "aspect-[16/9]" },
            { src: "/aquaalert/2.png", aspect: "aspect-[4/3]" },
            { src: "/aquaalert/3.png", aspect: "aspect-[16/9]" },
            { src: "/aquaalert/4.png", aspect: "aspect-[16/9]" }
        ]
    },
    {
        tags: ["TypeScript", "React.js", "Tailwind CSS", "Node.js", "Figma", "Git"],
        titleBold: "Hansu Digital Agency:",
        titleLight: " Official Website",
        text1: "Designed and developed the official website for Hansu Digital Agency, a marketing agency focused on delivering web development, branding, and digital marketing solutions. The website emphasizes modern UI design, high performance, and seamless user experience across all devices.",
        text2: "I focused on creating a clean, professional layout that reflects the agency’s brand identity while ensuring responsiveness, speed optimization, and smooth navigation.",
        images: [
            { src: "/agency/11.png", aspect: "aspect-[16/9]" },
            { src: "/agency/22.png", aspect: "aspect-[16/9]" },
            { src: "/agency/33.png", aspect: "aspect-[16/9]" },
            { src: "/agency/44.png", aspect: "aspect-[16/9]" }
        ]
    }
];

export default function PortfolioProjects() {
    // Animation variants
    const titleVariants: any = {
        hidden: { opacity: 0, y: 50, filter: 'blur(10px)' },
        visible: {
            opacity: 1,
            y: 0,
            filter: 'blur(0px)',
            transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] }
        }
    };

    return (
        <section id="projects" className="bg-white text-black w-full overflow-hidden py-24 md:py-32 flex flex-col items-center">

            {/* Header Title with letter animation if desired, just simple opacity zoom for now */}
            <motion.div
                initial={{ opacity: 0, scale: 0.9, filter: 'blur(10px)' }}
                whileInView={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
                viewport={{ once: true, margin: "-10%" }}
                transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
                className="w-full flex justify-center items-center mb-16 md:mb-24 px-6"
            >
                <h2 className="text-2xl md:text-3xl font-display tracking-[0.2em] font-bold opacity-90 text-black uppercase">PROJECTS</h2>
            </motion.div>

            <div className="w-full max-w-[1800px] flex flex-col gap-24 md:gap-32 px-6 md:px-12 lg:px-20 mx-auto">
                {projects.map((project, idx) => (
                    <motion.div
                        initial={{ opacity: 0, y: 40 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: "-10%" }}
                        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                        key={idx}
                        className={`flex flex-col ${idx !== 0 ? 'pt-16 md:pt-24' : ''}`}
                    >

                        {/* Tags */}
                        <div className="flex flex-wrap gap-2.5 mb-8 md:mb-12">
                            {project.tags.map((tag, tagIdx) => (
                                <motion.span
                                    initial={{ opacity: 0, x: -10 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.4, delay: tagIdx * 0.1, ease: 'easeOut' }}
                                    key={tagIdx}
                                    className="px-4 py-[6px] rounded-full border border-black/[0.08] text-[12px] md:text-[13px] font-medium text-black/70 bg-black/5 tracking-wide backdrop-blur-md"
                                >
                                    {tag}
                                </motion.span>
                            ))}
                        </div>

                        {/* Top Info Grid */}
                        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 mb-16">
                            <motion.div
                                initial="hidden"
                                whileInView="visible"
                                viewport={{ once: true }}
                                variants={titleVariants}
                                className="lg:col-span-6 pr-0 lg:pr-12"
                            >
                                <h3 className="text-2xl md:text-3xl lg:text-[2.2rem] leading-[1.3] text-neutral-500 tracking-tight text-pretty">
                                    <strong className="font-semibold text-black">{project.titleBold}</strong>
                                    {project.titleLight}
                                </h3>
                            </motion.div>
                            <motion.div
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.7, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
                                className="lg:col-span-3"
                            >
                                <p className="text-[14px] md:text-[15px] leading-[1.65] text-neutral-600 font-medium text-pretty">
                                    {project.text1}
                                </p>
                            </motion.div>
                            <motion.div
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.7, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
                                className="lg:col-span-3"
                            >
                                <p className="text-[14px] md:text-[15px] leading-[1.65] text-neutral-600 font-medium text-pretty">
                                    {project.text2}
                                </p>
                            </motion.div>
                        </div>

                        {/* Image Gallery - Horizontal Scroll */}
                        <div
                            className="w-full flex overflow-x-auto snap-x hide-scrollbar scroll-smooth gap-4 md:gap-6 pb-4 pt-2 -mx-6 px-6 md:mx-0 md:px-0 cursor-grab active:cursor-grabbing"
                            onMouseDown={(e) => {
                                const ele = e.currentTarget;
                                ele.dataset.isDragging = 'true';
                                ele.dataset.startX = e.pageX.toString();
                                ele.dataset.scrollLeft = ele.scrollLeft.toString();
                                ele.style.scrollSnapType = 'none';
                                ele.style.scrollBehavior = 'auto';
                            }}
                            onMouseLeave={(e) => {
                                const ele = e.currentTarget;
                                ele.dataset.isDragging = 'false';
                                ele.style.scrollSnapType = 'x mandatory';
                                ele.style.scrollBehavior = 'smooth';
                            }}
                            onMouseUp={(e) => {
                                const ele = e.currentTarget;
                                ele.dataset.isDragging = 'false';
                                ele.style.scrollSnapType = 'x mandatory';
                                ele.style.scrollBehavior = 'smooth';
                            }}
                            onMouseMove={(e) => {
                                const ele = e.currentTarget;
                                if (ele.dataset.isDragging !== 'true') return;
                                e.preventDefault();
                                const startX = parseFloat(ele.dataset.startX || '0');
                                const scrollLeft = parseFloat(ele.dataset.scrollLeft || '0');
                                const walk = (e.pageX - startX) * 2.5;
                                ele.scrollLeft = scrollLeft - walk;
                            }}
                        >
                            {project.images.map((img, imgIdx) => (
                                <motion.div
                                    initial={{ opacity: 0, scale: 0.95, y: 40 }}
                                    whileInView={{ opacity: 1, scale: 1, y: 0 }}
                                    viewport={{ once: true, margin: "-5%" }}
                                    transition={{ duration: 0.8, delay: imgIdx * 0.15, ease: [0.22, 1, 0.36, 1] }}
                                    whileHover={{ y: -8, transition: { duration: 0.3, ease: 'easeOut' } }}
                                    key={imgIdx}
                                    className="h-[55vw] sm:h-[350px] md:h-[480px] lg:h-[550px] shrink-0 snap-center flex flex-col gap-3 md:gap-4 justify-end will-change-transform"
                                >

                                    {/* Optional Colored Top Border mimicking the design tabs */}
                                    {img.topBorderColor && (
                                        <motion.div
                                            initial={{ scaleX: 0 }}
                                            whileInView={{ scaleX: 1 }}
                                            viewport={{ once: true }}
                                            transition={{ duration: 0.8, delay: imgIdx * 0.15 + 0.3, ease: "easeOut" }}
                                            className="w-full h-[2px] rounded-full opacity-90 shadow-[0_0_10px_rgba(0,0,0,0.5)] origin-left"
                                            style={{ backgroundColor: img.topBorderColor }}
                                        />
                                    )}

                                    {/* Image Container */}
                                    <div className={`w-auto h-full relative rounded-xl overflow-hidden bg-black/5 border border-black/5 shadow-2xl ${img.aspect} group cursor-pointer`}>
                                        <div className="absolute inset-0 bg-black/20 z-10 group-hover:bg-transparent transition-colors duration-500" />
                                        <img
                                            src={img.src}
                                            alt=""
                                            draggable={false}
                                            className="absolute inset-0 w-full h-full object-cover origin-center transition-all duration-700 ease-[cubic-bezier(0.25,1,0.5,1)] group-hover:scale-110"
                                        />
                                    </div>
                                </motion.div>
                            ))}
                            {/* Empty spacer to allow proper scrolling on extreme right */}
                            <div className="shrink-0 w-6 md:w-10 opacity-0" />
                        </div>

                    </motion.div>
                ))}
            </div>

            {/* View More Button */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-10%' }}
                transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                className="mt-20 md:mt-28 flex justify-center"
            >
                <motion.a
                    href="https://github.com/namalekanayake"
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.04 }}
                    whileTap={{ scale: 0.97 }}
                    className="flex items-center gap-3 bg-white pl-5 pr-4 py-3 rounded-full shadow-[0_8px_30px_rgb(0,0,0,0.08)] border border-neutral-200/70 group cursor-pointer hover:shadow-[0_8px_40px_rgb(0,0,0,0.13)] transition-shadow duration-300"
                >
                    <span className="text-[13px] font-bold text-neutral-800 uppercase tracking-wide">View More Projects</span>
                    <motion.div
                        className="bg-black p-2 rounded-full"
                        whileHover={{ rotate: -45 }}
                        transition={{ duration: 0.2 }}
                    >
                        <ArrowRight className="w-3.5 h-3.5 text-white" />
                    </motion.div>
                </motion.a>
            </motion.div>

        </section>
    );
}
