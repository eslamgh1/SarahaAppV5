import jwt from "jsonwebtoken";

export const signToken = ({
  payLoad = {},
  signature = "key_123",
  options = {
    expiresIn: "1d",
  },
}) => {
  return jwt.sign(payLoad, signature,options);
  
};


export const verifyToken=({token="", signature="key_123"})=>{
return jwt.verify(token,signature);
}