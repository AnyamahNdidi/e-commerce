import express, { Application, Request, Response, NextFunction, application } from "express"
import authModel from "../model/authModel"
import profileModle from "../model/profileModle"
import catemodel from "../model/Category"
import cloudinary from "../utils/cloudinary"
import productModel from "../model/productModle"
import mongoose, { AnyKeys } from "mongoose"

export const creatProduct = async (req:any, res:Response) =>{
    try{
        const { name, desc, qty, price, category } = req.body
        console.log("jhgsduifhsudih",req.user._id)
        //   if (!name  || !desc || !qty || !price || !category)
        // {
        //     return res.status(401).json({
        //         success:0,
        //        message:"field cant be empty"
        //    }) 
        // }

        const {catId} = req.params
        console.log(catId)
        const getCat = await catemodel.findOne({_id:catId})
         console.log(getCat)
        
        const getUser = await authModel.findOne({ _id: req.user.id })
         console.log(getUser)
        // const {userId} = req.params
        // console.log(userId)

         const files: any = req.files;

        const imagePath:any = []
        
        for (const image of files.images)
        {
            const imageUplaoded:any = await cloudinary.uploader.upload(image.path)
            console.log("this is image", imageUplaoded)
             imagePath.push(imageUplaoded?.secure_url);
        }

            console.log("oh god",files.images)
        if (req.user.role === "admin")
        {
        const dataProduct:any = await productModel.create({
            name,
            desc,
            qty,
            price,
            category,
            img:imagePath
        })

        getCat?.products.push(new mongoose.Types.ObjectId(dataProduct._id))
        getCat?.save()

        dataProduct.createdby = getUser
        dataProduct.save()
            
         return res.status(201).json({
                success:1,
               message:dataProduct
           }) 
        } else
        {
              return res.status(201).json({
               message:"only admin can post"
           }) 
        }
        
        
        

    }catch(error:any){
        return res.status(400).json({
            message: 'failed to create product',
            error: error.message
        }) 
    }
}