const express=require("express");
const friends=express.Router();
const User=require("./model/user");


friends.get("/",(req,res)=>{

console.log(req.query.id);
User.findOne({_id:req.query.id}).populate("reqs").exec((err,user)=>{
if(!err)
{
	    console.log("from friends");
	   console.log(user.reqs);
	   console.log
	   const data={
	   	friendsreq:user.reqs
	   }
      res.status(200).send(data);
}
else
{
	console.log("Id is not correct");
	res.status(400).send();
}


})



});

module.exports = friends;