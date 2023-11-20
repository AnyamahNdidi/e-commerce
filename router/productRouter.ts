    import express from "express"
    const router = express.Router()
    import { verifyToken } from "../utils/verify"
    import upload from "../utils/multer"

    import {creatProduct } from "../controller/productController"


    router.route("/create-product/:catId").post(verifyToken, upload.fields([{ name: "images", maxCount: 5 }]), creatProduct)
    export default router;