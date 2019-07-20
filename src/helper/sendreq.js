
const User =require("../model/user");

const sendreq=(sender,recevier)=>{

return new Promise((resolve,reject)=>{

	User.find({_id:sender},(err,sen)=>{
		console.log(sen);
      
		if(!err)
		{     sen=sen[0];
			if(sen.sendreqs.indexOf(recevier)>-1)
			{
				reject("Friend request has already been sended");
			}
			else
			{
				User.find({_id:recevier},(err,rec)=>{
					console.log(rec);
					
                  if(!err)
                  { rec=rec[0];
                  	sen.sendreqs.push(recevier);
                  	sen.save(sen);
                  	rec.reqs.push(sender);
                  	rec.save(rec);
                  	resolve("request sended");
                  }
                  else
                  {

                  	reject("recevier is not found");
                  }

				})
				
			}


		}
		else
		{
           reject("sender is not found");
		}
	})



})



}


module.exports = sendreq;