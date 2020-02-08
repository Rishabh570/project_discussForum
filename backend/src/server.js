const express = require('express')
	, signupRoute = require('./routers/signup')
	, userRoutes = require('./routers/users');

const app = express()

app.use(express.json())
app.use(express.urlencoded({extended: true}));

// TEST DB
const db = require('./db/database')
db.authenticate()
.then(() => {console.log("Database Connected.")})
.catch(err => console.log("Error in DB connection: ", err));

//direction to desired routes

app.use('/signup', signupRoute);
app.use('/users', userRoutes);

//activation of port
const PORT = process.env.PORT || 5000;
app.listen(PORT, console.log(`Server started on port ${PORT}`))