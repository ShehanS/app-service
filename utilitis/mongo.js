const User = require('../schemas/user')
module.exports.removeItem = async function (id) {
    User.findOne({ _id: id }, function (error, user) {
        if (error) {
            console.log("item remove error : ", error);
            return;
        }
        if (user) {
            console.log("removed : ", user);
            user.remove();
        }
    });
}