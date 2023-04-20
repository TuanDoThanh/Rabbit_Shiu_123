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
        from: 'Rabbit Shiu<noreply@rabbit-shiu.vercel.app>', // sender address
        to: email, // list of receivers
        subject: 'Account Verification', // Subject line
        text: `Hello ${email}`,
        html: '<b>verify your account</b>'
            + ' <br/>'
            + '<span>We noticed that you have registered an account on our system, we appreciate it and would like you to please verify your account by clicking on the link.</span>'
            + '<br/>'
            + `<span>${API_HOST}/confirm/${token}</span>`
            + '<br/>'
            + '<span>Best regards,</span>'
            + '<br/>'
            + '<span>Support Rabbit Shiu</span>'
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
        from: 'Rabbit Shiu<noreply@rabbit-shiu.vercel.app>', // sender address
        to: email, // list of receivers
        subject: 'Forgot password Verification', // Subject line
        html: '<b>Forgot password</b>'
            + ' <br/>'
            + '<span>We have noticed that you have activated an account on our system by email, we appreciate it and would like you to please enter your OTP below.</span>'
            + '<br/>'
            + '<span>' + token +  '</span>'
            + '<br/>'
            + '<span>Best regards,</span>'
            + '<br/>'
            + '<span>Support Rabbit Shiu</span>'
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
// exports.sendMailConfirmPayment = async (email, token) => {
//     let mailOptions = {
//         from: 'Rabbit Shiu<noreply@rabbit-shiu.vercel.app>', // sender address
//         to: email, // list of receivers
//         subject: 'Payment Verification', // Subject line
//         text: `Hello ${email}`,
//         html: '<b>verify your account</b>'
//             + ' <br/>'
//             + '<span>Please verify your account by clicking the link</span>'
//             + '<br/>'
//             + `<span>${API_HOST}/confirm/${token}</span>`
//     };
//     try{
//         let send = await transporter.sendMail(mailOptions);
//     }
//     catch(err){
//         console.log(err);
//         return false;
//     }
//     return true;
// }