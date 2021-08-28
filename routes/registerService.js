const verifySession = require('./verifySession');
const router = require('express').Router();

router.get('/update', verifySession,(req, res) =>{
   const userid = req.query.userid;
    res.redirect(`${process.env.WEB_APPLICATION_SERVER}/update-profile?userid=${userid}`);
});
module.exports = router;