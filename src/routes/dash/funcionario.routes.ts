import express from "express";
import validatorHandler from "../../middlewares/validator.handler";
import funcionarioSchema from "../../app/dash/schemas/funcionario.schema";
import {
  createFuncionarioController,
  deleteFuncionarioController,
  getFuncionarioByIdController,
  getFuncionariosByCHBController,
  getFuncionariosController,
  updateFuncionarioController,
} from "../../controllers/dash/funcionario.controller";
import { JWTAuth, checkPermissions } from "../../middlewares/auth.handler";

const {
  getFuncionarioSchema,
  getFuncionarioByCHBSchema,
  getFuncionarioByCHBSchemaQuery,
  createFuncionarioSchema,
  updateFuncionarioSchema,
} = funcionarioSchema;
const router = express.Router();

router.get("/", JWTAuth, getFuncionariosController);

router.get(
  "/all/:chb",
  JWTAuth,
  checkPermissions("P08-04"),
  validatorHandler(getFuncionarioByCHBSchema, "params"),
  validatorHandler(getFuncionarioByCHBSchemaQuery, "query"),
  getFuncionariosByCHBController
);

router.get(
  "/:id",
  JWTAuth,
  validatorHandler(getFuncionarioSchema, "params"),
  getFuncionarioByIdController
);

router.post(
  "/",
  JWTAuth,
  checkPermissions("P08-01"),
  validatorHandler(createFuncionarioSchema, "body"),
  createFuncionarioController
);

router.put(
  "/:id",
  JWTAuth,
  checkPermissions("P08-02"),
  validatorHandler(getFuncionarioSchema, "params"),
  validatorHandler(updateFuncionarioSchema, "body"),
  updateFuncionarioController
);

router.delete(
  "/:id",
  JWTAuth,
  checkPermissions("P08-03"),
  validatorHandler(getFuncionarioSchema, "params"),
  deleteFuncionarioController
);

export default router;
