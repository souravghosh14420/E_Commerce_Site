require(`dotenv`).config();

const express = require("express");
const path=require("path");
const hbs=require("hbs");
const app=express();
const {v4 : uuidv4} = require('uuid');
const cookie=require("cookie-parser");
const authu=require("./middleware/authu");
const authv=require("./middleware/authv");
const multer=require("multer");

require("./db/conn");

const User_register=require("./models/user_reg");
const Vendor_register=require("./models/vendor_reg");
const { json } = require("express");
const { log }= require("console");
const bcrypt = require("bcryptjs/dist/bcrypt");
const { use } = require("express/lib/router");
const async = require("hbs/lib/async");
// const async = require("hbs/lib/async");
// const async = require("hbs/lib/async");

app.use(express.json());
app.use(cookie());
app.use(express.urlencoded({extended: false}));

const port=process.env.PORT || 5000;
const staticPath=path.join(__dirname,"../public");
const templatePath=path.join(__dirname,"../templates/views");
const partialsPath=path.join(__dirname,"../templates/partials");


const userStorage=multer.diskStorage({
    destination: (req,file,cb) => {
        cb(null,"./public/userImage");
    },
    filename: function(req,file,cb){
        cb(null,file.fieldname+"_"+Date.now()+"_"+path.extname(file.originalname));
    }
});
const userUpload=multer({
        storage: userStorage
    }).single("uimg");


const vendorStorage=multer.diskStorage({
    destination: (req,file,cb) => {
        cb(null,"./public/vendorImage");
    },
    filename: function(req,file,cb){
        cb(null,file.fieldname+"_"+Date.now()+"_"+path.extname(file.originalname));
    }
});
const vendorUpload=multer({
    storage: vendorStorage
}).single("vimg");

app.use(express.static(staticPath));
app.set("view engine","hbs");
app.set("views",templatePath);
hbs.registerPartials(partialsPath);

app.get("/", (req,res) => {
    res.status(200).render("index");
})

app.get("/register", (req,res) => {
    res.status(200).render("register");
})

app.post("/user_Reg",userUpload, async (req,res) => {

    try{
        const password=req.body.password;
        const confirmPassword=req.body.confirmPassword;

        if(password === confirmPassword)
        {
            console.log(req.file);
            const registerUser=new User_register(
                {
                    fname: req.body.ufirstName,
                    lname: req.body.ulastName,
                    email: req.body.uemail,
                    ph: req.body.uph,
                    gender: req.body.ugender,
                    address: req.body.uaddress,
                    password: req.body.upas,
                    image: req.file.filename
                }
            )

            const token=await registerUser.generateAuthToken();

            res.cookie("jwt",token,{
                expires: new Date(Date.now() + (1000*60*60*24*2)),
                httpOnly: true
            });

            const userRegistered=await registerUser.save();
            res.status(201).render("index");
        }
        else{
            res.send(`Passwords are not matching....`);
        }

    }catch(e)
    {
        res.status(400).send(e.message);
    }
})

app.post("/vendor_Reg", vendorUpload, async (req,res) => {

    try{
        const password=req.body.password;
        const confirmPassword=req.body.confirmPassword;

        if(password === confirmPassword)
        {
            const registerVendor=new Vendor_register(
                {
                    fname: req.body.vfirstName,
                    lname: req.body.vlastName,
                    shop: req.body.vshopName,
                    email: req.body.vemail,
                    ph: req.body.vph,
                    gender: req.body.vgender,
                    address: req.body.vaddress,
                    password: req.body.vpas,
                    image: req.file.filename
                }
            )
                
            const token=await registerVendor.generateAuthToken();

            res.cookie("jwt",token,{
                expires: new Date(Date.now() + (1000*60*60*24*2)),
                httpOnly: true
            });

            const vendorRegistered=await registerVendor.save();

            const itemAdd = await Vendor_register.findOneAndUpdate({email : req.body.vemail},{
                $set: {
                    item: [
                        {
                        name: "oil",
                        price: `${req.body.oilPrice}`,
                        quantity: `${req.body.oilQuantity}`
                    },
                    {
                        name: "copy",
                        price: `${req.body.copyPrice}`,
                        quantity: `${req.body.copyQuantity}`
                    },
                    {
                        name: "biscuit",
                        price: `${req.body.biscuitPrice}`,
                        quantity: `${req.body.biscuitQuantity}`
                    },
                    {
                        name: "pen",
                        price: `${req.body.penPrice}`,
                        quantity: `${req.body.penQuantity}`
                    },
                    {
                        name: "rice",
                        price: `${req.body.ricePrice}`,
                        quantity: `${req.body.riceQuantity}`
                    },
                    {
                        name: "wheet",
                        price: `${req.body.wheetPrice}`,
                        quantity: `${req.body.wheetQuantity}`
                    }
                ]
                }
            });

            res.status(201).render("index");
        }
        else{
            res.send(`Passwords are not matching....`);
        }

    }catch(e)
    {
        res.status(400).send(e.message);
    }
})

