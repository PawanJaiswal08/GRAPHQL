const mongoose = require('mongoose');
const { ObjectId } = mongoose.Schema;

var bookSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            trim: true,
            required: true,
            maxlength: 100,
        },

        authorId: {
            type: ObjectId,
            ref: 'Author',
            required: true,
        }

    },
    {
        timestamps: true,
    },
);

module.exports = mongoose.model('Book', bookSchema);