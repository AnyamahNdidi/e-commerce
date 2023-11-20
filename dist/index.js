"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const port = 9002;
require("./database/db");
const mainApp_1 = require("./mainApp");
const app = (0, express_1.default)();
(0, mainApp_1.mainApp)(app);
app.set("view engine", "ejs");
const server = app.listen(port, () => {
    console.log(`Server listeningxcv on ports ${port}`);
});
process.on("uncaughtException", (error) => {
    console.log("stop here: uncaughtException  ");
    console.log(error);
    process.exit(1);
});
process.on("unhandledRejection", (reason) => {
    console.log("stopn here: unhandledRejection");
    console.log(reason);
    server.close(() => {
        process.exit(1);
    });
});
