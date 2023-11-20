import mongoose from "mongoose"

const url: string = "mongodb://0.0.0.0:27017/ecommerce"
const onlineUrl :string = "mongodb+srv://user:7D0MxktPkXr7V8CK@cluster0.uerxkbs.mongodb.net/ecommerce"

mongoose.connect(onlineUrl).then(() => {
    console.log("database connected successfully")
}).catch((error:any) => {
    console.log("an error occurred", error)
})

export default mongoose