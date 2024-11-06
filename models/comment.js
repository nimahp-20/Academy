const mongoose = require('mongoose')

const schema = new mongoose.Schema({
        body: {
            type: String,
            required: true,
        },
        course: {
            type: mongoose.Schema.Types.ObjectID,
            ref: 'Course',
            required: true
        },
        user: {
            type: mongoose.Schema.Types.ObjectID,
            ref: 'User',
            required: true
        },
        isAccept: {
            type: Boolean,
            default: false
        },
        score: {
            type: Number,
            required: true,
            default: 5,
        },
        isAnswer: {
            type: Boolean,
            default: false,
            required: true
        },
        mainCommentId: {
            type: mongoose.Schema.Types.ObjectID,
            ref: 'Comment',
        }
    },
    {timestamps: true}
)
const model = mongoose.model('Comment', schema)
module.exports(model)