import express from 'express'
import  {likeRestaurant, restaurantLikeList, userLikeList , ratingRestaurant, userRatingList , resRatingList}  from '../controller/restaurantController.js';
import {verifyToken , verifyUser} from '../utils/verifyToken.js';

const router = express.Router();
//xử lí like nhà hàng
router.post("/:restaurantId/like", verifyUser, likeRestaurant)

router.get("/userList", verifyUser, userLikeList)

router.get("/:restaurantId", restaurantLikeList)

//đánh giá nhà hàng
router.post("/:restaurantId/rating", verifyUser, ratingRestaurant)

router.get("/userRatingList", verifyUser, userRatingList)

router.get("/:restaurantId", resRatingList)

export default router