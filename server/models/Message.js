import mongoose from 'mongoose';
const schema=new mongoose.Schema({role:{type:String,enum:['user','assistant'],required:true},content:{type:String,required:true},timestamp:{type:Date,default:Date.now}});
export default schema;
