import cors from 'cors'
import express from 'express'
import dotenv from 'dotenv'
import { logger, logEvents } from './middleware/logger.js'
import cookieParser from 'cookie-parser'

import authRoute from './routes/authRoute.js'
import restaurantRoute from './routes/restaurantRoute.js'
import orderRoute from './routes/orderRoute.js'


const app = express();
const port = 3500;
dotenv.config();

//midleware
app.use(express.json());
app.use(cors());
app.use(cookieParser());
app.use(logger);

app.use('/auth',authRoute)
app.use('/restaurant',restaurantRoute)
app.use('/order', orderRoute )



app.listen(port , () =>{
    console.log(`Server running at http://localhost:${port}/`);
});