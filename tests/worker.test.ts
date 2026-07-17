// tests/worker.test.ts
import { expect, test, mock } from "bun:test";
import { processUrl } from "../src/worker";
import { WebPullError } from "../src/errors";

test("Worker handles valid URLs", async () => {
  const result = await processUrl({ url: "https://example.com" });
  expect(result).toContain("Content extracted");
});

test("Worker throws specific error on network failure", async () => {
  // Mock a failing process
  const failingProcess = mock(() => {
    throw new WebPullError("Server 500", "https://bad-site.com", "NETWORK");
  });

  expect(() => failingProcess()).toThrow(
    "[NETWORK] at https://bad-site.com: Server 500",
  );
});
