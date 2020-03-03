const express = require('express')
	, signupRoute = require('./src/routers/signup')
	, loginRoute=require('./src/routers/login')
	, logoutRoute = require('./src/routers/logout')
	, homeRoute = require('./src/routers/home')
	, cardRoute= require('./src/routers/card')
	, userRoutes = require('./src/routers/users')
	, searchRoute = require('./src/routers/search')
	, chatroomRoute = require('./src/routers/chatroom')
	, passport = require('./src/passport/passporthandler')
	, session = require('express-session')
	, path = require('path');

const app = express()
app.set('view engine', 'ejs');
app.set('views','./src/views');
app.use(express.static(path.join(__dirname, './src/public')));
app.use(express.json())
app.use(express.urlencoded({extended: true}))

app.use(session({
	secret: 'keyboard cat',
	resave: false,
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
app.use('/users', userRoutes);
app.use('/card',cardRoute);
app.use('/search', searchRoute);
app.use('/chatroom', chatroomRoute);
// TEST DB
const db = require('./src/db/database')
db.authenticate()
.then(() => {console.log("Database Connected.")})
.catch(err => console.log("Error in DB connection: ", err));

//activation of port
const PORT = process.env.PORT || 2121;
app.listen(PORT, console.log(`Server started on port ${PORT}`))
