"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
const cartController_1 = require("../controller/cartController");
router.route("/create-cart/:userId/:productid").post(cartController_1.addToCart);
router.route("/remove-item/:userId").post(cartController_1.RemoveFromCart);
exports.default = router;
