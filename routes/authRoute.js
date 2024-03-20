import express from 'express'
import { register, login } from '../controller/authController.js';
import {verifyToken , verifyUser} from '../utils/verifyToken.js';

const router = express.Router();

// router.get('/checkauthentication', verifyToken, (req,res,next) =>{
//     res.send("logged in")
// })

router.post("/register", register)
router.post("/login", login)


export default router