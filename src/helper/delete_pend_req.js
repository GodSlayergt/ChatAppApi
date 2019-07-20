
const User=require("../model/user");

module.exports = (id,req)=>{



	User.find({_id:id},(err,user)=>{
 

		if(!err)
		{
			       user=user[0];
           if(user.reqs.indexOf(req)>-1)
           {
            user.reqs.splice(user.reqs.indexOf(req),1);
            user.save(user);
           }
           else
           {
           	
           	console.log("%c From delete_send_req : req is not found","color:red;");
           	
           }

		}
		else
		{
           
            console.log("%c From delete_send_req : user is not found","color:red;");
           
		}
	})

}

