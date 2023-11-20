"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const url = "mongodb://0.0.0.0:27017/ecommerce";
const onlineUrl = "mongodb+srv://user:7D0MxktPkXr7V8CK@cluster0.uerxkbs.mongodb.net/ecommerce";
mongoose_1.default.connect(onlineUrl).then(() => {
    console.log("database connected successfully");
}).catch((error) => {
    console.log("an error occurred", error);
});
exports.default = mongoose_1.default;
