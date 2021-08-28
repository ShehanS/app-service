const mongoose = require('mongoose')

const imageSchema = new mongoose.Schema(
    {
        id: {
            type: Number
        },
        picture_path: {
            type: String
        }
    }
);
module.exports = mongoose.model("ImageGallery", imageSchema);