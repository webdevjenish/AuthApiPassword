const passport = require('passport')
const jwtStrategy = require('passport-jwt').Strategy
const extrajwt = require('passport-jwt').ExtractJwt

let opts = {
    jwtFromRequest : extrajwt.fromAuthHeaderAsBearerToken(),
    secretOrKey : 'JB'
}

const SignUp = require('../model/SignUpModel')

passport.use(new jwtStrategy(opts,async function(Paylode,done){
    let UserData = await SignUp.findOne({email:Paylode.user.email})
    if(UserData){
        return done(null,UserData)
    }
    else{
        return done(null,false)
    }
}))

passport.serializeUser(function(user,done){
    return done(null,user.id)
})

passport.deserializeUser(async(id,done)=>{
    let AuthUser = await SignUp.findById(id)
    if(AuthUser){
        return done(null,AuthUser)
    }
    else{
        return done(null,false)
    }
})

module.exports = passport