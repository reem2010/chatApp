import express, { json } from 'express'
import cors from 'cors'
import userRouter from './routes/auth.js'
import chatRouter from './routes/chatsRoute.js'
import messageRouter from './routes/messageRoute.js'
import router2 from './routes/protectedRoute.js'
import cookieParser from "cookie-parser";
const app = express()
app.use(cookieParser());
app.use(express.json());
const corsOptions = {
  origin: process.env.HOST, // Your frontend origin
  credentials: true , // Set to true if sending credentials
  // allowedHeaders: ['Content-Type', 'Authorization'], // Adjust allowed headers as needed
  methods: 'GET, POST, PUT, DELETE, OPTIONS', // Adjust allowed methods as needed
};

 app.use(cors(corsOptions));
 app.use('/auth', userRouter);
 app.use('/chats', chatRouter)
 app.use('/message', messageRouter)
 app.use('/protected', router2);
 const PORT = process.env.PORT || 3000;
 app.listen(PORT, () => {
 console.log(`Server is running on port ${PORT}`);
 });
