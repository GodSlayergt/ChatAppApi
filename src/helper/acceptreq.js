
const User =require("../model/user");


const acceptreq = (id,req)=>{

return   new Promise((resolve,reject)=>{

	User.find({_id:id},(err,user)=>{
         console.log(user); 
		if(!err)
		{
		    	user=user[0];
           User.find({_id:req},(err,r)=>{
           	if(!err)
           	{
              r=r[0];
              if(r.friendsreq.indexOf(id)<0)
              {
              	user.friendsreq.push(req);
                user.reqs.splice(user.reqs.indexOf(req),1);
                user.save(user);
              	r.friendsreq.push(id);
                r.sendreqs.splice(user.sendreqs.indexOf(id),1);
                r.save(r);
              	resolve("request accepted");
              }
              else
              {
              	reject("Already Friends");
              }
           	}
           	else
           	{
           		reject("Request receiver not found");
           	}
           })

		}
		else
		{
			reject("User id not found");
		}
	})



})



}


module.exports = acceptreq;