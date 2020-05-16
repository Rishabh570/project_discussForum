const express = require('express')
	, signupRoute = require('./src/routers/signup')
	, loginRoute=require('./src/routers/login')
	, logoutRoute = require('./src/routers/logout')
	, homeRoute = require('./src/routers/home')
	, cardRoute= require('./src/routers/card')
	, userRoutes = require('./src/routers/users')
	, searchRoute = require('./src/routers/search')
	, chatroomRoute = require('./src/routers/chatroom')
	, profileRoute = require('./src/routers/profile')
	, infoRoute = require('./src/routers/aboutus')
	, passport = require('./src/passport/passporthandler')
	, session = require('express-session')
	, path = require('path')
	, SocketIO=require('socket.io')
	, http=require('http')
	, {	getMessagesByRoomId,createMessage} = require('./src/controllers/message')
	, { updateUserParticipationData, updateUserLastMsgForCard } = require('./src/controllers/user')
	, { updateCardLastMsg } = require('./src/controllers/card');

const app = express()  			//creates server
const httpServer=http.createServer(app);
const io=SocketIO(httpServer);

app.set('view engine', 'ejs'); 	app.set('views','./src/views'); //code to handle ejs files
app.use(express.static(path.join(__dirname, './src/public')));   // to set src/public folder to lookup for static files
app.use(express.json());	app.use(express.urlencoded({extended: true}))  // code to read post request

app.use(session({
	secret: 'keyboard cat',		resave: false,
	saveUninitialized: true,
	cookie: {
		httpOnly: false,
		secure: false,
		domain: 'localhost'
	}
}))
let trendingCount = null;

app.use(passport.initialize());
app.use(passport.session());

// ROUTES THAT SHOULD NOT CALL THE MIDDLEWARES WRITTEN BELOW ==============================================================
app.use('/signup', signupRoute);
app.use('/login',loginRoute);

let usersockets = {};
let cardLastMessage={};
let activeUsers = {};
let soctochat = {};
let loggedInUser;

// MIDDLEWARES ==============================================================
function trendingCounter(req, res, next) {
	if(trendingCount != null)
		next();
	else {
		trendingCount = req.session.trendingCount;
		next();
	}
}

function saveTrendingCounter(req, res, next) {
	req.session.trendingCount = trendingCount;
	req.session.save(() => {
		console.log("session saved.");
	})
	next();
}

function getLoggedInUser(req, res, next) {
	loggedInUser = req.user;
	next();
}

app.use(getLoggedInUser);
app.use(trendingCounter);


// ROUTES ==============================================================
app.use('/logout', logoutRoute);
app.use('/profile', profileRoute);
app.use('/users', userRoutes);
app.use('/card',cardRoute);
app.use('/search', searchRoute);
app.use('/chatroom', chatroomRoute);
app.use('/about',infoRoute);
app.use('/', homeRoute);


// TEST DB ==============================================================
const db = require('./src/db/database')
db.authenticate()
.then(() => {console.log("Database Connected.")})
.catch(err => console.log("Error in DB connection: ", err));




// WEBSOCKETS ==============================================================


io.on('connection', (socket) => {

    socket.emit('connected')
    socket.on('send_msg', async (data) => {
        // if we use io.emit, everyone gets it
		// if we use socket.broadcast.emit, only others get it
		usersockets[data.user] = socket.id
		if(data.message=="inc#U")
		{
			if(data.cardId in activeUsers)
			activeUsers[data.cardId]+=1;
			else
			activeUsers[data.cardId]=1;

			// Logic for handling trending cards
			let item = null;
			trendingCount.forEach(card => {
				if(card.id == data.cardId)
					item = card;
			})
			if(item == null)
				trendingCount.push({"id": data.cardId, "freq": 1});
			else
				item.freq++;
			app.use(saveTrendingCounter);		// Updates session with latest data

			soctochat[socket.id]=data.cardId;
			data["activeId"]=activeUsers[data.cardId]-1;
            io.emit('recv_msg', data);
		}
		else
		{
			const done = await createMessage({message:data.message,author:data.user, roomID:data.cardId});
        	if (data.message.startsWith('@')) {
				//data.message = "@a: hello"	// split at :, then remove @ from beginning
            	let recipient = data.message.split(':')[0].substr(1)
            	let rcptSocket = usersockets[recipient]
            	io.to(rcptSocket).emit('recv_msg', data)
			}
			else {
				cardLastMessage[data.cardId]=done.mid;
				data["activeId"]=activeUsers[data.cardId]-1;
            	io.emit('recv_msg',data);
			}
			// Updates current user's participated cards info in the DB
			await updateUserParticipationData(loggedInUser, data.cardId, done.mid);
		}
	})
	socket.on('disconnecting', async(reason) => {
		let cardID = soctochat[socket.id];
		console.log("last mid:",cardLastMessage[cardID]);
		// update state table for user
		if(cardLastMessage[cardID]){
			await updateCardLastMsg(cardID, cardLastMessage[cardID]);
			await updateUserLastMsgForCard(loggedInUser, cardID, cardLastMessage[cardID]);
		}

		// Update active users count
		activeUsers[cardID] = activeUsers[cardID]-1;
	  });

})



//activation of port
const PORT = process.env.PORT || 2121;
httpServer.listen(PORT, console.log(`Server started on port ${PORT}`))
