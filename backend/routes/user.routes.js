const express= require('express');
const { registerUser, loginUser, profileUser,logoutUser } = require('../controllers/usercontroller');
const router= express.Router();


router.post('/register',registerUser)
router.post('/login',loginUser)
router.get('/profile',profileUser)
router.get('/logout',logoutUser)



module.exports=router;