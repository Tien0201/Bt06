import sequelize from "../model/connect.js";
import initModels from "../model/init-models.js";
const model = initModels(sequelize)


export const foodOrder = async(req,res) =>{
     const userId = req.user.id;
     const {items, itemId, quantity} = req.body;
     let totalPrice = 0;

     try{   
        //check sp
        for (let i = 0; i < items.length; i++) {
            const itemId = items[i].itemId;
            const itemFound = await model.food.findOne({
                where : {
                    food_id : itemId
                }
            })
            if (!itemFound) {
            res.status(404).send({ message: `item with id ${itemId} not found` });
            return;
            }
           //price
           const itemPrice = itemFound.price * items[i].quantity;
           totalPrice += itemPrice;
        }
        const totalQuantity = items.reduce((total, item) => total + item.quantity, 0);
        const orderArr = items.map(item => [item.itemId,item.quantity ]);
        //đổi mảng thành chuỗi JSON
        const orderArrJson = JSON.stringify(orderArr);

        const newOrder = await model.order_detail.create({
            user_id : userId,
            totalAmmount: totalQuantity,
            code : 200,
            orderArr: orderArrJson
        });
        res.status(201).json({ message: 'Đơn hàng đã được tạo thành công.', newOrder ,"total" : totalPrice});

     }catch(err){
        throw err;
     }
}