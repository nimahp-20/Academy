const userModel = require('../../models/user')
const registerValidator = require('./../../validators/register')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')


exports.register = async (req, res) => {
    const validationResult = registerValidator(req.body)
    if (validationResult !== true) {
        return res.status(422).json(validationResult)
    }
    const { username, name, email, password, phone } = req.body

    const isUserExists = await userModel.findOne({
        $or: [{ username }, { email }]
    })

    if (isUserExists) {
        return res.status(409).json({
            message: 'username or email is duplicated'
        })
    }

    const countOfUsers = await userModel.count()

    const hashedPassword = await bcrypt.hash(password, 10)

    const user = await userModel.create({
        email,
        username,
        name,
        password: hashedPassword,
        phone,
        role: countOfUsers > 0 ? "USER" : "ADMIN"
    })

    const accessToken = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
        exoireIn: "30 day"
    })

    return res.status(201).json({ user, accessToken })
}

exports.login = async (req, res) => {

}

exports.getMe = async (req, res) => {

}

