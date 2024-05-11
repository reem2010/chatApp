import express, { json } from 'express'
import cors from 'cors'
import router from './routes/auth.js'
import router2 from './routes/protectedRoute.js'
const app = express()
app.use(express.json());
const corsOptions = { 
  origin: '*', 
  optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204 
};
 app.use(cors(corsOptions));
 app.use('/auth', router);
 app.use('/protected', router2);
 const PORT = process.env.PORT || 3000;
 app.listen(PORT, () => {
 console.log(`Server is running on port ${PORT}`);
 });
