import React, { useState, useEffect, useContext } from "react";
import { useSupabaseAuth } from "../../hooks/useSupabaseAuth";
import { useNavigate } from "react-router-dom";
import ReactLoading from "react-loading";
import { motion, AnimatePresence } from "framer-motion";
import copy from "copy-text-to-clipboard";

import { Preview } from "../index";
import { PreviewContext } from "../../context/PreviewContext";

import Experience from "./Experience Field/Experience";
import Project from "./Project/Project";
import Overview from "./Overview/Overview";
import Introduction from "./Introduction/Introduction";
import Skills from "./Skills/Skills";
import { supabase } from "../../Supabase/supabaseClient";

import {
  FiUser,
  FiFileText,
  FiBriefcase,
  FiFolder,
  FiEye,
  FiEyeOff,
  FiSave,
  FiLogOut,
  FiLink,
  FiCheck,
  FiHome,
  FiX,
  FiCode
} from "react-icons/fi";

const steps = [
  { id: "intro", title: "Introduction", icon: FiUser, description: "Identity & Pulse" },
  { id: "overview", title: "Overview", icon: FiFileText, description: "Your Narrative" },
  { id: "skills", title: "Skills", icon: FiCode, description: "Technical DNA" },
  { id: "exp", title: "Experience", icon: FiBriefcase, description: "Evolution" },
  { id: "project", title: "Projects", icon: FiFolder, description: "Creations" },
];

