import React, { useState, useEffect } from 'react';
import { usePortfolioData } from '../../../../hooks/usePortfolioData';
import { motion, AnimatePresence } from 'framer-motion';
import {
    FiGithub, FiLinkedin, FiMail, FiExternalLink, FiArrowRight,
    FiCode, FiZap, FiFolder, FiCpu, FiTerminal, FiActivity, FiBriefcase
} from 'react-icons/fi';
import { useParams } from 'react-router-dom';

const NeonPulse = () => {
    const {userId} = useParams();
    const { profile, synopsis, skills, experiences, projects, loading } = usePortfolioData(userId);
    const [activeSection, setActiveSection] = useState('about');
    const [glitchActive, setGlitchActive] = useState(false);

    // Periodic glitch effect
    useEffect(() => {
        const interval = setInterval(() => {
            setGlitchActive(true);
            setTimeout(() => setGlitchActive(false), 200);
        }, 5000);
        return () => clearInterval(interval);
    }, []);

    if (loading) {
        return (
            <div className="min-h-screen bg-black flex items-center justify-center">
                <div className="text-center space-y-4">
                    <motion.div
                        animate={{ opacity: [0.3, 1, 0.3] }}
                        transition={{ repeat: Infinity, duration: 1.5 }}
                        className="text-cyan-400 font-mono text-lg tracking-widest"
                    >
                        INITIALIZING...
                    </motion.div>
                    <div className="w-48 h-0.5 bg-gray-800 mx-auto overflow-hidden rounded-full">
                        <motion.div
                            animate={{ x: ['-100%', '100%'] }}
                            transition={{ repeat: Infinity, duration: 1.2, ease: 'linear' }}
                            className="h-full w-1/2 bg-gradient-to-r from-transparent via-cyan-400 to-transparent"
                        />
                    </div>
                </div>
            </div>
        );
    }

    const {
        full_name = 'Your Name',
        tagline = 'Digital Architect & Code Artist',
        display_email,
        email: authEmail,
        github_url = '',
        linkedin_url = '',
    } = profile || {};

    const email = display_email || authEmail || '';

    const sections = ['about', 'skills', 'experience', 'projects'];

    const navVariants = {
        hidden: { opacity: 0, y: -20 },
        visible: { opacity: 1, y: 0, transition: { staggerChildren: 0.1 } }
    };

    return (
        <div className="min-h-screen bg-[#020008] text-white font-mono overflow-x-hidden">
            {/* Animated grid background */}
            <div
                className="fixed inset-0 pointer-events-none opacity-10"
                style={{
                    backgroundImage: `
                        linear-gradient(rgba(0,255,255,0.15) 1px, transparent 1px),
                        linear-gradient(90deg, rgba(0,255,255,0.15) 1px, transparent 1px)
                    `,
                    backgroundSize: '60px 60px'
                }}
            />
            {/* Corner glow effects */}
            <div className="fixed top-0 left-0 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />
            <div className="fixed bottom-0 right-0 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl pointer-events-none" />

            {/* Header / Nav */}
            <motion.header
                initial={{ opacity: 0, y: -30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="sticky top-0 z-50 border-b border-cyan-900/50 bg-black/70 backdrop-blur-xl px-6 md:px-16 py-4"
            >
                <div className="max-w-6xl mx-auto flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <div className="w-2 h-2 rounded-full bg-cyan-400 shadow-[0_0_10px_rgba(0,255,255,0.8)] animate-pulse" />
                        <span
                            className={`text-cyan-300 text-sm font-bold tracking-[0.3em] uppercase transition-all duration-75 ${glitchActive ? 'translate-x-0.5 text-cyan-100' : ''}`}
                        >
                            {full_name || 'IDENTITY'}
                        </span>
                    </div>

                    <nav className="hidden md:flex items-center gap-1">
                        {sections.map((s) => (
                            <button
                                key={s}
                                onClick={() => setActiveSection(s)}
                                className={`px-4 py-2 text-xs uppercase tracking-widest transition-all duration-300 rounded border ${activeSection === s
                                    ? 'border-cyan-500 text-cyan-300 bg-cyan-500/10 shadow-[0_0_15px_rgba(0,255,255,0.2)]'
                                    : 'border-transparent text-gray-500 hover:text-cyan-400 hover:border-cyan-800'
                                    }`}
                            >
                                {s}
                            </button>
                        ))}
                    </nav>

                    <div className="flex items-center gap-3">
                        {github_url && <a href={github_url} target="_blank" rel="noreferrer" className="p-2 text-gray-500 hover:text-cyan-400 transition-colors"><FiGithub size={18} /></a>}
                        {linkedin_url && <a href={linkedin_url} target="_blank" rel="noreferrer" className="p-2 text-gray-500 hover:text-cyan-400 transition-colors"><FiLinkedin size={18} /></a>}
                        {email && (
                            <a href={`mailto:${email}`} className="px-4 py-1.5 text-xs border border-cyan-500 text-cyan-400 rounded hover:bg-cyan-500 hover:text-black transition-all duration-300 tracking-widest uppercase">
                                Contact
                            </a>
                        )}
                    </div>
                </div>
            </motion.header>

            <main className="max-w-6xl mx-auto px-6 md:px-16 py-20 space-y-40">

                {/* HERO */}
                <section className="min-h-[70vh] flex flex-col justify-center">
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.8, delay: 0.2 }}>
                        <p className="text-cyan-500 text-xs uppercase tracking-[0.5em] mb-6 font-bold">
                            &gt; ONLINE &amp; READY
                        </p>

                        <h1 className={`text-6xl md:text-9xl font-black tracking-tight mb-6 leading-none transition-all duration-75 ${glitchActive ? 'text-cyan-300 [text-shadow:2px_0_#f0f,_-2px_0_#0ff]' : ''}`}
                            style={{ textShadow: glitchActive ? '' : '0 0 40px rgba(0,255,255,0.15)' }}
                        >
                            <span className="text-white">{full_name?.split(' ')[0]}</span>
                            <span className="text-cyan-400">.</span>
                        </h1>

                        <p className="text-gray-400 text-lg md:text-2xl max-w-2xl mb-10 leading-relaxed font-sans font-light">
                            {tagline}
                        </p>

                        <div className="flex flex-wrap gap-4">
                            {email && (
                                <a href={`mailto:${email}`} className="group flex items-center gap-2 px-6 py-3 bg-cyan-400 text-black font-bold text-sm tracking-wider uppercase hover:bg-cyan-300 transition-colors rounded">
                                    <FiMail size={16} /> Initiate Contact
                                </a>
                            )}
                            {github_url && (
                                <a href={github_url} target="_blank" rel="noreferrer" className="group flex items-center gap-2 px-6 py-3 border border-gray-700 text-gray-400 font-bold text-sm tracking-wider uppercase hover:border-cyan-500 hover:text-cyan-400 transition-all rounded">
                                    <FiGithub size={16} /> View Source
                                </a>
                            )}
                        </div>
                    </motion.div>

                    {/* Animated metric bar */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.8 }}
                        className="mt-20 flex gap-8 border-t border-gray-800 pt-8"
                    >
                        {[
                            { label: 'Projects', value: projects?.length || 0, icon: FiFolder },
                            { label: 'Positions', value: experiences?.length || 0, icon: FiBriefcase },
                            { label: 'Skills', value: skills?.length || 0, icon: FiCpu },
                        ].map(({ label, value, icon: Icon }) => (
                            <div key={label} className="flex items-center gap-3 group">
                                <Icon size={16} className="text-cyan-400 group-hover:scale-110 transition-transform" />
                                <div>
                                    <span className="text-3xl font-black text-white tabular-nums">{String(value).padStart(2, '0')}</span>
                                    <p className="text-gray-600 text-[10px] uppercase tracking-widest font-bold mt-0.5">{label}</p>
                                </div>
                            </div>
                        ))}
                    </motion.div>
                </section>

                {/* ABOUT */}
                {synopsis?.intro && (
                    <motion.section
                        initial={{ opacity: 0, y: 40 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.7 }}
                    >
                        <div className="flex items-center gap-4 mb-10">
                            <FiActivity size={14} className="text-cyan-400" />
                            <span className="text-cyan-500 text-xs font-bold uppercase tracking-[0.5em]">System Log</span>
                            <div className="flex-1 h-px bg-gradient-to-r from-cyan-900 to-transparent" />
                        </div>
                        <blockquote className="border-l-2 border-cyan-500 pl-8">
                            <p className="text-2xl md:text-3xl text-gray-200 font-sans font-light leading-relaxed max-w-3xl">
                                {synopsis.intro}
                            </p>
                        </blockquote>
                    </motion.section>
                )}

                {/* SKILLS */}
                {skills?.length > 0 && (
                    <motion.section
                        initial={{ opacity: 0, y: 40 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.7 }}
                    >
                        <div className="flex items-center gap-4 mb-10">
                            <FiTerminal size={14} className="text-cyan-400" />
                            <span className="text-cyan-500 text-xs font-bold uppercase tracking-[0.5em]">Tech Stack</span>
                            <div className="flex-1 h-px bg-gradient-to-r from-cyan-900 to-transparent" />
                        </div>
                        <div className="flex flex-wrap gap-3">
                            {skills.map((skill, i) => (
                                <motion.div
                                    key={skill.id}
                                    initial={{ opacity: 0, scale: 0.8 }}
                                    whileInView={{ opacity: 1, scale: 1 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: i * 0.04 }}
                                    whileHover={{ scale: 1.05, y: -2 }}
                                    className="px-4 py-2 border border-gray-800 bg-gray-900/50 text-gray-300 text-sm hover:border-cyan-700 hover:text-cyan-300 hover:bg-cyan-500/5 hover:shadow-[0_0_15px_rgba(0,255,255,0.15)] transition-all duration-300 rounded"
                                >
                                    {skill.name}
                                </motion.div>
                            ))}
                        </div>
                    </motion.section>
                )}

                {/* EXPERIENCE */}
                {experiences?.length > 0 && (
                    <motion.section
                        initial={{ opacity: 0, y: 40 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.7 }}
                    >
                        <div className="flex items-center gap-4 mb-10">
                            <FiZap size={14} className="text-cyan-400" />
                            <span className="text-cyan-500 text-xs font-bold uppercase tracking-[0.5em]">Mission Log</span>
                            <div className="flex-1 h-px bg-gradient-to-r from-cyan-900 to-transparent" />
                        </div>
                        <div className="space-y-12">
                            {experiences.map((exp, i) => (
                                <motion.div
                                    key={exp.id}
                                    initial={{ opacity: 0, x: -20 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: i * 0.1 }}
                                    className="group grid md:grid-cols-[200px_1fr] gap-6 items-start"
                                >
                                    <div className="space-y-1">
                                        <div className="text-cyan-400 text-xs font-bold tracking-widest uppercase">
                                            {new Date(exp.start_date).getFullYear()} — {exp.is_current ? 'NOW' : new Date(exp.end_date).getFullYear()}
                                        </div>
                                        <div className="text-gray-600 text-xs uppercase tracking-widest">{exp.company_name}</div>
                                    </div>
                                    <div className="border-l border-gray-800 pl-6 group-hover:border-cyan-900 transition-colors">
                                        <h3 className="text-xl font-bold text-white mb-3 group-hover:text-cyan-300 transition-colors">{exp.role}</h3>
                                        <ul className="space-y-2">
                                            {exp.description_points?.slice(0, 3).map((point, idx) => (
                                                <li key={idx} className="text-sm text-gray-500 flex items-start gap-3 leading-relaxed">
                                                    <span className="text-cyan-600 mt-1 flex-shrink-0">&gt;</span>
                                                    {point}
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </motion.section>
                )}

                {/* PROJECTS */}
                {projects?.length > 0 && (
                    <motion.section
                        initial={{ opacity: 0, y: 40 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.7 }}
                    >
                        <div className="flex items-center gap-4 mb-10">
                            <FiCode size={14} className="text-cyan-400" />
                            <span className="text-cyan-500 text-xs font-bold uppercase tracking-[0.5em]">Deployed Units</span>
                            <div className="flex-1 h-px bg-gradient-to-r from-cyan-900 to-transparent" />
                        </div>
                        <div className="grid md:grid-cols-2 gap-6">
                            {projects.map((project, i) => (
                                <motion.div
                                    key={project.id}
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: i * 0.1 }}
                                    whileHover={{ y: -4 }}
                                    className="group relative border border-gray-800 bg-gray-900/30 p-6 overflow-hidden hover:border-cyan-800 hover:shadow-[0_0_30px_rgba(0,255,255,0.07)] transition-all duration-500 rounded"
                                >
                                    {/* Top accent */}
                                    <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-cyan-500 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                                    <div className="flex items-start justify-between mb-4">
                                        <FiFolder size={20} className="text-cyan-600 group-hover:text-cyan-400 transition-colors" />
                                        <div className="flex gap-3">
                                            {project.github_url && (
                                                <a href={project.github_url} target="_blank" rel="noreferrer" className="text-gray-600 hover:text-cyan-400 transition-colors">
                                                    <FiGithub size={16} />
                                                </a>
                                            )}
                                            {project.live_url && (
                                                <a href={project.live_url} target="_blank" rel="noreferrer" className="text-gray-600 hover:text-cyan-400 transition-colors">
                                                    <FiExternalLink size={16} />
                                                </a>
                                            )}
                                        </div>
                                    </div>
                                    <h3 className="text-lg font-bold text-white mb-2 group-hover:text-cyan-300 transition-colors">{project.title}</h3>
                                    <p className="text-sm text-gray-500 leading-relaxed mb-4">{project.description}</p>
                                    <div className="flex flex-wrap gap-2">
                                        {project.technologies?.slice(0, 4).map((tech, idx) => (
                                            <span key={idx} className="text-[10px] text-cyan-600 font-bold uppercase tracking-wider bg-cyan-950/50 px-2.5 py-1 rounded">
                                                {tech}
                                            </span>
                                        ))}
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </motion.section>
                )}

            </main>

            {/* Footer */}
            <footer className="border-t border-gray-900 py-10 text-center">
                <p className="text-gray-700 text-xs font-mono tracking-[0.5em] uppercase">
                    &gt; {full_name?.toUpperCase() || 'UNKNOWN'} &mdash; END OF FILE
                </p>
            </footer>
        </div>
    );
};

export default NeonPulse;
