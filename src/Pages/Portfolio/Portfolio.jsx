import React from "react";
import { useParams } from "react-router-dom";
import ReactLoading from "react-loading";
import {
  BentoBox,
  CreativeGradient,
  MinimalLight,
  ModernDark,
  NeoBrutalism,
  Storyteller,
  TerminalHacker,
  NeonPulse,
  PaperFolio,
  GlassmorphismStudio,
  MonochromeInk,
  OrganicScroll,
  Blueprint,
  Spotlight,
  MobileCardStack,
  MuseumGallery
} from "@/features/portfolio/templates";
// import { usePortfolioData } from "@/hooks/usePortfolioData";
import { usePublicView } from "@/hooks/usePublicView";


export default function Portfolio() {
  const { userId } = useParams();
  const { profile, loading, error } = usePublicView(userId);

  // Decide which template to render
  const renderTemplate = () => {
    // templateId could be in profile.template_id or profile.portfolio_config.templateId
    const templateId = profile?.template_id || profile?.portfolio_config?.templateId || 'modern-dark';

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
      case 'glassmorphism-studio':
        return <GlassmorphismStudio />;
      case 'monochrome-ink':
        return <MonochromeInk />;
      case 'organic-scroll':
        return <OrganicScroll />;
      case 'blueprint':
        return <Blueprint />;
      case 'spotlight':
        return <Spotlight />;
      case 'mobile-card-stack':
        return <MobileCardStack />;
      case 'museum-gallery':
        return <MuseumGallery />;
      case 'modern-dark':
      default:
        return <ModernDark />;
    }
  };

  if (loading) {
    return (
      <div className="h-screen w-full flex flex-col items-center justify-center bg-black gap-4">
        <ReactLoading type="bubbles" height={"60px"} width={"60px"} color="#804dee" />
        <p className="text-white/60 text-sm animate-pulse">Loading your professional portfolio...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="h-screen w-full flex flex-col items-center justify-center bg-black p-6 text-center">
        <h2 className="text-white text-2xl font-bold mb-2">Portfolio Not Found</h2>
        <p className="text-white/60 mb-6">We couldn't retrieve the portfolio data for "{userId}".</p>
        <button
          onClick={() => window.location.reload()}
          className="px-6 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
        >
          Retry
        </button>
      </div>
    );
  }

  return (
    <div className="w-full">
      {renderTemplate()}
    </div>
  );
}

