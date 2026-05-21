import mongoose from 'mongoose';
import messageSchema from './Message.js';
const schema=new mongoose.Schema({user:{type:mongoose.Schema.Types.ObjectId,ref:'User',required:true},title:String,messages:[messageSchema]},{timestamps:true});
export default mongoose.model('Chat',schema);
