import React from 'react';
import { usePortfolioData } from '../../../../hooks/usePortfolioData';
import { motion, useScroll, useTransform } from 'framer-motion';
import { FiGithub, FiLinkedin, FiMail, FiArrowRight, FiFeather, FiMapPin, FiGlobe } from 'react-icons/fi';
import { useParams } from 'react-router-dom';

const OrganicScroll = () => {
    const { userId } = useParams();
    const { profile, synopsis, skills, experiences, projects, socialLinks, loading } = usePortfolioData(userId);
    const { scrollYProgress } = useScroll();
    const yHero = useTransform(scrollYProgress, [0, 1], [0, 300]);
    const opacityHero = useTransform(scrollYProgress, [0, 0.2], [1, 0]);

    if (loading) {
        return (
            <div className="min-h-screen bg-[#F4F1ED] flex items-center justify-center">
                <FiFeather className="text-[#8B7355] w-8 h-8 animate-pulse" />
            </div>
        );
    }

    const {
        full_name: displayName = "Author",
        tagline = "Crafting natural and intuitive digital experiences.",
        display_email,
        email: authEmail,
        photo_url = "",
        location = "",
    } = profile || {};

    const email = display_email || authEmail || "";

    const overview = synopsis?.intro;
    const { github, linkedin } = socialLinks || {};

    return (
        <div className="bg-[#F4F1ED] text-[#4A4036] font-['Outfit',sans-serif] selection:bg-[#8B7355] selection:text-[#F4F1ED] overflow-x-hidden">

            {/* Header / Nav */}
            <nav className="fixed w-full top-0 z-50 px-6 py-6 mix-blend-difference text-[#F4F1ED]">
                <div className="flex justify-between items-center max-w-7xl mx-auto">
                    <span className="text-xl font-medium tracking-wide">{displayName}</span>
                    <div className="hidden md:flex gap-12 text-sm font-light">
                        {overview && <a href="#about" className="hover:opacity-70 transition-opacity">About</a>}
                        {projects.length > 0 && <a href="#works" className="hover:opacity-70 transition-opacity">Works</a>}
                        {experiences.length > 0 && <a href="#journey" className="hover:opacity-70 transition-opacity">Journey</a>}
                    </div>
                    {email && (
                        <a href={`mailto:${email}`} className="text-sm border border-[#F4F1ED]/30 px-6 py-2 rounded-full hover:bg-[#F4F1ED] hover:text-[#4A4036] transition-all">
                            Say Hello
                        </a>
                    )}
                </div>
            </nav>

            {/* Hero */}
            <section className="relative min-h-screen flex items-center justify-center px-6 pt-20 overflow-hidden">
                <motion.div
                    style={{ y: yHero, opacity: opacityHero }}
                    className="relative z-10 text-center max-w-5xl mx-auto"
                >
                    <motion.div
                        initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1 }}
                        className="mb-8 inline-flex items-center gap-2 text-[#8B7355] text-sm tracking-widest uppercase font-medium"
                    >
                        <FiFeather /> Digital Artisan
                    </motion.div>

                    <motion.h1
                        initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1, delay: 0.1 }}
                        className="text-6xl md:text-8xl lg:text-9xl font-light tracking-tighter mb-8 leading-[0.9]"
                    >
                        {displayName}
                    </motion.h1>

                    <motion.p
                        initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1, delay: 0.3 }}
                        className="text-xl md:text-3xl text-[#6B5A47] font-light max-w-2xl mx-auto leading-relaxed"
                    >
                        {tagline}
                    </motion.p>

                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.6, duration: 1 }} className="mt-16 text-xs text-[#8B7355] uppercase tracking-[0.2em]">
                        Scroll softly
                        <div className="w-[1px] h-12 bg-[#8B7355] mx-auto mt-4 animate-bounce" />
                    </motion.div>
                </motion.div>

                {/* Organic blob shapes */}
                <div className="absolute top-[-10%] left-[-10%] w-[50vw] h-[50vw] bg-[#E8E1D5] rounded-[40%_60%_70%_30%/40%_50%_60%_50%] blur-3xl opacity-50 animate-[spin_20s_linear_infinite]" />
                <div className="absolute bottom-[-10%] right-[-10%] w-[60vw] h-[60vw] bg-[#DCD1C4] rounded-[60%_40%_30%_70%/60%_30%_70%_40%] blur-3xl opacity-50 animate-[spin_25s_linear_infinite_reverse]" />
            </section>

            {/* About & Skills */}
            <section id="about" className="py-32 px-6 relative z-10 bg-[#F4F1ED]">
                <div className="max-w-7xl mx-auto flex flex-col md:flex-row gap-16 items-start">
                    <div className="md:w-1/3">
                        {photo_url && (
                            <motion.div
                                initial={{ opacity: 0, scale: 0.9 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ duration: 1 }}
                                className="w-full aspect-[3/4] rounded-[100px_100px_0_0] overflow-hidden"
                            >
                                <img src={photo_url} alt={displayName} className="w-full h-full object-cover grayscale-[30%] sepia-[20%]" />
                            </motion.div>
                        )}
                        {location && <p className="mt-6 flex items-center gap-2 text-[#8B7355] text-sm"><FiMapPin /> {location}</p>}
                    </div>

                    <div className="md:w-2/3 md:pt-12">
                        {overview && (
                            <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 1 }}>
                                <h2 className="text-sm font-medium tracking-widest text-[#8B7355] uppercase mb-8">About the Author</h2>
                                <p className="text-2xl md:text-4xl font-light leading-relaxed text-[#4A4036] mb-16">
                                    "{overview}"
                                </p>
                            </motion.div>
                        )}

                        {skills.length > 0 && (
                            <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 1 }}>
                                <h2 className="text-sm font-medium tracking-widest text-[#8B7355] uppercase mb-8">Capabilities</h2>
                                <div className="flex flex-wrap gap-3">
                                    {skills.map(skill => (
                                        <span key={skill.id} className="border border-[#DCD1C4] px-5 py-2 rounded-full text-sm hover:bg-[#DCD1C4] transition-colors cursor-default">
                                            {skill.name}
                                        </span>
                                    ))}
                                </div>
                            </motion.div>
                        )}
                    </div>
                </div>
            </section>

            {/* Works */}
            {projects.length > 0 && (
                <section id="works" className="py-32 px-6 bg-[#E8E1D5] relative overflow-hidden rounded-[40px_40px_0_0]">
                    <div className="max-w-7xl mx-auto">
                        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
                            <h2 className="text-sm font-medium tracking-widest text-[#8B7355] uppercase mb-20 text-center">Selected Works</h2>
                        </motion.div>

                        <div className="space-y-32">
                            {projects.map((project, i) => (
                                <motion.div
                                    key={project.id}
                                    initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-100px" }} transition={{ duration: 1 }}
                                    className={`flex flex-col ${i % 2 !== 0 ? 'md:flex-row-reverse' : 'md:flex-row'} items-center gap-12 lg:gap-24`}
                                >
                                    <div className="w-full md:w-1/2">
                                        <div className="aspect-[4/5] rounded-[100px_0_100px_0] overflow-hidden bg-[#DCD1C4]">
                                            {project.image_url ? (
                                                <img src={project.image_url} alt={project.title} className="w-full h-full object-cover hover:scale-105 transition-transform duration-[2s]" />
                                            ) : (
                                                <div className="w-full h-full flex items-center justify-center text-[#8B7355]/30"><FiGlobe size={64} /></div>
                                            )}
                                        </div>
                                    </div>

                                    <div className="w-full md:w-1/2 space-y-8">
                                        <span className="text-[#8B7355] text-sm tracking-widest font-medium">0{i + 1} //</span>
                                        <h3 className="text-4xl md:text-5xl lg:text-6xl font-light tracking-tight">{project.title}</h3>
                                        <p className="text-lg text-[#6B5A47] font-light leading-relaxed">{project.description}</p>

                                        <div className="flex flex-wrap gap-2 pt-4">
                                            {project.tags?.map((tag, t) => (
                                                <span key={t} className="text-xs uppercase tracking-wide text-[#8B7355] bg-[#F4F1ED] px-3 py-1 rounded-full">
                                                    {tag}
                                                </span>
                                            ))}
                                        </div>

                                        <div className="flex gap-6 pt-6 items-center">
                                            {project.live_url && (
                                                <a href={project.live_url} target="_blank" rel="noreferrer" className="flex items-center gap-2 group text-sm uppercase tracking-widest hover:text-[#8B7355] transition-colors">
                                                    Visit Website <FiArrowRight className="group-hover:translate-x-1 transition-transform" />
                                                </a>
                                            )}
                                            {project.github_url && (
                                                <a href={project.github_url} target="_blank" rel="noreferrer" className="text-[#8B7355] hover:text-[#4A4036] transition-colors p-2 aspect-square border border-[#8B7355]/20 rounded-full flex items-center justify-center">
                                                    <FiGithub />
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

            {/* Journey */}
            {experiences.length > 0 && (
                <section id="journey" className="py-32 px-6 bg-[#F4F1ED]">
                    <div className="max-w-4xl mx-auto">
                        <motion.h2 initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} className="text-sm font-medium tracking-widest text-[#8B7355] uppercase mb-20 text-center">
                            The Journey
                        </motion.h2>

                        <div className="space-y-16">
                            {experiences.map((exp, i) => (
                                <motion.div key={exp.id} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 * i }} className="flex gap-8 group">
                                    <div className="w-[1px] bg-[#DCD1C4] relative mt-2 group-last:bg-transparent">
                                        <div className="absolute top-0 -left-[3px] w-[7px] h-[7px] rounded-full bg-[#8B7355]" />
                                    </div>
                                    <div className="flex-1 pb-16 border-b border-[#DCD1C4] group-last:border-0 group-last:pb-0">
                                        <span className="text-sm text-[#8B7355] block mb-2 font-medium tracking-wide">
                                            {new Date(exp.start_date).getFullYear()} &rarr; {exp.is_current ? 'Present' : new Date(exp.end_date).getFullYear()}
                                        </span>
                                        <h3 className="text-3xl font-light mb-1">{exp.role}</h3>
                                        <p className="text-[#8B7355] font-medium tracking-wide text-sm mb-6">{exp.company_name}</p>
                                        <ul className="space-y-3">
                                            {exp.description_points?.map((pt, j) => (
                                                <li key={j} className="text-[#6B5A47] text-lg font-light leading-relaxed">
                                                    {pt}
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </section>
            )}

            {/* Footer */}
            <footer className="py-24 px-6 bg-[#4A4036] text-[#F4F1ED] text-center rounded-[40px_40px_0_0]">
                <h2 className="text-5xl md:text-7xl font-light tracking-tighter mb-12">Let's create together.</h2>
                {email && (
                    <a href={`mailto:${email}`} className="inline-block border border-[#F4F1ED]/30 rounded-full px-8 py-4 text-xl font-light hover:bg-[#F4F1ED] hover:text-[#4A4036] transition-colors mb-16">
                        {email}
                    </a>
                )}

                <div className="flex justify-center gap-8 mb-16">
                    {github && <a href={github} target="_blank" rel="noreferrer" className="hover:text-[#DCD1C4] transition-colors"><FiGithub size={24} /></a>}
                    {linkedin && <a href={linkedin} target="_blank" rel="noreferrer" className="hover:text-[#DCD1C4] transition-colors"><FiLinkedin size={24} /></a>}
                </div>

                <p className="text-[#DCD1C4]/50 text-sm font-light">
                    &copy; {new Date().getFullYear()} {displayName}. All rights beautifully reserved.
                </p>
            </footer>
        </div>
    );
};

export default OrganicScroll;
