// src/errors.ts
export type ErrorCode = "TIMEOUT" | "NETWORK" | "PARSE" | "ACCESS_DENIED";

export class WebPullError extends Error {
  constructor(
    public message: string,
    public url: string,
    public code: ErrorCode,
  ) {
    // Standardize the message format for the test suite
    const fullMessage = `[${code}] at ${url}: ${message}`;
    super(fullMessage);
    this.name = "WebPullError";
    this.message = fullMessage;
  }
}

export function handleAndLog(err: WebPullError) {
  const suggestions: Record<ErrorCode, string> = {
    TIMEOUT: "Increase your timeout setting or check your network latency.",
    NETWORK:
      "The server rejected the request. Check your proxy/IP rotation settings.",
    PARSE: "The page structure may have changed. Check the DOM selector.",
    ACCESS_DENIED: "Bot detection triggered. Try a different User-Agent.",
  };

  console.error(`\n❌ [${err.code}] Failed to process: ${err.url}`);
  console.error(`   Reason: ${err.message}`);
  console.error(`   Suggestion: ${suggestions[err.code]}\n`);
}
