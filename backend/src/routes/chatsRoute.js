import express from "express" 
import * as chatController from "../controllers/chatControllers.js"
import verifyToken from "../middleWare/authMiddleware.js";

const route = express.Router()
route.get('/', verifyToken, chatController.allChat)
route.post('/', verifyToken, chatController.createChat)
route.delete('/:chatId', verifyToken, chatController.deleteChat)
export default route