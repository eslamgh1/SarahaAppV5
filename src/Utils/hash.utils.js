import bcrypt from "bcrypt";

//hash_password
export const hashPassword = async ({ plainText = "", saltRound = 10 }) => {
  return await bcrypt.hash(plainText, saltRound);
};




        //Match_password

  export const compare = async ({ plainText = "", hash = "" }) => {
  return await bcrypt.compare(plainText, hash);
};


