'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';

export default function Contact() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        window.location.href = `mailto:namalekanayake412@gmail.com?subject=Contact from ${name}&body=${message}%0A%0AFrom: ${email}`;

        // Clear form after slight delay
        setTimeout(() => {
            setName('');
            setEmail('');
            setMessage('');
        }, 500);
    };

    return (
        <section id="contact" className="min-h-screen bg-black text-white px-6 md:px-12 lg:px-24 py-24 flex flex-col justify-center relative z-20 w-full overflow-hidden">
            <div className="max-w-7xl mx-auto w-full">
                {/* Top Label */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-10%" }}
                    className="mb-16 md:mb-24 text-[11px] md:text-xs uppercase tracking-[0.2em] font-medium opacity-60"
                >
                    CONTACT
                </motion.div>

                <motion.form
                    onSubmit={handleSubmit}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-10%" }}
                    variants={{
                        hidden: {},
                        visible: { transition: { staggerChildren: 0.15 } }
                    }}
                    className="w-full"
                >
                    {/* Line 1: Hello */}
                    <motion.div
                        variants={{
                            hidden: { opacity: 0, y: 30 },
                            visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] } }
                        }}
                        className="text-[clamp(3rem,6.5vw,6rem)] font-bold tracking-tight leading-[1.1] mb-6 md:mb-8"
                    >
                        Hello
                    </motion.div>

                    {/* Line 2: My name is */}
                    <motion.div
                        variants={{
                            hidden: { opacity: 0, y: 30 },
                            visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] } }
                        }}
                        className="flex flex-wrap items-end gap-x-6 gap-y-4 mb-6 md:mb-10 w-full"
                    >
                        <span className="text-[clamp(3rem,6.5vw,6rem)] font-bold tracking-tight leading-[1.1] shrink-0">
                            My name is
                        </span>
                        <input
                            type="text"
                            required
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            placeholder="Enter your name"
                            className="flex-1 bg-transparent border-b border-white/20 focus:border-white focus:outline-none text-base md:text-lg lg:text-xl font-normal text-white placeholder:text-white/30 pb-2 md:pb-4 min-w-[250px] transition-colors"
                        />
                    </motion.div>

                    {/* Line 3: Here is my email */}
                    <motion.div
                        variants={{
                            hidden: { opacity: 0, y: 30 },
                            visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] } }
                        }}
                        className="flex flex-wrap items-end gap-x-6 gap-y-4 mb-6 md:mb-10 w-full"
                    >
                        <span className="text-[clamp(3rem,6.5vw,6rem)] font-bold tracking-tight leading-[1.1] shrink-0">
                            Here is my email
                        </span>
                        <input
                            type="email"
                            required
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="Enter your email address"
                            className="flex-1 bg-transparent border-b border-white/20 focus:border-white focus:outline-none text-base md:text-lg lg:text-xl font-normal text-white placeholder:text-white/30 pb-2 md:pb-4 min-w-[250px] transition-colors"
                        />
                    </motion.div>

                    {/* Line 4: I need help with */}
                    <motion.div
                        variants={{
                            hidden: { opacity: 0, y: 30 },
                            visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] } }
                        }}
                        className="flex flex-wrap items-end gap-x-6 gap-y-4 mb-16 md:mb-24 w-full"
                    >
                        <span className="text-[clamp(3rem,6.5vw,6rem)] font-bold tracking-tight leading-[1.1] shrink-0">
                            I need help with
                        </span>
                        <input
                            type="text"
                            required
                            value={message}
                            onChange={(e) => setMessage(e.target.value)}
                            placeholder="Enter your message"
                            className="flex-1 bg-transparent border-b border-white/20 focus:border-white focus:outline-none text-base md:text-lg lg:text-xl font-normal text-white placeholder:text-white/30 pb-2 md:pb-4 min-w-[250px] transition-colors"
                        />
                    </motion.div>

                    {/* Send Button */}
                    <motion.div
                        variants={{
                            hidden: { opacity: 0, scale: 0.8 },
                            visible: { opacity: 1, scale: 1, transition: { delay: 0.4, duration: 0.8, ease: [0.22, 1, 0.36, 1] } }
                        }}
                        className="flex justify-center w-full"
                    >
                        <motion.button
                            type="submit"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="w-[140px] h-[140px] md:w-[200px] md:h-[200px] bg-white rounded-full flex items-center justify-center text-black font-semibold text-lg md:text-xl hover:shadow-[0_0_50px_rgba(255,255,255,0.15)] transition-shadow"
                        >
                            Send
                        </motion.button>
                    </motion.div>

                </motion.form>
            </div>
        </section>
    );
}
