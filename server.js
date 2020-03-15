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
	, path = require('path');

const app = express()  //creates server
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

// Routes
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

//activation of port
const PORT = process.env.PORT || 2121;
app.listen(PORT, console.log(`Server started on port ${PORT}`))
	