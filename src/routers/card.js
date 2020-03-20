const route=require('express').Router()
    , {createUserLocal, findUserByParams} = require('../controllers/user')
	,{createCard, getAllCards, findCardByKeyWord} = require('../controllers/card')
	, {verifyUser} = require('../middlewares/isAuthenticated');


// TRENDING LOGIC

route.get('/trending', verifyUser, async (req, res) => {
	console.log("In /card/trending route")

	try{
		const resp = await getAllCards();
		console.log('resp: ', resp);
		res.send(resp);
    }
    catch(err) {
		console.log('Failed to get trending cards!')
		throw err;
    }
})


route.get('/',async(req,res)=>{

    try{
        const cards=await getAllCards();
        if(cards)
        {
            res.send(cards)
        }
    }
    catch(err)
    {
        console.log('unable to fetch')
    }

})

route.post('/new',async (req, res) => {

    try {

        const card= await findCardByKeyWord({keyvalues:req.body.keyvalues});
        if(card)
        {
            res.send({status:"failed"})
        }
        else{
            const newcard=await createCard({
                uid:req.user.dataValues.uid,
                description:req.body.description,
                keyvalues:req.body.keyvalues
            })
            res.send({status:"sucess", data:newcard})
        }
    }
    catch(err)
    {
        console.log(err);
    }
})



module.exports=route
