//variables de entorno
require("dotenv").config();

//librerías requeridas
const { createTransport } = require ("nodemailer");
const logger = require ('./logger.js')

const GMAIL_MAIL = process.env.GMAIL_MAIL

async function enviarMail(asunto, mensaje, destino, adjunto) {
    //CREAR OBJETO TRANSPORTER CON NODEMAILER
    const transporter = createTransport({
        host: 'smtp.gmail.com',
        port: 465,
        secure: true,
        auth: {
            user: GMAIL_MAIL,
            pass: process.env.GMAIL_PASS
        }
    });

    //DEFINIR OPCIONES DEL CORREO

    const mailOptions = {
        from: GMAIL_MAIL,
        to: destino,
        subject: asunto,
        html: mensaje,
    }

    //ENVÍO DE CORREO

    //si se especifica archivo adjunto se usa filesystem
    if(adjunto) {
        let adjuntoStream = fs.createReadStream(adjunto)
        mailOptions.attachments = [{
            path: adjuntoStream
        }]
    }

    try{
        const info = await transporter.sendMail(mailOptions)
        logger.info(`correo electrónico enviado con exito. Id: ${info.messageId}`)
    } catch (error) {
        logger.error(error)
    }
}

module.exports = {enviarMail}