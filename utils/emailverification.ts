import nodemailer from "nodemailer"
import { google } from "googleapis"
import path from "path";
import ejs from "ejs";






const GOOGLE_SECRET = "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";

const GOOGLE_ID ="616704091189-guj6coivkhcvg8n2ur9u88c4l63unrjf.apps.googleusercontent.com";

    
const GOOGLE_REDIRECT = "https://developers.google.com/oauthplayground";
    
const GOOGLE_REFRESHtOKEN = "1//04gtMycCCer9nCgYIARAAGAQSNwF-L9IrYueN5yTM5jp4Em_wiMHEbIS3qIr1mUF7qENeIg3CSRd8Kkm1EbHtnheVr9WlO-5fLK8"

const oAuth = new google.auth.OAuth2(GOOGLE_ID, GOOGLE_SECRET, GOOGLE_REDIRECT);
oAuth.setCredentials({ refresh_token: GOOGLE_REFRESHtOKEN });

const url:string ="http://localhost:9002"


export const verifyUserEmail = async (name:any, email:any, id:any) => {
    try
    {
        const accessToken = await oAuth.getAccessToken()
        const transporter = nodemailer.createTransport({
                service:"gmail",
            port: 587,
            auth: {
                // TODO: replace `user` and `pass` values from <https://forwardemail.net>
                   type: "OAuth2",
				user: "ndidiedwin89@gmail.com",
				refreshToken: GOOGLE_REFRESHtOKEN,
				clientId: GOOGLE_ID,
				clientSecret: GOOGLE_SECRET,
				accessToken: accessToken,
            },
        })
        const buildFile = path.join(__dirname, "../views/verifyaAccount.ejs")
        const data = await ejs.renderFile(buildFile,{name, url, id})
         let mailOption = {
            from: '"Edwin store 👻💋🎶🔽" <noreply@unitsore.com>', // sender address
            to: email, // list of receivers
            subject: "EDWIN STORE", // Subject line
            html: data, // html body
        }

        transporter.sendMail(mailOption).then(() => {
      console.log("sent");
    });


        
        
    } catch(error) {
        
       console.log("fghasvhjk")
       console.log(error);
    }
}

// export const verifyCompany = async (value:any) => {
//     try
//     {
//          const accessToken: any = await oAuth.getAccessToken()
        
//         const transport = nodemailer.createTransport({
//             service: "gmail",
//             auth: {
//                 type: "OAuth2",
// 				user: "ndidiedwin89@gmail.com",
// 				refreshToken: GOOGLE_REFRESHtOKEN,
// 				clientId: GOOGLE_ID,
// 				clientSecret: GOOGLE_SECRET,
// 				accessToken: accessToken,
//             }
//         })
//         const buildFile = path.join(__dirname, "../views/account.ejs")
//         const data = await ejs.renderFile(buildFile)
//             const mailOption = {
//             from: "verify your Account ",
//             to: value.email,
//             subject: "Account Verification",
//             html: data,
//         }

       

//         transport.sendMail(mailOption).then(() => {
//       console.log("sent");
//     });

//     } catch (error)
//     {
//         console.log("fghasvhjk")
//         console.log(error);
//     }
// }