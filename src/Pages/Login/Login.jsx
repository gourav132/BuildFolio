import React, { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useForm } from "react-hook-form";
import { motion, AnimatePresence } from "framer-motion";
import ReactLoading from "react-loading";
import { FiArrowRight } from "react-icons/fi";
import { AuthLayout, EnhancedFormInput } from "@/components";
import { supabase } from "@/Supabase/supabaseClient";
import { useSupabaseAuth } from "@/hooks/useSupabaseAuth";

function Login() {
  const [isLoggingIn, setIsLoggingIn] = useState(false);
  const [error, setError] = useState("");
  const [user, loading] = useSupabaseAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  // Redirect if already logged in
  if (loading || user) {
    if (user && !loading) {
      const from = location.state?.from?.pathname || "/control-center";
      navigate(from, { replace: true });
    }
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <ReactLoading type="bubbles" height="30px" width="30px" color="#8b5cf6" />
      </div>
    );
  }

  const onSubmit = async (data) => {
    setIsLoggingIn(true);
    setError("");

    const { error: supabaseError } = await supabase.auth.signInWithPassword({
      email: data.email,
      password: data.password,
    });

    if (supabaseError) {
      setError(supabaseError.message || "Invalid credentials. Verify your identity.");
      setIsLoggingIn(false);
      return;
    }

    try {
      const from = location.state?.from?.pathname || "/control-center";
      navigate(from, { replace: true });
    } catch (err) {
      console.error(err);
      setError("Login protocol failed.");
      setIsLoggingIn(false);
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      const { error: googleError } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: `${window.location.origin}/control-center`
        }
      });

      if (googleError) throw googleError;

    } catch (err) {
      console.error("Google Auth Error:", err);
      setError("Google protocol failed.");
    }
  };

  const footer = (
    <p className="text-gray-500 text-[11px] font-medium tracking-tight">
      New here?{" "}
      <Link
        to="/register"
        className="text-purple-400 hover:text-purple-300 font-bold transition-colors ml-1"
      >
        Create identity
      </Link>
    </p>
  );

  return (
    <AuthLayout
      title="Welcome back"
      subtitle="Enter your credentials to access your terminal."
      footer={footer}
    >
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <AnimatePresence mode="wait">
          {error && (
            <motion.div
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.98 }}
              className="bg-red-500/10 border border-red-500/20 px-3 py-2.5 rounded-xl text-red-500 text-[10px] font-semibold"
            >
              {error}
            </motion.div>
          )}
        </AnimatePresence>

        <EnhancedFormInput
          label="Email Address"
          type="email"
          placeholder="name@example.com"
          {...register("email", {
            required: "Email required",
            pattern: {
              value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
              message: "Invalid format"
            }
          })}
          error={errors.email?.message}
        />

        <div className="space-y-1">
          <EnhancedFormInput
            label="Password"
            type="password"
            placeholder="••••••••"
            {...register("password", {
              required: "Password required",
              minLength: {
                value: 6,
                message: "Min 6 characters"
              }
            })}
            error={errors.password?.message}
          />
          <div className="flex justify-end px-1">
            <Link
              to="/reset"
              className="text-[10px] text-purple-400 hover:text-purple-300 font-bold transition-colors"
            >
              Forgot identity?
            </Link>
          </div>
        </div>

        <button
          type="submit"
          disabled={isLoggingIn}
          className="w-full bg-gradient-to-r from-purple-600 to-blue-600 text-white font-bold py-2.5 rounded-xl flex items-center justify-center gap-2 hover:from-purple-700 hover:to-blue-700 transition-all shadow-lg shadow-purple-500/10 disabled:opacity-50 text-[13px]"
        >
          {isLoggingIn ? (
            <ReactLoading type="spin" height="18px" width="18px" color="#ffffff" />
          ) : (
            <>
              Sign In <FiArrowRight className="w-3.5 h-3.5" />
            </>
          )}
        </button>
      </form>

      <div className="relative py-2">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-white/5"></div>
        </div>
        <span className="relative z-10 mx-auto px-3 bg-[#0a0a0b] text-[10px] text-gray-600 font-bold uppercase tracking-widest">or</span>
      </div>

      <button
        onClick={handleGoogleSignIn}
        className="w-full bg-white/5 border border-white/5 text-white font-bold py-2.5 rounded-xl flex items-center justify-center gap-2.5 hover:bg-white/10 transition-all text-[12px]"
      >
        <svg className="w-4 h-4" viewBox="0 0 24 24">
          <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
          <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
          <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
          <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
        </svg>
        Sign in with Google
      </button>
    </AuthLayout>
  );
}

export default Login;
