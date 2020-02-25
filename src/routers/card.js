const route=require('express').Router()
    , {createUserLocal, findUserByParams} = require('../controllers/user')
    ,{createCard, findCardByKeyWord} = require('../controllers/card')

route.post('/new',async (req, res) => {
	
    try {
        console.log(req.body.description);
        const user = await findUserByParams({email: req.body.username});
        const card= await findCardByKeyWord({keyvalues:req.body.keyvalues});
        if(card)
        {
            res.send({status:"failed"})
        }
        else{
            const newcard=await createCard({
                description:req.body.description, 
                keyvalues:req.body.keyvalues
            })
            res.send({status:"sucess"})
        }
    }
    catch(err)
    {
        console.log(err);
    }
})

module.exports=route