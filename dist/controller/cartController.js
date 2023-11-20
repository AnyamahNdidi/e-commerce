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
exports.RemoveFromCart = exports.addToCart = void 0;
const authModel_1 = __importDefault(require("../model/authModel"));
const cartModel_1 = __importDefault(require("../model/cartModel"));
const productModle_1 = __importDefault(require("../model/productModle"));
const addToCart = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { productid } = req.params;
        const { userId } = req.params;
        const getUser = yield authModel_1.default.findOne({ _id: userId });
        // console.log(getUser)
        const getProduct = yield productModle_1.default.findOne({ _id: productid });
        // console.log(getProduct)
        const checkUserCart = yield cartModel_1.default.findOne({ user: userId });
        // console.log(checkUserCart)
        if (checkUserCart) {
            const findIndexProduct = checkUserCart.cartItems.findIndex((item) => { var _a; return (_a = item === null || item === void 0 ? void 0 : item.product) === null || _a === void 0 ? void 0 : _a.equals(productid); });
            console.log("uisdui", findIndexProduct);
            if (findIndexProduct > -1) {
                const userSelectPr = checkUserCart.cartItems[findIndexProduct];
                console.log(userSelectPr);
                userSelectPr.quantity += 1;
                checkUserCart.bill = checkUserCart.cartItems.reduce((acc, cur) => {
                    console.log(cur);
                    return acc + cur.quantity * cur.price;
                }, 0);
                checkUserCart.cartItems[findIndexProduct] = userSelectPr;
                yield checkUserCart.save();
                return res.status(201).json({
                    message: "you have order before",
                    result: checkUserCart
                });
            }
            else {
                checkUserCart.cartItems.push({ product: getProduct === null || getProduct === void 0 ? void 0 : getProduct._id, quantity: 1, price: getProduct === null || getProduct === void 0 ? void 0 : getProduct.price });
                checkUserCart.bill = checkUserCart.cartItems.reduce((acc, cur) => {
                    console.log(cur);
                    return acc + cur.quantity * cur.price;
                }, 0);
                yield checkUserCart.save();
                return res.status(201).json({
                    message: "new product added",
                    result: checkUserCart
                });
            }
        }
        else {
            const dataCart = yield cartModel_1.default.create({
                user: getUser === null || getUser === void 0 ? void 0 : getUser._id,
                cartItems: [{ product: getProduct === null || getProduct === void 0 ? void 0 : getProduct._id, quantity: 1, price: getProduct === null || getProduct === void 0 ? void 0 : getProduct.price }],
                bill: 1 * (getProduct === null || getProduct === void 0 ? void 0 : getProduct.price)
            });
            return res.status(201).json({
                message: "succesfuuly add to cart",
                result: dataCart
            });
        }
    }
    catch (error) {
        return res.status(400).json({
            message: error.message,
            error: error.message
        });
    }
});
exports.addToCart = addToCart;
const RemoveFromCart = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const { userId } = req.params;
        let productId = req.query.productId;
        console.log(productId);
        const checkUserCart = yield cartModel_1.default.findOne({ user: userId });
        console.log(checkUserCart);
        const position = yield ((_a = checkUserCart === null || checkUserCart === void 0 ? void 0 : checkUserCart.cartItems) === null || _a === void 0 ? void 0 : _a.findIndex((item) => (item === null || item === void 0 ? void 0 : item.product) == productId));
        console.log("jhdgui", position);
        if (position > -1) {
            const item = checkUserCart.cartItems[position];
            console.log(item);
            if (item.quantity > 1) {
                item.quantity -= 1;
                checkUserCart.bill -= item.price;
            }
            else {
                checkUserCart.bill -= item.quantity * item.price;
                if (checkUserCart.bill < 0) {
                    checkUserCart.bill = 0;
                }
                checkUserCart.cartItems.splice(position, 1);
            }
            checkUserCart.bill = checkUserCart.cartItems.reduce((acc, cur) => {
                console.log(cur);
                return acc + cur.quantity * cur.price;
            }, 0);
            yield checkUserCart.save();
            return res.status(201).json({
                message: "item has been reomve",
                //      result:dataCart
            });
        }
        else {
            return res.status(401).json({
                message: "you don't have any items",
                //      result:dataCart
            });
        }
    }
    catch (error) {
        return res.status(400).json({
            message: error.message,
            error: error.message
        });
    }
});
exports.RemoveFromCart = RemoveFromCart;
// export const removeFromCart = async (req:Request, res:Response) => {
//     try
//     {
//         const { userId } = req.params
//         const productId = req.query.productId
//         const a = "world"
//         console.log(`hello ${a}`)
//         let cart:any = await cartModel.findOne({ user: userId })  
//         console.log(cart)
//         const position = cart?.cartItems.findIndex((item) => item.product == productId)
//         console.log(position)
//         if ( position > -1)
//         {
//             let item = cart?.cartItems[position]
//             if (item.quantity > 1)
//             {
//                   item.quantity -= 1;
//                 cart.bill -= item.price;
//             } else
//             {
//                  cart.bill -= item.quantity * item.price
//             if (cart.bill < 0)
//             {
//                 cart.bill = 0
//             }
//             cart?.cartItems.splice(position, 1)
//             }
//             cart.bill = cart.cartItems.reduce((acc, cur) => {
//                 console.log(cur)
//                 return acc + cur.quantity * cur.price
//             }, 0)
//             cart = await cart.save()
//                return res.status(201).json({
//                  message:"succesfuuly remove from cart",
//                 //  result:dataCart
//              })
//         } else
//         {
//              res.status(404).send("item not found");
//         }   
//     } catch (error)
//     {
//           return res.status(400).json({
//             message: error.message,
//             error: error.message
//         })
//    }
// }
//  const userId = req.params.userId
//     const getUser  = await  authModel.findOne({_id:userId})
//     const {productName, quantity }  = req.body
//     const findProduct:any  = await productModel.findOne({name:productName })
//     const productId = findProduct._id;
//     const  price:any = findProduct?.price;
//     console.log(findProduct)
//     if (!findProduct) {
//        return res.status(404).send({ message: "product not found" });
//     }
//     const cart:any = await cartModel.findOne({user: userId})
//     console.log("get user cart",cart)
//     if(cart) {
//         const findIndexPro = cart.cartItems.findIndex((item)=> item?.product.equals(productId))
//         if(findIndexPro > -1){
//             const myPro = cart.cartItems[findIndexPro]
//             myPro.quantity += quantity || 1 
//             console.log("hksdg",myPro)
//             cart.bill = cart.cartItems.reduce((acc, curr)=>{
//                   console.log("chock", acc, curr)
//                   return acc + curr.quantity * curr.price
//             },0)
//             cart.cartItems[findIndexPro] = myPro
//             await cart.save()
//              return res.status(201).json({
//                  message:"succesfuuly add to cart",
//                  result:cart
//              })
//         }else{
//             cart.cartItems.push({ product: productId, quantity, price })
//               cart.bill = cart.cartItems.reduce((acc, curr)=>{
//                   console.log("chock", acc, curr)
//                   return acc + curr.quantity * curr.price
//               }, 0)
//             await cart.save()
//              return res.status(201).json({
//                  message:"succesfuuly add to cart",
//                  result:cart
//              })
//         }
//     }else{
//           const dataCrate = await cartModel.create({
//         user:userId,
//         cartItems:[{product:productId, quantity, price }],
//         bill: quantity  * price || 1 * price
//     })
//       return res.status(201).json({
//            message:"succesfuuly add to cart",
//         result:dataCrate
//         })
//     }
