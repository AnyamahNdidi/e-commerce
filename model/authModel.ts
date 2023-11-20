import mongoose from "mongoose";

interface user {
    userName: string,
    email: string,
    password: string
    profile: {},
    verify:boolean,
    role:string,
}
interface iUser extends user, mongoose.Document{ }

const userSchema = new mongoose.Schema({
    userName: {
        type:String
    },
    email: {
        type:String
    },
    role: {
        type: String,
        enum: ["user", "admin", "superadmin"],
        default:"user",
    },
    verify: {
        type: Boolean,
        default:false,
        
    },
    password: {
        type:String
    },
    profile: {
        type: mongoose.Schema.Types.ObjectId,
        ref:"profiles"
    }
},
    {timestamps:true}
)

export default mongoose.model<iUser>("users", userSchema)
