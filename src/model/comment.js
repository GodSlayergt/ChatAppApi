const mong=require("mongoose");
const Schema=mong.Schema;

const comment=new Schema({

	user:{
		type:Schema.Types.ObjectId,
		ref: 'user'
	},

	body:String,

	date:{
		type:Date,
		default:Date.now
	},

})

const Comment=mong.model("comment",comment);
module.exports =Comment;