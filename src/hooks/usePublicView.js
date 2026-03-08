import { useState, useEffect } from "react";
import { supabase } from "../Supabase/supabaseClient";

export const usePublicView = (userID) => {

    const [data, setData] = useState({
        profile: null,
        synopsis: null,
        skills: [],
        experiences: [],
        projects: [],
        socialLinks: {}, // flat object: { github: url, linkedin: url, ... }
        loading: true,
        error: null
    });

    useEffect(() => {

        const fetchAllData = async () => {
            try {
                // Fetch profile
                const { data: profile, error: profileError } = await supabase
                    .from("profiles")
                    .select("*")
                    .eq("id", userID)
                    .maybeSingle();

                // Fetch synopsis
                const { data: synopsis, error: synopsisError } = await supabase
                    .from("synopsis")
                    .select("*")
                    .eq("profile_id", profile?.id)
                    .maybeSingle();

                // Fetch skills - filter by profile_id and order by display_order
                const { data: skills, error: skillsError } = await supabase
                    .from("skills")
                    .select("*")
                    .eq("profile_id", profile?.id)
                    .order("display_order", { ascending: true });

                // Fetch experiences
                const { data: experiences, error: experiencesError } = await supabase
                    .from("experiences")
                    .select("*")
                    .eq("profile_id", profile?.id)
                    .order("start_date", { ascending: false });

                // Fetch projects
                const { data: projects, error: projectsError } = await supabase
                    .from("projects")
                    .select("*")
                    .eq("profile_id", profile?.id)
                    .order("display_order", { ascending: true });

                // Fetch social links and convert to flat object
                const { data: socialLinksRows } = await supabase
                    .from("social_links")
                    .select("platform, url")
                    .eq("profile_id", profile?.id);

                const socialLinks = {};
                if (socialLinksRows) {
                    socialLinksRows.forEach(row => {
                        socialLinks[row.platform] = row.url;
                    });
                }

                if (profileError || (synopsisError && synopsisError.code !== "PGRST116")) {
                    console.error("Data fetching warning:", { profileError, synopsisError });
                }

                setData({
                    profile,
                    synopsis,
                    skills: skills || [],
                    experiences: experiences || [],
                    projects: projects || [],
                    socialLinks,
                    loading: false,
                    error: profileError || null
                });
            } catch (err) {
                console.error("Error in usePortfolioData:", err);
                setData(prev => ({ ...prev, loading: false, error: err }));
            }
        };

        fetchAllData();
    }, []);

    return data;
};
