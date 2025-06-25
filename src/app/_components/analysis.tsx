import React from "react";
import ReactMarkdown from "react-markdown";

interface AnalysisComponentProps {
  data?: string;
}

export const AnalysisComponent: React.FC<AnalysisComponentProps> = ({
  data,
}) => {
  return (
    <div className="mx-auto max-w-4xl space-y-6 rounded-lg p-6 text-white">
      <div>
        <ReactMarkdown>{data ?? "No analysis available."}</ReactMarkdown>
      </div>
    </div>
  );
};
