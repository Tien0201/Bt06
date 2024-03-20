import express from 'express'
import {verifyToken , verifyUser} from '../utils/verifyToken.js';
import {foodOrder} from '../controller/orderController.js';

const router = express.Router();

//user đặt món

router.post("/createOrder",verifyUser, foodOrder)

export default router