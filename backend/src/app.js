import express from 'express'
import cors from 'cors'
import cookieParser from "cookie-parser";
import {Server} from 'socket.io'
import userRouter from './routes/auth.js'
import chatRouter from './routes/chatsRoute.js'
import messageRouter from './routes/messageRoute.js'
import router2 from './routes/protectedRoute.js'


const app = express()
const corsOptions = {
  origin: process.env.HOST, 
  credentials: true
};

app.use(cors(corsOptions));
app.use(cookieParser());
app.use(express.json());

 app.use('/auth', userRouter);
 app.use('/chats', chatRouter)
 app.use('/message', messageRouter)
 app.use('/protected', router2);
 const PORT = process.env.PORT || 3000;
 const server = app.listen(PORT, () => {
 console.log(`Server is running on port ${PORT}`);
 });

 const io = new Server(server, {
     cors: corsOptions
 });
 global.onlineUsers = new Map();

 io.on("connection", (socket) => {
     global.chatsocket = socket;
     socket.on("add-user", (userId)=> {
         onlineUsers.set(userId, socket.id);
     });
     socket.on("send-msg", (data) => {
         const sendUserSocket = onlineUsers.get(data.to.toString());
         if (sendUserSocket) { 
             socket.to(sendUserSocket).emit("msg-recieve", data.msg);
         }
     });
 });
export { io };