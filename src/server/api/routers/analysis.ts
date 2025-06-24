import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "@/server/api/trpc";
import { analyze } from "@/server/api/integrations/gemini/text-analysis";

const analysisInputSchema = z.array(
  z.object({
    type: z.enum(["jd", "cv"]),
    // Accept file as a blob or base64 string
    file: z.string(),
  }),
);

export const analysisRouter = createTRPCRouter({
  processFiles: publicProcedure
    .input(analysisInputSchema)
    .mutation(async ({ input }) => {
      // Expecting one JD and one CV
      const jdItem = input.find((item) => item.type === "jd");
      const cvItem = input.find((item) => item.type === "cv");
      if (!jdItem || !cvItem) {
        throw new Error(
          "Both a job description (jd) and a CV (cv) file must be provided.",
        );
      }
      const instructions =
        "Analyze the candidate CV against the job description. Identify strengths, weaknesses, and alignment. Provide a summary of fit, and suggest improvements for the candidate.";
      try {
        const aiResponse = await analyze({
          jd: jdItem.file,
          cv: cvItem.file,
          instructions,
        });
        return {
          type: "analysis",
          aiResponse,
        };
      } catch (error) {
        return {
          type: "error",
          message: error instanceof Error ? error.message : "Unknown error",
        };
      }
    }),
});
