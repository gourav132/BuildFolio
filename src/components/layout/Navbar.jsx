import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { styles } from '@styles';
import { navLinks } from '@constants';
import { logo, menu, close } from '@assets';
import { useLocation, useNavigate } from 'react-router-dom';
import { FiLogOut, FiMenu, FiX, FiHome, FiUser, FiBriefcase, FiMail, FiGithub, FiLinkedin, FiShare2, FiCheck } from "react-icons/fi";
import { motion, AnimatePresence } from 'framer-motion';
import { usePortfolioData } from '@/hooks/usePortfolioData';
import { supabase } from '@/Supabase/supabaseClient';

const Navbar = ({ isExpanded, handleBackPreview }) => {
  const { profile, loading } = usePortfolioData();
  const location = useLocation();
  const navigate = useNavigate();
  const [active, setActive] = useState('');
  const [toggle, setToggle] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleShare = async () => {
    if (!profile?.id) return;
    const portfolioUrl = `${window.location.origin}/portfolio/${profile.id}`;

    try {
      await navigator.clipboard.writeText(portfolioUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);

      // Persist the URL to Supabase
      await supabase
        .from('profiles')
        .update({ profile_url: portfolioUrl })
        .eq('id', profile.id);
    } catch (err) {
      console.error('Failed to copy portfolio link:', err);
    }
  };

  // Use full_name from profile or fallback to "Portfolio"
  const name = profile?.full_name || "Portfolio";

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 50;
      setScrolled(isScrolled);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const getIconForLink = (title) => {
    const iconMap = {
      "Home": FiHome,
      "About": FiUser,
      "Work": FiBriefcase,
      "Contact": FiMail,
    };
    return iconMap[title] || null;
  };

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6 }}
      className={`${styles.paddingX} w-full flex items-center py-3 fixed top-0 z-50 transition-all duration-500 ${scrolled
        ? 'bg-black/60 backdrop-blur-2xl border-b border-white/10 shadow-2xl shadow-black/20'
        : 'bg-transparent'
        }`}
    >
      {/* Back Button for Customize Page */}
      {(location.pathname === "/Create" || isExpanded) && (
        <motion.button
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="mr-4 p-2.5 bg-gradient-to-r from-purple-600/80 to-blue-600/80 backdrop-blur-sm rounded-xl hover:from-purple-600 hover:to-blue-600 transition-all duration-300 transform hover:scale-105 shadow-lg shadow-purple-500/25 border border-white/10"
          onClick={handleBackPreview}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="text-white"
          >
            <line x1="19" y1="12" x2="5" y2="12"></line>
            <polyline points="12 19 5 12 12 5"></polyline>
          </svg>
        </motion.button>
      )}

      <div className="w-full flex justify-between items-center max-w-7xl mx-auto">
        {/* Logo */}
        <motion.div
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <div
            className="flex items-center gap-3 group cursor-pointer"
            onClick={() => {
              setActive("");
              window.scrollTo(0, 0);
            }}
          >
            <div className="relative">
              <img
                src={logo}
                alt="logo"
                className="w-9 h-9 object-contain group-hover:rotate-12 transition-transform duration-300"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full opacity-0 group-hover:opacity-30 transition-opacity duration-300 blur-md" />
            </div>
            <div className="flex flex-col">
              <p className="text-white text-lg font-bold tracking-wide">{name}</p>
              <div className="w-0 group-hover:w-full h-0.5 bg-gradient-to-r from-purple-500 to-blue-500 transition-all duration-300 rounded-full" />
            </div>
          </div>
        </motion.div>

        {/* Desktop Navigation */}
        <ul className="list-none hidden sm:flex flex-row gap-6">
          {navLinks.map((link) => {
            const IconComponent = getIconForLink(link.title);
            return (
              <motion.li
                key={link.id}
                whileHover={{ y: -2 }}
                whileTap={{ scale: 0.95 }}
                className={`relative group ${active === link.title
                  ? "text-white"
                  : "text-white/70 hover:text-white"
                  } transition-colors duration-300`}
                onClick={() => setActive(link.title)}
              >
                <a
                  href={`#${link.id}`}
                  className="flex items-center space-x-2 font-medium text-base cursor-pointer px-3 py-2 rounded-lg hover:bg-white/5 transition-all duration-300"
                >
                  {IconComponent && <IconComponent className="w-4 h-4" />}
                  <span>{link.title}</span>
                </a>

                {/* Hover Underline */}
                <div className="absolute -bottom-1 left-3 right-3 h-0.5 bg-gradient-to-r from-purple-500 to-blue-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 rounded-full" />

                {/* Active Indicator */}
                {active === link.title && (
                  <motion.div
                    layoutId="activeTab"
                    className="absolute -bottom-1 left-3 right-3 h-0.5 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full"
                  />
                )}
              </motion.li>
            );
          })}
        </ul>

        {/* Social Links & Actions */}
        <div className="hidden sm:flex items-center space-x-3">
          {profile?.social_links?.github && (
            <motion.a
              href={profile.social_links.github}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.1, y: -2 }}
              whileTap={{ scale: 0.95 }}
              className="p-2 bg-white/5 backdrop-blur-sm rounded-lg border border-white/10 hover:bg-white/10 hover:border-white/20 transition-all duration-300 group"
            >
              <FiGithub className="w-4 h-4 text-white/70 group-hover:text-white transition-colors duration-300" />
            </motion.a>
          )}

          {profile?.social_links?.linkedin && (
            <motion.a
              href={profile.social_links.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.1, y: -2 }}
              whileTap={{ scale: 0.95 }}
              className="p-2 bg-white/5 backdrop-blur-sm rounded-lg border border-white/10 hover:bg-white/10 hover:border-white/20 transition-all duration-300 group"
            >
              <FiLinkedin className="w-4 h-4 text-white/70 group-hover:text-white transition-colors duration-300" />
            </motion.a>
          )}

          {/* Share Portfolio Link Button */}
          <motion.button
            onClick={handleShare}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            title={copied ? 'Link Copied!' : 'Copy Portfolio Link'}
            className={`flex items-center gap-2 px-4 py-1.5 backdrop-blur-sm rounded-lg border transition-all duration-300 text-sm font-medium ${copied
                ? 'bg-green-500/20 border-green-500/50 text-green-400'
                : 'bg-purple-600/20 border-purple-500/30 text-purple-400 hover:bg-purple-600/30 hover:border-purple-500/50'
              }`}
          >
            <AnimatePresence mode="wait" initial={false}>
              {copied ? (
                <motion.span key="check" initial={{ scale: 0.5, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.5, opacity: 0 }} className="flex items-center gap-1.5">
                  <FiCheck className="w-3.5 h-3.5" />
                  Copied!
                </motion.span>
              ) : (
                <motion.span key="share" initial={{ scale: 0.5, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.5, opacity: 0 }} className="flex items-center gap-1.5">
                  <FiShare2 className="w-3.5 h-3.5" />
                  Share
                </motion.span>
              )}
            </AnimatePresence>
          </motion.button>
        </div>

        {/* Mobile Menu Button */}
        <div className="sm:hidden flex flex-1 justify-end items-center">
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="p-2.5 bg-white/10 backdrop-blur-sm rounded-xl border border-white/20 hover:bg-white/20 transition-all duration-300"
            onClick={() => setToggle(!toggle)}
          >
            <AnimatePresence mode="wait">
              {toggle ? (
                <motion.div
                  key="close"
                  initial={{ rotate: -90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: 90, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <FiX className="w-5 h-5 text-white" />
                </motion.div>
              ) : (
                <motion.div
                  key="menu"
                  initial={{ rotate: 90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: -90, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <FiMenu className="w-5 h-5 text-white" />
                </motion.div>
              )}
            </AnimatePresence>
          </motion.button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {toggle && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="absolute top-full left-0 right-0 bg-black/95 backdrop-blur-2xl border-b border-white/10 shadow-2xl sm:hidden"
          >
            <div className="p-6">
              <ul className="list-none flex flex-col gap-4">
                {navLinks.map((link, index) => {
                  const IconComponent = getIconForLink(link.title);
                  return (
                    <motion.li
                      key={link.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.3, delay: index * 0.1 }}
                      className={`${active === link.title
                        ? "text-white"
                        : "text-white/70"
                        } font-medium text-base cursor-pointer group`}
                      onClick={() => {
                        setToggle(!toggle);
                        setActive(link.title);
                      }}
                    >
                      <a
                        href={`#${link.id}`}
                        className="flex items-center space-x-3 p-3 rounded-xl hover:bg-white/10 transition-all duration-300"
                      >
                        {IconComponent && (
                          <IconComponent className="w-4 h-4 group-hover:scale-110 transition-transform duration-300" />
                        )}
                        <span>{link.title}</span>
                        {active === link.title && (
                          <motion.div
                            layoutId="mobileActiveTab"
                            className="w-2 h-2 bg-purple-500 rounded-full"
                          />
                        )}
                      </a>
                    </motion.li>
                  );
                })}
              </ul>

              {/* Mobile Social Links */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3, delay: 0.3 }}
                className="mt-6 pt-4 border-t border-white/10"
              >
                <div className="flex items-center justify-center space-x-4">
                  {profile?.social_links?.github && (
                    <motion.a
                      href={profile.social_links.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.95 }}
                      className="p-2.5 bg-white/10 rounded-lg hover:bg-white/20 transition-all duration-300"
                    >
                      <FiGithub className="w-4 h-4 text-white/70" />
                    </motion.a>
                  )}
                  {profile?.social_links?.linkedin && (
                    <motion.a
                      href={profile.social_links.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.95 }}
                      className="p-2.5 bg-white/10 rounded-lg hover:bg-white/20 transition-all duration-300"
                    >
                      <FiLinkedin className="w-4 h-4 text-white/70" />
                    </motion.a>
                  )}
                </div>

                {/* Mobile Share Button */}
                <motion.button
                  onClick={handleShare}
                  whileTap={{ scale: 0.95 }}
                  className={`mt-4 w-full flex items-center justify-center gap-2 py-3 rounded-xl border text-sm font-semibold transition-all duration-300 ${copied
                      ? 'bg-green-500/20 border-green-500/40 text-green-400'
                      : 'bg-purple-600/20 border-purple-500/30 text-purple-400 hover:bg-purple-600/30'
                    }`}
                >
                  {copied ? <FiCheck className="w-4 h-4" /> : <FiShare2 className="w-4 h-4" />}
                  {copied ? 'Link Copied to Clipboard!' : 'Share My Portfolio'}
                </motion.button>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

export default Navbar;