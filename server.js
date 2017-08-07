var express = require('express')
var logger = require('morgan')
var bodyParser = require('body-parser')

// create a new instance of an express app
var app = express()

var admin = require("firebase-admin");

var serviceAccount = require("./herd-ae945-firebase-adminsdk-xb4n0-c1658ab012.json");

var firebaseAdmin = admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://herd-ae945.firebaseio.com"
});

var database = firebaseAdmin.database()
// set up EJS
app.set('view engine', 'ejs')   //behind the scenes, requires ejs
// allows us to put css and images and stuff inside views folder
app.use(express.static('views'))
app.set('views', __dirname + '/views')


// tell app where to find views folder
app.set('views', __dirname + '/views')

app.get('/', function(request, response){
    response.render('home.ejs')
})


var port = process.env.PORT

app.listen(port, function(){
    console.log(`App running on ${port} hamsters.`)
})