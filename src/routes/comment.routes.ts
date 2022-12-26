import express from "express";
import validatorHandler from "../middlewares/validator.handler";
import commentSchema from "../app/extrajudicial/schemas/comment.schema";
import CommentService from "../app/extrajudicial/services/comment.service";

const {
  getCommentByClientIDSchema,
  getCommentByIDSchema,
  createCommentSchema,
  updateCommentSchema,
} = commentSchema;

const router = express.Router();
const service = new CommentService();

router.get(
  "/all-client/:clientId",
  validatorHandler(getCommentByClientIDSchema, "params"),
  async (req, res, next) => {
    try {
      const { clientId } = req.params;
      const comments = await service.findAllByClient(clientId);
      res.json(comments);
    } catch (error) {
      next(error);
    }
  }
);

router.get(
  "/:id",
  validatorHandler(getCommentByIDSchema, "params"),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const comment = await service.findByID(id);
      res.json(comment);
    } catch (error) {
      next(error);
    }
  }
);

router.post(
  "/",
  validatorHandler(createCommentSchema, "body"),
  async (req, res, next) => {
    try {
      const body = req.body;
      const newComment = await service.create(body);
      res.status(201).json(newComment);
    } catch (error) {
      next(error);
    }
  }
);

router.patch(
  "/:id",
  validatorHandler(getCommentByIDSchema, "params"),
  validatorHandler(updateCommentSchema, "body"),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const body = req.body;
      const comment = await service.update(id, body);
      res.json(comment);
    } catch (error) {
      next(error);
    }
  }
);

router.delete(
  "/:id",
  validatorHandler(getCommentByIDSchema, "params"),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      await service.delete(id);
      res.status(201).json({ id });
    } catch (error) {
      next(error);
    }
  }
);

export default router;
