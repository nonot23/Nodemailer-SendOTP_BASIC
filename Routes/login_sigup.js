const express = require('express')
const { PrismaClient } = require('@prisma/client');
const router = express.Router()
const hashPassword = require('../middleware/bcryptMiddleware')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken');
const { loginLimit, signupLimit } = require('../middleware/limit')
const sendOTP = require('../middleware/mail')


const prisma = new PrismaClient();

router.post('/register' , hashPassword, signupLimit, async (req, res) => {
    try {
        const user = await prisma.user.create({ 
            data: {
                username: req.body.username,
                password: req.hashedPassword,
                email: req.body.email
            }
        })
        res.status(200).json({ message: 'สมัครสมาชิกสำเร็จ'})
    } catch (err) {
        console.log(err)
        res.status(500).json({ error: 'สมัครสมาชิกไม่สำเร็จ'})
    }
})


router.post('/login',loginLimit, async (req, res) => {
    try {
        const user = await prisma.user.findFirst({
            where: {
              OR: [
                { username: req.body.username }, 
                { email: req.body.email }, 
              ],
            },
          })

        if(!user) {
            res.status(404).json({ message: 'ไม่พบผู้ใช้'})
            return
        }

        const passwordMatch = await bcrypt.compare(req.body.password, user.password)
        if(!passwordMatch) {
            res.status(401).json({ message: 'รหัสผ่านไม่ถูกต้อง'})
            return
        }

        const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET);
        const otp = await sendOTP(user.email);
    
        res.status(200).json({ message: 'เข้าสู่ระบบสำเร็จ', token, otp });
        
        
    } catch (err) {
        console.log(err)
        res.status(500).json({ error: 'เข้าสู่ระบบไม่สำเร็จ'})
    }
})

module.exports = router