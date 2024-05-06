const { rateLimit } = require('express-rate-limit');

const loginLimit = rateLimit({
  windowMs: 1 * 60 * 1000, // 1 นาที
  max: 10, // จำกัด 10 ครั้งต่อนาที
  message: {
    message: 'การเข้าถึงถูกจำกัด โปรดลองอีกครั้งภายหลัง',
  },
});

const signupLimit = rateLimit({
  windowMs: 1 * 60 * 1000, // 1 นาที
  max: 10, // จำกัด 10 ครั้งต่อนาที
  message: {
    message: 'การเข้าถึงถูกจำกัด โปรดลองอีกครั้งภายหลัง',
  },
});

module.exports = { loginLimit , signupLimit }