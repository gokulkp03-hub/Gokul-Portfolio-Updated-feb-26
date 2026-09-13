import { trpc } from "@/lib/trpc";
import { UNAUTHED_ERR_MSG } from '@shared/const';
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { httpBatchLink, TRPCClientError } from "@trpc/client";
import { createRoot } from "react-dom/client";
import superjson from "superjson";
import App from "./App";
import { getLoginUrl } from "./const";
import "./index.css";

const queryClient = new QueryClient();

const redirectToLoginIfUnauthorized = (error: unknown) => {
  if (!(error instanceof TRPCClientError)) return;
  if (typeof window === "undefined") return;

  const isUnauthorized = error.message === UNAUTHED_ERR_MSG;

  if (!isUnauthorized) return;

  window.location.href = getLoginUrl();
};

queryClient.getQueryCache().subscribe(event => {
  if (event.type === "updated" && event.action.type === "error") {
    const error = event.query.state.error;
    redirectToLoginIfUnauthorized(error);
    console.error("[API Query Error]", error);
  }
});

queryClient.getMutationCache().subscribe(event => {
  if (event.type === "updated" && event.action.type === "error") {
    const error = event.mutation.state.error;
    redirectToLoginIfUnauthorized(error);
    console.error("[API Mutation Error]", error);
  }
});

const backendUrl = import.meta.env.VITE_API_URL || "";

const trpcClient = trpc.createClient({
  links: [
    httpBatchLink({
      url: `${backendUrl}/api/trpc`,
      transformer: superjson,
      async fetch(input, init) {
        const res = await globalThis.fetch(input, {
          ...(init ?? {}),
          credentials: "include",
        });

        // Guard against HTML responses (e.g. 404/500 static page fallbacks or SPA rewrites)
        // that throw "SyntaxError: Unexpected token '<'" when parsed as JSON
        const contentType = res.headers.get("content-type") || "";
        if (!contentType.includes("application/json") && !res.ok) {
          return new Response(
            JSON.stringify([
              {
                error: {
                  message: `API endpoint returned HTML error (${res.status})`,
                  code: -32004,
                  data: { httpStatus: res.status, code: "NOT_FOUND" },
                },
              },
            ]),
            {
              status: res.status,
              statusText: res.statusText,
              headers: { "Content-Type": "application/json" },
            }
          );
        }

        return res;
      },
    }),
  ],
});

import { HelmetProvider } from 'react-helmet-async';
import { SpeedInsights } from '@vercel/speed-insights/react';

createRoot(document.getElementById("root")!).render(
  <trpc.Provider client={trpcClient} queryClient={queryClient}>
    <QueryClientProvider client={queryClient}>
      <HelmetProvider>
        <App />
        <SpeedInsights />
      </HelmetProvider>
    </QueryClientProvider>
  </trpc.Provider>
);
