const userModel = require('./../../models/user')
const banUserModel = require('./../../models/banPhone')

exports.banUser = async (req, res) => {
    const mainUser = await userModel.findOne({_id: req.params.id}).lean()
    const banUserResult = banUserModel.create({phone: mainUser.phone})


    if (banUserModel) {
        return res.status(200).json({message: "User banned successfully"})
    }
    return res.status(500).json({message: 'Server Error !!'})
}