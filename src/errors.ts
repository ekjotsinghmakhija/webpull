// src/errors.ts
export type ErrorCode = "TIMEOUT" | "NETWORK" | "PARSE" | "ACCESS_DENIED";

export class WebPullError extends Error {
  constructor(
    public message: string,
    public url: string,
    public code: ErrorCode,
  ) {
    // Standardize the message format here
    const fullMessage = `[${code}] at ${url}: ${message}`;
    super(fullMessage);
    this.name = "WebPullError";
    // Ensure the message property is correctly set
    this.message = fullMessage;
  }
}
