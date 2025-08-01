import { userModel } from "../../DB/Models/user.model.js";
import { encrypt } from "../../Utils/encryption.js";
import { compare, hashPassword } from "../../Utils/hash.utils.js";
import { successResponse } from "../../Utils/successResponse.utils.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { signToken } from "../../Utils/token.utils.js";
import { emitter, sendEmail } from "../../Utils/sendEmail.utils.js";
import { customAlphabet, nanoid } from "nanoid";
const uniqueId = customAlphabet("1234567890abcdef", 4);

// =============  signUp ==================================//
export const signUp = async (req, res, next) => {
  const { firstName, lastName, email, password, age, gender, phone } = req.body;
  // check if user exits by email
  const userEmail = await userModel.findOne({ email }); // return null=falsy or {} =truthy
  console.log(userEmail);

  if (userEmail) {
    return next(new Error("user already exists", { cause: 401 }));
    // return res.status(409).json({ message: "user already exists" });
  }

  //hash_password
  const hash = await hashPassword({ plainText: password });

  //encryption
  const encryptPhone = encrypt(phone);
  // creating user

  const otp = uniqueId();

  const user = await userModel.create({
    firstName,
    lastName,
    email,
    password: hash,
    age,
    gender,
    phone: encryptPhone,
    otps: { confirmation: await hashPassword({ plainText: otp }) },
  });

  //   //sending Email
  //   await sendEmail({
  //     to: email,
  //     subject: "Confirmation Email",
  //     content: `
  // <h1> Confirm your email , your otp ${otp}</h1>
  // `,
  //   });

  emitter.emit("sendEmail", {
    to: email,
    subject: "Confirmation Email",
    content: `
<h1> Confirm your email , your otp ${otp}</h1>
`,
  });

  return successResponse({
    res,
    statusCode: 201,
    message: "user is created successfully",
    data: user,
  });
  // return res.status(201).json({ message: "user is created successfully" ,user});
};

// =============  Confirm Email ==================================//
export const confirmEmail = async (req, res, next) => {
  const { email, otp } = req.body;
  const user = await userModel.findOne({ email, isConfirmed:false});
  if (!user) {
    return next(
      new Error("user already found or already confirmed", { cause: 401 })
    );
  }

  const isOtpMatched = await compare({
    plainText: otp,
    hash: user.otps?.confirmation,
  });

  if (!isOtpMatched) {
    return next(new Error("Invalid OTP", { cause: 401 }));
  }
  user.isConfirmed = true;
  user.otps.confirmation = null;

  await user.save();

  successResponse({
    res,
    statusCode: 201,
    message: "User logged successfully",
    data: user,
  });
};

// =============  login ==================================//
export const login = async (req, res, next) => {
  const { email, password } = req.body;

  const user = await userModel.findOne({ email }); //findOne({email & password})

  if (!user) {
    return next(new Error("Invalid email", { cause: 404 }));
    // return res.status(401).json({ message: "Invalid email or password" });
  }

  //Match_password
  const isMatch = await compare({ plainText: password, hash: user.password });
  if (!isMatch) {
    return next(new Error("Invalid password", { cause: 401 }));
  }
  // token
  const accessToken = signToken({
    payLoad: { _id: user._id },
    options: {
      issuer: "SarahApp-2025",
      subject: "Authentication",
      expiresIn: "1d",
    },
  });

  // jwt.sign({ _id: user._id }, "key_123", {issuer:"SarahApp-2025",subject:"Authentication", expiresIn:"1d" });
  // const token = jwt.sign({ _id: user._id }, "key_123", {
  //   expiresIn: "1d",
  // });
  const refreshToken = signToken({
    payLoad: { _id: user._id },
    options: {
      issuer: "SarahApp-2025",
      subject: "Authentication",
      expiresIn: "1y",
    },
  });

  successResponse({
    res,
    statusCode: 201,
    message: "User logged successfully",
    data: { accessToken, refreshToken },
  });
};
