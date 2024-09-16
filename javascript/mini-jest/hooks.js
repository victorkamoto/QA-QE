import { testRunner } from "./index.js";

export function beforeAll(callback) {
  testRunner.setHooks({ beforeAll: callback });
}

export function afterAll(callback) {
  testRunner.setHooks({ afterAll: callback });
}

export function beforeEach(callback) {
  testRunner.setHooks({ beforeEach: callback });
}

export function afterEach(callback) {
  testRunner.setHooks({ afterEach: callback });
}
