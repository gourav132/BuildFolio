import React, { useState, useEffect, useContext } from "react";
import { auth, db } from "../../firebase/config";
import { logout } from "../../firebase/config";
import { useAuthState } from "react-firebase-hooks/auth";
import { useNavigate } from "react-router-dom";
import {
  getFirestore,
  collection,
  getDocs,
  updateDoc,
} from "firebase/firestore";
import ReactLoading from "react-loading";
import { motion, AnimatePresence } from "framer-motion";
import copy from "copy-text-to-clipboard";

import "./CustomizeStyle.css";
import { Preview } from "../index";
import { PreviewContext } from "../../context/PreviewContext";

import Experience from "./Experience Field/Experience";
import Project from "./Project/Project";
import Overview from "./Overview/Overview";
import Introduction from "./Introduction/Introduction";
import Skills from "./Skills/Skills";

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
  FiArrowRight,
  FiArrowLeft,
  FiHome,
  FiX,
  FiMaximize2,
  FiMinimize2,
  FiSettings,
  FiCode
} from "react-icons/fi";

import Modal from "../../components/Modals/Modal";

const steps = [
  { id: "intro", title: "Introduction", icon: FiUser, description: "Basic information" },
  { id: "overview", title: "Overview", icon: FiFileText, description: "About yourself" },
  { id: "skills", title: "Skills", icon: FiCode, description: "Technical expertise" },
  { id: "exp", title: "Experience", icon: FiBriefcase, description: "Work history" },
  { id: "project", title: "Projects", icon: FiFolder, description: "Your work" },
];

