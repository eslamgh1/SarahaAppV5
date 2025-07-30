

// import mongoose from "mongoose";
// // collection [in Data base app]= model [in folder structure]

// const userSchema = new mongoose.Schema({
//   name: {
//     type: String,
//     required: true,
//     trim: true,
//     minlength: 2,
//     maxLenghth: 10,
//   },
//   email: {
//     type: String,
//     required: true,
//     unique: true,
//     trim: true,
//   },
//   password: {
//     type: String,
//     required: true,
//   },
//   age: {
//     type: Number,
//     required: true,
//     min: 18,
//     max: 60,
//   },
//   gender: {
//     type: String,
//     enum: ["male", "female"],
//     default: "male",
//   },
//   confirmed: {
//     type: Boolean,
//     default: false,
//   },
// },
// {
//   timestamps: true
// }

// );


// const userModel = mongoose.models.User || mongoose.model("User", userSchema)

// export default userModel;

