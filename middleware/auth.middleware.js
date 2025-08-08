import jwt from 'jsonwebtoken'

export const isLoggedIn = async (req , res , next) =>{
    try{
        console.log(req.cookies)
        // const token = req.cookies.token || '';
        const token = req.cookies?.token;
        console.log("Token = ",token ? "Yes" : "No")

        if(!token) {
            return res.status(401).json({
                success: false,
                message: "Authentication failed"
            })
        }

        // get data from token
            try {
                const decoded = jwt.verify(token , process.env.SECRET_KEY);
                console.log("Decoded token = ", decoded)
                req.user = decoded
        
                next();
            } catch (error) {
                console.log(error)
                return res.status(500).json({
                    success: false,
                    message: "internal server error"
                })
            }

        
    }catch(error) {
        return res.status(400).json({
            success: false,
            message: "failed to .....",
        })
    }
    next()
}