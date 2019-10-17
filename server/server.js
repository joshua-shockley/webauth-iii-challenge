const express = require('express');
const helmet = require('helmet');
const bcrypt = require('bcryptjs');
const cors = require('cors');
const userRouter = require('../users/users-Router.js');
const authRouter = require('../auth/auth-Router.js');
const server = express();

server.use(express.json());
server.use(helmet());
server.use(cors());

server.use('/api/auth', authRouter);
server.use('/api/users', userRouter);

server.get('/', (req, res) => {
    res.send('<h2>hello delinquents! welcome to the test...</h2>');
});



module.exports = server;