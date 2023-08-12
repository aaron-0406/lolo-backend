import express from "express";
import validatorHandler from "../../middlewares/validator.handler";
import permissionSchema from "../../app/boss/schemas/permission.schema";
import {
  createPermissionController,
  deletePermissionController,
  getAllPermissionController,
  getPermissionByIdController,
  updatePermissionController,
} from "../../controllers/dash/permission.controller";
import { JWTAuth } from "../../middlewares/auth.handler";

const { getPermissionSchema, createPermissionSchema, updatePermissionSchema } =
  permissionSchema;
const router = express.Router();

router.get(
  "/",
  JWTAuth,
  getAllPermissionController
);

router.get(
  "/:id",
  JWTAuth,
  validatorHandler(getPermissionSchema, "params"),
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
  validatorHandler(getPermissionSchema, "params"),
  validatorHandler(updatePermissionSchema, "body"),
  updatePermissionController
);

router.delete(
  "/:id",
  JWTAuth,
  validatorHandler(getPermissionSchema, "params"),
  deletePermissionController
);

export default router;
