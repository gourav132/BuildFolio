import React from 'react';
import { usePortfolioData } from '../../../../hooks/usePortfolioData';
import { motion } from 'framer-motion';
import { FiGithub, FiLinkedin, FiMail, FiExternalLink, FiArrowRight, FiActivity, FiLayers, FiTerminal, FiFolder } from 'react-icons/fi';

const NeoBrutalism = () => {
    const { profile, synopsis, skills, experiences, projects, socialLinks, loading, error } = usePortfolioData();

    if (loading) {
        return (
            <div className="min-h-screen bg-[#050505] flex items-center justify-center">
                <div className="w-10 h-10 border-4 border-[#a1ff00] border-t-transparent rounded-full animate-spin" />
            </div>
        );
    }

    const {
        full_name: displayName = "USER CORE",
        tagline = "Engineered for the digital avant-garde. Building high-performance visual systems.",
        email = "",
    } = profile || {};

    const github_url = socialLinks.github || '';
    const linkedin_url = socialLinks.linkedin || '';
    const twitter_url = socialLinks.twitter || '';

    const overview = synopsis?.intro;

    return (
        <div className="min-h-screen bg-[#050505] text-white font-['Space_Grotesk',sans-serif] selection:bg-[#a1ff00] selection:text-black">
            {/* Tactical Grid Background */}
            <div className="fixed inset-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: 'radial-gradient(#fff 1px, transparent 1px)', backgroundSize: '40px 40px' }}></div>

            {/* Header / Nav */}
            <nav className="sticky top-0 z-50 flex justify-between items-center p-6 md:px-12 bg-[#050505]/80 backdrop-blur-xl border-b-[1px] border-white/10 uppercase tracking-widest text-[10px] font-bold">
                <div className="flex items-center gap-4">
                    <span className="bg-[#a1ff00] text-black px-2 py-0.5">V 2.0</span>
                    <span>{displayName || 'PROJECT_CORE'}</span>
                </div>
                <div className="hidden md:flex gap-8">
                    {projects.length > 0 && <a href="#works" className="hover:text-[#a1ff00] transition-colors">WORKS</a>}
                    {experiences.length > 0 && <a href="#combat" className="hover:text-[#a1ff00] transition-colors">RECORDS</a>}
                </div>
                <a href={`mailto:${email}`} className="text-[#a1ff00] border border-[#a1ff00] px-4 py-1 hover:bg-[#a1ff00] hover:text-black transition-all">
                    CONTACT_INIT
                </a>
            </nav>

            <main className="relative z-10 max-w-screen-2xl mx-auto px-6 py-12 md:py-24 space-y-32">

                {/* Hero Section - The "Streetwear" Identity */}
                <section className="relative">
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-0 border-[3px] border-white overflow-hidden shadow-[20px_20px_0px_#a1ff00]">
                        <div className="lg:col-span-8 p-8 md:p-16 bg-white text-black">
                            <div className="mb-12 flex items-center gap-2 text-[10px] font-black uppercase tracking-widest opacity-50">
                                <FiActivity className="text-red-600 animate-pulse" /> SYSTEM_ACTIVE // STATUS_STABLE
                            </div>
                            <h1 className="text-7xl md:text-[140px] font-black uppercase leading-[0.85] tracking-tighter mb-12 italic">
                                {displayName?.split(' ')[0] || 'USER'}<br />
                                <span className="underline decoration-[15px] decoration-[#a1ff00] underline-offset-[-10px]">
                                    {displayName?.split(' ')[1] || 'CORE'}
                                </span>
                            </h1>
                            <p className="text-xl md:text-2xl font-black uppercase max-w-xl leading-snug border-l-[12px] border-black pl-6 mb-12">
                                {tagline}
                            </p>
                            <div className="flex flex-wrap gap-4">
                                <SocialButton href={github_url} icon={<FiGithub />} label="GITHUB" />
                                <SocialButton href={linkedin_url} icon={<FiLinkedin />} label="LINKEDIN" />
                            </div>
                        </div>
                        <div className="lg:col-span-4 bg-[#a1ff00] text-black p-12 flex flex-col justify-between border-l-[3px] border-black">
                            <div>
                                <h2 className="text-4xl font-black uppercase mb-8 border-b-[4px] border-black pb-4">CORE_INTEL</h2>
                                <p className="text-xl font-bold leading-relaxed italic">
                                    "{overview || 'Technical precision meets aesthetic brutality. Minimalist framework, maximum impact. No compromises.'}"
                                </p>
                            </div>
                            <div className="text-[10px] font-black uppercase tracking-[0.3em] mt-12">
                                [ EST. {new Date().getFullYear()} ]
                            </div>
                        </div>
                    </div>
                </section>

                {/* Weapons Section - Industrial Grid */}
                {skills.length > 0 && (
                    <section>
                        <div className="flex items-center gap-4 mb-12">
                            <h2 className="text-5xl font-black uppercase tracking-tighter italic">THE_ARSENAL</h2>
                            <div className="flex-1 h-[2px] bg-white/20"></div>
                            <span className="text-[10px] font-bold opacity-50 uppercase">TECH_STACK // PROTOCOL_01</span>
                        </div>
                        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-0 border-[2px] border-white/20">
                            {skills.map((skill, i) => (
                                <motion.div
                                    key={skill.id}
                                    whileHover={{ backgroundColor: '#a1ff00', color: '#000' }}
                                    className="aspect-square border-[1px] border-white/20 flex flex-col items-center justify-center p-6 text-center transition-all cursor-crosshair group"
                                >
                                    <span className="text-[10px] font-black uppercase opacity-50 mb-4 group-hover:opacity-100">WEAPON_{i + 1}</span>
                                    <span className="text-xl font-black uppercase">{skill.name}</span>
                                </motion.div>
                            ))}
                        </div>
                    </section>
                )}

                {/* Projects Section - Visual Records */}
                <section id="works">
                    <div className="flex items-center gap-4 mb-16">
                        <h2 className="text-5xl font-black uppercase tracking-tighter italic">VISUAL_RECORDS</h2>
                        <div className="flex-1 h-[2px] bg-white/20"></div>
                        <span className="text-[10px] font-bold opacity-50 uppercase">COLLECTION_24</span>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                        {projects.map((project, i) => (
                            <motion.div
                                key={project.id}
                                className="group relative bg-[#111] border-[3px] border-white shadow-[0px_0px_0px_rgba(161,255,0,0)] hover:shadow-[15px_15px_0px_#a1ff00] transition-all duration-300"
                            >
                                <div className="aspect-[16/10] overflow-hidden border-b-[3px] border-white relative">
                                    {project.image_url ? (
                                        <img
                                            src={project.image_url}
                                            alt={project.title}
                                            className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500 scale-100 group-hover:scale-105"
                                        />
                                    ) : (
                                        <div className="w-full h-full flex items-center justify-center bg-[#111] text-white/20">
                                            <FiFolder size={64} />
                                        </div>
                                    )}
                                    <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center backdrop-blur-sm">
                                        <div className="flex flex-col gap-4">
                                            {project.live_url && (
                                                <a href={project.live_url} target="_blank" rel="noreferrer" className="bg-[#a1ff00] text-black font-black px-8 py-4 uppercase tracking-[0.2em] hover:scale-110 transition-transform text-center">
                                                    EXECUTE_LIVE
                                                </a>
                                            )}
                                            {project.github_url && (
                                                <a href={project.github_url} target="_blank" rel="noreferrer" className="bg-white text-black font-black px-8 py-4 uppercase tracking-[0.2em] hover:scale-110 transition-transform text-center">
                                                    VIEW_SOURCE
                                                </a>
                                            )}
                                        </div>
                                    </div>
                                </div>
                                <div className="p-8">
                                    <div className="flex justify-between items-start mb-4">
                                        <h3 className="text-3xl font-black uppercase italic tracking-tighter">{project.title}</h3>
                                        <span className="text-[10px] font-bold border border-white/30 px-2 py-0.5">REF_{i + 100}</span>
                                    </div>
                                    <p className="text-white/60 font-medium mb-6 leading-relaxed line-clamp-2 italic">{project.description}</p>
                                    <div className="flex gap-2 flex-wrap">
                                        {/* Since Supabase might not have sub-tech, we could use a text field or ellipsis */}
                                        <span className="text-[8px] font-black uppercase bg-white/10 px-2 py-1 tracking-widest">DEPLOYED</span>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </section>

                {/* Combat Records - Experience */}
                {experiences.length > 0 && (
                    <section id="combat">
                        <div className="flex items-center gap-4 mb-16">
                            <h2 className="text-5xl font-black uppercase tracking-tighter italic">COMBAT_RECORDS</h2>
                            <div className="flex-1 h-[2px] bg-white/20"></div>
                            <span className="text-[10px] font-bold opacity-50 uppercase">CAREER_TRAJECTORY</span>
                        </div>
                        <div className="space-y-0 border-l-[3px] border-white/20 ml-4 md:ml-0">
                            {experiences.map((exp, i) => (
                                <div key={exp.id} className="relative pl-12 pb-24 group">
                                    <div className="absolute left-[-11px] top-0 w-5 h-5 bg-[#050505] border-[3px] border-[#a1ff00] rotate-45 group-hover:scale-150 transition-transform"></div>
                                    <div className="flex flex-col md:flex-row md:items-center gap-4 mb-6">
                                        <span className="text-[#a1ff00] font-black text-sm tracking-[0.3em] font-mono leading-none">
                                            [{new Date(exp.start_date).getFullYear()} - {exp.is_current ? 'PRES' : new Date(exp.end_date).getFullYear()}]
                                        </span>
                                        <h3 className="text-4xl font-black uppercase italic leading-none">{exp.role}</h3>
                                    </div>
                                    <div className="inline-block bg-white text-black px-4 py-1 font-black uppercase text-xs mb-8">@{exp.company_name}</div>
                                    <ul className="space-y-4 max-w-4xl text-white/50 group-hover:text-white/90 transition-colors">
                                        {exp.description_points?.map((p, j) => (
                                            <li key={j} className="flex gap-4 font-bold text-lg leading-snug">
                                                <span className="text-[#a1ff00]">//</span>
                                                {p}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            ))}
                        </div>
                    </section>
                )}
            </main>

            {/* Footer - The Termination */}
            <footer className="mt-32 border-t-[3px] border-white p-12 bg-white text-black text-center">
                <h2 className="text-[150px] font-black uppercase leading-none tracking-tighter italic opacity-10 mb-[-50px]">TERMINATE</h2>
                <div className="relative z-10 flex flex-col items-center gap-8">
                    <p className="text-3xl font-black uppercase max-w-xl">READY TO COLLABORATE <br />ON THE NEXT GENERATION?</p>
                    <a href={`mailto:${email}`} className="text-3xl font-black border-b-[8px] border-black pb-2 hover:bg-[#a1ff00] transition-colors p-4">
                        {email || 'CONTACT@CORE.SYSTEM'}
                    </a>
                    <div className="flex gap-12 mt-12 text-[10px] font-black uppercase tracking-widest">
                        <span>DESIGNED_BY_AGENT</span>
                        <span>BUILD_FOLIO // V.24</span>
                        <span>NO_COPYRIGHT</span>
                    </div>
                </div>
            </footer>
        </div>
    );
};

const SocialButton = ({ href, icon, label }) => {
    if (!href) return null;
    return (
        <a href={href} target="_blank" rel="noreferrer" className="group flex items-center gap-3 bg-black text-white px-6 py-3 border-[3px] border-black hover:bg-[#a1ff00] hover:text-black hover:translate-x-1 hover:translate-y-1 hover:shadow-none shadow-[4px_4px_0px_#a1ff00] transition-all">
            <span className="text-xl">{icon}</span>
            <span className="text-xs font-black uppercase tracking-widest">{label}</span>
        </a>
    );
}

export default NeoBrutalism;
