import React, { useState, useEffect, useRef } from 'react';
import { usePortfolioData } from '../../../../hooks/usePortfolioData';
import { motion, AnimatePresence } from 'framer-motion';

const TerminalHacker = () => {
    const { profile, synopsis, skills, experiences, projects, loading, error } = usePortfolioData();
    const [history, setHistory] = useState([
        { type: 'system', content: 'INITIALIZING SYSTEM V4.0.2...' },
        { type: 'system', content: 'ESTABLISHING SECURE CONNECTION TO SUPABASE_CORE...' },
        { type: 'system', content: 'WELCOME, AUTHORIZED USER. TYPE "help" TO BEGIN.' },
    ]);
    const [input, setInput] = useState('');
    const [isLocked, setIsLocked] = useState(false);
    const scrollRef = useRef(null);

    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
        }
    }, [history]);

    if (loading) {
        return (
            <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center font-mono text-green-500">
                <div className="flex flex-col items-center gap-4">
                    <div className="w-12 h-12 border-2 border-green-500 border-t-transparent animate-spin rounded-full"></div>
                    <p className="animate-pulse">DECRYPTING_DATA...</p>
                </div>
            </div>
        );
    }

    const commands = {
        help: () => [
            'AVAILABLE COMMANDS:',
            '  ls           - LIST ALL AVAILABLE DIRECTORIES',
            '  whoami       - DISPLAY AUTHORIZED USER PROFILE',
            '  cat [file]   - READ FILE CONTENT (e.g., cat skills.txt)',
            '  clear        - CLEAR THE CONSOLE',
            '  contact      - INITIALIZE COMMUNICATION PROTOCOL',
            '  projects     - LIST ALL ARCHIVED RECORDS',
            '  experience   - VIEW CHRONOLOGICAL ACTIVITY LOG',
            '  exit         - TERMINATE SESSION'
        ],
        ls: () => [
            'total 5',
            'drwxr-xr-x  1 root  root   4096 Feb 23  about/',
            '-rw-r--r--  1 root  root   1024 Feb 23  skills.txt',
            '-rw-r--r--  1 root  root   2048 Feb 23  experience.txt',
            '-rw-r--r--  1 root  root   4096 Feb 23  projects.txt',
            '-rw-r--r--  1 root  root    512 Feb 23  social.txt'
        ],
        whoami: () => [
            `USER: ${profile?.full_name?.toUpperCase() || 'ANONYMOUS'}`,
            `TAGLINE: ${profile?.tagline || 'STREAKING ACROSS THE DIGITAL VOID'}`,
            `INTEL: ${synopsis?.intro || 'NO SYNOPSIS AVAILABLE.'}`
        ],
        'cat about/': () => [
            `DESCRIPTION: ${profile?.tagline || 'NO DESCRIPTION FOUND.'}`
        ],
        'cat skills.txt': () => [
            '--- CORE COMPETENCIES ---',
            ...skills.map(s => `[${s.level || 'PRO'}] ${s.name?.toUpperCase()}`),
            '-------------------------'
        ],
        'cat experience.txt': () => [
            '--- ACTIVITY LOG ---',
            ...experiences.map(e => `${new Date(e.start_date).getFullYear()} - ${e.is_current ? 'PRES' : new Date(e.end_date).getFullYear()} : ${e.role?.toUpperCase()} @ ${e.company_name?.toUpperCase()}`),
            '--------------------'
        ],
        'cat projects.txt': () => [
            '--- ARCHIVED RECORDS ---',
            ...projects.map(p => `> ${p.title?.toUpperCase()}: ${p.description?.substring(0, 50)}...`),
            '------------------------'
        ],
        'cat social.txt': () => [
            '--- CONNECTION POINTS ---',
            profile?.github_url ? `GITHUB: ${profile.github_url}` : null,
            profile?.linkedin_url ? `LINKEDIN: ${profile.linkedin_url}` : null,
            profile?.twitter_url ? `TWITTER: ${profile.twitter_url}` : null,
            profile?.email ? `EMAIL: ${profile.email}` : null,
            '-------------------------'
        ].filter(Boolean),
        experience: () => [
            'SYNCHRONIZING CAREER_DATA...',
            ...experiences.map(e => `[${new Date(e.start_date).getMonth() + 1}/${new Date(e.start_date).getFullYear()}] >> ${e.role} @ ${e.company_name}`)
        ],
        projects: () => [
            'RETRIEVING ARTIFACTS...',
            ...projects.map(p => `FILE: ${p.title} -> [${p.live_url || 'LOCAL_ONLY'}]`)
        ],
        contact: () => [
            'INITIALIZING CONTACT_UI...',
            `ENCRYPTION_KEY: SHA-256`,
            `RECIPIENT: ${profile?.email || 'N/A'}`,
            'TYPE "cat social.txt" FOR MANIFEST.'
        ],
        clear: () => {
            setHistory([]);
            return null;
        },
        exit: () => {
            setIsLocked(true);
            return ['SESSION TERMINATED.', 'REFRESH TO RE-INITIALIZE.'];
        }
    };

    const handleCommand = (e) => {
        if (e.key === 'Enter') {
            const cmd = input.trim().toLowerCase();
            const newHistory = [...history, { type: 'input', content: input }];

            if (commands[cmd]) {
                const output = commands[cmd]();
                if (output) {
                    newHistory.push(...output.map(line => ({ type: 'output', content: line })));
                }
            } else if (cmd !== '') {
                newHistory.push({ type: 'error', content: `COMMAND NOT RECOGNIZED: ${cmd}. TYPE "help" FOR INTEL.` });
            }

            setHistory(newHistory);
            setInput('');
        }
    };

    return (
        <div className="min-h-screen bg-[#0a0a0a] text-green-500 font-['JetBrains_Mono',monospace] p-4 md:p-8 overflow-hidden flex flex-col selection:bg-green-500 selection:text-black">

            {/* Terminal Container */}
            <div className="max-w-6xl mx-auto w-full flex-1 flex flex-col bg-black/40 border border-green-500/20 rounded-lg backdrop-blur-md shadow-[0_0_50px_rgba(34,197,94,0.1)] relative">

                {/* Scanline Effect */}
                <div className="absolute inset-0 pointer-events-none bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] z-50 bg-[length:100%_4px,3px_100%] opacity-20"></div>

                {/* Header */}
                <div className="flex justify-between items-center p-4 border-b border-green-500/20 bg-green-500/5">
                    <div className="flex gap-2">
                        <div className="w-3 h-3 rounded-full bg-red-500/50"></div>
                        <div className="w-3 h-3 rounded-full bg-yellow-500/50"></div>
                        <div className="w-3 h-3 rounded-full bg-green-500/50"></div>
                    </div>
                    <div className="text-[10px] uppercase tracking-[0.3em] font-bold opacity-50">
                        SSH: {profile?.full_name?.replace(' ', '_').toUpperCase() || 'ROOT'}@BUILD_FOLIO
                    </div>
                </div>

                {/* Output Area */}
                <div
                    ref={scrollRef}
                    className="flex-1 overflow-y-auto p-6 space-y-2 scroll-smooth scrollbar-hide"
                >
                    <AnimatePresence>
                        {history.map((line, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, x: -10 }}
                                animate={{ opacity: 1, x: 0 }}
                                className={`
                                    ${line.type === 'system' ? 'text-blue-400' : ''}
                                    ${line.type === 'error' ? 'text-red-500' : ''}
                                    ${line.type === 'input' ? 'text-white' : ''}
                                    ${line.type === 'output' ? 'text-green-500/80' : ''}
                                `}
                            >
                                {line.type === 'input' && <span className="mr-3 opacity-50">$</span>}
                                {line.content}
                            </motion.div>
                        ))}
                    </AnimatePresence>
                </div>

                {/* Input Area */}
                {!isLocked && (
                    <div className="p-6 pt-0 flex gap-3 items-center">
                        <span className="text-white brightness-150">$</span>
                        <input
                            autoFocus
                            type="text"
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            onKeyDown={handleCommand}
                            className="bg-transparent border-none outline-none flex-1 text-white focus:ring-0 p-0"
                            spellCheck="false"
                            autoComplete="off"
                        />
                    </div>
                )}
            </div>

            {/* Footer Stats */}
            <div className="max-w-6xl mx-auto w-full mt-4 flex justify-between text-[10px] uppercase tracking-widest opacity-30 font-bold">
                <div className="flex gap-6">
                    <span>OS: LINUX_FOLIO 4.2.0</span>
                    <span>CPU: VIRTUALIZED_CORE</span>
                </div>
                <div className="flex gap-6">
                    <span>MEM: 512MB / 1024MB</span>
                    <span>{new Date().toLocaleTimeString()}</span>
                </div>
            </div>
        </div>
    );
};

export default TerminalHacker;
