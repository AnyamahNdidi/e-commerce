import express, { Application } from "express"
import cors from "cors"
import userRouter from "./router/userRouter"
import profileRouter from "./router/profile"
import catRouter from "./router/categoryRouter"
import productRouter from "./router/productRouter"
import cartRouter from "./router/cartRouter"
import checkOutRouterv from "./router/orderRouter"
export const mainApp = (app:Application) => {
    
    app.use(cors()).use(express.json())
        .use("/api/v1", userRouter)
        .use("/api/v1", profileRouter)
        .use("/api/v1", catRouter)
        .use("/api/v1", productRouter)
        .use("/api/v1", cartRouter)
        .use("/api/v1", checkOutRouterv)
        .get("/page/data/:id", (req:any, res:any) => {
                  const id = req.params.id
            const userName = "kome"
            res.render("verifyaAccount", {userName, id})
        })


        // .get("/api/ejs/:id", (req:any, res:any) => {
            
        //     const id = req.params.id
        //     const userName = "peter"
        //     res.render("account", {userName, id})
        // })
        .get("/api/v1", (req:any, res:any) => {
        
            res.status(200).json({
                message:"api is ready"
            })
    })
}