app.get("/user_home", (req,res) => {
    res.status(200).render("user_home");
})

app.get("/vendor_home", (req,res) => {
    res.status(200).render("vendor_home");
})

app.post("/user_login", async (req,res) => {
    try{
        const email=req.body.uemail;
        const password=req.body.upassword;

        const userEmail = await User_register.findOne({email : email});

        const isMatch=await bcrypt.compare(password,userEmail.password);

        const token=await userEmail.generateAuthToken();

        res.cookie("jwt",token,{
            expires: new Date(Date.now() + (1000*60*60*24*2)),
            httpOnly: true
        });

        if(isMatch)
        {
            res.status(201).render(`user_home`, {
                uname: `${userEmail.fname}`,
                lname: `${userEmail.lname}`,
                uEmail: `${userEmail.email}`
            });
        }
        else{
            res.send(`Password are not matching ${password}`);
        }
    }
    catch(e){
        res.status(400).send("Invalid login details");
    }
})

app.post("/vendor_login", async (req,res) => {
    try{
        const email=req.body.vemail;
        const password=req.body.vpassword;

        const vendorEmail = await Vendor_register.findOne({email : email});

        console.log(`${vendorEmail.password}`);

        const isMatch=await bcrypt.compare(password,vendorEmail.password);

        const arr=JSON.stringify(vendorEmail.order);

        const token=await vendorEmail.generateAuthToken();

        res.cookie("jwt",token,{
            expires: new Date(Date.now() + (1000*60*60*24*2)),
            httpOnly: true
        });

        if(isMatch)
        {
            res.status(201).render(`vendor_home`, {
                uname: `${vendorEmail.fname}`,
                lname: `${vendorEmail.lname}`,
                email: `${email}`,
                list: `${arr}`
            });
        }
        else{
            res.send(`Password are not matching`);
        }
    }
    catch(e){
        res.status(400).send("Invalid login details");
    }
})

app.get("/order_shop", (req,res) => {
    res.render(`order_shop`);
})

app.post("/order_shop", async (req,res) => {
    // res.send(req.body.uEmail);
    const email=req.body.uEmail;
    const userEmail = await User_register.findOne({email : email});
    const allVendor = await Vendor_register.find();
    const list=JSON.stringify(allVendor);

    res.render(`order_shop`,{
        uname: `${userEmail.fname}`,
        lname: `${userEmail.lname}`,
        uEmail: `${email}`,
        item: `${req.body.item}`,
        list: list
    })

    // res.send(`${userEmail.fname} ${userEmail.lname} ${email} ${req.body.item}`);
})

app.get("/placeOrder", (req,res) => {
    res.render("placeOrder");
})

app.post("/placeOrder", async (req,res) => {
    try{
        const email=req.body.uEmail;
        const item=req.body.item;
        const shop=req.body.shop;
        const quantity=req.body.quantity;
        const price=req.body.price;

        const userEmail = await User_register.findOne({email : email});

        res.render("placeOrder",{
            shop: shop,
            item: item,
            user: email,
            fname: userEmail.fname,
            lname: userEmail.lname,
            address: userEmail.address,
            ph: userEmail.ph,
            quantity: quantity,
            price: price
        });
    }
    catch(e){
        res.status(400).send(e);
    }
})

app.post("/confirm", async (req,res) => {
    try{

        const uemail=req.body.user;
        const item=req.body.item;
        const vemail=req.body.shop;
        const fname=req.body.fname;
        const lname=req.body.lname;
        const quantity=req.body.quantity;
        const address=req.body.address;
        const ph=req.body.ph;
        const price=req.body.price;
        const dt= new Date();
        const orderId=uuidv4();

        const user = await User_register.findOne({email : uemail});
        const vendor = await Vendor_register.findOne({email : vemail});

        let index=0;
        if("copy".localeCompare(item)==0)
                index=1;
        else if("biscuit".localeCompare(item)==0)
                index=2;
        else if("pen".localeCompare(item)==0)
                index=3;
        else if("rice".localeCompare(item)==0)
                index=4;
        else
                index=5;


        const userUpdate = await User_register.findOneAndUpdate({email : uemail},{
            $push: {
                order: {
                    orderId: `${orderId}`,
                    sname: `${vendor.shop}`,
                    item: `${item}`,
                    quantity: `${quantity}`,
                    status: "Pending",
                    address: `${address}`,
                    contact: `${vendor.ph}`,
                    price: `${price}`
                    // dt: `${dt}`
                }
            }
        });

        const vendorUpdate = await Vendor_register.findOneAndUpdate({email : vemail},{
            $push: {
                order: {
                    orderId: `${orderId}`,
                    fname: `${fname}`,
                    lname: `${lname}`,
                    item: `${item}`,
                    quantity: `${quantity}`,
                    status: "Pending",
                    address: `${address}`,
                    contact: `${ph}`,
                    price: `${price}`
                    // dt: `${dt}`
                }
            }
        });

        const updatedQuantity=vendor.item[index].quantity-parseInt(quantity);

        console.log(updatedQuantity);

        const inventoryUpdate=await Vendor_register.updateOne(
            {"item.name": `${item}`},
            {
            $set: {
                "item.$.quantity": `${updatedQuantity}`
            }
        });

        res.status(201).render(`user_home`, {
            uname: `${user.fname}`,
            lname: `${user.lname}`,
            uEmail: `${user.email}`
        });
    }catch(e){
        res.status(400).send(e);
    }
})

