"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
const multer_1 = __importDefault(require("../utils/multer"));
const profileController_1 = require("../controller/profileController");
router.route("/edit/pro/:proId").put(profileController_1.editProfile);
router.route("/edit/image/:proId").put(multer_1.default.single("image"), profileController_1.editImage);
exports.default = router;
