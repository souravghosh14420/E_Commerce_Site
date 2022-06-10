const bcrypt = require("bcryptjs/dist/bcrypt");
const async = require("hbs/lib/async");
const mongoose=require("mongoose");
const jwt=require("jsonwebtoken");

const vendorSchema=new mongoose.Schema(
    {
        fname: {
            type: String,
            required: true
        },
        lname: {
            type: String,
            required: true
        },
        shop: {
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
        image: {
            type: String,
            required: true
        },
        item: [
            {
                name: String,
                price: Number,
                quantity: Number
            }
        ],
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
                fname: String,
                lname: String,
                item: String,
                quantity: Number,
                status: String,
                address: String,
                contact: String,
                price: Number,
                dt: {
                    type: Date,
                    default: Date.now
                }
            }
        ]
    }
)

vendorSchema.methods.generateAuthToken = async function(){
    try{
        const token=jwt.sign({_id: this._id.toString()},"mynameissouravghoshiliveinsalkiahowrah");
        this.tokens=this.tokens.concat({token});
        await this.save();
        return token;
    }
    catch(e){
        console.log(e);
    }
}

vendorSchema.pre("save", async function(next){
    // const passworsHash=await bcrypt.hash(password,10);
    if(this.isModified("password"))
    {
        this.password=await bcrypt.hash(this.password,10);
    this.confirmPassword=await bcrypt.hash(this.password,10);
    }
    
    next();
})

const Vendor_register=new mongoose.model("Vendor_register",vendorSchema);

module.exports=Vendor_register;