import React from 'react';
import { usePortfolioData } from '../../../../hooks/usePortfolioData';
import { motion } from 'framer-motion';
import { FiGithub, FiLinkedin, FiMail, FiExternalLink, FiMapPin, FiFolder, FiTwitter, FiInstagram } from 'react-icons/fi';
import { useParams } from 'react-router-dom';

const GlassmorphismStudio = () => {
    const { userId } = useParams();
    const { profile, synopsis, skills, experiences, projects, socialLinks, loading } = usePortfolioData(userId);

    if (loading) {
        return (
            <div className="min-h-screen bg-[#0a0a0f] flex items-center justify-center">
                <div className="w-12 h-12 border-4 border-white/10 border-t-purple-500 rounded-full animate-spin" />
            </div>
        );
    }

    const {
        full_name: displayName = "Aesthetic Creator",
        tagline = "Crafting digital experiences through frosted glass and code.",
        display_email,
        email: authEmail,
        photo_url = "",
        location = ""
    } = profile || {};

    const email = display_email || authEmail || "";

    const overview = synopsis?.intro;
    const github_url = socialLinks?.github || '';
    const linkedin_url = socialLinks?.linkedin || '';
    const twitter_url = socialLinks?.twitter || '';
    const instagram_url = socialLinks?.instagram || '';

    return (
        <div className="min-h-screen bg-[#0a0a0f] text-white font-['Inter',sans-serif] selection:bg-purple-500/30 overflow-x-hidden relative">

            {/* Soft Ambient Orbs */}
            <div className="fixed top-[-10%] left-[-10%] w-[40vw] h-[40vw] rounded-full bg-purple-600/20 blur-[120px] pointer-events-none" />
            <div className="fixed bottom-[-10%] right-[-10%] w-[50vw] h-[50vw] rounded-full bg-blue-600/10 blur-[150px] pointer-events-none" />
            <div className="fixed top-[40%] left-[60%] w-[30vw] h-[30vw] rounded-full bg-pink-500/10 blur-[100px] pointer-events-none" />

            {/* Nav */}
            <nav className="fixed top-0 w-full z-50 p-4 sm:p-6">
                <div className="max-w-7xl mx-auto flex items-center justify-between bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl px-6 py-4 shadow-[0_8px_32px_0_rgba(0,0,0,0.3)]">
                    <span className="font-bold text-xl tracking-tighter bg-clip-text text-transparent bg-gradient-to-r from-white to-white/50">
                        {displayName}
                    </span>
                    <div className="hidden md:flex gap-8 text-sm font-medium text-white/70">
                        {projects.length > 0 && <a href="#works" className="hover:text-white transition-colors">Works</a>}
                        {skills.length > 0 && <a href="#skills" className="hover:text-white transition-colors">Skills</a>}
                        {experiences.length > 0 && <a href="#experience" className="hover:text-white transition-colors">Experience</a>}
                    </div>
                    {email && (
                        <a href={`mailto:${email}`} className="bg-white/10 hover:bg-white/20 border border-white/10 transition-all text-sm px-5 py-2 rounded-full">
                            Contact
                        </a>
                    )}
                </div>
            </nav>

            <main className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 pt-40 pb-24 space-y-32">

                {/* Hero */}
                <section className="flex flex-col-reverse lg:flex-row items-center gap-12 lg:gap-20">
                    <div className="flex-1 space-y-8 text-center lg:text-left">
                        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-sm text-white/70 backdrop-blur-sm">
                            <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" /> Available for work
                        </motion.div>
                        <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="text-5xl sm:text-7xl lg:text-8xl font-black tracking-tight leading-[1.1]">
                            Hi, I'm <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400">{displayName.split(' ')[0] || 'There'}</span>
                        </motion.h1>
                        <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="text-xl sm:text-2xl text-white/60 font-light max-w-2xl leading-relaxed mx-auto lg:mx-0">
                            {tagline}
                        </motion.p>
                        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="flex flex-wrap items-center justify-center lg:justify-start gap-4">
                            <SocialBtn href={github_url} icon={<FiGithub />} />
                            <SocialBtn href={linkedin_url} icon={<FiLinkedin />} />
                            <SocialBtn href={twitter_url} icon={<FiTwitter />} />
                            <SocialBtn href={instagram_url} icon={<FiInstagram />} />
                        </motion.div>
                    </div>

                    {photo_url && (
                        <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.8 }} className="w-64 h-64 sm:w-80 sm:h-80 lg:w-96 lg:h-96 shrink-0 relative">
                            <div className="absolute inset-0 bg-gradient-to-tr from-purple-500/20 to-blue-500/20 rounded-full blur-2xl" />
                            <img src={photo_url} alt={displayName} className="w-full h-full object-cover rounded-[2rem] border border-white/10 shadow-[0_8px_32px_0_rgba(0,0,0,0.3)]" />
                        </motion.div>
                    )}
                </section>

                {/* About & Skills (Glass Grid) */}
                <section id="skills" className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {overview && (
                        <GlassCard className="lg:col-span-2 p-8 sm:p-12">
                            <h2 className="text-2xl font-bold mb-6 text-white/90">About</h2>
                            <p className="text-white/60 text-lg leading-relaxed">{overview}</p>
                            {location && (
                                <div className="mt-8 flex items-center gap-2 text-white/40">
                                    <FiMapPin /> {location}
                                </div>
                            )}
                        </GlassCard>
                    )}
                    {skills.length > 0 && (
                        <GlassCard className="p-8 sm:p-12 lg:col-span-1">
                            <h2 className="text-2xl font-bold mb-6 text-white/90">Expertise</h2>
                            <div className="flex flex-wrap gap-2">
                                {skills.map(skill => (
                                    <span key={skill.id} className="px-4 py-2 rounded-xl bg-white/5 border border-white/10 text-sm font-medium text-white/80 shrink-0">
                                        {skill.name}
                                    </span>
                                ))}
                            </div>
                        </GlassCard>
                    )}
                </section>

                {/* Projects */}
                {projects.length > 0 && (
                    <section id="works" className="space-y-12">
                        <h2 className="text-4xl sm:text-5xl font-bold tracking-tight text-center lg:text-left">Featured Works</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {projects.map((project, i) => (
                                <motion.div key={project.id} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}>
                                    <GlassCard className="group overflow-hidden p-2">
                                        <div className="relative aspect-[16/10] overflow-hidden rounded-2xl bg-white/5 mb-6">
                                            {project.image_url ? (
                                                <img src={project.image_url} alt={project.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                                            ) : (
                                                <div className="w-full h-full flex items-center justify-center text-white/20"><FiFolder size={64} /></div>
                                            )}
                                        </div>
                                        <div className="p-6 pt-0">
                                            <div className="flex justify-between items-start mb-4">
                                                <h3 className="text-2xl font-bold text-white/90 group-hover:text-purple-400 transition-colors">{project.title}</h3>
                                                <div className="flex gap-2">
                                                    {project.github_url && <a href={project.github_url} target="_blank" rel="noreferrer" className="text-white/40 hover:text-white transition-colors p-2"><FiGithub /></a>}
                                                    {project.live_url && <a href={project.live_url} target="_blank" rel="noreferrer" className="text-white/40 hover:text-white transition-colors p-2"><FiExternalLink /></a>}
                                                </div>
                                            </div>
                                            <p className="text-white/60 mb-6 line-clamp-2">{project.description}</p>
                                            <div className="flex flex-wrap gap-2">
                                                {project.tags?.map((tag, k) => (
                                                    <span key={k} className="text-xs font-medium text-purple-300 px-3 py-1 rounded-lg bg-purple-500/10 border border-purple-500/20">
                                                        {tag}
                                                    </span>
                                                ))}
                                            </div>
                                        </div>
                                    </GlassCard>
                                </motion.div>
                            ))}
                        </div>
                    </section>
                )}

                {/* Experience */}
                {experiences.length > 0 && (
                    <section id="experience" className="max-w-4xl mx-auto space-y-12 pt-12">
                        <h2 className="text-4xl sm:text-5xl font-bold tracking-tight text-center">Experience</h2>
                        <div className="space-y-6">
                            {experiences.map((exp, i) => (
                                <motion.div key={exp.id} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}>
                                    <GlassCard className="p-8 sm:p-10 flex flex-col md:flex-row gap-8">
                                        <div className="md:w-1/3 shrink-0">
                                            <span className="text-sm font-semibold text-purple-400 tracking-wider uppercase mb-2 block">
                                                {new Date(exp.start_date).getFullYear()} — {exp.is_current ? 'Present' : new Date(exp.end_date).getFullYear()}
                                            </span>
                                            <h4 className="text-xl font-bold text-white/90">{exp.company_name}</h4>
                                            {exp.location && <span className="text-sm text-white/40 mt-1 block">{exp.location}</span>}
                                        </div>
                                        <div className="md:w-2/3">
                                            <h3 className="text-2xl font-bold text-white mb-4">{exp.role}</h3>
                                            {exp.description_points?.length > 0 && (
                                                <ul className="space-y-3">
                                                    {exp.description_points.map((pt, j) => (
                                                        <li key={j} className="text-white/60 flex gap-3">
                                                            <span className="text-purple-500 mt-1.5 shrink-0 text-xs">◆</span> {pt}
                                                        </li>
                                                    ))}
                                                </ul>
                                            )}
                                        </div>
                                    </GlassCard>
                                </motion.div>
                            ))}
                        </div>
                    </section>
                )}
            </main>

            {/* Footer */}
            <footer className="relative z-10 border-t border-white/10 mt-32">
                <div className="max-w-7xl mx-auto px-6 py-12 flex flex-col md:flex-row items-center justify-between gap-6 text-white/40 text-sm">
                    <p>© {new Date().getFullYear()} {displayName}. All rights reserved.</p>
                    <div className="flex gap-6">
                        {github_url && <a href={github_url} className="hover:text-white transition-colors">GitHub</a>}
                        {linkedin_url && <a href={linkedin_url} className="hover:text-white transition-colors">LinkedIn</a>}
                        {twitter_url && <a href={twitter_url} className="hover:text-white transition-colors">Twitter</a>}
                    </div>
                </div>
            </footer>
        </div>
    );
};

const GlassCard = ({ children, className = '' }) => (
    <div className={`bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl shadow-[0_8px_32px_0_rgba(0,0,0,0.3)] ${className}`}>
        {children}
    </div>
);

const SocialBtn = ({ href, icon }) => {
    if (!href) return null;
    return (
        <a href={href} target="_blank" rel="noreferrer" className="w-12 h-12 flex items-center justify-center rounded-2xl bg-white/5 border border-white/10 text-white/70 hover:bg-white/10 hover:text-white transition-all hover:scale-105">
            {icon}
        </a>
    )
}

export default GlassmorphismStudio;
