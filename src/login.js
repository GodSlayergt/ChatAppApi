 
const express=require("express");
const User=require("./model/user");
const config=require("../config");
const SimpleCrypto = require("simple-crypto-js").default;
const login=express.Router();


login.post("/",(req,res)=>{


let check=false;
let error={type:"error"};
console.log('login');
if(typeof(req.body.name)==="number" || req.body.name.trim().length===0 )
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

const sc=new SimpleCrypto(config.secret);
const pass=sc.encrypt(req.body.password);
User.find({name:req.body.name},(err,docs)=>{

	if(!err)
	{
		
        let pass=false
       for(var doc of docs)
       {

			if(sc.decrypt(doc.password)===req.body.password)
			{
			
			console.log(doc);
			pass=true;
			res.status(200).send(doc);
			break;
			}

       }

    
		if(!pass)
		{
			error.password="In valid";
			res.send(error);
		}
        
	}
	else
	{
		     error.username="In valid";
             res.send(error);

	}

})

}

})












module.exports=login;