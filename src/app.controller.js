import connectDB from "./DB/connection.js";
import authRouter from "./Modules/Auth/auth.controller.js"
import messageRouter from "./Modules/Messages/message.controller.js"
import userRouter from "./Modules/User/user.controller.js"

const bootstrap=(app,express)=>{
app.use(express.json()); // parse body = global middleware

app.use("/api/auth",authRouter)
app.use("/api/message",messageRouter)
app.use("/api/user",userRouter)
connectDB();


app.all("/*demo",(res,req,next)=>{
  return next(new Error("Page not found", {cause:404}))
})


// Global middleware for error
app.use((err, req, res, next) => {

  const status = err.cause || 500;
  res.status(status).json({message:"Something broke!" , error:err.message , stack:err.stack} )
})

}

export default bootstrap;