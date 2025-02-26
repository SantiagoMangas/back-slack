import ENVIROMENT from "../config/enviroment.js"
import transporter from "../config/mail.config.js"

export const sendMail = async ({ to, subject, html }) => {
    try {
        const data = await transporter.sendMail({
            from: ENVIROMENT.EMAIL_USERNAME,
            to,
            subject,
            html
        });

        console.log("Correo enviado:", data);
        return { success: true, data };
    } catch (error) {
        console.error('ERROR al enviar mail:', error);
        return { success: false, error: error.message };
    }
};
