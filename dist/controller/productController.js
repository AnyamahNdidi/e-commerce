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
exports.creatProduct = void 0;
const authModel_1 = __importDefault(require("../model/authModel"));
const Category_1 = __importDefault(require("../model/Category"));
const cloudinary_1 = __importDefault(require("../utils/cloudinary"));
const productModle_1 = __importDefault(require("../model/productModle"));
const mongoose_1 = __importDefault(require("mongoose"));
const creatProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name, desc, qty, price, category } = req.body;
        console.log("jhgsduifhsudih", req.user._id);
        //   if (!name  || !desc || !qty || !price || !category)
        // {
        //     return res.status(401).json({
        //         success:0,
        //        message:"field cant be empty"
        //    }) 
        // }
        const { catId } = req.params;
        console.log(catId);
        const getCat = yield Category_1.default.findOne({ _id: catId });
        console.log(getCat);
        const getUser = yield authModel_1.default.findOne({ _id: req.user.id });
        console.log(getUser);
        // const {userId} = req.params
        // console.log(userId)
        const files = req.files;
        const imagePath = [];
        for (const image of files.images) {
            const imageUplaoded = yield cloudinary_1.default.uploader.upload(image.path);
            console.log("this is image", imageUplaoded);
            imagePath.push(imageUplaoded === null || imageUplaoded === void 0 ? void 0 : imageUplaoded.secure_url);
        }
        console.log("oh god", files.images);
        if (req.user.role === "admin") {
            const dataProduct = yield productModle_1.default.create({
                name,
                desc,
                qty,
                price,
                category,
                img: imagePath
            });
            getCat === null || getCat === void 0 ? void 0 : getCat.products.push(new mongoose_1.default.Types.ObjectId(dataProduct._id));
            getCat === null || getCat === void 0 ? void 0 : getCat.save();
            dataProduct.createdby = getUser;
            dataProduct.save();
            return res.status(201).json({
                success: 1,
                message: dataProduct
            });
        }
        else {
            return res.status(201).json({
                message: "only admin can post"
            });
        }
    }
    catch (error) {
        return res.status(400).json({
            message: 'failed to create product',
            error: error.message
        });
    }
});
exports.creatProduct = creatProduct;
