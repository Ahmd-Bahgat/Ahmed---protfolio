import express from 'express'
import dotenv from 'dotenv'
import connectDB from './config/db'
import contactRouter from "./routes/contactRouter"
import cors from 'cors'
import { errorHandler } from './middlewares/errorMiddlerwar'
dotenv.config()
const app = express()

const PORT = Number(process.env.PORT) || 3000

app.use(express.json())
app.use(cors())

connectDB()
app.use('/api/contact', contactRouter)
app.use(errorHandler)

app.listen(PORT, '0.0.0.0' ,()=>console.log(`server running on port ${PORT}`))