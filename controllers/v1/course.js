const courseModel = require('./../../models/course')
const sessionModel = require('./../../models/session')

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

exports.createSession = async (req, res) => {
    const {title, free, time} = req.body
    const {id} = req.params

    const session = await sessionModel.create({
        title,
        time,
        free,
        video: "video.mp4",
        course: id,
    })

    return res.status(201).json(session)
}

exports.getAllSessions = async (req, res) => {
    const sessions = await sessionModel.find({}).populate('course').lean()

    return res.status(200).json(sessions)

}

exports.getSessionInfo = async (req, res) => {
    const course = await courseModel.findOne({href: req.params.href})
    const session = await sessionModel.findOne({_id: req.params.sessionID})

    const sessions = await sessionModel.find({course: course._id})

    return res.status(200).json({session, sessions})
}