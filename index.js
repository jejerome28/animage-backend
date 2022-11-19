const express = require('express');
const app = express();
const path = require('path');
const mongoose = require('mongoose');
const {user} = require('./model');
const passport = require('passport');
const session = require('express-session');
const dbString = 'mongodb://localhost:27017/aniMage';
const mongoStore = require('connect-mongo');
const storeSession = mongoStore.create({mongoUrl:dbString, collectionName: 'sessions'});
const routes = require('./routes');
const method_override = require('method-override');
const {auth} = require('./controller');


app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(express.json());
app.use(express.urlencoded({extended:true}));

app.use(method_override('_method'));
app.use(express.static(path.join(__dirname, '/public')));
app.use(session({
    secret:'secret key',
    resave: false,
    saveUninitialized: true,
    store: storeSession,
    cookie: {
        maxAge: 86400000
    }
}))
app.use(passport.initialize());
app.use(passport.session());

auth(
    passport,
    username => user.findOne({username})
)

//create custom connection
mongoose.createConnection(dbString, (err,result)=>{if(err)throw err; console.log('connected')})


//use all routes
app.use('/', routes);



app.listen(3000, ()=>{
    console.log('listening on port 3000');
})