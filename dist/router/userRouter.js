"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
const userController_1 = require("../controller/userController");
router.route("/register/user").post(userController_1.registerUser);
router.route("/login").post(userController_1.LoginUser);
router.route("/log-out").post(userController_1.logOut);
router.route("/single-user/:id").get(userController_1.getSingleUser);
router.route("/account-verify/:id").get(userController_1.verifyUser);
exports.default = router;
