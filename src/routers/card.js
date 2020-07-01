const route=require('express').Router()
    , {createUserLocal,findUserById,findUserByParams,updateUserParticipationData,updateUserLastMsgForCard} = require('../controllers/user')
	,{createCard, getAllCards, findCardByKeyWord, findCardByID, getRecentlyCreatedCards} = require('../controllers/card')
	, {verifyUser} = require('../middlewares/isAuthenticated');


// TRENDING LOGIC
route.get('/trending', verifyUser(), async (req, res) => {
	console.log("In trending route...");
	try{
		let trendingCardsArr = req.cookies.trendingCount;
		if(trendingCardsArr && trendingCardsArr !== null && trendingCardsArr.length == 0) {
			res.send("");
		}

		trendingCardsArr.sort(function(a, b){return b.freq - a.freq});
		trendingCardsArr = trendingCardsArr.splice(0, 21);

		let resp = [];
		(async () => {
			for(let i=0; i<trendingCardsArr.length; i++) {
				const cardObj = await findCardByID(trendingCardsArr[i].id);
				resp.push(cardObj);
			}
			res.send(resp);
		})()

    }
    catch(err) {
		console.log('Failed to get trending cards!')
		throw err;
    }
})

route.get('/recentlycreated', verifyUser(), async (req, res) => {
	try {
		const resp = await getRecentlyCreatedCards();
		res.send(resp);
	}
	catch(err) {
		console.log("Failed to get recently created cards!");
		throw err;
	}
})


route.get('/', verifyUser(), async(req,res)=>{

    try{
        const cards=await getAllCards();
        if(cards)
        { res.send(cards)}
    }
    catch(err)
    {
        console.log('unable to fetch')
    }

})

route.get('/notifications', verifyUser(), async(req,res)=>{
    try{
        notiData=[];
        let user = JSON.stringify(req.user);
        user = JSON.parse(user);
        let userParticipatedCards =JSON.parse(user.cid);
        console.log(userParticipatedCards);
        for(let cardid in userParticipatedCards){
            const cardObj = await findCardByID(cardid);
            if(cardObj.lastMsg*-1==userParticipatedCards[cardid] || cardObj.lastMsg==userParticipatedCards[cardid]){
                continue;
            }else{
                notiData.push(cardid);
            }
        }
        res.send(notiData);
    }
    catch(err){
        console.log("got error");
    }
})

route.post('/new', verifyUser(), async (req, res) => {

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
