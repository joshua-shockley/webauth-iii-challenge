const router = require('express').Router();
//need other stuff too
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const secret = require('../secret/secret.js');

const Users = require('../users/theModel.js');

//endpoints here
//reg
router.post('/register', (req, res) => {
    const user = req.body; // this is the new user info from form fields of reg page
    const hash = bcrypt.hashSync(user.password, 10);
    user.password = hash;

    Users.add(user)
        .then(newuser => {
            res.status(200).json(newuser);
        })
        .catch(error => {
            res.status(500).json(error);
        });
});
//login
router.post('/login', (req, res) => {
    let { username, password } = req.body; // this is the body getting sent from login field on form
    Users.findBy({ username })
        .first()
        .then(user => {
            if (user && bcrypt.compareSync(password, user.password)) {
                //make the token here before the res
                const token = generateToken(user);
                // localStorage.setItem({ userId: user.id });
                res.status(200).json({ //its an object so it needs key:value pairs unless like token its the same on both sides
                    Message: `welcome on in ${user.username}`,
                    token,
                    userid: user.id, //use this to help front end put dynamically into url routes
                    username: user.username, //for frontend to use to set info for specific cx to show up
                    role: user.role //just did this for fun
                });

            } else {
                res.status(401).json({ Message: 'invalid Credentials' });
            }
        })
        .catch(error => {
            res.status(500).json({ error, Message: 'invalid credentials my friend' });
        });
});

function generateToken(user) {
    const payload = {
        subject: user.id,
        username: user.username,
        role: user.role,
        //other data i want to add if i want
    };
    options = {
        expiresIn: '1day',
    };
    return jwt.sign(payload, secret.jwtSecret, options) // jwtSecret is coming from another file...look up top for the require/import
}

module.exports = router;