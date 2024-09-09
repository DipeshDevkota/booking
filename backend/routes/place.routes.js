const express= require('express');
const { deletePlace, addPlace, placeByLink, uploadPhoto, } = require('../controllers/placecontroller');
const upload = require('../config/multer');
const router= express.Router();



router.get('/delete',deletePlace)
router.post('/add',addPlace)
router.post('/uploadbylink',placeByLink)
router.post('/upload',upload.single('photo'),uploadPhoto)


module.exports=router;