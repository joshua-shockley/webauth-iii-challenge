const router = require('express').Router();

const Users = require('./theModel.js');
//setup restricted and a checkrole also
//restrice is called protected in my code today
const protected = require('../auth/protected.js');
//this next one checks what kind of role user has to see if has access
const checkRole = require('../auth/RoleCheck.js'); //put here after making


router.get('/', protected, checkRole('admin'), (req, res) => {
    Users.find()
        .then(users => {
            res.status(200).json({ loggedInUser: req.user.username, users });
        })
        .catch(err => {
            res.status(500).json(err);
        });
});


module.exports = router;