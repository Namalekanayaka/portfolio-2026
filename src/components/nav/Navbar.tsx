'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { TreeDeciduous, Copy, Check } from 'lucide-react';

const Navbar = () => {
    const [copied, setCopied] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    const copyEmail = () => {
        navigator.clipboard.writeText('namalekanayake412@gmail.com');
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    const navLinks = [
        { name: 'Home', href: '/' },
        { name: 'About me', href: '#about' },
        { name: 'Contact', href: '#contact' },
    ];

    return (
        <nav className="fixed top-8 left-0 w-full z-50 px-6 pointer-events-none">
            <div className="max-w-7xl mx-auto flex items-center justify-between pointer-events-auto">

                {/* Left Pill: Status */}
                <motion.div
                    initial={{ opacity: 0, x: -20, filter: 'blur(10px)' }}
                    animate={{ opacity: 1, x: 0, filter: 'blur(0px)' }}
                    transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                    className="hidden lg:flex items-center gap-3 bg-white px-5 py-3 rounded-full shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-neutral-100/50"
                >
                    <div className="relative flex items-center justify-center">
                        <div className="w-2.5 h-2.5 bg-emerald-500 rounded-full" />
                        <motion.div
                            animate={{ scale: [1, 1.8, 1], opacity: [0.5, 0, 0.5] }}
                            transition={{ repeat: Infinity, duration: 2.5, ease: "easeInOut" }}
                            className="absolute w-2.5 h-2.5 bg-emerald-500/50 rounded-full"
                        />
                    </div>
                    <span className="text-[13px] font-bold tracking-tight text-neutral-800 uppercase italic">available for projects</span>
                </motion.div>

                {/* Center Pill: Main Nav */}
                <motion.div
                    initial={{ opacity: 0, y: -20, filter: 'blur(10px)' }}
                    animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                    transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
                    className="flex items-center gap-1 bg-white p-1.5 rounded-full shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-neutral-100/50"
                >
                    {/* Logo */}
                    <motion.div
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="bg-black p-2.5 rounded-full cursor-pointer shadow-lg shadow-black/10"
                    >
                        <TreeDeciduous className="w-4 h-4 text-white" />
                    </motion.div>

                    <div className="hidden md:flex items-center gap-0.5 pr-2">
                        {navLinks.map((link) => (
                            <motion.a
                                key={link.name}
                                href={link.href}
                                whileHover={{ y: -1 }}
                                whileTap={{ y: 0 }}
                                className="px-4 py-2 rounded-full text-[13px] font-bold text-neutral-800 hover:text-black hover:bg-neutral-50/80 transition-all duration-200 uppercase"
                            >
                                {link.name}
                            </motion.a>
                        ))}
                    </div>

                    <button
                        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                        className="md:hidden px-5 py-2 text-[13px] font-bold text-neutral-800 uppercase"
                    >
                        {isMobileMenuOpen ? 'Close' : 'Menu'}
                    </button>
                </motion.div>

                {/* Right Pill: Contact */}
                <motion.div
                    initial={{ opacity: 0, x: 20, filter: 'blur(10px)' }}
                    animate={{ opacity: 1, x: 0, filter: 'blur(0px)' }}
                    transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
                    className="hidden sm:flex items-center gap-3 bg-white pl-2 pr-5 py-1.5 rounded-full shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-neutral-100/50 group"
                >
                    <button
                        onClick={copyEmail}
                        className="p-2.5 hover:bg-neutral-50 rounded-full transition-colors relative group/btn"
                    >
                        <AnimatePresence mode="wait">
                            {copied ? (
                                <motion.div
                                    key="check"
                                    initial={{ scale: 0.5, opacity: 0 }}
                                    animate={{ scale: 1, opacity: 1 }}
                                    exit={{ scale: 0.5, opacity: 0 }}
                                >
                                    <Check className="w-3.5 h-3.5 text-emerald-500" />
                                </motion.div>
                            ) : (
                                <motion.div
                                    key="copy"
                                    initial={{ scale: 0.5, opacity: 0 }}
                                    animate={{ scale: 1, opacity: 1 }}
                                    exit={{ scale: 0.5, opacity: 0 }}
                                >
                                    <Copy className="w-3.5 h-3.5 text-neutral-400 group-hover:text-black transition-colors" />
                                </motion.div>
                            )}
                        </AnimatePresence>

                        {/* Tooltip */}
                        <AnimatePresence>
                            {copied && (
                                <motion.div
                                    initial={{ opacity: 0, y: 10, x: '-50%' }}
                                    animate={{ opacity: 1, y: 0, x: '-50%' }}
                                    exit={{ opacity: 0, y: 10, x: '-50%' }}
                                    className="absolute top-full mt-2 left-1/2 px-3 py-1 bg-black text-white text-[10px] rounded flex items-center justify-center whitespace-nowrap pointer-events-none font-bold"
                                >
                                    COPIED!
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </button>
                    <span className="text-[13px] font-bold text-neutral-800">namalekanayake412@gmail.com</span>
                </motion.div>

            </div>

            {/* Mobile Menu Dropdown */}
            <AnimatePresence>
                {isMobileMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: -10, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: -10, scale: 0.95 }}
                        transition={{ duration: 0.2 }}
                        className="absolute top-20 left-6 right-6 bg-white rounded-2xl shadow-xl border border-neutral-100/50 p-2 flex flex-col pointer-events-auto origin-top md:hidden"
                    >
                        {navLinks.map((link) => (
                            <a
                                key={link.name}
                                href={link.href}
                                onClick={() => setIsMobileMenuOpen(false)}
                                className="px-5 py-4 rounded-xl text-[14px] font-bold text-neutral-800 hover:text-black hover:bg-neutral-50 transition-colors uppercase text-center"
                            >
                                {link.name}
                            </a>
                        ))}
                        <div className="h-px bg-neutral-100 my-1 mx-4" />
                        <button
                            onClick={() => {
                                copyEmail();
                            }}
                            className="px-5 py-4 rounded-xl text-[14px] font-bold text-emerald-600 hover:bg-emerald-50 transition-colors uppercase flex items-center justify-center gap-2"
                        >
                            <span>Copy Email</span>
                            {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                        </button>
                    </motion.div>
                )}
            </AnimatePresence>
        </nav>
    );
};

export default Navbar;
