import React, { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import ReactLoading from "react-loading";
import { useForm } from "react-hook-form";
import { motion, AnimatePresence } from "framer-motion";
import { FiArrowRight } from "react-icons/fi";
import { AuthLayout, EnhancedFormInput } from "@/components";
import { supabase } from "@/Supabase/supabaseClient";
import { useSupabaseAuth } from "@/hooks/useSupabaseAuth";

function Register() {
  const [isRegistering, setIsRegistering] = useState(false);
  const [error, setError] = useState("");
  const [user, loading] = useSupabaseAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const password = watch("password");

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
    setIsRegistering(true);
    setError("");

    // Supabase sign-up
    const { data: authData, error: signUpError } = await supabase.auth.signUp({
      email: data.email,
      password: data.password,
    });

    if (signUpError) {
      setError(signUpError.message);
      setIsRegistering(false);
      return;
    }

    // Explicitly create user profile since Firebase handled this before
    if (authData?.user) {
      const { error: profileError } = await supabase.from('profiles').insert({
        id: authData.user.id,
        email: data.email,
        full_name: data.name,
      });

      if (profileError) {
        console.error("Failed to initialize profile:", profileError);
      }
    }

    try {
      const from = location.state?.from?.pathname || "/control-center";
      navigate(from, { replace: true });
    } catch (err) {
      console.error(err);
      setError("Registration protocol failed.");
    } finally {
      setIsRegistering(false);
    }
  };

  const footer = (
    <p className="text-gray-500 text-[11px] font-medium tracking-tight">
      Already registered?{" "}
      <Link
        to="/login"
        className="text-purple-400 hover:text-purple-300 font-bold transition-colors ml-1"
      >
        Sign in
      </Link>
    </p>
  );

  return (
    <AuthLayout
      title="Create account"
      subtitle="Join BuildFolio and launch your presence."
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
          label="Full Name"
          placeholder="John Doe"
          {...register("name", {
            required: "Name required",
            minLength: {
              value: 2,
              message: "Min 2 chars"
            }
          })}
          error={errors.name?.message}
        />

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

        <div className="grid grid-cols-2 gap-3">
          <EnhancedFormInput
            label="Password"
            type="password"
            placeholder="••••••••"
            {...register("password", {
              required: "Req",
              minLength: {
                value: 6,
                message: "Min 6"
              }
            })}
            error={errors.password?.message}
          />
          <EnhancedFormInput
            label="Confirm"
            type="password"
            placeholder="••••••••"
            {...register("confirmPassword", {
              required: "Req",
              validate: value => value === password || "Match fail"
            })}
            error={errors.confirmPassword?.message}
          />
        </div>

        <div className="flex items-start gap-2.5 px-1">
          <input
            type="checkbox"
            id="terms"
            {...register("terms", {
              required: "Required"
            })}
            className="mt-0.5 w-3.5 h-3.5 accent-purple-600 bg-gray-900 border-white/5 rounded"
          />
          <label htmlFor="terms" className="text-[10px] text-gray-500 leading-normal">
            I agree to the <span className="text-white hover:text-purple-400 cursor-pointer transition-colors">Terms of Service</span>.
          </label>
        </div>
        {errors.terms && <p className="text-red-500 text-[9px] font-semibold mt-[-10px] ml-1">{errors.terms.message}</p>}

        <button
          type="submit"
          disabled={isRegistering}
          className="w-full bg-gradient-to-r from-purple-600 to-blue-600 text-white font-bold py-2.5 rounded-xl flex items-center justify-center gap-2 hover:from-purple-700 hover:to-blue-700 transition-all shadow-lg shadow-purple-500/10 disabled:opacity-50 text-[13px]"
        >
          {isRegistering ? (
            <ReactLoading type="spin" height="18px" width="18px" color="#ffffff" />
          ) : (
            <>
              Get Started <FiArrowRight className="w-3.5 h-3.5" />
            </>
          )}
        </button>
      </form>
    </AuthLayout>
  );
}

export default Register;
