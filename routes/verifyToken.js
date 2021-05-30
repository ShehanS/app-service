const jwt = require('jsonwebtoken');
module.exports = function (req, res, next) {
    const bearerHeader = req.headers['authorization'];
    if (bearerHeader == null) return res.status(400).json({error: 'access denied'});
    try {
        if (bearerHeader) {
            const bearer = bearerHeader.split(' ');
            const bearerToken = bearer[1];
            const verified = jwt.verify(bearerToken, process.env.TOKEN_SECRET);
            req.user = verified;
            next();
        }
    } catch (err) {
        res.status(400).json({error: err.message});
    }
}

/*
const token = authHeader && authHeader.split(' ')[1]
if(token == null) return res.status(400).json({error: 'access denied'});
try{
    const verified = jwt.verify(token, process.env.TOKEN_SECRET);
    req.user = verified;
    next();
} catch (err){
    console.log(err);
    res.status(400).json({error: err.message});
}

 */
