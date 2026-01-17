import React, { useContext } from 'react';
import { PreviewContext } from '../../../../context/PreviewContext';
import { FiGithub, FiLinkedin, FiMail, FiExternalLink, FiArrowRight, FiDownload } from 'react-icons/fi';
import { motion } from 'framer-motion';

const MinimalLight = () => {
    const [previewData] = useContext(PreviewContext);

    const {
        displayName = "Your Name",
        tagline = "Creative Developer & Designer",
        overview,
        skills = [],
        experiences = [],
        services = [],
        socials = {}
    } = previewData;

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
                        <a href="#services" className="hover:text-black transition-colors">Services</a>
                        <a href="#experience" className="hover:text-black transition-colors">Experience</a>
                        <a href="#contact" className="hover:text-black transition-colors">Contact</a>
                    </div>
                    <a
                        href={`mailto:${socials.email}`}
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
                            <span className="text-gray-500 tracking-widest text-xs uppercase font-semibold">Portfolio 2024</span>
                        </motion.div>

                        <motion.h1 variants={fadeIn} className="font-['Playfair_Display'] text-6xl md:text-8xl lg:text-9xl font-semibold tracking-tight mb-8 leading-[0.9] text-gray-900">
                            {displayName}
                        </motion.h1>

                        <motion.p variants={fadeIn} className="text-xl md:text-3xl text-gray-500 font-light max-w-2xl leading-relaxed mb-12">
                            {tagline}
                        </motion.p>

                        <motion.div variants={fadeIn} className="flex flex-wrap gap-6 items-center">
                            <div className="flex gap-4">
                                <SocialLink href={socials.github} icon={<FiGithub />} label="GitHub" />
                                <SocialLink href={socials.linkedin} icon={<FiLinkedin />} label="LinkedIn" />
                                <SocialLink href={socials.twitter} icon={<FiExternalLink />} label="Website" />
                            </div>
                            <div className="h-px w-12 bg-gray-300 hidden md:block"></div>
                            <p className="text-sm text-gray-400 max-w-md hidden md:block">
                                {overview ? overview.slice(0, 150) + "..." : "Creating digital experiences with a focus on motion, typography, and interaction."}
                            </p>
                        </motion.div>
                    </motion.div>
                </section>

                <section className="mb-32">
                    <div className="w-full h-px bg-gray-200 mb-12"></div>
                </section>

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
                            <h2 className="font-['Playfair_Display'] text-4xl md:text-5xl font-bold mb-4 md:mb-0">My Expertise</h2>
                            <p className="text-gray-500 max-w-md">I combine design and development to create complete packages.</p>
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
                                    <div className="w-12 h-12 bg-gray-50 rounded-full flex items-center justify-center mb-6 text-xl">
                                        {index + 1}
                                    </div>
                                    <h3 className="text-xl font-bold mb-3">{service.title}</h3>
                                    <p className="text-gray-500 text-sm leading-relaxed">
                                        {service.description || "Delivering high-quality solutions tailored to your specific needs."}
                                    </p>
                                </motion.div>
                            ))}
                        </div>
                    </section>
                )}

                {/* Experience Section */}
                <section id="experience" className="mb-32 bg-white border border-gray-100 p-8 md:p-16 relative overflow-hidden">
                    <div className="absolute top-0 right-0 p-4 opacity-5">
                        <FiArrowRight size={200} />
                    </div>

                    <motion.div
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        variants={fadeIn}
                        className="mb-16"
                    >
                        <h2 className="font-['Playfair_Display'] text-4xl md:text-5xl font-bold mb-2">Experiences</h2>
                        <div className="w-20 h-1 bg-black"></div>
                    </motion.div>

                    <div className="space-y-0 divide-y divide-gray-100">
                        {experiences.length > 0 ? (
                            experiences.map((exp, index) => (
                                <motion.div
                                    key={index}
                                    initial={{ opacity: 0, x: -20 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    transition={{ delay: index * 0.1 }}
                                    viewport={{ once: true }}
                                    className="py-12 grid grid-cols-1 md:grid-cols-12 gap-6 group hover:bg-gray-50 rounded-lg px-4 transition-colors"
                                >
                                    <div className="md:col-span-3">
                                        <span className="text-sm font-mono text-gray-400">{exp.date}</span>
                                    </div>
                                    <div className="md:col-span-9">
                                        <h3 className="text-2xl font-bold mb-1 group-hover:translate-x-2 transition-transform duration-300">{exp.title}</h3>
                                        <div className="text-gray-500 font-medium mb-4">{exp.company_name}</div>
                                        <ul className="space-y-2">
                                            {exp.points && exp.points.map((point, i) => (
                                                <li key={i} className="text-gray-600 text-sm flex items-start gap-2">
                                                    <span className="mt-1.5 w-1 h-1 bg-gray-400 rounded-full flex-shrink-0"></span>
                                                    {point}
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                </motion.div>
                            ))
                        ) : (
                            <div className="py-12 text-center text-gray-400">No experience yet.</div>
                        )}
                    </div>
                </section>

                {/* Skills Section */}
                <section className="mb-32">
                    <h2 className="font-['Playfair_Display'] text-4xl md:text-5xl font-bold mb-12 text-center">Technical Skills</h2>

                    <div className="flex flex-wrap justify-center gap-4 max-w-4xl mx-auto">
                        {skills.length > 0 ? skills.map((skill, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, scale: 0.9 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                transition={{ delay: index * 0.05 }}
                                viewport={{ once: true }}
                                className="px-6 py-3 bg-white border border-gray-200 text-gray-700 text-sm font-medium rounded-full cursor-default hover:border-black hover:bg-black hover:text-white transition-all duration-300"
                            >
                                {skill.name || skill}
                            </motion.div>
                        )) : (
                            <div className="text-gray-400">No skills added yet.</div>
                        )}
                    </div>
                </section>

                {/* Contact Section */}
                <section id="contact" className="py-24 bg-[#111] text-white -mx-6 px-6 md:-mx-[calc((100vw-100%)/2)] md:px-[calc((100vw-100%)/2)]">
                    <div className="max-w-6xl mx-auto text-center">
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                        >
                            <p className="text-gray-400 uppercase tracking-widest text-sm font-semibold mb-6">What's Next?</p>
                            <h2 className="font-['Playfair_Display'] text-5xl md:text-7xl font-bold mb-12">Let's work together.</h2>

                            <a
                                href={`mailto:${socials.email || 'hello@example.com'}`}
                                className="inline-flex items-center gap-3 text-2xl md:text-4xl border-b border-white/30 pb-2 hover:border-white transition-all hover:text-white/80"
                            >
                                {socials.email || 'Get in touch'}
                                <FiArrowRight />
                            </a>
                        </motion.div>

                        <div className="mt-24 pt-12 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-6 text-sm text-gray-500">
                            <p>&copy; {new Date().getFullYear()} {displayName}. All rights reserved.</p>
                            <div className="flex gap-6">
                                {socials.github && <a href={socials.github} className="hover:text-white transition-colors">GitHub</a>}
                                {socials.linkedin && <a href={socials.linkedin} className="hover:text-white transition-colors">LinkedIn</a>}
                                {socials.twitter && <a href={socials.twitter} className="hover:text-white transition-colors">Twitter</a>}
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
