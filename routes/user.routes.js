import express from 'express'
const router = express.Router();

import { login, registerUser, varifyUser , userProfile, logout } from '../controllers/user.controller.js'
import { isLoggedIn } from '../middleware/auth.middleware.js';

router.post('/register' , registerUser)
router.get('/varify/:token' , varifyUser)
router.post('/login' , login)

router.get('/profile' , isLoggedIn , userProfile)
router.get('/logout' , isLoggedIn , logout)



export default router