const userModel = require('./../../models/user')
const banUserModel = require('./../../models/banPhone')
const {isValidObjectId} = require("mongoose");

exports.banUser = async (req, res) => {
    const mainUser = await userModel.findOne({_id: req.params.id}).lean()
    const banUserResult = banUserModel.create({phone: mainUser.phone})


    if (banUserResult) {
        return res.status(200).json({message: "User banned successfully"})
    }
    return res.status(500).json({message: 'Server Error !!'})
}


exports.getAll = async (req, res) => {
    const users = await userModel.find({}).lean()

    users.forEach(user => {
        users.forEach(user => {
            delete user.password;
        });
    });

    return res.json(users)
}

exports.deleteUser = async (req, res) => {
    const isValidId = isValidObjectId(req.params.id)

    if (!isValidId) {
        return res.status(409).json({
            message: 'UserId not valid'
        })
    }
    const removeUser = await userModel.findByIdAndDelete({_id: req.params.id})

    if (!removeUser) {
        return res.status(404).json({
            message: "user not found"
        })
    }
    return res.status(200).json({
        message: "userDeleted Successfully"
    })

}