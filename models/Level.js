const mongoose = require('mongoose');

const {Schema} = mongoose;

const LevelSchema = new Schema({
    
    name: {
        type: String,
        required: [true, 'Please add an level of language'],
        maxlength: [50,'max 50 characteres allowed for level']
       
    },
    step:{
        type: Number,
        required: [true, 'Please add an step of language'],
        
       

    }
})


module.exports = mongoose.model('Level', LevelSchema)