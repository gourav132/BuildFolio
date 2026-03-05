import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { PreviewContext } from "../../context/PreviewContext";
import { supabase } from "../../Supabase/supabaseClient";
import { useSupabaseAuth } from "../../hooks/useSupabaseAuth";

import {
  FiUser, FiMail, FiPhone, FiMapPin, FiGlobe, FiGithub, FiLinkedin, FiTwitter,
  FiInstagram, FiFacebook, FiYoutube, FiDribbble, FiSave, FiEye, FiEyeOff,
  FiLock, FiSettings, FiCheck, FiX, FiHome, FiLogOut, FiShield, FiBell, FiTrash2
} from "react-icons/fi";

export default function Settings() {
  const [user, loading] = useSupabaseAuth();
  const navigate = useNavigate();
  const [isSaving, setIsSaving] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [showError, setShowError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  // Contact Information
  const [contactInfo, setContactInfo] = useState({
    email: "", phone: "", location: "", website: ""
  });

  // Social Media Links
  const [socialLinks, setSocialLinks] = useState({
    github: "", linkedin: "", twitter: "", instagram: "",
    facebook: "", youtube: "", dribbble: ""
  });

  // Password Change
  const [passwordData, setPasswordData] = useState({
    currentPassword: "", newPassword: "", confirmPassword: ""
  });
  const [showPasswords, setShowPasswords] = useState({
    current: false, new: false, confirm: false
  });

  // Account Settings
  const [accountSettings, setAccountSettings] = useState({
    emailNotifications: true, portfolioPublic: true, autoSave: true
  });

  useEffect(() => {
    if (loading) return;
    if (!user) {
      navigate("/");
      return;
    }
    loadUserSettings();
  }, [loading, user, navigate]);

  const loadUserSettings = async () => {
    try {
      if (!user) return;

      const { data: rows } = await supabase
        .from('social_links')
        .select('platform, url')
        .eq('profile_id', user.id);

      if (rows) {
        const loaded = {};
        rows.forEach(r => { loaded[r.platform] = r.url; });
        setSocialLinks(prev => ({ ...prev, ...loaded }));
      }
    } catch (error) {
      console.error('Error loading social links:', error);
    }
  };

  const handleSaveSettings = async () => {
    setIsSaving(true);
    try {
      if (!user) throw new Error('Not authenticated');

      // Upsert each social link platform (insert or update on conflict)
      const platforms = Object.keys(socialLinks);
      const upserts = platforms
        .filter(p => socialLinks[p]?.trim()) // only rows with a URL
        .map(platform => ({
          profile_id: user.id,
          platform,
          url: socialLinks[platform].trim()
        }));

      if (upserts.length > 0) {
        const { error } = await supabase
          .from('social_links')
          .upsert(upserts, { onConflict: 'profile_id,platform' });
        if (error) throw error;
      }

      // Delete cleared entries
      const cleared = platforms.filter(p => !socialLinks[p]?.trim());
      for (const platform of cleared) {
        await supabase
          .from('social_links')
          .delete()
          .eq('profile_id', user.id)
          .eq('platform', platform);
      }

      showSuccessMessage('Settings saved successfully!');
    } catch (error) {
      console.error('Error saving settings:', error);
      showErrorMessage('Failed to save settings');
    } finally {
      setIsSaving(false);
    }
  };

  const handlePasswordChange = async () => {
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      showErrorMessage("New passwords don't match");
      return;
    }
    if (passwordData.newPassword.length < 6) {
      showErrorMessage("Password must be at least 6 characters");
      return;
    }

    setIsSaving(true);
    try {
      // With Supabase, you can directly update the password of the active logged in session
      const { error } = await supabase.auth.updateUser({
        password: passwordData.newPassword
      });

      if (error) throw error;

      setPasswordData({ currentPassword: "", newPassword: "", confirmPassword: "" });
      showSuccessMessage("Password changed successfully!");
    } catch (error) {
      console.error("Error changing password:", error);
      showErrorMessage("Failed to change password: " + error.message);
    } finally {
      setIsSaving(false);
    }
  };

  const handleLogout = async () => {
    try {
      await supabase.auth.signOut();
      navigate("/");
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };

  const showSuccessMessage = (message) => {
    setShowSuccess(true);
    setTimeout(() => setShowSuccess(false), 3000);
  };

  const showErrorMessage = (message) => {
    setErrorMessage(message);
    setShowError(true);
    setTimeout(() => setShowError(false), 3000);
  };

  const socialPlatforms = [
    { key: "github", label: "GitHub", icon: FiGithub, color: "hover:text-gray-800" },
    { key: "linkedin", label: "LinkedIn", icon: FiLinkedin, color: "hover:text-blue-600" },
    { key: "twitter", label: "Twitter", icon: FiTwitter, color: "hover:text-blue-400" },
    { key: "instagram", label: "Instagram", icon: FiInstagram, color: "hover:text-pink-500" },
    { key: "facebook", label: "Facebook", icon: FiFacebook, color: "hover:text-blue-600" },
    { key: "youtube", label: "YouTube", icon: FiYoutube, color: "hover:text-red-600" },
    { key: "dribbble", label: "Dribbble", icon: FiDribbble, color: "hover:text-pink-500" }
  ];

  const sections = [
    { id: 'contact', label: 'Contact Info', icon: FiUser },
    { id: 'social', label: 'Social Links', icon: FiGlobe },
    { id: 'password', label: 'Password', icon: FiLock },
    { id: 'account', label: 'Account', icon: FiShield },
    { id: 'danger', label: 'Danger Zone', icon: FiTrash2 },
  ];
  const [activeSection, setActiveSection] = useState('contact');

  const inputClass = "w-full pl-10 pr-4 py-3 bg-white/5 border border-white/10 rounded-xl text-sm text-white placeholder-gray-600 focus:outline-none focus:border-purple-500/60 focus:bg-white/8 transition-all duration-200";
  const labelClass = "block text-xs font-medium text-gray-500 uppercase tracking-widest mb-2";

  if (loading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="w-10 h-10 rounded-full border-2 border-purple-500/30 border-t-purple-500 animate-spin" />
          <p className="text-gray-600 text-xs tracking-widest uppercase">Loading</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#080808] text-white">
      {/* Subtle background */}
      <div className="fixed inset-0 bg-[radial-gradient(ellipse_at_top,rgba(120,80,200,0.06),transparent_60%)] pointer-events-none" />

      {/* Toast notifications */}
      <AnimatePresence>
        {showSuccess && (
          <motion.div
            initial={{ opacity: 0, y: -16, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -16, scale: 0.95 }}
            className="fixed top-6 right-6 z-50 flex items-center gap-2.5 bg-[#111] border border-green-500/30 text-green-400 text-sm px-4 py-3 rounded-xl shadow-xl shadow-black/50"
          >
            <FiCheck className="w-4 h-4 flex-shrink-0" />
            Settings saved
          </motion.div>
        )}
        {showError && (
          <motion.div
            initial={{ opacity: 0, y: -16, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -16, scale: 0.95 }}
            className="fixed top-6 right-6 z-50 flex items-center gap-2.5 bg-[#111] border border-red-500/30 text-red-400 text-sm px-4 py-3 rounded-xl shadow-xl shadow-black/50"
          >
            <FiX className="w-4 h-4 flex-shrink-0" />
            {errorMessage}
          </motion.div>
        )}
      </AnimatePresence>

      <div className="relative z-10 max-w-5xl mx-auto px-6 py-12">

        {/* Page header */}
        <div className="flex items-center justify-between mb-12">
          <div>
            <p className="text-xs text-gray-600 uppercase tracking-[0.3em] mb-2">Account</p>
            <h1 className="text-3xl font-bold text-white tracking-tight">Settings</h1>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={() => navigate('/control-center')}
              className="flex items-center gap-2 px-4 py-2 border border-gray-800 text-gray-400 text-sm rounded-xl hover:border-gray-700 hover:text-white transition-all duration-200"
            >
              <FiHome className="w-3.5 h-3.5" /> Dashboard
            </button>
            <button
              onClick={handleSaveSettings}
              disabled={isSaving}
              className="flex items-center gap-2 px-5 py-2 bg-purple-600 text-white text-sm font-medium rounded-xl hover:bg-purple-500 transition-all duration-200 disabled:opacity-50"
            >
              <FiSave className="w-3.5 h-3.5" />
              {isSaving ? 'Saving…' : 'Save Changes'}
            </button>
          </div>
        </div>

        {/* Two-column layout */}
        <div className="flex gap-8 items-start">

          {/* Sticky sidebar navigation */}
          <aside className="w-52 flex-shrink-0 sticky top-10">
            <nav className="flex flex-col gap-1">
              {sections.map(({ id, label, icon: Icon }) => (
                <button
                  key={id}
                  onClick={() => setActiveSection(id)}
                  className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm transition-all duration-200 text-left ${activeSection === id
                    ? 'bg-white/8 text-white font-medium border border-white/10'
                    : 'text-gray-500 hover:text-gray-300 hover:bg-white/4'
                    }`}
                >
                  <Icon className="w-4 h-4 flex-shrink-0" />
                  {label}
                </button>
              ))}
              <div className="mt-4 pt-4 border-t border-white/5">
                <button
                  onClick={handleLogout}
                  className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm text-red-500/80 hover:text-red-400 hover:bg-red-500/5 transition-all duration-200 w-full text-left"
                >
                  <FiLogOut className="w-4 h-4 flex-shrink-0" />
                  Log out
                </button>
              </div>
            </nav>
          </aside>

          {/* Content area */}
          <div className="flex-1 min-w-0 space-y-6">

            {/* Contact Information */}
            {activeSection === 'contact' && (
              <motion.div
                key="contact"
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className="bg-white/[0.03] border border-gray-800 rounded-2xl p-8"
              >
                <h2 className="text-lg font-semibold text-white mb-1">Contact Information</h2>
                <p className="text-sm text-gray-600 mb-8">How people can reach you.</p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {[
                    { label: 'Email', key: 'email', icon: FiMail, type: 'email', placeholder: 'you@example.com' },
                    { label: 'Phone', key: 'phone', icon: FiPhone, type: 'tel', placeholder: '+1 234 567 8900' },
                    { label: 'Location', key: 'location', icon: FiMapPin, type: 'text', placeholder: 'City, Country' },
                    { label: 'Website', key: 'website', icon: FiGlobe, type: 'url', placeholder: 'https://yoursite.com' },
                  ].map(({ label, key, icon: Icon, type, placeholder }) => (
                    <div key={key}>
                      <label className={labelClass}>{label}</label>
                      <div className="relative">
                        <Icon className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-600" />
                        <input
                          type={type}
                          value={contactInfo[key]}
                          onChange={(e) => setContactInfo({ ...contactInfo, [key]: e.target.value })}
                          className={inputClass}
                          placeholder={placeholder}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}

            {/* Social Links */}
            {activeSection === 'social' && (
              <motion.div
                key="social"
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className="bg-white/[0.03] border border-gray-800 rounded-2xl p-8"
              >
                <h2 className="text-lg font-semibold text-white mb-1">Social Media</h2>
                <p className="text-sm text-gray-600 mb-8">Links displayed on your portfolio.</p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {socialPlatforms.map(({ key, label, icon: Icon }) => (
                    <div key={key}>
                      <label className={labelClass}>{label}</label>
                      <div className="relative">
                        <Icon className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-600" />
                        <input
                          type="url"
                          value={socialLinks[key]}
                          onChange={(e) => setSocialLinks({ ...socialLinks, [key]: e.target.value })}
                          className={inputClass}
                          placeholder={`https://${key}.com/username`}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}

            {/* Password */}
            {activeSection === 'password' && (
              <motion.div
                key="password"
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className="bg-white/[0.03] border border-gray-800 rounded-2xl p-8"
              >
                <h2 className="text-lg font-semibold text-white mb-1">Change Password</h2>
                <p className="text-sm text-gray-600 mb-8">Update your account password.</p>
                <div className="space-y-6 max-w-md">
                  {[
                    { label: 'Current Password', key: 'currentPassword', showKey: 'current' },
                    { label: 'New Password', key: 'newPassword', showKey: 'new' },
                    { label: 'Confirm New Password', key: 'confirmPassword', showKey: 'confirm' },
                  ].map(({ label, key, showKey }) => (
                    <div key={key}>
                      <label className={labelClass}>{label}</label>
                      <div className="relative">
                        <FiLock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-600" />
                        <input
                          type={showPasswords[showKey] ? 'text' : 'password'}
                          value={passwordData[key]}
                          onChange={(e) => setPasswordData({ ...passwordData, [key]: e.target.value })}
                          className={inputClass + ' pr-12'}
                          placeholder="••••••••"
                        />
                        <button
                          onClick={() => setShowPasswords({ ...showPasswords, [showKey]: !showPasswords[showKey] })}
                          className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-600 hover:text-gray-400 transition-colors"
                        >
                          {showPasswords[showKey] ? <FiEyeOff className="w-4 h-4" /> : <FiEye className="w-4 h-4" />}
                        </button>
                      </div>
                    </div>
                  ))}
                  <button
                    onClick={handlePasswordChange}
                    disabled={isSaving || !passwordData.currentPassword || !passwordData.newPassword || !passwordData.confirmPassword}
                    className="px-6 py-3 bg-white text-black text-sm font-semibold rounded-xl hover:bg-gray-100 transition-all duration-200 disabled:opacity-40 disabled:cursor-not-allowed"
                  >
                    {isSaving ? 'Updating…' : 'Update Password'}
                  </button>
                </div>
              </motion.div>
            )}

            {/* Account Settings */}
            {activeSection === 'account' && (
              <motion.div
                key="account"
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className="bg-white/[0.03] border border-gray-800 rounded-2xl p-8"
              >
                <h2 className="text-lg font-semibold text-white mb-1">Preferences</h2>
                <p className="text-sm text-gray-600 mb-8">Manage your account behaviour.</p>
                <div className="space-y-2">
                  {[
                    { key: 'emailNotifications', label: 'Email Notifications', description: 'Receive updates and alerts to your inbox', icon: FiBell },
                    { key: 'portfolioPublic', label: 'Public Portfolio', description: 'Allow anyone with the link to view your portfolio', icon: FiGlobe },
                    { key: 'autoSave', label: 'Auto Save', description: 'Automatically save changes as you edit', icon: FiSave },
                  ].map(({ key, label, description, icon: Icon }) => (
                    <div
                      key={key}
                      onClick={() => setAccountSettings({ ...accountSettings, [key]: !accountSettings[key] })}
                      className="flex items-center justify-between p-5 rounded-xl border border-white/6 hover:border-white/10 hover:bg-white/[0.02] transition-all duration-200 cursor-pointer group"
                    >
                      <div className="flex items-start gap-4">
                        <div className="w-9 h-9 bg-white/5 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5 group-hover:bg-white/8 transition-colors">
                          <Icon className="w-4 h-4 text-gray-400" />
                        </div>
                        <div>
                          <p className="text-sm font-medium text-white">{label}</p>
                          <p className="text-xs text-gray-600 mt-0.5">{description}</p>
                        </div>
                      </div>
                      {/* Toggle */}
                      <div className={`relative w-11 h-6 rounded-full transition-all duration-300 flex-shrink-0 ${accountSettings[key] ? 'bg-purple-600' : 'bg-gray-800'}`}>
                        <div className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full shadow transition-transform duration-300 ${accountSettings[key] ? 'translate-x-5' : 'translate-x-0'}`} />
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}

            {/* Danger Zone */}
            {activeSection === 'danger' && (
              <motion.div
                key="danger"
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className="border border-red-900/30 rounded-2xl p-8"
              >
                <h2 className="text-lg font-semibold text-red-300 mb-1">Danger Zone</h2>
                <p className="text-sm text-red-900/80 mb-8">These actions are permanent and cannot be undone.</p>
                <div className="flex items-center justify-between p-5 rounded-xl border border-red-900/30 bg-red-950/20">
                  <div>
                    <p className="text-sm font-semibold text-red-300">Delete Account</p>
                    <p className="text-xs text-red-500/60 mt-0.5">Permanently remove your account and all associated data.</p>
                  </div>
                  <button className="px-5 py-2.5 bg-red-600 text-white text-sm font-medium rounded-xl hover:bg-red-500 transition-all duration-200">
                    Delete Account
                  </button>
                </div>
              </motion.div>
            )}

          </div>
        </div>
      </div>
    </div>
  );
}
