const express=require("express");
const getuser=express.Router();
const User=require("./model/user");


getuser.get("/",(req,res)=>{

console.log(req.query.id);
User.find({_id:req.query.id},(err,user)=>{
	user=user[0];
if(!err)
{
      res.status(200).send(user);
}
else
{
	console.log("Id is not correct");
	res.status(400).send();
}


})



});

module.exports = getuser;