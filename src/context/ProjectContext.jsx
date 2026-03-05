import React, { createContext, useEffect, useState } from "react";
import { supabase } from "../Supabase/supabaseClient";
import { useSupabaseAuth } from "../hooks/useSupabaseAuth";

export const ProjectContext = createContext();

export const ProjectProvider = (props) => {
  const [user, loading, error] = useSupabaseAuth();
  const [PRloading, setPRLoading] = useState(true);
  const [projects, setProjects] = useState({
    overview: "",
    uid: null,
    projects: [],
  });

  useEffect(() => {
    let mounted = true;

    const fetchProjects = async () => {
      setPRLoading(true);

      if (!loading && user) {
        setProjects((prevState) => ({ ...prevState, uid: user.id }));

        try {
          const { data: userProjects, error } = await supabase
            .from("projects")
            .select("*")
            .eq("profile_id", user.id)
            .order("display_order", { ascending: true });

          if (error) throw error;

          if (mounted) {
            setProjects((prevState) => ({
              ...prevState,
              projects: userProjects || [],
            }));
          }
        } catch (err) {
          console.error("Error fetching projects from Supabase:", err);
        } finally {
          if (mounted) setPRLoading(false);
        }
      } else if (!loading && !user) {
        if (mounted) setPRLoading(false);
      }
    };

    fetchProjects();

    return () => {
      mounted = false;
    };
  }, [loading, user]);

  return (
    <ProjectContext.Provider value={[projects, setProjects, PRloading]}>
      {props.children}
    </ProjectContext.Provider>
  );
};
