const mong=require("mongoose");
const findOrCreate = require('mongoose-findorcreate');
const Schema=mong.Schema;

const user = new Schema({

name:{
	type:String,
	required:true,
},

password:{
	type:String,
	required:true,
},

favteam:String,

googleid:String,
email:String,

friendsreq:[ 
      {
      	type:Schema.Types.ObjectId,
      	ref:"user"
      }
       
	   ],

sendreqs:[ 
      
       {
      	type:Schema.Types.ObjectId,
      	ref:"user"
      }
       
	   ],

reqs:[ 
      
       {
        type:Schema.Types.ObjectId,
        ref:"user"
      }
       
     ],     




});

user.plugin(findOrCreate);
const User=mong.model("user",user);

module.exports =User;