import Joi from "joi";
import { CommentType } from "../types/comment.type";

const id = Joi.number();
const comment = Joi.string().min(1);
const negotiation = Joi.string().min(1).max(100);
const managementActionId = Joi.number();
const date = Joi.date();
const hour = Joi.date();
const customerUserId = Joi.number();
const clientId = Joi.number();
const visible = Joi.boolean();

const createCommentSchema = Joi.object<Omit<CommentType, "id">, true>({
  comment: comment.required(),
  negotiation: negotiation.required(),
  managementActionId: managementActionId.optional().empty("").allow(""),
  date: date.required(),
  hour: hour.optional(),
  customerUserId: customerUserId.required(),
  clientId: clientId.required(),
});

const updateCommentSchema = Joi.object<
  Omit<CommentType, "id" | "clientId">,
  true
>({
  comment: comment.required(),
  negotiation: negotiation.required(),
  managementActionId: managementActionId.optional().empty("").allow(""),
  date: date.required(),
  hour: hour.optional(),
  customerUserId: customerUserId.required(),
});

const getCommentByClientIDSchema = Joi.object<{ clientId: number }, true>({
  clientId: clientId.required(),
});

const getCommentByClientIDSchemaQuery = Joi.object({
  visible,
}).options({ abortEarly: true });

const getCommentByIDSchema = Joi.object<{ id: number }, true>({
  id: id.required(),
});

export default {
  createCommentSchema,
  updateCommentSchema,
  getCommentByClientIDSchema,
  getCommentByIDSchema,
  getCommentByClientIDSchemaQuery,
};
