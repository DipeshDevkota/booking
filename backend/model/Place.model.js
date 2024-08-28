const mongoose = require('mongoose');
const PlaceSchema = new mongoose.Schema({
 


    owner:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User',
        require:true,
        
    },
    title:{
        type:String,
        require:true,

    },
    address:{
        type:String,
        require:true,

    },
    photos:{
        type:String,
        require:true,

    },
    description:{
        type:String,
        require:true,


    },
    perks:{
        type:String,
        require:true,


    },
    extraInfo:{
        type:String,
        require:true,



    },
    checkIn:{
        type:Number,
        require:true,


    },
    checkOut:{
        type:Number,
        require:true,


    },
    maxGuests:{
        type:Number,
        require:true,


    }
});


const Place = mongoose.model("Place",PlaceSchema);

module.exports=Place;