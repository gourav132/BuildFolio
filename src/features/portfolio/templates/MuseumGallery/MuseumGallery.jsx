import React from 'react';
import { usePortfolioData } from '../../../../hooks/usePortfolioData';
import { motion, useScroll, useTransform } from 'framer-motion';
import { FiGithub, FiLinkedin, FiMail, FiArrowUpRight, FiMaximize2, FiImage, FiCompass } from 'react-icons/fi';
import { useParams } from 'react-router-dom';

const MuseumGallery = () => {
    const { userId } = useParams();
    const { profile, synopsis, skills, experiences, projects, socialLinks, loading } = usePortfolioData(userId);
    const { scrollYProgress } = useScroll();
    const yHero = useTransform(scrollYProgress, [0, 1], [0, 400]);

    if (loading) {
        return (
            <div className="min-h-screen bg-white flex items-center justify-center">
                <div className="w-16 h-1 bg-black overflow-hidden relative">
                    <div className="absolute top-0 left-0 h-full bg-gray-300 w-1/3 animate-[slide_1s_infinite_alternate_ease-in-out]" />
                </div>
            </div>
        );
    }

    const {
        full_name: displayName = "Artist",
        tagline = "Curating digital experiences.",
        display_email,
        email: authEmail,
        location = ""
    } = profile || {};

    const email = display_email || authEmail || "";

    const overview = synopsis?.intro;
    const { github, linkedin } = socialLinks || {};

    const Label = ({ title, number }) => (
        <div className="flex flex-col gap-1 mb-12">
            <span className="text-[10px] font-sans font-black uppercase tracking-[0.3em] text-gray-400">
                Exhibit {String(number).padStart(2, '0')}
            </span>
            <h2 className="text-sm font-sans uppercase tracking-widest text-black border-b border-gray-200 pb-4">
                {title}
            </h2>
        </div>
    );

    return (
        <div className="min-h-screen bg-white text-black font-serif selection:bg-black selection:text-white">

            {/* Strict Museum Nav */}
            <nav className="fixed top-0 w-full z-50 mix-blend-difference text-white p-6 sm:p-12 pointer-events-none">
                <div className="flex justify-between items-start font-sans text-xs font-bold uppercase tracking-widest pointer-events-auto">
                    <div className="hover:opacity-50 transition-opacity flex flex-col gap-1 cursor-pointer">
                        <span className="text-lg tracking-tighter hover:tracking-normal transition-all">{displayName}</span>
                        <span className="text-[9px] text-gray-400 tracking-[0.4em]">Gallery</span>
                    </div>
                    <div className="hidden md:flex gap-16">
                        {projects.length > 0 && <a href="#exhibitions" className="hover:opacity-50 transition-opacity">Exhibitions</a>}
                        {experiences.length > 0 && <a href="#history" className="hover:opacity-50 transition-opacity">History</a>}
                        {email && <a href={`mailto:${email}`} className="hover:opacity-50 transition-opacity">Contact</a>}
                    </div>
                </div>
            </nav>

            {/* Atrium (Hero) */}
            <section className="h-screen relative flex items-center justify-center overflow-hidden px-8">
                <motion.div
                    style={{ y: yHero }}
                    className="text-center z-10 w-full max-w-7xl mx-auto flex flex-col items-center"
                >
                    <motion.h1
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
                        className="text-6xl sm:text-8xl md:text-[10rem] lg:text-[14rem] font-light tracking-tighter leading-[0.85] text-black mix-blend-multiply"
                    >
                        {displayName.split(' ')[0]}
                    </motion.h1>
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.5, duration: 1.5 }}
                        className="mt-8 md:mt-16 flex flex-col md:flex-row items-center gap-6 text-sm font-sans uppercase tracking-[0.2em] text-gray-500"
                    >
                        <span>[ {tagline} ]</span>
                        {location && <span className="hidden md:inline">&mdash;</span>}
                        {location && <span>{location}</span>}
                    </motion.div>
                </motion.div>

                {/* Large architectural shape behind hero */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[60vw] h-[80vh] border border-gray-100 -z-10" />
            </section>

            {/* Plaque (About) */}
            {overview && (
                <section className="py-32 px-6 max-w-3xl mx-auto text-center border-t border-gray-100">
                    <FiCompass className="mx-auto text-gray-300 text-3xl mb-12 animate-pulse" />
                    <p className="text-2xl md:text-4xl leading-relaxed text-gray-800 font-light">
                        {overview}
                    </p>
                    {skills.length > 0 && (
                        <div className="mt-20 flex flex-wrap justify-center gap-4">
                            {skills.map(skill => (
                                <span key={skill.id} className="font-sans text-[10px] font-bold uppercase tracking-[0.2em] text-gray-500 border border-gray-200 px-4 py-2 hover:bg-black hover:text-white transition-colors cursor-default">
                                    {skill.name}
                                </span>
                            ))}
                        </div>
                    )}
                </section>
            )}

            {/* Exhibitions (Projects) */}
            {projects.length > 0 && (
                <section id="exhibitions" className="py-32 px-6 sm:px-12 md:px-24 border-t border-gray-100">
                    <div className="max-w-[1400px] mx-auto">
                        <Label title="Current Exhibitions" number={1} />

                        <div className="space-y-40 sm:space-y-64 pt-12">
                            {projects.map((project, i) => (
                                <motion.div
                                    key={project.id}
                                    initial={{ opacity: 0, y: 100 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true, margin: "-10%" }}
                                    transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
                                    className="flex flex-col lg:flex-row gap-8 lg:gap-24 items-center"
                                >
                                    {/* Artwork */}
                                    <div className={`w-full lg:w-3/5 ${i % 2 === 1 ? 'lg:order-2' : ''}`}>
                                        <div className="relative group overflow-hidden bg-gray-50 p-4 sm:p-12 shadow-[0_20px_60px_-15px_rgba(0,0,0,0.1)] transition-transform hover:-translate-y-2 duration-700">
                                            {project.image_url ? (
                                                <img
                                                    src={project.image_url}
                                                    alt={project.title}
                                                    className="w-full h-auto object-cover max-h-[70vh] shadow-lg"
                                                />
                                            ) : (
                                                <div className="w-full aspect-video flex items-center justify-center border border-dashed border-gray-300">
                                                    <FiImage size={40} className="text-gray-300" />
                                                </div>
                                            )}
                                        </div>
                                    </div>

                                    {/* Artist's Description */}
                                    <div className={`w-full lg:w-2/5 space-y-8 ${i % 2 === 1 ? 'lg:order-1' : ''}`}>
                                        <div>
                                            <h3 className="text-4xl sm:text-5xl lg:text-6xl font-light tracking-tighter mb-4">{project.title}</h3>
                                            <p className="font-sans text-[10px] font-bold uppercase tracking-[0.2em] text-gray-400">
                                                Mixed Media // {new Date().getFullYear()}
                                            </p>
                                        </div>
                                        <p className="text-lg text-gray-600 leading-relaxed font-light">
                                            {project.description}
                                        </p>
                                        <div className="flex flex-col gap-4 pt-6 border-t border-gray-100">
                                            {project.live_url && (
                                                <a href={project.live_url} target="_blank" rel="noreferrer" className="flex items-center justify-between group font-sans text-xs font-bold uppercase tracking-widest hover:text-gray-500">
                                                    <span>View Exhibition Room</span>
                                                    <FiArrowUpRight className="group-hover:-translate-y-1 group-hover:translate-x-1 transition-transform" />
                                                </a>
                                            )}
                                            {project.github_url && (
                                                <a href={project.github_url} target="_blank" rel="noreferrer" className="flex items-center justify-between group font-sans text-xs font-bold uppercase tracking-widest hover:text-gray-500">
                                                    <span>Technical Details</span>
                                                    <FiArrowUpRight className="group-hover:-translate-y-1 group-hover:translate-x-1 transition-transform" />
                                                </a>
                                            )}
                                        </div>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </section>
            )}

            {/* History (Experience) */}
            {experiences.length > 0 && (
                <section id="history" className="py-32 px-6 sm:px-12 md:px-24 bg-gray-50">
                    <div className="max-w-[1400px] mx-auto">
                        <Label title="Provenance & History" number={2} />

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-16 gap-y-24 pt-12">
                            {experiences.map((exp, i) => (
                                <motion.div
                                    key={exp.id}
                                    initial={{ opacity: 0, y: 30 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 1, delay: i * 0.1 }}
                                >
                                    <span className="font-sans text-[10px] font-bold uppercase tracking-[0.2em] text-gray-500 mb-4 block border-b border-gray-200 pb-2">
                                        {new Date(exp.start_date).getFullYear()} &mdash; {exp.is_current ? 'Present' : new Date(exp.end_date).getFullYear()}
                                    </span>
                                    <h4 className="text-2xl font-light mb-2">{exp.role}</h4>
                                    <p className="font-sans text-xs font-bold uppercase tracking-wider text-black mb-6">{exp.company_name}</p>

                                    <ul className="space-y-3">
                                        {exp.description_points?.map((pt, j) => (
                                            <li key={j} className="text-sm text-gray-600 leading-relaxed font-light line-clamp-3 hover:line-clamp-none transition-all">
                                                {pt}
                                            </li>
                                        ))}
                                    </ul>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </section>
            )}

            {/* Exit (Footer) */}
            <footer className="py-32 text-center border-t border-gray-100 flex flex-col items-center justify-center">
                <FiMaximize2 className="text-gray-300 text-3xl mb-12 hover:animate-spin transition-all duration-1000" />
                <h2 className="text-3xl md:text-5xl font-light tracking-tighter mb-12">Thank you for visiting.</h2>

                {email && (
                    <a href={`mailto:${email}`} className="text-xl md:text-3xl hover:opacity-50 transition-opacity mb-24 border-b border-black pb-2">
                        {email}
                    </a>
                )}

                <div className="flex gap-12 font-sans text-xs font-bold uppercase tracking-widest text-gray-400">
                    {github && <a href={github} target="_blank" rel="noreferrer" className="hover:text-black transition-colors">GitHub</a>}
                    {linkedin && <a href={linkedin} target="_blank" rel="noreferrer" className="hover:text-black transition-colors">LinkedIn</a>}
                </div>
            </footer>
        </div>
    );
};

export default MuseumGallery;
