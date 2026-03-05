import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { motion, AnimatePresence } from "framer-motion";
import { supabase } from "../../../Supabase/supabaseClient";
import ReactLoading from "react-loading";
import {
  FiBriefcase,
  FiPlus,
  FiTrash2,
  FiSave,
  FiZap,
  FiCalendar,
  FiMapPin,
  FiEdit2,
  FiChevronRight
} from "react-icons/fi";
import { FormField, StepHeader, InfoHint } from "../components";

export default function Experience({ step, setStep }) {
  const [experiences, setExperiences] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [editingId, setEditingId] = useState(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    reset,
    watch
  } = useForm({
    defaultValues: { title: "", company_name: "", start_date: "", end_date: "", points: "" }
  });

  useEffect(() => {
    fetchExperiences();
  }, []);

  const fetchExperiences = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from("experiences")
        .select("*")
        .order("display_order", { ascending: true })
        .order("start_date", { ascending: false });

      if (error) throw error;
      setExperiences(data || []);
    } catch (error) {
      console.error("Error fetching experiences:", error);
    } finally {
      setLoading(false);
    }
  };

  const onSubmit = async (data) => {
    setIsSaving(true);
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error("User not authenticated");

      const splitPoints = data.points
        .split(".")
        .map(p => p.trim())
        .filter(p => p.length > 0);

      const expData = {
        profile_id: user.id,
        title: data.title,
        company_name: data.company_name,
        start_date: data.start_date,
        end_date: data.end_date || null,
        description_points: splitPoints,
        display_order: experiences.length
      };

      if (editingId) {
        const { error } = await supabase
          .from("experiences")
          .update(expData)
          .eq("id", editingId);
        if (error) throw error;
      } else {
        const { error } = await supabase
          .from("experiences")
          .insert([expData]);
        if (error) throw error;
      }

      reset();
      setEditingId(null);
      fetchExperiences();
    } catch (error) {
      console.error("Error saving experience:", error);
    } finally {
      setIsSaving(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this milestone?")) return;

    try {
      const { error } = await supabase
        .from("experiences")
        .delete()
        .eq("id", id);
      if (error) throw error;
      setExperiences(experiences.filter(e => e.id !== id));
    } catch (error) {
      console.error("Error deleting experience:", error);
    }
  };

  const handleEdit = (exp) => {
    setEditingId(exp.id);
    setValue("title", exp.title);
    setValue("company_name", exp.company_name);
    setValue("start_date", exp.start_date);
    setValue("end_date", exp.end_date || "");
    setValue("points", exp.description_points.join(". "));
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
        title="Experience"
        description="Your professional trajectory"
        icon={FiBriefcase}
        colorClass="from-purple-500 to-blue-600"
      />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Left Column: Form */}
        <div className="space-y-6">
          <h3 className="text-sm font-bold text-gray-400 uppercase tracking-widest mb-4">
            {editingId ? "Refine Milestone" : "Log New Milestone"}
          </h3>

          <form onSubmit={handleSubmit(onSubmit)} className="bg-[#0d0d0e] border border-white/[0.08] p-8 rounded-3xl space-y-8 shadow-2xl relative overflow-hidden">
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormField
                  label="Role / Capacity"
                  placeholder="e.g. Senior Frontend Engineer"
                  icon={FiBriefcase}
                  {...register("title", { required: true })}
                />
                <FormField
                  label="Organization"
                  placeholder="e.g. Stripe, SpaceX"
                  icon={FiMapPin}
                  {...register("company_name", { required: true })}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormField
                  label="Entry Date"
                  type="date"
                  icon={FiCalendar}
                  {...register("start_date", { required: true })}
                />
                <FormField
                  label="Exit Date"
                  type="date"
                  icon={FiCalendar}
                  helperText="Leave empty for 'Present'"
                  {...register("end_date")}
                />
              </div>

              <FormField
                label="Key Impact & Responsibilities"
                type="textarea"
                placeholder="Architected the design system. Reduced bundle size by 40%."
                helperText="Summarize your impact. Separate points with periods (.)"
                {...register("points", { required: true })}
              />
            </div>

            <button
              type="submit"
              disabled={isSaving}
              className="w-full bg-gradient-to-r from-purple-600 to-blue-600 py-3.5 rounded-xl text-[12px] font-bold text-white hover:scale-[1.01] transition-all disabled:opacity-50 flex items-center justify-center gap-2 shadow-lg shadow-purple-500/10"
            >
              {isSaving ? (
                <>
                  <ReactLoading type="spin" height={16} width={16} color="#fff" />
                  <span>Recording History...</span>
                </>
              ) : (
                <>
                  <FiSave size={14} />
                  <span>{editingId ? "Update Trajectory" : "Commit to Timeline"}</span>
                </>
              )}
            </button>
          </form>

          <InfoHint icon={FiZap}>
            Focus on quantifiable achievements. Use action-oriented language to define your impact.
          </InfoHint>
        </div>

        {/* Right Column: List */}
        <div className="space-y-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-bold text-gray-400 uppercase tracking-widest">Career Hub</h3>
            <button
              onClick={() => { setEditingId(null); reset(); }}
              className="flex items-center gap-2 text-[11px] font-bold text-purple-400 hover:text-purple-300 transition-colors uppercase tracking-wider"
            >
              <FiPlus size={14} />
              New Milestone
            </button>
          </div>

          <div className="space-y-4 max-h-[600px] overflow-y-auto pr-2 custom-scrollbar">
            <AnimatePresence mode="popLayout">
              {experiences.length === 0 ? (
                <div className="text-center py-12 border border-dashed border-white/5 rounded-2xl">
                  <FiBriefcase className="mx-auto mb-3 text-gray-600" size={24} />
                  <p className="text-[12px] text-gray-500">No professional milestones logged yet.</p>
                </div>
              ) : (
                experiences.map(exp => (
                  <motion.div
                    key={exp.id}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    className={`p-5 rounded-2xl border transition-all ${editingId === exp.id ? 'bg-purple-500/10 border-purple-500/30' : 'bg-white/[0.02] border-white/5 hover:border-white/10'}`}
                  >
                    <div className="flex gap-4">
                      <div className="w-10 h-10 rounded-xl bg-black/40 border border-white/5 flex items-center justify-center shrink-0">
                        <FiBriefcase size={16} className="text-purple-400" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex justify-between items-start">
                          <div>
                            <h5 className="text-[14px] font-bold text-white tracking-tight">{exp.title}</h5>
                            <p className="text-[11px] font-medium text-gray-400 flex items-center gap-1.5 mt-0.5">
                              {exp.company_name} • <span className="text-purple-400/80">{exp.start_date} - {exp.end_date || "Present"}</span>
                            </p>
                          </div>
                          <div className="flex gap-1">
                            <button onClick={() => handleEdit(exp)} className="p-1.5 text-gray-500 hover:text-purple-400 transition-colors"><FiEdit2 size={12} /></button>
                            <button onClick={() => handleDelete(exp.id)} className="p-1.5 text-gray-500 hover:text-red-400 transition-colors"><FiTrash2 size={12} /></button>
                          </div>
                        </div>
                        <ul className="mt-3 space-y-1.5">
                          {exp.description_points.slice(0, 2).map((p, idx) => (
                            <li key={idx} className="text-[11px] text-gray-500 leading-relaxed flex gap-2">
                              <span className="text-purple-500/50 mt-1">•</span>
                              {p}
                            </li>
                          ))}
                          {exp.description_points.length > 2 && (
                            <li className="text-[10px] text-gray-600 italic pl-3">+{exp.description_points.length - 2} more points...</li>
                          )}
                        </ul>
                      </div>
                    </div>
                  </motion.div>
                ))
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>

      {/* Optional: Add StepNavigation back if needed, but following the Project.jsx pattern for now */}
    </div>
  );
}

