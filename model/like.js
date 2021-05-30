const mongoose = require('mongoose')

const profileLikeSchema = new mongoose.Schema(
    {
        id: {
            type: Number
        },
        type: {
            type: String
        },
        profile_id: {
            type: String
        },

    }
);
module.exports = mongoose.model("ProfileLike", profileLikeSchema);