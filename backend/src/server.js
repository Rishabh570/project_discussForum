const express = require('express')
	, signupRoute = require('./routers/signup')
	, userRoutes = require('./routers/users')
	, bodyParser = require('body-parser');

const app = express()

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}));

// TEST DB
const db = require('./db/database')
db.authenticate()
.then(() => {console.log("Database Connected.")})
.catch(err => console.log("Error in DB connection: ", err));


app.use('/signup', signupRoute);
app.use('/users', userRoutes);


const PORT = process.env.PORT || 5000;
app.listen(PORT, console.log(`Server started on port ${PORT}`))