import React from 'react';
import { usePortfolioData } from '../../../../hooks/usePortfolioData';
import { motion, useScroll, useTransform } from 'framer-motion';
import { FiArrowRight, FiGithub, FiLinkedin, FiTwitter, FiMail, FiExternalLink, FiCommand, FiCode, FiLayers, FiTerminal, FiBriefcase } from 'react-icons/fi';

const CreativeGradient = () => {
    const { profile, synopsis, skills, experiences, projects, socialLinks, loading } = usePortfolioData();
    const { scrollYProgress } = useScroll();

    // Parallax logic for floating elements
    const y1 = useTransform(scrollYProgress, [0, 1], [0, -200]);
    const y2 = useTransform(scrollYProgress, [0, 1], [0, 150]);
    const rotate1 = useTransform(scrollYProgress, [0, 1], [0, 90]);
    const rotate2 = useTransform(scrollYProgress, [0, 1], [45, -45]);

    if (loading) {
        return (
            <div className="min-h-screen bg-[#0A0A0A] flex items-center justify-center">
                <div className="w-12 h-12 border-4 border-purple-500/20 border-t-purple-500 rounded-full animate-spin" />
            </div>
        );
    }

    const {
        full_name: displayName = "Your Name",
        tagline = "Engineering digital experiences through code and creative vision.",
        display_email,
        email: authEmail,
    } = profile || {};

    const email = display_email || authEmail || "";

    const github_url = socialLinks?.github || '';
    const linkedin_url = socialLinks?.linkedin || '';
    const twitter_url = socialLinks?.twitter || '';

    const overview = synopsis?.intro;

    const fadeInUp = {
        hidden: { opacity: 0, y: 40 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.2, 0.65, 0.3, 0.9] } }
    };

    return (
        <div className="min-h-screen bg-[#0A0A0A] text-slate-300 font-sans selection:bg-purple-500/30 selection:text-white overflow-hidden relative">

            {/* Animated Grid Background */}
            <div className="fixed inset-0 z-0 pointer-events-none opacity-[0.15]">
                <div className="absolute inset-0 bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]" />
            </div>

            {/* Glowing Ambient Orbs */}
            <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none mix-blend-screen">
                <div className="absolute top-[-20%] left-[-10%] w-[70vw] max-w-[800px] aspect-square rounded-full bg-purple-700/10 blur-[120px]" />
                <div className="absolute top-[40%] right-[-20%] w-[60vw] max-w-[700px] aspect-square rounded-full bg-blue-700/10 blur-[150px]" />
                <div className="absolute bottom-[-20%] left-[10%] w-[80vw] max-w-[1000px] aspect-square rounded-full bg-fuchsia-700/10 blur-[120px]" />
            </div>

            {/* Floating Vector Elements (Parallax) */}
            <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
                <motion.div style={{ y: y1, rotate: rotate1 }} className="absolute top-[15%] right-[10%] opacity-20 hidden lg:block">
                    <svg width="200" height="200" viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <circle cx="100" cy="100" r="99.5" stroke="url(#paint0_linear)" strokeDasharray="4 4" />
                        <circle cx="100" cy="100" r="79.5" stroke="url(#paint1_linear)" strokeDasharray="4 4" />
                        <circle cx="100" cy="100" r="59.5" stroke="url(#paint2_linear)" />
                        <defs>
                            <linearGradient id="paint0_linear" x1="0" y1="0" x2="200" y2="200" gradientUnits="userSpaceOnUse"><stop stopColor="#A855F7" /><stop offset="1" stopColor="#3B82F6" stopOpacity="0" /></linearGradient>
                            <linearGradient id="paint1_linear" x1="200" y1="0" x2="0" y2="200" gradientUnits="userSpaceOnUse"><stop stopColor="#3B82F6" /><stop offset="1" stopColor="#A855F7" stopOpacity="0" /></linearGradient>
                            <linearGradient id="paint2_linear" x1="0" y1="200" x2="200" y2="0" gradientUnits="userSpaceOnUse"><stop stopColor="#EC4899" /><stop offset="1" stopColor="#3B82F6" stopOpacity="0" /></linearGradient>
                        </defs>
                    </svg>
                </motion.div>

                <motion.div style={{ y: y2, rotate: rotate2 }} className="absolute bottom-[20%] left-[5%] opacity-20 hidden lg:block">
                    <svg width="150" height="150" viewBox="0 0 150 150" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <rect x="0.5" y="0.5" width="149" height="149" rx="19.5" stroke="url(#paint3_linear)" strokeDasharray="8 8" />
                        <path d="M75 25L125 75L75 125L25 75L75 25Z" stroke="url(#paint4_linear)" strokeWidth="1" />
                        <defs>
                            <linearGradient id="paint3_linear" x1="0" y1="0" x2="150" y2="150" gradientUnits="userSpaceOnUse"><stop stopColor="#3B82F6" /><stop offset="1" stopColor="#A855F7" stopOpacity="0" /></linearGradient>
                            <linearGradient id="paint4_linear" x1="150" y1="0" x2="0" y2="150" gradientUnits="userSpaceOnUse"><stop stopColor="#EC4899" /><stop offset="1" stopColor="#3B82F6" stopOpacity="0" /></linearGradient>
                        </defs>
                    </svg>
                </motion.div>
            </div>

            {/* Navigation */}
            <nav className="fixed top-0 w-full z-50 transition-all duration-300 bg-[#0A0A0A]/60 backdrop-blur-2xl border-b border-white/5">
                <div className="max-w-7xl mx-auto px-6 lg:px-12 h-[80px] flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <FiCommand className="w-5 h-5 text-purple-500" />
                        <span className="text-xl font-bold tracking-tight text-white cursor-default">
                            {displayName}
                        </span>
                    </div>

                    <div className="hidden md:flex gap-10 text-sm font-medium text-slate-400">
                        {projects.length > 0 && <a href="#work" className="hover:text-white transition-colors">Work</a>}
                        {experiences.length > 0 && <a href="#experience" className="hover:text-white transition-colors">Experience</a>}
                        {skills.length > 0 && <a href="#skills" className="hover:text-white transition-colors">Skills</a>}
                    </div>

                    {email && (
                        <a href={`mailto:${email}`} className="px-6 py-2.5 rounded-full bg-white/10 hover:bg-white/20 text-white text-sm font-medium transition-colors border border-white/10 backdrop-blur-md">
                            Contact
                        </a>
                    )}
                </div>
            </nav>

            <main className="relative z-10 pt-48 pb-32 px-6 lg:px-12 max-w-7xl mx-auto space-y-48">

                {/* Hero Section */}
                <section className="min-h-[60vh] flex flex-col justify-center items-start">
                    <motion.div initial="hidden" animate="visible" variants={fadeInUp} className="max-w-4xl">
                        <div className="inline-flex items-center gap-3 px-5 py-2.5 rounded-full bg-purple-500/10 border border-purple-500/20 text-sm text-purple-300 font-medium mb-12 backdrop-blur-md">
                            <span className="relative flex h-2.5 w-2.5">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-purple-400 opacity-75"></span>
                                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-purple-500"></span>
                            </span>
                            Pushing pixels & writing code
                        </div>

                        <h1 className="text-5xl md:text-7xl lg:text-[6rem] font-bold tracking-tighter mb-10 text-white leading-[1.05]">
                            Creative <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-blue-400 to-emerald-400">
                                Developer
                            </span>
                        </h1>

                        <p className="text-xl md:text-2xl text-slate-400 mb-14 max-w-2xl leading-relaxed font-light">
                            {tagline}
                        </p>

                        <div className="flex items-center gap-6">
                            {github_url && <SocialIcon href={github_url} icon={<FiGithub />} label="GitHub" />}
                            {linkedin_url && <SocialIcon href={linkedin_url} icon={<FiLinkedin />} label="LinkedIn" />}
                            {twitter_url && <SocialIcon href={twitter_url} icon={<FiTwitter />} label="Twitter" />}
                        </div>
                    </motion.div>
                </section>

                {/* Optional Overview */}
                {overview && (
                    <motion.section
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, margin: "-100px" }}
                        variants={fadeInUp}
                        className="max-w-3xl"
                    >
                        <div className="p-10 md:p-14 rounded-[2.5rem] bg-white/[0.02] border border-white/[0.05] backdrop-blur-3xl relative overflow-hidden group">
                            <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/10 rounded-full blur-[80px] pointer-events-none group-hover:bg-purple-500/10 transition-colors duration-1000" />
                            <FiTerminal className="w-8 h-8 text-slate-500 mb-8" />
                            <p className="text-2xl md:text-3xl text-slate-200 font-light leading-relaxed">
                                {overview}
                            </p>
                        </div>
                    </motion.section>
                )}

                {/* Projects Section */}
                {projects.length > 0 && (
                    <section id="work">
                        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
                            <div>
                                <h2 className="text-4xl md:text-5xl font-bold text-white mb-4 tracking-tight">Selected Work</h2>
                                <p className="text-lg text-slate-400">Projects I'm particularly proud of.</p>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {projects.map((project, index) => (
                                <ProjectCard key={project.id} project={project} index={index} />
                            ))}
                        </div>
                    </section>
                )}

                {/* Experience & Skills */}
                <div className="flex flex-col lg:flex-row gap-24 lg:gap-16">
                    {/* Experience section */}
                    {experiences.length > 0 && (
                        <section id="experience" className="flex-1">
                            <h2 className="text-3xl md:text-4xl font-bold text-white mb-12 flex items-center gap-4 tracking-tight">
                                <FiBriefcase className="text-purple-500" /> Experience
                            </h2>
                            <div className="space-y-12 pl-4 md:pl-0">
                                {experiences.map((exp, index) => (
                                    <motion.div
                                        key={exp.id}
                                        initial={{ opacity: 0, x: -20 }}
                                        whileInView={{ opacity: 1, x: 0 }}
                                        viewport={{ once: true }}
                                        transition={{ delay: index * 0.1 }}
                                        className="relative pl-8 md:pl-10 before:absolute before:left-0 before:top-2 before:bottom-[-3rem] before:w-[2px] before:bg-white/5 last:before:hidden"
                                    >
                                        <div className="absolute left-[-5px] top-2 w-3 h-3 rounded-full bg-purple-500 ring-4 ring-[#0A0A0A]" />

                                        <div className="mb-2 flex flex-col md:flex-row md:items-center gap-2 md:gap-4">
                                            <h3 className="font-bold text-white text-xl md:text-2xl">{exp.role}</h3>
                                            <span className="hidden md:block w-1.5 h-1.5 rounded-full bg-slate-600" />
                                            <span className="text-purple-400 font-medium">{exp.company_name}</span>
                                        </div>

                                        <div className="text-sm font-mono text-slate-500 mb-6 bg-white/5 inline-block px-3 py-1 rounded-md">
                                            {new Date(exp.start_date).getFullYear()} — {exp.is_current ? 'Present' : new Date(exp.end_date).getFullYear()}
                                        </div>

                                        {exp.description_points && exp.description_points.length > 0 && (
                                            <ul className="text-slate-400 text-base space-y-3">
                                                {exp.description_points.map((point, i) => (
                                                    <li key={i} className="flex gap-3">
                                                        <span className="text-purple-500/50 mt-1">▹</span>
                                                        <span className="leading-relaxed">{point}</span>
                                                    </li>
                                                ))}
                                            </ul>
                                        )}
                                    </motion.div>
                                ))}
                            </div>
                        </section>
                    )}

                    {/* Skills section */}
                    {skills.length > 0 && (
                        <section id="skills" className="lg:w-[400px]">
                            <h2 className="text-3xl md:text-4xl font-bold text-white mb-12 flex items-center gap-4 tracking-tight">
                                <FiCode className="text-blue-500" /> Expertise
                            </h2>

                            <div className="grid grid-cols-2 gap-4">
                                {skills.map((skill, index) => (
                                    <motion.div
                                        key={skill.id}
                                        initial={{ opacity: 0, scale: 0.95 }}
                                        whileInView={{ opacity: 1, scale: 1 }}
                                        viewport={{ once: true }}
                                        transition={{ delay: index * 0.05 }}
                                        className="p-4 rounded-xl bg-white/[0.02] border border-white/[0.05] hover:border-purple-500/30 hover:bg-white/[0.05] transition-all duration-300 group flex flex-col"
                                    >
                                        <span className="font-medium text-slate-200 block mb-1">{skill.name}</span>
                                        {skill.level && (
                                            <span className="text-xs text-slate-500 group-hover:text-purple-400 transition-colors uppercase tracking-wider">{skill.level}</span>
                                        )}
                                    </motion.div>
                                ))}
                            </div>
                        </section>
                    )}
                </div>

                {/* Contact Minimal */}
                <section className="pt-20 border-t border-white/10 relative">
                    <div className="flex flex-col md:flex-row items-center justify-between gap-10">
                        <div>
                            <h2 className="text-3xl md:text-5xl font-bold text-white mb-4">Let's build something.</h2>
                            <p className="text-slate-400 text-lg">My inbox is always open.</p>
                        </div>
                        {email && (
                            <a
                                href={`mailto:${email}`}
                                className="group relative inline-flex items-center justify-center gap-3 px-8 py-4 bg-white text-black text-lg font-bold rounded-full overflow-hidden transition-transform hover:scale-105"
                            >
                                <span className="absolute inset-0 bg-gradient-to-r from-purple-400 via-blue-400 to-emerald-400 opacity-0 group-hover:opacity-20 transition-opacity duration-500" />
                                <FiMail className="relative z-10" />
                                <span className="relative z-10">Say Hello</span>
                            </a>
                        )}
                    </div>
                </section>

                <footer className="text-center text-slate-600 font-mono text-sm pt-10">
                    &copy; {new Date().getFullYear()} {displayName}.
                </footer>
            </main>
        </div>
    );
};

