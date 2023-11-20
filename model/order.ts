import mongoose from "mongoose";

interface cart {
    user: string,
    cartItems: {}[],
    bill:number

}

interface iCart extends cart, mongoose.Document {}


const cartSchema = new mongoose.Schema({
    user: {
         type: mongoose.Schema.Types.ObjectId,
         ref:"users"
    },
  
    orderitems: [{
        product: { type: mongoose.Schema.Types.ObjectId, ref: 'products', required: true },
        quantity: { type: Number, default: 1, min:1 },
        price:Number
    }],
    bill:{
          type: Number,
          required: true, 
          default: 0
    }
},
    {timestamps:true}
)

export default mongoose.model<iCart>("orders", cartSchema)