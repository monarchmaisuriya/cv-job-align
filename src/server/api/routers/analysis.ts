import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "@/server/api/trpc";

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
      console.log({ input });
      const responses = input.map((item, idx) => ({
        type: item.type,
        aiResponse: `Processed file of type ${item.type} with mock AI for file: ${item.file}`,
        fileIndex: idx,
      }));
      return responses;
    }),
});
