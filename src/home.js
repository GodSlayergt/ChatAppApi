
const express=require("express");
const home=express.Router();
const mong=require("mongoose");




home.get("/",(req,res)=>{

console.log("ga");
res.send("Hello");
	


})






module.exports =home;