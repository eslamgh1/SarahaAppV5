import { userModel } from "../../DB/Models/user.model.js";
import { encrypt } from "../../Utils/encryption.js";
import { compare, hashPassword } from "../../Utils/hash.utils.js";
import { successResponse } from "../../Utils/successResponse.utils.js";
import bcrypt from "bcrypt";

export const signUp = async (req,res,next) => {
  
    const { firstName, lastName, email, password, age, gender, phone } =
      req.body;
    // check if user exits by email
    const userEmail = await userModel.findOne({ email }); // return null=falsy or {} =truthy
    console.log(userEmail);

    if (userEmail) {
          return next(new Error("user already exists", {cause:401}))
      // return res.status(409).json({ message: "user already exists" });
    }

    //hash_password
    const hash = await hashPassword({plainText:password})

    //encryption
    const encryptPhone= encrypt(phone)


    const user = await userModel.create({
      firstName,
      lastName,
      email,
      password: hash,
      age,
      gender,
      phone: encryptPhone,
    });

    return  successResponse({res, statusCode:201,message:"user is created successfully",data:user})
    // return res.status(201).json({ message: "user is created successfully" ,user});
  
}

export const login = async (req,res,next) => {

    const { email, password } = req.body;

    const user = await userModel.findOne({ email }); //findOne({email & password})

    if (!user) {
      return next(new Error("Invalid email", {cause:404}))
      // return res.status(401).json({ message: "Invalid email or password" });
    }

        //Match_password
          const isMatch = await compare({plainText:password,hash:user.password})
            if (!isMatch) {
      return next(new Error("Invalid password", {cause:401}))
      
    }
  
successResponse({res, statusCode:201,message:"User logged successfully",data:user})

}
