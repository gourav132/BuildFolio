import React, { useContext } from 'react';
import { PreviewContext } from '../../../../context/PreviewContext';
import { motion } from 'framer-motion';
import { FiGithub, FiLinkedin, FiMail, FiExternalLink, FiArrowRight, FiCode, FiLayers, FiCpu } from 'react-icons/fi';

const CreativeGradient = () => {
    const [previewData] = useContext(PreviewContext);
    const {
        displayName,
        tagline,
        overview,
        socials = {},
        skills = [],
        experiences = [],
        projects = [], // Now receiving projects from context
        services = []
    } = previewData;

    return (
        <div className="min-h-screen bg-[#050505] text-white font-['Inter'] overflow-x-hidden selection:bg-purple-500 selection:text-white">

            {/* Animated Background Gradients */}
            <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
                <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-purple-600/20 rounded-full blur-[120px] animate-blob" />
                <div className="absolute top-[20%] right-[-10%] w-[400px] h-[400px] bg-blue-600/20 rounded-full blur-[100px] animate-blob animation-delay-2000" />
                <div className="absolute bottom-[-10%] left-[20%] w-[600px] h-[600px] bg-pink-600/20 rounded-full blur-[150px] animate-blob animation-delay-4000" />
            </div>

            {/* Glass Navigation */}
            <nav className="fixed top-6 left-1/2 -translate-x-1/2 z-50 w-[90%] max-w-5xl">
                <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-full px-6 py-4 flex justify-between items-center shadow-2xl shadow-purple-900/10">
                    <span className="font-bold text-xl tracking-tight bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                        {displayName || 'Portfolio'}
                    </span>
                    <div className="hidden md:flex gap-8 text-sm font-medium text-gray-300">
                        <a href="#work" className="hover:text-white transition-colors">Work</a>
                        <a href="#services" className="hover:text-white transition-colors">Services</a>
                        <a href="#about" className="hover:text-white transition-colors">About</a>
                    </div>
                    <a href={`mailto:${socials.email}`} className="bg-white text-black px-5 py-2 rounded-full text-sm font-bold hover:bg-gray-200 transition-colors">
                        Hire Me
                    </a>
                </div>
            </nav>

            <main className="relative z-10 pt-32 pb-20 px-6 max-w-6xl mx-auto">

                {/* Hero Section */}
                <section className="min-h-[80vh] flex flex-col justify-center items-center text-center mb-20">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                    >
                        <div className="inline-block mb-6 px-4 py-1.5 rounded-full border border-white/10 bg-white/5 text-sm text-purple-300 font-medium">
                            Available for freelance work
                        </div>
                        <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight mb-8 leading-tight">
                            Create <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400">Digital</span> <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400">Masterpieces</span>
                        </h1>
                        <p className="max-w-2xl mx-auto text-lg md:text-xl text-gray-400 mb-10 leading-relaxed">
                            {tagline || "I help brands stand out in the digital era. Together we will set the new status quo. No nonsense, always on the cutting edge."}
                        </p>

                        <div className="flex justify-center gap-6">
                            <SocialButton href={socials.github} icon={<FiGithub />} />
                            <SocialButton href={socials.linkedin} icon={<FiLinkedin />} />
                            <SocialButton href={socials.twitter} icon={<FiExternalLink />} />
                        </div>
                    </motion.div>
                </section>

                {/* Stats / Skills Grid */}
                <section className="mb-32">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                        {skills.slice(0, 4).map((skill, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, scale: 0.9 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                transition={{ delay: i * 0.1 }}
                                viewport={{ once: true }}
                                className="bg-white/5 backdrop-blur-md border border-white/10 p-6 rounded-2xl flex items-center gap-4 hover:bg-white/10 transition-colors"
                            >
                                <div className="p-3 bg-gradient-to-br from-purple-500/20 to-blue-500/20 rounded-xl text-purple-300">
                                    <FiCode size={24} />
                                </div>
                                <span className="font-bold text-lg">{skill.name || skill}</span>
                            </motion.div>
                        ))}
                    </div>
                </section>

                {/* Projects Section (Dynamic) */}
                <section id="work" className="mb-32">
                    <div className="flex justify-between items-end mb-12">
                        <div>
                            <h2 className="text-4xl font-bold mb-2">Featured Work</h2>
                            <p className="text-gray-400">Selected projects from my portfolio</p>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {projects && projects.length > 0 ? (
                            projects.map((project, index) => (
                                <ProjectCard key={index} project={project} index={index} />
                            ))
                        ) : (
                            <div className="col-span-full text-center py-20 bg-white/5 rounded-3xl border border-white/10 border-dashed">
                                <p className="text-gray-400">Projects will appear here once added.</p>
                            </div>
                        )}
                    </div>
                </section>

                {/* Skills Section (Replaced Services) */}
                <section id="skills" className="mb-32">
                    <h2 className="text-4xl font-bold mb-12 text-center">Technical Skills</h2>
                    {skills && skills.length > 0 ? (
                        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                            {skills.map((skill, index) => (
                                <motion.div
                                    key={index}
                                    whileHover={{ y: -5 }}
                                    className="p-6 rounded-2xl bg-white/5 border border-white/10 hover:border-purple-500/50 transition-all duration-300 flex flex-col items-center text-center gap-4 group"
                                >
                                    <div className="w-12 h-12 bg-gradient-to-br from-purple-500/10 to-blue-500/10 rounded-full flex items-center justify-center text-2xl group-hover:from-purple-500/20 group-hover:to-blue-500/20 transition-colors text-purple-300">
                                        {/* If skill has an icon property, we could use it, but for now generic or first letter */}
                                        <FiCpu />
                                    </div>
                                    <div>
                                        <h3 className="font-bold text-lg mb-1">{skill.name || skill}</h3>
                                        {skill.level && <p className="text-xs text-gray-400">{skill.level}</p>}
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    ) : (
                        <div className="text-center text-gray-400 py-10">No skills added yet.</div>
                    )}
                </section>

                {/* Experience Section */}
                <section className="mb-32 max-w-4xl mx-auto">
                    <h2 className="text-4xl font-bold mb-12 text-center">Experience</h2>
                    <div className="space-y-6">
                        {experiences.map((exp, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, x: -20 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                className="group relative pl-8 border-l border-white/10"
                            >
                                <span className="absolute left-[-5px] top-0 w-2.5 h-2.5 rounded-full bg-purple-500 group-hover:scale-150 transition-transform duration-300" />
                                <div className="flex flex-col md:flex-row gap-4 md:items-baseline justify-between mb-2">
                                    <h3 className="text-2xl font-bold">{exp.title}</h3>
                                    <span className="font-mono text-purple-300 text-sm">{exp.date}</span>
                                </div>
                                <p className="text-lg text-gray-300 mb-2">{exp.company_name}</p>
                                <ul className="list-disc list-inside text-gray-400 space-y-1">
                                    {exp.points && exp.points.map((point, i) => (
                                        <li key={i}>{point}</li>
                                    ))}
                                </ul>
                            </motion.div>
                        ))}
                    </div>
                </section>

                {/* Enhanced Contact Section */}
                <section id="contact" className="py-20 border-t border-white/10 relative overflow-hidden">
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-purple-600/10 rounded-full blur-[100px] pointer-events-none" />

                    <div className="relative z-10 max-w-4xl mx-auto text-center">
                        <h2 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-b from-white to-gray-400 bg-clip-text text-transparent">
                            Let's Work Together
                        </h2>
                        <p className="text-xl text-gray-400 mb-10 max-w-2xl mx-auto">
                            Have a project in mind or want to discuss a new opportunity? I'm just one message away.
                        </p>

                        <div className="flex flex-col md:flex-row items-center justify-center gap-6">
                            <a
                                href={`mailto:${socials.email}`}
                                className="px-8 py-4 bg-white text-black text-lg font-bold rounded-full hover:scale-105 transition-transform duration-300 flex items-center gap-2"
                            >
                                <FiMail /> Send Email
                            </a>
                            <div className="flex gap-4">
                                <SocialButton href={socials.github} icon={<FiGithub />} />
                                <SocialButton href={socials.linkedin} icon={<FiLinkedin />} />
                                <SocialButton href={socials.twitter} icon={<FiExternalLink />} />
                            </div>
                        </div>

                        <div className="mt-20 text-gray-500 text-sm">
                            &copy; {new Date().getFullYear()} {displayName}. All rights reserved.
                        </div>
                    </div>
                </section>

            </main>
        </div>
    );
};

const SocialButton = ({ href, icon }) => {
    if (!href) return null;
    return (
        <a href={href} target="_blank" rel="noopener noreferrer" className="p-3 bg-white/10 rounded-full hover:bg-white/20 hover:scale-110 transition-all text-white backdrop-blur-sm">
            <span className="text-xl">{icon}</span>
        </a>
    )
}

const ProjectCard = ({ project, index }) => (
    <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ delay: index * 0.1 }}
        viewport={{ once: true }}
        className="group relative rounded-2xl overflow-hidden aspect-[4/3] bg-gray-900"
    >
        <img
            src={project.projectFileURL || 'https://via.placeholder.com/600x400'}
            alt={project.projectTitle}
            className="object-cover w-full h-full opacity-60 group-hover:opacity-40 group-hover:scale-110 transition-all duration-700"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent p-6 flex flex-col justify-end">
            <div className="transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                <h3 className="text-2xl font-bold mb-1">{project.projectTitle}</h3>
                <p className="text-gray-300 text-sm line-clamp-2 mb-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-100">
                    {project.projectDescription}
                </p>
                <a href={project.projectLink} target="_blank" className="inline-flex items-center gap-2 text-sm font-bold text-white hover:underline">
                    View Project <FiArrowRight />
                </a>
            </div>
        </div>
    </motion.div>
);

export default CreativeGradient;
