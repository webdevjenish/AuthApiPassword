const AuthModel = require('../model/SignUpModel')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

module.exports.signup = async (req, res) => {
    try {
        console.log(req.body)
        let checkEmail = await AuthModel.find({ email: req.body.email }).countDocuments()
        if (checkEmail == 0) {
            // let checkPassword = AuthModel.findOne({password:req.body.password})
            if (req.body.password == req.body.confirmpassword) {
                req.body.password = await bcrypt.hash(req.body.password, 10)
                let SignupData = await AuthModel.create(req.body)
                if (SignupData) {
                    return res.status(200).json({ msg: "User Ragister Successfully..", data: SignupData })
                }
                else {
                    return res.status(200).json({ msg: "Failed to Ragister.." })
                }
            }
            else {
                return res.status(200).json({ msg: "Password And Confirm Password Are Not Match" })
            }
        }
        else {
            return res.status(200).json({ msg: "Email Not Found" })
        }
    }
    catch (err) {
        return res.status(404).json({ msg: "Somthing Wrong", Error: err })
    }
}
module.exports.Signin = async (req, res) => {
    try {
        let checkEmail = await AuthModel.findOne({ email: req.body.email })
        if (checkEmail) {
            let CheckPasword = await bcrypt.compare(req.body.password, checkEmail.password)
            if (CheckPasword) {
                let token = await jwt.sign({ user: checkEmail }, 'JB')
                return res.status(200).json({ msg: "User Ragister Successfully..", data: token })
            }
            else {
                return res.status(200).json({ msg: "password not match" })
            }

        }
        else {
            return res.status(200).json({ msg: "Email Not Found" })
        }

    }
    catch (err) {
        return res.status(404).json({ msg: "Somthing Wrong", Error: err })
    }
}