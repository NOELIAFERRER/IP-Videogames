const nodemailer = require("nodemailer");

let testAccountPass = "rchvhfnhnfldhsih";

// create reusable transporter object using the default SMTP transport
let transporter = nodemailer.createTransport({
  host: "smtp.gmail.email",
  port: 464,
  secure: true, // true for 465, false for other ports
  auth: {
    user: "noelia.c.ferrer@gmail.com", // generated ethereal user
    pass: testAccountPass, // generated ethereal password
  },
});

transporter.verify().then(() => {
  console.log("ready to go!!");
});
