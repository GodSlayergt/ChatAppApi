
const User =require("../model/user");

const getpendreq=(id)=>{

return new Promise((resolve,reject)=>{


	User.find({_id:id},(err,user)=>{

         user=user[0];
		if(!err)
		{
			
           resolve (user.reqs);

		}
		else
		{
           reject("user not found");
		}
	})


})



}


module.exports = getpendreq;