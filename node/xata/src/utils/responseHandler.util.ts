import { Request, Response } from "express";
export default class ResponseHandler {
  static async success(req: Request, res: Response, payload: any) {
    if (payload !== undefined) {
      res.status(200).json({
        success: true,
        payload,
      });
    } else {
      res.status(200).json({
        success: true,
      });
    }
  }

  static async error(req: Request, res: Response, error: any) {
    if (error && [400, 401, 403, 404].includes(error.code)) {
      res.status(error.code).json({
        success: false,
        message: error.message,
        errors: error.errors,
      });
    } else {
      console.error(error);
      res.status(500).send({
        success: false,
        message: error.message,
      });
    }
  }
}
