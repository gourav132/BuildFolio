import React, { createContext, useEffect, useState } from "react";
import { supabase } from "../Supabase/supabaseClient";
import { useSupabaseAuth } from "../hooks/useSupabaseAuth";

export const PreviewContext = createContext();

export const PreviewProvider = (props) => {
  const [user, loading, error] = useSupabaseAuth();
  const [previewData, setPreviewData] = useState({
    displayName: "",
    tagline: "",
    overview: "",
    services: [],
    experiences: [],
    skills: [],
    templateId: "modern-dark" // Default template
  });

  async function handleUserData() {
    try {
      // 1. Fetching from Supabase (Sole Source of Truth)
      const { data: profile, error: supabaseError } = await supabase
        .from("profiles")
        .select("*")
        .single();

      if (profile) {
        setPreviewData(prev => ({
          ...prev,
          displayName: profile.full_name || prev.displayName,
          tagline: profile.tagline || prev.tagline,
          templateId: profile.template_id || profile.portfolio_config?.templateId || "modern-dark"
        }));
      }
    } catch (error) {
      console.error("Error fetching preview data:", error);
    }
  }

  const updateTemplateId = async (newTemplateId) => {
    // Standardize IDs (e.g., handle bento_box typo)
    const sanitizedId = newTemplateId === 'bento_box' ? 'bento-box' : newTemplateId;

    // Optimistic update
    setPreviewData(prev => ({ ...prev, templateId: sanitizedId }));

    try {
      // 1. Sync to Supabase
      const { data: { user: authUser } } = await supabase.auth.getUser();
      if (authUser) {
        await supabase.from("profiles").update({
          template_id: sanitizedId
        }).eq('id', authUser.id);
      }
    } catch (error) {
      console.error("Error updating template ID:", error);
    }
  };

  useEffect(() => {
    if (!loading && user) {
      handleUserData();
    }
  }, [user, loading]);

  return (
    <PreviewContext.Provider value={[previewData, setPreviewData, updateTemplateId]}>
      {props.children}
    </PreviewContext.Provider>
  )
}
