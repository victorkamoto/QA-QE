export class TestRunner {
  constructor(reporter) {
    this.tests = [];
    this.executionOrder = "sequential";
    this.hooks = {
      beforeAll: () => {},
      afterAll: () => {},
      beforeEach: () => {},
      afterEach: () => {},
    };
    this.reporter = reporter;
  }

  registerTest(name, testFunction, isAsync = false) {
    this.tests.push({ name, testFunction, isAsync });
  }

  async runTests() {
    try {
      await this.hooks.beforeAll();
    } catch (error) {
      this.reporter.onTestFailure("beforeAll", error);
    }

    for (const test of this.tests) {
      this.reporter.onTestStart(test.name);
      try {
        await this.hooks.beforeEach();
        if (test.isAsync) {
          await test.testFunction();
        } else {
          test.testFunction();
        }
        this.reporter.onTestSuccess(test.name);
      } catch (error) {
        this.reporter.onTestFailure(test.name, error);
      } finally {
        await this.hooks.afterEach();
      }
    }

    try {
      await this.hooks.afterAll();
    } catch (error) {
      this.reporter.onTestFailure("afterAll", error);
    }

    this.reporter.onFinish();
  }

  filterTests(filter) {
    this.tests = this.tests.filter((test) => test.name.includes(filter));
  }

  setExecutionOrder(order) {
    this.executionOrder = order;
    if (order === "reverse") {
      this.tests.reverse();
    }
  }

  setHooks(hooks) {
    this.hooks = { ...this.hooks, ...hooks };
  }
}