export default function Customize() {
  const [previewData, setPreviewData] = useContext(PreviewContext);
  const [showPreview, setShowPreview] = useState(true);
  const [step, setStep] = useState("intro");
  const [isSaving, setIsSaving] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const [user, loading, error] = useAuthState(auth);
  const navigate = useNavigate();

  useEffect(() => {
    if (loading) return;
    if (!user) navigate("/");
  }, [loading, user, navigate]);

  const copyURL = () => {
    copy(previewData.publicURL);
    setShowSuccess(true);
    setTimeout(() => setShowSuccess(false), 2000);
  };

  async function handleSubmitButton() {
    setIsSaving(true);
    try {
      const firestore = getFirestore();
      const userCollection = collection(firestore, "users");

      const snapshot = await getDocs(userCollection);
      const userDoc = snapshot.docs.find((doc) => doc.data().uid === user.uid);
      if (userDoc) {
        const userRef = userDoc.ref;
        await updateDoc(userRef, { previewData });
        console.log("Preview data added to the document!");
        setShowSuccess(true);
        setTimeout(() => setShowSuccess(false), 2000);
      } else {
        console.error("Document with the given UID not found.");
      }
    } catch (error) {
      console.error("Error adding preview data:", error);
    } finally {
      setIsSaving(false);
    }
  }

  const currentStepIndex = steps.findIndex(s => s.id === step);
  const progress = ((currentStepIndex + 1) / steps.length) * 100;

  const handleLogout = async () => {
    try {
      await logout();
      navigate("/");
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };

  return (
    <>
      {loading || !user ? (
        <div className="min-h-screen w-8/12 m-auto bg-gradient-to-br from-gray-900 via-black to-gray-900 flex items-center justify-center">
          <div className="text-center">
            <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-blue-500 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-2xl shadow-purple-500/25">
              <FiSettings className="w-8 h-8 text-white animate-spin" />
            </div>
            <p className="text-gray-400 text-sm">Loading your workspace...</p>
          </div>
        </div>
      ) : (
        <div className="min-h-screen w-12/12 m-auto bg-black text-white relative overflow-hidden">
          {/* Minimal Background */}
          <div className="fixed inset-0 bg-gradient-to-br from-black via-gray-900 to-black">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,rgba(120,119,198,0.05),transparent_50%)]"></div>
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_70%,rgba(120,119,198,0.03),transparent_50%)]"></div>
          </div>

          {/* Success Notification */}
          <AnimatePresence>
            {showSuccess && (
              <motion.div
                initial={{ opacity: 0, y: -50, scale: 0.9 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -50, scale: 0.9 }}
                className="fixed top-6 right-6 z-50 bg-green-600 text-white px-6 py-3 rounded-2xl shadow-2xl flex items-center space-x-3 backdrop-blur-sm"
              >
                <FiCheck className="w-5 h-5" />
                <span className="text-sm font-medium">URL copied to clipboard!</span>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Minimal Top Navigation */}
          <div className="relative z-10 border-b border-gray-800">
            <div className="max-w-7xl mx-auto px-6 py-3">
              <div className="flex items-center justify-between">
                {/* Logo */}
                <div className="flex items-center space-x-2">
                  <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-blue-500 rounded-lg flex items-center justify-center shadow-lg shadow-purple-500/25">
                    <span className="text-white font-bold text-sm">F</span>
                  </div>
                  <span className="text-lg font-semibold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                    BuildFolio
                  </span>
                </div>

                {/* Action Buttons */}
                <div className="flex items-center space-x-1">
                  <button
                    onClick={copyURL}
                    className="p-2 text-gray-400 hover:text-white hover:bg-gray-800 rounded-lg transition-all duration-200"
                    title="Copy Portfolio URL"
                  >
                    <FiLink className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => setShowPreview(!showPreview)}
                    className="p-2 text-gray-400 hover:text-white hover:bg-gray-800 rounded-lg transition-all duration-200"
                    title={showPreview ? "Hide Preview" : "Show Preview"}
                  >
                    {showPreview ? <FiEyeOff className="w-4 h-4" /> : <FiEye className="w-4 h-4" />}
                  </button>
                  <button
                    onClick={handleSubmitButton}
                    disabled={isSaving}
                    className="p-2 text-gray-400 hover:text-white hover:bg-gray-800 rounded-lg transition-all duration-200 disabled:opacity-50"
                    title="Save Changes"
                  >
                    {isSaving ? (
                      <ReactLoading type="spin" height="16px" width="16px" color="#8b5cf6" />
                    ) : (
                      <FiSave className="w-4 h-4" />
                    )}
                  </button>
                  <button
                    onClick={() => navigate("/control-center")}
                    className="p-2 text-gray-400 hover:text-white hover:bg-gray-800 rounded-lg transition-all duration-200"
                    title="Back to Control Center"
                  >
                    <FiHome className="w-4 h-4" />
                  </button>
                  <button
                    onClick={handleLogout}
                    className="p-2 text-red-400 hover:text-red-300 hover:bg-red-500/20 rounded-lg transition-all duration-200"
                    title="Logout"
                  >
                    <FiLogOut className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="relative z-10 flex h-[calc(100vh-60px)]">
            {/* Compact Sidebar */}
            <div className="w-56 bg-gray-900/30 border-r border-gray-800 flex flex-col">
              {/* Progress */}
              <div className="p-4 border-b border-gray-800">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-gray-300 font-medium">Progress</span>
                  <span className="text-sm text-white font-semibold">{Math.round(progress)}%</span>
                </div>
                <div className="w-full bg-gray-800 rounded-full h-1.5 overflow-hidden">
                  <motion.div
                    className="bg-gradient-to-r from-purple-500 to-blue-500 h-1.5 rounded-full"
                    initial={{ width: 0 }}
                    animate={{ width: `${progress}%` }}
                    transition={{ duration: 0.5 }}
                  />
                </div>
              </div>

              {/* Step Navigation */}
              <div className="flex-1 p-3">
                <div className="space-y-1">
                  {steps.map((stepItem, index) => {
                    const Icon = stepItem.icon;
                    const isActive = stepItem.id === step;
                    const isCompleted = index < currentStepIndex;
                    
                    return (
                      <button
                        key={stepItem.id}
                        onClick={() => setStep(stepItem.id)}
                        className={`w-full flex items-center space-x-3 p-3 rounded-lg transition-all duration-200 text-left ${
                          isActive 
                            ? 'bg-purple-500/20 border border-purple-500/30' 
                            : isCompleted
                            ? 'bg-green-500/10 border border-green-500/20'
                            : 'hover:bg-gray-800/50'
                        }`}
                      >
                        <div className={`w-6 h-6 rounded-lg flex items-center justify-center ${
                          isActive 
                            ? 'bg-gradient-to-r from-purple-500 to-blue-500 text-white' 
                            : isCompleted
                            ? 'bg-green-500 text-white'
                            : 'bg-gray-700 text-gray-400'
                        }`}>
                          {isCompleted ? (
                            <FiCheck className="w-3 h-3" />
                          ) : (
                            <Icon className="w-3 h-3" />
                          )}
                        </div>
                        <div className="flex-1">
                          <div className={`font-medium text-sm ${
                            isActive ? 'text-white' : isCompleted ? 'text-green-300' : 'text-gray-300'
                          }`}>
                            {stepItem.title}
                          </div>
                          <div className={`text-xs ${
                            isActive ? 'text-purple-300' : isCompleted ? 'text-green-400' : 'text-gray-500'
                          }`}>
                            {stepItem.description}
                          </div>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Save Button */}
              <div className="p-3 border-t border-gray-800">
                <button
                  onClick={handleSubmitButton}
                  disabled={isSaving}
                  className="w-full flex items-center justify-center space-x-2 px-4 py-2 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-lg hover:from-purple-700 hover:to-blue-700 transition-all duration-200 font-medium text-sm disabled:opacity-50"
                >
                  {isSaving ? (
                    <>
                      <ReactLoading type="spin" height="12px" width="12px" color="#ffffff" />
                      <span>Saving...</span>
                    </>
                  ) : (
                    <>
                      <FiSave className="w-4 h-4" />
                      <span>Save Progress</span>
                    </>
                  )}
                </button>
              </div>
            </div>

            {/* Content Area */}
            <div className="flex-1 bg-gray-900/20">
              <div className="h-full overflow-y-auto">
                <div className="p-6 max-w-4xl mx-auto">
                  <AnimatePresence mode="wait">
                    {step === "intro" && (
                      <motion.div
                        key="intro"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ duration: 0.3 }}
                      >
                        <Introduction step={step} setStep={setStep} />
                      </motion.div>
                    )}
                    {step === "overview" && (
                      <motion.div
                        key="overview"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ duration: 0.3 }}
                      >
                        <Overview step={step} setStep={setStep} />
                      </motion.div>
                    )}
                    {step === "skills" && (
                      <motion.div
                        key="skills"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ duration: 0.3 }}
                      >
                        <Skills step={step} setStep={setStep} />
                      </motion.div>
                    )}
                    {step === "exp" && (
                      <motion.div
                        key="exp"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ duration: 0.3 }}
                      >
                        <Experience step={step} setStep={setStep} />
                      </motion.div>
                    )}
                    {step === "project" && (
                      <motion.div
                        key="project"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ duration: 0.3 }}
                      >
                        <Project step={step} setStep={setStep} />
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>
            </div>
          </div>

          {/* Compact Preview Modal */}
          <AnimatePresence>
            {showPreview && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4"
                onClick={() => setShowPreview(false)}
              >
                <motion.div
                  initial={{ scale: 0.95, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0.95, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                  className="w-full max-w-5xl h-[85vh] bg-white rounded-2xl overflow-hidden shadow-2xl relative"
                  onClick={(e) => e.stopPropagation()}
                >
                  {/* Close Button */}
                  <button
                    onClick={() => setShowPreview(false)}
                    className="absolute top-3 right-3 z-10 p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg transition-all duration-200"
                  >
                    <FiX className="w-4 h-4" />
                  </button>
                  
                  {/* Preview Content */}
                  <div className="h-full overflow-y-auto">
                    <Preview />
                  </div>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      )}
    </>
  );
}
