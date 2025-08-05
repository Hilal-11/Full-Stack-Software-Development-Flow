import express, { urlencoded } from 'express'
import dotenv from 'dotenv'
dotenv.config()
import cors from 'cors'
import connectDB from './utils/database.js'
import userRoutes from './routes/user.routes.js'
const app = express();
const PORT = process.env.PORT || 4000

// Middleware
app.use(cors({
    origin: 'http://localhost:3000',
    methods: ['GET' , 'POST' , 'DELETE' , 'PUT'],
    allowedHeaders: ['Content-Type' , 'Authorization'],
    credentials: true
}))
app.use(express.json()) // accept json data
app.use(urlencoded({ extended: true} )) // some parameters on url encoded

app.get("/" , (req , res) => {
    res.send("<h1>Hello Code 404</h1>")
});

//  routes
app.use('/api/v1/users' , userRoutes)

app.listen(PORT , () => {
    console.log(`App is running on PORT:${PORT}`)
})

connectDB()