import sequelize from "../model/connect.js";
import initModels from "../model/init-models.js";
const model = initModels(sequelize)
// 1/Xử lý like nhà hàng
//login mới có thể like
export const likeRestaurant = async(req,res) =>{
    const { restaurantId } = req.params;
    const userId = req.user.id;
    try{
        const Liked = {
            user_id : userId,
            res_id : restaurantId,
            date__like : Date.now(),
            isLiked : 1
        }
    const foundLikedRestaurant = await model.like_res.findOne({
        where:  {
            user_id : userId,
            res_id : restaurantId
        }
    });

    if(!foundLikedRestaurant){
        await model.like_res.create(Liked);
        return res.status(200).json({message : `Liked`})
    }
    
    if (foundLikedRestaurant && foundLikedRestaurant.isLiked == 1) 
    {
        await foundLikedRestaurant.update({ isLiked: 0 , date__like : Date.now()});
        return res.status(200).json({message : `Unliked`})
    }else{
        await foundLikedRestaurant.update({ isLiked: 1 , date__like : Date.now()});
        return res.status(200).json({message : `Liked`})
    }
    }catch(err){
        throw err    
    }
}
//lọc danh sách user đã thích khi đã đăng nhập
export const userLikeList = async(req,res) =>{
    const userId = req.user.id;
    console.log(userId)
    try{
        const userLikedList = await model.like_res.findAll({
            where:  {
                user_id : userId,
            }
        });
        await res.status(200).json(userLikedList);
    }catch(err){
        throw err
    }
}

export const restaurantLikeList = async(req,res) =>{
    const {restaurantId} = req.params;
    try{
        const ResLikedList = await model.like_res.findAll({
            where:  {
                res_id : restaurantId,
            }
        });
        await res.status(200).json(ResLikedList);
    }catch(err){
        throw err
    }
}
// 2/Xử lý đánh giá nhà hàng

export const ratingRestaurant = async(req,res) =>{
    const { restaurantId } = req.params;
    const userId = req.user.id;
    const {content, ammount} = req.body;
    try{
        const newRating = {
            user_id : userId,
            res_id : restaurantId,
            ammount: ammount,
            date_rate : Date.now(),
            content : content
        }
    await model.rate_res.create(newRating)
    res.status(200).json({message : "Rating has been add"})
    }catch(err){
        throw err
    }
}

export const userRatingList = async(req,res) =>{
    const userId = req.user.id;
    console.log(userId)
    try{
        const ratingList = await model.rate_res.findAll({
            where:  {
                user_id : userId,
            }
        });
        await res.status(200).json(ratingList);
    }catch(err){
        throw err
    }
}

export const resRatingList = async(req,res) =>{
    const {restaurantId} = req.params;
    try{
        const ratingList = await model.rate_res.findAll({
            where:  {
                res_id : restaurantId,
            }
        });
        await res.status(200).json(ratingList);
    }catch(err){
        throw err
    }
}



