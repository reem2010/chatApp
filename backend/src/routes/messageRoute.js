import express from "express" 
import * as messageController from "../controllers/messageController.js"
import verifyToken from "../middleWare/authMiddleware.js";

const route = express.Router()

route.get('/', verifyToken, messageController.getMessages)
route.post('/', verifyToken, messageController.createMessage)
export default route