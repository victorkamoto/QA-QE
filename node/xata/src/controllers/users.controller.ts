import { Request, Response } from "express";
import { matchedData, validationResult } from "express-validator";
import { usersService } from "../services";
import ResponseHandler from "../utils/responseHandler.util";
import { ValidationErr } from "../utils/errors.util";
import { User } from "../types/users.types";

const findAll = async (req: Request, res: Response) => {
  try {
    const payload = await usersService.findAll();

    await ResponseHandler.success(req, res, payload);
  } catch (err) {
    await ResponseHandler.error(req, res, err);
  }
};

const findOne = async (req: Request, res: Response) => {
  try {
    const err = validationResult(req);
    if (!err.isEmpty()) {
      throw new ValidationErr(err.array());
    }

    const entry = matchedData<Pick<User, "id">>(req);
    const payload = await usersService.findOne(entry);

    await ResponseHandler.success(req, res, payload);
  } catch (err) {
    await ResponseHandler.error(req, res, err);
  }
};

const create = async (req: Request, res: Response) => {
  try {
    const err = validationResult(req);
    if (!err.isEmpty()) {
      throw new ValidationErr(err.array());
    }

    const entry = matchedData<Omit<User, "id">>(req);
    const payload = await usersService.create(entry);

    await ResponseHandler.success(req, res, payload);
  } catch (err) {
    await ResponseHandler.error(req, res, err);
  }
};

const put = async (req: Request, res: Response) => {
  try {
    const err = validationResult(req);
    if (!err.isEmpty()) {
      throw new ValidationErr(err.array());
    }

    const entry = matchedData<User>(req);
    const payload = await usersService.put(entry);

    await ResponseHandler.success(req, res, payload);
  } catch (err) {
    await ResponseHandler.error(req, res, err);
  }
};

const patch = async (req: Request, res: Response) => {
  try {
    const err = validationResult(req);
    if (!err.isEmpty()) {
      throw new ValidationErr(err.array());
    }

    const entry = matchedData<User>(req);
    const payload = await usersService.patch(entry);

    await ResponseHandler.success(req, res, payload);
  } catch (err) {
    await ResponseHandler.error(req, res, err);
  }
};

const remove = async (req: Request, res: Response) => {
  try {
    const err = validationResult(req);
    if (!err.isEmpty()) {
      throw new ValidationErr(err.array());
    }

    const entry = matchedData<Pick<User, "id">>(req);
    const payload = await usersService.remove(entry);

    await ResponseHandler.success(req, res, payload);
  } catch (err) {
    await ResponseHandler.error(req, res, err);
  }
};

export default { create, findAll, findOne, put, patch, remove };
