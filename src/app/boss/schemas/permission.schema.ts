import Joi from "joi";
import { PermissionType } from "../types/permission.type";

const id = Joi.number();
const name = Joi.string().min(1).max(100);
const code = Joi.string().min(1).max(100);
const icon = Joi.string().min(1).max(100);

const createPermissionSchema = Joi.object<
  Omit<PermissionType, "id" | "permissions">,
  true
>({
  name: name.required(),
  code: code.required(),
  icon: icon.required(),
});

const getPermissionByIdSchema = Joi.object<{ id: number }, true>({
  id: id.required(),
});

const updatePermissionSchema = Joi.object<
  Omit<PermissionType, "id" | "permissions">,
  true
>({
  name,
  code,
  icon,
});

export default {
  createPermissionSchema,
  updatePermissionSchema,
  getPermissionByIdSchema,
};
