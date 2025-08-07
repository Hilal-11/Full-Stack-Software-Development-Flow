import { User } from '../model/UserSchame.model.js'
import crypto from 'crypto'
import nodemailer from 'nodemailer'
import dotenv from 'dotenv'
import bcrypt from 'bcryptjs'
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
    // encrypt the password
    const salt_round = await bcrypt.genSalt(10);
    const hash_password = await bcrypt.hash(password , salt_round)


    const user = await User.create({
        name,
        email,
        password: hash_password,
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
        text: `Please click on the following link
            <a href={process.env.BASE_URL}/api/v1/users/varify/${token}>$</a>
        `, // plain‑text body
        html: "<p></p>Don't forget<b> The localhost</b></p>", // HTML body
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


const varifyUser = async (req , res) => {
    // get token from url
    // validate isToken oe not
    // find user based on token
    // compare token is valid or not 
    // if valid ----> set isVarifird to [true]
    // remove varification token now 
    // save 
    // send success response 
    try{
        const { token } = req.params;
        if(!token) {
            return res.status(400).json({
                success: false,
                message: "token is missing"
            })
        }

        const user = await User.findOne({ varificationToken: token });
        if(!user) {
             return res.status(400).json({
                success: false,
                message: "Invalid token"
            })
        }

        user.isVarified = true
        user.varificationToken = undefined

        await user.save();

        res.status(200).json({
            success: true,
            message: "user varification successful"
        })

    }catch(error) {
        console.log(error.message);
        res.status().json({
            success: false,
            message: "Failed to varify the user",
            error: error.message
        })
    }
}
export { registerUser , varifyUser };