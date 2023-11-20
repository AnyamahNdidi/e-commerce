import express, { Application, Request, Response, NextFunction, application } from "express"
import authModel from "../model/authModel"
import profileModle from "../model/profileModle"
import cloudinary from "../utils/cloudinary"


export const editProfile = async (req: Request, res: Response) => {
    try
    {
        const { firstName, lastName, gender } = req.body
        
        const { proId } = req.params
        const getUpdate = await profileModle.findByIdAndUpdate(proId,
            {
                firstName,
                lastName,
                gender
            },
            {
                new:true
            }
        )
        return res.status(201).json({
            message: "updated sucessfully",
            data:getUpdate
        })
        
    } catch (error:any)
    {
        return res.status(400).json({
            message: 'failed to update profile',
            error: error.message
        })
    }
}

export const editImage = async (req:any, res: Response) => {
    try
    {
        const { proId } = req.params
        
        console.log(req.file)
        const imageurl = await cloudinary.uploader.upload(req.file.path)
        console.log("kaugdiu",imageurl )
        const updateImage = await profileModle.findByIdAndUpdate(
        proId,
            {
               avatar:imageurl.secure_url
            },
            {new:true}
        )

         return res.status(201).json({
            message: "image sucessfully update",
            data:updateImage
        })

        
    } catch (error:any)
    {
        return res.status(400).json({
            message: error.message,
            error: error.message
        })
    }
}