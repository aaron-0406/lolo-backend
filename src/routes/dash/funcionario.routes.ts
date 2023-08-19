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
import { JWTAuth } from "../../middlewares/auth.handler";

const {
  getFuncionarioSchema,
  getFuncionarioByCHBSchema,
  createFuncionarioSchema,
  updateFuncionarioSchema,
} = funcionarioSchema;
const router = express.Router();

router.get("/", JWTAuth, getFuncionariosController);

router.get(
  "/all/:chb",
  JWTAuth,
  validatorHandler(getFuncionarioByCHBSchema, "params"),
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
  validatorHandler(createFuncionarioSchema, "body"),
  createFuncionarioController
);

router.put(
  "/:id",
  JWTAuth,
  validatorHandler(getFuncionarioSchema, "params"),
  validatorHandler(updateFuncionarioSchema, "body"),
  updateFuncionarioController
);

router.delete(
  "/:id",
  JWTAuth,
  validatorHandler(getFuncionarioSchema, "params"),
  deleteFuncionarioController
);

export default router;
