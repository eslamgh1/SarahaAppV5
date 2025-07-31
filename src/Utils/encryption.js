import CryptoJS from "crypto-js";

export const encrypt = (plaintext) => {
  return CryptoJS.AES.encrypt(plaintext, "key_123").toString();  // toString() to avoid buffer formate
};

export const decrypt = ({ plaintext }) => {
  return CryptoJS.AES.decrypt(plaintext, "key_123").toString(CryptoJS.enc.Utf8); 
};

