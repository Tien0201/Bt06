import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

import sequelize from "../model/connect.js";
import initModels from "../model/init-models.js";

const model = initModels(sequelize)


export const register = async(req,res) =>{
    const {username , email} = req.body
    const salt = bcrypt.genSaltSync(10);
    const hashedPassword = bcrypt.hashSync(req.body.password, salt); 

    const checkEmail = await model.users.findOne({
        where: {
            email
        }
    });  
    
    const checkUsername = await model.users.findOne({
        where: {
            full_name : username
        }
    });    

    try{
        const newUser = {
            full_name : username,
            email : email,
            password : hashedPassword
        }

    if(checkUsername){
        return res.status(409).json({message : `duplicate username `})
    }else if (checkEmail)
    {
        return res.status(409).json({message : `duplicate email`})

    }else{
        await model.users.create(newUser);
        res.status(200).send(`User ${req.body.username} has been created`);
    }
    }catch(err){
        throw err    
    }
}

export const login = async(req,res) =>{
    const {username, password } = req.body
    try{
        const foundUser = await model.users.findOne({
            where: {
                full_name : username,
            }
        });
        if(!foundUser)
             return res.status(404).json({ message: `Cannot find user with username: ${username}`});
        const isPasswordCorrect = await bcrypt.compare(password , foundUser.password)
        if(!isPasswordCorrect) 
        return res.status(404).json({ message:`Wrong password`});
        //jwt
        const token = jwt.sign({id: foundUser.user_id}, process.env.JWT)
        console.log("access_token" , token);
        // const {password , email , ...otherDetails} = foundUser._doc
        res.cookie("access_token" , token, {
            httpOnly : true,
        })
        .status(200)
        .json({foundUser})
    }catch(err){
        throw(err)
    }   
}


