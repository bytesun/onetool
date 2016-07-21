var mongoose = require( 'mongoose' );
var Hash = require('password-hash');
var Schema   = mongoose.Schema;



var Todo = new Schema({
	   todo:String,
	   priority:Number,
	   owner:Schema.Types.ObjectId,
	   caseid:Schema.Types.ObjectId,
	   dotime:Date,
	   status:Number
});

var Checklist = new Schema({
	    comment:String,
		ctime:Date,
		status:Number,
		uid:Schema.Types.ObjectId,
		caseid:Schema.Types.ObjectId
});



var Event = new Schema({
	question:String,
	description:String,
	
});


//mongoose.model( 'User', User );
mongoose.model( 'todo', Todo );
mongoose.model( 'checklist', Checklist );
mongoose.model( 'event', Event );


var host = process.env.OPENSHIFT_MONGODB_DB_HOST||"localhost";
var port = process.env.OPENSHIFT_MONGODB_DB_PORT||'27017';
var username = process.env.OPENSHIFT_MONGODB_DB_USERNAME||'';
var password = process.env.OPENSHIFT_MONGODB_DB_PASSWORD||'';
 
mongoose.connect( 'mongodb://'+username+':'+password+'@'+host+':'+port+'/mytool' );