import React, { useState } from 'react';
import { usePortfolioData } from '../../../../hooks/usePortfolioData';
import { motion } from 'framer-motion';
import {
    FiGithub, FiLinkedin, FiMail, FiExternalLink,
    FiArrowUpRight, FiMapPin, FiCalendar
} from 'react-icons/fi';
import { useParams } from 'react-router-dom';

const PaperFolio = () => {
    const {userId} = useParams();
    const { profile, synopsis, skills, experiences, projects, loading } = usePortfolioData(userId);
    const [hoveredProject, setHoveredProject] = useState(null);

    if (loading) {
        return (
            <div className="min-h-screen bg-[#f5f0e8] flex items-center justify-center">
                <motion.div
                    animate={{ opacity: [0.4, 1, 0.4] }}
                    transition={{ repeat: Infinity, duration: 2 }}
                    className="text-[#3d3530] font-serif text-xl italic"
                >
                    Loading your story&hellip;
                </motion.div>
            </div>
        );
    }

    const {
        full_name = 'Your Name',
        tagline = 'Designer & Developer',
        display_email,
        email: authEmail,
        location,
        github_url = '',
        linkedin_url = '',
    } = profile || {};

    const email = display_email || authEmail || '';

    const fadeUp = {
        hidden: { opacity: 0, y: 24 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] } }
    };

    return (
        <div className="min-h-screen bg-[#faf7f2] text-[#2c2420]" style={{ fontFamily: "'Georgia', 'Times New Roman', serif" }}>

            {/* Paper texture overlay */}
            <div className="fixed inset-0 pointer-events-none opacity-[0.03]"
                style={{
                    backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='400'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4'/%3E%3C/filter%3E%3Crect width='400' height='400' filter='url(%23n)' opacity='1'/%3E%3C/svg%3E")`,
                }}
            />

            {/* Header */}
            <motion.header
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1 }}
                className="max-w-5xl mx-auto px-8 md:px-16 pt-16 pb-8 border-b-2 border-[#2c2420]"
            >
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
                    <div>
                        <p className="text-xs uppercase tracking-[0.4em] text-[#9b8b7f] mb-4 font-sans">Portfolio &bull; {new Date().getFullYear()}</p>
                        <h1 className="text-6xl md:text-8xl font-black tracking-tight text-[#1a1210] leading-none">
                            {full_name}
                        </h1>
                        <p className="mt-4 text-lg text-[#7a6a5f] italic">{tagline}</p>
                    </div>

                    <div className="flex flex-col gap-3 text-sm font-sans">
                        {email && (
                            <a href={`mailto:${email}`} className="flex items-center gap-2 text-[#5a4a3f] hover:text-[#1a1210] transition-colors group">
                                <FiMail size={14} />
                                <span className="border-b border-dashed border-[#c4b8ae] group-hover:border-[#1a1210] transition-colors">{email}</span>
                            </a>
                        )}
                        {github_url && (
                            <a href={github_url} target="_blank" rel="noreferrer" className="flex items-center gap-2 text-[#5a4a3f] hover:text-[#1a1210] transition-colors group">
                                <FiGithub size={14} />
                                <span className="border-b border-dashed border-[#c4b8ae] group-hover:border-[#1a1210] transition-colors">GitHub</span>
                            </a>
                        )}
                        {linkedin_url && (
                            <a href={linkedin_url} target="_blank" rel="noreferrer" className="flex items-center gap-2 text-[#5a4a3f] hover:text-[#1a1210] transition-colors group">
                                <FiLinkedin size={14} />
                                <span className="border-b border-dashed border-[#c4b8ae] group-hover:border-[#1a1210] transition-colors">LinkedIn</span>
                            </a>
                        )}
                    </div>
                </div>
            </motion.header>

            <main className="max-w-5xl mx-auto px-8 md:px-16 py-16 space-y-24">

                {/* INTRO / ABOUT */}
                {synopsis?.intro && (
                    <motion.section variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}>
                        <div className="grid md:grid-cols-[1fr_3fr] gap-12 items-start">
                            <div>
                                <h2 className="text-xs uppercase tracking-[0.4em] text-[#9b8b7f] font-sans">About</h2>
                                <div className="mt-2 w-8 h-0.5 bg-[#2c2420]" />
                            </div>
                            <p className="text-2xl md:text-3xl text-[#3d3530] leading-relaxed font-light italic">
                                &ldquo;{synopsis.intro}&rdquo;
                            </p>
                        </div>
                    </motion.section>
                )}

                {/* SKILLS */}
                {skills?.length > 0 && (
                    <motion.section variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}>
                        <div className="grid md:grid-cols-[1fr_3fr] gap-12 items-start">
                            <div>
                                <h2 className="text-xs uppercase tracking-[0.4em] text-[#9b8b7f] font-sans">Expertise</h2>
                                <div className="mt-2 w-8 h-0.5 bg-[#2c2420]" />
                            </div>
                            <div className="flex flex-wrap gap-x-6 gap-y-3">
                                {skills.map((skill, i) => (
                                    <motion.span
                                        key={skill.id}
                                        initial={{ opacity: 0 }}
                                        whileInView={{ opacity: 1 }}
                                        viewport={{ once: true }}
                                        transition={{ delay: i * 0.05 }}
                                        className="text-base text-[#3d3530] border-b border-dashed border-[#c4b8ae] hover:border-[#3d3530] hover:text-[#1a1210] transition-colors cursor-default"
                                    >
                                        {skill.name}
                                    </motion.span>
                                ))}
                            </div>
                        </div>
                    </motion.section>
                )}

                {/* DIVIDER */}
                <div className="flex items-center gap-6">
                    <div className="flex-1 h-px bg-[#d8cec4]" />
                    <div className="text-[#c4b8ae] font-serif text-xl">&#9670;</div>
                    <div className="flex-1 h-px bg-[#d8cec4]" />
                </div>

                {/* EXPERIENCE */}
                {experiences?.length > 0 && (
                    <motion.section variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}>
                        <div className="grid md:grid-cols-[1fr_3fr] gap-12 items-start">
                            <div>
                                <h2 className="text-xs uppercase tracking-[0.4em] text-[#9b8b7f] font-sans">Experience</h2>
                                <div className="mt-2 w-8 h-0.5 bg-[#2c2420]" />
                            </div>
                            <div className="space-y-14">
                                {experiences.map((exp, i) => (
                                    <motion.div
                                        key={exp.id}
                                        initial={{ opacity: 0, y: 16 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        viewport={{ once: true }}
                                        transition={{ delay: i * 0.1 }}
                                        className="group"
                                    >
                                        <div className="flex flex-wrap items-baseline justify-between gap-4 mb-3">
                                            <div>
                                                <h3 className="text-2xl font-bold text-[#1a1210]">{exp.role}</h3>
                                                <p className="text-[#7a6a5f] text-sm font-sans mt-1 italic">{exp.company_name}</p>
                                            </div>
                                            <span className="text-xs font-sans text-[#9b8b7f] flex items-center gap-1.5 tabular-nums">
                                                <FiCalendar size={11} />
                                                {new Date(exp.start_date).getFullYear()} &ndash; {exp.is_current ? 'Present' : new Date(exp.end_date).getFullYear()}
                                            </span>
                                        </div>
                                        <ul className="space-y-2 ml-4 border-l-2 border-[#e8ddd4] pl-4">
                                            {exp.description_points?.slice(0, 3).map((point, idx) => (
                                                <li key={idx} className="text-sm text-[#5a4a3f] leading-relaxed list-none before:content-['—_'] before:text-[#c4b8ae]">
                                                    {point}
                                                </li>
                                            ))}
                                        </ul>
                                    </motion.div>
                                ))}
                            </div>
                        </div>
                    </motion.section>
                )}

                {/* DIVIDER */}
                <div className="flex items-center gap-6">
                    <div className="flex-1 h-px bg-[#d8cec4]" />
                    <div className="text-[#c4b8ae] font-serif text-xl">&#9670;</div>
                    <div className="flex-1 h-px bg-[#d8cec4]" />
                </div>

                {/* PROJECTS */}
                {projects?.length > 0 && (
                    <motion.section variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}>
                        <div className="grid md:grid-cols-[1fr_3fr] gap-12 items-start">
                            <div>
                                <h2 className="text-xs uppercase tracking-[0.4em] text-[#9b8b7f] font-sans">Selected Works</h2>
                                <div className="mt-2 w-8 h-0.5 bg-[#2c2420]" />
                            </div>
                            <div className="space-y-10">
                                {projects.map((project, i) => (
                                    <motion.div
                                        key={project.id}
                                        initial={{ opacity: 0, y: 16 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        viewport={{ once: true }}
                                        transition={{ delay: i * 0.1 }}
                                        onHoverStart={() => setHoveredProject(project.id)}
                                        onHoverEnd={() => setHoveredProject(null)}
                                        className="group border-b border-[#e8ddd4] pb-10 last:border-0 last:pb-0"
                                    >
                                        <div className="flex items-baseline justify-between gap-4 mb-2">
                                            <h3 className={`text-2xl font-bold transition-colors duration-300 ${hoveredProject === project.id ? 'text-[#6b4226]' : 'text-[#1a1210]'}`}>
                                                {project.title}
                                            </h3>
                                            <div className="flex gap-3 flex-shrink-0">
                                                {project.github_url && (
                                                    <a href={project.github_url} target="_blank" rel="noreferrer"
                                                        className="text-[#9b8b7f] hover:text-[#1a1210] transition-colors">
                                                        <FiGithub size={16} />
                                                    </a>
                                                )}
                                                {project.live_url && (
                                                    <a href={project.live_url} target="_blank" rel="noreferrer"
                                                        className="text-[#9b8b7f] hover:text-[#1a1210] transition-colors">
                                                        <FiArrowUpRight size={16} />
                                                    </a>
                                                )}
                                            </div>
                                        </div>
                                        <p className="text-sm text-[#7a6a5f] leading-relaxed mb-4 italic">{project.description}</p>
                                        <div className="flex flex-wrap gap-x-4 gap-y-1">
                                            {project.technologies?.slice(0, 5).map((tech, idx) => (
                                                <span key={idx} className="text-[11px] font-sans font-bold uppercase tracking-widest text-[#9b8b7f]">
                                                    {tech}{idx < Math.min(project.technologies.length, 5) - 1 ? ' ·' : ''}
                                                </span>
                                            ))}
                                        </div>
                                    </motion.div>
                                ))}
                            </div>
                        </div>
                    </motion.section>
                )}
            </main>

            {/* Footer */}
            <footer className="max-w-5xl mx-auto px-8 md:px-16 py-12 border-t-2 border-[#2c2420] mt-24">
                <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                    <p className="font-sans text-xs uppercase tracking-[0.4em] text-[#9b8b7f]">
                        &copy; {new Date().getFullYear()} &bull; {full_name}
                    </p>
                    <div className="flex gap-6">
                        {github_url && <a href={github_url} target="_blank" rel="noreferrer" className="text-[#9b8b7f] hover:text-[#1a1210] transition-colors"><FiGithub size={16} /></a>}
                        {linkedin_url && <a href={linkedin_url} target="_blank" rel="noreferrer" className="text-[#9b8b7f] hover:text-[#1a1210] transition-colors"><FiLinkedin size={16} /></a>}
                        {email && <a href={`mailto:${email}`} className="text-[#9b8b7f] hover:text-[#1a1210] transition-colors"><FiMail size={16} /></a>}
                    </div>
                </div>
            </footer>
        </div>
    );
};

export default PaperFolio;
