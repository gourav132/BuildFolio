import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { motion, AnimatePresence } from "framer-motion";
import { supabase } from "../../../Supabase/supabaseClient";
import ReactLoading from "react-loading";
import { FiCode, FiPlus, FiTrash2, FiSave, FiZap, FiPlusCircle, FiActivity } from "react-icons/fi";
import { skillIcons, popularSkills } from "../constants";
import { FormField, StepHeader, InfoHint } from "../components";

export default function Skills() {
  const [skills, setSkills] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [editingId, setEditingId] = useState(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    setValue,
    reset,
    trigger
  } = useForm({
    mode: "onChange",
    defaultValues: { skillName: "", skillLevel: "Intermediate" }
  });

  useEffect(() => {
    fetchSkills();
  }, []);

  const fetchSkills = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from("skills")
        .select("*")
        .order("display_order", { ascending: true });

      if (error) throw error;
      setSkills(data || []);
    } catch (error) {
      console.error("Error fetching skills:", error);
    } finally {
      setLoading(false);
    }
  };

  const getIconData = (name) => {
    const data = skillIcons[name] || { icon: null, color: "#8b5cf6" };
    return {
      type: data.icon ? "image" : "component",
      src: data.icon,
      component: FiCode,
      color: data.color
    };
  };

  const onSubmit = async (data) => {
    setIsSaving(true);
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error("User not authenticated");

      const skillData = {
        profile_id: user.id,
        name: data.skillName,
        level: data.skillLevel,
        display_order: skills.length
      };

      if (editingId) {
        const { error } = await supabase
          .from("skills")
          .update(skillData)
          .eq("id", editingId);
        if (error) throw error;
      } else {
        const { error } = await supabase
          .from("skills")
          .insert([skillData]);
        if (error) throw error;
      }

      reset();
      setEditingId(null);
      fetchSkills();
    } catch (error) {
      console.error("Error saving skill:", error);
    } finally {
      setIsSaving(false);
    }
  };

  const handleQuickAdd = async (skill) => {
    const exists = skills.some(s => s.name === skill.name);
    if (exists) return;

    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error("User not authenticated");

      const { error } = await supabase
        .from("skills")
        .insert([{
          profile_id: user.id,
          name: skill.name,
          level: skill.level,
          display_order: skills.length
        }]);

      if (error) throw error;
      fetchSkills();
    } catch (error) {
      console.error("Error quick adding skill:", error);
    }
  };

  const handleEdit = (skill) => {
    setEditingId(skill.id);
    setValue("skillName", skill.name);
    setValue("skillLevel", skill.level);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to remove this skill?")) return;

    try {
      const { error } = await supabase
        .from("skills")
        .delete()
        .eq("id", id);
      if (error) throw error;
      setSkills(skills.filter(s => s.id !== id));
    } catch (error) {
      console.error("Error deleting skill:", error);
    }
  };

  if (loading) {
    return (
      <div className="h-full flex items-center justify-center py-20">
        <div className="w-8 h-8 border-2 border-purple-500 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="space-y-12 pb-12">
      <StepHeader
        title="Skills"
        description="Your technical DNA"
        icon={FiCode}
        colorClass="from-blue-500 to-indigo-600"
      />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <div className="lg:col-span-5">
          <form onSubmit={handleSubmit(onSubmit)} className="bg-[#0d0d0e] border border-white/[0.08] p-8 rounded-3xl space-y-6 shadow-2xl relative overflow-hidden group">
            <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
              <FiActivity size={80} />
            </div>

            <div className="flex items-center gap-3 mb-2">
              <div className="w-8 h-8 rounded-lg bg-blue-500/10 flex items-center justify-center text-blue-400">
                {isSaving ? <ReactLoading type="spin" height={14} width={14} color="#60a5fa" /> : editingId ? <FiSave size={14} /> : <FiPlus size={14} />}
              </div>
              <h4 className="text-[13px] font-bold text-white tracking-tight uppercase">
                {editingId ? "Refine Talent" : "Inject Capability"}
              </h4>
            </div>

            <FormField
              label="Technology Name"
              icon={FiCode}
              placeholder="e.g. React, Docker, Rust"
              error={errors.skillName?.message}
              {...register("skillName", { required: "Name required" })}
            />

            <div className="space-y-1.5">
              <label className="text-[11px] font-bold text-gray-400 uppercase tracking-widest px-1">Expertise Level</label>
              <select
                {...register("skillLevel")}
                className="w-full bg-[#111112] border border-white/[0.08] rounded-2xl text-[14px] text-white px-4.5 py-3.5 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500/40 transition-all cursor-pointer"
              >
                {["Beginner", "Intermediate", "Advanced", "Expert"].map(l => <option key={l} value={l}>{l}</option>)}
              </select>
            </div>

            <button
              type="submit"
              disabled={!isValid || isSaving}
              className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:scale-[1.01] active:scale-[0.99] shadow-xl shadow-blue-500/10 text-white text-[12px] font-black uppercase tracking-widest py-3.5 rounded-2xl transition-all flex items-center justify-center gap-2"
            >
              {isSaving ? <ReactLoading type="spin" height={16} width={16} color="#fff" /> : editingId ? <FiSave size={16} /> : <FiPlus size={16} />}
              <span>{isSaving ? "Saving..." : editingId ? "Update Node" : "Commit to Stack"}</span>
            </button>

            {editingId && (
              <button
                type="button"
                onClick={() => { setEditingId(null); reset(); }}
                className="w-full text-[10px] font-bold text-gray-500 hover:text-white transition-colors uppercase tracking-widest"
              >
                Cancel Refinement
              </button>
            )}
          </form>
        </div>

        <div className="lg:col-span-7 space-y-6">
          <div className="bg-[#0d0d0e]/50 border border-white/[0.04] p-8 rounded-3xl h-full flex flex-col">
            <div className="flex items-center gap-3 mb-6">
              <FiZap className="text-amber-400" />
              <h4 className="text-[11px] font-black text-gray-400 uppercase tracking-[0.2em]">Popular Integration Nodes</h4>
            </div>

            <div className="flex flex-wrap gap-2.5 flex-1 content-start">
              <AnimatePresence>
                {popularSkills.map(s => {
                  const isAdded = skills.some(skill => skill.name === s.name);
                  return (
                    <motion.button
                      key={s.name}
                      whileHover={!isAdded ? { scale: 1.05, y: -2 } : {}}
                      whileTap={!isAdded ? { scale: 0.95 } : {}}
                      onClick={() => handleQuickAdd(s)}
                      disabled={isAdded}
                      className={`group flex items-center gap-2.5 px-4 py-2.5 rounded-2xl border text-[12px] font-bold transition-all ${isAdded ? 'bg-green-500/10 border-green-500/20 text-green-400 opacity-50 cursor-default' : 'bg-white/[0.02] border-white/5 text-gray-400 hover:text-white hover:border-white/20 hover:bg-white/[0.05]'}`}
                    >
                      <div className={`p-1 rounded-lg ${isAdded ? 'bg-green-500 text-white' : 'bg-white/5 group-hover:bg-white/10'}`}>
                        {isAdded ? <FiZap size={10} /> : <FiPlusCircle size={10} />}
                      </div>
                      {s.name}
                    </motion.button>
                  );
                })}
              </AnimatePresence>
            </div>

            <div className="mt-8">
              <InfoHint icon={FiZap}>
                Automated icon injection for 400+ technologies. High-precision visibility enabled.
              </InfoHint>
            </div>
          </div>
        </div>
      </div>

      <div className="space-y-6">
        <div className="flex items-center justify-between px-2">
          <h4 className="text-[11px] font-black text-gray-500 uppercase tracking-[0.25em] flex items-center gap-3">
            <div className="w-1 h-3 bg-blue-500 rounded-full" />
            Active Tech Arsenal
            <span className="text-gray-700 ml-2">({skills.length})</span>
          </h4>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
          <AnimatePresence mode="popLayout">
            {skills.map((skill) => {
              const iconData = getIconData(skill.name);
              return (
                <motion.div
                  key={skill.id}
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8, filter: "blur(10px)" }}
                  className="group relative bg-[#0d0d0e] border border-white/[0.06] p-5 rounded-3xl hover:border-blue-500/30 transition-all shadow-xl hover:shadow-blue-500/5"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-2xl bg-black border border-white/5 flex items-center justify-center p-2.5 transition-transform group-hover:scale-110 shadow-inner">
                        {iconData.src ? (
                          <img src={iconData.src} className="w-full h-full object-contain filter " alt={skill.name} />
                        ) : <FiCode className="text-blue-400" size={20} />}
                      </div>
                      <div>
                        <h5 className="text-[14px] font-black text-white tracking-tight">{skill.name}</h5>
                        <div className="flex items-center gap-2 mt-1">
                          <div className="flex gap-0.5">
                            {[1, 2, 3, 4].map(star => (
                              <div
                                key={star}
                                className={`w-1 h-1 rounded-full ${star <= (skill.level === 'Expert' ? 4 : skill.level === 'Advanced' ? 3 : 2) ? 'bg-blue-400' : 'bg-white/10'}`}
                              />
                            ))}
                          </div>
                          <span className="text-[10px] font-black text-gray-500 uppercase tracking-widest">
                            {skill.level}
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="flex gap-1 items-center">
                      <button
                        onClick={() => handleEdit(skill)}
                        className="w-8 h-8 rounded-xl bg-white/5 flex items-center justify-center text-gray-500 hover:bg-white/10 hover:text-white transition-all shadow-lg"
                      >
                        <FiCode size={14} />
                      </button>
                      <button
                        onClick={() => handleDelete(skill.id)}
                        className="w-8 h-8 rounded-xl bg-red-500/10 flex items-center justify-center text-gray-500 hover:bg-red-500/20 hover:text-red-400 transition-all shadow-lg"
                      >
                        <FiTrash2 size={14} />
                      </button>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>

          {skills.length === 0 && (
            <div className="col-span-full py-16 text-center border-2 border-dashed border-white/[0.03] rounded-[40px] bg-white/[0.01]">
              <div className="w-16 h-16 rounded-[24px] bg-white/[0.02] flex items-center justify-center mx-auto mb-4 border border-white/5">
                <FiCode className="text-gray-700" size={32} />
              </div>
              <p className="text-[13px] font-black text-gray-600 uppercase tracking-[0.2em]">Stack empty. Inject capabilities above.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

