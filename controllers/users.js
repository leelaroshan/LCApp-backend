

const mongoose = require('mongoose');
const User = require('../models/User');






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
    const users = await User.findById(id);
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

    res.json({
      msg: `user with id ${user.id}`,
      success: true,
      data: user
    })
  } catch(err) {
    console.log(err)
  }
}




/*
const updateUser = async (req, res) => {
  try {
  const { id } = req.params;
   const { firstName, lastName, age,hobbies } = req.body;

  const user = await User.findByIdAndUpdate(id,
     {firstName,lastName,age,hobbies},
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

*/




const login =async (req,res)=> {

 
  try{

    const {email, password} = req.body;


    if (!email || !password) {
      res.status(400).send('Please provide an email and password')
      return;
    }

    const user = await User.findOne({email:email, password:password});

    if (!user) {
      res.status(401).send('Invalid credentials')
      return;
    }

   

   res.send({
     success:true,
     data:user,
     msg: 'show all users'
   })
  
  }catch(err){
    console.log(err)
  
  }
}




module.exports={
  getUser,
  getUsers,
  createUser,
  login
 
  
}