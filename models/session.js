const mongoose = require('mongoose')

const schema = new mongoose.Schema({
        title: {
            type: String,
            required: true,
        },
        time: {
            type: String,
            required: true
        },
        free: {
            type: Boolean,
            required: true,
        },
        video: {
            type: String,
            required: true,
        },
        course: {
            type: mongoose.Schema.Types.ObjectID,
            ref: 'Course'
        },
    },
    {timestamps: true}
)

const model = mongoose.model('Session', schema)

module.exports = model