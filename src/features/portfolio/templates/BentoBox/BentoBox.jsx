import React, { useState, useEffect } from 'react';
import { usePortfolioData } from '../../../../hooks/usePortfolioData';
import { motion, AnimatePresence } from 'framer-motion';
import {
    FiGithub,
    FiLinkedin,
    FiMail,
    FiArrowUpRight,
    FiUser,
    FiBriefcase,
    FiZap,
    FiCommand,
    FiDownload,
    FiArrowRight,
    FiFolder,
    FiMapPin,
    FiExternalLink,
    FiClock,
    FiGlobe
} from 'react-icons/fi';

// --- Components ---

const BentoTile = ({ children, className = "", delay = 0, noPadding = false }) => (
    <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        whileInView={{ opacity: 1, scale: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, delay, ease: [0.22, 1, 0.36, 1] }}
        whileHover={{ y: -5, transition: { duration: 0.3 } }}
        className={`relative overflow-hidden rounded-[2.5rem] bg-zinc-900 border border-white/5 shadow-2xl group ${noPadding ? '' : 'p-8 md:p-10'} ${className}`}
    >
        {/* Glow Effect */}
        <div className="absolute -inset-1 bg-gradient-to-r from-indigo-500/10 to-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-700 blur-3xl" />
        <div className="relative z-10 h-full flex flex-col justify-between">
            {children}
        </div>
    </motion.div>
);

const SectionTitle = ({ children, className = "" }) => (
    <span className={`text-[10px] font-bold uppercase tracking-[0.6em] text-zinc-500 mb-6 block ${className}`}>
        {children}
    </span>
);

