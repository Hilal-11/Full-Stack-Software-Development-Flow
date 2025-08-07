import { User } from '../model/UserSchame.model.js'
import crypto from 'crypto'
import nodemailer from 'nodemailer'
import dotenv from 'dotenv'
dotenv.config()
const registerUser = async (req , res) => {
    // Get user data
    const { name , email , password} = req.body;
    console.log(req.body)
    // validate
    if(!name || !email || !password) {
        return res.status(400).json({
            success: false,
            message: "Invalid data"
        })
    }

    // console.log(name, email, password);
    // existes or not 
   try{
    const userExists = await User.findOne({ email })
    if(userExists) {
        return res.status(401).json({
            success: false,
            message: "User already exixts"
        })
    }
    // create user in db
    const user = await User.create({
        name,
        email,
        password,
    })

    if(!user) {
        return res.status(400).json({
            success: false,
            message: "User not register"
        })
    }
    
    // create a varification token 


    const token = crypto.randomBytes(32).toString("hex");
    user.varificationToken = token;
    // save varification token in DB 
    await user.save();
 
 
    // send token as email to 
    // SEND MAIL
    const transport = nodemailer.createTransport({
        host: process.env.MAILTRAP_HOST,
        port:  process.env.MAILTRAP_PORT,
        secure: false,
        auth: {
            user:  process.env.MAILTRAP_USERNAME,
            pass:  process.env.MAILTRAP_PASSWORD
        }
    });
    const mailOptions = {
        from: process.env.MAILTRAP_SENDEREMAIL,
        to: user.email,
        subject: "Confermation email",
        text: "Hi there and welcome to localhost", // plain‑text body
        html: "<p></p>Don't forget The <b>localhost</b></p>", // HTML body
    }
    const info = await transport.sendMail(mailOptions)
    console.log(info)
 
    // send success status to Client/User
    res.status(201).json({
        success: true,
        message: "User register successfully"
    })

   }catch(error) {
        console.log(error.message)
        return res.status(501).json({
            success: false,
            message: "Failed to register the user, some internal issues on server",
            error: error.message,
        })
   }
    


};

export { registerUser };