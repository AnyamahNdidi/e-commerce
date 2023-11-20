import express from "express"
const router = express.Router()

import { addToCart, RemoveFromCart} from "../controller/cartController"


router.route("/create-cart/:userId/:productid").post(addToCart)
router.route("/remove-item/:userId").post(RemoveFromCart)





export default router;