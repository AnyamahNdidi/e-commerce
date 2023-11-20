import express, { Application } from "express"
const port:number = 9002

import "./database/db"
import {mainApp} from "./mainApp"

const app: Application = express()
mainApp(app)

app.set("view engine", "ejs")

const server = app.listen(port, () => {
    console.log(`Server listeningxcv on ports ${port}`)
})

process.on("uncaughtException", (error:Error) => {
     console.log("stop here: uncaughtException  ")
    console.log(error)
    process.exit(1)
})

process.on("unhandledRejection", (reason:any) => {
    
    
    console.log("stopn here: unhandledRejection")
    console.log(reason)

    server.close(() => {
        process.exit(1)
    })
})