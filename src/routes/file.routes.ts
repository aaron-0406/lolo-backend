import express, { Request, Response, NextFunction } from "express";
import validatorHandler from "../middlewares/validator.handler";
import fileSchema from "../app/extrajudicial/schemas/file.schema";
import { archivos } from "../middlewares/multer.handler";
import boom from "@hapi/boom";
import {
  createFileController,
  deleteFileController,
  findFileByClientIdController,
  findFileByIdController,
} from "../controllers/extrajudicial/file.controller";
import { JWTAuth } from "../middlewares/auth.handler";

const { createFileSchema, getFileSchema } = fileSchema;
const router = express.Router();

const multerFile = (req: Request, res: Response, next: NextFunction) => {
  archivos.array("file")(req, res, (err) => {
    if (err) return next(boom.badRequest(err));
    return next();
  });
};

router.get(
  "/:id",
  JWTAuth,
  validatorHandler(getFileSchema, "params"),
  findFileByClientIdController
);

router.get(
  "/single/:idCustomer/:chb/:code/:id",
  JWTAuth,
  validatorHandler(getFileSchema, "params"),
  findFileByIdController
);

router.post(
  "/:idCustomer/:chb/:code/:id",
  JWTAuth,
  validatorHandler(createFileSchema, "params"),
  multerFile,
  createFileController
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
  "/:idCustomer/:chb/:code/:id",
  JWTAuth,
  validatorHandler(createFileSchema, "params"),
  deleteFileController
);

export default router;