export default function Customize() {
  const [previewData, setPreviewData] = useContext(PreviewContext);
  const [showPreview, setShowPreview] = useState(false);
  const [step, setStep] = useState("intro");
  const [isSaving, setIsSaving] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const [user, loading] = useSupabaseAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!loading && !user) navigate("/");
  }, [loading, user, navigate]);

  const copyURL = () => {
    copy(previewData.publicURL);
    setShowSuccess(true);
    setTimeout(() => setShowSuccess(false), 2000);
  };

  async function handleSupabaseSave() {
    setIsSaving(true);
    try {
      console.log("Saving to Supabase...", previewData);
      if (!user) return;

      const { error } = await supabase.from("profiles").upsert({
        id: user.id,
        full_name: previewData.displayName,
        tagline: previewData.tagline,
        overview: previewData.overview,
      });

      if (error) {
        throw error;
      }
      setShowSuccess(true);
      setTimeout(() => setShowSuccess(false), 2000);
    } catch (error) {
      console.error("Error saving to Supabase:", error);
    } finally {
      setIsSaving(false);
    }
  }

  const handleLogout = async () => {
    try {
      await supabase.auth.signOut();
      navigate("/");
    } catch (error) {
      console.error("Error logging out", error);
    }
  };

  const currentStepIndex = steps.findIndex(s => s.id === step);
  const progress = ((currentStepIndex + 1) / steps.length) * 100;

  if (loading || !user) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <ReactLoading type="bubbles" height="50px" width="50px" color="#8b5cf6" />
      </div>
    );
  }

  return (
    <div className="h-screen bg-[#0a0a0b] text-white flex flex-col font-sans selection:bg-purple-500/30 overflow-hidden">
      {/* Background Ambience */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-purple-500/[0.07] blur-[120px] rounded-full" />
        <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-blue-500/[0.07] blur-[120px] rounded-full" />
      </div>

      {/* Glossy Top Bar */}
      <nav className="relative z-50 h-16 border-b border-white/[0.06] bg-[#0d0d0e]/80 backdrop-blur-2xl flex items-center justify-between px-6 shrink-0">
        <div className="flex items-center gap-4">
          <div className="w-9 h-9 bg-gradient-to-br from-purple-500 to-blue-600 rounded-xl flex items-center justify-center shadow-xl shadow-purple-500/20">
            <span className="text-white font-black text-base italic">B</span>
          </div>
          <div>
            <h1 className="text-[15px] font-bold tracking-tight text-white flex items-center">
              BuildFolio <span className="text-[10px] bg-white/10 px-1.5 py-0.5 rounded ml-2 font-medium text-gray-400">PRO</span>
            </h1>
          </div>
        </div>

        <div className="flex items-center gap-10">
          <button onClick={copyURL} className="nav-btn group" title="Copy URL">
            <FiLink className="w-4 h-4 text-gray-400 group-hover:text-purple-400 transition-colors" />
          </button>
          <button onClick={() => setShowPreview(!showPreview)} className="nav-btn group" title="Toggle Preview">
            {showPreview ? <FiEyeOff className="w-4 h-4 text-purple-400" /> : <FiEye className="w-4 h-4 text-gray-400 group-hover:text-white" />}
          </button>
          <div className="h-4 w-px bg-white/[0.05] mx-1" />
          <button onClick={handleSupabaseSave} disabled={isSaving} className="nav-btn group" title="Sync to Cloud">
            {isSaving ? <ReactLoading type="spin" height={16} width={16} color="#8b5cf6" /> : <FiSave className="w-4 h-4 text-gray-400 group-hover:text-blue-400" />}
          </button>
          <button onClick={() => navigate("/control-center")} className="nav-btn group" title="Terminal">
            <FiHome className="w-4 h-4 text-gray-400 group-hover:text-white" />
          </button>
          <button onClick={handleLogout} className="nav-btn group" title="Disconnect">
            <FiLogOut className="w-4 h-4 text-red-400/60 group-hover:text-red-400" />
          </button>
        </div>
      </nav>

      <main className="relative z-10 flex-1 flex overflow-hidden">
        {/* Fixed Sidebar */}
        <aside className="w-20 md:w-64 border-r border-white/[0.06] bg-[#0d0d0e]/50 backdrop-blur-md flex flex-col shrink-0 h-full overflow-hidden">
          <div className="p-5 border-b border-white/[0.06] bg-white/[0.02]">
            <div className="flex items-center justify-between mb-2.5 px-1">
              <span className="text-[10px] uppercase tracking-[0.15em] font-black text-gray-500">Sync Status</span>
              <span className="text-[11px] font-black text-purple-400">{Math.round(progress)}%</span>
            </div>
            <div className="h-1.5 bg-white/5 rounded-full overflow-hidden p-[1px]">
              <motion.div
                className="h-full bg-gradient-to-r from-purple-500 to-blue-500 rounded-full shadow-[0_0_10px_rgba(168,85,247,0.5)]"
                initial={{ width: 0 }}
                animate={{ width: `${progress}%` }}
              />
            </div>
          </div>

          <div className="flex-1 py-6 px-3 space-y-2 overflow-y-auto custom-scrollbar">
            {steps.map((s, i) => {
              const isActive = step === s.id;
              const isPast = steps.findIndex(st => st.id === step) > i;
              return (
                <button
                  key={s.id}
                  onClick={() => setStep(s.id)}
                  className={`w-full group relative flex items-center gap-4 p-3.5 rounded-2xl transition-all duration-300 ${isActive ? 'bg-white/[0.06] shadow-xl border border-white/5' : 'hover:bg-white/[0.03]'}`}
                >
                  <div className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 transition-all duration-300 ${isActive ? 'bg-gradient-to-br from-purple-600 to-blue-600 text-white shadow-lg shadow-purple-500/30 rotate-3' : isPast ? 'bg-green-500/20 text-green-400' : 'bg-white/5 text-gray-500 group-hover:text-gray-300'}`}>
                    {isPast ? <FiCheck size={16} /> : <s.icon size={16} />}
                  </div>
                  <div className="hidden md:block text-left">
                    <p className={`text-[13px] font-bold tracking-tight ${isActive ? 'text-white' : 'text-gray-400 group-hover:text-gray-200'}`}>{s.title}</p>
                    <p className="text-[9px] text-gray-500 font-bold group-hover:text-gray-400 transition-colors uppercase tracking-widest mt-0.5">{s.description}</p>
                  </div>
                  {isActive && <motion.div layoutId="activeStep" className="absolute left-0 w-1.5 h-6 bg-purple-500 rounded-r-full shadow-[2px_0_10px_rgba(168,85,247,0.5)]" />}
                </button>
              );
            })}
          </div>

          <div className="p-5 border-t border-white/[0.06] bg-white/[0.02] flex flex-col gap-4">
            <button
              onClick={handleSupabaseSave}
              className="w-full flex items-center justify-center gap-3 bg-gradient-to-br from-purple-600 to-blue-600 p-3 rounded-2xl text-[12px] font-black text-white shadow-xl shadow-purple-500/20 hover:shadow-purple-500/40 transition-all hover:scale-[1.02] active:scale-[0.98]"
            >
              <FiSave size={16} />
              <span className="hidden md:block uppercase tracking-widest">Deploy Sync</span>
            </button>
          </div>
        </aside>

        {/* Content Flow */}
        <section className="flex-1 relative overflow-hidden bg-[#080808]">
          <div className="h-full overflow-y-auto custom-scrollbar p-6 md:p-12">
            <div className="w-full mx-auto">
              <AnimatePresence mode="wait">
                <motion.div
                  key={step}
                  initial={{ opacity: 0, scale: 0.99, y: 10 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.99, y: -10 }}
                  transition={{ duration: 0.2, ease: "easeOut" }}
                >
                  {step === "intro" && <Introduction step={step} setStep={setStep} />}
                  {step === "overview" && <Overview step={step} setStep={setStep} />}
                  {step === "skills" && <Skills step={step} setStep={setStep} />}
                  {step === "exp" && <Experience step={step} setStep={setStep} />}
                  {step === "project" && <Project step={step} setStep={setStep} />}
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </section>

        {/* Floating Preview Drawer */}
        <AnimatePresence>
          {showPreview && (
            <motion.div
              initial={{ x: '100%', opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: '100%', opacity: 0 }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="absolute right-4 top-20 bottom-4 w-full md:w-[600px] z-[100] bg-white rounded-3xl overflow-hidden shadow-2xl border border-black/10 origin-right"
            >
              <div className="h-full relative group">
                <button
                  onClick={() => setShowPreview(false)}
                  className="absolute top-4 right-4 z-[110] w-8 h-8 bg-black/80 backdrop-blur-md rounded-full flex items-center justify-center text-white hover:scale-110 active:scale-95 transition-all shadow-xl"
                >
                  <FiX size={16} />
                </button>
                <div className="h-full scale-[0.9] origin-top border border-black/5 rounded-2xl overflow-hidden pointer-events-none">
                  <Preview />
                </div>
                <div className="absolute bottom-6 left-1/2 -translate-x-1/2 px-4 py-2 bg-black/80 backdrop-blur-md border border-white/10 rounded-full text-[10px] font-bold text-white tracking-widest uppercase pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity">
                  Interactive Preview Active
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {/* Success Pulse */}
      <AnimatePresence>
        {showSuccess && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="fixed bottom-6 left-1/2 -translate-x-1/2 z-[200] bg-green-500 text-white px-4 py-2 rounded-full text-[11px] font-bold shadow-2xl flex items-center gap-2"
          >
            <FiCheck /> Synchronized with Universe
          </motion.div>
        )}
      </AnimatePresence>

      <style jsx>{`
        .nav-btn {
          @apply p-2 hover:bg-white/[0.03] rounded-lg transition-all active:scale-90;
        }
        .custom-scrollbar::-webkit-scrollbar {
          width: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: rgba(255, 255, 255, 0.05);
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: rgba(255, 255, 255, 0.1);
        }
      `}</style>
    </div>
  );
}
