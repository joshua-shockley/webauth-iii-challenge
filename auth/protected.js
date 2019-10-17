//bring in the jsonwebtoken
const jwt = require('jsonwebtoken');

//if not making secret in file require it here
const secret = require('../secret/secret.js');

module.exports = (req, res, next) => {
    const token = req.headers.authorization;

    if (token) {
        jwt.verify(token, secret.jwtSecret, (err, decodedToken) => {
            if (err) { //if there is an error with the token do this
                res.status(401).json({ message: 'there was an erro with the token... so no!' });
            } else { //if token is good do this-set info into req.user
                req.user = {
                    userId: decodedToken.Id,
                    username: decodedToken.username,
                    role: decodedToken.role,
                }
                next(); //after set info we want back roll to next part afte this middleware
            }
        })
    } else {
        res.status(400).json({ Message: ' there was NO token.... so no!' });
    }
};