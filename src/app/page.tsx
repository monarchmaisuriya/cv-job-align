"use client";

import React, { useState } from "react";
import { UploadComponent } from "@/app/_components/upload";
import { AnalysisComponent } from "@/app/_components/analysis";
import { api } from "@/trpc/react";

export default function Home() {
  const [jdFile, setJdFile] = useState<File | null>(null);
  const [cvFile, setCvFile] = useState<File | null>(null);
  const [analysis, setAnalysis] = useState<string>("");

  const processFilesMutation = api.analysis.processFiles.useMutation();

  const handleUpload = (type: "jd" | "cv") => (file: File) => {
    if (type === "jd") setJdFile(file);
    else setCvFile(file);
  };

  const handleSubmit = async () => {
    if (!jdFile || !cvFile) {
      setAnalysis("Please upload both JD and CV files.");
      return;
    }
    // Read files as base64
    const readFileAsBase64 = (file: File) =>
      new Promise<string>((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => resolve(reader.result as string);
        reader.onerror = reject;
        reader.readAsDataURL(file);
      });
    try {
      const [jdBase64, cvBase64] = await Promise.all([
        readFileAsBase64(jdFile),
        readFileAsBase64(cvFile),
      ]);
      const response = await processFilesMutation.mutateAsync([
        { type: "jd", file: jdBase64 },
        { type: "cv", file: cvBase64 },
      ]);
      setAnalysis(
        response
          .map((r) => `${r.type.toUpperCase()}: ${r.aiResponse}`)
          .join("\n"),
      );
    } catch (err) {
      console.error(err);
      setAnalysis("Error processing files.");
    }
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-black text-white">
      <div className="container flex flex-col items-center justify-center gap-8 px-4 py-16">
        <h1 className="text-4xl font-extrabold">CV JOB ALIGN</h1>
        <div className="flex w-full max-w-2xl flex-col gap-8 sm:flex-row">
          <div className="flex-1">
            <h2 className="mb-2 text-lg font-semibold">Upload JD</h2>
            <UploadComponent
              uploadFile={handleUpload("jd")}
              id="jd-dropzone-file"
            />
            {jdFile && <p className="mt-2 text-sm">Selected: {jdFile.name}</p>}
          </div>
          <div className="flex-1">
            <h2 className="mb-2 text-lg font-semibold">Upload CV</h2>
            <UploadComponent
              uploadFile={handleUpload("cv")}
              id="cv-dropzone-file"
            />
            {cvFile && <p className="mt-2 text-sm">Selected: {cvFile.name}</p>}
          </div>
        </div>
        <button
          className="mt-4 cursor-pointer rounded bg-blue-500 px-6 py-2 font-bold text-white hover:bg-blue-600"
          onClick={handleSubmit}
          disabled={processFilesMutation.isPending}
        >
          {processFilesMutation.isPending ? "Processing..." : "Submit"}
        </button>
        <div className="mt-6 w-full max-w-2xl">
          {analysis && <AnalysisComponent content={analysis} />}
        </div>
      </div>
    </main>
  );
}
