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

module.exports = auth;