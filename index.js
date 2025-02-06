const express = require('express');
const port = 9000;
const app = express();

const DB =  require('./config/mongoose')
app.use(express.urlencoded());

const passport = require('passport')
const jwtStrategy = require('./config/passport-jwt-Strategy')
const session = require('express-session')

app.use(session({
    name:'jenish',
    secret : 'jenishkey',
    resave:false,
    saveUnintianlized:false,
    cookie:{
        maxAge:(1000*60*60)
    }
}))

app.use(passport.initialize())
app.use(passport.session())

app.use('/',require('./routes'))
app.listen(port,(err)=>{
    if(err){
        console.error(err);
        return;
    }
    console.log(`Server is running on port ${port}`);
})