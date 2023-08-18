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
} from "../controllers/extrajudicial/comment.controller";
import { JWTAuth } from "../middlewares/auth.handler";

const {
  getCommentByClientIDSchema,
  getCommentByIDSchema,
  createCommentSchema,
  updateCommentSchema,
} = commentSchema;

const router = express.Router();

router.get(
  "/all-client/:clientId",
  JWTAuth,
  validatorHandler(getCommentByClientIDSchema, "params"),
  getAllCommentsByClientController
);

router.get(
  "/chart/:clientId",
  JWTAuth,
  validatorHandler(getCommentByClientIDSchema, "params"),
  getChartByCustomerUserController
);

router.get(
  "/:id",
  JWTAuth,
  validatorHandler(getCommentByIDSchema, "params"),
  getCommentByIdController
);

router.post(
  "/",
  JWTAuth,
  validatorHandler(createCommentSchema, "body"),
  createCommentController
);

router.patch(
  "/:id",
  JWTAuth,
  validatorHandler(getCommentByIDSchema, "params"),
  validatorHandler(updateCommentSchema, "body"),
  updateCommentController
);

router.delete(
  "/:id",
  JWTAuth,
  validatorHandler(getCommentByIDSchema, "params"),
  deleteCommentController
);

export default router;
