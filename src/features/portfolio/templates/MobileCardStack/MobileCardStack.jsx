import React, { useState } from 'react';
import { usePortfolioData } from '../../../../hooks/usePortfolioData';
import { motion, AnimatePresence } from 'framer-motion';
import { FiGithub, FiLinkedin, FiMail, FiArrowRight, FiBriefcase, FiUser, FiCode, FiX, FiLink } from 'react-icons/fi';

const MobileCardStack = () => {
    const { profile, synopsis, skills, experiences, projects, socialLinks, loading } = usePortfolioData();
    const [activeCard, setActiveCard] = useState(null);

    // Stop body scroll when a card is expanded to prevent dual scrolling on mobile
    React.useEffect(() => {
        if (activeCard) document.body.style.overflow = 'hidden';
        else document.body.style.overflow = 'unset';
        return () => { document.body.style.overflow = 'unset'; }
    }, [activeCard]);

    if (loading) {
        return (
            <div className="min-h-[100dvh] bg-zinc-900 flex items-center justify-center">
                <div className="w-8 h-8 border-2 border-white/20 border-t-white rounded-full animate-spin" />
            </div>
        );
    }

    const {
        full_name: displayName = "User",
        tagline = "Welcome to my digital wallet.",
        display_email,
        email: authEmail,
        photo_url = "",
    } = profile || {};

    const email = display_email || authEmail || "";

    const overview = synopsis?.intro;
    const { github, linkedin } = socialLinks || {};

    const cards = [
        { id: 'profile', title: 'Profile & Skills', color: 'from-blue-600 to-indigo-900', icon: <FiUser /> },
        { id: 'projects', title: 'Featured Works', color: 'from-emerald-500 to-teal-900', icon: <FiCode /> },
        { id: 'experience', title: 'Experience', color: 'from-orange-500 to-red-900', icon: <FiBriefcase /> },
        { id: 'connect', title: 'Connect', color: 'from-purple-500 to-fuchsia-900', icon: <FiMail /> },
    ];

    const activeIndex = cards.findIndex(c => c.id === activeCard);

    return (
        <div className="h-[100dvh] bg-black text-white font-sans overflow-hidden relative w-full">

            {/* Background Header (Visible when stacked) */}
            <motion.div
                animate={{ opacity: activeCard ? 0 : 1, y: activeCard ? -50 : 0 }}
                transition={{ duration: 0.5 }}
                className="absolute top-0 left-0 w-full p-8 pt-16 z-0"
            >
                <h1 className="text-4xl font-black tracking-tight mb-2">{displayName}</h1>
                <p className="text-white/60 text-lg leading-relaxed max-w-sm">{tagline}</p>
                <div className="mt-8 text-sm font-bold text-white/30 uppercase tracking-widest animate-pulse">
                    Tap a card to open
                </div>
            </motion.div>

            {/* Wallet Card Stack */}
            <div className="absolute inset-x-0 bottom-0 h-full pointer-events-none max-w-lg mx-auto">
                {cards.map((card, i) => {
                    const isActive = activeCard === card.id;
                    const isAnyActive = activeCard !== null;

                    // Calculate Y position based on wallet logic
                    let yPos;
                    if (!isAnyActive) {
                        yPos = `calc(35dvh + ${i * 75}px)`;
                    } else if (isActive) {
                        yPos = '5dvh';
                    } else {
                        yPos = `calc(90dvh + ${i * 15}px)`;
                    }

                    return (
                        <motion.div
                            key={card.id}
                            initial={false}
                            animate={{ y: yPos }}
                            transition={{ type: 'spring', damping: 25, stiffness: 200, mass: 0.8 }}
                            className="absolute top-0 left-0 w-full pointer-events-auto px-2 sm:px-4"
                            style={{ zIndex: isActive ? 50 : i + 1 }}
                        >
                            <div
                                className={`w-full h-[95dvh] rounded-t-[3rem] sm:rounded-t-[4rem] bg-gradient-to-br ${card.color} shadow-[0_-10px_40px_rgba(0,0,0,0.5)] overflow-hidden flex flex-col cursor-pointer ring-1 ring-white/20`}
                                onClick={() => !isActive && setActiveCard(card.id)}
                            >
                                {/* Card Header */}
                                <div className="px-8 py-6 flex justify-between items-center shrink-0 bg-black/10 backdrop-blur-sm border-b border-white/10">
                                    <div className="flex items-center gap-3">
                                        <div className="p-2 bg-white/20 rounded-xl backdrop-blur-md">
                                            {card.icon}
                                        </div>
                                        <h2 className="text-xl sm:text-2xl font-bold tracking-tight shadow-black/50 drop-shadow-md">{card.title}</h2>
                                    </div>
                                    {isActive && (
                                        <button
                                            onClick={(e) => { e.stopPropagation(); setActiveCard(null); }}
                                            className="p-3 bg-black/40 hover:bg-black/60 rounded-full backdrop-blur-md transition-colors"
                                        >
                                            <FiX size={20} />
                                        </button>
                                    )}
                                </div>

                                {/* Deep Content View (Scrollable only when active) */}
                                <div className={`flex-1 overflow-y-auto no-scrollbar pb-32 ${isActive ? 'opacity-100' : 'opacity-0'} transition-opacity duration-300 delay-100`}>
                                    <div className="p-6 sm:p-8">

                                        {/* PROFILE CONTENT */}
                                        {card.id === 'profile' && (
                                            <div className="space-y-8 animate-in fade-in slide-in-from-bottom-10 duration-700">
                                                {photo_url && (
                                                    <div className="w-32 h-32 rounded-full border-4 border-white/20 overflow-hidden shadow-2xl mx-auto mb-6">
                                                        <img src={photo_url} alt="Profile" className="w-full h-full object-cover" />
                                                    </div>
                                                )}
                                                {overview && (
                                                    <div className="bg-black/20 backdrop-blur-md rounded-3xl p-6 border border-white/10">
                                                        <h3 className="text-sm font-bold uppercase tracking-widest text-white/50 mb-3">About</h3>
                                                        <p className="text-lg leading-relaxed text-white/90 shadow-black drop-shadow-sm">{overview}</p>
                                                    </div>
                                                )}
                                                {skills.length > 0 && (
                                                    <div className="bg-black/20 backdrop-blur-md rounded-3xl p-6 border border-white/10">
                                                        <h3 className="text-sm font-bold uppercase tracking-widest text-white/50 mb-4">Core Skills</h3>
                                                        <div className="flex flex-wrap gap-2">
                                                            {skills.map(skill => (
                                                                <span key={skill.id} className="bg-white/10 border border-white/20 px-4 py-2 rounded-xl text-sm font-semibold shadow-sm">
                                                                    {skill.name}
                                                                </span>
                                                            ))}
                                                        </div>
                                                    </div>
                                                )}
                                            </div>
                                        )}

                                        {/* PROJECTS CONTENT */}
                                        {card.id === 'projects' && (
                                            <div className="space-y-6 animate-in fade-in slide-in-from-bottom-10 duration-700">
                                                {projects.length === 0 ? <p className="text-white/50 text-center">No projects yet.</p> : null}
                                                {projects.map(project => (
                                                    <div key={project.id} className="bg-black/20 backdrop-blur-md border border-white/10 rounded-3xl overflow-hidden shadow-xl">
                                                        {project.image_url ? (
                                                            <img src={project.image_url} alt={project.title} className="w-full aspect-video object-cover" />
                                                        ) : (
                                                            <div className="w-full aspect-video bg-black/40 flex items-center justify-center">
                                                                <FiCode size={40} className="text-white/20" />
                                                            </div>
                                                        )}
                                                        <div className="p-6">
                                                            <h3 className="text-2xl font-bold tracking-tight mb-2 drop-shadow-md">{project.title}</h3>
                                                            <p className="text-white/80 leading-relaxed mb-6">{project.description}</p>
                                                            <div className="flex flex-wrap gap-2 mb-6">
                                                                {project.tags?.map((tag, k) => (
                                                                    <span key={k} className="text-xs font-bold bg-black/40 px-3 py-1.5 rounded-lg border border-white/10">
                                                                        {tag}
                                                                    </span>
                                                                ))}
                                                            </div>
                                                            <div className="flex gap-3">
                                                                {project.live_url && (
                                                                    <a href={project.live_url} target="_blank" rel="noreferrer" className="flex-1 bg-white text-black text-center py-3 rounded-xl font-bold text-sm hover:bg-gray-200 transition-colors flex items-center justify-center gap-2">
                                                                        View Live <FiArrowRight size={16} />
                                                                    </a>
                                                                )}
                                                                {project.github_url && (
                                                                    <a href={project.github_url} target="_blank" rel="noreferrer" className="w-12 h-12 bg-black/40 hover:bg-black/60 rounded-xl flex items-center justify-center transition-colors border border-white/10">
                                                                        <FiGithub size={20} />
                                                                    </a>
                                                                )}
                                                            </div>
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                        )}

                                        {/* EXPERIENCE CONTENT */}
                                        {card.id === 'experience' && (
                                            <div className="space-y-4 animate-in fade-in slide-in-from-bottom-10 duration-700">
                                                {experiences.length === 0 ? <p className="text-white/50 text-center">No experience listed.</p> : null}
                                                {experiences.map((exp, i) => (
                                                    <div key={exp.id} className="bg-black/20 backdrop-blur-md rounded-3xl p-6 sm:p-8 border border-white/10 shadow-xl relative overflow-hidden">
                                                        <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full blur-2xl -mr-10 -mt-10" />
                                                        <span className="inline-block bg-white/10 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-widest text-white mb-4 border border-white/20">
                                                            {new Date(exp.start_date).getFullYear()} — {exp.is_current ? 'Present' : new Date(exp.end_date).getFullYear()}
                                                        </span>
                                                        <h3 className="text-2xl font-bold tracking-tight mb-1 drop-shadow-md">{exp.role}</h3>
                                                        <p className="text-white/60 font-medium mb-6">@ {exp.company_name}</p>
                                                        <ul className="space-y-3">
                                                            {exp.description_points?.map((pt, j) => (
                                                                <li key={j} className="text-white/90 leading-relaxed flex gap-3">
                                                                    <span className="text-white mt-2 shrink-0 block w-1.5 h-1.5 rounded-full bg-white/50" />
                                                                    {pt}
                                                                </li>
                                                            ))}
                                                        </ul>
                                                    </div>
                                                ))}
                                            </div>
                                        )}

                                        {/* CONNECT CONTENT */}
                                        {card.id === 'connect' && (
                                            <div className="space-y-4 animate-in fade-in slide-in-from-bottom-10 duration-700 max-w-md mx-auto">
                                                {email && (
                                                    <a href={`mailto:${email}`} className="flex items-center justify-between bg-black/20 hover:bg-black/40 backdrop-blur-md rounded-3xl p-6 border border-white/10 transition-colors group">
                                                        <div className="flex items-center gap-4">
                                                            <div className="w-12 h-12 bg-white/10 rounded-2xl flex items-center justify-center text-xl">
                                                                <FiMail />
                                                            </div>
                                                            <div>
                                                                <p className="text-xs font-bold uppercase tracking-widest text-white/50 mb-1">Email</p>
                                                                <p className="font-semibold">{email}</p>
                                                            </div>
                                                        </div>
                                                        <FiArrowRight className="opacity-50 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
                                                    </a>
                                                )}
                                                {linkedin && (
                                                    <a href={linkedin} target="_blank" rel="noreferrer" className="flex items-center justify-between bg-black/20 hover:bg-black/40 backdrop-blur-md rounded-3xl p-6 border border-white/10 transition-colors group">
                                                        <div className="flex items-center gap-4">
                                                            <div className="w-12 h-12 bg-blue-500/20 text-blue-300 rounded-2xl flex items-center justify-center text-xl">
                                                                <FiLinkedin />
                                                            </div>
                                                            <div>
                                                                <p className="text-xs font-bold uppercase tracking-widest text-white/50 mb-1">LinkedIn</p>
                                                                <p className="font-semibold">Connect Professionally</p>
                                                            </div>
                                                        </div>
                                                        <FiArrowRight className="opacity-50 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
                                                    </a>
                                                )}
                                                {github && (
                                                    <a href={github} target="_blank" rel="noreferrer" className="flex items-center justify-between bg-black/20 hover:bg-black/40 backdrop-blur-md rounded-3xl p-6 border border-white/10 transition-colors group">
                                                        <div className="flex items-center gap-4">
                                                            <div className="w-12 h-12 bg-white/20 text-white rounded-2xl flex items-center justify-center text-xl">
                                                                <FiGithub />
                                                            </div>
                                                            <div>
                                                                <p className="text-xs font-bold uppercase tracking-widest text-white/50 mb-1">GitHub</p>
                                                                <p className="font-semibold">View Repositories</p>
                                                            </div>
                                                        </div>
                                                        <FiArrowRight className="opacity-50 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
                                                    </a>
                                                )}
                                            </div>
                                        )}

                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    );
                })}
            </div>
        </div>
    );
};

export default MobileCardStack;
