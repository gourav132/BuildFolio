import React from 'react';
import { usePortfolioData } from '../../../../hooks/usePortfolioData';
import { motion } from 'framer-motion';
import {
    FiArrowRight,
    FiGithub,
    FiLinkedin,
    FiMail,
    FiInstagram,
    FiTwitter,
    FiChevronDown,
    FiFolder
} from 'react-icons/fi';

const Storyteller = () => {
    const { profile, synopsis, skills, experiences, projects, socialLinks, loading, error } = usePortfolioData();

    if (loading) {
        return (
            <div className="min-h-screen bg-[#FCFBF7] flex items-center justify-center">
                <div className="w-10 h-10 border-4 border-zinc-900 border-t-transparent rounded-full animate-spin" />
            </div>
        );
    }

    const {
        full_name: displayName = "The Author",
        tagline = "Weaving intricate digital stories through the intersection of code and intentional design.",
        email = "",
    } = profile || {};

    const github_url = socialLinks.github || '';
    const linkedin_url = socialLinks.linkedin || '';
    const twitter_url = socialLinks.twitter || '';

    const overview = synopsis?.intro;

    const fadeInUp = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } }
    };

    const stagger = {
        visible: { transition: { staggerChildren: 0.1 } }
    };

    return (
        <div className="bg-[#FCFBF7] text-[#1A1A1A] font-['Inter',sans-serif] selection:bg-[#1A1A1A] selection:text-white pb-32 overflow-x-hidden">

            {/* 01. THE PREFACE (HERO) */}
            <section id="about" className="min-h-screen flex flex-col justify-between p-10 md:p-20 relative overflow-hidden">
                <div className="flex justify-between items-start z-10">
                    <span className="text-[10px] font-black uppercase tracking-[0.5em] text-zinc-300">Edition No. 04</span>
                    <nav className="hidden md:flex gap-10 text-[10px] font-black uppercase tracking-[0.3em]">
                        {projects.length > 0 && <a href="#work" className="hover:opacity-50 transition-opacity underline decoration-zinc-100 underline-offset-8">Archives</a>}
                        {experiences.length > 0 && <a href="#chronicle" className="hover:opacity-50 transition-opacity">Chronicle</a>}
                        <a href="#contact" className="hover:opacity-50 transition-opacity">Inquiries</a>
                    </nav>
                </div>

                <motion.div
                    initial="hidden"
                    animate="visible"
                    variants={stagger}
                    className="max-w-6xl z-10"
                >
                    <motion.span variants={fadeInUp} className="text-[11px] font-black uppercase tracking-[0.8em] text-zinc-400 mb-12 block">Digital Narrative by</motion.span>
                    <motion.h1
                        variants={fadeInUp}
                        className="text-7xl md:text-[11rem] font-serif italic font-normal tracking-tighter leading-[0.85] text-zinc-900 mb-12"
                    >
                        {displayName}.
                    </motion.h1>
                    <motion.p
                        variants={fadeInUp}
                        className="text-2xl md:text-4xl text-zinc-500 font-light max-w-2xl leading-[1.3] tracking-tight"
                    >
                        {tagline}
                    </motion.p>
                </motion.div>

                <div className="flex justify-between items-end z-10 pt-20">
                    <div className="flex gap-6">
                        <SocialLink href={github_url} icon={<FiGithub />} />
                        <SocialLink href={linkedin_url} icon={<FiLinkedin />} />
                        <SocialLink href={`mailto:${email}`} icon={<FiMail />} />
                    </div>
                    <div className="flex flex-col items-center gap-4 animate-bounce">
                        <span className="text-[9px] font-black uppercase tracking-widest text-zinc-200">Continue</span>
                        <FiChevronDown size={20} className="text-zinc-200" />
                    </div>
                </div>

                {/* Decorative Background Element */}
                <div className="absolute top-[20%] right-[-10%] text-[20vw] font-serif italic text-zinc-50 pointer-events-none select-none opacity-50 font-light uppercase">
                    {displayName?.split(' ')?.map(n => n[0])?.join('') || 'MS'}
                </div>
            </section>

            {/* 02. THE PROLOGUE (OVERVIEW) */}
            <section className="py-40 px-10 md:px-20 border-t border-zinc-100 flex flex-col md:flex-row gap-20 items-start">
                <div className="md:w-1/3 sticky top-40">
                    <span className="text-[10px] font-black uppercase tracking-[0.6em] text-zinc-300 block mb-6">01 — Prologue</span>
                    <h2 className="text-4xl font-serif italic font-normal text-zinc-900">The Context.</h2>
                </div>
                <div className="md:w-2/3 max-w-3xl space-y-16">
                    <motion.p
                        whileInView={{ opacity: 1 }}
                        initial={{ opacity: 0 }}
                        viewport={{ once: true }}
                        className="text-3xl md:text-5xl leading-[1.2] font-normal tracking-tighter text-zinc-800"
                    >
                        <span className="text-7xl mr-4 float-left font-serif italic text-zinc-200 leading-[0.5] mt-4">“</span>
                        {overview || 'Design is not just what it looks like and feels like. Design is how it works. I focus on creating digital longevity through craft and technical discipline.'}
                    </motion.p>
                    <div className="h-0.5 w-20 bg-zinc-900" />
                </div>
            </section>

            {/* 03. THE ANTHOLOGY (PROJECTS) */}
            {projects.length > 0 && (
                <section id="work" className="py-20 space-y-40">
                    <div className="px-10 md:px-20 flex justify-between items-end border-b border-zinc-50 pb-12">
                        <div className="space-y-4">
                            <span className="text-[10px] font-black uppercase tracking-[0.6em] text-zinc-300">Selected Works</span>
                            <h2 className="text-5xl md:text-8xl font-serif italic font-normal text-zinc-900">Anthology.</h2>
                        </div>
                        <span className="text-[11px] font-mono text-zinc-300 opacity-50 hidden md:block uppercase tracking-widest">/ volume iv . {new Date().getFullYear()}</span>
                    </div>

                    <div className="space-y-64">
                        {projects.map((project, i) => (
                            <motion.section
                                key={project.id}
                                whileInView={{ opacity: 1 }}
                                initial={{ opacity: 0 }}
                                viewport={{ once: true, margin: "-100px" }}
                                className={`max-w-7xl mx-auto px-10 flex flex-col ${i % 2 === 1 ? 'md:flex-row-reverse' : 'md:flex-row'} gap-20 items-center`}
                            >
                                <div className="md:w-3/5 group relative overflow-hidden rounded-2xl">
                                    {project.image_url ? (
                                        <motion.img
                                            whileHover={{ scale: 1.05 }}
                                            transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
                                            src={project.image_url}
                                            alt={project.title}
                                            className="w-full aspect-[4/5] md:aspect-[16/10] object-cover grayscale hover:grayscale-0 transition-all duration-[2s]"
                                        />
                                    ) : (
                                        <div className="w-full aspect-[4/5] md:aspect-[16/10] bg-zinc-50 flex items-center justify-center text-zinc-200">
                                            <FiFolder size={100} />
                                        </div>
                                    )}
                                    <div className="absolute inset-0 bg-zinc-900/10 group-hover:bg-transparent transition-colors duration-1000" />
                                </div>
                                <div className="md:w-2/5 space-y-10">
                                    <div className="space-y-4">
                                        <span className="text-[10px] font-black uppercase tracking-[0.4em] text-zinc-300">Chapter 0{i + 1}</span>
                                        <h3 className="text-5xl md:text-7xl font-serif italic font-normal text-zinc-900 leading-none">{project.title}.</h3>
                                    </div>
                                    <p className="text-lg md:text-xl text-zinc-500 font-light leading-relaxed">
                                        {project.description || 'Developing high-fidelity digital interfaces through deep empathy and technical precision.'}
                                    </p>
                                    <div className="pt-6 flex flex-wrap gap-8">
                                        {project.live_url && (
                                            <a href={project.live_url} target="_blank" rel="noreferrer" className="inline-flex items-center gap-6 group">
                                                <div className="w-12 h-12 rounded-full border border-zinc-100 flex items-center justify-center group-hover:bg-zinc-900 group-hover:text-white transition-all duration-500">
                                                    <FiArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
                                                </div>
                                                <span className="text-[11px] font-black uppercase tracking-[0.3em] text-zinc-900">Review Case</span>
                                            </a>
                                        )}
                                        {project.github_url && (
                                            <a href={project.github_url} target="_blank" rel="noreferrer" className="inline-flex items-center gap-6 group">
                                                <div className="w-12 h-12 rounded-full border border-zinc-100 flex items-center justify-center group-hover:bg-zinc-900 group-hover:text-white transition-all duration-500">
                                                    <FiGithub size={20} />
                                                </div>
                                                <span className="text-[11px] font-black uppercase tracking-[0.3em] text-zinc-900">Source</span>
                                            </a>
                                        )}
                                    </div>
                                </div>
                            </motion.section>
                        ))}
                    </div>
                </section>
            )}

            {/* 04. THE CHRONICLE (EXPERIENCE) */}
            {experiences.length > 0 && (
                <section id="chronicle" className="py-64 bg-[#1A1A1A] text-white px-10 md:px-20 mt-40">
                    <div className="max-w-7xl mx-auto flex flex-col md:flex-row gap-32">
                        <div className="md:w-1/3">
                            <span className="text-[10px] font-black uppercase tracking-[0.6em] text-zinc-500 block mb-8">The Professional Path</span>
                            <h2 className="text-5xl md:text-7xl font-serif italic font-normal">Chronicle.</h2>
                        </div>
                        <div className="md:w-2/3 space-y-32">
                            {experiences.map((exp, i) => (
                                <div key={exp.id} className="group flex flex-col md:flex-row gap-10 md:gap-24 relative">
                                    <div className="text-[11px] font-black text-zinc-500 w-32 tracking-[0.4em] uppercase pt-2 tabular-nums">
                                        {new Date(exp.start_date).getFullYear()} — {exp.is_current ? 'Present' : new Date(exp.end_date).getFullYear()}
                                    </div>
                                    <div className="flex-1 space-y-6 pb-20 border-b border-zinc-800 group-last:border-0">
                                        <h4 className="text-4xl md:text-5xl font-serif italic font-normal group-hover:text-zinc-400 transition-colors duration-500">
                                            {exp.role}
                                        </h4>
                                        <p className="text-xs font-black uppercase tracking-[0.2em] text-zinc-500">{exp.company_name}</p>
                                        <div className="mt-8 flex flex-wrap gap-4">
                                            {skills.slice(0, 3).map((skill, k) => (
                                                <span key={skill.id} className="text-[9px] font-black uppercase tracking-widest text-zinc-600 border border-zinc-800 px-3 py-1 rounded-full">
                                                    {skill.name}
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>
            )}

            {/* 05. THE EPILOGUE (CONTACT) */}
            <motion.section
                id="contact"
                whileInView={{ opacity: 1 }}
                initial={{ opacity: 0 }}
                viewport={{ once: true }}
                className="py-64 text-center px-10"
            >
                <span className="text-[10px] font-black uppercase tracking-[0.5em] text-zinc-300 block mb-12 animate-pulse">Available for Inquiry</span>
                <h2 className="text-6xl md:text-[10rem] font-serif italic font-normal tracking-tighter text-zinc-900 leading-[0.8] mb-24">
                    Send a Note.
                </h2>

                <div className="flex flex-col md:flex-row justify-center items-center gap-12">
                    <a
                        href={`mailto:${email}`}
                        className="text-2xl md:text-4xl font-serif italic font-normal border-b-2 border-zinc-900 pb-2 hover:opacity-50 transition-opacity"
                    >
                        {email || 'author@host.local'}
                    </a>
                </div>

                <div className="mt-64 flex flex-col items-center gap-10">
                    <div className="flex gap-10">
                        <SocialLink href={github_url} icon={<FiGithub size={20} />} />
                        <SocialLink href={linkedin_url} icon={<FiLinkedin size={20} />} />
                        <SocialLink href={twitter_url} icon={<FiTwitter size={20} />} />
                    </div>
                    <span className="text-[10px] font-black uppercase tracking-[0.8em] text-zinc-200">
                        &copy; {new Date().getFullYear()} &bull; {displayName?.toUpperCase() || 'YOU'} &bull; MANUSCRIPT_V04
                    </span>
                </div>
            </motion.section>

        </div>
    );
};

const SocialLink = ({ href, icon }) => {
    if (!href) return null;
    return (
        <a
            href={href}
            target="_blank"
            rel="noreferrer"
            className="w-10 h-10 flex items-center justify-center rounded-full border border-zinc-50 text-zinc-300 hover:border-zinc-900 hover:text-zinc-900 transition-all duration-500"
        >
            {icon}
        </a>
    )
}

export default Storyteller;
