import express from "express";
import validatorHandler from "../middlewares/validator.handler";
import funcionarioSchema from "../app/boss/schemas/funcionario.schema";
import FuncionarioService from "../app/boss/services/funcionario.service";

const {
  getFuncionarioSchema,
  createFuncionarioSchema,
  updateFuncionarioSchema,
} = funcionarioSchema;
const router = express.Router();
const service = new FuncionarioService();

router.get("/", async (req, res, next) => {
  try {
    const funcionarios = await service.findAll();
    res.json(funcionarios);
  } catch (error) {
    next(error);
  }
});

router.get(
  "/:id",
  validatorHandler(getFuncionarioSchema, "params"),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const funcionario = await service.findOne(id);
      res.json(funcionario);
    } catch (error) {
      next(error);
    }
  }
);

router.post(
  "/",
  validatorHandler(createFuncionarioSchema, "body"),
  async (req, res, next) => {
    try {
      const body = req.body;
      const newFuncionario = await service.create(body);
      res.status(201).json(newFuncionario);
    } catch (error) {
      next(error);
    }
  }
);

router.put(
  "/:id",
  validatorHandler(getFuncionarioSchema, "params"),
  validatorHandler(updateFuncionarioSchema, "body"),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const body = req.body;
      const funcionario = await service.update(id, body);
      res.json(funcionario);
    } catch (error) {
      next(error);
    }
  }
);

router.delete(
  "/:id",
  validatorHandler(getFuncionarioSchema, "params"),
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
