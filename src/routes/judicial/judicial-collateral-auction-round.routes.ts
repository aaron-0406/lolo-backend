import express from "express";
import validatorHandler from "../../middlewares/validator.handler";
import judicialCollateralAuctionRoundSchema from "../../app/judicial/schemas/judicial-collateral-auction-round.schema";
import {
  createJudicialCollateralAuctionRoundController,
  deleteJudicialCollateralAuctionRoundController,
  getJudicialCollateralAuctionRoundById,
  updateJudicialCollateralAuctionRoundController,
  getAllJudicialCollateralAuctionRoundController,
  getAllJudicialAuctionsByCaseFileIdController
} from "../../controllers/judicial/judicial-collateral-auction-round.controller";
import { JWTAuth, checkPermissions } from "../../middlewares/auth.handler";

const {
  createJudicialCollateralAuctionRoundSchema,
  updateJudicialCollateralAuctionRoundSchema,
  deleteJudicialCollateralAuctionRoundSchema,
  getJudicialCollateralAuctionRoundByIdSchema,
  getJudicialCollateralAuctionRoundByCaseFileIdSchema
} = judicialCollateralAuctionRoundSchema;

const router = express.Router();

router.get(
  "/:chb/:collateralId",
  JWTAuth,
  getAllJudicialCollateralAuctionRoundController
);

router.get(
  "/:caseFileId",
  JWTAuth,
  validatorHandler(getJudicialCollateralAuctionRoundByCaseFileIdSchema, "params"),
  getAllJudicialAuctionsByCaseFileIdController
);

router.get(
  "/:chb/:collateralId/:id",
  JWTAuth,
  validatorHandler(getJudicialCollateralAuctionRoundByIdSchema, "params"),
  getJudicialCollateralAuctionRoundById
);

router.post(
  "/",
  JWTAuth,
  checkPermissions("P13-01-06-01-04-01"),
  validatorHandler(createJudicialCollateralAuctionRoundSchema, "body"),
  createJudicialCollateralAuctionRoundController
);

router.patch(
  "/:chb/:collateralId/:id",
  JWTAuth,
  checkPermissions("P13-01-06-01-04-02"),
  validatorHandler(getJudicialCollateralAuctionRoundByIdSchema, "params"),
  validatorHandler(updateJudicialCollateralAuctionRoundSchema, "body"),
  updateJudicialCollateralAuctionRoundController
);

router.delete(
  "/:chb/:collateralId/:id",
  JWTAuth,
  checkPermissions("P13-01-06-01-04-03"),
  validatorHandler(deleteJudicialCollateralAuctionRoundSchema, "params"),
  deleteJudicialCollateralAuctionRoundController
);

export default router;