const SocialIcon = ({ href, icon, label }) => {
    if (!href) return null;
    return (
        <a
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center w-12 h-12 rounded-full bg-white/[0.03] border border-white/[0.05] hover:bg-purple-500/20 hover:border-purple-500/50 hover:text-purple-400 transition-all duration-300 text-slate-400"
            aria-label={label}
        >
            <span className="text-xl">{icon}</span>
        </a>
    )
}

const ProjectCard = ({ project, index }) => (
    <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ delay: index * 0.1, duration: 0.5 }}
        viewport={{ once: true }}
        className="group flex flex-col rounded-[2rem] bg-white/[0.02] border border-white/[0.05] overflow-hidden hover:border-white/[0.1] transition-colors duration-500 relative"
    >
        <div className="aspect-[4/3] overflow-hidden relative bg-[#0F0F0F] p-6 lg:p-8">
            <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 to-transparent z-0" />

            {project.image_url ? (
                <img
                    src={project.image_url}
                    alt={project.title}
                    className="object-cover w-full h-full rounded-xl shadow-2xl relative z-10 group-hover:scale-[1.03] group-hover:-translate-y-2 transition-all duration-700 ease-out"
                />
            ) : (
                <div className="w-full h-full rounded-xl border border-white/5 bg-white/[0.02] flex flex-col items-center justify-center text-slate-600 relative z-10">
                    <FiLayers size={40} className="mb-4 opacity-50" />
                    <span className="text-xs font-mono uppercase tracking-widest opacity-50">Project Demo</span>
                </div>
            )}
        </div>

        <div className="p-8 flex-1 flex flex-col relative z-20 bg-[#0A0A0A] before:absolute before:inset-x-0 before:top-0 before:h-20 before:bg-gradient-to-b before:from-[#0A0A0A] before:to-transparent before:-translate-y-full">
            <h3 className="text-2xl font-bold mb-3 text-white tracking-tight">{project.title}</h3>
            <p className="text-slate-400 text-sm mb-8 flex-1 leading-relaxed">
                {project.description}
            </p>
            <div className="flex flex-wrap items-center gap-4 pt-4 border-t border-white/[0.05] mt-auto">
                {project.live_url && (
                    <a href={project.live_url} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 text-sm font-semibold text-white hover:text-purple-400 transition-colors bg-white/5 hover:bg-white/10 px-4 py-2 rounded-lg">
                        Live Preview <FiArrowRight />
                    </a>
                )}
                {project.github_url && (
                    <a href={project.github_url} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 text-sm font-medium text-slate-400 hover:text-white transition-colors px-4 py-2">
                        <FiGithub /> Source
                    </a>
                )}
            </div>
        </div>
    </motion.div>
);

export default CreativeGradient;

