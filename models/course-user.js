const mongoose = require('mongoose')

const schema = new mongoose.Schema({
        course: {
            type: mongoose.Schema.Types.ObjectID,
            required: true,
            ref: 'Course',
        },
        user: {
            type: mongoose.Schema.Types.ObjectID,
            required: true,
            ref: 'User',
        },
        price: {
            type: Number,
            required: true,
        },

    },
    {timestamps: true}
)


const model = mongoose.model('CourseUser', schema)

module.exports = model