'use client';

import React, { useRef } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';

const LAYER_1 = [
    "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800&q=80",
    "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=800&q=80",
    "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&q=80",
    "https://images.unsplash.com/photo-1581291518633-83b4ebd1d83e?w=800&q=80",
    "https://images.unsplash.com/photo-1544197150-b99a580bb7a8?w=800&q=80",
    "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=800&q=80",
    "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=800&q=80",
    "https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=800&q=80",
];

const LAYER_2 = [
    "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800&q=80",
    "https://images.unsplash.com/photo-1518770660439-4636190af475?w=800&q=80",
    "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&q=80",
    "https://images.unsplash.com/photo-1504639725590-34d0984388bd?w=800&q=80",
    "https://images.unsplash.com/photo-1639322537228-f710d846310a?w=800&q=80",
    "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=800&q=80",
    "https://images.unsplash.com/photo-1558494949-ef010cbdcc48?w=800&q=80",
    "https://images.unsplash.com/photo-1563986768609-322da13575f3?w=800&q=80",
];

const LAYER_3 = [
    "https://images.unsplash.com/photo-1537432376769-00f5c2f4c8d2?w=800&q=80",
    "https://images.unsplash.com/photo-1550439062-609e1531270e?w=800&q=80",
    "https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=800&q=80",
    "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=800&q=80",
    "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=800&q=80",
    "https://images.unsplash.com/photo-1517077304055-6e89abf0980d?w=800&q=80",
];

const CENTRAL_IMAGE = "https://images.unsplash.com/photo-1432888498266-38ffec3eaf0a?w=1200&q=90"; // Pure UI/UX

