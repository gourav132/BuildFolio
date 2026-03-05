import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { motion, AnimatePresence } from "framer-motion";
import ReactLoading from "react-loading";
import { FiArrowRight, FiCheckCircle, FiInfo } from "react-icons/fi";
import { AuthLayout, EnhancedFormInput } from "@/components";
import { supabase } from "@/Supabase/supabaseClient";
import { useSupabaseAuth } from "@/hooks/useSupabaseAuth";

function Reset() {
  const [isSending, setIsSending] = useState(false);
  const [isSent, setIsSent] = useState(false);
  const [error, setError] = useState("");
  const [user, loading] = useSupabaseAuth();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    if (loading) return;
    if (user) navigate("/control-center");
  }, [user, loading]);

  const onSubmit = async (data) => {
    setIsSending(true);
    setError("");

    try {
      const { error: resetError } = await supabase.auth.resetPasswordForEmail(data.email, {
        redirectTo: `${window.location.origin}/control-center`,
      });

      if (resetError) throw resetError;

      setIsSent(true);
    } catch (error) {
      console.error(error);
      setError("Email protocol failed.");
    } finally {
      setIsSending(false);
    }
  };

  const footer = (
    <p className="text-gray-500 text-[11px] font-medium tracking-tight">
      Remembered?{" "}
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
      title="Reset password"
      subtitle="Verify your identity to recover terminal access."
      footer={footer}
    >
      <AnimatePresence mode="wait">
        {isSent ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center space-y-4 py-2"
          >
            <div className="w-12 h-12 bg-green-500/10 rounded-full flex items-center justify-center mx-auto">
              <FiCheckCircle className="text-green-500 text-2xl" />
            </div>
            <div className="space-y-1">
              <h2 className="text-base font-bold text-white">Transmission Sent</h2>
              <p className="text-gray-400 text-[11px] leading-relaxed">
                Check your terminal (email) for instructions.
              </p>
            </div>
            <Link
              to="/login"
              className="inline-block w-full bg-white/5 border border-white/5 text-white font-bold py-2.5 rounded-xl hover:bg-white/10 transition-all text-[12px]"
            >
              Return to Base
            </Link>
          </motion.div>
        ) : (
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <AnimatePresence mode="wait">
              {error && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.98 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.98 }}
                  className="bg-red-500/10 border border-red-500/20 px-3 py-2.5 rounded-xl text-red-500 text-[10px] font-semibold flex items-start gap-2"
                >
                  <FiInfo className="w-3.5 h-3.5 mt-0.5 shrink-0" />
                  <span>{error}</span>
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

            <button
              type="submit"
              disabled={isSending}
              className="w-full bg-gradient-to-r from-purple-600 to-blue-600 text-white font-bold py-2.5 rounded-xl flex items-center justify-center gap-2 hover:from-purple-700 hover:to-blue-700 transition-all shadow-lg shadow-purple-500/10 disabled:opacity-50 text-[13px]"
            >
              {isSending ? (
                <ReactLoading type="spin" height="18px" width="18px" color="#ffffff" />
              ) : (
                <>
                  Send Link <FiArrowRight className="w-3.5 h-3.5" />
                </>
              )}
            </button>
          </form>
        )}
      </AnimatePresence>
    </AuthLayout>
  );
}

export default Reset;