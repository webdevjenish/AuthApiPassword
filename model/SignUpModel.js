const mongoose = require('mongoose')
const SignUpSchema = mongoose.Schema({
    username:{
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true,
    },
    password:{
        type: String,
        required: true
    },
    confirmpassword:{
        type:String,
        required:true
    }
})

const SignUp = mongoose.model('SignUp', SignUpSchema)

module.exports = SignUp 