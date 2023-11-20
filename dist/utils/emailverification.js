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
exports.verifyUserEmail = void 0;
const nodemailer_1 = __importDefault(require("nodemailer"));
const googleapis_1 = require("googleapis");
const path_1 = __importDefault(require("path"));
const ejs_1 = __importDefault(require("ejs"));
const GOOGLE_SECRET = "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";
const GOOGLE_ID = "616704091189-guj6coivkhcvg8n2ur9u88c4l63unrjf.apps.googleusercontent.com";
const GOOGLE_REDIRECT = "https://developers.google.com/oauthplayground";
const GOOGLE_REFRESHtOKEN = "1//04gtMycCCer9nCgYIARAAGAQSNwF-L9IrYueN5yTM5jp4Em_wiMHEbIS3qIr1mUF7qENeIg3CSRd8Kkm1EbHtnheVr9WlO-5fLK8";
const oAuth = new googleapis_1.google.auth.OAuth2(GOOGLE_ID, GOOGLE_SECRET, GOOGLE_REDIRECT);
oAuth.setCredentials({ refresh_token: GOOGLE_REFRESHtOKEN });
const url = "http://localhost:9002";
const verifyUserEmail = (name, email, id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const accessToken = yield oAuth.getAccessToken();
        const transporter = nodemailer_1.default.createTransport({
            service: "gmail",
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
        });
        const buildFile = path_1.default.join(__dirname, "../views/verifyaAccount.ejs");
        const data = yield ejs_1.default.renderFile(buildFile, { name, url, id });
        let mailOption = {
            from: '"Edwin store 👻💋🎶🔽" <noreply@unitsore.com>',
            to: email,
            subject: "EDWIN STORE",
            html: data, // html body
        };
        transporter.sendMail(mailOption).then(() => {
            console.log("sent");
        });
    }
    catch (error) {
        console.log("fghasvhjk");
        console.log(error);
    }
});
exports.verifyUserEmail = verifyUserEmail;
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
