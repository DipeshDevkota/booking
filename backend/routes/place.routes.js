const express= require('express');
const { deletePlace, addPlace, placeByLink, uploadPhoto,onformSubmit } = require('../controllers/placecontroller');
const upload = require('../config/multer');
const router= express.Router();


router.get('/delete',deletePlace)
router.post('/add',addPlace)
router.post('/uploadbylink',placeByLink)
router.post('/upload',upload.single('photo'),uploadPhoto)
router.post('/formsubmit',onformSubmit)


module.exports=router;