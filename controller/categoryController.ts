import express, { Application, Request, Response, NextFunction, application } from "express"
import authModel from "../model/authModel"
import profileModle from "../model/profileModle"
import catemodel from "../model/Category"
import cloudinary from "../utils/cloudinary"
import slugify from "slugify"


function generateStudentId() {
	const characters =
		"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
	const length = 6;
	let randomId = "";
	for (let i = 0; i < length; i++) {
		randomId += characters.charAt(
			Math.floor(Math.random() * characters.length),
		);
	}
	return randomId;
}


export const createCat = async(req:Request, res:Response) =>{
    try{
        const { name, parent } = req.body
        //  console.log("jhgsduifhsudih",req.user)
         if (!name )
        {
            return res.status(401).json({
                success:0,
               message:"name cant be empty"
           }) 
        }
        const {userId} = req.params
        console.log(userId)
        const getUser = await authModel.findOne({_id:userId})
        console.log(getUser)

        const dataCat:any = await catemodel.create({
            name,
            parent,
            slug:`${slugify(name)}-${generateStudentId()}`
        })

        dataCat.user = getUser
        dataCat.save()
        
        return res.status(201).json({
            message:dataCat
        })

    }catch(error:any){
            return res.status(400).json({
            message: error.message,
            error: error.message
        })
    }
}