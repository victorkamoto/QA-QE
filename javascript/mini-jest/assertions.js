export const assertions = {
  assertEqual(actual, expected, message = "") {
    if (actual !== expected) {
      throw new Error(message || `Expected ${actual} to equal ${expected}`);
    }
  },

  assertNotEqual(actual, expected, message = "") {
    if (actual === expected) {
      throw new Error(message || `Expected ${actual} to not equal ${expected}`);
    }
  },

  assertTrue(value, message = "") {
    if (!value) {
      throw new Error(message || `Expected ${value} to be truthy`);
    }
  },

  assertFalse(value, message = "") {
    if (value) {
      throw new Error(message || `Expected ${value} to be falsy`);
    }
  },

  assertContains(array, item, message = "") {
    if (!array.includes(item)) {
      throw new Error(message || `Expected array to contain ${item}`);
    }
  },

  // Custom assertions go here
};
