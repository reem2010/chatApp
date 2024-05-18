import express, { json } from 'express'
import cors from 'cors'
import userRouter from './routes/auth.js'
import chatRouter from './routes/chatsRoute.js'
import messageRouter from './routes/messageRoute.js'
import router2 from './routes/protectedRoute.js'
import cookieParser from "cookie-parser";
import socket from 'socket.io';

const app = express()
app.use(cookieParser());
app.use(express.json());
// const corsOptions = { 
//   origin: '*', 
//   optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204 
// };
 app.use(cors());
 app.use('/auth', userRouter);
 app.use('/chats', chatRouter)
 app.use('/message', messageRouter)
 app.use('/protected', router2);
 const PORT = process.env.PORT || 3000;
 app.listen(PORT, () => {
 console.log(`Server is running on port ${PORT}`);
 });

 const io = socket(server, {
     cors: {
         origin: "http://localhost:3000",
         credentials: true,
     },

 });
 global.onlineUsers = new Map();

 io.on("connection", (socket) => {
     global.chatsocket = socket;
     socket.on("add-user", (userId)=> {
         onlineUsers.set(userId, socket.id);
     });
     socket.on("send-msg", (data) => {
         const sendUserSocket = onlineUsers.get(data.to);
         if (sendUserSocket) {
             socket.to(sendUserSocket).emit("msg-recieve", data.msg);
         }
     });
 });