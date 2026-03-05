import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { FiFileText, FiCheck, FiZap, FiSave } from "react-icons/fi";
import { FormField, StepHeader, StepNavigation, InfoHint } from "../components";
import { supabase } from "../../../Supabase/supabaseClient";
import ReactLoading from "react-loading";

export default function Overview({ setStep }) {
  const [loading, setLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [selectedServices, setSelectedServices] = useState([]);
  const [existingId, setExistingId] = useState(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    setValue,
  } = useForm({
    mode: "onChange",
    defaultValues: {
      overview: ""
    }
  });

  useEffect(() => {
    fetchSynopsis();
  }, []);

  const fetchSynopsis = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from("synopsis")
        .select("*")
        .maybeSingle();

      if (error) throw error;

      if (data) {
        setExistingId(data.id);
        setValue("overview", data.intro || "");
        setSelectedServices(data.services || []);
      }
    } catch (error) {
      console.error("Error fetching synopsis:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleToggleService = (title) => {
    setSelectedServices(prev =>
      prev.includes(title)
        ? prev.filter(t => t !== title)
        : [...prev, title]
    );
  };

  const onSubmit = async (data) => {
    setIsSaving(true);
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error("User not authenticated");

      const payload = {
        profile_id: user.id,
        intro: data.overview,
        services: selectedServices,
        updated_at: new Date().toISOString()
      };

      if (existingId) {
        const { error } = await supabase
          .from("synopsis")
          .update(payload)
          .eq("id", existingId);
        if (error) throw error;
      } else {
        const { error } = await supabase
          .from("synopsis")
          .insert([payload]);
        if (error) throw error;
      }

      setStep("skills");
    } catch (error) {
      console.error("Error saving synopsis:", error);
    } finally {
      setIsSaving(false);
    }
  };

  const expertiseOptions = ["React Developer", "Web Developer", "Mern Developer", "Angular Developer", "Laravel Developer"];

  if (loading) {
    return (
      <div className="h-full flex items-center justify-center py-20">
        <div className="w-8 h-8 border-2 border-green-500 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="space-y-8 pb-12">
      <StepHeader
        title="Overview"
        description="Craft your narrative"
        icon={FiFileText}
        colorClass="from-green-500 to-emerald-600"
      />

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          label="The Narrative"
          type="textarea"
          placeholder="I build high-performance web applications with a focus on..."
          error={errors.overview?.message}
          helperText="50-1000 characters. Focus on your trajectory and impact."
          {...register("overview", {
            required: "Narrative is required",
            minLength: { value: 50, message: "Share a bit more about yourself" }
          })}
        />

        <div className="space-y-4">
          <label className="text-[11px] font-bold text-gray-400 uppercase tracking-widest px-1">
            Expertise Matrix
          </label>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
            {expertiseOptions.map((opt) => {
              const isChecked = selectedServices.includes(opt);
              return (
                <button
                  key={opt}
                  type="button"
                  onClick={() => handleToggleService(opt)}
                  className={`flex items-center gap-3 p-3 rounded-xl border transition-all text-left ${isChecked ? 'bg-green-500/10 border-green-500/30 text-white' : 'bg-black/20 border-white/5 text-gray-500 hover:border-white/10'}`}
                >
                  <div className={`w-5 h-5 rounded-md flex items-center justify-center transition-all ${isChecked ? 'bg-green-500 text-white' : 'bg-white/5 border border-white/10'}`}>
                    {isChecked && <FiCheck size={12} />}
                  </div>
                  <span className="text-[12px] font-bold">{opt}</span>
                </button>
              );
            })}
          </div>
        </div>

        <InfoHint icon={FiZap}>
          Choose the expertise that most aligns with the roles you are targeting.
        </InfoHint>

        <div className="flex items-center justify-between pt-6 border-t border-white/[0.06]">
          <button
            type="button"
            onClick={() => setStep("intro")}
            className="px-6 py-2.5 rounded-xl text-[12px] font-bold text-gray-500 hover:text-white transition-colors uppercase tracking-widest"
          >
            Previous
          </button>
          <button
            type="submit"
            disabled={isSaving || !isValid}
            className="flex items-center gap-2 bg-gradient-to-r from-green-600 to-emerald-600 text-white text-[12px] font-black px-8 py-3 rounded-xl shadow-lg shadow-green-500/20 hover:scale-[1.02] transition-all disabled:opacity-50"
          >
            {isSaving ? <ReactLoading type="spin" height={16} width={16} color="#fff" /> : <FiSave size={16} />}
            <span className="uppercase tracking-widest">{isSaving ? "Saving..." : "Deploy Synopsis"}</span>
          </button>
        </div>
      </form>
    </div>
  );
}

