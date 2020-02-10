const express = require('express')
	, signupRoute = require('./src/routers/signup')
	, homeRoute = require('./src/routers/home')
	, userRoutes = require('./src/routers/users')
	, passport = require('./src/passport/passporthandler')
	, path = require('path');

const app = express()
app.use(express.static(path.join(__dirname, './src/public')));
app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(passport.initialize())
app.use(passport.session())

// Routes
app.use('/signup', signupRoute);
app.use('/',homeRoute);
app.use('/users', userRoutes);

// TEST DB
const db = require('./src/db/database')
db.authenticate()
.then(() => {console.log("Database Connected.")})
.catch(err => console.log("Error in DB connection: ", err));

//activation of port
const PORT = process.env.PORT || 2121;
app.listen(PORT, console.log(`Server started on port ${PORT}`))
