import express from "express";
import validatorHandler from "../../middlewares/validator.handler";
import { 
  getJudicialProcessReasonByCHBController,
  getJudicialProcessReasonByIdController,
  getJudicialProcessReasonController,
  createJudicialProcessReasonController,
  deleteJudicialProcessReasonController,
  updateJudicialProcessReasonController
} from "../../controllers/judicial/judicial-process-reason.controller";
import { JWTAuth } from "../../middlewares/auth.handler";
import judicialProcessReasonSchema from "../../app/judicial/schemas/judicial-process-reason.schema";
const { 
  getJudicialReasonProcessByCHBSchema, 
  getJudicialReasonProcessByIDSchema, 
  createJudicialReasonProcessSchema, 
  updateJudicialReasonProcessSchema, 
} = judicialProcessReasonSchema; 

const router = express.Router();

router.get("/", JWTAuth, getJudicialProcessReasonController);

router.get(
  "/chb/:chb",
  JWTAuth,
  validatorHandler(getJudicialReasonProcessByCHBSchema, "params"),
  getJudicialProcessReasonByCHBController
);

router.get(
  "/:id",
  JWTAuth,
  validatorHandler(getJudicialReasonProcessByIDSchema, "params"),
  getJudicialProcessReasonByIdController,
);

router.post(
  "/",
  JWTAuth,
  validatorHandler(createJudicialReasonProcessSchema, "body"),
  createJudicialProcessReasonController
);

router.patch(
  "/:id",
  JWTAuth,
  validatorHandler(getJudicialReasonProcessByIDSchema, "params"),
  validatorHandler(updateJudicialReasonProcessSchema, "body"),
  updateJudicialProcessReasonController
);

router.delete(
  "/:id",
  JWTAuth,
  validatorHandler(getJudicialReasonProcessByIDSchema, "params"),
  deleteJudicialProcessReasonController
);

export default router;
