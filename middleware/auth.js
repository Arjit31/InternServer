const jwt = require('jsonwebtoken');

function auth(req, res, next) {
    const token = req.cookies.access_token;
    if (!token) {
        res.status(401).json("Unauthorized");
        return;
    }
    try {
        const data = jwt.verify(token, process.env.JWT_SECRET);
        req.user = data;
        next();
    } catch (err) {
        console.log(err);
        res.status(401).json("Unauthorized");
    }
}

function adminAuth(req, res, next) {
    if(req.user.type != 'admin'){
        return res.status(403).send({message: 'You are not authorized to perform this action'});
    }
    next();
}

module.exports = {auth, adminAuth};