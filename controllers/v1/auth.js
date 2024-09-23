const userModel = require('../../models/user')
const registerValidator = require('./../../validators/register')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const userBanModel = require('./../../models/banPhone')

exports.register = async (req, res) => {
    const validationResult = registerValidator(req.body)


    if (validationResult !== true) {
        return res.status(422).json(validationResult)
    }


    const {username, name, email, password, phone} = req.body

    const isUserExists = await userModel.findOne({
        $or: [{username}, {email}]
    })

    if (isUserExists) {
        return res.status(409).json({
            message: 'username or email is duplicated'
        })
    }

    const isUserBan = await userBanModel.find({phone})

    if (isUserBan.length) {
        return res.status(409).json({
            message: "This phone number is ban"
        })
    }

    const countOfUsers = await userModel.countDocuments()

    const hashedPassword = await bcrypt.hash(password, 10)

    const user = await userModel.create({
        email,
        username,
        name,
        password: hashedPassword,
        phone,
        role: countOfUsers > 0 ? "USER" : "ADMIN"
    })

    const userObject = user.toObject()
    Reflect.deleteProperty(userObject, 'password')


    const accessToken = await jwt.sign({id: user._id}, process.env.JWT_SECRET, {
        expiresIn: "30 day"
    })

    return res.status(201).json({user: userObject, accessToken})
}

exports.login = async (req, res) => {
    const {password, identifier} = req.body

    const user = await userModel.findOne({
        $or: [{email: identifier}, {username: identifier}]
    })

    if (!user) {
        return res.status(401).json({message: 'There is no user with this email or username'})
    }

    const isPasswordValid = await bcrypt.compare(password, user.password)

    if (!isPasswordValid) {
        return res.status(401).json({message: "Password is not valid!"})
    }

    const accessToken = jwt.sign({id: user._id}, process.env.JWT_SECRET, {
        expiresIn: "30 day"
    })

    return res.json({accessToken})
}

exports.getMe = async (req, res) => {

}

