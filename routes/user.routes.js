import express from 'express'
const router = express.Router();

import { login, registerUser, varifyUser } from '../controllers/user.controller.js'

router.post('/register' , registerUser)
router.get('/varify/:token' , varifyUser)
router.post('/login' , login)



export default router