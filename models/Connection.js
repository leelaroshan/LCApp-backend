const mongoose = require('mongoose');

const {Schema} = mongoose;

const ConnectionSchema = new Schema({
    callerId:{
        type: mongoose.Schema.ObjectId,
        required:[true, 'please add callerId'],
        ref: "User"
        
    },
    recipientId: {
        type: mongoose.Schema.ObjectId,
        required: [true, 'Please add an e'],
        ref:  "User"
       
    }
})


module.exports = mongoose.model('Connection', ConnectionSchema)