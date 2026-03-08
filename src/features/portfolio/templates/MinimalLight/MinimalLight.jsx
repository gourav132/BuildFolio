import React from 'react';
import { usePortfolioData } from '../../../../hooks/usePortfolioData';
import { FiGithub, FiLinkedin, FiMail, FiExternalLink, FiArrowRight, FiDownload, FiFolder } from 'react-icons/fi';
import { motion } from 'framer-motion';
import { useParams } from 'react-router-dom';

const MinimalLight = () => {
    const { userId } = useParams();
    const { profile, synopsis, skills, experiences, projects, socialLinks, loading } = usePortfolioData(userId);

    if (loading) {
        return (
            <div className="min-h-screen bg-[#fafafa] flex items-center justify-center">
                <div className="w-10 h-10 border-4 border-black border-t-transparent rounded-full animate-spin" />
            </div>
        );
    }

    const {
        full_name: displayName = "Your Name",
        tagline = "Creative Developer & Designer",
        display_email,
        email: authEmail,
    } = profile || {};

    const email = display_email || authEmail || "";

    const github_url = socialLinks.github || '';
    const linkedin_url = socialLinks.linkedin || '';
    const twitter_url = socialLinks.twitter || '';

    const overview = synopsis?.intro;
    const services = synopsis?.services || [];

    const fadeIn = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
    };

    const stagger = {
        visible: { transition: { staggerChildren: 0.1 } }
    };

    return (
        <div className="min-h-screen bg-[#fafafa] text-[#1a1a1a] font-['Inter'] selection:bg-black selection:text-white overflow-hidden">

            {/* Decorative Grid Background */}
            <div className="fixed inset-0 z-0 opacity-[0.03] pointer-events-none"
                style={{ backgroundImage: 'linear-gradient(#000 1px, transparent 1px), linear-gradient(90deg, #000 1px, transparent 1px)', backgroundSize: '40px 40px' }}
            />

            {/* Navigation */}
            <motion.nav
                initial={{ y: -20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.5 }}
                className="fixed top-0 left-0 right-0 z-50 bg-[#fafafa]/80 backdrop-blur-md border-b border-gray-200"
            >
                <div className="max-w-6xl mx-auto px-6 h-20 flex items-center justify-between">
                    <a href="#" className="font-['Playfair_Display'] text-xl font-bold tracking-tight">
                        {displayName.split(' ')[0]}.
                    </a>
                    <div className="hidden md:flex gap-8 text-sm font-medium text-gray-500">
                        <a href="#about" className="hover:text-black transition-colors">About</a>
                        {services.length > 0 && <a href="#services" className="hover:text-black transition-colors">Services</a>}
                        {projects.length > 0 && <a href="#work" className="hover:text-black transition-colors">Work</a>}
                        {experiences.length > 0 && <a href="#experience" className="hover:text-black transition-colors">Experience</a>}
                        <a href="#contact" className="hover:text-black transition-colors">Contact</a>
                    </div>
                    <a
                        href={`mailto:${email}`}
                        className="px-5 py-2 bg-black text-white text-sm font-medium rounded-full hover:bg-gray-800 transition-colors"
                    >
                        Let's Talk
                    </a>
                </div>
            </motion.nav>

            <main className="relative z-10 max-w-6xl mx-auto px-6 pt-32 pb-20">

                {/* Hero Section */}
                <section id="about" className="min-h-[85vh] flex flex-col justify-center mb-20">
                    <motion.div
                        initial="hidden"
                        animate="visible"
                        variants={stagger}
                        className="max-w-4xl"
                    >
                        <motion.div variants={fadeIn} className="flex items-center gap-3 mb-8">
                            <span className="h-[1px] w-12 bg-gray-400"></span>
                            <span className="text-gray-500 tracking-widest text-xs uppercase font-semibold">Portfolio {new Date().getFullYear()}</span>
                        </motion.div>

                        <motion.h1 variants={fadeIn} className="font-['Playfair_Display'] text-6xl md:text-8xl lg:text-9xl font-semibold tracking-tight mb-8 leading-[0.9] text-gray-900">
                            {displayName}
                        </motion.h1>

                        <motion.p variants={fadeIn} className="text-xl md:text-3xl text-gray-500 font-light max-w-2xl leading-relaxed mb-12">
                            {tagline}
                        </motion.p>

                        <motion.div variants={fadeIn} className="flex flex-wrap gap-6 items-center">
                            <div className="flex gap-4">
                                <SocialLink href={github_url} icon={<FiGithub />} label="GitHub" />
                                <SocialLink href={linkedin_url} icon={<FiLinkedin />} label="LinkedIn" />
                                <SocialLink href={twitter_url} icon={<FiExternalLink />} label="Twitter" />
                            </div>
                            <div className="h-px w-12 bg-gray-300 hidden md:block"></div>
                            <p className="text-sm text-gray-400 max-w-md hidden md:block">
                                {overview ? (overview.length > 150 ? overview.slice(0, 150) + "..." : overview) : "Creating digital experiences with a focus on motion, typography, and interaction."}
                            </p>
                        </motion.div>
                    </motion.div>
                </section>

                {/* Projects Section */}
                {projects && projects.length > 0 && (
                    <section id="work" className="mb-32">
                        <motion.div
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true }}
                            variants={fadeIn}
                            className="flex flex-col md:flex-row justify-between items-end mb-16 gap-4"
                        >
                            <div className="max-w-xl">
                                <h2 className="font-['Playfair_Display'] text-4xl md:text-5xl font-bold mb-4">Selected Works</h2>
                                <p className="text-gray-500">A showcase of engineering excellence and digital craftsmanship.</p>
                            </div>
                            <div className="hidden md:block h-px flex-1 bg-gray-100 mx-12 mb-4"></div>
                        </motion.div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                            {projects.map((project, index) => (
                                <motion.div
                                    key={project.id}
                                    initial={{ opacity: 0, y: 30 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    transition={{ delay: index * 0.1 }}
                                    viewport={{ once: true }}
                                    className="group cursor-pointer"
                                >
                                    <div className="relative aspect-[16/10] overflow-hidden bg-gray-100 mb-6">
                                        {project.image_url ? (
                                            <img
                                                src={project.image_url}
                                                alt={project.title}
                                                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                                            />
                                        ) : (
                                            <div className="w-full h-full flex items-center justify-center text-gray-300 bg-gray-50">
                                                <FiFolder size={48} />
                                            </div>
                                        )}
                                        <div className="absolute inset-0 bg-black/5 opacity-0 group-hover:opacity-100 transition-opacity" />
                                    </div>
                                    <div className="flex justify-between items-start">
                                        <div>
                                            <h3 className="text-xl font-bold mb-1">{project.title}</h3>
                                            <p className="text-gray-500 text-sm line-clamp-2 max-w-sm mb-4">{project.description}</p>
                                        </div>
                                        <div className="flex gap-3">
                                            {project.github_url && (
                                                <a href={project.github_url} target="_blank" rel="noreferrer" className="p-2 border border-gray-100 rounded-full hover:bg-black hover:text-white transition-all">
                                                    <FiGithub size={16} />
                                                </a>
                                            )}
                                            {project.live_url && (
                                                <a href={project.live_url} target="_blank" rel="noreferrer" className="p-2 border border-gray-100 rounded-full hover:bg-black hover:text-white transition-all">
                                                    <FiExternalLink size={16} />
                                                </a>
                                            )}
                                        </div>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </section>
                )}

                {/* Services Section */}
                {services && services.length > 0 && (
                    <section id="services" className="mb-32">
                        <motion.div
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true }}
                            variants={fadeIn}
                            className="flex flex-col md:flex-row justify-between items-start mb-16"
                        >
                            <h2 className="font-['Playfair_Display'] text-4xl md:text-5xl font-bold mb-4 md:mb-0">Expertise</h2>
                            <p className="text-gray-500 max-w-md">Driven by logic, defined by design. Specializing in modern web architectures.</p>
                        </motion.div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                            {services.map((service, index) => (
                                <motion.div
                                    key={index}
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    transition={{ delay: index * 0.1, duration: 0.5 }}
                                    viewport={{ once: true }}
                                    className="bg-white border border-gray-100 p-8 rounded-none hover:shadow-lg transition-shadow duration-300"
                                >
                                    <div className="w-12 h-12 bg-gray-50 rounded-full flex items-center justify-center mb-6 text-xl font-mono text-gray-400">
                                        {(index + 1).toString().padStart(2, '0')}
                                    </div>
                                    <h3 className="text-xl font-bold mb-3">{service}</h3>
                                    <p className="text-gray-500 text-sm leading-relaxed">
                                        Focusing on {service} to deliver high-performance and scalable digital solutions.
                                    </p>
                                </motion.div>
                            ))}
                        </div>
                    </section>
                )}

                {/* Experience Section */}
                {experiences && experiences.length > 0 && (
                    <section id="experience" className="mb-32 bg-white border border-gray-100 p-8 md:p-16 relative overflow-hidden">
                        <div className="absolute top-0 right-0 p-4 opacity-[0.02]">
                            <FiArrowRight size={200} />
                        </div>

                        <motion.div
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true }}
                            variants={fadeIn}
                            className="mb-16"
                        >
                            <h2 className="font-['Playfair_Display'] text-4xl md:text-5xl font-bold mb-2">Milestones</h2>
                            <div className="w-20 h-1 bg-black"></div>
                        </motion.div>

                        <div className="space-y-0 divide-y divide-gray-100">
                            {experiences.map((exp, index) => (
                                <motion.div
                                    key={exp.id}
                                    initial={{ opacity: 0, x: -20 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    transition={{ delay: index * 0.1 }}
                                    viewport={{ once: true }}
                                    className="py-12 grid grid-cols-1 md:grid-cols-12 gap-6 group hover:bg-gray-50 rounded-lg px-4 transition-colors"
                                >
                                    <div className="md:col-span-3">
                                        <span className="text-sm font-mono text-gray-400">
                                            {new Date(exp.start_date).toLocaleDateString(undefined, { month: 'short', year: 'numeric' })} — {exp.is_current ? 'Present' : new Date(exp.end_date).toLocaleDateString(undefined, { month: 'short', year: 'numeric' })}
                                        </span>
                                    </div>
                                    <div className="md:col-span-9">
                                        <h3 className="text-2xl font-bold mb-1 group-hover:translate-x-2 transition-transform duration-300">{exp.role}</h3>
                                        <div className="text-gray-500 font-medium mb-4">{exp.company_name}</div>
                                        <ul className="space-y-3">
                                            {exp.description_points && exp.description_points.map((point, i) => (
                                                <li key={i} className="text-gray-600 text-sm flex items-start gap-3">
                                                    <span className="mt-1.5 w-1 h-1 bg-gray-300 rounded-full flex-shrink-0"></span>
                                                    {point}
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </section>
                )}

                {/* Skills Section */}
                {skills && skills.length > 0 && (
                    <section id="skills" className="mb-32 pt-12 border-t border-gray-100">
                        <h2 className="font-['Playfair_Display'] text-4xl md:text-5xl font-bold mb-12 text-center">Stack</h2>

                        <div className="flex flex-wrap justify-center gap-4 max-w-4xl mx-auto">
                            {skills.map((skill, index) => (
                                <motion.div
                                    key={skill.id}
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    whileInView={{ opacity: 1, scale: 1 }}
                                    transition={{ delay: index * 0.05 }}
                                    viewport={{ once: true }}
                                    className="px-6 py-3 bg-white border border-gray-200 text-gray-700 text-sm font-medium rounded-full cursor-default hover:border-black hover:bg-black hover:text-white transition-all duration-300"
                                >
                                    {skill.name}
                                </motion.div>
                            ))}
                        </div>
                    </section>
                )}

                {/* Contact Section */}
                <section id="contact" className="py-24 bg-[#111] text-white -mx-6 px-6 md:-mx-[calc((100vw-100%)/2)] md:px-[calc((100vw-100%)/2)]">
                    <div className="max-w-6xl mx-auto text-center">
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                        >
                            <p className="text-gray-400 uppercase tracking-widest text-sm font-semibold mb-6">Collaborate?</p>
                            <h2 className="font-['Playfair_Display'] text-5xl md:text-7xl font-bold mb-12">Let's build together.</h2>

                            <a
                                href={`mailto:${email || 'hello@example.com'}`}
                                className="inline-flex items-center gap-3 text-2xl md:text-4xl border-b border-white/30 pb-2 hover:border-white transition-all hover:text-white/80"
                            >
                                {email || 'Contact through email'}
                                <FiArrowRight />
                            </a>
                        </motion.div>

                        <div className="mt-24 pt-12 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-6 text-sm text-gray-500">
                            <p>&copy; {new Date().getFullYear()} {displayName}. Engineered for excellence.</p>
                            <div className="flex gap-6">
                                {github_url && <a href={github_url} className="hover:text-white transition-colors">GitHub</a>}
                                {linkedin_url && <a href={linkedin_url} className="hover:text-white transition-colors">LinkedIn</a>}
                                {twitter_url && <a href={twitter_url} className="hover:text-white transition-colors">Twitter</a>}
                            </div>
                        </div>
                    </div>
                </section>

            </main>
        </div>
    );
};

const SocialLink = ({ href, icon, label }) => {
    if (!href) return null;
    return (
        <a
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className="w-10 h-10 flex items-center justify-center border border-gray-200 rounded-full text-gray-600 hover:border-black hover:bg-black hover:text-white transition-all duration-300"
            aria-label={label}
            title={label}
        >
            <span className="text-lg">{icon}</span>
        </a>
    )
}

export default MinimalLight;
