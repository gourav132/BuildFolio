import React, { useState } from 'react';
import { usePortfolioData } from '../../../../hooks/usePortfolioData';
import { motion, AnimatePresence } from 'framer-motion';
import {
    FiArrowRight, FiGithub, FiLinkedin, FiMail,
    FiInstagram, FiTwitter, FiExternalLink, FiMapPin,
    FiCalendar, FiFolder
} from 'react-icons/fi';

/* ─── animation variants ────────────────────────────────── */
const fadeUp = {
    hidden: { opacity: 0, y: 28 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.9, ease: [0.16, 1, 0.3, 1] } }
};
const stagger = { visible: { transition: { staggerChildren: 0.12 } } };
const fadeLeft = {
    hidden: { opacity: 0, x: -20 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] } }
};

/* ─── small helpers ────────────────────────────────────── */
const Tag = ({ label }) => (
    <span className="inline-block text-[9px] font-bold uppercase tracking-[0.2em] text-stone-500 border border-stone-200 px-3 py-1 rounded-full">
        {label}
    </span>
);

const SocialIcon = ({ href, icon, label }) => {
    if (!href) return null;
    return (
        <a
            href={href} target="_blank" rel="noreferrer"
            aria-label={label}
            className="group flex items-center gap-2 text-stone-400 hover:text-stone-900 transition-colors duration-400"
        >
            <span className="text-base">{icon}</span>
            {label && (
                <span className="text-[10px] font-bold uppercase tracking-[0.3em] hidden sm:inline opacity-0 group-hover:opacity-100 transition-opacity">
                    {label}
                </span>
            )}
        </a>
    );
};

const SectionLabel = ({ number, title }) => (
    <div className="flex items-center gap-4 mb-10 sm:mb-16">
        <span className="text-[9px] font-black text-stone-300 tracking-[0.6em] uppercase">
            {String(number).padStart(2, '0')}
        </span>
        <div className="h-px flex-1 bg-stone-100" />
        <span className="text-[9px] font-black text-stone-300 tracking-[0.6em] uppercase">{title}</span>
    </div>
);

