"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
const categoryController_1 = require("../controller/categoryController");
router.route("/create-category/:userId").post(categoryController_1.createCat);
exports.default = router;
