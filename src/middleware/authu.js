const jwt = require("jsonwebtoken");
const User_register=require("../models/user_reg");

const authu= async(req,res,next) => {
    try{
        const token=req.cookies.jwt;
        const verifyUser=jwt.verify(token,"mynameissouravghoshiliveinsalkiahowrah");
        const user=await User_register.findOne({_id: verifyUser._id});
        req.token=token;
        req.user=user;

        next();
    }catch(e){
        res.status(200).redirect(`/login`);
    }
}

module.exports = authu;