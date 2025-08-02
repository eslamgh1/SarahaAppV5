import nodemailer from "nodemailer";
import { EventEmitter } from "node:events";

export const sendEmail = async ({
  to,
  cc = "eslamgomaah@gmail.com",
  subject,
  content,
  attatchments = [],
}) => { 
  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
      user: "eslam.we1986@gmail.com",
      pass: "orikeovdzmfhrmbp",
    },
  });

  const info = await transporter.sendMail({
    from: "eslam.we1986@gmail.com",
    to,
    subject,
    html: content,
    attatchments,
  });

  console.log("Message sent:", info);

};

export const emitter = new EventEmitter()

emitter.on('sendEmail', (args)=>{
  console.log("Sending email through emitter event")
  console.log(args)
  sendEmail(args)
})


