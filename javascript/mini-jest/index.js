import { assertions } from "./assertions.js";
import { beforeAll, afterAll, beforeEach, afterEach } from "./hooks.js";
import { Reporter } from "./Reporter.js";
import { TestRunner } from "./TestRunner.js";
import { describe, test } from "./utils.js";

export const testRunner = new TestRunner(new Reporter());

describe("Math operations", () => {
  beforeAll(() => {
    console.log("Before all tests...");
  });

  afterAll(() => {
    console.log("After all tests...");
  });

  beforeEach(() => {
    console.log("Setting up...");
  });

  afterEach(() => {
    console.log("Cleaning up...");
  });

  test("should add numbers correctly", () => {
    assertions.assertEqual(2 + 2, 4, "Addition is incorrect");
  });

  test("should handle failing test", () => {
    assertions.assertEqual(2 + 2, 5, "Addition is incorrect");
  });

  test("should work with async operations", async () => {
    const data = await new Promise((resolve) =>
      setTimeout(() => resolve(42), 100)
    );
    assertions.assertEqual(data, 42, "Async test failed");
  });
});

testRunner.runTests();
