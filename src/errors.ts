// src/errors.ts
export class WebPullError extends Error {
  constructor(
    public message: string,
    public url: string,
    public code: "TIMEOUT" | "NETWORK" | "PARSE" | "ACCESS_DENIED",
  ) {
    super(`[${code}] at ${url}: ${message}`);
  }
}

export function logError(err: WebPullError) {
  console.error(`❌ ERROR: ${err.code}`);
  console.error(`   URL: ${err.url}`);
  console.error(`   Message: ${err.message}`);

  if (err.code === "TIMEOUT") {
    console.error(
      `   Suggestion: Increase the timeout duration in the renderer or check your proxy settings.`,
    );
  }
}
