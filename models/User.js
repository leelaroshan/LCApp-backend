const mongoose = require('mongoose');

const {Schema} = mongoose;

const UserSchema = new Schema({
    userName:{
        type: String,
        required:[true, 'please add firstName'],
        maxlength: [50,'max 50 characteres allowed for firstname']
    },
    email: {
        type: String,
        required: [true, 'Please add an email'],
        unique: true,
        match: [
          /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
          'Please add a valid email',
        ],
      },
    password:{
        type: String,
        required:[true,'please add a password'],
        minlength:8

    },
    languages:[
      {
        name: {
          type: String,
          required: true
        },
        level: {
          type: Schema.ObjectId,
          required: true,
          ref: 'Level'
        }
      }
    ]
    
})


module.exports = mongoose.model('User', UserSchema)