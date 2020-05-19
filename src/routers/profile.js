const route=require('express').Router()
, {createUserLocal,findUserById, findUserByParams} = require('../controllers/user')
, { verifyUser } = require("../middlewares/isAuthenticated")
, upload = require("../middlewares/upload");

route.post('/picture-upload', upload.single("avatar"), async (req, res) => {
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

route.get('/get-profile-pic', (req, res) => {
	let curUser = JSON.stringify(req.user);
	curUser = JSON.parse(curUser);
	let picName = curUser.avatar;
	res.send(`/${picName}`);
})

// route.get('/get-cover-picture', (req, res) => {
// 	let curUser = JSON.stringify(req.user);
// 	curUser = JSON.parse(curUser);
// 	let picName = curUser.coverpic;
// 	res.send(`/${picName}`);
// })


route.post('/cover-upload', upload.single("cover"), async (req, res) => {
	if (req.file == undefined) {
		return res.send(`You must select a file.`);
	}

	let loggedInUser = JSON.stringify(req.user);
	loggedInUser = JSON.parse(loggedInUser);

	let userObj = await findUserById(loggedInUser.uid);
	userObj.coverpic = req.file.filename;
	await userObj.save();

	res.redirect('/profile');
});


route.get('/data',async(req,res)=>{
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

route.post('/updatePersonalDet',async(req,res)=>{
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
route.post('/updateHobDet',async(req,res)=>{
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
route.post('/updateEduDet',async(req,res)=>{
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
route.post('/updateSocialHDet',async(req,res)=>{
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
route.post('/updateBioDet',async(req,res)=>{
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


route.get('/', (req,res) => {
    res.redirect('newprofile.html');
})

module.exports=route
