const router = require('express').Router();
const User = require('../model/user');
const {createUserValidation, loginUserValidation} = require('./validation');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');


router.post('/singup', async (req, res) => {
    const {error} = createUserValidation.validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    const emailExist = await User.findOne({email: req.body.email});
    if (emailExist) return res.status(400).send('Email already exists');

    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(req.body.password, salt);

    const user = new User(req.body);
    try {
        const savedUser = await user.save();
        res.send({user: user._id});
    } catch (err) {
        res.status(400).send(err);

    }
});

router.post('/login', async (req, res) => {
    const {error} = loginUserValidation.validate(req.body);
    if (error) return res.status(400).json({error: error.details[0].message});
    const user = await User.findOne({email: req.body.email});
    if (!user) return res.status(400).json({error: 'user not found'});
       await bcrypt.hash(req.body.password, 10, function (err, hash) {
        if (err) {
            throw (err);
        }
        bcrypt.compare(user.password, hash, function (err, result) {
            if (err) {
                throw (err);
            }
            if (result==false) {
                res.status(400).json({error: 'password is not match'})
            }else if(result==true) {
                const token = jwt.sign({
                    user_id: user._id,
                    user: user.name
                }, process.env.TOKEN_SECRET, {expiresIn: process.env.JWT_DURATION});
                res.json({auth_token: token});
            }
        });
    });

});

module.exports = router;