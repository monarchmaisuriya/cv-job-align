# CV Job Align

CV Job Align is a web application that allows users to upload a Job Description (JD) and a Candidate CV (both as PDF files), and receive an AI-powered analysis of how well the CV matches the JD. The app leverages Google Gemini (Vertex AI) for text analysis and provides actionable feedback on strengths, weaknesses, and suggestions for improvement.

## Features

- **Upload PDFs**: Upload both a Job Description and a Candidate CV (PDF, max 5MB each).
- **AI Analysis**: Uses Google Gemini (Vertex AI) to analyze and compare the CV against the JD.
- **Actionable Feedback**: Get a summary of fit, strengths, weaknesses, and improvement suggestions.
- **Modern UI**: Built with Next.js, React, and Tailwind CSS for a responsive, user-friendly experience.
- **tRPC API**: End-to-end typesafe API with tRPC.

## Tech Stack

- **Next.js** (App Router, React 19)
- **tRPC** (API, server/client communication)
- **Google Gemini (Vertex AI)** (AI text analysis)
- **Tailwind CSS** (Styling)
- **Zod** (Validation)
- **SuperJSON** (Serialization)
- **React Query** (Data fetching/caching)
- **TypeScript** (Type safety)

## Project Structure

```
cv-job-align/
├── src/
│   ├── app/
│   │   ├── _components/
│   │   │   ├── analysis.tsx         # Displays AI analysis results
│   │   │   └── upload.tsx           # File upload component (PDF only)
│   │   ├── api/
│   │   │   └── trpc/[trpc]/route.ts # tRPC API route handler
│   │   ├── layout.tsx               # Global layout and providers
│   │   └── page.tsx                 # Main page: upload & analysis UI
│   ├── server/
│   │   ├── api/
│   │   │   ├── integrations/
│   │   │   │   └── gemini/text-analysis.ts # Gemini API integration
│   │   │   ├── routers/analysis.ts         # tRPC router for analysis
│   │   │   ├── root.ts                     # API root router
│   │   │   └── trpc.ts                     # tRPC context/utilities
│   ├── trpc/
│   │   ├── react.tsx               # tRPC React client/provider
│   │   ├── server.ts               # tRPC server utilities
│   │   └── query-client.ts         # React Query client setup
│   ├── styles/
│   │   └── globals.css             # Tailwind global styles
│   └── env.js                      # Environment variable validation
├── public/                         # Static assets
├── package.json                    # Dependencies & scripts
├── next.config.js                  # Next.js config
├── postcss.config.js               # PostCSS config
├── prettier.config.js              # Prettier config
├── eslint.config.js                # ESLint config
└── README.md                       # Project documentation
```

## Setup & Installation

1. **Clone the repository:**

   ```bash
   git clone https://github.com/monarchmaisuriya/cv-job-align
   cd cv-job-align
   ```

2. **Install dependencies:**

   ```bash
   npm install
   ```

3. **Configure environment variables:**
   Create a `.env` file in the root directory with the following variables:

   ```env
   GEMINI_TOKEN=your_google_gemini_api_token
   GEMINI_ENDPOINT=https://your-gemini-endpoint-url
   ```

   > **Note:** The app uses [@t3-oss/env-nextjs](https://github.com/t3-oss/env) for type-safe env validation.

4. **Run the development server:**
   ```bash
   npm run dev
   ```
   The app will be available at [http://localhost:3000](http://localhost:3000).

## Usage

1. Open the app in your browser.
2. Upload a Job Description (JD) PDF and a Candidate CV PDF.
3. Click **Submit**.
4. Wait for the AI to analyze and display the results, including:
   - Summary of fit
   - Strengths and weaknesses
   - Suggestions for improvement

## Architecture Overview

- **Frontend**: Next.js App Router, React 19, Tailwind CSS.
- **File Upload**: Only PDF files (max 5MB) are accepted. Validation is handled in the upload component.
- **API**: tRPC is used for end-to-end typesafe API calls. The main endpoint is `analysis.processFiles`, which expects base64-encoded PDFs.
- **AI Integration**: The backend calls Google Gemini (Vertex AI) with a prompt containing the JD and CV text, and returns the AI's analysis.
- **Environment Variables**: Managed and validated via `src/env.js` and [@t3-oss/env-nextjs](https://github.com/t3-oss/env).

## Key Files & Components

- **src/app/page.tsx**: Main UI logic for file upload and displaying results.
- **src/app/\_components/upload.tsx**: Handles PDF file selection, validation, and error display.
- **src/app/\_components/analysis.tsx**: Displays the AI's analysis in a readable format.
- **src/server/api/integrations/gemini/text-analysis.ts**: Handles communication with the Gemini API.
- **src/server/api/routers/analysis.ts**: tRPC router for processing uploaded files and returning analysis.
- **src/env.js**: Type-safe environment variable validation.

## Development & Tooling

- **Linting**: `npm run lint` (uses ESLint with Next.js and TypeScript rules)
- **Formatting**: `npm run format:write` (uses Prettier with Tailwind plugin)
- **Type Checking**: `npm run typecheck`
- **Build**: `npm run build`

## Environment Variables

| Variable        | Description                    |
| --------------- | ------------------------------ |
| GEMINI_TOKEN    | Google Gemini API token        |
| GEMINI_ENDPOINT | Google Gemini API endpoint URL |

## Credits

- Built with the [T3 Stack](https://create.t3.gg/)
- AI analysis powered by [Google Gemini (Vertex AI)](https://cloud.google.com/vertex-ai)
