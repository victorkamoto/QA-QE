import { ValidationError } from "express-validator";

export class NotFoundErr extends Error {
  code: Number;

  constructor(message?: string) {
    super(message || "Not Found!");
    this.code = 400;
  }
}

export class ValidationErr extends Error {
  code: Number;
  errors: ValidationError[];

  constructor(errors: ValidationError[], message?: string) {
    super(message || "Validation Error!");
    this.code = 400;
    this.errors = errors;
  }
}
