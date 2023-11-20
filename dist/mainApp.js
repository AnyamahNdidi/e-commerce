"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.mainApp = void 0;
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const userRouter_1 = __importDefault(require("./router/userRouter"));
const profile_1 = __importDefault(require("./router/profile"));
const categoryRouter_1 = __importDefault(require("./router/categoryRouter"));
const productRouter_1 = __importDefault(require("./router/productRouter"));
const cartRouter_1 = __importDefault(require("./router/cartRouter"));
const orderRouter_1 = __importDefault(require("./router/orderRouter"));
const mainApp = (app) => {
    app.use((0, cors_1.default)()).use(express_1.default.json())
        .use("/api/v1", userRouter_1.default)
        .use("/api/v1", profile_1.default)
        .use("/api/v1", categoryRouter_1.default)
        .use("/api/v1", productRouter_1.default)
        .use("/api/v1", cartRouter_1.default)
        .use("/api/v1", orderRouter_1.default)
        .get("/page/data/:id", (req, res) => {
        const id = req.params.id;
        const userName = "kome";
        res.render("verifyaAccount", { userName, id });
    })
        // .get("/api/ejs/:id", (req:any, res:any) => {
        //     const id = req.params.id
        //     const userName = "peter"
        //     res.render("account", {userName, id})
        // })
        .get("/api/v1", (req, res) => {
        res.status(200).json({
            message: "api is ready"
        });
    });
};
exports.mainApp = mainApp;
