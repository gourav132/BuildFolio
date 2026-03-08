import React, { useEffect, useState } from 'react';
import { usePortfolioData } from '../../../../hooks/usePortfolioData';
import { motion, AnimatePresence } from 'framer-motion';
import { FiGithub, FiLinkedin, FiMail, FiArrowRight, FiArrowDown } from 'react-icons/fi';
import { useParams } from 'react-router-dom';

const Spotlight = () => {
    const { userId } = useParams();
    const { profile, synopsis, skills, experiences, projects, socialLinks, loading } = usePortfolioData(userId);
    const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

    useEffect(() => {
        const handleMouseMove = (e) => {
            setMousePos({ x: e.clientX, y: e.clientY });
        };
        window.addEventListener('mousemove', handleMouseMove);
        return () => window.removeEventListener('mousemove', handleMouseMove);
    }, []);

    if (loading) {
        return (
            <div className="min-h-screen bg-[#050505] flex items-center justify-center">
                <div className="w-12 h-12 border-4 border-white/10 border-t-white rounded-full animate-spin" />
            </div>
        );
    }

    const {
        full_name: displayName = "The Creator",
        tagline = "Bringing ideas onto the center stage.",
        display_email,
        email: authEmail,
        headline = ""
    } = profile || {};

    const email = display_email || authEmail || "";

    const overview = synopsis?.intro;
    const { github, linkedin } = socialLinks || {};

    return (
        <div className="min-h-screen bg-[#050505] text-white/90 font-['Cinzel',_serif] selection:bg-white/20 overflow-x-hidden relative">

            {/* Spotlight Effect following mouse */}
            <div
                className="pointer-events-none fixed inset-0 z-0 transition-opacity duration-300"
                style={{
                    background: `radial-gradient(600px circle at ${mousePos.x}px ${mousePos.y}px, rgba(255,255,255,0.06), transparent 40%)`
                }}
            />

            {/* Static background spot */}
            <div className="fixed top-0 left-1/2 -translate-x-1/2 w-[80vw] h-[80vh] bg-white/[0.02] rounded-full blur-[120px] pointer-events-none" />

            <div className="relative z-10 max-w-5xl mx-auto px-6 py-20">

                {/* Hero / Center Stage */}
                <section className="min-h-[80vh] flex flex-col items-center justify-center text-center">
                    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1.5 }} className="w-[1px] h-24 bg-gradient-to-b from-transparent via-white/50 to-transparent mb-12" />

                    <motion.span initial={{ letterSpacing: '0em', opacity: 0 }} animate={{ letterSpacing: '0.4em', opacity: 1 }} transition={{ duration: 2 }} className="font-sans text-xs uppercase text-white/40 mb-8 block">
                        {headline || 'Presenting'}
                    </motion.span>

                    <motion.h1
                        initial={{ opacity: 0, filter: 'blur(10px)' }} animate={{ opacity: 1, filter: 'blur(0px)' }} transition={{ duration: 2, delay: 0.2 }}
                        className="text-6xl md:text-8xl lg:text-9xl font-light tracking-tighter mb-8 bg-clip-text text-transparent bg-gradient-to-b from-white via-white to-white/20"
                    >
                        {displayName}
                    </motion.h1>

                    <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 2, delay: 0.6 }} className="font-sans text-lg md:text-2xl font-light text-white/50 max-w-2xl mx-auto">
                        {tagline}
                    </motion.p>

                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.5, duration: 2 }} className="mt-24 animate-bounce">
                        <FiArrowDown className="text-white/30 text-2xl" />
                    </motion.div>
                </section>

                {/* The Monologue (About) */}
                {overview && (
                    <section className="py-32 border-t border-white/5">
                        <h2 className="text-center font-sans text-xs uppercase tracking-[0.5em] text-white/30 mb-16">The Monologue</h2>
                        <p className="text-3xl md:text-5xl leading-tight font-light text-center max-w-4xl mx-auto text-white/80">
                            "{overview}"
                        </p>
                    </section>
                )}

                {/* The Showcase (Projects) */}
                {projects.length > 0 && (
                    <section className="py-32 border-t border-white/5">
                        <h2 className="text-center font-sans text-xs uppercase tracking-[0.5em] text-white/30 mb-24">The Showcase</h2>

                        <div className="space-y-40">
                            {projects.map((project, i) => (
                                <motion.div
                                    key={project.id}
                                    initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-20%" }} transition={{ duration: 1.5 }}
                                    className="group relative"
                                >
                                    <div className="absolute -inset-10 bg-gradient-to-b from-white/[0.03] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-1000 blur-2xl pointer-events-none" />

                                    <div className="text-center mb-12 relative z-10">
                                        <span className="font-sans text-[10px] text-white/30 uppercase tracking-[0.3em] block mb-4">Act 0{i + 1}</span>
                                        <h3 className="text-5xl md:text-7xl font-light tracking-tighter mb-6 group-hover:text-white transition-colors duration-500 text-white/80">{project.title}</h3>
                                        <p className="font-sans text-white/50 max-w-2xl mx-auto font-light leading-relaxed">{project.description}</p>
                                    </div>

                                    {project.image_url && (
                                        <div className="relative z-10 aspect-video max-w-4xl mx-auto overflow-hidden ring-1 ring-white/10 rounded-sm">
                                            <div className="absolute inset-0 bg-black/40 group-hover:bg-transparent transition-colors duration-1000 z-10" />
                                            <img src={project.image_url} alt={project.title} className="w-full h-full object-cover scale-105 group-hover:scale-100 transition-transform duration-[2s] ease-out" />
                                        </div>
                                    )}

                                    <div className="mt-12 flex justify-center gap-8 relative z-10 font-sans text-xs uppercase tracking-widest font-bold">
                                        {project.live_url && <a href={project.live_url} target="_blank" rel="noreferrer" className="hover:text-white text-white/50 transition-colors flex items-center gap-2">View Live <FiArrowRight /></a>}
                                        {project.github_url && <a href={project.github_url} target="_blank" rel="noreferrer" className="hover:text-white text-white/50 transition-colors flex items-center gap-2">Source Code <FiGithub /></a>}
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </section>
                )}

                {/* The Repertoire (Skills & Experience) */}
                {(skills.length > 0 || experiences.length > 0) && (
                    <section className="py-32 border-t border-white/5 flex flex-col md:flex-row gap-20">
                        {skills.length > 0 && (
                            <div className="md:w-1/3">
                                <h2 className="font-sans text-xs uppercase tracking-[0.5em] text-white/30 mb-12 text-center md:text-left">The Repertoire</h2>
                                <div className="flex flex-col gap-6 font-sans text-sm font-light text-center md:text-left">
                                    {skills.map(skill => (
                                        <div key={skill.id} className="border-b border-white/10 pb-2 text-white/70">
                                            {skill.name}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                        {experiences.length > 0 && (
                            <div className="md:w-2/3">
                                <h2 className="font-sans text-xs uppercase tracking-[0.5em] text-white/30 mb-12 text-center md:text-left">The History</h2>
                                <div className="space-y-16">
                                    {experiences.map((exp, i) => (
                                        <motion.div key={exp.id} initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ delay: 0.2 * i, duration: 1 }}>
                                            <div className="flex flex-col md:flex-row justify-between items-baseline mb-4 border-b border-white/10 pb-4">
                                                <h3 className="text-3xl font-light text-white/90">{exp.role}</h3>
                                                <span className="font-sans text-xs text-white/40 tracking-widest uppercase mt-2 md:mt-0">
                                                    {new Date(exp.start_date).getFullYear()} &mdash; {exp.is_current ? 'Present' : new Date(exp.end_date).getFullYear()}
                                                </span>
                                            </div>
                                            <p className="font-sans text-white/60 font-light mb-6 tracking-wide uppercase text-sm">{exp.company_name}</p>
                                            <ul className="space-y-3 font-sans font-light text-white/50">
                                                {exp.description_points?.map((pt, j) => (
                                                    <li key={j} className="flex gap-4">
                                                        <span className="text-white/20">&bull;</span> {pt}
                                                    </li>
                                                ))}
                                            </ul>
                                        </motion.div>
                                    ))}
                                </div>
                            </div>
                        )}
                    </section>
                )}

                {/* Curtains Close (Footer) */}
                <footer className="py-32 border-t border-white/5 text-center flex flex-col items-center">
                    <h2 className="font-sans text-xs uppercase tracking-[0.5em] text-white/30 mb-12">Curtains Close</h2>
                    {email && (
                        <a href={`mailto:${email}`} className="text-4xl md:text-6xl font-light hover:text-white/70 transition-colors mb-16 break-all">
                            {email}
                        </a>
                    )}

                    <div className="flex gap-12 font-sans text-white/40 hover:text-white/80 transition-colors">
                        {github && <a href={github} target="_blank" rel="noreferrer"><FiGithub size={24} /></a>}
                        {linkedin && <a href={linkedin} target="_blank" rel="noreferrer"><FiLinkedin size={24} /></a>}
                    </div>

                    <div className="mt-32 w-[1px] h-24 bg-gradient-to-t from-transparent via-white/50 to-transparent" />
                    <p className="mt-12 font-sans text-[10px] uppercase tracking-[0.3em] text-white/20">
                        &copy; {new Date().getFullYear()} {displayName}. Fin.
                    </p>
                </footer>

            </div>
        </div>
    );
};

export default Spotlight;
