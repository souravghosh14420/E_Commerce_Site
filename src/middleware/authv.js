const jwt = require("jsonwebtoken");
const User_register=require("../models/vendor_reg");

const authv= async(req,res,next) => {
    try{
        const token=req.cookies.jwt;
        const verifyUser=jwt.verify(token,"mynameissouravghoshiliveinsalkiahowrah");
        const user=await User_register.findOne({_id: verifyUser._id});

        req.token=token;
        req.user=user;

        next();
    }catch(e){
        res.status(401).send(e);
    }
}

module.exports = authv;