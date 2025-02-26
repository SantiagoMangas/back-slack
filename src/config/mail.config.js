import nodemailer from 'nodemailer'
import ENVIROMENT from './enviroment.js'

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth:{
        user: ENVIROMENT.EMAIL_USERNAME,
        pass: ENVIROMENT.EMAIL_PASSWORD
    }
})

transporter.verify(function(error, success) {
    if (error) {
        console.error("Email verification error:", error);
    } else {
        console.log("Server is ready to take our messages");
    }
});

export default transporter