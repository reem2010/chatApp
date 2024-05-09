import express, { json } from 'express'
import cors from 'cors'
const app = express()
app.use(express.json());
const corsOptions = { 
  origin: '*', 
  optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204 
}; 
 app.use(cors(corsOptions));
 const authRoutes = require('./routes/auth');
 const protectedRoute = require('./routes/protectedRoute');
 app.use('/auth', authRoutes);
 app.use('/protected', protectedRoute);
 const PORT = process.env.PORT || 3000;
 app.listen(PORT, () => {
 console.log(`Server is running on port ${PORT}`);
 });
