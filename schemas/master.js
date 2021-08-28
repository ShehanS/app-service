const mongoose = require('mongoose');
const masterSchema = mongoose.Schema({
    tenant_name:{
        type: String,
        required: true,
        min: 6
    },
    identity:{
        type: String,
        required: true,
        min: 6
    },
    identity_key:{
        type: String,
        required: true,
        min: 6
    },
    station:{
        type: {
            display_name: String,
            data_name: String,
            fliter_key: String
        },
        required: true,
      }

});
module.exports = mongoose.model("Master", masterSchema);