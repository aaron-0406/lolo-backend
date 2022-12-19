import Joi from "joi";
import { CommentType } from "../types/comment.type";

const id = Joi.number();
const comment = Joi.string().min(1).max(400);
const negotiation = Joi.string().min(1).max(100);
const date = Joi.date();
const hour = Joi.date();
const customerUserID = Joi.number();
const clientID = Joi.number();

const createCommentSchema = Joi.object<CommentType, true>({
  id: id.required(),
  comment: comment.required(),
  negotiation: negotiation.required(),
  date: date.required(),
  hour: hour.required(),
  customerUserID: customerUserID.required(),
  clientID: clientID.required(),
});

const getCommentSchema = Joi.object<{ id: number }, true>({
  id: id.required(),
});

export default { createCommentSchema, getCommentSchema };
