import { Router } from "express";
import { users } from "../controllers";
import { checkSchema } from "express-validator";
import { userSchema } from "../middleware/validators";

const router = Router();

router
  .route("/users")
  .get(users.findAll)
  .post(checkSchema(userSchema.create.body, ["body"]), users.create);

router
  .route("/users/:id")
  .get(users.findOne)
  .put(
    checkSchema(userSchema.put.params, ["params"]),
    checkSchema(userSchema.put.body, ["body"]),
    users.put,
  )
  .patch(
    checkSchema(userSchema.patch.params, ["params"]),
    checkSchema(userSchema.patch.body, ["body"]),
    users.patch,
  )
  .delete(checkSchema(userSchema.delete.params), users.remove);

export default router;
