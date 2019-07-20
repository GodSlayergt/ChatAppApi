
const express=require("express");
const signin=express.Router();
const User=require("./model/user");
const config=require("../config");
const SimpleCrypto = require("simple-crypto-js").default;


signin.post("/",(req,res)=>{

	var  check=false;

if(typeof(req.body.name)=="number" || req.body.name.trim().length=== 0 )
{
	
	check=true;
}
if( req.body.password.trim().length<5 )
{
	
	check=true;
}

if(check)
{
	console.log("check");
	res.status(400).send();
}
else
{

const secret=config.secret;
const sc=new SimpleCrypto(secret);
const password=sc.encrypt(req.body.password);
const user={
	name:req.body.name,
	password:password
}

new User(user).save((err,user)=>{console.log("User is Saved"); res.status(200).send(user)})

}

})












module.exports=signin;