import express from 'express'
const userRoutes = express.Router()
import userController from '../controllers/userController.js'
import authMiddleware from '../middlewares/auth.middlewares.js'

userRoutes.post('/register', userController.register)
userRoutes.post('/login',userController.login)
userRoutes.get('/profile',authMiddleware.authUser,userController.getUserProfile)
userRoutes.post('/logout',userController.logout)
userRoutes.put('/reset',userController.forgotPassword)
userRoutes.put('/reset/:token',userController.resetPassword)



export default userRoutes