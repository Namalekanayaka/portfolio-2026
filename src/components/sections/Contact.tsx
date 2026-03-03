'use client';

import React from 'react';
import { motion } from 'framer-motion';

export default function Contact() {
    return (
        <section id="contact" className="w-full bg-black text-white py-24 md:py-32 px-6 md:px-12 lg:px-20 overflow-hidden relative">
            <div className="max-w-7xl mx-auto flex flex-col gap-16 md:gap-24 relative z-10">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-10%" }}
                    transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                >
                    <span className="text-[12px] md:text-[14px] font-bold tracking-[0.1em] uppercase opacity-80">CONTACT</span>
                </motion.div>

                {/* Form area */}
                <div className="flex flex-col gap-6 md:gap-10">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: "-10%" }}
                        transition={{ duration: 0.8, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
                    >
                        <h2 className="text-[clamp(3.5rem,8vw,6rem)] font-bold tracking-tight leading-none mb-4 md:mb-6">Hello</h2>
                    </motion.div>

                    <form className="flex flex-col gap-8 md:gap-12 w-full max-w-5xl" onSubmit={(e) => e.preventDefault()}>

                        {/* Name Input */}
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "-10%" }}
                            transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
                            className="flex flex-col md:flex-row md:items-baseline gap-4 md:gap-8 group"
                        >
                            <label htmlFor="name" className="text-[clamp(3rem,6vw,5.5rem)] font-bold tracking-tight leading-none whitespace-nowrap">
                                My name is
                            </label>
                            <div className="flex-1 w-full border-b border-white/20 group-focus-within:border-white transition-colors duration-300 pb-2">
                                <input
                                    type="text"
                                    id="name"
                                    placeholder="Enter your name"
                                    className="w-full bg-transparent text-lg md:text-xl outline-none placeholder:text-white/40 text-white font-medium pb-1"
                                />
                            </div>
                        </motion.div>

                        {/* Email Input */}
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "-10%" }}
                            transition={{ duration: 0.8, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
                            className="flex flex-col md:flex-row md:items-baseline gap-4 md:gap-8 group"
                        >
                            <label htmlFor="email" className="text-[clamp(3rem,6vw,5.5rem)] font-bold tracking-tight leading-none whitespace-nowrap">
                                Here is my email
                            </label>
                            <div className="flex-1 w-full border-b border-white/20 group-focus-within:border-white transition-colors duration-300 pb-2">
                                <input
                                    type="email"
                                    id="email"
                                    placeholder="Enter your email address"
                                    className="w-full bg-transparent text-lg md:text-xl outline-none placeholder:text-white/40 text-white font-medium pb-1"
                                />
                            </div>
                        </motion.div>

                        {/* Message Input */}
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "-10%" }}
                            transition={{ duration: 0.8, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
                            className="flex flex-col md:flex-row md:items-baseline gap-4 md:gap-8 group"
                        >
                            <label htmlFor="message" className="text-[clamp(3rem,6vw,5.5rem)] font-bold tracking-tight leading-none whitespace-nowrap">
                                I need help with
                            </label>
                            <div className="flex-1 w-full border-b border-white/20 group-focus-within:border-white transition-colors duration-300 pb-2">
                                <input
                                    type="text"
                                    id="message"
                                    placeholder="Enter your message"
                                    className="w-full bg-transparent text-lg md:text-xl outline-none placeholder:text-white/40 text-white font-medium pb-1"
                                />
                            </div>
                        </motion.div>

                        {/* Submit Button */}
                        <motion.div
                            initial={{ opacity: 0, scale: 0.8 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true, margin: "-10%" }}
                            transition={{ duration: 0.8, delay: 0.6, ease: [0.22, 1, 0.36, 1] }}
                            className="w-full flex justify-center md:justify-center mt-12 md:mt-20 ml-0 md:ml-[-10%]"
                        >
                            <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                className="w-36 h-36 md:w-[180px] md:h-[180px] rounded-full bg-white text-black flex items-center justify-center text-base md:text-lg font-bold shadow-[0_0_40px_rgba(255,255,255,0.1)] hover:shadow-[0_0_60px_rgba(255,255,255,0.2)] transition-all duration-300 cursor-pointer"
                            >
                                Send
                            </motion.button>
                        </motion.div>
                    </form>
                </div>
            </div>
        </section>
    );
}
