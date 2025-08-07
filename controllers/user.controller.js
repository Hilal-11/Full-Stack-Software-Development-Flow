import { User } from '../model/UserSchame.model.js'
import crypto from 'crypto'
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
    console.log
 
    // save varification token in DB 
 
    // send token as email to 
 
    // send success status to Client/User

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