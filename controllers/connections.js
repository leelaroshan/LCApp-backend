

const mongoose = require('mongoose');
const  Connection = require('../models/Connection');






const getConnections = async (req,res)=> {
  
try{

  const connections = await Connection.find().populate("callerId").populate("recipientId");
 res.send({
   success:true,
   data:connections,
   msg: 'show all connections'
 })

}catch(err){
  console.log(err)

}

  
}

const getConnection =async (req,res)=> {

 
  try{

    const {id} = req.params;
    const connections = await Connection.findById(id);
   res.send({
     success:true,
     data:connections,
     msg: 'show all users'
   })
  
  }catch(err){
    console.log(err)
  
  }
}
const createConnection = async (req, res) => {
  try {
    const { callerId, recipientId } = req.body;
    const connection = await Connection.create({ callerId, recipientId });

    res.json({
      msg: `user with id ${user.id}`,
      success: true,
      data: connection
    })
  } catch(err) {
    console.log(err)
  }
}



















module.exports={
  getConnection,
  getConnections,
  createConnection,
 
  
}