import React, { useContext, useEffect } from "react";
import { set, useForm } from "react-hook-form";
import { PreviewContext } from "../../../context/PreviewContext";
import { FiUser, FiMessageSquare, FiZap } from "react-icons/fi";
import { FormField, StepHeader, StepNavigation, InfoHint } from "../components";
import { supabase } from "../../../Supabase/supabaseClient";;
import ReactLoading from "react-loading";
import { FiSave } from "react-icons/fi";

export default function Introduction({ setStep }) {

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting, isValid },
    setValue,
  } = useForm({
    mode: "onChange"
  });
  const [isSaving, setIsSaving] = React.useState(false);


  // Use effect to initialize form values from previewData on mount
  useEffect(() => {
    const fetchProfile = async () => {
      const { data, error } = await supabase.from("profiles").select("full_name, tagline").single();
      if (error) {
        console.error("Error fetching profile data:", error);
      } else if (data) {
        setValue("displayName", data.full_name || "");
        setValue("tagline", data.tagline || "");
      }
    };

    fetchProfile();
  }, [setValue]);

  const onSubmit = async (input) => {
    setIsSaving(true);
    const { data: {user}, error: userError } = await supabase.auth.getUser();
    if (userError) {
      console.error("Error fetching user data:", userError);
      setIsSaving(false);
      return;
    }
    const { error } = await supabase.from("profiles").upsert({
      id: user.id,
      full_name: input.displayName,
      tagline: input.tagline
    });

    if (error) {
      console.error("Error saving profile data:", error);
    }
    setIsSaving(false);
  };

  return (
    <div className="space-y-8 pb-12">
      <StepHeader
        title="Introduction"
        description="Set the pulse of your portfolio"
        icon={FiUser}
      />

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div className="space-y-6">
          <FormField
            label="Full Identity"
            icon={FiUser}
            placeholder="e.g. Alexander Pierce"
            error={errors.displayName?.message}
            helperText="This is your primary title across all templates."
            {...register("displayName", {
              required: "Name is required",
              minLength: { value: 2, message: "Too short" }
            })}
          />

          <FormField
            label="Professional Pulse"
            icon={FiMessageSquare}
            placeholder="e.g. Design Systems & Frontend Strategy"
            error={errors.tagline?.message}
            helperText="A punchy one-liner that defines your expertise."
            {...register("tagline", {
              required: "Tagline is required",
              minLength: { value: 10, message: "Better taglines are longer" }
            })}
          />
        </div>

        <InfoHint icon={FiZap}>
          Keep it high-impact. Your identity and tagline are the first things visitors interact with.
        </InfoHint>

        <button type="submit" disabled={isSaving} className={`relative min-w-[120px] bg-gradient-to-r from-purple-600 to-blue-600 text-white text-[10px] font-bold px-6 py-2.5 rounded-xl shadow-lg shadow-purple-500/20 transition-all hover:scale-[1.02] hover:shadow-purple-500/30 active:scale-[0.98] disabled:opacity-50 disabled:grayscale disabled:scale-100 flex items-center justify-center gap-2 overflow-hidden`}>
          {isSaving ? <ReactLoading type="spin" height={16} width={16} color="#fff" /> : <FiSave className="w-4 h-4" />}
          {isSaving ? <span className="ml-2">Saving...</span> : <span className="ml-2">Save changes</span>}
        </button>

      </form>
    </div>
  );
}
