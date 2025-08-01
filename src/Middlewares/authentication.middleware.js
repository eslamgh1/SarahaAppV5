import { userModel } from "../DB/Models/user.model.js";
import { verifyToken } from "../Utils/token.utils.js";

export const authentication = async(req,res, next)=>{
  const {authorization} = req.headers;
  
  const decoded = verifyToken({token:authorization})
  console.log(decoded);
  
  const user = await userModel.findById(decoded._id)

  if (!user){
    return next(new Error("user not found" , {cause:404}))
  }
  req.user = user;
  return next();
}