const path = require("path")
const multer = require("multer")
const router = require('express').Router();
const dotenv = require('dotenv');

let storage = multer.diskStorage({
    destination: function (req, file, cb) {

        // Uploads is the Upload_folder_name
        cb(null, process.env.UPLOAD_DIR)
    },
    filename: function (req, file, cb) {
        cb(null, file.fieldname + "-" + Date.now() + ".jpg")
    }
})

const maxSize = 1 * 1000 * 100000;
let upload = multer({
    storage: storage,
   // limits: {fileSize: maxSize},
    fileFilter: function (req, file, cb) {

        // Set the filetypes, it is optional
        let filetypes = /jpeg|jpg|png/;
        let mimetype = filetypes.test(file.mimetype);

        let extname = filetypes.test(path.extname(
            file.originalname).toLowerCase());

        if (mimetype && extname) {
            return cb(null, true);
        }

        cb("Error: File upload only supports the "
            + "following filetypes - " + filetypes);
    }

}).single("mypic");

router.post("/upload", function (req, res, next) {
        upload(req, res, function (err) {

        if (err) {
            res.send(err)
        } else {
            res.send("Success, Image uploaded!")
        }
    })
})

module.exports = router;
