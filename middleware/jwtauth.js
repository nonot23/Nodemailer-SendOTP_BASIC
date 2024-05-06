const jwt = require('jsonwebtoken');

const authtoken =  (req, res, next) => {
    try {
        const token = req.headers['authorization']

        if(!token) {
            res.status(401).json({ message: 'ไม่พบ token'})
            return
        }
    
        jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
            if (err) {
                return res.status(403).json({ error: 'การตรวจสอบ token ล้มเหลว' });
            }
            req.user = user
            next();
        });
    } catch (err) {
        console.log(err)
        res.status(401).json({ message: 'token ไม่ถูกต้อง'})
    }
}

module.exports = authtoken