const route=require('express').Router()

route.use('/',(req,res)=>{
    res.redirect('ourinfo.html');
})

module.exports=route