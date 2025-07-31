import { userModel } from "../../DB/Models/user.model.js"
import { decrypt } from "../../Utils/encryption.js"
import { successResponse } from "../../Utils/successResponse.utils.js"


export const getSingleUser = async (req,res,next)=>{
const {id}= req.params;

const user = await userModel.findById(id) // findById({id}) must be sting id not {id}

user.phone = decrypt({plaintext: user.phone})

return successResponse({
  res,
  statusCode:200,
  message: "user is fetched successfully",
  data:user
})


}
