"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const userSchema = new mongoose_1.default.Schema({
    userName: {
        type: String
    },
    email: {
        type: String
    },
    role: {
        type: String,
        enum: ["user", "admin", "superadmin"],
        default: "user",
    },
    verify: {
        type: Boolean,
        default: false,
    },
    password: {
        type: String
    },
    profile: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: "profiles"
    }
}, { timestamps: true });
exports.default = mongoose_1.default.model("users", userSchema);