app.post("/arrange", async (req,res) => {
    try{
        const email=req.body.email;
        const orId=req.body.orderId;
        
        const vupdate=await Vendor_register.updateOne(
            {"order.orderId": `${orId}`},
            {
            $set: {
                "order.$.status": "Delivered"
            }
        });
        
        const uupdate=await User_register.updateOne(
            {"order.orderId": `${orId}`},
            {
            $set: {
                "order.$.status": "Delivered"
            }
        });

        const vendorEmail = await Vendor_register.findOne({email : email});

        console.log(vendorEmail.order);

        const arr=JSON.stringify(vendorEmail.order);
        res.status(201).render(`vendor_home`, {
            uname: `${vendorEmail.fname}`,
            lname: `${vendorEmail.lname}`,
            email: `${email}`,
            list: `${arr}`
        });

    }catch(e){
        res.status(400).send("ERROR");
    }
});

app.get("/logoutu", authu, async (req,res) =>{
    try{
        req.user.tokens = req.user.tokens.filter((currentElement) => {
            return currentElement.token != req.token;
        })
        res.clearCookie("jwt");
        await req.user.save();
        // res.render("index");
        res.redirect("/");
    }catch(e){
        res.status(500).send(e);
    }
});

app.get("/logoutv", authv, async (req,res) =>{
    try{
        req.user.tokens = req.user.tokens.filter((currentElement) => {
            return currentElement.token != req.token;
        })
        res.clearCookie("jwt");
        await req.user.save();
        res.redirect("/");
    }catch(e){
        res.status(500).send(e);
    }
});

app.get("/profile", (req,res) => {
    res.status(200).render("profile");
})

app.get("/profileu", authu, async (req,res)=>{
    try{
        const list=JSON.stringify(req.user);
        res.render("profile",{
            info: list,
            uname: req.user.fname,
            lname: req.user.lname,
            email: req.user.email,
            gender: req.user.gender,
            ph: req.user.ph,
            add: req.user.address,
            person: "u"
        })
    }catch(e)
    {
        res.status(400).send(e.message);
    }
});

app.get("/profilev", authv, async (req,res)=>{
    try{
        const list=JSON.stringify(req.user);
        res.render("profile",{
            info: list,
            uname: req.user.fname,
            lname: req.user.lname,
            shop: req.user.shop,
            email: req.user.email,
            gender: req.user.gender,
            ph: req.user.ph,
            add: req.user.address,
            op: req.user.item[0].price,
            oq: req.user.item[0].quantity,
            cp: req.user.item[1].price,
            cq: req.user.item[1].quantity,
            bp: req.user.item[2].price,
            bq: req.user.item[2].quantity,
            pp: req.user.item[3].price,
            pq: req.user.item[3].quantity,
            rp: req.user.item[4].price,
            rq: req.user.item[4].quantity,
            wp: req.user.item[5].price,
            wq: req.user.item[5].quantity,
            person: "v"
        })
    }catch(e)
    {
        res.status(400).send(e.message);
    }
});

app.get("/viewdetails", (req,res)=>{
    res.status(201).render("viewdetails");
})

app.post("/viewdetails", async (req,res)=>{
    try{
        const per=req.body.person;
        const order=req.body.orderId;
        console.log(order);
        const userDeatils = await User_register.findOne({"order.orderId": `${order}`},{_id: 0, 'order.$': 1});
        const vendorDeatils = await Vendor_register.findOne({"order.orderId": `${order}`},{_id: 0, 'order.$': 1});

        // const ulist=userDeatils.o
        console.log(userDeatils.order);
        console.log(vendorDeatils.order);
        console.log(userDeatils.order[0].contact);
        console.log(vendorDeatils);
        res.render("viewdetails",{
            cfname: vendorDeatils.order[0].fname,
            clname: vendorDeatils.order[0].lname,
            sname: userDeatils.order[0].sname,
            item: userDeatils.order[0].item,
            oid: order,

            quantity: userDeatils.order[0].quantity,
            price: userDeatils.order[0].price,

            status: userDeatils.order[0].status,
            date: vendorDeatils.order[0].dt,

            cc: vendorDeatils.order[0].contact,
            vc: userDeatils.order[0].contact,

            add: userDeatils.order[0].address,

            p: '${per}'
        });
    }
    catch(e){
        res.status(400).send(e.message);
    }
})

app.listen(port, () => {
    console.log(`Server is running at port number ${port}`);
});