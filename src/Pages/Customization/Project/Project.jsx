import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { motion, AnimatePresence } from "framer-motion";
import { supabase } from "../../../Supabase/supabaseClient";
import ReactLoading from "react-loading";
import {
  FiFolder,
  FiUpload,
  FiGithub,
  FiGlobe,
  FiFileText,
  FiSave,
  FiPlus,
  FiTrash2,
  FiZap,
  FiEdit2,
  FiExternalLink
} from "react-icons/fi";
import { FormField, StepHeader, InfoHint } from "../components";

export default function Project() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [isSaving, setIsSaving] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    watch,
    setValue
  } = useForm();

  const watchedFile = watch("projectFile");

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from("projects")
        .select("*")
        .order("display_order", { ascending: true });

      if (error) throw error;
      setProjects(data || []);
    } catch (error) {
      console.error("Error fetching projects:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleUploadImage = async (file) => {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) throw new Error("User not authenticated");

    const fileExt = file.name.split('.').pop();
    const fileName = `${user.id}/${Date.now()}.${fileExt}`;
    const filePath = `project-images/${fileName}`;

    const { error: uploadError } = await supabase.storage
      .from("portfolio-assets")
      .upload(filePath, file);

    if (uploadError) throw uploadError;

    const { data: { publicUrl } } = supabase.storage
      .from("portfolio-assets")
      .getPublicUrl(filePath);

    return publicUrl;
  };

  const onSubmit = async (data) => {
    setIsSaving(true);
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error("User not authenticated");

      let imageUrl = null;
      if (data.projectFile && data.projectFile[0]) {
        imageUrl = await handleUploadImage(data.projectFile[0]);
      } else if (editingId) {
        const existing = projects.find(p => p.id === editingId);
        imageUrl = existing?.image_url;
      }

      const projectData = {
        profile_id: user.id,
        title: data.projectTitle,
        description: data.projectDescription,
        live_url: data.projectLink,
        github_url: data.githubLink,
        image_url: imageUrl,
        display_order: projects.length // Simple ordering for now
      };

      if (editingId) {
        const { error } = await supabase
          .from("projects")
          .update(projectData)
          .eq("id", editingId);
        if (error) throw error;
      } else {
        const { error } = await supabase
          .from("projects")
          .insert([projectData]);
        if (error) throw error;
      }

      reset();
      setEditingId(null);
      fetchProjects();
    } catch (error) {
      console.error("Error saving project:", error);
    } finally {
      setIsSaving(false);
    }
  };

  const handleDeleteProject = async (id) => {
    if (!window.confirm("Are you sure you want to delete this project?")) return;

    try {
      const { error } = await supabase
        .from("projects")
        .delete()
        .eq("id", id);
      if (error) throw error;
      setProjects(projects.filter(p => p.id !== id));
    } catch (error) {
      console.error("Error deleting project:", error);
    }
  };

  const handleEditProject = (p) => {
    setEditingId(p.id);
    setValue("projectTitle", p.title);
    setValue("projectDescription", p.description);
    setValue("githubLink", p.github_url);
    setValue("projectLink", p.live_url);
    // Note: projectFile can't be set programmatically easily for security reasons
  };

  if (loading) {
    return (
      <div className="h-full flex items-center justify-center py-20">
        <div className="w-8 h-8 border-2 border-purple-500 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="space-y-8 pb-12">
      <StepHeader
        title="Projects"
        description="Showcase your best engineering"
        icon={FiFolder}
        colorClass="from-blue-600 to-cyan-500"
      />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Left Column: Project list */}
                <div className="space-y-6">
          <h3 className="text-sm font-bold text-gray-400 uppercase tracking-widest mb-4">
            {editingId ? "Modify Prototype" : "Deploy Project Node"}
          </h3>

          <form onSubmit={handleSubmit(onSubmit)} className="bg-[#0d0d0e] border border-white/[0.08] p-8 rounded-3xl space-y-8 shadow-2xl relative overflow-hidden">
            <div className="space-y-6">
              <FormField
                label="Identifier"
                placeholder="Project name"
                icon={FiFileText}
                {...register("projectTitle", { required: true })}
              />

              <div className="space-y-2">
                <label className="text-[11px] font-bold text-gray-400 uppercase tracking-widest px-1">Visual Preview</label>
                <label className={`relative flex items-center justify-center h-[42px] px-4 bg-[#0a0a0b] border border-white/5 rounded-xl cursor-pointer hover:border-white/10 transition-all ${watchedFile?.[0] ? 'border-purple-500/50 text-purple-400' : 'text-gray-500'}`}>
                  <FiUpload className="mr-2" size={14} />
                  <span className="text-[12px] font-bold truncate">
                    {watchedFile?.[0]?.name || (editingId ? "Change Screenshot" : "Upload Screenshot")}
                  </span>
                  <input type="file" className="hidden" {...register("projectFile")} accept="image/*" />
                </label>
                {editingId && !watchedFile?.[0] && (
                  <p className="text-[9px] text-gray-500 mt-1">Keep empty to retain existing image</p>
                )}
              </div>

              <FormField
                label="Mission / Description"
                type="textarea"
                placeholder="Detailed breakdown of the build..."
                {...register("projectDescription", { required: true })}
              />

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <FormField label="Source Context" placeholder="GitHub URL" icon={FiGithub} {...register("githubLink")} />
                <FormField label="Live Access" placeholder="Deployment URL" icon={FiGlobe} {...register("projectLink")} />
              </div>
            </div>

            <button
              type="submit"
              disabled={isSaving}
              className="w-full bg-gradient-to-r from-purple-600 to-blue-600 py-3.5 rounded-xl text-[12px] font-bold text-white hover:scale-[1.01] transition-all disabled:opacity-50 flex items-center justify-center gap-2"
            >
              {isSaving ? (
                <>
                  <ReactLoading type="spin" height={16} width={16} color="#fff" />
                  <span>Processing Node...</span>
                </>
              ) : (
                <>
                  <FiSave size={14} />
                  <span>{editingId ? "Update Creation" : "Deploy Project Node"}</span>
                </>
              )}
            </button>
          </form>

          <InfoHint icon={FiZap}>
            Visuals matter. Ensure your project screenshots are high-resolution and represent the core UX.
          </InfoHint>
        </div>
        {/* Right Column: Form */}
        <div className="space-y-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-bold text-gray-400 uppercase tracking-widest">Your Projects</h3>
            <button
              onClick={() => { setEditingId(null); reset(); }}
              className="flex items-center gap-2 text-[11px] font-bold text-purple-400 hover:text-purple-300 transition-colors uppercase tracking-wider"
            >
              <FiPlus size={14} />
              New Prototype
            </button>
          </div>

          <div className="space-y-4 max-h-[600px] overflow-y-auto pr-2 custom-scrollbar">
            <AnimatePresence mode="popLayout">
              {projects.length === 0 ? (
                <div className="text-center py-12 border border-dashed border-white/5 rounded-2xl">
                  <FiFolder className="mx-auto mb-3 text-gray-600" size={24} />
                  <p className="text-[12px] text-gray-500">No projects deployed yet.</p>
                </div>
              ) : (
                projects.map(p => (
                  <motion.div
                    key={p.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    className={`p-4 rounded-2xl border transition-all ${editingId === p.id ? 'bg-purple-500/10 border-purple-500/30 shadow-lg shadow-purple-500/10' : 'bg-white/[0.02] border-white/5 hover:border-white/10'}`}
                  >
                    <div className="flex gap-4">
                      <div className="w-16 h-16 rounded-xl bg-black/40 overflow-hidden border border-white/5 flex-shrink-0">
                        {p.image_url ? (
                          <img src={p.image_url} className="w-full h-full object-cover" alt="" />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center text-gray-700">
                            <FiFolder size={20} />
                          </div>
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex justify-between items-start">
                          <h5 className="text-[13px] font-bold text-white truncate">{p.title}</h5>
                          <div className="flex gap-2">
                            <button onClick={() => handleEditProject(p)} className="p-1.5 text-gray-500 hover:text-purple-400 transition-colors"><FiEdit2 size={12} /></button>
                            <button onClick={() => handleDeleteProject(p.id)} className="p-1.5 text-gray-500 hover:text-red-400 transition-colors"><FiTrash2 size={12} /></button>
                          </div>
                        </div>
                        <p className="text-[10px] text-gray-500 line-clamp-2 leading-relaxed mt-1">{p.description}</p>
                        <div className="flex gap-3 mt-3">
                          {p.github_url && <a href={p.github_url} target="_blank" rel="noreferrer" className="text-gray-600 hover:text-white transition-colors"><FiGithub size={12} /></a>}
                          {p.live_url && <a href={p.live_url} target="_blank" rel="noreferrer" className="text-gray-600 hover:text-white transition-colors"><FiExternalLink size={12} /></a>}
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))
              )}
            </AnimatePresence>
          </div>
        </div>

      </div>
    </div>
  );
}

