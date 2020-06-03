const route=require('express').Router()
, {createUserLocal,findUserById, findUserByParams} = require('../controllers/user')
, { verifyUser } = require("../middlewares/isAuthenticated")
, upload = require("../middlewares/upload");

route.post('/picture-upload', verifyUser(), upload.single("avatar"), async (req, res) => {
	if (req.file == undefined) {
		return res.send(`You must select a file.`);
	}

	let loggedInUser = JSON.stringify(req.user);
	loggedInUser = JSON.parse(loggedInUser);

	let userObj = await findUserById(loggedInUser.uid);
	userObj.avatar = req.file.filename;
	await userObj.save();

	res.redirect('/profile');
});

route.get('/get-profile-pic', verifyUser(), (req, res) => {
	let curUser = JSON.stringify(req.user);
	curUser = JSON.parse(curUser);
	let picName = curUser.avatar;
	res.send(`/${picName}`);
})


route.get('/data', verifyUser(), async(req,res)=>{
    try {
        let fname=req.user.firstName;                       let lname=req.user.lastName;
        let mob=req.user.mobile_number;                     let prof=req.user.empDet;
        let state=req.user.state;                           let city=req.user.city;
        let hobbies=req.user.hobbies;                       let zip=req.user.zip;
        let schDet=req.user.schDet;                         let colDet=req.user.colDet;
        let faceDet=req.user.faceDet;                       let instaDet=req.user.instaDet;
        let linkDet=req.user.linkDet;                        let mail=req.user.email;
        let bio=req.user.bio;
        let obj={lname:lname,fname:fname,mob:mob,prof:prof,mail:mail,state:state,zip:zip,city:city,hobbies:hobbies,faceDet:faceDet,instaDet:instaDet,
        linkDet:linkDet, colDet:colDet, schDet:schDet, bioDet:bio};
        res.send(obj);
    }
    catch (err) {
        console.log("not able to fetch data");
    }

})

let lastProfileViewed={};

route.get('/others/pic', verifyUser(), async(req,res)=>{
	const user=await findUserByParams({email:lastProfileViewed[req.user.email]});
    let picName = user.avatar;
	res.send(`/${picName}`);
})

route.get('/others/data', verifyUser(), async(req,res)=>{
    try {
		const user=await findUserByParams({email:lastProfileViewed[req.user.email]});
        let fname=user.firstName;                       let lname=user.lastName;
        let mob=user.mobile_number;                     let prof=user.empDet;
        let state=user.state;                           let city=user.city;
        let hobbies=user.hobbies;                       let zip=user.zip;
        let schDet=user.schDet;                         let colDet=user.colDet;
        let faceDet=user.faceDet;                       let instaDet=user.instaDet;
        let linkDet=user.linkDet;                       let mail=user.email;
        let bio=user.bio;								let avatar = user.avatar;

        let obj={lname:lname,fname:fname,mob:mob,prof:prof,mail:mail,state:state,zip:zip,city:city,hobbies:hobbies,faceDet:faceDet,instaDet:instaDet,
        linkDet:linkDet, colDet:colDet, schDet:schDet, bioDet:bio, avatar: avatar};
        res.send(obj);
    }
    catch (err) {
        console.log("not able to fetch data");
    }

})
route.use('/others/:uid', verifyUser(), async(req,res)=>{
    lastProfileViewed[req.user.email]=req.params.uid;
    res.redirect('/othersprofile.html');
})


route.post('/updatePersonalDet', verifyUser(), async(req,res)=>{
    try{

        const user=await findUserByParams({email:req.user.email});
        user.update({   state:req.body.state, city:req.body.city, zip:req.body.zip, email:req.body.email,mobile_number:req.body.mobno,
                        firstName:req.body.firstName,lastName:req.body.lastName ,empDet:req.body.prof},
                        {fields:['state','city','zip','email','mobile_number','firstName','lastName','empDet']}).then(
                    ()=>{});

        res.send({done:"sucess"});
    }
    catch(err)
    {
        console.log("updation failed");
    }
})
route.post('/updateHobDet', verifyUser(), async(req,res)=>{
    try{

        const user=await findUserByParams({email:req.user.email});
        user.update({   hobbies:req.body.hobbies},{fields:['hobbies']}).then(()=>{});
        res.send({done:"sucess"});
    }
    catch(err)
    {
        console.log("updation failed");
    }
})
route.post('/updateEduDet', verifyUser(), async(req,res)=>{
    try{

        const user=await findUserByParams({email:req.user.email});
        user.update({   schDet:req.body.schDet, colDet:req.body.colDet },{fields:['schDet','colDet']}).then(()=>{});
        res.send({done:"sucess"});
    }
    catch(err)
    {
        console.log("updation failed");
    }
})
route.post('/updateSocialHDet', verifyUser(), async(req,res)=>{
    try{

        const user=await findUserByParams({email:req.user.email});
        user.update({   instaDet:req.body.instaDet, linkDet:req.body.linkDet, faceDet:req.body.faceDet},{fields:['instaDet','linkDet','faceDet']}).then(()=>{});
        res.send({done:"sucess"});
    }
    catch(err)
    {
        console.log("updation failed");
    }
})
route.post('/updateBioDet', verifyUser(), async(req,res)=>{
    try{

        const user=await findUserByParams({email:req.user.email});
        user.update({   bio:req.body.bioDet},{fields:['bio']}).then(()=>{});
        res.send({done:"sucess"});
    }
    catch(err)
    {
        console.log("updation failed");
    }
})


route.get('/', verifyUser(), (req,res) => {
    res.redirect('newprofile.html');
})

module.exports=route
