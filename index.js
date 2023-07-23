const express=require("express");
const config=require("./config");
const bodyparser=require("body-parser");
const login=require("./src/login");
const home=require("./src/home");
const signin=require("./src/signin");
const mongoose=require("mongoose");
const passport=require("passport");
const app= express();
const server=app.listen(config.port,()=>{console.log(`server is listening at ${config.port}`)});
const io=require("socket.io")(server);
const cors=require("cors");
const groupchat=require("./src/groupchat");
require("./src/socket/socketconfig")(io); 
const google=require("./src/google_auth")(io);
const friends=require("./src/friends");
const getuser=require("./src/getuser");
require("./src/passport/google_auth")(passport);




//connecting to database
mongoose.connect("mongodb+srv://gtiwari037:DTJizkPfPqAYqe74@cluster0.8c0r8xj.mongodb.net/worldcup?retryWrites=true&w=majority",{useNewUrlParser: true})
 .then(()=>{console.log("connected with database");})
 .catch(err=>{console.log(err);})



//adding allowing cross origin request
app.use(cors());

//adding bodyparser middlewares
app.use(bodyparser.urlencoded({extended:false}));
app.use(bodyparser.json());

//passport middleware
app.use( passport.initialize());





//adding routes
app.use("/",home);
app.use("/signin",signin);
app.use("/auth/google",google);
app.use("/login",login);
app.use("/friends",friends);
app.use("/getuser",getuser);
app.use("/groupchat",groupchat);




