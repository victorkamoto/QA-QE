export class Reporter {
  constructor() {
    this.passed = 0;
    this.failed = 0;
  }

  onTestStart(testName) {
    console.log(`Running test: ${testName}`);
  }

  onTestSuccess(testName) {
    console.log(`✅ ${testName} passed`);
    this.passed++;
  }

  onTestFailure(testName, error) {
    console.error(`❌ ${testName} failed: ${error.message}`);
    this.failed++;
  }

  onFinish() {
    console.log(`\nTest Results: ${this.passed} passed, ${this.failed} failed`);
  }

  // custom reports go here
}
