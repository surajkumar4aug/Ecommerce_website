import express from 'express';
import colors from 'colors';
import connectDB from './config/db.js';
import dotenv from 'dotenv';
import morgan from "morgan";
import path from "path"

import productRoutes from './routes/productRoutes.js';
import userRoutes from './routes/userRoutes.js';
import orderRoutes from './routes/orderRoutes.js';
import uploadRoutes from "./routes/uploadRoutes.js"
import { errorHandler, notFount } from './middlwware/errorMiddlwware.js';

const app = express();
connectDB();
dotenv.config();
app.use(express.json())
app.use(morgan('dev'))

app.use('/api/products', productRoutes);
app.use('/api/users', userRoutes)
app.use('/api/orders', orderRoutes)
app.use('/api/upload', uploadRoutes)
app.get('/api/config/paypal', (req, res)=> res.send(process.env.PAYPAL_CLIENT_ID))

const __dirname = path.resolve()
app.use('/uploads', express.static(path.join(__dirname, '/uploads')))

if(process.env.NODE_ENV === 'production'){
  app.use(express.static(path.join(__dirname, '/client/build')))
  app.get('*', (req, res)=>res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html')))
}else{
  app.get('/', (req, res) => {
    res.send('API is Running...');
  });
}

app.use(notFount);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

app.listen(
  PORT,
  console.log(
    `Server running... in ${process.env.NODE_ENV} mode on port ${PORT}`.yellow
      .bold
  )
);
