import mongoose from 'mongoose'
import dotenv from 'dotenv'
dotenv.config()

// export const connectDB = async () => {
//     try{
//         await mongoose.connect(process.env.DATABASE_URL)
//         console.log("connection successful with database")
//     }catch(error) {
//         console.log("Failed to connect with dtabase")
//         console.log(error.message)
//         process.exit(1)
//     }
// }

// export a function that connects to database
const connectDB = () => {
    mongoose.connect(process.env.DATABASE_URL)
    .then(() => {
        console.log("database connection successful")
    })
    .catch((error) => {
        console.log(error.message)
        console.log("failed to connect with database")
        process.exit(1)
    })
}

export default connectDB