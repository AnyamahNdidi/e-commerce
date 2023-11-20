"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createCat = void 0;
const authModel_1 = __importDefault(require("../model/authModel"));
const Category_1 = __importDefault(require("../model/Category"));
const slugify_1 = __importDefault(require("slugify"));
function generateStudentId() {
    const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    const length = 6;
    let randomId = "";
    for (let i = 0; i < length; i++) {
        randomId += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return randomId;
}
const createCat = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name, parent } = req.body;
        //  console.log("jhgsduifhsudih",req.user)
        if (!name) {
            return res.status(401).json({
                success: 0,
                message: "name cant be empty"
            });
        }
        const { userId } = req.params;
        console.log(userId);
        const getUser = yield authModel_1.default.findOne({ _id: userId });
        console.log(getUser);
        const dataCat = yield Category_1.default.create({
            name,
            parent,
            slug: `${(0, slugify_1.default)(name)}-${generateStudentId()}`
        });
        dataCat.user = getUser;
        dataCat.save();
        return res.status(201).json({
            message: dataCat
        });
    }
    catch (error) {
        return res.status(400).json({
            message: error.message,
            error: error.message
        });
    }
});
exports.createCat = createCat;
