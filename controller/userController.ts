import express, { Application, Request, Response, NextFunction, application } from "express"
import authModel from "../model/authModel"
import profileModle from "../model/profileModle"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import nodemailer from "nodemailer"
import {verifyUserEmail} from "../utils/emailverification"



const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
     service:"gmail",
  port: 587,
  secure: true,
  auth: {
    // TODO: replace `user` and `pass` values from <https://forwardemail.net>
    user: "Ndidiedwin89@gmail.com",
    pass: "vyxy dmjm wlcn jkhw",
  },
})




export const  registerUser = async (req:Request, res:Response) => {
    try
    {
        const { userName, email, password, role } = req.body
         if (!userName || !email || !password )
        {
            return res.status(401).json({
                success:0,
               message:"all field is require"
           }) 
        }

        const checkEmail = await authModel.findOne({ email : email})
        console.log(checkEmail)
        if (checkEmail)
        {
             return res.status(401).json({
                success:0,
               message:"email already exist"
           }) 
        }
        const salt = await bcrypt.genSalt(10)
        const hashed = await bcrypt.hash(password, salt)

        const creteData = await authModel.create({
            userName,
            email,
            password: hashed,
            role
        })

        const createProfile:any = await profileModle.create({
            _id:creteData._id,
            firstName: "",
            lastName: "",
            gender: "",
            avatar:""
            
        })
        creteData.profile = createProfile._id
        creteData.save()

        createProfile.user = creteData._id
        createProfile.save()


        verifyUserEmail(userName, email, creteData._id).then((result:any) => {
					console.log("message been sent to you: ");
				})
            .catch((error: any) => console.log(error));

        // let mailOption = {
        //     from: '"Edwin store 👻💋🎶🔽" <noreply@unitsore.com>', // sender address
        //     to: email, // list of receivers
        //     subject: "EDWIN STORE", // Subject line
        //     html: `<b>PLEASE CLICK THE LINK <a href="http://localhost:9002/api/v1/account-verify/${creteData._id}"\>link</a> to verify account</b`, // html body
        // }

        // await transporter.sendMail(mailOption, (error, info) => {
        //     if (error)
        //     {
        //          console.log("error sendinf mail", error)
        //     } else
        //     {
        //         console.log("email send", info.response)
        //     }
        // })






        // await transporter.sendMail(mailoption, (error, info)=>{
        //     if (error)3
        //     {
        //         console.log("error sendinf mail", error)
        //     } else
        //     {
        //         console.log("email send", info.response)
        //     }
        // })
        

        return res.status(201).json({
            message: "registeration sucessfully check email to verify account",
            // data:creteData
        })
        
    } catch (error:any)
    {
           return res.status(400).json({
            message: 'failed to register user',
            error: error.message
        })
    }
}


export const LoginUser = async(req:Request, res:Response) => {
    try
    {
        const { email, password } = req.body
        const user: any = await authModel.findOne({ email: email })
        console.log(user)

        if (user)
        {
            const checkPassword = await bcrypt.compare(password, user.password)
            if (checkPassword)
            {
                if (user.verify)
                {
                     const {password, ...info } = user._doc
                
                let options: any = {
                    expiresIn: "1d"
                }
                const token = jwt.sign({ id: user._id, email: user.email, userName: user.userName, role:user.role }, "konderlnskbdfvjkdbfvjkdn", { expiresIn: "3d", })
                res.cookie("sessionId", token, options)
                console.log("bhvjhsd",req.headers['cookie'])
                 return res.status(200).json({
                        message: "login success",
                        data: info,
                        token:token
,
                        // token: token
                    })
                    
                } else
                {
            let mailOption = {
            from: '"Edwin store 👻💋🎶🔽" <noreply@unitsore.com>', // sender address
            to: email, // list of receivers
            subject: "EDWIN STORE", // Subject line
            html: "<b>PLEASE CLICK THE LINK <a href=`http://localhost:9002/api/v1/account-verify/${user._id}`>link</a> to verify account</b>", // html body
        }

        await transporter.sendMail(mailOption, (error:any, info:any) => {
            if (error)
            {
                 console.log("error sendinf mail", error)
            } else
            {
                console.log("email send", info.response)
            }
        })
                    
                    return res.status(200).json({
                        message: "please check your email to verify account",
                       
                    })
                }
               
            } else
            {
                  return res.status(404).json({
            message: "wrong password",
            
            })
                
            }
        } else
        {
              return res.status(404).json({
            message: "account not found",
            
        })
        }
    } catch (error:any)
    {
          return res.status(404).json({
            message: error.message,
            
        })
    }
}


export const verifyUser = async(req:Request, res:Response) => {

    try
    {
        const user = await authModel.findById(req.params.id)
        console.log(user)

        const verifyData = await authModel.findByIdAndUpdate(
            req.params.id,
            {
              verify:true  
            },
            {new:true}
        )

        return res.status(201).json({
            message:"account has been verify procees to login"
        })
        
        
    } catch (error:any){
        return res.status(404).json({
            message: error.message,
            
        })
     }
    
    
}

export const logOut = async(req:Request, res:Response) => {

    try
    {
        res.clearCookie("sessionId")
        res.setHeader('Clear-Site-Data', '"cookies", "storage"');
        return res.status(200).json({
            mesaage:"Signout successfully"
        })
        
    } catch (error:any){
        return res.status(404).json({
            message: error.message,
            
        })
     }
    
    
}

export const getSingleUser = async (req: Request, res: Response) => {
    
    const getSing = await authModel.findById(req.params.id)
    try
    {
        const getSing = await authModel.findById(req.params.id).populate(
            {
                path: "profile",
                select:"firstName lastName gender avatar"
            }
        )
          return res.status(201).json({
            message: " sucessfully",
            data:getSing
        })
        
        }catch (error:any)
    {
           return res.status(400).json({
            message: 'failed to register user',
            error: error.message
        })
    }
}