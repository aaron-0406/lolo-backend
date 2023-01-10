import express, { Request, Response, NextFunction } from "express";
import validatorHandler from "../middlewares/validator.handler";
import fileSchema from "../app/customers/schemas/file.schema";
import FileService from "../app/customers/services/file.service";
import { archivos } from "../middlewares/multer.handler";
import boom from "@hapi/boom";

const { createFileSchema, getFileSchema } = fileSchema;
const router = express.Router();
const service = new FileService();

const multerFile = (req: Request, res: Response, next: NextFunction) => {
  archivos.array("file")(req, res, (err) => {
    if (err) return next(boom.badRequest(err));
    return next();
  });
};

router.get(
  "/:id",
  validatorHandler(getFileSchema, "params"),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const files = await service.find(Number(id));
      res.json(files);
    } catch (error) {
      next(error);
    }
  }
);

router.post(
  "/:id",
  validatorHandler(createFileSchema, "params"),
  multerFile,
  async (req, res, next) => {
    try {
      req.body.clientId = req.params.id;
      req.body.files = req.files;
      const { body } = req;
      const newFile = await service.create(body);
      res.status(201).json(newFile);
    } catch (error) {
      console.log(error);
      next(error);
    }
  }
);

// router.put(
//   "/:id",
//   validatorHandler(getCitySchema, "params"),
//   async (req, res, next) => {
//     try {
//       const { id } = req.params;
//       const body = req.body;
//       const city = await service.update(id, body);
//       res.json(city);
//     } catch (error) {
//       next(error);
//     }
//   }
// );

router.delete(
  "/:id",
  validatorHandler(createFileSchema, "params"),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      await service.delete(Number(id));
      res.status(201).json({ id });
    } catch (error) {
      next(error);
    }
  }
);

export default router;
