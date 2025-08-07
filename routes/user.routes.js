import express from 'express'
const router = express.Router();

import { registerUser, varifyUser } from '../controllers/user.controller.js'

router.post('/register' , registerUser)
router.get('/varify/:token' , varifyUser)


export default router