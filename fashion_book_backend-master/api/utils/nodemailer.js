const nodemailer = require('nodemailer');
const { 
    SMTP_HOST,
    SMTP_PORT,
    SMTP_USER,
    SMTP_PASSWORD,
    API_HOST
 }  = require('../../env');
 const smtpOptions = {
    host: SMTP_HOST,
    port: SMTP_PORT,
    secure: true, // true for 465, false for other ports
    auth: {
        user: SMTP_USER, // generated ethereal user
        pass: SMTP_PASSWORD, // generated ethereal password
    },
}
console.log(smtpOptions);
const transporter = nodemailer.createTransport(smtpOptions);  

exports.sendEmail = async (email, token) => {
    let mailOptions = {
        from: '"SHOOPER 👻" <kiara966.shippo@gmail.com>', // sender address
        to: email, // list of receivers
        subject: 'Account Verification Token', // Subject line
        text: 'Hello my friend',
        html: '<b>verify your account</b>'
            + ' <br/>'
            + '<span>Please verify your account by clicking the link</span>'
            + '<br/>'
            + `<span>${API_HOST}/confirm/${token}</span>`
    };
    try{
        let send = await transporter.sendMail(mailOptions);
    }
    catch(err){
        console.log(err);
        return false;
    }
    return true;
}

exports.sendEmailForgotPassword = async (email, token) => {
    let mailOptions = {
        from: '"SHOOPER 👻" <kiara966.shippo@gmail.com>', // sender address
        to: email, // list of receivers
        subject: 'Forgot password Verification Token', // Subject line
        html: '<b>Forgot password</b>'
            + ' <br/>'
            + '<span>Please enter OTP below</span>'
            + '<br/>'
            + '<span>' + token +  '</span>'
    };
    try{
        let send = await transporter.sendMail(mailOptions);
    }
    catch(err){
        console.log(err);
        return false;
    }
    return true;
}
exports.sendMailConfirmPayment = async (email, token) => {
    let mailOptions = {
        from: '"SHOOPER 👻" <kiara966.shippo@gmail.com>', // sender address
        to: email, // list of receivers
        subject: 'Payment Verification Token', // Subject line
        text: 'Hello my friend',
        html: '<b>verify your account</b>'
            + ' <br/>'
            + '<span>Please verify your account by clicking the link</span>'
            + '<br/>'
            + '<span>http://localhost:3000/payment/' + token +  '</span>'
    };
    try{
        let send = await transporter.sendMail(mailOptions);
    }
    catch(err){
        console.log(err);
        return false;
    }
    return true;
}