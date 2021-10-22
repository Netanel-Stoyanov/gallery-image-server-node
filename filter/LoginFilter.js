const jwt = require('jsonwebtoken');

const verifyJwt = (req, res, next) => {
    const token = req.headers["x-access-token"];

    if (token === null || !token) {
        res.status(403).send("please login");
    } else {
        jwt.verify(token, "USER_SECRETE_KEY", (err, decoded) => {
            if (err) {
                res.status(403).send("forbidden");
            } else {
                req.userId = decoded.id;
                next();
            }
        })
    }
}

module.exports = {verifyJwt};
