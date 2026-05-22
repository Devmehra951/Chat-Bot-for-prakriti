export const validateAuth=(req,res,next)=>{const {email,password}=req.body;if(!email||!password)return res.status(400).json({message:'Email and password required'});next();};
export const validateChat=(req,res,next)=>{if(!req.body.message)return res.status(400).json({message:'Message is required'});next();};
