import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import userRoutes from './routes/userRoutes.js'
import cookieParser from 'cookie-parser'

const app = express()
dotenv.config()

app.use(express.json())
app.use(cors())
app.use(cookieParser())

app.get('/',(req,res)=>{
    res.status(200).send({
        messsage:'welcome to Backend'
    })
})

app.use('/auth',userRoutes)




export default app