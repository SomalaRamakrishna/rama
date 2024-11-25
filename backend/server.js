const express=require("express");
const mongoose=require('mongoose')
const devuser=require('./devusermodel')
const reviewmodel=require('./reviewmodel')
const jwt=require('jsonwebtoken');
const cors=require('cors')
const middleware=require('./middleware')
const app=express();
app.use(express.json());//bodyparser
app.use(cors({origin:'*'}))
const port= process.env.PORT || 5000;

mongoose.connect('mongodb+srv://SomalaRamakrishna:9701843642Ram@cluster0.0hr1a.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0').then(
    ()=>console.log("DB connected")
)

app.get("/",(req,res)=>{
    return res.send("Hello world")
})

app.post("/register",async (req,res)=>{
    try{
         const {fullname,email,mobile,skill,password,confirmpassword}=req.body;
         const exist=await devuser.findOne({email});
         if(!fullname || !email || !mobile || !skill || !password || !confirmpassword){
            return res.status(403).send("All fields are required");
         }
         if(exist){
            return res.status(400).send('User Already Registered')
         }
         if(password!=confirmpassword){
            return res.status(403).send("Confirm password mismatch");
         }
         let newUser=new devuser({
            fullname,email,mobile,skill,password,confirmpassword
         })
         newUser.save();
         return res.status(200).send("User Registered Successfully");
    }
    catch(err){
        console.log(err);
        return res.status(500).send('Server Error')
    }
})

app.post('/login',async (req,res)=>{
    try{
        const {email,password}=req.body;
        const exist=await devuser.findOne({email});
        if(!exist){
            return res.status(400).send('user not Exists');
        }
        if(exist.password !=password){
            return res.status(400).send('Password Invalid');
        }

        let payload ={
            user:{
                id:exist.id
            }
        }
        jwt.sign(payload,'jwtPassword',{expiresIn:36000000},
            (err,token)=>{
              if(err) throw err
              return res.json({token})
            }
        )

    }
    catch(err){
        console.log(err);
        return res.status(500).send("Server Error")
    }
})


app.get('/allprofiles',middleware,async (req,res)=>{
    try{
        let allprofiles=await devuser.find();
        return res.json(allprofiles);
    }
    catch(err){
        console.log(err);
        return res.status(500).send("Server Error")
    }
})

app.get('/myprofile',middleware,async(req,res)=>{
    try{
        let user=await devuser.findById(req.user.id);
        return res.json(user)
    }
    catch(err){
        console.log(err);
        return res.status(500).send("Server Error");
    }
})

app.post('/addreview',middleware,async(req,res)=>{
    try{
        const {taskworker,rating}=req.body
        const exist=await devuser.findById(req.user.id);
        const newReview =new reviewmodel({
            taskprovider:exist.fullname,
            taskworker,rating
        })
        newReview.save();
        return res.status(200).send("Review updated successfully")
    }
    catch(err){
        console.log(err)
        return res.status(500).send("Serveer Error");
    }
})

app.get('/myreview',middleware,async(req,res)=>{
    try{
        let allreviews=await reviewmodel.find();
        let myreviews=allreviews.filter(review=> review.taskworker.toString()===req.user.id.toString())
        return res.status(200).json(myreviews)

    }
    catch(err){
        console.log(err)
        return res.status(500).send("Server Error")
    }
})


app.listen(port,console.log("Server is running"))