const router = require('express').Router();
const User = require('../schemas/user');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const logUser = require('../schemas/login');
const mailler = require('../email/emailSender');

router.post('/singup', async (req, res) => {
    const emailExist = await User.findOne({ email: req.body.email });
    if (emailExist) return res.status(200).json({ message: 'email already exists', status: 'error' });
    const JWTUrl = jwt.sign({
        action: 'singup',
    }, process.env.TOKEN_SECRET, { expiresIn: process.env.JWT_DURATION_URL });
    const user = new User({
        email: req.body.email

    });
    try {
        await user.save();
        const data = new TextEncoder().encode(
            JSON.stringify({
                email: req.body.email,
                name: req.body.email,
                url: `${process.env.APPLICATION_SERVER}/api/user/update?userid=${user._id}&token=${JWTUrl}`
            })
        );
        await mailler.sendMail(data, 'singup-notify');
        res.json({ user: user._id, status: 'success', message: 'account has been created!!!' });
    } catch (err) {
        console.log(err);
        res.status(200).send(err);
    }
});



router.get('/get/:id', async (req, res) => {
    const userId = req.params.id;
    try {
        const user = await User.findOne({ _id: userId });
        res.status(200).json(user);
    } catch (err) {
        console.log(err);
        res.status(200).send(err);

    }
});


router.put('/update-profile/:id', async (req, res) => {
    const userid = req.params.id;
    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(req.body.password, salt);
    try {
        const updatedUser = {
            profileStatus: true,
            firstName: req.body.firstName,
            middleName: req.body.middleName,
            lastName: req.body.lastName,
            address1: req.body.address1,
            address2: req.body.address2,
            city: req.body.city,
            country: req.body.country,
            school: req.body.school,
            stream: req.body.stream,
            subjects: req.body.subjects,
            contact: req.body.contact,
            identityNumber: req.body.identityNumber,
            profileImage: req.body.image,
            password: hashPassword

        };
        await User.findByIdAndUpdate(userid, updatedUser, (err, user) => {
            if (err) {
                console.log(err);

            };
            res.json({ status: 'success', message: 'account has been updated!!!' });
        });
    } catch (err) {
        res.status(200).json({ status: 'error', message: 'account cannot be updated!!!!' })

    }
});

router.post('/login', async (req, res) => {
    var path = "/main";
    const user = await User.findOne({ email: req.body.email });
    if (!user) return res.status(200).json({ status: 'error', message: 'user not found' });
    bcrypt.compare(req.body.password, user.password, async function (err, result) {
        if (err) {
            throw (err);
        }
        if (result == false) {
            res.status(200).json({ status: 'error', message: 'password did not match' });
        } else if (result == true) {
            const token = jwt.sign({
                user_id: user._id,
                user: user.name
            }, process.env.TOKEN_SECRET, { expiresIn: process.env.JWT_DURATION });

            const loggedUser = new logUser({
                email: user.email,
                userId: user._id
            });
            try {
                const saveLogged = await loggedUser.save();
                var newDate = new Date();
                console.log(`current logged recoard : ${newDate.toLocaleDateString()} - ${newDate.toLocaleTimeString()}`, saveLogged.email);
                if (user.profileStatus === false) {
                    path = "/update-profile"
                } else {
                    path = ''
                }
                res.json({
                    status: true,
                    userid: user._id,
                    authToken: token,
                    firstName: user.firstName,
                    middleName:user.middleName,
                    lastName: user.lastName,
                    stream: user.stream,
                    profileImage: user.profileImage,

                });
            } catch (err) {
                res.status(200).send(err);

            }
        }

    });

});

router.get("/test", (req, res) => {
    res.send("app is working");

});

module.exports = router;