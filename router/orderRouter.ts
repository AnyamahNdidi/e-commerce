import express from "express"
const router = express.Router()

import { checkOut} from "../controller/orders"


router.route("/order-checkout/:userId").post(checkOut)



export default router;