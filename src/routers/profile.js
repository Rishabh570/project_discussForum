const route=require('express').Router()

route.use('/',(req,res)=>{
    res.redirect('newprofile.html');
})

module.exports=route