const express = require('express')
	, router = express.Router()
	, authMiddleware = require('../middlewares/isAuthenticated');


router.get('/', (req, res) => {
	res.redirect('/chatpage.html')
})

router.post('/', (req, res) => {
	res.send({res: "done"})
})


module.exports=router
