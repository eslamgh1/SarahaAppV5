// export const asyncHandler = (fn)=>{
//   // asyncHandler return middleware /  return(req,res,next)=>{ logic}
// return(req,res,next)=>{

//   fn(req,res,next).catch((err)=>{
//         return next(new Error(err , {cause: err.status|| 500}))
//   })
// }
// }


// export const asyncHandler = (fn)=>{
//   // asyncHandler return middleware /  return(req,res,next)=>{ logic}
// return(req,res,next)=>{

//   fn(req,res,next).catch((err)=>{
//         return res
//       .status(500)
//       .json({ message: "internal server", 
//         error: err.message , 
//         stack: err.stack // stack bulit in JS return the number of line error 
//       });
//   })
// }
// }