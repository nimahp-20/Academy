const jwt = require('jsonwebtoken')
const userModel = require('./../models/user')


module.exports = async (req, res, next) => {
    const authHeader = req.header("Authorization")?.split(" ")

    if (authHeader?.length !== 2) {
        return res.status(403).json({
            message: "this route is protected and you can't access to id !"
        })
    }

    const token = authHeader[1];

    try {

        const jwtPayload = jwt.verify(token, process.env.JWT_SECRET)

        const user = await userModel.findById(jwtPayload.id).lean()

        Reflect.deleteProperty(user, 'password')

        req.user = user

        next()


    } catch (e) {
        return res.json(e)
    }
}