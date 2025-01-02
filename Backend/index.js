import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import userRoutes from './routes/userRoutes.js'
import cookieParser from 'cookie-parser'
import connectDB from './db/configDB.js'

const app = express()
dotenv.config()

app.use(express.json())
app.use(cors({
    origin:['http://localhost:5173'],
    credentials:true,
    allowedHeaders:['Origin','X-Requested-With','Content-Type','Authorization']
 
}))
app.use(cookieParser())

app.get('/',(req,res)=>{
    res.status(200).send({
        messsage:'welcome to Backend'
    })
})

app.use('/auth',userRoutes)

connectDB()


const PORT =process.env.PORT || 8080

app.listen(PORT,()=>{
    console.log(`server is sucessfully running on ${PORT}`)
})


// export default app