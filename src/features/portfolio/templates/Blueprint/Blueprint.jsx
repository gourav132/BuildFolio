import React from 'react';
import { usePortfolioData } from '../../../../hooks/usePortfolioData';
import { motion } from 'framer-motion';
import { FiGithub, FiLinkedin, FiMail, FiTerminal, FiDatabase, FiLayout, FiCpu, FiGlobe, FiCode } from 'react-icons/fi';
import { useParams } from 'react-router-dom';

const Blueprint = () => {
    const { userId } = useParams();
    const { profile, synopsis, skills, experiences, projects, socialLinks, loading } = usePortfolioData(userId);

    if (loading) {
        return (
            <div className="min-h-screen bg-[#001D3D] flex items-center justify-center">
                <FiCpu className="text-cyan-400 w-10 h-10 animate-spin" />
            </div>
        );
    }

    const {
        full_name: displayName = "DEV_SYSTEM",
        tagline = "Engineering scalable architectures and technical solutions.",
        display_email,
        email: authEmail,
        location = ""
    } = profile || {};

    const email = display_email || authEmail || "";

    const overview = synopsis?.intro;
    const { github, linkedin } = socialLinks || {};

    // Helper for technical drawing borders
    const Crosshair = () => (
        <svg className="absolute w-3 h-3 text-cyan-500/50 pointer-events-none" viewBox="0 0 12 12" fill="none">
            <path d="M6 0V12M0 6H12" stroke="currentColor" strokeWidth="1" />
        </svg>
    );

    return (
        <div className="min-h-screen bg-[#001D3D] text-[#E0FBFC] font-mono selection:bg-cyan-500/30 selection:text-white relative">

            {/* Blueprint Grid Background */}
            <div className="fixed inset-0 pointer-events-none opacity-20"
                style={{ backgroundImage: 'linear-gradient(#3D5A80 1px, transparent 1px), linear-gradient(90deg, #3D5A80 1px, transparent 1px)', backgroundSize: '40px 40px' }} />
            <div className="fixed inset-0 pointer-events-none opacity-10"
                style={{ backgroundImage: 'linear-gradient(#98C1D9 1px, transparent 1px), linear-gradient(90deg, #98C1D9 1px, transparent 1px)', backgroundSize: '160px 160px' }} />

            <div className="relative z-10 max-w-7xl mx-auto p-4 sm:p-8">

                {/* Header (Spec Sheet Title) */}
                <header className="border-2 border-cyan-500/50 bg-[#001D3D]/80 backdrop-blur-sm p-6 mb-12 relative flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
                    <Crosshair /><div className="absolute top-0 right-0"><Crosshair /></div>
                    <div className="absolute bottom-0 left-0"><Crosshair /></div><div className="absolute bottom-0 right-0"><Crosshair /></div>

                    <div>
                        <div className="flex items-center gap-4 mb-4 text-xs font-bold text-cyan-400 tracking-widest border-b border-cyan-500/30 pb-2 inline-flex">
                            <FiTerminal /> DOC_REF: PRTF-v2.0 // SPEC_SHEET
                        </div>
                        <h1 className="text-4xl sm:text-6xl font-black tracking-tighter uppercase text-white shadow-cyan-500/20 drop-shadow-[0_0_10px_rgba(34,211,238,0.5)]">
                            {displayName}
                        </h1>
                    </div>

                    <div className="text-right text-xs text-cyan-400/80 space-y-1">
                        <p>STATUS: <span className="text-green-400">ONLINE</span></p>
                        {location && <p>LOC: {location.toUpperCase()}</p>}
                        <p>REV: {new Date().toISOString().split('T')[0]}</p>
                    </div>
                </header>

                <main className="grid grid-cols-1 lg:grid-cols-12 gap-8">

                    {/* Left Column */}
                    <div className="lg:col-span-8 space-y-8">

                        {/* Summary / Architecture Overview */}
                        {overview && (
                            <section className="border border-cyan-500/30 bg-[#001D3D]/90 p-6 relative">
                                <h2 className="text-cyan-400 text-sm font-bold uppercase tracking-widest mb-4 flex items-center gap-2">
                                    <FiLayout /> Sec 1.0 // Architectural Overview
                                </h2>
                                <p className="text-sm sm:text-base leading-relaxed text-blue-100 max-w-3xl">
                                    {overview}
                                </p>
                                <div className="mt-4 border-l-2 border-cyan-500 pl-4 py-2 bg-cyan-950/30">
                                    <p className="text-sm font-bold text-white">{tagline}</p>
                                </div>
                            </section>
                        )}

                        {/* Projects (Modules) */}
                        {projects.length > 0 && (
                            <section className="border border-cyan-500/30 bg-[#001D3D]/90 p-6">
                                <h2 className="text-cyan-400 text-sm font-bold uppercase tracking-widest mb-8 flex items-center gap-2 border-b border-cyan-500/30 pb-4">
                                    <FiDatabase /> Sec 2.0 // Deployed Modules
                                </h2>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    {projects.map((project, i) => (
                                        <div key={project.id} className="border border-cyan-500/30 group hover:border-cyan-400 transition-colors p-4 relative">
                                            <div className="absolute top-0 right-0 bg-cyan-500/20 text-cyan-400 text-[10px] px-2 py-1 font-bold">
                                                MOD_{String(i + 1).padStart(2, '0')}
                                            </div>

                                            <h3 className="text-lg font-bold text-white mb-2 uppercase flex items-center gap-2 mt-4">
                                                <FiCode className="text-cyan-400" /> {project.title}
                                            </h3>
                                            <p className="text-xs text-blue-200 mb-4 line-clamp-3">
                                                {project.description}
                                            </p>

                                            <div className="flex flex-wrap gap-2 mb-6">
                                                {project.tags?.map((tag, k) => (
                                                    <span key={k} className="text-[10px] bg-cyan-950 text-cyan-300 border border-cyan-500/30 px-2 py-0.5">
                                                        {tag}
                                                    </span>
                                                ))}
                                            </div>

                                            <div className="flex gap-4 text-xs font-bold border-t border-cyan-500/30 pt-4">
                                                {project.live_url && (
                                                    <a href={project.live_url} target="_blank" rel="noreferrer" className="flex items-center gap-1 hover:text-cyan-400">
                                                        [EXECUTE]
                                                    </a>
                                                )}
                                                {project.github_url && (
                                                    <a href={project.github_url} target="_blank" rel="noreferrer" className="flex items-center gap-1 hover:text-cyan-400">
                                                        [SOURCE]
                                                    </a>
                                                )}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </section>
                        )}

                        {/* Experience (Logs) */}
                        {experiences.length > 0 && (
                            <section className="border border-cyan-500/30 bg-[#001D3D]/90 p-6">
                                <h2 className="text-cyan-400 text-sm font-bold uppercase tracking-widest mb-8 flex items-center gap-2 border-b border-cyan-500/30 pb-4">
                                    <FiTerminal /> Sec 3.0 // Execution Logs
                                </h2>
                                <div className="space-y-6">
                                    {experiences.map(exp => (
                                        <div key={exp.id} className="flex gap-4">
                                            <div className="w-[2px] bg-cyan-500/30 relative">
                                                <div className="absolute top-1 -left-[3px] w-2 h-2 bg-cyan-400 rounded-sm" />
                                            </div>
                                            <div className="flex-1 pb-6">
                                                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-baseline mb-2">
                                                    <h3 className="text-lg font-bold text-white uppercase">{exp.role}</h3>
                                                    <span className="text-xs text-cyan-500">
                                                        [{new Date(exp.start_date).getFullYear()}-{exp.is_current ? 'PRES' : new Date(exp.end_date).getFullYear()}]
                                                    </span>
                                                </div>
                                                <p className="text-sm text-cyan-300 mb-3 uppercase tracking-wider">{exp.company_name}</p>
                                                <ul className="space-y-2">
                                                    {exp.description_points?.map((pt, j) => (
                                                        <li key={j} className="text-xs text-blue-100 flex gap-2">
                                                            <span className="text-cyan-500 shrink-0">&gt;</span> {pt}
                                                        </li>
                                                    ))}
                                                </ul>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </section>
                        )}
                    </div>

                    {/* Right Column (Sidebar) */}
                    <aside className="lg:col-span-4 space-y-8">

                        {/* Specs (Skills) */}
                        {skills.length > 0 && (
                            <section className="border border-cyan-500/30 bg-[#001D3D]/90 p-6">
                                <h2 className="text-cyan-400 text-sm font-bold uppercase tracking-widest mb-4 border-b border-cyan-500/30 pb-2">
                                    Tech Specs
                                </h2>
                                <div className="space-y-4">
                                    {skills.map(skill => (
                                        <div key={skill.id} className="flex justify-between items-center text-xs">
                                            <span className="text-white uppercase">{skill.name}</span>
                                            <span className="text-cyan-500/50">.....</span>
                                            <span className="text-cyan-400 uppercase">{skill.category || 'SYS'}</span>
                                        </div>
                                    ))}
                                </div>
                            </section>
                        )}

                        {/* Comm Links */}
                        <section className="border border-cyan-500/30 bg-[#001D3D]/90 p-6">
                            <h2 className="text-cyan-400 text-sm font-bold uppercase tracking-widest mb-4 border-b border-cyan-500/30 pb-2">
                                Comm Links
                            </h2>
                            <div className="flex flex-col gap-3 text-sm">
                                {email && (
                                    <a href={`mailto:${email}`} className="flex items-center gap-3 hover:text-cyan-400 transition-colors bg-cyan-950/30 p-2 border border-cyan-500/20 break-all">
                                        <FiMail className="shrink-0" /> {email}
                                    </a>
                                )}
                                {github && (
                                    <a href={github} target="_blank" rel="noreferrer" className="flex items-center gap-3 hover:text-cyan-400 transition-colors bg-cyan-950/30 p-2 border border-cyan-500/20">
                                        <FiGithub className="shrink-0" /> GITHUB_REPO
                                    </a>
                                )}
                                {linkedin && (
                                    <a href={linkedin} target="_blank" rel="noreferrer" className="flex items-center gap-3 hover:text-cyan-400 transition-colors bg-cyan-950/30 p-2 border border-cyan-500/20">
                                        <FiLinkedin className="shrink-0" /> LINKEDIN_PROFILE
                                    </a>
                                )}
                            </div>
                        </section>

                        <div className="border border-cyan-500/30 p-4 text-center text-xs text-cyan-500/50 bg-[#001D3D]/90">
                            END OF SCHEMATIC <br />
                            <span className="tracking-widest mt-1 block">EOF</span>
                        </div>
                    </aside>

                </main>
            </div>
        </div>
    );
};

export default Blueprint;
