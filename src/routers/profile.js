const route=require('express').Router()
, {createUserLocal,findUserById, findUserByParams} = require('../controllers/user')

route.get('/',(req,res)=>{
    res.redirect('newprofile.html');
})

route.get('/data',async(req,res)=>{
    try {
        let name=req.user.firstName+" "+req.user.lastName;
        let mob=req.user.mobile_number;
        let prof=req.user.empDet;
        let mail=req.user.email;
        let address=req.user.location;
        let hobbies=req.user.hobbies;
        let socialH=req.user.socialH;
        let edu=req.user.eduDet;
        res.send({name:name,mob:mob,prof:prof,mail:mail,address:address,hobbies:hobbies,socialH:socialH,edu:edu});
    }
    catch (err) {
        console.log("not able to fetch data");
    }
    
})

route.post('/update',async(req,res)=>{
    try{
        console.log("here");
        const user=await findUserByParams({email:req.user.email});
        user.update({location:req.body.state},{fields:['location']}).then(()=>{});
    }
    catch(err)
    {
        console.log("updation failed");
    }
})

module.exports=route