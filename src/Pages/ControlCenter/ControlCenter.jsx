import React, { useState, useContext, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import { FiArrowLeft, FiEdit, FiEye, FiSettings, FiImage, FiUser, FiBriefcase, FiMail, FiCode, FiGrid, FiLayers, FiMonitor, FiZap, FiLogOut, FiHome, FiFileText, FiShare2, FiCheck, FiActivity } from 'react-icons/fi';
import { PreviewContext } from "@/context/PreviewContext";

import { supabase } from '@/Supabase/supabaseClient';

const ControlCenter = () => {
  const [previewData, setPreviewData, updateTemplateId] = useContext(PreviewContext);
  const [selectedDesign, setSelectedDesign] = useState(previewData?.templateId || 'modern-dark');
  const [appliedTemplate, setAppliedTemplate] = useState(null); // What's actually LIVE in Supabase
  const navigate = useNavigate();
  const [copied, setCopied] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  const handleShare = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;
      const portfolioUrl = `${window.location.origin}/portfolio/${user.id}`;
      await navigator.clipboard.writeText(portfolioUrl);
      await supabase.from('profiles').update({ profile_url: portfolioUrl }).eq('id', user.id);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy link:', err);
    }
  };

  // Fetch the applied (live) template from Supabase on mount
  useEffect(() => {
    const fetchUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) { navigate('/login'); return; }

      const { data: profile } = await supabase
        .from('profiles')
        .select('template_id')
        .eq('id', user.id)
        .single();

      if (profile?.template_id) {
        setAppliedTemplate(profile.template_id);
        setSelectedDesign(profile.template_id);
      }
    };
    fetchUser();
  }, []);

  // const handleLogout = async () => {
  //   try {
  //     await logout();
  //     navigate('/');
  //   } catch (error) {
  //     console.error('Logout error:', error);
  //   }
  // };

  const portfolioDesigns = [
    // {
    //   id: 'modern-dark',
    //   name: 'Modern Dark',
    //   description: 'Professional dark theme',
    //   status: 'active',
    //   icon: FiMonitor
    // },
    {
      id: 'minimal-light',
      name: 'Minimal Light',
      description: 'Clean and minimal design',
      status: 'active',
      icon: FiGrid
    },
    {
      id: 'creative-gradient',
      name: 'Creative Gradient',
      description: 'Bold gradient design',
      status: 'active',
      icon: FiLayers
    },
    {
      id: 'bento-box',
      name: 'Bento Box',
      description: 'Modern grid layout',
      status: 'active',
      icon: FiGrid
    },
    {
      id: 'terminal-hacker',
      name: 'Terminal Hacker',
      description: 'Retro developer vibe',
      status: 'active',
      icon: FiCode
    },
    {
      id: 'storyteller',
      name: 'Storyteller',
      description: 'Clean editorial style',
      status: 'active',
      icon: FiFileText
    },
    {
      id: 'neo-brutalism',
      name: 'Neo Brutalism',
      description: 'Bold and experimental',
      status: 'active',
      icon: FiZap
    },
    {
      id: 'neon-pulse',
      name: 'Neon Pulse',
      description: 'Dark cyberpunk neon glow',
      status: 'active',
      icon: FiActivity
    },
    {
      id: 'paper-folio',
      name: 'Paper Folio',
      description: 'Warm editorial print style',
      status: 'active',
      icon: FiFileText
    },
    {
      id: 'glassmorphism-studio',
      name: 'Glassmorphism Studio',
      description: 'Frosted glass UI elements',
      status: 'active',
      icon: FiGrid
    },
    {
      id: 'monochrome-ink',
      name: 'Monochrome Ink',
      description: 'Editorial B&W newspaper style',
      status: 'active',
      icon: FiFileText
    },
    {
      id: 'organic-scroll',
      name: 'Organic Scroll',
      description: 'Earthy tones and soft curves',
      status: 'active',
      icon: FiLayers
    },
    {
      id: 'blueprint',
      name: 'Blueprint',
      description: 'Technical specs & grid lines',
      status: 'active',
      icon: FiCode
    },
    {
      id: 'spotlight',
      name: 'Spotlight',
      description: 'Dramatic award-reveal stage',
      status: 'active',
      icon: FiActivity
    },
    {
      id: 'mobile-card-stack',
      name: 'Mobile Card Stack',
      description: 'Swipeable card interface',
      status: 'active',
      icon: FiGrid
    },
    {
      id: 'museum-gallery',
      name: 'Museum Gallery',
      description: 'Clean artwork exhibition style',
      status: 'active',
      icon: FiGrid
    }
  ];

  const contentSections = [
    {
      icon: FiBriefcase,
      title: 'Manage your portfolio content',
      description: ' work experience, education, and skills to showcase your professional background.',
      route: '/customize',
      color: 'from-blue-500/20 to-cyan-500/20'
    },
  ];

  const quickActions = [
    {
      icon: FiSettings,
      title: 'Settings',
      action: () => navigate('/settings'),
      color: 'from-orange-500/20 to-red-500/20'
    }
  ];

  const handleDesignSelect = async (designId) => {
    setSelectedDesign(designId); // Optimistic local update
    setIsSaving(true);
    try {
      if (updateTemplateId) await updateTemplateId(designId);
      setAppliedTemplate(designId); // Mark as applied after save
    } catch (err) {
      console.error('Failed to save template:', err);
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="min-h-screen bg-black text-white overflow-hidden">
      {/* Animated Background */}
      <div className="fixed inset-0 bg-gradient-to-br from-black via-gray-900 to-black">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(120,119,198,0.1),transparent_50%)]"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,rgba(120,119,198,0.05),transparent_50%)]"></div>
      </div>


      {/* Header */}
      <header className="relative z-10 px-4 py-3 sm:py-4 border-b border-gray-800/50">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center space-x-4">
            <p
              // to="/portfolio"
              className="flex items-center space-x-2 text-gray-300 hover:text-white transition-colors duration-300 text-sm"
            >
              <span>BuildFolio</span>
            </p>
            <div className="w-px h-6 bg-gray-700"></div>
          </div>
          <div className="flex items-center space-x-3">
            <button
              onClick={() => navigate('/preview')}
              className="px-3 py-1.5 bg-gray-900/50 backdrop-blur-sm border border-gray-700 text-white rounded-lg hover:bg-gray-800/50 transition-all duration-300 text-sm"
            >
              Preview
            </button>
            <motion.button
              onClick={handleShare}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={`px-3 py-1.5 backdrop-blur-sm border rounded-lg transition-all duration-300 text-sm flex items-center gap-2 ${copied
                ? 'bg-green-600/20 border-green-500/40 text-green-400'
                : 'bg-purple-600/20 border-purple-500/30 text-purple-400 hover:bg-purple-600/30'
                }`}
            >
              {copied ? <FiCheck className="w-3.5 h-3.5" /> : <FiShare2 className="w-3.5 h-3.5" />}
              {copied ? 'Copied!' : 'Copy Link'}
            </motion.button>
            {/* <button
              onClick={handleLogout}
              className="px-3 py-1.5 bg-red-600/20 backdrop-blur-sm border border-red-500/30 text-red-400 rounded-lg hover:bg-red-600/30 transition-all duration-300 text-sm flex items-center space-x-2"
            >
              <FiLogOut className="w-4 h-4" />
              <span>Logout</span>
            </button> */}
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-6 sm:py-8">
        {/* Portfolio Designs Section */}
        <motion.div
          initial={{ opacity: 0, y: 0 }}
          animate={{ opacity: 1, y: 20 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="mb-12"
        >
          <div className="mb-6">
            <h2 className="text-xl font-bold text-white mb-2">Portfolio Design</h2>
            <p className="text-gray-400 text-sm">Choose your preferred design template</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {portfolioDesigns.map((design) => {
              const isApplied = appliedTemplate === design.id;
              const isSelected = selectedDesign === design.id;
              return (
                <motion.div
                  key={design.id}
                  whileHover={{ scale: 1.02 }}
                  onClick={() => handleDesignSelect(design.id)}
                  className={`relative backdrop-blur-sm border rounded-lg p-4 cursor-pointer transition-all duration-300 ${isApplied
                    ? 'border-green-500 bg-green-500/10 shadow-[0_0_20px_rgba(34,197,94,0.15)]'
                    : isSelected
                      ? 'border-purple-500 bg-purple-500/10 shadow-[0_0_20px_rgba(168,85,247,0.15)]'
                      : 'bg-gray-900/30 border-gray-800/50 hover:border-gray-700'
                    }`}
                >
                  {/* Status badges */}
                  {isApplied && (
                    <span className="absolute top-2 right-2 flex items-center gap-1 text-[9px] font-black uppercase tracking-widest text-green-400 bg-green-500/20 border border-green-500/30 px-2 py-0.5 rounded-full">
                      <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
                      Live
                    </span>
                  )}
                  {isSelected && !isApplied && (
                    <span className="absolute top-2 right-2 text-[9px] font-black uppercase tracking-widest text-purple-400 bg-purple-500/20 border border-purple-500/30 px-2 py-0.5 rounded-full">
                      {isSaving ? 'Saving…' : 'Selected'}
                    </span>
                  )}
                  {!isApplied && !isSelected && design.status === 'active' && (
                    <div className="absolute top-2 right-2 w-1.5 h-1.5 bg-gray-600 rounded-full" />
                  )}

                  <div className="flex items-center space-x-3 mb-3">
                    <div className="w-8 h-8 bg-gray-800/50 rounded-lg flex items-center justify-center">
                      <design.icon className="w-4 h-4 text-gray-300" />
                    </div>
                    <div>
                      <h3 className="text-sm font-medium text-white">{design.name}</h3>
                      <p className="text-gray-400 text-xs">{design.description}</p>
                    </div>
                  </div>

                  {design.status === 'coming-soon' && (
                    <div className="text-xs text-gray-500 text-center py-2">
                      Coming Soon
                    </div>
                  )}
                </motion.div>
              );
            })}
          </div>
        </motion.div>

        {/* Content Management Section */}
        <motion.div
          initial={{ opacity: 0, y: 0 }}
          animate={{ opacity: 1, y: 20 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mb-12"
        >
          <div className="mb-6">
            <h2 className="text-xl font-bold text-white mb-2">Content Management</h2>
            <p className="text-gray-400 text-sm">Edit and organize your portfolio content</p>
          </div>

          <div className="grid grid-cols-1 gap-3">
            {contentSections.map((section, index) => (
              <motion.div
                key={section.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 + index * 0.1 }}
                className="group"
              >
                <Link
                  to={section.route}
                  className="block bg-gray-900/30 backdrop-blur-sm border border-gray-800/50 rounded-lg p-4 hover:bg-gray-800/30 hover:border-gray-700 transition-all duration-300"
                >
                  <div className={`w-10 h-10 bg-gradient-to-r ${section.color} rounded-lg flex items-center justify-center mb-3 group-hover:scale-110 transition-transform duration-300`}>
                    <section.icon className="w-5 h-5 text-white" />
                  </div>
                  <h3 className="text-sm font-medium text-white mb-1">{section.title}</h3>
                  <p className="text-gray-400 text-xs">{section.description}</p>
                </Link>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Quick Actions Section */}
        <motion.div
          initial={{ opacity: 0, y: 0 }}
          animate={{ opacity: 1, y: 20 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <div className="mb-6">
            <h2 className="text-xl font-bold text-white mb-2">Quick Actions</h2>
            <p className="text-gray-400 text-sm">Common tasks and shortcuts</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {quickActions.map((action, index) => (
              <motion.button
                key={action.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.5 + index * 0.1 }}
                onClick={action.action}
                className={`p-4 bg-gradient-to-r ${action.color} backdrop-blur-sm border border-gray-800/50 rounded-lg hover:scale-105 hover:border-gray-700 transition-all duration-300 group text-center`}
              >
                <div className="w-8 h-8 bg-gray-800/50 rounded-lg flex items-center justify-center mx-auto mb-2 group-hover:scale-110 transition-transform duration-300">
                  <action.icon className="w-4 h-4 text-gray-300" />
                </div>
                <span className="text-sm font-medium text-white">{action.title}</span>
              </motion.button>
            ))}
          </div>
        </motion.div>
      </div>
    </div >
  );
};

export default ControlCenter;
