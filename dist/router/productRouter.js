"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
const verify_1 = require("../utils/verify");
const multer_1 = __importDefault(require("../utils/multer"));
const productController_1 = require("../controller/productController");
router.route("/create-product/:catId").post(verify_1.verifyToken, multer_1.default.fields([{ name: "images", maxCount: 5 }]), productController_1.creatProduct);
exports.default = router;
