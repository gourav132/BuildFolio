import React from 'react';
import { usePortfolioData } from '../../../../hooks/usePortfolioData';
import { motion } from 'framer-motion';
import { FiGithub, FiLinkedin, FiMail, FiTwitter, FiArrowUpRight, FiMapPin, FiGlobe } from 'react-icons/fi';
import { useParams } from 'react-router-dom';   

const MonochromeInk = () => {
    const { userId } = useParams();
    const { profile, synopsis, skills, experiences, projects, socialLinks, loading } = usePortfolioData(userId);

    if (loading) {
        return (
            <div className="min-h-screen bg-white flex items-center justify-center">
                <div className="w-16 h-16 border-t-4 border-black border-solid rounded-full animate-spin" />
            </div>
        );
    }

    const {
        full_name: displayName = "Author Name",
        tagline = "Documenting the digital world through code and design.",
        display_email,
        email: authEmail,
        headline = "",
        location = "",
        photo_url = ""
    } = profile || {};

    const email = display_email || authEmail || "";

    const overview = synopsis?.intro;
    const { github, linkedin, twitter } = socialLinks || {};

    const currentDate = new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });

    return (
        <div className="min-h-screen bg-white text-black font-['Georgia',_serif] selection:bg-black selection:text-white pb-32">

            {/* Top Bar / Masthead */}
            <div className="border-b-[3px] border-black px-4 sm:px-8 py-2 flex flex-col sm:flex-row justify-between items-center text-xs sm:text-sm font-sans uppercase tracking-widest font-bold gap-2">
                <span>Vol I. No. 001</span>
                <span>{currentDate}</span>
                <span>Digital Edition</span>
            </div>

            <header className="px-4 sm:px-8 py-12 sm:py-24 text-center border-b-[8px] border-double border-black max-w-7xl mx-auto">
                <h1 className="text-6xl sm:text-8xl md:text-[8rem] lg:text-[10rem] font-black uppercase tracking-tighter leading-none mb-6">
                    {displayName.split(' ')[0]}
                    <br />
                    {displayName.split(' ').slice(1).join(' ')}
                </h1>
                <p className="text-xl sm:text-3xl italic text-gray-700 max-w-3xl mx-auto border-y border-black py-4 mt-8">
                    {tagline}
                </p>
                <div className="flex justify-center gap-6 mt-8 font-sans uppercase text-sm font-bold tracking-widest">
                    {headline && <span>{headline}</span>}
                    {location && <span className="flex items-center gap-1"><FiMapPin /> {location}</span>}
                </div>
            </header>

            <main className="max-w-7xl mx-auto px-4 sm:px-8 py-12 grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">

                {/* Left Column (Main Content) */}
                <div className="lg:col-span-8 space-y-20">

                    {/* Editorial / Overview */}
                    {overview && (
                        <article>
                            <h2 className="text-3xl font-black uppercase border-b-2 border-black pb-2 mb-6 font-sans tracking-tight">
                                From the Editor's Desk
                            </h2>
                            <div className="text-lg sm:text-xl leading-relaxed text-justify columns-1 sm:columns-2 gap-8">
                                <span className="float-left text-7xl font-black leading-[0.8] pr-2 pt-2">{overview.charAt(0)}</span>
                                {overview.slice(1)}
                            </div>
                        </article>
                    )}

                    {/* Featured Projects */}
                    {projects.length > 0 && (
                        <section>
                            <h2 className="text-4xl font-black uppercase border-b-4 border-black pb-2 mb-8 font-sans tracking-tight">
                                Published Works
                            </h2>
                            <div className="space-y-16">
                                {projects.map((project, i) => (
                                    <article key={project.id} className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start border-b border-black/20 pb-16">
                                        <div className="order-2 md:order-1">
                                            <span className="font-sans text-xs font-bold uppercase tracking-widest border border-black px-2 py-1 mb-4 inline-block">
                                                Exhibit {String(i + 1).padStart(2, '0')}
                                            </span>
                                            <h3 className="text-4xl font-black leading-none mb-4 tracking-tighter hover:underline decoration-4 underline-offset-4">
                                                {project.title}
                                            </h3>
                                            <p className="text-lg leading-relaxed text-gray-800 mb-6 font-serif">
                                                {project.description}
                                            </p>
                                            <div className="flex flex-wrap gap-2 mb-8">
                                                {project.tags?.map((tag, k) => (
                                                    <span key={k} className="font-sans text-xs uppercase tracking-wider bg-black text-white px-2 py-1">
                                                        {tag}
                                                    </span>
                                                ))}
                                            </div>
                                            <div className="flex gap-6 font-sans font-bold text-sm uppercase tracking-widest">
                                                {project.live_url && (
                                                    <a href={project.live_url} target="_blank" rel="noreferrer" className="flex items-center gap-1 hover:text-gray-500">
                                                        Live Site <FiArrowUpRight />
                                                    </a>
                                                )}
                                                {project.github_url && (
                                                    <a href={project.github_url} target="_blank" rel="noreferrer" className="flex items-center gap-1 hover:text-gray-500">
                                                        Source <FiGithub />
                                                    </a>
                                                )}
                                            </div>
                                        </div>
                                        {project.image_url ? (
                                            <div className="order-1 md:order-2 border-2 border-black p-2 bg-gray-50 aspect-video md:aspect-[4/5] object-cover">
                                                <img src={project.image_url} alt={project.title} className="w-full h-full object-cover grayscale mix-blend-multiply" />
                                            </div>
                                        ) : (
                                            <div className="order-1 md:order-2 border-2 border-black p-2 aspect-video md:aspect-[4/5] flex items-center justify-center bg-gray-100">
                                                <FiGlobe size={48} className="text-black/30" />
                                            </div>
                                        )}
                                    </article>
                                ))}
                            </div>
                        </section>
                    )}
                </div>

                {/* Right Column (Sidebar) */}
                <aside className="lg:col-span-4 space-y-16 lg:border-l-[3px] border-black pl-0 lg:pl-12">

                    {/* Author Photo */}
                    {photo_url && (
                        <div className="border-[4px] border-black p-2 bg-gray-100 rotate-2 hover:rotate-0 transition-transform hidden lg:block">
                            <img src={photo_url} alt={displayName} className="w-full aspect-square object-cover grayscale contrast-125" />
                            <div className="text-center font-sans text-xs font-bold uppercase tracking-widest pt-2 pb-1">
                                Fig 1. The Author
                            </div>
                        </div>
                    )}

                    {/* Skills Checklist */}
                    {skills.length > 0 && (
                        <div className="bg-black text-white p-8">
                            <h3 className="text-2xl font-black uppercase border-b border-white/30 pb-4 mb-6 font-sans">
                                Areas of Expertise
                            </h3>
                            <ul className="space-y-3 font-sans text-sm tracking-wide">
                                {skills.map(skill => (
                                    <li key={skill.id} className="flex justify-between items-center border-b border-white/20 pb-2">
                                        <span className="uppercase">{skill.name}</span>
                                        <span className="text-white/50 text-xs">{skill.category || 'General'}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    )}

                    {/* Career History */}
                    {experiences.length > 0 && (
                        <div>
                            <h3 className="text-2xl font-black uppercase border-b-2 border-black pb-2 mb-6 font-sans">
                                Professional History
                            </h3>
                            <div className="space-y-10">
                                {experiences.map(exp => (
                                    <div key={exp.id} className="pl-4 border-l-4 border-black">
                                        <span className="font-sans text-xs font-bold uppercase text-gray-500 tracking-widest block mb-1">
                                            {new Date(exp.start_date).getFullYear()} — {exp.is_current ? 'Present' : new Date(exp.end_date).getFullYear()}
                                        </span>
                                        <h4 className="text-xl font-bold uppercase tracking-tight mb-1">{exp.role}</h4>
                                        <p className="font-sans font-bold text-sm mb-3">@ {exp.company_name}</p>
                                        <ul className="space-y-2 text-sm font-serif text-gray-700">
                                            {exp.description_points?.map((pt, j) => (
                                                <li key={j} className="flex gap-2"><span className="font-bold border-t border-black w-3 mt-2 shrink-0" />{pt}</li>
                                            ))}
                                        </ul>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Contact Directory */}
                    <div className="border-4 border-black p-8 text-center bg-gray-50">
                        <h3 className="text-2xl font-black uppercase mb-2 font-sans">Directory</h3>
                        <p className="text-sm italic text-gray-600 mb-6 border-b border-black pb-6">For inquiries, correspondence, or collaboration.</p>

                        {email && (
                            <a href={`mailto:${email}`} className="block text-xl font-bold hover:underline mb-8 break-all">
                                {email}
                            </a>
                        )}

                        <div className="flex justify-center gap-6 font-sans text-xs font-bold uppercase tracking-widest">
                            {github && <a href={github} className="hover:text-blue-600">GitHub</a>}
                            {linkedin && <a href={linkedin} className="hover:text-blue-600">LinkedIn</a>}
                            {twitter && <a href={twitter} className="hover:text-blue-600">Twitter</a>}
                        </div>
                    </div>
                </aside>

            </main>

            <footer className="border-t-[8px] border-double border-black mt-20 p-8 text-center font-sans text-xs font-bold uppercase tracking-widest">
                <p>Printed & Published © {new Date().getFullYear()} {displayName}</p>
                <p className="text-gray-500 mt-2">All Rights Reserved.</p>
            </footer>
        </div>
    );
};

export default MonochromeInk;
