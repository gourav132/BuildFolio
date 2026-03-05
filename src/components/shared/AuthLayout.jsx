import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const AuthLayout = ({ children, title, subtitle, footer }) => {
    return (
        <div className="min-h-screen w-full bg-[#030303] text-white flex items-center justify-center p-6 relative overflow-hidden font-sans">
            {/* Background Elements */}
            <div className="fixed inset-0 pointer-events-none">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,rgba(139,92,246,0.08),transparent_50%)]"></div>
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_70%,rgba(59,130,246,0.05),transparent_50%)]"></div>
            </div>

            {/* Logo Container */}
            <motion.div
                initial={{ opacity: 0, y: -15 }}
                animate={{ opacity: 1, y: 0 }}
                className="absolute top-6 left-6 z-20"
            >
                <Link to="/" className="flex items-center gap-2.5 group">
                    <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-blue-600 rounded-lg flex items-center justify-center shadow-lg shadow-purple-500/20">
                        <span className="text-white font-bold text-sm">F</span>
                    </div>
                    <span className="text-base font-bold tracking-tight text-white group-hover:text-purple-400 transition-colors">BuildFolio</span>
                </Link>
            </motion.div>

            {/* Auth Card */}
            <motion.div
                initial={{ opacity: 0, scale: 0.98, y: 10 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ duration: 0.4, ease: "easeOut" }}
                className="relative z-10 w-full max-w-[380px]"
            >
                <div className="bg-gray-900/40 backdrop-blur-2xl border border-white/5 p-6 md:p-8 rounded-[1.5rem] shadow-2xl">
                    <div className="relative z-10">
                        {/* Header */}
                        <div className="mb-6">
                            <motion.h1
                                initial={{ opacity: 0, y: -5 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.1 }}
                                className="text-xl font-bold text-white mb-1"
                            >
                                {title}
                            </motion.h1>
                            <motion.p
                                initial={{ opacity: 0, y: -5 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.2 }}
                                className="text-gray-400 text-[11px] font-medium leading-relaxed"
                            >
                                {subtitle}
                            </motion.p>
                        </div>

                        {/* Form Content */}
                        <div className="space-y-4">
                            {children}
                        </div>

                        {/* Footer */}
                        {footer && (
                            <div className="mt-6 pt-5 border-t border-white/5 text-center">
                                {footer}
                            </div>
                        )}
                    </div>
                </div>
            </motion.div>
        </div>
    );
};

export default AuthLayout;
