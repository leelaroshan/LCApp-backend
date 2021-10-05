const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

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
          type: mongoose.Schema.Types.ObjectId,
          required: true,
          ref: 'Level'
        }
      }
    ]

    
})


// hash password
UserSchema.pre('save', async function(next) {
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  });

  UserSchema.methods.getSignedJwtToken = function() {
  return jwt.sign({ id: this._id }, process.env.JWT_SECRET)
   }

  // match user entered password ot hashed password in db
   UserSchema.methods.matchPassword = async function(enteredPass) {
  return await bcrypt.compare(enteredPass, this.password)
}


module.exports = mongoose.model('User', UserSchema)