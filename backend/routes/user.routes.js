const express= require('express');
const { registerUser, loginUser, profileUser,logoutUser } = require('../controllers/usercontroller');
const { deletePlace, addPlace } = require('../controllers/placecontroller');
const router= express.Router();


router.post('/register',registerUser)
router.post('/login',loginUser)
router.get('/profile',profileUser)
router.get('/logout',logoutUser)
router.get('/delete',deletePlace)
router.post('/add',addPlace)



module.exports=router;