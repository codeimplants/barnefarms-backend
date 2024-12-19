import express from 'express'
import dotenv from 'dotenv'
import connectDB from './config/db.js';
import productRoutes from './routes/productRoutes.js';
import { errorHandler, notFound } from './middleware/errorMiddleware.js';
import userRoutes from './routes/userRoutes.js';
import orderRoutes from './routes/orderRoutes.js';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import otpRoutes from './routes/otpRoutes.js';
import { nanoid } from 'nanoid';
const port = process.env.PORT||5000;
dotenv.config();
connectDB();

const app= express();

app.use(cors({
    credentials: true,}
));
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({extended:true}))
app.use('/api/products',productRoutes);
app.use('/api/users',userRoutes);
app.use('/api/orders',orderRoutes)
app.get('/api/config/razorpay',(res,req)=>res.send({clientId:process.env.RAZOR_PAY_KEY_ID}));
app.use('/api/otp',otpRoutes);
app.get('/',(req,res)=>{

   const sessionId =nanoid();
   const sessionExpiryTime = Date.now()  + 30 * 60 * 1000;
   res.json({
    sessionId:sessionId,
    sessionExpiryTime:sessionExpiryTime,
   });
});

app.use(notFound);
app.use(errorHandler)
app.listen(port,()=>console.log(`Server running on port${port}`))