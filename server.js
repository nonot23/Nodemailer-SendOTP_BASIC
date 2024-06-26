const express = require('express')
const app = express()
const port = 3000
const bodyParser = require('body-parser')
const router = require('./Routes/login_sigup')

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true}))

app.use('/' , router)

app.listen(port, () => {
    console.log('listening on port ' + port)
})