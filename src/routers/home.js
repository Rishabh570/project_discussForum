const express = require('express')
const router = express.Router()


router.get('/', (req, res) => {
    res.redirect('../public/home.html');
})


module.exports=router