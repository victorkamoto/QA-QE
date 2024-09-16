import { testRunner } from "./index.js";

export function describe(description, suiteFunction) {
  console.log(`\nSuite: ${description}`);
  suiteFunction();
}

export function test(testName, testFunction) {
  const isAsync = testFunction.constructor.name === "AsyncFunction";
  testRunner.registerTest(testName, testFunction, isAsync);
}
