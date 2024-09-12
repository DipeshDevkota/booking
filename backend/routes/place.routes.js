const express= require('express');
const { deletePlace, addPlace, placeByLink, uploadPhoto,onformSubmit,getallplace } = require('../controllers/placecontroller');
const upload = require('../config/multer');
const router= express.Router();
const {isAuthenticated} = require('../middleware/isAuthenticated.js')

router.get('/delete',deletePlace)
router.post('/add',addPlace)
router.post('/uploadbylink',placeByLink)
router.post('/upload',upload.single('photo'),uploadPhoto)
router.post('/formsubmit',onformSubmit)
router.get('/getallplaces',isAuthenticated,getallplace)

module.exports=router;