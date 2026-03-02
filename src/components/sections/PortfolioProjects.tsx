'use client';

import React from 'react';
import { motion } from 'framer-motion';

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
        tags: ["Brand Identity", "Web Design", "Packaging"],
        titleBold: "Avant-Garde Territory:",
        titleLight: " visual language for telling the story of Ural's Avant-garde architecture in a modern way",
        text1: "Avant-Garde Territory is a cultural project dedicated to preserving and promoting the Ural region's constructivist architecture. The project aims to reimagine the perception of the Avant-garde movement, giving it a modern look and turning this cultural legacy into a key tourist attraction.",
        text2: "We created a flexible identity that merges Avant-garde principles with a modern approach, combining bold colors, geometric forms, and neo-grotesque typography. At its center stands the region's iconic constructivist building, reimagined as a graphic symbol of cultural continuity.",
        images: [
            { src: "https://images.unsplash.com/photo-1549465220-1a8b9238cd48?q=80&w=800", aspect: "aspect-[3/4]" },
            { src: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=800", aspect: "aspect-[4/5]" },
            { src: "https://images.unsplash.com/photo-1576566588028-4147f3842f27?q=80&w=800", aspect: "aspect-square" },
            { src: "https://images.unsplash.com/photo-1628155930542-3c7a64e2c833?q=80&w=800", aspect: "aspect-[4/3]" }
        ]
    },
    {
        tags: ["Brand Identity", "Web Design", "Illustration"],
        titleBold: "Open Office:",
        titleLight: " a friendly identity for the platform where businesses meet, share, and grow together",
        text1: "Open Office is a leading project for business tours, guest visits, and partner meetings. The company values experience exchange as a driver of growth, while keeping a clear focus on key business metrics. At its core are trust, confidentiality, and genuine long-term relationships.",
        text2: "The identity was crafted to invite openness and authentic dialogue. The office becomes more than a space — it's a place for dialogue, sharing, and passion for work. Serif and sans typography mix with smooth shapes, while lively office-life illustrations and a bold palette add energy.",
        images: [
            { src: "https://images.unsplash.com/photo-1542435503-956c469947f6?q=80&w=800", aspect: "aspect-[3/4]", topBorderColor: "#749b82" },
            { src: "https://images.unsplash.com/photo-1550529573-fc6913ed80be?q=80&w=800", aspect: "aspect-square", topBorderColor: "#ceb8aa" },
            { src: "https://images.unsplash.com/photo-1572044162444-ad60f128bdea?q=80&w=800", aspect: "aspect-square", topBorderColor: "#ea7c42" },
            { src: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?q=80&w=800", aspect: "aspect-[9/16]", topBorderColor: "#a3b2b0" }
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
        <section className="bg-white text-black w-full overflow-hidden py-24 md:py-32 flex flex-col items-center">

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
                                    className="h-[350px] md:h-[480px] lg:h-[550px] shrink-0 snap-center flex flex-col gap-4 justify-end will-change-transform"
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
                                    <div className={`h-full relative rounded-xl overflow-hidden bg-black/5 border border-black/5 shadow-2xl ${img.aspect} group cursor-pointer`}>
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
        </section>
    );
}
