const express = require('express')
const authRouter = require('./routes/v1/auth')
const cors = require('cors')
const path = require('path')

const app = express()
app.use('/courses/covers')
app.use(cors())
app.use('/v1/auth', authRouter)

module.exports = app