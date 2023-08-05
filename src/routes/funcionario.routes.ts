import express from "express";
import validatorHandler from "../middlewares/validator.handler";
import funcionarioSchema from "../app/boss/schemas/funcionario.schema";
import {
  createFuncionarioController,
  deleteFuncionarioController,
  getFuncionarioByIdController,
  getFuncionariosByCHBController,
  getFuncionariosController,
  updateFuncionarioController,
} from "../controllers/funcionario.controller";

const {
  getFuncionarioSchema,
  getFuncionarioByCHBSchema,
  createFuncionarioSchema,
  updateFuncionarioSchema,
} = funcionarioSchema;
const router = express.Router();

router.get("/", getFuncionariosController);

router.get(
  "/all/:chb",
  validatorHandler(getFuncionarioByCHBSchema, "params"),
  getFuncionariosByCHBController
);

router.get(
  "/:id",
  validatorHandler(getFuncionarioSchema, "params"),
  getFuncionarioByIdController
);

router.post(
  "/",
  validatorHandler(createFuncionarioSchema, "body"),
  createFuncionarioController
);

router.put(
  "/:id",
  validatorHandler(getFuncionarioSchema, "params"),
  validatorHandler(updateFuncionarioSchema, "body"),
  updateFuncionarioController
);

router.delete(
  "/:id",
  validatorHandler(getFuncionarioSchema, "params"),
  deleteFuncionarioController
);

export default router;
