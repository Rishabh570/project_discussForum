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
	, {	getMessagesByRoomId,createMessage}=require('./src/controllers/message')

const app = express()  //creates server
const httpServer=http.createServer(app);
const io=SocketIO(httpServer);

app.set('view engine', 'ejs');	app.set('views','./src/views'); //code to handle ejs files
app.use(express.static(path.join(__dirname, './src/public')));  // to set src/public folder to lookup for static files
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
app.use(passport.initialize());
app.use(passport.session());


app.use('/signup', signupRoute);
app.use('/login',loginRoute);
app.use('/logout', logoutRoute);
app.use('/', homeRoute);
app.use('/profile', profileRoute);
app.use('/users', userRoutes);
app.use('/card',cardRoute);
app.use('/search', searchRoute);
app.use('/chatroom', chatroomRoute);
app.use('/about',infoRoute);
// TEST DB
const db = require('./src/db/database')
db.authenticate()
.then(() => {console.log("Database Connected.")})
.catch(err => console.log("Error in DB connection: ", err));

// Routes
let usersockets = {};	let activeUsers={};
let trendingCount={};	let soctochat={};

io.on('connection', (socket) => {
    
    socket.emit('connected')
    socket.on('send_msg', async (data) => {
        // if we use io.emit, everyone gets it
		// if we use socket.broadcast.emit, only others get it
		usersockets[data.user] = socket.id
		console.log(data.message);
		if(data.message=="inc#U")
		{
			if(data.cardId in activeUsers)
			activeUsers[data.cardId]+=1;
			else
			activeUsers[data.cardId]=1;

			if(data.cardId in trendingCount)
			trendingCount[data.cardId]+=1;
			else
			trendingCount[data.cardId]=1;

			soctochat[socket.id]=data.cardId;
			data["activeId"]=activeUsers[data.cardId]-1;
            io.emit('recv_msg', data);   
		}
		else
		{
			const done=await createMessage({message:data.message,author:data.user, roomID:data.cardId});
        	if (data.message.startsWith('@')) {
            	//data.message = "@a: hello"	// split at :, then remove @ from beginning
            	let recipient = data.message.split(':')[0].substr(1)
            	let rcptSocket = usersockets[recipient]
            	io.to(rcptSocket).emit('recv_msg', data)
        	} else {
	
				data["activeId"]=activeUsers[data.cardId]-1;
            io.emit('recv_msg',data);   
            	        
        	}
		}	
	})
	socket.on('disconnecting', async(reason) => {
		let cardID=soctochat[socket.id];
		activeUsers[cardID]=activeUsers[cardID]-1;
	  });

})



//activation of port
const PORT = process.env.PORT || 2121;
httpServer.listen(PORT, console.log(`Server started on port ${PORT}`))
	