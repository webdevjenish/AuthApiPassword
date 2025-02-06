const express = require('express');
const Routes = express.Router();
const UserCtl = require('../controllers/UserCtl');
const User = require('../model/UserModel');
const passport = require('passport')

Routes.get('/',passport.authenticate('jwt',{failureRedirect:'/unauth'}),UserCtl.home)
Routes.get('/unauth',async(req,res)=>{
    res.status(200).json({msg:'User in Unauthrized...'})
})
Routes.post('/adddata',UserCtl.AddData)
Routes.delete('/deletedata/:id',UserCtl.deleteData)
Routes.get('/getsingledata/:id',UserCtl.getsingledata)
Routes.patch('/updatedata/:id',UserCtl.updateData)
Routes.use('/auth',require('./Auth'))

module.exports = Routes;