const BentoBox = () => {
    const { profile, synopsis, skills, experiences, projects, loading, error } = usePortfolioData();
    const [currentTime, setCurrentTime] = useState(new Date());

    useEffect(() => {
        const timer = setInterval(() => setCurrentTime(new Date()), 60000);
        return () => clearInterval(timer);
    }, []);

    if (loading) {
        return (
            <div className="min-h-screen bg-black flex flex-col items-center justify-center gap-6">
                <div className="w-16 h-16 border-t-4 border-indigo-500 border-solid rounded-full animate-spin" />
                <p className="text-zinc-500 font-medium tracking-widest text-xs uppercase">Initializing Experience...</p>
            </div>
        );
    }

    const {
        full_name: displayName = "Your Identity",
        tagline = "Crafting premium digital products with design precision.",
        display_email,
        email: authEmail,
        location,
        github_url = "",
        linkedin_url = "",
        profile_image = ""
    } = profile || {};

    const email = display_email || authEmail || "";

    const overview = synopsis?.intro;
    const services = synopsis?.services || [];

    return (
        <div className="min-h-screen bg-[#050505] text-zinc-300 font-['Geist','Inter',sans-serif] pb-32 selection:bg-indigo-500 selection:text-white">

            {/* Background Texture */}
            <div className="fixed inset-0 pointer-events-none opacity-20 bg-[radial-gradient(#222_1px,transparent_1px)] [background-size:40px_40px]" />
            <div className="fixed inset-0 bg-gradient-to-b from-transparent via-indigo-500/5 to-transparent pointer-events-none" />

            <main className="relative z-10 max-w-[1400px] mx-auto px-6 md:px-10 pt-16 md:pt-24 space-y-6">

                {/* 12-Column Grid Layout */}
                <div className="grid grid-cols-1 md:grid-cols-12 auto-rows-min gap-6">

                    {/* 1. Identity Tile (Large) */}
                    <BentoTile className="md:col-span-8 md:row-span-2 min-h-[400px]">
                        <div>
                            <div className="flex items-center gap-3 mb-10">
                                <motion.div
                                    animate={{ scale: [1, 1.2, 1] }}
                                    transition={{ repeat: Infinity, duration: 2 }}
                                    className="w-2.5 h-2.5 bg-green-500 rounded-full shadow-[0_0_10px_rgba(34,197,94,0.5)]"
                                />
                                <span className="text-[10px] font-bold uppercase tracking-[0.4em] text-zinc-500 leading-none mt-0.5">Active & Open to Projects</span>
                            </div>

                            <h1 className="text-5xl md:text-8xl font-bold tracking-tight text-white mb-8 leading-[0.95]">
                                {displayName}<span className="text-indigo-500">.</span>
                            </h1>
                            <p className="text-lg md:text-2xl text-zinc-400 max-w-2xl font-light leading-relaxed tracking-tight underline transition-all decoration-white/10 decoration-2 underline-offset-8 decoration-dotted hover:decoration-indigo-500/50">
                                {tagline}
                            </p>
                        </div>

                        <div className="flex items-center justify-between mt-auto pt-10">
                            <div className="flex -space-x-4">
                                {[github_url, linkedin_url, `mailto:${email}`].map((url, i) => (
                                    url && (
                                        <a key={i} href={url} target="_blank" rel="noreferrer" className="w-12 h-12 rounded-full bg-zinc-800 border-2 border-zinc-900 flex items-center justify-center text-white hover:bg-indigo-600 hover:-translate-y-1 transition-all">
                                            {i === 0 ? <FiGithub size={20} /> : i === 1 ? <FiLinkedin size={20} /> : <FiMail size={20} />}
                                        </a>
                                    )
                                ))}
                            </div>
                            <a href={`mailto:${email}`} className="bg-white text-black px-6 py-3 rounded-2xl text-sm font-bold flex items-center gap-2 hover:bg-indigo-500 hover:text-white transition-all">
                                Let's Talk <FiArrowUpRight size={18} />
                            </a>
                        </div>
                    </BentoTile>

                    {/* 2. Synopsis / Bio (Medium) */}
                    <BentoTile className="md:col-span-4 md:row-span-1" delay={0.1}>
                        <SectionTitle>Introduction</SectionTitle>
                        <h2 className="text-xl md:text-2xl text-white font-medium leading-relaxed tracking-tight italic">
                            "{overview || 'Transforming complex challenges into elegant, high-performance digital narratives with technical excellence.'}"
                        </h2>
                    </BentoTile>

                    {/* 3. Social / Meta Stats (Medium) */}
                    <BentoTile className="md:col-span-4 md:row-span-1 bg-gradient-to-br from-indigo-950/30 to-zinc-900" delay={0.2}>
                        <div className="flex justify-between items-start">
                            <SectionTitle>Realtime</SectionTitle>
                            <div className="text-white/20"><FiGlobe size={24} /></div>
                        </div>
                        <div className="mt-4">
                            <div className="text-4xl font-bold text-white tabular-nums tracking-tighter">
                                {currentTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                            </div>
                            <div className="text-zinc-500 text-[10px] font-bold uppercase tracking-widest mt-1">Local Time / GMT+5:30</div>
                        </div>
                        <div className="flex gap-4 mt-8">
                            <div className="flex-1 bg-white/5 rounded-2xl p-4 flex flex-col items-center justify-center">
                                <span className="text-2xl font-bold text-white tracking-widest leading-none">{projects.length || '0'}</span>
                                <span className="text-[9px] font-bold text-zinc-500 uppercase mt-2 tracking-widest">Units</span>
                            </div>
                            <div className="flex-1 bg-white/5 rounded-2xl p-4 flex flex-col items-center justify-center">
                                <span className="text-2xl font-bold text-white tracking-widest leading-none">{experiences.length || '0'}</span>
                                <span className="text-[9px] font-bold text-zinc-500 uppercase mt-2 tracking-widest">Log</span>
                            </div>
                        </div>
                    </BentoTile>

                    {/* 4. Skills Tile (Interactive) */}
                    <BentoTile className="md:col-span-5 md:row-span-1 relative overflow-hidden" delay={0.3}>
                        <SectionTitle>The Stack</SectionTitle>
                        <div className="flex flex-wrap gap-2 mt-2">
                            {skills.map((skill, i) => (
                                <motion.span
                                    key={skill.id}
                                    whileHover={{ scale: 1.1, color: '#fff' }}
                                    className="px-4 py-2 bg-zinc-800/50 rounded-xl text-sm font-medium border border-white/5 text-zinc-400 whitespace-nowrap"
                                >
                                    {skill.name}
                                </motion.span>
                            ))}
                        </div>
                    </BentoTile>

                    {/* 5. Experience Tile (Large/Vertical) */}
                    <BentoTile className="md:col-span-7 md:row-span-2" delay={0.4}>
                        <SectionTitle>Timeline</SectionTitle>
                        <div className="space-y-10 mt-4 overflow-y-auto max-h-[500px] pr-4 custom-scrollbar">
                            {experiences.map((exp, i) => (
                                <div key={exp.id} className="relative pl-8 border-l border-zinc-800 group/item">
                                    <div className="absolute top-0 left-[-4.5px] w-2 h-2 rounded-full bg-zinc-700 group-hover/item:bg-indigo-500 group-hover/item:scale-150 transition-all duration-300" />
                                    <div className="space-y-2">
                                        <div className="text-[10px] font-bold text-indigo-500 uppercase tracking-widest">
                                            {new Date(exp.start_date).getFullYear()} — {exp.is_current ? 'Present' : new Date(exp.end_date).getFullYear()}
                                        </div>
                                        <h3 className="text-2xl font-bold text-white group-hover/item:translate-x-2 transition-transform duration-300 tracking-tight">{exp.role}</h3>
                                        <p className="text-zinc-500 text-sm font-medium uppercase tracking-tight">{exp.company_name}</p>
                                        <ul className="mt-4 space-y-2">
                                            {exp.description_points?.slice(0, 2).map((point, idx) => (
                                                <li key={idx} className="text-sm text-zinc-400 flex items-start gap-3">
                                                    <span className="mt-1.5 w-1 h-1 bg-zinc-600 rounded-full flex-shrink-0" />
                                                    {point}
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </BentoTile>

                    {/* 6. Quick CTA / Location (Small) */}
                    <BentoTile className="md:col-span-5 md:row-span-1 justify-center items-center text-center bg-zinc-950" delay={0.5}>
                        <FiMapPin className="text-indigo-500 mb-4" size={32} />
                        <h4 className="text-xl font-bold text-white">{location || "Global Remote"}</h4>
                        <p className="text-zinc-500 text-sm mt-2 font-medium">Available for specialized freelance projects and full-time inquiries worldwide.</p>
                        <button className="mt-8 px-8 py-3 bg-zinc-800 rounded-2xl text-sm font-bold border border-white/5 hover:bg-zinc-700 transition-all">
                            Check Availability
                        </button>
                    </BentoTile>

                    {/* 7. Featured Projects (Mosaic Grid within Grid) */}
                    <div className="md:col-span-12 space-y-6">
                        <div className="px-4 flex items-end justify-between mb-2">
                            <div>
                                <SectionTitle className="!mb-2">Portfolio</SectionTitle>
                                <h2 className="text-4xl md:text-5xl font-bold text-white tracking-tighter">Featured <span className="text-zinc-800 font-outline-2 dark:text-zinc-500 italic">Work.</span></h2>
                            </div>
                            <div className="hidden md:block h-px flex-1 bg-zinc-900 mx-10 mb-5 opacity-50" />
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {projects.map((project, i) => (
                                <ProjectCard key={project.id} project={project} index={i} />
                            ))}
                        </div>
                    </div>

                </div>

                {/* Footer Credits */}
                <footer className="pt-40 text-center">
                    <div className="w-16 h-1 bg-indigo-600 mx-auto mb-10 rounded-full opacity-50" />
                    <p className="text-zinc-500 text-[10px] font-bold uppercase tracking-[0.8em]">
                        &copy; {new Date().getFullYear()} &bull; {displayName?.toUpperCase() || 'IDENTITY'} &bull; ENGINEERED BY INTENTION
                    </p>
                </footer>

            </main>
        </div>
    );
};

const ProjectCard = ({ project, index }) => (
    <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, delay: index * 0.1 }}
        whileHover={{ y: -8 }}
        className="group relative aspect-video md:aspect-[4/3] rounded-[2.5rem] overflow-hidden bg-zinc-900 border border-white/5 shadow-2xl cursor-pointer"
    >
        {project.image_url ? (
            <img
                src={project.image_url}
                alt={project.title}
                className="absolute inset-0 w-full h-full object-cover grayscale opacity-60 group-hover:grayscale-0 group-hover:scale-110 group-hover:opacity-100 transition-all duration-[1s] ease-[cubic-bezier(0.22,1,0.36,1)]"
            />
        ) : (
            <div className="absolute inset-0 flex items-center justify-center bg-zinc-800 text-zinc-600">
                <FiFolder size={64} />
            </div>
        )}

        {/* Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent flex flex-col justify-end p-8 md:p-10 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
            <div className="transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                <span className="text-indigo-400 text-[10px] font-bold uppercase tracking-widest">Project / 0{index + 1}</span>
                <h3 className="text-2xl md:text-3xl font-bold text-white mt-2 tracking-tight group-hover:text-indigo-100">{project.title}</h3>
                <p className="text-sm text-zinc-400 mt-4 line-clamp-2 max-w-sm tracking-tight leading-relaxed">
                    {project.description || 'Premium digital crafting and architectural engineering of modern web paradigms.'}
                </p>
                <div className="flex gap-4 mt-6">
                    {project.live_url && (
                        <a href={project.live_url} target="_blank" rel="noreferrer" className="w-10 h-10 bg-white/10 backdrop-blur-md rounded-full flex items-center justify-center text-white hover:bg-white transition-colors hover:text-black">
                            <FiExternalLink size={18} />
                        </a>
                    )}
                    {project.github_url && (
                        <a href={project.github_url} target="_blank" rel="noreferrer" className="w-10 h-10 bg-white/10 backdrop-blur-md rounded-full flex items-center justify-center text-white hover:bg-white transition-colors hover:text-black">
                            <FiGithub size={18} />
                        </a>
                    )}
                </div>
            </div>
        </div>

        {/* Title always visible on mobile/fallback */}
        <div className="absolute top-6 left-6 flex flex-col group-hover:opacity-0 transition-opacity duration-300">
            <h3 className="text-xl font-bold text-white tracking-widest drop-shadow-lg leading-none">{project.title}</h3>
        </div>
    </motion.div>
);

export default BentoBox;
