

const mongoose = require('mongoose');
const User = require('../models/User');
const Level = require('../models/Level');


const { ObjectId } = mongoose.Types;


const getUsers = async (req,res)=> {
 
  
try{

  const users = await User.find().populate({path: "languages", populate:"level" });
 res.send({
   success:true,
   data:users,
   msg: 'show all users'
 })

}catch(err){
  console.log(err)

}

  
}

const getUser =async (req,res)=> {

 
  try{

    const {id} = req.params;
    const users = await User.findById(id).populate({ path: 'languages', populate: 'level' });
   res.send({
     success:true,
     data:users,
     msg: 'show all users'
   })
  
  }catch(err){
    console.log(err)
  
  }
}
const createUser = async (req, res) => {
  try {
    const { userName, email, password, languages } = req.body;

    
    const user = await User.create({ userName, email, password, languages });

     // create token
     const token = user.getSignedJwtToken();

     res.json({ 
       success: true, token,
      data: user,
      msg: `new user added with this id ${user.id}`
     })

  } catch(err) {
    console.log(err)
  }
}



const searchUser =async (req,res)=> {

 
  try{

    const { lang, nativeLang } = req.query;
    // user whose native language is 'lang' && wants to learn 'nativeLang'
    // || user who wants to learn 'lang' && 'lang' is not his native language
    
    const users = await User.find().populate({ path: 'languages', populate: 'level'});

    const filteredUsers = users.filter(user => {
      let wantsNativeLang = false;
      let currLangIsLang = false;
      let langIsNative = false;

      user.languages.forEach(language => {
        if (language.level.step === 5 && language.name.toLowerCase() === nativeLang.toLowerCase()) (wantsNativeLang = true);
        else if (language.name.toLowerCase() === lang.toLowerCase()) (currLangIsLang = true);

        if (language.level.step === 5 && language.name.toLowerCase() === lang.toLowerCase()) (langIsNative = true);
      });

      return wantsNativeLang && currLangIsLang || !langIsNative && currLangIsLang;
    });
    
   res.send({
     success: true,
     data: filteredUsers,
     msg: 'show all users based on  practice language'
   })
  
  }catch(err){
    console.log(err)
  
  }
}




const updateUser = async (req, res) => {
  try {
  const { id } = req.params;
   const { userName, email, password, languages } = req.body;

  const user = await User.findByIdAndUpdate(id,
     {userName,email,password,languages},
     {new:true})
     
  res.json({
    msg: `update user with id ${id}`,
    success: true,
    data: user

   });

}
catch(err){
  console.log(err);
}

  
}






const login =async (req,res)=> {

 
  try{

    const {email, password} = req.body;


    if (!email || !password) {
      res.status(400).send('Please provide an email and password')
      return;
    }

    const user = await User.findOne({ email:email });

    if (!user) {
      res.status(401).send('user does not exit')
      return;
    }

    const doesPassMatch = await user.matchPassword(password);
    if (!doesPassMatch) {
      res.status(401).send("password wrong");
      return;
    }

    const token = user.getSignedJwtToken();

    res.json({ 
      success: true, token,
      msg: 'user logged in',
      data:user, })

  
  }catch(err){
    console.log(err)
  
  }
}




module.exports={
  getUser,
  getUsers,
  createUser,
  updateUser,
  searchUser,
  login
 
  
}