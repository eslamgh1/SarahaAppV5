import mongoose from "mongoose";
// // collection [in Data base app]= model [in folder structure]

export const genderEnum = {
  male: "male",
  female: "female",
};

export const userRoles = {
  user: "user",
  admin: "admin",
};

const userSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
      trim: true,
      minlength: 2,
      maxLenghth: 10,
    },
    lastName: {
      type: String,
      required: true,
      trim: true,
      minLength: 2,
      maxLength: 10,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
    },
    password: {
      type: String,
      required: true,
    },
    age: {
      type: Number,
      required: true,
      min: 18,
      max: 60,
    },
    gender: {
      type: String,
      enum: {
        values: Object.values(genderEnum), //["male", "female"]
        message: "Choose male or female",
      },
      default: genderEnum.male,
    },
    phone: String,
    confirmEmail: Boolean || Date,
    confirmed: {
      type: Boolean,
      default: false,
    },
    role: {
      type: String,
      enum: Object.values(userRoles),
      default: userRoles.user,
    },
  },
  {
    timestamps: true,
  }
);

export const userModel =
  mongoose.models.User || mongoose.model("User", userSchema);
