db = require('../db/db');

async function updateStateDetails(user,cardid,mid){
    try{
        let userString = JSON.stringify(user);
		user = JSON.parse(userString);
        const userID = user.uid;
      
        const alreadyin=await db.notifiState.findOne({
            where:{cid:cardid}
        })

        if(alreadyin){
            let particiState=JSON.parse(alreadyin.particiState);
            particiState[`${userID}`]=`${mid}`;
            alreadyin.mid=mid;
            await alreadyin.save();
        }else{
            let dbjson={};
            dbjson[`${userID}`]=`${mid}`;
            await db.notifiState.create({
                cid:cardid,
                LastMId:mid,
                particiState:dbjson
            })
            console.log(dbjson);
        }
        return ;

    }catch(err){
        throw err;
    }
}

module.exports={updateStateDetails}