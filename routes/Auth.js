const express = require('express');
const Route = express.Router()
const SignUpCtl = require('../controllers/AuthCtl')

Route.post('/signup',SignUpCtl.signup)
Route.post('/signin',SignUpCtl.Signin)

module.exports = Route