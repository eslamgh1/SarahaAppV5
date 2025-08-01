import { userModel } from "../../DB/Models/user.model.js"
import { decrypt } from "../../Utils/encryption.js"
import { successResponse } from "../../Utils/successResponse.utils.js"
import jwt from "jsonwebtoken";
import { verifyToken } from "../../Utils/token.utils.js";


export const getSingleUser = async (req,res,next)=>{
  
req.user.phone = decrypt({plaintext: req.user.phone})

return successResponse({
  res,
  statusCode:200,
  message: "user is fetched successfully",
  data:{user: req.user}
})


}
