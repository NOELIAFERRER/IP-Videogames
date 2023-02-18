const { Router } = require('express');
// const { getGenres } = require('./controllersGenre');
const emailRouter = Router();

const sendEmail = ({ destinatary, subject, message }) => {
    return new Promise((resolve, reject) => {
        var transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: myEmail,
                pass: myPass,
            },
        });

        const mail_configs = {
            from: myEmail,
            to: destinatary,
            subject: subject,
            text: message,
            //puede venir un html también
            // html: <p>prueba</p>
        };
        transporter.sendMail(mail, configs, function(error, info){
            if(error){
                console.log('error:',error);
                return reject({message: 'An error has ocurred'});
            }
            return resolve({message: 'email successfuly sent'});
        });
    });}

emailRouter.get('/', (req, res) => {
    sendEmail()
    .then((response) => res.send(response.message))
    .catch((error) => res.status(500).send(error.message));
});

email.Router.post('/', (req, res) => {
    sendEmail(req.body)
    .then((response) => res.send(response.message))
    .catch((error) => res.status(500).send(error.message));
});

module.exports = emailRouter;