const AdvancedProjectGrid = () => {
    const containerRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end end"]
    });

    const smoothProgress = useSpring(scrollYProgress, {
        stiffness: 100,
        damping: 30,
        restDelta: 0.001
    });

    // Fast-tracked transforms for a punchy 250vh journey
    const scalerScale = useTransform(smoothProgress, [0, 0.4], [0.9, 3.5]);
    const scalerRadius = useTransform(smoothProgress, [0, 0.15], ["1.5rem", "0.5rem"]);

    // Images arrive much earlier now
    const l1Opacity = useTransform(smoothProgress, [0.15, 0.4], [0, 1]);
    const l1Scale = useTransform(smoothProgress, [0.15, 0.4], [0.4, 1.1]);

    const l2Opacity = useTransform(smoothProgress, [0.3, 0.5], [0, 1]);
    const l2Scale = useTransform(smoothProgress, [0.3, 0.5], [0.3, 1.05]);

    const l3Opacity = useTransform(smoothProgress, [0.45, 0.65], [0, 1]);
    const l3Scale = useTransform(smoothProgress, [0.45, 0.65], [0.2, 1]);

    // Title stays long enough to be read
    const titleOpacity = useTransform(smoothProgress, [0.1, 0.3], [1, 0]);
    const titleScale = useTransform(smoothProgress, [0.1, 0.3], [1, 0.8]);

    return (
        <section
            ref={containerRef}
            className="relative h-[250vh] w-full bg-white overflow-visible"
        >
            <div className="sticky top-0 h-screen w-full flex items-center justify-center overflow-hidden rounded-[10vw] shadow-sm border border-black/10 bg-white">

                {/* Intro Title */}
                <motion.div
                    style={{ opacity: titleOpacity, scale: titleScale }}
                    className="absolute z-50 pointer-events-none"
                >
                    <h2 className="text-[8vw] font-black text-black leading-none tracking-tighter uppercase text-center drop-shadow-sm">
                        SELECTED<br />WORKS
                    </h2>
                </motion.div>

                {/* The Explosion Grid */}
                <div className="ExplosionContainer relative w-full h-[90vh] max-w-[1600px] px-4 md:px-0">
                    <div className="ExplosionGrid w-full h-full">

                        {/* Layer 1 */}
                        <motion.div
                            style={{ opacity: l1Opacity, scale: l1Scale }}
                            className="Layer Layer-1"
                        >
                            {LAYER_1.map((img, i) => (
                                <div key={i} className={`GridItem item-${i + 1}`}>
                                    <img src={img} alt="" className="w-full h-full object-cover rounded-[1rem] border border-black/5" />
                                </div>
                            ))}
                        </motion.div>

                        {/* Layer 2 */}
                        <motion.div
                            style={{ opacity: l2Opacity, scale: l2Scale }}
                            className="Layer Layer-2"
                        >
                            {LAYER_2.map((img, i) => (
                                <div key={i} className={`GridItem item-${i + 1}`}>
                                    <img src={img} alt="" className="w-full h-full object-cover rounded-[1rem] border border-black/5" />
                                </div>
                            ))}
                        </motion.div>

                        {/* Layer 3 */}
                        <motion.div
                            style={{ opacity: l3Opacity, scale: l3Scale }}
                            className="Layer Layer-3"
                        >
                            {LAYER_3.map((img, i) => (
                                <div key={i} className={`GridItem item-${i + 1}`}>
                                    <img src={img} alt="" className="w-full h-full object-cover rounded-[1rem] border border-black/5" />
                                </div>
                            ))}
                        </motion.div>

                        {/* Central Scaler */}
                        <div className="ScalerArea flex items-center justify-center">
                            <motion.div
                                style={{
                                    scale: scalerScale,
                                    borderRadius: scalerRadius
                                }}
                                className="relative w-full aspect-[4/5] overflow-hidden z-20 shadow-2xl bg-white border border-black/5"
                            >
                                <img
                                    src={CENTRAL_IMAGE}
                                    alt="Main Project"
                                    className="w-full h-full object-cover"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex flex-col justify-end p-8 md:p-12">
                                    <span className="text-white/60 font-bold tracking-[0.4em] uppercase text-[10px] mb-3">Enterprise Architecture</span>
                                    <h3 className="text-white text-2xl md:text-4xl font-black uppercase tracking-tighter leading-none">
                                        Cloud Native<br />Systems
                                    </h3>
                                </div>
                            </motion.div>
                        </div>

                    </div>
                </div>
            </div>

            {/* Robust Grid Styling (Layered approach) */}
            <style jsx>{`
                .ExplosionGrid {
                    position: relative;
                    display: grid;
                    grid-template-columns: repeat(5, 1fr);
                    grid-template-rows: repeat(3, 1fr);
                    gap: 1.5rem;
                    height: 100%;
                }

                @media (max-width: 768px) {
                    .ExplosionGrid {
                        grid-template-columns: repeat(3, 1fr);
                        gap: 1rem;
                    }
                }

                .Layer {
                    position: absolute;
                    inset: 0;
                    display: grid;
                    grid-template-columns: repeat(5, 1fr);
                    grid-template-rows: repeat(3, 1fr);
                    gap: 1.5rem;
                    pointer-events: none;
                }

                @media (max-width: 768px) {
                    .Layer {
                        grid-template-columns: repeat(3, 1fr);
                        gap: 1rem;
                    }
                }

                .GridItem img {
                    box-shadow: 0 20px 50px rgba(0,0,0,0.3);
                }

                /* Layer 1 (Outer corners/edges) */
                .Layer-1 .item-1 { grid-area: 1 / 1; }
                .Layer-1 .item-2 { grid-area: 1 / 5; }
                .Layer-1 .item-3 { grid-area: 3 / 1; }
                .Layer-1 .item-4 { grid-area: 3 / 5; }
                .Layer-1 .item-5 { grid-area: 2 / 1; }
                .Layer-1 .item-6 { grid-area: 1 / 3; }

                /* Layer 2 (Inner ring) */
                .Layer-2 .item-1 { grid-area: 1 / 2; }
                .Layer-2 .item-2 { grid-area: 1 / 4; }
                .Layer-2 .item-3 { grid-area: 3 / 2; }
                .Layer-2 .item-4 { grid-area: 3 / 4; }
                .Layer-2 .item-5 { grid-area: 2 / 5; }
                .Layer-2 .item-6 { grid-area: 2 / 2; }

                /* Layer 3 (Inner ring) */
                .Layer-3 .item-1 { grid-area: 3 / 3; }
                .Layer-3 .item-2 { grid-area: 2 / 4; }
                .Layer-3 .item-3 { grid-area: 1 / 1; opacity: 0.3; filter: blur(4px); }
                .Layer-3 .item-4 { grid-area: 3 / 5; opacity: 0.3; filter: blur(4px); }
                .Layer-3 .item-5 { grid-area: 1 / 5; opacity: 0.3; filter: blur(4px); }
                .Layer-3 .item-6 { grid-area: 2 / 3; }

                /* ScalerArea Positioning */
                .ScalerArea {
                    grid-area: 2 / 3;
                    z-index: 50;
                }

                @media (max-width: 768px) {
                    .ScalerArea { grid-area: 2 / 2; }
                    .Layer-1 .item-2 { grid-area: 1 / 3; }
                    .Layer-1 .item-4 { grid-area: 3 / 3; }
                    .Layer-1 .item-5, .Layer-1 .item-6, .Layer-2 .item-5, .Layer-2 .item-6 { display: none; }
                }
            `}</style>
        </section>
    );
};

export default AdvancedProjectGrid;
