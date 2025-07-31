import { userModel } from "../../DB/Models/user.model.js"
import { decrypt } from "../../Utils/encryption.js"
import { successResponse } from "../../Utils/successResponse.utils.js"
import jwt from "jsonwebtoken";
import { verifyToken } from "../../Utils/token.utils.js";


export const getSingleUser = async (req,res,next)=>{
// const {id}= req.params;
const {authorization} = req.headers;

const decoded = verifyToken({token:authorization})
console.log(decoded);

const user = await userModel.findById(decoded._id) // findById({id}) must be string id not {id}
// const user = await userModel.findById({_id:decoded._id}) 

user.phone = decrypt({plaintext: user.phone})

return successResponse({
  res,
  statusCode:200,
  message: "user is fetched successfully",
  data:user
})


}
