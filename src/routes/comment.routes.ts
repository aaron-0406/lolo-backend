import express from "express";
import validatorHandler from "../middlewares/validator.handler";
import commentSchema from "../app/extrajudicial/schemas/comment.schema";
import {
  createCommentController,
  deleteCommentController,
  getAllCommentsByClientController,
  getChartByCustomerUserController,
  getCommentByIdController,
  updateCommentController,
} from "../controllers/comment.controller";

const {
  getCommentByClientIDSchema,
  getCommentByIDSchema,
  createCommentSchema,
  updateCommentSchema,
} = commentSchema;

const router = express.Router();

router.get(
  "/all-client/:clientId",
  validatorHandler(getCommentByClientIDSchema, "params"),
  getAllCommentsByClientController
);

router.get(
  "/chart/:clientId",
  validatorHandler(getCommentByClientIDSchema, "params"),
  getChartByCustomerUserController
);

router.get(
  "/:id",
  validatorHandler(getCommentByIDSchema, "params"),
  getCommentByIdController
);

router.post(
  "/",
  validatorHandler(createCommentSchema, "body"),
  createCommentController
);

router.patch(
  "/:id",
  validatorHandler(getCommentByIDSchema, "params"),
  validatorHandler(updateCommentSchema, "body"),
  updateCommentController
);

router.delete(
  "/:id",
  validatorHandler(getCommentByIDSchema, "params"),
  deleteCommentController
);

export default router;
