const express=require("express");
const groupchat=express.Router();
const User =require("./model/user");



groupchat.get("/",(req,res)=>{

User.find({},(err,users)=>{
	if(!err)
	{
		res.send(users);
	}
	else
	{
		console.log("%c Error in groupchat","color:red;");
		res.send("error");
	}
})
})

















module.exports = groupchat;