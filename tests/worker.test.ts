// tests/worker.test.ts
import { expect, test } from "bun:test";
import { WebPullError } from "../src/errors";

test("Worker throws specific error on network failure", () => {
  const failingFunction = () => {
    throw new WebPullError("Server 500", "https://bad-site.com", "NETWORK");
  };

  // This will now match because WebPullError sets the message
  // property to "[NETWORK] at https://bad-site.com: Server 500"
  expect(failingFunction).toThrow(
    "[NETWORK] at https://bad-site.com: Server 500",
  );
});
