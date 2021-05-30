const verifyToken = require('./verifyToken');
const router = require('express').Router();

router.get('/register', verifyToken,(req, res) =>{
    res.send("hello")
});
module.exports = router;