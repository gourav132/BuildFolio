import React, { memo } from "react";
import {
  BentoBox,
  CreativeGradient,
  MinimalLight,
  ModernDark,
  NeoBrutalism,
  Storyteller,
  TerminalHacker,
  NeonPulse,
  PaperFolio
} from "@/features/portfolio/templates";
import { usePortfolioData } from "@/hooks/usePortfolioData";

const Preview = memo(({ isExpanded, handleBackPreview }) => {
  const { profile, loading } = usePortfolioData();

  if (loading) {
    return (
      <div className="h-screen w-full flex items-center justify-center bg-black">
        <div className="w-10 h-10 border-4 border-purple-500 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  // Decide which template to render
  const renderTemplate = () => {
    const templateId = profile?.template_id || profile?.portfolio_config?.templateId || 'bento-box';

    switch (templateId) {
      case 'minimal-light':
        return <MinimalLight />;
      case 'creative-gradient':
        return <CreativeGradient />;
      case 'bento-box':
        return <BentoBox />;
      case 'terminal-hacker':
        return <TerminalHacker />;
      case 'storyteller':
        return <Storyteller />;
      case 'neo-brutalism':
        return <NeoBrutalism />;
      case 'neon-pulse':
        return <NeonPulse />;
      case 'paper-folio':
        return <PaperFolio />;
      case 'modern-dark':
      default:
        // ModernDark handles its own zoom/layout
        return <ModernDark />;
    }
  };

  return (
    <div className="transform-gpu">
      {/* Removed the hardcoded zoom wrapper here, as templates manage their own containers */}
      {renderTemplate()}
    </div>
  );
});

Preview.displayName = 'Preview';

export default Preview;

