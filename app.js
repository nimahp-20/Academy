const express = require('express')
const cors = require('cors')
const path = require('path')
const bodyParser = require('body-parser')


const authRouter = require('./routes/v1/auth')
const usersRouter = require("./routes/v1/user")


const app = express()
app.use('/courses/covers', express.static(path.join(__dirname, "public", "courses", "covers")))
app.use(cors())
app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())


app.use('/v1/auth', authRouter)
app.use('/v1/user', usersRouter)

module.exports = app