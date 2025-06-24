import { env } from "@/env.js";

// VertexAI GenerateContentRequest type reference: https://github.com/googleapis/nodejs-vertexai/blob/4807338c51b3749c86b8e3b71380f4a45722564d/src/types/content.ts#L57

interface ContentPart {
  text?: string;
  inlineData?: {
    mimeType: string;
    data: string; // base64
  };
}

interface Content {
  role: "user" | "model";
  parts: ContentPart[];
}

interface GenerateContentRequest {
  contents: Content[];
  generationConfig?: Record<string, unknown>;
  tools?: unknown[];
  systemInstruction?: unknown;
}

export async function analyze({
  cv,
  jd,
  instructions,
}: {
  cv: string;
  jd: string;
  instructions: string;
}): Promise<unknown> {
  const endpoint = env.GEMINI_ENDPOINT as string;
  const token = env.GEMINI_TOKEN as string;
  if (!endpoint || !token)
    throw new Error("Gemini endpoint or token missing in environment");

  // Compose the prompt for Gemini
  const prompt = `${instructions}\n\nJob Description (PDF text):\n${jd}\n\nCandidate CV (PDF text):\n${cv}`;

  const requestBody: GenerateContentRequest = {
    contents: [
      {
        role: "user",
        parts: [{ text: prompt }],
      },
    ],
  };

  try {
    const res = await fetch(endpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(requestBody),
    });

    console.log({ res });

    if (res.status === 401) {
      throw new Error("Unauthorized for Gemini API");
    }
    if (res.status === 429) {
      throw new Error("Rate limit exceeded for Gemini API");
    }

    if (!res.ok) {
      const errorText = await res.text();
      throw new Error(`Gemini API error: ${res.status} ${String(errorText)}`);
    }

    const data: unknown = await res.json();
    return data;
  } catch (err) {
    if (err instanceof Error) {
      throw new Error(err.message);
    }
    throw new Error("Unknown error occurred in Gemini integration");
  }
}
