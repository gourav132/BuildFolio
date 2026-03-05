import { useState, useEffect } from 'react';
import { supabase } from '../Supabase/supabaseClient';

export const useSupabaseAuth = () => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        let mounted = true;

        async function getInitialSession() {
            try {
                const { data: { session }, error: sessionError } = await supabase.auth.getSession();
                if (sessionError) throw sessionError;

                if (mounted) {
                    setUser(session?.user ?? null);
                    setLoading(false);
                }
            } catch (err) {
                console.error("Supabase Auth session error:", err);
                if (mounted) {
                    setError(err);
                    setLoading(false);
                }
            }
        }

        getInitialSession();

        const { data: { subscription } } = supabase.auth.onAuthStateChange(
            (_event, session) => {
                if (mounted) {
                    setUser(session?.user ?? null);
                    setLoading(false);
                }
            }
        );

        return () => {
            mounted = false;
            subscription?.unsubscribe();
        };
    }, []);

    // Emulates the return structure of react-firebase-hooks `useAuthState`
    return [user, loading, error];
};
