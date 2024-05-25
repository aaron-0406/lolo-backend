import Joi from "joi";
import { PermissionType } from "../types/permission.type";

const id = Joi.number();
const name = Joi.string().min(1).max(150);
const code = Joi.string().min(1).max(150);
const icon = Joi.string().min(1).max(150);
const link = Joi.string().min(1).max(150);
const idPermissionMain = Joi.number();
const isDropdown = Joi.boolean();

const createPermissionSchema = Joi.object<
  Omit<PermissionType, "id" | "permissions">,
  true
>({
  name: name.required(),
  code: code.required(),
  icon: icon.required(),
  link: link.required(),
  idPermissionMain: idPermissionMain.optional(),
  isDropdown: isDropdown.optional(),
});

const getPermissionByIdSchema = Joi.object<{ id: number }, true>({
  id: id.required(),
});

const getPermissionsSchema = Joi.object<{ code: string }, true>({
  code: code.optional(),
});

const updatePermissionSchema = Joi.object<
  Omit<PermissionType, "id" | "permissions">,
  true
>({
  name,
  code,
  icon,
  link,
  idPermissionMain: idPermissionMain.optional(),
  isDropdown: isDropdown.optional(),
});

export default {
  createPermissionSchema,
  updatePermissionSchema,
  getPermissionByIdSchema,
  getPermissionsSchema,
};