/* ─── main component ────────────────────────────────────── */
const Storyteller = () => {
    const { profile, synopsis, skills, experiences, projects, socialLinks, loading } = usePortfolioData();
    const [activeImg, setActiveImg] = useState(null);

    if (loading) {
        return (
            <div className="min-h-screen bg-[#F9F7F4] flex items-center justify-center">
                <div className="flex flex-col items-center gap-4">
                    <div className="w-8 h-8 border-[2.5px] border-stone-800 border-t-transparent rounded-full animate-spin" />
                    <span className="text-[10px] font-black uppercase tracking-[0.5em] text-stone-300">Loading</span>
                </div>
            </div>
        );
    }

    const {
        full_name: displayName = 'The Author',
        tagline = 'Weaving intricate digital stories through the intersection of code and intentional design.',
        display_email,
        email: authEmail,
        photo_url = '',
        location = '',
        headline = '',
    } = profile || {};

    const email = display_email || authEmail || '';

    const overview = synopsis?.intro;
    const github_url = socialLinks?.github || '';
    const linkedin_url = socialLinks?.linkedin || '';
    const twitter_url = socialLinks?.twitter || '';
    const instagram_url = socialLinks?.instagram || '';

    const initials = displayName?.split(' ').map(n => n[0]).join('') || 'ST';

    /* Group skills by category */
    const skillsByCategory = skills.reduce((acc, skill) => {
        const cat = skill.category || 'Other';
        if (!acc[cat]) acc[cat] = [];
        acc[cat].push(skill);
        return acc;
    }, {});

    return (
        <div className="bg-[#F9F7F4] text-[#1C1917] font-['Inter',_sans-serif] selection:bg-stone-900 selection:text-white overflow-x-hidden">

            {/* ══ STICKY NAV ══════════════════════════════════════ */}
            <nav className="sticky top-0 z-50 bg-[#F9F7F4]/90 backdrop-blur-md border-b border-stone-100">
                <div className="max-w-7xl mx-auto px-5 sm:px-10 h-14 flex items-center justify-between">
                    <a href="#about" className="font-serif italic text-stone-800 text-lg tracking-tight">
                        {displayName}.
                    </a>
                    <div className="flex items-center gap-8">
                        <div className="hidden md:flex gap-8 text-[10px] font-black uppercase tracking-[0.3em] text-stone-400">
                            {overview && <a href="#prologue" className="hover:text-stone-900 transition-colors">About</a>}
                            {skills.length > 0 && <a href="#arsenal" className="hover:text-stone-900 transition-colors">Skills</a>}
                            {projects.length > 0 && <a href="#work" className="hover:text-stone-900 transition-colors">Work</a>}
                            {experiences.length > 0 && <a href="#chronicle" className="hover:text-stone-900 transition-colors">Experience</a>}
                            <a href="#contact" className="hover:text-stone-900 transition-colors">Contact</a>
                        </div>
                        {email && (
                            <a
                                href={`mailto:${email}`}
                                className="text-[10px] font-black uppercase tracking-[0.3em] border border-stone-800 px-4 py-2 hover:bg-stone-900 hover:text-white transition-all duration-300"
                            >
                                Inquire
                            </a>
                        )}
                    </div>
                </div>
            </nav>

            {/* ══ 01. HERO ════════════════════════════════════════ */}
            <section id="about" className="min-h-[90vh] sm:min-h-screen flex flex-col justify-between px-5 sm:px-10 md:px-20 pt-16 md:pt-24 pb-12 relative overflow-hidden">

                {/* Large decorative initials */}
                <div className="absolute bottom-0 right-[-5%] text-[25vw] font-serif italic text-stone-100 pointer-events-none select-none leading-none">
                    {initials}
                </div>

                <motion.div
                    initial="hidden" animate="visible" variants={stagger}
                    className="max-w-6xl z-10"
                >
                    <motion.div variants={fadeUp} className="flex items-center gap-3 mb-10 sm:mb-16">
                        <div className="h-px w-10 bg-stone-300" />
                        <span className="text-[10px] font-black uppercase tracking-[0.7em] text-stone-400">
                            Digital Narrative by
                        </span>
                    </motion.div>

                    <div className="flex flex-col lg:flex-row lg:items-end gap-8 lg:gap-20">
                        <div className="flex-1">
                            <motion.h1
                                variants={fadeUp}
                                className="text-6xl sm:text-8xl md:text-[9rem] lg:text-[11rem] font-serif italic font-normal tracking-tighter leading-[0.85] text-stone-900 mb-8 sm:mb-12"
                            >
                                {displayName}<span className="text-stone-300">.</span>
                            </motion.h1>

                            <motion.p
                                variants={fadeUp}
                                className="text-xl sm:text-2xl md:text-3xl text-stone-500 font-light max-w-2xl leading-[1.4] tracking-tight"
                            >
                                {tagline}
                            </motion.p>

                            {(headline || location) && (
                                <motion.div variants={fadeUp} className="flex flex-wrap gap-5 mt-8 text-[11px] font-bold uppercase tracking-[0.3em] text-stone-400">
                                    {headline && <span>{headline}</span>}
                                    {location && (
                                        <span className="flex items-center gap-1.5">
                                            <FiMapPin size={11} /> {location}
                                        </span>
                                    )}
                                </motion.div>
                            )}
                        </div>

                        {/* Avatar */}
                        {photo_url && (
                            <motion.div
                                variants={fadeUp}
                                className="lg:w-64 xl:w-72 shrink-0"
                            >
                                <div className="relative w-48 sm:w-64 lg:w-full aspect-[3/4] overflow-hidden">
                                    <img
                                        src={photo_url} alt={displayName}
                                        className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-[2s]"
                                    />
                                    <div className="absolute inset-0 ring-1 ring-inset ring-stone-900/10" />
                                </div>
                            </motion.div>
                        )}
                    </div>
                </motion.div>

                {/* Social links at bottom */}
                <motion.div
                    initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.8, duration: 0.6 }}
                    className="flex gap-6 z-10 pt-12 sm:pt-16"
                >
                    <SocialIcon href={github_url} icon={<FiGithub />} label="GitHub" />
                    <SocialIcon href={linkedin_url} icon={<FiLinkedin />} label="LinkedIn" />
                    <SocialIcon href={twitter_url} icon={<FiTwitter />} label="Twitter" />
                    <SocialIcon href={instagram_url} icon={<FiInstagram />} label="Instagram" />
                    {email && <SocialIcon href={`mailto:${email}`} icon={<FiMail />} label="Email" />}
                </motion.div>
            </section>

            {/* ══ 02. PROLOGUE (OVERVIEW) ═════════════════════════ */}
            {overview && (
                <section id="prologue" className="py-20 sm:py-32 px-5 sm:px-10 md:px-20 border-t border-stone-100">
                    <div className="max-w-7xl mx-auto flex flex-col md:flex-row gap-12 md:gap-32 items-start">
                        <div className="md:w-1/4 md:sticky md:top-24">
                            <SectionLabel number={1} title="Prologue" />
                            <h2 className="text-3xl sm:text-4xl font-serif italic font-normal text-stone-900">The Context.</h2>
                        </div>
                        <div className="md:w-3/4 max-w-3xl">
                            <motion.div
                                whileInView={{ opacity: 1, y: 0 }} initial={{ opacity: 0, y: 30 }}
                                transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
                                viewport={{ once: true }}
                            >
                                <span className="text-6xl sm:text-8xl md:text-9xl float-left font-serif italic text-stone-200 leading-[0.6] mt-2 mr-4 select-none">"</span>
                                <p className="text-2xl sm:text-3xl md:text-4xl leading-[1.25] font-light tracking-tight text-stone-800">
                                    {overview}
                                </p>
                                <div className="clear-both" />
                                <div className="h-0.5 w-16 bg-stone-800 mt-10" />
                            </motion.div>
                        </div>
                    </div>
                </section>
            )}

            {/* ══ 03. SKILLS (THE ARSENAL) ════════════════════════ */}
            {skills.length > 0 && (
                <section id="arsenal" className="py-20 sm:py-32 px-5 sm:px-10 md:px-20 border-t border-stone-100">
                    <div className="max-w-7xl mx-auto">
                        <div className="flex flex-col md:flex-row gap-12 md:gap-32 items-start">
                            <div className="md:w-1/4 md:sticky md:top-24">
                                <SectionLabel number={2} title="Arsenal" />
                                <h2 className="text-3xl sm:text-4xl font-serif italic font-normal text-stone-900">The Craft.</h2>
                                <p className="text-sm text-stone-400 font-light mt-4 leading-relaxed">
                                    Tools and technologies I wield to bring ideas to life.
                                </p>
                            </div>
                            <div className="md:w-3/4">
                                {Object.keys(skillsByCategory).length > 1 ? (
                                    /* Categorised view */
                                    <div className="space-y-10">
                                        {Object.entries(skillsByCategory).map(([category, catSkills], i) => (
                                            <motion.div
                                                key={category}
                                                whileInView={{ opacity: 1, y: 0 }} initial={{ opacity: 0, y: 20 }}
                                                transition={{ duration: 0.7, delay: i * 0.08 }}
                                                viewport={{ once: true }}
                                            >
                                                <span className="text-[9px] font-black uppercase tracking-[0.5em] text-stone-300 block mb-4">
                                                    {category}
                                                </span>
                                                <div className="flex flex-wrap gap-2">
                                                    {catSkills.map(skill => (
                                                        <span
                                                            key={skill.id}
                                                            className="text-sm font-medium text-stone-700 bg-white border border-stone-200 px-4 py-2 rounded-full hover:border-stone-800 hover:text-stone-900 transition-colors duration-300 cursor-default"
                                                        >
                                                            {skill.name}
                                                        </span>
                                                    ))}
                                                </div>
                                            </motion.div>
                                        ))}
                                    </div>
                                ) : (
                                    /* Flat view — all one category */
                                    <motion.div
                                        whileInView={{ opacity: 1 }} initial={{ opacity: 0 }}
                                        viewport={{ once: true }}
                                        className="flex flex-wrap gap-2"
                                    >
                                        {skills.map((skill, i) => (
                                            <motion.span
                                                key={skill.id}
                                                whileInView={{ opacity: 1, scale: 1 }} initial={{ opacity: 0, scale: 0.9 }}
                                                transition={{ duration: 0.5, delay: i * 0.04 }}
                                                viewport={{ once: true }}
                                                className="text-sm font-medium text-stone-700 bg-white border border-stone-200 px-4 py-2 rounded-full hover:border-stone-800 hover:text-stone-900 transition-colors duration-300 cursor-default"
                                            >
                                                {skill.name}
                                            </motion.span>
                                        ))}
                                    </motion.div>
                                )}
                            </div>
                        </div>
                    </div>
                </section>
            )}

            {/* ══ 04. PROJECTS (ANTHOLOGY) ════════════════════════ */}
            {projects.length > 0 && (
                <section id="work" className="py-20 sm:py-32 border-t border-stone-100">
                    <div className="px-5 sm:px-10 md:px-20 max-w-7xl mx-auto mb-12 sm:mb-20">
                        <SectionLabel number={3} title="Selected Works" />
                        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
                            <h2 className="text-5xl sm:text-7xl md:text-8xl font-serif italic font-normal text-stone-900">Anthology.</h2>
                            <span className="text-[10px] font-mono text-stone-300 uppercase tracking-widest">
                                Vol. IV · {new Date().getFullYear()}
                            </span>
                        </div>
                    </div>

                    <div className="space-y-32 sm:space-y-48">
                        {projects.map((project, i) => (
                            <motion.article
                                key={project.id}
                                whileInView={{ opacity: 1, y: 0 }} initial={{ opacity: 0, y: 50 }}
                                transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
                                viewport={{ once: true, margin: '-80px' }}
                                className={`max-w-7xl mx-auto px-5 sm:px-10 flex flex-col ${i % 2 === 1 ? 'md:flex-row-reverse' : 'md:flex-row'} gap-10 md:gap-20 items-center`}
                            >
                                {/* Image */}
                                <div className="w-full md:w-3/5 group relative overflow-hidden">
                                    {project.image_url ? (
                                        <motion.img
                                            whileHover={{ scale: 1.04 }}
                                            transition={{ duration: 1.6, ease: [0.16, 1, 0.3, 1] }}
                                            src={project.image_url}
                                            alt={project.title}
                                            className="w-full aspect-[4/3] object-cover"
                                        />
                                    ) : (
                                        <div className="w-full aspect-[4/3] bg-stone-100 flex items-center justify-center text-stone-200">
                                            <FiFolder size={80} />
                                        </div>
                                    )}
                                    <div className="absolute inset-0 bg-stone-900/5 group-hover:bg-transparent transition-colors duration-700" />
                                </div>

                                {/* Meta */}
                                <div className="w-full md:w-2/5 space-y-6 sm:space-y-8">
                                    <div>
                                        <span className="text-[9px] font-black uppercase tracking-[0.5em] text-stone-300 block mb-3">
                                            Chapter 0{i + 1}
                                        </span>
                                        <h3 className="text-4xl sm:text-5xl md:text-6xl font-serif italic font-normal text-stone-900 leading-none">
                                            {project.title}<span className="text-stone-300">.</span>
                                        </h3>
                                    </div>

                                    <p className="text-base sm:text-lg text-stone-500 font-light leading-relaxed">
                                        {project.description}
                                    </p>

                                    {/* Tags */}
                                    {project.tags?.length > 0 && (
                                        <div className="flex flex-wrap gap-2">
                                            {project.tags.map((tag, k) => (
                                                <Tag key={k} label={tag} />
                                            ))}
                                        </div>
                                    )}

                                    {/* Links */}
                                    <div className="flex flex-wrap gap-6 pt-2">
                                        {project.live_url && (
                                            <a
                                                href={project.live_url} target="_blank" rel="noreferrer"
                                                className="group inline-flex items-center gap-4"
                                            >
                                                <div className="w-10 h-10 rounded-full border border-stone-200 flex items-center justify-center group-hover:bg-stone-900 group-hover:border-stone-900 group-hover:text-white transition-all duration-500">
                                                    <FiExternalLink size={14} />
                                                </div>
                                                <span className="text-[10px] font-black uppercase tracking-[0.3em] text-stone-700">Live</span>
                                            </a>
                                        )}
                                        {project.github_url && (
                                            <a
                                                href={project.github_url} target="_blank" rel="noreferrer"
                                                className="group inline-flex items-center gap-4"
                                            >
                                                <div className="w-10 h-10 rounded-full border border-stone-200 flex items-center justify-center group-hover:bg-stone-900 group-hover:border-stone-900 group-hover:text-white transition-all duration-500">
                                                    <FiGithub size={14} />
                                                </div>
                                                <span className="text-[10px] font-black uppercase tracking-[0.3em] text-stone-700">Source</span>
                                            </a>
                                        )}
                                    </div>
                                </div>
                            </motion.article>
                        ))}
                    </div>
                </section>
            )}

            {/* ══ 05. EXPERIENCE (CHRONICLE) ══════════════════════ */}
            {experiences.length > 0 && (
                <section id="chronicle" className="py-20 sm:py-32 bg-stone-900 text-white mt-20 sm:mt-32">
                    <div className="max-w-7xl mx-auto px-5 sm:px-10 md:px-20">
                        <SectionLabel number={4} title="The Professional Path" />
                        <div className="flex flex-col md:flex-row gap-12 md:gap-32 items-start mb-16 sm:mb-24">
                            <div className="md:w-1/4">
                                <h2 className="text-4xl sm:text-6xl md:text-7xl font-serif italic font-normal">Chronicle.</h2>
                            </div>
                            <div className="md:w-3/4">
                                <p className="text-stone-400 font-light text-lg leading-relaxed max-w-xl">
                                    A curated record of professional chapters — each role a distinct story arc.
                                </p>
                            </div>
                        </div>

                        <div className="space-y-0 border-l border-stone-700 ml-2 md:ml-6">
                            {experiences.map((exp, i) => (
                                <motion.div
                                    key={exp.id}
                                    whileInView={{ opacity: 1, x: 0 }} initial={{ opacity: 0, x: -20 }}
                                    transition={{ duration: 0.8, delay: i * 0.1 }}
                                    viewport={{ once: true }}
                                    className="relative pl-8 sm:pl-16 pb-16 sm:pb-24 group"
                                >
                                    {/* Timeline dot */}
                                    <div className="absolute -left-[5px] top-0 w-2.5 h-2.5 rounded-full bg-stone-700 border-2 border-stone-900 group-hover:bg-white group-hover:border-white transition-colors duration-500" />

                                    <div className="flex flex-col sm:flex-row sm:items-start gap-3 sm:gap-10 mb-6">
                                        <span className="text-[10px] font-black text-stone-500 tracking-[0.4em] uppercase sm:w-28 shrink-0 pt-1 font-mono">
                                            {new Date(exp.start_date).getFullYear()} — {exp.is_current ? 'Now' : new Date(exp.end_date).getFullYear()}
                                        </span>
                                        <div className="flex-1">
                                            <h4 className="text-3xl sm:text-4xl md:text-5xl font-serif italic font-normal group-hover:text-stone-300 transition-colors duration-500 leading-tight">
                                                {exp.role}
                                            </h4>
                                            <div className="flex flex-wrap items-center gap-3 mt-3">
                                                <p className="text-[10px] font-black uppercase tracking-[0.3em] text-stone-400">
                                                    {exp.company_name}
                                                </p>
                                                {exp.location && (
                                                    <>
                                                        <span className="text-stone-700 text-xs">·</span>
                                                        <span className="text-[10px] font-bold text-stone-500 flex items-center gap-1">
                                                            <FiMapPin size={9} />{exp.location}
                                                        </span>
                                                    </>
                                                )}
                                            </div>
                                        </div>
                                    </div>

                                    {/* Experience bullet points */}
                                    {exp.description_points?.length > 0 && (
                                        <ul className="sm:ml-[7.5rem] space-y-3 mb-8">
                                            {exp.description_points.map((point, j) => (
                                                <li key={j} className="flex gap-3 text-stone-400 font-light text-sm sm:text-base leading-relaxed group-hover:text-stone-300 transition-colors duration-500">
                                                    <span className="text-stone-600 shrink-0 mt-1 font-serif italic">—</span>
                                                    {point}
                                                </li>
                                            ))}
                                        </ul>
                                    )}
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </section>
            )}

            {/* ══ 06. CONTACT (EPILOGUE) ══════════════════════════ */}
            <motion.section
                id="contact"
                whileInView={{ opacity: 1 }} initial={{ opacity: 0 }}
                viewport={{ once: true }}
                className="py-24 sm:py-40 px-5 sm:px-10 text-center relative overflow-hidden"
            >
                {/* Background watermark */}
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none overflow-hidden">
                    <span className="text-[15vw] font-serif italic text-stone-100 font-light whitespace-nowrap">
                        Let's Talk.
                    </span>
                </div>

                <div className="relative z-10 max-w-4xl mx-auto">
                    <SectionLabel number={5} title="Epilogue" />
                    <h2 className="text-5xl sm:text-7xl md:text-[8rem] font-serif italic font-normal tracking-tighter text-stone-900 leading-[0.85] mb-10 sm:mb-16">
                        Send a Note<span className="text-stone-300">.</span>
                    </h2>

                    <p className="text-stone-500 font-light text-lg sm:text-xl max-w-xl mx-auto mb-12 leading-relaxed">
                        Whether it's a collaboration, an opportunity, or just a kind word — the door is always open.
                    </p>

                    {email && (
                        <a
                            href={`mailto:${email}`}
                            className="inline-flex items-center gap-4 group text-xl sm:text-3xl font-serif italic font-normal border-b-2 border-stone-900 pb-2 hover:opacity-40 transition-opacity break-all"
                        >
                            {email}
                        </a>
                    )}

                    <div className="mt-16 sm:mt-24 flex justify-center gap-8 sm:gap-12">
                        <SocialIcon href={github_url} icon={<FiGithub size={20} />} label="GitHub" />
                        <SocialIcon href={linkedin_url} icon={<FiLinkedin size={20} />} label="LinkedIn" />
                        <SocialIcon href={twitter_url} icon={<FiTwitter size={20} />} label="Twitter" />
                        <SocialIcon href={instagram_url} icon={<FiInstagram size={20} />} label="Instagram" />
                    </div>

                    <p className="mt-14 text-[10px] font-black uppercase tracking-[0.6em] text-stone-300">
                        © {new Date().getFullYear()} · {displayName?.toUpperCase()} · All Rights Reserved
                    </p>
                </div>
            </motion.section>

        </div>
    );
};

export default Storyteller;
