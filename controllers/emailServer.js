
require('dotenv').config()
const nodemailer = require('nodemailer');


const SentWelcomeEmail = (req, res) => {


    const output = `
    
    <h3>You Registerd successfully !</h3>
    <ul>
    <li></li>
    
   
    </ul>
    <h3>Messge</h3>
    
   
    
    <p class="full">
      <button type="submit">Submit</button>
    </p>
    
   

    `;

    //Step 1
    let transporter = nodemailer.createTransport({
        host: process.env.EMAIL_HOST,
        port: 465,
        secure: true,
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS
        },
        tls: {
            rejectUnauthorized: false
        }
    })
//Step 2
let mailOptions = {

    from: 'language@community.de',
    to: 'leela@gmail.com',
    //cc: 'luish199@hotmail.com',
    //bcc: 'ludis.info2@gmail.com',
    subject: 'Language Community App',
    text: 'Email with template',
    html: output
};


//step 3
transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
        console.log('error happened', error)
    } else {
        console.log('email sent', info.messageId);
        console.log('preview URL:%s', nodemailer.getTestMessageUrl(info));

        //res.render('contact',{layout:false},{msg:'Email has been sent'})
        res.render('contact', { layout: false, msg: 'Email Has been sent' });

    }
})

}


module.exports = {
    SentWelcomeEmail

}