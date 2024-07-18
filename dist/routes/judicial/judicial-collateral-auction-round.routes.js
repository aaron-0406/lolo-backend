"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const validator_handler_1 = __importDefault(require("../../middlewares/validator.handler"));
const judicial_collateral_auction_round_schema_1 = __importDefault(require("../../app/judicial/schemas/judicial-collateral-auction-round.schema"));
const judicial_collateral_auction_round_controller_1 = require("../../controllers/judicial/judicial-collateral-auction-round.controller");
const auth_handler_1 = require("../../middlewares/auth.handler");
const { createJudicialCollateralAuctionRoundSchema, updateJudicialCollateralAuctionRoundSchema, deleteJudicialCollateralAuctionRoundSchema, getJudicialCollateralAuctionRoundByIdSchema } = judicial_collateral_auction_round_schema_1.default;
const router = express_1.default.Router();
router.get("/:chb/:collateralId", auth_handler_1.JWTAuth, judicial_collateral_auction_round_controller_1.getAllJudicialCollateralAuctionRoundController);
router.get("/:chb/:collateralId/:id", auth_handler_1.JWTAuth, (0, validator_handler_1.default)(getJudicialCollateralAuctionRoundByIdSchema, "params"), judicial_collateral_auction_round_controller_1.getJudicialCollateralAuctionRoundById);
router.post("/", auth_handler_1.JWTAuth, (0, auth_handler_1.checkPermissions)("P13-01-06-01-04-01"), (0, validator_handler_1.default)(createJudicialCollateralAuctionRoundSchema, "body"), judicial_collateral_auction_round_controller_1.createJudicialCollateralAuctionRoundController);
router.patch("/:chb/:collateralId/:id", auth_handler_1.JWTAuth, (0, auth_handler_1.checkPermissions)("P13-01-06-01-04-02"), (0, validator_handler_1.default)(getJudicialCollateralAuctionRoundByIdSchema, "params"), (0, validator_handler_1.default)(updateJudicialCollateralAuctionRoundSchema, "body"), judicial_collateral_auction_round_controller_1.updateJudicialCollateralAuctionRoundController);
router.delete("/:chb/:collateralId/:id", auth_handler_1.JWTAuth, (0, auth_handler_1.checkPermissions)("P13-01-06-01-04-03"), (0, validator_handler_1.default)(deleteJudicialCollateralAuctionRoundSchema, "params"), judicial_collateral_auction_round_controller_1.deleteJudicialCollateralAuctionRoundController);
exports.default = router;
