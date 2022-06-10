const bcrypt = require("bcryptjs/dist/bcrypt");
const async = require("hbs/lib/async");
const mongoose=require("mongoose");
const jwt=require("jsonwebtoken");

const userSchema=new mongoose.Schema(
    {
        fname: {
            type: String,
            required: true
        },
        lname: {
            type: String,
            required: true
        },
        email: {
            type: String,
            required: true,
            unique: true,
        },
        ph: {
            type: String,
            required: true,
        },
        gender: {
            type: String,
            required: true,
        },
        address: {
            type: String,
            required: true
        },
        password: {
            type: String,
            required: true
        },
        // image: {
        //     data: Buffer,
        //     contentType: String
        // },
        image: {
            type: String,
            required: true
        },
        tokens: [
            {
                token: {
                    type: String,
                    required: true
                }
            }
        ],
        order: [
            {
                orderId: String,
                sname: String,
                item: String,
                quantity: Number,
                status: String,
                address: String,
                contact: String,
                price: Number,
                dt: {
                    type: Date,
                    default: Date.new
                }
            }
        ]
    }
)

userSchema.methods.generateAuthToken= async function(){
    try{
        const token=jwt.sign({_id: this._id.toString()},"mynameissouravghoshiliveinsalkiahowrah");
        this.tokens=this.tokens.concat({token: token});
        await this.save();
        return token;
    }
    catch(e){
        console.log(e);
    }
}

userSchema.pre("save", async function(next){
    // const passworsHash=await bcrypt.hash(password,10);
    if(this.isModified("password")){
        this.password=await bcrypt.hash(this.password,10);
    this.confirmPassword=await bcrypt.hash(this.password,10);
    }
    next();
})

const User_register=new mongoose.model("User_register",userSchema);

module.exports=User_register;