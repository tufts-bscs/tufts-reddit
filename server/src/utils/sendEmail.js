import nodemailer from 'nodemailer';

export const sendEmail = async (
    destinationEmail,
    subject,
    messageText,
    messageHTML
) => {
    // create reusable transporter object using the default SMTP transport
    let transporter = nodemailer.createTransport({
        service: process.env.SENDER_SERVICE,
        auth: {
            user: process.env.SENDER_EMAIL,
            pass: process.env.SENDER_PASSWORD,
        },
    });

    // send mail with defined transport object
    await transporter.sendMail({
        from: `${process.env.SENDER_NAME} <${process.env.SENDER_EMAIL}>`,
        to: destinationEmail,
        subject: subject,
        text: messageText,
        html: messageHTML,
    });
};

export const sendDummyEmail = async (
    destinationEmail,
    subject,
    messageText,
    messageHTML
) => {
    // use ethereal to create fake email credentials
    let testAccount = await nodemailer.createTestAccount();

    // create reusable transporter object using the default SMTP transport
    let transporter = nodemailer.createTransport({
        host: 'smtp.ethereal.email',
        port: 587,
        secure: false,
        auth: {
            user: testAccount.user, // generated ethereal user
            pass: testAccount.pass, // generated ethereal password
        },
    });

    // send mail with defined transport object
    let info = await transporter.sendMail({
        from: `"Tufts Reddit" <${testAccount.user}>`,
        to: destinationEmail,
        subject: subject,
        text: messageText,
        html: messageHTML,
    });

    // Preview only available when sending through an Ethereal account
    console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
};

export const sendRegistationConfirmationEmail = async (
    req,
    res,
    token,
    email
) => {
    // Set up email with verification token
    const link = `http://localhost:3000/user/confirm/${token.token}`;
    const subject = 'Welcome to Tufts Reddit!';
    const text = `Please click on the following link: ${link} to verify your account.`;
    const html = `<p>Hi there!<p><br><p>A new account has been created for you at http://${req.headers.host}. Please click on the following <a href="${link}">link</a> to verify your account and login.</p><br><p>If you did not request this, please ignore this email.</p>`;

    // Send the user an email to verify account
    if (process.env.NODE_ENV === 'production') {
        await sendEmail(email, subject, text, html);
    } else if (process.env.NODE_ENV === 'test') {
    } else {
        console.log(link);
        await sendDummyEmail(email, subject, text, html);
    }
};

export const sendRequestResetPasswordEmail = async (req, token, email) => {
    // send email with token
    const link = `http://${req.headers.host}/resetPassword/${token.token}`;
    const subject = 'Tufts Reddit Password Reset Request';
    const text = `Please click the following link: ${link} to reset password`;
    const html = `Please click the following <a href="${link}">link</a> to reset your password and login.`;

    // Send the user an email to reset password
    if (process.env.NODE_ENV === 'production') {
        await sendEmail(email, subject, text, html);
    } else {
        console.log(link);
        await sendDummyEmail(email, subject, text, html);
    }
};
