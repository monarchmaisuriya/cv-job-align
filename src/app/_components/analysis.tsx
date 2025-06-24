import React from "react";

interface AnalysisProps {
  content: string;
}

export const AnalysisComponent: React.FC<AnalysisProps> = ({ content }) => {
  let display: string;
  try {
    const parsed: unknown = JSON.parse(content);
    display = JSON.stringify(parsed, null, 2);
  } catch {
    display = content;
  }
  return <div className="whitespace-pre-wrap text-white">{display}</div>;
};
