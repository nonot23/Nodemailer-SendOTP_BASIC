const bcrypt = require('bcrypt')
const saltRounds = 10

const hashPassword = async (req, res, next) => {
    const password = req.body.password
    const hashedPassword = await bcrypt.hash(password, saltRounds)
    req.hashedPassword = hashedPassword
    next()
}

module.exports = hashPassword