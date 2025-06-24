import React from "react";

interface AnalysisProps {
  content: string;
}

export const AnalysisComponent: React.FC<AnalysisProps> = ({ content }) => {
  return <div className="text-white">{JSON.stringify(content)}</div>;
};
