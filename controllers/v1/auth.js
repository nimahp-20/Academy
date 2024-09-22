const userModel = require('../../models/user')
const registerValidator = require('./../../validators/register')

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
}

exports.login = async (req, res) => {

}

exports.getMe = async (req, res) => {

}

