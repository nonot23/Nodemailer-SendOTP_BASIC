const nodemailer = require('nodemailer')
const otpGenerator = require('otp-generator');

const sendOTP = async (email,mailOptions) => {
    try {

        const transporter = nodemailer.createTransport({
            host: process.env.Mail_HOST,
            port: process.env.Mail_POST,
            secure: true,
            auth: {
                user: process.env.Mail_USER,
                pass: process.env.Mail_PASS
            }
        })


        const otp = otpGenerator.generate(6, { digits: true, alphabets: false, upperCase: false, specialChars: false });
        const mailOptions = {
            from: process.env.Mail_USER,
            to: email,
            subject: 'รหัสยืนยัน OTP' + email,
            text: `รหัสยืนยัน OTP ของคุณคือ ${otp}`
        }
        await transporter.sendMail(mailOptions), (err) => {
            if (err) {
                console.log(err)
            } else {
                console.log('ส่งรหัสไปใน Email เรียบร้อย')
            }
        }
        return otp
        
    
    } catch (error) {
        console.log(error)
    }
}

module.exports = sendOTP