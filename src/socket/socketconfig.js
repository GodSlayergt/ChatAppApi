
const sendreq = require("../helper/sendreq");
const getpendreqs = require("../helper/getpendreqs");
const acceptreq = require("../helper/acceptreq");

module.exports=(io)=>{


let data={user:[]};



	io.on("connection",(current)=>{

     console.log("connected");

     
       //on disconneccting
     current.on("disconnect",()=>{
         
     	console.log("disconnected");
     	const element=data.user.find((obj,i)=> obj.sid==current.id );
     	data.user.splice(data.user.indexOf(element),1);
        

        io.emit("totalonline",data.user);


     })


     
        
        //on join the team
      current.on("join",(payload,callback)=>{

        //join in the team
          current.join(payload.room,()=>{console.log(`${payload.room}`)});
         const temp={
          sid:current.id,
         	id:payload.id,
         	name:payload.name,
         	room:payload.room
         }
         data.user.push(temp);
         

        //join itself
         current.join(payload.id,()=>{console.log("joined itself")});


         //showonlineusers/*
         const onlineusers=data.user.filter(e=> e.room===payload.room);
          console.log(onlineusers);
          io.to(payload.room).emit("totalonline",onlineusers);
       
  

          callback();
      })


      
      


      current.on("sendreq",(data,callback)=>{

        console.log(data);
        io.to(data.receiver).emit("notification",data.user);

        sendreq(data.user._id,data.receiver)
        .then((result)=>{console.log(result);callback(result);})
        .catch((error)=>{console.log(error);callback(error);});

        
       
              
      })


    

     

      current.on("getpendreqs",(data,callback)=>{
        
           
        getpendreqs(data.id)
        .then((result)=>{console.log(result);callback(result);})
        .catch((error)=>{console.log(error);callback(error);});
      })



      current.on("acceptreq",(data)=>{

        io.to(data.reqsender).emit("reqaccepted",data.user);

        acceptreq(data.user._id,data.reqsender)
        .then((result)=>{console.log(result)})
        .catch((error)=>{console.log(error)});

       
      })




      current.on("messg",(data)=>{

       /* addmessg(data)
        .then((result)=>{console.log(result);callback(result);})
        .catch((error)=>{console.log(error);callback(error);});
*/
          console.log(data);
		  current.broadcast.emit("messg",data);
        // current.to(data.room).broadcast.emit("messg",data)

      })
 



	})





}