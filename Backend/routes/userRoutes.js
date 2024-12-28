import express from 'express'
const userRoutes = express.Router()
import userController from '../controllers/userController.js'

userRoutes.post('/register', userController.register)
userRoutes.post('/login',userController.login)
userRoutes.post('/logout',userController.logout)
userRoutes.post('/reset',userController.forgotPassword)



export default userRoutes