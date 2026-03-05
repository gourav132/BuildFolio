import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiAlertCircle, FiArrowLeft, FiArrowRight, FiSave } from "react-icons/fi";
import ReactLoading from "react-loading";

/**
 * Shared Form Field component with unified design
 */
export const FormField = React.forwardRef(({
    label,
    error,
    icon: Icon,
    helperText,
    type = "text",
    rows = 4,
    ...props
}, ref) => {
    const isTextArea = type === "textarea";
    const InputComponent = isTextArea ? "textarea" : "input";

    return (
        <div className="space-y-1.5">
            <div className="flex justify-between items-center px-1">
                <label className="text-[11px] font-bold text-gray-400 uppercase tracking-widest">
                    {label}
                </label>
                {error && (
                    <motion.span
                        initial={{ opacity: 0, x: 10 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="text-[10px] font-bold text-red-500 flex items-center bg-red-500/10 px-2 py-0.5 rounded-full"
                    >
                        <FiAlertCircle className="mr-1" /> {error}
                    </motion.span>
                )}
            </div>

            <div className="relative group">
                {Icon && (
                    <div className={`absolute left-3.5 top-${isTextArea ? '4' : '1/2'} transform ${isTextArea ? '' : '-translate-y-1/2'} ${isTextArea ? 'p-3' : ''} text-gray-400 transition-colors group-focus-within:text-purple-400`}>
                        <Icon size={16} />
                    </div>
                )}
                <InputComponent
                    ref={ref}
                    type={type === "textarea" ? undefined : type}
                    rows={isTextArea ? rows : undefined}
                    className={`w-full bg-[#111112] border border-white/[0.08] rounded-2xl text-[14px] text-white placeholder-gray-600 transition-all focus:outline-none focus:ring-2 p-3 focus:ring-purple-500/20 focus:border-purple-500/40 hover:border-white/[0.15] ${Icon ? 'pl-11' : 'px-4.5'} py-3.5 ${isTextArea ? 'resize-none' : ''}`}
                    {...props}
                />
            </div>

            {helperText && !error && (
                <p className="px-2 text-[11px] text-gray-400 font-medium leading-relaxed">
                    {helperText}
                </p>
            )}
        </div>
    );
});

/**
 * Step Header with unified design
 */
export const StepHeader = ({ title, description, icon: Icon, colorClass = "from-purple-500 to-blue-500" }) => (
    <header className="mb-10 flex items-center gap-4">
        <div className={`w-14 h-14 bg-gradient-to-br ${colorClass} rounded-2xl flex items-center justify-center shadow-2xl shadow-purple-500/20 rotate-1`}>
            <Icon className="w-7 h-7 text-white" />
        </div>
        <div>
            <h3 className="text-3xl font-black text-white tracking-tight">{title}</h3>
            <p className="text-gray-400 text-sm mt-1 font-medium">{description}</p>
        </div>
    </header>
);

/**
 * Unified Navigation buttons
 */
export const StepNavigation = ({
    onBack,
    onNext,
    isNextDisabled,
    nextLabel = "Continue",
    isSubmitting,
    showBack = true
}) => (
    <div className="flex items-center justify-between pt-8 border-t border-white/5">
        {showBack ? (
            <button
                type="button"
                onClick={onBack}
                className="flex items-center space-x-2 text-[12px] font-bold text-gray-500 hover:text-white transition-colors px-4 py-2"
            >
                <FiArrowLeft /> <span>Back</span>
            </button>
        ) : <div />}

        <button
            type={onNext ? "button" : "submit"}
            onClick={onNext}
            disabled={isNextDisabled || isSubmitting}
            className={`relative min-w-[120px] bg-gradient-to-r from-purple-600 to-blue-600 text-white text-[12px] font-bold px-6 py-2.5 rounded-xl shadow-lg shadow-purple-500/20 transition-all hover:scale-[1.02] hover:shadow-purple-500/30 active:scale-[0.98] disabled:opacity-50 disabled:grayscale disabled:scale-100 flex items-center justify-center gap-2 overflow-hidden`}
        >
            {isSubmitting ? (
                <ReactLoading type="spin" height={16} width={16} color="#fff" />
            ) : (
                <>
                    <span>{nextLabel}</span>
                    <FiArrowRight className="w-4 h-4" />
                </>
            )}
        </button>
    </div>
);

/**
 * Minimal Info Hint
 */
export const InfoHint = ({ children, icon: Icon = FiSave }) => (
    <div className="bg-white/[0.02] border border-white/5 rounded-2xl p-4 flex gap-4">
        <div className="w-8 h-8 rounded-lg bg-gray-800 flex-shrink-0 flex items-center justify-center text-gray-400">
            <Icon size={16} />
        </div>
        <p className="text-[11px] text-gray-500 leading-relaxed italic">
            {children}
        </p>
    </div>
);
