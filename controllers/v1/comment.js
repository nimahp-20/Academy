const courseModel = require('./../../models/course')
const commentModel = require('./../../models/comment')
const categoryValidate = require('../../validators/categoryValidate')
const {isValidObjectId} = require("mongoose");


exports.create = async (req, res) => {
    const {body, courseHref, score} = req.body

    const course = await courseModel.findOne({href: courseHref}).lean()

    const comment = await commentModel.create({
        body,
        course: course._id,
        user: req.user._id,
        score,
        isAnswer: false,
        isAccept: false
    })

    return res.status(201).json(comment)
}

