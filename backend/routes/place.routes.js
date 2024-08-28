const express= require('express');
;
const { deletePlace, addPlace } = require('../controllers/placecontroller');
const router= express.Router();



router.get('/delete',deletePlace)
router.post('/add',addPlace)



module.exports=router;