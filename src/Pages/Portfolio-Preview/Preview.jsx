import React, { useContext, memo } from "react";
import { PreviewContext } from "../../context/PreviewContext";

// Import Templates
import ModernDark from "../../features/portfolio/templates/ModernDark/ModernDark";
import MinimalLight from "../../features/portfolio/templates/MinimalLight/MinimalLight";
import CreativeGradient from "../../features/portfolio/templates/CreativeGradient/CreativeGradient";

const Preview = memo(({ isExpanded, handleBackPreview }) => {
  const [previewData] = useContext(PreviewContext);

  // Decide which template to render
  const renderTemplate = () => {
    const templateId = previewData?.templateId || 'modern-dark';

    switch (templateId) {
      case 'minimal-light':
        return <MinimalLight />;
      case 'creative-gradient':
        return <CreativeGradient />;
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

