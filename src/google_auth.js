const passport=require("passport");
const express=require("express");
const google=express.Router();

module.exports=(io)=>{

google.get('/',
  passport.authenticate('google', { scope: ['email','profile']}));

google.get('/callback', 
  passport.authenticate('google', { failureRedirect: '/signin' }),(req,res)=>{
     
       res.redirect("http://127.0.0.1:3000/");
     io.on("connection",(socket)=>{
     	socket.join(socket.id,()=>console.log("joined"));
     	console.log("co");
     	io.to(socket.id).emit("googleres",req.user);
     })
   
 
  } );


return (google);
}
