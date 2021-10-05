

const mongoose = require('mongoose');
const  Level = require('../models/Level');



const getLevels = async (req,res)=> {
  
try{

  const levels = await Level.find();
 res.send({
   success:true,
   data:levels,
   msg: 'show all levels'
 })

}catch(err){
  console.log(err)

}

  
}

const getLevel =async (req,res)=> {

 
  try{

    const {id} = req.params;
    const levels = await Level.findById(id);
   res.send({
     success:true,
     data:levels,
     msg: 'show all levels'
   })
  
  }catch(err){
    console.log(err)
  
  }
}
const createLevel = async (req, res) => {
  try {
    const { name, step } = req.body;
    const levels = await Level.create({ name, step });

    res.json({
      msg: `user with id ${levels.id}`,
      success: true,
      data: levels
    })
  } catch(err) {
    console.log(err)
  }
}






module.exports={
  getLevel,
  getLevels,
  createLevel,
 
  
}