const mongoose = require('mongoose');

var authorSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            trim: true,
            required: true,
            maxlength: 100,
        },

        age: {
            type: String,
            trim: true,
            maxlength: 200,
        }

    },
    {
        timestamps: true,
    },
);

module.exports = mongoose.model('Author', authorSchema);