const courseModel = require('./../../models/course')

exports.create = async (req, res) => {
    const {
        name,
        description,
        support,
        href,
        price,
        status,
        discount,
        categoryId
    } = req.body
    console.log(req.file)
    const course = await courseModel.create({
        name,
        description,
        creator: req.user._id,
        categoryId,
        status,
        price,
        href,
        discount,
        support,
        cover: req.file.filename,
    })

    const mainCourse = await courseModel.findById(course._id).populate('creator', '-password')

    return res.status(201).json(mainCourse)
}