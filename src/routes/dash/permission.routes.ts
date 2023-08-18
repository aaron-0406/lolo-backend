import express from "express";
import validatorHandler from "../../middlewares/validator.handler";
import permissionSchema from "../../app/dash/schemas/permission.schema";
import {
  createPermissionController,
  deletePermissionController,
  getAllPermissionController,
  getPermissionByIdController,
  updatePermissionController,
} from "../../controllers/dash/permission.controller";
import { JWTAuth } from "../../middlewares/auth.handler";

const {
  getPermissionByIdSchema,
  createPermissionSchema,
  updatePermissionSchema,
} = permissionSchema;
const router = express.Router();

router.get("/", JWTAuth, getAllPermissionController);

router.get(
  "/:id",
  JWTAuth,
  validatorHandler(getPermissionByIdSchema, "params"),
  getPermissionByIdController
);

router.post(
  "/",
  JWTAuth,
  validatorHandler(createPermissionSchema, "body"),
  createPermissionController
);

router.put(
  "/:id",
  JWTAuth,
  validatorHandler(getPermissionByIdSchema, "params"),
  validatorHandler(updatePermissionSchema, "body"),
  updatePermissionController
);

router.delete(
  "/:id",
  JWTAuth,
  validatorHandler(getPermissionByIdSchema, "params"),
  deletePermissionController
);

export default router;
