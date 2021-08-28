const jwt = require('jsonwebtoken');
const remover = require('../utilitis/mongo');
const User = require('../schemas/user');
module.exports = async function (req, res, next) {
    const userid = req.query.userid;
    const sessionJWT = req.query.token;
    if (sessionJWT == null) return res.status(200).json({ error: 'expire url please try again' });
    try {
        if (sessionJWT) {
            const verified = jwt.verify(sessionJWT, process.env.TOKEN_SECRET);
            req.user = verified;
            next();
        }
    } catch (err) {
        if (err.message === "jwt expired") {
            const user = await User.findOne({ _id: userid });
            if (user.profileStatus === false) {
                await remover.removeItem(userid);
            }
        }
        const sessionHtmlTemplate = `
        <body style="background-color: #341d75; color: #ffff; padding: 20px; font-family: Candara; text-align: center; font-size: 16px;">
        <h3 style="font-family: Candara; color: #ffff; font-size: 40px !important; padding: 10px; text-align: center;">SORRY !!!!&nbsp;</h3>
        <hr style="background: linear-gradient(90deg, rgba(255,255,255,0) 0%, rgba(255,255,255,1) 51%, rgba(255,255,255,0) 100%); height: 1px; border: none;" />
        <p>Session is expired .</p>
        <hr style="background: linear-gradient(90deg, rgba(255,255,255,0) 0%, rgba(255,255,255,1) 51%, rgba(255,255,255,0) 100%); height: 1px; border: none;" />
        <p>www.edu.lk</p>
        <p><strong>Thank you!!!.</strong></p>
        <p>Edu.lk Team</p>
        </body>`;
        res.status(200).send(sessionHtmlTemplate);
    }
}